"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

interface PricingSectionProps {
  scrollToContact: () => void;
}

export function PricingSection({ scrollToContact }: PricingSectionProps) {
  const t = useTranslations("Offerta");

  const tierIds = ["1", "2", "3"];

  return (
    <section id="pricing" className="relative z-[110] py-24 md:py-40 px-6 xl:px-40 bg-night border-t border-white/[0.05] overflow-visible">
      <GridPattern />
      
      <div className="relative z-10 max-w-[1300px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t("pricing.sectionTitle")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-8 leading-[1.1]">
            {t("pricing.headline")}
          </h2>
          <div className="h-1 w-24 bg-indigo-500 mx-auto mb-10 shadow-[0_0_20px_rgba(79,70,229,0.4)]" />
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            {t.rich("pricing.subtitle_nudge", {
              spanCore: (chunks) => <span className="text-indigo-400 font-bold">{chunks}</span>
            })}
          </p>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {tierIds.map((id) => {
            const isCore = id === "2";
            return (
              <div 
                key={id} 
                className={`relative group flex flex-col ${isCore ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {isCore && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 z-40">
                    <span className="inline-block px-4 py-1.5 bg-indigo-500 text-[10px] font-bold text-white uppercase tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                      {t("pricing.tiers.2.badge")}
                    </span>
                  </div>
                )}
                
                <div className={`relative h-full flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${
                  isCore 
                  ? 'bg-gradient-to-b from-[#0d1520] to-[#080c12] border-indigo-500/30 shadow-[0_0_60px_-15px_rgba(79,70,229,0.3)]' 
                  : 'bg-[#0a0f14] border-white/[0.08] hover:border-white/20'
                }`}>
                  {/* Header */}
                  <div className={`p-8 md:p-10 border-b ${isCore ? 'border-indigo-500/20' : 'border-white/[0.05]'}`}>
                    <span className={`inline-block text-[10px] font-mono tracking-[0.3em] uppercase mb-4 ${isCore ? 'text-indigo-400' : 'text-slate-500'}`}>Tier 0{id}</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3 uppercase">{t(`pricing.tiers.${id}.name`)}</h3>
                    <p className="text-indigo-400 font-bold text-sm leading-relaxed uppercase tracking-wide">{t(`pricing.tiers.${id}.capacity_value`)}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex-grow flex flex-col">
                    {/* PER CHI E */}
                    <div className="mb-10">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4 block">{t(`pricing.tiers.${id}.for_label`)}</span>
                      <p className="text-slate-300 text-base font-light leading-relaxed">
                        {t(`pricing.tiers.${id}.for_value`)}
                      </p>
                    </div>

                    {/* GOVERNANCE */}
                    <div className="mb-12">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-6 block">{t(`pricing.tiers.${id}.governance_label`)}</span>
                      <ul className="space-y-5">
                        {Object.entries(t.raw(`pricing.tiers.${id}.governance`)).map(([key, value]) => {
                          const bulletText = value as string;
                          const isSprint = bulletText.toLowerCase().includes("sprint");
                          
                          return (
                            <li key={key} className="flex items-start gap-4">
                              <Icon 
                                icon={isSprint ? "solar:bolt-bold" : "solar:check-circle-bold"}
                                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSprint ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' : isCore ? 'text-indigo-400' : 'text-emerald-500/60'}`} 
                              />
                              <span className={`text-slate-300 text-base leading-snug ${isSprint ? 'font-bold text-white' : 'font-light'}`}>
                                {bulletText}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <button 
                      onClick={scrollToContact}
                      className={`on-page-cta mt-auto w-full py-5 rounded-2xl text-base font-black uppercase tracking-widest transition-all duration-300 ${
                        isCore
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-[1.02]'
                        : 'border-2 border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {t("ctas.pricing")}
                    </button>
                  </div>

                  {/* Price Block (Bottom) */}
                  <div className={`p-8 md:p-10 border-t ${isCore ? 'border-indigo-500/20 bg-indigo-500/5' : 'border-white/[0.05] bg-white/[0.02]'}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl md:text-5xl font-black text-white">{t(`pricing.tiers.${id}.price_monthly`)}</span>
                      <span className="text-slate-500 font-light">/ mese</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">{t(`pricing.tiers.${id}.price_yearly`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Grade */}
        <div 
          onClick={scrollToContact}
          className="relative group mb-24 cursor-pointer"
        >
          <div className="relative w-full p-12 md:p-16 border border-white/5 rounded-[2.5rem] bg-[#0A0C10] text-center overflow-hidden transition-all duration-500 shadow-2xl hover:border-indigo-500/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            
            <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full border border-white/10 bg-white/5 mb-10 transition-all duration-500">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.4em] text-slate-400">{t("pricing.enterprise.title")}</span>
            </div>
            
            <p className="text-2xl md:text-3xl text-white font-medium max-w-3xl mx-auto leading-tight mb-10">
              {t("pricing.enterprise.text")}
            </p>

            <div className="inline-flex items-center gap-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-sm hover:text-white transition-colors group">
              <span>Parliamone</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Section */}
        <div className="relative p-8 md:p-20 rounded-[4rem] bg-[#0A0C10] border border-white/[0.05] overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(79,70,229,0.15),transparent_50%)]" />
          
          <h3 className="relative z-10 text-2xl md:text-3xl font-black text-white mb-16 text-center uppercase tracking-tight">{t("pricing.bonus.title")}</h3>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 lg:gap-20">
             {[
               { id: "1", icon: "solar:cpu-bolt-bold-duotone", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
               { id: "2", icon: "solar:map-bold-duotone", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
               { id: "3", icon: "solar:bolt-bold", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" }
             ].map((bonus) => (
              <div key={bonus.id} className="text-center group/bonus flex flex-col items-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bonus.bg} border ${bonus.border} ${bonus.color} mb-8 transition-all duration-500 group-hover/bonus:scale-105 group-hover/bonus:-translate-y-1 shadow-lg group-hover/bonus:shadow-${bonus.color.split('-')[1]}-500/10`}>
                  <Icon icon={bonus.icon} className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{t(`pricing.bonus.items.${bonus.id}.title`)}</h4>
                <p className="text-slate-400 font-light leading-relaxed text-base px-2">{t(`pricing.bonus.items.${bonus.id}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="flex flex-col gap-12 items-center">
          <p className="text-xs md:text-sm text-slate-600 font-light max-w-3xl text-center leading-relaxed">
            * {t("pricing.note.text")}
          </p>
        </div>

      </div>
    </section>
  );
}
