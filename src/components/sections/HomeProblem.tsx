"use client";

import { useTranslations } from "next-intl";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useEffect, useState } from "react";

/**
 * HomeProblem Section - Index 2
 *
 * "I Value Leak": la mappa dei punti in cui il margine esce dall'azienda.
 * Non e' un metodo in tre fasi, quindi non usa card verticali numerate:
 * tre righe orizzontali a tutta larghezza (numero, mini visual, titolo, testo)
 * fra un blocco di apertura e una riga di chiusura.
 *
 * I visual rappresentano il problema, non il servizio. Ereditano il colore
 * dalla riga (currentColor): una tinta piena a riposo, arancio brand in hover.
 * Le opacita' interne sono tarate per restare leggibili senza hover — i tratti
 * "spenti" servono a raccontare il degrado, non a nascondere il disegno.
 */

/** Le informazioni si fermano: un percorso che si interrompe a meta'. */
function LeakVisualFlow() {
  return (
    <svg viewBox="0 0 120 48" fill="none" className="w-full h-full" aria-hidden="true">
      <line x1="10" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M58 24 H110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.55" />
      <line x1="51" y1="13" x2="51" y2="35" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="10" cy="24" r="4" fill="currentColor" />
      <circle cx="44" cy="24" r="4" fill="currentColor" />
      <circle cx="110" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

/** Il sapere resta nella testa di pochi: tutto converge su un nodo solo. */
function LeakVisualKnowledge() {
  return (
    <svg viewBox="0 0 120 48" fill="none" className="w-full h-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.55">
        <line x1="60" y1="24" x2="16" y2="10" />
        <line x1="60" y1="24" x2="16" y2="38" />
        <line x1="60" y1="24" x2="104" y2="10" />
        <line x1="60" y1="24" x2="104" y2="38" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.8">
        <circle cx="16" cy="10" r="3" />
        <circle cx="16" cy="38" r="3" />
        <circle cx="104" cy="10" r="3" />
        <circle cx="104" cy="38" r="3" />
      </g>
      <circle cx="60" cy="24" r="12" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
      <circle cx="60" cy="24" r="6.5" fill="currentColor" />
    </svg>
  );
}

/** Lavoro che un sistema dovrebbe assorbire: una coda che si accumula. */
function LeakVisualManual() {
  return (
    <svg viewBox="0 0 120 48" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="10" y="7" width="44" height="5" rx="2.5" fill="currentColor" opacity="0.4" />
      <rect x="10" y="18" width="62" height="5" rx="2.5" fill="currentColor" opacity="0.6" />
      <rect x="10" y="29" width="82" height="5" rx="2.5" fill="currentColor" opacity="0.8" />
      <rect x="10" y="40" width="100" height="5" rx="2.5" fill="currentColor" opacity="1" />
    </svg>
  );
}

const LEAKS = [
  { key: "flow", Visual: LeakVisualFlow, color: "text-blue-400" },
  { key: "knowledge", Visual: LeakVisualKnowledge, color: "text-indigo-400" },
  { key: "manual", Visual: LeakVisualManual, color: "text-purple-400" },
] as const;

export function HomeProblem() {
  const t = useTranslations("Problem");
  const currentIndex = useScrollStore((state) => state.currentIndex);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (currentIndex === 2) {
      setIsVisible(true);
    }
  }, [currentIndex]);

  return (
    <section className="relative z-0 min-h-screen xl:h-screen w-full flex items-center justify-center bg-black pt-28 pb-16 xl:pt-28 xl:pb-20 short:!pt-24 short:!pb-10 overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-14 xl:px-24 2xl:px-48 w-full">

        {/* HEADER: headline a sinistra, introduzione a destra */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-14 2xl:gap-20 xl:items-end mb-10 xl:mb-14 short:!mb-8">
          <div className="xl:col-span-7">
            <span className={`block text-[11px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-4 short:!mb-3 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              {t("label")}
            </span>
            <h2 className={`text-[2.35rem] sm:text-4xl md:text-5xl xl:text-[3.35rem] 2xl:text-6xl short:!text-5xl font-normal tracking-tighter text-white leading-[1.1] transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {t("headline_1")}<br />
              <span className="text-slate-500">{t("headline_2")}</span>
            </h2>
          </div>

          <p className={`xl:col-span-5 text-[15px] md:text-base 2xl:text-lg text-slate-300 font-light leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {t("intro")}
          </p>
        </div>

        {/* LE TRE RIGHE */}
        <div className="border-t border-white/10">
          {LEAKS.map(({ key, Visual, color }, index) => (
            <div
              key={key}
              className={`group grid grid-cols-1 xl:grid-cols-12 gap-x-8 2xl:gap-x-10 gap-y-2 xl:items-center border-b border-white/10 py-6 xl:py-7 2xl:py-8 short:!py-5 px-2 -mx-2 rounded-xl transition-all duration-700 hover:bg-white/[0.03] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${300 + index * 120}ms` }}
            >
              <span className="xl:col-span-1 text-[11px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors duration-500">
                0{index + 1}
              </span>

              <div className={`xl:col-span-2 w-28 h-11 2xl:h-14 xl:w-full ${color} group-hover:text-forge transition-colors duration-500`}>
                <Visual />
              </div>

              <h3 className="xl:col-span-4 text-base md:text-lg 2xl:text-xl font-medium text-white tracking-tight leading-snug">
                {t(`leaks.${key}.title`)}
              </h3>

              <p className="xl:col-span-5 text-sm 2xl:text-base text-slate-300 font-light leading-relaxed group-hover:text-white transition-colors duration-500">
                {t(`leaks.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* CHIUSURA */}
        <p className={`mt-8 xl:mt-10 short:!mt-6 max-w-3xl text-[15px] md:text-base 2xl:text-lg text-slate-300 font-light leading-relaxed border-l-2 border-forge/40 pl-4 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          {t("closing")}
        </p>

      </div>
    </section>
  );
}
