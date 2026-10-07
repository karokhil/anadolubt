import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Language } from '../i18n/translations.ts';
import { 
  Sparkles, 
  Plus, 
  Building2, 
  Bell, 
  Search,
  Zap,
  Globe,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    org, 
    followUps, 
    setAiAssistantModalOpen, 
    setAddLeadModalOpen, 
    setOnboardingModalOpen,
    setBillingModalOpen,
    subscription,
    setActiveTab,
    t,
    language,
    setLanguage
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pendingReminders = followUps.filter(f => f.status === 'pending');

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand & Organization */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-600/30 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-neutral-900 tracking-tight text-base sm:text-lg leading-none">
                  {t.common.appName}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-700 tracking-wide uppercase">
                  AI
                </span>
              </div>
              <button 
                onClick={() => setOnboardingModalOpen(true)}
                className="flex items-center gap-1 text-[10px] sm:text-[11px] text-neutral-500 hover:text-orange-600 transition-colors mt-0.5 font-medium group text-left"
                title={t.nav.editIcp}
              >
                <Building2 className="w-3 h-3 text-neutral-400 group-hover:text-orange-600 shrink-0" />
                <span className="truncate max-w-[95px] sm:max-w-[160px] md:max-w-[200px]">
                  {org?.name || 'My Agency'}
                </span>
                <span className="text-neutral-300 hidden xs:inline">·</span>
                <span className="text-neutral-400 group-hover:text-neutral-600 hidden xs:inline">{t.nav.editIcp}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center / Search shortcut (visible on tablet/desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setActiveTab('search')}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-neutral-100/90 hover:bg-neutral-200/60 rounded-xl text-neutral-500 text-sm border border-neutral-200/60 transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <span>{t.nav.findLeadsPlaceholder}</span>
            </div>
            <kbd className="hidden lg:inline-flex text-[10px] font-semibold bg-white border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-400 shadow-2xs">
              {t.nav.discovery}
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Language & AI Assistant */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Multi-language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-2 min-h-[40px] rounded-xl bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200/80 text-xs font-bold text-neutral-800 transition-all active:scale-95"
              title="Dil Seçimi / Select Language"
            >
              <span className="text-sm">
                {languages.find(l => l.code === language)?.flag || '🇹🇷'}
              </span>
              <span className="uppercase text-[11px] font-extrabold">{language}</span>
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div 
                  className="absolute right-0 mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in duration-100"
                  onClick={() => setLangMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 mb-1">
                    Dil / Language
                  </div>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-neutral-50 transition-colors ${
                        language === lang.code ? 'text-orange-600 bg-orange-50/60 font-bold' : 'text-neutral-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {language === lang.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* AI Sales Assistant trigger */}
          <button
            onClick={() => setAiAssistantModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/80 text-xs sm:text-sm font-semibold transition-all shadow-2xs active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse shrink-0" />
            <span className="hidden sm:inline">{t.nav.aiStrategist}</span>
            <span className="sm:hidden font-bold">AI</span>
          </button>

          {/* Follow-up reminder count */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="relative p-2 min-h-[40px] min-w-[40px] rounded-xl text-neutral-600 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all flex items-center justify-center"
            title={`${pendingReminders.length} ${t.dashboard.remindersTitle}`}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            {pendingReminders.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white" />
            )}
          </button>

          {/* Quick Plan Badge (on desktop) */}
          {subscription && (
            <button
              onClick={() => setBillingModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 min-h-[40px] rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 border border-neutral-200 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="capitalize">{subscription.plan}</span>
              <span className="text-neutral-400">({subscription.leadsUsedThisMonth}/{subscription.leadsLimit})</span>
            </button>
          )}

          {/* Add Lead button */}
          <button
            onClick={() => setAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.addLead}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

