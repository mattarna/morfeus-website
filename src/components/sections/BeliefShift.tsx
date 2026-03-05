"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

const richOptions = {
  br: () => <br />,
  spanMedium: (chunks: React.ReactNode) => <span className="text-slate-300 font-medium">{chunks}</span>,
  spanIndigo: (chunks: React.ReactNode) => <span className="text-indigo-400 font-medium">{chunks}</span>,
};

export function BeliefShift() {
  const t = useTranslations("Offerta.belief_shift");

  return (
    <section id="belief-shift" className="relative z-40 py-24 md:py-40 px-6 xl:px-40 bg-night border-y border-white/[0.05] overflow-visible">
      <GridPattern />
      
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="max-w-4xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t("label")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="text-slate-400/80">{chunks}</span>
            })}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24 items-stretch">
          {(["1", "2"] as const).map((pairId) => (
            <React.Fragment key={pairId}>
              <div className="group relative p-8 md:p-12 rounded-3xl bg-[#0A0C10] border border-white/[0.05] transition-all duration-500 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Icon icon="solar:close-circle-bold" className="w-4 h-4 text-red-500/60" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/60">{t("wrong_label")}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                  {t(`pairs.${pairId}.wrong_title`)}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg">
                  {t.rich(`pairs.${pairId}.wrong_desc`, richOptions)}
                </p>
              </div>

              <div key={`right-${pairId}`} className="group relative p-8 md:p-12 rounded-3xl bg-[#0D1117] border border-indigo-500/10 transition-all duration-500 flex flex-col h-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/80">{t("right_label")}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                  {t(`pairs.${pairId}.right_title`)}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg">
                  {t.rich(`pairs.${pairId}.right_desc`, richOptions)}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
