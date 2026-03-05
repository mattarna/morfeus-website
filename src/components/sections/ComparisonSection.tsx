"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ComparisonSection() {
  const t = useTranslations("Offerta.comparison");
  
  return (
    <section id="comparison" className="relative z-50 py-24 md:py-40 px-6 xl:px-40 bg-[#0a111a] border-y border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      
      <div className="relative z-10 max-w-[1200px] mx-auto">
        
        {/* Section Header */}
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

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-32 items-stretch">
          
          {/* GRAFICO A — Progetto spot */}
          <div className="group relative p-8 md:p-12 rounded-[2.5rem] bg-[#0A0C10] border border-white/[0.05] flex flex-col h-full overflow-hidden transition-all duration-500">
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-slate-400 uppercase tracking-tight mb-2">{t("chart_a.title")}</h3>
              <p className="text-sm text-slate-500 font-medium">{t("chart_a.subtitle")}</p>
            </div>

            {/* SVG Chart A */}
            <div className="relative h-40 sm:h-48 w-full mb-12 flex items-end">
              <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="140" x2="400" y2="140" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                
                {/* Curve Path */}
                <motion.path
                  d="M 0 140 C 30 140, 45 20, 60 20 C 100 20, 250 120, 400 120"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Area Fill */}
                <motion.path
                  d="M 0 140 C 30 140, 45 20, 60 20 C 100 20, 250 120, 400 120 L 400 140 L 0 140 Z"
                  fill="url(#gradient-red)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                <defs>
                  <linearGradient id="gradient-red" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-0 right-0 text-[10px] font-mono text-rose-500/50 uppercase tracking-widest bg-rose-500/5 px-2 py-1 rounded border border-rose-500/10">{t("chart_a.badge")}</div>
            </div>

            <div className="space-y-6 mt-auto">
              {(Object.values(t.raw("chart_a.items")) as string[]).map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <p className="text-lg text-slate-500 font-light leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GRAFICO B — Sistema cumulativo */}
          <div className="group relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0d1117] to-[#0a0c10] border border-indigo-500/20 flex flex-col h-full overflow-hidden shadow-[0_20px_50px_-20px_rgba(83,61,252,0.2)] transition-all duration-500 hover:border-indigo-500/40">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-2">{t("chart_b.title")}</h3>
              <p className="text-sm text-indigo-400 font-bold uppercase tracking-wider">{t("chart_b.subtitle")}</p>
            </div>

            {/* SVG Chart B */}
            <div className="relative h-40 sm:h-48 w-full mb-12 flex items-end">
              <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="140" x2="400" y2="140" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                
                {/* Curve Path */}
                <motion.path
                  d="M 0 135 C 150 135, 300 130, 400 20"
                  fill="none"
                  stroke="#533DFC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />
                
                {/* Area Fill */}
                <motion.path
                  d="M 0 135 C 150 135, 300 130, 400 20 L 400 140 L 0 140 Z"
                  fill="url(#gradient-majorelle)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.8 }}
                />

                <defs>
                  <linearGradient id="gradient-majorelle" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#533DFC" stopOpacity="1" />
                    <stop offset="100%" stopColor="#533DFC" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -top-10 right-0 text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 shadow-[0_0_15px_rgba(83,61,252,0.3)] backdrop-blur-sm">{t("chart_b.badge")}</div>
            </div>

            <div className="space-y-6 mt-auto">
              {(Object.values(t.raw("chart_b.items")) as string[]).map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(83,61,252,0.8)]" />
                  <p className="text-lg text-white font-light leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Sentence */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12" />
          <p className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
            {t.rich("closing", {
              br: () => <br />,
              spanIndigo: (chunks) => <span className="text-indigo-400">{chunks}</span>
            })}
          </p>
        </div>

      </div>
    </section>
  );
}
