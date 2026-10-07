import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Lead } from '../types/index.ts';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  MessageSquare, 
  Globe, 
  Mail, 
  Phone, 
  Building2, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Trash2,
  Calendar,
  Layers
} from 'lucide-react';

export const LeadsView: React.FC = () => {
  const { leads, openLeadDetails, updateLeadStage, setAddLeadModalOpen, org, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'rating' | 'value' | 'recent'>('score');

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = lead.companyName.toLowerCase().includes(q) ||
        lead.industry.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.notes.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedIndustry !== 'all' && lead.industry.toLowerCase() !== selectedIndustry.toLowerCase()) {
      return false;
    }

    if (selectedStage !== 'all' && lead.pipelineStage !== selectedStage) {
      return false;
    }

    if (selectedOpportunity !== 'all' && lead.opportunityLevel !== selectedOpportunity) {
      return false;
    }

    return true;
  });

  // Sort
  filteredLeads.sort((a, b) => {
    if (sortBy === 'score') return b.leadScore - a.leadScore;
    if (sortBy === 'rating') return b.googleRating - a.googleRating;
    if (sortBy === 'value') return b.estimatedValue - a.estimatedValue;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const industries = Array.from(new Set(leads.map(l => l.industry)));

  return (
    <div className="space-y-4 sm:space-y-5 pb-12 animate-in fade-in duration-150">
      {/* Top Header & Add Lead button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            {t.leads.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            {filteredLeads.length} {t.leads.subtitle}
          </p>
        </div>
        <button
          onClick={() => setAddLeadModalOpen(true)}
          className="px-4 py-2.5 min-h-[44px] bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all self-stretch sm:self-auto flex items-center justify-center active:scale-95"
        >
          {t.leads.addNew}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.leads.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 min-h-[44px] bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="px-3 py-2 min-h-[42px] bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 cursor-pointer shrink-0"
            >
              <option value="all">{t.leads.allIndustries}</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            {/* Stage Filter */}
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value)}
              className="px-3 py-2 min-h-[42px] bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 cursor-pointer shrink-0"
            >
              <option value="all">{t.leads.allStages}</option>
              {Object.entries(t.pipeline.stages).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>

            {/* Opportunity */}
            <select
              value={selectedOpportunity}
              onChange={e => setSelectedOpportunity(e.target.value)}
              className="px-3 py-2 min-h-[42px] bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 cursor-pointer shrink-0"
            >
              <option value="all">{t.leads.allOpportunities}</option>
              <option value="HIGH">{t.common.high} {t.common.opportunity}</option>
              <option value="MEDIUM">{t.common.medium} {t.common.opportunity}</option>
              <option value="LOW">{t.common.low} {t.common.opportunity}</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 min-h-[42px] bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 cursor-pointer shrink-0"
            >
              <option value="score">{t.leads.sortScore}</option>
              <option value="rating">{t.leads.sortRating}</option>
              <option value="value">{t.leads.sortValue}</option>
              <option value="recent">{t.leads.sortNewest}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads List / Cards */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-neutral-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-neutral-900 text-base">{t.leads.noLeads}</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {t.leads.noLeadsDesc}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedIndustry('all');
              setSelectedStage('all');
              setSelectedOpportunity('all');
            }}
            className="px-4 py-2 min-h-[40px] bg-neutral-900 text-white text-xs font-bold rounded-xl"
          >
            {t.common.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredLeads.map(lead => {
            return (
              <div
                key={lead.id}
                onClick={() => openLeadDetails(lead)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between group space-y-3.5 active:bg-neutral-50"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                          {lead.companyName}
                        </h3>
                        {lead.isDemo && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 tracking-tight">
                            {t.common.demoData}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {lead.industry} · {lead.city}, {lead.country}
                      </p>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      lead.opportunityLevel === 'HIGH'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : lead.opportunityLevel === 'MEDIUM'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    }`}>
                      {lead.opportunityLevel === 'HIGH' ? t.common.high : lead.opportunityLevel === 'MEDIUM' ? t.common.medium : t.common.low} {t.common.opportunity}
                    </span>
                  </div>

                  {/* Rating & Channels */}
                  <div className="flex items-center justify-between text-xs text-neutral-600 py-1 border-y border-neutral-100">
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {lead.googleRating} ({lead.reviewCount})
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={`font-medium ${lead.hasWhatsapp ? 'text-emerald-600' : 'text-neutral-400'}`}>
                        {lead.hasWhatsapp ? t.leads.hasWhatsapp : t.leads.noWhatsapp}
                      </span>
                      <span>·</span>
                      <span className={`font-medium ${lead.hasEmail ? 'text-blue-600' : 'text-neutral-400'}`}>
                        {lead.hasEmail ? t.leads.hasEmail : t.leads.noEmail}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics: Lead Score, Website Score, Digital Presence */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-2.5 text-xs">
                    <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                      <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.leadScore}</span>
                      <span className="font-extrabold text-orange-600 text-sm">
                        {lead.leadScore}/100
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/60">
                      <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.websiteScore}</span>
                      <span className={`font-extrabold text-sm ${lead.websiteScore < 60 ? 'text-rose-600' : 'text-neutral-800'}`}>
                        {lead.websiteScore}/100
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/60">
                      <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.digitalPresence}</span>
                      <span className="font-extrabold text-neutral-800 text-sm">
                        {lead.digitalPresenceScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Notes snippet */}
                  {lead.notes && (
                    <p className="text-[11px] text-neutral-500 mt-2.5 line-clamp-2 leading-relaxed bg-neutral-50/70 p-2 rounded-lg">
                      {lead.notes}
                    </p>
                  )}
                </div>

                {/* Footer with stage and quick actions */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-semibold uppercase">{t.common.stage}</span>
                    <span className="font-bold text-neutral-800 text-xs">
                      {t.pipeline.stages[lead.pipelineStage] || lead.pipelineStage}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => openLeadDetails(lead, 'analysis')}
                      className="p-2 min-h-[38px] min-w-[38px] rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-colors flex items-center justify-center active:scale-95"
                      title={t.leads.audit}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    </button>
                    <button
                      onClick={() => openLeadDetails(lead, 'outreach')}
                      className="px-3.5 py-2 min-h-[38px] rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold transition-colors shadow-2xs active:scale-95 text-xs"
                    >
                      {t.leads.outreach}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
