/* ============================================================
   ANTEPRIMA del referto · pagina di lavoro, non di produzione.
   ------------------------------------------------------------
   Serve a guardare il referto con dati veri passati dal motore,
   senza dover compilare il collaudo ogni volta. Va tolta quando il
   flusso e' cablato nella landing.

   FUORI DALLA PRODUZIONE. Non basta il noindex: una pagina che
   risponde 200 e' pubblica anche se nessun motore la indicizza,
   e questa mostra sei profili di persone finte con tanto di conto
   economico. In produzione risponde 404 vero.

   Resta viva in sviluppo perche' il referto lo ritocchiamo spesso
   e rifare il collaudo da capo a ogni giro costa piu' di quanto
   valga la pagina.
   ============================================================ */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Referto, type DatiReferto } from "@/components/playground/collaudo/Referto";
import { BOOTCAMP_APERTO } from "@/components/playground/collegamenti";
import "@/components/playground/playground.css";

export const metadata: Metadata = {
  title: "Anteprima referto · Il Collaudo",
  robots: { index: false, follow: false },
};

/** In produzione questa pagina non esiste. */
const IN_SVILUPPO = process.env.NODE_ENV !== "production";

const CASI: { id: string; etichetta: string; dati: DatiReferto }[] = [
  {
    id: "fuoriclasse",
    etichetta: "Il fuoriclasse",
    dati: {
      nome: "Matteo",
      mestiere: "formazione",
      struttura: "team-piccolo",
      dichiarato: "L2",
      doveperdi: "operations",
      urgenza: "media",
      oreSettimana: 10,
      valoreOra: 450,
      personeNelTeam: 7,
      profilo: { tasca: "mia", leva: "struttura", intento: "team" },
      radiografia: { contesto: 3, ripetibilita: 3, correzione: 3, controllo: 3, diffusione: 3 },
      opzioni: { bootcampAperto: BOOTCAMP_APERTO },
    },
  },
  {
    id: "frenato",
    etichetta: "Founder frenato dalla diffusione",
    dati: {
      nome: "Paolo",
      mestiere: "tecnico",
      struttura: "team-piccolo",
      dichiarato: "L2",
      doveperdi: "delivery",
      urgenza: "alta",
      oreSettimana: 12,
      valoreOra: 200,
      personeNelTeam: 7,
      profilo: { tasca: "mia", leva: "struttura", intento: "applicare" },
      radiografia: { contesto: 3, ripetibilita: 3, correzione: 3, controllo: 3, diffusione: 1 },
      opzioni: { bootcampAperto: BOOTCAMP_APERTO },
    },
  },
  {
    id: "meta",
    etichetta: "Freelance a metà strada",
    dati: {
      nome: "Giulia",
      mestiere: "consulenza",
      struttura: "solo",
      dichiarato: "L1p",
      doveperdi: "acquisizione",
      urgenza: "media",
      oreSettimana: 9,
      valoreOra: 90,
      profilo: { tasca: "mia", leva: "solo", intento: "applicare" },
      radiografia: { contesto: 2, ripetibilita: 2, correzione: 2, controllo: 2, diffusione: 1 },
      opzioni: { bootcampAperto: BOOTCAMP_APERTO },
    },
  },
  {
    id: "dipendente",
    etichetta: "Dipendente bravo",
    dati: {
      nome: "Guido",
      mestiere: "azienda",
      struttura: "dipendente",
      dichiarato: "L1p",
      urgenza: "alta",
      oreSettimana: 8,
      valoreOra: 45,
      profilo: { tasca: "azienda", leva: "nessuna", intento: "applicare" },
      radiografia: { contesto: 3, ripetibilita: 3, correzione: 3, controllo: 3, diffusione: 2 },
      opzioni: { bootcampAperto: BOOTCAMP_APERTO },
    },
  },
  {
    id: "partenza",
    etichetta: "Chi sta partendo",
    dati: {
      nome: "Sara",
      mestiere: "agenzia",
      struttura: "solo",
      dichiarato: "L1",
      doveperdi: "delivery",
      urgenza: "bassa",
      oreSettimana: 14,
      valoreOra: 45,
      profilo: { tasca: "mia", leva: "solo", intento: "imparare" },
      radiografia: { contesto: 1, ripetibilita: 0, correzione: 1, controllo: 1, diffusione: 0 },
      opzioni: { bootcampAperto: BOOTCAMP_APERTO },
    },
  },
];

export default async function AnteprimaReferto({
  searchParams,
}: {
  searchParams: Promise<{ caso?: string }>;
}) {
  if (!IN_SVILUPPO) notFound();

  const { caso } = await searchParams;
  const scelto = CASI.find((c) => c.id === caso) ?? CASI[0];

  return (
    <div className="pg26">
      <nav
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          padding: "18px 26px",
          borderBottom: "1px solid var(--line)",
          fontFamily: "var(--mono)",
          fontSize: 12,
        }}
      >
        {CASI.map((c) => (
          <a
            key={c.id}
            href={`?caso=${c.id}`}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              border: "1px solid var(--line-hi)",
              color: c.id === scelto.id ? "var(--uv)" : "var(--mute)",
              background: c.id === scelto.id ? "var(--n3)" : "transparent",
            }}
          >
            {c.etichetta}
          </a>
        ))}
      </nav>
      <Referto {...scelto.dati} />
    </div>
  );
}
