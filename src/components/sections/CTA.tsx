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
  const setIsFormOpen = useScrollStore((state) => state.setIsContactFormOpen);
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
    <section className="relative min-h-screen lg:h-screen w-full flex items-center justify-center bg-transparent overflow-hidden px-6 py-20 lg:py-0">
      {/* Layered Background Effects */}
      
      {/* Deep purple base gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(77, 57, 235, 0.15) 0%, transparent 60%)"
        }}
      />
      
      {/* Central orb glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(77, 57, 235, 0.25) 0%, rgba(77, 57, 235, 0.08) 40%, transparent 70%)"
        }}
      />
      
      {/* Top accent gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(139, 124, 247, 0.1) 0%, transparent 70%)"
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}
      />
      
      <div 
        className={`relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Headline - clean white */}
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tighter text-white leading-[0.95] mb-8 uppercase drop-shadow-[0_0_60px_rgba(77,57,235,0.3)]">
          {t("headline_1")}
          <br />
          {t("headline_2")}
        </h2>

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

          {/* Secondary CTA - Opens Global Contact Form */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="group h-14 px-10 bg-white/5 border border-white/10 backdrop-blur-md text-white text-[15px] font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-w-[220px] outline-none focus:outline-none"
          >
            {t("secondary")}
            <Icon 
              icon="solar:arrow-right-up-linear" 
              width={18} 
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </button>
        </div>
      </div>
    </section>
  );
}
