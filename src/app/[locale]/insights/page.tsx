import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { Glifo } from "@/components/pagine/Glifo";
import {
  ArchivioArticoli,
  type VoceArticolo,
} from "@/components/pagine/insights/ArchivioArticoli";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";
import { getAllArticles } from "@/lib/insights";
import { PILASTRI, pilastroDi, ARTICOLO_IN_EVIDENZA, type ChiavePilastro } from "@/lib/pilastri";

/* ============================================================
   INSIGHTS, pagina hub. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   RITMO del brief: tesi, riconoscimento, approfondimento,
   esplorazione, definizioni, azione.
     01 hero        ink     editoriale, e NIENTE contatore di
                            articoli: il brief lo vieta esplicitamente
     02 domande     CARTA   tre accessi grandi e diagnostici
     03 in evidenza ink     l'articolo da cui parte tutto
     04 archivio    CARTA   ricerca leggibile
     05 termini     ink     fascia quasi enciclopedica
     06 CTA         ink

   Le tre domande riusano .diagnosi dei Casi: e' lo stesso gesto,
   riconoscere il proprio punto di partenza, e va fatto con la stessa
   forma. L'archivio riusa le schede dei Casi per la stessa ragione.
   ============================================================ */

type Props = { params: { locale: string } };

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
    },
    domande: {
      eye: "Parti dalla domanda giusta",
      h2a: "Prima di leggere, ",
      h2emph: "riconosci dove sei",
      h2b: ".",
      lead: "Tre punti di partenza. Non sono categorie di un blog: sono le domande da cui parte davvero chi ha un problema operativo.",
      conta: { uno: "guida", molti: "guide" },
    },
    evidenza: {
      eye: "Il concetto da cui partiamo",
      h2a: "Cos'è un Value Leak, e perché ",
      h2emph: "ti sta già costando",
      h2b: ".",
      lead: "Il punto in cui tempo, informazioni, decisioni o lavoro manuale fanno perdere margine senza comparire in nessun bilancio. È la parola con cui inizia ogni conversazione seria sull'AI in azienda.",
      readout: "Articolo · il primo da leggere",
      stato: "Pilastro",
      cta: "Leggi l'articolo",
    },
    archivio: {
      eye: "L'archivio",
      h2a: "Tutto quello che abbiamo scritto, ",
      h2emph: "per pilastro",
      h2b: ".",
      lead: "I filtri sono per pilastro editoriale. Le PMI non sono una categoria: sono il destinatario, e gli articoli che le riguardano vivono dentro i temi.",
      tutti: "Tutti",
      uno: "guida",
      molti: "guide",
      suffisso: "in archivio",
      leggi: "Leggi",
    },
    termini: {
      eye: "Termini da conoscere",
      h2a: "Prima di scegliere l'AI, ",
      h2emph: "chiariamo le parole",
      h2b: ".",
      lead: "Cinque termini che useremo in ogni pagina. Se non sono chiari, ogni discussione sull'AI diventa una discussione su cosa intendiamo.",
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
    },
    domande: {
      eye: "Start with the right question",
      h2a: "Before reading, ",
      h2emph: "recognise where you are",
      h2b: ".",
      lead: "Three starting points. Not blog categories: the questions people with a real operating problem actually start from.",
      conta: { uno: "guide", molti: "guides" },
    },
    evidenza: {
      eye: "The concept we start with",
      h2a: "What is a Value Leak, and why is it ",
      h2emph: "already costing you",
      h2b: "?",
      lead: "The point where time, information, decisions or manual work erode margin without appearing on any balance sheet. It is the word every serious conversation about AI in business starts from.",
      readout: "Article · read this first",
      stato: "Pillar",
      cta: "Read the article",
    },
    archivio: {
      eye: "The archive",
      h2a: "Everything we have written, ",
      h2emph: "by pillar",
      h2b: ".",
      lead: "Filters are by editorial pillar. SMEs are not a category: they are the audience, and the articles that concern them live inside the themes.",
      tutti: "All",
      uno: "guide",
      molti: "guides",
      suffisso: "in the archive",
      leggi: "Read",
    },
    termini: {
      eye: "Terms worth knowing",
      h2a: "Before you choose AI, ",
      h2emph: "let's get the words right",
      h2b: ".",
      lead: "Five terms we use on every page. If they are not clear, every discussion about AI becomes a discussion about what we mean.",
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

/* Le tre domande d'ingresso del brief mappano su tre pilastri. Il
   quarto, "scelte e governance", non ha una domanda propria nel copy
   e resta accessibile dai filtri dell'archivio. */
const DOMANDE: { chiave: ChiavePilastro; glifo: string }[] = [
  { chiave: "margine", glifo: "curvaGiu" },
  { chiave: "processi", glifo: "ingranaggio" },
  { chiave: "persone", glifo: "stella" },
];

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

  const articoli = getAllArticles();
  const voci: VoceArticolo[] = articoli.map((a) => ({
    slug: a.slug,
    titolo: a.title,
    descrizione: a.metaDescription,
    pilastro: pilastroDi(a.slug),
    lettura: a.readingTime,
    data: a.dateModified || a.datePublished,
  }));
  const evidenza = voci.find((v) => v.slug === ARTICOLO_IN_EVIDENZA);

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
          numberOfItems: voci.length,
          itemListElement: voci.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: v.titolo,
            url: `${SITE_URL}/${safeLocale}/insights/${v.slug}`,
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

      {/* 01 · HERO · ink. Niente contatore di articoli: lo vieta il brief */}
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

      {/* 02 · LE DOMANDE · CARTA */}
      <section className="band carta pg" id="domande">
        <div className="wrap">
          <div className="eye">{t.domande.eye}</div>
          <h2 className="h-sect">
            {t.domande.h2a}
            <span className="emph">{t.domande.h2emph}</span>
            {t.domande.h2b}
          </h2>
          <p className="lead">{t.domande.lead}</p>

          <div className="diagnosi">
            {DOMANDE.map((d) => {
              const quanti = voci.filter((v) => v.pilastro === d.chiave).length;
              return (
                <Link key={d.chiave} href={`${base}/insights#archivio`} className="sintomo">
                  <Glifo nome={d.glifo} />
                  <span className="testo">{PILASTRI[d.chiave].domanda[safeLocale]}</span>
                  <span className="conta">
                    {`${quanti} ${
                      quanti === 1 ? t.domande.conta.uno : t.domande.conta.molti
                    }`}
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

      {/* 03 · ARTICOLO IN EVIDENZA · ink */}
      {evidenza && (
        <section className="band ink pg" id="in-evidenza">
          <div className="wrap">
            <div className="eye">{t.evidenza.eye}</div>
            <h2 className="h-sect">
              {t.evidenza.h2a}
              <span className="emph">{t.evidenza.h2emph}</span>
              {t.evidenza.h2b}
            </h2>
            <p className="lead">{t.evidenza.lead}</p>

            <div className="quadro" style={{ marginTop: 36 }}>
              <div className="readout">
                <span>{t.evidenza.readout}</span>
                <span className="on">
                  <i />
                  {t.evidenza.stato}
                </span>
              </div>
              <div className="corpo-modulo">
                <div className="cod">{PILASTRI[evidenza.pilastro].nome[safeLocale]}</div>
                <h3 style={{ marginTop: 14, fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.02em" }}>
                  {evidenza.titolo}
                </h3>
                <p className="testo-quadrante" style={{ maxWidth: "68ch" }}>
                  {evidenza.descrizione}
                </p>
                <div className="cta-row">
                  <Link className="btn btn-1" href={`${base}/insights/${evidenza.slug}`}>
                    {t.evidenza.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 04 · ARCHIVIO · CARTA */}
      <section className="band carta pg" id="archivio">
        <div className="wrap">
          <div className="eye">{t.archivio.eye}</div>
          <h2 className="h-sect">
            {t.archivio.h2a}
            <span className="emph">{t.archivio.h2emph}</span>
            {t.archivio.h2b}
          </h2>
          <p className="lead">{t.archivio.lead}</p>

          <ArchivioArticoli
            locale={safeLocale}
            voci={voci}
            etichette={{
              tutti: t.archivio.tutti,
              uno: t.archivio.uno,
              molti: t.archivio.molti,
              suffisso: t.archivio.suffisso,
              leggi: t.archivio.leggi,
            }}
          />
        </div>
      </section>

      {/* 05 · I TERMINI · ink, fascia enciclopedica */}
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

      {/* 06 · CTA · ink */}
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
