import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Building2, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  Users, 
  Globe,
  Check
} from 'lucide-react';
import { Language } from '../i18n/translations.ts';

export const SettingsView: React.FC = () => {
  const { 
    org, 
    user, 
    leads, 
    subscription, 
    setOnboardingModalOpen, 
    setBillingModalOpen,
    showToast,
    t,
    language,
    setLanguage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'integrations' | 'export'>('profile');

  // Integrations state
  const [smtpConnected, setSmtpConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [googleWorkspaceConnected, setGoogleWorkspaceConnected] = useState(false);

  const languagesList: { code: Language; label: string; flag: string }[] = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const handleExportCsv = () => {
    if (leads.length === 0) {
      showToast(language === 'tr' ? 'Dışa aktarılacak aday bulunamadı' : 'No leads available to export', 'error');
      return;
    }

    const headers = ['Company Name', 'Industry', 'Country', 'City', 'Website', 'Email', 'Phone', 'Rating', 'Lead Score', 'Website Score', 'Stage', 'Opportunity', 'Estimated Value'];
    const rows = leads.map(l => [
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.industry}"`,
      `"${l.country}"`,
      `"${l.city}"`,
      `"${l.website}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      l.googleRating,
      l.leadScore,
      l.websiteScore,
      l.pipelineStage,
      l.opportunityLevel,
      l.estimatedValue
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leadpilot_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(language === 'tr' ? `${leads.length} aday CSV olarak dışa aktarıldı` : `Exported ${leads.length} leads to CSV`, 'success');
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-20 animate-in fade-in duration-150 max-w-4xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            {t.settings.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            {t.settings.subtitle}
          </p>
        </div>

        {/* Language selector in Settings */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-neutral-200/80 rounded-2xl shadow-2xs self-start sm:self-auto">
          <Globe className="w-3.5 h-3.5 text-neutral-400 ml-2" />
          {languagesList.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-xl text-xs font-bold transition-all ${
                language === lang.code
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="uppercase text-[11px]">{lang.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs with horizontal touch scroll */}
      <div className="flex border-b border-neutral-200 gap-4 sm:gap-6 text-xs font-bold text-neutral-500 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === 'profile' ? 'border-orange-600 text-orange-600 font-extrabold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          {t.settings.tabs.profile}
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === 'billing' ? 'border-orange-600 text-orange-600 font-extrabold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          {t.settings.tabs.billing}
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === 'integrations' ? 'border-orange-600 text-orange-600 font-extrabold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          {t.settings.tabs.integrations}
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === 'export' ? 'border-orange-600 text-orange-600 font-extrabold' : 'border-transparent hover:text-neutral-900'
          }`}
        >
          {t.settings.tabs.export}
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm shrink-0">
                {org?.name?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-neutral-900 text-base truncate">{org?.name || 'Anadolu BT'}</h3>
                <p className="text-xs text-neutral-500 truncate">{org?.businessType} · {org?.country}</p>
              </div>
            </div>
            <button
              onClick={() => setOnboardingModalOpen(true)}
              className="px-4 py-2.5 min-h-[42px] bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs self-start sm:self-auto active:scale-95"
            >
              {t.settings.editSetup}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs pt-1">
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400">{t.settings.targetIndustries}</span>
              <p className="font-semibold text-neutral-900">
                {org?.targetIndustries?.join(', ') || 'Roofing, Dental, Construction'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400">{t.settings.servicesOffered}</span>
              <p className="font-semibold text-neutral-900">
                {org?.servicesOffered?.join(', ') || 'Web design, Google Ads, AI WhatsApp automation'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400">{t.settings.preferredLanguage}</span>
              <p className="font-semibold text-neutral-900">{org?.preferredLanguage || 'English'}</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400">{t.settings.monthlyTarget}</span>
              <p className="font-semibold text-neutral-900">{org?.monthlyLeadTarget || 250} {t.onboardingModal.leadsPerMonth}</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-neutral-400">{t.settings.icp}</span>
            <p className="text-neutral-700 leading-relaxed font-normal">
              {org?.idealCustomerProfile}
            </p>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-neutral-500">
            <span>{t.settings.signedInAs} <strong>{user?.email}</strong></span>
            <span className="text-emerald-600 font-bold">{t.settings.rlsActive}</span>
          </div>
        </div>
      )}

      {/* Tab 2: Billing */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-neutral-900 text-base">{t.settings.subscriptionTier}</h3>
              <p className="text-xs text-neutral-500">{t.settings.subDesc}</p>
            </div>
            <button
              onClick={() => setBillingModalOpen(true)}
              className="px-4 py-2.5 min-h-[42px] bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs self-start sm:self-auto active:scale-95"
            >
              {t.settings.changeTier}
            </button>
          </div>

          {subscription && (
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold capitalize text-orange-950">
                  {subscription.plan} Tier {t.billingModal.active}
                </span>
                <span className="text-xs font-bold text-orange-700">
                  {subscription.leadsUsedThisMonth} / {subscription.leadsLimit} {t.settings.leadsUsed}
                </span>
              </div>
              <div className="w-full bg-orange-200/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-600 h-full rounded-full"
                  style={{ width: `${Math.round((subscription.leadsUsedThisMonth / subscription.leadsLimit) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-orange-800 font-medium">
                {t.settings.renewsIn} {subscription.aiAnalysesUsed}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center text-xs pt-1">
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <span className="text-neutral-400 font-bold block uppercase text-[10px]">Free</span>
              <span className="font-extrabold text-neutral-900 text-sm">$0/mo</span>
              <span className="text-[10px] text-neutral-500 block">25 leads</span>
            </div>
            <div className="p-3 rounded-xl border-2 border-orange-500 bg-orange-50/20">
              <span className="text-orange-600 font-bold block uppercase text-[10px]">Starter</span>
              <span className="font-extrabold text-neutral-900 text-sm">$29/mo</span>
              <span className="text-[10px] text-neutral-500 block">250 leads</span>
            </div>
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <span className="text-neutral-400 font-bold block uppercase text-[10px]">Pro</span>
              <span className="font-extrabold text-neutral-900 text-sm">$79/mo</span>
              <span className="text-[10px] text-neutral-500 block">1,000 leads</span>
            </div>
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <span className="text-neutral-400 font-bold block uppercase text-[10px]">Agency</span>
              <span className="font-extrabold text-neutral-900 text-sm">$199/mo</span>
              <span className="text-[10px] text-neutral-500 block">5,000 leads</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Integrations */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs space-y-4 sm:space-y-5">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">{t.settings.integrationsTitle}</h3>
            <p className="text-xs text-neutral-500">{t.settings.integrationsSubtitle}</p>
          </div>

          <div className="space-y-3">
            {/* Email / SMTP */}
            <div className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{t.settings.smtpTitle}</h4>
                  <p className="text-[11px] text-neutral-500">{t.settings.smtpDesc}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSmtpConnected(!smtpConnected);
                  showToast(smtpConnected ? 'SMTP bağlantısı kesildi' : 'SMTP başarıyla bağlandı', 'info');
                }}
                className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all self-start sm:self-auto active:scale-95 ${
                  smtpConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-900 text-white'
                }`}
              >
                {smtpConnected ? t.settings.connected : t.settings.connect}
              </button>
            </div>

            {/* WhatsApp Business API */}
            <div className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{t.settings.waTitle}</h4>
                  <p className="text-[11px] text-neutral-500">{t.settings.waDesc}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setWhatsappConnected(!whatsappConnected);
                  showToast(whatsappConnected ? 'WhatsApp bağlantısı kesildi' : 'WhatsApp API bağlandı', 'info');
                }}
                className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all self-start sm:self-auto active:scale-95 ${
                  whatsappConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-900 text-white'
                }`}
              >
                {whatsappConnected ? t.settings.connected : t.settings.connect}
              </button>
            </div>

            {/* Google Workspace */}
            <div className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{t.settings.googleTitle}</h4>
                  <p className="text-[11px] text-neutral-500">{t.settings.googleDesc}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setGoogleWorkspaceConnected(!googleWorkspaceConnected);
                  showToast(googleWorkspaceConnected ? 'Google bağlantısı kesildi' : 'Google Workspace bağlandı', 'info');
                }}
                className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all self-start sm:self-auto active:scale-95 ${
                  googleWorkspaceConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-900 text-white'
                }`}
              >
                {googleWorkspaceConnected ? t.settings.connected : t.settings.connect}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Export */}
      {activeTab === 'export' && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">{t.settings.exportTitle}</h3>
            <p className="text-xs text-neutral-500">{t.settings.exportSubtitle}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-neutral-900">{t.settings.exportCardTitle}</h4>
              <p className="text-[11px] text-neutral-500">{leads.length} {t.settings.exportCardDesc}</p>
            </div>
            <button
              onClick={handleExportCsv}
              className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>{t.settings.exportBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
