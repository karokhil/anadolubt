import { 
  Lead, 
  LeadAnalysis, 
  OutreachMessage, 
  FollowUp, 
  Organization, 
  UserProfile, 
  DashboardMetrics, 
  SubscriptionUsage,
  LeadSearchParams,
  PipelineStageKey
} from '../types/index.ts';

const API_BASE = '/api';

export const api = {
  // Auth & Org
  async getAuth(): Promise<{ user: UserProfile; organization: Organization }> {
    const res = await fetch(`${API_BASE}/auth/me`);
    if (!res.ok) throw new Error('Failed to fetch auth');
    return res.json();
  },

  async updateOrganization(data: Partial<Organization>): Promise<{ success: boolean; organization: Organization }> {
    const res = await fetch(`${API_BASE}/organization`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update organization');
    return res.json();
  },

  // Dashboard
  async getMetrics(): Promise<DashboardMetrics> {
    const res = await fetch(`${API_BASE}/metrics`);
    if (!res.ok) throw new Error('Failed to fetch metrics');
    return res.json();
  },

  // Leads
  async getLeads(filters?: {
    query?: string;
    industry?: string;
    country?: string;
    city?: string;
    stage?: string;
    minRating?: number;
    minLeadScore?: number;
    opportunityLevel?: string;
  }): Promise<Lead[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          params.append(key, String(val));
        }
      });
    }
    const res = await fetch(`${API_BASE}/leads?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
  },

  async getLead(id: string): Promise<{
    lead: Lead;
    analysis: LeadAnalysis | null;
    messages: OutreachMessage[];
    followUps: FollowUp[];
    activities: any[];
  }> {
    const res = await fetch(`${API_BASE}/leads/${id}`);
    if (!res.ok) throw new Error('Failed to fetch lead');
    return res.json();
  },

  async createLead(data: Partial<Lead>): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create lead');
    }
    return res.json();
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update lead');
    return res.json();
  },

  async deleteLead(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
  },

  // Discovery
  async searchDiscoveryLeads(params: LeadSearchParams): Promise<{
    results: any[];
    count: number;
    provider: string;
    readyForRealApi: boolean;
  }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, String(val));
      }
    });
    const res = await fetch(`${API_BASE}/leads/search?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to discover leads');
    return res.json();
  },

  // AI Website Analysis
  async analyzeLeadWebsite(leadId: string): Promise<LeadAnalysis> {
    const res = await fetch(`${API_BASE}/leads/${leadId}/analyze`, {
      method: 'POST',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to analyze website');
    }
    return res.json();
  },

  // AI Outreach Generation
  async generateOutreach(payload: {
    leadId: string;
    channel: 'email' | 'linkedin' | 'whatsapp';
    tone: 'friendly' | 'direct' | 'consultative' | 'urgent';
    language: string;
    service?: string;
    callToAction?: string;
  }): Promise<OutreachMessage> {
    const res = await fetch(`${API_BASE}/outreach/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to generate outreach');
    }
    return res.json();
  },

  async sendOutreachMessage(messageId: string): Promise<{ success: boolean; message: OutreachMessage; lead: Lead }> {
    const res = await fetch(`${API_BASE}/outreach/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId }),
    });
    if (!res.ok) throw new Error('Failed to send outreach');
    return res.json();
  },

  // Follow-ups
  async getFollowUps(): Promise<FollowUp[]> {
    const res = await fetch(`${API_BASE}/followups`);
    if (!res.ok) throw new Error('Failed to fetch follow-ups');
    return res.json();
  },

  async createFollowUp(data: {
    leadId: string;
    title: string;
    dueDate: string;
    channel?: string;
    notes?: string;
  }): Promise<FollowUp> {
    const res = await fetch(`${API_BASE}/followups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to schedule follow-up');
    return res.json();
  },

  async completeFollowUp(id: string): Promise<FollowUp> {
    const res = await fetch(`${API_BASE}/followups/${id}/complete`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to complete follow-up');
    return res.json();
  },

  // Pipeline
  async getPipeline(): Promise<{
    stages: PipelineStageKey[];
    grouped: Record<PipelineStageKey, Lead[]>;
  }> {
    const res = await fetch(`${API_BASE}/pipeline`);
    if (!res.ok) throw new Error('Failed to fetch pipeline');
    return res.json();
  },

  async movePipelineStage(leadId: string, stage: PipelineStageKey): Promise<{ success: boolean; lead: Lead }> {
    const res = await fetch(`${API_BASE}/pipeline/move`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, stage }),
    });
    if (!res.ok) throw new Error('Failed to move lead in pipeline');
    return res.json();
  },

  // AI Assistant
  async askAssistant(message: string): Promise<{ reply: string }> {
    const res = await fetch(`${API_BASE}/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to get answer from AI assistant');
    }
    return res.json();
  },

  // Billing & Subscriptions
  async getBilling(): Promise<{ subscription: SubscriptionUsage; plans: any[] }> {
    const res = await fetch(`${API_BASE}/billing`);
    if (!res.ok) throw new Error('Failed to fetch billing info');
    return res.json();
  },

  async upgradePlan(plan: string): Promise<{ success: boolean; subscription: SubscriptionUsage }> {
    const res = await fetch(`${API_BASE}/billing/upgrade`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) throw new Error('Failed to update plan');
    return res.json();
  },

  // Activities
  async getActivities(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/activities`);
    if (!res.ok) throw new Error('Failed to fetch activities');
    return res.json();
  }
};
