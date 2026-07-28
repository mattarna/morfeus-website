import { DsFlow } from "@/components/ds2026/DsFlow";
import { LabDsNav } from "@/components/ds2026/lab/LabDsNav";
import { LabDsHero } from "@/components/ds2026/lab/LabDsHero";
import { LabDsProof } from "@/components/ds2026/lab/LabDsProof";

/* ============================================================
   /lab-ds — la variante di /lab sul DS 2026.
   ------------------------------------------------------------
   Confronto: /it/lab e /it/lab-ds, due schede affiancate.

   La differenza di impianto sta tutta qui sotto. /lab e' un elenco
   di 13 FASCE che si alternano di fondo ("Blue" / "Grid") su nero
   pieno: ogni giunzione e' uno stacco. Qui c'e' un solo <DsFlow />
   dietro a tutto, e le sezioni ci galleggiano sopra senza fondo
   proprio. E' la decisione del DS del 2026-07-27: "le pagine NON
   sono fasce con stacchi, ma una superficie sola attraversata da
   luci larghe".

   Sono tutti server component tranne la nav e le CTA: la pagina
   spedisce una frazione del JS dell'originale, che e' "use client"
   per intero con IntersectionObserver e listener di scroll.

   STATO: prima ondata (impianto + copertina + prove). Le sezioni
   dalla 03 alla 13 arrivano nelle ondate successive — vedi la nota
   in fondo alla pagina, che sparisce quando sono tutte in piedi.
   ============================================================ */

const ANCORA_DA_FARE = [
  "03 · Problema",
  "04 · Livelli",
  "05 · Bivio",
  "06 · Metodo",
  "07 · Risultati",
  "08 · Investimento",
  "09 · Programma",
  "10 · Bridge",
  "11 · Contatto",
  "12 · FAQ",
  "13 · Footer",
];

export default function LabDsPage() {
  return (
    <>
      <DsFlow />

      {/* z-10: il contenuto sta sopra il flusso, che e' fisso a z-0 */}
      <div className="relative z-10">
        <LabDsNav />

        <main>
          <LabDsHero />
          <LabDsProof />
        </main>

        <footer className="container pb-24">
          <div className="divider">cantiere</div>
          <p className="t-small">
            Variante di design in costruzione. Sezioni ancora sulla pagina
            originale:
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {ANCORA_DA_FARE.map((voce) => (
              <li key={voce} className="t-label">
                {voce}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  );
}
