# Feature Research — GEO/AEO Architecture

**Domain:** SEO/GEO architecture for B2B consulting website (Morfeus Hub)
**Researched:** 2026-06-26
**Confidence:** HIGH (multiple cross-verified sources, 2025-2026 data)

---

## Come funzionano i motori generativi (come recuperano e citano)

Prima di mappare le feature, serve capire la pipeline di ogni motore. Le decisioni architetturali discendono da qui.

### ChatGPT Search / OAI-SearchBot

Pipeline RAG a 7 stadi: (1) classificazione query, (2) generazione query di ricerca, (3) filtro candidati 10-20 pagine via metadati SERP, (4) fetch + chunking in blocchi da 128 token, (5) embedding semantico + cosine similarity, (6) selezione top 3-5 pagine, (7) sintesi con citazioni inline.

**Segnali on-site che influenzano la citazione:**

- Velocita' di caricamento: hard timeout 2 secondi. Pagine >2s non vengono lette. FCP <0,4s = 6,7 citazioni medie vs 2,1 per pagine >1,13s.
- Server-Side Rendering obbligatorio: OAI-SearchBot non esegue JavaScript. Contenuto client-rendered = invisibile.
- Il primo blocco da 128 token e' il "provino" della pagina. L'informazione piu' rilevante deve stare in cima.
- Metadati (title, meta description, schema) filtrano gia' allo stadio 3, prima che la pagina venga letta.
- Nessun ranking fisso: le risposte sono probabilistiche. Non esiste "posizione 1" per ChatGPT.
- OAI-SearchBot (retrieval periodico per indice) distinto da GPTBot (training) e ChatGPT-User (browsing real-time).

**Fonte:** [How ChatGPT Search Works — Rankly](https://www.tryrankly.com/blogs/how-chatgpt-search-works), [OAI-SearchBot — Qwairy GEO Glossary](https://www.qwairy.co/guides/geo-101-glossary/oai-searchbot)

### Perplexity

Pipeline a 6 stadi con 60+ sorgenti recuperate per query, filtrate fino a 3-5 citazioni finali. Combina proprio indice (PerplexityBot) + indice Bing. Le citazioni vengono embedded PRIMA della generazione, non retrofittate.

**Segnali on-site:**

- Freshness pesantissima: 70% delle top citazioni aggiornate negli ultimi 12-18 mesi. Contenuto aggiornato negli ultimi 30 giorni riceve boost misurabile.
- BLUF obbligatorio: 90% delle top citazioni mette la risposta nei primi 100 parole.
- Schema markup: 47% di tasso Top-3 citazioni con markup vs 28% senza.
- Person schema con credenziali autore: 2,3x piu' alto tasso di citazione.
- Topical depth batte Domain Authority: blog di nicchia superano grandi publisher sull'argomento specifico.
- Reddit domina al 46,7% delle citazioni top — presenza autentica nelle community conta.
- Feedback utente: sorgenti con downvote vengono eliminate entro circa una settimana.

**Fonte:** [Perplexity AI Answers Pipeline — ZipTie.dev](https://ziptie.dev/blog/how-perplexity-ai-answers-work/), [How Perplexity Selects Sources — AuthorityTech](https://authoritytech.io/blog/how-perplexity-selects-sources-algorithm-2026)

### Google AI Overviews / Gemini

AI Overviews appare su ~16% di tutte le query (dato Semrush 2025, era 6,49% inizio anno). 47% delle citazioni proviene da pagine che NON sono in posizione top-5 organica — logica di ranking radicalmente diversa da Google classico.

**7 fattori core (analisi su 15.847 risultati AI Overviews):**

- Completezza semantica (r=0,87): contenuto >8,5/10 ha 4,2x piu' probabilita'. Passaggi ottimali: 134-167 parole.
- Contenuto multimodale (r=0,92): testo+immagini+video+schema = +156% selezione; integrazione full = +317%.
- Verifica fattuale real-time (r=0,89): citazioni autorevoli = +89% probabilita'. Fonti Tier-1 (.gov, .edu, peer-reviewed) = +132%.
- Entity Knowledge Graph Density (r=0,76): 15+ entita' connesse = 4,8x piu' alta probabilita' di selezione.
- E-E-A-T (r=0,81): 96% delle citazioni AI Overviews viene da fonti con segnali verificabili di autorevolezza.
- Schema markup: +73% di selezione su pagine con markup FAQ, HowTo, Article, ImageObject, VideoObject.
- Freshness: 23% del contenuto citato ha meno di 30 giorni.

Google Gemini e' addestrato sul Knowledge Graph, che si alimenta in parte da Wikidata. Entity establishment e' fondamentale per essere citati in AI Overviews e AI Mode.

**Fonte:** [Google AI Overviews Ranking Factors — Wellows](https://wellows.com/blog/google-ai-overviews-ranking-factors/), [Google AI Overview Ranking Signals — MikeKhorev](https://mikekhorev.com/google-ai-overview)

### Bing / Microsoft Copilot

Copilot si appoggia principalmente all'indice di Bing. Pagine ben posizionate in Bing hanno probabilita' sproporzionatamente alta di essere citate in Copilot. ChatGPT Search usa anch'esso l'indice Bing come sorgente primaria — rendere il sito "Bing-friendly" e' fondamentale per entrambi.

**Segnali specifici Bing:**

- Bing Webmaster Tools verifica e submit sitemap sono il primo passo.
- Segnali social (Facebook, X/Twitter, LinkedIn) contano piu' che in Google.
- Bing Webmaster Tools AI Performance Report (lanciato febbraio 2026): traccia "Grounding Queries" (query interne che Copilot genera per recuperare contenuto) e Citations. Branded queries generano quasi 2x piu' citazioni rispetto a non-branded.
- Contenuti che Copilot non riesce a "estrarre come blocco" vengono ignorati.
- 99,6% dell'influenza AI rimane invisibile: il contenuto viene "usato" molto piu' di quanto venga citato esplicitamente.
- Presenza su LinkedIn, GitHub, Microsoft Learn amplifica i segnali di autorita' nel ecosistema Microsoft.

**Fonte:** [Bing Webmaster Tools AI Performance Report — OtterlyAI](https://otterly.ai/blog/bing-webmaster-tools-ai-performance-report/), [GEO for Bing Copilot — SeoTuners](https://seotuners.com/blog/seo/blog-geo-for-bing-copilot/)

---

## Feature Landscape

### (a) Layer entita'/identita'

#### Table Stakes (Attesi — mancano = prodotto rotto)

| Feature                                        | Perche' attesa                                                                                                                                     | Complessita' | Note                                                                                                                                                        |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organization schema completo con `sameAs`      | Tutti i motori generativi usano `sameAs` per disambiguare l'entita'. Senza, "Morfeus" si confonde con Morpheus (NVIDIA), morpheusbusiness.ai, ecc. | LOW          | Gia' presente ma povero. Va arricchito: `founder`, `foundingDate`, `legalName`, `vatID`, `address`, `disambiguatingDescription`, tutti i `sameAs` ufficiali |
| `@id` stabile e coerente su ogni pagina        | Entity resolution richiede un URI canonico stabile come ancoraggio. `@id` incoerente tra pagine = entita' non risolvibile                          | LOW          | Implementare come `https://morfeushub.com/#organization` in tutto il sito                                                                                   |
| Fix `areaServed` (oggi GeoCircle 10km da Roma) | Limita il segnale geografico a Roma quando i servizi sono nazionali/internazionali. Motori generativi capiscono male il campo d'azione             | LOW          | Cambiare in `Italy` + `Worldwide` (remote services). Gia' identificato nel master plan                                                                      |
| Fix `<html lang>` server-side per locale       | Pagine EN dichiarano `lang="it"` al crawler. Segnale contraddittorio per motori generativi e indicizzazione i18n                                   | LOW          | Dipende da `src/app/[locale]/layout.tsx`. Fix critico, quick win                                                                                            |
| Coerenza NAP (Name, Address, Phone/Email)      | `info@` e `hello@` in conflitto. I motori usano la consistenza NAP come segnale di fiducia entita'                                                 | LOW          | Scegliere un contatto ufficiale, allinearlo in schema + footer + directory                                                                                  |
| Person schema per il founder con `sameAs`      | E-E-A-T dipende dall'autorevolezza di persone reali, non solo aziende. Perplexity cita 2,3x di piu' con Person schema                              | LOW          | Bio + LinkedIn + foto visibili on-page. Schema deve rispecchiare contenuto visibile                                                                         |

#### Differentiators (Vantaggio competitivo)

| Feature                                             | Valore                                                                                                                                                                          | Complessita' | Note                                                                                                                                                                                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disambiguatingDescription` esplicita nel schema    | Distingue Morfeus Hub da tutti gli omonimi. Gli LLM cercano attivamente descrizioni disambiguanti per costruire il proprio "knowledge graph" interno                            | LOW          | Una frase netta: es. "Morfeus Hub e' una societa' italiana di consulenza AI per PMI in scaling, distinta da Morpheus (NVIDIA), Morfeus.dev, ecc."                                                                                  |
| Wikidata item "Morfeus Hub" con proprieta' complete | 3,2x piu' alta probabilita' di Knowledge Panel Google; 2,7x piu' alta probabilita' di citazioni AI. Google Gemini e' addestrato sul Knowledge Graph che si alimenta da Wikidata | MEDIUM       | Richiede eligibility (coverage media/registro ufficiale). Proprieta' essenziali: P31 (instance of: business), P856 (website), P571 (inception), P112 (founder), P17 (country), P452 (industry). Va fatto da Voi con supporto testi |
| Crunchbase profilo completo + LinkedIn ottimizzato  | Cross-platform entity validation. Perplexity e ChatGPT citano entita' corroborate da piu' fonti. `sameAs` nel schema deve puntare a questi profili                              | LOW          | Va fatto da Voi                                                                                                                                                                                                                    |
| Google Business Profile                             | Segnale locale aggiuntivo. Appare nei Knowledge Panel Google                                                                                                                    | LOW          | Va fatto da Voi                                                                                                                                                                                                                    |

#### Anti-features (Sembrano utili, creano problemi)

| Feature                                            | Perche' richiesta                                             | Perche' problematica                                                                                                | Alternativa                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Schema markup senza parity con contenuto visibile  | Sembra efficiente (arricchire schema senza aggiornare pagina) | I motori scartano schema che non corrisponde al contenuto visibile. Google puo' penalizzare per "misleading markup" | Aggiungere schema solo per informazioni gia' visibili on-page. Prima aggiornare il contenuto, poi il markup |
| `@id` con URL dinamici o variabili                 | Sembra flessibile                                             | Rompe la catena di entity resolution. Ogni cambio URL spezza i link nel knowledge graph interno dei motori          | Usare sempre URI canonici stabili con fragment (`#organization`, `#founder`)                                |
| GeoCircle / area localizzata per servizi nazionali | Sembra "localizzare" il brand                                 | Limita la visibilita' alle query locali, esclude query nazionali e internazionali                                   | `areaServed: "Italy"` + `"Worldwide"` per remote                                                            |

---

### (b) Copertura structured data

#### Table Stakes

| Feature                                                          | Perche' attesa                                                                                                                                                                   | Complessita' | Note                                                                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| FAQPage schema su FAQ esistenti (home, Forge)                    | FAQ schema e' il percorso piu' diretto verso AI Overviews. ChatGPT e Perplexity estraggono direttamente Q&A. Dato: 47% tasso Top-3 Perplexity con schema vs 28% senza            | LOW          | Quick win. Le FAQ sono gia' on-page, basta aggiungere markup. Contenuto visibile deve combaciare esattamente con schema |
| Article + `datePublished`/`dateModified` + `author` (Person @id) | Freshness e E-E-A-T sono segnali di ranking primari per tutti i motori. 23% del contenuto citato in AI Overviews ha <30 giorni. `dateModified: new Date()` globale oggi e' falso | LOW          | Ogni articolo hub deve avere data reale. `author` punta al Person schema del founder                                    |
| BreadcrumbList su tutte le pagine                                | Segnale di struttura del sito per crawler AI. Migliora la navigabilita' semantica                                                                                                | LOW          | Implementazione standard Next.js, nessuna dipendenza esterna                                                            |
| Service schema per Lab/Path/Forge                                | Senza Service schema, i motori non sanno cosa offrite. Google AI Mode e Copilot usano Service per capire l'offerta e rispondere a query tipo "consulenza AI Italia"              | MEDIUM       | Proprieta' chiave: `serviceType`, `provider` (@id Organization), `areaServed`, `description` sostanziale                |
| Sitemap pulita (esclude noindex e step noindex)                  | Sitemap con pagine noindex = segnale contraddittorio. I bot capiscono che quella pagina non vale e deprioritizzano anche le pagine indicizzabili del sito                        | LOW          | Filtro in `sitemap.ts`: escludere funnel non-indexable e step con `noindex: true`. `lastModified` reale                 |

#### Differentiators

| Feature                                                                            | Valore                                                                                                                                                                | Complessita' | Note                                                                                                              |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| DefinedTerm schema per termini proprietari (MARF, AI Champion Program, Salescraft) | Chi definisce un termine viene citato come fonte dagli LLM. Google AI Overviews e ChatGPT citano la pagina originale del concetto                                     | MEDIUM       | Richiede prima le pagine definizionali indicizzabili. Dipendenza: pagine esistenti                                |
| Course schema per corsi/bootcamp/formazione finanziata                             | Intercetta query specifiche su formazione AI. Bing Copilot e Google AI usano Course schema per rispondere a "corsi AI finanziati Italia"                              | MEDIUM       | Proprieta': `name`, `provider`, `courseMode`, `hasCourseInstance`, `offers`. Dipende da sblocco contenuto noindex |
| Schema interconnesso con `@id` coerente (entity graph)                             | I motori traversano relazioni tra entita'. Organization → Person (founder) → Article (authored by) → Service (mentions) = graph di fiducia che amplifica le citazioni | MEDIUM       | Richiede implementazione sistematica, non paginale. Orchestrare `@id` in un componente condiviso                  |
| `mentions` in Article schema puntando a entita' proprietarie                       | Connette ogni articolo alle entita' del brand. Rinforza la topical authority di Morfeus su AI, PMI, ecc.                                                              | LOW          | Da aggiungere nei template articolo hub                                                                           |

#### Anti-features

| Feature                                              | Perche' richiesta         | Perche' problematica                                                                                 | Alternativa                                                                                                       |
| ---------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Schema generato via GTM/client-side                  | Sembra facile da deployer | OAI-SearchBot e altri bot non eseguono JS. Schema iniettato lato client non viene letto              | JSON-LD sempre server-side. In Next.js: `<Script type="application/ld+json">` in `layout.tsx` o componenti server |
| WebPage schema su ogni pagina senza differenziazione | Sembra "coprire tutto"    | Markup generico non aggiunge segnale. Google ignora WebPage generico; gli LLM cercano tipi specifici | Usare il tipo piu' specifico: AboutPage, FAQPage, ServicePage, BlogPosting, Course. Mai WebPage come fallback     |
| Schema markup stale (dati vecchi non aggiornati)     | Sembra "fatto"            | JSON-LD con `dateModified` vecchio o dati non aggiornati riduce la fiducia dei motori nell'entita'   | Automatizzare `dateModified` da frontmatter/CMS. Audit trimestrale                                                |

---

### (c) llms.txt + llms-full.txt

#### Table Stakes

| Feature                                                   | Perche' attesa                                                                                                                                                                                                             | Complessita' | Note                                                                                                                                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `llms.txt` come mappa contenuti (non semplice allow-list) | La specifica standard richiede un file Markdown con H1 (nome progetto), blockquote (summary), sezioni H2 con lista di URL commentati. La versione attuale del sito e' solo allow-list — non comunica cosa contiene il sito | LOW          | Trasformare in indice curato: ogni URL con 1 riga di descrizione del contenuto. Esempio: `- [Chi siamo](https://morfeushub.com/it/about): Fondatori, storia e metodo MARF di Morfeus Hub` |
| File accessibile a `/llms.txt` (root domain)              | La specifica richiede il file alla root. Gia' presente — solo da riscrivere                                                                                                                                                | LOW          | File gia' in `public/llms.txt`. Rewrite del contenuto                                                                                                                                     |

#### Differentiators

| Feature                                             | Valore                                                                                                                                                                      | Complessita' | Note                                                                                                                                                                         |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `llms-full.txt` con testo esteso dei contenuti core | Permette ingestione diretta: LLM che processano il file ottengono tutto il contesto senza dover crawlare ogni pagina. Utile per Perplexity e Claude in modalita' "read URL" | MEDIUM       | Generare testo consolidato di: Organization summary, founder bio, descrizioni servizi, MARF definition, case study summary. Da aggiornare a ogni pubblicazione significativa |
| IT + EN in llms.txt                                 | Segnala esplicitamente la disponibilita' bilingue. I motori generativi che servono query EN vengono indirizzati ai contenuti giusti                                         | LOW          | Sezioni `## Italian content` e `## English content` nel file                                                                                                                 |

#### Anti-features

| Feature                                               | Perche' richiesta                           | Perche' problematica                                                                                                                                                                                                           | Alternativa                                                                                         |
| ----------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| llms.txt come robots.txt esteso (solo allow/disallow) | Sembra la naturale evoluzione di robots.txt | Non e' come funziona la specifica. E come il sito la usa oggi — risultato: 97% dei siti con llms.txt valido riceve zero richieste del file (dato maggio 2026). I bot non lo leggono per i permessi, ma per capire il contenuto | Usare il file come indice/mappa narrativa. robots.txt resta il luogo dei permessi                   |
| llms.txt come sostituto del SEO tradizionale          | Sembra un "shortcut" per i motori AI        | Nessun motore AI principale ha dichiarato ufficialmente di leggere llms.txt. E' un segnale utile ma non verificato come ranking signal                                                                                         | Trattare come complemento, non sostituto. Priorita' bassa rispetto a entity layer e structured data |

---

### (d) Hub contenuti answer-first

#### Table Stakes

| Feature                                                     | Perche' attesa                                                                                                                                                                                                       | Complessita' | Note                                                                                                                                      |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Sezione editoriale indicizzabile (`/risorse` o `/blog`)     | Senza superfici indicizzabili con contenuto sostanziale, il sito non puo' comparire in risposte a query di categoria ("consulenza AI Italia", "cos'e' un AI Champion"). Oggi ~8 pagine per locale sono insufficienti | HIGH         | Richiede routing, listing, categorie, paginazione, RSS. Piu' complessa delle altre feature di questo gruppo — e' la leva principale       |
| SSR completo per ogni pagina hub                            | OAI-SearchBot e PerplexityBot non eseguono JS. Tutto il contenuto deve essere nell'HTML iniziale                                                                                                                     | MEDIUM       | In Next.js App Router: Server Components per default. Attenzione a sezioni client-side con `'use client'` che contengono testo editoriale |
| Template "answer-first" con BLUF                            | 90% delle top citazioni Perplexity mette la risposta nei primi 100 parole. ChatGPT usa il primo blocco da 128 token come "provino". Passaggi 40-75 parole citati 3,1x di piu'                                        | MEDIUM       | Template: TL;DR 1-2 frasi in cima → H2 = domanda → risposta diretta 40-75 parole → sviluppo → dati/tabelle → FAQ finale con schema        |
| `datePublished` e `dateModified` reali e visibili           | Freshness e' segnale di ranking primario per Perplexity (30 giorni) e Google AI Overviews (23% citazioni <30gg). Data falsa (`new Date()` globale) danneggia la fiducia                                              | LOW          | Frontmatter o CMS. Data visibile on-page e in schema                                                                                      |
| Internal linking sistematico tra articoli e pagine servizio | I motori usano la struttura dei link per capire la topical authority. Articoli senza link alle pagine servizio non trasferiscono autorita'                                                                           | MEDIUM       | Ogni articolo linka almeno a una pagina servizio rilevante e a 2-3 articoli correlati. Template che forza questo pattern                  |

#### Differentiators

| Feature                                                   | Valore                                                                                                                                                                                                    | Complessita' | Note                                                                                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Pillar + cluster topic structure                          | Builds topical authority concentrata: 4-6 pillar (es. "AI per PMI", "ROI dell'AI", "Automazione processi") con cluster di articoli collegati. Gli LLM riconoscono siti autorevoli su un dominio specifico | HIGH         | Richiede VoC research per definire i pillar giusti. Alta complessita' editoriale, ma massimo impatto GEO a medio termine |
| FAQ finale con FAQPage schema su ogni articolo            | Intercetta domande correlate. Aumenta la superficie "citabile" di ogni articolo. Tasso Top-3 Perplexity: 47% con schema vs 28% senza                                                                      | LOW          | Aggiungere sezione FAQ standard in template. Automatizzare schema generazione                                            |
| Statistiche con fonte e anno inline                       | LLM cercano claim verificabili con fonte. Formato: "[Dato] ([Fonte], [anno])". Expert quotes con attribuzione: +41% visibilita' AI. Statistics: +30%. Inline citations: +30%                              | MEDIUM       | Standard redazionale da applicare sistematicamente. Non richiede codice, richiede disciplina editoriale                  |
| Case study con struttura problema→numeri→metodo→risultato | Questo e' il formato citato dagli LLM. Un caso studio con numeri reali e' "citation bait" per query tipo "risultati consulenza AI PMI"                                                                    | HIGH         | Dipende da dati reali forniti dal team. Claude Code puo' strutturare, non inventare numeri                               |
| RSS feed                                                  | Segnale di freshness per crawler. Perplexity e altri aggregatori usano feed per scoprire contenuto recente                                                                                                | LOW          | Standard Next.js App Router, poche ore di lavoro                                                                         |
| Sblocco contenuti noindex come derivati indicizzabili     | ai-fundamentals (corso 6h), playbook (7 moduli), vocabolario-ai sono gia' in esistenza ma invisibili. Derivati pubblici = superficie immediata senza produzione da zero                                   | MEDIUM       | Decisione Go/No-go da Voi per ogni asset. Claude Code implementa                                                         |

#### Anti-features

| Feature                                                     | Perche' richiesta                          | Perche' problematica                                                                                                                                                    | Alternativa                                                                                                                               |
| ----------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Scroll-hijack / JS-heavy rendering per contenuto editoriale | Sembra moderno e interattivo               | OAI-SearchBot e PerplexityBot non eseguono JS. Il contenuto interattivo e' invisibile ai motori generativi. Gia' identificato come problema nel sito attuale            | SSR completo per tutto il contenuto editoriale. Interattivita' solo per UI non-content (filtri, tabs che non nascondono testo principale) |
| Articoli con keyword stuffing                               | Sembra SEO-oriented                        | GEO si basa su semantic meaning e completezza della risposta, non densita' keyword. Keyword stuffing riduce la qualita' percepita dagli LLM                             | Scrivere per rispondere alla domanda in modo completo. Una risposta concisa e precisa batte 2000 parole diluiti                           |
| Contenuto duplicato IT/EN senza differenziazione            | Sembra efficiente (tradurre letteralmente) | I motori penalizzano thin content. Una traduzione letterale senza adattamento culturale/query ha bassa autorita'                                                        | Traduzione di qualita' con adattamento keyword per mercato EN. Almeno 20% di contenuto differenziato per contesto                         |
| Mega-pagine con tutto il contenuto a un unico URL           | Sembra "una pagina comprensiva"            | Non linkabile nelle singole sezioni. I motori non possono citare "la sezione FAQ" di una pagina se non ha URL proprio. Gia' identificato: home e Forge sono mega-pagine | Granularizzare: URL dedicati per metodo, FAQ, ROIometro. Canonical corretto                                                               |

---

### (e) Misurazione visibilita' negli LLM

#### Table Stakes

| Feature                                              | Perche' attesa                                                                                                                                                                                               | Complessita' | Note                                                                                                                                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GA4 segmento AI referrals                            | Senza baseline non si misura il progresso. GA4 da maggio 2026 riconosce automaticamente ChatGPT, Gemini, Claude come "AI Assistant" channel. Perplexity e Copilot restano nel canale Referral                | LOW          | Regex su domani: `chatgpt\.com\|chat\.openai\.com\|perplexity\.ai\|claude\.ai\|gemini\.google\.com\|copilot\.microsoft\.com\|bing\.com/chat\|you\.com\|deepseek\.com\|grok\.com`. Custom segment in GA4 o GTM |
| Bing Webmaster Tools verifica + submit sitemap       | Copilot e ChatGPT Search si appoggiano all'indice Bing. Senza BWT il sito e' di fatto semiinvisibile a questi due motori. BWT AI Performance Report (feb. 2026) espone grounding queries e citazioni Copilot | LOW          | Verifica dominio (va fatto da Voi). Submit sitemap (fa Claude Code). Critico come primo passo                                                                                                                 |
| Google Search Console verifica + copertura locale/EN | Baseline organica. Segnala pagine non indicizzate, hreflang errors, segnali contraddittori sitemap                                                                                                           | LOW          | Gia' noto come action item nel master plan                                                                                                                                                                    |
| Prompt panel baseline (12-15 domande buyer)          | Unico modo per sapere se i motori citano Morfeus su query rilevanti. 91% delle citazioni LLM appare su un solo motore — ogni piattaforma va testata separatamente                                            | LOW          | Template di domande IT+EN (gia' definito nel master plan). Esecuzione mensile manuale. Claude Code genera il template                                                                                         |

#### Differentiators

| Feature                                                                   | Valore                                                                                                                                                                                                           | Complessita' | Note                                                                                                                                                      |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ahrefs Brand Radar / Brand Monitoring                                     | Traccia menzioni AI automatizzate. Complementa il prompt panel manuale con dati a volume                                                                                                                         | MEDIUM       | Richiede abbonamento Ahrefs. Non sostituisce il prompt panel (Ahrefs non copre tutti i motori)                                                            |
| Strumenti dedicati LLM visibility (Profound, Peec, Semrush AI Visibility) | Monitoraggio automatico citazioni su ChatGPT, Perplexity, Gemini. Profound identifica la specifica URL fonte dell'AI                                                                                             | HIGH (costo) | Profound: $96M Series C a $1B valuation (feb. 2026). Semrush AI Visibility Toolkit: $99/mese per dominio. Utile a regime, non necessario come prima mossa |
| Bing Webmaster Tools AI Performance Report                                | Espone grounding queries (query interne che Copilot genera per recuperare il sito) e citazioni. Branded queries = 2x citazioni vs non-branded. Unico strumento gratuito con dati di prima parte per un motore AI | LOW          | Gia' incluso in BWT verifica. Report diventa utile dopo 4-6 settimane di dati                                                                             |

#### Anti-features

| Feature                                                    | Perche' richiesta                              | Perche' problematica                                                                                                                                                                                                 | Alternativa                                                                                                                         |
| ---------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Tracciare "posizione 1" negli LLM                          | Sembra il naturale equivalente del ranking SEO | Non esiste: le risposte AI sono probabilistiche. Lo stesso prompt ripetuto produce citazioni diverse. Brand Morfeus appare "<1 su 100 volte" nelle stesse liste su prompt ripetuti                                   | Tracciare frequenza di citazione su campione di prompt (es. 20 run per query), non "ranking"                                        |
| Affidarsi solo a GA4 referral per misurare visibilita' LLM | Sembra sufficiente                             | GA4 cattura solo il traffico che clicca su link. Il 99,6% dell'influenza AI (contenuto "usato" ma non citato con link cliccabile) e' invisibile in GA4. Copilot in particolare usa il contenuto senza generare click | Combinare: GA4 (proxy trafico) + Bing WBT AI Report (grounding) + prompt panel (citazioni)                                          |
| Strumenti LLM visibility costosi come prima mossa          | Sembra "professionale"                         | ROI non misurabile senza baseline. A €0 di traffico LLM, Profound a $1B valuation non aggiunge valore immediato                                                                                                      | Prima stabilire baseline con strumenti gratuiti (GA4 + BWT + prompt panel). Strumenti pagati solo quando c'e' volume da ottimizzare |

---

## Feature Dependencies

```
[Wikidata item] ──────────────────────────────────────────> amplifica [Organization schema sameAs]
[Crunchbase + LinkedIn profili] ──────────────────────────> amplifica [Organization schema sameAs]
[Organization schema @id stabile] ──requires──────────────> [Person schema founder]
[Person schema founder] ──requires──────────────────────── [Bio + foto visibili on-page]
[Fix <html lang> server-side] ──requires────────────────── [src/app/[locale]/layout.tsx]
[Sitemap pulita] ──requires─────────────────────────────── [identificazione funnel noindex]
[Hub contenuti /risorse] ──unlocks──────────────────────── [Article schema + datePublished reali]
[Hub contenuti /risorse] ──unlocks──────────────────────── [FAQPage schema per articoli]
[Hub contenuti /risorse] ──unlocks──────────────────────── [DefinedTerm schema (MARF, ecc.)]
[Hub contenuti /risorse] ──unlocks──────────────────────── [llms-full.txt (testo consolidato)]
[Pagine definizionali indicizzabili] ──requires───────────> [Hub contenuti esistente]
[Course schema] ──requires──────────────────────────────── [sblocco contenuti noindex]
[Prompt panel baseline] ──enables measurement for──────── [tutte le feature GEO]
[GA4 segmento AI referrals] ──enables measurement for──── [traffico referral da LLM]
[Bing WBT verifica] ──enables measurement for───────────── [Copilot grounding + ChatGPT Search]
[BWT AI Performance Report] ──requires──────────────────── [Bing WBT verifica] (4-6 settimane dati)
[URL granulari (FAQ, metodo, ROI)] ──requires───────────── [refactoring mega-pagine home/Forge]
[SSR completo hub] ──requires───────────────────────────── [Server Components in App Router]

[Organization schema] ──conflicts con──────────────────── [schema client-side via GTM]
[llms.txt mappa contenuti] ──conflicts con─────────────── [llms.txt come allow-list pura]
```

### Note sulle dipendenze critiche

- **Organization schema `@id` stabile richiede coerenza** tra tutte le pagine. Un `@id` diverso su home vs about spezza l'entity graph.
- **Hub contenuti sblocca la maggior parte delle feature schema**: Article, FAQPage per articoli, DefinedTerm, RSS, llms-full.txt dipendono tutti dall'esistenza dell'hub. E' il nodo critico del percorso.
- **Bing WBT verifica e' prerequisito umano** (non automatizzabile da Claude Code). Blocca l'accesso all'AI Performance Report e indirettamente la visibilita' su Copilot/ChatGPT Search.
- **Wikidata e profili esterni sono azioni umane** (Voi). Non bloccano il codice ma bloccano il segnale di disambiguazione max.
- **Fix `lang` server-side ha una dipendenza su `layout.tsx` con `git skip-worktree`**: attenzione al flag nella gestione del file.

---

## MVP Definition — Priorita' per Milestone v1.1

### Fase 0 — Fondamenta misura (eseguire prima di tutto)

- [ ] Bing Webmaster Tools verifica dominio (umano) + submit sitemap (Claude Code)
- [ ] GA4 segmento AI referrals — regex su tutti i domini LLM noti
- [ ] Prompt panel baseline IT+EN — template 12-15 domande
- [ ] Fix `<html lang>` server-side per locale — quick win tecnico

Senza questi, non si misura nulla. Vanno eseguiti nella prima settimana.

### Fase 1 — Entity layer (max impatto, min dipendenze esterne)

- [ ] Organization schema: `@id` stabile, `sameAs` completo (LinkedIn, Crunchbase, Wikidata placeholder), `founder` (Person), `foundingDate`, `legalName`, `disambiguatingDescription`, fix `areaServed`, NAP coerente
- [ ] Person schema founder con bio visibile on-page e `sameAs` LinkedIn
- [ ] Sitemap pulita — escludere noindex e step noindex, `lastModified` reale
- [ ] FAQPage schema su FAQ esistenti home + Forge (quick win, nessuna dipendenza)
- [ ] BreadcrumbList su tutte le pagine
- [ ] `llms.txt` riscritto come mappa contenuti (non allow-list)

### Fase 2 — Hub contenuti (leva principale ma alta complessita')

- [ ] Sezione `/risorse` o `/blog` indicizzabile con listing, categorie, paginazione, RSS
- [ ] Template articolo answer-first: BLUF + H2-as-question + risposta 40-75 parole + FAQ finale con schema
- [ ] Article schema con `author` (Person @id) + `datePublished`/`dateModified` reali
- [ ] Internal linking sistematico hub ↔ pagine servizio

### Fase 3 — Schema esteso + URL granulari (dopo hub)

- [ ] Service schema per Lab/Path/Forge
- [ ] DefinedTerm schema per MARF, AI Champion Program, Salescraft (dopo pagine definizionali)
- [ ] URL granulari per sezioni ad alto valore (metodo, FAQ, ROIometro)
- [ ] `llms-full.txt` generato da contenuti hub esistenti

### Add After Validation (v1.x)

- [ ] Course schema (dopo sblocco contenuti noindex — decisione Go/No-go Voi)
- [ ] Pillar + cluster content structure completo
- [ ] Case study strutturati problema→numeri→metodo→risultato
- [ ] Strumenti LLM visibility pagati (dopo baseline volume)

### Future Consideration (v2+)

- [ ] Wikidata item Morfeus Hub (eligibility da costruire prima)
- [ ] Contenuti multimodali (video + schema VideoObject) per +156% AI Overviews
- [ ] Autorita' off-site — listicle placement, digital PR, guest podcast

---

## Feature Prioritization Matrix

| Feature                                    | Valore GEO | Costo implementazione | Priorita'               |
| ------------------------------------------ | ---------- | --------------------- | ----------------------- |
| Fix `<html lang>` per locale               | HIGH       | LOW                   | P1                      |
| Organization schema completo con `sameAs`  | HIGH       | LOW                   | P1                      |
| Bing WBT verifica + sitemap submit         | HIGH       | LOW                   | P1                      |
| GA4 segmento AI referrals                  | HIGH       | LOW                   | P1                      |
| FAQPage schema su FAQ esistenti            | HIGH       | LOW                   | P1                      |
| Sitemap pulita (esclude noindex)           | HIGH       | LOW                   | P1                      |
| Fix `areaServed` Organization              | HIGH       | LOW                   | P1                      |
| `llms.txt` riscritto come mappa            | MEDIUM     | LOW                   | P1                      |
| Person schema founder                      | HIGH       | LOW                   | P1                      |
| Prompt panel baseline                      | HIGH       | LOW                   | P1                      |
| BreadcrumbList tutte le pagine             | MEDIUM     | LOW                   | P1                      |
| Hub contenuti /risorse (routing + listing) | HIGH       | HIGH                  | P1 (critical path)      |
| Article schema + date reali                | HIGH       | MEDIUM                | P2                      |
| Service schema Lab/Path/Forge              | HIGH       | MEDIUM                | P2                      |
| Template answer-first                      | HIGH       | MEDIUM                | P2                      |
| RSS feed                                   | MEDIUM     | LOW                   | P2                      |
| Internal linking sistematico               | HIGH       | MEDIUM                | P2                      |
| URL granulari (FAQ, metodo)                | MEDIUM     | HIGH                  | P2                      |
| `llms-full.txt`                            | MEDIUM     | MEDIUM                | P2                      |
| DefinedTerm schema termini proprietari     | HIGH       | LOW                   | P2 (dopo pagine)        |
| Sblocco contenuti noindex come derivati    | HIGH       | MEDIUM                | P2                      |
| Wikidata item                              | HIGH       | MEDIUM                | P3 (eligibility needed) |
| Course schema                              | MEDIUM     | MEDIUM                | P3                      |
| Strumenti LLM visibility pagati            | HIGH       | HIGH (costo)          | P3                      |
| Contenuti multimodali (video)              | HIGH       | HIGH                  | P3                      |

**Priority key:** P1 = fare in Milestone v1.1 | P2 = aggiungere dopo first deploy | P3 = futuro

---

## Complessita' e dipendenze critiche note

### Dipendenze tecniche

- **`src/app/[locale]/layout.tsx`** ha flag `git skip-worktree` (versione locale diversa da main). Ogni modifica alla `lang` server-side deve gestire questo vincolo con cautela.
- **Funnel in `noindex`**: la sitemap include oggi pagine noindex. Fix richiede enumerazione di tutti i funnel da `registry.ts` con flag `indexable: false`.
- **Mega-pagine** (home, /forge): granularizzare richiede refactoring significativo del routing e potenzialmente dello scroll-hijack — alta complessita', da valutare impatto UX.
- **Hub contenuti**: nuova sezione routing non-funnel. Non esiste oggi. Richiede: creazione routing App Router, componenti listing/categorie, sistema di file-based o CMS-based content. E' il task piu' lungo della milestone.

### Dipendenze umane (bloccano Claude Code)

- Bing WBT: verifica dominio (richiede accesso DNS/proprietario)
- Google Search Console: verifica
- Wikidata: creazione item (richiede eligibility e account)
- Crunchbase, GBP, directory: profili esterni
- Dati reali per case study (numeri, clienti, risultati)
- Decisione Go/No-go su sblocco contenuti noindex

### Rischi principali

- **llms.txt impatto incerto**: 97% dei siti con llms.txt valido riceve zero richieste del file (dato maggio 2026). Nessun motore ha confermato di leggerlo come ranking signal. Trattare come "costo basso, valore incerto" — non come priorita' assoluta.
- **Schema markup: correlation vs causation**: studio Ahrefs 2025 su 1.885 pagine non trova differenza significativa nell'aggiungere schema a pagine gia' citate. Lo schema disambigua e struttura, non "compra" citazioni. Il valore e' nella machine-readability, non in un boost diretto misurabile.
- **Wikidata eligibility**: Morfeus Hub potrebbe non avere ancora sufficiente coverage media/registri per creare un item approvato dalla community. Va valutata prima di investire tempo.

---

## Sources

- [Backlinko — Generative Engine Optimization (GEO)](https://backlinko.com/generative-engine-optimization-geo)
- [ZipTie.dev — How Perplexity AI Answers Work: Retrieval, Ranking, and Citation Pipeline](https://ziptie.dev/blog/how-perplexity-ai-answers-work/)
- [Rankly — How ChatGPT Search Works: The 7-Stage Pipeline](https://www.tryrankly.com/blogs/how-chatgpt-search-works)
- [Wellows — Google AI Overviews Ranking Factors: 2026 Guide](https://wellows.com/blog/google-ai-overviews-ranking-factors/)
- [OtterlyAI — Bing Webmaster Tools AI Performance Report](https://otterly.ai/blog/bing-webmaster-tools-ai-performance-report/)
- [Geneo.app — Structured Data & Schema Markup Best Practices for AI Search](https://geneo.app/blog/structured-data-schema-markup-ai-search-best-practices/)
- [OverTheTopSEO — Wikidata for SEO: Entity Knowledge Graph](https://www.overthetopseo.com/wikidata-seo-entity-knowledge-graph-2/)
- [Qwairy — OAI-SearchBot GEO Glossary](https://www.qwairy.co/guides/geo-101-glossary/oai-searchbot)
- [SeoTuners — GEO for Bing Copilot](https://seotuners.com/blog/seo/blog-geo-for-bing-copilot/)
- [Writesonic — Common GEO Mistakes That Hurt AI Search Visibility](https://writesonic.com/blog/common-geo-mistakes-ai-search)
- [AuthorityTech — LLM Referral Traffic Tracking](https://authoritytech.io/blog/llm-referral-traffic-tracking)
- [AuthorityTech — How Perplexity Selects Sources](https://authoritytech.io/blog/how-perplexity-selects-sources-algorithm-2026)
- [llmstxt.org — Official Specification](https://llmstxt.org/)
- [Semrush — What Is llms.txt?](https://www.semrush.com/blog/llms-txt/)
- [MikeKhorev — Google AI Overview: New Ranking Signals 2026](https://mikekhorev.com/google-ai-overview)
- [Backlinko — 5 AI Visibility Tools to Track Your Brand Across LLMs](https://backlinko.com/llm-tracking-tools)

---

_Feature research for: GEO/AEO Architecture — Morfeus Hub (v1.1)_
_Researched: 2026-06-26_
