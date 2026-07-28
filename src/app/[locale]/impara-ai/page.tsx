import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

/** Un item della lezione. `glo` = ancora glossario (navigabile). `dis` = approfondimento
 *  verso risorsa non ancora pubblicata come route: reso non navigabile. */
type Lesson = {
  n: string;
  q: string;
  a: string;
  glo?: string;
  dis?: string;
  href?: string;
};

type Path = {
  id: string;
  eye: string;
  title: string;
  intro: string;
  tag: string;
  meta: string;
  lessons: Lesson[];
};

const COPY = {
  it: {
    metaTitle: "Impara l'AI · Morfeus",
    metaDesc:
      "Impara l'AI applicata al business, dalle basi. Le risposte alle domande più cercate, ordinate in percorsi di studio semplici: basi dell'AI, AI nel lavoro, costi e ROI, AI per le PMI.",
    hero: {
      eye: "Impara l'AI",
      h1a: "Impara l'AI applicata al business, ",
      h1emph: "dalle basi",
      h1b: ".",
      copy: "Le risposte alle domande che fai a Google, ordinate in percorsi semplici che ti portano da zero a operativo. Niente gergo, niente livello avanzato.",
    },
    pathnav: "Percorsi",
    glossaryLabel: "Vedi nel glossario →",
    paths: [
      {
        id: "basi",
        eye: "Percorso 01",
        title: "Le basi dell'AI",
        intro:
          "Cosa c'è davvero dietro le parole che senti ogni giorno. Per chi parte da zero e vuole capire prima di usare.",
        tag: "Livello base",
        meta: "5 lezioni · ~8 min",
        lessons: [
          {
            n: "01",
            q: "Cos'è l'intelligenza artificiale, in parole semplici?",
            a: "È un software che impara dai dati invece di seguire regole scritte a mano. Gli mostri esempi e lui impara a riconoscere schemi e a produrre risposte. Non “capisce” come noi: riconosce e prevede, ma lo fa così bene da risultare utile.",
          },
          {
            n: "02",
            q: "Cos'è l'AI generativa e cosa la rende diversa?",
            a: "È l'AI che crea contenuti nuovi: testo, immagini, codice. Mentre l'AI “classica” classifica o prevede, quella generativa produce. È la tecnologia dietro ChatGPT e Claude.",
            glo: "#ai-generativa",
          },
          {
            n: "03",
            q: "Cos'è un LLM e come “ragiona”?",
            a: "Un Large Language Model è addestrato su enormi quantità di testo. Non pensa: prevede, parola dopo parola, qual è la più probabile. Sembra ragionamento perché lo fa con una precisione altissima.",
            glo: "#llm",
          },
          {
            n: "04",
            q: "Cosa sono i prompt e perché contano?",
            a: "Il prompt è l'istruzione che dai all'AI. Non è una domanda, è una delega: più è chiara e contestualizzata, migliore è il risultato. Scrivere buoni prompt è la prima competenza pratica da costruire.",
          },
          {
            n: "05",
            q: "Di cosa ci si può fidare? Il problema delle allucinazioni",
            a: "L'AI può produrre risposte false con grande sicurezza: si chiamano allucinazioni. Non è un difetto raro, è un comportamento da conoscere. Per questo dati affidabili e verifica umana restano fondamentali.",
            glo: "#allucinazioni",
          },
        ],
      },
      {
        id: "lavoro",
        eye: "Percorso 02",
        title: "Usare l'AI nel lavoro",
        intro:
          "Dalla teoria alla pratica: come l'AI entra davvero nei processi di un'azienda. Per chi vuole diventare operativo.",
        tag: "Livello base",
        meta: "5 lezioni · ~10 min",
        lessons: [
          {
            n: "01",
            q: "Da dove si parte con l'AI in un'azienda?",
            a: "Non dagli strumenti, ma dai problemi. Si guarda dove si perde tempo, dove gli errori costano, dove i dati non fluiscono: lì l'AI rende. Partire da “quale tool compro” è il modo più rapido per sprecare budget.",
          },
          {
            n: "02",
            q: "Cos'è un agente AI, e in cosa è diverso da un chatbot?",
            a: "Un chatbot risponde. Un agente AI agisce: ha un obiettivo, usa strumenti e porta a termine un compito (preparare un preventivo, aggiornare il CRM). È il salto da “parla” a “fa”.",
            glo: "#agente-ai",
          },
          {
            n: "03",
            q: "Cosa si può automatizzare davvero, oggi?",
            a: "Il lavoro ripetitivo e basato su regole: inserimento dati, prime bozze, sintesi di documenti, smistamento. Le decisioni complesse restano umane, ma l'AI le prepara e le accelera.",
          },
          {
            n: "04",
            q: "Come si tengono i dati al sicuro?",
            a: "Scegliendo dove vivono i dati e chi vi accede. Le soluzioni embedded, che lavorano dentro l'infrastruttura aziendale, mantengono il controllo interno invece di spostarlo fuori.",
          },
          {
            n: "05",
            q: "Cos'è un “AI Champion” e perché serve?",
            a: "È una persona per reparto che diventa il riferimento AI interno: sperimenta, capisce cosa funziona e lo diffonde. Senza, l'AI resta un esperimento isolato; con, diventa una competenza dell'azienda.",
            dis: "Approfondisci →",
            href: "/insights/competenze-ai-azienda-ai-champion",
          },
        ],
      },
      {
        id: "costi",
        eye: "Percorso 03",
        title: "AI, costi e ROI",
        intro:
          "Le domande che si fa chi deve decidere e mettere i soldi. Senza promesse, con criteri.",
        tag: "Per chi decide",
        meta: "4 lezioni · ~8 min",
        lessons: [
          {
            n: "01",
            q: "Quanto costa integrare l'AI in azienda?",
            a: "Dipende dal problema, non da un listino. Il costo sensato si valuta contro quanto ti costa oggi il problema: se un processo perde X al mese, l'investimento si misura su quella perdita.",
          },
          {
            n: "02",
            q: "Come si misura il ROI dell'AI?",
            a: "Definendo all'inizio criteri di valore oggettivi e verificandoli nel tempo. Il ROI non è “quante ore di lavoro”, ma “quanto valore generato in euro”, misurato mese per mese.",
            dis: "Approfondisci →",
            href: "/insights/come-misurare-il-roi-dell-ai",
          },
          {
            n: "03",
            q: "Dove un'azienda perde valore senza accorgersene?",
            a: "Nei processi: errori che si moltiplicano, tempo in attività ripetitive, dati frammentati. Sono i Value Leak, perdite invisibili che erodono il margine mentre cresci.",
            dis: "Leggi l'articolo →",
            href: "/insights/value-leak",
          },
          {
            n: "04",
            q: "L'AI significa tagliare posti di lavoro?",
            a: "No, non necessariamente. L'uso più sensato toglie lo spreco e restituisce ore alle attività di valore: le persone fanno meno lavoro ripetitivo e più lavoro che conta.",
          },
        ],
      },
      {
        id: "pmi",
        eye: "Percorso 04",
        title: "AI per le PMI",
        intro:
          "Hai una piccola o media impresa e ti chiedi se l'AI faccia per te. Risposte concrete, senza hype.",
        tag: "PMI",
        meta: "4 lezioni · ~7 min",
        lessons: [
          {
            n: "01",
            q: "L'AI serve davvero a una PMI?",
            a: "Sì, ma non per “fare l'AI”. Serve quando risolve un problema concreto: ridurre errori, accelerare la preventivazione, liberare tempo. Una PMI ha meno margine di spreco di una grande azienda, quindi il recupero pesa di più.",
          },
          {
            n: "02",
            q: "Quali processi conviene attaccare per primi?",
            a: "Quelli ad alto volume e alta ripetitività, dove l'errore costa: preventivi, inserimento dati, customer support, reportistica. Si parte dove la perdita è grande e misurabile.",
          },
          {
            n: "03",
            q: "SaaS o sistema su misura: cosa scegliere?",
            a: "Un SaaS è veloce ma uguale per tutti e vive fuori. Un sistema embedded lavora sui tuoi dati e migliora nel tempo, ma richiede un partner. La scelta dipende da quanto quel processo è strategico per te.",
          },
          {
            n: "04",
            q: "Come si parte senza un team tecnico?",
            a: "Con un perimetro piccolo e un partner che installa e gestisce, mentre una persona interna cresce come riferimento. Non serve assumere ingegneri per cominciare.",
          },
        ],
      },
    ] as Path[],
    cta: {
      eye: "Dalla teoria alla pratica",
      h2a: "Ora che hai le basi, ",
      h2emph: "vediamole sui tuoi numeri",
      h2b: ".",
      p: "Scopri quanto la tua azienda perde ogni mese, e quanto può recuperare con l'AI.",
      cta1: "Prova il ROIometro",
      cta2: "Parla con noi",
    },
  },
  en: {
    metaTitle: "Learn AI · Morfeus",
    metaDesc:
      "Learn AI applied to business, from the ground up. The answers to the most searched questions, ordered into simple study paths: AI basics, AI at work, cost and ROI, AI for SMEs.",
    hero: {
      eye: "Learn AI",
      h1a: "Learn AI applied to business, ",
      h1emph: "from the ground up",
      h1b: ".",
      copy: "The answers you type into Google, ordered into simple paths that take you from zero to operational. No jargon, no advanced level.",
    },
    pathnav: "Paths",
    glossaryLabel: "See in the glossary →",
    paths: [
      {
        id: "basi",
        eye: "Path 01",
        title: "AI basics",
        intro:
          "What's really behind the words you hear every day. For those starting from scratch who want to understand before using.",
        tag: "Beginner level",
        meta: "5 lessons · ~8 min",
        lessons: [
          {
            n: "01",
            q: "What is artificial intelligence, in plain words?",
            a: "It's software that learns from data instead of following hand-written rules. You show it examples and it learns to recognize patterns and produce answers. It doesn't “understand” like we do: it recognizes and predicts, but it does it so well it turns out useful.",
          },
          {
            n: "02",
            q: "What is generative AI and what makes it different?",
            a: "It's the AI that creates new content: text, images, code. While “classic” AI classifies or predicts, generative AI produces. It's the technology behind ChatGPT and Claude.",
            glo: "#ai-generativa",
          },
          {
            n: "03",
            q: "What is an LLM and how does it “reason”?",
            a: "A Large Language Model is trained on huge amounts of text. It doesn't think: it predicts, word after word, the most probable one. It looks like reasoning because it does it with very high precision.",
            glo: "#llm",
          },
          {
            n: "04",
            q: "What are prompts and why do they matter?",
            a: "The prompt is the instruction you give the AI. It's not a question, it's a delegation: the clearer and more contextual it is, the better the result. Writing good prompts is the first practical skill to build.",
          },
          {
            n: "05",
            q: "What can you trust? The hallucination problem",
            a: "AI can produce false answers with great confidence: they're called hallucinations. It's not a rare flaw, it's a behavior to know. That's why reliable data and human verification stay essential.",
            glo: "#allucinazioni",
          },
        ],
      },
      {
        id: "lavoro",
        eye: "Path 02",
        title: "Using AI at work",
        intro:
          "From theory to practice: how AI truly enters a company's processes. For those who want to become operational.",
        tag: "Beginner level",
        meta: "5 lessons · ~10 min",
        lessons: [
          {
            n: "01",
            q: "Where do you start with AI in a company?",
            a: "Not from the tools, but from the problems. You look at where time is lost, where errors cost, where data doesn't flow: that's where AI pays off. Starting from “which tool do I buy” is the fastest way to waste budget.",
          },
          {
            n: "02",
            q: "What is an AI agent, and how is it different from a chatbot?",
            a: "A chatbot answers. An AI agent acts: it has a goal, uses tools and completes a task (preparing a quote, updating the CRM). It's the leap from “talks” to “does”.",
            glo: "#agente-ai",
          },
          {
            n: "03",
            q: "What can you really automate, today?",
            a: "Repetitive, rule-based work: data entry, first drafts, document summaries, routing. Complex decisions stay human, but AI prepares and accelerates them.",
          },
          {
            n: "04",
            q: "How do you keep data safe?",
            a: "By choosing where the data lives and who accesses it. Embedded solutions, which work inside the company infrastructure, keep control internal instead of moving it outside.",
          },
          {
            n: "05",
            q: "What is an “AI Champion” and why is it needed?",
            a: "It's one person per department who becomes the internal AI reference: they experiment, understand what works and spread it. Without one, AI stays an isolated experiment; with one, it becomes a company competence.",
            dis: "Read more →",
            href: "/insights/competenze-ai-azienda-ai-champion",
          },
        ],
      },
      {
        id: "costi",
        eye: "Path 03",
        title: "AI, cost and ROI",
        intro:
          "The questions asked by those who have to decide and put up the money. No promises, with criteria.",
        tag: "For decision makers",
        meta: "4 lessons · ~8 min",
        lessons: [
          {
            n: "01",
            q: "How much does it cost to integrate AI in a company?",
            a: "It depends on the problem, not on a price list. The sensible cost is weighed against what the problem costs you today: if a process loses X per month, the investment is measured against that loss.",
          },
          {
            n: "02",
            q: "How do you measure the ROI of AI?",
            a: "By defining objective value criteria upfront and verifying them over time. ROI isn't “how many work hours”, but “how much value generated in euros”, measured month by month.",
            dis: "Read more →",
            href: "/insights/come-misurare-il-roi-dell-ai",
          },
          {
            n: "03",
            q: "Where does a company lose value without noticing?",
            a: "In the processes: errors that multiply, time on repetitive activities, fragmented data. They're the Value Leaks, invisible losses that erode margin while you grow.",
            dis: "Read the article →",
            href: "/insights/value-leak",
          },
          {
            n: "04",
            q: "Does AI mean cutting jobs?",
            a: "No, not necessarily. The most sensible use removes waste and gives hours back to valuable activities: people do less repetitive work and more work that counts.",
          },
        ],
      },
      {
        id: "pmi",
        eye: "Path 04",
        title: "AI for SMEs",
        intro:
          "You run a small or medium business and wonder if AI is for you. Concrete answers, no hype.",
        tag: "SMEs",
        meta: "4 lessons · ~7 min",
        lessons: [
          {
            n: "01",
            q: "Does AI really help an SME?",
            a: "Yes, but not to “do AI”. It helps when it solves a concrete problem: reducing errors, speeding up quoting, freeing up time. An SME has less waste margin than a large company, so the recovery weighs more.",
          },
          {
            n: "02",
            q: "Which processes are worth attacking first?",
            a: "The high-volume, highly repetitive ones where errors cost: quotes, data entry, customer support, reporting. You start where the loss is large and measurable.",
          },
          {
            n: "03",
            q: "SaaS or custom system: what to choose?",
            a: "A SaaS is fast but the same for everyone and lives outside. An embedded system works on your data and improves over time, but requires a partner. The choice depends on how strategic that process is for you.",
          },
          {
            n: "04",
            q: "How do you start without a technical team?",
            a: "With a small perimeter and a partner who installs and manages it, while one internal person grows as the reference. You don't need to hire engineers to begin.",
          },
        ],
      },
    ] as Path[],
    cta: {
      eye: "From theory to practice",
      h2a: "Now that you have the basics, ",
      h2emph: "let's see them on your numbers",
      h2b: ".",
      p: "Find out how much your company loses every month, and how much it can recover with AI.",
      cta1: "Try the ROIometer",
      cta2: "Talk to us",
    },
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("impara-ai", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/impara-ai`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function ImparaAiPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "LearningResource"],
        "@id": `${SITE_URL}/${safeLocale}/impara-ai#learningresource`,
        url: `${SITE_URL}/${safeLocale}/impara-ai`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        learningResourceType: isIt ? "Percorso introduttivo" : "Introductory course",
        educationalLevel: "Beginner",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        provider: { "@id": ORGANIZATION_ID },
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

      {/* 01 · TESTATA · INCHIOSTRO */}
      <section className="band ink hero" id="hero">
        <div className="wrap">
          <div className="eye">{t.hero.eye}</div>
          <h1>
            {t.hero.h1a}
            <span className="emph">{t.hero.h1emph}</span>
            {t.hero.h1b}
          </h1>
          <p className="copy">{t.hero.copy}</p>

          {/* pathnav: ancore ai 4 percorsi */}
          <nav
            aria-label={t.pathnav}
            className="mt-9 flex flex-wrap items-center gap-2.5 border-t border-[color:var(--riga-scuro)] pt-6"
          >
            <span className="font-plex text-[10px] uppercase tracking-[0.16em] text-[color:var(--ombra)]">
              {t.pathnav}
            </span>
            {t.paths.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-[var(--r-pill)] border border-[color:var(--riga-scuro)] px-3.5 py-1.5 font-plex text-[11px] tracking-[0.04em] text-[color:var(--lilla)] transition-colors hover:border-[color:var(--lilla)]"
              >
                {p.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 02 · I 4 PERCORSI · CARTA */}
      <section className="band carta" id="percorsi">
        <div className="wrap max-w-[820px]">
          {t.paths.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              className={
                i === 0
                  ? "scroll-mt-24"
                  : "mt-[clamp(44px,6vw,64px)] scroll-mt-24 border-t border-[color:rgba(11,11,12,0.14)] pt-[clamp(44px,6vw,64px)]"
              }
            >
              <span className="eye">{p.eye}</span>
              <h2 className="h-sect" style={{ margin: "8px 0 0" }}>
                {p.title}
              </h2>
              <p className="lead mt-3 max-w-[62ch]">{p.intro}</p>
              <div className="mt-[18px] flex flex-wrap items-center gap-3.5">
                <span className="rounded-[var(--r-pill)] border border-[color:rgba(83,61,252,0.22)] bg-[rgba(83,61,252,0.07)] px-3 py-[5px] font-plex text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--firma)]">
                  {p.tag}
                </span>
                <span className="font-plex text-[12px] text-[#3a3b45]">{p.meta}</span>
              </div>

              <div className="mt-[26px]">
                {p.lessons.map((l) => (
                  <details
                    key={l.n}
                    className="group border-t border-[color:rgba(11,11,12,0.12)]"
                  >
                    <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 pr-11 [&::-webkit-details-marker]:hidden">
                      <span className="w-6 flex-shrink-0 font-plex text-[13px] text-[color:var(--firma)]">
                        {l.n}
                      </span>
                      <span className="font-clash text-[clamp(17px,2vw,19px)] font-semibold leading-[1.3] tracking-[-0.01em] text-[color:var(--inchiostro)]">
                        {l.q}
                      </span>
                      <svg
                        className="ml-auto mt-[3px] h-[18px] w-[18px] flex-shrink-0 text-[color:var(--firma)] transition-transform duration-200 group-open:rotate-45"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <div className="pb-6 pl-10 pr-11">
                      <p className="max-w-[72ch] text-[15.5px] text-[#3a3b45]">{l.a}</p>
                      {l.glo ? (
                        <Link
                          href={`${base}/glossario${l.glo}`}
                          className="mt-3.5 inline-flex items-center gap-1.5 font-plex text-[12px] font-semibold text-[color:var(--firma)] hover:text-[color:var(--firma-hover)]"
                        >
                          {t.glossaryLabel}
                        </Link>
                      ) : l.dis && l.href ? (
                        <Link
                          href={`${base}${l.href}`}
                          className="mt-3.5 inline-flex items-center gap-1.5 font-plex text-[12px] font-semibold text-[color:var(--firma)] hover:text-[color:var(--firma-hover)]"
                        >
                          {l.dis}
                        </Link>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 · CTA · INCHIOSTRO */}
      <section className="band ink ctaq" id="cta">
        <div className="wrap">
          <div className="eye">{t.cta.eye}</div>
          <h2>
            {t.cta.h2a}
            <span className="emph">{t.cta.h2emph}</span>
            {t.cta.h2b}
          </h2>
          <p>{t.cta.p}</p>
          <div className="cta-row">
            <a className="btn btn-1" href={`${base}/roiometro`}>
              {t.cta.cta1}
            </a>
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
