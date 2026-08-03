import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { ImparaPercorsi } from "@/components/site/ImparaPercorsi";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getPercorsi, getTutteLeLezioni } from "@/lib/impara-percorsi";

/* ============================================================
   IMPARA L'AI. Pagina unica, i quattro percorsi dentro.
   ------------------------------------------------------------
   Prima erano sei sezioni con fasce alternate (tesi, percorsi,
   primo passo, al lavoro, FAQ) e i contenuti veri sparsi in
   mezzo. Ora e' come il prototipo: hero, una barra con i quattro
   percorsi, e una sola fascia chiara che li contiene tutti, con
   le lezioni a fisarmonica.

   Le lezioni stanno in `src/lib/impara-percorsi.ts`: la stessa
   lista alimenta il `FAQPage` nei dati strutturati, che e' il
   motivo per cui questa pagina puo' comparire nelle risposte.

   Ogni lezione ha la sua ancora: si puo' linkare la singola
   domanda da un articolo o dal glossario.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle: "Impara l'AI · Percorsi gratuiti per team e imprese | Morfeus",
    metaDesc:
      "Percorsi gratuiti per imprenditori, manager e team: capire dove l'AI crea valore, applicarla al lavoro reale e renderla una capacità che resta in azienda.",
    hero: {
      eye: "Impara l'AI",
      h1a: "Non devi imparare tutto sull'AI. Devi imparare a usarla ",
      h1emph: "dove conta",
      h1b: ".",
      copy: "Percorsi gratuiti per imprenditori, manager e team che vogliono passare dai tool ai processi: capire dove l'AI crea valore, applicarla al lavoro e renderla una capacità che resta in azienda.",
    },
    nav: "Percorsi",
    elenco: "I percorsi",
    cta: {
      eye: "Dalla teoria alla pratica",
      h2a: "Ora che hai le basi, ",
      h2emph: "vediamole sui tuoi numeri",
      h2b: ".",
      p: "Scopri quanto la tua azienda perde ogni mese, e quanto può recuperare con l'AI.",
      btn: "Prova il ROIometro",
      btn2: "Vedi il Metodo",
    },
  },
  en: {
    metaTitle: "Learn AI · Free paths for teams and companies | Morfeus",
    metaDesc:
      "Free learning paths for founders, managers and teams: understand where AI creates value, apply it to real work and make it a capability that stays.",
    hero: {
      eye: "Learn AI",
      h1a: "You do not need to learn everything about AI. You need to learn where to ",
      h1emph: "use it well",
      h1b: ".",
      copy: "Free learning paths for founders, managers and teams who want to move beyond tools and into workflows: understand where AI creates value, apply it to the work and make it a capability that stays in the company.",
    },
    nav: "Paths",
    elenco: "The paths",
    cta: {
      eye: "From theory to practice",
      h2a: "Now that you have the basics, ",
      h2emph: "let's look at your numbers",
      h2b: ".",
      p: "Find out how much your company loses every month, and how much it can recover with AI.",
      btn: "Try the ROIometer",
      btn2: "See the Method",
    },
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
    alternates: buildLocaleAlternates("impara-ai", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}${localePrefix(safeLocale)}/impara-ai`,
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

export default async function ImparaAiPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  /* Le lezioni seguono la lingua della pagina: prima ne esisteva una
     lista sola, in italiano, e /impara-ai (inglese) mostrava hero e CTA
     tradotti sopra diciotto domande in italiano. */
  const percorsi = getPercorsi(safeLocale);
  const lezioni = getTutteLeLezioni(safeLocale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${localePrefix(safeLocale)}/impara-ai#faq`,
        url: `${SITE_URL}${localePrefix(safeLocale)}/impara-ai`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: lezioni.map((l) => ({
          "@type": "Question",
          name: l.q,
          url: `${SITE_URL}${localePrefix(safeLocale)}/impara-ai#${l.anchor}`,
          acceptedAnswer: { "@type": "Answer", text: l.a },
        })),
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

      {/* 01 · HERO · ink */}
      <section className="band ink hero pg" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>
        </div>
      </section>

      {/* 02 · BARRA PERCORSI · fuori dalle fasce, si aggancia sotto l'header */}
      <nav className="ia-nav" aria-label={t.nav}>
        <div className="row">
          <span className="k">{t.nav}</span>
          {percorsi.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {p.titolo}
            </a>
          ))}
        </div>
      </nav>

      {/* 03 · I QUATTRO PERCORSI · carta, una fascia sola */}
      <section className="band carta" aria-label={t.elenco}>
        <div className="wrap">
          <ImparaPercorsi percorsi={percorsi} locale={safeLocale} />
        </div>
      </section>

      {/* 04 · CTA · ink */}
      <section className="band ink pg" id="cta">
        <div className="wrap">
          <div className="ctaq">
            <div className="eye justify-center">{t.cta.eye}</div>
            <h2 className="h-sect">
              {t.cta.h2a}
              <span className="emph">{t.cta.h2emph}</span>
              {t.cta.h2b}
            </h2>
            <p>{t.cta.p}</p>
            <div className="cta-row centrata">
              <Link className="btn btn-1" href={`${base}/roiometro`}>
                {t.cta.btn}
              </Link>
              <Link className="btn btn-2-carta" href={`${base}/metodo`}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
