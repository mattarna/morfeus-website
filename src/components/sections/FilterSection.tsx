"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface FilterSectionProps {
  scrollToContact: () => void;
}

export function FilterSection({ scrollToContact }: FilterSectionProps) {
  const t = useTranslations("Offerta");

  return (
    <section id="filter" className="relative z-30 py-24 md:py-32 px-6 overflow-visible">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-16 md:mb-20">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t("filter.title")}
          </span>
        </h2>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 md:mb-20">
          
          {/* Block 1 — Per chi è (Green) */}
          <div className="relative rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-8 md:p-10 overflow-hidden">
            {/* Gradient glow top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-emerald-500/10 blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-emerald-400">
              {t("filter.for_you.title")}
            </h3>
            <ul className="flex flex-col gap-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                  <span className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span 
                    className="text-lg sm:text-xl"
                    dangerouslySetInnerHTML={{ 
                      __html: t(`filter.for_you.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') 
                    }} 
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Block 2 — Per chi non è (Red) */}
          <div className="relative rounded-2xl border border-red-500/20 bg-red-950/10 p-8 md:p-10 overflow-hidden">
            {/* Gradient glow top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-400" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-red-500/10 blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-red-400">
              {t("filter.not_for_you.title")}
            </h3>
            <ul className="flex flex-col gap-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                  <span className="mt-2.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span 
                    className="text-lg sm:text-xl"
                    dangerouslySetInnerHTML={{ 
                      __html: t(`filter.not_for_you.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') 
                    }} 
                  />
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Closing Line */}
        <div className="flex flex-col items-center gap-10 border-t border-white/5 pt-12">
          <p className="text-lg md:text-xl text-slate-400 font-light text-center max-w-3xl mx-auto leading-relaxed">
            {t("filter.closing")}
          </p>
          
          <button 
            onClick={scrollToContact}
            className="on-page-cta group relative px-12 py-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-3 text-base font-black uppercase tracking-[0.2em] text-white">
              {t("ctas.filter")}
              <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transition-transform group-hover:translate-x-2 text-indigo-400" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}

