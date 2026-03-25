"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

interface LabInvestmentSectionProps {
  namespace?: string;
  scrollToContact: () => void;
}

export function LabInvestmentSection({
  namespace = "Lab.investment",
  scrollToContact,
}: LabInvestmentSectionProps) {
  const t = useTranslations(namespace);
  const cardItems = Object.values(
    t.raw("card.items") as Record<string, string>
  );

  return (
    <section
      id="investment"
      className="relative z-[85] py-24 md:py-40 px-6 xl:px-40 bg-night border-y border-white/[0.05] overflow-visible"
    >
      <GridPattern />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              {t("label")}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
            <span className="block">{t("headline.line1")}</span>
            <span className="block text-slate-300">{t("headline.line2")}</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-[2.5rem] p-8 md:p-12 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.08] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-4xl md:text-6xl font-black tracking-[-0.03em] text-white">
              {t("card.price")}
            </p>
          </div>

          <div className="space-y-4 md:space-y-5 mb-10 md:mb-12">
            {cardItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <Icon
                  icon="solar:check-circle-bold"
                  className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"
                />
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={scrollToContact}
              className="on-page-cta group relative px-12 py-5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
              <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                {t("card.cta")}
                <Icon
                  icon="solar:arrow-right-linear"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm md:text-base text-slate-500 font-light max-w-3xl mx-auto mt-8 leading-relaxed">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
