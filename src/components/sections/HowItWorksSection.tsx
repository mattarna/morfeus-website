"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

interface HowItWorksSectionProps {
  scrollToContact: () => void;
  namespace?: string;
  stepIds?: string[];
  showMarfBox?: boolean;
}

export function HowItWorksSection({ scrollToContact, namespace = "Offerta.how_it_works", stepIds: stepIdsProp, showMarfBox = true }: HowItWorksSectionProps) {
  const t = useTranslations(namespace);

  const stepIds = stepIdsProp ?? ["1", "2", "3", "4"];

  return (
    <section id="how-it-works" className="relative z-[60] bg-night border-t border-white/[0.05] overflow-visible">
      <GridPattern />
      
      <div className="relative z-10 py-24 md:py-40 px-6 xl:px-20 max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-36">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t("label")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-8 leading-[1.1]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="text-slate-400/80">{chunks}</span>
            })}
          </h2>
          <div className="h-1 w-24 bg-indigo-500 mx-auto mb-8 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Schematic Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 md:-translate-x-1/2 hidden md:block" />

          {/* Steps */}
          <div className="flex flex-col gap-32 md:gap-48">
            {stepIds.map((id, idx) => (
              <div 
                key={id} 
                className={`relative flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-0 ${
                  (idx + 1) % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Phase Marker - Technical Node */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.6)] z-20 border-4 border-[#030303] hidden md:block" />
                
                {/* Large Phase Number */}
                <div className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 ${(idx + 1) % 2 === 0 ? 'md:right-1/2 md:mr-24' : 'md:left-1/2 md:ml-24'} top-[-30px] md:top-[-60px]`}>
                  <span className="text-8xl md:text-[12rem] font-black text-white/[0.04] font-mono tracking-tighter">
                    0{id}
                  </span>
                </div>

                {/* Content Area */}
                <div className={`w-full md:w-[calc(50%-3rem)] text-center ${(idx + 1) % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="relative">
                    {/* Technical ID Tag */}
                    <div className={`inline-flex items-center gap-3 mb-6 px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/5 ${(idx + 1) % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <span className="text-xs font-mono text-indigo-400 tracking-[0.2em] font-bold uppercase">
                        {t(`steps.${id}.tag`)}
                      </span>
                    </div>

                    {/* Main Titles */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tight uppercase">
                      {t(`steps.${id}.title`)}
                    </h3>
                    <p className="text-xl md:text-2xl text-indigo-400/90 font-medium mb-10 leading-relaxed uppercase">
                      {t(`steps.${id}.subtitle`)}
                    </p>

                    {/* Bullets */}
                    <ul className={`flex flex-col gap-6 mb-12 items-center ${(idx + 1) % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      {(Object.values(t.raw(`steps.${id}.bullets`)) as string[]).map((bullet, i) => (
                        <li key={i} className={`flex items-start gap-4 text-slate-200 font-light group text-left ${(idx + 1) % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <span className="mt-2.5 w-2 h-2 rounded-sm rotate-45 border border-indigo-500/50 group-hover:bg-indigo-500 transition-all duration-300 flex-shrink-0" />
                          <span className="text-lg md:text-xl leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Schematic Footer */}
                    <div className={`pt-10 border-t border-slate-800 ${(idx + 1) % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <p className={`text-base md:text-lg text-slate-400 font-light max-w-lg mx-auto ${(idx + 1) % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0'}`}>
                        {t(`steps.${id}.keyMessage`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* MARF Box */}
        {showMarfBox && (
          <div className="mt-40 p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#0d1117] to-[#0a0c10] border border-indigo-500/30 shadow-[0_20px_50px_-20px_rgba(83,61,252,0.3)] relative overflow-hidden group transition-all duration-500 hover:border-indigo-500/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -z-10 group-hover:bg-indigo-500/10 transition-colors duration-700" />
            
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon icon="solar:cpu-bolt-bold" className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                  {t.rich("marf_box.title", {
                    spanIndigo: (chunks) => <span className="text-indigo-400">{chunks}</span>
                  })}
                </h3>
                <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                  {t("marf_box.text")}
                </p>
              </div>
            </div>

            {/* Bullet Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {(["1", "2", "3", "4"] as const).map((key) => {
                const iconMap: Record<string, string> = {
                  database: "solar:database-bold-duotone",
                  robot: "solar:ghost-bold-duotone",
                  brain: "solar:lightbulb-bolt-bold-duotone",
                  network: "solar:share-circle-bold-duotone"
                };
                const bulletIcon = t(`marf_box.bullets.${key}.icon`);
                return (
                  <div key={key} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all duration-300 relative group/bullet hover:bg-white/[0.04]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative transition-colors group-hover/bullet:border-forge/40">
                      {/* Tiny Orange Accent Dot */}
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-forge shadow-[0_0_8px_rgba(255,115,0,0.6)]" />
                      
                      <Icon icon={iconMap[bulletIcon] || "solar:star-bold"} className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {t(`marf_box.bullets.${key}.title`)}
                      </h4>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">
                        {t(`marf_box.bullets.${key}.desc`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Closing */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed text-center italic">
                {t("marf_box.closing")}
              </p>
            </div>
          </div>
        )}

        {/* CTA Primary */}
        <div className="mt-32 md:mt-48 flex flex-col items-center gap-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-4" />
          <button 
            onClick={scrollToContact}
            className="on-page-cta group relative px-12 py-5 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
            <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center gap-2 text-white">
              {t("cta")}
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
