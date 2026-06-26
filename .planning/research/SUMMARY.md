# Project Research Summary

**Project:** Morfeus Website — Milestone v1.1 SEO/GEO Architecture
**Domain:** Next.js 14 App Router B2B marketing site — SEO/GEO hardening + content hub scaffold
**Researched:** 2026-06-26
**Confidence:** HIGH

---

## Executive Summary

Morfeus is a B2B AI consulting firm whose website currently has ~8 indexable pages per locale, a config-driven funnel system, and an existing (but broken) SEO foundation: wrong `<html lang>` served to EN crawlers, sitemap contaminated with `noindex` funnel URLs, Organization schema with conflicting `areaServed`, stale `llms.txt` in allow-list format, and no `@id` convention that would let structured-data consumers build a coherent entity graph. These are pre-existing defects — quick to fix and the highest-leverage action available before any new content amplifies them.

The recommended approach proceeds in six phases ordered strictly by dependency: (0) measurement baseline; (1) quick-win code fixes + entity layer — the `@id` convention must precede all new schema; (2) content hub scaffold, the critical-path item that unblocks Article/FAQPage/DefinedTerm schema, RSS, and `llms-full.txt`; (3) schema infrastructure; (4) extended schema + granular URLs + dynamic `llms.txt` reading from `public-indexing.ts`; (5) off-site authority (human-gated). Stack is intentionally minimal: `schema-dts@2.0.0` (type-safe JSON-LD, zero runtime), `next-mdx-remote-client@2.1.7` + `gray-matter@4.0.3` (filesystem MDX, no CMS), `feed@5.2.1` (RSS route handler), and a Node prebuild script for `llms-full.txt`.

Key caveats: the `lang` fix requires clearing `git skip-worktree` on `src/app/layout.tsx` before editing; `llms.txt` impact is genuinely uncertain (97% of sites with a valid file receive zero crawl requests as of May 2026); schema markup disambiguates the entity but does not mechanically buy AI citations; 99.6% of AI influence is invisible to GA4, making the prompt panel baseline the only reliable GEO signal. The Bing Webmaster Tools domain verification is the single human-gated action that most meaningfully unblocks measurable progress — it unlocks the AI Performance Report and indirectly improves Copilot + ChatGPT Search indexing.

---

## Key Findings

### Recommended Stack

The existing site already has the SEO rendering pipeline in place. Three net-new production dependencies are justified: `schema-dts@2.0.0` adds TypeScript discriminated-union types to the existing JSON-LD objects (zero runtime cost, errors caught at `npm run typecheck` which is already in CI); `next-mdx-remote-client@2.1.7` + `gray-matter@4.0.3` provide filesystem MDX reading and frontmatter parsing for the content hub (the original `next-mdx-remote` was archived April 2026 — do not use it); `feed@5.2.1` generates RSS via a `force-static` route handler. No CMS, no Velite, no Contentlayer, no separate schema validation tooling.

**Core technologies:**

- `schema-dts@2.0.0`: type-safe JSON-LD — replaces untyped plain-TS objects in `StructuredData.tsx`; errors surface at compile time via `typecheck`; zero bundle impact
- `next-mdx-remote-client@2.1.7` + `gray-matter@4.0.3`: filesystem MDX with frontmatter — active fork of archived original; RSC-compatible via `evaluate()`
- `feed@5.2.1`: TypeScript-native RSS 2.0 + Atom generator — `force-static` route handler at `/[locale]/feed.xml`
- `scripts/generate-llms-full.mjs` (no new dependency): Node prebuild script; reads `src/content/` MDX files; writes `public/llms-full.txt`; simpler to debug than a route handler

**Validation approach:** `npm run typecheck` (already in CI) is sufficient — schema-dts errors surface there. Manual Rich Results Test spot-check after each deploy milestone. No additional CI tooling needed.

### Expected Features

**Must have (table stakes — Phases 1-2):**

- Fix `<html lang>` server-side per locale (via `x-next-intl-locale` header in root layout)
- Organization schema: stable `@id`, `sameAs` array, `founder` Person, `disambiguatingDescription`, unified `areaServed`, single canonical email
- Sitemap: filter `indexable:false` funnels and `noindex:true` steps; real `lastModified`
- Blanket `X-Robots-Tag: noindex` on all `/funnel-internal/*` routes in middleware
- `metadataPreset` for `bootcamp-ai-champion-3a-edizione` (currently falls through to empty metadata)
- `llms.txt` rewritten as Markdown content map (not allow-list)
- FAQPage schema on existing home + Forge FAQ sections
- BreadcrumbList on all non-home pages
- GA4 AI referral segment (regex covering chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai, etc.)
- Prompt panel baseline template (15 queries: 5 brand, 5 category, 5 problem — IT + EN)
- Bing Webmaster Tools domain verification + sitemap submit (human action, then Claude Code submits sitemap)

**Should have (differentiators — Phases 3-4):**

- Content hub `/[locale]/blog/` with SSR listing, article template, 3-5 seed articles
- Article schema with real `datePublished`/`dateModified` from frontmatter, `author` pointing to Person `@id`
- RSS feed per locale
- Entity pages: `/[locale]/chi-siamo/`, `/[locale]/marf/`, `/[locale]/ai-champion/`, `/[locale]/salescraft/`
- Shadow FAQ pages (`/[locale]/faq/`, `/[locale]/forge/faq/`) — own HTML, not redirects
- `hreflang` fix in `buildLocaleAlternates()` to accept explicit locale list per page
- `llms-full.txt` generated from hub content

**Defer to v1.x or v2+:**

- Wikidata item (eligibility must be established first via media/registry coverage)
- Course schema (requires Go/No-go decision on unlocking `noindex` content assets)
- URL granularization of home/forge mega-pages (high UX risk, requires separate planning)
- Pillar + cluster content strategy (editorial capacity question, not a code question)
- Paid LLM visibility tools (Profound, Semrush AI Visibility) — no ROI until baseline volume exists

### Architecture Approach

Three existing systems must be composed with without breaking: the middleware rewrite system (`/<slug>` to `/funnel-internal/<slug>`), the next-intl locale routing, and `src/lib/seo/public-indexing.ts` as the single source of truth for indexable pages. All new SEO infrastructure (sitemap, llms.txt, llms-full.txt) must import from `public-indexing.ts` — never duplicate the URL list. New routes must be added to `RESERVED_SITE_SLUGS` at creation time to prevent slug collisions. The static `public/llms.txt` file takes precedence over a Next.js route handler at the same path — it must be deleted when the route handler is activated.

**Major components:**

1. `src/lib/seo/entity-ids.ts` (new) — `ORGANIZATION_ID` constant and peers; every `@id` / `publisher` / `provider` reference imports from here; must be created first in Phase 2
2. `src/lib/seo/schema-data.ts` (new) — Organization/Person entity data source of truth; imported by all schema components; prevents schema-vs-content drift
3. Schema components (new, one per type) — `FAQPageSchema`, `ArticleSchema`, `BreadcrumbSchema`, `PersonSchema`, `DefinedTermSchema`, `CourseSchema`; typed props; Server Components; no generic catch-all
4. `src/app/[locale]/blog/` tree — SSR-only; no `"use client"` at page level; `generateStaticParams` reads filesystem
5. `public-indexing.ts` extended — entity paths + blog helpers; sitemap/llms.txt/llms-full.txt all import from it

### Critical Pitfalls

1. **`<html lang>` patched client-side** — crawlers receive `lang="it"` on all EN pages. Fix: root layout reads `x-next-intl-locale` header server-side. Requires removing `git skip-worktree` from `src/app/layout.tsx` first. Must be done before any EN content investment.

2. **`@id` fragmentation across pages** — schema added without referencing `https://morfeushub.com/#organization` breaks entity graph consolidation (recovery takes 2-6 months). Fix: create `entity-ids.ts` as the very first code artifact of Phase 2, before any schema component is written.

3. **Sitemap includes `noindex` funnel URLs** — contradictory signals waste crawl budget and generate persistent GSC Excluded noise. Fix: double filter in `sitemap.ts` on `!item.indexable` at funnel level and `!step.noindex` at step level.

4. **`/funnel-internal/*` routes unprotected** — internal rewrite destination returns 200 with no `noindex`, risking duplicate content indexing. Fix: one middleware guard adding `X-Robots-Tag: noindex` unconditionally on the `/funnel-internal/` prefix.

5. **`areaServed` contradiction + split NAP email** — Organization claims GeoCircle 10km Roma; ProfessionalService claims Worldwide; two contact emails (`info@` vs `hello@`) fragment the entity cluster. Fix: unify `areaServed` to `["Italy", "Worldwide"]`, pick one canonical email, verify logo URL returns 200 before launch.

6. **Scroll-hijack mega-pages hide content** — `"use client"` + `dynamic()` lazy loading means FAQ/service content may be invisible on first crawler render pass. Interim fix: add `ssr: true` to SEO-critical `dynamic()` imports. Full fix: shadow SSR pages in Phase 4.

7. **GEO measurement traps** — GA4 without AI referral segment attributes LLM traffic to Direct; ChatGPT prompt testing reflects training data not retrieval; brand-query testing is a vanity metric. Fix: GA4 segment live before any content is published; prompt panel uses category + problem queries.

---

## Implications for Roadmap

### Phase 1: Measure First

**Rationale:** Without a baseline you cannot attribute any improvement to GEO work. Zero code dependencies. Must complete before Phase 2 begins shipping content.
**Delivers:** GA4 AI referral segment; prompt panel template (15 IT+EN queries); Bing Webmaster Tools domain verification + sitemap submit (human action Matteo performs); Google Search Console coverage baseline.
**Addresses:** FEATURES measurement table-stakes; PITFALLS 10 (GEO measurement traps).
**Research flag:** Standard — well-documented GA4 segmentation and BWT procedures. No deep research needed.

### Phase 2: Quick-Win Code Fixes + Entity Layer

**Rationale:** No external dependencies, low regression risk, corrects the most damaging existing signals before new content amplifies them. The `@id` convention must be established here — every schema added later depends on it.
**Delivers:**

- `src/app/layout.tsx` lang fix (skip-worktree removed first; merge with main version consciously)
- `src/lib/seo/entity-ids.ts` — `@id` convention (first artifact created)
- `src/lib/seo/schema-data.ts` — Organization/Person source of truth
- `StructuredData.tsx` enriched: `disambiguatingDescription`, `founder`, `sameAs`, unified `areaServed`, single email
- `src/app/sitemap.ts` — double noindex filter + real `lastModified`
- Middleware: blanket `noindex` on `/funnel-internal/*`
- `metadataPreset` for `bootcamp-ai-champion-3a-edizione`
- `public/llms.txt` rewritten as Markdown content map
- `src/lib/reserved-slugs.ts` — pre-register upcoming slugs (`blog`, `chi-siamo`, `faq`, `marf`, `ai-champion`, `salescraft`)

**Addresses:** FEATURES entity-layer table-stakes (all P1); PITFALLS 1+2+3+4+5+6.
**Research flag:** Standard — all changes are codebase-specific fixes fully identified during research.

### Phase 3: Schema Infrastructure

**Rationale:** Build the typed schema component library in isolation before new pages exist. Every Phase 4 page gets correct schema from day one rather than being retrofitted.
**Delivers:**

- `src/lib/seo/schema-types.ts` — TypeScript interfaces for all schema props
- Schema components: `FAQPageSchema`, `ArticleSchema`, `BreadcrumbSchema`, `PersonSchema`, `DefinedTermSchema`, `CourseSchema`
- FAQPage schema applied to existing home + Forge FAQ sections (no new pages needed — immediate quick win)
- BreadcrumbList applied to existing lab/forge/path pages
- `buildLocaleAlternates()` fix — explicit locale list parameter; prevents IT-only pages from emitting broken EN alternates
- `public-indexing.ts` extended with entity paths and blog helper functions

**Addresses:** FEATURES structured-data table-stakes; PITFALLS 4+7+11.
**Research flag:** Standard — schema-dts provides type-level guardrails; Next.js RSC patterns are well-established.

### Phase 4: Content Hub

**Rationale:** The critical-path item. Article schema with real dates, DefinedTerm pages, RSS, `llms-full.txt`, and topical authority all depend on indexable content existing. Highest-complexity deliverable of the milestone.
**Delivers:**

- `src/app/[locale]/blog/` routing tree — listing page + `[slug]` page, both SSR Server Components
- `src/content/blog/it/` and `src/content/blog/en/` MDX structure
- `components/content/ArticleLayout.tsx` — answer-first template (BLUF + H2-as-question + 40-75-word direct answer + FAQ section with schema)
- Article schema: `datePublished`/`dateModified` from frontmatter; `author` pointing to Person `@id`
- Internal linking: each article links to at least one service page + 2-3 related articles
- RSS feed at `/[locale]/feed.xml`
- 3-5 seed articles (IT-first; at least one with EN counterpart)
- Entity pages: `/[locale]/chi-siamo/`, `/[locale]/marf/`, `/[locale]/ai-champion/`, `/[locale]/salescraft/`
- Shadow FAQ pages: `/[locale]/faq/`, `/[locale]/forge/faq/` (own HTML; not redirects)

**Addresses:** FEATURES hub table-stakes + differentiators; PITFALLS 8+9.
**Research flag:** Needs planning attention — the answer-first editorial template and quality bar (one proprietary data point per article) need explicit checklist spec. The `evaluate()` API from `next-mdx-remote-client` differs from the archived `compileMDX()` — verify against current docs during implementation.

### Phase 5: Extended Schema + Dynamic llms.txt

**Rationale:** With hub live, `llms.txt` can be generated dynamically from `public-indexing.ts` and `llms-full.txt` can be populated from real article content. Service schema is now safely addable with `@id` established.
**Delivers:**

- `src/app/llms.txt/route.ts` — `force-static`; reads `INDEXABLE_LOCALE_PATHS` + registry + blog entries; `public/llms.txt` static file deleted
- `scripts/generate-llms-full.mjs` — Node prebuild script; reads `src/content/` MDX; writes `public/llms-full.txt`; added to `prebuild` npm script
- Service schema for Lab, Path, Forge pages
- DefinedTerm schema on entity pages (hub backlink context now exists)
- Hreflang coverage per article (explicit locale list in frontmatter)

**Addresses:** FEATURES llms.txt differentiators; schema differentiators.
**Research flag:** Standard — `force-static` route handlers and Node prebuild scripts are well-documented patterns.

### Phase 6: Off-Site Authority (Human-Gated)

**Rationale:** On-site foundation is fully hardened. Off-site signals amplify it but require Matteo to act on external platforms directly.
**Delivers (all human actions; Claude Code supports with copy/data prep):**

- Wikidata item for Morfeus Hub (assess eligibility first — media coverage threshold)
- Crunchbase company profile completed + linked in `sameAs`
- Google Business Profile created or claimed
- LinkedIn company page optimized
- `sameAs` array in Organization schema updated with all confirmed profile URLs

**Addresses:** FEATURES entity-layer differentiators.
**Research flag:** Wikidata eligibility is the key uncertainty — research whether Morfeus has sufficient third-party coverage before investing time in item creation.

### Phase Ordering Rationale

- **Measure before build:** GA4 AI referral segment cannot attribute historical traffic retroactively; prompt panel has no value without a pre-content snapshot to compare against.
- **`@id` before all schema:** Entity fragmentation recovery takes 2-6 months. Establishing the convention in Phase 2 means all later schema additions are correct from day one.
- **Sitemap/noindex fixes before Bing submit:** Submitting a contaminated sitemap creates persistent GSC/BWT noise that takes weeks to clear.
- **Hub before DefinedTerm/llms-full:** Both have a hard dependency on indexable content existing.
- **Static `llms.txt` before dynamic:** The manual rewrite in Phase 2 is a two-hour quick win; the route handler in Phase 5 is the correct long-term solution but only becomes meaningful when hub content populates it.
- **Off-site last:** External entity signals should not reference schema that still has wrong `areaServed`, split email, or missing `disambiguatingDescription`.

### Research Flags

Phases needing closer attention during task planning:

- **Phase 4 (Content Hub):** Editorial quality bar and `evaluate()` API nuances warrant a planning spike before implementation. The one-proprietary-data-point rule needs to be in the article template checklist, not just in documentation.
- **Phase 6 (Wikidata):** Eligibility research required before any time investment. Community deletion of a non-notable item is irreversible in the short term.

Phases with standard, well-established patterns (no additional research needed):

- Phase 1 (GA4 segmentation, BWT procedures)
- Phase 2 (codebase-specific fixes, all patterns identified during research)
- Phase 3 (schema-dts typed components, Next.js RSC patterns)
- Phase 5 (force-static route handlers, Node prebuild scripts)

---

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                                                                                                                 |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | All packages verified via Context7 and npm. schema-dts@2.0.0 confirmed March 2026. next-mdx-remote archival April 2026 confirmed. feed@5.2.1 actively maintained.                                     |
| Features     | HIGH       | GEO ranking factors sourced from multiple 2025-2026 studies with stated sample sizes (15K AI Overviews results; Perplexity 1M+ citation analysis). Feature priorities cross-validated across engines. |
| Architecture | HIGH       | Based on direct codebase inspection — not inferred from documentation. All file paths, skip-worktree flags, middleware behavior, and schema defects confirmed from source files read during research. |
| Pitfalls     | HIGH       | All 11 pitfalls grounded in direct codebase findings or stable specification behavior (Google sitemap/noindex guidance, schema.org content parity, App Router html constraint).                       |

**Overall confidence:** HIGH

### Gaps to Address

- **llms.txt crawler adoption:** 97% of sites with valid `llms.txt` receive zero crawl requests (May 2026 data). No major AI engine has formally declared it a ranking signal. Treat as low-cost hygiene, not a primary GEO lever. Monitor via server logs post-deploy.
- **Schema correlation vs causation:** Ahrefs 2025 study found no statistically significant citation boost from adding schema to already-cited pages. Schema disambiguates the entity and structures content for machine reading — it does not mechanically buy citations. Calibrate expectations accordingly.
- **Wikidata eligibility:** Unknown whether Morfeus Hub has sufficient third-party coverage (press mentions, official registries) to pass community notability review. Assess before Phase 6.
- **Bootcamp noindex content unlock:** Course schema and potential indexable derivates of `ai-fundamentals`, `playbook-imprenditore-milionario`, etc. require a Go/No-go business decision from Matteo. Claude Code implements either path once decided.
- **Mega-page granularization UX impact:** Full shadow-page extraction for home/forge is Phase 4. The design decision about users landing on FAQ-only shadow pages needs a separate planning conversation before implementation.

---

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection (2026-06-26): `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/middleware.ts`, `src/lib/seo/public-indexing.ts`, `src/components/shared/SEO/StructuredData.tsx`, `src/funnels/registry.ts`, `public/llms.txt`
- Context7 `/google/schema-dts` — Organization, FAQPage, Article, Person, DefinedTerm patterns; v2.0.0 schema.org v30 update
- Context7 `/ipikuka/next-mdx-remote-client` — `evaluate()` RSC pattern with frontmatter
- Context7 `/jpmonette/feed` — RSS 2.0 + Atom route handler pattern
- Context7 `/vercel/next.js` — `force-static` route handlers, `generateStaticParams` filesystem pattern
- Google developer documentation — sitemap/noindex contradictions, hreflang implementation, structured data content parity requirement

### Secondary (MEDIUM confidence)

- [Rankly — ChatGPT Search 7-stage RAG pipeline](https://www.tryrankly.com/blogs/how-chatgpt-search-works)
- [ZipTie.dev — Perplexity citation pipeline](https://ziptie.dev/blog/how-perplexity-ai-answers-work/)
- [Wellows — Google AI Overviews ranking factors 15K results](https://wellows.com/blog/google-ai-overviews-ranking-factors/)
- [OtterlyAI — Bing Webmaster Tools AI Performance Report](https://otterly.ai/blog/bing-webmaster-tools-ai-performance-report/)
- [AuthorityTech — Perplexity source selection algorithm 2026](https://authoritytech.io/blog/how-perplexity-selects-sources-algorithm-2026)
- [presenc.ai — State of llms.txt 2026, 97% zero-request finding](https://presenc.ai/research/state-of-llms-txt-2026)
- `docs/seo-geo-master-plan.md` — existing Morfeus strategy and diagnosis

### Tertiary (LOW confidence / evolving)

- [llmstxt.org specification](https://llmstxt.org/) — community-drafted; not yet formally adopted by any major AI engine as a ranking signal
- [Profound, Semrush AI Visibility tools](https://backlinko.com/llm-tracking-tools) — market-stage tools; ROI uncertain at current Morfeus traffic volume

---

_Research completed: 2026-06-26_
_Ready for roadmap: yes_
