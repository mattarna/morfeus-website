"use client";

import { useState, useEffect } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

const DESKTOP_BREAKPOINT = 1024;

/**
 * Footer Section - Index 12
 * 
 * Exact match to reference image:
 * - 4-column layout on desktop, 2-column on mobile
 * - Deep blue/purple gradient from bottom (#110D33)
 * - Giant background logo mark (hidden on mobile)
 * - Navigation, Social, Info, and Branding/Contact columns
 */

export function Footer({ forceActive = false }: { forceActive?: boolean }) {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 12 or forceActive is true
  const isActive = !isDesktop || currentIndex === 12 || forceActive;
  
  const currentYear = new Date().getFullYear();

  // Navigation items - exact match to reference
  const navItems = [
    { label: t("links.start"), index: 0 },
    { label: t("links.vision"), index: 1 },
    { label: t("links.services"), index: 3 },
    { label: t("links.method"), index: 4 },
    { label: t("links.roi"), index: 8 },
    { label: t("links.cases"), index: 9 },
    { label: t("links.faq"), index: 10 },
    { label: t("links.book"), index: 11 },
  ];

  return (
    <section className="relative min-h-screen lg:h-screen w-full bg-[#070711] flex flex-col justify-center overflow-hidden py-20 lg:py-0">
      
      {/* Deep blue/purple gradient overlay from bottom - MORE COLOR */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to top, #110D33 0%, rgba(17, 13, 51, 0.8) 25%, rgba(17, 13, 51, 0.4) 50%, transparent 75%)"
        }}
      />

      {/* Horizontal grid lines - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
        {/* Line above content area */}
        <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-white/[0.04]" />
        {/* Line at content start */}
        <div className="absolute top-[38%] left-0 right-0 h-[1px] bg-white/[0.04]" />
      </div>

      {/* Vertical grid lines - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:flex justify-between max-w-[1920px] mx-auto px-6 md:px-10">
        <div className="w-[1px] h-full bg-white/[0.04]" />
        <div className="w-[1px] h-full bg-white/[0.04]" />
        <div className="w-[1px] h-full bg-white/[0.04]" />
        <div className="w-[1px] h-full bg-white/[0.04]" />
      </div>

      {/* 1. MAIN FOOTER CONTENT GRID - single column on mobile */}
      <div 
        className={`relative z-20 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-y-12 gap-x-8 md:gap-x-20 lg:gap-x-28 px-6 md:px-16 lg:px-20 transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Col 1: Navigation */}
        <div className="flex flex-col gap-4 md:gap-8">
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">{t("nav")}</h4>
          <div className="flex flex-col gap-2 md:gap-3 items-start">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => setIndex(item.index)}
                className="text-slate-300 hover:text-white transition-colors text-[17px] font-light outline-none"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 2: Social - Follow Us */}
        <div className="flex flex-col gap-4 md:gap-8">
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">{t("social")}</h4>
          <div className="flex flex-col gap-2 md:gap-3 items-start">
            <a href="https://www.linkedin.com/company/morfeus-hub-ai/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-[17px] font-light">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-[17px] font-light">X (Twitter)</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-[17px] font-light">Youtube</a>
          </div>
        </div>

        {/* Col 3: Info */}
        <div className="flex flex-col gap-4 md:gap-8">
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">{t("info")}</h4>
          <div className="flex flex-col gap-2 md:gap-3 items-start">
            <a 
              href={`/${locale}/privacy`}
              className="text-slate-300 hover:text-white transition-colors text-[17px] font-light outline-none"
            >
              {t("privacy")}
            </a>
            <a 
              href={`/${locale}/cookies`}
              className="text-slate-300 hover:text-white transition-colors text-[17px] font-light outline-none"
            >
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Col 4: Branding & Contact */}
        <div className="flex flex-col gap-6 md:gap-8 items-start md:items-end text-left md:text-right">
          {/* Matrix Quote - Stylized */}
          <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase">
            {locale === "it" ? (
              <>
                <span className="text-red-500">Pillola rossa</span>
                <span className="text-slate-500 mx-1">o</span>
                <span className="text-blue-500">pillola blu</span>
                <span className="text-slate-400">. A te la scelta.</span>
              </>
            ) : (
              <>
                <span className="text-red-500">Red pill</span>
                <span className="text-slate-500 mx-1">or</span>
                <span className="text-blue-500">blue pill</span>
                <span className="text-slate-400">. The choice is yours.</span>
              </>
            )}
          </p>
          
          <div className="flex flex-col gap-3 items-start md:items-end mt-2">
            <a href="mailto:hello@morfeushub.com" className="text-white text-lg font-normal hover:text-[#9B8FD9] transition-colors">hello@morfeushub.com</a>
            <p className="text-[13px] text-slate-400 font-light">Milano, Italia</p>
            <p className="text-[11px] text-slate-500 font-mono tracking-wide">P.IVA 14209210963</p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2 mt-8">
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              ©{currentYear} Morfeus. {t("copyright")}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-[#4D39EB]">💜</span>
              <span className="italic">Made with love, by Morfeus and a lot of AI.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. GIANT BACKGROUND WORDMARK - Hidden on mobile */}
      <div 
        className={`absolute bottom-0 left-0 right-0 select-none pointer-events-none transition-all duration-[1.5s] ease-out hidden lg:block ${
          isActive ? "opacity-[0.15] translate-y-[30%]" : "opacity-0 translate-y-[50%]"
        }`}
      >
        <div className="relative w-full max-w-[1400px] aspect-[4/1] mx-auto">
          <Image 
            src="/images/m-w2.png" 
            alt="Morfeus Logo Large" 
            fill
            className="object-contain" 
            style={{
              filter: "brightness(0.9) saturate(1.3)",
              mixBlendMode: "lighten"
            }}
          />
        </div>
      </div>

      {/* System Status - only one here */}
      <div className={`absolute right-8 bottom-6 z-30 flex gap-2 items-center transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-[0.15em]">System Operational</span>
      </div>

    </section>
  );
}
