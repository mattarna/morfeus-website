"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Partner data for rendering
 */
const PARTNERS = [
  { name: "H-FARM", image: "/images/h-farm%20white.png" },
  { name: "Assemprim", image: "/images/logo (9).png" },
  { name: "Sisal", image: "/images/logo (6).png" },
  { name: "Sole 24h Formazione", image: "/images/logo (7).png" },
  { name: "Edison", image: "/images/logo (10).png" },
  { name: "Zara", image: "/images/logo.png" },
] as const;

/**
 * Partners Section - Index 2
 * 
 * Re-designed for high visibility and impact.
 */
export function Partners() {
  const t = useTranslations("Partners");

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full flex items-center justify-center bg-black py-20 lg:py-0 overflow-hidden">
      {/* Dynamic Background Effects - Enhanced Purple Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] xl:w-[1200px] h-[400px] md:h-[700px] bg-[#4e39ec]/20 rounded-[100%] blur-[120px] md:blur-[160px] xl:blur-[200px] mix-blend-screen pointer-events-none animate-pulse opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] xl:w-[700px] h-[200px] md:h-[400px] bg-[#4e39ec]/30 rounded-[100%] blur-[80px] md:blur-[120px] xl:blur-[150px] mix-blend-screen pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Title Group */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-tight uppercase mb-4">
            {t("title")}
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#4e39ec] to-transparent mx-auto" />
        </div>
        
        {/* New Grid Layout - High Visibility */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl">
          {PARTNERS.map((partner) => (
            <div 
              key={partner.name}
              className="group relative h-40 md:h-56 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-[#4e39ec]/30 hover:shadow-[0_0_30px_rgba(78,57,236,0.1)] overflow-hidden"
            >
              {/* Animated Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4e39ec]/0 via-[#4e39ec]/0 to-[#4e39ec]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Logo Container */}
              <div className="relative w-full h-16 md:h-24 mb-4 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1200px) 250px, 300px"
                  className="object-contain filter brightness-100 contrast-[0.9] group-hover:contrast-100 transition-all duration-500"
                />
              </div>
              
              {/* Partner Name - Always Visible with refined style */}
              <div className="relative z-10 text-center">
                <span className="text-xs md:text-sm font-medium text-slate-400 group-hover:text-white transition-colors duration-300 tracking-wider uppercase">
                  {partner.name}
                </span>
                <div className="h-[1px] w-0 group-hover:w-full bg-[#4e39ec] transition-all duration-500 mx-auto mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
