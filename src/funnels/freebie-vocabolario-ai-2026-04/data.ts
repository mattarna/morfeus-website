// ─── DATI VOCABOLARIO AI + CLAUDE ─────────────────────────────────────────────
//
// Manteniamo i dati separati dalla view per leggibilità e per facilitare
// aggiornamenti futuri (es. integrazione con CMS o nuovo termine).
//
// Ogni termine ha:
// - id: slug usato come anchor (#term-...)
// - term: nome leggibile
// - body: definizione (può contenere <strong>, <em>, niente HTML pesante)
// - keywords: parole-chiave aggiuntive per la ricerca (oltre al term stesso)

export interface VocabTerm {
  id: string;
  term: string;
  body: string;
  keywords?: string[];
}

export interface VocabUseCase {
  id: string;
  title: string;
  body: string;
}

export interface VocabUseCaseGroup {
  id: string;
  category: string;
  cases: VocabUseCase[];
}

// ─── SEZIONE 1 — VOCABOLARIO AI ──────────────────────────────────────────────

export const AI_TERMS: VocabTerm[] = [
  {
    id: "agi",
    term: "AGI (Intelligenza Artificiale Generale)",
    body: "Un'AI capace di apprendere, ragionare e risolvere problemi come un essere umano, senza limiti di dominio. Non esiste ancora. È il \"Santo Graal\" dell'AI. Quando qualcuno dice \"ci siamo quasi\", probabilmente sta vendendo qualcosa.",
    keywords: ["agi", "intelligenza artificiale generale", "general intelligence"],
  },
  {
    id: "ai-agents",
    term: "AI Agents (Agenti AI)",
    body: "Sistemi autonomi che non si limitano a rispondere: prendono decisioni, eseguono azioni, imparano dai risultati. A differenza di un chatbot, un agente ha obiettivi, memoria, e può operare in ambienti complessi. Esempio: un agente che prenota riunioni, risponde a clienti, aggiorna il CRM e migliora col tempo.",
    keywords: ["agente", "agenti", "agentic"],
  },
  {
    id: "ai-alignment",
    term: "AI Alignment (Allineamento dell'AI)",
    body: "Processo per garantire che l'AI segua valori umani e obiettivi desiderati. Fondamentale per evitare che un'AI, nel tentativo di ottimizzare una metrica, prenda scorciatoie dannose. Non è fantascienza: è ingegneria della sicurezza.",
    keywords: ["alignment", "allineamento", "sicurezza"],
  },
  {
    id: "ai-model",
    term: "AI Model (Modello AI)",
    body: "La struttura matematica addestrata per svolgere compiti specifici. È il \"motore\" che genera risposte. GPT-4, Claude Opus, Gemini sono tutti modelli AI. Ogni modello ha caratteristiche, limiti e costi diversi.",
    keywords: ["modello", "model"],
  },
  {
    id: "ai-wrapper",
    term: "AI Wrapper",
    body: "Strato software che semplifica l'uso di un modello AI. Incapsula il modello e lo rende accessibile tramite interfacce intuitive. Esempio: un'app che ti permette di usare Claude con un click dentro Slack o Notion, senza toccare l'API.",
    keywords: ["wrapper", "applicazione"],
  },
  {
    id: "api",
    term: "API (Application Programming Interface)",
    body: "Il modo in cui due software si parlano. Quando Claude si collega a Gmail o Slack, usa un'API. Quando un'azienda integra l'AI nei propri sistemi, passa dall'API. È il ponte tra \"l'AI esiste\" e \"l'AI funziona nel mio lavoro\".",
    keywords: ["application programming interface", "integrazione"],
  },
  {
    id: "benchmark",
    term: "Benchmark",
    body: "Test standardizzati per confrontare le prestazioni dei modelli AI. Come un esame scolastico, ma per le macchine. Utili per capire quale modello è migliore per cosa. Attenzione: i benchmark non dicono tutto. Un modello può eccellere nei test e deludere nell'uso reale.",
    keywords: ["test", "valutazione"],
  },
  {
    id: "chatbot",
    term: "Chatbot",
    body: "Programma che simula una conversazione umana. Può essere semplice (basato su regole: \"se dici X, rispondo Y\") o avanzato (alimentato da un LLM come Claude o GPT). I chatbot moderni capiscono contesto, tono e intenzione.",
    keywords: ["bot", "chat"],
  },
  {
    id: "chain-of-thought",
    term: "Chain of Thought (CoT)",
    body: "Tecnica in cui l'AI viene guidata a ragionare passo-passo. Invece di sparare una risposta diretta, elabora una catena logica di passaggi intermedi. Migliora l'accuratezza su problemi complessi come matematica, logica, decisioni strategiche.",
    keywords: ["cot", "ragionamento", "step by step"],
  },
  {
    id: "compute",
    term: "Compute (Potenza di Calcolo)",
    body: "Le risorse computazionali necessarie per far funzionare i modelli AI. Include GPU, CPU, RAM. Più compute = modelli più potenti = costi più alti. È il carburante dell'AI.",
    keywords: ["potenza di calcolo", "calcolo"],
  },
  {
    id: "computer-vision",
    term: "Computer Vision (Visione Artificiale)",
    body: "La branca dell'AI che permette a un sistema di \"vedere\" e interpretare immagini o video. Riconosce oggetti, volti, testi, azioni. Usata nel controllo qualità in fabbrica, nell'analisi di immagini mediche, nel riconoscimento facciale.",
    keywords: ["visione artificiale", "image recognition", "vision"],
  },
  {
    id: "context",
    term: "Context (Contesto)",
    body: "L'insieme delle informazioni che l'AI \"tiene a mente\" durante una conversazione. Più contesto le dai, più le risposte sono precise e pertinenti. Il contesto ha un limite (la context window): superato quello, l'AI dimentica.",
    keywords: ["contesto"],
  },
  {
    id: "deep-learning",
    term: "Deep Learning (Apprendimento Profondo)",
    body: "Sottocampo del Machine Learning che usa reti neurali con molti strati per apprendere da dati complessi. È alla base di quasi tutta l'AI moderna: riconoscimento immagini, linguaggio, audio, video.",
    keywords: ["apprendimento profondo", "reti neurali profonde"],
  },
  {
    id: "embedding",
    term: "Embedding",
    body: "Tecnica per rappresentare parole, frasi o concetti come vettori numerici. Più due concetti sono simili, più i loro vettori sono \"vicini\". Serve per cercare, confrontare, raggruppare informazioni in modo efficiente. \"Gatto\" e \"felino\" hanno embedding simili. \"Gatto\" e \"stampante\" no.",
    keywords: ["embeddings", "vettori"],
  },
  {
    id: "explainability",
    term: "Explainability (Spiegabilità)",
    body: "La capacità di capire e spiegare perché un modello AI ha dato un certo output. In sanità, finanza, giustizia non basta sapere cosa ha deciso l'AI. Serve sapere perché.",
    keywords: ["spiegabilita", "interpretability", "spiegabilità"],
  },
  {
    id: "fine-tuning",
    term: "Fine-tuning (Affinamento)",
    body: "Tecnica per specializzare un modello AI già addestrato. Parti da un modello generico e lo \"rifinisci\" con dati specifici. Esempio: addestrare Claude sulle email del tuo customer support per farlo rispondere come il tuo team.",
    keywords: ["finetuning", "affinamento"],
  },
  {
    id: "foundation-model",
    term: "Foundation Model (Modello Fondativo)",
    body: "Un modello AI di grandi dimensioni, addestrato su enormi quantità di dati diversificati. È generico e adattabile: può essere poi specializzato per compiti specifici. GPT-4, Claude, Gemini sono tutti foundation model.",
    keywords: ["modello fondativo", "foundation"],
  },
  {
    id: "generative-ai",
    term: "Generative AI (AI Generativa)",
    body: "AI progettata per creare contenuti nuovi: testo, immagini, musica, codice, video. Funziona prevedendo, parola dopo parola o pixel dopo pixel, cosa \"dovrebbe\" venire dopo. Tutto quello che fai con ChatGPT o Claude è AI generativa.",
    keywords: ["genai", "ai generativa", "generativa"],
  },
  {
    id: "gpu",
    term: "GPU (Graphics Processing Unit)",
    body: "Processore specializzato nel calcolo parallelo. Originariamente creato per la grafica dei videogiochi, oggi è il motore dell'AI. Permette di eseguire milioni di operazioni contemporaneamente. Addestrare un modello come GPT-4 richiede migliaia di GPU per mesi.",
    keywords: ["graphics processing unit", "scheda video"],
  },
  {
    id: "ground-truth",
    term: "Ground Truth (Verità di Base)",
    body: "Dati verificati, corretti e affidabili usati per addestrare o validare un modello AI. È il punto di riferimento con cui si misura l'accuratezza delle previsioni dell'AI.",
    keywords: ["verita di base", "verità"],
  },
  {
    id: "hallucination",
    term: "Hallucination (Allucinazione)",
    body: "Quando l'AI genera contenuti falsi con totale sicurezza. Cita studi inesistenti, inventa funzioni mai create, fornisce dati sbagliati in modo convincente. Non è un bug: è una caratteristica del funzionamento dei LLM. Va gestita, non ignorata.",
    keywords: ["allucinazione", "hallucinations"],
  },
  {
    id: "inference",
    term: "Inference (Inferenza)",
    body: "Il momento in cui un modello AI riceve un input e produce un output. Ogni risposta che ricevi è un'inferenza. Costa tempo, energia e token. Diverso dall'addestramento: l'addestramento insegna, l'inferenza applica.",
    keywords: ["inferenza"],
  },
  {
    id: "knowledge-cutoff",
    term: "Knowledge Cutoff",
    body: "La data oltre la quale l'AI non sa nulla. Il modello è stato addestrato su dati fino a quella data. Tutto ciò che è successo dopo, non lo conosce (a meno che non usi strumenti di ricerca web in tempo reale).",
    keywords: ["cutoff", "data limite"],
  },
  {
    id: "latency",
    term: "Latency (Latenza)",
    body: "Il tempo che l'AI impiega a rispondere. Cruciale per applicazioni in tempo reale. Un modello più potente spesso ha latenza più alta. È il trade-off tra qualità e velocità.",
    keywords: ["latenza", "velocità"],
  },
  {
    id: "llm",
    term: "LLM (Large Language Model)",
    body: "Modello AI addestrato su enormi quantità di testo per comprendere e generare linguaggio naturale. È il \"cervello\" dietro ChatGPT, Claude, Gemini. Non pensa: prevede la prossima parola migliore. Ma lo fa talmente bene che sembra pensare.",
    keywords: ["large language model", "modello linguistico"],
  },
  {
    id: "machine-learning",
    term: "Machine Learning (Apprendimento Automatico)",
    body: "Tecnica con cui l'AI impara dai dati senza essere programmata esplicitamente. Le dai esempi, e il sistema impara a replicare la relazione tra input e output. È il cuore di quasi tutta l'AI moderna.",
    keywords: ["ml", "apprendimento automatico"],
  },
  {
    id: "mcp",
    term: "MCP (Model Context Protocol)",
    body: "Standard aperto per collegare un modello AI a strumenti esterni (CRM, database, app aziendali) in modo strutturato. Creato da Anthropic, adottato da tutto il settore. Oltre 10.000 server MCP attivi nel 2026. È il modo in cui l'AI smette di \"solo parlare\" e inizia ad agire.",
    keywords: ["model context protocol", "anthropic mcp", "connector"],
  },
  {
    id: "multi-modal",
    term: "Multi-modal",
    body: "Un'AI che capisce e genera non solo testo, ma anche immagini, audio, video. Claude, GPT-4 e Gemini sono multi-modali: puoi caricare una foto e chiedere di analizzarla. O un PDF e chiedere di riassumerlo.",
    keywords: ["multimodale", "multimodal", "immagini"],
  },
  {
    id: "neural-network",
    term: "Neural Network (Rete Neurale)",
    body: "Struttura ispirata al cervello umano, composta da nodi (neuroni artificiali) connessi tra loro. È il \"cervello\" dietro il deep learning. Consente all'AI di apprendere pattern complessi nei dati.",
    keywords: ["rete neurale", "neural net"],
  },
  {
    id: "nlp",
    term: "NLP (Natural Language Processing)",
    body: "Il settore dell'AI che si occupa di far capire il linguaggio umano alle macchine. Include sentiment analysis, riassunti automatici, chatbot, traduzione. Ogni volta che parli con un'AI, c'è NLP dietro.",
    keywords: ["natural language processing", "elaborazione linguaggio"],
  },
  {
    id: "open-weight",
    term: "Open Weight vs Closed Source",
    body: "Modelli aperti (Llama, Mistral, DeepSeek) vs chiusi (Claude, GPT). Open weight = puoi scaricarli, modificarli, hostare dove vuoi. Closed source = più potenti, accessibili solo via abbonamento o API. Non esiste una scelta \"giusta\": dipende dall'uso.",
    keywords: ["open source", "closed source", "llama", "mistral", "open weights"],
  },
  {
    id: "parameters",
    term: "Parameters (Parametri)",
    body: "Le variabili interne che un modello regola durante l'addestramento. Più parametri = più capacità di cogliere sfumature. GPT-3 ha 175 miliardi di parametri. I modelli recenti ne hanno molti di più (numeri spesso non pubblici).",
    keywords: ["parametri", "params"],
  },
  {
    id: "prompt",
    term: "Prompt",
    body: "L'istruzione che dai all'AI. Non è una domanda. È una delega. Più è precisa, contestualizzata e strutturata, migliore è il risultato. La differenza tra un prompt mediocre e un prompt eccellente è la differenza tra un risultato inutile e uno che ti cambia la giornata.",
    keywords: ["istruzione"],
  },
  {
    id: "prompt-engineering",
    term: "Prompt Engineering",
    body: "L'arte e la tecnica di scrivere prompt efficaci. Un prompt ben progettato trasforma una risposta generica in una risposta precisa e utile. Non serve essere programmatori: serve capire come ragiona l'AI.",
    keywords: ["prompting"],
  },
  {
    id: "rag",
    term: "RAG (Retrieval-Augmented Generation)",
    body: "Tecnica in cui l'AI cerca informazioni in documenti reali prima di rispondere. Unisce la potenza generativa dei LLM alla precisione della ricerca. Meno allucinazioni, più risposte ancorate ai fatti.",
    keywords: ["retrieval augmented generation"],
  },
  {
    id: "reasoning-model",
    term: "Reasoning Model (Modello di Ragionamento)",
    body: "Modelli progettati per ragionare in modo logico e sequenziale. Deducono, confrontano ipotesi, spiegano il loro processo. Claude con Extended Thinking è un reasoning model.",
    keywords: ["modello di ragionamento", "thinking"],
  },
  {
    id: "reinforcement-learning",
    term: "Reinforcement Learning (Apprendimento per Rinforzo)",
    body: "Tecnica in cui l'AI impara provando, sbagliando e ricevendo premi o penalità. Usata per giochi, robotica, ottimizzazione di decisioni. È così che i modelli imparano a essere \"utili\" e non solo \"precisi\".",
    keywords: ["rl", "apprendimento per rinforzo"],
  },
  {
    id: "supervised-learning",
    term: "Supervised Learning (Apprendimento Supervisionato)",
    body: "Metodo di addestramento in cui l'AI impara da dati già etichettati (input + output corretto). Esempio: addestrare un modello a riconoscere spam mostrandogli migliaia di email già classificate.",
    keywords: ["apprendimento supervisionato", "supervised"],
  },
  {
    id: "system-prompt",
    term: "System Prompt",
    body: "Le istruzioni invisibili che definiscono chi è l'AI, come si comporta, cosa non deve fare. L'utente non le vede, ma determinano tutto. È il DNA di ogni conversazione. Ogni app che usa un LLM ha un system prompt dietro.",
    keywords: ["system message"],
  },
  {
    id: "temperature",
    term: "Temperature",
    body: "Quanto l'AI \"rischia\" nelle risposte. Temperatura bassa = preciso, prevedibile, affidabile. Temperatura alta = creativo, sorprendente, imprevedibile. Per analisi dati vuoi temperatura bassa. Per brainstorming, alta.",
    keywords: ["temperatura"],
  },
  {
    id: "tokenization",
    term: "Tokenization (Tokenizzazione)",
    body: "Il processo che suddivide il testo in \"pezzi\" (token) che il modello può elaborare. Un token può essere una parola, parte di parola o un singolo carattere. Una parola italiana = circa 1.5 token. Tutto ciò che scrivi e ricevi viene misurato in token.",
    keywords: ["token", "tokenizzazione"],
  },
  {
    id: "tpu",
    term: "TPU (Tensor Processing Unit)",
    body: "Processore progettato da Google per accelerare l'addestramento dei modelli AI. Simile alle GPU, ma ancora più ottimizzato per operazioni su reti neurali su larga scala.",
    keywords: ["tensor processing unit", "google tpu"],
  },
  {
    id: "training",
    term: "Training (Addestramento)",
    body: "La fase in cui un modello AI \"impara\" dai dati. Può durare settimane o mesi, costa milioni di dollari in compute. È la fase in cui il modello si costruisce. Dopo il training, il modello è pronto per l'inferenza.",
    keywords: ["addestramento", "train"],
  },
  {
    id: "transformer",
    term: "Transformer",
    body: "L'architettura alla base di tutti i LLM moderni. Introdotta nel 2017 con il paper \"Attention is All You Need\". Permette di gestire relazioni tra parole anche lontane nel testo. Senza il Transformer, non esisterebbero ChatGPT, Claude, Gemini.",
    keywords: ["attention", "architettura"],
  },
  {
    id: "unsupervised-learning",
    term: "Unsupervised Learning (Apprendimento Non Supervisionato)",
    body: "Metodo in cui l'AI impara da dati non etichettati, scoprendo pattern e strutture da sola. Usato per clustering, riduzione della complessità, scoperta di anomalie.",
    keywords: ["apprendimento non supervisionato", "unsupervised"],
  },
  {
    id: "vibe-coding",
    term: "Vibe Coding",
    body: "Scrivere software descrivendo a parole cosa vuoi, lasciando che l'AI generi il codice. Non scrivi codice: descrivi l'intenzione. Claude Code e strumenti simili lo rendono possibile anche per non-programmatori.",
    keywords: ["vibecoding", "no-code", "natural language coding"],
  },
  {
    id: "weights",
    term: "Weights (Pesi)",
    body: "I valori numerici interni che un modello impara durante l'addestramento. Determinano come il modello elabora gli input e produce output. Quando si parla di \"open weight\", si intende che questi valori sono pubblici e scaricabili.",
    keywords: ["pesi", "model weights"],
  },
];

// ─── SEZIONE 2A — PRODOTTI CLAUDE ────────────────────────────────────────────

export const CLAUDE_PRODUCTS: VocabTerm[] = [
  {
    id: "claude-chat",
    term: "Claude Chat",
    body: "L'interfaccia conversazionale su claude.ai. Scrivi, carichi file, ragioni. È il punto d'ingresso. Disponibile gratis (con limiti) o con piani a pagamento (Pro, Max, Team, Enterprise). Supporta Projects, Memory e Artifacts.",
  },
  {
    id: "claude-cowork",
    term: "Claude Cowork",
    body: "L'ambiente desktop agentico. Claude accede ai tuoi file, installa plugin, esegue task complessi, crea documenti, naviga il web. Non è una chat: è un ufficio AI dove Claude lavora per te. Disponibile con piano Max. Lanciato su Windows il 10 febbraio 2026 con piena parità rispetto a macOS.",
  },
  {
    id: "claude-code",
    term: "Claude Code",
    body: "L'agente da terminale. Scrive codice, gestisce repository GitHub, lancia task programmati, opera anche a computer spento. Pensato per sviluppatori, ma sempre più usato anche da non-tecnici per automazioni avanzate. Supporta context window fino a 1M di token.",
  },
  {
    id: "claude-design",
    term: "Claude Design",
    body: "Lo strumento di design visivo. Crea prototipi, pitch deck, slide, one-pager, mockup UI, asset marketing. Due pannelli: chat a sinistra, canvas a destra. Può passare il lavoro a Claude Code per trasformarlo in codice reale. Lanciato il 17 aprile 2026, in research preview.",
  },
  {
    id: "claude-in-chrome",
    term: "Claude in Chrome",
    body: "Estensione browser. Claude vede la pagina attiva, naviga siti web, compila form, estrae dati. Come avere un assistente che guarda lo schermo con te e agisce. Beta disponibile per tutti gli abbonati paid.",
  },
  {
    id: "claude-for-excel",
    term: "Claude for Excel",
    body: "Add-in Microsoft Office. Legge workbook multi-tab con riferimenti cella per cella, modifica valori preservando formule, rileva e corregge errori. Da marzo 2026 condivide il contesto con PowerPoint nella stessa conversazione.",
  },
  {
    id: "claude-for-powerpoint",
    term: "Claude for PowerPoint",
    body: "Add-in Microsoft Office. Legge la formattazione esistente del tuo deck (layout, font, colori, master slide) e crea contenuti con oggetti nativi PowerPoint (grafici reali, non immagini statiche). Lanciato il 5 febbraio 2026.",
  },
  {
    id: "claude-security",
    term: "Claude Security",
    body: "Scansiona codebase per vulnerabilità e genera patch di sicurezza. Beta pubblica dal 30 aprile 2026. Pensato per team di cybersecurity e sviluppatori che vogliono codice più sicuro.",
  },
];

// ─── SEZIONE 2B — TERMINI OPERATIVI CLAUDE ───────────────────────────────────

export const CLAUDE_OPS: VocabTerm[] = [
  {
    id: "anthropic",
    term: "Anthropic",
    body: "L'azienda dietro Claude. Fondata da ex-ricercatori di OpenAI (Dario e Daniela Amodei), focalizzata sulla costruzione di AI sicura e affidabile. Sede a San Francisco.",
  },
  {
    id: "opus-sonnet-haiku",
    term: "Opus / Sonnet / Haiku",
    body: "I tre modelli di Claude. Opus è il più potente: ragiona in profondità, gestisce problemi complessi, costa di più. Sonnet è il miglior compromesso tra qualità e velocità per l'uso quotidiano. Haiku è il più veloce e leggero, ideale per compiti semplici e ripetitivi. Versioni attuali: Opus 4.7, Sonnet 4.6, Haiku 4.5.",
    keywords: ["opus", "sonnet", "haiku", "modelli claude"],
  },
  {
    id: "context-window",
    term: "Context Window",
    body: "La quantità di informazioni che Claude può \"tenere a mente\" in una singola conversazione. Opus 4.7 e Sonnet 4.6 arrivano a 1 milione di token (via API e Claude Code). Haiku 4.5 arriva a 200K. Tradotto: Claude può leggere un intero libro in una conversazione.",
    keywords: ["1m token", "finestra contesto"],
  },
  {
    id: "extended-thinking",
    term: "Extended Thinking",
    body: "Quando Claude \"ragiona ad alta voce\" prima di rispondere. Attivabile su richiesta. Produce risposte significativamente migliori su problemi complessi (analisi, strategia, codice), ma è più lento e consuma più token. Disponibile su Opus e Sonnet.",
    keywords: ["thinking", "ragionamento esteso"],
  },
  {
    id: "max-mode",
    term: "Max Mode",
    body: "Il livello massimo di Extended Thinking. Nessun limite di token nel ragionamento: Claude usa tutta la capacità di cui ha bisogno per arrivare alla risposta migliore. Per i problemi più difficili.",
  },
  {
    id: "adaptive-thinking",
    term: "Adaptive Thinking",
    body: "Claude decide automaticamente quanto ragionare in base alla complessità della tua domanda. Domanda semplice = risposta rapida. Problema complesso = ragionamento profondo. Non devi più impostare nulla manualmente.",
  },
  {
    id: "projects",
    term: "Projects",
    body: "Spazi di lavoro dove carichi file di contesto. Claude li legge prima di iniziare qualsiasi conversazione in quel progetto. Più contesto gli dai, meno devi spiegare ogni volta. Gratuiti per tutti dal 2026.",
    keywords: ["progetto", "spazio di lavoro"],
  },
  {
    id: "memory",
    term: "Memory",
    body: "Il sistema con cui Claude ricorda informazioni tra una conversazione e l'altra. Quello che impara oggi (le tue preferenze, il tuo ruolo, i tuoi progetti), lo sa domani. Gratuito per tutti dal 2 marzo 2026.",
    keywords: ["memoria"],
  },
  {
    id: "chat-search",
    term: "Chat Search",
    body: "Ricerca nelle conversazioni passate. Claude cerca nelle tue vecchie chat per trovare contesto rilevante. Come un archivio intelligente delle tue interazioni. Solo piani paid.",
    keywords: ["ricerca chat", "search"],
  },
  {
    id: "skill",
    term: "Skill",
    body: "Un file .md che insegna a Claude un compito specifico. Come assumere un dipendente specializzato in 5 secondi. Creabile, condivisibile, installabile. Una skill per i caroselli Instagram, una per le sales page, una per l'analisi contratti. Ognuna trasforma Claude in un esperto di quel dominio.",
    keywords: ["skills", "claude skills"],
  },
  {
    id: "plugin",
    term: "Plugin",
    body: "Pacchetti che aggiungono skill, tool e connettori a Cowork in un click. Come le app dello smartphone, ma per il tuo ambiente AI. Esistono plugin per marketing, engineering, design, sales, operations.",
    keywords: ["plugins"],
  },
  {
    id: "mcp-connector",
    term: "MCP / Connector",
    body: "Il ponte tra Claude e i tuoi strumenti esterni. Canva, Slack, Google Drive, Notion, GitHub, Gmail. Claude non solo pensa: agisce direttamente nei tuoi tool. Un Connector è un MCP già configurato e pronto all'uso dentro Cowork.",
    keywords: ["connector", "connectors"],
  },
  {
    id: "mcp-apps",
    term: "MCP Apps",
    body: "Da gennaio 2026, i tool MCP possono restituire componenti UI interattivi: dashboard, form, visualizzazioni. Non solo testo. Claude può creare interfacce funzionanti che si aggiornano con i tuoi dati reali.",
  },
  {
    id: "artifact",
    term: "Artifact",
    body: "Un output visivo che Claude crea dentro la conversazione. Pagine HTML, grafici, dashboard, componenti React. Non è testo: è qualcosa che puoi vedere, usare, esportare. Gratuito per tutti.",
    keywords: ["artifacts"],
  },
  {
    id: "global-instructions",
    term: "Global Instructions",
    body: "Le regole che dai a Claude una volta sola. Tono di voce, formato preferito, cose da evitare, contesto sul tuo ruolo. Le segue in ogni conversazione senza che tu le ripeta. Il tuo \"manuale del dipendente\" per l'AI.",
    keywords: ["istruzioni globali", "preferences"],
  },
  {
    id: "claude-md",
    term: "CLAUDE.md",
    body: "Il file di istruzioni che Claude legge automaticamente all'inizio di ogni sessione Cowork. Il tuo briefing operativo permanente. Diverso dalle Global Instructions: il CLAUDE.md è specifico per progetto, le Global Instructions sono universali.",
    keywords: ["claude.md", "claudemd"],
  },
  {
    id: "scheduled-tasks",
    term: "Scheduled Tasks",
    body: "Compiti che Claude esegue in automatico a orari definiti, anche quando non ci sei. Report settimanali ogni lunedì mattina. Monitoring dei competitor ogni venerdì. Il tuo assistente che lavora di notte.",
    keywords: ["task programmati", "schedule"],
  },
  {
    id: "tool-use",
    term: "Tool Use",
    body: "La capacità di Claude di usare strumenti durante una conversazione: cercare sul web, leggere file, eseguire codice, chiamare API esterne, navigare siti. Non è solo un modello che parla: è un modello che agisce.",
    keywords: ["tools", "function calling"],
  },
  {
    id: "dispatch",
    term: "Dispatch",
    body: "La logica con cui Claude decide quale tool, skill o azione usare in base alla tua richiesta. Scrivi \"crea un carosello\" e Claude sa che deve attivare la skill carousel-brief, poi carousel-build, poi carousel-export. È il \"cervello operativo\" che smista il lavoro.",
    keywords: ["routing"],
  },
];

// ─── SEZIONE 3 — USE CASE ────────────────────────────────────────────────────

export const USE_CASE_GROUPS: VocabUseCaseGroup[] = [
  {
    id: "documenti-analisi",
    category: "Documenti e Analisi",
    cases: [
      {
        id: "uc-revisione-contratti",
        title: "Revisione contrattuale in 30 secondi",
        body: "Carichi un contratto di 80 pagine. Claude evidenzia clausole rischiose, termini non standard, provisions mancanti. Quello che un avvocato fa in 3 ore, Claude lo fa in 30 secondi (e poi l'avvocato verifica).",
      },
      {
        id: "uc-executive-summary",
        title: "Executive summary da report finanziari",
        body: "500 pagine di quarterly earnings. Claude restituisce i 5 numeri che contano, i rischi evidenziati e i trend da monitorare. In 2 minuti.",
      },
      {
        id: "uc-digitalizzazione",
        title: "Digitalizzazione documenti legacy",
        body: "Anni di cartelle cliniche, documenti scritti a mano, archivi PDF scansionati. Claude li trasforma in dati strutturati e ricercabili.",
      },
      {
        id: "uc-documentazione-interna",
        title: "Creazione documentazione interna",
        body: "SOP, runbook, guide di onboarding, policy aziendali. Da un outline di 5 righe, Claude produce documenti completi e formattati. In 10 minuti.",
      },
    ],
  },
  {
    id: "marketing-contenuti",
    category: "Marketing e Contenuti",
    cases: [
      {
        id: "uc-linkedin",
        title: "Post LinkedIn nella tua voce",
        body: "Non un post generico: il TUO post. Claude impara il tuo tono, il tuo stile, i tuoi temi. In 3 minuti hai un contenuto calibrato sulla tua voce.",
      },
      {
        id: "uc-caroselli",
        title: "Caroselli Instagram senza Canva",
        body: "Dal brief al PNG esportato. Claude scrive i testi, costruisce il design, esporta le slide. Tutto in una conversazione. Zero tool esterni.",
      },
      {
        id: "uc-ad-copy",
        title: "50 varianti di ad copy per A/B testing",
        body: "Claude le calibra su awareness level, piattaforma, temperatura del traffico. Il tuo media buyer riceve varianti pronte da testare.",
      },
      {
        id: "uc-case-study",
        title: "Case study da interviste clienti",
        body: "Registri una call con un cliente. Claude la trasforma in un case study completo con numeri, citazioni, struttura narrativa.",
      },
    ],
  },
  {
    id: "vendite-intelligence",
    category: "Vendite e Intelligence",
    cases: [
      {
        id: "uc-brief-vendita",
        title: "Brief di vendita prima di una call",
        body: "Claude analizza il sito web, le news recenti e il LinkedIn del prospect. In 2 minuti hai un brief personalizzato con angle di apertura.",
      },
      {
        id: "uc-competitive-intelligence",
        title: "Competitive intelligence sintetica",
        body: "100+ pagine competitor: pricing, job posting, feature launch, comunicazione. Claude sintetizza la strategia di ognuno in un documento navigabile.",
      },
      {
        id: "uc-sentiment-recensioni",
        title: "Analisi sentiment dalle recensioni",
        body: "Tutte le recensioni dei tuoi clienti (Trustpilot, Google, survey). Claude estrae i pattern: cosa amano, cosa odiano, cosa chiedono ripetutamente.",
      },
    ],
  },
  {
    id: "operazioni-processi",
    category: "Operazioni e Processi",
    cases: [
      {
        id: "uc-inbox",
        title: "Inbox management automatico",
        body: "Claude legge la tua posta, categorizza per priorità, prepara bozze di risposta nel tuo tono. Ti svegli con la inbox già smistata.",
      },
      {
        id: "uc-report-settimanali",
        title: "Report settimanali automatici",
        body: "Dati grezzi in ingresso, report formattato in uscita. Ogni lunedì mattina. Senza che tu faccia nulla.",
      },
      {
        id: "uc-spese",
        title: "Analisi e categorizzazione spese",
        body: "Ricevute, fatture, estratti conto. Claude categorizza, trova anomalie, prepara il riepilogo per il commercialista.",
      },
    ],
  },
  {
    id: "hr-recruiting",
    category: "HR e Recruiting",
    cases: [
      {
        id: "uc-screening-cv",
        title: "Screening CV su scala",
        body: "200 candidature per una posizione. Claude valuta ogni CV contro i criteri del ruolo e restituisce una shortlist ragionata con punteggio.",
      },
      {
        id: "uc-job-description",
        title: "Job description ottimizzate",
        body: "Da una lista grezza di requisiti a una JD accattivante, inclusiva e ottimizzata per attirare i candidati giusti.",
      },
    ],
  },
  {
    id: "dati-analytics",
    category: "Dati e Analytics",
    cases: [
      {
        id: "uc-sql-naturale",
        title: "Query SQL in linguaggio naturale",
        body: "Fai domande ai tuoi dati in italiano. Claude genera la query corretta. Il tuo database diventa accessibile a chiunque, senza competenze tecniche.",
      },
      {
        id: "uc-anomalie-kpi",
        title: "Diagnosi di anomalie nei KPI",
        body: "Un numero fa uno spike. Claude analizza le possibili cause e propone ipotesi ordinate per probabilità. Il tuo data analyst di guardia.",
      },
    ],
  },
  {
    id: "formazione",
    category: "Formazione",
    cases: [
      {
        id: "uc-corso-da-manuale",
        title: "Da manuale a corso strutturato",
        body: "Un documento tecnico diventa un corso a moduli con quiz e esercizi, calibrato sul livello dei partecipanti.",
      },
      {
        id: "uc-glossario-team",
        title: "Glossario interattivo per il team",
        body: "Dalla documentazione interna, Claude costruisce un vocabolario navigabile che il tuo team può consultare ogni giorno (come questo che stai leggendo).",
      },
    ],
  },
];

// ─── SECTION INDEX (per sidebar TOC) ─────────────────────────────────────────

export interface VocabNavItem {
  id: string;
  label: string;
  count?: number;
}

export const NAV_ITEMS: VocabNavItem[] = [
  { id: "vocab-ai", label: "Vocabolario AI", count: AI_TERMS.length },
  { id: "vocab-claude-products", label: "Prodotti Claude", count: CLAUDE_PRODUCTS.length },
  { id: "vocab-claude-ops", label: "Termini operativi Claude", count: CLAUDE_OPS.length },
  { id: "vocab-use-cases", label: "Cosa puoi farci", count: USE_CASE_GROUPS.reduce((a, g) => a + g.cases.length, 0) },
];
