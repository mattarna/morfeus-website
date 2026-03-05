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
export function HomeHero() {
  const setIndex = useScrollStore((state) => state.setIndex);
  const t = useTranslations("Hero");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const trackCta = (text: string, location: string, type: string = "internal_link") => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "cta_click",
        cta_text: text,
        cta_location: location,
        cta_type: type,
      });
    }
  };

  const handleCtaClick = (e: React.MouseEvent, index: number, text: string) => {
    trackCta(text, "hero", "internal_link");
    if (isDesktop) {
      e.preventDefault();
      setIndex(index);
    } else {
      // On mobile, use scrollIntoView which is more reliable
      const element = document.getElementById(`section-${index}`);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20 lg:py-0">
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateY(-45%) scale(1.1); opacity: 0.5; }
        }
        .aura-animate {
          animation: pulse-glow 15s ease-in-out infinite;
        }
      `}</style>
      {/* Local Aura Glow - Refined for 9.5/10 look */}
      <div className="absolute top-0 w-full flex justify-center pointer-events-none z-0">
        <div className="aura-animate w-[400px] md:w-[800px] xl:w-[1200px] h-[400px] md:h-[600px] bg-majorelle/20 rounded-full blur-[120px] md:blur-[180px] xl:blur-[220px] -translate-y-1/2 mix-blend-screen" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto lg:-translate-y-4">
        {/* Alert Bar (Over-headline) - DESIGN UPGRADE */}
        <div className="mb-10 md:mb-14 w-fit mx-auto px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 animate-fadeIn hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/alert cursor-default max-w-full">
          <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forge opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forge shadow-[0_0_10px_rgba(232,101,10,0.8)]"></span>
          </div>
          <span className="text-[10px] md:text-[13px] uppercase font-bold text-ghost-white tracking-[0.1em] md:tracking-[0.25em] group-hover/alert:tracking-[0.3em] transition-all duration-500 leading-tight">
            {t("over_headline")}
          </span>
        </div>

        {/* Headline - REFINED FOR IMPACT */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full">
          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.1] md:leading-[1.05] font-black tracking-tighter uppercase break-words w-full">
            <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent block pb-1">
              {t("headline_part1")}
            </span>
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] block pb-1">
              {t("headline_part2")}
            </span>
            <span className="relative block">
              <span className="bg-gradient-to-t from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {t("headline_part3")}
              </span>
              {/* Subtle underline/accent for the "punch" line */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-transparent via-forge to-transparent opacity-60 rounded-full blur-[1px]" />
            </span>
          </h1>
        </div>

        {/* Subheadline - REFINED SPACING */}
        <div className="mt-8 md:mt-10 md:max-w-[750px] mx-auto">
          <p className="md:text-xl leading-relaxed text-[15px] md:text-base font-normal text-vista/70 tracking-wide text-center text-balance px-2 md:px-0">
            {t("subheadline")}
          </p>
        </div>

        {/* CTAs - REVERTED TO PILL STYLE AS REQUESTED */}
        <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center gap-6 z-10 w-full sm:w-auto px-6 md:px-0">
          <a 
            href="#section-13"
            onClick={(e) => handleCtaClick(e, 13, t("cta_primary"))}
            className="group h-14 md:h-12 px-10 bg-white text-black text-[15px] font-bold md:font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] w-full sm:min-w-[240px] sm:w-auto focus:outline-none focus:ring-0 cursor-pointer"
          >
            {t("cta_primary")}
            <Icon icon="lucide:arrow-right" width={18} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a 
            href="#section-10"
            onClick={(e) => handleCtaClick(e, 10, t("cta_secondary"))}
            className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide focus:outline-none focus:ring-0 cursor-pointer py-2"
          >
            {t("cta_secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
