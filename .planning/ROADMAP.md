# Roadmap: Morfeus Website — Milestone v1.1 SEO/GEO Architecture

## Overview

Sei fasi ordinate per dipendenza: prima la misura (nessun baseline = nessuna attribuzione),
poi i fix tecnici e il layer entità (l'@id convention deve precedere ogni nuovo schema),
poi la libreria schema type-safe, poi il content hub (sblocca Article/RSS/llms-full.txt),
poi le pagine IA + discovery files dinamici, infine la preparazione off-site.
Ogni fase consegna capacità verificabili prima che inizi la successiva.

## Milestones

- 🚧 **v1.1 SEO/GEO Architecture** — Phase 1-6 (in progress)

## Phases

- [ ] **Phase 1: Measure First** — Baseline GA4/LLM + prompt panel + verifica GSC/Bing
- [ ] **Phase 2: Quick-Win Fixes + Entity Layer** — Fix tecnici critici + @id convention + Organization arricchita
- [ ] **Phase 3: Schema Infrastructure** — Libreria componenti schema type-safe (schema-dts) + applicazione a pagine esistenti
- [ ] **Phase 4: Content Hub** — Hub editoriale SSR + pipeline MDX + template answer-first + RSS + articolo demo
- [ ] **Phase 5: IA + Discovery Files** — Tassonomia buyer, pagine termini proprietari, shadow pages, llms.txt dinamico, llms-full.txt
- [ ] **Phase 6: Off-Site Authority Prep** — Testi/dati Wikidata, Crunchbase, Google Business Profile pronti per la pubblicazione

## Phase Details

### Phase 1: Measure First

**Goal**: Il sito ha una baseline di misura operativa prima che qualunque lavoro SEO/GEO venga pubblicato
**Depends on**: Nothing (first phase)
**Requirements**: MEAS-01, MEAS-02, MEAS-03
**Success Criteria** (what must be TRUE):

1. GA4 ha un segmento attivo per il traffico di referral dagli LLM (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai) e i dati storici smettono di finire in "Direct"
2. Esiste un file template prompt-panel (IT+EN, 15 domande: 5 brand, 5 categoria, 5 problema) con la baseline registrata e la procedura di ripetizione mensile documentata
3. Esiste documentazione step-by-step con file/sitemap pronti per la verifica su Bing Webmaster Tools e Google Search Console, con gli step umani esplicitati

**Plans:** 2 plans

Plans:

- [ ] 01-01-PLAN.md — GA4 LLM channel group spec (docs/geo/measurement.md) + prompt panel template (docs/geo/prompt-panel.md) [MEAS-01, MEAS-02]
- [ ] 01-02-PLAN.md — Search Console + Bing WMT setup procedure + human verification checkpoint [MEAS-03]

### Phase 2: Quick-Win Fixes + Entity Layer

**Goal**: I segnali tecnici e di identità del sito sono corretti e coerenti — la fondazione sulla quale tutto il nuovo schema verrà costruito
**Depends on**: Phase 1
**Requirements**: ENT-01, ENT-02, ENT-03, ENT-04, TECH-01, TECH-02, TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):

1. `curl https://morfeushub.com/en | grep '<html'` restituisce `lang="en"` (non `lang="it"`) — i crawler EN ricevono il locale corretto
2. `https://morfeushub.com/sitemap.xml` non contiene URL di funnel `indexable:false` né step con `noindex:true`; ogni voce ha un `lastModified` reale
3. `curl -I https://morfeushub.com/funnel-internal/vocabolario-ai` restituisce `X-Robots-Tag: noindex` — le route interne non sono indicizzabili direttamente
4. Il Rich Results Test su `https://morfeushub.com/it` valida l'Organization senza errori: `@id` stabile, `sameAs` completo, `founder` Person, `disambiguatingDescription`, `areaServed` unificato, un solo contatto email
5. Esiste `src/lib/seo/entity-ids.ts` con le costanti `ORGANIZATION_ID`, `WEBSITE_ID`, `PERSON_ID` — nessun schema nel codebase usa stringhe `@id` hardcoded
6. La pagina `/[locale]/chi-siamo/` è indicizzabile (IT+EN), con schema `AboutPage`+`Person` e bio founder; lo spelling "Morf" è corretto ovunque nel codice
7. Il funnel `bootcamp-ai-champion-3a-edizione` ha un `metadataPreset` proprio e non cade nel metadata generico del root layout
8. `hreflang` e `x-default` sono corretti per tutte le pagine indicizzabili; la funzione `buildLocaleAlternates()` accetta una lista esplicita di locale per gestire i casi asimmetrici
   **Plans**: TBD
   **UI hint**: yes

### Phase 3: Schema Infrastructure

**Goal**: Esiste una libreria di componenti schema riusabili e type-safe che tutte le fasi successive possono usare senza duplicare codice o rischiare incoerenze
**Depends on**: Phase 2
**Requirements**: SCHEMA-01, SCHEMA-02, SCHEMA-03, SCHEMA-04, SCHEMA-05
**Success Criteria** (what must be TRUE):

1. Esiste una libreria di componenti schema (`FAQPageSchema`, `ArticleSchema`, `BreadcrumbSchema`, `PersonSchema`, `DefinedTermSchema`, `CourseSchema`) basata su `schema-dts@2.0.0` — `npm run typecheck` cattura errori di schema a compile time senza tool aggiuntivi
2. Il Rich Results Test sulle pagine home e forge valida il `FAQPage` schema sulle sezioni FAQ esistenti (schema derivato dallo stesso array che renderizza il componente)
3. Il `BreadcrumbList` schema è presente su tutte le pagine indicizzabili non-home (lab, forge, path, funnels indexable)
4. Lo schema `Course` è applicato alle pagine corso/bootcamp/formazione-finanziata indicizzabili con dati reali (titolo, provider con `@id`, datePublished)
5. `npm run typecheck && npm run build` passa senza errori di tipo su nessun componente schema
   **Plans**: TBD

### Phase 4: Content Hub

**Goal**: Il sito ha un hub editoriale indicizzabile, SSR-puro, con pipeline MDX operativa, feed RSS e un articolo demo che prova l'intero stack end-to-end
**Depends on**: Phase 2
**Requirements**: HUB-01, HUB-02, HUB-03, HUB-04, HUB-05, HUB-06
**Success Criteria** (what must be TRUE):

1. La pagina `/[locale]/blog/` risponde come Server Component SSR (nessun `"use client"` a livello di pagina), con listing articoli per categoria, hreflang corretto, BreadcrumbList schema
2. La pipeline MDX è operativa: un file `.mdx` in `src/content/blog/[locale]/` viene renderizzato all'URL corrispondente con frontmatter (title, date, category, locale) correttamente letto da `gray-matter`
3. Il template articolo "answer-first" ha BLUF in cima, H2 come domande, sezione FAQ finale con schema, data di aggiornamento visibile — ed è un Server Component puro
4. Il feed RSS per locale (`/[locale]/feed.xml`) restituisce XML valido con almeno un item; la URL del feed è inclusa nel `<head>` delle pagine blog
5. L'articolo demo compare nel sitemap XML, nel feed RSS, nell'output `llms-full.txt` (testo esteso) e include almeno un link interno verso una pagina servizio — pipeline end-to-end verificata
6. La struttura di internal linking è in atto: hub lista link verso pagine servizio; ogni articolo linka a hub + servizi correlati
   **Plans**: TBD
   **UI hint**: yes

### Phase 5: IA + Discovery Files

**Goal**: Le pagine dei termini proprietari sono indicizzabili, le mega-pagine hanno URL granulari shadow, e i file llms.txt/llms-full.txt sono generati dinamicamente e in sync con le pagine indicizzabili
**Depends on**: Phase 3, Phase 4
**Requirements**: IA-01, IA-02, IA-03, LLMS-01, LLMS-02
**Success Criteria** (what must be TRUE):

1. Esiste un documento di tassonomia buyer (pillar/cluster B2B-first, derivato dai VoC) che può essere usato come mappa editoriale per i contenuti futuri — non articoli, ma la struttura che li guiderà
2. Le pagine `/[locale]/marf/`, `/[locale]/ai-champion/`, `/[locale]/salescraft/` sono indicizzabili con schema `DefinedTerm`, hanno contenuto proprio (non redirect), e compaiono in sitemap + llms.txt
3. Almeno una shadow page SSR (es. `/[locale]/faq/` o `/[locale]/forge/faq/`) è indicizzabile con HTML proprio estratto dalla sezione corrispondente della mega-pagina — non un redirect
4. `https://morfeushub.com/llms.txt` è generato dinamicamente dal route handler (non dal file statico) e riflette automaticamente le pagine registrate in `public-indexing.ts`; il vecchio `public/llms.txt` è rimosso
5. `public/llms-full.txt` viene generato dallo script prebuild leggendo i contenuti MDX in `src/content/` — è in sync con l'hub e si aggiorna ad ogni build
   **Plans**: TBD

### Phase 6: Off-Site Authority Prep

**Goal**: I testi e i dati per i profili off-site (Wikidata, Crunchbase, Google Business Profile) sono pronti e coerenti con i segnali di entità on-site — pronti per essere pubblicati da Matteo
**Depends on**: Phase 2
**Requirements**: OFF-01, OFF-02, OFF-03
**Success Criteria** (what must be TRUE):

1. Esiste un documento con i claim Wikidata pronti (instance of, country, official website, founder, industry, foundingDate, sameAs) con valutazione preliminare dell'eleggibilità alla notorietà
2. Esiste un file di copy per il profilo Crunchbase (descrizione azienda, founder, funding, URL) coerente con i dati `schema-data.ts` — pronto per incollare
3. Esiste un file con NAP (Name/Address/Phone/Email) unificato + testo descrittivo per Google Business Profile, LinkedIn e directory aziendali — coerente con Organization schema (stesso `email` canonico)
   **Plans**: TBD

## Progress

| Phase                             | Plans Complete | Status      | Completed |
| --------------------------------- | -------------- | ----------- | --------- |
| 1. Measure First                  | 0/2            | Planning    | -         |
| 2. Quick-Win Fixes + Entity Layer | 0/TBD          | Not started | -         |
| 3. Schema Infrastructure          | 0/TBD          | Not started | -         |
| 4. Content Hub                    | 0/TBD          | Not started | -         |
| 5. IA + Discovery Files           | 0/TBD          | Not started | -         |
| 6. Off-Site Authority Prep        | 0/TBD          | Not started | -         |
