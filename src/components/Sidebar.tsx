import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext.tsx';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Kanban, 
  Settings,
  Sparkles,
  Zap,
  TrendingUp,
  CreditCard,
  Building2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    leads, 
    metrics, 
    subscription, 
    setAiAssistantModalOpen,
    setBillingModalOpen,
    setOnboardingModalOpen,
    org,
    t,
    language,
    setLanguage
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'leads', label: t.nav.leads, icon: Users, badge: leads.length },
    { id: 'search', label: t.nav.discovery, icon: Search },
    { id: 'pipeline', label: t.nav.pipeline, icon: Kanban },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  const leadsUsed = subscription?.leadsUsedThisMonth || 0;
  const leadsMax = subscription?.leadsLimit || 250;
  const usagePercent = Math.min(100, Math.round((leadsUsed / leadsMax) * 100));

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200/80 bg-white min-h-screen shrink-0 sticky top-0 h-screen select-none">
      {/* Brand */}
      <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-600/30">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-neutral-900 tracking-tight text-lg">LeadPilot</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 tracking-wide">AI</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium leading-none mt-0.5">B2B Intelligence & CRM</p>
          </div>
        </div>
      </div>

      {/* Organization quick switcher / info card */}
      <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
        <button
          onClick={() => setOnboardingModalOpen(true)}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100 text-left transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-neutral-200/80 flex items-center justify-center text-neutral-700 font-bold text-xs uppercase">
              {org?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                {org?.name || 'Anadolu BT'}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">
                {org?.businessType || 'Digital agency'} · {org?.country || 'UK'}
              </p>
            </div>
          </div>
          <Building2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 shrink-0" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-4 flex-1 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Navigation
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Assistant Button */}
        <div className="pt-4">
          <button
            onClick={() => setAiAssistantModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200/80 text-orange-900 text-sm font-semibold transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-orange-600 group-hover:rotate-12 transition-transform" />
              <span>{t.nav.aiStrategist}</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold text-orange-700 bg-orange-200/60 px-1.5 py-0.5 rounded">
              {t.common.online}
            </span>
          </button>
        </div>
      </div>

      {/* Live Pipeline Value Widget */}
      {metrics && (
        <div className="px-4 py-3 mx-3 mb-3 bg-neutral-50 rounded-xl border border-neutral-200/70">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
            <span className="flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
              {t.dashboard.pipelineValue}
            </span>
            <span className="font-bold text-neutral-900">${metrics.pipelineValue.toLocaleString()}</span>
          </div>
          <div className="text-[11px] text-neutral-400 flex items-center justify-between">
            <span>{metrics.meetings} {t.dashboard.meetings.toLowerCase()}</span>
            <span className="text-emerald-600 font-semibold">{metrics.customers} {t.dashboard.customers.toLowerCase()}</span>
          </div>
        </div>
      )}

      {/* Subscription usage card */}
      <div className="p-4 border-t border-neutral-100 bg-white">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-neutral-900 capitalize flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-neutral-500" />
            {subscription?.plan || 'Starter'} Plan
          </span>
          <button
            onClick={() => setBillingModalOpen(true)}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            {t.common.manage}
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-1.5">
          <div 
            className="bg-orange-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
          <span>{leadsUsed} / {leadsMax} {t.settings.leadsUsed.toLowerCase()}</span>
          <span>{usagePercent}%</span>
        </div>
      </div>
    </aside>
  );
};
