"use client";

import { useTranslations } from "next-intl";

export function ProofSection() {
  const t = useTranslations("Offerta");

  return (
    <section id="proof" className="relative z-20 py-24 md:py-40 px-6 bg-[#0a111a] border-y border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      {/* Module ID Tag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-50">
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">Module_02: Proof</span>
      </div>
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-16 md:mb-20">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t("proof.title")}
          </span>
        </h2>

        {/* Proof Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 mb-16 md:mb-20">
          
          {/* Block 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("proof.blocks.1.number")}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-3">
              {t("proof.blocks.1.label")}
            </p>
            <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-sm">
              {t("proof.blocks.1.description")}
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("proof.blocks.2.number")}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-3">
              {t("proof.blocks.2.label")}
            </p>
            <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-sm">
              {t("proof.blocks.2.description")}
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("proof.blocks.3.number")}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-3">
              {t("proof.blocks.3.label")}
            </p>
            <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-sm">
              {t("proof.blocks.3.description")}
            </p>
          </div>

        </div>

        {/* Closing Line */}
        <p className="text-2xl sm:text-3xl md:text-4xl text-slate-400 font-light text-center max-w-5xl mx-auto leading-relaxed border-t border-white/5 pt-16">
          {t("proof.closing")}
        </p>

      </div>
    </section>
  );
}

