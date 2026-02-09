"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface HeaderProps {
  showStickyCta: boolean;
  isHeaderHidden: boolean;
  scrollToContact: () => void;
}

export function Header({ showStickyCta, isHeaderHidden, scrollToContact }: HeaderProps) {
  const t = useTranslations("Offerta");

  return (
    <header className={`fixed top-0 left-0 w-full z-[200] px-6 md:px-10 transition-all duration-700 ${
      showStickyCta ? "bg-[#030508]/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
    } ${
      isHeaderHidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
    }`}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center group">
          <div className="relative w-28 h-8 md:w-40 md:h-12">
            <Image 
              src="/images/m-w2.png" 
              alt="Morfeus Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </a>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t("hero.system_tag")}</span>
          </div>

          <button 
            onClick={scrollToContact}
            className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105 ${
            isHeaderHidden ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-y-0"
          }`}>
            <span className="whitespace-nowrap">{t("ctas.sticky")}</span>
            <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

