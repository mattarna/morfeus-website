/* Percorsi e lezioni di "Impara l'AI", estratti dal prototipo
   design-v2/impara-ai.html. 4 percorsi, 18 lezioni.

   Stanno in un file loro: la stessa lista alimenta il JSON-LD (FAQPage) e
   dentro la pagina renderebbe illeggibile tutto il resto.

   NOTA: tre rimandi al glossario sono corretti rispetto al prototipo. La',
   impara-ai puntava a slug italiani (#agente-ai, #ai-generativa,
   #allucinazioni) mentre il glossario usa quelli inglesi (#ai-agents,
   #generative-ai, #hallucination): i tre link non avrebbero portato da
   nessuna parte. */

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

export const PERCORSI: ImparaPercorso[] = [
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

export const TUTTE_LE_LEZIONI: ImparaLezione[] = PERCORSI.flatMap((p) => p.lezioni);
