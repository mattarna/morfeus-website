import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Il titolo lo mette questa rotta e non la not-found, perche' Next non
   legge i metadata dai file not-found: senza, nella linguetta del
   browser restava il titolo del sito B2B su una schermata del
   Playground. Fuori dall'indice: una 404 non va nei risultati. */
export const metadata: Metadata = {
  title: "Indirizzo non valido · Playground",
  robots: { index: false, follow: false },
};

/* ============================================================
   L'ACCHIAPPA-TUTTO del Playground
   ------------------------------------------------------------
   Serve a una cosa sola: far scattare la 404 di casa
   (app/playground/not-found.tsx) invece di quella del sito madre.

   Perche' serve. In Next una not-found di segmento si attiva solo
   quando qualcuno chiama notFound() DENTRO quel segmento; per un
   indirizzo che non corrisponde a nessuna rotta interviene la
   not-found della radice. Siccome il proxy riscrive tutto il
   sottodominio sotto /playground, senza questo file ogni indirizzo
   sbagliato di playground.morfeushub.com finiva sulla schermata
   glitch del sito B2B: due identita' sullo stesso host.

   Le rotte statiche vincono sulle dinamiche, quindi /playground e
   /playground/referto-anteprima continuano a rispondere loro: qui
   cade solo cio' che non esiste.
   ============================================================ */

export default function PlaygroundCatchAll() {
  notFound();
}
