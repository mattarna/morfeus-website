"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

/* ============================================================
   02 · DATI REALI DA AZIENDE REALI.
   ------------------------------------------------------------
   Questa e' la sezione che avevo appiattito peggio: l'avevo ridotta a
   una tabellina di celle. Nell'originale i numeri sono ENORMI
   (text-7xl, ~72px) in gradiente verticale, ed e' quello che la fa
   funzionare — e' una dichiarazione di scala, non un prospetto.

   Quindi torna com'era: numero gigante, etichetta grossa sotto,
   descrizione in terza battuta. Titolo centrato in gradiente.

   Cosa AGGIUNGO rispetto all'originale, perche' li' era tutto
   bianco-grigio: ogni blocco prende un gradino diverso della rampa
   ufficiale (vista → neon → majorelle) e una sua icona. La rampa esiste
   proprio per questo; usarne un gradino solo la spreca.
   ============================================================ */

const BLOCCHI = [
  {
    k: "1",
    icona: "solar:users-group-rounded-bold-duotone",
    da: "from-carta",
    a: "to-vista",
    tinta: "text-vista",
    chip: "bg-vista/10 border-vista/20",
  },
  {
    k: "2",
    icona: "solar:clock-circle-bold-duotone",
    da: "from-carta",
    a: "to-neon",
    tinta: "text-neon",
    chip: "bg-neon/10 border-neon/20",
  },
  {
    k: "3",
    icona: "solar:buildings-2-bold-duotone",
    da: "from-carta",
    a: "to-majorelle",
    tinta: "text-vista",
    chip: "bg-majorelle/10 border-majorelle/25",
  },
] as const;

export function LabMsProof() {
  const t = useTranslations("Lab.proof");
  // la chiusura oggi e' stringa vuota nella copy: resta opzionale come
  // nell'originale, che la nasconde invece di stampare un blocco vuoto
  const chiusura = t("closing").trim();

  return (
    <section
      id="proof"
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
      {/* un alone largo dietro, perche' la fascia non sia una lastra piatta */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-majorelle/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <h2 className="mb-16 text-center text-2xl font-semibold tracking-[-0.02em] sm:text-3xl md:mb-20 md:text-4xl">
          <span className="bg-linear-to-r from-carta to-carta/60 bg-clip-text text-transparent">
            {t("title")}
          </span>
        </h2>

        <div className="mb-16 grid grid-cols-1 gap-12 md:mb-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {BLOCCHI.map((b) => (
            <div
              key={b.k}
              className="group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border ${b.chip} transition-transform duration-500 group-hover:scale-110`}
              >
                <Icon icon={b.icona} className={`h-6 w-6 ${b.tinta}`} />
              </div>

              <span
                className={`bg-linear-to-b ${b.da} ${b.a} bg-clip-text text-5xl font-semibold tracking-[-0.04em] text-transparent sm:text-6xl md:text-7xl`}
              >
                {t(`blocks.${b.k}.number`)}
              </span>

              <p className="mb-3 mt-4 text-xl font-medium text-carta/85 sm:text-2xl">
                {t(`blocks.${b.k}.label`)}
              </p>

              <p className="max-w-sm text-base font-light leading-relaxed text-carta/45 sm:text-lg">
                {t(`blocks.${b.k}.description`)}
              </p>
            </div>
          ))}
        </div>

        {chiusura ? (
          <p className="mx-auto max-w-5xl border-t border-carta/5 pt-16 text-center text-2xl font-light leading-relaxed text-carta/55 sm:text-3xl md:text-4xl">
            {chiusura}
          </p>
        ) : null}
      </div>
    </section>
  );
}
