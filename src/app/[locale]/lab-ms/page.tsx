import { SiteShell } from "@/components/site";
import { LabMsHero } from "@/components/lab-ms/LabMsHero";
import { LabMsProof } from "@/components/lab-ms/LabMsProof";
import { LabMsProblem } from "@/components/lab-ms/LabMsProblem";
import { LabMsLevels } from "@/components/lab-ms/LabMsLevels";

/* ============================================================
   /lab-ms — /lab riadattata al DS "brand 2026 · Progettato. Provato."
   ------------------------------------------------------------
   Confronto a tre: /it/lab (originale) · /it/lab-ds (l'altro DS, che
   resta) · /it/lab-ms (questa).

   ORDINE E FLUSSO: identici all'originale. Le 13 sezioni nella stessa
   sequenza, stessi id di ancora, stessa copy dai namespace Lab.*.
   L'unica cosa che cambia e' come sono vestite.

   L'ALTERNANZA e' la regola madre del sistema — "carta e inchiostro,
   alternati fascia per fascia" (site.css, riga 4). L'originale gia'
   alterna due fondi ("Blue" / "Grid"): la mappatura e' 1:1, Blue
   diventa ink e Grid diventa carta. Quindi il ritmo dello scroll che
   avevi non si perde, cambia di materia.

   STATO: prime 4 sezioni. Le altre 9 arrivano dopo la validazione —
   la nota in fondo le elenca e sparisce quando sono tutte in piedi.
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

      <section className="band ink">
        <div className="wrap">
          <div className="eye">Cantiere</div>
          <p className="lead" style={{ marginTop: 12 }}>
            Variante di design in costruzione. Sezioni ancora da riadattare:
          </p>
          <p
            className="mono"
            style={{ fontSize: 12, color: "var(--ombra)", marginTop: 14 }}
          >
            {ANCORA_DA_FARE.join("  ·  ")}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
