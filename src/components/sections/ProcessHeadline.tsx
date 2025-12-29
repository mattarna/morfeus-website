"use client";

import { useTranslations } from "next-intl";

/**
 * Process Headline Section - Index 4
 * 
 * Simple transition section before the pinned process steps.
 * Large gradient headline only.
 * Hidden on mobile (Process section shows everything inline)
 */
export function ProcessHeadline() {
  const t = useTranslations("Process");
  
  return (
    <section className="relative h-screen w-full hidden lg:flex items-center justify-center bg-transparent">
      <h2 className="text-6xl md:text-8xl lg:text-9xl font-normal tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-[#E0CCFA]/70 leading-[0.9]">
        {t("headline")}
      </h2>
    </section>
  );
}
