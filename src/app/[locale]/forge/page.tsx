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
   Rifatta il 2026-07-30 con lo stesso metodo del Lab: tredici
   componenti in `components/forge-ms/` con una pelle propria
   (`forge-ms.css`), gemella di `lab-ms.css`.

   COSA CAMBIA. La pagina era un'isola: fondo #030508 fisso, header e
   footer suoi, nessuna fascia del design system e la palette scritta a
   mano in esadecimale (#4D39EB trentadue volte — che NON e' il #533DFC
   del brand: due viola diversi nella stessa pagina). Ora e' una pagina
   del sito: SiteShell, fasce ink/carta alternate, token, e la stessa
   testata e lo stesso piede di tutte le altre.

   COSA NON CAMBIA. Copy, ordine e destinazioni: ogni componente legge
   le STESSE chiavi i18n del namespace `Offerta`, quindi il testo resta
   quello — in italiano e in inglese — senza toccare i file di
   traduzione. Il razionale di ogni scelta visiva sta nella testata del
   componente che la porta.

   I VECCHI COMPONENTI in `components/sections/` NON sono stati toccati:
   li usa anche la home precedente, e modificarli avrebbe rotto altro.
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
