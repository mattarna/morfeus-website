"use client";

import { useTranslations } from "next-intl";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

/**
 * HomeProblem Section - Index 2
 * 
 * Exact layout from screenshot:
 * - Left: Headline, Body, and 4 Vertical Cards.
 * - Right: Large Diagnostic Impact Card.
 * - Optimized for 100vh fit.
 */
export function HomeProblem() {
  const t = useTranslations("Problem");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const setIndex = useScrollStore((state) => state.setIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 1024) return true;
      if (window.matchMedia('(pointer: coarse)').matches && 
          window.matchMedia('(hover: none)').matches) {
        return true;
      }
      return false;
    };
    
    const updateViewport = () => setIsDesktop(!checkIsMobile());
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (currentIndex === 2) {
      setIsVisible(true);
    }
  }, [currentIndex]);

  const handleCtaClick = (index: number) => {
    if (isDesktop) {
      setIndex(index);
    } else {
      const element = document.getElementById(`section-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cards = [
    { key: "costs", icon: "solar:bill-list-bold", color: "text-blue-400" },
    { key: "talent", icon: "solar:users-group-two-rounded-bold", color: "text-indigo-400" },
    { key: "processes", icon: "solar:settings-minimalistic-bold", color: "text-slate-400" },
    { key: "data", icon: "solar:database-bold", color: "text-purple-400" },
  ];

  const breakdown = [
    { label: t("ticker.breakdown.ops"), value: 38, color: "bg-blue-500" },
    { label: t("ticker.breakdown.decisions"), value: 27, color: "bg-indigo-500" },
    { label: t("ticker.breakdown.waste"), value: 22, color: "bg-purple-500" },
    { label: t("ticker.breakdown.errors"), value: 13, color: "bg-slate-500" },
  ];

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full flex items-center justify-center bg-black py-12 lg:py-0 overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          
          {/* LEFT COLUMN: Narrative & Vertical Cards */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-4xl md:text-5xl xl:text-6xl font-normal tracking-tighter text-white leading-[1.1] mb-6 transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                {t("headline").split(".")[0]}.<br />
                <span className="text-slate-500">{t("headline").split(".")[1]}</span>
              </h2>
              
              <p className={`text-base md:text-lg text-slate-400 font-light leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                {t("body")}
              </p>
            </div>

            {/* Vertical Cards List */}
            <div className="flex flex-col gap-3">
              {cards.map((card, index) => (
                <div 
                  key={card.key}
                  className={`group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.06] border border-white/10 transition-all duration-700 hover:bg-white/[0.1] hover:border-white/20 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <div className={`p-2 rounded-xl bg-white/10 border border-white/20 flex-shrink-0 mt-1 ${card.color}`}>
                    <Icon icon={card.icon} width={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {t(`cards.${card.key}.title`)}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {t(`cards.${card.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Diagnostic Report Card */}
          <div className="lg:col-span-5 flex justify-end">
            <div 
              className={`relative w-full max-w-md transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-[#121212] to-[#080808] border border-white/20 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-blue-500 uppercase">
                      {t("ticker.label")}
                    </span>
                    <h4 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
                      €47.000<span className="text-blue-500/50 text-2xl font-normal ml-1">/m</span>
                    </h4>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 shadow-inner">
                    <Icon icon="solar:graph-down-bold" className="text-forge" width={28} />
                  </div>
                </div>

                <p className="text-[12px] text-slate-400 mb-10 leading-relaxed uppercase tracking-wider font-medium border-l-2 border-forge/40 pl-4">
                  {t("ticker.sub")}
                </p>

                <div className="space-y-6 mb-12 flex-1">
                  {breakdown.map((item, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <div className="flex justify-between items-end text-[11px] font-bold tracking-wide uppercase">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white">{item.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} opacity-70 transition-all duration-[1500ms] ease-out delay-[1000ms]`}
                          style={{ width: isVisible ? `${item.value}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                  <button 
                    onClick={() => handleCtaClick(13)} 
                    className="w-full flex items-center justify-between px-6 py-5 bg-white text-black rounded-2xl hover:bg-slate-200 transition-all duration-300 font-bold text-[16px] tracking-tight"
                  >
                    <span>{t("cta")}</span>
                    <Icon icon="solar:arrow-right-bold" width={22} />
                  </button>
                  <p className="text-[11px] text-slate-600 text-center italic">
                    {t("microcopy")}
                  </p>
                </div>
              </div>

              {/* Decorative brackets */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-blue-500/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-blue-500/30 rounded-br-2xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
