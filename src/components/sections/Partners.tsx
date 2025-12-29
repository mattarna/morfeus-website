"use client";

import Image from "next/image";

/**
 * Partner data for rendering
 */
const PARTNERS = [
  { name: "H-FARM", image: "/images/logo (5).png" },
  { name: "Assemprim", image: "/images/logo (9).png" },
  { name: "Sisal", image: "/images/logo (6).png" },
  { name: "Sole 24h Formazione", image: "/images/logo (7).png" },
  { name: "Edison", image: "/images/logo (10).png" },
  { name: "Zara", image: "/images/logo.png" },
] as const;

import { useTranslations } from "next-intl";

/**
 * Partners Section - Index 2
 * 
 * Full viewport height with centered partner logos
 * Purple glow background effect
 */
export function Partners() {
  const t = useTranslations("Partners");

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex items-center justify-center bg-transparent py-20 lg:py-0">
      {/* Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] xl:w-[800px] h-[250px] md:h-[500px] bg-[#4e39ec]/20 rounded-full blur-[80px] md:blur-[100px] xl:blur-[120px] mix-blend-screen pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-4 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white text-center mb-10 sm:mb-16 md:mb-24 tracking-tight leading-tight uppercase">
          {t("title")}
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
          className="group h-14 md:h-16 px-6 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center gap-4 hover:bg-white/[0.08] transition-all duration-300 cursor-default min-w-[200px] md:min-w-[220px]"
        >
          <div className="relative w-7 h-7 md:w-8 md:h-8 flex-shrink-0">
            <Image
              src={partner.image}
              alt={partner.name}
              fill
              className="object-contain filter brightness-100 grayscale-[0.4] group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <span className="font-medium text-slate-200 group-hover:text-white transition-colors text-sm tracking-tight">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}
