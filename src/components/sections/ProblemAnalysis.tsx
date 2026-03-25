"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

const SYMPTOM_ICONS = [
  "solar:bill-list-bold-duotone",
  "solar:wallet-money-bold-duotone",
  "solar:settings-minimalistic-bold-duotone",
  "solar:fire-bold-duotone",
] as const;

const TRAP_CARD_ICONS = [
  "solar:cart-large-bold-duotone",
  "solar:user-block-bold-duotone",
  "solar:graph-down-bold-duotone",
] as const;

interface ProblemAnalysisProps {
  namespace?: string;
}

export function ProblemAnalysis({ namespace = "Offerta.problem_analysis" }: ProblemAnalysisProps) {
  const t = useTranslations(namespace);

  return (
    <section id="problem-analysis" className="relative z-30 py-24 md:py-40 px-6 xl:px-40 bg-[#0a111a] border-y border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-32 md:mb-48">
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">{t("label")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="text-slate-400/80">{chunks}</span>
            })}
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {(["1", "2", "3", "4"] as const).map((key, idx) => (
              <div key={key} className="group relative p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:bg-white/[0.05]">
                <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-colors duration-500">
                  <Icon icon={SYMPTOM_ICONS[idx]} className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon icon={SYMPTOM_ICONS[idx]} className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tight">{t(`symptoms.${key}.title`)}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {t(`symptoms.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="aggravante" className="relative">
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-forge/20 bg-forge/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-forge" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-forge">{t("trap_label")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 uppercase leading-[1.1]">
              {t.rich("trap_headline", {
                br: () => <br />,
                spanSub: (chunks) => <span className="text-forge/50">{chunks}</span>
              })}
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
              {t("trap_subtitle")}
            </p>
          </div>

          <div className="relative mb-16 md:mb-24 p-8 md:p-10 rounded-[2.5rem] border border-forge/20 bg-[#1a110a] overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-forge/[0.03] group-hover:text-forge/[0.05] transition-colors duration-700">
              <Icon icon="solar:danger-bold" className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full bg-forge/10 flex items-center justify-center border border-forge/20">
                <Icon icon="solar:danger-bold" className="w-10 h-10 md:w-12 md:h-12 text-forge/80" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  {t("trap_stat")}
                </p>
                <div className="flex items-center gap-2 text-forge/60 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                  <span className="w-8 h-px bg-forge/20" />
                  {t("trap_source")}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32">
            {(["1", "2", "3"] as const).map((key, idx) => (
              <div key={key} className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-forge/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-forge/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-6 w-12 h-12 rounded-xl bg-forge/5 flex items-center justify-center border border-forge/10 group-hover:scale-110 transition-transform">
                  <Icon icon={TRAP_CARD_ICONS[idx]} className="w-6 h-6 text-forge/60" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-4 uppercase">{t(`trap_cards.${key}.title`)}</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                  {t(`trap_cards.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative py-8 px-12 md:py-12 md:px-20 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
              <p className="relative z-10 text-2xl md:text-4xl font-black text-white uppercase tracking-tight max-w-4xl leading-tight">
                {t("trap_closing")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
