# Architecture Research — SEO/GEO Integration

**Domain:** Next.js 14 App Router marketing site with config-driven funnel system
**Researched:** 2026-06-26
**Confidence:** HIGH (based on direct codebase inspection)

---

## Stato attuale: cosa esiste e dove

### Sistema di routing (tre livelli paralleli)

```
Request URL
    │
    ▼
src/middleware.ts
    ├─ /<funnel-slug>/*       → rewrite to /funnel-internal/<slug>/* + X-Robots-Tag
    ├─ /[locale]/*            → next-intl intlMiddleware (routing.ts: locales=[en,it], defaultLocale=en)
    │                            X-Robots-Tag su NON_INDEXABLE_LOCALE_PREFIXES (portal, call-confirmed)
    └─ static rewrites        → /aperitalk, /aperitivo, /corso-claude-unlocked-*

/[locale]/                   → src/app/[locale]/layout.tsx  (LocaleLayout — Server Component)
                                   └─ HtmlLang (client: patches document.documentElement.lang)
                                   └─ StructuredData (server: Organization+WebSite+Service JSON-LD)
                                   └─ NextIntlClientProvider

/funnel-internal/[slug]/     → src/app/funnel-internal/[slug]/layout.tsx (FunnelSlugLayout)
                                   └─ generateMetadata via metadataPreset switch in page.tsx
```

### Componenti SEO esistenti

| File                                           | Stato                                                   | Problema                                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/shared/SEO/StructuredData.tsx` | Server Component, renderizzato in `[locale]/layout.tsx` | Schema incompleto: `areaServed` GeoCircle 10km da Roma, email duplicata (info@/hello@), nessun `founder`, nessun `sameAs` completo, nessun `disambiguatingDescription`        |
| `src/components/shared/HtmlLang.tsx`           | Client Component con `useEffect` che patcha il DOM      | La prop `lang="it"` hardcoded in `src/app/layout.tsx` (root layout) è ciò che il crawler vede prima dell'idratazione; le pagine EN dichiarano `lang="it"` nel markup iniziale |
| `src/app/sitemap.ts`                           | Genera sitemap da `public-indexing.ts` + registry       | Include tutti i funnel dal registry (anche `indexable: false`); usa `new Date()` globale come `lastModified`                                                                  |
| `public/llms.txt`                              | Manuale, allow-list di URL                              | Non è una mappa contenuti (nessuna descrizione per URL); non esiste `llms-full.txt`                                                                                           |
| `src/lib/seo/public-indexing.ts`               | Single source of truth per pagine indicizzabili         | Non conosce il content hub (non ancora esistente); `buildLocaleAlternates` hard-coded `x-default: en`                                                                         |

### Mega-pagine "use client"

| Pagina                                 | Problema SEO                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/[locale]/page.tsx`            | `"use client"` — scroll-hijack con `ScrollWrapper`+`useScrollStore`; 15 sezioni a URL unico; ROI, FAQ, case study irraggiungibili via URL diretto |
| `src/app/[locale]/forge/page.tsx`      | `"use client"` — scroll smooth + sticky header logic; FAQ, ROI, prezzi tutti a URL unico                                                          |
| `src/app/[locale]/the-method/page.tsx` | `"use client"` — `robots: { index: false }` in layout, quindi non-issue per ora                                                                   |

---

## Architettura target: componenti nuovi vs modificati

### Layer 1 — Fix tecnici: modifiche a file esistenti

#### 1A. Fix `<html lang>` server-side (CRITICO, skip-worktree)

**File:** `src/app/layout.tsx` (root layout — con flag `git skip-worktree`)

**Problema:** `<html lang="it" suppressHydrationWarning>` è hardcoded. I crawler vedono sempre `lang="it"` anche su `/en/*`.

**Soluzione senza toccare il root layout:** Next.js 14 App Router consente di impostare `lang` tramite `generateStaticParams` + layout annidato. Il `[locale]/layout.tsx` non può settare `<html>` direttamente perché il tag `<html>` appartiene al root layout. L'unico modo pulito senza modificare root è usare `headers()` per passare il locale come response header e gestirlo nel middleware — ma questo non risolve l'HTML serializzato.

**Soluzione raccomandata:** Modificare `src/app/layout.tsx` per leggere il locale dalla route. Poiché ha `skip-worktree`, il flusso corretto è:

1. `git update-index --no-skip-worktree src/app/layout.tsx`
2. Modificare: il root layout deve diventare un Server Component che legge il locale dai parametri di route (`params.locale`) — ma il root layout non ha params. L'alternativa praticabile è convertire il root layout in un layout che lascia `lang` vuoto/neutro e delega al `[locale]/layout.tsx` tramite l'attributo `lang` su un wrapper `<div>`. **Però questo non funziona: `lang` su `<html>` non può essere impostato da un child layout in App Router.**

**Soluzione praticabile definitiva:** Rimuovere `skip-worktree` e modificare `src/app/layout.tsx` per usare `lang` dinamico. Il root layout in App Router non riceve `params` quindi non può conoscere il locale direttamente. La soluzione è usare `next/headers` per leggere il path e derivare il locale:

```typescript
// src/app/layout.tsx — MODIFICATO
import { headers } from "next/headers";

function getLocaleFromHeaders(): string {
  const h = headers();
  const pathname = h.get("x-next-intl-locale") ?? "it";
  return pathname;
}

export default function RootLayout({ children }) {
  const locale = getLocaleFromHeaders();
  return (
    <html lang={locale} suppressHydrationWarning>
```

`next-intl` middleware inietta già il header `x-next-intl-locale`. Questo funziona ed è server-side — il crawler riceve `lang` corretto. `HtmlLang` può essere rimosso o tenuto come no-op.

**File toccati:** `src/app/layout.tsx` (rimuovere skip-worktree), `src/components/shared/HtmlLang.tsx` (deprecare o svuotare).

#### 1B. Fix sitemap — escludere funnel noindex

**File modificato:** `src/app/sitemap.ts`

**Problema:** `funnelSitemapEntries` include tutti i funnel dal registry incluso quelli con `indexable: false`, e include step con `noindex: true`. `lastModified` è `new Date()` globale (invalida `lastModified` come segnale).

**Soluzione:**

```typescript
// Filtro doppio: funnel indexable + step non-noindex
const funnelSitemapEntries = Object.values(funnelRegistry).flatMap((item) => {
  if (!item.indexable) return []; // nuovo: esclude funnel noindex
  const config = getRegisteredFunnelConfig(item.slug);
  if (!config) return [];
  return config.steps
    .filter((step) => !step.noindex) // nuovo: esclude step noindex
    .map((step) => {
      /* stesso codice */
    });
});
```

`lastModified`: il minimo è leggere `mtime` dal file `config.json` a build time via `fs.statSync`. Alternativa più semplice: data hardcodata per config (un campo `lastModified` nel registry item).

**File toccati:** `src/app/sitemap.ts` (modifica), `src/funnels/registry.ts` (opzionale: aggiungere `lastModified` a `FunnelRegistryItem`).

#### 1C. Arricchimento StructuredData

**File modificato:** `src/components/shared/SEO/StructuredData.tsx`

Aggiungere al `organizationSchema`:

- `disambiguatingDescription`: distingue Morfeus da Morpheus/morpheusbusiness.ai/NVIDIA Morpheus
- `founder`: `[{ "@type": "Person", name: "...", sameAs: "linkedin-url" }]`
- `foundingDate`, `legalName`, `vatID`
- `sameAs`: LinkedIn + Instagram + Crunchbase + Wikidata (quando disponibili)
- `areaServed`: da `GeoCircle(Roma, 10km)` a `["Italy", "Worldwide"]`
- Email unificata: eliminare la duplicazione `info@` / `hello@`
- `brand`, `slogan`, `numberOfEmployees`

Separare la logica: `StructuredData` rimane il componente di rendering; introdurre `src/lib/seo/schema-data.ts` come source of truth dei dati (oggetto TypeScript puro, facile da aggiornare senza toccare JSX).

**File toccati:** `src/components/shared/SEO/StructuredData.tsx` (modifica), `src/lib/seo/schema-data.ts` (nuovo).

#### 1D. Fix llms.txt — da allow-list a mappa contenuti

**File modificato:** `public/llms.txt`

Il file attuale è una lista di URL senza descrizione. Il pattern corretto per i crawler LLM (Perplexity, Claude, GPT) è una mappa in Markdown con titolo e breve descrizione per ogni risorsa.

**Soluzione:** Riscrivere `public/llms.txt` manualmente (è un file statico — non ha senso generarlo da codice salvo che la lista di pagine indicizzabili non sia molto lunga). Aggiungere `public/llms-full.txt` con il testo completo dei contenuti core (about, metodo, servizi).

Però, per mantenerli in sync con `INDEXABLE_LOCALE_PATHS` e il content hub futuro, conviene generarli a build-time. Vedi Layer 3.

---

### Layer 2 — Nuove pagine SSR (no scroll-hijack)

#### 2A. Content hub: `/[locale]/risorse/` (o `/[locale]/blog/`)

**Perché "risorse" e non "blog":** Il sito ha già `/risorse-gratuite` (funnel freebie hub). Un hub editoriale a `/[locale]/risorse/` è coerente con il naming IT, ma crea ambiguità con il funnel `/risorse-gratuite`. Soluzione: usare `/[locale]/blog/` per l'hub editoriale (URL internazionale, non ambiguo) oppure `/[locale]/approfondimenti/` (IT-first). La scelta va fatta con Matteo ma l'architettura è identica.

**Struttura routing:**

```
src/app/[locale]/blog/
├── layout.tsx              # metadata BlogListPage, hreflang, BreadcrumbList schema
├── page.tsx                # SSR listing: articoli + categorie (Server Component)
├── [slug]/
│   ├── layout.tsx          # metadata ArticlePage, hreflang per slug
│   └── page.tsx            # SSR articolo (Server Component)
└── [categoria]/
    └── page.tsx            # SSR categoria listing (Server Component, opzionale Fase 2+)
```

**Pattern di rendering:** Server Component puro — niente `"use client"` a livello di pagina. I componenti interattivi (commenti, share) possono essere Client Components isolati.

**Data layer:** Gli articoli partono come MDX locale (`src/content/blog/*.mdx`) oppure da CMS headless. Per la Fase 1 (scaffold pronto), MDX è sufficiente: nessuna dipendenza esterna, tipato, generabile con Claude Code, versionato in git.

```
src/content/
├── blog/
│   ├── it/
│   │   └── <slug>.mdx
│   └── en/
│       └── <slug>.mdx
└── glossary/          # termini proprietari (MARF, AI Champion, etc.)
    ├── it/
    └── en/
```

**Componente template articolo (answer-first):**

```
src/components/content/
├── ArticleLayout.tsx       # nuovo — wrapper SSR con schema Article/BlogPosting
├── ArticleHeader.tsx       # nuovo — titolo, data, breadcrumb
├── ArticleTOC.tsx          # nuovo (client) — table of contents sticky
├── ArticleFAQSection.tsx   # nuovo — sezione FAQ con FAQPage schema
└── ArticleInternalLinks.tsx # nuovo — CTA verso servizi/funnel correlati
```

**Aggiornamenti a public-indexing.ts:** aggiungere funzione `getIndexableBlogEntries(baseUrl)` parallela a `getIndexableLocalizedEntries`. La sitemap la chiama automaticamente.

#### 2B. Pagine granulari da mega-pagine (senza rompere il sito)

Strategia: **pagine shadow SSR addizionali**, non modifiche alla home/forge esistenti.

Il sito pubblico resta immutato. Si aggiungono URL nuovi che espongono sezioni ad alto valore in formato crawler-friendly.

**Home:**
| Sezione attuale (index scroll) | Nuovo URL shadow |
|--------------------------------|-----------------|
| HomeFAQ (index 12) | `/[locale]/faq/` |
| HomeROIMeter (index 10) + ROISystem (index 9) | `/[locale]/roi-ai-calculator/` |
| ProcessMaster (index 6-8) | `/[locale]/metodo/` (già esiste `/the-method` noindex) |

**Forge:**
| Sezione attuale | Nuovo URL shadow |
|----------------|-----------------|
| ServiceFAQ | `/[locale]/forge/faq/` |
| HOW IT WORKS | `/[locale]/forge/come-funziona/` |

**Nota su the-method:** La pagina `/[locale]/the-method/` esiste già ma ha `robots: index: false`. Valutare se renderla indicizzabile (aggiungere `the-method` a `INDEXABLE_LOCALE_PATHS`) invece di creare un URL shadow `/[locale]/metodo/`. L'uso di `the-method` come URL EN-only è coerente con il brand. Rendere indicizzabile è il percorso minimo; creare `/[locale]/metodo/` con contenuto IT è il percorso più impattante per SEO IT.

**Nota sul sito pubblico:** Le pagine shadow hanno contenuto derivato dalle sezioni delle mega-pagine. Non usano `redirect()` — hanno HTML proprio. Linkano internamente alla mega-pagina principale (`href="/it"`, `href="/it/forge"`). Il crawler può seguire il link diretto; l'utente che atterra sulla pagina shadow vede il contenuto estratto + CTA verso il sito principale.

**Implementazione:** Pagine SSR pure (Server Component), con dati estratti da file di content separati o dalle translation files di next-intl già esistenti (i testi FAQ sono già in `src/i18n/messages/*.json`).

#### 2C. Pagine entità indicizzabili

**Pagine nuove:**

```
src/app/[locale]/chi-siamo/       # AboutPage schema + Person (founder)
src/app/[locale]/marf/            # DefinedTerm schema — framework proprietario
src/app/[locale]/ai-champion/     # DefinedTerm schema — framework proprietario
src/app/[locale]/salescraft/      # DefinedTerm schema — framework proprietario
```

Queste pagine sono Server Component puri. Il loro contenuto è statico (testo + schema JSON-LD). Non richiedono fetch di dati. Aggiungere i path a `INDEXABLE_LOCALE_PATHS` in `public-indexing.ts`.

---

### Layer 3 — Infrastruttura SEO trasversale (nuovi file)

#### 3A. Schema components riusabili

**File nuovi in `src/components/shared/SEO/`:**

| Componente              | Schema                    | Dove si usa                                                              |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------ |
| `FAQPageSchema.tsx`     | `FAQPage`                 | `/[locale]/faq/`, `/[locale]/forge/faq/`, pagine blog con FAQ section    |
| `ArticleSchema.tsx`     | `Article` / `BlogPosting` | `[slug]/layout.tsx` del blog                                             |
| `BreadcrumbSchema.tsx`  | `BreadcrumbList`          | Tutte le pagine non-home (layout blog, pagine entità)                    |
| `CourseSchema.tsx`      | `Course`                  | Funnel con `indexable: true` per corsi (bootcamp, formazione-finanziata) |
| `PersonSchema.tsx`      | `Person`                  | `/[locale]/chi-siamo/`                                                   |
| `DefinedTermSchema.tsx` | `DefinedTerm`             | Pagine glossario/framework proprietari                                   |

**Pattern di utilizzo:** Ogni schema component è un Server Component puro che restituisce `<script type="application/ld+json">`. Non ha props opzionali — riceve un oggetto tipato con tutti i campi obbligatori. Le interfacce TypeScript sono in `src/lib/seo/schema-types.ts`.

```typescript
// src/lib/seo/schema-types.ts — nuovo
export interface FAQPageSchemaProps {
  items: Array<{ question: string; answer: string }>;
}

export interface ArticleSchemaProps {
  headline: string;
  datePublished: string; // ISO 8601
  dateModified: string;
  author: { name: string; url?: string };
  url: string;
  image?: string;
}
// ...
```

**Scelta: non un unico componente generico.** Un `<JsonLd type="FAQPage" data={...}>` generico perde il type-checking. Componenti separati per tipo schema sono più sicuri e leggibili.

#### 3B. Generazione llms.txt e llms-full.txt a build-time

**Approccio:** Next.js Route Handler (`src/app/llms.txt/route.ts` e `src/app/llms-full.txt/route.ts`) con `export const dynamic = 'force-static'` — generati a build e serviti come file statici.

```typescript
// src/app/llms.txt/route.ts — nuovo
import { INDEXABLE_LOCALE_PATHS, INDEXABLE_CASE_STUDY_SLUGS } from "@/lib/seo/public-indexing";
import { funnelRegistry } from "@/funnels/registry";

export const dynamic = "force-static";

export async function GET() {
  const content = buildLlmsTxt(); // funzione che legge public-indexing + registry indicizzabili
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

**Vantaggio rispetto al file statico manuale:** rimane automaticamente in sync con `INDEXABLE_LOCALE_PATHS`, il registry dei funnel e il content hub. Aggiungere una pagina alla whitelist aggiorna automaticamente anche `llms.txt`.

**`llms-full.txt`:** Contiene il testo esteso dei contenuti core (about, metodo, servizi). Per la Fase 1 può essere generato da template string; le fasi successive possono leggerlo dai file MDX del content hub.

**Attenzione:** il file attuale `public/llms.txt` verrebbe sostituito da questo route handler. Il file in `public/` ha precedenza sulle route Next.js — quindi il file statico va rimosso quando si attiva il route handler.

#### 3C. Source of truth pagine indicizzabili — estensione

**File modificato:** `src/lib/seo/public-indexing.ts`

Aggiungere:

```typescript
// Nuove pagine entità
export const INDEXABLE_ENTITY_PATHS = [
  "chi-siamo",
  "marf",
  "ai-champion",
  "salescraft",
] as const;

// Hub editoriale
export const INDEXABLE_BLOG_PATHS = [] as const;  // vuoto fino a Fase 2; popolare con i slug degli articoli

// Funzione per blog entries (parallela a getIndexableLocalizedEntries)
export function getIndexableBlogEntries(baseUrl: string) { ... }

// Funzione per entity entries
export function getIndexableEntityEntries(baseUrl: string) { ... }
```

La sitemap, `llms.txt` e `llms-full.txt` importano tutte da qui — unico punto di controllo.

---

## Flusso dati end-to-end

```
src/lib/seo/public-indexing.ts    ← SINGLE SOURCE OF TRUTH per pagine indicizzabili
        │
        ├─► src/app/sitemap.ts             (sitemap XML)
        ├─► src/app/llms.txt/route.ts      (llms.txt generato)
        ├─► src/app/llms-full.txt/route.ts (llms-full.txt generato)
        └─► src/lib/seo/schema-data.ts     (dati Organization, Person)
                    │
                    └─► src/components/shared/SEO/StructuredData.tsx   (JSON-LD globale)
                    └─► src/components/shared/SEO/ArticleSchema.tsx    (per pagine blog)
                    └─► src/components/shared/SEO/FAQPageSchema.tsx    (per pagine FAQ)
                    └─► src/components/shared/SEO/BreadcrumbSchema.tsx (per tutte le pagine)
                    └─► src/components/shared/SEO/CourseSchema.tsx     (per funnel corsi)
```

```
Request /it/blog/cos-e-il-marf
        │
        ▼
middleware.ts         → non è un funnel slug → passa a intlMiddleware → locale="it"
        │
        ▼
[locale]/layout.tsx   → StructuredData (Organization) + lang server-side (dopo fix)
        │
        ▼
[locale]/blog/[slug]/layout.tsx  → generateMetadata (title, description, hreflang)
                                    ArticleSchema (JSON-LD Article)
                                    BreadcrumbSchema (JSON-LD BreadcrumbList)
        │
        ▼
[locale]/blog/[slug]/page.tsx    → SSR puro, legge MDX da src/content/blog/it/<slug>.mdx
                                    ArticleLayout (header, TOC, body, FAQ section)
                                    FAQPageSchema se ci sono FAQ
```

---

## Componenti: nuovo vs modificato

| File                                              | Stato                     | Operazione                                                                         |
| ------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| `src/app/layout.tsx`                              | ESISTENTE (skip-worktree) | MODIFICARE — fix `lang` server-side via `x-next-intl-locale` header                |
| `src/app/sitemap.ts`                              | ESISTENTE                 | MODIFICARE — filtrare noindex, migliorare lastModified                             |
| `src/lib/seo/public-indexing.ts`                  | ESISTENTE                 | MODIFICARE — aggiungere entity/blog paths e funzioni helper                        |
| `src/components/shared/SEO/StructuredData.tsx`    | ESISTENTE                 | MODIFICARE — arricchire Organization; estrarre dati in schema-data.ts              |
| `src/components/shared/HtmlLang.tsx`              | ESISTENTE                 | DEPRECARE — dopo fix root layout, diventa no-op (tenere per sicurezza ma svuotare) |
| `public/llms.txt`                                 | ESISTENTE                 | ELIMINARE — sostituito da route handler                                            |
| `src/lib/seo/schema-data.ts`                      | NUOVO                     | Source of truth dati Organization/Person                                           |
| `src/lib/seo/schema-types.ts`                     | NUOVO                     | Interfacce TypeScript per tutti gli schema                                         |
| `src/components/shared/SEO/FAQPageSchema.tsx`     | NUOVO                     | Schema FAQPage riusabile                                                           |
| `src/components/shared/SEO/ArticleSchema.tsx`     | NUOVO                     | Schema Article/BlogPosting                                                         |
| `src/components/shared/SEO/BreadcrumbSchema.tsx`  | NUOVO                     | Schema BreadcrumbList                                                              |
| `src/components/shared/SEO/CourseSchema.tsx`      | NUOVO                     | Schema Course per funnel corsi                                                     |
| `src/components/shared/SEO/PersonSchema.tsx`      | NUOVO                     | Schema Person per chi-siamo                                                        |
| `src/components/shared/SEO/DefinedTermSchema.tsx` | NUOVO                     | Schema DefinedTerm per framework                                                   |
| `src/app/llms.txt/route.ts`                       | NUOVO                     | Route handler static per llms.txt                                                  |
| `src/app/llms-full.txt/route.ts`                  | NUOVO                     | Route handler static per llms-full.txt                                             |
| `src/app/[locale]/blog/layout.tsx`                | NUOVO                     | Hub editoriale layout                                                              |
| `src/app/[locale]/blog/page.tsx`                  | NUOVO                     | Hub editoriale listing (SSR)                                                       |
| `src/app/[locale]/blog/[slug]/layout.tsx`         | NUOVO                     | Articolo layout + metadata                                                         |
| `src/app/[locale]/blog/[slug]/page.tsx`           | NUOVO                     | Articolo rendering (SSR, MDX)                                                      |
| `src/app/[locale]/faq/page.tsx`                   | NUOVO                     | FAQ shadow page (da HomeFAQ)                                                       |
| `src/app/[locale]/chi-siamo/page.tsx`             | NUOVO                     | Pagina entità About                                                                |
| `src/app/[locale]/marf/page.tsx`                  | NUOVO                     | Pagina DefinedTerm MARF                                                            |
| `src/app/[locale]/ai-champion/page.tsx`           | NUOVO                     | Pagina DefinedTerm AI Champion                                                     |
| `src/app/[locale]/salescraft/page.tsx`            | NUOVO                     | Pagina DefinedTerm Salescraft                                                      |
| `src/app/[locale]/forge/faq/page.tsx`             | NUOVO                     | Forge FAQ shadow page                                                              |
| `src/content/blog/it/*.mdx`                       | NUOVO                     | Contenuti articoli IT                                                              |
| `src/content/blog/en/*.mdx`                       | NUOVO                     | Contenuti articoli EN                                                              |
| `src/components/content/ArticleLayout.tsx`        | NUOVO                     | Template articolo answer-first                                                     |
| `src/components/content/ArticleFAQSection.tsx`    | NUOVO                     | Sezione FAQ con schema                                                             |
| `src/components/content/BreadcrumbNav.tsx`        | NUOVO                     | Breadcrumb UI (+ BreadcrumbSchema)                                                 |
| `src/lib/reserved-slugs.ts`                       | ESISTENTE                 | MODIFICARE — aggiungere nuovi slug (blog, chi-siamo, faq, ecc.)                    |

---

## Vincoli architetturali rispettati

### skip-worktree su `src/app/[locale]/layout.tsx`

Il file `[locale]/layout.tsx` NON ha skip-worktree (solo il root `src/app/layout.tsx` ce l'ha). Tutte le modifiche al locale layout sono sicure e committabili normalmente.

Il root `src/app/layout.tsx` ha skip-worktree: la versione locale diverge da `main`. Prima di modificarlo bisogna `git update-index --no-skip-worktree src/app/layout.tsx` e fare un merge consapevole. La modifica per il `lang` server-side è l'unico motivo valido per toccare questo file nel contesto SEO.

### Sito pubblico immutato

Le pagine esistenti (`/[locale]/`, `/[locale]/forge/`, `/[locale]/lab/`) NON vengono modificate. Le pagine shadow (es. `/[locale]/faq/`) sono additive. I componenti di sezione esistenti (es. `HomeFAQ`) non vengono toccati — il contenuto FAQ viene copiato/estratto nei file di content separati che alimentano le shadow pages.

### Sistema funnel non alterato

Il middleware, la logica di rewrite, il registry e il componentMap non vengono modificati. Le nuove pagine del content hub sono route standard App Router sotto `/[locale]/blog/` — non vengono confuse con funnel slug perché il middleware controlla prima se il primo segmento è un funnel slug registrato.

### Collisione slug

Verificare che i nuovi slug non collidano con funnel registrati: `blog`, `chi-siamo`, `faq`, `marf`, `ai-champion`, `salescraft` sono attualmente assenti dal registry. Aggiungere tutti a `RESERVED_SITE_SLUGS` in `reserved-slugs.ts` contemporaneamente alla creazione delle pagine.

---

## Build order suggerito (rispetta le dipendenze)

### Fase A — Fix tecnici quick wins (nessuna dipendenza esterna; eseguibili in parallelo)

1. **`src/lib/seo/schema-data.ts`** — creare source of truth (richiede decisioni su email ufficiale, founder data, VAT ID da Matteo)
2. **`src/components/shared/SEO/StructuredData.tsx`** — arricchire importando da schema-data.ts
3. **`src/app/sitemap.ts`** — fix filtro noindex
4. **`src/lib/seo/public-indexing.ts`** — aggiungere entity paths, helper functions
5. **`src/lib/reserved-slugs.ts`** — aggiungere tutti i nuovi slug
6. **`src/app/layout.tsx`** — fix lang server-side (richiede rimozione skip-worktree; fare merge con la versione main; testare build)
7. **`public/llms.txt`** — riscrivere manualmente come mappa con descrizioni (versione provvisoria pre-route-handler)

**Gate:** `npm run typecheck && npm run build` deve passare prima di procedere.

### Fase B — Schema components (dipende da schema-types.ts)

8. **`src/lib/seo/schema-types.ts`** — interfacce TypeScript per tutti gli schema
9. **`src/components/shared/SEO/FAQPageSchema.tsx`** — usato subito in Fase C
10. **`src/components/shared/SEO/BreadcrumbSchema.tsx`** — usato in tutte le nuove pagine
11. **`src/components/shared/SEO/ArticleSchema.tsx`** — usato nel blog
12. **`src/components/shared/SEO/PersonSchema.tsx`** — usato in chi-siamo
13. **`src/components/shared/SEO/DefinedTermSchema.tsx`** — usato nelle pagine framework
14. **`src/components/shared/SEO/CourseSchema.tsx`** — usato nei funnel corsi

### Fase C — Pagine shadow + pagine entità (dipende da Fase B; non dipendono tra loro)

15. **`src/app/[locale]/faq/page.tsx`** — shadow page FAQ (contenuto da `HomeFAQ` + `ServiceFAQ`)
16. **`src/app/[locale]/forge/faq/page.tsx`** — shadow page Forge FAQ
17. **`src/app/[locale]/chi-siamo/page.tsx`** — pagina entità About (dipende da schema-data.ts)
18. **`src/app/[locale]/marf/page.tsx`** — DefinedTerm MARF
19. **`src/app/[locale]/ai-champion/page.tsx`** — DefinedTerm AI Champion Program
20. **`src/app/[locale]/salescraft/page.tsx`** — DefinedTerm Salescraft
21. Aggiornare `INDEXABLE_LOCALE_PATHS` e sitemap per includere queste pagine

### Fase D — Content hub (dipende da Fase B; indipendente da Fase C)

22. **`src/components/content/ArticleLayout.tsx`** — template answer-first
23. **`src/components/content/BreadcrumbNav.tsx`**
24. **`src/components/content/ArticleFAQSection.tsx`**
25. **`src/app/[locale]/blog/layout.tsx`** + **`page.tsx`** — hub listing
26. **`src/app/[locale]/blog/[slug]/layout.tsx`** + **`page.tsx`** — articolo rendering
27. **`src/content/blog/`** — struttura cartelle + primo articolo scaffold

### Fase E — llms.txt dinamico (dipende da Fase D; il file static può essere aggiornato manualmente prima)

28. **`src/app/llms.txt/route.ts`** — route handler
29. **`src/app/llms-full.txt/route.ts`** — route handler
30. Eliminare `public/llms.txt` (il route handler prende precedenza solo se il file statico è rimosso)

---

## Anti-pattern da evitare

### Anti-Pattern 1: Shadow pages con redirect

**Cosa si potrebbe fare:** `/[locale]/faq/` fa `redirect("/it#faq")` verso la sezione nella home.

**Perché è sbagliato:** Un redirect 301/302 non trasmette segnali SEO alla destination. Il crawler indicizza l'URL della destinazione, non la shadow page. La shadow page non ha contenuto proprio → segnale SEO nullo.

**Fare invece:** La shadow page ha il proprio HTML completo con il contenuto della sezione FAQ + link "Torna alla home" + CTA servizi.

### Anti-Pattern 2: `generateStaticParams` con slug hardcoded nel blog

**Cosa si potrebbe fare:** Elencare i slug degli articoli direttamente in `generateStaticParams` nella pagina.

**Perché è sbagliato:** Accoppia il routing al contenuto — aggiungere un articolo richiede modificare il codice.

**Fare invece:** `generateStaticParams` legge il filesystem (`src/content/blog/[locale]/`) e restituisce tutti i file `.mdx` trovati. Zero-config per nuovi articoli.

### Anti-Pattern 3: Pagine blog con `"use client"` per animazioni

**Cosa si potrebbe fare:** Importare animazioni Framer Motion o stili della home nel template articolo.

**Perché è sbagliato:** Le pagine del content hub devono essere SSR pure per massimizzare retrievability. Ogni KB di JS in più è crawler-unfriendly.

**Fare invece:** Animazioni solo su Client Components strettamente necessari (es. TOC sticky). Il layout dell'articolo è un Server Component. CSS puro per transizioni visive.

### Anti-Pattern 4: Duplicare `INDEXABLE_LOCALE_PATHS` in più posti

**Cosa si potrebbe fare:** Aggiungere i nuovi slug della sitemap direttamente in `sitemap.ts`, `llms.txt/route.ts` e `llms-full.txt/route.ts` indipendentemente.

**Perché è sbagliato:** Tre sorgenti di verità divergono nel tempo — un nuovo articolo compare in sitemap ma non in llms.txt.

**Fare invece:** Tutte e tre importano da `src/lib/seo/public-indexing.ts`. Aggiungere un path in un solo posto lo propaga ovunque.

---

## Considerazioni sulla sitemap per il content hub

Quando il blog scala a decine di articoli, la sitemap corrente (un unico `sitemap.ts`) diventa lunga. Next.js supporta `generateSitemaps()` per la sitemap segmentata. Non serve fino a ~200+ pagine — inserire come upgrade path nella Fase D.

---

## Sources

- Ispezione diretta del codebase (2026-06-26): `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/forge/page.tsx`, `src/app/sitemap.ts`, `src/middleware.ts`, `src/lib/seo/public-indexing.ts`, `src/components/shared/SEO/StructuredData.tsx`, `src/components/shared/HtmlLang.tsx`, `src/funnels/registry.ts`, `src/lib/reserved-slugs.ts`, `src/i18n/routing.ts`, `public/llms.txt`
- `docs/seo-geo-master-plan.md` — strategia e diagnosi

---

_Architecture research for: SEO/GEO integration — Morfeus Website v1.1_
_Researched: 2026-06-26_
