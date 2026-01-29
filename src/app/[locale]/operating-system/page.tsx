"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function OperatingSystemPage() {
  const t = useTranslations("Offerta");
  const locale = useLocale();
  const [contentVisible, setContentVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setContentVisible(true), 100);

    // Intersection Observer to hide header when on-page CTAs are visible
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        const isAnyCtaVisible = entries.some((entry) => entry.isIntersecting);
        setIsHeaderHidden(isAnyCtaVisible);
      },
      { threshold: 0.1, rootMargin: "-50px 0px -50px 0px" }
    );

    // Observe all elements with 'on-page-cta' class
    const observeCtas = () => {
      const ctas = document.querySelectorAll(".on-page-cta");
      ctas.forEach((cta) => ctaObserver.observe(cta));
    };

    // Initial observation
    observeCtas();

    const handleScroll = () => {
      // Show sticky background almost immediately after scroll starts
      if (window.scrollY > 50) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-[#030508]" />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030508] text-white overflow-x-hidden">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 58, 95, 0.15) 0%, transparent 50%)"
          }}
        />
        <div className="absolute inset-0 flex justify-between px-[10%]">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-px h-full" style={{ background: `linear-gradient(to bottom, transparent 0%, rgba(71, 85, 105, ${i === 3 ? '0.12' : '0.06'}) 20%, rgba(71, 85, 105, ${i === 3 ? '0.12' : '0.06'}) 80%, transparent 100%)` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-between py-[15%]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(to right, transparent 0%, rgba(71, 85, 105, 0.08) 20%, rgba(71, 85, 105, 0.08) 80%, transparent 100%)" }} />
          ))}
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <header className={`fixed top-0 left-0 w-full z-[200] px-6 md:px-10 transition-all duration-700 ${
        showStickyCta ? "bg-[#030508]/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
      } ${
        isHeaderHidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      }`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center group">
            <div className="relative w-28 h-8 md:w-40 md:h-12">
              <Image 
                src="/images/m-w2.png" 
                alt="Morfeus Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t("hero.system_tag")}</span>
            </div>

            {/* Sticky CTA - Always Visible when header is shown */}
            <button 
              onClick={scrollToContact}
              className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105 ${
              isHeaderHidden ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-y-0"
            }`}>
              <span className="whitespace-nowrap">{t("ctas.sticky")}</span>
              <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </header>

      <main 
        id="hero"
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-[1200px] w-full flex flex-col items-center text-center">
          
          {/* 1. HEADLINE */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.03em] leading-[1.05] uppercase">
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e2e8f0] to-[#94a3b8] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                {t("hero.headline_1")}
              </span>
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#cbd5e1] to-[#64748b] drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                {t("hero.headline_2")}
              </span>
              <br className="hidden lg:block" />
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 via-indigo-500 to-blue-700 drop-shadow-[0_0_20px_rgba(79,70,229,0.25)]"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                {t("hero.headline_3")}
              </span>
            </h1>
          </div>

          {/* 2. SUBHEADLINE */}
          <p className="max-w-5xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-400/90 font-light leading-[1.5] mb-10 px-4">
            {t("hero.subtitle")}
          </p>

          {/* 3. VSL FRAME */}
          <div className="relative w-full max-w-4xl mb-8">
            <div className="absolute -inset-2 rounded-xl opacity-20 blur-2xl bg-cyan-500/30 pointer-events-none" />
            <div className="relative rounded-lg overflow-hidden border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50 bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{t("hero.vsl_label")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-slate-600">{t("hero.vsl_duration")}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-red-500/80 uppercase">REC</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video bg-slate-900 flex items-center justify-center group">
                {!isPlaying ? (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Cover Image */}
                    <Image 
                      src="/Images-landing/COPERTINA VSL.png"
                      alt="VSL Cover"
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      priority
                    />
                    
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <button className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-indigo-500/50">
                      <Icon icon="solar:play-bold" className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                    </button>
                    <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-slate-700/40" />
                    <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-slate-700/40" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-slate-700/40" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-slate-700/40" />
                  </div>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/NcgwgB9L0KI?autoplay=1"
                    title="Morfeus VSL"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

          {/* 4. CTA */}
          <button 
            onClick={scrollToContact}
            className="on-page-cta group relative px-12 py-5 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
            <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center gap-2 text-white">
              {t("hero.cta_primary")}
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

        </div>
      </main>

      {/* ========================================
          SECTION 2: PROOF (Technical Blue Module)
          ======================================== */}
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

      {/* ========================================
          SECTION 3: PER CHI È / PER CHI NON È
          ======================================== */}
      <section id="filter" className="relative z-30 py-24 md:py-32 px-6 overflow-visible">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-16 md:mb-20">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              {t("filter.title")}
            </span>
          </h2>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 md:mb-20">
            
            {/* Block 1 — Per chi è (Green) */}
            <div className="relative rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-8 md:p-10 overflow-hidden">
              {/* Gradient glow top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-emerald-500/10 blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-emerald-400">
                {t("filter.for_you.title")}
              </h3>
              <ul className="flex flex-col gap-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span 
                      className="text-lg sm:text-xl"
                      dangerouslySetInnerHTML={{ 
                        __html: t(`filter.for_you.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') 
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Block 2 — Per chi non è (Red) */}
            <div className="relative rounded-2xl border border-red-500/20 bg-red-950/10 p-8 md:p-10 overflow-hidden">
              {/* Gradient glow top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-400" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-red-500/10 blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-red-400">
                {t("filter.not_for_you.title")}
              </h3>
              <ul className="flex flex-col gap-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span 
                      className="text-lg sm:text-xl"
                      dangerouslySetInnerHTML={{ 
                        __html: t(`filter.not_for_you.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>') 
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Closing Line */}
          <div className="flex flex-col items-center gap-10 border-t border-white/5 pt-12">
            <p className="text-lg md:text-xl text-slate-400 font-light text-center max-w-3xl mx-auto leading-relaxed">
              {t("filter.closing")}
            </p>
            
            <button 
              onClick={scrollToContact}
              className="on-page-cta group relative px-12 py-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-3 text-base font-black uppercase tracking-[0.2em] text-white">
                {t("ctas.filter")}
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transition-transform group-hover:translate-x-2 text-indigo-400" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================
          SECTION 4: IL PROBLEMA REALE (Deep Blue Module)
          ======================================== */}
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

      {/* ========================================
          SECTION 5: SENZA MORFEUS / CON MORFEUS (Deep Blue-Black Background)
          ======================================== */}
      <section id="comparison" className="relative z-50 py-24 md:py-40 px-6 bg-[#05070a] border-y border-white/[0.03] overflow-visible">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Headline & Subheadline (Moved to Top) */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("comparison.closing_1")}
              </span>
            </h2>
            <p className="text-xl md:text-3xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed">
              {t("comparison.closing_2")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-12 items-stretch">
            
            {/* 1/3 — SENZA MORFEUS (Light Gray Contrast) */}
            <div className="lg:w-[35%] rounded-3xl bg-slate-200 p-8 md:p-10 flex flex-col shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-600 mb-10 uppercase tracking-tight">
                {t("comparison.without.title")}
              </h3>
              
              <ul className="flex flex-col gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-500 font-light">
                    <span className="mt-1.5 w-5 h-5 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-2.5 h-[1.5px] bg-red-500/60" />
                    </span>
                    <span 
                      className="text-xl leading-snug"
                      dangerouslySetInnerHTML={{ 
                        __html: t(`comparison.without.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '$1') 
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* 2/3 — CON MORFEUS (Vibrant Gradient) */}
            <div className="lg:w-[65%] rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-800 p-8 md:p-12 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.2)]">
              {/* Subtle internal glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] -z-10" />
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 uppercase tracking-tight">
                {t("comparison.with.title")}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start gap-4 text-white/90">
                    <span className="mt-1 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span 
                      className="text-xl md:text-2xl font-light leading-tight"
                      dangerouslySetInnerHTML={{ 
                        __html: t(`comparison.with.bullets.${i}`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') 
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Stacking Concept (Moved closer to boxes) */}
          <div className="max-w-4xl mx-auto text-center pt-8">
            <span className="inline-block text-[10px] font-mono text-indigo-500 tracking-[0.5em] uppercase mb-4">
              {t("comparison.effect_label")}
            </span>
            <p className="text-2xl md:text-3xl text-slate-400 font-light leading-relaxed">
              {t("comparison.effect_desc")}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================
          SECTION 6: COME FUNZIONA (Blueprint Blue Module)
          ======================================== */}
      <section id="how-it-works" className="relative z-[60] bg-[#0a111a] border-t border-white/[0.05] overflow-visible">
        {/* Module ID Tag */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[70]">
          <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">Module_06: System_Flow</span>
        </div>
        
        {/* High-End Technical Blueprint Grid - Static & Full Section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Static Technical Grid */}
          <div 
            className="absolute inset-0 opacity-[0.15]" 
            style={{ 
              backgroundImage: `
                linear-gradient(to right, rgba(99, 102, 241, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(99, 102, 241, 0.35) 1px, transparent 1px)
              `, 
              backgroundSize: '40px 40px'
            }} 
          />
        </div>

        <div className="relative z-10 py-24 md:py-40 px-6 max-w-[1100px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-24 md:mb-36">
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("howItWorks.title")}
              </span>
            </h2>
            <div className="h-1 w-24 bg-indigo-500 mx-auto mb-8 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Main Schematic Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 md:-translate-x-1/2 hidden md:block" />

            {/* Steps */}
            <div className="flex flex-col gap-32 md:gap-48">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-0 ${
                    step % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Phase Marker - Technical Node */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.6)] z-20 border-4 border-[#030303] hidden md:block" />
                  
                  {/* Large Phase Number - Just the digits for maximum cleanliness */}
                  <div className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 ${step % 2 === 0 ? 'md:right-1/2 md:mr-24' : 'md:left-1/2 md:ml-24'} top-[-30px] md:top-[-60px]`}>
                    <span className="text-8xl md:text-[12rem] font-black text-white/[0.04] font-mono tracking-tighter">
                      {t(`howItWorks.steps.${step}.number`)}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className={`w-full md:w-[calc(50%-5rem)] text-center ${step % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="relative">
                      {/* Technical ID Tag */}
                      <div className={`inline-flex items-center gap-3 mb-6 px-3 py-1 rounded border border-indigo-500/30 bg-indigo-500/5 ${step % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-mono text-indigo-400 tracking-[0.2em] font-bold uppercase">
                          System_Phase:0{step}
                        </span>
                      </div>

                      {/* Main Titles - High Contrast */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                        {t(`howItWorks.steps.${step}.title`)}
                      </h3>
                      <p className="text-xl md:text-2xl text-indigo-400/90 font-medium mb-10 leading-relaxed">
                        {t(`howItWorks.steps.${step}.subtitle`)}
                      </p>

                      {/* Bullets - Clear and Strong */}
                      <ul className={`flex flex-col gap-6 mb-12 items-center ${step % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                        {[1, 2, 3].map((bullet) => (
                          <li key={bullet} className={`flex items-start gap-4 text-slate-200 font-light group text-left ${step % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                            <span className="mt-2.5 w-2 h-2 rounded-sm rotate-45 border border-indigo-500/50 group-hover:bg-indigo-500 transition-all duration-300 flex-shrink-0" />
                            <span className="text-lg md:text-xl leading-relaxed">
                              {t(`howItWorks.steps.${step}.bullets.${bullet}`)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Schematic Footer */}
                      <div className={`pt-10 border-t border-slate-800 ${step % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <p className={`text-base md:text-lg text-slate-400 font-light max-w-lg mx-auto ${step % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0'}`}>
                          {t(`howItWorks.steps.${step}.keyMessage`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-5rem)]" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Primary after How It Works - Grid still fixed behind this */}
          <div className="mt-32 md:mt-48 flex flex-col items-center gap-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-4" />
            <button 
              onClick={scrollToContact}
              className="on-page-cta group relative px-12 py-5 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
              <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center gap-2 text-white">
                {t("ctas.howItWorks")}
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================
          SECTION 7: DELIVERY & VERIFICATION (Deep Blue Module)
          ======================================== */}
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

      {/* ========================================
          SECTION 8: TIERS & PRICING
          ======================================== */}
      <section id="pricing" className="relative z-[100] py-24 md:py-40 px-6 bg-[#05070a] border-t border-white/[0.03] overflow-visible">
        {/* Module ID Tag */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[110]">
          <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">{t("pricing.tag")}</span>
        </div>

        <div className="max-w-[1300px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {t("pricing.sectionTitle")}
              </span>
            </h2>
            <div className="h-1.5 w-32 bg-indigo-500 mx-auto mb-12 shadow-[0_0_20px_rgba(79,70,229,0.6)]" />
            <p className="text-3xl md:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
              {t("pricing.headline")}
            </p>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                {t("pricing.intro_1")}
              </p>
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                {t("pricing.intro_2")}
              </p>
              <p className="text-lg md:text-xl text-slate-500 font-light mt-8">
                {t("pricing.intro_3")}
              </p>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Tier 1 - Focus */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-[#0a0f14] border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20">
                {/* Tier Header */}
                <div className="px-8 py-8 border-b border-white/[0.05]">
                  <span className="inline-block text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-4">Tier 01</span>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                    {t("pricing.tiers.1.name")}
                  </h3>
                  <p className="text-lg text-indigo-400 font-medium">
                    {t("pricing.tiers.1.capacity_value")}
                  </p>
                </div>
                
                {/* Tier Content */}
                <div className="px-8 py-10 space-y-10">
                  {/* For whom */}
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.1.for_label")}</h4>
                    <p className="text-lg text-slate-200 font-light leading-relaxed">
                      {t("pricing.tiers.1.for_value")}
                    </p>
                  </div>

                  {/* Governance */}
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.1.governance_label")}</h4>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-slate-300">
                          <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{t(`pricing.tiers.1.governance.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={scrollToContact}
                      className="on-page-cta w-full py-5 rounded-xl border-2 border-white/10 bg-white/[0.03] text-base font-black uppercase tracking-[0.15em] text-slate-200 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      {t("ctas.pricing")}
                    </button>
                  </div>
                </div>
                
                {/* Price Footer */}
                <div className="px-8 py-8 bg-white/[0.02] border-t border-white/[0.05]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{t("pricing.tiers.1.price_monthly")}</span>
                    <span className="text-base text-slate-500 font-light">/ mese</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{t("pricing.tiers.1.price_yearly")}</p>
                </div>
              </div>
            </div>

            {/* Tier 2 - Core (Featured) */}
            <div className="relative group lg:-mt-4 lg:mb-4">
              {/* Popular Badge - Positioned to avoid clipping */}
              <div className="absolute top-0 right-8 -translate-y-[60%] z-40">
                <span className="inline-block px-4 py-1.5 bg-indigo-500 text-[10px] font-bold text-white uppercase tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                  {t("pricing.tiers.2.badge")}
                </span>
              </div>
              
              <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative h-full bg-gradient-to-b from-[#0d1520] to-[#080c12] border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(79,70,229,0.3)]">
                
                {/* Tier Header */}
                <div className="px-8 py-8 border-b border-indigo-500/20">
                  <span className="inline-block text-[10px] font-mono text-indigo-500 tracking-[0.3em] uppercase mb-4">Tier 02</span>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                    {t("pricing.tiers.2.name")}
                  </h3>
                  <p className="text-lg text-indigo-400 font-medium">
                    {t("pricing.tiers.2.capacity_value")}
                  </p>
                </div>
                
                {/* Tier Content */}
                <div className="px-8 py-10 space-y-10">
                  {/* For whom */}
                  <div>
                    <h4 className="text-sm font-mono text-cyan-500/70 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.2.for_label")}</h4>
                    <p className="text-lg text-slate-100 font-light leading-relaxed">
                      {t("pricing.tiers.2.for_value")}
                    </p>
                  </div>

                  {/* Governance */}
                  <div>
                    <h4 className="text-sm font-mono text-cyan-500/70 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.2.governance_label")}</h4>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-slate-200">
                          <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{t(`pricing.tiers.2.governance.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={scrollToContact}
                      className="on-page-cta w-full py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-black uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300"
                    >
                      {t("ctas.pricing")}
                    </button>
                  </div>
                </div>
                
                {/* Price Footer */}
                <div className="px-8 py-8 bg-cyan-500/5 border-t border-cyan-500/20">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{t("pricing.tiers.2.price_monthly")}</span>
                    <span className="text-base text-slate-400 font-light">/ mese</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{t("pricing.tiers.2.price_yearly")}</p>
                </div>
              </div>
            </div>

            {/* Tier 3 - Scale */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-700/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-[#0a0f14] border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20">
                {/* Tier Header */}
                <div className="px-8 py-8 border-b border-white/[0.05]">
                  <span className="inline-block text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-4">Tier 03</span>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                    {t("pricing.tiers.3.name")}
                  </h3>
                  <p className="text-lg text-indigo-400 font-medium">
                    {t("pricing.tiers.3.capacity_value")}
                  </p>
                </div>
                
                {/* Tier Content */}
                <div className="px-8 py-10 space-y-10">
                  {/* For whom */}
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">{t("pricing.tiers.3.for_label")}</h4>
                    <p className="text-lg text-slate-200 font-light leading-relaxed">
                      {t("pricing.tiers.3.for_value")}
                    </p>
                  </div>

                  {/* Governance */}
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.2em] mb-5">{t("pricing.tiers.3.governance_label")}</h4>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-slate-300">
                          <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{t(`pricing.tiers.3.governance.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={scrollToContact}
                      className="on-page-cta w-full py-5 rounded-xl border-2 border-white/10 bg-white/[0.03] text-base font-black uppercase tracking-[0.15em] text-slate-200 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      {t("ctas.pricing")}
                    </button>
                  </div>
                </div>
                
                {/* Price Footer */}
                <div className="px-8 py-8 bg-white/[0.02] border-t border-white/[0.05]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{t("pricing.tiers.3.price_monthly")}</span>
                    <span className="text-base text-slate-500 font-light">/ mese</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{t("pricing.tiers.3.price_yearly")}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Enterprise Section */}
          <div className="mb-16 p-8 md:p-12 bg-[#0a0f14] border border-white/[0.12] rounded-3xl text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t("pricing.enterprise.title")}
            </h3>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
              {t("pricing.enterprise.text")}
            </p>
          </div>

          {/* Final Note */}
          <div className="text-center pt-12 border-t border-white/[0.08]">
            <h4 className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em] mb-6">
              {t("pricing.note.title")}
            </h4>
            <p className="text-xl md:text-2xl text-slate-200 font-light max-w-4xl mx-auto leading-relaxed">
              {t("pricing.note.text")}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================
          SECTION 10: CTA FINALE (Direct & Clear)
          ======================================== */}
      <section id="contact" className="relative z-10 py-32 md:py-48 px-6 bg-[#030303]">
        <div className="max-w-[1000px] mx-auto">
          
          {/* Main CTA Box */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 via-transparent to-blue-600/20 rounded-3xl blur-xl opacity-50" />
            
            {/* Box Container */}
            <div className="relative bg-gradient-to-b from-[#0d1520] to-[#080c12] border border-white/[0.08] rounded-3xl overflow-hidden">
              {/* Subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Inner content with padding */}
              <div className="px-8 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24">
                
                {/* Title - Same Font as Hero Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.1] uppercase text-center mb-12 md:mb-16">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-400">
                    {t("apply.title")}
                  </span>
                </h2>

                {/* Intro Block */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                  <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-4">
                    {t("apply.intro_1")}
                  </p>
                  <p className="text-xl md:text-2xl text-white font-bold leading-relaxed mb-12">
                    {t("apply.intro_bold")}
                  </p>
                  
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                      {t("apply.intro_2")}
                    </p>
                    <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
                      {t("apply.intro_3")}
                    </p>
                  </div>
                </div>

                {/* Closing Line */}
                <p className="text-xl md:text-2xl text-white font-bold text-center mb-16">
                  {t("apply.closing")}
                </p>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <button 
                    onClick={scrollToContact}
                    className="on-page-cta group relative px-12 md:px-16 py-5 md:py-6 rounded-full font-bold text-lg md:text-xl tracking-wide transition-all duration-500 overflow-hidden shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_80px_-10px_rgba(6,182,212,0.7)] hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                    <span className="relative z-10 flex items-center gap-3 text-white">
                      {t("apply.cta")}
                      <Icon icon="solar:arrow-right-linear" className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* What Happens During the Call - Outside the box */}
          <div className="mt-20 md:mt-24">
            <h4 className="text-xs md:text-sm font-mono text-slate-600 mb-10 md:mb-12 uppercase tracking-[0.2em] text-center">
              {t("apply.whatHappensTitle")}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center px-4">
                  <span className="inline-block text-3xl md:text-4xl font-black text-slate-800 mb-3">{i}</span>
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">
                    {t(`apply.steps.${i}.title`)}
                  </h5>
                  <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
                    {t(`apply.steps.${i}.desc`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimers */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <span key={i} className="text-xs md:text-sm text-slate-600 font-light">
                  * {t(`apply.disclaimers.${i}`)}
                </span>
              ))}
            </div>

            {/* Final Line */}
            <p className="text-base md:text-lg text-slate-500 font-medium text-center">
              {t("apply.finalLine")}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================
          SECTION 8: FAQ (System Log Style)
          ======================================== */}
      <section id="faq" className="relative z-[120] py-24 md:py-40 px-6 bg-[#05070a] border-t border-white/[0.03] overflow-visible">
        {/* Module ID Tag */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#030303] border border-white/10 rounded-full z-[130]">
          <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase whitespace-nowrap">{t("faq_operating_system.tag")}</span>
        </div>

        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-20 md:mb-32 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6">
              {t("faq_operating_system.sectionTitle")}
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
          </div>

          {/* FAQ Accordion List - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {[...Array(9)].map((_, i) => {
                const index = i + 1;
                const isOpen = activeFaq === index;
                
                return (
                  <div 
                    key={index} 
                    className={`relative group border border-white/[0.05] rounded-2xl transition-all duration-500 overflow-hidden ${
                      isOpen ? 'bg-white/[0.03] border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.01]'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left outline-none"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                          isOpen ? 'text-indigo-500' : 'text-slate-600'
                        }`}>
                          Q_{String(index).padStart(2, '0')}
                        </span>
                        <h3 className={`text-base md:text-lg font-bold transition-all duration-300 ${
                          isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {t(`faq_operating_system.items.${index}.q`)}
                        </h3>
                      </div>
                      
                      <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-600'}`}>
                        <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </button>
                    
                    <div 
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 md:pb-8 ml-0 md:ml-14">
                        <div className="h-px w-8 bg-cyan-500/30 mb-4" />
                        <p 
                          className="text-sm md:text-base text-slate-400 font-light leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: t(`faq_operating_system.items.${index}.a`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>') 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {[...Array(9)].map((_, i) => {
                const index = i + 10;
                const isOpen = activeFaq === index;
                
                return (
                  <div 
                    key={index} 
                    className={`relative group border border-white/[0.05] rounded-2xl transition-all duration-500 overflow-hidden ${
                      isOpen ? 'bg-white/[0.03] border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.01]'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left outline-none"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                          isOpen ? 'text-indigo-500' : 'text-slate-600'
                        }`}>
                          Q_{String(index).padStart(2, '0')}
                        </span>
                        <h3 className={`text-base md:text-lg font-bold transition-all duration-300 ${
                          isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {t(`faq_operating_system.items.${index}.q`)}
                        </h3>
                      </div>
                      
                      <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-600'}`}>
                        <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </button>
                    
                    <div 
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 md:pb-8 ml-0 md:ml-14">
                        <div className="h-px w-8 bg-cyan-500/30 mb-4" />
                        <p 
                          className="text-sm md:text-base text-slate-400 font-light leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: t(`faq_operating_system.items.${index}.a`).replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>') 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Schematic Line */}
          <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center opacity-30">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">System_End_Transmission</span>
            <div className="flex gap-4">
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="w-1 h-1 rounded-full bg-slate-700" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================
          FOOTER (Landing-specific version)
          ======================================== */}
      <footer className="relative z-[140] bg-[#030303] pt-24 pb-12 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            {/* Navigation Column */}
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("footer.nav")}</h4>
              <ul className="flex flex-col gap-4">
                {Object.entries(t.raw("footer.links")).map(([key, label]) => (
                  <li key={key}>
                    <a 
                      href={`#${key.replace(/_/g, '-')}`} 
                      className="text-lg text-slate-400 hover:text-white transition-colors font-light"
                    >
                      {label as string}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Column */}
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("footer.info")}</h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href={`/${locale}/privacy`} className="text-lg text-slate-400 hover:text-white transition-colors font-light outline-none">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/cookies`} className="text-lg text-slate-400 hover:text-white transition-colors font-light outline-none">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

          <div className="flex flex-col gap-8 lg:col-span-2 lg:items-end">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-6 lg:items-end">
              {/* Matrix Quote - Added back */}
              <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-left md:text-right">
                {locale === "it" ? (
                  <>
                    <span className="text-orange-500">Pillola rossa</span>
                    <span className="text-slate-500 mx-1">o</span>
                    <span className="text-indigo-500">pillola blu</span>
                    <span className="text-slate-400">. A te la scelta.</span>
                  </>
                ) : (
                  <>
                    <span className="text-orange-500">Red pill</span>
                    <span className="text-slate-500 mx-1">or</span>
                    <span className="text-indigo-500">blue pill</span>
                    <span className="text-slate-400">. The choice is yours.</span>
                  </>
                )}
              </p>
              
              <div className="flex flex-col gap-3 lg:items-end">
                <a href="mailto:hello@morfeushub.com" className="text-2xl md:text-3xl font-black text-white hover:text-indigo-400 transition-colors">
                  hello@morfeushub.com
                </a>
                <p className="text-lg text-slate-500 font-light tracking-wide">Milano, Italia</p>
                <p className="text-xs font-mono text-slate-700 uppercase tracking-widest mt-2">P.IVA 14209210963</p>
              </div>
            </div>
          </div>
          </div>

          {/* Facebook Disclaimers */}
          <div className="pt-16 border-t border-white/5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-center md:text-left">
              <div className="space-y-4">
                <p className="text-[13px] leading-relaxed text-slate-500 font-light">
                  {t("footer.disclaimer_fb_en")}
                </p>
                <p className="text-[13px] leading-relaxed text-slate-600 font-light italic">
                  {t("footer.disclaimer_earnings_en")}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[13px] leading-relaxed text-slate-500 font-light">
                  {t("footer.disclaimer_fb_it")}
                </p>
                <p className="text-[13px] leading-relaxed text-slate-600 font-light italic">
                  {t("footer.disclaimer_earnings_it")}
                </p>
              </div>
            </div>

            {/* Copyright & Made By */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-6 opacity-30 grayscale brightness-200">
                  <Image src="/images/m-w2.png" alt="Morfeus" fill className="object-contain" />
                </div>
                <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">
                  © {new Date().getFullYear()} Morfeus. All rights reserved.
                </p>
              </div>
              <p className="text-[11px] text-slate-600 font-light flex items-center gap-2">
                <span className="text-indigo-500">◆</span>
                Made with love and a lot of AI.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

