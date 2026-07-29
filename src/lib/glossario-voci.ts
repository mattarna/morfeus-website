/* Voci del glossario, estratte dal prototipo design-v2/glossario.html.
   85 termini in 21 gruppi alfabetici.

   Stanno in un file loro e non dentro la pagina: la pagina resterebbe
   illeggibile, e la stessa lista serve al JSON-LD (DefinedTermSet). */

export type GlossTag = "ai" | "claude" | "morfeus";

export type GlossVoce = {
  /** ancora nell'URL: /glossario#<id> */
  id: string;
  /** nome del termine */
  n: string;
  tag: GlossTag;
  /** definizione */
  d: string;
  /** pagina di approfondimento, solo per alcuni termini Morfeus */
  href?: string;
};

export type GlossGruppo = { l: string; voci: GlossVoce[] };

export const GLOSSARIO: GlossGruppo[] = [
  {
    l: "A",
    voci: [
      { id: "adaptive-thinking", n: "Adaptive Thinking", tag: "claude", d: "Claude decide da solo quanto ragionare in base alla complessità della domanda. Non devi impostare nulla." },
      { id: "agi", n: "AGI", tag: "ai", d: "Un'AI capace di apprendere e ragionare come un essere umano, senza limiti di dominio. Non esiste ancora." },
      { id: "ai-agents", n: "AI Agents", tag: "ai", d: "Sistemi autonomi che non si limitano a rispondere: hanno obiettivi e memoria, prendono decisioni ed eseguono azioni." },
      { id: "ai-alignment", n: "AI Alignment", tag: "ai", d: "Le tecniche per far sì che un'AI segua valori e obiettivi umani, evitando scorciatoie dannose." },
      { id: "ai-champion", n: "AI Champion", tag: "morfeus", d: "Una persona per reparto (non per forza IT) che diventa autonoma nell'AI, capisce cosa funziona e lo diffonde ai colleghi.", href: "/ai-champion" },
      { id: "ai-model", n: "AI Model", tag: "ai", d: "La struttura matematica addestrata per un compito: il motore che genera le risposte (GPT, Claude, Gemini)." },
      { id: "ai-wrapper", n: "AI Wrapper", tag: "ai", d: "Uno strato software che rende un modello AI facile da usare dentro un'app, senza toccare l'API." },
      { id: "anthropic", n: "Anthropic", tag: "claude", d: "L'azienda dietro Claude, fondata da ex-ricercatori di OpenAI, focalizzata su AI sicura e affidabile." },
      { id: "api", n: "API", tag: "ai", d: "Il modo in cui due software si parlano. È il ponte tra \"l'AI esiste\" e \"l'AI funziona nel mio lavoro\"." },
      { id: "artifact", n: "Artifact", tag: "claude", d: "Un output visivo che Claude crea nella conversazione: pagine, grafici, dashboard. Qualcosa che puoi vedere, usare, esportare." },
    ],
  },
  {
    l: "B",
    voci: [
      { id: "benchmark", n: "Benchmark", tag: "ai", d: "Test standardizzati per confrontare i modelli. Utili, ma non dicono tutto: uno può brillare nei test e deludere nell'uso reale." },
    ],
  },
  {
    l: "C",
    voci: [
      { id: "cervello-aziendale", n: "Cervello Aziendale", tag: "morfeus", d: "Il layer di conoscenza condiviso che tutti gli agenti AI dell'azienda leggono e aggiornano: procedure, decisioni, template, contesto.", href: "/cervello-aziendale" },
      { id: "chain-of-thought", n: "Chain of Thought", tag: "ai", d: "Tecnica in cui l'AI ragiona passo-passo invece di sparare una risposta diretta. Migliora l'accuratezza sui problemi complessi." },
      { id: "chat-search", n: "Chat Search", tag: "claude", d: "La ricerca nelle conversazioni passate: Claude pesca contesto rilevante dalle tue vecchie chat." },
      { id: "chatbot", n: "Chatbot", tag: "ai", d: "Programma che simula una conversazione. Può seguire regole fisse o essere alimentato da un LLM che capisce contesto e intenzione." },
      { id: "claude-chat", n: "Claude Chat", tag: "claude", d: "L'interfaccia conversazionale su claude.ai: scrivi, carichi file, ragioni. Il punto d'ingresso dell'ecosistema." },
      { id: "claude-code", n: "Claude Code", tag: "claude", d: "L'agente da terminale: scrive codice, gestisce repository, lancia task programmati. Usato anche da non-tecnici per automazioni." },
      { id: "claude-cowork", n: "Claude Cowork", tag: "claude", d: "L'ambiente desktop agentico: accede ai tuoi file, installa plugin, esegue task e crea documenti. Un ufficio AI che lavora per te." },
      { id: "claude-design", n: "Claude Design", tag: "claude", d: "Lo strumento di design visivo: prototipi, deck, slide, mockup. Può passare il lavoro a Claude Code per renderlo codice reale." },
      { id: "claude-for-excel", n: "Claude for Excel", tag: "claude", d: "Add-in Office che legge il workbook cella per cella, modifica i valori preservando le formule e corregge gli errori." },
      { id: "claude-for-powerpoint", n: "Claude for PowerPoint", tag: "claude", d: "Add-in Office che rispetta la formattazione del deck e crea contenuti con oggetti nativi (grafici reali, non immagini)." },
      { id: "claude-in-chrome", n: "Claude in Chrome", tag: "claude", d: "Estensione browser: Claude vede la pagina, naviga, compila form, estrae dati. Un assistente che guarda lo schermo con te." },
      { id: "claude-security", n: "Claude Security", tag: "claude", d: "Scansiona il codice per vulnerabilità e genera patch di sicurezza. Per team di cybersecurity e sviluppatori." },
      { id: "claude-md", n: "CLAUDE.md", tag: "claude", d: "Il file di istruzioni che Claude legge a inizio sessione Cowork: il briefing operativo permanente, specifico per progetto." },
      { id: "compute", n: "Compute", tag: "ai", d: "Le risorse di calcolo (GPU, CPU, memoria) che fanno girare i modelli. Più compute, più potenza e più costi." },
      { id: "computer-vision", n: "Computer Vision", tag: "ai", d: "La branca dell'AI che vede e interpreta immagini e video: oggetti, volti, testi, azioni." },
      { id: "connector-mcp", n: "Connector / MCP", tag: "claude", d: "Il ponte tra Claude e i tuoi strumenti (Slack, Drive, Notion, GitHub). Un Connector è un MCP già configurato e pronto in Cowork." },
      { id: "context", n: "Context", tag: "ai", d: "Le informazioni che l'AI tiene a mente in una conversazione. Più contesto dai, più le risposte sono pertinenti." },
      { id: "context-window", n: "Context Window", tag: "claude", d: "Quante informazioni Claude tiene a mente in una conversazione. I modelli di punta arrivano a 1 milione di token: come leggere un libro intero." },
      { id: "control-system-as-a-service", n: "Control System as a Service", tag: "morfeus", d: "La categoria di Morfeus: sistemi in produzione (dati, decisioni, automazioni, affidabilità) su base continuativa, non una \"AI agency\".", href: "/control-system-as-a-service" },
    ],
  },
  {
    l: "D",
    voci: [
      { id: "deep-learning", n: "Deep Learning", tag: "ai", d: "Sottocampo del machine learning che usa reti neurali a molti strati. È alla base di quasi tutta l'AI moderna." },
      { id: "dipendente-ai", n: "Dipendente AI", tag: "morfeus", d: "Un sistema AI con ruolo, regole e standard di qualità che esegue un lavoro completo in autonomia. Non un assistente che aspetta istruzioni.", href: "/dipendente-ai" },
      { id: "dispatch", n: "Dispatch", tag: "claude", d: "La logica con cui Claude decide quale tool, skill o azione usare in base alla tua richiesta." },
    ],
  },
  {
    l: "E",
    voci: [
      { id: "embedding", n: "Embedding", tag: "ai", d: "La rappresentazione di parole o concetti come vettori numerici: concetti simili hanno vettori vicini. Serve per cercare e confrontare." },
      { id: "explainability", n: "Explainability", tag: "ai", d: "La capacità di capire perché un modello ha dato un certo output. Cruciale in sanità, finanza e giustizia." },
      { id: "extended-thinking", n: "Extended Thinking", tag: "claude", d: "Quando Claude ragiona ad alta voce prima di rispondere: risposte migliori sui problemi complessi, ma più lente." },
    ],
  },
  {
    l: "F",
    voci: [
      { id: "fine-tuning", n: "Fine-tuning", tag: "ai", d: "Specializzare un modello già addestrato con dati specifici, per adattarlo a un dominio o a uno stile." },
      { id: "foundation-model", n: "Foundation Model", tag: "ai", d: "Un grande modello addestrato su dati molto diversificati, generico e adattabile (GPT, Claude, Gemini)." },
    ],
  },
  {
    l: "G",
    voci: [
      { id: "generative-ai", n: "Generative AI", tag: "ai", d: "AI che crea contenuti nuovi (testo, immagini, codice, video) prevedendo cosa dovrebbe venire dopo." },
      { id: "global-instructions", n: "Global Instructions", tag: "claude", d: "Le regole che dai a Claude una volta sola (tono, formato, contesto) e che segue in ogni conversazione." },
      { id: "gpu", n: "GPU", tag: "ai", d: "Processore per il calcolo parallelo, nato per i videogiochi e oggi motore dell'AI. Addestrare un grande modello richiede migliaia di GPU." },
      { id: "ground-truth", n: "Ground Truth", tag: "ai", d: "Dati verificati e affidabili usati per addestrare o validare un modello. Il riferimento con cui si misura l'accuratezza." },
    ],
  },
  {
    l: "H",
    voci: [
      { id: "hallucination", n: "Hallucination", tag: "ai", d: "Quando l'AI genera con sicurezza contenuti falsi. Non è un bug ma una caratteristica dei LLM: va gestita." },
    ],
  },
  {
    l: "I",
    voci: [
      { id: "inference", n: "Inference", tag: "ai", d: "Il momento in cui il modello riceve un input e produce un output. Ogni risposta che ricevi è un'inferenza." },
    ],
  },
  {
    l: "K",
    voci: [
      { id: "knowledge-cutoff", n: "Knowledge Cutoff", tag: "ai", d: "La data oltre la quale il modello non sa nulla, perché addestrato su dati fino a lì (salvo ricerca web in tempo reale)." },
    ],
  },
  {
    l: "L",
    voci: [
      { id: "latency", n: "Latency", tag: "ai", d: "Il tempo che l'AI impiega a rispondere. Spesso è il trade-off tra qualità e velocità." },
      { id: "llm", n: "LLM", tag: "ai", d: "Modello addestrato su enormi quantità di testo per capire e generare linguaggio. Non pensa: prevede la parola migliore, ma così bene da sembrarlo." },
    ],
  },
  {
    l: "M",
    voci: [
      { id: "machine-learning", n: "Machine Learning", tag: "ai", d: "Tecnica con cui l'AI impara dai dati invece di essere programmata esplicitamente. Il cuore dell'AI moderna." },
      { id: "marf", n: "MARF", tag: "morfeus", d: "L'infrastruttura AI proprietaria di Morfeus, installata dentro l'azienda: raccoglie i dati, automatizza e migliora a ogni progetto. Non è un SaaS.", href: "/marf" },
      { id: "margin-recovery", n: "Margin Recovery", tag: "morfeus", d: "Il frame di Morfeus: trovare e recuperare il margine che un'azienda perde ogni giorno mentre scala. Non è taglio costi.", href: "/margin-recovery" },
      { id: "max-mode", n: "Max Mode", tag: "claude", d: "Il livello massimo di Extended Thinking: nessun limite di ragionamento, per i problemi più difficili." },
      { id: "mcp", n: "MCP", tag: "ai", d: "Model Context Protocol: standard aperto creato da Anthropic per collegare un'AI a strumenti esterni. È come l'AI smette di solo parlare e inizia ad agire." },
      { id: "mcp-apps", n: "MCP Apps", tag: "claude", d: "I tool MCP che restituiscono interfacce interattive (dashboard, form), non solo testo, aggiornate sui tuoi dati reali." },
      { id: "memory", n: "Memory", tag: "claude", d: "Il sistema con cui Claude ricorda informazioni tra una conversazione e l'altra: preferenze, ruolo, progetti." },
      { id: "multi-modal", n: "Multi-modal", tag: "ai", d: "Un'AI che capisce e genera non solo testo, ma anche immagini, audio e video." },
    ],
  },
  {
    l: "N",
    voci: [
      { id: "neural-network", n: "Neural Network", tag: "ai", d: "Struttura ispirata al cervello, fatta di nodi connessi. È il cervello dietro il deep learning." },
      { id: "nlp", n: "NLP", tag: "ai", d: "Natural Language Processing: il settore che fa capire il linguaggio umano alle macchine (riassunti, sentiment, traduzione)." },
    ],
  },
  {
    l: "O",
    voci: [
      { id: "open-weight-vs-closed-source", n: "Open Weight vs Closed Source", tag: "ai", d: "Modelli aperti (scaricabili e modificabili, es. Llama) contro chiusi (accessibili via abbonamento o API, es. Claude, GPT)." },
      { id: "operating-partner", n: "Operating Partner", tag: "morfeus", d: "Il modello Morfeus: un team AI embedded che lavora dentro l'azienda con accountability sui risultati, non un fornitore a progetto.", href: "/operating-partner" },
      { id: "opus-sonnet-haiku", n: "Opus / Sonnet / Haiku", tag: "claude", d: "I tre modelli di Claude: Opus il più potente, Sonnet il miglior compromesso qualità-velocità, Haiku il più veloce e leggero." },
    ],
  },
  {
    l: "P",
    voci: [
      { id: "parameters", n: "Parameters", tag: "ai", d: "Le variabili interne che il modello regola durante l'addestramento. Più parametri, più capacità di cogliere sfumature." },
      { id: "plugin", n: "Plugin", tag: "claude", d: "Pacchetti che aggiungono skill, tool e connettori a Cowork in un click. Come le app, ma per il tuo ambiente AI." },
      { id: "projects", n: "Projects", tag: "claude", d: "Spazi di lavoro dove carichi file di contesto che Claude legge prima di ogni conversazione del progetto." },
      { id: "prompt", n: "Prompt", tag: "ai", d: "L'istruzione che dai all'AI. Non una domanda: una delega. Più è precisa, migliore è il risultato." },
      { id: "prompt-engineering", n: "Prompt Engineering", tag: "ai", d: "L'arte di scrivere prompt efficaci. Non serve programmare: serve capire come ragiona l'AI." },
    ],
  },
  {
    l: "R",
    voci: [
      { id: "rag", n: "RAG", tag: "ai", d: "Retrieval-Augmented Generation: l'AI cerca in documenti reali prima di rispondere. Meno allucinazioni, più risposte ancorate ai fatti." },
      { id: "reasoning-model", n: "Reasoning Model", tag: "ai", d: "Modello progettato per ragionare in modo logico e sequenziale, spiegando il proprio processo." },
      { id: "reinforcement-learning", n: "Reinforcement Learning", tag: "ai", d: "L'AI impara provando, sbagliando e ricevendo premi o penalità. Usata per giochi, robotica, ottimizzazione." },
      { id: "roiometro", n: "ROIometro", tag: "morfeus", d: "Il calcolatore Morfeus che mostra quanto perdi ogni mese e quanto puoi recuperare con l'AI.", href: "/roiometro" },
    ],
  },
  {
    l: "S",
    voci: [
      { id: "salescraft", n: "Salescraft", tag: "morfeus", d: "Il layer AI di Morfeus che automatizza il lavoro ripetitivo del team commerciale, restituendo ore alle attività che generano fatturato.", href: "/salescraft" },
      { id: "scheduled-tasks", n: "Scheduled Tasks", tag: "claude", d: "Compiti che Claude esegue in automatico a orari definiti, anche quando non ci sei (report del lunedì, monitoraggio competitor)." },
      { id: "skill", n: "Skill", tag: "claude", d: "Un file che insegna a Claude un compito specifico. Come assumere un dipendente specializzato in 5 secondi: creabile, condivisibile, installabile." },
      { id: "supervised-learning", n: "Supervised Learning", tag: "ai", d: "Addestramento su dati già etichettati (input più output corretto), es. riconoscere spam da migliaia di email classificate." },
      { id: "system-prompt", n: "System Prompt", tag: "ai", d: "Le istruzioni invisibili che definiscono chi è l'AI e come si comporta. L'utente non le vede, ma determinano tutto." },
    ],
  },
  {
    l: "T",
    voci: [
      { id: "temperature", n: "Temperature", tag: "ai", d: "Quanto l'AI rischia: bassa = preciso e prevedibile, alta = creativo e imprevedibile." },
      { id: "tokenization", n: "Tokenization", tag: "ai", d: "Il processo che spezza il testo in token (pezzi) che il modello elabora. Tutto ciò che scrivi e ricevi si misura in token." },
      { id: "tool-use", n: "Tool Use", tag: "claude", d: "La capacità di Claude di usare strumenti in conversazione: cercare sul web, leggere file, eseguire codice, chiamare API." },
      { id: "tpu", n: "TPU", tag: "ai", d: "Processore progettato da Google per accelerare l'addestramento, ottimizzato per le reti neurali su larga scala." },
      { id: "training", n: "Training", tag: "ai", d: "La fase in cui il modello impara dai dati. Può durare mesi e costare milioni in compute." },
      { id: "transformer", n: "Transformer", tag: "ai", d: "L'architettura alla base di tutti i LLM moderni (2017). Gestisce relazioni tra parole anche lontane nel testo." },
    ],
  },
  {
    l: "U",
    voci: [
      { id: "unsupervised-learning", n: "Unsupervised Learning", tag: "ai", d: "L'AI impara da dati non etichettati, scoprendo da sola pattern e strutture." },
    ],
  },
  {
    l: "V",
    voci: [
      { id: "value-leak", n: "Value Leak", tag: "morfeus", d: "Le perdite di margine invisibili nei processi che le aziende non vedono mentre scalano. Morfeus le quantifica in euro.", href: "/value-leak" },
      { id: "value-report", n: "Value Report", tag: "morfeus", d: "Il report mensile con cui Morfeus dice al CEO quanto valore ha generato, in euro e non in slide.", href: "/value-report" },
      { id: "vibe-coding", n: "Vibe Coding", tag: "ai", d: "Scrivere software descrivendo a parole cosa vuoi e lasciando che l'AI generi il codice. Possibile anche per non-programmatori." },
    ],
  },
  {
    l: "W",
    voci: [
      { id: "weights", n: "Weights", tag: "ai", d: "I valori numerici interni che il modello impara nell'addestramento e che determinano i suoi output. \"Open weight\" = sono pubblici." },
    ],
  },
];

/** Lettere con almeno una voce: e' quello che elenca la barra A-Z. */
export const LETTERE: string[] = GLOSSARIO.map((g) => g.l);

export const TUTTE_LE_VOCI: GlossVoce[] = GLOSSARIO.flatMap((g) => g.voci);
