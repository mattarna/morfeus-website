import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { MappaLavoro } from "@/components/pagine/metodo/MappaLavoro";
import "@/components/pagine/kit.css";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

/* ============================================================
   METODO. Rifatta sul copy approvato 2026-07-28.
   ------------------------------------------------------------
   LE FASCE seguono un principio, non un'alternanza decorativa:
   la CARTA e' il registro del DOCUMENTO. Va sulle tre sezioni che
   un documento lo sono davvero:
     03  il caso reale        un dossier
     05  il perimetro         un confronto, due colonne a stampa
     07  il patto             un contratto, tre clausole
   Tutto il resto resta inchiostro, che e' la voce che parla.
   Cosi' ogni stacco annuncia un cambio di natura del discorso.

   I DISPOSITIVI arrivano dalla direzione visiva del brief, uno per
   uno: catena nell'hero, colonne editoriali (non card) nel metodo,
   dossier nel caso, mappa scroll-driven con rail, confronto
   asimmetrico, mockup sobrio del Value Report, patto contrattuale.

   Una sola isola client: il rail della mappa. Le cinque tappe sono
   server rendered e stanno nel DOM anche senza JavaScript.
   ============================================================ */

type Props = { params: { locale: string } };

const COPY = {
  it: {
    metaTitle: "Il Metodo Morfeus · Come portiamo l'AI nei processi",
    metaDesc:
      "Il Metodo Morfeus parte da dove perdi valore, non da un tool: mappatura del Value Leak, AI Champion, Context Hub, agenti in produzione e valore verificato nel Value Report.",
    hero: {
      eye: "Il metodo di lavoro Morfeus",
      h1a: "L'AI non crea valore da sola. Lo crea quando cambia il modo in cui ",
      h1emph: "l'azienda lavora",
      h1b: ".",
      copy: "Morfeus prende il sapere del tuo team, lo trasmette all'AI e lo trasforma in sistemi che supportano nei processi di tutti i giorni. Il valore recuperato viene verificato, migliorato e poi esteso dove conta.",
      cta1: "Prenota una call di diagnosi",
      cta2: "Scopri il metodo",
      catenaTitolo: "La catena",
      catena: [
        { v: "Value Leak", n: "dove il margine esce" },
        { v: "Il sapere del team", n: "chi conosce il lavoro" },
        { v: "Context Hub", n: "il sapere diventa base" },
        { v: "Agenti AI", n: "il sapere diventa azione" },
        { v: "Valore misurato", n: "verificato, non promesso" },
      ],
    },
    metodo: {
      eye: "Il Metodo Morfeus",
      h2a: "Non partiamo dall'AI. Partiamo da ",
      h2emph: "dove perdi valore",
      h2b: ".",
      lead: "Non partiamo da un tool da installare. Partiamo da un punto preciso in cui persone, informazioni e processi stanno già facendo perdere margine. Da lì costruiamo un sistema che resta in azienda, viene usato dalle persone e migliora nel tempo.",
      colonne: [
        {
          n: "01",
          t: "Prima il margine. Poi la tecnologia.",
          p: "Non iniziamo chiedendoci dove mettere l'AI. Entriamo nei processi, individuiamo il Value Leak e lo traduciamo in un numero. Solo quando sappiamo quale valore va recuperato scegliamo cosa costruire.",
        },
        {
          n: "02",
          t: "Il sapere delle persone diventa un sistema.",
          p: "L'AI non sostituisce chi conosce il lavoro. Rende quel sapere disponibile, replicabile e utilizzabile da tutto il team. Formiamo gli AI Champion, raccogliamo procedure, contesto e regole operative e li rendiamo parte del Context Hub aziendale.",
        },
        {
          n: "03",
          t: "In produzione. Misurato. Migliorato.",
          p: "Un progetto non vale perché è stato presentato, né perché una demo ha funzionato una volta. Vale quando entra nei processi reali, aiuta il team ogni giorno e produce un risultato verificabile. Per questo mettiamo in produzione, misuriamo nel Value Report e rafforziamo ciò che funziona.",
        },
      ],
    },
    caso: {
      eye: "Un sistema vale quando risolve un problema reale",
      h2a: "Un report tecnico non doveva restare ",
      h2emph: "un report",
      h2b: ".",
      p1: "In Cyberangels, le informazioni necessarie per proporre servizi di sicurezza erano bloccate in documenti tecnici difficili da usare per un commerciale. Ogni conversazione richiedeva passaggi, interpretazioni e il coinvolgimento di chi conosceva già il tema.",
      p2: "Abbiamo trasformato quel sapere in un sistema che legge il contesto, struttura un brief utile alla vendita e segnala quando le informazioni non sono sufficienti per procedere.",
      p3: "Il risultato non è un documento più bello. È un team che può iniziare conversazioni commerciali più preparate, senza dipendere ogni volta da una singola persona tecnica.",
      readout: "Dossier · Cyberangels",
      stato: "Verificato",
      passi: ["Value leak", "Sistema", "Valore"],
      stazioni: [
        "Il sapere tecnico restava separato da chi doveva usarlo.",
        "Le informazioni diventano un brief operativo, con regole e controlli.",
        "Meno passaggi. Più autonomia. Una conversazione commerciale che parte dal contesto giusto.",
      ],
      cta: "Leggi il caso completo",
    },
    lavoro: {
      eye: "Dal primo confronto al valore che si accumula",
      h2a: "Il metodo è sempre lo stesso. Ciò che costruiamo ",
      h2emph: "cambia con la tua azienda",
      h2b: ".",
      lead: "Non applichiamo un pacchetto standard. Seguiamo una sequenza precisa per capire dove intervenire, coinvolgere le persone giuste e mettere in produzione un sistema che abbia un impatto concreto.",
      tappe: [
        {
          id: "mappatura",
          indice: "01 · Mappatura",
          titolo: "Troviamo il costo prima del tool.",
          testo: "Parliamo con le persone, osserviamo i flussi, mettiamo in fila dati, decisioni e passaggi operativi. Il ROIometro serve a isolare il Value Leak: dove il margine si sta già perdendo e dove ha senso intervenire.",
        },
        {
          id: "ai-champion",
          indice: "02 · AI Champion",
          titolo: "Partiamo da chi il lavoro lo conosce.",
          testo: "Le persone non sono un ostacolo all'adozione. Sono la fonte del sistema. Formiamo gli AI Champion e lavoriamo con chi conosce davvero il processo, così l'AI nasce dal lavoro reale e non da ipotesi fatte dall'esterno.",
        },
        {
          id: "context-hub",
          indice: "03 · Context Hub",
          titolo: "Il know-how smette di restare nella testa di pochi.",
          testo: "Procedure, regole, informazioni e contesto operativo vengono raccolti e resi utilizzabili dentro MARF, il Context Hub aziendale. Il sapere non resta disperso tra file, chat e persone chiave: diventa una base su cui il team può lavorare.",
        },
        {
          id: "agenti-ai",
          indice: "04 · Agenti AI",
          titolo: "Il sapere diventa azione.",
          testo: "Costruiamo e mettiamo in produzione gli agenti AI nei punti in cui servono davvero. Non chatbot da mostrare in una demo, ma sistemi con un compito chiaro, regole chiare e un ruolo dentro il processo.",
        },
        {
          id: "compound",
          indice: "05 · Compound",
          titolo: "Ciò che funziona non resta isolato.",
          testo: "Quando un sistema dimostra valore, lo miglioriamo, lo rendiamo più affidabile e lo estendiamo dove può generare un impatto ulteriore. Il valore non si ferma al primo progetto: si accumula dentro l'organizzazione.",
        },
      ],
    },
    perimetro: {
      eye: "Un problema alla volta. Ma quello giusto.",
      h2a: "Non trasformiamo tutto. Risolviamo prima ciò che ",
      h2emph: "ti sta costando",
      h2b: ".",
      p1: "Un'azienda non ha bisogno di una roadmap infinita sull'AI. Ha bisogno di capire dove intervenire per primo, costruire qualcosa che venga davvero usato e verificare che stia generando valore.",
      p2: "Per questo scegliamo un perimetro ristretto, ma ad alto impatto. È il modo più rapido per togliere rischio, coinvolgere il team e separare un sistema utile da un progetto che finisce in una presentazione.",
      testaNo: "Non facciamo",
      testaSi: "Facciamo",
      righe: [
        ["Audit che producono solo slide", "Mappature che identificano un Value Leak"],
        ["Tool distribuiti senza contesto", "Sistemi integrati in un processo reale"],
        ["Formazione senza applicazione", "AI Champion che lavorano su casi concreti"],
        ["Pilot senza conseguenze", "Sistemi messi in produzione e misurati"],
      ],
    },
    report: {
      eye: "Il valore non è una sensazione",
      h2a: "Ogni mese una domanda: cosa ha ",
      h2emph: "recuperato questo sistema",
      h2b: "?",
      p1: "Implementare non basta. Un sistema AI deve dimostrare di stare liberando tempo, riducendo passaggi inutili, migliorando decisioni o moltiplicando l'output del team.",
      p2: "Il Value Report rende visibile questo impatto. Guardiamo cosa sta funzionando, dove il sistema va migliorato e dove esiste spazio per estendere il valore. Se non possiamo verificarlo, non lo chiamiamo risultato.",
      readout: "Value Report · cadenza mensile",
      stato: "Verificabile",
      indicatori: [
        { nome: "Ore recuperate", misura: "tempo restituito al team" },
        { nome: "Costi ottimizzati", misura: "spesa che non serviva più" },
        { nome: "Output moltiplicato", misura: "stesso organico, più lavoro" },
        { nome: "Decisioni accelerate", misura: "tempo fra domanda e scelta" },
      ],
      nota: "Nessuna percentuale che non possiamo mostrarti da dove viene.",
    },
    patto: {
      eye: "Prima la prova. Poi la scala.",
      h2a: "Non ti chiediamo di crederci. Ti chiediamo di ",
      h2emph: "guardarlo funzionare",
      h2b: ".",
      p1: "Prima capiamo se esiste un Value Leak concreto e se possiamo intervenire con un sistema utile. Poi lavoriamo su un perimetro definito, con le persone coinvolte e criteri chiari per valutare il risultato.",
      p2: "Solo ciò che funziona entra nel passo successivo. Questo protegge il tuo investimento, evita progetti infiniti e ci obbliga a lavorare sul valore, non sulle promesse.",
      clausole: [
        "Partiamo da un problema che si può osservare e misurare.",
        "Costruiamo sistemi che restano nella tua azienda.",
        "Estendiamo solo ciò che ha dimostrato di funzionare.",
      ],
    },
    cta: {
      eye: "Il primo passo non è una demo",
      h2a: "Dove stai perdendo margine ",
      h2emph: "senza accorgertene",
      h2b: "?",
      p: "Prenota una call di diagnosi. Guardiamo insieme i processi in cui il valore si blocca, si disperde o dipende ancora dalla testa di poche persone. Se c'è un Value Leak su cui intervenire, saprai da dove iniziare.",
      btn: "Prenota una call di diagnosi",
      micro: "Nessuna demo generica. Nessuna roadmap preconfezionata. Solo un problema concreto da capire.",
    },
    faq: {
      eye: "Domande",
      titolo: "Il Metodo, in chiaro.",
      voci: [
        {
          q: "Cos'è il Metodo Morfeus?",
          a: "Il Metodo Morfeus è un approccio per introdurre l'AI nei processi aziendali partendo da un problema operativo misurabile. Prima identifica il Value Leak, poi attiva le persone e il know-how, mette in produzione sistemi AI e ne verifica il valore nel tempo.",
        },
        {
          q: "Da dove parte un progetto AI con Morfeus?",
          a: "Parte dalla mappatura di un processo in cui valore, tempo o informazioni si stanno disperdendo. Non dalla scelta di un tool. L'obiettivo iniziale è capire se esiste un Value Leak concreto su cui intervenire.",
        },
        {
          q: "Che ruolo ha MARF nel Metodo Morfeus?",
          a: "MARF è il Context Hub in cui procedure, regole, informazioni e contesto operativo vengono resi utilizzabili dai sistemi AI. Permette al sapere aziendale di non restare disperso tra persone, file e conversazioni.",
        },
        {
          q: "Chi sono gli AI Champion?",
          a: "Gli AI Champion sono le persone dell'azienda che conoscono i processi da vicino e imparano a lavorare con l'AI sui casi reali. Il loro ruolo è rendere il sistema utile, adottato e radicato nell'operatività quotidiana.",
        },
        {
          q: "L'AI sostituisce le persone?",
          a: "No. Il Metodo Morfeus usa l'AI per togliere lavoro ripetitivo, rendere il know-how disponibile e aumentare l'autonomia del team. Le persone che conoscono il processo restano centrali nella costruzione e nell'evoluzione del sistema.",
        },
        {
          q: "Come viene misurato il valore di un sistema AI?",
          a: "Attraverso il Value Report. Morfeus verifica gli effetti del sistema sul processo, come ore recuperate, costi ottimizzati, output moltiplicato o decisioni accelerate. Se il valore non è verificabile, il sistema va migliorato prima di essere esteso.",
        },
      ],
    },
  },
  en: {
    metaTitle: "The Morfeus Method · How we bring AI into workflows",
    metaDesc:
      "The Morfeus Method starts where you are losing value, not with a tool: Value Leak mapping, AI Champions, Context Hub, agents in production and value verified in the Value Report.",
    hero: {
      eye: "The Morfeus way of working",
      h1a: "AI does not create value on its own. It creates value when it changes ",
      h1emph: "how a company works",
      h1b: ".",
      copy: "Morfeus takes your team's know-how, transfers it into AI and turns it into systems that support everyday work. The value recovered is verified, improved and extended where it matters most.",
      cta1: "Book a diagnostic call",
      cta2: "Explore the method",
      catenaTitolo: "The chain",
      catena: [
        { v: "Value Leak", n: "where margin leaks out" },
        { v: "The team's know-how", n: "the people who know the work" },
        { v: "Context Hub", n: "know-how becomes a base" },
        { v: "AI agents", n: "know-how becomes action" },
        { v: "Measured value", n: "verified, not promised" },
      ],
    },
    metodo: {
      eye: "The Morfeus Method",
      h2a: "We do not start with AI. We start with ",
      h2emph: "where you are losing value",
      h2b: ".",
      lead: "We do not begin with a tool to install. We begin with a specific point where people, information and processes are already eroding margin. From there, we build a system that stays in the company, is used by the people who do the work and improves over time.",
      colonne: [
        {
          n: "01",
          t: "Margin first. Technology second.",
          p: "We do not begin by asking where AI should go. We go inside the workflow, identify the Value Leak and put a number on it. Only once we know what value needs to be recovered do we decide what to build.",
        },
        {
          n: "02",
          t: "People's know-how becomes a system.",
          p: "AI does not replace the people who know the work. It makes their knowledge available, repeatable and useful to the whole team. We train AI Champions, gather procedures, context and operating rules, and turn them into part of the company's Context Hub.",
        },
        {
          n: "03",
          t: "In production. Measured. Improved.",
          p: "A project is not valuable because it was presented, or because a demo worked once. It is valuable when it enters real workflows, helps the team every day and produces a verifiable result. That is why we put systems into production, measure them through the Value Report and strengthen what works.",
        },
      ],
    },
    caso: {
      eye: "A system matters when it solves a real problem",
      h2a: "A technical report was never meant to ",
      h2emph: "stay a report",
      h2b: ".",
      p1: "At Cyberangels, the information needed to sell security services was locked inside technical documents that a salesperson could not easily use. Every conversation required handoffs, interpretation and the involvement of someone who already knew the subject.",
      p2: "We turned that knowledge into a system that reads the context, creates a sales-ready brief and flags when there is not enough information to proceed.",
      p3: "The outcome is not a nicer document. It is a team that can start better-prepared sales conversations without having to depend on the same technical person every time.",
      readout: "Dossier · Cyberangels",
      stato: "Verified",
      passi: ["Value leak", "System", "Value"],
      stazioni: [
        "Technical knowledge was separated from the people who needed to use it.",
        "Information becomes an operational brief, with rules and controls built in.",
        "Fewer handoffs. More autonomy. Sales conversations that start from the right context.",
      ],
      cta: "Read the full case",
    },
    lavoro: {
      eye: "From the first conversation to compounding value",
      h2a: "The method stays the same. What we build ",
      h2emph: "changes with your company",
      h2b: ".",
      lead: "We do not apply a standard package. We follow a clear sequence to understand where to intervene, involve the right people and put a system into production that makes a concrete difference.",
      tappe: [
        {
          id: "mappatura",
          indice: "01 · Mapping",
          titolo: "Find the cost before the tool.",
          testo: "We speak to the people, observe the workflows and map the data, decisions and operating handoffs. ROIometro isolates the Value Leak: where margin is already being lost and where intervention makes sense.",
        },
        {
          id: "ai-champion",
          indice: "02 · AI Champions",
          titolo: "Start with the people who know the work.",
          testo: "People are not an obstacle to adoption. They are the source of the system. We train AI Champions and work with the people closest to the process, so AI is built around reality rather than outside assumptions.",
        },
        {
          id: "context-hub",
          indice: "03 · Context Hub",
          titolo: "Know-how stops living in a few heads.",
          testo: "Procedures, rules, information and operating context are gathered and made usable inside MARF, the company's Context Hub. Knowledge stops being scattered across files, chats and key people and becomes a base the team can work from.",
        },
        {
          id: "agenti-ai",
          indice: "04 · AI agents",
          titolo: "Know-how becomes action.",
          testo: "We build and deploy AI agents where they are genuinely useful. Not chatbots made for a demo, but systems with a clear job, clear rules and a defined role inside a workflow.",
        },
        {
          id: "compound",
          indice: "05 · Compound",
          titolo: "What works does not stay isolated.",
          testo: "When a system proves its value, we improve it, make it more reliable and extend it where it can create further impact. Value does not stop at the first project. It compounds inside the organisation.",
        },
      ],
    },
    perimetro: {
      eye: "One problem at a time. The right one.",
      h2a: "We do not transform everything. We solve ",
      h2emph: "what is costing you first",
      h2b: ".",
      p1: "Your company does not need an endless AI roadmap. It needs to know where to intervene first, build something people will actually use and verify that it is creating value.",
      p2: "That is why we choose a narrow, high-impact scope. It is the fastest way to reduce risk, involve the team and separate a useful system from a project that ends in a presentation.",
      testaNo: "We do not do",
      testaSi: "We do",
      righe: [
        ["Audits that produce slides only", "Mapping that identifies a Value Leak"],
        ["Tools handed out without context", "Systems embedded in a real workflow"],
        ["Training without application", "AI Champions working on real cases"],
        ["Pilots without consequences", "Systems deployed and measured"],
      ],
    },
    report: {
      eye: "Value is not a feeling",
      h2a: "One question, every month: what has this ",
      h2emph: "system recovered",
      h2b: "?",
      p1: "Implementation is not enough. An AI system has to show that it is freeing time, removing unnecessary handoffs, improving decisions or multiplying the team's output.",
      p2: "The Value Report makes that impact visible. We look at what is working, where the system needs improving and where there is room to extend the value. If we cannot verify it, we do not call it a result.",
      readout: "Value Report · monthly cadence",
      stato: "Verifiable",
      indicatori: [
        { nome: "Hours recovered", misura: "time given back to the team" },
        { nome: "Costs optimised", misura: "spend that was no longer needed" },
        { nome: "Output multiplied", misura: "same headcount, more work" },
        { nome: "Decisions accelerated", misura: "time between question and choice" },
      ],
      nota: "No percentage we cannot show you the source of.",
    },
    patto: {
      eye: "Proof first. Scale second.",
      h2a: "We do not ask you to believe us. We ask you to ",
      h2emph: "watch it work",
      h2b: ".",
      p1: "First, we establish whether there is a concrete Value Leak and whether a useful system can address it. Then we work within a defined scope, with the right people involved and clear criteria for evaluating the result.",
      p2: "Only what works moves to the next step. That protects your investment, avoids endless projects and keeps us accountable to value rather than promises.",
      clausole: [
        "We start with a problem that can be observed and measured.",
        "We build systems that stay inside your company.",
        "We extend only what has proven it works.",
      ],
    },
    cta: {
      eye: "The first step is not a demo",
      h2a: "Where are you losing margin ",
      h2emph: "without realising it",
      h2b: "?",
      p: "Book a diagnostic call. We will look at the workflows where value is getting stuck, leaking away or still depends on the knowledge of a few people. If there is a Value Leak worth addressing, you will know where to begin.",
      btn: "Book a diagnostic call",
      micro: "No generic demo. No off-the-shelf roadmap. Just a real problem worth understanding.",
    },
    faq: {
      eye: "Questions",
      titolo: "The Method, in plain terms.",
      voci: [
        {
          q: "What is the Morfeus Method?",
          a: "The Morfeus Method is an approach to bringing AI into a company through a measurable operating problem. It identifies the Value Leak first, activates the people and know-how around it, deploys AI systems and verifies the value over time.",
        },
        {
          q: "Where does an AI project with Morfeus start?",
          a: "It starts by mapping a workflow where value, time or information is being lost. Not by choosing a tool.",
        },
        {
          q: "What role does MARF play?",
          a: "MARF is the Context Hub where procedures, rules, information and operating context are made usable by AI systems.",
        },
        {
          q: "Who are AI Champions?",
          a: "AI Champions are the people who know their workflows first-hand and learn to work with AI on real cases. They make the system useful, adopted and embedded in daily operations.",
        },
        {
          q: "Will AI replace people?",
          a: "No. It removes repetitive work, makes know-how available and increases team autonomy. People remain central to how systems are built and improved.",
        },
        {
          q: "How is value measured?",
          a: "Through the Value Report: Morfeus verifies outcomes such as hours recovered, costs optimised, output multiplied and decisions accelerated.",
        },
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
    alternates: buildLocaleAlternates("metodo", safeLocale),
    openGraph: {
      images: [`${SITE_URL}/opengraph-image.png`],
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/metodo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc , images: [`${SITE_URL}/opengraph-image.png`]},
  };
}

export default function MetodoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${safeLocale}/metodo#webpage`,
        url: `${SITE_URL}/${safeLocale}/metodo`,
        name: t.metaTitle,
        description: t.metaDesc,
        inLanguage: isIt ? "it-IT" : "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/${safeLocale}/metodo#howto`,
        name: t.metodo.h2a + t.metodo.h2emph,
        description: t.metodo.lead,
        step: t.lavoro.tappe.map((tp, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: tp.titolo,
          text: tp.testo,
          url: `${SITE_URL}/${safeLocale}/metodo#${tp.id}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${safeLocale}/metodo#faq`,
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
                  {t.hero.cta1}
                </Link>
                <a className="btn btn-2-carta" href="#metodo">
                  {t.hero.cta2}
                </a>
              </div>
            </div>

            <div>
              <div className="quota">{t.hero.catenaTitolo}</div>
              <div className="catena" style={{ marginTop: 26 }}>
                {t.hero.catena.map((a, i) => (
                  <div
                    className={`anello${i === 0 ? " perdita" : ""}${
                      i === t.hero.catena.length - 1 ? " ultimo" : ""
                    }`}
                    key={a.v}
                  >
                    <span className="segno">{`0${i + 1}`}</span>
                    <span>
                      <span className="voce-catena">{a.v}</span>
                      <span className="nota-catena">{a.n}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · IL METODO · ink */}
      <section className="band ink pg" id="metodo">
        <div className="wrap">
          <div className="eye">{t.metodo.eye}</div>
          <h2 className="h-sect">
            {t.metodo.h2a}
            <span className="emph">{t.metodo.h2emph}</span>
            {t.metodo.h2b}
          </h2>
          <p className="lead">{t.metodo.lead}</p>

          <div className="colonne">
            {t.metodo.colonne.map((c) => (
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

      {/* 03 · CASO REALE · CARTA, e' un dossier */}
      <section className="band carta pg" id="caso">
        <div className="wrap">
          <div className="eye">{t.caso.eye}</div>
          <h2 className="h-sect">
            {t.caso.h2a}
            <span className="emph">{t.caso.h2emph}</span>
            {t.caso.h2b}
          </h2>
          <div className="read" style={{ margin: 0 }}>
            <p className="lead">{t.caso.p1}</p>
            <p className="lead" style={{ marginTop: 18 }}>
              {t.caso.p2}
            </p>
            <p className="lead" style={{ marginTop: 18 }}>
              {t.caso.p3}
            </p>
          </div>

          <div className="quadro" style={{ marginTop: 44 }}>
            <div className="readout">
              <span>{t.caso.readout}</span>
              <span className="on">
                <i />
                {t.caso.stato}
              </span>
            </div>
            <div className="dossier dossier-tre">
              {t.caso.stazioni.map((s, i) => (
                <div className="stazione" key={s}>
                  <div className="passo">{t.caso.passi[i]}</div>
                  <div className="valore">{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-row">
            <Link className="btn btn-1" href={`${base}/casi/cyberangels-sales-advisor`}>
              {t.caso.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 04 · IL MODO DI LAVORARE · ink */}
      <section className="band ink pg" id="come-lavoriamo">
        <div className="wrap">
          <div className="eye">{t.lavoro.eye}</div>
          <h2 className="h-sect">
            {t.lavoro.h2a}
            <span className="emph">{t.lavoro.h2emph}</span>
            {t.lavoro.h2b}
          </h2>
          <p className="lead">{t.lavoro.lead}</p>

          <MappaLavoro tappe={[...t.lavoro.tappe]} />
        </div>
      </section>

      {/* 05 · PERIMETRO · CARTA, e' un confronto a stampa */}
      <section className="band carta pg" id="perimetro">
        <div className="wrap">
          <div className="eye">{t.perimetro.eye}</div>
          <h2 className="h-sect">
            {t.perimetro.h2a}
            <span className="emph">{t.perimetro.h2emph}</span>
            {t.perimetro.h2b}
          </h2>
          <p className="lead">{t.perimetro.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.perimetro.p2}
          </p>

          <div className="confronto">
            <div className="colonna-testa">{t.perimetro.testaNo}</div>
            <div className="colonna-testa si">{t.perimetro.testaSi}</div>
            {t.perimetro.righe.map(([no, si]) => (
              <ContrastoRiga key={si} no={no} si={si} />
            ))}
          </div>
        </div>
      </section>

      {/* 06 · VALUE REPORT · ink */}
      <section className="band ink pg" id="value-report">
        <div className="wrap">
          <div className="eye">{t.report.eye}</div>
          <h2 className="h-sect">
            {t.report.h2a}
            <span className="emph">{t.report.h2emph}</span>
            {t.report.h2b}
          </h2>
          <p className="lead">{t.report.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.report.p2}
          </p>

          <div className="quadro indicatori-verde" style={{ marginTop: 40 }}>
            <div className="readout">
              <span>{t.report.readout}</span>
              <span className="on">
                <i />
                {t.report.stato}
              </span>
            </div>
            <div className="indicatori">
              {t.report.indicatori.map((ind) => (
                <div className="indicatore" key={ind.nome}>
                  <div className="nome">{ind.nome}</div>
                  <span className="misura">{ind.misura}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="compound centrato" style={{ marginTop: 30 }}>
            {t.report.nota}
          </p>
        </div>
      </section>

      {/* 07 · IL PATTO · CARTA, e' un contratto */}
      <section className="band carta pg" id="patto">
        <div className="wrap">
          <div className="eye">{t.patto.eye}</div>
          <h2 className="h-sect">
            {t.patto.h2a}
            <span className="emph">{t.patto.h2emph}</span>
            {t.patto.h2b}
          </h2>
          <p className="lead">{t.patto.p1}</p>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.patto.p2}
          </p>

          <div className="patto">
            {t.patto.clausole.map((c, i) => (
              <div className="clausola" key={c}>
                <span className="sigla">{`Art. 0${i + 1}`}</span>
                <span className="testo-clausola">{c}</span>
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
            </div>
            <p className="quota" style={{ marginTop: 30, justifyContent: "center" }}>
              {t.cta.micro}
            </p>
          </div>
        </div>
      </section>

      {/* 09 · FAQ · ink */}
      <section className="band ink pg" id="faq">
        <div className="wrap">
          <div className="eye">{t.faq.eye}</div>
          <h2 className="h-sect">{t.faq.titolo}</h2>
          <div className="two mt-10 items-start" style={{ marginTop: 34 }}>
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

/* Le due celle di una riga del confronto. Componente minuscolo, ma
   serve: dentro una griglia CSS le due celle devono essere fratelli
   diretti, quindi non possono stare dentro un <div> di riga. */
function ContrastoRiga({ no, si }: { no: string; si: string }) {
  return (
    <>
      <div className="riga-no">{no}</div>
      <div className="riga-si">{si}</div>
    </>
  );
}
