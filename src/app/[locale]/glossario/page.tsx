import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/seo/entity-ids";

type Props = { params: { locale: string } };

type Tag = "morfeus" | "ai" | "claude";
type Term = { id: string; term: string; tag: Tag; it: string; en: string };
type Group = { letter: string; terms: Term[] };

const BADGE: Record<Tag, { label: string; cls: string }> = {
  morfeus: { label: "Morfeus", cls: "text-firma bg-firma/[0.08] border border-firma/30" },
  ai: { label: "AI", cls: "text-ombra bg-transparent border border-inchiostro/[0.16]" },
  claude: { label: "Claude", cls: "text-inchiostro bg-lilla/20 border border-lilla/60" },
};

/** Termini e definizioni identici al mockup approvato (IT), tradotti in EN B2B. */
const GROUPS: Group[] = [
  {
    letter: "A",
    terms: [
      { id: "adaptive-thinking", term: "Adaptive Thinking", tag: "claude", it: "Claude decide da solo quanto ragionare in base alla complessità della domanda. Non devi impostare nulla.", en: "Claude decides on its own how much to reason based on the complexity of the question. You set nothing." },
      { id: "agi", term: "AGI", tag: "ai", it: "Un'AI capace di apprendere e ragionare come un essere umano, senza limiti di dominio. Non esiste ancora.", en: "An AI able to learn and reason like a human, with no domain limits. It doesn't exist yet." },
      { id: "ai-agents", term: "AI Agents", tag: "ai", it: "Sistemi autonomi che non si limitano a rispondere: hanno obiettivi e memoria, prendono decisioni ed eseguono azioni.", en: "Autonomous systems that don't just answer: they have goals and memory, make decisions and take actions." },
      { id: "ai-alignment", term: "AI Alignment", tag: "ai", it: "Le tecniche per far sì che un'AI segua valori e obiettivi umani, evitando scorciatoie dannose.", en: "The techniques that make an AI follow human values and goals, avoiding harmful shortcuts." },
      { id: "ai-champion", term: "AI Champion", tag: "morfeus", it: "Una persona per reparto (non per forza IT) che diventa autonoma nell'AI, capisce cosa funziona e lo diffonde ai colleghi.", en: "One person per department (not necessarily IT) who becomes autonomous with AI, understands what works and spreads it to colleagues." },
      { id: "ai-model", term: "AI Model", tag: "ai", it: "La struttura matematica addestrata per un compito: il motore che genera le risposte (GPT, Claude, Gemini).", en: "The mathematical structure trained for a task: the engine that generates the answers (GPT, Claude, Gemini)." },
      { id: "ai-wrapper", term: "AI Wrapper", tag: "ai", it: "Uno strato software che rende un modello AI facile da usare dentro un'app, senza toccare l'API.", en: "A software layer that makes an AI model easy to use inside an app, without touching the API." },
      { id: "anthropic", term: "Anthropic", tag: "claude", it: "L'azienda dietro Claude, fondata da ex-ricercatori di OpenAI, focalizzata su AI sicura e affidabile.", en: "The company behind Claude, founded by former OpenAI researchers, focused on safe and reliable AI." },
      { id: "api", term: "API", tag: "ai", it: "Il modo in cui due software si parlano. È il ponte tra \"l'AI esiste\" e \"l'AI funziona nel mio lavoro\".", en: "The way two pieces of software talk to each other. It's the bridge between \"AI exists\" and \"AI works in my job\"." },
      { id: "artifact", term: "Artifact", tag: "claude", it: "Un output visivo che Claude crea nella conversazione: pagine, grafici, dashboard. Qualcosa che puoi vedere, usare, esportare.", en: "A visual output Claude creates in the conversation: pages, charts, dashboards. Something you can see, use, export." },
    ],
  },
  {
    letter: "B",
    terms: [
      { id: "benchmark", term: "Benchmark", tag: "ai", it: "Test standardizzati per confrontare i modelli. Utili, ma non dicono tutto: uno può brillare nei test e deludere nell'uso reale.", en: "Standardized tests to compare models. Useful, but not the whole story: one can shine in tests and disappoint in real use." },
    ],
  },
  {
    letter: "C",
    terms: [
      { id: "cervello-aziendale", term: "Cervello Aziendale", tag: "morfeus", it: "Il layer di conoscenza condiviso che tutti gli agenti AI dell'azienda leggono e aggiornano: procedure, decisioni, template, contesto.", en: "The shared knowledge layer that every AI agent in the company reads and updates: procedures, decisions, templates, context." },
      { id: "chain-of-thought", term: "Chain of Thought", tag: "ai", it: "Tecnica in cui l'AI ragiona passo-passo invece di sparare una risposta diretta. Migliora l'accuratezza sui problemi complessi.", en: "A technique where the AI reasons step by step instead of firing off a direct answer. It improves accuracy on complex problems." },
      { id: "chat-search", term: "Chat Search", tag: "claude", it: "La ricerca nelle conversazioni passate: Claude pesca contesto rilevante dalle tue vecchie chat.", en: "Search across past conversations: Claude pulls relevant context from your old chats." },
      { id: "chatbot", term: "Chatbot", tag: "ai", it: "Programma che simula una conversazione. Può seguire regole fisse o essere alimentato da un LLM che capisce contesto e intenzione.", en: "A program that simulates a conversation. It can follow fixed rules or be powered by an LLM that understands context and intent." },
      { id: "claude-chat", term: "Claude Chat", tag: "claude", it: "L'interfaccia conversazionale su claude.ai: scrivi, carichi file, ragioni. Il punto d'ingresso dell'ecosistema.", en: "The conversational interface on claude.ai: you write, upload files, reason. The entry point of the ecosystem." },
      { id: "claude-code", term: "Claude Code", tag: "claude", it: "L'agente da terminale: scrive codice, gestisce repository, lancia task programmati. Usato anche da non-tecnici per automazioni.", en: "The terminal agent: it writes code, manages repositories, runs scheduled tasks. Used by non-technical people too, for automation." },
      { id: "claude-cowork", term: "Claude Cowork", tag: "claude", it: "L'ambiente desktop agentico: accede ai tuoi file, installa plugin, esegue task e crea documenti. Un ufficio AI che lavora per te.", en: "The agentic desktop environment: it accesses your files, installs plugins, runs tasks and creates documents. An AI office that works for you." },
      { id: "claude-design", term: "Claude Design", tag: "claude", it: "Lo strumento di design visivo: prototipi, deck, slide, mockup. Può passare il lavoro a Claude Code per renderlo codice reale.", en: "The visual design tool: prototypes, decks, slides, mockups. It can hand the work to Claude Code to turn it into real code." },
      { id: "claude-for-excel", term: "Claude for Excel", tag: "claude", it: "Add-in Office che legge il workbook cella per cella, modifica i valori preservando le formule e corregge gli errori.", en: "An Office add-in that reads the workbook cell by cell, edits values while preserving formulas and fixes errors." },
      { id: "claude-for-powerpoint", term: "Claude for PowerPoint", tag: "claude", it: "Add-in Office che rispetta la formattazione del deck e crea contenuti con oggetti nativi (grafici reali, non immagini).", en: "An Office add-in that respects the deck's formatting and creates content with native objects (real charts, not images)." },
      { id: "claude-in-chrome", term: "Claude in Chrome", tag: "claude", it: "Estensione browser: Claude vede la pagina, naviga, compila form, estrae dati. Un assistente che guarda lo schermo con te.", en: "A browser extension: Claude sees the page, navigates, fills forms, extracts data. An assistant that looks at the screen with you." },
      { id: "claude-security", term: "Claude Security", tag: "claude", it: "Scansiona il codice per vulnerabilità e genera patch di sicurezza. Per team di cybersecurity e sviluppatori.", en: "It scans code for vulnerabilities and generates security patches. For cybersecurity teams and developers." },
      { id: "claude-md", term: "CLAUDE.md", tag: "claude", it: "Il file di istruzioni che Claude legge a inizio sessione Cowork: il briefing operativo permanente, specifico per progetto.", en: "The instructions file Claude reads at the start of a Cowork session: the permanent operating briefing, specific to the project." },
      { id: "compute", term: "Compute", tag: "ai", it: "Le risorse di calcolo (GPU, CPU, memoria) che fanno girare i modelli. Più compute, più potenza e più costi.", en: "The computing resources (GPU, CPU, memory) that run the models. More compute, more power and more cost." },
      { id: "computer-vision", term: "Computer Vision", tag: "ai", it: "La branca dell'AI che vede e interpreta immagini e video: oggetti, volti, testi, azioni.", en: "The branch of AI that sees and interprets images and video: objects, faces, text, actions." },
      { id: "connector-mcp", term: "Connector / MCP", tag: "claude", it: "Il ponte tra Claude e i tuoi strumenti (Slack, Drive, Notion, GitHub). Un Connector è un MCP già configurato e pronto in Cowork.", en: "The bridge between Claude and your tools (Slack, Drive, Notion, GitHub). A Connector is an MCP already configured and ready in Cowork." },
      { id: "context", term: "Context", tag: "ai", it: "Le informazioni che l'AI tiene a mente in una conversazione. Più contesto dai, più le risposte sono pertinenti.", en: "The information the AI keeps in mind during a conversation. The more context you give, the more relevant the answers." },
      { id: "context-window", term: "Context Window", tag: "claude", it: "Quante informazioni Claude tiene a mente in una conversazione. I modelli di punta arrivano a 1 milione di token: come leggere un libro intero.", en: "How much information Claude keeps in mind during a conversation. Top models reach 1 million tokens: like reading an entire book." },
      { id: "control-system-as-a-service", term: "Control System as a Service", tag: "morfeus", it: "La categoria di Morfeus: sistemi in produzione (dati, decisioni, automazioni, affidabilità) su base continuativa, non una \"AI agency\".", en: "Morfeus's category: systems in production (data, decisions, automation, reliability) on an ongoing basis, not an \"AI agency\"." },
    ],
  },
  {
    letter: "D",
    terms: [
      { id: "deep-learning", term: "Deep Learning", tag: "ai", it: "Sottocampo del machine learning che usa reti neurali a molti strati. È alla base di quasi tutta l'AI moderna.", en: "A subfield of machine learning that uses neural networks with many layers. It underpins almost all modern AI." },
      { id: "dipendente-ai", term: "Dipendente AI", tag: "morfeus", it: "Un sistema AI con ruolo, regole e standard di qualità che esegue un lavoro completo in autonomia. Non un assistente che aspetta istruzioni.", en: "An AI system with a role, rules and quality standards that does a complete job autonomously. Not an assistant waiting for instructions." },
      { id: "dispatch", term: "Dispatch", tag: "claude", it: "La logica con cui Claude decide quale tool, skill o azione usare in base alla tua richiesta.", en: "The logic by which Claude decides which tool, skill or action to use based on your request." },
    ],
  },
  {
    letter: "E",
    terms: [
      { id: "embedding", term: "Embedding", tag: "ai", it: "La rappresentazione di parole o concetti come vettori numerici: concetti simili hanno vettori vicini. Serve per cercare e confrontare.", en: "The representation of words or concepts as numerical vectors: similar concepts have nearby vectors. Used to search and compare." },
      { id: "explainability", term: "Explainability", tag: "ai", it: "La capacità di capire perché un modello ha dato un certo output. Cruciale in sanità, finanza e giustizia.", en: "The ability to understand why a model produced a given output. Crucial in healthcare, finance and justice." },
      { id: "extended-thinking", term: "Extended Thinking", tag: "claude", it: "Quando Claude ragiona ad alta voce prima di rispondere: risposte migliori sui problemi complessi, ma più lente.", en: "When Claude reasons out loud before answering: better answers on complex problems, but slower." },
    ],
  },
  {
    letter: "F",
    terms: [
      { id: "fine-tuning", term: "Fine-tuning", tag: "ai", it: "Specializzare un modello già addestrato con dati specifici, per adattarlo a un dominio o a uno stile.", en: "Specializing an already trained model with specific data, to adapt it to a domain or a style." },
      { id: "foundation-model", term: "Foundation Model", tag: "ai", it: "Un grande modello addestrato su dati molto diversificati, generico e adattabile (GPT, Claude, Gemini).", en: "A large model trained on highly diverse data, generic and adaptable (GPT, Claude, Gemini)." },
    ],
  },
  {
    letter: "G",
    terms: [
      { id: "generative-ai", term: "Generative AI", tag: "ai", it: "AI che crea contenuti nuovi (testo, immagini, codice, video) prevedendo cosa dovrebbe venire dopo.", en: "AI that creates new content (text, images, code, video) by predicting what should come next." },
      { id: "global-instructions", term: "Global Instructions", tag: "claude", it: "Le regole che dai a Claude una volta sola (tono, formato, contesto) e che segue in ogni conversazione.", en: "The rules you give Claude once (tone, format, context) that it follows in every conversation." },
      { id: "gpu", term: "GPU", tag: "ai", it: "Processore per il calcolo parallelo, nato per i videogiochi e oggi motore dell'AI. Addestrare un grande modello richiede migliaia di GPU.", en: "A processor for parallel computing, born for video games and now the engine of AI. Training a large model takes thousands of GPUs." },
      { id: "ground-truth", term: "Ground Truth", tag: "ai", it: "Dati verificati e affidabili usati per addestrare o validare un modello. Il riferimento con cui si misura l'accuratezza.", en: "Verified, reliable data used to train or validate a model. The reference against which accuracy is measured." },
    ],
  },
  {
    letter: "H",
    terms: [
      { id: "hallucination", term: "Hallucination", tag: "ai", it: "Quando l'AI genera con sicurezza contenuti falsi. Non è un bug ma una caratteristica dei LLM: va gestita.", en: "When the AI confidently generates false content. Not a bug but a feature of LLMs: it has to be managed." },
    ],
  },
  {
    letter: "I",
    terms: [
      { id: "inference", term: "Inference", tag: "ai", it: "Il momento in cui il modello riceve un input e produce un output. Ogni risposta che ricevi è un'inferenza.", en: "The moment the model receives an input and produces an output. Every answer you get is an inference." },
    ],
  },
  {
    letter: "K",
    terms: [
      { id: "knowledge-cutoff", term: "Knowledge Cutoff", tag: "ai", it: "La data oltre la quale il modello non sa nulla, perché addestrato su dati fino a lì (salvo ricerca web in tempo reale).", en: "The date beyond which the model knows nothing, because it was trained on data up to that point (barring real-time web search)." },
    ],
  },
  {
    letter: "L",
    terms: [
      { id: "latency", term: "Latency", tag: "ai", it: "Il tempo che l'AI impiega a rispondere. Spesso è il trade-off tra qualità e velocità.", en: "The time the AI takes to respond. Often the trade-off between quality and speed." },
      { id: "llm", term: "LLM", tag: "ai", it: "Modello addestrato su enormi quantità di testo per capire e generare linguaggio. Non pensa: prevede la parola migliore, ma così bene da sembrarlo.", en: "A model trained on huge amounts of text to understand and generate language. It doesn't think: it predicts the best next word, but so well it seems to." },
    ],
  },
  {
    letter: "M",
    terms: [
      { id: "machine-learning", term: "Machine Learning", tag: "ai", it: "Tecnica con cui l'AI impara dai dati invece di essere programmata esplicitamente. Il cuore dell'AI moderna.", en: "The technique by which AI learns from data instead of being explicitly programmed. The heart of modern AI." },
      { id: "marf", term: "MARF", tag: "morfeus", it: "L'infrastruttura AI proprietaria di Morfeus, installata dentro l'azienda: raccoglie i dati, automatizza e migliora a ogni progetto. Non è un SaaS.", en: "Morfeus's proprietary AI infrastructure, installed inside the company: it collects the data, automates and improves with every project. It's not a SaaS." },
      { id: "margin-recovery", term: "Margin Recovery", tag: "morfeus", it: "Il frame di Morfeus: trovare e recuperare il margine che un'azienda perde ogni giorno mentre scala. Non è taglio costi.", en: "Morfeus's frame: finding and recovering the margin a company loses every day as it scales. It's not cost cutting." },
      { id: "max-mode", term: "Max Mode", tag: "claude", it: "Il livello massimo di Extended Thinking: nessun limite di ragionamento, per i problemi più difficili.", en: "The top level of Extended Thinking: no limit on reasoning, for the hardest problems." },
      { id: "mcp", term: "MCP", tag: "ai", it: "Model Context Protocol: standard aperto creato da Anthropic per collegare un'AI a strumenti esterni. È come l'AI smette di solo parlare e inizia ad agire.", en: "Model Context Protocol: an open standard created by Anthropic to connect an AI to external tools. It's how AI stops just talking and starts acting." },
      { id: "mcp-apps", term: "MCP Apps", tag: "claude", it: "I tool MCP che restituiscono interfacce interattive (dashboard, form), non solo testo, aggiornate sui tuoi dati reali.", en: "MCP tools that return interactive interfaces (dashboards, forms), not just text, updated on your real data." },
      { id: "memory", term: "Memory", tag: "claude", it: "Il sistema con cui Claude ricorda informazioni tra una conversazione e l'altra: preferenze, ruolo, progetti.", en: "The system by which Claude remembers information between conversations: preferences, role, projects." },
      { id: "multi-modal", term: "Multi-modal", tag: "ai", it: "Un'AI che capisce e genera non solo testo, ma anche immagini, audio e video.", en: "An AI that understands and generates not only text, but also images, audio and video." },
    ],
  },
  {
    letter: "N",
    terms: [
      { id: "neural-network", term: "Neural Network", tag: "ai", it: "Struttura ispirata al cervello, fatta di nodi connessi. È il cervello dietro il deep learning.", en: "A brain-inspired structure made of connected nodes. It's the brain behind deep learning." },
      { id: "nlp", term: "NLP", tag: "ai", it: "Natural Language Processing: il settore che fa capire il linguaggio umano alle macchine (riassunti, sentiment, traduzione).", en: "Natural Language Processing: the field that makes machines understand human language (summaries, sentiment, translation)." },
    ],
  },
  {
    letter: "O",
    terms: [
      { id: "open-weight-vs-closed-source", term: "Open Weight vs Closed Source", tag: "ai", it: "Modelli aperti (scaricabili e modificabili, es. Llama) contro chiusi (accessibili via abbonamento o API, es. Claude, GPT).", en: "Open models (downloadable and modifiable, e.g. Llama) versus closed ones (accessible via subscription or API, e.g. Claude, GPT)." },
      { id: "operating-partner", term: "Operating Partner", tag: "morfeus", it: "Il modello Morfeus: un team AI embedded che lavora dentro l'azienda con accountability sui risultati, non un fornitore a progetto.", en: "The Morfeus model: an embedded AI team that works inside the company with accountability for results, not a project-based vendor." },
      { id: "opus-sonnet-haiku", term: "Opus / Sonnet / Haiku", tag: "claude", it: "I tre modelli di Claude: Opus il più potente, Sonnet il miglior compromesso qualità-velocità, Haiku il più veloce e leggero.", en: "Claude's three models: Opus the most powerful, Sonnet the best quality-speed balance, Haiku the fastest and lightest." },
    ],
  },
  {
    letter: "P",
    terms: [
      { id: "parameters", term: "Parameters", tag: "ai", it: "Le variabili interne che il modello regola durante l'addestramento. Più parametri, più capacità di cogliere sfumature.", en: "The internal variables the model adjusts during training. More parameters, more capacity to capture nuance." },
      { id: "plugin", term: "Plugin", tag: "claude", it: "Pacchetti che aggiungono skill, tool e connettori a Cowork in un click. Come le app, ma per il tuo ambiente AI.", en: "Packages that add skills, tools and connectors to Cowork in one click. Like apps, but for your AI environment." },
      { id: "projects", term: "Projects", tag: "claude", it: "Spazi di lavoro dove carichi file di contesto che Claude legge prima di ogni conversazione del progetto.", en: "Workspaces where you upload context files that Claude reads before every conversation in the project." },
      { id: "prompt", term: "Prompt", tag: "ai", it: "L'istruzione che dai all'AI. Non una domanda: una delega. Più è precisa, migliore è il risultato.", en: "The instruction you give the AI. Not a question: a delegation. The more precise it is, the better the result." },
      { id: "prompt-engineering", term: "Prompt Engineering", tag: "ai", it: "L'arte di scrivere prompt efficaci. Non serve programmare: serve capire come ragiona l'AI.", en: "The art of writing effective prompts. No coding required: what you need is to understand how the AI reasons." },
    ],
  },
  {
    letter: "R",
    terms: [
      { id: "rag", term: "RAG", tag: "ai", it: "Retrieval-Augmented Generation: l'AI cerca in documenti reali prima di rispondere. Meno allucinazioni, più risposte ancorate ai fatti.", en: "Retrieval-Augmented Generation: the AI searches real documents before answering. Fewer hallucinations, more fact-anchored answers." },
      { id: "reasoning-model", term: "Reasoning Model", tag: "ai", it: "Modello progettato per ragionare in modo logico e sequenziale, spiegando il proprio processo.", en: "A model designed to reason logically and sequentially, explaining its own process." },
      { id: "reinforcement-learning", term: "Reinforcement Learning", tag: "ai", it: "L'AI impara provando, sbagliando e ricevendo premi o penalità. Usata per giochi, robotica, ottimizzazione.", en: "The AI learns by trying, failing and receiving rewards or penalties. Used for games, robotics, optimization." },
      { id: "roiometro", term: "ROIometro", tag: "morfeus", it: "Il calcolatore Morfeus che mostra quanto perdi ogni mese e quanto puoi recuperare con l'AI.", en: "The Morfeus calculator that shows how much you lose every month and how much you can recover with AI." },
    ],
  },
  {
    letter: "S",
    terms: [
      { id: "salescraft", term: "Salescraft", tag: "morfeus", it: "Il layer AI di Morfeus che automatizza il lavoro ripetitivo del team commerciale, restituendo ore alle attività che generano fatturato.", en: "The Morfeus AI layer that automates the sales team's repetitive work, giving hours back to the activities that generate revenue." },
      { id: "scheduled-tasks", term: "Scheduled Tasks", tag: "claude", it: "Compiti che Claude esegue in automatico a orari definiti, anche quando non ci sei (report del lunedì, monitoraggio competitor).", en: "Tasks Claude runs automatically at set times, even when you're away (Monday reports, competitor monitoring)." },
      { id: "skill", term: "Skill", tag: "claude", it: "Un file che insegna a Claude un compito specifico. Come assumere un dipendente specializzato in 5 secondi: creabile, condivisibile, installabile.", en: "A file that teaches Claude a specific task. Like hiring a specialized employee in 5 seconds: creatable, shareable, installable." },
      { id: "supervised-learning", term: "Supervised Learning", tag: "ai", it: "Addestramento su dati già etichettati (input più output corretto), es. riconoscere spam da migliaia di email classificate.", en: "Training on already labeled data (input plus correct output), e.g. recognizing spam from thousands of classified emails." },
      { id: "system-prompt", term: "System Prompt", tag: "ai", it: "Le istruzioni invisibili che definiscono chi è l'AI e come si comporta. L'utente non le vede, ma determinano tutto.", en: "The invisible instructions that define who the AI is and how it behaves. The user doesn't see them, but they determine everything." },
    ],
  },
  {
    letter: "T",
    terms: [
      { id: "temperature", term: "Temperature", tag: "ai", it: "Quanto l'AI rischia: bassa = preciso e prevedibile, alta = creativo e imprevedibile.", en: "How much the AI takes risks: low = precise and predictable, high = creative and unpredictable." },
      { id: "tokenization", term: "Tokenization", tag: "ai", it: "Il processo che spezza il testo in token (pezzi) che il modello elabora. Tutto ciò che scrivi e ricevi si misura in token.", en: "The process that breaks text into tokens (pieces) the model processes. Everything you write and receive is measured in tokens." },
      { id: "tool-use", term: "Tool Use", tag: "claude", it: "La capacità di Claude di usare strumenti in conversazione: cercare sul web, leggere file, eseguire codice, chiamare API.", en: "Claude's ability to use tools in conversation: search the web, read files, run code, call APIs." },
      { id: "tpu", term: "TPU", tag: "ai", it: "Processore progettato da Google per accelerare l'addestramento, ottimizzato per le reti neurali su larga scala.", en: "A processor designed by Google to accelerate training, optimized for large-scale neural networks." },
      { id: "training", term: "Training", tag: "ai", it: "La fase in cui il modello impara dai dati. Può durare mesi e costare milioni in compute.", en: "The phase in which the model learns from data. It can take months and cost millions in compute." },
      { id: "transformer", term: "Transformer", tag: "ai", it: "L'architettura alla base di tutti i LLM moderni (2017). Gestisce relazioni tra parole anche lontane nel testo.", en: "The architecture behind all modern LLMs (2017). It handles relationships between words even far apart in the text." },
    ],
  },
  {
    letter: "U",
    terms: [
      { id: "unsupervised-learning", term: "Unsupervised Learning", tag: "ai", it: "L'AI impara da dati non etichettati, scoprendo da sola pattern e strutture.", en: "The AI learns from unlabeled data, discovering patterns and structures on its own." },
    ],
  },
  {
    letter: "V",
    terms: [
      { id: "value-leak", term: "Value Leak", tag: "morfeus", it: "Le perdite di margine invisibili nei processi che le aziende non vedono mentre scalano. Morfeus le quantifica in euro.", en: "The invisible margin losses in processes that companies don't see as they scale. Morfeus quantifies them in euros." },
      { id: "value-report", term: "Value Report", tag: "morfeus", it: "Il report mensile con cui Morfeus dice al CEO quanto valore ha generato, in euro e non in slide.", en: "The monthly report in which Morfeus tells the CEO how much value it generated, in euros and not in slides." },
      { id: "vibe-coding", term: "Vibe Coding", tag: "ai", it: "Scrivere software descrivendo a parole cosa vuoi e lasciando che l'AI generi il codice. Possibile anche per non-programmatori.", en: "Writing software by describing in words what you want and letting the AI generate the code. Possible even for non-programmers." },
    ],
  },
  {
    letter: "W",
    terms: [
      { id: "weights", term: "Weights", tag: "ai", it: "I valori numerici interni che il modello impara nell'addestramento e che determinano i suoi output. \"Open weight\" = sono pubblici.", en: "The internal numerical values the model learns in training that determine its outputs. \"Open weight\" = they are public." },
    ],
  },
];

const COPY = {
  it: {
    metaTitle: "Glossario AI · Morfeus",
    metaDesc:
      "Glossario AI di Morfeus: 80+ termini dell'intelligenza artificiale e dell'ecosistema Claude spiegati senza fuffa, più i concetti proprietari Morfeus.",
    hero: {
      eye: "Glossario",
      h1a: "Il vocabolario dell'AI, ",
      h1emph: "senza fuffa",
      h1b: ".",
      copy: "I termini dell'intelligenza artificiale e dell'ecosistema Claude spiegati in modo semplice, più i concetti proprietari di Morfeus. Quelli marcati Morfeus sono i concetti proprietari con cui lavoriamo ogni giorno.",
      legendEye: "Legenda",
      legend: [
        { tag: "morfeus" as Tag, note: "concetti proprietari Morfeus" },
        { tag: "ai" as Tag, note: "termini generali dell'AI" },
        { tag: "claude" as Tag, note: "ecosistema Claude" },
      ],
    },
    azLabel: "Indice alfabetico",
    cta: {
      eye: "Dalla teoria alla pratica",
      h2a: "Smetti di studiare l'AI. Inizia a ",
      h2emph: "recuperare margine",
      h2b: ".",
      p: "Il vocabolario serve a poco se resta teoria. Il primo passo concreto: capire, in euro, dove la tua azienda perde valore ogni giorno.",
      cta1: "Prova il ROIometro",
      cta2: "Parla con noi",
    },
  },
  en: {
    metaTitle: "AI Glossary · Morfeus",
    metaDesc:
      "Morfeus AI glossary: 80+ terms of artificial intelligence and the Claude ecosystem explained without the fluff, plus the proprietary Morfeus concepts.",
    hero: {
      eye: "Glossary",
      h1a: "The vocabulary of AI, ",
      h1emph: "without the fluff",
      h1b: ".",
      copy: "The terms of artificial intelligence and the Claude ecosystem explained simply, plus the proprietary concepts of Morfeus. The ones marked Morfeus are the proprietary concepts we work with every day.",
      legendEye: "Legend",
      legend: [
        { tag: "morfeus" as Tag, note: "proprietary Morfeus concepts" },
        { tag: "ai" as Tag, note: "general AI terms" },
        { tag: "claude" as Tag, note: "Claude ecosystem" },
      ],
    },
    azLabel: "Alphabetical index",
    cta: {
      eye: "From theory to practice",
      h2a: "Stop studying AI. Start ",
      h2emph: "recovering margin",
      h2b: ".",
      p: "A vocabulary is worth little if it stays theory. The concrete first step: understanding, in euros, where your company loses value every day.",
      cta1: "Try the ROIometro",
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
    alternates: buildLocaleAlternates("glossario", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/glossario`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function GlossarioPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const base = `/${safeLocale}`;
  const glossaryId = `${SITE_URL}/${safeLocale}/glossario#glossary`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": glossaryId,
    name: t.metaTitle,
    description: t.metaDesc,
    inLanguage: isIt ? "it-IT" : "en-US",
    url: `${SITE_URL}/${safeLocale}/glossario`,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    hasDefinedTerm: GROUPS.flatMap((g) =>
      g.terms.map((term) => ({
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/${safeLocale}/glossario#${term.id}`,
        name: term.term,
        description: isIt ? term.it : term.en,
        inDefinedTermSet: { "@id": glossaryId },
      }))
    ),
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
          <div className="mt-8">
            <div className="eye mb-3">{t.hero.legendEye}</div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
              {t.hero.legend.map((l) => (
                <li key={l.tag} className="flex items-center gap-2">
                  <span
                    className={`font-plex font-semibold text-[9px] leading-none tracking-[0.12em] uppercase rounded-[5px] px-[7px] py-[3px] whitespace-nowrap ${BADGE[l.tag].cls}`}
                  >
                    {BADGE[l.tag].label}
                  </span>
                  <span className="text-[13px] text-[#c2c6d4]">{l.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 · TERMINI · CARTA */}
      <section className="band carta" id="glossario">
        {/* A-Z sticky: ancore on-page verso i gruppi */}
        <nav
          aria-label={t.azLabel}
          className="sticky top-[60px] z-30 -mt-[clamp(64px,9vw,104px)] mb-8 border-y border-inchiostro/10 bg-carta/95 backdrop-blur-[10px]"
        >
          <div className="mx-auto flex max-w-[var(--maxw)] flex-wrap gap-1.5 px-[clamp(20px,5vw,40px)] py-2.5">
            {GROUPS.map((g) => (
              <a
                key={g.letter}
                href={`#${g.letter}`}
                className="rounded-md px-2.5 py-1 font-plex text-[12px] text-ombra transition-colors hover:bg-firma hover:text-white"
              >
                {g.letter}
              </a>
            ))}
          </div>
        </nav>

        <div className="wrap">
          {GROUPS.map((g) => (
            <div
              key={g.letter}
              id={g.letter}
              className="grid grid-cols-1 items-start gap-7 border-b border-inchiostro/10 py-9 scroll-mt-[118px] last:border-b-0 md:grid-cols-[110px_1fr]"
            >
              <h2 className="font-clash text-[clamp(40px,6vw,64px)] font-semibold leading-none tracking-[-0.02em] text-firma md:sticky md:top-[118px]">
                {g.letter}
              </h2>
              <div className="flex flex-col">
                {g.terms.map((term) => (
                  <div
                    key={term.id}
                    id={term.id}
                    className="border-t border-inchiostro/10 py-5 scroll-mt-[120px] first:border-t-0"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[clamp(19px,2.2vw,22px)] font-semibold text-inchiostro">
                        {term.term}
                      </h3>
                      <span
                        className={`font-plex font-semibold text-[9px] leading-none tracking-[0.12em] uppercase rounded-[5px] px-[7px] py-[3px] whitespace-nowrap ${BADGE[term.tag].cls}`}
                      >
                        {BADGE[term.tag].label}
                      </span>
                    </div>
                    <p className="mt-2 max-w-[74ch] text-[15px] text-[#3a3b45]">
                      {isIt ? term.it : term.en}
                    </p>
                  </div>
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
            <Link className="btn btn-1" href={`${base}/roiometro`}>
              {t.cta.cta1}
            </Link>
            <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
