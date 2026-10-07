import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { X, Check, CreditCard, ShieldCheck } from 'lucide-react';

export const BillingModal: React.FC = () => {
  const { billingModalOpen, setBillingModalOpen, subscription, refreshData, showToast, t, language: appLang } = useApp();
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);

  if (!billingModalOpen) return null;

  const plans = [
    {
      id: 'free',
      name: appLang === 'tr' ? 'Ücretsiz' : 'Free',
      price: '$0',
      period: appLang === 'tr' ? 'süresiz' : 'forever',
      leadLimit: 25,
      aiAnalyses: 50,
      description: appLang === 'tr' ? 'Yapay zeka aday üretimini denemek isteyen bireysel uzmanlar için.' : 'Ideal for solo freelancers testing out AI lead outreach.',
      features: [
        appLang === 'tr' ? '25 aday / ay' : '25 leads / month',
        appLang === 'tr' ? 'Temel aday skoru (0-100)' : 'Basic lead scoring (0-100)',
        appLang === 'tr' ? 'Kişiselleştirilmiş e-posta üretimi' : 'Personalized email generation',
        appLang === 'tr' ? 'CRM satış hunisi' : 'CRM sales pipeline',
      ],
      popular: false,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: appLang === 'tr' ? '/ ay' : '/ month',
      leadLimit: 250,
      aiAnalyses: 300,
      description: appLang === 'tr' ? 'Büyüyen serbest çalışanlar ve butik dijital ajanslar için.' : 'For growing freelancers and boutique digital agencies.',
      features: [
        appLang === 'tr' ? '250 aday / ay' : '250 leads / month',
        appLang === 'tr' ? 'Tam yapay zeka web & mobil denetimi' : 'Full AI website & mobile audits',
        appLang === 'tr' ? 'WhatsApp, LinkedIn ve E-posta metinleri' : 'WhatsApp, LinkedIn & Email copy',
        appLang === 'tr' ? 'Görev & takip hatırlatıcıları' : 'Follow-up reminders & task tracker',
        appLang === 'tr' ? 'Öncelikli veri tazeleme' : 'Priority data freshness',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$79',
      period: appLang === 'tr' ? '/ ay' : '/ month',
      leadLimit: 1000,
      aiAnalyses: 1500,
      description: appLang === 'tr' ? 'Agresif müşteri adayı arayan profesyonel satış ekipleri için.' : 'High volume prospecting for aggressive sales teams.',
      features: [
        appLang === 'tr' ? '1.000 aday / ay' : '1,000 leads / month',
        appLang === 'tr' ? 'Sınırsız web & mobil denetimleri' : 'Unlimited AI website & mobile audits',
        appLang === 'tr' ? 'LeadPilot AI Satış Stratejisti' : 'LeadPilot AI Sales Strategist',
        appLang === 'tr' ? 'Çok kanallı erişim dizilimleri' : 'Multi-channel outreach sequences',
        appLang === 'tr' ? 'CSV & CRM dışa aktarma' : 'CSV & CRM export capabilities',
      ],
      popular: true,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$199',
      period: appLang === 'tr' ? '/ ay' : '/ month',
      leadLimit: 5000,
      aiAnalyses: 10000,
      description: appLang === 'tr' ? 'Büyük ölçekli tam hizmet pazarlama ve satış ajansları için.' : 'Enterprise scale for full-service marketing & sales agencies.',
      features: [
        appLang === 'tr' ? '5.000 aday / ay' : '5,000 leads / month',
        appLang === 'tr' ? 'Sınırsız ekip hesabı ve kullanıcı' : 'Unlimited team seats & sub-accounts',
        appLang === 'tr' ? 'Beyaz etiket (White-label) raporlar' : 'White-label lead audit reports',
        appLang === 'tr' ? 'Webhook ve API erişimi' : 'Webhook & API programmatic access',
        appLang === 'tr' ? 'Özel hesap stratejisti desteği' : 'Dedicated account strategist',
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    setUpgradingPlan(planId);
    try {
      const res = await api.upgradePlan(planId);
      if (res.success) {
        showToast(
          appLang === 'tr' ? `${planId.toUpperCase()} paketine başarıyla geçildi!` : `Successfully switched to ${planId.toUpperCase()} tier!`, 
          'success'
        );
        await refreshData();
        setBillingModalOpen(false);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update plan', 'error');
    } finally {
      setUpgradingPlan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 truncate">
                {t.billingModal.title}
              </h2>
              <p className="text-xs text-neutral-500 truncate">
                {t.billingModal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setBillingModalOpen(false)}
            className="p-2 min-h-[40px] min-w-[40px] rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center shrink-0"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status bar */}
        {subscription && (
          <div className="px-4 sm:px-6 py-3 bg-neutral-100/70 border-b border-neutral-200/60 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-600">{t.billingModal.currentPlan}</span>
              <span className="font-bold text-neutral-900 capitalize px-2 py-0.5 rounded-md bg-white border border-neutral-200">
                {subscription.plan}
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600 font-medium">
              <span>
                <strong>{subscription.leadsUsedThisMonth}</strong> / {subscription.leadsLimit} {t.billingModal.leadsUsed}
              </span>
              <span>·</span>
              <span>
                <strong>{subscription.aiAnalysesUsed}</strong> {t.billingModal.auditsCompleted}
              </span>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 flex-1">
          {plans.map(p => {
            const isCurrent = subscription?.plan === p.id;
            return (
              <div
                key={p.id}
                className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all relative border ${
                  p.popular
                    ? 'border-orange-500 shadow-md shadow-orange-500/5 bg-orange-50/20'
                    : isCurrent
                      ? 'border-neutral-900 bg-neutral-50/50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] uppercase font-extrabold bg-orange-600 text-white px-2 py-0.5 rounded-full tracking-wide">
                    {t.billingModal.mostPopular}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-900 text-base">{p.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        {t.billingModal.active}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-extrabold text-neutral-900">{p.price}</span>
                    <span className="text-xs text-neutral-500 font-medium">{p.period}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4 leading-relaxed">{p.description}</p>

                  <div className="border-t border-neutral-100 pt-3 space-y-2 mb-6">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(p.id)}
                  disabled={isCurrent || upgradingPlan === p.id}
                  className={`w-full py-2.5 px-3 min-h-[42px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    isCurrent
                      ? 'bg-neutral-200 text-neutral-500 cursor-default'
                      : p.popular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs'
                  }`}
                >
                  {upgradingPlan === p.id
                    ? t.billingModal.updating
                    : isCurrent
                      ? t.billingModal.current
                      : t.billingModal.switchTo(p.name)}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="px-5 sm:px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-neutral-500 pb-safe">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-center sm:text-left">{t.billingModal.footerNote}</span>
          </div>
          <span className="text-[11px] text-neutral-400">{t.billingModal.cancelAnytime}</span>
        </div>
      </div>
    </div>
  );
};
