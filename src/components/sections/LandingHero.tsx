"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface LandingHeroProps {
  contentVisible: boolean;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  scrollToContact: () => void;
}

export function LandingHero({ contentVisible, isPlaying, setIsPlaying, scrollToContact }: LandingHeroProps) {
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

        {/* 3. VSL FRAME (Hidden temporarily as requested) */}
        {/* 
        <div className="relative w-full max-w-4xl mb-12 group">
          <div className="absolute -inset-4 rounded-[2rem] opacity-20 blur-3xl bg-majorelle/30 pointer-events-none group-hover:opacity-30 transition-opacity duration-700" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-night/80 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">{t("vsl_tag")}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 tracking-wider">08:42</span>
                <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-wider">{t("vsl_live")}</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/vsl"
                  onClick={() => setIsPlaying(true)}
                >
                  <Image 
                    src="/Images-landing/COPERTINA VSL.png"
                    alt="VSL Cover"
                    fill
                    className="object-cover opacity-60 group-hover/vsl:opacity-80 transition-opacity duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
                  
                  <button className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center transition-all duration-500 group-hover/vsl:scale-110 group-hover/vsl:bg-majorelle group-hover/vsl:border-neon group-hover/vsl:shadow-[0_0_50px_rgba(83,61,252,0.5)]">
                    <Icon icon="solar:play-bold" className="w-8 h-8 md:w-10 md:h-10 text-white ml-1.5 transition-transform group-hover/vsl:scale-110" />
                  </button>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover/vsl:opacity-100 transition-all duration-500 translate-y-2 group-hover/vsl:translate-y-0">
                    {t("vsl_watch")}
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/NcgwgB9L0KI?autoplay=1"
                  title="Morfeus VSL"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
        */}

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
