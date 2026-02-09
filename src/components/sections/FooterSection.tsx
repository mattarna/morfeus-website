"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export function FooterSection() {
  const t = useTranslations("Offerta");
  const locale = useLocale();

  return (
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
  );
}

