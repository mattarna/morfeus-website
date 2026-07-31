import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import { SiteROIMeter } from "@/components/site/SiteROIMeter";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle: "ROIometro | Morfeus",
    metaDesc:
      "Stima in euro quanto valore la tua azienda perde ogni mese nel lavoro manuale, e quanto puoi recuperare. Uno strumento, non un preventivo: il primo passo del metodo Morfeus.",
    eye: "Lo strumento della misura",
    h1a: "Metti un numero sul problema che non ",
    h1emph: "vedi",
    h1b: ".",
    lead: "Sposta i cursori sulla tua realtà: persone, costo medio, quota di lavoro manuale. Il ROIometro stima in euro la perdita mensile e il valore recuperabile. È una stima onesta per iniziare a ragionare, non un preventivo.",
  },
  en: {
    metaTitle: "ROIometro | Morfeus",
    metaDesc:
      "Estimate in euros how much value your company loses every month in manual work, and how much you can recover. A tool, not a quote: the first step of the Morfeus method.",
    eye: "The measurement tool",
    h1a: "Put a number on the problem you don't ",
    h1emph: "see",
    h1b: ".",
    lead: "Move the sliders to match your reality: headcount, average cost, share of manual work. The ROIometro estimates the monthly loss and the recoverable value in euros. An honest estimate to start reasoning, not a quote.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates("roiometro", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}${localePrefix(safeLocale)}/roiometro`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function RoiometroPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${localePrefix(safeLocale)}/roiometro#webpage`,
        url: `${SITE_URL}${localePrefix(safeLocale)}/roiometro`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
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

      {/* Hero brand 2026 */}
      <section className="band ink hero" id="hero">
        <div className="wrap">
          <div className="eye">{t.eye}</div>
          <h1>
            {t.h1a}
            <span className="emph">{t.h1emph}</span>
            {t.h1b}
          </h1>
          <p className="lead" style={{ marginTop: 20 }}>
            {t.lead}
          </p>
        </div>
      </section>

      {/* Lo strumento vero (client component) */}
      <section className="band ink" style={{ paddingTop: 0 }}>
        <SiteROIMeter />
      </section>
    </SiteShell>
  );
}
