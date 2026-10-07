export type PipelineStageKey = 
  | 'NEW'
  | 'QUALIFIED'
  | 'CONTACTED'
  | 'REPLIED'
  | 'MEETING'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST';

export type OpportunityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type OutreachChannel = 'email' | 'linkedin' | 'whatsapp';

export type OutreachTone = 'friendly' | 'direct' | 'consultative' | 'urgent';

export type PlanType = 'free' | 'starter' | 'pro' | 'agency';

export interface UserProfile {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'owner' | 'admin' | 'member';
}

export interface Organization {
  id: string;
  name: string;
  businessType: string;
  country: string;
  targetCountries: string[];
  targetIndustries: string[];
  idealCustomerProfile: string;
  servicesOffered: string[];
  preferredLanguage: string;
  monthlyLeadTarget: number;
  onboardingCompleted: boolean;
}

export interface Lead {
  id: string;
  organizationId: string;
  companyName: string;
  industry: string;
  country: string;
  city: string;
  address?: string;
  website: string;
  email?: string;
  phone?: string;
  googleRating: number;
  reviewCount: number;
  leadScore: number;
  websiteScore: number;
  digitalPresenceScore: number;
  opportunityLevel: OpportunityLevel;
  hasWhatsapp: boolean;
  hasEmail: boolean;
  hasSocial: boolean;
  pipelineStage: PipelineStageKey;
  estimatedValue: number;
  notes: string;
  tags: string[];
  lastContactedAt?: string | null;
  nextFollowUp?: string | null;
  followUpCount: number;
  isDemo?: boolean;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadAnalysis {
  id: string;
  leadId: string;
  websiteScore: number;
  mobileScore: number;
  pageSpeedScore: number;
  seoScore: number;
  strengths: string[];
  weaknesses: string[];
  missedOpportunities: string[];
  recommendedImprovements: string[];
  recommendedOffer: string;
  trustSignals: {
    hasSsl: boolean;
    hasReviewsDisplayed: boolean;
    hasClearAddress: boolean;
    hasPrivacyPolicy: boolean;
  };
  ctaAnalysis: string;
  whatsappStatus: string;
  techStack: string[];
  rawAiSummary?: string;
  analyzedAt: string;
}

export interface OutreachMessage {
  id: string;
  leadId: string;
  organizationId: string;
  channel: OutreachChannel;
  tone: OutreachTone;
  language: string;
  subject?: string;
  body: string;
  serviceHighlighted: string;
  callToAction: string;
  status: 'draft' | 'ready' | 'sent';
  sentAt?: string | null;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  companyName?: string;
  organizationId: string;
  title: string;
  dueDate: string;
  channel: OutreachChannel;
  status: 'pending' | 'completed' | 'canceled';
  notes?: string;
  completedAt?: string | null;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  leadId?: string;
  companyName?: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface SubscriptionUsage {
  plan: PlanType;
  status: 'active' | 'trialing' | 'canceled';
  leadsLimit: number;
  leadsUsedThisMonth: number;
  aiAnalysesLimit: number;
  aiAnalysesUsed: number;
  billingPeriodEnd: string;
}

export interface LeadSearchParams {
  country?: string;
  city?: string;
  industry?: string;
  businessType?: string;
  minRating?: number;
  websiteQuality?: 'all' | 'weak' | 'average' | 'good';
  hasWhatsapp?: boolean;
  hasEmail?: boolean;
  hasSocial?: boolean;
  minLeadScore?: number;
  query?: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  contacted: number;
  replies: number;
  meetings: number;
  customers: number;
  pipelineValue: number;
  conversionRate: number;
  outreachSentCount: number;
  followUpsDueToday: number;
}
