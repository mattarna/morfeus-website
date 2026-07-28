"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { LabMsCore } from "./LabMsCore";

/* ============================================================
   01 · HERO — la copertina, com'era. Rivestita, non rifatta.
   ------------------------------------------------------------
   La composizione e' quella di LandingHero, elemento per elemento e
   nello stesso ordine:
     pill occhiello col pallino che pulsa → headline su 3 righe, la
     terza in gradiente → sottotitolo → L'ANIMAZIONE, subito sotto il
     sottotitolo, dentro il suo alone → nudge → due CTA a pillola →
     barra delle 4 prove.
   Tutto CENTRATO, come l'originale.

   Cosa cambia (solo la materia):
   · i caratteri: Clash sul titolo, Satoshi sul corpo, Plex sulle
     micro-etichette
   · il gradiente della terza riga era gia' majorelle→neon→vista: e'
     rimasto identico, era gia' in palette
   · l'alone dietro l'animazione era FUCSIA (bg-fuchsia-500) — l'unica
     nota fuori palette della pagina. Ora e' majorelle
   · le CTA erano indigo-600→blue-800, colori Tailwind generici fuori
     dalla palette: ora firma → persian
   ============================================================ */

export function LabMsHero() {
  const t = useTranslations("Lab.hero");

  const prove = Object.values(t.raw("proof_items") as Record<string, string>);

  const vaiA = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-inchiostro px-6 pb-20 pt-32 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] xl:px-40"
    >
      {/* la griglia blueprint del sistema, tenutissima */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,165,247,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(140,165,247,.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative flex w-full max-w-[1200px] flex-col items-center text-center">
        {/* 0 · OCCHIELLO */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-carta/10 bg-carta/5 px-4 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-majorelle" />
          <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.2em] text-vista/80 md:text-xs">
            {t("eyebrow")}
          </span>
        </div>

        {/* 1 · HEADLINE — tre righe, la terza in gradiente */}
        <h1 className="mb-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          <span className="block bg-linear-to-b from-carta via-carta/90 to-carta/70 bg-clip-text text-transparent">
            {t("headline.line1")}
          </span>
          <span className="block bg-linear-to-b from-carta via-carta/90 to-carta/70 bg-clip-text text-transparent">
            {t("headline.line2")}
          </span>
          <span className="mt-2 block bg-linear-to-r from-majorelle via-neon to-vista bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(83,61,252,0.35)]">
            {t("headline.line3")}
          </span>
        </h1>

        {/* 2 · SOTTOTITOLO */}
        <p className="mb-12 max-w-3xl px-4 text-lg font-light leading-[1.6] text-carta/70 sm:text-xl md:text-2xl">
          {t("subtitle")}
        </p>

        {/* 3 · IL NUCLEO ANIMATO — subito sotto il sottotitolo, dov'era */}
        <div className="group relative mb-16 w-full max-w-5xl px-4 md:mb-20">
          <div className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-majorelle opacity-[0.10] blur-[120px] transition-opacity duration-1000 group-hover:opacity-[0.18]" />
          <LabMsCore />
        </div>

        {/* 4 · CTA */}
        <div className="flex w-full flex-col items-center gap-6">
          <div className="mb-2 font-plex text-[11px] font-semibold uppercase tracking-[0.3em] text-carta/40">
            {t("cta_nudge")}
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <button
              type="button"
              onClick={() => vaiA("contact")}
              className="group relative overflow-hidden rounded-full px-10 py-5 font-plex text-[13px] font-semibold uppercase tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(83,61,252,0.6)] transition-all duration-500 active:scale-95"
            >
              <span className="absolute inset-0 bg-linear-to-r from-firma to-persian" />
              <span className="absolute inset-0 bg-neon opacity-0 blur-xl transition-opacity group-hover:opacity-25" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                {t("cta_primary")}
                <Icon
                  icon="solar:arrow-right-linear"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => vaiA("how-it-works")}
              className="group rounded-full border border-carta/10 bg-carta/5 px-10 py-5 font-plex text-[13px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xs transition-all duration-500 hover:border-carta/20 hover:bg-carta/10 active:scale-95"
            >
              <span className="text-carta/70 transition-colors group-hover:text-carta">
                {t("cta_secondary")}
              </span>
            </button>
          </div>
        </div>

        {/* 5 · BARRA DELLE PROVE — etichetta sopra, numero sotto in vista */}
        <div className="mt-20 w-full max-w-5xl border-t border-carta/5 pt-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
            {prove.map((voce) => (
              <div key={voce} className="flex flex-col items-center gap-2">
                <div className="font-plex text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-carta/30 md:text-[11px]">
                  {voce.split(" ").slice(1).join(" ")}
                </div>
                <div className="text-sm font-semibold text-vista md:text-base">
                  {voce.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
