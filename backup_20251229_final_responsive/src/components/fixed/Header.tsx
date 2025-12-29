"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { NAV_POINTS } from "@/app/lib/scrollConfig";
import { useLocale } from "next-intl";

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_THRESHOLD = 50;

/**
 * Header - Fixed top navigation
 */
export function Header() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const locale = useLocale();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = isDesktop ? currentIndex > 0 : hasScrolled;

  const handleNavClick = (index: number) => {
    setIndex(index);
    setIsMenuOpen(false);
  };

  // Determine the target locale
  const otherLocale = locale === "en" ? "it" : "en";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-10 md:py-6 transition-all duration-500 ${
          !isDesktop && isScrolled 
            ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-3" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          {/* Left: Logo + Language */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button onClick={() => handleNavClick(0)} className="select-none focus:outline-none focus:ring-0">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png"
                alt="Morfeus Logo"
                className="h-3 md:h-4 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </button>
            
            {/* Language Toggle - Desktop - Simple HTML Link */}
            <a 
              href={`/${otherLocale}`}
              className="hidden md:flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-all focus:outline-none focus:ring-0"
            >
              <span className={locale === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
              <span className="text-white/30 select-none font-thin">|</span>
              <span className={locale === 'it' ? 'text-white' : 'text-white/40'}>IT</span>
            </a>
          </div>

          {/* Right: CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
            <a 
              href="https://calendar.app.google/25SgJzTo2SCJk2dF7"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 rounded-full backdrop-blur-md uppercase tracking-widest transition-all focus:outline-none focus:ring-0 ${
                isDesktop 
                  ? "bg-white/5 border border-white/10 text-white py-3 px-8 text-xs font-semibold hover:bg-white/10" 
                  : "bg-[#4e39ec] border border-white/10 text-white py-2 px-5 text-[10px] font-bold shadow-[0_0_15px_-5px_rgba(78,57,234,0.4)]"
              }`}
            >
              <span className="hidden sm:inline">Book a call</span>
              <span className="sm:hidden">Book</span>
              <Icon
                icon="solar:arrow-right-up-linear"
                width={isDesktop ? 18 : 16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all focus:outline-none focus:ring-0"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        currentIndex={currentIndex}
        onNavClick={handleNavClick}
        currentLocale={locale}
        otherLocale={otherLocale}
      />
    </>
  );
}

function MobileMenu({ 
  isOpen, 
  currentIndex, 
  onNavClick,
  currentLocale,
  otherLocale,
}: { 
  isOpen: boolean;
  currentIndex: number;
  onNavClick: (index: number) => void;
  currentLocale: string;
  otherLocale: string;
}) {
  return (
    <div 
      className={`fixed inset-0 z-[90] bg-black md:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white" />
      </div>

      <div className="flex flex-col h-full justify-between pt-20 pb-8 px-6 relative z-10 overflow-y-auto">
        {/* Navigation Links */}
        <div className="flex flex-col items-start gap-2">
          {NAV_POINTS.map((point, i) => {
            const isBook = point.label.toLowerCase().includes("book");
            const isActive = currentIndex >= point.range[0] && currentIndex <= point.range[1];
            
            return (
              <button
                key={point.label}
                onClick={() => onNavClick(point.index)}
                className={`group flex items-center gap-3 text-xl font-normal tracking-tight text-left transition-all duration-700 focus:outline-none focus:ring-0 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                } ${
                  isBook 
                    ? "text-[#4D39EB] hover:text-[#6b5cf7]" 
                    : isActive 
                      ? "text-white" 
                      : "text-white/50 hover:text-white"
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className={`text-[10px] font-mono tracking-normal ${
                  isBook ? "text-[#4D39EB]" : isActive ? "text-[#4D39EB]" : "text-slate-600"
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {point.label}
                {isBook && (
                  <Icon icon="solar:arrow-right-up-linear" width={16} className="ml-1" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col gap-4 mt-6 flex-shrink-0">
          {/* Language Toggle */}
          <div className="flex items-center gap-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">Language</p>
            <a 
              href={`/${otherLocale}`}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-all focus:outline-none focus:ring-0"
            >
              <span className={currentLocale === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
              <span className="text-white/20 select-none font-thin">|</span>
              <span className={currentLocale === 'it' ? 'text-white' : 'text-white/40'}>IT</span>
            </a>
          </div>

          {/* Contact & Social */}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Contact</p>
                <a 
                  href="mailto:info@morfeushub.com" 
                  className="text-white text-sm font-light hover:text-[#4D39EB] transition-colors"
                >
                  info@morfeushub.com
                </a>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/company/morfeus-hub-ai/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] uppercase tracking-widest text-slate-500 font-bold hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/morfeushub.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] uppercase tracking-widest text-slate-500 font-bold hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
