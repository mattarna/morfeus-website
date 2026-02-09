"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface HeroSectionProps {
  contentVisible: boolean;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  scrollToContact: () => void;
}

export function HeroSection({ contentVisible, isPlaying, setIsPlaying, scrollToContact }: HeroSectionProps) {
  const t = useTranslations("Offerta");

  return (
    <main 
      id="hero"
      className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 transition-all duration-1000 ease-out ${
        contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1200px] w-full flex flex-col items-center text-center">
        
        {/* 1. HEADLINE */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.03em] leading-[1.05] uppercase">
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e2e8f0] to-[#94a3b8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              {t("hero.headline_1")}
            </span>
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#cbd5e1] to-[#64748b] drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              {t("hero.headline_2")}
            </span>
            <br className="hidden lg:block" />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 via-indigo-500 to-blue-700 drop-shadow-[0_0_20px_rgba(79,70,229,0.25)]"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              {t("hero.headline_3")}
            </span>
          </h1>
        </div>

        {/* 2. SUBHEADLINE */}
        <p className="max-w-5xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-400/90 font-light leading-[1.5] mb-10 px-4">
          {t("hero.subtitle")}
        </p>

        {/* 3. VSL FRAME */}
        <div className="relative w-full max-w-4xl mb-8">
          <div className="absolute -inset-2 rounded-xl opacity-20 blur-2xl bg-cyan-500/30 pointer-events-none" />
          <div className="relative rounded-lg overflow-hidden border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50 bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{t("hero.vsl_label")}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-slate-600">{t("hero.vsl_duration")}</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-red-500/80 uppercase">REC</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-slate-900 flex items-center justify-center group">
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  {/* Cover Image */}
                  <Image 
                    src="/Images-landing/COPERTINA VSL.png"
                    alt="VSL Cover"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    priority
                  />
                  
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  <button className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-indigo-500/50">
                    <Icon icon="solar:play-bold" className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                  </button>
                  <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-slate-700/40" />
                  <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-slate-700/40" />
                  <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-slate-700/40" />
                  <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-slate-700/40" />
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

        {/* 4. CTA */}
        <button 
          onClick={scrollToContact}
          className="on-page-cta group relative px-12 py-5 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
          <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          <span className="relative z-10 flex items-center gap-2 text-white">
            {t("hero.cta_primary")}
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>

      </div>
    </main>
  );
}

