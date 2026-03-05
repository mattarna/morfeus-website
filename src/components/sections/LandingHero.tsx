"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { MARFVisualCore } from "../shared/MARFVisualCore";

interface LandingHeroProps {
  contentVisible: boolean;
  scrollToContact: () => void;
}

export function LandingHero({ contentVisible, scrollToContact }: LandingHeroProps) {
  const t = useTranslations("Offerta.hero");

  return (
    <main 
      id="hero"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 xl:px-40 pt-32 pb-20 bg-[#0a111a] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      <div className={`max-w-[1200px] w-full flex flex-col items-center text-center transition-all duration-1000 ease-out ${
        contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        
        {/* 0. EYEBROW */}
        <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-majorelle animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-vista/80">
            {t("eyebrow")}
          </span>
        </div>

        {/* 1. HEADLINE */}
        <div className="mb-6 md:mb-8 max-w-4xl">
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.1] uppercase">
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70">
              {t("headline.line1")}
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70">
              {t("headline.line2")}
            </span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-majorelle via-neon to-vista drop-shadow-[0_0_30px_rgba(83,61,252,0.3)]">
              {t("headline.line3")}
            </span>
          </h1>
        </div>

        {/* 2. SUBHEADLINE */}
        <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-slate-400/90 font-light leading-[1.6] mb-12 px-4">
          {t("subtitle")}
        </p>

        {/* 3. MARF VISUAL CORE (Interactive Replacement for Video) */}
        <div className="relative w-full max-w-5xl mb-16 md:mb-20 px-4 group">
          <div className="absolute -inset-10 rounded-[4rem] opacity-[0.08] blur-[120px] bg-majorelle pointer-events-none transition-opacity duration-1000 group-hover:opacity-[0.15]" />
          <MARFVisualCore />
        </div>

        {/* 4. CTA SECTION */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] mb-2">
            {t("cta_nudge")}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={scrollToContact}
              className="on-page-cta group relative px-10 py-5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
              <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                {t("cta_primary")}
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] transition-all duration-500 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm active:scale-95"
            >
              <span className="relative z-10 text-white/70 group-hover:text-white transition-colors">
                {t("cta_secondary")}
              </span>
            </button>
          </div>
        </div>

        {/* 5. PROOF BAR */}
        <div className="mt-20 w-full max-w-5xl pt-10 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {(Object.values(t.raw("proof_items")) as string[]).map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-[10px] md:text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] leading-relaxed">
                  {item.split(' ').slice(1).join(' ')}
                </div>
                <div className="text-sm md:text-base font-black text-vista">
                  {item.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
