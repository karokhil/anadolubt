import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { 
  Search, 
  MapPin, 
  Building2, 
  Star, 
  Globe, 
  Phone, 
  Mail, 
  Sparkles, 
  Check, 
  Plus, 
  Filter, 
  SlidersHorizontal,
  Info,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DiscoveryView: React.FC = () => {
  const { saveLeadFromDiscovery, leads, showToast, org, t } = useApp();

  // Search parameters matching the prompt's example
  const [country, setCountry] = useState('United Kingdom');
  const [city, setCity] = useState('Manchester');
  const [industry, setIndustry] = useState('Roofing');
  const [businessType, setBusinessType] = useState('Contractor');
  const [minRating, setMinRating] = useState<number>(4.5);
  const [websiteQuality, setWebsiteQuality] = useState<'all' | 'weak' | 'average' | 'good'>('weak');
  const [hasWhatsapp, setHasWhatsapp] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [hasSocial, setHasSocial] = useState(false);
  const [minLeadScore, setMinLeadScore] = useState<number>(70);
  const [query, setQuery] = useState('');

  // Results & status
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [providerInfo, setProviderInfo] = useState<string>('Simulated Google Places API (DEMO DATA)');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Run initial search
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await api.searchDiscoveryLeads({
        country,
        city,
        industry,
        businessType,
        minRating: minRating > 0 ? minRating : undefined,
        websiteQuality,
        hasWhatsapp,
        hasEmail,
        hasSocial,
        minLeadScore: minLeadScore > 0 ? minLeadScore : undefined,
        query,
      });

      setResults(data.results);
      if (data.provider) setProviderInfo(data.provider);
    } catch (err: any) {
      showToast(err.message || 'Error searching leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isAlreadyInCrm = (companyName: string) => {
    return leads.some(l => l.companyName.toLowerCase() === companyName.toLowerCase());
  };

  const handleSaveLead = async (candidate: any, runAudit: boolean = false) => {
    setSavedIds(prev => new Set(prev).add(candidate.companyName));
    await saveLeadFromDiscovery({
      companyName: candidate.companyName,
      industry: candidate.industry,
      country: candidate.country,
      city: candidate.city,
      address: candidate.address,
      website: candidate.website,
      email: candidate.email,
      phone: candidate.phone,
      googleRating: candidate.googleRating,
      reviewCount: candidate.reviewCount,
      websiteScore: candidate.websiteScore,
      digitalPresenceScore: candidate.digitalPresenceScore,
      leadScore: candidate.leadScore,
      opportunityLevel: candidate.opportunityLevel,
      hasWhatsapp: candidate.hasWhatsapp,
      hasEmail: candidate.hasEmail,
      hasSocial: candidate.hasSocial,
      pipelineStage: 'NEW',
      estimatedValue: candidate.estimatedValue,
      notes: candidate.notes,
      tags: [...candidate.tags, 'Discovered'],
      isDemo: true,
      source: 'discovery',
    }, runAudit);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
          {t.discovery.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          {t.discovery.subtitle}
        </p>
      </div>

      {/* Provider Abstraction & DEMO DATA Architecture Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-bold">
            {t.discovery.bannerTitle}: <span className="underline">{providerInfo}</span>
          </p>
          <p className="text-amber-800/90 leading-relaxed text-[11px] sm:text-xs">
            {t.discovery.bannerDesc}
          </p>
        </div>
      </div>

      {/* Search Filters Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            {t.discovery.criteriaTitle}
          </span>
          <button
            onClick={() => {
              setCountry('United Kingdom');
              setCity('Manchester');
              setIndustry('Roofing');
              setMinRating(4.5);
              setWebsiteQuality('weak');
              setHasWhatsapp(true);
            }}
            className="text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            {t.discovery.resetExample}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {/* Country */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.country}</label>
            <input
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="e.g. United Kingdom"
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.city}</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="e.g. Manchester"
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.industry}</label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            >
              <option value="all">{t.leads.allIndustries}</option>
              <option value="Roofing">Roofing</option>
              <option value="Dental Clinics">Dental Clinics</option>
              <option value="Construction">Construction</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Plumbing">Plumbing & Heating</option>
              <option value="Digital agency">Digital Agencies</option>
            </select>
          </div>

          {/* Google Rating */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.minRating}</label>
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            >
              <option value={0}>{t.common.all}</option>
              <option value={4.0}>4.0+ Stars</option>
              <option value={4.5}>4.5+ Stars (High Trust)</option>
              <option value={4.8}>4.8+ Stars (Elite Reputation)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          {/* Website Quality */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.websiteQuality}</label>
            <select
              value={websiteQuality}
              onChange={e => setWebsiteQuality(e.target.value as any)}
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            >
              <option value="all">{t.discovery.qualities.all}</option>
              <option value="weak">{t.discovery.qualities.weak}</option>
              <option value="average">{t.discovery.qualities.average}</option>
              <option value="good">{t.discovery.qualities.good}</option>
            </select>
          </div>

          {/* Min Lead Score */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">{t.discovery.minScore}</label>
            <select
              value={minLeadScore}
              onChange={e => setMinLeadScore(Number(e.target.value))}
              className="w-full px-3 py-2.5 min-h-[42px] text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium text-neutral-900"
            >
              <option value={0}>{t.common.all}</option>
              <option value={70}>70+ ({t.common.opportunity})</option>
              <option value={85}>85+ ({t.common.high})</option>
              <option value={90}>90+ (VIP)</option>
            </select>
          </div>

          {/* Channel Toggles */}
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-6">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={hasWhatsapp}
                onChange={e => setHasWhatsapp(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
              <span>{t.discovery.hasWhatsapp}</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={hasEmail}
                onChange={e => setHasEmail(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
              <span>{t.discovery.hasEmail}</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={hasSocial}
                onChange={e => setHasSocial(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
              <span>{t.discovery.hasSocial}</span>
            </label>
          </div>
        </div>

        {/* Search trigger */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                <span>{t.discovery.searching}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-orange-400" />
                <span>{t.discovery.findBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Discovery Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-neutral-900">
            {t.discovery.resultsTitle} ({results.length})
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            {t.discovery.resultsSubtitle}
          </span>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-neutral-200 space-y-3">
            <Building2 className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-bold text-neutral-900 text-sm">{t.discovery.noResults}</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              {t.discovery.noResultsDesc}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {results.map((item, idx) => {
              const alreadySaved = isAlreadyInCrm(item.companyName) || savedIds.has(item.companyName);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-3.5"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                            {item.companyName}
                          </h3>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                            {t.common.demoData}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {item.industry} · {item.city}, {item.country}
                        </p>
                      </div>

                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                        item.opportunityLevel === 'HIGH'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}>
                        {item.opportunityLevel === 'HIGH' ? t.common.high : item.opportunityLevel === 'MEDIUM' ? t.common.medium : t.common.low} {t.common.opportunity}
                      </span>
                    </div>

                    {/* Rating & Contact badges */}
                    <div className="flex items-center justify-between text-xs py-1.5 border-y border-neutral-100">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {item.googleRating}★ ({item.reviewCount})
                      </span>
                      <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                        <span>{item.hasWhatsapp ? '✓ WhatsApp' : '✗ No WA'}</span>
                        <span>·</span>
                        <span>{item.hasEmail ? '✓ Email' : '✗ No Email'}</span>
                      </div>
                    </div>

                    {/* Scores row */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-2.5 text-xs">
                      <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                        <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.leadScore}</span>
                        <span className="font-extrabold text-orange-600 text-sm">{item.leadScore}/100</span>
                      </div>
                      <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/60">
                        <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.websiteScore}</span>
                        <span className={`font-extrabold text-sm ${item.websiteScore < 60 ? 'text-rose-600' : 'text-neutral-800'}`}>
                          {item.websiteScore}/100
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/60">
                        <span className="text-[10px] text-neutral-400 font-bold block uppercase">{t.common.estValue}</span>
                        <span className="font-extrabold text-emerald-600 text-sm">${item.estimatedValue}</span>
                      </div>
                    </div>

                    {/* Observation */}
                    <p className="text-xs text-neutral-600 mt-2.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                      {item.website.replace('https://', '')}
                    </span>

                    <div className="flex items-center gap-2">
                      {alreadySaved ? (
                        <span className="w-full sm:w-auto text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 min-h-[40px] rounded-xl flex items-center justify-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.discovery.inCrm}</span>
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSaveLead(item, false)}
                            className="flex-1 sm:flex-none px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors active:scale-95"
                          >
                            {t.discovery.saveLead}
                          </button>
                          <button
                            onClick={() => handleSaveLead(item, true)}
                            className="flex-1 sm:flex-none px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                            <span>{t.discovery.saveAndAudit}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
