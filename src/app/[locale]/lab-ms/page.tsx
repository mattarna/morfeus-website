import { SiteShell } from "@/components/site";
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

      <section className="border-t border-carta/5 bg-inchiostro px-6 py-16 xl:px-40">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-carta/10 bg-carta/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-carta/30" />
            <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.2em] text-carta/40">
              Cantiere
            </span>
          </div>
          <p className="font-plex text-xs uppercase tracking-[0.15em] text-carta/30">
            {ANCORA_DA_FARE.join("  ·  ")}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
