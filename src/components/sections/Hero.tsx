"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";

/**
 * Hero Section - Index 0
 * 
 * Full viewport height, centered content
 * Features: Badge, Headlines, Subheadline, CTAs
 */
export function Hero() {
  const setIndex = useScrollStore((state) => state.setIndex);
  const t = useTranslations("Hero");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleCtaClick = (e: React.MouseEvent, index: number) => {
    if (isDesktop) {
      e.preventDefault();
      setIndex(index);
    } else {
      // On mobile, we use a more robust scroll method to account for the fixed header
      const element = document.getElementById(`section-${index}`);
      if (element) {
        e.preventDefault();
        const yOffset = -70; // Header height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20 lg:py-0">
      {/* Local Aura Glow */}
      <div className="absolute top-0 w-full flex justify-center pointer-events-none z-0">
        <div className="w-[300px] md:w-[600px] xl:w-[800px] h-[300px] md:h-[400px] bg-[#4e39ec]/15 rounded-full blur-[80px] md:blur-[100px] xl:blur-[120px] -translate-y-1/2 mix-blend-screen opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Badge */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]">
          <span className="text-[9px] md:text-[10px] uppercase font-semibold text-indigo-300 tracking-[0.1em]">
            {t("label")}
          </span>
        </div>

        {/* Headlines */}
        <div className="flex flex-col items-center text-center space-y-[-0.2em] max-w-6xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-semibold tracking-tighter uppercase">
            <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent pb-2 block">
              {t("headline_1")}
            </span>
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] pb-2 block">
              {t("headline_2")}
            </span>
            <span className="bg-gradient-to-t from-white via-white to-white/40 bg-clip-text text-transparent block">
              {t("headline_3")}
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="md:text-xl leading-relaxed md:max-w-[600px] mt-8 text-base font-light text-slate-400/80 tracking-wide text-center max-w-[340px]">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-6 z-10">
          <a 
            href="#section-11"
            onClick={(e) => handleCtaClick(e, 11)}
            className="group h-12 px-8 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] w-full sm:w-auto focus:outline-none focus:ring-0 cursor-pointer"
          >
            {t("cta_primary")}
            <Icon icon="lucide:arrow-right" width={18} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a 
            href="#section-1"
            onClick={(e) => handleCtaClick(e, 1)}
            className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide focus:outline-none focus:ring-0 cursor-pointer"
          >
            {t("cta_secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
