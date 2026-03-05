"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

interface FilterSectionProps {
  scrollToContact: () => void;
}

export function FilterSection({ scrollToContact }: FilterSectionProps) {
  const t = useTranslations("Offerta.filter");

  return (
    <section id="filter" className="relative z-[90] py-24 md:py-40 px-6 xl:px-40 bg-night border-y border-white/[0.05] overflow-visible">
      <GridPattern />
      
      <div className="relative z-10 max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            {t("headline")}
          </h2>
        </div>

        {/* Two Columns Grid - Restoration of the requested design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column A — È PER TE SE (Green) */}
          <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-[#0A0C10] border border-white/[0.05] flex flex-col h-full overflow-hidden transition-all duration-500">
            {/* Top Highlight Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-12">
              {t("for_you.title")}
            </h3>

            <ul className="space-y-8">
              {(Object.values(t.raw("for_you.bullets")) as string[]).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] flex-shrink-0" />
                  <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                    {bullet.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                      i % 2 === 1 ? (
                        <span key={i} className="text-white font-bold">{part}</span>
                      ) : (
                        <Fragment key={i}>{part}</Fragment>
                      )
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column B — NON È PER TE SE (Red) */}
          <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-[#0A0C10] border border-white/[0.05] flex flex-col h-full overflow-hidden transition-all duration-500">
            {/* Top Highlight Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-12">
              {t("not_for_you.title")}
            </h3>

            <ul className="space-y-8">
              {(Object.values(t.raw("not_for_you.bullets")) as string[]).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] flex-shrink-0" />
                  <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                    {bullet.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                      i % 2 === 1 ? (
                        <span key={i} className="text-white font-bold">{part}</span>
                      ) : (
                        <Fragment key={i}>{part}</Fragment>
                      )
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Final Closing & CTA */}
        <div className="mt-20 flex flex-col items-center gap-12">
          <p className="text-xl md:text-2xl text-slate-400 font-light text-center max-w-3xl leading-relaxed">
            {t("closing")}
          </p>
          
          <button 
            onClick={scrollToContact}
            className="on-page-cta group relative px-12 py-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-3 text-base font-black uppercase tracking-[0.2em] text-white">
              {t("cta")}
              <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transition-transform group-hover:translate-x-2 text-indigo-400" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
