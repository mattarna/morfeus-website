import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

import { COPY } from "@/components/forge-ms/copy";
import "@/components/forge-ms/forge-ms.css";
import { ForgeMsHero } from "@/components/forge-ms/ForgeMsHero";
import { ForgeMsProblema } from "@/components/forge-ms/ForgeMsProblema";
import { ForgeMsProdotto } from "@/components/forge-ms/ForgeMsProdotto";
import { ForgeMsPercorso } from "@/components/forge-ms/ForgeMsPercorso";
import { ForgeMsFiltro } from "@/components/forge-ms/ForgeMsFiltro";
import { ForgeMsProva } from "@/components/forge-ms/ForgeMsProva";
import { ForgeMsPonte } from "@/components/forge-ms/ForgeMsPonte";
import { ForgeMsChiusa } from "@/components/forge-ms/ForgeMsChiusa";

/* ============================================================
   MORF FORGE · Operating Partner AI
   ------------------------------------------------------------
   Rifatta il 2026-07-30 con lo stesso metodo del Lab: la pagina non
   e' piu' un file solo da 866 righe, ma otto componenti in
   `components/forge-ms/` con una pelle propria (`forge-ms.css`),
   gemella di `lab-ms.css`.

   COPY E STRUTTURA NON CAMBIANO: stesse otto sezioni, stesso ordine,
   stesso testo, stessi link. Cambia il disegno, allineato al
   linguaggio 2026 (quadro, readout, quota, stazioni). Il razionale di
   ogni scelta sta nella testata del componente che la porta.

   Il testo vive in `forge-ms/copy.ts`, spostato li' verbatim: con la
   pagina spezzata, ogni componente legge la sua fetta invece di
   ricevere dieci prop.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates("forge", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}${localePrefix(safeLocale)}/forge`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDesc,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default async function ForgePage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${localePrefix(safeLocale)}/forge#webpage`,
        url: `${SITE_URL}${localePrefix(safeLocale)}/forge`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        /* Il servizio si chiama Morf Forge; MARF e' il sistema che
           installa, ed e' nominato nella descrizione, non nel nome. */
        "@type": "Service",
        name: "Morf Forge · AI Operating Partner",
        serviceType: "AI Operating Partner",
        provider: { "@id": ORGANIZATION_ID },
        description: t.metaDesc,
        areaServed: "IT",
      },
    ],
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ForgeMsHero t={t} />
      <ForgeMsProblema t={t} />
      <ForgeMsProdotto t={t} base={base} isIt={isIt} />
      <ForgeMsPercorso t={t} isIt={isIt} />
      <ForgeMsFiltro t={t} />
      <ForgeMsProva t={t} base={base} />
      <ForgeMsPonte t={t} isIt={isIt} />
      <ForgeMsChiusa t={t} />
    </SiteShell>
  );
}
