import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Lead, PipelineStageKey } from '../types/index.ts';
import { 
  Building2, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  DollarSign, 
  MessageSquare,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

export const PipelineView: React.FC = () => {
  const { leads, updateLeadStage, openLeadDetails, t } = useApp();

  const stages: { key: PipelineStageKey; label: string; color: string }[] = [
    { key: 'NEW', label: t.pipeline.stages.NEW, color: 'border-neutral-300' },
    { key: 'QUALIFIED', label: t.pipeline.stages.QUALIFIED, color: 'border-blue-400' },
    { key: 'CONTACTED', label: t.pipeline.stages.CONTACTED, color: 'border-indigo-400' },
    { key: 'REPLIED', label: t.pipeline.stages.REPLIED, color: 'border-amber-400' },
    { key: 'MEETING', label: t.pipeline.stages.MEETING, color: 'border-purple-400' },
    { key: 'PROPOSAL', label: t.pipeline.stages.PROPOSAL, color: 'border-orange-500' },
    { key: 'WON', label: t.pipeline.stages.WON, color: 'border-emerald-500' },
    { key: 'LOST', label: t.pipeline.stages.LOST, color: 'border-rose-400' },
  ];

  const [activeMobileStage, setActiveMobileStage] = useState<PipelineStageKey>('NEW');

  // Group leads
  const grouped = stages.reduce((acc, stage) => {
    acc[stage.key] = leads.filter(l => l.pipelineStage === stage.key);
    return acc;
  }, {} as Record<PipelineStageKey, Lead[]>);

  const getStageTotalValue = (stageKey: PipelineStageKey) => {
    return (grouped[stageKey] || []).reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
  };

  const advanceStage = (lead: Lead) => {
    const currentIndex = stages.findIndex(s => s.key === lead.pipelineStage);
    if (currentIndex < stages.length - 1 && lead.pipelineStage !== 'LOST' && lead.pipelineStage !== 'WON') {
      const nextStage = stages[currentIndex + 1].key;
      updateLeadStage(lead.id, nextStage);
    }
  };

  const retreatStage = (lead: Lead) => {
    const currentIndex = stages.findIndex(s => s.key === lead.pipelineStage);
    if (currentIndex > 0) {
      const prevStage = stages[currentIndex - 1].key;
      updateLeadStage(lead.id, prevStage);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-12 animate-in fade-in duration-150">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            {t.pipeline.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            {t.pipeline.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-neutral-600 bg-white border border-neutral-200 px-3 py-2 min-h-[40px] rounded-xl shadow-2xs">
          <span>{t.pipeline.activePipeline}</span>
          <span className="text-orange-600">
            ${leads.filter(l => l.pipelineStage !== 'LOST').reduce((s, l) => s + (l.estimatedValue || 0), 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Mobile Stage Selector Tabs (visible on small screens) */}
      <div className="lg:hidden bg-white p-1.5 rounded-2xl border border-neutral-200 overflow-x-auto flex gap-1.5 no-scrollbar">
        {stages.map(st => {
          const count = (grouped[st.key] || []).length;
          const isActive = activeMobileStage === st.key;
          return (
            <button
              key={st.key}
              onClick={() => setActiveMobileStage(st.key)}
              className={`px-3 py-2 min-h-[42px] rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <span>{st.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Single Column View */}
      <div className="lg:hidden space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {stages.find(s => s.key === activeMobileStage)?.label} ({grouped[activeMobileStage]?.length || 0})
          </span>
          <span className="text-xs font-extrabold text-neutral-900">
            ${getStageTotalValue(activeMobileStage).toLocaleString()}
          </span>
        </div>

        {grouped[activeMobileStage]?.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-neutral-200 text-xs text-neutral-400">
            {t.pipeline.dropHere}
          </div>
        ) : (
          grouped[activeMobileStage]?.map(lead => (
            <div
              key={lead.id}
              onClick={() => openLeadDetails(lead)}
              className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3 cursor-pointer active:bg-neutral-50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 leading-tight">
                    {lead.companyName}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {lead.industry} · {lead.city}
                  </p>
                </div>
                <span className="text-xs font-black text-orange-600">
                  ${lead.estimatedValue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100 text-neutral-600">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  {lead.googleRating}★ · {t.common.leadScore}: {lead.leadScore}/100
                </span>
                <span className="font-semibold text-[11px] text-neutral-400">
                  {lead.hasWhatsapp ? 'WhatsApp' : 'Email'}
                </span>
              </div>

              {/* Stage switch buttons (Touch targets 44px min height) */}
              <div className="flex items-center justify-between pt-1 gap-2" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => retreatStage(lead)}
                  disabled={stages.findIndex(s => s.key === lead.pipelineStage) === 0}
                  className="px-3 py-2 min-h-[42px] rounded-xl bg-neutral-100 disabled:opacity-30 text-neutral-700 text-xs font-bold flex items-center gap-1 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.pipeline.prev}</span>
                </button>

                <button
                  onClick={() => openLeadDetails(lead, 'outreach')}
                  className="flex-1 py-2 min-h-[42px] bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold active:scale-95"
                >
                  {t.pipeline.outreach}
                </button>

                <button
                  onClick={() => advanceStage(lead)}
                  disabled={['WON', 'LOST'].includes(lead.pipelineStage)}
                  className="px-3 py-2 min-h-[42px] rounded-xl bg-neutral-100 disabled:opacity-30 text-neutral-700 text-xs font-bold flex items-center gap-1 active:scale-95"
                >
                  <span>{t.pipeline.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Multi-column Kanban Board */}
      <div className="hidden lg:flex gap-3 overflow-x-auto pb-4 no-scrollbar items-start">
        {stages.map(st => {
          const stageLeads = grouped[st.key] || [];
          const totalVal = getStageTotalValue(st.key);

          return (
            <div
              key={st.key}
              className="w-72 bg-neutral-100/60 rounded-2xl border border-neutral-200/70 p-3 shrink-0 flex flex-col max-h-[78vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-neutral-200/60 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${st.color} bg-white`} />
                  <span className="font-extrabold text-xs text-neutral-900 uppercase tracking-wider">
                    {st.label}
                  </span>
                  <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-md bg-white border border-neutral-200 text-neutral-600">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-neutral-600">
                  ${totalVal.toLocaleString()}
                </span>
              </div>

              {/* Cards list */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-0.5">
                {stageLeads.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-400 border border-dashed border-neutral-300/80 rounded-xl bg-white/40">
                    {t.pipeline.dropHere}
                  </div>
                ) : (
                  stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => openLeadDetails(lead)}
                      className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-2xs hover:shadow-sm hover:border-neutral-300 transition-all cursor-pointer space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-neutral-900 group-hover:text-orange-600 transition-colors truncate">
                            {lead.companyName}
                          </h4>
                          <span className="text-[10px] text-neutral-400 block truncate">
                            {lead.industry} · {lead.city}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold text-emerald-600 shrink-0">
                          ${lead.estimatedValue.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                        <span className="flex items-center gap-1 font-semibold text-amber-600">
                          <Star className="w-3 h-3 fill-current" />
                          {lead.googleRating}
                        </span>
                        <span className="text-orange-600 font-bold bg-orange-50 px-1 rounded">
                          {t.common.leadScore}: {lead.leadScore}
                        </span>
                      </div>

                      {/* Quick stage mover bar */}
                      <div 
                        className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px]"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => retreatStage(lead)}
                          disabled={stages.findIndex(s => s.key === lead.pipelineStage) === 0}
                          className="text-neutral-400 hover:text-neutral-800 disabled:opacity-20 font-bold px-1"
                          title={t.pipeline.prev}
                        >
                          ← {t.pipeline.prev}
                        </button>

                        <button
                          onClick={() => openLeadDetails(lead, 'outreach')}
                          className="px-2 py-0.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white font-bold"
                        >
                          {t.pipeline.outreach}
                        </button>

                        <button
                          onClick={() => advanceStage(lead)}
                          disabled={['WON', 'LOST'].includes(lead.pipelineStage)}
                          className="text-neutral-400 hover:text-neutral-800 disabled:opacity-20 font-bold px-1"
                          title={t.pipeline.next}
                        >
                          {t.pipeline.next} →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
