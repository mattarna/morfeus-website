import type { Metadata } from "next";
import { PlaygroundLanding } from "@/components/playground/PlaygroundLanding";

/* ============================================================
   /playground · la landing della community.
   ------------------------------------------------------------
   Rotta FUORI da [locale], e non per pigrizia: la pagina esiste solo
   in italiano, e infilarla nel routing next-intl le appiccicherebbe
   un /it/ davanti che su un sottodominio dedicato non vuole dire
   niente. Se un giorno serve l'inglese, si sposta allora.

   L'indirizzo pubblico e' playground.morfeushub.com: il proxy
   riscrive quell'host su questa rotta. Sul dominio principale
   /playground non deve rispondere, o la stessa pagina finirebbe
   indicizzata su due host.
   ============================================================ */

const TITOLO = "Playground · La community di Morfeus";
const DESCRIZIONE =
  "Non ti serve un altro corso di AI. Ti serve stare a contatto con chi la usa sul serio. Si entra facendo il Collaudo: 2 minuti e mezzo per scoprire a che livello sei.";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  openGraph: {
    title: TITOLO,
    description: DESCRIZIONE,
    type: "website",
    url: "https://playground.morfeushub.com",
    siteName: "Morfeus Playground",
    locale: "it_IT",
  },
  twitter: { card: "summary_large_image", title: TITOLO, description: DESCRIZIONE },
  /* Finche' la pagina non e' finita (manca il collaudo) resta fuori
     dall'indice: una landing la cui unica porta non funziona non deve
     entrare nei risultati. Si toglie quando il collaudo e' attaccato. */
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <PlaygroundLanding />;
}
