import type { Metadata } from "next";
import { GateLanding } from "@/components/playground/GateLanding";

/* ============================================================
   /gate · la porta corta, per il traffico dai social.
   ------------------------------------------------------------
   Indirizzo pubblico: playground.morfeushub.com/gate (il proxy
   riscrive il sottodominio sotto /playground).

   FUORI DALL'INDICE, e non per dimenticanza. E' una pagina di
   conversione che dice le stesse cose della landing in due blocchi:
   lasciarla indicizzare vorrebbe dire mettere due nostre pagine in
   concorrenza sulle stesse parole, e far vincere a Google la piu'
   povera delle due. Chi cerca il Playground deve trovare la landing.
   `follow` resta acceso: i link che escono da qui contano.
   ============================================================ */

const TITOLO = "Entra nel Playground · La community di Morfeus";
const DESCRIZIONE =
  "La community gratuita di 1.000+ professionisti e imprenditori che usano l'AI sul serio. Si entra dal Collaudo: 2 minuti e mezzo per scoprire il tuo livello e avere il tuo piano di lavoro.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  robots: { index: false, follow: true },
  openGraph: {
    title: TITOLO,
    description: DESCRIZIONE,
    type: "website",
    url: "https://playground.morfeushub.com/gate",
    siteName: "Morfeus Playground",
    locale: "it_IT",
  },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
  /* Il canonical del layout punta alla radice del sottodominio: qui
     va sovrascritto, o questa pagina si dichiarerebbe una copia
     della landing. */
  alternates: { canonical: "https://playground.morfeushub.com/gate" },
};

export default function GatePage() {
  return <GateLanding />;
}
