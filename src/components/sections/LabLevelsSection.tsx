"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";

const TIER_IDS = ["literate", "champion", "architect"] as const;

const TIER_CONFIG = {
  literate: {
    icon: "solar:book-bold-duotone",
    accentColor: "text-vista",
    borderColor: "border-white/[0.05]",
    bgGlow: "",
    badgeBg: "bg-vista/10 border-vista/20",
    badgeText: "text-vista",
  },
  champion: {
    icon: "solar:star-bold-duotone",
    accentColor: "text-neon",
    borderColor: "border-indigo-500/30",
    bgGlow: "shadow-[0_20px_50px_-20px_rgba(83,61,252,0.3)]",
    badgeBg: "bg-indigo-500/10 border-indigo-500/20",
    badgeText: "text-indigo-400",
  },
  architect: {
    icon: "solar:cpu-bolt-bold-duotone",
    accentColor: "text-forge",
    borderColor: "border-forge/20",
    bgGlow: "",
    badgeBg: "bg-forge/10 border-forge/20",
    badgeText: "text-forge",
  },
} as const;

interface LabLevelsSectionProps {
  namespace?: string;
}

export function LabLevelsSection({ namespace = "Lab.levels" }: LabLevelsSectionProps) {
  const t = useTranslations(namespace);

  return (
    <section id="levels" className="relative z-40 py-24 md:py-40 px-6 xl:px-40 bg-night border-y border-white/[0.05] overflow-visible">
      <GridPattern />

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {TIER_IDS.map((tierId, idx) => {
            const config = TIER_CONFIG[tierId];
            const isTarget = tierId === "champion";

            return (
              <div
                key={tierId}
                className={`group relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border ${config.borderColor} ${config.bgGlow} transition-all duration-500 hover:bg-white/[0.05] flex flex-col ${isTarget ? "lg:-mt-4 lg:-mb-4 lg:scale-[1.02]" : ""}`}
              >
                {isTarget && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.badgeBg} mb-6 w-fit`}>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${config.badgeText}`}>
                      {t(`tiers.${tierId}.tag`)}
                    </span>
                  </div>

                  <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <Icon icon={config.icon} className={`w-8 h-8 ${config.accentColor}`} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">
                    {t(`tiers.${tierId}.name`)}
                  </h3>

                  <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg mb-8 flex-grow">
                    {t(`tiers.${tierId}.desc`)}
                  </p>

                  <div className="pt-6 border-t border-white/5 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {(t(`tiers.${tierId}.outcome`) as string).split(" · ").map((tag, i) => (
                        <span key={i} className={`text-[10px] font-bold uppercase tracking-[0.1em] ${config.badgeText} ${config.badgeBg} px-3 py-1.5 rounded-full border`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {idx < TIER_IDS.length - 1 && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-20">
                      <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-white/10" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12" />
          <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight max-w-4xl mx-auto">
            {t("insight")}
          </p>
        </div>
      </div>
    </section>
  );
}
