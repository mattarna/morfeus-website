"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ServiceMobileMenu } from "./ServiceMobileMenu";

interface HeaderProps {
  showStickyCta: boolean;
  isHeaderHidden: boolean;
  scrollToContact: () => void;
  namespace?: string;
}

export function ServiceHeader({ showStickyCta, isHeaderHidden, scrollToContact, namespace = "Offerta" }: HeaderProps) {
  const t = useTranslations(namespace);
  const h = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[200] px-6 md:px-10 transition-all duration-700 ${
        showStickyCta || isMenuOpen ? "bg-black/20 backdrop-blur-xl border-b border-white/5 py-2.5" : "bg-transparent py-4"
      } ${
        isHeaderHidden && !isMenuOpen ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      }`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center group">
            <div className="relative w-28 h-8 md:w-40 md:h-12">
              <Image 
                src="/images/brand/morfeus-mark.png" 
                alt="Morfeus Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t("hero.system_tag")}</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all"
            >
              {isMenuOpen ? h("close") : h("menu")}
            </button>

            <button 
              onClick={scrollToContact}
              className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105 ${
              isHeaderHidden && !isMenuOpen ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-y-0"
            }`}>
              <span className="whitespace-nowrap">{t("ctas.sticky")}</span>
              <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </header>

      <ServiceMobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        scrollToSection={scrollToSection}
      />
    </>
  );
}


