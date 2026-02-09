"use client";

import { useTranslations } from "next-intl";

export function DeliverySection() {
  const t = useTranslations("Offerta");

  return (
    <section id="delivery" className="relative z-[80] py-24 md:py-40 px-6 bg-[#0a111a] border-t border-white/[0.05] shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] overflow-visible">
      {/* Module ID Tag */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[90]">
        <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">Module_07: Delivery_Protocol</span>
      </div>

      <div className="max-w-[1000px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
              {t("delivery.sectionTitle")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light">
            {t("delivery.sectionSubtitle")}
          </p>
        </div>

        {/* MODULE 1: Delivery Units & Time */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/10">
            <span className="text-xs font-mono text-indigo-500 tracking-[0.2em] uppercase px-3 py-1 border border-indigo-500/30 rounded">01</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t("delivery.module1.title")}
            </h3>
          </div>

          {/* Context */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              {t("delivery.module1.context.title")}
            </h4>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-3xl">
              {t("delivery.module1.context.text")}
            </p>
          </div>

          {/* Principle */}
          <div className="mb-12 p-8 bg-slate-900/50 border-l-4 border-indigo-500 rounded-r-lg">
            <h4 className="text-sm font-mono text-indigo-400 mb-3 uppercase tracking-[0.2em]">
              {t("delivery.module1.principle.title")}
            </h4>
            <p className="text-xl md:text-2xl text-white font-medium leading-snug">
              {t("delivery.module1.principle.text")}
            </p>
          </div>

          {/* What is a Slot */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              {t("delivery.module1.slot.title")}
            </h4>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-3xl">
              {t("delivery.module1.slot.text")}
            </p>
          </div>

          {/* Slot Sizes - High Contrast Cards */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              {t("delivery.module1.sizes.title")}
            </h4>
            <p className="text-base text-slate-400 font-light mb-8">
              {t("delivery.module1.sizes.intro")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slot S */}
              <div className="bg-slate-200/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">{t("delivery.module1.sizes.s.name")}</span>
                  <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/20">{t("delivery.module1.sizes.s.time")}</span>
                </div>
                <p className="text-lg text-slate-600 font-medium leading-snug">{t("delivery.module1.sizes.s.desc")}</p>
              </div>
              
              {/* Slot M */}
              <div className="bg-slate-200/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">{t("delivery.module1.sizes.m.name")}</span>
                  <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/20">{t("delivery.module1.sizes.m.time")}</span>
                </div>
                <p className="text-lg text-slate-600 font-medium leading-snug">{t("delivery.module1.sizes.m.desc")}</p>
              </div>
              
              {/* Slot L */}
              <div className="bg-slate-200/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">{t("delivery.module1.sizes.l.name")}</span>
                  <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/20">{t("delivery.module1.sizes.l.time")}</span>
                </div>
                <p className="text-lg text-slate-600 font-medium leading-snug">{t("delivery.module1.sizes.l.desc")}</p>
              </div>
            </div>
          </div>

          {/* SLA */}
          <div className="p-6 bg-slate-800/30 border border-white/5 rounded-xl">
            <h4 className="text-lg font-semibold text-white mb-3">
              {t("delivery.module1.sla.title")}
            </h4>
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              {t("delivery.module1.sla.text")}
            </p>
          </div>
        </div>

        {/* MODULE 2: Pilot & 30-Day Exit */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/10">
            <span className="text-xs font-mono text-indigo-500 tracking-[0.2em] uppercase px-3 py-1 border border-indigo-500/30 rounded">02</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t("delivery.module2.title")}
            </h3>
          </div>

          {/* Transition */}
          <div className="mb-12 p-8 bg-slate-900/50 border-l-4 border-indigo-500 rounded-r-lg">
            <h4 className="text-sm font-mono text-indigo-400 mb-3 uppercase tracking-[0.2em]">
              {t("delivery.module2.transition.title")}
            </h4>
            <p className="text-xl md:text-2xl text-white font-medium leading-snug">
              {t("delivery.module2.transition.text")}
            </p>
          </div>

          {/* Info Grid - The Paper Slate Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Ready Date */}
            <div className="p-8 bg-slate-200/90 backdrop-blur-sm rounded-2xl shadow-xl border-l-8 border-indigo-600/50 transition-all duration-300 hover:bg-slate-100">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                {t("delivery.module2.readyDate.title")}
              </h4>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {t("delivery.module2.readyDate.text")}
              </p>
            </div>

            {/* Pilot Build */}
            <div className="p-8 bg-slate-200/90 backdrop-blur-sm rounded-2xl shadow-xl border-l-8 border-indigo-600/50 transition-all duration-300 hover:bg-slate-100">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                {t("delivery.module2.pilotBuild.title")}
              </h4>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {t("delivery.module2.pilotBuild.text")}
              </p>
            </div>

            {/* Acceptance Criteria */}
            <div className="p-8 bg-slate-200/90 backdrop-blur-sm rounded-2xl shadow-xl border-l-8 border-indigo-600/50 transition-all duration-300 hover:bg-slate-100">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                {t("delivery.module2.criteria.title")}
              </h4>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {t("delivery.module2.criteria.text")}
              </p>
            </div>

            {/* 30-Day Exit */}
            <div className="p-8 bg-slate-200/90 backdrop-blur-sm rounded-2xl shadow-xl border-l-8 border-indigo-600/50 transition-all duration-300 hover:bg-slate-100">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                {t("delivery.module2.wayOut.title")}
              </h4>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {t("delivery.module2.wayOut.text")}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="p-8 md:p-10 bg-slate-200 rounded-2xl shadow-xl">
          <h4 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-[0.2em] font-bold">
            {t("delivery.summary.title")}
          </h4>
          <p className="text-xl md:text-2xl text-slate-800 font-bold leading-relaxed">
            {t("delivery.summary.text")}
          </p>
        </div>

      </div>
    </section>
  );
}

