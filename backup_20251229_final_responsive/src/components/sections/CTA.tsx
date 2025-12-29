"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";

const DESKTOP_BREAKPOINT = 1024;

/**
 * CTA Section - Index 11
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 11
  const isActive = !isDesktop || currentIndex === 11;

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex items-center justify-center bg-black overflow-hidden px-6 py-20 lg:py-0">
      {/* Background Glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4D39EB]/15 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      <div 
        className={`relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Headline with the same gradient as before */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E0CCFA]/70 leading-[0.95] mb-8 uppercase">
          {t("headline_1")}
          <br />
          {t("headline_2")}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl font-light text-slate-400 max-w-lg mb-12 tracking-wide leading-relaxed">
          {t("subheadline")}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          {/* Primary CTA */}
          <a 
            href="https://calendar.app.google/25SgJzTo2SCJk2dF7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group h-14 px-10 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] min-w-[220px] outline-none focus:outline-none"
          >
            {t("primary")}
            <Icon 
              icon="solar:calendar-linear" 
              width={18} 
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
            />
          </a>

          {/* Secondary CTA */}
          <a 
            href="mailto:info@morfeushub.com?subject=Detailed Request - Morfeus Consultation&body=Hello Morfeus Team,%0D%0A%0D%0AI would like to discuss a detailed AI transformation project for my organization.%0D%0A%0D%0ACompany Name:%0D%0AIndustry:%0D%0AKey Challenges:%0D%0AExpected Timeline:%0D%0A%0D%0AThank you!"
            className="group h-14 px-10 bg-white/5 border border-white/10 backdrop-blur-md text-white text-[15px] font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-w-[220px] outline-none focus:outline-none"
          >
            {t("secondary")}
            <Icon 
              icon="solar:arrow-right-up-linear" 
              width={18} 
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </a>
        </div>
      </div>
    </section>
  );
}
