/* Voci del glossario, estratte dal prototipo design-v2/glossario.html.
   85 termini in 21 gruppi alfabetici, in due lingue.

   Stanno in un file loro e non dentro la pagina: la pagina resterebbe
   illeggibile, e la stessa lista serve al JSON-LD (DefinedTermSet).

   INGLESE (2026-08-03). Stessa storia di impara-percorsi.ts: la pagina
   era gia' bilingue nel guscio (testata, filtri, CTA) ma le 85
   definizioni erano una lista sola, in italiano. Su /glossario, che e'
   la pagina inglese, si leggeva un titolo inglese e sotto ottantacinque
   definizioni in italiano.

   Restano identici fra le due lingue, apposta:
   - gli `id`: sono le ANCORE (/glossario#llm), e ci puntano i rimandi
     dagli articoli e da /impara-ai. Cambiarli per lingua romperebbe
     quei link;
   - gli `href`: le pagine di approfondimento esistono in una versione
     sola, e comunque solo /marf e /roiometro sono vive (la pagina
     filtra con APPROFONDIMENTI_VIVI).

   Cambiano invece i GRUPPI alfabetici: tre termini hanno un nome
   italiano che in inglese cade sotto un'altra lettera (Dipendente AI ->
   AI Employee passa da D ad A, Cervello Aziendale -> Company Brain
   resta in C ma cambia posto). Per questo le due liste non sono la
   stessa struttura con le stringhe sostituite: sono due liste. */

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

export const GLOSSARIO_IT: GlossGruppo[] = [
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

export const GLOSSARIO_EN: GlossGruppo[] = [
  {
    l: "A",
    voci: [
      { id: "adaptive-thinking", n: "Adaptive Thinking", tag: "claude", d: "Claude decides on its own how much to reason based on how complex the question is. You do not have to set anything." },
      { id: "agi", n: "AGI", tag: "ai", d: "An AI able to learn and reason like a human being, with no domain limits. It does not exist yet." },
      { id: "ai-agents", n: "AI Agents", tag: "ai", d: "Autonomous systems that do not just answer: they have goals and memory, make decisions and carry out actions." },
      { id: "ai-alignment", n: "AI Alignment", tag: "ai", d: "The techniques for making an AI follow human values and goals, avoiding harmful shortcuts." },
      { id: "ai-champion", n: "AI Champion", tag: "morfeus", d: "One person per department (not necessarily from IT) who becomes autonomous with AI, works out what functions and spreads it to colleagues.", href: "/ai-champion" },
      { id: "dipendente-ai", n: "AI Employee", tag: "morfeus", d: "An AI system with a role, rules and quality standards that carries out a complete job on its own. Not an assistant waiting for instructions.", href: "/dipendente-ai" },
      { id: "ai-model", n: "AI Model", tag: "ai", d: "The mathematical structure trained for a task: the engine that generates the answers (GPT, Claude, Gemini)." },
      { id: "ai-wrapper", n: "AI Wrapper", tag: "ai", d: "A software layer that makes an AI model easy to use inside an app, without touching the API." },
      { id: "anthropic", n: "Anthropic", tag: "claude", d: "The company behind Claude, founded by former OpenAI researchers, focused on safe and reliable AI." },
      { id: "api", n: "API", tag: "ai", d: "How two pieces of software talk to each other. It is the bridge between \"AI exists\" and \"AI works in my job\"." },
      { id: "artifact", n: "Artifact", tag: "claude", d: "A visual output Claude creates inside the conversation: pages, charts, dashboards. Something you can see, use and export." },
    ],
  },
  {
    l: "B",
    voci: [
      { id: "benchmark", n: "Benchmark", tag: "ai", d: "Standardised tests for comparing models. Useful, but they do not tell the whole story: one can shine in tests and disappoint in real use." },
    ],
  },
  {
    l: "C",
    voci: [
      { id: "chain-of-thought", n: "Chain of Thought", tag: "ai", d: "A technique where the AI reasons step by step instead of firing off a direct answer. It improves accuracy on complex problems." },
      { id: "chat-search", n: "Chat Search", tag: "claude", d: "Search across past conversations: Claude pulls relevant context from your old chats." },
      { id: "chatbot", n: "Chatbot", tag: "ai", d: "A program that simulates a conversation. It can follow fixed rules or be powered by an LLM that understands context and intent." },
      { id: "claude-chat", n: "Claude Chat", tag: "claude", d: "The conversational interface at claude.ai: you write, upload files, think. The entry point of the ecosystem." },
      { id: "claude-code", n: "Claude Code", tag: "claude", d: "The terminal agent: it writes code, manages repositories, runs scheduled tasks. Used by non-technical people too, for automation." },
      { id: "claude-cowork", n: "Claude Cowork", tag: "claude", d: "The agentic desktop environment: it accesses your files, installs plugins, runs tasks and creates documents. An AI office working for you." },
      { id: "claude-design", n: "Claude Design", tag: "claude", d: "The visual design tool: prototypes, decks, slides, mockups. It can hand the work to Claude Code to turn it into real code." },
      { id: "claude-for-excel", n: "Claude for Excel", tag: "claude", d: "An Office add-in that reads the workbook cell by cell, changes values while preserving formulas, and fixes errors." },
      { id: "claude-for-powerpoint", n: "Claude for PowerPoint", tag: "claude", d: "An Office add-in that respects the deck's formatting and creates content with native objects (real charts, not images)." },
      { id: "claude-in-chrome", n: "Claude in Chrome", tag: "claude", d: "A browser extension: Claude sees the page, navigates, fills in forms, extracts data. An assistant watching the screen with you." },
      { id: "claude-security", n: "Claude Security", tag: "claude", d: "Scans code for vulnerabilities and generates security patches. For cybersecurity teams and developers." },
      { id: "claude-md", n: "CLAUDE.md", tag: "claude", d: "The instruction file Claude reads at the start of a Cowork session: the permanent operating briefing, specific to the project." },
      { id: "cervello-aziendale", n: "Company Brain", tag: "morfeus", d: "The shared knowledge layer every AI agent in the company reads and updates: procedures, decisions, templates, context.", href: "/cervello-aziendale" },
      { id: "compute", n: "Compute", tag: "ai", d: "The computing resources (GPU, CPU, memory) that run the models. More compute means more power and more cost." },
      { id: "computer-vision", n: "Computer Vision", tag: "ai", d: "The branch of AI that sees and interprets images and video: objects, faces, text, actions." },
      { id: "connector-mcp", n: "Connector / MCP", tag: "claude", d: "The bridge between Claude and your tools (Slack, Drive, Notion, GitHub). A Connector is an MCP already configured and ready in Cowork." },
      { id: "context", n: "Context", tag: "ai", d: "The information the AI holds in mind during a conversation. The more context you give, the more relevant the answers." },
      { id: "context-window", n: "Context Window", tag: "claude", d: "How much information Claude holds in mind in one conversation. The leading models reach 1 million tokens: like reading a whole book." },
      { id: "control-system-as-a-service", n: "Control System as a Service", tag: "morfeus", d: "The Morfeus category: systems in production (data, decisions, automation, reliability) on a continuous basis, not an \"AI agency\".", href: "/control-system-as-a-service" },
    ],
  },
  {
    l: "D",
    voci: [
      { id: "deep-learning", n: "Deep Learning", tag: "ai", d: "A subfield of machine learning that uses neural networks with many layers. It underpins almost all modern AI." },
      { id: "dispatch", n: "Dispatch", tag: "claude", d: "The logic by which Claude decides which tool, skill or action to use for your request." },
    ],
  },
  {
    l: "E",
    voci: [
      { id: "embedding", n: "Embedding", tag: "ai", d: "The representation of words or concepts as numerical vectors: similar concepts have nearby vectors. Used for searching and comparing." },
      { id: "explainability", n: "Explainability", tag: "ai", d: "The ability to understand why a model produced a given output. Crucial in healthcare, finance and justice." },
      { id: "extended-thinking", n: "Extended Thinking", tag: "claude", d: "When Claude reasons out loud before answering: better answers on complex problems, but slower." },
    ],
  },
  {
    l: "F",
    voci: [
      { id: "fine-tuning", n: "Fine-tuning", tag: "ai", d: "Specialising an already-trained model with specific data, to adapt it to a domain or a style." },
      { id: "foundation-model", n: "Foundation Model", tag: "ai", d: "A large model trained on very diverse data, generic and adaptable (GPT, Claude, Gemini)." },
    ],
  },
  {
    l: "G",
    voci: [
      { id: "generative-ai", n: "Generative AI", tag: "ai", d: "AI that creates new content (text, images, code, video) by predicting what should come next." },
      { id: "global-instructions", n: "Global Instructions", tag: "claude", d: "The rules you give Claude once (tone, format, context) and that it follows in every conversation." },
      { id: "gpu", n: "GPU", tag: "ai", d: "A processor for parallel computation, born for video games and now the engine of AI. Training a large model takes thousands of GPUs." },
      { id: "ground-truth", n: "Ground Truth", tag: "ai", d: "Verified, reliable data used to train or validate a model. The reference point accuracy is measured against." },
    ],
  },
  {
    l: "H",
    voci: [
      { id: "hallucination", n: "Hallucination", tag: "ai", d: "When AI confidently generates false content. It is not a bug but a characteristic of LLMs: it has to be managed." },
    ],
  },
  {
    l: "I",
    voci: [
      { id: "inference", n: "Inference", tag: "ai", d: "The moment the model receives an input and produces an output. Every answer you get is an inference." },
    ],
  },
  {
    l: "K",
    voci: [
      { id: "knowledge-cutoff", n: "Knowledge Cutoff", tag: "ai", d: "The date beyond which the model knows nothing, because it was trained on data up to that point (unless it searches the web live)." },
    ],
  },
  {
    l: "L",
    voci: [
      { id: "latency", n: "Latency", tag: "ai", d: "The time the AI takes to answer. Often it is the trade-off between quality and speed." },
      { id: "llm", n: "LLM", tag: "ai", d: "A model trained on enormous amounts of text to understand and generate language. It does not think: it predicts the best next word, but so well it looks like thinking." },
    ],
  },
  {
    l: "M",
    voci: [
      { id: "machine-learning", n: "Machine Learning", tag: "ai", d: "The technique by which AI learns from data instead of being explicitly programmed. The heart of modern AI." },
      { id: "marf", n: "MARF", tag: "morfeus", d: "The proprietary Morfeus AI infrastructure, installed inside the company: it collects the data, automates, and improves with every project. It is not a SaaS.", href: "/marf" },
      { id: "margin-recovery", n: "Margin Recovery", tag: "morfeus", d: "The Morfeus frame: finding and recovering the margin a company loses every day while it scales. It is not cost cutting.", href: "/margin-recovery" },
      { id: "max-mode", n: "Max Mode", tag: "claude", d: "The highest level of Extended Thinking: no reasoning limit, for the hardest problems." },
      { id: "mcp", n: "MCP", tag: "ai", d: "Model Context Protocol: an open standard created by Anthropic to connect an AI to external tools. It is how AI stops merely talking and starts acting." },
      { id: "mcp-apps", n: "MCP Apps", tag: "claude", d: "MCP tools that return interactive interfaces (dashboards, forms), not just text, live on your real data." },
      { id: "memory", n: "Memory", tag: "claude", d: "The system by which Claude remembers information between one conversation and the next: preferences, role, projects." },
      { id: "multi-modal", n: "Multi-modal", tag: "ai", d: "An AI that understands and generates not only text, but also images, audio and video." },
    ],
  },
  {
    l: "N",
    voci: [
      { id: "neural-network", n: "Neural Network", tag: "ai", d: "A structure inspired by the brain, made of connected nodes. It is the brain behind deep learning." },
      { id: "nlp", n: "NLP", tag: "ai", d: "Natural Language Processing: the field that makes machines understand human language (summaries, sentiment, translation)." },
    ],
  },
  {
    l: "O",
    voci: [
      { id: "open-weight-vs-closed-source", n: "Open Weight vs Closed Source", tag: "ai", d: "Open models (downloadable and modifiable, e.g. Llama) against closed ones (accessible via subscription or API, e.g. Claude, GPT)." },
      { id: "operating-partner", n: "Operating Partner", tag: "morfeus", d: "The Morfeus model: an embedded AI team working inside the company with accountability for the results, not a per-project supplier.", href: "/operating-partner" },
      { id: "opus-sonnet-haiku", n: "Opus / Sonnet / Haiku", tag: "claude", d: "The three Claude models: Opus the most powerful, Sonnet the best quality-speed compromise, Haiku the fastest and lightest." },
    ],
  },
  {
    l: "P",
    voci: [
      { id: "parameters", n: "Parameters", tag: "ai", d: "The internal variables the model adjusts during training. More parameters means more capacity to catch nuance." },
      { id: "plugin", n: "Plugin", tag: "claude", d: "Packages that add skills, tools and connectors to Cowork in one click. Like apps, but for your AI environment." },
      { id: "projects", n: "Projects", tag: "claude", d: "Workspaces where you upload context files Claude reads before every conversation in that project." },
      { id: "prompt", n: "Prompt", tag: "ai", d: "The instruction you give the AI. Not a question: a delegation. The more precise it is, the better the result." },
      { id: "prompt-engineering", n: "Prompt Engineering", tag: "ai", d: "The craft of writing effective prompts. You do not need to code: you need to understand how AI reasons." },
    ],
  },
  {
    l: "R",
    voci: [
      { id: "rag", n: "RAG", tag: "ai", d: "Retrieval-Augmented Generation: the AI searches real documents before answering. Fewer hallucinations, more answers anchored to facts." },
      { id: "reasoning-model", n: "Reasoning Model", tag: "ai", d: "A model designed to reason logically and sequentially, explaining its own process." },
      { id: "reinforcement-learning", n: "Reinforcement Learning", tag: "ai", d: "AI learns by trying, failing, and receiving rewards or penalties. Used for games, robotics, optimisation." },
      { id: "roiometro", n: "ROIometer", tag: "morfeus", d: "The Morfeus calculator that shows how much you lose every month and how much you can recover with AI.", href: "/roiometro" },
    ],
  },
  {
    l: "S",
    voci: [
      { id: "salescraft", n: "Salescraft", tag: "morfeus", d: "The Morfeus AI layer that automates the sales team's repetitive work, giving hours back to the activities that generate revenue.", href: "/salescraft" },
      { id: "scheduled-tasks", n: "Scheduled Tasks", tag: "claude", d: "Tasks Claude runs automatically at set times, even when you are not there (Monday reports, competitor monitoring)." },
      { id: "skill", n: "Skill", tag: "claude", d: "A file that teaches Claude a specific task. Like hiring a specialised employee in 5 seconds: you can create it, share it, install it." },
      { id: "supervised-learning", n: "Supervised Learning", tag: "ai", d: "Training on already-labelled data (input plus correct output), e.g. recognising spam from thousands of classified emails." },
      { id: "system-prompt", n: "System Prompt", tag: "ai", d: "The invisible instructions that define who the AI is and how it behaves. The user does not see them, but they determine everything." },
    ],
  },
  {
    l: "T",
    voci: [
      { id: "temperature", n: "Temperature", tag: "ai", d: "How much the AI gambles: low = precise and predictable, high = creative and unpredictable." },
      { id: "tokenization", n: "Tokenization", tag: "ai", d: "The process that breaks text into tokens (pieces) the model processes. Everything you write and receive is measured in tokens." },
      { id: "tool-use", n: "Tool Use", tag: "claude", d: "Claude's ability to use tools inside a conversation: search the web, read files, run code, call APIs." },
      { id: "tpu", n: "TPU", tag: "ai", d: "A processor designed by Google to accelerate training, optimised for neural networks at large scale." },
      { id: "training", n: "Training", tag: "ai", d: "The phase where the model learns from data. It can take months and cost millions in compute." },
      { id: "transformer", n: "Transformer", tag: "ai", d: "The architecture underlying every modern LLM (2017). It handles relationships between words even far apart in the text." },
    ],
  },
  {
    l: "U",
    voci: [
      { id: "unsupervised-learning", n: "Unsupervised Learning", tag: "ai", d: "AI learns from unlabelled data, discovering patterns and structures on its own." },
    ],
  },
  {
    l: "V",
    voci: [
      { id: "value-leak", n: "Value Leak", tag: "morfeus", d: "The invisible margin losses in processes that companies do not see while they scale. Morfeus quantifies them in euros.", href: "/value-leak" },
      { id: "value-report", n: "Value Report", tag: "morfeus", d: "The monthly report with which Morfeus tells the CEO how much value it generated, in euros and not in slides.", href: "/value-report" },
      { id: "vibe-coding", n: "Vibe Coding", tag: "ai", d: "Writing software by describing in words what you want and letting the AI generate the code. Possible for non-programmers too." },
    ],
  },
  {
    l: "W",
    voci: [
      { id: "weights", n: "Weights", tag: "ai", d: "The internal numerical values the model learns during training and that determine its outputs. \"Open weight\" means they are public." },
    ],
  },
];

export function getGlossario(locale: "it" | "en"): GlossGruppo[] {
  return locale === "en" ? GLOSSARIO_EN : GLOSSARIO_IT;
}

/** Lettere con almeno una voce: e' quello che elenca la barra A-Z. */
export function lettereDi(locale: "it" | "en"): string[] {
  return getGlossario(locale).map((g) => g.l);
}

export function tutteLeVociDi(locale: "it" | "en"): GlossVoce[] {
  return getGlossario(locale).flatMap((g) => g.voci);
}
