"use client";

import { useTranslations } from "next-intl";

export function ComparisonSection() {
  const t = useTranslations("Offerta");

  return (
    <section id="comparison" className="relative z-50 py-24 md:py-40 px-6 bg-[#05070a] border-y border-white/[0.03] overflow-visible">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Headline & Subheadline (Moved to Top) */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
              {t("comparison.closing_1")}
            </span>
          </h2>
          <p className="text-xl md:text-3xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed">
            {t("comparison.closing_2")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-stretch">
          
          {/* 1/3 — SENZA MORFEUS (Light Gray Contrast) */}
          <div className="lg:w-[35%] rounded-3xl bg-slate-200 p-8 md:p-10 flex flex-col shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-600 mb-10 uppercase tracking-tight">
              {t("comparison.without.title")}
            </h3>
            
            <ul className="flex flex-col gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500 font-light">
                  <span className="mt-1.5 w-5 h-5 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="w-2.5 h-[1.5px] bg-red-500/60" />
                  </span>
                  <span 
                    className="text-xl leading-snug"
                    dangerouslySetInnerHTML={{ 
                      __html: t(`comparison.without.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '$1') 
                    }} 
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 2/3 — CON MORFEUS (Vibrant Gradient) */}
          <div className="lg:w-[65%] rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-800 p-8 md:p-12 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.2)]">
            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] -z-10" />
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 uppercase tracking-tight">
              {t("comparison.with.title")}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-start gap-4 text-white/90">
                  <span className="mt-1 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span 
                    className="text-xl md:text-2xl font-light leading-tight"
                    dangerouslySetInnerHTML={{ 
                      __html: t(`comparison.with.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') 
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stacking Concept (Moved closer to boxes) */}
        <div className="max-w-4xl mx-auto text-center pt-8">
          <span className="inline-block text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase mb-4">
            {t("comparison.effect_label")}
          </span>
          <p className="text-2xl md:text-3xl text-slate-400 font-light leading-relaxed">
            {t("comparison.effect_desc")}
          </p>
        </div>

      </div>
    </section>
  );
}

