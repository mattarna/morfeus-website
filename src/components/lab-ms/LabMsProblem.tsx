"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

/* ============================================================
   03 · IL PROBLEMA CHE NON VEDI.
   ------------------------------------------------------------
   Porto tutti i dispositivi dell'originale, nessuno escluso:
     · pill rossa col pallino per l'occhiello del problema
     · 4 carte, ognuna con l'icona GIGANTE in filigrana nell'angolo
       (w-32) che si accende all'hover, piu' il chip-icona che cresce
     · pill FORGE per "l'aggravante"
     · il pannello del dato: bordo forge, fondo caldo, icona pericolo
       in filigrana w-48, medaglione tondo, dato grande, fonte in mono
       con il filetto
     · 3 carte trappola col filo di luce in alto all'hover
     · la chiusa centrata sul lavaggio in gradiente

   Cambia la materia: i grigi slate diventano carta/ombra, l'indigo
   generico diventa majorelle/vista, i caratteri passano a
   Clash/Satoshi/Plex. Il forge resta forge: e' gia' il colore
   ufficiale dell'allarme in palette, ed e' l'unico tono caldo.
   ============================================================ */

const ICONE_SINTOMI = [
  "solar:bill-list-bold-duotone",
  "solar:wallet-money-bold-duotone",
  "solar:settings-minimalistic-bold-duotone",
  "solar:fire-bold-duotone",
] as const;

const ICONE_TRAPPOLE = [
  "solar:cart-large-bold-duotone",
  "solar:user-block-bold-duotone",
  "solar:graph-down-bold-duotone",
] as const;

export function LabMsProblem() {
  const t = useTranslations("Lab.problem_analysis");

  return (
    <section
      id="problem-analysis"
      className="relative overflow-visible border-y border-carta/5 bg-inchiostro-2 px-6 py-24 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] md:py-40 xl:px-40"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* ---- i quattro sintomi ---- */}
        <div className="mb-32 md:mb-48">
          <div className="mb-16 max-w-3xl md:mb-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-anomalia/25 bg-anomalia/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-anomalia" />
              <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.2em] text-anomalia/90">
                {t("label")}
              </span>
            </div>

            <h2 className="mb-8 text-4xl font-semibold leading-[1.08] tracking-tight text-carta md:text-5xl lg:text-6xl">
              {t.rich("headline", {
                br: () => <br />,
                spanSub: (chunks) => (
                  <span className="text-carta/45">{chunks}</span>
                ),
              })}
            </h2>

            <p className="text-xl font-light leading-relaxed text-carta/55 md:text-2xl">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {(["1", "2", "3", "4"] as const).map((k, i) => (
              <div
                key={k}
                className="group relative overflow-hidden rounded-4xl border border-carta/5 bg-linear-to-br from-carta/[0.03] to-transparent p-8 transition-all duration-500 hover:border-majorelle/30 hover:bg-carta/5 md:p-10"
              >
                {/* la filigrana: enorme, quasi invisibile, si scalda all'hover */}
                <div className="absolute right-0 top-0 p-8 text-carta/[0.02] transition-colors duration-500 group-hover:text-majorelle/[0.07]">
                  <Icon icon={ICONE_SINTOMI[i]} className="h-32 w-32" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-majorelle/10 transition-transform duration-500 group-hover:scale-110">
                    <Icon
                      icon={ICONE_SINTOMI[i]}
                      className="h-6 w-6 text-vista"
                    />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold tracking-tight text-carta md:text-2xl">
                    {t(`symptoms.${k}.title`)}
                  </h3>
                  <p className="font-light leading-relaxed text-carta/55">
                    {t(`symptoms.${k}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- l'aggravante ---- */}
        <div id="aggravante" className="relative">
          <div className="mb-16 max-w-3xl md:mb-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-forge/25 bg-forge/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-forge" />
              <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.2em] text-forge">
                {t("trap_label")}
              </span>
            </div>

            <h2 className="mb-8 text-4xl font-semibold leading-[1.08] tracking-tight text-carta md:text-5xl lg:text-6xl">
              {t.rich("trap_headline", {
                br: () => <br />,
                spanSub: (chunks) => (
                  <span className="text-forge/60">{chunks}</span>
                ),
              })}
            </h2>

            <p className="text-xl font-light leading-relaxed text-carta/55 md:text-2xl">
              {t("trap_subtitle")}
            </p>
          </div>

          {/* il dato, col suo medaglione e la sua fonte */}
          <div className="group relative mb-16 overflow-hidden rounded-[2.5rem] border border-forge/20 bg-[#1a110a] p-8 md:mb-24 md:p-10">
            <div className="absolute right-0 top-0 p-12 text-forge/[0.03] transition-colors duration-700 group-hover:text-forge/[0.06]">
              <Icon icon="solar:danger-bold" className="h-48 w-48" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:gap-12">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-forge/20 bg-forge/10 md:h-24 md:w-24">
                <Icon
                  icon="solar:danger-bold"
                  className="h-10 w-10 text-forge/80 md:h-12 md:w-12"
                />
              </div>
              <div>
                <p className="mb-4 text-2xl font-semibold leading-tight tracking-tight text-carta md:text-3xl">
                  {t("trap_stat")}
                </p>
                <div className="flex items-center gap-2 font-plex text-[10px] uppercase tracking-[0.2em] text-forge/60 md:text-xs">
                  <span className="h-px w-8 bg-forge/25" />
                  {t("trap_source")}
                </div>
              </div>
            </div>
          </div>

          {/* le tre trappole */}
          <div className="mb-24 grid grid-cols-1 gap-6 md:mb-32 md:grid-cols-3 md:gap-8">
            {(["1", "2", "3"] as const).map((k, i) => (
              <div
                key={k}
                className="group relative overflow-hidden rounded-4xl border border-carta/5 bg-carta/[0.02] p-8 transition-all duration-500 hover:border-forge/25"
              >
                <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-forge/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-forge/10 bg-forge/5 transition-transform duration-500 group-hover:scale-110">
                  <Icon
                    icon={ICONE_TRAPPOLE[i]}
                    className="h-6 w-6 text-forge/70"
                  />
                </div>
                <h4 className="mb-4 text-lg font-semibold text-carta md:text-xl">
                  {t(`trap_cards.${k}.title`)}
                </h4>
                <p className="text-sm font-light leading-relaxed text-carta/55 md:text-base">
                  {t(`trap_cards.${k}.desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* la chiusa */}
          <div className="flex justify-center">
            <div className="relative px-12 py-8 text-center md:px-20 md:py-12">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-carta/[0.04] to-transparent" />
              <p className="relative z-10 max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-carta md:text-4xl">
                {t("trap_closing")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
