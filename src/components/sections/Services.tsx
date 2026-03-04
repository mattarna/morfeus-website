"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useScrollStore } from "@/app/store/useScrollStore";

/**
 * Services Section - Index 4
 * 
 * Full viewport height with service cards grid
 * Purple gradient overlay on each card
 */
export function Services() {
  const t = useTranslations("Services");

  const SERVICES = [
    {
      icon: "lucide:target",
      name: t("items.forge.name"),
      headline: t("items.forge.headline"),
      description: t("items.forge.description"),
      ctaPrimary: t("items.forge.cta_primary"),
      ctaSecondary: t("items.forge.cta_secondary"),
      href: "#section-13", // Book a call section
    },
    {
      icon: "lucide:library",
      name: t("items.lab.name"),
      headline: t("items.lab.headline"),
      description: t("items.lab.description"),
      ctaPrimary: t("items.lab.cta_primary"),
      ctaSecondary: t("items.lab.cta_secondary"),
      href: "#section-13",
    },
  ];

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full flex items-center bg-black xl:px-[280px] py-20 lg:py-0">
      <div className="relative z-10 w-full flex flex-col justify-center px-6 md:px-12 xl:px-0 max-w-[1920px]">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end mb-12 sm:mb-16 gap-6 sm:gap-10 justify-between">
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-light tracking-tighter text-white uppercase leading-[1.1]">
            {t("title_part1")} <span className="font-medium">{t("title_part2")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-slate-400 max-w-xl leading-relaxed text-left xl:text-right pb-2">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(77,57,235,0.15)]">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Service card component
 */
function ServiceCard({ 
  icon, 
  name, 
  headline, 
  description,
  ctaPrimary,
  ctaSecondary,
  href 
}: { 
  icon: string; 
  name: string; 
  headline: string; 
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  href: string;
}) {
  const setIndex = useScrollStore((state) => state.setIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 1024) return true;
      if (window.matchMedia('(pointer: coarse)').matches && 
          window.matchMedia('(hover: none)').matches) {
        return true;
      }
      return false;
    };
    
    const updateViewport = () => setIsDesktop(!checkIsMobile());
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const handleCtaClick = (index: number) => {
    if (isDesktop) {
      setIndex(index);
    } else {
      const element = document.getElementById(`section-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="group relative flex flex-col justify-between p-8 sm:p-12 xl:p-14 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[650px] bg-[#050505] transition-all duration-500 hover:bg-[#080808]">
      {/* Gradient Overlay - More defined */}
      <div className="absolute inset-0 bg-gradient-to-br from-majorelle/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Icon + Name */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-majorelle/30 transition-colors">
          <Icon icon={icon} width={24} className="text-white group-hover:text-majorelle transition-colors" />
        </div>
        <span className="text-sm sm:text-base font-medium text-slate-300 tracking-wider uppercase">{name}</span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mt-auto">
        <h3 className="text-2xl sm:text-4xl xl:text-5xl font-normal text-white mb-6 sm:mb-8 leading-tight tracking-tight">
          {headline}
        </h3>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg mb-10 sm:mb-12 group-hover:text-slate-300 transition-colors">
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href={href}
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick(13); // Book call section
            }}
            className="h-11 px-8 bg-white text-black text-[14px] font-semibold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)] w-full sm:w-auto cursor-pointer"
          >
            {ctaPrimary}
            <Icon icon="lucide:arrow-right" width={16} />
          </a>
          <a 
            href={href}
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick(13); // Or relevant section
            }}
            className="text-[14px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide cursor-pointer"
          >
            {ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
