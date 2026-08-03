import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { GlossarioFiltri } from "@/components/site/GlossarioFiltri";
import { localePrefix, buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getGlossario, lettereDi, tutteLeVociDi } from "@/lib/glossario-voci";

/* ============================================================
   GLOSSARIO. Pagina unica, tutti i termini dentro.
   ------------------------------------------------------------
   Prima i termini erano 35 spezzati in gruppi tematici, ognuno
   con la sua fascia e il suo fondo alternato. Sembravano cinque
   cose diverse invece di un lessico solo, e per trovare una
   parola bisognava sapere in quale gruppo l'avevamo messa.

   Ora e' come il prototipo: una sola fascia chiara con gli 85
   termini in ordine alfabetico, la lettera agganciata a lato
   mentre scorri il suo gruppo, ricerca e filtri in cima, barra
   A-Z appiccicata sotto l'header.

   I termini stanno in `src/lib/glossario-voci.ts`: la stessa
   lista serve al JSON-LD, e dentro la pagina sarebbero 85 voci
   che rendono illeggibile tutto il resto.

   Ogni termine ha il suo id: le altre pagine possono linkare la
   singola definizione (`/glossario#value-leak`). Su un sito che
   punta anche alla visibilita' negli LLM, un glossario
   indirizzabile voce per voce vale piu' di uno leggibile solo
   dall'inizio.
   ============================================================ */

type Props = { params: Promise<{ locale: string }> };

/* Le pagine di approfondimento che ESISTONO davvero. Nel prototipo gli
   "Approfondisci" erano 11, ma 9 puntano a pagine mai create: renderli
   tutti significherebbe piazzare 9 link rotti dentro la pagina che
   dovrebbe spiegare il vocabolario. Quando una di quelle pagine nasce,
   si aggiunge il suo slug qui e il link compare da solo. */
const APPROFONDIMENTI_VIVI = new Set(["/marf", "/roiometro"]);

const COPY = {
  it: {
    metaTitle: "Glossario · Le parole con cui lavoriamo | Morfeus",
    metaDesc:
      "Value Leak, Context Hub, AI Champion, agenti AI, Value Report: le definizioni con cui Morfeus lavora, senza gergo e senza promesse vaghe.",
    hero: {
      eye: "Glossario",
      h1a: "Le parole sbagliate creano ",
      h1emph: "progetti sbagliati",
      h1b: ".",
      copy: "Quando si parla di AI in azienda, termini come agenti, automazione, piattaforme e formazione vengono usati per dire tutto e il contrario di tutto. Qui trovi i termini dell'intelligenza artificiale e dell'ecosistema Claude spiegati in modo semplice, piu' i concetti con cui lavora Morfeus.",
    },
    az: "Indice alfabetico",
    elenco: "Tutti i termini",
    cta: {
      eye: "Le parole servono a decidere",
      h2a: "Ora che le parole sono chiare, ",
      h2emph: "vediamo i numeri",
      h2b: ".",
      p: "Se riconosci un Value Leak nei tuoi processi, il passo successivo è capire quanto sta costando davvero.",
      btn: "Prenota una call di diagnosi",
      btn2: "Vedi il Metodo",
    },
    approfondisci: "Approfondisci",
  },
  en: {
    metaTitle: "Glossary · The words we work with | Morfeus",
    metaDesc:
      "Value Leak, Context Hub, AI Champion, AI agents, Value Report: the definitions Morfeus works with, without jargon and without vague promises.",
    hero: {
      eye: "Glossary",
      h1a: "The wrong words create ",
      h1emph: "the wrong projects",
      h1b: ".",
      copy: "When people talk about AI in business, words like agents, automation, platforms and training are used to mean everything and its opposite. Here you will find the terms of artificial intelligence and of the Claude ecosystem explained simply, plus the concepts Morfeus works with.",
    },
    az: "Alphabetical index",
    elenco: "All terms",
    cta: {
      eye: "Words are for deciding",
      h2a: "Now that the words are clear, ",
      h2emph: "let's look at the numbers",
      h2b: ".",
      p: "If you recognise a Value Leak in your workflows, the next step is understanding what it is actually costing.",
      btn: "Book a diagnostic call",
      btn2: "See the Method",
    },
    approfondisci: "Read more",
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
    alternates: buildLocaleAlternates("glossario", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}${localePrefix(safeLocale)}/glossario`,
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

export default async function GlossarioPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = localePrefix(safeLocale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${SITE_URL}${localePrefix(safeLocale)}/glossario#glossario`,
        url: `${SITE_URL}${localePrefix(safeLocale)}/glossario`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        hasDefinedTerm: tutteLeVociDi(safeLocale).map((v) => ({
          "@type": "DefinedTerm",
          name: v.n,
          description: v.d,
          url: `${SITE_URL}${localePrefix(safeLocale)}/glossario#${v.id}`,
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
          <GlossarioFiltri locale={safeLocale} />
        </div>
      </section>

      {/* 02 · BARRA A-Z · sta fuori dalle fasce, si aggancia sotto l'header */}
      <nav className="gl-az" aria-label={t.az}>
        <div className="row">
          {lettereDi(safeLocale).map((l) => (
            <a key={l} href={`#gl-${l}`}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* 03 · TUTTI I TERMINI · carta, una fascia sola */}
      <section className="band carta" aria-label={t.elenco}>
        <div className="wrap gl-list">
          {getGlossario(safeLocale).map((g) => (
            <div className="gl-grp" id={`gl-${g.l}`} key={g.l} data-gl-grp="">
              <h2 className="gl-letter">{g.l}</h2>
              <div className="gl-terms">
                {g.voci.map((v) => (
                  <div
                    className="gl-term"
                    id={v.id}
                    key={v.id}
                    data-gl-term=""
                    data-gl-tag={v.tag}
                    /* minuscolo gia' qui: il filtro confronta senza dover
                       normalizzare a ogni battuta */
                    data-gl-name={v.n.toLowerCase()}
                    data-gl-testo={v.d.toLowerCase()}
                  >
                    <div className="gl-th">
                      <h3>{v.n}</h3>
                      <span className={`gl-bd ${v.tag}`}>
                        {v.tag === "morfeus" ? "Morfeus" : v.tag === "claude" ? "Claude" : "AI"}
                      </span>
                    </div>
                    <p>{v.d}</p>
                    {v.href && APPROFONDIMENTI_VIVI.has(v.href) ? (
                      <Link className="gl-link" href={`${base}${v.href}`}>
                        {t.approfondisci} &#9656;
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Compare solo quando ricerca e filtri non lasciano niente. */}
          <p className="gl-nomatch" id="gl-nomatch" hidden aria-live="polite">
            {isIt
              ? "Nessun termine corrisponde alla ricerca."
              : "No term matches your search."}
          </p>
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
