"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface PricingSectionProps {
  scrollToContact: () => void;
}

export function PricingSection({ scrollToContact }: PricingSectionProps) {
  const t = useTranslations("Offerta");

  return (
    <section id="pricing" className="relative z-[100] py-24 md:py-40 px-6 bg-[#05070a] border-t border-white/[0.03] overflow-visible">
      {/* Module ID Tag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[110]">
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">{t("pricing.tag")}</span>
      </div>

      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
              {t("pricing.sectionTitle")}
            </span>
          </h2>
          <div className="h-1.5 w-32 bg-indigo-500 mx-auto mb-12 shadow-[0_0_20px_rgba(79,70,229,0.6)]" />
          <p className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
            {t("pricing.headline")}
          </p>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              {t("pricing.intro_1")}
            </p>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              {t("pricing.intro_2")}
            </p>
            <p className="text-lg md:text-xl text-slate-500 font-light mt-8">
              {t("pricing.intro_3")}
            </p>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Tier 1 - Focus */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-[#0a0f14] border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20">
              {/* Tier Header */}
              <div className="px-8 py-8 border-b border-white/[0.05]">
                <span className="inline-block text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-4">Tier 01</span>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                  {t("pricing.tiers.1.name")}
                </h3>
                <p className="text-lg text-indigo-400 font-medium">
                  {t("pricing.tiers.1.capacity_value")}
                </p>
              </div>
              
              {/* Tier Content */}
              <div className="px-8 py-10 space-y-10">
                {/* For whom */}
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.1.for_label")}</h4>
                  <p className="text-lg text-slate-200 font-light leading-relaxed">
                    {t("pricing.tiers.1.for_value")}
                  </p>
                </div>

                {/* Governance */}
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.1.governance_label")}</h4>
                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-slate-300">
                        <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{t(`pricing.tiers.1.governance.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={scrollToContact}
                    className="on-page-cta w-full py-5 rounded-xl border-2 border-white/10 bg-white/[0.03] text-base font-black uppercase tracking-[0.15em] text-slate-200 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    {t("ctas.pricing")}
                  </button>
                </div>
              </div>
              
              {/* Price Footer */}
              <div className="px-8 py-8 bg-white/[0.02] border-t border-white/[0.05]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{t("pricing.tiers.1.price_monthly")}</span>
                  <span className="text-base text-slate-500 font-light">/ mese</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{t("pricing.tiers.1.price_yearly")}</p>
              </div>
            </div>
          </div>

          {/* Tier 2 - Core (Featured) */}
          <div className="relative group lg:-mt-4 lg:mb-4">
            {/* Popular Badge - Positioned to avoid clipping */}
            <div className="absolute top-0 right-8 -translate-y-[60%] z-40">
              <span className="inline-block px-4 py-1.5 bg-indigo-500 text-[10px] font-bold text-white uppercase tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                {t("pricing.tiers.2.badge")}
              </span>
            </div>
            
            <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative h-full bg-gradient-to-b from-[#0d1520] to-[#080c12] border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(79,70,229,0.3)]">
              
              {/* Tier Header */}
              <div className="px-8 py-8 border-b border-indigo-500/20">
                <span className="inline-block text-[10px] font-mono text-indigo-500 tracking-[0.3em] uppercase mb-4">Tier 02</span>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                  {t("pricing.tiers.2.name")}
                </h3>
                <p className="text-lg text-indigo-400 font-medium">
                  {t("pricing.tiers.2.capacity_value")}
                </p>
              </div>
              
              {/* Tier Content */}
              <div className="px-8 py-10 space-y-10">
                {/* For whom */}
                <div>
                  <h4 className="text-sm font-mono text-cyan-500/70 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.2.for_label")}</h4>
                  <p className="text-lg text-slate-100 font-light leading-relaxed">
                    {t("pricing.tiers.2.for_value")}
                  </p>
                </div>

                {/* Governance */}
                <div>
                  <h4 className="text-sm font-mono text-cyan-500/70 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.2.governance_label")}</h4>
                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-slate-200">
                        <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{t(`pricing.tiers.2.governance.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={scrollToContact}
                    className="on-page-cta w-full py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-black uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300"
                  >
                    {t("ctas.pricing")}
                  </button>
                </div>
              </div>
              
              {/* Price Footer */}
              <div className="px-8 py-8 bg-cyan-500/5 border-t border-cyan-500/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{t("pricing.tiers.2.price_monthly")}</span>
                  <span className="text-base text-slate-400 font-light">/ mese</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{t("pricing.tiers.2.price_yearly")}</p>
              </div>
            </div>
          </div>

          {/* Tier 3 - Scale */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-[#0a0f14] border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20">
              {/* Tier Header */}
              <div className="px-8 py-8 border-b border-white/[0.05]">
                <span className="inline-block text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-4">Tier 03</span>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                  {t("pricing.tiers.3.name")}
                </h3>
                <p className="text-lg text-indigo-400 font-medium">
                  {t("pricing.tiers.3.capacity_value")}
                </p>
              </div>
              
              {/* Tier Content */}
              <div className="px-8 py-10 space-y-10">
                {/* For whom */}
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.3.for_label")}</h4>
                  <p className="text-lg text-slate-200 font-light leading-relaxed">
                    {t("pricing.tiers.3.for_value")}
                  </p>
                </div>

                {/* Governance */}
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.3.governance_label")}</h4>
                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-slate-300">
                        <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{t(`pricing.tiers.3.governance.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={scrollToContact}
                    className="on-page-cta w-full py-5 rounded-xl border-2 border-white/10 bg-white/[0.03] text-base font-black uppercase tracking-[0.15em] text-slate-200 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    {t("ctas.pricing")}
                  </button>
                </div>
              </div>
              
              {/* Price Footer */}
              <div className="px-8 py-8 bg-white/[0.02] border-t border-white/[0.05]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{t("pricing.tiers.3.price_monthly")}</span>
                  <span className="text-base text-slate-500 font-light">/ mese</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{t("pricing.tiers.3.price_yearly")}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Enterprise Section */}
        <div className="mb-16 p-8 md:p-12 bg-[#0a0f14] border border-white/[0.12] rounded-3xl text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {t("pricing.enterprise.title")}
          </h3>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            {t("pricing.enterprise.text")}
          </p>
        </div>

        {/* Final Note */}
        <div className="text-center pt-12 border-t border-white/[0.08]">
          <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em] mb-6">
            {t("pricing.note.title")}
          </h4>
          <p className="text-xl md:text-2xl text-slate-200 font-light max-w-4xl mx-auto leading-relaxed">
            {t("pricing.note.text")}
          </p>
        </div>

      </div>
    </section>
  );
}

