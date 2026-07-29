import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { Glifo } from "@/components/pagine/Glifo";
import { InsightCover, coverKindFromCategory, type CoverKind } from "@/components/site/InsightCover";
import { InsightsBrowser, type BrowserArticle } from "@/components/site/InsightsBrowser";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getAllArticles } from "@/lib/insights";
import { PILASTRI, pilastroDi, ARTICOLO_IN_EVIDENZA, type ChiavePilastro } from "@/lib/pilastri";

/* ============================================================
   INSIGHTS, pagina hub.
   ------------------------------------------------------------
   SECONDA VERSIONE. La prima aveva buttato via le copertine SVG e
   la griglia visiva per rifare tutto con le schede degli altri hub.
   Sbagliato due volte: quelle copertine erano gia' state chieste da
   Matteo perche' la pagina "era troppo piatta", e una pagina di
   contenuti senza immagini e' esattamente il piatto da cui si era
   usciti. Qui torna la struttura precedente:

     01 testata      CARTA  la pagina apre chiara, non scura: e'
                            l'unico hub che si legge, non si consulta
     02 in evidenza  ink    copertina 16:9 grande accanto al titolo
     03 griglia      CARTA  InsightsBrowser, copertina per articolo,
                            ricerca e filtri
     04 termini      ink    il ponte verso il Glossario
     05 CTA          ink

   Del copy nuovo resta tutto: headline, le tre domande d'ingresso
   (che stanno nella testata, dove il brief le vuole), la sezione
   dei termini e la CTA. Cio' che era gia' buono nel disegno non si
   tocca; cio' che era vecchio nella copy si cambia.

   I FILTRI usano i quattro pilastri approvati, non le vecchie
   categorie: al browser passo il pilastro come `category`, cosi'
   il componente resta identico e la pagina rispetta il brief, che
   vieta "PMI" come categoria editoriale.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  it: {
    metaTitle: "Insights · Guide operative sull'AI in azienda | Morfeus",
    metaDesc:
      "Guide operative per capire dove intervenire con l'AI, come costruire sistemi utili e come verificarne il valore nel tempo. Processi, persone e margine, non tool.",
    hero: {
      eye: "Insights",
      h1a: "L'AI in azienda non è una questione di tool. È una questione di processi, persone e ",
      h1emph: "margine",
      h1b: ".",
      copy: "Guide operative per capire dove intervenire, come costruire sistemi AI utili e come verificarne il valore nel tempo.",
      cerca: "Cerca fra le guide…",
    },
    domande: {
      titolo: "Parti dalla domanda giusta",
      conta: { uno: "guida", molti: "guide" },
    },
    evidenza: {
      eye: "Il concetto da cui partiamo",
      h2a: "In ",
      h2emph: "evidenza",
      leggi: "Leggi l'articolo",
    },
    articoli: {
      h2a: "Tutte le ",
      h2emph: "guide",
      h2b: ", per pilastro",
      readMore: "Leggi",
      tutti: "Tutti",
      vuoto: "Nessuna guida per questi filtri.",
    },
    termini: {
      eye: "Termini da conoscere",
      h2a: "Prima di scegliere l'AI, ",
      h2emph: "chiariamo le parole",
      h2b: ".",
      lead: "Cinque termini che tornano in ogni pagina. Se non sono chiari, ogni discussione sull'AI diventa una discussione su cosa intendiamo.",
      lista: [
        { t: "Value Leak", d: "Il punto in cui il margine esce dal processo." },
        { t: "Context Hub", d: "Dove il sapere aziendale diventa utilizzabile." },
        { t: "AI Champion", d: "La persona che rende l'AI concreta nel suo reparto." },
        { t: "Agenti AI", d: "Sistemi con un compito, regole e un ruolo nel processo." },
        { t: "Value Report", d: "La verifica di cosa ha davvero recuperato un sistema." },
      ],
      cta: "Vai al glossario",
    },
    cta: {
      eye: "La lettura non risolve il problema",
      h2a: "Sai dove iniziare. Ora capiamo ",
      h2emph: "dove intervenire",
      h2b: ".",
      p: "Se hai riconosciuto un problema nei tuoi processi, il passo successivo non è leggere un altro articolo. È capire se quel problema sta già lasciando margine sul tavolo.",
      btn: "Prenota una call di diagnosi",
    },
  },
  en: {
    metaTitle: "Insights · Practical guides on AI in business | Morfeus",
    metaDesc:
      "Practical guides to understand where to intervene with AI, how to build useful systems and how to verify their value over time. Workflows, people and margin, not tools.",
    hero: {
      eye: "Insights",
      h1a: "AI in business is not a tool question. It is a question of workflows, people and ",
      h1emph: "margin",
      h1b: ".",
      copy: "Practical guides to understand where to intervene, how to build useful AI systems and how to verify their value over time.",
      cerca: "Search the guides…",
    },
    domande: {
      titolo: "Start with the right question",
      conta: { uno: "guide", molti: "guides" },
    },
    evidenza: {
      eye: "The concept we start with",
      h2a: "",
      h2emph: "Featured",
      leggi: "Read the article",
    },
    articoli: {
      h2a: "All the ",
      h2emph: "guides",
      h2b: ", by pillar",
      readMore: "Read",
      tutti: "All",
      vuoto: "No guides match these filters.",
    },
    termini: {
      eye: "Terms worth knowing",
      h2a: "Before you choose AI, ",
      h2emph: "let's get the words right",
      h2b: ".",
      lead: "Five terms that come back on every page. If they are not clear, every discussion about AI becomes a discussion about what we mean.",
      lista: [
        { t: "Value Leak", d: "The point where margin leaks out of a workflow." },
        { t: "Context Hub", d: "Where company know-how becomes usable." },
        { t: "AI Champion", d: "The person who makes AI concrete in their department." },
        { t: "AI agents", d: "Systems with a job, rules and a role in the workflow." },
        { t: "Value Report", d: "The check on what a system actually recovered." },
      ],
      cta: "Go to the glossary",
    },
    cta: {
      eye: "Reading does not solve the problem",
      h2a: "You know where to start. Now let's find ",
      h2emph: "where to intervene",
      h2b: ".",
      p: "If you have recognised a problem in your workflows, the next step is not another article. It is finding out whether that problem is already leaving margin on the table.",
      btn: "Book a diagnostic call",
    },
  },
} as const;

/* Le tre domande d'ingresso del brief. Il quarto pilastro non ha una
   domanda propria nel copy e resta raggiungibile dai filtri. */
const DOMANDE: { chiave: ChiavePilastro; glifo: string }[] = [
  { chiave: "margine", glifo: "curvaGiu" },
  { chiave: "processi", glifo: "ingranaggio" },
  { chiave: "persone", glifo: "stella" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: buildLocaleAlternates("insights", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/insights`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const articoli = getAllArticles();
  const evidenza =
    articoli.find((a) => a.slug === ARTICOLO_IN_EVIDENZA) ?? articoli[0] ?? null;
  const resto = articoli.filter((a) => a.slug !== evidenza?.slug);

  /* Al browser il pilastro arriva come `category`: il componente non
     cambia di una riga e i filtri diventano quelli approvati. */
  const browserArticles: BrowserArticle[] = resto.map((a) => ({
    slug: a.slug,
    title: a.title,
    tldr: a.tldr,
    metaDescription: a.metaDescription,
    category: PILASTRI[pilastroDi(a.slug)].nome[safeLocale],
    tags: a.tags,
    datePublished: a.datePublished,
    readingTime: a.readingTime,
    coverKind: a.coverKind,
  }));

  const pilastriUsati = (Object.keys(PILASTRI) as ChiavePilastro[])
    .map((k) => PILASTRI[k].nome[safeLocale])
    .filter((nome) => browserArticles.some((a) => a.category === nome));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${safeLocale}/insights#collectionpage`,
        url: `${SITE_URL}/${safeLocale}/insights`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articoli.length,
          itemListElement: articoli.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.title,
            url: `${SITE_URL}/${safeLocale}/insights/${a.slug}`,
          })),
        },
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

      {/* 01 · TESTATA + LE TRE DOMANDE · CARTA */}
      <section className="band carta hero pg" id="testata">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>

          <div className="quota" style={{ marginTop: 44 }}>
            {t.domande.titolo}
          </div>
          <div className="diagnosi" style={{ marginTop: 8 }}>
            {DOMANDE.map((d) => {
              const quanti = articoli.filter((a) => pilastroDi(a.slug) === d.chiave).length;
              return (
                <Link key={d.chiave} href={`${base}/insights#articoli`} className="sintomo">
                  <Glifo nome={d.glifo} />
                  <span className="testo">{PILASTRI[d.chiave].domanda[safeLocale]}</span>
                  <span className="conta">
                    {`${quanti} ${quanti === 1 ? t.domande.conta.uno : t.domande.conta.molti}`}
                  </span>
                  <span className="freccia" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 · IN EVIDENZA · ink, con la copertina grande */}
      {evidenza ? (
        <section className="band ink pg" id="in-evidenza">
          <div className="wrap">
            <div className="eye">{t.evidenza.eye}</div>
            <h2 className="h-sect">
              {t.evidenza.h2a}
              <span className="emph">{t.evidenza.h2emph}</span>
            </h2>
            <Link
              href={`${base}/insights/${evidenza.slug}`}
              className="mt-[30px] grid grid-cols-1 items-center gap-11 md:grid-cols-[1.05fr_.95fr]"
            >
              <div
                className="relative w-full overflow-hidden rounded-[12px] border"
                style={{ aspectRatio: "16 / 9", borderColor: "#26262B" }}
              >
                <InsightCover
                  kind={
                    (evidenza.coverKind as CoverKind) ||
                    coverKindFromCategory(evidenza.category)
                  }
                  variant="ink"
                  category={PILASTRI[pilastroDi(evidenza.slug)].nome[safeLocale]}
                />
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {evidenza.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2.5 py-[5px] font-plex text-[11px] font-semibold uppercase tracking-[.04em] text-lilla"
                      style={{
                        background: "rgba(140,165,247,.1)",
                        borderColor: "rgba(140,165,247,.28)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="my-3 text-[clamp(24px,3.4vw,36px)] font-semibold">
                  {evidenza.title}
                </h3>
                <p
                  className="mb-[18px] max-w-[48ch] text-[17.5px] leading-[1.6]"
                  style={{ color: "var(--testo-ink-2)" }}
                >
                  {evidenza.tldr || evidenza.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 font-plex text-[13px] font-semibold tracking-[.04em] text-lilla">
                  {t.evidenza.leggi}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* 03 · GRIGLIA · CARTA, copertina per articolo */}
      <section className="band carta pg" id="articoli">
        <div className="wrap">
          <InsightsBrowser
            articles={browserArticles}
            categories={pilastriUsati}
            locale={safeLocale}
            ui={{
              h2a: t.articoli.h2a,
              h2emph: t.articoli.h2emph,
              h2b: t.articoli.h2b,
              readMore: t.articoli.readMore,
              searchPlaceholder: t.hero.cerca,
              allLabel: t.articoli.tutti,
              emptyState: t.articoli.vuoto,
            }}
          />
        </div>
      </section>

      {/* 04 · I TERMINI · ink, il ponte verso il Glossario */}
      <section className="band ink pg" id="termini">
        <div className="wrap">
          <div className="eye">{t.termini.eye}</div>
          <h2 className="h-sect">
            {t.termini.h2a}
            <span className="emph">{t.termini.h2emph}</span>
            {t.termini.h2b}
          </h2>
          <p className="lead">{t.termini.lead}</p>

          <div className="patto">
            {t.termini.lista.map((v) => (
              <div className="clausola" key={v.t}>
                <span className="sigla">{v.t}</span>
                <span className="testo-clausola">{v.d}</span>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <Link className="btn btn-2-carta" href={`${base}/glossario`}>
              {t.termini.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 05 · CTA · ink */}
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
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
