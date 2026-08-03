/* Percorsi e lezioni di "Impara l'AI", estratti dal prototipo
   design-v2/impara-ai.html. 4 percorsi, 18 lezioni, in due lingue.

   Stanno in un file loro: la stessa lista alimenta il JSON-LD (FAQPage) e
   dentro la pagina renderebbe illeggibile tutto il resto.

   NOTA: tre rimandi al glossario sono corretti rispetto al prototipo. La',
   impara-ai puntava a slug italiani (#agente-ai, #ai-generativa,
   #allucinazioni) mentre il glossario usa quelli inglesi (#ai-agents,
   #generative-ai, #hallucination): i tre link non avrebbero portato da
   nessuna parte.

   INGLESE (2026-08-03). La pagina esisteva gia' in due lingue, ma solo
   l'involucro (hero, CTA, metadati) era tradotto: le 18 lezioni, cioe' il
   contenuto vero, arrivavano da una lista sola in italiano. Su
   /impara-ai (senza prefisso, quindi inglese) si leggeva un titolo
   inglese e sotto diciotto domande in italiano. Ora le liste sono due e
   la pagina sceglie in base al locale.

   Restano identici fra le due lingue, apposta:
   - gli `id`: sono le chiavi del progresso in localStorage, e chi ha
     aperto una lezione in italiano non deve ritrovarla "da leggere" in
     inglese;
   - gli `anchor`: l'URL della pagina inglese e' gia' /impara-ai (slug
     italiano), e ancore diverse per lingua romperebbero i link esistenti;
   - gli `href` verso il glossario: le ancore delle voci sono le stesse
     nelle due lingue.

   Gli `href` verso gli articoli invece NO: da quando gli insights hanno
   slug inglesi propri (src/lib/insights-slugs.ts), il lato EN punta agli
   slug inglesi. Se cambia uno slug la' , va cambiato anche qui. */

export type ImparaLezione = {
  /** chiave stabile: e' quella salvata nel progresso locale */
  id: string;
  /** ancora nell'URL: /impara-ai#<anchor> */
  anchor: string;
  /** numero mostrato a sinistra della domanda */
  n: string;
  /** la domanda */
  q: string;
  /** la risposta */
  a: string;
  /** rimando al glossario, solo per alcune lezioni */
  gloss?: { href: string; label: string };
};

export type ImparaPercorso = {
  id: string;
  eye: string;
  titolo: string;
  intro: string;
  livello: string;
  durata: string;
  lezioni: ImparaLezione[];
};

export const PERCORSI_IT: ImparaPercorso[] = [
  {
    id: "basi",
    eye: "Percorso 01",
    titolo: "Le basi dell'AI",
    intro: "Cosa c'è davvero dietro le parole che senti ogni giorno. Per chi parte da zero e vuole capire prima di usare.",
    livello: "Livello base",
    durata: "5 lezioni · ~8 min",
    lezioni: [
      {
        id: "b1",
        anchor: "cos-e-intelligenza-artificiale",
        n: "01",
        q: "Cos'è l'intelligenza artificiale, in parole semplici?",
        a: "È un software che impara dai dati invece di seguire regole scritte a mano. Gli mostri esempi e lui impara a riconoscere schemi e a produrre risposte. Non \"capisce\" come noi: riconosce e prevede, ma lo fa così bene da risultare utile.",
      },
      {
        id: "b2",
        anchor: "cos-e-ai-generativa",
        n: "02",
        q: "Cos'è l'AI generativa e cosa la rende diversa?",
        a: "È l'AI che crea contenuti nuovi: testo, immagini, codice. Mentre l'AI \"classica\" classifica o prevede, quella generativa produce. È la tecnologia dietro ChatGPT e Claude.",
        gloss: { href: "/glossario#generative-ai", label: "Vedi nel glossario" },
      },
      {
        id: "b3",
        anchor: "cos-e-un-llm",
        n: "03",
        q: "Cos'è un LLM e come \"ragiona\"?",
        a: "Un Large Language Model è addestrato su enormi quantità di testo. Non pensa: prevede, parola dopo parola, qual è la più probabile. Sembra ragionamento perché lo fa con una precisione altissima.",
        gloss: { href: "/glossario#llm", label: "Vedi nel glossario" },
      },
      {
        id: "b4",
        anchor: "cosa-sono-i-prompt",
        n: "04",
        q: "Cosa sono i prompt e perché contano?",
        a: "Il prompt è l'istruzione che dai all'AI. Non è una domanda, è una delega: più è chiara e contestualizzata, migliore è il risultato. Scrivere buoni prompt è la prima competenza pratica da costruire.",
      },
      {
        id: "b5",
        anchor: "allucinazioni-fidarsi",
        n: "05",
        q: "Di cosa ci si può fidare? Il problema delle allucinazioni",
        a: "L'AI può produrre risposte false con grande sicurezza: si chiamano allucinazioni. Non è un difetto raro, è un comportamento da conoscere. Per questo dati affidabili e verifica umana restano fondamentali.",
        gloss: { href: "/glossario#hallucination", label: "Vedi nel glossario" },
      },
    ],
  },
  {
    id: "lavoro",
    eye: "Percorso 02",
    titolo: "Usare l'AI nel lavoro",
    intro: "Dalla teoria alla pratica: come l'AI entra davvero nei processi di un'azienda. Per chi vuole diventare operativo.",
    livello: "Livello base",
    durata: "5 lezioni · ~10 min",
    lezioni: [
      {
        id: "l1",
        anchor: "da-dove-si-parte-ai-azienda",
        n: "01",
        q: "Da dove si parte con l'AI in un'azienda?",
        a: "Non dagli strumenti, ma dai problemi. Si guarda dove si perde tempo, dove gli errori costano, dove i dati non fluiscono: lì l'AI rende. Partire da \"quale tool compro\" è il modo più rapido per sprecare budget.",
      },
      {
        id: "l2",
        anchor: "cos-e-un-agente-ai",
        n: "02",
        q: "Cos'è un agente AI, e in cosa è diverso da un chatbot?",
        a: "Un chatbot risponde. Un agente AI agisce: ha un obiettivo, usa strumenti e porta a termine un compito (preparare un preventivo, aggiornare il CRM). È il salto da \"parla\" a \"fa\".",
        gloss: { href: "/glossario#ai-agents", label: "Vedi nel glossario" },
      },
      {
        id: "l3",
        anchor: "cosa-automatizzare-oggi",
        n: "03",
        q: "Cosa si può automatizzare davvero, oggi?",
        a: "Il lavoro ripetitivo e basato su regole: inserimento dati, prime bozze, sintesi di documenti, smistamento. Le decisioni complesse restano umane, ma l'AI le prepara e le accelera.",
      },
      {
        id: "l4",
        anchor: "come-tenere-dati-al-sicuro",
        n: "04",
        q: "Come si tengono i dati al sicuro?",
        a: "Scegliendo dove vivono i dati e chi vi accede. Le soluzioni embedded, che lavorano dentro l'infrastruttura aziendale, mantengono il controllo interno invece di spostarlo fuori.",
      },
      {
        id: "l5",
        anchor: "cos-e-ai-champion",
        n: "05",
        q: "Cos'è un \"AI Champion\" e perché serve?",
        a: "È una persona per reparto che diventa il riferimento AI interno: sperimenta, capisce cosa funziona e lo diffonde. Senza, l'AI resta un esperimento isolato; con, diventa una competenza dell'azienda.",
        gloss: { href: "/insights/competenze-ai-azienda-ai-champion", label: "Approfondisci" },
      },
    ],
  },
  {
    id: "costi",
    eye: "Percorso 03",
    titolo: "AI, costi e ROI",
    intro: "Le domande che si fa chi deve decidere e mettere i soldi. Senza promesse, con criteri.",
    livello: "Per chi decide",
    durata: "4 lezioni · ~8 min",
    lezioni: [
      {
        id: "r1",
        anchor: "quanto-costa-integrare-ai",
        n: "01",
        q: "Quanto costa integrare l'AI in azienda?",
        a: "Dipende dal problema, non da un listino. Il costo sensato si valuta contro quanto ti costa oggi il problema: se un processo perde X al mese, l'investimento si misura su quella perdita.",
      },
      {
        id: "r2",
        anchor: "come-misurare-roi-ai",
        n: "02",
        q: "Come si misura il ROI dell'AI?",
        a: "Definendo all'inizio criteri di valore oggettivi e verificandoli nel tempo. Il ROI non è \"quante ore di lavoro\", ma \"quanto valore generato in euro\", misurato mese per mese.",
        gloss: { href: "/insights/come-misurare-il-roi-dell-ai", label: "Approfondisci" },
      },
      {
        id: "r3",
        anchor: "dove-azienda-perde-valore",
        n: "03",
        q: "Dove un'azienda perde valore senza accorgersene?",
        a: "Nei processi: errori che si moltiplicano, tempo in attività ripetitive, dati frammentati. Sono i Value Leak, perdite invisibili che erodono il margine mentre cresci.",
        gloss: { href: "/insights/value-leak", label: "Leggi l'articolo" },
      },
      {
        id: "r4",
        anchor: "ai-tagliare-posti-lavoro",
        n: "04",
        q: "L'AI significa tagliare posti di lavoro?",
        a: "No, non necessariamente. L'uso più sensato toglie lo spreco e restituisce ore alle attività di valore: le persone fanno meno lavoro ripetitivo e più lavoro che conta.",
      },
    ],
  },
  {
    id: "pmi",
    eye: "Percorso 04",
    titolo: "AI per le PMI",
    intro: "Hai una piccola o media impresa e ti chiedi se l'AI faccia per te. Risposte concrete, senza hype.",
    livello: "PMI",
    durata: "4 lezioni · ~7 min",
    lezioni: [
      {
        id: "p1",
        anchor: "ai-serve-a-una-pmi",
        n: "01",
        q: "L'AI serve davvero a una PMI?",
        a: "Sì, ma non per \"fare l'AI\". Serve quando risolve un problema concreto: ridurre errori, accelerare la preventivazione, liberare tempo. Una PMI ha meno margine di spreco di una grande azienda, quindi il recupero pesa di più.",
      },
      {
        id: "p2",
        anchor: "quali-processi-attaccare-primi",
        n: "02",
        q: "Quali processi conviene attaccare per primi?",
        a: "Quelli ad alto volume e alta ripetitività, dove l'errore costa: preventivi, inserimento dati, customer support, reportistica. Si parte dove la perdita è grande e misurabile.",
      },
      {
        id: "p3",
        anchor: "saas-o-sistema-su-misura",
        n: "03",
        q: "SaaS o sistema su misura: cosa scegliere?",
        a: "Un SaaS è veloce ma uguale per tutti e vive fuori. Un sistema embedded lavora sui tuoi dati e migliora nel tempo, ma richiede un partner. La scelta dipende da quanto quel processo è strategico per te.",
      },
      {
        id: "p4",
        anchor: "come-partire-senza-team-tecnico",
        n: "04",
        q: "Come si parte senza un team tecnico?",
        a: "Con un perimetro piccolo e un partner che installa e gestisce, mentre una persona interna cresce come riferimento. Non serve assumere ingegneri per cominciare.",
      },
    ],
  },
];

export const PERCORSI_EN: ImparaPercorso[] = [
  {
    id: "basi",
    eye: "Path 01",
    titolo: "AI fundamentals",
    intro: "What is actually behind the words you hear every day. For anyone starting from zero who wants to understand before using.",
    livello: "Beginner",
    durata: "5 lessons · ~8 min",
    lezioni: [
      {
        id: "b1",
        anchor: "cos-e-intelligenza-artificiale",
        n: "01",
        q: "What is artificial intelligence, in plain words?",
        a: "It is software that learns from data instead of following hand-written rules. You show it examples and it learns to recognise patterns and produce answers. It does not \"understand\" the way we do: it recognises and predicts, but it does so well enough to be useful.",
      },
      {
        id: "b2",
        anchor: "cos-e-ai-generativa",
        n: "02",
        q: "What is generative AI and what makes it different?",
        a: "It is the AI that creates new content: text, images, code. While \"classic\" AI classifies or predicts, generative AI produces. It is the technology behind ChatGPT and Claude.",
        gloss: { href: "/glossario#generative-ai", label: "See in the glossary" },
      },
      {
        id: "b3",
        anchor: "cos-e-un-llm",
        n: "03",
        q: "What is an LLM and how does it \"reason\"?",
        a: "A Large Language Model is trained on enormous amounts of text. It does not think: it predicts, word after word, which one is most likely. It looks like reasoning because it does it with very high precision.",
        gloss: { href: "/glossario#llm", label: "See in the glossary" },
      },
      {
        id: "b4",
        anchor: "cosa-sono-i-prompt",
        n: "04",
        q: "What are prompts and why do they matter?",
        a: "The prompt is the instruction you give the AI. It is not a question, it is a delegation: the clearer and better framed it is, the better the result. Writing good prompts is the first practical skill to build.",
      },
      {
        id: "b5",
        anchor: "allucinazioni-fidarsi",
        n: "05",
        q: "What can you trust? The hallucination problem",
        a: "AI can produce false answers with great confidence: these are called hallucinations. It is not a rare defect, it is a behaviour you need to know about. That is why reliable data and human review remain essential.",
        gloss: { href: "/glossario#hallucination", label: "See in the glossary" },
      },
    ],
  },
  {
    id: "lavoro",
    eye: "Path 02",
    titolo: "Using AI at work",
    intro: "From theory to practice: how AI really enters a company's processes. For anyone who wants to become operational.",
    livello: "Beginner",
    durata: "5 lessons · ~10 min",
    lezioni: [
      {
        id: "l1",
        anchor: "da-dove-si-parte-ai-azienda",
        n: "01",
        q: "Where do you start with AI in a company?",
        a: "Not from the tools, from the problems. You look at where time is lost, where mistakes cost money, where data does not flow: that is where AI pays off. Starting from \"which tool do I buy\" is the fastest way to waste budget.",
      },
      {
        id: "l2",
        anchor: "cos-e-un-agente-ai",
        n: "02",
        q: "What is an AI agent, and how is it different from a chatbot?",
        a: "A chatbot answers. An AI agent acts: it has a goal, uses tools and completes a task (preparing a quote, updating the CRM). It is the jump from \"it talks\" to \"it does\".",
        gloss: { href: "/glossario#ai-agents", label: "See in the glossary" },
      },
      {
        id: "l3",
        anchor: "cosa-automatizzare-oggi",
        n: "03",
        q: "What can actually be automated today?",
        a: "Repetitive, rule-based work: data entry, first drafts, document summaries, routing. Complex decisions stay human, but AI prepares them and speeds them up.",
      },
      {
        id: "l4",
        anchor: "come-tenere-dati-al-sicuro",
        n: "04",
        q: "How do you keep data safe?",
        a: "By choosing where the data lives and who accesses it. Embedded solutions, which work inside the company infrastructure, keep control in-house instead of moving it outside.",
      },
      {
        id: "l5",
        anchor: "cos-e-ai-champion",
        n: "05",
        q: "What is an \"AI Champion\" and why do you need one?",
        a: "It is one person per department who becomes the internal AI reference: they experiment, work out what works and spread it. Without one, AI stays an isolated experiment; with one, it becomes a company capability.",
        gloss: { href: "/insights/ai-skills-and-the-ai-champion", label: "Go deeper" },
      },
    ],
  },
  {
    id: "costi",
    eye: "Path 03",
    titolo: "AI, cost and ROI",
    intro: "The questions asked by whoever has to decide and put the money in. No promises, just criteria.",
    livello: "For decision makers",
    durata: "4 lessons · ~8 min",
    lezioni: [
      {
        id: "r1",
        anchor: "quanto-costa-integrare-ai",
        n: "01",
        q: "How much does it cost to bring AI into a company?",
        a: "It depends on the problem, not on a price list. A sensible cost is judged against what the problem costs you today: if a process loses X per month, the investment is measured against that loss.",
      },
      {
        id: "r2",
        anchor: "come-misurare-roi-ai",
        n: "02",
        q: "How do you measure the ROI of AI?",
        a: "By defining objective value criteria up front and checking them over time. ROI is not \"how many hours of work\", it is \"how much value generated in euros\", measured month by month.",
        gloss: { href: "/insights/how-to-measure-ai-roi", label: "Go deeper" },
      },
      {
        id: "r3",
        anchor: "dove-azienda-perde-valore",
        n: "03",
        q: "Where does a company lose value without noticing?",
        a: "In its processes: mistakes that multiply, time spent on repetitive tasks, fragmented data. These are Value Leaks, invisible losses that erode your margin while you grow.",
        gloss: { href: "/insights/value-leak", label: "Read the article" },
      },
      {
        id: "r4",
        anchor: "ai-tagliare-posti-lavoro",
        n: "04",
        q: "Does AI mean cutting jobs?",
        a: "No, not necessarily. The most sensible use removes the waste and gives hours back to work that creates value: people do less repetitive work and more of the work that counts.",
      },
    ],
  },
  {
    id: "pmi",
    eye: "Path 04",
    titolo: "AI for small and medium businesses",
    intro: "You run a small or medium business and you wonder whether AI is for you. Concrete answers, no hype.",
    livello: "SMBs",
    durata: "4 lessons · ~7 min",
    lezioni: [
      {
        id: "p1",
        anchor: "ai-serve-a-una-pmi",
        n: "01",
        q: "Is AI really useful for a small business?",
        a: "Yes, but not for the sake of \"doing AI\". It is useful when it solves a concrete problem: fewer mistakes, faster quoting, time freed up. A small business has less room for waste than a large one, so what you recover weighs more.",
      },
      {
        id: "p2",
        anchor: "quali-processi-attaccare-primi",
        n: "02",
        q: "Which processes should you tackle first?",
        a: "The high-volume, highly repetitive ones where a mistake costs: quotes, data entry, customer support, reporting. You start where the loss is large and measurable.",
      },
      {
        id: "p3",
        anchor: "saas-o-sistema-su-misura",
        n: "03",
        q: "SaaS or a tailored system: which one?",
        a: "SaaS is fast but identical for everyone and lives outside. An embedded system works on your data and improves over time, but it needs a partner. The choice depends on how strategic that process is for you.",
      },
      {
        id: "p4",
        anchor: "come-partire-senza-team-tecnico",
        n: "04",
        q: "How do you start without a technical team?",
        a: "With a small perimeter and a partner who installs and runs it, while one internal person grows into the reference point. You do not need to hire engineers to begin.",
      },
    ],
  },
];

export function getPercorsi(locale: "it" | "en"): ImparaPercorso[] {
  return locale === "en" ? PERCORSI_EN : PERCORSI_IT;
}

export function getTutteLeLezioni(locale: "it" | "en"): ImparaLezione[] {
  return getPercorsi(locale).flatMap((p) => p.lezioni);
}
