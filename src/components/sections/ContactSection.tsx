"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

interface ContactSectionProps {
  scrollToContact: () => void;
}

export function ContactSection({ scrollToContact }: ContactSectionProps) {
  const t = useTranslations("Offerta.contact");
  void scrollToContact;

  const scrollToRoi = () => {
    const element = document.getElementById("roi-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  void scrollToRoi;

  const footerPills = t.raw("footer_pills") as string[];

  return (
    <section id="contact" className="relative z-[130] py-32 md:py-48 px-6 xl:px-40 bg-night border-t border-white/[0.05] overflow-visible">
      <GridPattern />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="relative">
          <div className="px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-white/[0.02] border border-white/[0.05] rounded-[3rem] backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t("label")}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
                {t.rich("headline", {
                  br: () => <br />,
                  spanIndigo: (chunks) => <span className="text-indigo-400">{chunks}</span>
                })}
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed mb-12">
                {t("subtitle")}
              </p>

              <div className="flex justify-center">
                <a
                  href="https://cal.com/morfeus/operating-system-diagnosis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="on-page-cta group relative px-12 py-6 rounded-full font-black text-base uppercase tracking-widest transition-all duration-500 overflow-hidden shadow-[0_0_50px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_80px_-10px_rgba(79,70,229,0.7)] hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
                  <span className="relative z-10 flex items-center gap-3 text-white">
                    {t("cta")}
                    <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 md:mt-40">
          <div className="text-center mb-16">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">{t("call_section_title")}</h4>
            <div className="h-px w-16 bg-white/10 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {(["1", "2", "3"] as const).map((key) => (
              <div key={key} className="relative group">
                <span className="absolute -top-8 -left-4 text-6xl md:text-8xl font-black text-white/[0.03] group-hover:text-indigo-500/[0.05] transition-colors">{key}</span>
                <div className="relative z-10">
                  <h5 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                    {t(`call_steps.${key}.title`)}
                  </h5>
                  <p className="text-lg text-slate-300 font-normal leading-relaxed">
                    {t(`call_steps.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 pt-12 border-t border-white/[0.05] text-center">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 text-[11px] font-bold text-slate-100 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/20">
                <Icon icon="solar:close-circle-linear" className="w-3.5 h-3.5 text-rose-500" />
                {t("badges.no_demo")}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/20">
                <Icon icon="solar:close-circle-linear" className="w-3.5 h-3.5 text-rose-500" />
                {t("badges.no_sales")}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/20">
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5 text-indigo-400" />
                {t("badges.no_info")}
              </span>
            </div>

            <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 px-10 py-5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-slate-200 uppercase tracking-[0.2em] shadow-xl">
              {footerPills.map((pill, i) => (
                <Fragment key={pill}>
                  <span>{pill}</span>
                  {i < footerPills.length - 1 && <span className="opacity-20">|</span>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
