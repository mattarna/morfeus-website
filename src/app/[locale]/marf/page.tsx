import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { MappaLavoro } from "@/components/pagine/metodo/MappaLavoro";
import { SchemaCentrale, Convergenza } from "@/components/pagine/marf/Diagrammi";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

/* ============================================================
   MARF. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   RITMO dichiarato nel brief: frammentazione, connessione, governo,
   azione. Le fasce lo seguono, con la CARTA sul registro del
   documento e del confronto:
     01 hero          ink     il flusso unico
     02 problema      CARTA   i frammenti, su carta perche' e' un
                              referto di cosa non si parla
     03 cos'e'        ink     lo schema centrale
     04 catena        ink     i cinque snodi, percorso scroll-driven
     05 tre logiche   CARTA   colonne editoriali
     06 layer AI      ink     dati, conversazioni, segnali
     07 integrazioni  ink     la convergenza
     08 cosa non e'   CARTA   confronto netto, tipografia grande
     09 CTA           ink
     10 FAQ           ink

   La CATENA OPERATIVA riusa la mappa scroll-driven del Metodo: il
   brief chiede "un flusso unico, non cinque card isolate", ed e'
   esattamente il dispositivo che avevo gia' costruito li'. Riusarlo
   non e' pigrizia: due pagine che descrivono una sequenza devono
   descriverla con la stessa forma, o il sito perde la lingua.
   ============================================================ */

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "MARF · Il cruscotto operativo aziendale | Morfeus",
    metaDesc:
      "MARF collega marketing, vendite, amministrazione, delivery e customer care in un unico cruscotto operativo. Trasforma informazioni disperse in processi, decisioni e azioni verificabili.",
    hero: {
      eye: "MARF · Cruscotto operativo aziendale",
      h1a: "Tutto ciò che muove l'azienda. In un solo ",
      h1emph: "quadro operativo",
      h1b: ".",
      copy: "MARF collega i dati di marketing, vendite, preventivi, contratti, incassi, amministrazione, delivery e customer care. Trasforma informazioni disperse in processi, decisioni e azioni verificabili.",
      cta: "Scopri se MARF è adatto alla tua azienda",
      flusso: ["Marketing", "Vendite", "Amministrazione", "Delivery", "Direzione"],
      flussoTitolo: "Una sola catena",
    },
    problema: {
      eye: "L'azienda non è divisa. I suoi dati sì.",
      h2a: "Quando ogni reparto lavora su una versione diversa della realtà, nessuno sta davvero ",
      h2emph: "governando l'insieme",
      h2b: ".",
      p1: "Il marketing genera contatti. Il commerciale li lavora. L'amministrazione verifica i pagamenti. Chi eroga il servizio segue i clienti. La direzione prova a ricostruire il quadro tra CRM, fogli Excel, messaggi, software e memoria delle persone.",
      p2: "MARF mette questi passaggi nella stessa catena operativa. Così ogni reparto può lavorare sul proprio ruolo senza perdere il contesto di ciò che accade prima e dopo.",
      frammenti: [
        { r: "Marketing", d: "Contatti generati", m: "…e poi?" },
        { r: "Vendite", d: "Trattative aperte", m: "stato: generico" },
        { r: "Amministrazione", d: "Pagamenti verificati", m: "arriva tardi" },
        { r: "Delivery", d: "Clienti seguiti", m: "fuori dal quadro" },
      ],
    },
    cose: {
      eye: "Senza giri di parole",
      h2a: "MARF è il sistema che ti fa vedere, capire e ",
      h2emph: "governare",
      h2b: " ciò che accade in azienda.",
      p1: "MARF è la piattaforma proprietaria di Morfeus che integra i dati e i processi che servono a far funzionare un'azienda. Non si limita a raccogliere informazioni in un dashboard: collega gli eventi che le generano, le persone che devono agire e le regole con cui farlo.",
      p2: "Il risultato è un cruscotto operativo che non racconta soltanto cosa è successo. Aiuta ogni team a capire cosa fare dopo.",
      readout: "Schema · come lavora",
      stato: "Un solo quadro",
      ingressi: ["Dati", "Processi", "Persone"],
      uscite: ["Decisioni", "Azioni"],
    },
    catena: {
      eye: "Dall'acquisizione al valore erogato",
      h2a: "Ogni reparto fa il proprio lavoro. Ma nessuno lavora più ",
      h2emph: "isolato",
      h2b: ".",
      tappe: [
        { id: "marketing", indice: "01 · Marketing", titolo: "I numeri di acquisizione smettono di stare da soli.", testo: "Campagne, canali, contenuti e dati di acquisizione smettono di essere numeri separati dal resto del business. Diventano il punto da cui leggere la qualità dei lead e il valore generato." },
        { id: "vendite", indice: "02 · Vendite", titolo: "Il commerciale non lavora più su note e stati generici.", testo: "Lead, appuntamenti, trattative, preventivi, contratti e attività commerciali vivono in un processo tracciabile. Il team non lavora più solo su note e stati generici." },
        { id: "amministrazione", indice: "03 · Amministrazione", titolo: "Il dato amministrativo arriva quando serve.", testo: "Pagamenti, rate, rimborsi, fatturazione e provvigioni vengono collegati agli eventi che li generano. Il dato amministrativo smette di arrivare quando è ormai troppo tardi per agire." },
        { id: "delivery", indice: "04 · Delivery", titolo: "Dopo la vendita il cliente continua a esistere.", testo: "Erogazione, avanzamento, sessioni, segnali di rischio e customer care restano parte della stessa storia." },
        { id: "direzione", indice: "05 · Direzione", titolo: "Il quadro complessivo, non cinque report.", testo: "La direzione vede cosa sta generando valore, dove si blocca il processo e quali aree richiedono una decisione." },
      ],
    },
    logiche: {
      eye: "Non è un altro software da aggiungere",
      h2a: "MARF cambia il modo in cui l'azienda ",
      h2emph: "usa i propri dati",
      h2b: ".",
      colonne: [
        { n: "01", t: "I dati nascono dagli eventi reali.", p: "Un pagamento, una telefonata, un contratto, un preventivo, una sessione erogata o un rimborso non sono informazioni da ricostruire dopo. Sono eventi che alimentano il sistema nel momento in cui accadono." },
        { n: "02", t: "I processi hanno regole, non solo campi da compilare.", p: "MARF non si limita a salvare una nota. Aiuta il team a seguire il passaggio operativo corretto, mantiene traccia delle azioni e rende visibile ciò che serve fare dopo." },
        { n: "03", t: "Ogni persona vede ciò che le serve per agire.", p: "Un commerciale, un amministratore, un coach e un imprenditore non hanno bisogno dello stesso dashboard. Hanno bisogno di lavorare sulla stessa realtà, con informazioni diverse per responsabilità diverse." },
      ],
    },
    ai: {
      eye: "L'AI non aggiunge rumore. Aggiunge contesto.",
      h2a: "Quando i dati sono collegati, l'AI può finalmente ",
      h2emph: "essere utile",
      h2b: ".",
      p1: "MARF usa l'AI per trasformare informazioni operative in supporto concreto: analizzare le conversazioni commerciali, leggere i segnali nei processi, rendere i dati interrogabili e aiutare le persone a intervenire con più contesto.",
      p2: "L'AI non sostituisce il giudizio del team. Rende più visibili le informazioni su cui quel giudizio deve basarsi.",
      readout: "Layer AI · cosa fa davvero",
      stato: "Supporto, non sostituzione",
      voci: [
        { k: "Conversazioni", t: "Le call commerciali diventano leggibili", p: "Non una trascrizione da archiviare: i segnali che dicono cosa è successo in quella trattativa e cosa serve fare adesso." },
        { k: "Segnali", t: "I processi dicono quando qualcosa si sta rompendo", p: "Un rallentamento, un passaggio saltato, un cliente che smette di rispondere. Il sistema lo vede prima che diventi un problema." },
        { k: "Interrogazione", t: "I dati rispondono a domande in lingua", p: "Chi decide non deve sapere dove sta l'informazione. Deve poterla chiedere." },
      ],
    },
    integrazioni: {
      eye: "Non ti chiede di ricominciare da zero",
      h2a: "MARF non cancella i tuoi strumenti. Li rende parte dello ",
      h2emph: "stesso sistema",
      h2b: ".",
      p1: "CRM, strumenti di marketing, email, calendari, pagamenti, documenti e dati operativi possono continuare a esistere. MARF crea il livello che li collega, così un'informazione utile non resta bloccata nel software in cui è nata.",
      p2: "Non un'altra piattaforma da alimentare manualmente. Un sistema che rende i dati già disponibili più utili a chi deve decidere e agire.",
      readout: "Integrazioni · il livello che collega",
      stato: "Nessuna migrazione",
      strumenti: ["CRM", "Marketing", "Email", "Calendari", "Pagamenti", "Documenti"],
      reparti: ["Vendite", "Amministrazione", "Delivery", "Direzione"],
    },
    nonE: {
      eye: "Cosa non è",
      h2a: "MARF è il punto in cui processi, dati e persone ",
      h2emph: "iniziano a lavorare insieme",
      h2b: ".",
      negazioni: ["Non è un CRM.", "Non è una dashboard decorativa.", "Non è un altro tool isolato."],
      p: "Ha moduli profondi dove serve verticalità, come vendite, incassi, provvigioni ed erogazione, ma mantiene una visione unica dell'azienda.",
    },
    cta: {
      eye: "Il problema non è quanti dati hai",
      h2a: "Il problema è: riesci davvero a usarli per ",
      h2emph: "governare l'azienda",
      h2b: "?",
      p: "Se marketing, vendite, amministrazione e delivery vivono ancora su strumenti separati, il primo passo è capire dove si rompe il flusso. Poi valutiamo se MARF è il sistema giusto per ricomporlo.",
      btn: "Scopri se MARF è adatto alla tua azienda",
    },
    faq: {
      eye: "Domande",
      titolo: "MARF, in chiaro.",
      voci: [
        { q: "Cos'è MARF?", a: "MARF è la piattaforma proprietaria di Morfeus che collega dati e processi di marketing, vendite, amministrazione, delivery e customer care in un unico cruscotto operativo aziendale." },
        { q: "Quali reparti può collegare MARF?", a: "MARF collega marketing, vendite, amministrazione, delivery, customer care e direzione. Ogni reparto lavora sul proprio ruolo, mantenendo il contesto di ciò che accade nell'intera azienda." },
        { q: "MARF sostituisce il CRM?", a: "No. MARF si integra con gli strumenti già usati dall'azienda e crea il livello che collega dati, processi e persone. Non richiede di ricominciare da zero con un nuovo CRM." },
        { q: "MARF gestisce preventivi, contratti e incassi?", a: "MARF collega preventivi, contratti, pagamenti, rate, rimborsi, fatturazione e provvigioni agli eventi che li generano, rendendo il dato amministrativo più tracciabile e utilizzabile." },
        { q: "Come usa l'intelligenza artificiale?", a: "MARF usa l'AI per analizzare conversazioni commerciali, rendere i dati interrogabili, leggere segnali nei processi e aiutare le persone a intervenire con più contesto. L'AI supporta il giudizio del team, non lo sostituisce." },
        { q: "MARF è solo per il team commerciale?", a: "No. Vendite e incassi sono tra le aree più verticali della piattaforma, ma MARF mantiene una visione operativa che collega anche marketing, amministrazione, delivery, customer care e direzione." },
      ],
    },
  },
  en: {
    metaTitle: "MARF · The company operating cockpit | Morfeus",
    metaDesc:
      "MARF connects marketing, sales, administration, delivery and customer care in one company operating cockpit. It turns scattered information into verifiable workflows, decisions and actions.",
    hero: {
      eye: "MARF · The company's operating cockpit",
      h1a: "Everything that moves your company. One ",
      h1emph: "operating view",
      h1b: ".",
      copy: "MARF connects marketing data, sales, proposals, contracts, cash collection, administration, delivery and customer care. It turns scattered information into verifiable workflows, decisions and actions.",
      cta: "Find out whether MARF fits your company",
      flusso: ["Marketing", "Sales", "Administration", "Delivery", "Leadership"],
      flussoTitolo: "One chain",
    },
    problema: {
      eye: "The company is not divided. Its data is.",
      h2a: "When every department works from a different version of reality, no one is really ",
      h2emph: "running the whole",
      h2b: ".",
      p1: "Marketing generates leads. Sales works them. Administration checks payments. Delivery looks after customers. Leadership tries to rebuild the picture across CRMs, spreadsheets, messages, software and people's memory.",
      p2: "MARF puts those handoffs into the same operating chain. Each department can work on its own responsibility without losing the context of what happens before and after.",
      frammenti: [
        { r: "Marketing", d: "Leads generated", m: "…and then?" },
        { r: "Sales", d: "Open opportunities", m: "status: generic" },
        { r: "Administration", d: "Payments checked", m: "arrives late" },
        { r: "Delivery", d: "Customers followed", m: "outside the picture" },
      ],
    },
    cose: {
      eye: "In plain English",
      h2a: "MARF helps you see, understand and ",
      h2emph: "run",
      h2b: " what is happening in your company.",
      p1: "MARF is Morfeus' proprietary platform for connecting the data and processes a company needs to operate. It does more than collect information in a dashboard: it connects the events that generate it, the people who need to act and the rules they need to act by.",
      p2: "The result is an operating cockpit that does not just tell teams what has happened. It helps them understand what to do next.",
      readout: "Schema · how it works",
      stato: "One view",
      ingressi: ["Data", "Processes", "People"],
      uscite: ["Decisions", "Actions"],
    },
    catena: {
      eye: "From acquisition to value delivered",
      h2a: "Every department does its job. No department has to work ",
      h2emph: "in isolation",
      h2b: ".",
      tappe: [
        { id: "marketing", indice: "01 · Marketing", titolo: "Acquisition numbers stop standing alone.", testo: "Campaigns, channels, content and acquisition data stop being numbers detached from the rest of the business. They become the starting point for understanding lead quality and value created." },
        { id: "vendite", indice: "02 · Sales", titolo: "No more notes and generic status labels.", testo: "Leads, meetings, opportunities, proposals, contracts and sales activity live in a traceable process. Teams no longer work from notes and generic status labels alone." },
        { id: "amministrazione", indice: "03 · Administration", titolo: "Financial data arrives while you can still act.", testo: "Payments, instalments, refunds, invoicing and commissions are connected to the events that generate them. Financial data stops arriving after it is too late to act on it." },
        { id: "delivery", indice: "04 · Delivery", titolo: "After the sale, the customer does not disappear.", testo: "Delivery, progress, sessions, risk signals and customer care remain part of the same story." },
        { id: "direzione", indice: "05 · Leadership", titolo: "The whole picture, not five reports.", testo: "Leadership sees what is creating value, where the workflow is breaking and which areas need a decision." },
      ],
    },
    logiche: {
      eye: "Not another piece of software to add",
      h2a: "MARF changes how your company ",
      h2emph: "uses its data",
      h2b: ".",
      colonne: [
        { n: "01", t: "Data starts with real events.", p: "A payment, a call, a contract, a proposal, a delivered session or a refund should not have to be reconstructed after the fact. They are events that feed the system as they happen." },
        { n: "02", t: "Workflows have rules, not just fields to fill in.", p: "MARF does not simply save a note. It helps teams follow the right operating step, keeps a record of actions and shows what needs to happen next." },
        { n: "03", t: "Each person sees what they need to act.", p: "A salesperson, administrator, coach and founder do not need the same dashboard. They need to work from the same reality, with different information for different responsibilities." },
      ],
    },
    ai: {
      eye: "AI does not add noise. It adds context.",
      h2a: "When data is connected, AI can finally ",
      h2emph: "be useful",
      h2b: ".",
      p1: "MARF uses AI to turn operating information into practical support: analysing sales conversations, reading signals in workflows, making data queryable and helping people intervene with more context.",
      p2: "AI does not replace the team's judgement. It makes the information that judgement relies on easier to see.",
      readout: "AI layer · what it actually does",
      stato: "Support, not replacement",
      voci: [
        { k: "Conversations", t: "Sales calls become readable", p: "Not a transcript to file away: the signals that say what happened in that deal and what needs to happen now." },
        { k: "Signals", t: "Workflows say when something is breaking", p: "A slowdown, a skipped handoff, a customer who stops replying. The system sees it before it becomes a problem." },
        { k: "Querying", t: "Data answers questions in plain language", p: "The person deciding should not need to know where the information lives. They need to be able to ask for it." },
      ],
    },
    integrazioni: {
      eye: "It does not ask you to start over",
      h2a: "MARF does not erase your tools. It makes them part of the ",
      h2emph: "same system",
      h2b: ".",
      p1: "CRMs, marketing tools, email, calendars, payments, documents and operating data can continue to exist. MARF creates the layer that connects them, so useful information does not stay trapped inside the software where it was created.",
      p2: "Not another platform to feed by hand. A system that makes the data you already have more useful to the people who need to decide and act.",
      readout: "Integrations · the connecting layer",
      stato: "No migration",
      strumenti: ["CRM", "Marketing", "Email", "Calendars", "Payments", "Documents"],
      reparti: ["Sales", "Administration", "Delivery", "Leadership"],
    },
    nonE: {
      eye: "What it is not",
      h2a: "MARF is where processes, data and people ",
      h2emph: "start working together",
      h2b: ".",
      negazioni: ["Not a CRM.", "Not a decorative dashboard.", "Not another isolated tool."],
      p: "It has deep vertical modules where a workflow demands them, including sales, cash collection, commissions and delivery, while keeping one view of the company.",
    },
    cta: {
      eye: "The problem is not how much data you have",
      h2a: "The problem is: can you really use it to ",
      h2emph: "run the company",
      h2b: "?",
      p: "If marketing, sales, administration and delivery still live across separate tools, start by finding where the flow breaks. Then we can assess whether MARF is the right system to reconnect it.",
      btn: "Find out whether MARF fits your company",
    },
    faq: {
      eye: "Questions",
      titolo: "MARF, in plain terms.",
      voci: [
        { q: "What is MARF?", a: "MARF is Morfeus' proprietary platform for connecting data and workflows across marketing, sales, administration, delivery and customer care into one company operating cockpit." },
        { q: "Which departments can MARF connect?", a: "Marketing, sales, administration, delivery, customer care and leadership. Each department works from its own role while retaining the context of the wider company." },
        { q: "Does MARF replace a CRM?", a: "No. MARF connects the tools a company already uses and creates the layer that links data, workflows and people. It does not require starting again with a new CRM." },
        { q: "Does MARF manage proposals, contracts and payments?", a: "MARF connects proposals, contracts, payments, instalments, refunds, invoicing and commissions to the events that generate them, making financial data more traceable and usable." },
        { q: "How does MARF use AI?", a: "MARF uses AI to analyse sales conversations, make data queryable, read workflow signals and help people intervene with more context. AI supports the team's judgement rather than replacing it." },
        { q: "Is MARF only for the sales team?", a: "No. Sales and cash collection are among the platform's most vertical areas, but MARF keeps an operating view that also connects marketing, administration, delivery, customer care and leadership." },
      ],
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
    alternates: buildLocaleAlternates("marf", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/marf`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default function MarfPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/marf#webpage`,
        url: `${SITE_URL}/${safeLocale}/marf`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/${safeLocale}/marf#software`,
        name: "MARF",
        applicationCategory: "BusinessApplication",
        description: t.metaDesc,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${safeLocale}/marf#faq`,
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

      {/* 01 · HERO · ink */}
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
              <div className="cta-row">
                <Link className="btn btn-1" href={`${base}/roiometro`}>
                  {t.hero.cta}
                </Link>
              </div>
            </div>

            <div>
              <div className="quota">{t.hero.flussoTitolo}</div>
              <div className="catena" style={{ marginTop: 26 }}>
                {t.hero.flusso.map((v, i) => (
                  <div
                    className={`anello${i === t.hero.flusso.length - 1 ? " ultimo" : ""}`}
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

      {/* 02 · IL PROBLEMA · CARTA, i frammenti */}
      <section className="band carta pg" id="problema">
        <div className="wrap">
          <div className="eye">{t.problema.eye}</div>
          <h2 className="h-sect">
            {t.problema.h2a}
            <span className="emph">{t.problema.h2emph}</span>
            {t.problema.h2b}
          </h2>
          <p className="lead">{t.problema.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.problema.p2}
          </p>

          <div className="frammenti">
            {t.problema.frammenti.map((f) => (
              <div className="frammento" key={f.r}>
                <div className="reparto">{f.r}</div>
                <div className="dato">{f.d}</div>
                <span className="monco">{f.m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · COS'E' MARF · ink, lo schema centrale */}
      <section className="band ink pg" id="cos-e">
        <div className="wrap">
          <div className="eye">{t.cose.eye}</div>
          <h2 className="h-sect">
            {t.cose.h2a}
            <span className="emph">{t.cose.h2emph}</span>
            {t.cose.h2b}
          </h2>
          <p className="lead">{t.cose.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.cose.p2}
          </p>

          <div className="quadro" style={{ marginTop: 40 }}>
            <div className="readout">
              <span>{t.cose.readout}</span>
              <span className="on">
                <i />
                {t.cose.stato}
              </span>
            </div>
            <SchemaCentrale
              ingressi={[...t.cose.ingressi]}
              centro="MARF"
              uscite={[...t.cose.uscite]}
            />
          </div>
        </div>
      </section>

      {/* 04 · LA CATENA OPERATIVA · ink */}
      <section className="band ink pg" id="catena">
        <div className="wrap">
          <div className="eye">{t.catena.eye}</div>
          <h2 className="h-sect">
            {t.catena.h2a}
            <span className="emph">{t.catena.h2emph}</span>
            {t.catena.h2b}
          </h2>
          <MappaLavoro tappe={[...t.catena.tappe]} />
        </div>
      </section>

      {/* 05 · LE TRE LOGICHE · CARTA */}
      <section className="band carta pg" id="logiche">
        <div className="wrap">
          <div className="eye">{t.logiche.eye}</div>
          <h2 className="h-sect">
            {t.logiche.h2a}
            <span className="emph">{t.logiche.h2emph}</span>
            {t.logiche.h2b}
          </h2>
          <div className="colonne">
            {t.logiche.colonne.map((c) => (
              <div className="colonna" key={c.n}>
                <span className="cifra-fondo" aria-hidden="true">
                  {c.n}
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · IL LAYER AI · ink */}
      <section className="band ink pg" id="layer-ai">
        <div className="wrap">
          <div className="eye">{t.ai.eye}</div>
          <h2 className="h-sect">
            {t.ai.h2a}
            <span className="emph">{t.ai.h2emph}</span>
            {t.ai.h2b}
          </h2>
          <p className="lead">{t.ai.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.ai.p2}
          </p>

          <div className="quadro" style={{ marginTop: 40 }}>
            <div className="readout">
              <span>{t.ai.readout}</span>
              <span className="on">
                <i />
                {t.ai.stato}
              </span>
            </div>
            <div className="tre-quadranti">
              {t.ai.voci.map((v) => (
                <div className="quadrante" key={v.k}>
                  <div className="cod">{v.k}</div>
                  <div className="titolo-quadrante">{v.t}</div>
                  <div className="quota" style={{ marginTop: 20 }} />
                  <p className="testo-quadrante">{v.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 · INTEGRAZIONI · ink, la convergenza */}
      <section className="band ink pg" id="integrazioni">
        <div className="wrap">
          <div className="eye">{t.integrazioni.eye}</div>
          <h2 className="h-sect">
            {t.integrazioni.h2a}
            <span className="emph">{t.integrazioni.h2emph}</span>
            {t.integrazioni.h2b}
          </h2>
          <p className="lead">{t.integrazioni.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.integrazioni.p2}
          </p>

          <div className="quadro" style={{ marginTop: 40 }}>
            <div className="readout">
              <span>{t.integrazioni.readout}</span>
              <span className="on">
                <i />
                {t.integrazioni.stato}
              </span>
            </div>
            <Convergenza
              strumenti={[...t.integrazioni.strumenti]}
              centro="MARF"
              reparti={[...t.integrazioni.reparti]}
            />
          </div>
        </div>
      </section>

      {/* 08 · COSA NON E' · CARTA, confronto netto */}
      <section className="band carta pg" id="cosa-non-e">
        <div className="wrap">
          <div className="eye">{t.nonE.eye}</div>
          <div className="negazioni">
            {t.nonE.negazioni.map((n) => (
              <div className="negazione" key={n}>
                <span className="taglio" aria-hidden="true" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <h2 className="h-sect" style={{ marginTop: 48 }}>
            {t.nonE.h2a}
            <span className="emph">{t.nonE.h2emph}</span>
            {t.nonE.h2b}
          </h2>
          <p className="lead">{t.nonE.p}</p>
        </div>
      </section>

      {/* 09 · CTA · ink */}
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

      {/* 10 · FAQ · ink */}
      <section className="band ink pg" id="faq">
        <div className="wrap">
          <div className="eye">{t.faq.eye}</div>
          <h2 className="h-sect">{t.faq.titolo}</h2>
          <div className="two" style={{ marginTop: 34, alignItems: "start" }}>
            {[t.faq.voci.slice(0, 3), t.faq.voci.slice(3)].map((colonna, i) => (
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
