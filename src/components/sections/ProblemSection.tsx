"use client";

import { useTranslations } from "next-intl";

export function ProblemSection() {
  const t = useTranslations("Offerta");

  return (
    <section id="problem" className="relative z-40 py-24 md:py-40 px-6 bg-[#0a111a] border-y border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      {/* Module ID Tag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-50">
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">Module_04: Diagnosis</span>
      </div>
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Hook */}
        <div className="mb-16 md:mb-24">
          <span className="inline-block text-[10px] font-mono text-indigo-500 tracking-[0.4em] uppercase mb-6 border border-indigo-500/30 px-3 py-1 rounded">
            {t("problem.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.1] uppercase">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              {t("problem.title").split('\n')[0]}
            </span>
            <br />
            <span className="text-slate-500">
              {t("problem.title").split('\n')[1]}
            </span>
          </h2>
        </div>

        {/* Narrative - Vertical Stack */}
        <div className="max-w-4xl mb-20 md:mb-24 space-y-10">
          <p className="text-2xl md:text-4xl text-slate-200 font-light leading-relaxed border-l-2 border-slate-800 pl-8">
            {t("problem.definition_1")}
          </p>
          <p className="text-2xl md:text-4xl text-slate-400 font-light leading-relaxed pl-8">
            {t("problem.definition_2")}
          </p>
        </div>

        {/* Symptoms List - Full Width Diagnostic Report */}
        <div className="bg-slate-900/20 rounded-2xl border border-white/5 overflow-hidden mb-20 md:mb-24">
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Sintomi rilevati nel sistema</span>
            <span className="text-[10px] font-mono text-red-500/50 uppercase tracking-widest">[ ANALISI ATTIVA ]</span>
          </div>
          <div className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="group flex items-start gap-6 p-8 hover:bg-white/[0.01] transition-colors"
              >
                <div className="mt-2.5 w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.3)] flex-shrink-0" />
                <span className="text-xl md:text-3xl text-slate-300 font-light">
                  {t(`problem.symptoms.${i}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* False Fix & Closing - Stacked */}
        <div className="pt-16 border-t border-white/5 max-w-5xl">
          <div className="mb-16">
            <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-6">
              {t("problem.false_fix_title")}
            </h4>
            <p className="text-2xl md:text-3xl text-slate-400 font-light leading-relaxed mb-12">
              {t("problem.false_fix_desc")}
            </p>
          </div>
          
          <p className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t("problem.closing")}
          </p>
        </div>

      </div>
    </section>
  );
}

