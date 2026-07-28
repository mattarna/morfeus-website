import { SiteShell } from "@/components/site";
import "@/components/lab-ms/lab-ms.css";
import { LabMsHero } from "@/components/lab-ms/LabMsHero";
import { LabMsProof } from "@/components/lab-ms/LabMsProof";
import { LabMsProblem } from "@/components/lab-ms/LabMsProblem";
import { LabMsLevels } from "@/components/lab-ms/LabMsLevels";

/* ============================================================
   /lab-ms — /lab rivestita col brand 2026.
   ------------------------------------------------------------
   Confronto a tre: /it/lab (originale) · /it/lab-ds (l'altro DS, che
   resta) · /it/lab-ms (questa).

   IL PRINCIPIO, dopo la prima versione sbagliata: la pagina resta
   quella. Stessa composizione, stessi dispositivi, stessa densita'
   visiva — icone, filigrane, aloni, hover, l'animazione del nucleo.
   Cambia la MATERIA: caratteri Clash/Satoshi/Plex e palette ufficiale.

   La prima volta avevo fatto il contrario: avevo adottato i componenti
   piatti del sistema (.card, .statgrid) e buttato via tutto il resto.
   Il risultato era una pagina asettica su due colori soli. Qui la
   rampa e' usata per intero — vista, neon, majorelle, persian, forge —
   perche' esiste per quello.

   Il fondo resta INCHIOSTRO per tutta la pagina, come l'originale, con
   le superfici che variano di un gradino (inchiostro / inchiostro-2 /
   night) invece di alternare col chiaro: e' la lettura giusta di
   "quella scura".

   STATO: prime 4 sezioni, da validare. Le altre 9 a seguire.
   ============================================================ */

const ANCORA_DA_FARE = [
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

export default async function LabMsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale === "en" ? "en" : "it";

  return (
    <SiteShell locale={safeLocale}>
      <LabMsHero />
      <LabMsProof />
      <LabMsProblem />
      <LabMsLevels />

      <section className="band ink lab">
        <div className="wrap">
          <div className="quota">Cantiere</div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--ombra)]">
            {ANCORA_DA_FARE.join("  ·  ")}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
