import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL } from "@/lib/seo/entity-ids";
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
   /lab: la pagina LAB, rifatta nel sistema `.ms`.
   ------------------------------------------------------------
   Questa e' la versione costruita e approvata su exp/lab-ms2026,
   dove viveva come rotta parallela /lab-ms. Qui prende il posto
   della vecchia /lab: stesso wireframe, stessi id di ancora,
   disegno rifatto nel linguaggio del sistema.

   IL RITMO DELLE FASCE: scuro d'impianto, carta come punteggiatura.
   Non alternanza a scacchiera: due stacchi soli, messi dove cambia
   la NATURA del discorso.

     01-05  ink     diagnosi: si misura al buio, strumento acceso
     06     CARTA   il metodo: si smette di diagnosticare e si spiega
                    come si fa. Su carta legge come scheda tecnica
     07     ink     si torna alla prova
     08     CARTA   i soldi: su carta legge come preventivo stampato
     09-13  ink     programma, ponte, contatto, FAQ, chiusa

   Cosi' ogni stacco ANNUNCIA un cambio di registro invece di essere
   un ritmo decorativo, e il forge dell'aggravante resta l'unico
   picco caldo della pagina.

   La copy arriva dai namespace Lab.* (IT + EN), non da un oggetto
   locale: e' l'unica pagina del sito gia' tradotta a messaggi, e
   duplicarla qui vorrebbe dire tenerne due versioni da allineare
   a mano.

   Client component uno solo: lo schema animato dell'hero. Tutto il
   resto e' server-rendered, FAQ comprese (details/summary nativi).
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

const META = {
  it: {
    title: "LAB · Formazione AI sui processi reali | Morfeus",
    desc: "LAB è la formazione AI di Morfeus: un programma sui processi reali della tua azienda, non su slide. Un LAB, tre porte: Governance, Method, Vertical.",
  },
  en: {
    title: "LAB · AI training on real workflows | Morfeus",
    desc: "LAB is Morfeus' AI training: a programme built on your company's real workflows, not on slides. One LAB, three doors: Governance, Method, Vertical.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const safeLocale = isIt ? "it" : "en";
  const t = META[safeLocale];

  return {
    title: { absolute: t.title },
    description: t.desc,
    alternates: buildLocaleAlternates("lab", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.title,
      description: t.desc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/lab`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.desc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  const safeLocale: "it" | "en" = locale === "it" ? "it" : "en";

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
