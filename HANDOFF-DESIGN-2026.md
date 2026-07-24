# Handoff · Sito Morfeus — Brand 2026 "Progettato. Provato."

> Documento per agenti nuovi o sessioni future. Spiega cosa c'è, dove sta, e cosa manca.
> Aggiornato: 2026-07-09 (rev.2 — marf/playground, font self-host, ROIometro, SEO)

---

## 1. Contesto di partenza

Il sito Morfeus era basato su un tema v7 con font Fraunces e palette viola scuro.
Abbiamo migrato **tutto il sito pubblico** (non la home, non i funnel) al nuovo
**Brand 2026 "Progettato. Provato."** — carta + inchiostro a fasce alternate, griglia blueprint 28px.

La home (`/it/page.tsx`) è rimasta invariata (tema precedente).
I funnel sotto `/src/app/__funnels/` sono rimasti invariati.

---

## 2. Il Design System nuovo — dove trovarlo

### 2a. Mockup HTML approvati (fonte di verità visiva)

Tutti i mockup HTML statici approvati da Matt sono in:

```
C:\Users\Matteo\Desktop\CLAUDE\01_MORFEUS\06_PROJECTS\SEO-GEO-WEBSITE\design-v2\
```

File principali:

- `chi-siamo.html` — il pilota approvato, ha definito il linguaggio
- `articolo.html` — standard per gli articoli (figure, chart, pquote, logbox, gtable, inlinecta)
- `casi.html` + `caso.html` — hub e template caso studio
- `insights.html` — hub articoli
- `metodo.html`, `faq.html`, `glossario.html`, `impara-ai.html` — le altre pagine
- `marf.html`, `playground.html` — implementati (vedi §3)

### 2b. Design system implementato nel sito React

Il CSS del DS vive in **un unico file**:

```
src/components/site/site.css
```

È tutto scoped sotto la classe `.ms` (Morfeus Site) così non tocca il tema globale della home.
Viene caricato via `SiteShell` (vedi sotto).

**Variabili CSS principali:**

```css
--carta: #f4f3ef /* sfondo chiaro */ --inchiostro: #14132e /* sfondo scuro */ --firma: #533dfc
  /* viola firma (CTA, accent) */ --lilla: #a99cff /* viola chiaro (ink mode) */ --ombra: #7a7890
  /* grigio secondario */ --grid: 28px /* passo griglia blueprint */ --maxw: 1080px
  /* contenitore max width */ --read: 720px /* corpo articolo max width */;
```

**Classi principali:**

```
.band          → sezione/fascia con padding automatico
.band.carta    → fascia chiara (bg carta + griglia sottile viola chiaro)
.band.ink      → fascia scura (bg inchiostro + griglia sottile lilla)
.band.hero     → fascia con padding-top extra per la navbar
.wrap          → contenitore centrato max-w: 1080px
.read          → contenitore centrato max-w: 720px (corpo articoli)
.eye           → label mono uppercase sopra i titoli
.h-sect        → titolo di sezione (clamp 28–46px)
.emph          → italic Playfair (corsivo firma/lilla)
.lead          → body copy secondario (grigio)
.btn .btn-1    → bottone primario viola pieno
.btn-2-ink     → bottone ghost su sfondo scuro
.btn-2-carta   → bottone ghost su sfondo chiaro
.card          → card con bordo e bg leggero, auto-adattiva carta/ink
.caso          → card caso studio (header colorato + metriche)
.stamp         → badge/stamp testuale
.statgrid      → griglia metriche 4 colonne
.cell          → cella metrica (numero + label)
.def           → blocco definizione glossario (border-left firma)
.ctaq          → call to action quadrata/grande
.read          → prosa articolo centrata 720px
```

**Font:**

- `Clash Display` → titoli (var `--font-display`)
- `Satoshi` → corpo (var `--font-body`)
- `Playfair Display` → enfasi corsiva (var `--font-emph`)
- `IBM Plex Mono` → mono/codice/label (var `--font-mono`)

**Self-hosted** (non più da Fontshare CDN). File woff2 caricati localmente,
config in `src/components/site/fonts.ts` + import in `SiteShell.tsx` / `src/app/globals.css`.
Nessuna dipendenza esterna a runtime per i font.

### 2c. SiteShell — il wrapper di ogni pagina

```
src/components/site/SiteShell.tsx
```

Ogni pagina brand 2026 è wrappata in `<SiteShell locale={...}>`.
SiteShell aggiunge la classe `.ms` al root (attiva il DS), carica i font self-hosted,
include `SiteHeader` e `SiteFooter`.

### 2d. Colori nel Tailwind config

I colori del DS sono anche mappati in `tailwind.config.ts` come utility Tailwind:

```
text-carta, text-inchiostro, text-firma, text-lilla, text-ombra
bg-carta, bg-inchiostro, bg-firma
```

**ATTENZIONE — bug risolto:** Tailwind compilava zero classi perché il dev server
veniva lanciato dalla cartella CLAUDE (non dalla root del progetto).
Fix in `postcss.config.mjs`: percorso config esplicito via `__dirname`.
Non riaprire questo file senza motivo.

---

## 3. Struttura pagine implementate

### Pagine brand 2026 (tutte funzionanti)

| Route                                      | File                                        | Stato                                                                |
| ------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------- |
| `/it/chi-siamo`                            | `src/app/[locale]/chi-siamo/page.tsx`       | ✅ completa                                                          |
| `/it/metodo`                               | `src/app/[locale]/metodo/page.tsx`          | ✅ completa                                                          |
| `/it/casi`                                 | `src/app/[locale]/casi/page.tsx`            | ✅ hub casi                                                          |
| `/it/casi/brainiac-tesoreria-riconciliata` | `src/app/[locale]/casi/brainiac-*/page.tsx` | ✅                                                                   |
| `/it/casi/cyberangels-sales-advisor`       | idem                                        | ✅                                                                   |
| `/it/casi/cyberangels-report-cfo`          | idem                                        | ✅                                                                   |
| `/it/casi/globia-scoring-deterministico`   | idem                                        | ✅                                                                   |
| `/it/casi/marf-lead-caldo`                 | idem                                        | ✅                                                                   |
| `/it/casi/scalers-pre-sales`               | idem                                        | ✅                                                                   |
| `/it/casi/valueize-best-seller`            | idem                                        | ✅                                                                   |
| `/it/casi/ag-academy-onboarding`           | idem                                        | ✅                                                                   |
| `/it/insights`                             | `src/app/[locale]/insights/page.tsx`        | ✅ hub + filtri + search                                             |
| `/it/insights/[slug]`                      | `src/app/[locale]/insights/[slug]/page.tsx` | ✅ template articoli                                                 |
| `/it/impara-ai`                            | `src/app/[locale]/impara-ai/page.tsx`       | ✅                                                                   |
| `/it/glossario`                            | `src/app/[locale]/glossario/page.tsx`       | ✅                                                                   |
| `/it/faq`                                  | `src/app/[locale]/faq/page.tsx`             | ✅                                                                   |
| `/it/roiometro`                            | `src/app/[locale]/roiometro/page.tsx`       | ✅ con `SiteROIMeter.tsx` nuovo (brand 2026, non più `HomeROIMeter`) |
| `/it/marf`                                 | `src/app/[locale]/marf/page.tsx`            | ✅ completa                                                          |
| `/it/playground`                           | `src/app/[locale]/playground/page.tsx`      | ✅ completa                                                          |

Nessuna pagina brand 2026 rimasta da costruire.

---

## 4. Sistema articoli (Insights)

### Sorgenti .md

I 13 articoli SEO sono file Markdown in:

```
C:\Users\Matteo\Desktop\CLAUDE\01_MORFEUS\06_PROJECTS\SEO-GEO-WEBSITE\articoli\
```

Lista slug:

- `value-leak` (showcase con tutti i componenti visivi)
- `agenti-ai-in-azienda`
- `ai-act-pmi-alfabetizzazione`
- `ai-intelligenza-artificiale-posti-di-lavoro`
- `ai-per-le-pmi-da-dove-iniziare`
- `automazione-preventivi-documenti-ai`
- `come-integrare-ai-nei-processi`
- `come-misurare-il-roi-dell-ai`
- `come-scegliere-consulenza-ai`
- `competenze-ai-azienda-ai-champion`
- `perche-progetti-ai-falliscono`
- `quanto-costa-l-ai-in-azienda`
- `saas-o-sistema-ai-su-misura`

**PROBLEMA CRITICO PROD:** il path è assoluto. Su Vercel non funziona.
Prima del deploy: spostare i .md in `content/insights/` nel repo e aggiornare
`ARTICLES_DIR` in `src/lib/insights.ts`.

### Come funziona la pipeline

```
src/lib/insights.ts   → legge .md con gray-matter + marked
src/app/[locale]/insights/page.tsx  → hub (server component)
src/components/site/InsightsBrowser.tsx  → filtri + search (client component)
src/app/[locale]/insights/[slug]/page.tsx  → template articolo
```

### Frontmatter dei .md

```yaml
slug, title, metaTitle, metaDescription, category, tags,
author, authorRole, datePublished, dateModified, readingTime,
tldr, faq (array), relatedTerms, internalLinks, coverKind
```

### Componenti visivi inline negli articoli

Gli articoli usano HTML raw nel corpo Markdown (parsed da marked).
Classi CSS definite in `site.css` sotto `.insight-body`:

| Classe         | Descrizione                             |
| -------------- | --------------------------------------- |
| `.figure`      | immagine/SVG con caption                |
| `.chart`       | SVG grafico in-article                  |
| `.pquote`      | citazione pull-quote                    |
| `.logbox`      | blocco lista numerata (decisioni, step) |
| `.callout-txt` | box evidenziato                         |
| `.drivers`     | griglia 2-col per driver/barriere       |
| `.gtable`      | tabella dati con header firma           |
| `.inlinecta`   | CTA inline dentro l'articolo            |

### Cover SVG articoli

```
src/components/site/InsightCover.tsx
```

7 pattern astratti (server component, niente JS):
`forbice`, `funnel`, `loop-spezzato`, `stack-bars`, `grid-nodes`, `shield-check`, `spark-cross`

Due palette: `variant="carta"` (sfondo chiaro) e `variant="ink"` (sfondo scuro).
Il campo `coverKind` nel frontmatter del .md determina quale pattern usare.

---

## 5. Componenti globali modificati

### SiteHeader

```
src/components/site/SiteHeader.tsx
```

Nav top decisa e implementata (struttura definitiva):
`Home → Chi siamo → Metodo → Casi → Insights → Impara l'AI → FAQ`

Fuori dalla top nav (di proposito): **Glossario** (raggiungibile da link interni,
es. i chip in Metodo), **MARF** e **Playground** (in footer + link interni).

### SiteFooter

```
src/components/site/SiteFooter.tsx
```

Modifiche rispetto alla versione precedente:

- Gradiente stacco tra contenuto e footer (da inchiostro a trasparente)
- Layout a 4 colonne, max-w 1400px, spaziatura più larga
- Filigrana `morfeus-mark.png` con opacity 0.15 + mixBlendMode lighten
- Testo "Made with love, by Morfeus and a lot of AI." + cuoricino
- Copyright nella colonna 4
- Aggiunti link a **MARF** e **Playground** (tenuti fuori dalla top nav di proposito)

---

## 6. Stato git

**Nulla è ancora committato.** Tutto il lavoro è unstaged/untracked.

File modificati (M):

- `postcss.config.mjs` (fix critico Tailwind)
- `tailwind.config.ts` (content.relative + content.files espliciti)
- `src/app/[locale]/chi-siamo/page.tsx`
- `src/app/[locale]/metodo/page.tsx`
- `src/components/site/SiteFooter.tsx`
- `src/components/site/SiteHeader.tsx`
- `src/components/site/site.css`
- `src/lib/reserved-slugs.ts`
- `src/lib/seo/public-indexing.ts`
- `package.json` + `package-lock.json` (gray-matter + marked installati)

File nuovi (untracked):

- `src/app/[locale]/casi/` (hub + 8 case study)
- `src/app/[locale]/faq/`, `glossario/`, `impara-ai/`, `roiometro/`, `marf/`, `playground/`
- `src/app/[locale]/insights/` (hub + template + slug pages)
- `src/components/site/InsightCover.tsx`
- `src/components/site/InsightsBrowser.tsx`
- `src/components/site/SiteROIMeter.tsx` (nuovo ROIometro brand 2026)
- `src/lib/insights.ts`

File modificati aggiuntivi rispetto alla rev.1: `next.config.mjs`, `src/app/globals.css`,
`src/app/layout.tsx`, `src/app/sitemap.ts`, `src/components/site/SiteShell.tsx`,
`src/components/site/fonts.ts` (self-host font).

---

## 7. Pendenze prima del deploy in produzione

| #   | Task                                                                                            | Priorità     | Stato                         |
| --- | ----------------------------------------------------------------------------------------------- | ------------ | ----------------------------- |
| 1   | Migrare 13 .md articoli in `content/insights/` nel repo e aggiornare `ARTICLES_DIR`             | 🔴 BLOCCANTE | ⏳ da fare                    |
| 2   | Git commit di tutto il lavoro                                                                   | 🔴 BLOCCANTE | ⏳ da fare                    |
| 3   | Implementare pagine `marf` e `playground` dai mockup                                            | 🟡           | ✅ fatto                      |
| 4   | Rifare ROIometro con stile brand 2026                                                           | 🟡           | ✅ fatto (`SiteROIMeter.tsx`) |
| 5   | Self-host font Clash Display + Satoshi (via `fonts.ts`)                                         | 🟡 GDPR/perf | ✅ fatto                      |
| 6   | Redirect vecchie URL `/case-study/[slug]` → `/casi/[slug]`                                      | 🟡 SEO       | ✅ fatto                      |
| 7   | `llms.txt` aggiornato con le URL brand 2026                                                     | 🟢           | ✅ fatto                      |
| 8   | Link chip glossario nella pagina Metodo → link veri a `/glossario`                              | 🟢           | ✅ fatto                      |
| 9   | Collegare i link "Approfondisci / Leggi l'articolo" in Impara l'AI agli articoli Insights reali | 🟡           | ✅ fatto                      |
| 10  | Card case study nell'hub Casi non erano cliccabili                                              | 🟡           | ✅ fatto                      |
| 11  | `marf` + `playground` aggiunti a slug riservati/indicizzabili e al footer (fuori dalla top nav) | 🟢           | ✅ fatto                      |
| 12  | Vecchio albero `/case-study/...` rimosso da sitemap/indice pubblico                             | 🟢           | ✅ fatto                      |

**Restano solo i due bloccanti (1 e 2) prima del deploy in produzione.**

---

## 8. Come avviare il dev server

```bash
cd "C:\Users\Matteo\Desktop\INTAKE FOLDER\MORFEUS\MORFEUS WEBSITE\morfesu-website-definitive"
npm run dev
# → http://localhost:3007
```

**IMPORTANTE:** avviare SEMPRE dalla root del progetto (non da CLAUDE), altrimenti
Tailwind non compila nulla (il bug è risolto a livello config ma è buona prassi).

---

## 9. Il sito è online?

**No.** Tutto il lavoro è in locale su `localhost:3007`.
Il sito pubblico (`morfeushub.com`) mostra ancora la versione precedente.
Per andare live: completare i punti 1+2 della tabella pendenze, poi fare push + deploy su Vercel.
