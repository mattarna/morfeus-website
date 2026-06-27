# Requirements: Morfeus Website — Milestone v1.1 SEO/GEO Architecture

**Defined:** 2026-06-26
**Core Value:** Architettura tecnica/strutturale completa per massimizzare SEO + visibilità negli LLM (GEO/AEO) — lo scheletro pronto in cui versare i contenuti dopo.

## v1 Requirements

Requirements per questo milestone. Ognuno mappa a una fase della roadmap.

### Measurement (MEAS)

- [ ] **MEAS-01**: Il sito traccia il traffico di referral dagli LLM via GA4/GTM (segmento dedicato: chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai).
- [ ] **MEAS-02**: Esiste un template "prompt-panel" (12-15 domande buyer IT+EN) con baseline registrata, ripetibile mensilmente.
- [ ] **MEAS-03**: Procedura documentata e file pronti per la verifica/submit su Bing Webmaster Tools + Google Search Console (step umani esplicitati).

### Entity / Identity (ENT)

- [ ] **ENT-01**: Esiste una costante centrale per gli `@id` delle entità (Organization/Person/Service/WebSite) — convenzione unica usata da tutti gli schema.
- [ ] **ENT-02**: Il JSON-LD `Organization` è arricchito e coerente: `founder` (Person), `foundingDate`, `address`, `sameAs` completo, `disambiguatingDescription`, `areaServed` unificato (no GeoCircle 10km), un solo contatto email (NAP coerente). Valida nel Rich Results Test.
- [ ] **ENT-03**: Pagina "Chi siamo / About" indicizzabile (IT+EN) con definizione netta dell'entità, bio founder, disambiguazione esplicita, schema `AboutPage` + `Person`.
- [ ] **ENT-04**: Lo spelling del brand è "Morf" ovunque nel codice/copy (nessuna occorrenza di "Morph").

### Technical AEO fixes (TECH)

- [ ] **TECH-01**: L'attributo `<html lang>` è corretto server-side per locale (EN non dichiara più `it`), gestendo il vincolo skip-worktree su `layout.tsx`.
- [ ] **TECH-02**: La sitemap esclude funnel e step `noindex` e usa un `lastModified` reale per voce.
- [ ] **TECH-03**: Le route interne `/funnel-internal/*` restituiscono `noindex` (blanket) e non sono indicizzabili direttamente.
- [ ] **TECH-04**: Ogni funnel `indexable: true` ha metadata propri (fix del bootcamp che oggi cade nel metadata generico).
- [ ] **TECH-05**: `hreflang`/`x-default` sono corretti per tutte le pagine indicizzabili, inclusi i casi asimmetrici (contenuti solo-IT non generano alternate EN rotte).

### Schema infrastructure (SCHEMA)

- [ ] **SCHEMA-01**: Esiste una libreria di componenti schema riusabili e type-safe (`FAQPage`, `Article/BlogPosting`, `BreadcrumbList`, `Person`, `Course`, `DefinedTerm`) basata su `schema-dts`.
- [ ] **SCHEMA-02**: Lo schema `FAQPage` è applicato alle FAQ esistenti (home + forge).
- [ ] **SCHEMA-03**: Lo schema `BreadcrumbList` è applicato alle pagine indicizzabili.
- [ ] **SCHEMA-04**: Lo schema `Course` è applicato alle pagine corso/bootcamp/formazione-finanziata indicizzabili.
- [ ] **SCHEMA-05**: La validità dello structured data è verificata in CI tramite typecheck (`schema-dts`) + snapshot, senza tool aggiuntivi.

### Content hub (HUB)

- [ ] **HUB-01**: Esiste un hub editoriale indicizzabile non-funnel (`/[locale]/blog` o `/risorse`) con listing, categorie e rendering SSR pulito (no scroll-hijack).
- [ ] **HUB-02**: La pipeline contenuti MDX è operativa (`next-mdx-remote-client` + `gray-matter`), con cartella contenuti su filesystem IT/EN.
- [ ] **HUB-03**: Esiste un template articolo "answer-first" (BLUF in cima, H2 = domande, FAQ finale, schema `Article`+`FAQPage`+`BreadcrumbList`, data di aggiornamento visibile).
- [ ] **HUB-04**: È esposto un feed RSS per locale (`feed@5.x`).
- [ ] **HUB-05**: Un articolo demo prova la pipeline end-to-end (render, schema, RSS, sitemap, internal link).
- [ ] **HUB-06**: Esiste una struttura di internal linking (hub ↔ servizi ↔ pagine entità).

### Information architecture & evergreen pages (IA)

- [ ] **IA-01**: Esiste un documento di tassonomia delle domande dei buyer (pillar/cluster, B2B-first) derivato dai VoC — la mappa che guiderà i contenuti (non gli articoli).
- [ ] **IA-02**: Pagine definizionali dei termini proprietari redatte e indicizzabili (MARF, ROIometro, AI Champion Program, Salescraft) con schema `DefinedTerm`.
- [ ] **IA-03**: Sezioni ad alto valore delle mega-pagine sono estratte in URL dedicati SSR (es. FAQ, metodo, ROIometro) senza modificare le pagine pubbliche esistenti (shadow pages).

### Discovery files (LLMS)

- [ ] **LLMS-01**: `llms.txt` è generato dinamicamente (route handler che legge da `public-indexing.ts`, in sync con le pagine indicizzabili) e sostituisce il file statico, come vera mappa di contenuti.
- [ ] **LLMS-02**: `llms-full.txt` è generato via script prebuild dai contenuti core.

### Off-site authority prep (OFF)

- [ ] **OFF-01**: Testi/dati pronti per l'item **Wikidata** (claim, proprietà, disambiguazione) — pronti da pubblicare.
- [ ] **OFF-02**: Copy pronta per il profilo **Crunchbase**.
- [ ] **OFF-03**: Copy pronta per **Google Business Profile** + LinkedIn/directory, con NAP e disambiguazione coerenti con il sito.

## Rifiniture (CMO — integrate 2026-06-26)

Vincolano i requisiti delle fasi indicate (non cambiano lo scope "architettura"):

- **Layer conversione (→ HUB)**: HUB-03 (template articolo) include uno **slot CTA contestuale**; HUB-06 include una **mappa contenuto→offerta** (quale CTA/offerta per cluster e intento).
- **Standard editoriale anti-fuffa (→ HUB-03)**: ogni articolo deve avere ≥2 tra — esperienza diretta Morfeus, esempio operativo, framework proprietario, tabella decisionale, dato reale, errore visto nei clienti, checklist, mini-case, template. (codificato nel template/checklist)
- **Intento commerciale (→ IA-01)**: la tassonomia aggiunge la dimensione _intento/funnel-stage_ (brand / informativo / problema / soluzione / vendor / comparison) per pesare i contenuti per valore commerciale.
- **Off-site sequenziato (→ OFF)**: prima **fonti esterne credibili + proof commerciale** (Clutch, testimonial nominativi, case con numeri), POI **Wikidata**, poi `sameAs`. Non invertire.
- **Goal allargato**: l'architettura è orientata non solo a visibilità ma a **domanda qualificata + conversione B2B** (north star = pipeline, non solo citazioni).
- **Onestà di framing**: distinguere _Fondamenta certe_ (crawl/index/schema/lang/internal-link/off-site) da _Esperimenti GEO_ (llms.txt, prompt-panel, AI citation tracking).

## Future Requirements (v2 / dopo l'architettura)

- **CONT-xx**: Produzione continuativa di articoli answer-first sui cluster (ops editoriale).
- **OFF-xx**: Esecuzione/pubblicazione effettiva su Wikidata/Crunchbase/GBP/directory; digital PR; listicle placement.
- **MEAS-xx**: Tool GEO a pagamento (Profound/Peec) quando c'è volume da ottimizzare.
- **I18N-xx**: Traduzione EN dei funnel chiave (oggi solo core/hub/entità sono EN).
- **UNLOCK-xx**: Eventuale apertura all'indicizzazione di contenuti oggi `noindex` (ai-fundamentals, playbook) come derivati pubblici.

## Out of Scope

Esclusi esplicitamente da questo milestone.

| Feature                                                                          | Reason                                                          |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Produzione articoli ricorrenti (oltre 1 demo)                                    | È ops editoriale continuativa; deciso "dopo l'architettura"     |
| Pubblicazione effettiva account off-site (Wikidata/Crunchbase/GBP)               | Account esterni, gated dall'utente; qui prepariamo solo i testi |
| Verifica proprietà Bing/Search Console                                           | Step umano gated; qui prepariamo file/procedura                 |
| Riscrittura del modello d'offerta pubblico (Operating Partner vs Morf Lab/Forge) | Sito pubblico "Morf" resta com'è — in transizione               |
| Tool GEO a pagamento                                                             | Solo dopo che c'è volume da ottimizzare                         |
| Traduzione EN dei funnel                                                         | Funnel restano IT; EN solo per core/hub/entità                  |

## Traceability

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| MEAS-01     | 1     | Pending |
| MEAS-02     | 1     | Pending |
| MEAS-03     | 1     | Pending |
| ENT-01      | 2     | Pending |
| ENT-02      | 2     | Pending |
| ENT-03      | 2     | Pending |
| ENT-04      | 2     | Pending |
| TECH-01     | 2     | Pending |
| TECH-02     | 2     | Pending |
| TECH-03     | 2     | Pending |
| TECH-04     | 2     | Pending |
| TECH-05     | 2     | Pending |
| SCHEMA-01   | 3     | Pending |
| SCHEMA-02   | 3     | Pending |
| SCHEMA-03   | 3     | Pending |
| SCHEMA-04   | 3     | Pending |
| SCHEMA-05   | 3     | Pending |
| HUB-01      | 4     | Pending |
| HUB-02      | 4     | Pending |
| HUB-03      | 4     | Pending |
| HUB-04      | 4     | Pending |
| HUB-05      | 4     | Pending |
| HUB-06      | 4     | Pending |
| IA-01       | 5     | Pending |
| IA-02       | 5     | Pending |
| IA-03       | 5     | Pending |
| LLMS-01     | 5     | Pending |
| LLMS-02     | 5     | Pending |
| OFF-01      | 6     | Pending |
| OFF-02      | 6     | Pending |
| OFF-03      | 6     | Pending |

**Coverage:**

- v1 requirements: 27 totali
- Mapped to phases: 27 (100%)
- Unmapped: 0

---

_Requirements defined: 2026-06-26_
_Last updated: 2026-06-26 — Traceability compiled after roadmap creation_
