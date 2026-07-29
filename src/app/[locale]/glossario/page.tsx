import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { Glifo } from "@/components/pagine/Glifo";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

/* ============================================================
   GLOSSARIO. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   Le fasce qui fanno un lavoro diverso dalle altre pagine: i
   quattro gruppi di termini restano TUTTI su inchiostro, perche'
   sono una sola superficie di consultazione. Spezzarli con fondi
   alternati farebbe sembrare quattro cose diverse quello che e'
   un lessico unico.
   La carta resta sui due punti che sono indici: la mappa in cima
   e la tabella dei termini operativi in fondo.

   Ogni termine ha un id: le altre pagine possono linkare la
   singola definizione. Su un sito che punta anche alla
   visibilita' negli LLM, un glossario indirizzabile termine per
   termine vale piu' di uno leggibile solo dall'inizio.
   ============================================================ */

type Props = { params: { locale: string } };

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
      copy: "Quando si parla di AI in azienda, termini come agenti, automazione, piattaforme e formazione vengono usati per dire tutto e il contrario di tutto. Qui definiamo le parole con cui Morfeus lavora, senza gergo e senza promesse vaghe.",
    },
    mappa: {
      eye: "Prima il significato. Poi la tecnologia.",
      h2a: "Quattro domande. ",
      h2emph: "Un linguaggio comune",
      h2b: ".",
      voci: [
        { id: "problema", glifo: "curvaGiu", d: "Dove si perde valore?", t: "Value Leak · Coordination Tax" },
        { id: "metodo", glifo: "bersaglio", d: "Come si decide dove intervenire?", t: "ROIometro · Pilot · Value Report" },
        { id: "sistema", glifo: "cpu", d: "Con che cosa si costruisce?", t: "Context Hub · MARF · Agenti · Guardrail" },
        { id: "persone", glifo: "stella", d: "Chi lo rende parte dell'azienda?", t: "AI Champion · Adoption · Literacy" },
      ],
    },
    gruppi: [
      {
        id: "problema",
        eye: "Il problema",
        titolo: "Dove si perde valore",
        termini: [
          { t: "Value Leak", d: "Un Value Leak è un punto in cui tempo, informazioni, decisioni o lavoro manuale fanno perdere margine dentro un processo aziendale. Non è sempre un costo visibile in bilancio: può essere un passaggio rifatto, una risposta che arriva tardi o un'informazione ferma nella testa di una persona." },
          { t: "Coordination Tax", d: "La Coordination Tax è il costo nascosto dei passaggi di contesto tra persone, reparti e strumenti. Ogni passaggio sembra piccolo; sommati, rallentano le decisioni e comprimono il margine." },
        ],
      },
      {
        id: "metodo",
        eye: "Il metodo",
        titolo: "Come si decide dove intervenire",
        termini: [
          { t: "ROIometro", d: "Il ROIometro è lo strumento Morfeus che aiuta a stimare quanto valore si sta perdendo in un processo e dove ha senso intervenire per primo." },
          { t: "Pilot", d: "Un Pilot è un intervento delimitato su un problema operativo concreto, con criteri chiari per capire se il sistema sta funzionando. Delimitato non vuol dire piccolo: vuol dire verificabile." },
          { t: "Value Report", d: "Il Value Report è il momento in cui Morfeus verifica il valore prodotto da un sistema in produzione. Se il valore non è verificabile, il sistema va migliorato prima di essere esteso." },
          { t: "AI Operating Partner", d: "Un AI Operating Partner è un partner che lavora dentro i processi aziendali per rendere l'AI utile, adottata e verificabile nel tempo. Non si limita a consigliare una tecnologia." },
        ],
      },
      {
        id: "sistema",
        eye: "Il sistema",
        titolo: "Con che cosa si costruisce",
        termini: [
          { t: "Context Hub", d: "Il Context Hub è il livello in cui conoscenza, regole, procedure e informazioni operative diventano utilizzabili dalle persone e dai sistemi AI. È il posto in cui il sapere smette di stare nella testa di pochi." },
          { t: "MARF", d: "MARF è il cruscotto operativo aziendale proprietario di Morfeus: collega dati e processi di marketing, vendite, amministrazione, delivery e customer care." },
          { t: "Agente AI", d: "Un agente AI è un sistema che svolge un compito definito dentro un processo, usando contesto, regole e strumenti specifici. Non è un chatbot da mostrare in una demo." },
          { t: "Guardrail", d: "Un Guardrail è una regola che impedisce a un sistema AI di agire o rispondere oltre ciò che può fare in modo affidabile. È il modo in cui un sistema dice «non ho abbastanza dati»." },
        ],
      },
      {
        id: "persone",
        eye: "Le persone",
        titolo: "Chi lo rende parte dell'azienda",
        termini: [
          { t: "AI Champion", d: "Un AI Champion è una persona interna che rende l'AI concreta nel proprio reparto. Conosce il processo da vicino, sperimenta sul lavoro reale e aiuta i colleghi a usarla in modo continuativo." },
        ],
      },
    ],
    operativi: {
      eye: "Termini operativi",
      h2a: "Il resto del lessico, ",
      h2emph: "senza slogan",
      h2b: ".",
      lead: "Questi termini completano il vocabolario Morfeus e rendono il glossario una risorsa consultabile.",
      voci: [
        { t: "AI Adoption", d: "Il processo con cui l'AI entra davvero nelle abitudini, nei ruoli e nelle procedure di un'azienda. Non coincide con l'acquisto o l'attivazione di un tool." },
        { t: "AI Governance", d: "Regole, responsabilità e controlli che definiscono come l'AI può essere usata dentro l'azienda." },
        { t: "AI Literacy", d: "La capacità pratica di usare, verificare e contestualizzare l'AI nel proprio lavoro." },
        { t: "Automazione AI", d: "L'uso dell'AI per eseguire o supportare attività ripetitive dentro un processo, con un obiettivo e limiti definiti." },
        { t: "Human in the Loop", d: "Il punto in cui una persona mantiene il controllo, verifica un output o prende una decisione che il sistema non deve prendere da solo." },
      ],
    },
    cta: {
      eye: "Le parole servono a decidere",
      h2a: "Ora che le parole sono chiare, ",
      h2emph: "vediamo i numeri",
      h2b: ".",
      p: "Se riconosci un Value Leak nei tuoi processi, il passo successivo è capire quanto sta costando davvero.",
      btn: "Prenota una call di diagnosi",
      btn2: "Vedi il Metodo",
    },
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
      copy: "When people talk about AI in business, words like agents, automation, platforms and training are used to mean everything and its opposite. Here we define the words Morfeus works with, without jargon and without vague promises.",
    },
    mappa: {
      eye: "Meaning first. Technology second.",
      h2a: "Four questions. ",
      h2emph: "One shared language",
      h2b: ".",
      voci: [
        { id: "problema", glifo: "curvaGiu", d: "Where is value lost?", t: "Value Leak · Coordination Tax" },
        { id: "metodo", glifo: "bersaglio", d: "How do you decide where to intervene?", t: "ROIometro · Pilot · Value Report" },
        { id: "sistema", glifo: "cpu", d: "What do you build it with?", t: "Context Hub · MARF · Agents · Guardrail" },
        { id: "persone", glifo: "stella", d: "Who makes it part of the company?", t: "AI Champion · Adoption · Literacy" },
      ],
    },
    gruppi: [
      {
        id: "problema",
        eye: "The problem",
        titolo: "Where value is lost",
        termini: [
          { t: "Value Leak", d: "A Value Leak is a point in a business workflow where time, information, decisions or manual work erode margin. It is not always a visible cost: it can be repeated work, an answer that arrives late or information stuck in one person's head." },
          { t: "Coordination Tax", d: "The Coordination Tax is the hidden cost of context switching and handoffs between people, departments and tools. Each handoff looks small; together they slow decisions and compress margin." },
        ],
      },
      {
        id: "metodo",
        eye: "The method",
        titolo: "How you decide where to intervene",
        termini: [
          { t: "ROIometro", d: "ROIometro is the Morfeus diagnostic tool for estimating how much value a workflow is losing and where it makes sense to intervene first." },
          { t: "Pilot", d: "A Pilot is a focused intervention on a concrete operating problem, with clear criteria for deciding whether the system works. Focused does not mean small: it means verifiable." },
          { t: "Value Report", d: "The Value Report is how Morfeus verifies the value produced by a system in production. If the value cannot be verified, the system is improved before it is extended." },
          { t: "AI Operating Partner", d: "An AI Operating Partner works inside company workflows to make AI useful, adopted and verifiable over time. It does more than advise on technology." },
        ],
      },
      {
        id: "sistema",
        eye: "The system",
        titolo: "What you build it with",
        termini: [
          { t: "Context Hub", d: "A Context Hub is the layer where knowledge, rules, procedures and operating information become usable by people and AI systems. It is where know-how stops living in a few heads." },
          { t: "MARF", d: "MARF is Morfeus' proprietary company operating cockpit: it connects data and workflows across marketing, sales, administration, delivery and customer care." },
          { t: "AI agent", d: "An AI agent is a system that performs a defined job inside a workflow, using specific context, rules and tools. Not a chatbot built for a demo." },
          { t: "Guardrail", d: "A Guardrail is a rule that stops an AI system from acting or answering beyond what it can do reliably. It is how a system says “I do not have enough data”." },
        ],
      },
      {
        id: "persone",
        eye: "The people",
        titolo: "Who makes it part of the company",
        termini: [
          { t: "AI Champion", d: "An AI Champion is the person inside a company who makes AI practical for their department. They know the workflow first-hand, experiment on real work and help colleagues use it continuously." },
        ],
      },
    ],
    operativi: {
      eye: "Operating terms",
      h2a: "The rest of the vocabulary, ",
      h2emph: "without slogans",
      h2b: ".",
      lead: "These terms complete the Morfeus vocabulary and make the glossary a resource you can actually consult.",
      voci: [
        { t: "AI Adoption", d: "The process by which AI genuinely enters the habits, roles and procedures of a company. It is not the same as buying or switching on a tool." },
        { t: "AI Governance", d: "The rules, responsibilities and controls that define how AI can be used inside a company." },
        { t: "AI Literacy", d: "The practical ability to use, check and contextualise AI in your own work." },
        { t: "AI Automation", d: "Using AI to perform or support repetitive activities inside a workflow, with a defined goal and defined limits." },
        { t: "Human in the Loop", d: "The point where a person keeps control, checks an output or makes a decision the system should not make alone." },
      ],
    },
    cta: {
      eye: "Words are for deciding",
      h2a: "Now that the words are clear, ",
      h2emph: "let's look at the numbers",
      h2b: ".",
      p: "If you recognise a Value Leak in your workflows, the next step is understanding what it is actually costing.",
      btn: "Book a diagnostic call",
      btn2: "See the Method",
    },
  },
} as const;

const idTermine = (t: string) => `t-${t.toLowerCase().replace(/\s+/g, "-")}`;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("glossario", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/glossario`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default function GlossarioPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  /* Il tipo va dichiarato: con `as const` ogni gruppo ha una tupla di
     termini con tipi LETTERALI diversi, e il flatMap non riesce a
     unificarli ("Value Leak" non e' assegnabile a "Coordination Tax").
     Qui i termini servono solo come coppie nome/descrizione per i dati
     strutturati, quindi li riporto a quel tipo e il problema sparisce. */
  type Termine = { t: string; d: string };
  const tuttiTermini: Termine[] = [
    ...t.gruppi.flatMap((g) => g.termini.map((v): Termine => ({ t: v.t, d: v.d }))),
    ...t.operativi.voci.map((v): Termine => ({ t: v.t, d: v.d })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${SITE_URL}/${safeLocale}/glossario#glossario`,
        url: `${SITE_URL}/${safeLocale}/glossario`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        hasDefinedTerm: tuttiTermini.map((v) => ({
          "@type": "DefinedTerm",
          name: v.t,
          description: v.d,
          url: `${SITE_URL}/${safeLocale}/glossario#${idTermine(v.t)}`,
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

      {/* 02 · LA MAPPA · CARTA, e' un indice */}
      <section className="band carta pg" id="mappa">
        <div className="wrap">
          <div className="eye">{t.mappa.eye}</div>
          <h2 className="h-sect">
            {t.mappa.h2a}
            <span className="emph">{t.mappa.h2emph}</span>
            {t.mappa.h2b}
          </h2>

          <div className="diagnosi">
            {t.mappa.voci.map((v) => (
              <a key={v.id} href={`#${v.id}`} className="sintomo">
                <Glifo nome={v.glifo} />
                <span className="testo">{v.d}</span>
                <span className="conta">{v.t}</span>
                <span className="freccia" aria-hidden="true">
                  &darr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 03-06 · I QUATTRO GRUPPI · tutti ink: sono un lessico solo */}
      {t.gruppi.map((g) => (
        <section className="band ink pg" id={g.id} key={g.id}>
          <div className="wrap">
            <div className="eye">{g.eye}</div>
            <h2 className="h-sect">{g.titolo}</h2>

            <div className="two" style={{ marginTop: 34 }}>
              {g.termini.map((v) => (
                <article className="scheda" id={idTermine(v.t)} key={v.t}>
                  <span className="filo" />
                  <div className="sopra">
                    <span className="cod">{v.t}</span>
                    <p>{v.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 07 · TERMINI OPERATIVI · CARTA, e' una tabella */}
      <section className="band carta pg" id="operativi">
        <div className="wrap">
          <div className="eye">{t.operativi.eye}</div>
          <h2 className="h-sect">
            {t.operativi.h2a}
            <span className="emph">{t.operativi.h2emph}</span>
            {t.operativi.h2b}
          </h2>
          <p className="lead">{t.operativi.lead}</p>

          <div className="patto">
            {t.operativi.voci.map((v) => (
              <div className="clausola" id={idTermine(v.t)} key={v.t}>
                <span className="sigla">{v.t}</span>
                <span className="testo-clausola">{v.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · CTA · ink */}
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
