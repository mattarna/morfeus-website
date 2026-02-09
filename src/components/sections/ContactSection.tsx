"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface ContactSectionProps {
  scrollToContact: () => void;
}

export function ContactSection({ scrollToContact }: ContactSectionProps) {
  const t = useTranslations("Offerta");

  return (
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
  );
}

