"use client";

import { Icon } from "@iconify/react";

/**
 * Service data for rendering
 */
const SERVICES = [
  {
    icon: "lucide:library",
    name: "Morf Lab",
    headline: "Experiential Workshops",
    description: "We apply AI to your processes, not to slides. Practical workshops to transform your teams into operational AI Champions.",
  },
  {
    icon: "lucide:git-merge",
    name: "Morf Path",
    headline: "AI Adoption & Governance",
    description: "We don't build prototypes. We build systems that work. Operational and scalable solutions in record time.",
  },
  {
    icon: "lucide:rocket",
    name: "Morf Forge",
    headline: "Development & Fast MVPs",
    description: "Free the team from repetitive tasks and value skills with the support of artificial intelligence.",
  },
] as const;

/**
 * Services Section - Index 3
 * 
 * Full viewport height with service cards grid
 * Purple gradient overlay on each card
 */
export function Services() {
  return (
    <section className="relative h-screen w-full flex items-center bg-black xl:px-[280px]">
      <div className="w-full flex flex-col justify-center px-6 md:px-12 xl:px-0 max-w-[1920px]">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end mb-12 gap-8 justify-between">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-light tracking-tighter text-white uppercase leading-[1.1]">
            OUR <span className="font-medium">SERVICES</span>
          </h1>
          <p className="text-base md:text-lg font-light text-slate-400 max-w-md leading-relaxed text-left xl:text-right pb-2">
            We combine strategy, skills and technology to guide companies in transformation, creating real impact and intelligent solutions.
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
function ServiceCard({ icon, name, headline, description }: typeof SERVICES[number]) {
  return (
    <div className="group relative flex flex-col justify-between p-10 xl:p-12 min-h-[500px] xl:min-h-[550px] bg-black overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4D39EB]/25 via-black/80 to-black pointer-events-none" />
      
      {/* Icon + Name */}
      <div className="relative z-10 flex items-center gap-4">
        <Icon icon={icon} width={32} className="text-white/90" />
        <span className="text-base font-normal text-slate-200 tracking-wide">{name}</span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mt-auto pt-10">
        <h3 className="text-3xl xl:text-4xl font-normal text-white mb-5 leading-tight">
          {headline}
        </h3>
        <p className="text-base text-slate-400 leading-relaxed max-w-xs group-hover:text-slate-200 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}
