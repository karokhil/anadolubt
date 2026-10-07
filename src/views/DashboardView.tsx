import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Users, 
  Send, 
  MessageCircle, 
  Calendar, 
  Award, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Search,
  Building2,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    metrics, 
    leads, 
    followUps, 
    setActiveTab, 
    openLeadDetails, 
    setAiAssistantModalOpen,
    org,
    t
  } = useApp();

  const pendingReminders = followUps.filter(f => f.status === 'pending');
  const recentLeads = [...leads].slice(0, 5);

  const kpis = [
    {
      label: t.dashboard.totalLeads,
      value: metrics ? metrics.totalLeads : 247,
      change: '+14% ' + t.common.status.toLowerCase(),
      icon: Users,
      color: 'text-neutral-900',
      bg: 'bg-neutral-100',
    },
    {
      label: t.dashboard.contacted,
      value: metrics ? metrics.contacted : 183,
      change: '74% ' + t.dashboard.stages.contacted.toLowerCase(),
      icon: Send,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: t.dashboard.replies,
      value: metrics ? metrics.replies : 31,
      change: '16.9% ' + t.dashboard.conversionRate.toLowerCase(),
      icon: MessageCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: t.dashboard.meetings,
      value: metrics ? metrics.meetings : 9,
      change: '4 ' + t.dashboard.meetings.toLowerCase(),
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: t.dashboard.customers,
      value: metrics ? metrics.customers : 3,
      change: t.common.high + ' LTV',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: t.dashboard.pipelineValue,
      value: metrics ? `$${metrics.pipelineValue.toLocaleString()}` : '$8,700',
      change: t.pipeline.activePipeline,
      icon: DollarSign,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              {org?.name || 'Anadolu BT'} · Commercial Workspace
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {org?.targetIndustries?.join(', ') || 'Roofing, Dental & Trade'} {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveTab('search')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{t.dashboard.discoverLeads}</span>
          </button>
          <button
            onClick={() => setAiAssistantModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>{t.dashboard.askAi}</span>
          </button>
        </div>
      </div>

      {/* 6 Key SaaS Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:border-neutral-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider truncate">
                  {kpi.label}
                </span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${kpi.bg} flex items-center justify-center ${kpi.color} shrink-0`}>
                  <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-neutral-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[10px] text-neutral-500 font-medium mt-0.5 truncate">
                  {kpi.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Conversion Funnel & Actionable Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Follow-up Reminders (Left 1 col) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                {t.dashboard.remindersTitle}
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                {pendingReminders.length} {t.dashboard.remindersDue}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-3 sm:mb-4">
              {t.dashboard.remindersSubtitle}
            </p>

            <div className="space-y-2 sm:space-y-2.5">
              {pendingReminders.slice(0, 3).map(rem => (
                <div
                  key={rem.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 hover:border-orange-300 transition-all flex items-start justify-between gap-2.5 group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {rem.title}
                    </p>
                    <span className="text-[10px] text-neutral-500 flex items-center gap-1.5 mt-1 font-medium">
                      <span className="uppercase text-orange-700 font-bold bg-orange-100/70 px-1 rounded text-[9px]">
                        {rem.channel}
                      </span>
                      <span>·</span>
                      <span>{new Date(rem.dueDate).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const matchedLead = leads.find(l => l.id === rem.leadId);
                      if (matchedLead) openLeadDetails(matchedLead, 'outreach');
                    }}
                    className="p-2 min-h-[36px] min-w-[36px] rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-orange-600 hover:border-orange-300 transition-all shrink-0 flex items-center justify-center"
                    title="Open lead outreach"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('pipeline')}
            className="w-full py-2.5 min-h-[44px] text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors flex items-center justify-center gap-1 active:scale-98"
          >
            <span>{t.dashboard.viewAllPipeline}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Funnel & Conversion Health (Right 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                {t.dashboard.conversionVelocity}
              </h3>
              <span className="text-xs font-extrabold text-neutral-900">
                {t.dashboard.conversionRate}: {metrics?.conversionRate || 1.6}%
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-4 sm:mb-5">
              {t.dashboard.conversionSubtitle}
            </p>

            {/* Funnel bars */}
            <div className="space-y-3">
              {[
                { stage: t.dashboard.stages.discovered, count: metrics ? metrics.totalLeads : 247, pct: 100, color: 'bg-neutral-900' },
                { stage: t.dashboard.stages.contacted, count: metrics ? metrics.contacted : 183, pct: 74, color: 'bg-blue-600' },
                { stage: t.dashboard.stages.replies, count: metrics ? metrics.replies : 31, pct: 17, color: 'bg-amber-500' },
                { stage: t.dashboard.stages.meetings, count: metrics ? metrics.meetings : 9, pct: 5, color: 'bg-purple-600' },
                { stage: t.dashboard.stages.won, count: metrics ? metrics.customers : 3, pct: 2, color: 'bg-emerald-600' },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-neutral-700">
                    <span className="truncate pr-2">{step.stage}</span>
                    <span className="font-bold text-neutral-900 shrink-0">{step.count} ({step.pct}%)</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${step.color} transition-all duration-500`}
                      style={{ width: `${Math.max(4, step.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className="text-neutral-600 font-medium">
              {t.dashboard.avgDealValue}: <strong>$2,900 - $6,500</strong>
            </span>
            <button
              onClick={() => setAiAssistantModalOpen(true)}
              className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.dashboard.askAiConversion}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent High-Opportunity Leads Table / List */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">{t.dashboard.recentLeadsTitle}</h3>
            <p className="text-xs text-neutral-500">{t.dashboard.recentLeadsSubtitle}</p>
          </div>
          <button
            onClick={() => setActiveTab('leads')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 p-1 min-h-[36px]"
          >
            <span className="hidden sm:inline">{t.dashboard.viewAllLeads} ({leads.length})</span>
            <span className="sm:hidden">{t.common.all} ({leads.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-neutral-100">
          {recentLeads.map(lead => (
            <div
              key={lead.id}
              onClick={() => openLeadDetails(lead)}
              className="p-3.5 sm:p-5 hover:bg-neutral-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 active:bg-neutral-100/60"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-700 shrink-0">
                  {lead.companyName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                      {lead.companyName}
                    </h4>
                    {lead.isDemo && (
                      <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-neutral-100 text-neutral-600">
                        {t.common.demoData}
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200/60">
                      {lead.leadScore}/100 {t.common.leadScore.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 flex items-center gap-1.5 sm:gap-2 mt-0.5 flex-wrap">
                    <span>{lead.industry}</span>
                    <span>·</span>
                    <span>{lead.city}, {lead.country}</span>
                    <span>·</span>
                    <span>{lead.googleRating}★ ({lead.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:self-center pl-12 sm:pl-0">
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-neutral-900 block">
                    ${lead.estimatedValue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400 capitalize block">
                    {t.pipeline.stages[lead.pipelineStage] || lead.pipelineStage}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLeadDetails(lead, 'outreach');
                  }}
                  className="px-3.5 py-2 min-h-[38px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
                >
                  {t.dashboard.outreachBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
