import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { 
  Lead, 
  LeadAnalysis, 
  OutreachMessage, 
  FollowUp, 
  PipelineStageKey,
  OutreachChannel,
  OutreachTone
} from '../types/index.ts';
import { 
  X, 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  Star, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  History, 
  Copy, 
  Check, 
  Send, 
  Loader2, 
  ArrowUpRight,
  Flame,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const LeadDetailModal: React.FC = () => {
  const { 
    leadModalOpen, 
    setLeadModalOpen, 
    selectedLead, 
    activeLeadTab, 
    setActiveLeadTab, 
    updateLeadStage, 
    showToast,
    refreshData,
    org,
    t,
    language: appLang
  } = useApp();

  const [leadData, setLeadData] = useState<Lead | null>(null);
  const [analysis, setAnalysis] = useState<LeadAnalysis | null>(null);
  const [messages, setMessages] = useState<OutreachMessage[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  
  const [analyzing, setAnalyzing] = useState(false);

  // AI Outreach Generator Form state
  const [channel, setChannel] = useState<OutreachChannel>('email');
  const [tone, setTone] = useState<OutreachTone>('consultative');
  const [outreachLanguage, setOutreachLanguage] = useState(appLang === 'tr' ? 'Turkish' : 'English');
  const [customService, setCustomService] = useState('');
  const [customCta, setCustomCta] = useState(
    appLang === 'tr' 
      ? 'Web sitenizde tespit ettiğimiz 3 kritik dönüşüm kaçağını gösteren 2 dakikalık kısa bir video incelemesini sizinle paylaşmamı ister misiniz?' 
      : 'Would you be open to a quick 2-minute video walkthrough?'
  );
  const [generatingMessage, setGeneratingMessage] = useState(false);
  const [activeMessage, setActiveMessage] = useState<OutreachMessage | null>(null);
  const [editableBody, setEditableBody] = useState('');
  const [editableSubject, setEditableSubject] = useState('');
  const [copied, setCopied] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // New Follow-up state
  const [newFuTitle, setNewFuTitle] = useState('');
  const [newFuDate, setNewFuDate] = useState('');
  const [newFuChannel, setNewFuChannel] = useState<OutreachChannel>('email');
  const [addingFu, setAddingFu] = useState(false);

  useEffect(() => {
    if (selectedLead && leadModalOpen) {
      setLeadData(selectedLead);
      loadFullLead(selectedLead.id);
    }
  }, [selectedLead, leadModalOpen]);

  useEffect(() => {
    setOutreachLanguage(appLang === 'tr' ? 'Turkish' : 'English');
    setCustomCta(
      appLang === 'tr' 
        ? 'Web sitenizde tespit ettiğimiz 3 kritik dönüşüm kaçağını gösteren 2 dakikalık kısa bir video incelemesini sizinle paylaşmamı ister misiniz?' 
        : 'Would you be open to a quick 2-minute video walkthrough?'
    );
  }, [appLang]);

  const loadFullLead = async (id: string) => {
    try {
      const data = await api.getLead(id);
      setLeadData(data.lead);
      setAnalysis(data.analysis);
      setMessages(data.messages);
      setFollowUps(data.followUps);
      setActivities(data.activities);
      
      if (data.analysis?.recommendedOffer) {
        setCustomService(data.analysis.recommendedOffer);
      } else if (org?.servicesOffered.length) {
        setCustomService(org.servicesOffered[0]);
      }

      if (data.messages && data.messages.length > 0) {
        setActiveMessage(data.messages[0]);
        setEditableSubject(data.messages[0].subject || '');
        setEditableBody(data.messages[0].body);
      }
    } catch (err: any) {
      showToast(err.message || 'Error fetching lead details', 'error');
    }
  };

  if (!leadModalOpen || !leadData) return null;

  const handleRunAiAudit = async () => {
    setAnalyzing(true);
    try {
      const res = await api.analyzeLeadWebsite(leadData.id);
      setAnalysis(res);
      setCustomService(res.recommendedOffer);
      setLeadData(prev => prev ? { ...prev, websiteScore: res.websiteScore, opportunityLevel: res.websiteScore < 60 ? 'HIGH' : 'MEDIUM' } : null);
      showToast(appLang === 'tr' ? 'AI web sitesi denetimi başarıyla tamamlandı!' : 'AI website audit completed successfully!', 'success');
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to analyze website', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerateOutreach = async () => {
    setGeneratingMessage(true);
    try {
      const res = await api.generateOutreach({
        leadId: leadData.id,
        channel,
        tone,
        language: outreachLanguage || (appLang === 'tr' ? 'Turkish' : 'English'),
        service: customService || analysis?.recommendedOffer,
        callToAction: customCta,
      });

      setActiveMessage(res);
      setEditableSubject(res.subject || '');
      setEditableBody(res.body);
      setMessages(prev => [res, ...prev]);
      showToast(
        appLang === 'tr' ? `Kişiselleştirilmiş ${channel.toUpperCase()} mesajı üretildi!` : `AI ${channel.toUpperCase()} message generated!`, 
        'success'
      );
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to generate message', 'error');
    } finally {
      setGeneratingMessage(false);
    }
  };

  const handleCopyMessage = () => {
    const textToCopy = editableSubject ? `Subject: ${editableSubject}\n\n${editableBody}` : editableBody;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast(t.common.copied, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkAsSent = async () => {
    if (!activeMessage) return;
    setSendingMessage(true);
    try {
      const res = await api.sendOutreachMessage(activeMessage.id);
      if (res.success) {
        showToast(
          appLang === 'tr' ? `Gönderildi! Satış hunisi ilerletildi.` : `Marked as sent! Pipeline advanced.`,
          'success'
        );
        setLeadData(res.lead);
        await refreshData();
        await loadFullLead(leadData.id);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to mark as sent', 'error');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleAddFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFuTitle.trim()) return;
    setAddingFu(true);
    try {
      const res = await api.createFollowUp({
        leadId: leadData.id,
        title: newFuTitle.trim(),
        dueDate: newFuDate ? new Date(newFuDate).toISOString() : new Date(Date.now() + 3 * 86400000).toISOString(),
        channel: newFuChannel,
      });
      setFollowUps(prev => [res, ...prev]);
      setNewFuTitle('');
      showToast(appLang === 'tr' ? 'Takip görevi planlandı' : 'Follow-up reminder scheduled', 'success');
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to schedule follow-up', 'error');
    } finally {
      setAddingFu(false);
    }
  };

  const handleCompleteFollowUp = async (fuId: string) => {
    try {
      await api.completeFollowUp(fuId);
      setFollowUps(prev => prev.map(f => f.id === fuId ? { ...f, status: 'completed' } : f));
      showToast(appLang === 'tr' ? 'Görev tamamlandı' : 'Follow-up marked as completed', 'success');
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'Failed to complete follow-up', 'error');
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-4xl h-[94vh] sm:h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Header with Company info & quick scores */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-b border-neutral-100 bg-neutral-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-600/10 border border-orange-200 flex items-center justify-center text-orange-600 font-extrabold text-sm shrink-0">
              {leadData.companyName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-tight truncate">
                  {leadData.companyName}
                </h2>
                {leadData.isDemo && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-200 text-neutral-700 tracking-wide shrink-0">
                    {t.common.demoData}
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full shrink-0 ${
                  leadData.opportunityLevel === 'HIGH' 
                    ? 'bg-rose-100 text-rose-800' 
                    : leadData.opportunityLevel === 'MEDIUM' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {leadData.opportunityLevel === 'HIGH' ? t.common.high : leadData.opportunityLevel === 'MEDIUM' ? t.common.medium : t.common.low} {t.common.opportunity}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5 flex-wrap">
                <span>{leadData.industry}</span>
                <span>·</span>
                <span>{leadData.city}, {leadData.country}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {leadData.googleRating} ({leadData.reviewCount})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            {/* Pipeline Stage Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1.5 min-h-[38px] rounded-xl shadow-2xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">{t.common.stage}:</span>
              <select
                value={leadData.pipelineStage}
                onChange={e => {
                  const newStage = e.target.value as PipelineStageKey;
                  updateLeadStage(leadData.id, newStage);
                  setLeadData(prev => prev ? { ...prev, pipelineStage: newStage } : null);
                }}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-hidden cursor-pointer"
              >
                {stages.map(st => (
                  <option key={st} value={st}>{t.pipeline.stages[st] || st}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setLeadModalOpen(false)}
              className="p-2 min-h-[40px] min-w-[40px] rounded-xl text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center justify-center"
              aria-label={t.common.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Badges Banner */}
        <div className="px-4 sm:px-6 py-2 bg-white border-b border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs shrink-0">
          <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
            <span className="text-neutral-400 text-[10px] block font-bold uppercase">{t.common.leadScore}</span>
            <span className="font-extrabold text-neutral-900 text-sm sm:text-base text-orange-600">
              {leadData.leadScore} / 100
            </span>
          </div>
          <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <span className="text-neutral-400 text-[10px] block font-bold uppercase">{t.common.websiteScore}</span>
            <span className={`font-extrabold text-sm sm:text-base ${
              leadData.websiteScore < 60 ? 'text-rose-600' : 'text-neutral-900'
            }`}>
              {leadData.websiteScore} / 100
            </span>
          </div>
          <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <span className="text-neutral-400 text-[10px] block font-bold uppercase">{t.common.digitalPresence}</span>
            <span className="font-extrabold text-neutral-900 text-sm sm:text-base">
              {leadData.digitalPresenceScore} / 100
            </span>
          </div>
          <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <span className="text-neutral-400 text-[10px] block font-bold uppercase">{t.common.estValue}</span>
            <span className="font-extrabold text-emerald-600 text-sm sm:text-base">
              ${leadData.estimatedValue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 px-3 sm:px-5 bg-white overflow-x-auto no-scrollbar shrink-0 gap-1 sm:gap-2">
          {[
            { id: 'details', label: t.leadDetail.tabs.profile, icon: Building2 },
            { id: 'analysis', label: t.leadDetail.tabs.audit, icon: Sparkles, badge: analysis ? '✓' : undefined },
            { id: 'outreach', label: t.leadDetail.tabs.outreach, icon: MessageSquare, badge: messages.length ? messages.length : undefined },
            { id: 'followups', label: t.leadDetail.tabs.tasks, icon: Calendar, badge: followUps.filter(f => f.status === 'pending').length || undefined },
            { id: 'activities', label: t.leadDetail.tabs.history, icon: History },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeLeadTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLeadTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 sm:py-3 px-3 min-h-[42px] border-b-2 text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-orange-100 text-orange-800' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50 pb-safe">
          {/* TAB 1: OVERVIEW */}
          {activeLeadTab === 'details' && (
            <div className="space-y-4 max-w-3xl">
              {/* Contact Information */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t.leadDetail.contactChannels}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <Globe className="w-4 h-4 text-neutral-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-neutral-400 block font-medium">{t.leadDetail.website}</span>
                      <a 
                        href={leadData.website} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-neutral-900 font-semibold truncate hover:text-orange-600 flex items-center gap-1"
                      >
                        <span className="truncate">{leadData.website}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-neutral-400 block font-medium">{t.leadDetail.email}</span>
                      <span className="text-neutral-900 font-semibold truncate block">
                        {leadData.email || '—'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-neutral-400 block font-medium">{t.leadDetail.phone}</span>
                      <span className="text-neutral-900 font-semibold truncate block">
                        {leadData.phone || '—'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-neutral-400 block font-medium">{t.leadDetail.whatsappSupport}</span>
                      <span className="font-semibold text-neutral-900 block">
                        {leadData.hasWhatsapp ? '✓ WhatsApp Aktif' : '✗ WhatsApp Bulunamadı'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRM Notes & Internal Observations */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t.leadDetail.observations}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/60">
                  {leadData.notes || (appLang === 'tr' ? 'Henüz not eklenmedi.' : 'No notes added yet.')}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {leadData.tags?.map((tag, i) => (
                    <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                <button
                  onClick={() => setActiveLeadTab('analysis')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.leadDetail.inspectAudit}</span>
                </button>
                <button
                  onClick={() => setActiveLeadTab('outreach')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.leadDetail.generateOutreach}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AI WEBSITE ANALYSIS */}
          {activeLeadTab === 'analysis' && (
            <div className="space-y-4 max-w-3xl">
              {!analysis ? (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mx-auto">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base">{t.leadDetail.auditPromptTitle}</h3>
                    <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                      {t.leadDetail.auditPromptDesc}
                    </p>
                  </div>
                  <button
                    onClick={handleRunAiAudit}
                    disabled={analyzing}
                    className="px-5 py-3 min-h-[44px] bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 active:scale-95 w-full sm:w-auto"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.leadDetail.auditing}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{t.leadDetail.startAuditBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Top scores overview */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-orange-600" />
                          {t.leadDetail.tabs.audit}
                        </h3>
                        <p className="text-[11px] text-neutral-500">
                          {new Date(analysis.analyzedAt).toLocaleDateString()} {t.leadDetail.auditDate}
                        </p>
                      </div>
                      <button
                        onClick={handleRunAiAudit}
                        disabled={analyzing}
                        className="text-xs font-semibold px-3 py-1.5 min-h-[38px] rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
                      >
                        {analyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <History className="w-3.5 h-3.5" />}
                        <span>{t.leadDetail.reaudit}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-center">
                        <span className="text-[10px] text-neutral-400 block font-bold uppercase">{t.common.websiteScore}</span>
                        <span className="text-xl font-extrabold text-neutral-900">{analysis.websiteScore}/100</span>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-center">
                        <span className="text-[10px] text-neutral-400 block font-bold uppercase">{t.leadDetail.mobileUx}</span>
                        <span className={`text-xl font-extrabold ${analysis.mobileScore < 50 ? 'text-rose-600' : 'text-neutral-900'}`}>
                          {analysis.mobileScore}/100
                        </span>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-center">
                        <span className="text-[10px] text-neutral-400 block font-bold uppercase">{t.leadDetail.pageSpeed}</span>
                        <span className="text-xl font-extrabold text-neutral-900">{analysis.pageSpeedScore}/100</span>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-center">
                        <span className="text-[10px] text-neutral-400 block font-bold uppercase">{t.leadDetail.seoHealth}</span>
                        <span className="text-xl font-extrabold text-neutral-900">{analysis.seoScore}/100</span>
                      </div>
                    </div>

                    {/* AI High-Value Pitch Recommendation */}
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200/80 space-y-1">
                      <span className="text-[10px] uppercase font-extrabold text-orange-800 tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        {t.leadDetail.recommendedOffer}
                      </span>
                      <p className="text-sm font-extrabold text-neutral-900">
                        {analysis.recommendedOffer}
                      </p>
                      <p className="text-xs text-neutral-600 pt-1 leading-relaxed">
                        {analysis.rawAiSummary}
                      </p>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {t.leadDetail.strengths}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {analysis.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        {t.leadDetail.weaknesses}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {analysis.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Missed Revenue Opportunities */}
                  <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      {t.leadDetail.missedOpp}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {analysis.missedOpportunities.map((opp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 font-bold">→</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveLeadTab('outreach')}
                      className="w-full py-3 min-h-[44px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-orange-400" />
                      <span>{t.leadDetail.generatePitchFromAudit}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI OUTREACH MESSAGE GENERATOR */}
          {activeLeadTab === 'outreach' && (
            <div className="space-y-4 max-w-3xl">
              {/* Generator Settings Form */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {t.leadDetail.tabs.outreach}
                  </h3>
                  <span className="text-[11px] text-neutral-500 font-medium truncate max-w-[200px]">
                    {leadData.companyName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Channel */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">{t.leadDetail.channel}</label>
                    <select
                      value={channel}
                      onChange={e => setChannel(e.target.value as any)}
                      className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-900"
                    >
                      <option value="email">E-posta (Cold Email)</option>
                      <option value="linkedin">LinkedIn Direct Message</option>
                      <option value="whatsapp">WhatsApp Business Mesajı</option>
                    </select>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">{t.leadDetail.tone}</label>
                    <select
                      value={tone}
                      onChange={e => setTone(e.target.value as any)}
                      className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-900"
                    >
                      <option value="consultative">{appLang === 'tr' ? 'Danışman / Güven Odaklı' : 'Consultative'}</option>
                      <option value="direct">{appLang === 'tr' ? 'Doğrudan & Kısa' : 'Direct & Concise'}</option>
                      <option value="friendly">{appLang === 'tr' ? 'Samimi & Sıcak' : 'Friendly'}</option>
                      <option value="urgent">{appLang === 'tr' ? 'Fırsat & Aciliyet' : 'Urgent'}</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">{t.leadDetail.language}</label>
                    <select
                      value={outreachLanguage}
                      onChange={e => setOutreachLanguage(e.target.value)}
                      className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-semibold text-neutral-900"
                    >
                      <option value="Turkish">🇹🇷 Türkçe</option>
                      <option value="English">🇬🇧 English</option>
                      <option value="German">🇩🇪 Deutsch</option>
                      <option value="Spanish">🇪🇸 Español</option>
                    </select>
                  </div>
                </div>

                {/* Offer & CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">{t.leadDetail.serviceToPitch}</label>
                    <input
                      type="text"
                      value={customService}
                      onChange={e => setCustomService(e.target.value)}
                      placeholder={appLang === 'tr' ? 'Örn: Mobil Dönüşüm + WhatsApp Asistanı' : 'e.g. Mobile redesign + WhatsApp'}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">{t.leadDetail.callToAction}</label>
                    <input
                      type="text"
                      value={customCta}
                      onChange={e => setCustomCta(e.target.value)}
                      placeholder="e.g. Would you be open to a 2-minute video?"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateOutreach}
                  disabled={generatingMessage}
                  className="w-full py-3 min-h-[44px] px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {generatingMessage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.leadDetail.writingPitch}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t.leadDetail.generateMessageBtn} ({channel.toUpperCase()})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Message Output & Editor */}
              {activeMessage && (
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                      {activeMessage.channel.toUpperCase()} ({activeMessage.tone})
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      activeMessage.status === 'sent' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {activeMessage.status === 'sent' ? (appLang === 'tr' ? 'GÖNDERİLDİ' : 'SENT') : t.leadDetail.readyToSend}
                    </span>
                  </div>

                  {activeMessage.channel === 'email' && (
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">{t.leadDetail.emailSubject}</label>
                      <input
                        type="text"
                        value={editableSubject}
                        onChange={e => setEditableSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-bold text-neutral-900"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">{t.leadDetail.messageBody}</label>
                    <textarea
                      rows={9}
                      value={editableBody}
                      onChange={e => setEditableBody(e.target.value)}
                      className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-normal text-neutral-900 leading-relaxed resize-y focus:outline-hidden focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  {/* Action buttons: Copy, Mark as Sent, Regenerate */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyMessage}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 min-h-[42px] text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? t.common.copied : t.leadDetail.copyClipboard}</span>
                      </button>

                      <button
                        onClick={handleGenerateOutreach}
                        disabled={generatingMessage}
                        className="px-3.5 py-2.5 min-h-[42px] text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors active:scale-95"
                      >
                        {t.common.regenerate}
                      </button>
                    </div>

                    <button
                      onClick={handleMarkAsSent}
                      disabled={sendingMessage || activeMessage.status === 'sent'}
                      className={`px-4 py-2.5 min-h-[42px] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                        activeMessage.status === 'sent'
                          ? 'bg-neutral-100 text-neutral-400 cursor-default'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs'
                      }`}
                    >
                      {sendingMessage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5 text-orange-400" />
                      )}
                      <span>{activeMessage.status === 'sent' ? t.common.alreadySent : t.leadDetail.markSentAdvance}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FOLLOW-UPS & TASKS */}
          {activeLeadTab === 'followups' && (
            <div className="space-y-4 max-w-3xl">
              {/* Schedule Follow-up Form */}
              <form onSubmit={handleAddFollowUp} className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t.leadDetail.scheduleReminder}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={newFuTitle}
                      onChange={e => setNewFuTitle(e.target.value)}
                      placeholder={t.leadDetail.reminderPlaceholder}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
                    />
                  </div>
                  <div>
                    <select
                      value={newFuChannel}
                      onChange={e => setNewFuChannel(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
                    >
                      <option value="email">E-posta</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={addingFu}
                    className="px-4 py-2 min-h-[40px] bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95"
                  >
                    {t.leadDetail.addReminderBtn}
                  </button>
                </div>
              </form>

              {/* Follow-ups List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t.leadDetail.scheduledTasks} ({followUps.length})
                </h4>
                {followUps.length === 0 ? (
                  <p className="text-xs text-neutral-400 p-4 bg-white rounded-xl border border-neutral-200 text-center">
                    {t.leadDetail.noTasks}
                  </p>
                ) : (
                  followUps.map(fu => (
                    <div
                      key={fu.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                        fu.status === 'completed'
                          ? 'bg-neutral-50 border-neutral-200 text-neutral-400'
                          : 'bg-white border-neutral-200/80 shadow-xs text-neutral-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCompleteFollowUp(fu.id)}
                          disabled={fu.status === 'completed'}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            fu.status === 'completed'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {fu.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <p className={`text-xs font-bold ${fu.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                            {fu.title}
                          </p>
                          <span className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {new Date(fu.dueDate).toLocaleDateString()} ({fu.channel.toUpperCase()})
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        fu.status === 'completed' ? 'bg-neutral-100 text-neutral-500' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {fu.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ACTIVITIES */}
          {activeLeadTab === 'activities' && (
            <div className="space-y-3 max-w-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {t.leadDetail.auditHistory}
              </h4>
              {activities.length === 0 ? (
                <p className="text-xs text-neutral-400 p-4 bg-white rounded-xl border border-neutral-200 text-center">
                  {t.leadDetail.noHistory}
                </p>
              ) : (
                <div className="space-y-2">
                  {activities.map((act: any) => (
                    <div key={act.id} className="p-3 bg-white rounded-xl border border-neutral-200/70 shadow-2xs flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-neutral-900">{act.title}</h5>
                        <p className="text-[11px] text-neutral-600">{act.description}</p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">
                          {new Date(act.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
