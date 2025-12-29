"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { NAV_POINTS } from "@/app/lib/scrollConfig";

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_THRESHOLD = 50;

/**
 * Header - Fixed top navigation
 * 
 * Features:
 * - Logo with home navigation
 * - Language switcher (desktop)
 * - Book a call CTA
 * - Mobile menu with full-screen overlay
 */
export function Header() {
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track viewport size
  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Track native scroll for mobile header styling
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

  return (
    <>
      {/* Main Header */}
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
            <button onClick={() => handleNavClick(0)} className="select-none">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4fa39a65-8fd6-44a2-8334-b3c76d87bb10_1600w.png"
                alt="Morfeus Logo"
                className="h-3 md:h-4 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </button>
            
            {/* Language Switcher - Desktop only */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider">
              <button className="text-white hover:text-white/80 transition-colors px-1">EN</button>
              <span className="text-white/30">|</span>
              <button className="text-white/40 hover:text-white/80 transition-colors px-1">IT</button>
            </div>
          </div>

          {/* Right: CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
            {/* CTA Button */}
            <a 
              href="https://calendar.app.google/25SgJzTo2SCJk2dF7"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 rounded-full backdrop-blur-md uppercase tracking-widest transition-all ${
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

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMenuOpen}
        currentIndex={currentIndex}
        onNavClick={handleNavClick}
      />
    </>
  );
}

/**
 * Mobile menu overlay component
 */
function MobileMenu({ 
  isOpen, 
  currentIndex, 
  onNavClick 
}: { 
  isOpen: boolean;
  currentIndex: number;
  onNavClick: (index: number) => void;
}) {
  return (
    <div 
      className={`fixed inset-0 z-[90] bg-black/98 md:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white" />
      </div>

      <div className="flex flex-col h-full justify-between pt-32 pb-16 px-10 relative z-10">
        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.5em] text-indigo-500 font-bold mb-8">Menu</p>
          <div className="flex flex-col items-start gap-4">
            {NAV_POINTS.map((point, i) => {
              const isBook = point.label.toLowerCase().includes("book");
              const isActive = currentIndex >= point.range[0] && currentIndex <= point.range[1];
              
              return (
                <button
                  key={point.label}
                  onClick={() => onNavClick(point.index)}
                  className={`group flex items-baseline gap-4 text-5xl sm:text-6xl font-normal tracking-tighter text-left transition-all duration-700 ${
                    isOpen ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-10 blur-md"
                  } ${
                    isBook 
                      ? "text-indigo-500 hover:text-indigo-400" 
                      : isActive 
                        ? "text-white" 
                        : "text-white/40 hover:text-white"
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className={`text-[10px] font-mono tracking-normal -translate-y-6 ${
                    isBook ? "text-indigo-400" : isActive ? "text-white/60" : "text-slate-600"
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {point.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="pt-8 border-t border-white/5 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Contact</p>
            <a 
              href="mailto:info@morfeushub.com" 
              className="text-white text-base font-light hover:text-indigo-400 transition-colors"
            >
              info@morfeushub.com
            </a>
          </div>
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/company/morfeus-hub-ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.instagram.com/morfeushub.ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
