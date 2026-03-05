"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function WayoutSection() {
  const t = useTranslations("Offerta.way_out");

  return (
    <section id="way-out" className="relative z-[120] py-24 md:py-40 px-6 xl:px-40 bg-[#0a111a] border-t border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="lg:col-span-5 flex justify-center lg:justify-end scale-90 sm:scale-100 transition-transform">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-indigo-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-indigo-500/30" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-[#030508] border-2 border-indigo-500/40 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(79,70,229,0.4)]">
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none">60</span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-indigo-400 uppercase tracking-[0.2em] mt-2">{t("days_label")}</span>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,1)]" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {(["1", "2", "3"] as const).map((key, idx) => (
              <div key={key} className="flex gap-6 md:gap-8 group">
                <span className="text-xl md:text-2xl font-mono text-indigo-500/40 font-bold group-hover:text-indigo-500 transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-tight">{t(`points.${key}.title`)}</h3>
                  <p className="text-lg text-slate-400 font-light leading-relaxed">{t(`points.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 p-10 md:p-16 rounded-[3rem] bg-white/[0.06] border border-white/20 relative overflow-hidden group/exit transition-all duration-700 hover:bg-white/[0.08] hover:border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-forge/5 via-transparent to-transparent opacity-0 group-hover/exit:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-200 mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
              <div className="relative flex items-center justify-center w-4 h-4">
                <motion.div
                  animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-forge shadow-[0_0_20px_#E8650A]"
                />
                <div className="relative w-2 h-2 rounded-full bg-forge shadow-[0_0_15px_#E8650A]" />
              </div>
              {t("exit_box_title")}
            </h4>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-5xl">
              {t("exit_box_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
