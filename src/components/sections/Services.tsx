"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useScrollStore } from "@/app/store/useScrollStore";
import { Link } from "@/i18n/navigation";

type ServiceSecondaryHref = "/forge" | "/lab";

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
      secondaryHref: "/forge" as ServiceSecondaryHref,
    },
    {
      icon: "lucide:library",
      name: t("items.lab.name"),
      headline: t("items.lab.headline"),
      description: t("items.lab.description"),
      ctaPrimary: t("items.lab.cta_primary"),
      ctaSecondary: t("items.lab.cta_secondary"),
      href: "#section-13",
      secondaryHref: "/lab" as ServiceSecondaryHref,
    },
  ];

  return (
    <section className="relative z-0 min-h-screen xl:h-screen w-full flex items-center bg-black pt-28 pb-16 xl:py-0">
      <div className="relative z-10 w-full flex flex-col justify-center px-5 sm:px-6 md:px-10 lg:px-14 xl:px-24 2xl:px-48 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end mb-8 sm:mb-10 xl:mb-12 gap-5 sm:gap-7 xl:gap-10 justify-between">
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-6xl font-light tracking-tighter text-white uppercase leading-[1.1] whitespace-nowrap">
            {t("title_part1")} <span className="font-medium">{t("title_part2")}</span>
          </h2>
          <p className="text-sm sm:text-base 2xl:text-[17px] font-light text-slate-400 max-w-lg leading-relaxed text-left xl:text-right">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6 xl:gap-8 2xl:gap-10">
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
  href,
  secondaryHref
}: { 
  icon: string; 
  name: string; 
  headline: string; 
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  href: string;
  secondaryHref: ServiceSecondaryHref;
}) {
  const setIndex = useScrollStore((state) => state.setIndex);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 1280) return true;
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
    <div className="group relative flex flex-col p-6 sm:p-8 xl:p-10 2xl:p-12 min-h-[340px] sm:min-h-[360px] xl:min-h-[400px] 2xl:min-h-[460px] bg-[#080808]/40 border border-white/10 rounded-2xl transition-all duration-500 hover:bg-[#0a0a0a] hover:border-white/20 shadow-[0_0_50px_-12px_rgba(77,57,235,0.05)] hover:shadow-[0_0_50px_-12px_rgba(77,57,235,0.15)]">
      {/* Gradient Overlay - More defined */}
      <div className="absolute inset-0 bg-gradient-to-br from-majorelle/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
      
      {/* Icon + Name */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-majorelle/30 transition-colors">
          <Icon icon={icon} width={22} className="text-white group-hover:text-majorelle transition-colors" />
        </div>
        <span className="text-[11px] sm:text-[12px] font-bold text-slate-400 tracking-[0.2em] uppercase">{name}</span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow mt-8 sm:mt-10 xl:mt-12">
        <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-normal text-white mb-4 sm:mb-5 2xl:mb-6 leading-tight tracking-tight">
          {headline}
        </h3>
        <p className="text-sm sm:text-[15px] 2xl:text-base text-slate-400 leading-relaxed max-w-lg mb-7 2xl:mb-10 group-hover:text-slate-300 transition-colors">
          {description}
        </p>

        {/* CTAs */}
        <div className="mt-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          <a 
            href={href}
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick(13); // Book call section
            }}
            className="h-11 px-8 bg-white text-black text-[14px] font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)] w-full sm:w-auto shrink-0 whitespace-nowrap cursor-pointer"
          >
            {ctaPrimary}
            <Icon icon="solar:arrow-right-bold" width={16} />
          </a>
          <Link 
            href={secondaryHref}
            className="text-[13px] font-bold text-slate-500 hover:text-white transition-colors tracking-wider cursor-pointer uppercase whitespace-nowrap"
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
