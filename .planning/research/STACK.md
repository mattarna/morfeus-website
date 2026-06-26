# Stack Research — SEO/GEO Architecture

**Project:** Morfeus Website — Milestone v1.1 SEO/GEO Architecture
**Domain:** Next.js 14 App Router marketing site + funnel system, SEO/GEO hardening
**Researched:** 2026-06-26
**Confidence:** HIGH (core stack verified via Context7; version data cross-checked against npm)

---

## Baseline esistente (NON reinstallare)

| Pacchetto  | Versione attuale | Ruolo SEO esistente                                                                    |
| ---------- | ---------------- | -------------------------------------------------------------------------------------- |
| next       | 14.2.35          | `generateMetadata`, `sitemap()`, route handlers, JSON-LD via `dangerouslySetInnerHTML` |
| next-intl  | ^4.6.1           | hreflang / locale routing                                                              |
| typescript | ^5               | type-safety                                                                            |
| vitest     | ^4.1.6           | test runner (estendere per validazione CI)                                             |

Il JSON-LD esistente in `src/components/shared/SEO/StructuredData.tsx` usa oggetti plain TypeScript senza type-safety. Non dipende da nessuna libreria schema.

---

## Recommended Stack — Aggiunte necessarie

### Core Technologies

| Technology  | Version | Purpose                                                                                                       | Why Recommended                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| schema-dts  | 2.0.0   | Type-safe JSON-LD per Organization, FAQPage, Article/BlogPosting, BreadcrumbList, Course, Person, DefinedTerm | Libreria ufficiale Google, basata su schema.org v30. Fornisce TypeScript discriminated unions: typo su una proprietà → errore a compile-time, non a runtime. v2.0.0 uscita marzo 2026. Zero overhead a runtime (solo tipi). **Integrazione diretta con StructuredData.tsx esistente**: import type e annotazione degli oggetti. Nessuna riscrittura del rendering. |
| gray-matter | ^4.0.3  | Parsing frontmatter YAML dagli articoli MDX                                                                   | Standard de-facto (usato da Gatsby, Astro, VitePress, Hashicorp). Zero dipendenze, ultra-stabile. Necessario per leggere `title`, `date`, `description`, `slug` dai file `.mdx` senza un CMS.                                                                                                                                                                      |
| feed        | 5.2.1   | Generazione RSS 2.0 + Atom 1.0 via route handler                                                              | TypeScript-native, API pulita, zero configurazione Webpack. Usato da Next.js docs ufficiali come esempio. Genera anche JSON Feed 1.0 in parallelo. La route handler `app/feed.xml/route.ts` con `force-static` produce il feed a build-time.                                                                                                                       |

### Supporting Libraries

| Library                | Version         | Purpose                                                     | When to Use                                                                                                                                                                                                                               |
| ---------------------- | --------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| next-mdx-remote-client | ^2.1.7          | Rendering MDX da filesystem con frontmatter, App Router RSC | **Usare al posto di next-mdx-remote** (archivato aprile 2026, ultimo aggiornamento febbraio 2026). Questo fork attivo è compatibile RSC, supporta `evaluate()` per accedere a frontmatter e contenuto in un unico server component async. |
| @next/mdx              | 14.x (built-in) | Alternativa zero-dep per MDX statico via `import` diretto   | Usare per pagine statiche uno-a-uno (es. `/it/chi-siamo/metodologia.mdx`). Non richiede installazione separata se già nel progetto Next.js. Usa `next.config.js` `withMDX`. NON adatto per routing dinamico `[slug]` con listing.         |

### Development Tools

| Tool                      | Purpose                                                                       | Notes                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Nessun tool aggiuntivo    | La validazione schema.org in CI avviene via typecheck TypeScript (schema-dts) | `npm run typecheck` già in CI gira `tsc --noEmit` — con schema-dts gli errori di tipo sui JSON-LD emergono qui senza aggiungere runner    |
| Script Node.js build-time | Generazione `llms-full.txt` a build-time (script npm)                         | Node script in `scripts/generate-llms-full.mjs` che legge i file MDX e concatena i contenuti; eseguito come `prebuild` o step CI separato |

---

## Pattern architetturali per area

### 1. JSON-LD type-safe con schema-dts

**Integrazione:** importare i tipi in `StructuredData.tsx` senza cambiare il rendering.

```typescript
import type {
  Organization,
  WithContext,
  FAQPage,
  Article,
  BreadcrumbList,
  Course,
  Person,
  DefinedTerm,
} from "schema-dts";

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Morfeus",
  // TypeScript segnala subito se una proprietà è sbagliata
  founder: {
    "@type": "Person",
    name: "Matteo ...",
    sameAs: "https://www.linkedin.com/in/...",
  },
};
```

Componenti separati per tipo di schema (non tutto in `StructuredData.tsx`):

- `SchemaOrganization.tsx` — layout globale, invariante
- `SchemaFAQPage.tsx` — passare `items: {q, a}[]` come prop
- `SchemaArticle.tsx` — passare frontmatter come prop
- `SchemaBreadcrumb.tsx` — derivare da `pathname`
- `SchemaCourse.tsx` — per pagine formazione/bootcamp
- `SchemaDefinedTerm.tsx` — per le pagine termini proprietari (MARF, AI Champion, Salescraft)

### 2. Hub contenuti MDX — scelta architetturale

**Raccomandazione: filesystem MDX con gray-matter + next-mdx-remote-client.**

Non usare Velite né Content Collections per questo progetto: aggiungono una compilazione extra, una cache `.velite/` da gestire in git, e un plugin webpack/turbopack. Per il volume atteso di contenuti (decine di articoli, non migliaia) il costo di configurazione non si ammortizza.

Struttura consigliata:

```
src/content/
  risorse/        ← articoli IT (slug come nome file)
    cos-e-marf.mdx
    ai-champion-program.mdx
  resources/      ← articoli EN
    what-is-marf.mdx
  terms/          ← termini proprietari IT+EN (DefinedTerm)
    marf.mdx
    salescraft.mdx
```

Frontmatter minimo per ogni articolo:

```yaml
---
title: "Cos'è MARF"
description: "..."
publishedAt: "2026-07-01"
updatedAt: "2026-07-01"
locale: "it"
slug: "cos-e-marf"
schemaType: "Article" # o DefinedTerm / Course
noindex: false
---
```

Rendering: `app/[locale]/risorse/[slug]/page.tsx` legge il file con `fs.readFile`, passa a `next-mdx-remote-client/rsc` → `evaluate()`, ottiene `{ content, frontmatter }`, renderizza con `SchemaArticle.tsx`.

### 3. llms.txt e llms-full.txt

**llms.txt** rimane un file statico in `public/llms.txt` (già presente). Va trasformato da allow-list a mappa contenuti Markdown con una riga di descrizione per URL. Aggiornamento manuale ad ogni nuova pagina/sezione.

**llms-full.txt** — generazione a build-time via route handler con `force-static`:

```typescript
// app/llms-full.txt/route.ts
export const dynamic = "force-static";

export async function GET() {
  // legge i file MDX da src/content/, concatena titolo + corpo testo
  const content = await buildLlmsFullContent();
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

Alternativa: script `scripts/generate-llms-full.mjs` eseguito come `prebuild` che scrive `public/llms-full.txt`. Più semplice da debuggare, non occupa un route handler. Preferire questa per ora.

### 4. RSS Feed

Route handler a Vercel edge con `force-static`:

```typescript
// app/feed.xml/route.ts
import { Feed } from 'feed';
export const dynamic = 'force-static';

export async function GET() {
  const feed = new Feed({ title: 'Morfeus', ... });
  // aggiungere items da src/content/risorse/
  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

Feed separato per locale (`/it/feed.xml` e `/en/feed.xml`) — utile per aggregatori e per il segnale `hreflang` corretto.

### 5. Validazione structured data in CI

Non aggiungere un tool di validazione runtime separato. La strategia è:

1. **schema-dts** cattura gli errori di tipo a compile-time tramite `npm run typecheck` (già in CI).
2. **Test snapshot** (vitest): per ogni componente schema, un test che serializza l'output JSON-LD e lo confronta con uno snapshot. Rileva regressioni strutturali.
3. **Manuale spot-check**: Google Rich Results Test e validator.schema.org dopo ogni deploy su staging. Non automatizzabile in CI senza un browser headless completo.

---

## Installation

```bash
# Aggiunte necessarie (prod dependencies)
npm install schema-dts@2.0.0
npm install gray-matter
npm install feed
npm install next-mdx-remote-client

# Nessuna dev dependency aggiuntiva
# (schema-dts è solo tipi, typecheck già in CI)
```

Aggiornare anche `package-lock.json` con `npm install` prima del commit (regola dura del progetto).

---

## Alternatives Considered

| Recommended                          | Alternative                      | Why Not                                                                                                                                                                                          |
| ------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| schema-dts 2.0.0                     | Oggetti plain TS (stato attuale) | Zero type-safety: errori nei campi JSON-LD non vengono catturati da tsc, emergeranno solo in Rich Results Test post-deploy                                                                       |
| schema-dts 2.0.0                     | zod + schema.org custom types    | Over-engineering: Zod valida a runtime, schema-dts valida a compile-time senza bundle overhead. Non servono entrambi                                                                             |
| gray-matter + next-mdx-remote-client | Velite                           | Velite aggiunge un build step, una cache da gitignore, un webpack plugin. Overkill per <100 articoli. Rende più complessa la CI                                                                  |
| gray-matter + next-mdx-remote-client | Contentlayer                     | Abbandonato. Non supporta App Router nativamente                                                                                                                                                 |
| gray-matter + next-mdx-remote-client | next-mdx-remote                  | Archiviato aprile 2026. Non riceve più aggiornamenti di sicurezza                                                                                                                                |
| gray-matter + next-mdx-remote-client | @next/mdx nativo                 | Ottimo per pagine statiche singole; non gestisce routing dinamico [slug] + listing + frontmatter senza gray-matter comunque                                                                      |
| feed (jpmonette)                     | rss (npm)                        | `rss` non è mantenuto attivamente, nessun TypeScript nativo                                                                                                                                      |
| Route handler force-static           | Script prebuild Node             | Entrambi validi. Il route handler è più "Next.js way"; lo script è più debuggabile. Raccomandato: script per llms-full.txt (più semplice), route handler per feed.xml (pattern standard Next.js) |
| Snapshot vitest                      | schema-org-validate (npm)        | schema-org-validate è un tool esterno che richiede un JSON valido come input; gli snapshot vitest coprono già la regressione strutturale e si integrano con il test runner esistente             |

---

## What NOT to Add

| Avoid                                     | Why                                                                                                                                                                                      | Use Instead                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Contentlayer / Contentlayer2              | Abbandonato, non supporta App Router                                                                                                                                                     | gray-matter + next-mdx-remote-client          |
| next-mdx-remote (originale)               | Archiviato aprile 2026, read-only                                                                                                                                                        | next-mdx-remote-client (fork attivo)          |
| Headless CMS (Sanity, Contentful, Strapi) | La produzione contenuti è FUORI scope di questa milestone; un CMS aggiunge infrastruttura, account, webhooks, e latenza fetch. Lo scaffold MDX su filesystem è sufficiente e reversibile | Filesystem MDX + gray-matter                  |
| Velite                                    | Build step aggiuntivo, cache `.velite/` in git, plugin webpack — overkill per il volume atteso                                                                                           | gray-matter diretto                           |
| next-sitemap (npm package)                | `sitemap()` nativo di Next.js 14 è già in uso e sufficiente; next-sitemap è necessario solo con Pages Router o per sitemap index multi-file su siti enormi                               | `src/app/sitemap.ts` esistente, esteso        |
| rehype-pretty-code / syntax highlighting  | Non necessario per contenuti B2B answer-first; aggiunge bundle e complessità                                                                                                             | Nessuno, o solo se emerge un caso d'uso reale |
| Algolia / search client-side              | Fuori scope. Il sito ha <50 pagine indicizzabili ora                                                                                                                                     | Nessuno                                       |
| CMS headless (qualsiasi)                  | Zero valore nella fase scaffold; aggiunge accoppiamento esterno                                                                                                                          | Filesystem MDX                                |

---

## Version Compatibility

| Package A                     | Compatible With                 | Notes                                                                                                                                                                                                                        |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| schema-dts@2.0.0              | TypeScript ^5, Next.js 14       | Solo tipi, zero runtime. Compatibile con qualsiasi versione. v2.0.0 aggiorna schema.org alla v30 (Quantity diventa DataType core) — non breaking per Organization/FAQPage/Article/Course/Person/DefinedTerm usati da Morfeus |
| next-mdx-remote-client@^2.1.7 | Next.js 14 App Router, React 18 | Fork di next-mdx-remote. Supporta RSC via `next-mdx-remote-client/rsc`. API leggermente diversa da next-mdx-remote v5: usa `evaluate()` invece di `compileMDX()`                                                             |
| gray-matter@^4.0.3            | Node.js 18+, qualsiasi          | Ultra-stabile, nessuna breaking change da anni                                                                                                                                                                               |
| feed@5.2.1                    | Node.js 18+, TypeScript         | Tipi built-in, zero config aggiuntiva                                                                                                                                                                                        |

---

## Punti di integrazione con l'app esistente

| File esistente                                 | Come cambia                                                                                                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/shared/SEO/StructuredData.tsx` | Annotare gli oggetti esistenti con i tipi `WithContext<Organization>` ecc. da schema-dts. Split in componenti separati per tipo. Nessun cambio al rendering `dangerouslySetInnerHTML`. |
| `src/app/sitemap.ts`                           | Aggiungere gli URL del nuovo hub contenuti (`/it/risorse/*`, `/en/resources/*`). Fix: escludere funnel `noindex`, `lastModified` reale per articoli MDX.                               |
| `src/app/[locale]/layout.tsx`                  | Nessuna modifica per schema-dts. Eventualmente aggiungere `<link rel="alternate" type="application/rss+xml">` nel `<head>` per il feed.                                                |
| `src/funnels/registry.ts`                      | Invariato. L'hub contenuti è fuori dal sistema funnel.                                                                                                                                 |
| `public/llms.txt`                              | Sostituire il contenuto allow-list con mappa Markdown strutturata (aggiornamento manuale, nessun codice).                                                                              |
| `.github/workflows/quality-gates.yml`          | Nessuna modifica: `typecheck` già cattura gli errori schema-dts. Lo script `generate-llms-full.mjs` può essere aggiunto come step opzionale post-build.                                |

---

## Sources

- Context7 `/google/schema-dts` — Pattern Organization, FAQPage, Article, Person, DefinedTerm; conferma che v2.0.0 è l'ultima versione (marzo 2026). HIGH confidence.
- Context7 `/hashicorp/next-mdx-remote` — Conferma supporto RSC via `/rsc` import; nota: repo archiviato. HIGH confidence.
- Context7 `/ipikuka/next-mdx-remote-client` — Pattern `evaluate()` per App Router RSC con frontmatter. MEDIUM confidence (fonte secondaria, ma ben documentata).
- Context7 `/jpmonette/feed` — API Feed, rss2(), atom1(), TypeScript. HIGH confidence.
- Context7 `/vercel/next.js` — Route handler RSS, generateMetadata, MDX con `generateStaticParams`. HIGH confidence.
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) — Versione 2.0.0 confermata (marzo 2026). HIGH.
- [next-mdx-remote archiviato](https://github.com/hashicorp/next-mdx-remote) — Archivio aprile 2026 confermato. HIGH.
- [next-mdx-remote-client npm](https://www.npmjs.com/package/next-mdx-remote-client) — v2.1.7, last publish ~3 mesi fa. HIGH.
- [feed npm](https://www.npmjs.com/package/feed) — v5.2.1, pubblicata ~1 mese fa. HIGH.
- [llms.txt stato 2026](https://presenc.ai/research/state-of-llms-txt-2026) — Adozione e pattern attuali. MEDIUM.
- [Next.js llms-full route handler pattern](https://llms-txt.io/blog/how-to-add-llms-txt-to-nextjs-react) — Pattern `force-static` route handler. MEDIUM.
- [Contentlayer abbandonato](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives) — Confermato non mantenuto. HIGH.

---

_Stack research for: Morfeus Website — SEO/GEO Architecture (milestone v1.1)_
_Researched: 2026-06-26_
