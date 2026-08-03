import type { Metadata } from "next";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

import { COPY } from "@/components/forge-ms/copy";
import { ForgeCompleta } from "./ForgeCompleta";

/* ============================================================
   MORF FORGE · Operating Partner AI
   ------------------------------------------------------------
   La rotta rende la SALES PAGE COMPLETA (14 sezioni), non piu' la
   versione corta "expertise" a 8 sezioni (forge-ms). Il corpo vive in
   `./ForgeCompleta` (componente client con i componenti `sections/`).

   Qui restano solo i metadata e il JSON-LD, lato server: il testo dei
   meta continua a leggersi da `forge-ms/copy.ts` (metaTitle/metaDesc),
   che descrive comunque l'offerta Operating Partner.
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
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ForgeCompleta />
    </>
  );
}
