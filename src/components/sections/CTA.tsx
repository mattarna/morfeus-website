"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1280;

/**
 * CTA Section - Index 13
 * 
 * Final call to action section with:
 * - Large gradient headline
 * - Subheadline
 * - Primary and secondary action buttons
 * - Subtle background glow effect
 */

export function CTA() {
  const t = useTranslations("CTA");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIsFormOpen = useScrollStore((state) => state.setIsContactFormOpen);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 13
  const isActive = !isDesktop || currentIndex === 13;

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

  return (
    <section className="relative z-0 min-h-screen xl:h-screen w-full flex items-center justify-center bg-black overflow-hidden px-5 sm:px-6 pt-28 pb-16 xl:py-0">
      {/* Layered Background Effects */}
      
      {/* Deep purple base gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(77, 57, 235, 0.15) 0%, transparent 60%)"
        }}
      />
      
      {/* Central orb glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-opacity duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(77, 57, 235, 0.25) 0%, rgba(77, 57, 235, 0.08) 40%, transparent 70%)"
        }}
      />
      
      {/* Top accent gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(139, 124, 247, 0.1) 0%, transparent 70%)"
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}
      />
      
      <div 
        className={`relative z-10 flex flex-col items-center text-center max-w-4xl 2xl:max-w-5xl mx-auto transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Headline - Impactful and unified size with orange accent */}
        <h2 className="text-[2.35rem] sm:text-5xl md:text-6xl xl:text-[4.25rem] 2xl:text-[5rem] font-black tracking-tighter text-white leading-[1.04] mb-7 xl:mb-10 uppercase">
          <span className="block mb-1 opacity-90">{t("headline_1")}</span>
          <span className="block mb-1">{t("headline_2")}</span>
          <span className="relative inline-block">
            <span className="relative z-10 text-white">
              {t("headline_3")}
            </span>
            {/* Fico Underline: Dual-layered orange brush effect */}
            <div className="absolute -bottom-1 left-0 w-full h-[5px] md:h-[8px] 2xl:h-[10px] bg-forge/40 blur-[2px] -rotate-1 rounded-full z-0" />
            <div className="absolute bottom-0 left-[2%] w-[96%] h-[3px] 2xl:h-[5px] bg-forge shadow-[0_0_18px_rgba(232,101,10,0.75)] -rotate-1 rounded-full z-0" />
          </span>
        </h2>

        {/* Subheadline - Better readability */}
        <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-normal text-slate-400 max-w-2xl 2xl:max-w-3xl mb-9 xl:mb-12 tracking-tight leading-relaxed text-balance">
          {t("subheadline")}
        </p>

        {/* Action Buttons - Refined weights */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-7 xl:mb-10">
          {/* Primary CTA */}
          <a 
            href="https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackCta(t("primary"), "cta_section", "external_link")}
            className="group h-12 sm:h-14 2xl:h-16 px-7 sm:px-9 2xl:px-12 bg-white text-black text-sm 2xl:text-[16px] font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0"
          >
            {t("primary")}
            <Icon 
              icon="solar:calendar-linear" 
              width={22} 
              className="transition-transform group-hover:scale-110" 
            />
          </a>

          {/* Secondary CTA */}
          <button 
            onClick={() => {
              trackCta(t("secondary"), "cta_section", "open_form");
              setIsFormOpen(true);
            }}
            className="group h-11 sm:h-14 2xl:h-16 px-5 sm:px-8 2xl:px-10 bg-transparent text-slate-400 hover:text-white transition-all text-sm 2xl:text-[16px] font-semibold tracking-wide flex items-center gap-2"
          >
            {t("secondary")}
            <Icon 
              icon="solar:arrow-right-up-linear" 
              width={20} 
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
            />
          </button>
        </div>

        {/* Microcopy - Trust Badge Style */}
        <div className="inline-flex max-w-full items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.03] border border-white/5 gap-2.5 sm:gap-3 text-slate-500 text-[10px] sm:text-xs 2xl:text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forge opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-forge"></span>
          </div>
          {t("microcopy")}
        </div>
      </div>
    </section>
  );
}
