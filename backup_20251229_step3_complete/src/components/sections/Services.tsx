"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

/**
 * Services Section - Index 3
 * 
 * Full viewport height with service cards grid
 * Purple gradient overlay on each card
 */
export function Services() {
  const t = useTranslations("Services");

  const SERVICES = [
    {
      icon: "lucide:library",
      name: t("items.lab.name"),
      headline: t("items.lab.headline"),
      description: t("items.lab.description"),
    },
    {
      icon: "lucide:git-merge",
      name: t("items.path.name"),
      headline: t("items.path.headline"),
      description: t("items.path.description"),
    },
    {
      icon: "lucide:rocket",
      name: t("items.forge.name"),
      headline: t("items.forge.headline"),
      description: t("items.forge.description"),
    },
  ];

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex items-center bg-black xl:px-[280px] py-20 lg:py-0">
      <div className="w-full flex flex-col justify-center px-6 md:px-12 xl:px-0 max-w-[1920px]">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end mb-8 sm:mb-12 gap-4 sm:gap-8 justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-light tracking-tighter text-white uppercase leading-[1.1]">
            {t("title_part1")} <span className="font-medium">{t("title_part2")}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-light text-slate-400 max-w-md leading-relaxed text-left xl:text-right pb-2">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full border border-white/10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
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
function ServiceCard({ icon, name, headline, description }: { icon: string; name: string; headline: string; description: string }) {
  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-10 xl:p-12 min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] bg-black overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4D39EB]/25 via-black/80 to-black pointer-events-none" />
      
      {/* Icon + Name */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
        <Icon icon={icon} width={28} className="text-white/90 sm:w-8" />
        <span className="text-sm sm:text-base font-normal text-slate-200 tracking-wide">{name}</span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mt-auto pt-6 sm:pt-10">
        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-normal text-white mb-3 sm:mb-5 leading-tight">
          {headline}
        </h3>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xs group-hover:text-slate-200 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}
