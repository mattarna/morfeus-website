"use client";

import { useTranslations } from "next-intl";

interface LabProgramSectionProps {
  namespace?: string;
}

export function LabProgramSection({ namespace = "Lab.program" }: LabProgramSectionProps) {
  const t = useTranslations(namespace);
  const tags = t.raw("tags") as string[];

  return (
    <section id="ai-champ" className="relative z-[100] py-24 md:py-40 px-6 xl:px-40 bg-[#0a111a] border-t border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
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

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {(["1", "2"] as const).map((key) => (
            <div key={key} className="text-center md:text-left p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05]">
              <div className="text-6xl md:text-8xl font-black tracking-[-0.04em] leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400 mb-4">
                {t(`stats.${key}.number`)}
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-300 mb-2">
                {t(`stats.${key}.label`)}
              </p>
              <p className="text-base text-slate-500 font-light">
                {t(`stats.${key}.sub`)}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-24">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold tracking-[0.08em] uppercase text-vista bg-indigo-500/[0.08] px-4 py-2 rounded-lg border border-indigo-500/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
