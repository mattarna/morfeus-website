"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

/* ============================================================
   04 · I TRE LIVELLI.
   ------------------------------------------------------------
   Qui l'originale aveva gia' tre colori diversi, uno per livello —
   ed e' esattamente il tipo di cosa che avevo cancellato riducendo
   tutto a tre carte uguali. Torna:

     · un colore per livello: vista (Literate) → neon (Champion) →
       forge (Architect). La progressione si legge dal colore prima
       che dal testo
     · l'icona di livello nel suo riquadro, che cresce all'hover
     · la carta del TARGET rialzata, ingrandita e con l'alone dietro
     · gli esiti spezzati sul "·" e resi come pill separate
     · le frecce di passaggio fra una carta e l'altra

   Il target NON e' "la seconda per posizione": e' quella marcata
   TARGET nella copy. Se domani si sposta, la pagina segue da sola.
   ============================================================ */

const LIVELLI = [
  {
    id: "literate",
    icona: "solar:book-bold-duotone",
    tinta: "text-vista",
    bordo: "border-carta/5",
    alone: "",
    pill: "bg-vista/10 border-vista/25 text-vista",
  },
  {
    id: "champion",
    icona: "solar:star-bold-duotone",
    tinta: "text-neon",
    bordo: "border-majorelle/30",
    alone: "shadow-[0_20px_50px_-20px_rgba(83,61,252,0.45)]",
    pill: "bg-majorelle/10 border-majorelle/25 text-neon",
  },
  {
    id: "architect",
    icona: "solar:cpu-bolt-bold-duotone",
    tinta: "text-forge",
    bordo: "border-forge/20",
    alone: "",
    pill: "bg-forge/10 border-forge/25 text-forge",
  },
] as const;

export function LabMsLevels() {
  const t = useTranslations("Lab.levels");
  const insight = t("insight").trim();

  return (
    <section
      id="levels"
      className="relative overflow-visible border-y border-carta/5 bg-night px-6 py-24 md:py-40 xl:px-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,165,247,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(140,165,247,.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-20 text-center md:mb-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-majorelle/25 bg-majorelle/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-majorelle" />
            <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.2em] text-vista">
              {t("label")}
            </span>
          </div>

          <h2 className="mb-8 text-4xl font-semibold leading-[1.08] tracking-tight text-carta md:text-6xl">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="text-carta/45">{chunks}</span>,
            })}
          </h2>

          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-carta/55 md:text-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-3">
          {LIVELLI.map((liv, i) => {
            const tag = t(`tiers.${liv.id}.tag`);
            const eIlTarget = tag.toUpperCase().includes("TARGET");

            return (
              <div
                key={liv.id}
                className={`group relative flex flex-col rounded-[2.5rem] border bg-linear-to-br from-carta/[0.03] to-transparent p-8 transition-all duration-500 hover:bg-carta/5 md:p-10 ${liv.bordo} ${liv.alone} ${
                  eIlTarget ? "lg:-mb-4 lg:-mt-4 lg:scale-[1.02]" : ""
                }`}
              >
                {eIlTarget && (
                  <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-majorelle/15 blur-[80px]" />
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={`mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 ${liv.pill}`}
                  >
                    <span className="font-plex text-[9px] font-semibold uppercase tracking-[0.2em]">
                      {tag}
                    </span>
                  </div>

                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-carta/10 bg-carta/[0.03] transition-transform duration-500 group-hover:scale-110">
                    <Icon icon={liv.icona} className={`h-8 w-8 ${liv.tinta}`} />
                  </div>

                  <h3 className="mb-4 text-2xl font-semibold tracking-tight text-carta md:text-3xl">
                    {t(`tiers.${liv.id}.name`)}
                  </h3>

                  <p className="mb-8 grow text-base font-light leading-relaxed text-carta/55 md:text-lg">
                    {t(`tiers.${liv.id}.desc`)}
                  </p>

                  <div className="mt-auto border-t border-carta/5 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {t(`tiers.${liv.id}.outcome`)
                        .split(" · ")
                        .map((esito) => (
                          <span
                            key={esito}
                            className={`rounded-full border px-3 py-1.5 font-plex text-[10px] font-semibold uppercase tracking-[0.15em] ${liv.pill}`}
                          >
                            {esito}
                          </span>
                        ))}
                    </div>
                  </div>

                  {i < LIVELLI.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="h-5 w-5 text-carta/15"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {insight.length > 0 && (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-12 h-px w-24 bg-linear-to-r from-transparent via-carta/20 to-transparent" />
            <p className="mx-auto max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-carta md:text-3xl">
              {insight}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
