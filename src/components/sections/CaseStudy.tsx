"use client";

import { useState, useCallback, useEffect } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DESKTOP_BREAKPOINT = 1024;

/**
 * Case Study Section - Index 9
 * 
 * Interactive showcase of client success stories with:
 * - Dynamic background images that crossfade (desktop)
 * - Stacked cards with images (mobile)
 * - Animated metric headline (left side on desktop)
 * - Case study menu with hover preview (right side on desktop)
 */

interface CaseStudyData {
  id: string;
  name: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  image: string;
}

export function CaseStudy() {
  const t = useTranslations("CaseStudy");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // On mobile: always visible. On desktop: only when at index 9
  const isActive = !isDesktop || currentIndex === 9;
  
  const caseStudies: CaseStudyData[] = [
    {
      id: "salescraft",
      name: t("cases.salescraft.name"),
      metric: t("cases.salescraft.metric"),
      metricLabel: t("cases.salescraft.metricLabel"),
      description: t("cases.salescraft.description"),
      tags: t.raw("cases.salescraft.tags"),
      image: "/images/Background (2).webp",
    },
    {
      id: "marketing-army",
      name: t("cases.marketing_army.name"),
      metric: t("cases.marketing_army.metric"),
      metricLabel: t("cases.marketing_army.metricLabel"),
      description: t("cases.marketing_army.description"),
      tags: t.raw("cases.marketing_army.tags"),
      image: "/images/Background (5).webp",
    },
    {
      id: "ai-champ",
      name: t("cases.ai_champ.name"),
      metric: t("cases.ai_champ.metric"),
      metricLabel: t("cases.ai_champ.metricLabel"),
      description: t("cases.ai_champ.description"),
      tags: t.raw("cases.ai_champ.tags"),
      image: "/images/Background (3).webp",
    },
  ];

  const [activeCase, setActiveCase] = useState(0);
  const [previewCase, setPreviewCase] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // The displayed case is either the preview (on hover) or the active (confirmed)
  const displayedCase = previewCase !== null ? previewCase : activeCase;
  const currentData = caseStudies[displayedCase];

  const handleCaseClick = useCallback((index: number) => {
    if (index === activeCase) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCase(index);
      setPreviewCase(null);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);
  }, [activeCase]);

  const handleCaseHover = useCallback((index: number) => {
    if (index !== activeCase) {
      setPreviewCase(index);
    }
  }, [activeCase]);

  const handleMenuLeave = useCallback(() => {
    setPreviewCase(null);
  }, []);

  // Mobile Layout: Stacked cards
  if (!isDesktop) {
    return (
      <section className="relative w-full bg-transparent py-20 px-6">
        {/* Section Header */}
        <div className="max-w-[1400px] mx-auto mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#4D39EB] font-semibold">
            {t("label")}
          </h2>
        </div>

        {/* Stacked Cards */}
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="relative rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <Image
                  src={cs.image}
                  alt={cs.name}
                  fill
                  className="object-cover grayscale-[30%] opacity-40"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 sm:p-8 flex flex-col gap-4">
                {/* Metric */}
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tighter leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D39EB] to-[#4D39EB]/60">
                    {cs.metric}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20 ml-2">
                    {cs.metricLabel}
                  </span>
                </h2>

                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                  {cs.name}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed">
                  {cs.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {cs.tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-[#4D39EB]/15 border border-[#4D39EB]/30 backdrop-blur-sm"
                    >
                      <span className="text-xs font-medium text-white/90">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Layout: Interactive
  return (
    <section className="relative h-screen w-full bg-transparent overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {caseStudies.map((cs, index) => (
          <div
            key={cs.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === displayedCase ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 z-10" />
            {/* Image */}
            <Image
              src={cs.image}
              alt={cs.name}
              fill
              className={`object-cover grayscale-[30%] transition-all duration-1000 ${
                index === displayedCase ? "scale-100 opacity-40" : "scale-110 opacity-0"
              }`}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div 
        className={`relative z-20 h-full w-full max-w-[1600px] mx-auto px-12 xl:px-[140px] grid grid-cols-2 gap-16 items-end py-24 transition-all duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* LEFT: Metric Display */}
        <div className="flex flex-col justify-end">
          <div 
            className={`transition-all duration-500 ease-out ${
              isTransitioning ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-0"
            }`}
          >
            <h2 className="text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D39EB] to-[#4D39EB]/60">
                {currentData.metric}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20 ml-4">
                {currentData.metricLabel}
              </span>
            </h2>
          </div>
        </div>

        {/* RIGHT: Menu & Details */}
        <div className="flex flex-col h-full justify-between pt-16">
          {/* Case Study Menu */}
          <div 
            className="flex flex-col gap-6"
            onMouseLeave={handleMenuLeave}
          >
            {caseStudies.map((cs, index) => {
              const isItemActive = index === activeCase;
              const isItemDisplayed = index === displayedCase;

              return (
                <button
                  key={cs.id}
                  onClick={() => handleCaseClick(index)}
                  onMouseEnter={() => handleCaseHover(index)}
                  className="group flex items-center gap-6 text-left transition-all duration-300 outline-none select-none focus:outline-none focus:ring-0 focus:border-none active:outline-none"
                >
                  {/* Number */}
                  <span 
                    className={`text-sm font-medium font-mono transition-colors duration-300 ${
                      isItemDisplayed 
                        ? "text-[#4D39EB]" 
                        : "text-slate-500 group-hover:text-[#4D39EB]"
                    }`}
                  >
                    C{index + 1}
                  </span>
                  
                  {/* Name */}
                  <span 
                    className={`text-4xl lg:text-5xl font-normal tracking-tight transition-all duration-300 ${
                      isItemDisplayed 
                        ? "text-white" 
                        : "text-white/30 group-hover:text-white/60"
                    }`}
                  >
                    {cs.name}
                  </span>

                  {/* Active indicator */}
                  {isItemActive && (
                    <div className="w-2 h-2 rounded-full bg-[#4D39EB] ml-auto animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Description & Tags */}
          <div 
            className={`flex flex-col gap-8 max-w-xl transition-all duration-500 ease-out ${
              isTransitioning ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-0"
            }`}
          >
            {/* Description */}
            <p className="text-lg lg:text-xl font-light text-slate-300 leading-relaxed">
              {currentData.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {currentData.tags.map((tag, tagIndex) => (
                <div
                  key={tag}
                  className="px-6 py-2.5 rounded-full bg-[#4D39EB]/15 border border-[#4D39EB]/30 backdrop-blur-sm transition-all duration-300 hover:bg-[#4D39EB]/25 hover:border-[#4D39EB]/50"
                  style={{ 
                    transitionDelay: `${tagIndex * 50}ms`,
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)'
                  }}
                >
                  <span className="text-sm font-medium text-white/90">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
