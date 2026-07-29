import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { MappaLavoro } from "@/components/pagine/metodo/MappaLavoro";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

/* ============================================================
   IMPARA L'AI. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   RITMO: tesi, riconoscimento, traiettoria, primo passo, salto.
     01 hero      ink     una mappa di apprendimento che avanza
     02 tesi      CARTA   confronto tipografico corso / lavoro
     03 percorsi  ink     "quattro tappe di una sola traiettoria,
                          non quattro card scollegate": e' esattamente
                          la mappa con rail gia' costruita per il
                          Metodo, quindi la riuso
     04 da leggere CARTA  il primo passo, uno solo
     05 al lavoro  ink    il salto verso Morf Lab
     06 FAQ        ink

   I quattro percorsi puntano ai quattro pilastri editoriali di
   Insights: sono la stessa cosa vista da due lati, uno per chi
   vuole imparare e uno per chi vuole leggere. Non li duplico,
   li collego.
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
      mappaTitolo: "Il percorso",
      tappe: ["Riconosci", "Applica", "Verifica", "Condividi"],
    },
    tesi: {
      eye: "Il problema non è la mancanza di tool",
      h2a: "Un corso ti mostra cosa può fare l'AI. Il lavoro ti insegna ",
      h2emph: "dove deve farlo",
      h2b: ".",
      p1: "Sapere usare un prompt non basta per trasformare un'azienda. Devi saper riconoscere un processo inefficiente, dare all'AI il contesto giusto, verificare il risultato e trasformare ciò che funziona in un modo di lavorare condiviso.",
      p2: "Per questo i percorsi non partono dal tool più recente. Partono dalle decisioni che una persona deve prendere nel proprio lavoro.",
      testaNo: "Un corso",
      testaSi: "Il lavoro",
      righe: [
        ["Mostra cosa può fare l'AI", "Insegna dove deve farlo"],
        ["Parte dal tool del momento", "Parte dal processo che perde valore"],
        ["Finisce con un attestato", "Finisce quando il team è autonomo"],
        ["Vale per chiunque", "Vale per la tua azienda"],
      ],
    },
    percorsi: {
      eye: "Scegli da dove partire",
      h2a: "Non partire dal tool. Parti dalla domanda ",
      h2emph: "che hai davanti",
      h2b: ".",
      tappe: [
        { id: "percorso-01", indice: "Percorso 01", titolo: "Dove l'AI crea valore", testo: "Value Leak, margine, ROI e priorità. Per capire dove l'AI può togliere lavoro inefficiente prima di decidere cosa acquistare." },
        { id: "percorso-02", indice: "Percorso 02", titolo: "Come l'AI entra nei processi", testo: "Context Hub, automazione, agenti AI e sistemi in produzione. Per passare da prove scollegate a un flusso di lavoro che funziona davvero." },
        { id: "percorso-03", indice: "Percorso 03", titolo: "Come le persone la fanno funzionare", testo: "AI Champion, competenze pratiche, verifica dell'output e procedure condivise. Perché la tecnologia senza adozione resta un tool aperto due volte." },
        { id: "percorso-04", indice: "Percorso 04", titolo: "Come l'AI resta governabile", testo: "Regole, responsabilità, AI Act e decisioni su cosa automatizzare e cosa tenere umano. Per crescere senza lasciare che ogni reparto inventi il proprio modo di usare l'AI." },
      ],
      vaiA: "Esplora le guide",
    },
    primo: {
      eye: "Se leggi una cosa sola",
      h2a: "Prima trova il valore che stai ",
      h2emph: "già lasciando uscire",
      h2b: ".",
      p: "Il Value Leak è il punto in cui tempo, informazioni, decisioni o lavoro manuale fanno perdere margine senza comparire in nessun bilancio. Capirlo è il modo più utile per iniziare a parlare di AI.",
      btn: "Cos'è un Value Leak?",
    },
    lavoro: {
      eye: "Quando capire non basta più",
      h2a: "Leggere ti dà un metodo. Applicarlo cambia il modo in cui ",
      h2emph: "lavora il team",
      h2b: ".",
      p: "I contenuti servono per orientarti e fare domande migliori. Ma ogni azienda ha processi, persone e vincoli diversi. Quando vuoi portare l'AI dentro il lavoro quotidiano del tuo team, il passo successivo è Morf Lab.",
      btn: "Scopri Morf Lab",
    },
    faq: {
      eye: "Domande",
      titolo: "Prima di iniziare.",
      voci: [
        { q: "Da dove iniziare per usare l'AI in azienda?", a: "Inizia da un processo in cui perdi tempo, margine o informazioni. Non dalla scelta di un tool. L'obiettivo iniziale è trovare un problema concreto su cui l'AI possa generare un miglioramento verificabile." },
        { q: "Serve saper programmare per usare l'AI al lavoro?", a: "No. Per la maggior parte dei ruoli servono competenze pratiche: scegliere i task giusti, dare istruzioni chiare, verificare l'output e inserire l'AI dentro un processo esistente." },
        { q: "Basta un corso di AI per il team?", a: "No. Un corso può essere un punto di partenza, ma l'adozione avviene quando le persone applicano ciò che imparano a casi reali e trasformano ciò che funziona in procedure condivise." },
        { q: "Chi è un AI Champion?", a: "Un AI Champion è una persona che conosce bene il processo del proprio reparto, sperimenta l'AI sul lavoro reale e aiuta i colleghi a renderne l'uso concreto e continuativo." },
      ],
    },
  },
  en: {
    metaTitle: "Learn AI · Free paths for teams and companies | Morfeus",
    metaDesc:
      "Free learning paths for founders, managers and teams: understand where AI creates value, apply it to real work and make it a capability that stays in the company.",
    hero: {
      eye: "Learn AI",
      h1a: "You do not need to learn everything about AI. You need to learn where to ",
      h1emph: "use it well",
      h1b: ".",
      copy: "Free learning paths for founders, managers and teams who want to move beyond tools and into workflows: understand where AI creates value, apply it to the work and make it a capability that stays in the company.",
      mappaTitolo: "The path",
      tappe: ["Recognise", "Apply", "Verify", "Share"],
    },
    tesi: {
      eye: "The problem is not a lack of tools",
      h2a: "A course shows you what AI can do. The work teaches you ",
      h2emph: "where it should do it",
      h2b: ".",
      p1: "Knowing how to use a prompt is not enough to transform a company. You need to recognise an inefficient workflow, give AI the right context, verify the result and turn what works into a shared way of working.",
      p2: "That is why these paths do not start with the latest tool. They start with the decisions people have to make in their actual work.",
      testaNo: "A course",
      testaSi: "The work",
      righe: [
        ["Shows what AI can do", "Teaches where it should do it"],
        ["Starts with the tool of the moment", "Starts with the workflow losing value"],
        ["Ends with a certificate", "Ends when the team is autonomous"],
        ["Applies to anyone", "Applies to your company"],
      ],
    },
    percorsi: {
      eye: "Choose where to start",
      h2a: "Do not start with the tool. Start with the question ",
      h2emph: "in front of you",
      h2b: ".",
      tappe: [
        { id: "percorso-01", indice: "Path 01", titolo: "Where AI creates value", testo: "Value Leaks, margin, ROI and priorities. Learn where AI can remove inefficient work before deciding what to buy." },
        { id: "percorso-02", indice: "Path 02", titolo: "How AI enters workflows", testo: "Context Hubs, automation, AI agents and systems in production. Move from disconnected experiments to a workflow that actually works." },
        { id: "percorso-03", indice: "Path 03", titolo: "How people make it work", testo: "AI Champions, practical skills, output review and shared procedures. Because technology without adoption becomes a tool opened twice and forgotten." },
        { id: "percorso-04", indice: "Path 04", titolo: "How to keep AI governable", testo: "Rules, responsibilities, the AI Act and decisions about what to automate and what should remain human. Grow without letting every department invent its own AI playbook." },
      ],
      vaiA: "Explore the guides",
    },
    primo: {
      eye: "If you read one thing",
      h2a: "Find the value that is ",
      h2emph: "already leaking out",
      h2b: " first.",
      p: "A Value Leak is the point where time, information, decisions or manual work erode margin without showing up in any balance sheet. Understanding it is the most useful way to start talking about AI.",
      btn: "What is a Value Leak?",
    },
    lavoro: {
      eye: "When understanding is not enough",
      h2a: "Reading gives you a method. Applying it changes how ",
      h2emph: "the team works",
      h2b: ".",
      p: "Content helps you get oriented and ask better questions. But every company has different workflows, people and constraints. When you want to bring AI into your team's daily work, the next step is Morf Lab.",
      btn: "Discover Morf Lab",
    },
    faq: {
      eye: "Questions",
      titolo: "Before you start.",
      voci: [
        { q: "Where should I start with AI in my company?", a: "Start with a workflow where you lose time, margin or information. Not with choosing a tool. The initial goal is to find a concrete problem where AI can produce a verifiable improvement." },
        { q: "Do I need to code to use AI at work?", a: "No. Most roles need practical skills: choosing the right tasks, giving clear instructions, checking the output and fitting AI into an existing workflow." },
        { q: "Is a course enough for the team?", a: "No. A course can be a starting point, but adoption happens when people apply what they learn to real cases and turn what works into shared procedures." },
        { q: "Who is an AI Champion?", a: "An AI Champion is someone who knows their department's workflow well, experiments with AI on real work and helps colleagues make its use concrete and continuous." },
      ],
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
      url: `${SITE_URL}/${safeLocale}/impara-ai`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default async function ImparaAiPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${safeLocale}/impara-ai#collectionpage`,
        url: `${SITE_URL}/${safeLocale}/impara-ai`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${safeLocale}/impara-ai#faq`,
        mainEntity: t.faq.voci.map((v) => ({
          "@type": "Question",
          name: v.q,
          acceptedAnswer: { "@type": "Answer", text: v.a },
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

      {/* 01 · HERO · ink, la mappa che avanza */}
      <section className="band ink hero pg" id="hero">
        <div className="wrap">
          <div className="grid-hero-metodo">
            <div>
              <div className="eye">{t.hero.eye}</div>
              <h1>
                {t.hero.h1a}
                <span className="emph">{t.hero.h1emph}</span>
                {t.hero.h1b}
              </h1>
              <p className="copy">{t.hero.copy}</p>
            </div>
            <div>
              <div className="quota">{t.hero.mappaTitolo}</div>
              <div className="catena" style={{ marginTop: 26 }}>
                {t.hero.tappe.map((v, i) => (
                  <div
                    className={`anello${i === t.hero.tappe.length - 1 ? " ultimo" : ""}`}
                    key={v}
                  >
                    <span className="segno">{`0${i + 1}`}</span>
                    <span>
                      <span className="voce-catena">{v}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · LA TESI · CARTA, confronto tipografico */}
      <section className="band carta pg" id="tesi">
        <div className="wrap">
          <div className="eye">{t.tesi.eye}</div>
          <h2 className="h-sect">
            {t.tesi.h2a}
            <span className="emph">{t.tesi.h2emph}</span>
            {t.tesi.h2b}
          </h2>
          <p className="lead">{t.tesi.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.tesi.p2}
          </p>

          <div className="confronto">
            <div className="colonna-testa">{t.tesi.testaNo}</div>
            <div className="colonna-testa si">{t.tesi.testaSi}</div>
            {t.tesi.righe.map(([no, si]) => (
              <RigaConfronto key={si} no={no} si={si} />
            ))}
          </div>
        </div>
      </section>

      {/* 03 · I QUATTRO PERCORSI · ink, una sola traiettoria */}
      <section className="band ink pg" id="percorsi">
        <div className="wrap">
          <div className="eye">{t.percorsi.eye}</div>
          <h2 className="h-sect">
            {t.percorsi.h2a}
            <span className="emph">{t.percorsi.h2emph}</span>
            {t.percorsi.h2b}
          </h2>
          <MappaLavoro tappe={[...t.percorsi.tappe]} />
          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/insights`}>
              {t.percorsi.vaiA}
            </Link>
          </div>
        </div>
      </section>

      {/* 04 · DA LEGGERE PER PRIMO · CARTA */}
      <section className="band carta pg" id="primo">
        <div className="wrap">
          <div className="ctaq">
            <div className="eye justify-center">{t.primo.eye}</div>
            <h2 className="h-sect">
              {t.primo.h2a}
              <span className="emph">{t.primo.h2emph}</span>
              {t.primo.h2b}
            </h2>
            <p>{t.primo.p}</p>
            <div className="cta-row centrata">
              <Link className="btn btn-1" href={`${base}/insights/value-leak`}>
                {t.primo.btn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · DAL CONTENUTO AL LAVORO · ink */}
      <section className="band ink pg" id="al-lavoro">
        <div className="wrap">
          <div className="eye">{t.lavoro.eye}</div>
          <h2 className="h-sect">
            {t.lavoro.h2a}
            <span className="emph">{t.lavoro.h2emph}</span>
            {t.lavoro.h2b}
          </h2>
          <p className="lead">{t.lavoro.p}</p>
          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/lab`}>
              {t.lavoro.btn}
            </Link>
          </div>
        </div>
      </section>

      {/* 06 · FAQ · ink */}
      <section className="band ink pg" id="faq">
        <div className="wrap">
          <div className="eye">{t.faq.eye}</div>
          <h2 className="h-sect">{t.faq.titolo}</h2>
          <div className="two" style={{ marginTop: 34, alignItems: "start" }}>
            {[t.faq.voci.slice(0, 2), t.faq.voci.slice(2)].map((colonna, i) => (
              <div key={i}>
                {colonna.map((v) => (
                  <details className="faq" key={v.q}>
                    <summary>
                      <span>{v.q}</span>
                      <span className="segno" aria-hidden="true" />
                    </summary>
                    <p className="risposta">{v.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function RigaConfronto({ no, si }: { no: string; si: string }) {
  return (
    <>
      <div className="riga-no">{no}</div>
      <div className="riga-si">{si}</div>
    </>
  );
}
