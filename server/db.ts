import { 
  Organization, 
  UserProfile, 
  Lead, 
  LeadAnalysis, 
  OutreachMessage, 
  FollowUp, 
  ActivityItem, 
  SubscriptionUsage,
  DashboardMetrics,
  PipelineStageKey
} from '../src/types/index.ts';

// Initial organization state (seeded for demo agency "Anadolu BT" as requested in user prompt)
export let currentOrg: Organization = {
  id: 'org-anadolu-1',
  name: 'Anadolu BT',
  businessType: 'Digital agency',
  country: 'United Kingdom',
  targetCountries: ['United Kingdom', 'Ireland', 'United States'],
  targetIndustries: ['Roofing', 'Construction', 'Real Estate', 'Dental Clinics', 'Plumbing'],
  idealCustomerProfile: 'Local service businesses with high customer value, 4.0+ Google rating, but outdated website and lacking WhatsApp automation or modern conversion funnels.',
  servicesOffered: ['Web design', 'Google Ads', 'Social media', 'AI WhatsApp automation', 'SEO optimization'],
  preferredLanguage: 'English',
  monthlyLeadTarget: 250,
  onboardingCompleted: true,
};

export let currentUser: UserProfile = {
  id: 'user-1',
  organizationId: 'org-anadolu-1',
  email: 'ikarokhill@gmail.com',
  fullName: 'Alex Vance',
  role: 'owner',
};

export let subscription: SubscriptionUsage = {
  plan: 'starter',
  status: 'active',
  leadsLimit: 250,
  leadsUsedThisMonth: 183,
  aiAnalysesLimit: 300,
  aiAnalysesUsed: 142,
  billingPeriodEnd: new Date(Date.now() + 24 * 86400000).toISOString(),
};

// Realistic seed leads (all clearly marked with isDemo: true as required by prompt)
export let leadsDatabase: Lead[] = [
  {
    id: 'lead-1',
    organizationId: 'org-anadolu-1',
    companyName: 'Manchester Roof Services',
    industry: 'Roofing',
    country: 'United Kingdom',
    city: 'Manchester',
    address: '42 Deansgate, Manchester M3 2FW',
    website: 'https://manchesterroofservices-demo.co.uk',
    email: 'info@manchesterroofservices-demo.co.uk',
    phone: '+44 161 832 9901',
    googleRating: 4.8,
    reviewCount: 94,
    leadScore: 92,
    websiteScore: 54,
    digitalPresenceScore: 61,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: false,
    pipelineStage: 'QUALIFIED',
    estimatedValue: 3200,
    notes: 'Outstanding Google reviews (4.8★). However, their website takes 5.2s to load on mobile, has no WhatsApp booking widget, and has no clear call to action on emergency roofing.',
    tags: ['High Value', 'Weak Mobile', 'Needs WhatsApp'],
    lastContactedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + 4 * 3600000).toISOString(), // due today!
    followUpCount: 1,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'lead-2',
    organizationId: 'org-anadolu-1',
    companyName: 'Apex Dental Care & Implant Clinic',
    industry: 'Dental Clinics',
    country: 'United Kingdom',
    city: 'London',
    address: '18 Harley Street, Marylebone, London W1G 9PF',
    website: 'https://apexdentalcare-demo.co.uk',
    email: 'reception@apexdentalcare-demo.co.uk',
    phone: '+44 20 7935 4421',
    googleRating: 4.9,
    reviewCount: 156,
    leadScore: 89,
    websiteScore: 48,
    digitalPresenceScore: 58,
    opportunityLevel: 'HIGH',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: true,
    pipelineStage: 'CONTACTED',
    estimatedValue: 4500,
    notes: 'High-ticket implant treatments. Their booking button opens a static PDF form instead of an interactive calendar. High ROI opportunity for a modern booking flow.',
    tags: ['High Ticket', 'Bad Booking Flow', 'Google Ads Candidate'],
    lastContactedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + 28 * 3600000).toISOString(),
    followUpCount: 1,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'lead-3',
    organizationId: 'org-anadolu-1',
    companyName: 'Bespoke Oak Construction',
    industry: 'Construction',
    country: 'United Kingdom',
    city: 'Birmingham',
    address: '110 Colmore Row, Birmingham B3 3AG',
    website: 'https://bespokeoakconstruction-demo.co.uk',
    email: 'contact@bespokeoak-demo.co.uk',
    phone: '+44 121 236 8800',
    googleRating: 4.6,
    reviewCount: 42,
    leadScore: 84,
    websiteScore: 42,
    digitalPresenceScore: 49,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: false,
    pipelineStage: 'REPLIED',
    estimatedValue: 6000,
    notes: 'Replied asking for portfolio examples of previous construction clients. Interested in automated quote calculation and portfolio gallery redesign.',
    tags: ['Replied', 'Needs Proposal', 'High Budget'],
    lastContactedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + 8 * 3600000).toISOString(),
    followUpCount: 2,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'lead-4',
    organizationId: 'org-anadolu-1',
    companyName: 'Prime Kensington Real Estate',
    industry: 'Real Estate',
    country: 'United Kingdom',
    city: 'London',
    address: '74 Kensington High St, London W8 4PE',
    website: 'https://primekensingtonrealty-demo.co.uk',
    email: 'properties@primekensington-demo.co.uk',
    phone: '+44 20 7937 5510',
    googleRating: 4.7,
    reviewCount: 88,
    leadScore: 94,
    websiteScore: 62,
    digitalPresenceScore: 68,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    pipelineStage: 'MEETING',
    estimatedValue: 7500,
    notes: 'Meeting scheduled with Managing Partner this Thursday at 2:00 PM. Pitching WhatsApp AI Lead Qualifier + luxury property listing landing pages.',
    tags: ['Meeting Booked', 'AI Qualifier Pitch', 'VIP'],
    lastContactedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + 48 * 3600000).toISOString(),
    followUpCount: 3,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 22 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'lead-5',
    organizationId: 'org-anadolu-1',
    companyName: 'Mersey Commercial Plumbing',
    industry: 'Plumbing',
    country: 'United Kingdom',
    city: 'Liverpool',
    address: '88 Albert Dock, Liverpool L3 4AQ',
    website: 'https://merseyplumbing-demo.co.uk',
    email: 'support@merseyplumbing-demo.co.uk',
    phone: '+44 151 709 1144',
    googleRating: 4.5,
    reviewCount: 63,
    leadScore: 78,
    websiteScore: 50,
    digitalPresenceScore: 52,
    opportunityLevel: 'MEDIUM',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: false,
    pipelineStage: 'NEW',
    estimatedValue: 2400,
    notes: 'Discovered via Google Search. Solid local emergency plumbing business. Website is not mobile responsive and has no direct click-to-call on primary viewport.',
    tags: ['New Discovery', 'Mobile Fix', 'Local SEO'],
    lastContactedAt: null,
    nextFollowUp: new Date(Date.now() + 12 * 3600000).toISOString(),
    followUpCount: 0,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'lead-6',
    organizationId: 'org-anadolu-1',
    companyName: 'Cotswolds Eco Solar Ltd',
    industry: 'Construction',
    country: 'United Kingdom',
    city: 'Bristol',
    address: '24 Park Street, Bristol BS1 5JA',
    website: 'https://cotswoldsecosolar-demo.co.uk',
    email: 'info@cotswoldseco-demo.co.uk',
    phone: '+44 117 929 3320',
    googleRating: 4.9,
    reviewCount: 112,
    leadScore: 91,
    websiteScore: 58,
    digitalPresenceScore: 65,
    opportunityLevel: 'HIGH',
    hasWhatsapp: true,
    hasEmail: true,
    hasSocial: true,
    pipelineStage: 'WON',
    estimatedValue: 5200,
    notes: 'Contract signed! Retainer client for website overhaul and WhatsApp lead capture system. Estimated MRR: $1,200 + $4,000 setup.',
    tags: ['Closed Won', 'Success Story', 'Retainer'],
    lastContactedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    nextFollowUp: null,
    followUpCount: 4,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'lead-7',
    organizationId: 'org-anadolu-1',
    companyName: 'St. Peter Square Dental Practice',
    industry: 'Dental Clinics',
    country: 'United Kingdom',
    city: 'Manchester',
    address: '15 St Peter Sq, Manchester M2 3DF',
    website: 'https://stpetersquaredental-demo.co.uk',
    email: 'hello@stpetersquaredental-demo.co.uk',
    phone: '+44 161 236 0099',
    googleRating: 4.7,
    reviewCount: 78,
    leadScore: 82,
    websiteScore: 65,
    digitalPresenceScore: 60,
    opportunityLevel: 'MEDIUM',
    hasWhatsapp: false,
    hasEmail: true,
    hasSocial: true,
    pipelineStage: 'PROPOSAL',
    estimatedValue: 3800,
    notes: 'Proposal submitted for Invisalign campaign landing page and 24/7 AI chatbot assistant.',
    tags: ['Proposal Sent', 'Dental', 'Manchester'],
    lastContactedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + 6 * 3600000).toISOString(),
    followUpCount: 2,
    isDemo: true,
    source: 'discovery',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  }
];

export let analysesDatabase: Record<string, LeadAnalysis> = {
  'lead-1': {
    id: 'analysis-lead-1',
    leadId: 'lead-1',
    websiteScore: 54,
    mobileScore: 46,
    pageSpeedScore: 51,
    seoScore: 62,
    strengths: [
      'Strong local reputation (4.8 rating with 94 genuine customer reviews)',
      'Clear list of roofing services (slating, chimney repair, flat roofing)',
      'SSL certificate installed and working'
    ],
    weaknesses: [
      'Weak mobile CTA - "Call Us" button is hidden below 3 screen scrolls',
      'No instant WhatsApp booking or emergency quote button',
      'Hero section uses slow uncompressed 4MB stock photos causing 5.2s LCP',
      'Missing schema markup for LocalBusiness / RoofContractor'
    ],
    missedOpportunities: [
      'Emergency roof leak requests currently fall through cracks after 5:00 PM',
      'No before/after interactive project gallery to build immediate trust',
      'Lacks Google Review integration badge directly on homepage hero'
    ],
    recommendedImprovements: [
      'Implement sticky mobile bottom bar with "Call Now" and "Instant WhatsApp Quote"',
      'Upgrade hero performance to achieve sub-1.2s mobile loading speed',
      'Deploy 24/7 AI WhatsApp assistant to automatically estimate roof repair costs and book surveys'
    ],
    recommendedOffer: 'Mobile Conversion Overhaul + 24/7 AI WhatsApp Repair Assistant + Local Google Ads Pack',
    trustSignals: {
      hasSsl: true,
      hasReviewsDisplayed: false,
      hasClearAddress: true,
      hasPrivacyPolicy: true,
    },
    ctaAnalysis: 'Main CTA is "Submit Inquiry" with a 7-field form that experiences high drop-off on mobile devices.',
    whatsappStatus: 'Phone number listed is landline only; no instant WhatsApp chat link detected.',
    techStack: ['WordPress 5.8', 'Elementor', 'Apache', 'jQuery'],
    rawAiSummary: 'Manchester Roof Services has exceptional offline reputation and stellar reviews, but loses high-value emergency leads due to friction on mobile screens. A conversion refresh and WhatsApp assistant will directly multiply their inbound inquiries.',
    analyzedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  'lead-2': {
    id: 'analysis-lead-2',
    leadId: 'lead-2',
    websiteScore: 48,
    mobileScore: 42,
    pageSpeedScore: 45,
    seoScore: 55,
    strengths: [
      'Prestige Marylebone London location',
      '156 verified Google Reviews at 4.9 stars',
      'Comprehensive doctor bios and clinical credentials'
    ],
    weaknesses: [
      'Appointment booking directs to a static downloadable PDF',
      'No WhatsApp consultation button for private cosmetic dentistry inquiries',
      'No clear pricing transparency or finance calculator for implants'
    ],
    missedOpportunities: [
      'High-intent patients seeking dental implants want immediate estimate ranges',
      'Lacks video testimonials or high-resolution smile gallery',
      'Zero lead capture for out-of-hours visitors'
    ],
    recommendedImprovements: [
      'Interactive cosmetic dentistry price calculator',
      'One-click WhatsApp chat for confidential smile assessments',
      'Speed optimization and modern typography revamp'
    ],
    recommendedOffer: 'Dental Lead Capture Funnel + Smile Assessment WhatsApp Bot',
    trustSignals: {
      hasSsl: true,
      hasReviewsDisplayed: true,
      hasClearAddress: true,
      hasPrivacyPolicy: true,
    },
    ctaAnalysis: 'Call to action requires downloading PDF form and emailing it manually.',
    whatsappStatus: 'No WhatsApp integration found.',
    techStack: ['Wix', 'Google Analytics 4'],
    rawAiSummary: 'High-margin private dental practice with significant patient leakage at the appointment booking stage.',
    analyzedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  }
};

export let outreachDatabase: OutreachMessage[] = [
  {
    id: 'msg-1',
    leadId: 'lead-1',
    organizationId: 'org-anadolu-1',
    channel: 'email',
    tone: 'consultative',
    language: 'English',
    subject: 'A quick idea for Manchester Roof Services',
    body: `Hi Dave,

I took a quick look at your website and noticed you have an outstanding 4.8-star reputation with 94 reviews across Manchester — which is really impressive.

However, while checking the mobile site, I noticed emergency roofing inquiries take over 5 seconds to load, and there is no direct WhatsApp button for homeowners needing an urgent quote after hours.

We recently helped a specialist contractor in the North West add a 1-click WhatsApp quote assistant, and their weekend booking rate jumped by 42%.

Would you be open to a 2-minute video showing where leads are dropping off and how we could fix it for you?

Best regards,
Alex Vance
Anadolu BT`,
    serviceHighlighted: 'Mobile Conversion Overhaul + 24/7 AI WhatsApp Repair Assistant',
    callToAction: 'Would you be open to a quick 2-minute walkthrough video?',
    status: 'sent',
    sentAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  }
];

export let followUpsDatabase: FollowUp[] = [
  {
    id: 'fu-1',
    leadId: 'lead-1',
    companyName: 'Manchester Roof Services',
    organizationId: 'org-anadolu-1',
    title: 'Follow up with Manchester Roof Services on WhatsApp quote video',
    dueDate: new Date(Date.now() + 2 * 3600000).toISOString(), // due in 2 hours today!
    channel: 'email',
    status: 'pending',
    notes: 'Sent initial cold email 3 days ago. If no reply by 2 PM, send short follow-up on LinkedIn or WhatsApp.',
    completedAt: null,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'fu-2',
    leadId: 'lead-3',
    companyName: 'Bespoke Oak Construction',
    organizationId: 'org-anadolu-1',
    title: 'Send portfolio case studies to Bespoke Oak Construction',
    dueDate: new Date(Date.now() + 6 * 3600000).toISOString(),
    channel: 'email',
    status: 'pending',
    notes: 'Replied to outreach asking for similar construction projects before signing off.',
    completedAt: null,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'fu-3',
    leadId: 'lead-7',
    companyName: 'St. Peter Square Dental Practice',
    organizationId: 'org-anadolu-1',
    title: 'Check in on submitted proposal',
    dueDate: new Date(Date.now() + 24 * 3600000).toISOString(),
    channel: 'email',
    status: 'pending',
    notes: 'Proposal sent 4 days ago for £3,800 landing page revamp.',
    completedAt: null,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  }
];

export let activitiesDatabase: ActivityItem[] = [
  {
    id: 'act-1',
    leadId: 'lead-1',
    companyName: 'Manchester Roof Services',
    type: 'message_sent',
    title: 'Outreach email sent',
    description: 'Sent personalized pitch focusing on mobile conversion and WhatsApp quotes.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'act-2',
    leadId: 'lead-3',
    companyName: 'Bespoke Oak Construction',
    type: 'stage_updated',
    title: 'Moved to Replied',
    description: 'Prospect requested case studies and previous build examples.',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'act-3',
    leadId: 'lead-4',
    companyName: 'Prime Kensington Real Estate',
    type: 'stage_updated',
    title: 'Meeting booked',
    description: 'Executive demonstration booked for Thursday 2:00 PM.',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'act-4',
    leadId: 'lead-6',
    companyName: 'Cotswolds Eco Solar Ltd',
    type: 'deal_won',
    title: 'Closed Deal ($5,200)',
    description: 'Client accepted proposal for full website rebuild & WhatsApp qualification.',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  }
];

export function getDashboardMetrics(): DashboardMetrics {
  const totalLeads = leadsDatabase.length;
  const newLeads = leadsDatabase.filter(l => l.pipelineStage === 'NEW').length;
  const contacted = leadsDatabase.filter(l => ['CONTACTED', 'REPLIED', 'MEETING', 'PROPOSAL', 'WON'].includes(l.pipelineStage)).length;
  const replies = leadsDatabase.filter(l => ['REPLIED', 'MEETING', 'PROPOSAL', 'WON'].includes(l.pipelineStage)).length;
  const meetings = leadsDatabase.filter(l => ['MEETING', 'PROPOSAL', 'WON'].includes(l.pipelineStage)).length;
  const customers = leadsDatabase.filter(l => l.pipelineStage === 'WON').length;
  
  // Pipeline estimated value: all leads in active stages (excluding WON and LOST)
  const pipelineValue = leadsDatabase
    .filter(l => !['LOST'].includes(l.pipelineStage))
    .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

  const conversionRate = totalLeads > 0 ? Number(((customers / totalLeads) * 100).toFixed(1)) : 0;
  const outreachSentCount = outreachDatabase.filter(m => m.status === 'sent').length;
  const followUpsDueToday = followUpsDatabase.filter(f => f.status === 'pending').length;

  return {
    totalLeads,
    newLeads,
    contacted,
    replies,
    meetings,
    customers,
    pipelineValue,
    conversionRate,
    outreachSentCount,
    followUpsDueToday,
  };
}
