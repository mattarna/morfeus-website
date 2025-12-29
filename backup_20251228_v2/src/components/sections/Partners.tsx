"use client";

import { Icon } from "@iconify/react";

/**
 * Partner data for rendering
 */
const PARTNERS = [
  { name: "FeatherDev", icon: "solar:code-scan-linear", iconColor: "text-green-500" },
  { name: "Figma", icon: "simple-icons:figma" },
  { name: "Gumroad", icon: "simple-icons:gumroad", uppercase: true },
  { name: "Amplitude", icon: "simple-icons:amplitude" },
  { name: "GlobalBank", icon: "solar:globus-linear", iconColor: "text-blue-500" },
  { name: "coinbase", icon: "simple-icons:coinbase" },
  { name: "_zapier", icon: "simple-icons:zapier", iconColor: "text-[#FF4F00]" },
] as const;

/**
 * Partners Section - Index 2
 * 
 * Full viewport height with centered partner logos
 * Purple glow background effect
 */
export function Partners() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black">
      {/* Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] xl:w-[800px] h-[300px] md:h-[500px] bg-[#4e39ec]/20 rounded-full blur-[100px] xl:blur-[120px] mix-blend-screen pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white text-center mb-16 md:mb-24 tracking-tight leading-tight">
          Our Valued Partners &amp; Clients
        </h2>
        
        {/* Partner Grid - Staggered Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-5xl">
          {/* Column 1 */}
          <PartnerColumn partners={[PARTNERS[0]]} />
          
          {/* Column 2 - Stacked */}
          <PartnerColumn partners={[PARTNERS[1], PARTNERS[2]]} />
          
          {/* Column 3 */}
          <PartnerColumn partners={[PARTNERS[3]]} />
          
          {/* Column 4 - Stacked */}
          <PartnerColumn partners={[PARTNERS[4], PARTNERS[5]]} />
          
          {/* Column 5 */}
          <PartnerColumn partners={[PARTNERS[6]]} />
        </div>
      </div>
    </section>
  );
}

/**
 * Partner column component for consistent styling
 */
function PartnerColumn({ partners }: { partners: readonly typeof PARTNERS[number][] }) {
  return (
    <div className="flex flex-col gap-5 w-full md:w-auto">
      {partners.map((partner) => (
        <div 
          key={partner.name}
          className="group h-14 md:h-16 px-6 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all duration-300 cursor-default min-w-[160px]"
        >
          <Icon 
            icon={partner.icon} 
            width={partner.icon.includes("solar") ? 20 : 18}
            className={partner.iconColor || "text-slate-300 group-hover:text-white transition-colors"}
          />
          <span className={`font-medium text-slate-200 group-hover:text-white transition-colors ${
            partner.uppercase ? "text-[11px] uppercase tracking-wide" : "text-sm"
          }`}>
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}
