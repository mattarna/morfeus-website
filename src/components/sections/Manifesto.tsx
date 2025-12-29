"use client";

import { useTranslations } from "next-intl";

/**
 * Manifesto Section - Index 1 (Vision)
 * 
 * Full viewport height with centered text
 * Gradient text effect on the manifesto statement
 */
export function Manifesto() {
  const t = useTranslations("Manifesto");

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full flex items-center justify-center bg-black py-20 lg:py-0">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed sm:leading-snug font-normal text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 tracking-tight">
          {t("text")}
        </h2>
      </div>
    </section>
  );
}
