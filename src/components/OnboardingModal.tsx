import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { X, Building2, Check } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { org, updateOrg, onboardingModalOpen, setOnboardingModalOpen, t } = useApp();

  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('Digital agency');
  const [country, setCountry] = useState('United Kingdom');
  const [targetCountries, setTargetCountries] = useState<string[]>(['United Kingdom', 'United States', 'Ireland']);
  const [targetIndustries, setTargetIndustries] = useState<string[]>(['Roofing', 'Construction', 'Real Estate', 'Dental Clinics']);
  const [idealCustomerProfile, setIdealCustomerProfile] = useState('');
  const [servicesOffered, setServicesOffered] = useState<string[]>(['Web design', 'Google Ads', 'AI WhatsApp automation', 'SEO']);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [monthlyLeadTarget, setMonthlyLeadTarget] = useState<number>(250);

  // Industry tag input
  const [industryInput, setIndustryInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');

  useEffect(() => {
    if (org) {
      setName(org.name || 'Anadolu BT');
      setBusinessType(org.businessType || 'Digital agency');
      setCountry(org.country || 'United Kingdom');
      setTargetCountries(org.targetCountries?.length ? org.targetCountries : ['United Kingdom']);
      setTargetIndustries(org.targetIndustries?.length ? org.targetIndustries : ['Roofing', 'Construction', 'Real Estate', 'Dental Clinics']);
      setIdealCustomerProfile(org.idealCustomerProfile || 'Local service businesses with high customer value, 4.0+ Google rating, but outdated mobile website and lacking WhatsApp automation.');
      setServicesOffered(org.servicesOffered?.length ? org.servicesOffered : ['Web design', 'Google Ads', 'AI WhatsApp automation', 'SEO']);
      setPreferredLanguage(org.preferredLanguage || 'English');
      setMonthlyLeadTarget(org.monthlyLeadTarget || 250);
    }
  }, [org]);

  if (!onboardingModalOpen) return null;

  const handleAddIndustry = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (industryInput.trim() && !targetIndustries.includes(industryInput.trim())) {
      setTargetIndustries([...targetIndustries, industryInput.trim()]);
      setIndustryInput('');
    }
  };

  const removeIndustry = (item: string) => {
    setTargetIndustries(targetIndustries.filter(i => i !== item));
  };

  const handleAddService = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (serviceInput.trim() && !servicesOffered.includes(serviceInput.trim())) {
      setServicesOffered([...servicesOffered, serviceInput.trim()]);
      setServiceInput('');
    }
  };

  const removeService = (item: string) => {
    setServicesOffered(servicesOffered.filter(s => s !== item));
  };

  const handleSave = async () => {
    await updateOrg({
      name,
      businessType,
      country,
      targetCountries,
      targetIndustries,
      idealCustomerProfile,
      servicesOffered,
      preferredLanguage,
      monthlyLeadTarget,
      onboardingCompleted: true,
    });
    setOnboardingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 truncate">
                {org?.onboardingCompleted ? t.onboardingModal.titleEdit : t.onboardingModal.titleWelcome}
              </h2>
              <p className="text-xs text-neutral-500 truncate">
                {t.onboardingModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOnboardingModalOpen(false)}
            className="p-2 min-h-[40px] min-w-[40px] rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center shrink-0"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {/* Business Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.onboardingModal.businessName}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Anadolu BT"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.onboardingModal.businessType}
              </label>
              <select
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900"
              >
                <option value="Digital agency">Digital Agency</option>
                <option value="Web agency">Web Agency</option>
                <option value="Marketing agency">Marketing Agency</option>
                <option value="Freelancer">Freelancer / Consultant</option>
                <option value="SaaS company">SaaS Company</option>
                <option value="B2B sales team">B2B Sales Team</option>
                <option value="Local service business">Local Service Business</option>
              </select>
            </div>
          </div>

          {/* Location & Markets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.onboardingModal.homeCountry}
              </label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="e.g. United Kingdom"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.onboardingModal.outreachLang}
              </label>
              <select
                value={preferredLanguage}
                onChange={e => setPreferredLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900"
              >
                <option value="Turkish">🇹🇷 Türkçe</option>
                <option value="English">🇬🇧 English</option>
                <option value="German">🇩🇪 Deutsch</option>
                <option value="Spanish">🇪🇸 Español</option>
                <option value="French">🇫🇷 Français</option>
              </select>
            </div>
          </div>

          {/* Target Industries */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.onboardingModal.targetIndustries}
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {targetIndustries.map(ind => (
                <span
                  key={ind}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200/60"
                >
                  {ind}
                  <button
                    type="button"
                    onClick={() => removeIndustry(ind)}
                    className="text-orange-400 hover:text-orange-700 ml-0.5 p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={industryInput}
                onChange={e => setIndustryInput(e.target.value)}
                onKeyDown={handleAddIndustry}
                placeholder="Örn: Çatı, Diş klinikleri, Güneş enerjisi..."
                className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
              />
              <button
                type="button"
                onClick={handleAddIndustry}
                className="px-3.5 py-2 min-h-[40px] text-xs font-bold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 active:scale-95"
              >
                {t.common.add}
              </button>
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.onboardingModal.servicesOffered}
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {servicesOffered.map(service => (
                <span
                  key={service}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold border border-neutral-200"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(service)}
                    className="text-neutral-400 hover:text-neutral-700 ml-0.5 p-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={serviceInput}
                onChange={e => setServiceInput(e.target.value)}
                onKeyDown={handleAddService}
                placeholder="Örn: Web tasarımı, Yapay zeka WhatsApp asistanı..."
                className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-3.5 py-2 min-h-[40px] text-xs font-bold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 active:scale-95"
              >
                {t.common.add}
              </button>
            </div>
          </div>

          {/* Ideal Customer Profile (ICP) */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {t.onboardingModal.icpLabel}
            </label>
            <textarea
              rows={3}
              value={idealCustomerProfile}
              onChange={e => setIdealCustomerProfile(e.target.value)}
              placeholder="Describe your ideal client characteristics..."
              className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-neutral-900 resize-none leading-relaxed"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              {t.onboardingModal.icpHelp}
            </p>
          </div>

          {/* Monthly Goal */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-neutral-700">
                {t.onboardingModal.monthlyTarget}
              </label>
              <span className="text-xs font-bold text-orange-600">
                {monthlyLeadTarget} {t.onboardingModal.leadsPerMonth}
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={1000}
              step={25}
              value={monthlyLeadTarget}
              onChange={e => setMonthlyLeadTarget(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-safe">
          <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
            {t.onboardingModal.syncNote}
          </span>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setOnboardingModalOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50 rounded-xl transition-colors"
            >
              {t.common.cancel}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-xs transition-all active:scale-95"
            >
              <span>{t.onboardingModal.saveBtn}</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
