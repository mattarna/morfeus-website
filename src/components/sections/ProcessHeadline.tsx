"use client";

import { useTranslations } from "next-intl";

/**
 * Process Headline Section - Index 5
 *
 * Simple transition section before the pinned process steps.
 * Eyebrow + gradient headline on two lines.
 * Hidden on mobile (Process section shows everything inline)
 */
export function ProcessHeadline() {
  const t = useTranslations("Process");

  return (
    <section className="relative z-0 h-screen w-full hidden xl:flex flex-col items-center justify-center bg-black px-10">
      <span className="relative z-10 text-[11px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-8">
        {t("eyebrow")}
      </span>
      <h2 className="relative z-10 text-5xl xl:text-7xl 2xl:text-8xl font-normal tracking-tighter text-center bg-clip-text text-transparent bg-linear-to-b from-white to-[#E0CCFA]/70 leading-[0.95] text-balance">
        {t("headline_1")}<br />
        {t("headline_2")}
      </h2>
    </section>
  );
}
