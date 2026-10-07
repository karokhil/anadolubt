import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Lead, 
  LeadAnalysis, 
  Organization, 
  UserProfile, 
  DashboardMetrics, 
  FollowUp, 
  SubscriptionUsage,
  PipelineStageKey 
} from '../types/index.ts';
import { api } from '../services/api.ts';
import { translations, Language, Translations } from '../i18n/translations.ts';

export type ActiveTab = 'dashboard' | 'leads' | 'search' | 'pipeline' | 'settings';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation & View
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  
  // Organization & User
  user: UserProfile | null;
  org: Organization | null;
  updateOrg: (data: Partial<Organization>) => Promise<void>;
  
  // Metrics & Data
  metrics: DashboardMetrics | null;
  leads: Lead[];
  followUps: FollowUp[];
  subscription: SubscriptionUsage | null;
  isLoading: boolean;
  
  // Actions
  refreshData: () => Promise<void>;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  
  // Modals
  leadModalOpen: boolean;
  setLeadModalOpen: (open: boolean) => void;
  activeLeadTab: 'details' | 'analysis' | 'outreach' | 'followups' | 'activities';
  setActiveLeadTab: (tab: 'details' | 'analysis' | 'outreach' | 'followups' | 'activities') => void;
  
  addLeadModalOpen: boolean;
  setAddLeadModalOpen: (open: boolean) => void;
  
  aiAssistantModalOpen: boolean;
  setAiAssistantModalOpen: (open: boolean) => void;
  assistantInitialPrompt: string;
  setAssistantInitialPrompt: (prompt: string) => void;

  onboardingModalOpen: boolean;
  setOnboardingModalOpen: (open: boolean) => void;

  billingModalOpen: boolean;
  setBillingModalOpen: (open: boolean) => void;

  // Lead operations
  openLeadDetails: (lead: Lead, tab?: 'details' | 'analysis' | 'outreach' | 'followups' | 'activities') => void;
  updateLeadStage: (leadId: string, stage: PipelineStageKey) => Promise<void>;
  saveLeadFromDiscovery: (leadData: Partial<Lead>, triggerAnalysis?: boolean) => Promise<void>;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('leadpilot_lang') : null;
    return (saved as Language) || 'tr';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('leadpilot_lang', lang);
    }
  }, []);

  const t = translations[language] || translations.tr;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionUsage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals & Selected Lead
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [activeLeadTab, setActiveLeadTab] = useState<'details' | 'analysis' | 'outreach' | 'followups' | 'activities'>('details');
  const [addLeadModalOpen, setAddLeadModalOpen] = useState<boolean>(false);
  const [aiAssistantModalOpen, setAiAssistantModalOpen] = useState<boolean>(false);
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string>('');
  const [onboardingModalOpen, setOnboardingModalOpen] = useState<boolean>(false);
  const [billingModalOpen, setBillingModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [authData, metricsData, leadsData, fuData, billingData] = await Promise.all([
        api.getAuth().catch(() => null),
        api.getMetrics().catch(() => null),
        api.getLeads().catch(() => []),
        api.getFollowUps().catch(() => []),
        api.getBilling().catch(() => null),
      ]);

      if (authData) {
        setUser(authData.user);
        setOrg(authData.organization);
      }
      if (metricsData) setMetrics(metricsData);
      if (leadsData) setLeads(leadsData);
      if (fuData) setFollowUps(fuData);
      if (billingData) setSubscription(billingData.subscription);
    } catch (err) {
      console.error('Error loading LeadPilot data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateOrg = async (data: Partial<Organization>) => {
    try {
      const res = await api.updateOrganization(data);
      if (res.success) {
        setOrg(res.organization);
        showToast('Business profile updated successfully', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile', 'error');
    }
  };

  const openLeadDetails = (lead: Lead, tab: 'details' | 'analysis' | 'outreach' | 'followups' | 'activities' = 'details') => {
    setSelectedLead(lead);
    setActiveLeadTab(tab);
    setLeadModalOpen(true);
  };

  const updateLeadStage = async (leadId: string, stage: PipelineStageKey) => {
    try {
      await api.movePipelineStage(leadId, stage);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, pipelineStage: stage } : l));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, pipelineStage: stage } : null);
      }
      showToast(`Pipeline updated to ${stage}`, 'success');
      // Refresh metrics silently
      api.getMetrics().then(setMetrics).catch(() => {});
    } catch (err: any) {
      showToast(err.message || 'Failed to update stage', 'error');
    }
  };

  const saveLeadFromDiscovery = async (leadData: Partial<Lead>, triggerAnalysis: boolean = false) => {
    try {
      const savedLead = await api.createLead(leadData);
      setLeads(prev => [savedLead, ...prev]);
      showToast(`${savedLead.companyName} saved to CRM!`, 'success');
      
      if (triggerAnalysis) {
        openLeadDetails(savedLead, 'analysis');
      }

      api.getMetrics().then(setMetrics).catch(() => {});
      api.getBilling().then(b => setSubscription(b.subscription)).catch(() => {});
    } catch (err: any) {
      showToast(err.message || 'Failed to save lead', 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        user,
        org,
        updateOrg,
        metrics,
        leads,
        followUps,
        subscription,
        isLoading,
        refreshData,
        selectedLead,
        setSelectedLead,
        leadModalOpen,
        setLeadModalOpen,
        activeLeadTab,
        setActiveLeadTab,
        addLeadModalOpen,
        setAddLeadModalOpen,
        aiAssistantModalOpen,
        setAiAssistantModalOpen,
        assistantInitialPrompt,
        setAssistantInitialPrompt,
        onboardingModalOpen,
        setOnboardingModalOpen,
        billingModalOpen,
        setBillingModalOpen,
        openLeadDetails,
        updateLeadStage,
        saveLeadFromDiscovery,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
