import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getAllArticles } from "@/lib/insights";
import { InsightCover, coverKindFromCategory, type CoverKind } from "@/components/site/InsightCover";
import { InsightsBrowser, type BrowserArticle } from "@/components/site/InsightsBrowser";

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "Insights · Morfeus",
    metaDesc:
      "Idee operative sull'AI applicata al business: margine, automazione, governance, ROI e formazione. Il blog di Morfeus.",
    hero: {
      eye: "Insights",
      h1a: "Idee operative sull'AI ",
      h1emph: "applicata",
      h1b: " al business.",
      copy: "Niente hype. Come l'intelligenza artificiale recupera margine, automatizza i processi e resta dentro l'azienda. Scritto da chi i sistemi li mette in produzione.",
      filters: ["Tutti", "Margine & ROI", "Automazione", "AI adoption & governance", "Formazione", "Casi"],
      searchPlaceholder: "Cerca per parola o tema...",
    },
    articoli: {
      h2a: "Tutti gli ",
      h2emph: "articoli",
      h2b: "",
      readMore: "Leggi",
    },
    news: {
      eye: "La newsletter",
      h2a: "Un'idea operativa sull'AI, ogni ",
      h2emph: "settimana",
      h2b: ".",
      p: "Niente teoria. Cosa funziona davvero quando l'AI entra nei processi di un'azienda che scala.",
      placeholder: "La tua email di lavoro",
      cta: "Iscriviti",
    },
    enBanner: "",
  },
  en: {
    metaTitle: "Insights · Morfeus",
    metaDesc:
      "Operational ideas on AI applied to business: margin, automation, governance, ROI and training. The Morfeus blog.",
    hero: {
      eye: "Insights",
      h1a: "Operational ideas on AI ",
      h1emph: "applied",
      h1b: " to business.",
      copy: "No hype. How artificial intelligence recovers margin, automates processes and stays inside the company. Written by the people who put the systems into production.",
      filters: ["All", "Margin & ROI", "Automation", "AI adoption & governance", "Training", "Cases"],
      searchPlaceholder: "Search by keyword or topic...",
    },
    articoli: {
      h2a: "All ",
      h2emph: "articles",
      h2b: "",
      readMore: "Read",
    },
    news: {
      eye: "The newsletter",
      h2a: "One operational idea on AI, every ",
      h2emph: "week",
      h2b: ".",
      p: "No theory. What actually works when AI enters the processes of a company that scales.",
      placeholder: "Your work email",
      cta: "Subscribe",
    },
    enBanner: "Italian original · English translation coming soon",
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("insights", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/insights`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function InsightsPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  /* Serializzo la lista per il client component (solo campi necessari). */
  const browserArticles: BrowserArticle[] = rest.map((a) => ({
    slug: a.slug,
    title: a.title,
    tldr: a.tldr,
    metaDescription: a.metaDescription,
    category: a.category,
    tags: a.tags,
    datePublished: a.datePublished,
    readingTime: a.readingTime,
    coverKind: a.coverKind,
  }));
  const uniqueCategories = Array.from(
    new Set(rest.map((a) => a.category).filter((c): c is string => Boolean(c)))
  ).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/${safeLocale}/insights#collectionpage`,
    url: `${SITE_URL}/${safeLocale}/insights`,
    name: t.metaTitle,
    description: t.metaDesc,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    hasPart: articles.map((a) => ({
      "@type": "Article",
      "@id": `${SITE_URL}/${safeLocale}/insights/${a.slug}`,
      headline: a.title,
      url: `${SITE_URL}/${safeLocale}/insights/${a.slug}`,
      datePublished: a.datePublished,
    })),
  };

  return (
    <SiteShell locale={safeLocale}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 · TESTATA + TOOLBAR FILTRI · CARTA */}
      <section className="band carta hero" id="testata">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="mt-[18px] max-w-[58ch] text-[clamp(15px,1.8vw,17.5px)]" style={{ color: "#34324a" }}>
            {t.hero.copy}
          </p>

          {!isIt && t.enBanner ? (
            <p
              className="mt-6 inline-block rounded-full border px-3.5 py-1.5 font-plex text-[11px] tracking-[.06em] uppercase"
              style={{ borderColor: "rgba(83,61,252,.3)", background: "rgba(83,61,252,.06)", color: "#533DFC" }}
            >
              {t.enBanner}
            </p>
          ) : null}

        </div>
      </section>

      {/* 02 · IN EVIDENZA · INCHIOSTRO */}
      {featured ? (
        <section className="band ink" id="in-evidenza">
          <div className="wrap">
            <h2 className="h-sect">
              {isIt ? "In " : ""}
              <span className="emph">{isIt ? "evidenza" : "Featured"}</span>
            </h2>
            <Link
              href={`${base}/insights/${featured.slug}`}
              className="mt-[30px] grid grid-cols-1 items-center gap-11 md:grid-cols-[1.05fr_.95fr]"
            >
              <div
                className="relative w-full overflow-hidden rounded-[12px] border"
                style={{ aspectRatio: "16 / 9", borderColor: "#2A2850" }}
              >
                <InsightCover
                  kind={(featured.coverKind as CoverKind) || coverKindFromCategory(featured.category)}
                  variant="ink"
                  category={featured.category}
                />
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {featured.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border px-2.5 py-[5px] font-plex text-[10px] font-semibold uppercase tracking-[.04em] text-lilla"
                      style={{ background: "rgba(169,156,255,.1)", borderColor: "rgba(169,156,255,.28)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="my-3 text-[clamp(24px,3.4vw,36px)] font-semibold">{featured.title}</h3>
                <p className="mb-[18px] max-w-[48ch] text-[16px]" style={{ color: "#c6c4d8" }}>
                  {featured.tldr || featured.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 font-plex text-[12px] font-semibold tracking-[.04em] text-lilla">
                  {isIt ? "Leggi l'articolo" : "Read the article"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* 03 · FILTRO + GRIGLIA ARTICOLI · CARTA (client component) */}
      <section className="band carta" id="articoli">
        <div className="wrap">
          <InsightsBrowser
            articles={browserArticles}
            categories={uniqueCategories}
            locale={safeLocale}
            ui={{
              h2a: t.articoli.h2a,
              h2emph: t.articoli.h2emph,
              h2b: t.articoli.h2b,
              readMore: t.articoli.readMore,
              searchPlaceholder: t.hero.searchPlaceholder,
              allLabel: isIt ? "Tutti" : "All",
              emptyState: isIt ? "Nessun articolo trovato per questi filtri." : "No articles match these filters.",
            }}
          />
        </div>
      </section>

      {/* 04 · NEWSLETTER · INCHIOSTRO */}
      <section className="band ink" id="newsletter">
        <div className="wrap text-center">
          <div className="eye">{t.news.eye}</div>
          <h2 className="mx-auto mt-3.5 max-w-[22ch] text-[clamp(28px,4.4vw,44px)]">
            {t.news.h2a}
            <span className="emph">{t.news.h2emph}</span>
            {t.news.h2b}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px]" style={{ color: "#c6c4d8" }}>
            {t.news.p}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <input
              type="email"
              readOnly
              tabIndex={-1}
              placeholder={t.news.placeholder}
              aria-label={t.news.placeholder}
              className="min-w-[280px] rounded-[8px] border px-[18px] py-[11px] font-satoshi text-[14.5px]"
              style={{ borderColor: "#2A2850", background: "rgba(255,255,255,.04)", color: "#F4F3EF" }}
            />
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.news.cta}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
