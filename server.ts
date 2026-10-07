import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import { 
  currentOrg, 
  currentUser, 
  leadsDatabase, 
  analysesDatabase, 
  outreachDatabase, 
  followUpsDatabase, 
  activitiesDatabase, 
  subscription, 
  getDashboardMetrics 
} from './server/db.ts';
import { LeadDiscoveryService } from './server/leadDiscovery.ts';
import { GeminiService } from './server/gemini.ts';
import { 
  Lead, 
  OutreachMessage, 
  FollowUp, 
  ActivityItem, 
  PipelineStageKey 
} from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // 1. Auth & Organization profile
  app.get('/api/auth/me', (req, res) => {
    res.json({
      user: currentUser,
      organization: currentOrg,
    });
  });

  app.get('/api/organization', (req, res) => {
    res.json(currentOrg);
  });

  app.put('/api/organization', (req, res) => {
    const updates = req.body;
    Object.assign(currentOrg, updates);
    res.json({ success: true, organization: currentOrg });
  });

  // 2. Dashboard metrics
  app.get('/api/metrics', (req, res) => {
    const metrics = getDashboardMetrics();
    res.json(metrics);
  });

  // 3. Leads CRUD & Search
  app.get('/api/leads', (req, res) => {
    let results = [...leadsDatabase];
    const { 
      query, 
      industry, 
      country, 
      city, 
      stage, 
      minRating, 
      minLeadScore,
      opportunityLevel 
    } = req.query;

    if (query && typeof query === 'string' && query.trim() !== '') {
      const q = query.toLowerCase();
      results = results.filter(l => 
        l.companyName.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.notes.toLowerCase().includes(q)
      );
    }

    if (industry && typeof industry === 'string' && industry !== 'all') {
      results = results.filter(l => l.industry.toLowerCase() === industry.toLowerCase());
    }

    if (country && typeof country === 'string' && country.trim() !== '') {
      results = results.filter(l => l.country.toLowerCase().includes(country.toLowerCase()));
    }

    if (city && typeof city === 'string' && city.trim() !== '') {
      results = results.filter(l => l.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (stage && typeof stage === 'string' && stage !== 'all') {
      results = results.filter(l => l.pipelineStage === stage);
    }

    if (opportunityLevel && typeof opportunityLevel === 'string' && opportunityLevel !== 'all') {
      results = results.filter(l => l.opportunityLevel === opportunityLevel);
    }

    if (minRating) {
      results = results.filter(l => l.googleRating >= Number(minRating));
    }

    if (minLeadScore) {
      results = results.filter(l => l.leadScore >= Number(minLeadScore));
    }

    // Default order: highest lead score first
    results.sort((a, b) => b.leadScore - a.leadScore);

    res.json(results);
  });

  // Discovery Endpoint (External data provider simulation / plug-in)
  app.get('/api/leads/search', (req, res) => {
    const params = {
      country: req.query.country as string,
      city: req.query.city as string,
      industry: req.query.industry as string,
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      websiteQuality: req.query.websiteQuality as any,
      hasWhatsapp: req.query.hasWhatsapp === 'true' ? true : undefined,
      hasEmail: req.query.hasEmail === 'true' ? true : undefined,
      hasSocial: req.query.hasSocial === 'true' ? true : undefined,
      minLeadScore: req.query.minLeadScore ? Number(req.query.minLeadScore) : undefined,
      query: req.query.query as string,
    };

    const discoveryResults = LeadDiscoveryService.searchLeads(params);
    res.json({
      results: discoveryResults,
      count: discoveryResults.length,
      provider: 'Mock Google Places Provider (DEMO DATA)',
      readyForRealApi: true
    });
  });

  // Create lead (or save discovered candidate)
  app.post('/api/leads', (req, res) => {
    // Check usage limits
    if (subscription.leadsUsedThisMonth >= subscription.leadsLimit) {
      return res.status(403).json({ 
        error: `Monthly lead limit reached (${subscription.leadsLimit} leads). Please upgrade your subscription to import more leads.` 
      });
    }

    const leadData = req.body;
    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      organizationId: currentOrg.id,
      companyName: leadData.companyName || 'Untitled Business',
      industry: leadData.industry || 'General',
      country: leadData.country || currentOrg.country,
      city: leadData.city || 'London',
      address: leadData.address || '',
      website: leadData.website || 'https://example.com',
      email: leadData.email || '',
      phone: leadData.phone || '',
      googleRating: leadData.googleRating || 4.5,
      reviewCount: leadData.reviewCount || 20,
      leadScore: leadData.leadScore || 75,
      websiteScore: leadData.websiteScore || 50,
      digitalPresenceScore: leadData.digitalPresenceScore || 50,
      opportunityLevel: leadData.opportunityLevel || 'HIGH',
      hasWhatsapp: Boolean(leadData.hasWhatsapp),
      hasEmail: Boolean(leadData.hasEmail),
      hasSocial: Boolean(leadData.hasSocial),
      pipelineStage: leadData.pipelineStage || 'NEW',
      estimatedValue: leadData.estimatedValue || 2500,
      notes: leadData.notes || '',
      tags: leadData.tags || ['New Lead'],
      followUpCount: 0,
      isDemo: Boolean(leadData.isDemo),
      source: leadData.source || 'manual',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leadsDatabase.unshift(newLead);
    subscription.leadsUsedThisMonth += 1;

    // Log activity
    activitiesDatabase.unshift({
      id: `act-${Date.now()}`,
      leadId: newLead.id,
      companyName: newLead.companyName,
      type: 'lead_created',
      title: 'Lead added to CRM',
      description: `Saved ${newLead.companyName} with Lead Score ${newLead.leadScore}/100.`,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(newLead);
  });

  // Get single lead with full relation graphs
  app.get('/api/leads/:id', (req, res) => {
    const lead = leadsDatabase.find(l => l.id === req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const analysis = analysesDatabase[lead.id] || null;
    const messages = outreachDatabase.filter(m => m.leadId === lead.id);
    const followUps = followUpsDatabase.filter(f => f.leadId === lead.id);
    const activities = activitiesDatabase.filter(a => a.leadId === lead.id);

    res.json({
      lead,
      analysis,
      messages,
      followUps,
      activities
    });
  });

  // Update lead
  app.put('/api/leads/:id', (req, res) => {
    const leadIndex = leadsDatabase.findIndex(l => l.id === req.params.id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const oldStage = leadsDatabase[leadIndex].pipelineStage;
    const updates = req.body;
    
    leadsDatabase[leadIndex] = {
      ...leadsDatabase[leadIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (updates.pipelineStage && updates.pipelineStage !== oldStage) {
      activitiesDatabase.unshift({
        id: `act-${Date.now()}`,
        leadId: req.params.id,
        companyName: leadsDatabase[leadIndex].companyName,
        type: 'stage_updated',
        title: `Pipeline moved to ${updates.pipelineStage}`,
        description: `Prospect shifted from ${oldStage} to ${updates.pipelineStage}.`,
        createdAt: new Date().toISOString(),
      });
    }

    res.json(leadsDatabase[leadIndex]);
  });

  // Delete lead
  app.delete('/api/leads/:id', (req, res) => {
    const index = leadsDatabase.findIndex(l => l.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    leadsDatabase.splice(index, 1);
    delete analysesDatabase[req.params.id];
    res.json({ success: true, message: 'Lead deleted from CRM' });
  });

  // 4. AI Lead Website & Digital Presence Analysis
  app.post('/api/leads/:id/analyze', async (req, res) => {
    const lead = leadsDatabase.find(l => l.id === req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    try {
      const analysis = await GeminiService.analyzeLead(lead, currentOrg);
      analysesDatabase[lead.id] = analysis;
      
      // Update lead scores based on the deep audit
      lead.websiteScore = analysis.websiteScore;
      lead.opportunityLevel = analysis.websiteScore < 60 ? 'HIGH' : analysis.websiteScore < 80 ? 'MEDIUM' : 'LOW';
      lead.updatedAt = new Date().toISOString();

      // Track usage
      subscription.aiAnalysesUsed += 1;

      // Log activity
      activitiesDatabase.unshift({
        id: `act-${Date.now()}`,
        leadId: lead.id,
        companyName: lead.companyName,
        type: 'lead_analyzed',
        title: 'AI Website Audit completed',
        description: `Generated deep analysis: Website Score ${analysis.websiteScore}/100, identified ${analysis.weaknesses.length} conversion leaks.`,
        createdAt: new Date().toISOString(),
      });

      res.json(analysis);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to analyze lead' });
    }
  });

  // 5. AI Outreach Generator
  app.post('/api/outreach/generate', async (req, res) => {
    const { leadId, channel = 'email', tone = 'consultative', language = 'English', service, callToAction } = req.body;
    
    const lead = leadsDatabase.find(l => l.id === leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const analysis = analysesDatabase[lead.id] || null;

    try {
      const result = await GeminiService.generateOutreach(
        lead,
        analysis,
        {
          channel,
          tone,
          language: language || currentOrg.preferredLanguage || 'English',
          service: service || analysis?.recommendedOffer || currentOrg.servicesOffered[0],
          callToAction: callToAction || 'Would you be open to a quick 2-minute video walkthrough?'
        },
        currentOrg
      );

      const newOutreach: OutreachMessage = {
        id: `msg-${Date.now()}`,
        leadId: lead.id,
        organizationId: currentOrg.id,
        channel,
        tone,
        language: language || 'English',
        subject: result.subject,
        body: result.body,
        serviceHighlighted: service || analysis?.recommendedOffer || currentOrg.servicesOffered[0],
        callToAction: callToAction || 'Would you be open to a quick 2-minute video walkthrough?',
        status: 'ready',
        createdAt: new Date().toISOString(),
      };

      outreachDatabase.unshift(newOutreach);

      // Log activity
      activitiesDatabase.unshift({
        id: `act-${Date.now()}`,
        leadId: lead.id,
        companyName: lead.companyName,
        type: 'message_generated',
        title: `AI ${channel.toUpperCase()} pitch generated`,
        description: `Created personalized ${tone} outreach focused on ${newOutreach.serviceHighlighted}.`,
        createdAt: new Date().toISOString(),
      });

      res.json(newOutreach);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to generate outreach' });
    }
  });

  // Mark Outreach as Sent (updates pipeline & follow-up)
  app.post('/api/outreach/send', (req, res) => {
    const { messageId } = req.body;
    const msg = outreachDatabase.find(m => m.id === messageId);
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }

    msg.status = 'sent';
    msg.sentAt = new Date().toISOString();

    const lead = leadsDatabase.find(l => l.id === msg.leadId);
    if (lead) {
      lead.lastContactedAt = new Date().toISOString();
      lead.followUpCount += 1;
      // Auto advance to CONTACTED if currently NEW or QUALIFIED
      if (['NEW', 'QUALIFIED'].includes(lead.pipelineStage)) {
        lead.pipelineStage = 'CONTACTED';
      }
      
      // Auto create a follow-up 3 days later
      const nextDate = new Date(Date.now() + 3 * 86400000).toISOString();
      lead.nextFollowUp = nextDate;

      followUpsDatabase.unshift({
        id: `fu-${Date.now()}`,
        leadId: lead.id,
        companyName: lead.companyName,
        organizationId: currentOrg.id,
        title: `Follow-up #1 with ${lead.companyName}`,
        dueDate: nextDate,
        channel: msg.channel,
        status: 'pending',
        notes: `Follow up on previously sent ${msg.channel} outreach pitch.`,
        createdAt: new Date().toISOString(),
      });

      activitiesDatabase.unshift({
        id: `act-${Date.now()}`,
        leadId: lead.id,
        companyName: lead.companyName,
        type: 'message_sent',
        title: `Outreach sent via ${msg.channel.toUpperCase()}`,
        description: `Sent pitch to ${lead.companyName}. Auto-scheduled 3-day follow-up.`,
        createdAt: new Date().toISOString(),
      });
    }

    res.json({ success: true, message: msg, lead });
  });

  // 6. Follow-ups Management
  app.get('/api/followups', (req, res) => {
    res.json(followUpsDatabase);
  });

  app.post('/api/followups', (req, res) => {
    const { leadId, title, dueDate, channel, notes } = req.body;
    const lead = leadsDatabase.find(l => l.id === leadId);

    const newFollowUp: FollowUp = {
      id: `fu-${Date.now()}`,
      leadId,
      companyName: lead?.companyName || 'Lead',
      organizationId: currentOrg.id,
      title: title || `Follow up with ${lead?.companyName || 'prospect'}`,
      dueDate: dueDate || new Date(Date.now() + 24 * 3600000).toISOString(),
      channel: channel || 'email',
      status: 'pending',
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    followUpsDatabase.unshift(newFollowUp);
    if (lead) {
      lead.nextFollowUp = newFollowUp.dueDate;
    }

    res.status(201).json(newFollowUp);
  });

  app.put('/api/followups/:id/complete', (req, res) => {
    const fu = followUpsDatabase.find(f => f.id === req.params.id);
    if (!fu) {
      return res.status(404).json({ error: 'Follow-up not found' });
    }

    fu.status = 'completed';
    fu.completedAt = new Date().toISOString();

    activitiesDatabase.unshift({
      id: `act-${Date.now()}`,
      leadId: fu.leadId,
      companyName: fu.companyName,
      type: 'followup_completed',
      title: 'Follow-up completed',
      description: fu.title,
      createdAt: new Date().toISOString(),
    });

    res.json(fu);
  });

  // 7. Pipeline Management
  app.get('/api/pipeline', (req, res) => {
    const stages: PipelineStageKey[] = [
      'NEW',
      'QUALIFIED',
      'CONTACTED',
      'REPLIED',
      'MEETING',
      'PROPOSAL',
      'WON',
      'LOST'
    ];

    const grouped: Record<PipelineStageKey, Lead[]> = {
      NEW: [],
      QUALIFIED: [],
      CONTACTED: [],
      REPLIED: [],
      MEETING: [],
      PROPOSAL: [],
      WON: [],
      LOST: [],
    };

    for (const lead of leadsDatabase) {
      if (grouped[lead.pipelineStage]) {
        grouped[lead.pipelineStage].push(lead);
      } else {
        grouped.NEW.push(lead);
      }
    }

    res.json({ stages, grouped });
  });

  app.put('/api/pipeline/move', (req, res) => {
    const { leadId, stage } = req.body;
    const lead = leadsDatabase.find(l => l.id === leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const previousStage = lead.pipelineStage;
    lead.pipelineStage = stage;
    lead.updatedAt = new Date().toISOString();

    activitiesDatabase.unshift({
      id: `act-${Date.now()}`,
      leadId: lead.id,
      companyName: lead.companyName,
      type: 'stage_updated',
      title: `Moved to ${stage}`,
      description: `Prospect updated from ${previousStage} to ${stage}.`,
      createdAt: new Date().toISOString(),
    });

    res.json({ success: true, lead });
  });

  // 8. AI Sales Assistant
  app.post('/api/assistant', async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    try {
      const response = await GeminiService.askAssistant(message, {
        leads: leadsDatabase,
        org: currentOrg,
        metrics: getDashboardMetrics(),
        followUps: followUpsDatabase,
      });

      res.json({ reply: response });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI assistant error' });
    }
  });

  // 9. Billing & Subscription Management
  app.get('/api/billing', (req, res) => {
    res.json({
      subscription,
      plans: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          leadLimit: 25,
          aiAnalyses: 50,
          features: ['25 leads/month', 'Basic lead scoring', 'Manual outreach generator', 'CRM pipeline']
        },
        {
          id: 'starter',
          name: 'Starter',
          price: 29,
          leadLimit: 250,
          aiAnalyses: 300,
          features: ['250 leads/month', 'Full AI website audits', 'WhatsApp & Email generation', 'CRM & Follow-up reminders', 'Priority data freshness']
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 79,
          popular: true,
          leadLimit: 1000,
          aiAnalyses: 1500,
          features: ['1,000 leads/month', 'Unlimited AI website audits', 'Multi-channel outreach sequences', 'Sales Assistant AI', 'CSV/CRM export']
        },
        {
          id: 'agency',
          name: 'Agency',
          price: 199,
          leadLimit: 5000,
          aiAnalyses: 10000,
          features: ['5,000 leads/month', 'Unlimited team seats', 'White-label reporting', 'API & Webhook access', 'Dedicated account manager']
        }
      ]
    });
  });

  app.post('/api/billing/upgrade', (req, res) => {
    const { plan } = req.body;
    const planLimits: Record<string, { leads: number; analyses: number }> = {
      free: { leads: 25, analyses: 50 },
      starter: { leads: 250, analyses: 300 },
      pro: { leads: 1000, analyses: 1500 },
      agency: { leads: 5000, analyses: 10000 },
    };

    if (planLimits[plan]) {
      subscription.plan = plan;
      subscription.leadsLimit = planLimits[plan].leads;
      subscription.aiAnalysesLimit = planLimits[plan].analyses;
      return res.json({ success: true, subscription });
    }

    res.status(400).json({ error: 'Invalid plan selected' });
  });

  // 10. Activities feed
  app.get('/api/activities', (req, res) => {
    res.json(activitiesDatabase.slice(0, 30));
  });

  // -------------------------------------------------------------
  // VITE DEVELOPMENT MIDDLEWARE / PRODUCTION STATIC SERVING
  // -------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LeadPilot AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start LeadPilot AI server:', err);
  process.exit(1);
});
