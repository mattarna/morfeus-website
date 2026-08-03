import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

import "@/components/forge-ms/forge-ms.css";
import { ForgeMsHero } from "@/components/forge-ms/ForgeMsHero";
import { ForgeMsProof } from "@/components/forge-ms/ForgeMsProof";
import { ForgeMsProblema } from "@/components/forge-ms/ForgeMsProblema";
import { ForgeMsBelief } from "@/components/forge-ms/ForgeMsBelief";
import { ForgeMsConfronto } from "@/components/forge-ms/ForgeMsConfronto";
import { ForgeMsComeFunziona } from "@/components/forge-ms/ForgeMsComeFunziona";
import { ForgeMsAssets } from "@/components/forge-ms/ForgeMsAssets";
import { ForgeMsFiltro } from "@/components/forge-ms/ForgeMsFiltro";
import { ForgeMsRoi } from "@/components/forge-ms/ForgeMsRoi";
import { ForgeMsPrezzi } from "@/components/forge-ms/ForgeMsPrezzi";
import { ForgeMsWayOut } from "@/components/forge-ms/ForgeMsWayOut";
import { ForgeMsContatto } from "@/components/forge-ms/ForgeMsContatto";
import { ForgeMsFaq } from "@/components/forge-ms/ForgeMsFaq";

/* ============================================================
   MORF FORGE · AI Operating Partner
   ------------------------------------------------------------
   Struttura COMPLETA (13 sezioni) nel design 2026: SiteShell, fasce
   ink/carta, token. Portata da exp/pagine-2026, dov'era stata rifatta
   con lo stesso metodo del Lab. La copy resta quella del namespace
   i18n `Offerta`, in IT e EN.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

const META = {
  it: {
    title: "Morf Forge · AI Operating Partner · Morfeus",
    desc: "Entriamo nella tua azienda come team operativo: costruiamo sistemi AI che trovano le perdite invisibili, le chiudono e ogni mese misurano il valore recuperato in euro.",
  },
  en: {
    title: "Morf Forge · AI Operating Partner · Morfeus",
    desc: "We join your company as an operating team: we build AI systems that find the invisible losses, close them, and every month measure the value recovered in euros.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const safeLocale = isIt ? "it" : "en";
  const m = isIt ? META.it : META.en;
  return {
    title: { absolute: m.title },
    description: m.desc,
    alternates: buildLocaleAlternates("forge", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: m.title,
      description: m.desc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/forge`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.desc,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default async function ForgePage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const m = isIt ? META.it : META.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/forge#webpage`,
        url: `${SITE_URL}/${safeLocale}/forge`,
        name: m.title,
        description: m.desc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Service",
        name: "Morf Forge · AI Operating Partner",
        serviceType: "AI Operating Partner",
        provider: { "@id": ORGANIZATION_ID },
        description: m.desc,
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

      <ForgeMsHero />
      <ForgeMsProof />
      <ForgeMsProblema />
      <ForgeMsBelief />
      <ForgeMsConfronto />
      <ForgeMsComeFunziona />
      <ForgeMsAssets />
      <ForgeMsFiltro />
      <ForgeMsRoi />
      <ForgeMsPrezzi />
      <ForgeMsWayOut />
      <ForgeMsContatto />
      <ForgeMsFaq />
    </SiteShell>
  );
}
