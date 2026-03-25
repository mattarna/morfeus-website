"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface LabOutcomesSectionProps {
  namespace?: string;
}

export function LabOutcomesSection({ namespace = "Lab.outcomes" }: LabOutcomesSectionProps) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Record<string, { title: string; desc: string; icon: string }>;

  return (
    <section id="outcomes" className="relative z-[80] py-24 md:py-40 px-6 xl:px-40 bg-[#0a111a] border-t border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t("label")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="text-slate-400/80">{chunks}</span>
            })}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(items).map(([key, item]) => (
            <div
              key={key}
              className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] transition-all duration-500 hover:border-indigo-500/30 hover:bg-white/[0.05] overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 group-hover:bg-indigo-500/10 blur-[40px] rounded-full transition-colors duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#030508] border border-white/10 flex items-center justify-center mb-8 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-indigo-500/30 relative">
                  <Icon icon={item.icon} className="w-7 h-7 text-slate-400 transition-colors duration-500 group-hover:text-indigo-400" />
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_10px_#00E5A0] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#00E5A0] transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug uppercase tracking-tight group-hover:text-indigo-50">
                  {item.title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg">
                  {item.desc}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500/60 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
