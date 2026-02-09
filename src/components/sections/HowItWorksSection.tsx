"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface HowItWorksSectionProps {
  scrollToContact: () => void;
}

export function HowItWorksSection({ scrollToContact }: HowItWorksSectionProps) {
  const t = useTranslations("Offerta");

  return (
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
  );
}

