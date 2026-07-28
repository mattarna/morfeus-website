import { SiteShell } from "@/components/site";
import "@/components/lab-ms/lab-ms.css";
import { LabMsHero } from "@/components/lab-ms/LabMsHero";
import { LabMsProof } from "@/components/lab-ms/LabMsProof";
import { LabMsProblem } from "@/components/lab-ms/LabMsProblem";
import { LabMsLevels } from "@/components/lab-ms/LabMsLevels";
import { LabMsBivio } from "@/components/lab-ms/LabMsBivio";
import { LabMsMetodo } from "@/components/lab-ms/LabMsMetodo";
import { LabMsRisultati } from "@/components/lab-ms/LabMsRisultati";
import { LabMsInvestimento } from "@/components/lab-ms/LabMsInvestimento";
import { LabMsProgramma } from "@/components/lab-ms/LabMsProgramma";
import { LabMsBridge } from "@/components/lab-ms/LabMsBridge";
import { LabMsContatto } from "@/components/lab-ms/LabMsContatto";
import { LabMsFaq } from "@/components/lab-ms/LabMsFaq";
import { LabMsChiusa } from "@/components/lab-ms/LabMsChiusa";

/* ============================================================
   /lab-ms — /lab rivestita col brand 2026.
   ------------------------------------------------------------
   Confronto a tre: /it/lab (originale) · /it/lab-ds (l'altro DS,
   tenuto) · /it/lab-ms (questa).

   IL PATTO: il WIREFRAME e' quello della pagina online — stessi
   blocchi, stesso ordine, stessi id di ancora, stessa copy dai
   namespace Lab.*. Il DISEGNO e' rifatto nel linguaggio del sistema.

   L'IDEA: la pagina e' uno strumento di misura. Griglia blueprint
   come carta da disegno, pannelli opachi appoggiati sopra, il lilla
   e' il segnale che attraversa e rivela, il forge e' l'allarme.

   IL RITMO DELLE FASCE — scuro d'impianto, carta come punteggiatura.
   Non alternanza a scacchiera: due stacchi soli, messi dove cambia
   la NATURA del discorso.

     01-05  ink     diagnosi: si misura al buio, strumento acceso
     06     CARTA   il metodo: si smette di diagnosticare e si spiega
                    come si fa. Su carta legge come scheda tecnica
     07     ink     si torna alla prova
     08     CARTA   i soldi: su carta legge come preventivo stampato,
                    ed e' anche l'unica fascia dove .statgrid del DS
                    funziona davvero (ha i filetti cablati su inchiostro)
     09-13  ink     programma, ponte, contatto, FAQ, chiusa

   Cosi' ogni stacco ANNUNCIA un cambio di registro invece di essere
   un ritmo decorativo, e il forge dell'aggravante resta l'unico
   picco caldo della pagina.

   Client component uno solo: lo schema animato dell'hero. Tutto il
   resto e' server-rendered, FAQ comprese (details/summary nativi).
   ============================================================ */

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
      <LabMsBivio />
      <LabMsMetodo />
      <LabMsRisultati />
      <LabMsInvestimento />
      <LabMsProgramma />
      <LabMsBridge />
      <LabMsContatto />
      <LabMsFaq />
      <LabMsChiusa />
    </SiteShell>
  );
}
