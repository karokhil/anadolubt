import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { X, Plus, Sparkles } from 'lucide-react';

export const AddLeadModal: React.FC = () => {
  const { addLeadModalOpen, setAddLeadModalOpen, saveLeadFromDiscovery, org, t } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState(org?.targetIndustries[0] || 'Roofing');
  const [country, setCountry] = useState(org?.country || 'United Kingdom');
  const [city, setCity] = useState('Manchester');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [googleRating, setGoogleRating] = useState(4.8);
  const [reviewCount, setReviewCount] = useState(45);
  const [hasWhatsapp, setHasWhatsapp] = useState(true);
  const [estimatedValue, setEstimatedValue] = useState(3000);
  const [notes, setNotes] = useState('');
  const [runAiAuditNow, setRunAiAuditNow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!addLeadModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setIsSubmitting(true);
    try {
      await saveLeadFromDiscovery({
        companyName: companyName.trim(),
        industry,
        country,
        city,
        website: website.trim().startsWith('http') ? website.trim() : `https://${website.trim() || 'example.com'}`,
        email: email.trim(),
        phone: phone.trim(),
        googleRating: Number(googleRating),
        reviewCount: Number(reviewCount),
        hasWhatsapp,
        hasEmail: Boolean(email.trim()),
        hasSocial: false,
        leadScore: 85,
        websiteScore: 50,
        digitalPresenceScore: 55,
        opportunityLevel: 'HIGH',
        pipelineStage: 'NEW',
        estimatedValue: Number(estimatedValue),
        notes: notes.trim(),
        tags: ['Manual Entry'],
        isDemo: false,
      }, runAiAuditNow);

      setAddLeadModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
              <Plus className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-neutral-900 truncate">
                {t.addLeadModal.title}
              </h2>
              <p className="text-xs text-neutral-500 truncate">
                {t.addLeadModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAddLeadModalOpen(false)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors shrink-0"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.addLeadModal.companyName}
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. Manchester Roof Services"
              className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.addLeadModal.industry}
              </label>
              <input
                type="text"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                placeholder="Roofing, Dental, etc."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.addLeadModal.city}
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Manchester"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.addLeadModal.website}
            </label>
            <input
              type="text"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.addLeadModal.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@example.com"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.addLeadModal.phone}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+44 161 000 0000"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1 truncate">
                {t.addLeadModal.rating}
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={googleRating}
                onChange={e => setGoogleRating(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1 truncate">
                {t.addLeadModal.reviews}
              </label>
              <input
                type="number"
                min="0"
                value={reviewCount}
                onChange={e => setReviewCount(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1 truncate">
                {t.addLeadModal.dealValue}
              </label>
              <input
                type="number"
                step="100"
                value={estimatedValue}
                onChange={e => setEstimatedValue(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden font-medium text-neutral-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 py-1">
            <input
              type="checkbox"
              id="hasWhatsappCheck"
              checked={hasWhatsapp}
              onChange={e => setHasWhatsapp(e.target.checked)}
              className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
            />
            <label htmlFor="hasWhatsappCheck" className="text-xs font-medium text-neutral-700 cursor-pointer">
              {t.addLeadModal.hasWhatsapp}
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.addLeadModal.notes}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Website has outdated mobile design, missing emergency booking..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-neutral-900 resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="text-xs font-bold text-orange-950 leading-tight">
                {t.addLeadModal.runAuditImmediately}
              </span>
            </div>
            <input
              type="checkbox"
              checked={runAiAuditNow}
              onChange={e => setRunAiAuditNow(e.target.checked)}
              className="w-4 h-4 accent-orange-600 rounded cursor-pointer shrink-0"
            />
          </div>

          {/* Sticky or convenient Bottom Action Buttons */}
          <div className="pt-2 pb-safe flex items-center justify-end gap-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setAddLeadModalOpen(false)}
              className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              {t.addLeadModal.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 min-h-[44px] text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? t.addLeadModal.saving : t.addLeadModal.saveProspect}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
