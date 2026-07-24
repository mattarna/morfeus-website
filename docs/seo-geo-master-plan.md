# SEO + GEO Master Plan — Morfeus

> Piano operativo per aumentare **drasticamente** la visibilità su motori di ricerca (SEO)
> e su motori generativi / LLM (GEO/AEO: ChatGPT, Perplexity, Gemini, Google AI Overviews, Copilot, Claude).
> Creato: 2026-06-25 · Owner: Matteo · Esecuzione tecnica: Claude Code.

## Decisioni di partenza (lockate)

- **Mercato:** Italia prioritaria + costruzione parallela dell'inglese.
- **Obiettivo, in sequenza:** (1) entità brand inequivocabile → (2) citazioni su query di categoria.
- **Capacità contenuti:** alta (pubblicazione regolare; bozze generate con Claude Code).

## North-star & KPI

| Metrica                                                                | Strumento                         | Cadenza     |
| ---------------------------------------------------------------------- | --------------------------------- | ----------- |
| Citazioni/risposte negli LLM (prompt panel)                            | Test manuale + Ahrefs Brand Radar | Mensile     |
| Traffico referral da LLM (chatgpt.com, perplexity.ai, copilot, gemini) | GA4 / GTM                         | Mensile     |
| Impression/click organici per locale                                   | Search Console + Bing WT          | Settimanale |
| Pagine indicizzate vs pubblicate                                       | Search Console + sitemap          | Settimanale |
| Backlink / domini referenti                                            | Ahrefs                            | Mensile     |
| Knowledge panel / Wikidata / entità riconosciuta                       | SERP brand                        | Mensile     |

---

## Perché oggi non compari (sintesi diagnosi)

Il sito **NON è bloccato**: GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Googlebot ricevono tutti
`200` + HTML completo (234 KB) + JSON-LD. Il contenuto è server-rendered. I veri colli di bottiglia:

1. **Collisione di entità** — "Morfeus/Morpheus/Morfeu" è affollatissimo (morfeus.dev, morpheusbusiness.ai, NVIDIA/HPE Morpheus…). Gli LLM non sanno _chi siete_.
2. **Superficie indicizzabile minuscola e in stile slogan** — ~8 pagine/locale, copy non "answer-shaped".
3. **Autorità off-site ≈ zero** — esistete solo su sito + LinkedIn.
4. **Contenuti di valore in `noindex`** — ai-fundamentals, playbook, ecc. invisibili.
5. **Dettagli tecnici** — mega-pagine a URL unico, `lang` errato per EN, llms.txt come allow-list, sitemap che include noindex, JSON-LD povero.

---

## FASE 0 — Fondamenta di misura (Settimana 1)

> Senza baseline non possiamo dire se miglioriamo. Si fa una volta, subito.

- [ ] **Bing Webmaster Tools**: verifica dominio + submit sitemap. _(Critico: ChatGPT Search e Copilot si appoggiano in larga parte all'indice di Bing.)_ — Voi (verifica) / Io (sitemap)
- [ ] **Google Search Console**: verifica, submit sitemap, controllo copertura per `it` ed `en`. — Voi/Io
- [ ] **GA4 + GTM**: segmento "AI referrals" (regex su chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai). — Io
- [ ] **Prompt panel baseline**: 12-15 domande buyer (IT+EN) testate su ChatGPT, Perplexity, Gemini, Google AIO, Claude. Registrare: compare? citato? con quale fonte? — Io (template) / Voi (esecuzione mensile)
- [ ] **Ahrefs**: brand monitoring + Brand Radar (menzioni AI), backlink baseline. _(MCP Ahrefs disponibile.)_ — Io

**Esempi di domande per il prompt panel (IT):**

- "Chi è Morfeus Hub?" · "Cosa fa Morfeus nell'AI?"
- "Migliori società di consulenza AI in Italia"
- "Come integrare l'intelligenza artificiale in azienda"
- "Corso AI finanziato Regione Lombardia"
- "Cos'è un AI Champion in azienda"

---

## FASE 1 — Entità inequivocabile (Settimane 1-3) · GEO core 🔥

> Obiettivo: quando qualcuno (o un LLM) cerca "Morfeus", capisce esattamente chi siete e non vi confonde.

### 1.1 JSON-LD `Organization` completo e corretto

File: [src/components/shared/SEO/StructuredData.tsx](../src/components/shared/SEO/StructuredData.tsx)

- [ ] Aggiungere `founder` (`Person` con nome, ruolo, sameAs LinkedIn), `foundingDate`, `address` (`PostalAddress` reale), `vatID`/`legalName`.
- [ ] `disambiguatingDescription`: una frase che distingue Morfeus dai nomi simili.
- [ ] `sameAs`: **tutti** i profili ufficiali (LinkedIn, Instagram, Crunchbase, Wikidata, YouTube…).
- [ ] **Fix `areaServed`**: ora è un `GeoCircle` di 10 km da Roma → limita il segnale. Mettere `Italy` (+ "Worldwide" per i servizi remoti).
- [ ] **Fix coerenza email/NAP**: oggi convivono `info@`, `hello@` → usare un solo contatto ufficiale ovunque.
- [ ] Aggiungere `brand`, `slogan`, `numberOfEmployees`, `award` se applicabile.

### 1.2 Pagina entità "Chi siamo / About" indicizzabile (E-E-A-T)

- [ ] Pagina dedicata (IT+EN) con: definizione netta dell'azienda, storia, founder con bio e foto, cosa NON siete (disambiguazione esplicita), metodo proprietario. — Io (struttura+bozza) / Voi (contenuti reali)
- [ ] Schema `AboutPage` + `Person` per i founder.

### 1.3 Ancore di entità esterne (le capisce il "knowledge graph")

- [ ] **Wikidata item** "Morfeus Hub" con proprietà (instance of: business, country: Italy, official website, founders). — Voi (con mio supporto testi)
- [ ] **Crunchbase** profilo completo. — Voi
- [ ] **Google Business Profile** (anche per il segnale locale). — Voi
- [ ] **LinkedIn** ottimizzato (descrizione = stessa definizione del sito). — Voi
- [ ] Directory B2B IT/EN pertinenti (Clutch, directory AI/consulting). — Voi

### 1.4 Strategia dei termini proprietari (mossa GEO ad alto rendimento)

Avete asset nominati: **MARF**, **Salescraft**, **AI Champion Program**, **Morf Lab/Forge**.
Gli LLM amano i framework con nome: chi definisce il termine viene citato come fonte.

- [ ] Pagina/sezione definizionale indicizzabile per ciascuno ("Cos'è MARF", "Cos'è l'AI Champion Program"). — Io (bozza) / Voi (validazione)
- [ ] `DefinedTerm` / `Article` schema su queste pagine.

---

## FASE 2 — Motore di contenuti answer-first (Settimane 2-12, continuo) · SEO+GEO core 🔥

> La leva più grande. Con alta capacità contenuti, qui si vince o si perde.

### 2.1 Architettura: hub editoriale indicizzabile

- [ ] Creare una sezione **non-funnel, indicizzabile** (es. `/risorse`, `/guide` o `/blog`) con listing, categorie, paginazione, RSS. — Io
- [ ] Modello di rendering SSR "leggero" (no scroll-hijack) per massimizzare retrievability. — Io

### 2.2 Ricerca domande + topic cluster

- [ ] Estrarre le domande reali dei buyer (IT+EN): People-Also-Ask, query Search Console, ticket/sales, glossario. — Io/Voi
- [ ] Definire 4-6 **pillar** (es. "AI per le PMI", "AI adoption & governance", "ROI dell'AI", "Automazione processi", "Formazione AI aziendale") + cluster di articoli collegati. — Io

### 2.3 Template "answer-first" (per ogni articolo)

- [ ] TL;DR/risposta diretta in cima · H2 = domande · risposte concise · dati/tabelle · esempi · FAQ finale · `FAQPage`+`Article` schema · data aggiornamento visibile. — Io (template + bozze)

### 2.4 Sbloccare e ripackaggiare i contenuti `noindex`

File: [src/funnels/registry.ts](../src/funnels/registry.ts)

- [ ] **ai-fundamentals** (corso 6h) → versione pubblica indicizzabile (anche solo il programma + concetti chiave).
- [ ] **playbook** (7 moduli) → estratti pubblici/articoli derivati.
- [ ] **vocabolario-ai** (già indicizzabile) → espandere, è il **template d'oro** da replicare.
- [ ] design-system-skill, claude-skill-anatomy, instagram-carousel-skills → valutare estratti pubblici.
- [ ] Decisione per ciascuno: tenere la lead-magnet gated _ma_ pubblicare un derivato indicizzabile. — Voi (decisione) / Io (implementazione)

### 2.5 Pillar dei servizi + case study come "citation bait"

- [ ] Riscrivere le sezioni servizio (Lab/Path/Forge) con sostanza estraibile (cosa, per chi, come, numeri), non solo slogan. — Io (bozza) / Voi (dati reali)
- [ ] Potenziare i 5 case study: problema → numeri di partenza → metodo → risultato misurato. È il formato che gli LLM citano. — Io/Voi

### 2.6 Calendario editoriale (alta capacità)

- [ ] Cadenza target: **2-3 pezzi/settimana** (mix pillar + cluster + definizioni proprietarie).
- [ ] Workflow: io genero le bozze → voi validate (fatti/numeri) → pubblico. — Io+Voi

---

## FASE 3 — AEO / SEO tecnico (Settimane 2-6, in parallelo) · Media-Alta

### 3.1 Schema markup esteso

- [ ] `FAQPage` (home FAQ, forge FAQ, pagine articolo), `Article`/`BlogPosting` (hub), `BreadcrumbList` (tutte), `Course` (corsi/bootcamp/formazione finanziata), `Person` (founder), `Service` dettagliato per Lab/Path/Forge. — Io

### 3.2 `llms.txt` come vera mappa contenuti + `llms-full.txt`

File: [public/llms.txt](../public/llms.txt)

- [ ] Trasformare da allow-list a mappa: link ai contenuti migliori con 1 riga di descrizione, in Markdown. — Io
- [ ] Generare `llms-full.txt` (testo esteso dei contenuti core) per ingestione diretta. — Io

### 3.3 Igiene sitemap & indicizzazione

File: [src/app/sitemap.ts](../src/app/sitemap.ts)

- [ ] Escludere i funnel `noindex` e gli step `noindex` (oggi inclusi → segnale contraddittorio). — Io
- [ ] Includere il nuovo hub e gli articoli. — Io
- [ ] `lastModified` reale per pagina (non `new Date()` globale). — Io

### 3.4 Mega-pagine → URL granulari

File: [src/app/[locale]/page.tsx](../src/app/[locale]/page.tsx), [src/app/[locale]/forge/page.tsx](../src/app/[locale]/forge/page.tsx)

- [ ] Estrarre sezioni ad alto valore (metodo, ROI, FAQ) in URL dedicati e linkabili. — Io
- [ ] Ridurre la dipendenza dallo scroll-hijack per il contenuto critico (SSR completo, rendering robusto per il crawler che renderizza). — Io

### 3.5 Fix tecnici puntuali (quick wins)

File: [src/app/layout.tsx](../src/app/layout.tsx)

- [ ] **`<html lang="it">` hardcoded** → impostare il `lang` server-side corretto per locale (oggi le pagine EN dichiarano `it` al crawler). — Io
- [ ] OG image: allineare dimensioni dichiarate al file reale. — Io
- [ ] Verificare esistenza `/images/brand/morfeus-mark.png` (logo in JSON-LD). — Io
- [ ] Core Web Vitals: budget JS, lazy corretto, immagini ottimizzate. — Io

---

## FASE 4 — Query di categoria & autorità off-site (Settimane 6-16+) · il "drastico" 🔥

> Gli LLM citano entità corroborate da molte fonti. Qui si costruisce la rete di citazioni.

- [ ] **Listicle placement**: comparire nelle liste "migliori consulenze/agenzie AI in Italia". Gli LLM le citano pesantemente. Outreach mirato. — Voi (con mio supporto pitch)
- [ ] **Digital PR + dato proprietario**: pubblicare un report/benchmark originale (es. "quanto margine perdono le PMI italiane per inefficienze, e quanto recupera l'AI") → asset linkabile + citabile. — Io (bozza/dati struttura) / Voi (dati)
- [ ] **Founder thought leadership**: post LinkedIn → ripubblicati come articoli on-site indicizzabili. — Io (repurposing) / Voi (voce)
- [ ] **Community/retrieval sources**: presenza utile (non spam) su Reddit/Quora/forum di settore, dove i LLM pescano. — Voi
- [ ] **Podcast/guest**: partecipazioni con link e menzioni. — Voi
- [ ] **Recensioni verificabili**: Clutch, Google reviews, testimonial con nome/azienda. — Voi

---

## FASE 5 — Inglese / internazionale (Settimane 8-16) · in parallelo da Fase 2

- [ ] Tradurre pillar + top articoli + pagina entità in EN (qualità nativa, non MT grezza). — Io (bozza) / Voi (revisione)
- [ ] `hreflang` completo e coerente (già impostato per le core; estendere a hub/articoli). — Io
- [ ] Segnali entità EN (Crunchbase/Wikidata già internazionali aiutano). — Voi
- [ ] Valutare versione EN dei funnel chiave se c'è domanda. — Voi

---

## Sequenza consigliata (vista d'insieme)

```
Sett. 1      ████ Fase 0 (misura)  + avvio Fase 1 (JSON-LD, entità)
Sett. 2-3    ████ Fase 1 (entità esterne) + Fase 3 quick wins (lang, sitemap, schema)
Sett. 2-12   ████████████████ Fase 2 (motore contenuti, continuo)  + Fase 5 (EN da sett. 8)
Sett. 6-16+  ████████ Fase 4 (autorità off-site, continuo)
```

## Chi fa cosa

| Faccio io (Claude Code)                                                         | Fate voi                                                                |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Tutto il codice: schema, llms.txt, sitemap, hub, estrazione pagine, fix tecnici | Account esterni: Wikidata, Crunchbase, GBP, directory                   |
| Generazione bozze contenuti (IT+EN), template, calendario                       | Validazione fatti/numeri, voce founder                                  |
| Ripackaggio contenuti noindex, traduzioni                                       | Relazioni PR, outreach, recensioni                                      |
| Setup tracking GA4/GTM, sitemap submit                                          | Verifica proprietà Bing/Search Console, esecuzione prompt panel mensile |

## Quick wins eseguibili subito (basso rischio, alto valore)

1. JSON-LD: fix `areaServed` + arricchimento Organization.
2. `<html lang>` server-side per locale.
3. Sitemap: escludere noindex.
4. `llms.txt` → mappa contenuti + `llms-full.txt`.
5. Schema `FAQPage` sulle FAQ esistenti (home/forge).

Questi 5 si possono fare in un primo blocco senza dipendere da decisioni esterne.
