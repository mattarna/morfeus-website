"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { GridPattern } from "../shared/GridPattern";
import { Link } from "@/i18n/navigation";

interface LabBridgeSectionProps {
  namespace?: string;
}

export function LabBridgeSection({ namespace = "Lab.bridge" }: LabBridgeSectionProps) {
  const t = useTranslations(namespace);

  return (
    <section id="bridge" className="relative z-[110] py-24 md:py-40 px-6 xl:px-40 bg-night border-y border-white/[0.05] overflow-visible">
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

        {/* Two-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16 md:mb-24">
          {/* Lab Card */}
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#0A0C10] border border-indigo-500/20 flex flex-col overflow-hidden group transition-all duration-500 hover:border-indigo-500/40">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon icon="solar:medal-star-bold-duotone" className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t("lab.title")}</h3>
                  <p className="text-sm text-indigo-400 font-bold uppercase tracking-wider">{t("lab.desc")}</p>
                </div>
              </div>

              <p className="text-lg text-slate-400 font-light leading-relaxed">
                {t("lab.detail")}
              </p>
            </div>
          </div>

          {/* Forge Card */}
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#0A0C10] border border-forge/20 flex flex-col overflow-hidden group transition-all duration-500 hover:border-forge/40">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-forge/0 via-forge to-forge/0" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-forge/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-forge/10 border border-forge/20 flex items-center justify-center">
                  <Icon icon="solar:cpu-bolt-bold-duotone" className="w-7 h-7 text-forge" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t("forge.title")}</h3>
                  <p className="text-sm text-forge font-bold uppercase tracking-wider">{t("forge.desc")}</p>
                </div>
              </div>

              <p className="text-lg text-slate-400 font-light leading-relaxed">
                {t("forge.detail")}
              </p>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="hidden lg:flex justify-center -mt-20 mb-8">
          <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10">
            <div className="w-8 h-px bg-indigo-500/50" />
            <Icon icon="solar:add-circle-bold" className="w-5 h-5 text-white/30" />
            <div className="w-8 h-px bg-forge/50" />
          </div>
        </div>

        {/* Closing statement */}
        <div className="text-center mt-12">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-4xl mx-auto mb-12">
            {t("closing")}
          </p>

          <Link
            href="/operating-system"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden border border-forge/30 hover:border-forge/60 bg-forge/5 hover:bg-forge/10"
          >
            <span className="relative z-10 text-forge group-hover:text-white transition-colors">
              {t("forge_cta")}
            </span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-forge group-hover:text-white transition-all group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
