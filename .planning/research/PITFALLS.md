# Pitfalls Research

**Domain:** SEO/GEO architecture on existing Next.js 14 App Router site with i18n (next-intl) and config-driven funnel system
**Researched:** 2026-06-26
**Confidence:** HIGH — based on direct codebase inspection + verified against known crawling and structured data specifications

---

## Critical Pitfalls

### Pitfall 1: `<html lang>` Patched Client-Side — Crawlers See the Wrong Language

**What goes wrong:**
`HtmlLang.tsx` is a client component that sets `document.documentElement.lang` via `useEffect`. The root `layout.tsx` hardcodes `<html lang="it">`. Googlebot and all LLM crawlers receive the static HTML with `lang="it"` regardless of locale. Every English page (`/en/*`) declares Italian to the crawler. This confuses hreflang validation and prevents EN pages from being served as English results.

**Why it happens:**
The root layout (`src/app/layout.tsx`) owns the `<html>` tag and is locale-agnostic. The locale-aware layout (`src/app/[locale]/layout.tsx`) cannot override `lang` server-side from a nested layout — it can only inject a client component that fires after hydration. This is a well-known App Router constraint: only one `<html>` element is rendered, in the root layout.

**How to avoid:**
Move the `lang` attribute server-side. The correct pattern for Next.js 14 App Router with next-intl is to set `lang` in the root layout's `<html>` tag dynamically — but since the root layout is locale-agnostic, the canonical fix is to restructure the layout tree so the locale segment's layout is the one rendering `<html>`. Alternatively, use a `params`-based approach: since App Router passes `params` to root layouts via the locale group, set `lang={params.locale ?? 'it'}` in `src/app/layout.tsx` if the locale can be threaded through. The simplest verified fix for this project: move the `<html lang>` into `src/app/[locale]/layout.tsx` using a Server Component wrapper — but this requires `src/app/layout.tsx` to render a bare `<html>` without `lang`, and `[locale]/layout.tsx` to set it. The concrete approach: use `<html lang={locale}>` in the root layout by reading locale from the URL path via `headers()` or by restructuring the component tree.

**Warning signs:**

- Run `curl -s https://morfeushub.com/en | grep '<html'` — if it returns `lang="it"`, the bug is live.
- Google Search Console shows EN pages with no language signal, or hreflang errors for EN.
- Rich Results Test on `/en` shows `inLanguage: "en-US"` in JSON-LD (correct) but the HTML document declares `it` (contradiction).

**Phase to address:**
Phase 1 (Fase 3 quick wins / fix tecnici puntuali) — this is a quick-win with outsized impact on EN crawling. Fix before any EN content investment.

---

### Pitfall 2: Sitemap Includes `noindex` Funnel URLs — Contradictory Signals

**What goes wrong:**
`src/app/sitemap.ts` iterates all entries in `funnelRegistry` and emits a sitemap entry for every step of every funnel, regardless of the `indexable` flag. Funnels like `ai-fundamentals`, `playbook-imprenditore-milionario`, `claude-skill-anatomy`, `instagram-carousel-skills`, `design-system-skill`, `asseprim-18-maggio-2026`, and `plan-and-solve-strumento` are `indexable: false` and have `X-Robots-Tag: noindex` set by middleware — but their URLs appear in the sitemap. Google's documented guidance is explicit: a URL in the sitemap that also returns `noindex` sends contradictory signals and causes indexing budget waste. Google will eventually respect the `noindex` but the contradiction creates crawl waste and GSC "Excluded" entries that are hard to diagnose.

**Why it happens:**
The `funnelSitemapEntries` block in `sitemap.ts` does not gate on `item.indexable`. The `indexable` flag exists in the registry but is only checked in middleware (for `X-Robots-Tag`) and not in the sitemap generator.

**How to avoid:**
Add a guard in `funnelSitemapEntries`: `if (!item.indexable) return [];`. Additionally, for funnels that are `indexable: true` but have individual steps with `noindex: true` (e.g., thank-you/conversion steps), those steps should also be filtered — check `step.noindex` before emitting. The `getRegisteredFunnelConfig` call is already there; use it to filter step-level noindex too.

**Warning signs:**

- Google Search Console "Coverage" tab shows many "Excluded — noindex" URLs that are also present in the submitted sitemap.
- Sitemap has URLs containing `/thank-you` or conversion step paths (these always have `isConversion: true` / `noindex: true`).

**Phase to address:**
Phase 1 (Fase 3.3 igiene sitemap) — fix at the start of the SEO architecture work, before submitting sitemap to GSC/Bing.

---

### Pitfall 3: JSON-LD Entity Incoherence — `areaServed` Contradiction Between Organization and Service Schemas

**What goes wrong:**
`StructuredData.tsx` emits three schemas in the same component: `Organization` with `areaServed: GeoCircle(10km, Roma)`, `ProfessionalService` with `areaServed: "Worldwide"`, and `WebSite`. The same entity (Morfeus) simultaneously claims to serve only a 10km circle around Rome and the entire world. LLMs and Google's entity resolver see contradictory geographic scope on the same page. The `GeoCircle` radius of 10,000m is also technically wrong — it implies a local retail service, not a consulting firm operating nationally and internationally.

Additionally, there are two email addresses on the same entity: `email: "info@morfeushub.com"` in Organization and `contactPoint.email: "hello@morfeushub.com"`. NAP (Name/Address/Phone/Email) consistency across schema and page text is a known entity signal. Two emails = two possible NAP clusters = weaker entity graph.

**Why it happens:**
The `areaServed` on `Organization` was likely set to be conservative ("we're based in Rome"), while the `Service` schema was set to "Worldwide" to attract international queries. They were written independently without checking for logical contradictions.

**How to avoid:**
Set `Organization.areaServed` to `["Italy", "Europe"]` or `"Worldwide"` (whichever reflects reality) — matching what the `ProfessionalService` says. For a B2B consulting firm that operates remotely, `"Worldwide"` or at minimum `"Italy"` (not a GeoCircle) is appropriate. Pick one canonical contact email (recommend `hello@morfeushub.com` as the human-facing one) and use it consistently across all schemas and page copy. Add `disambiguatingDescription` to avoid collision with NVIDIA Morpheus, morpheusbusiness.ai, etc.

**Warning signs:**

- Google Rich Results Test on homepage shows no errors but structured data validator (schema.org) flags the GeoCircle on an Organization as unusual.
- No Knowledge Panel appearing after months of consistent signals.
- LLMs describe Morfeus as "a local Rome-based firm" rather than as a national/international consultancy.

**Phase to address:**
Phase 1 (Fase 1.1 JSON-LD Organization) — this is the first fix in the master plan and should be done before any external entity signals (Wikidata, Crunchbase) reference the wrong data.

---

### Pitfall 4: `@id` and Entity Identity Mismatch Across Pages

**What goes wrong:**
Currently `StructuredData.tsx` is the only source of JSON-LD and it emits `@id: "https://morfeushub.com/#organization"` once, on locale pages. When new schemas are added on sub-pages (forge, lab, case studies, the new hub/articles), a common mistake is to omit the `@id` on the `provider`/`publisher` references, or to use a different string (e.g., `"#organization"` vs `"/#organization"`, or adding `Organization` blocks without referencing the root `@id`). This fragments the entity graph — Google and LLMs see multiple partial Organization nodes that don't merge.

A specific risk in this codebase: funnel pages (`/funnel-internal/[slug]`) render JSON-LD via `generateMetadata` presets (e.g., `vocabolario-page`, `freebie-hub`) but the presets add schemas like `Article`/`WebSite` without `publisher: { "@id": ".../#organization" }` linking back to the root entity.

**Why it happens:**
Schema gets added piecemeal as features are developed. Each developer or agent session adds the schema needed for the current page without checking the global `@id` convention.

**How to avoid:**
Establish a central `ENTITY_IDS` constant (`src/lib/seo/entity-ids.ts`) with `ORGANIZATION_ID = "https://morfeushub.com/#organization"`, `WEBSITE_ID = "https://morfeushub.com/#website"` etc. Every schema across the codebase imports and references these constants. Create a shared `buildOrganizationRef()` helper that returns `{ "@id": ORGANIZATION_ID }` for use in `publisher`, `provider`, `author` fields. Add a test that checks all JSON-LD emitted on key pages for the presence of the root `@id` reference.

**Warning signs:**

- Schema validator shows multiple `Organization` nodes on the same site without cross-references.
- Google's structured data report shows schemas as "valid" but no entity consolidation occurs (no Knowledge Panel, no sitelinks).
- Running `grep -r '"@type": "Organization"' src/` returns more than one definition site, each with a different `@id`.

**Phase to address:**
Phase 1 (Fase 1.1 JSON-LD) — establish the convention before adding any new schemas, so all Phase 3 schema additions (FAQPage, Course, Article, etc.) follow it from day one.

---

### Pitfall 5: Funnel `canonical` URLs Point to `/funnel-internal/` or Lack Locale — Duplicate Content Risk

**What goes wrong:**
Indexable funnels (`vocabolario-ai`, `risorse-gratuite`, `plan-and-solve`, `claude-unlocked`, `bootcamp-ai-champion-3a-edizione`, `formazione-finanziata-2026`, `webinar-claude`) are all locale `"it"` only. Their canonical URLs in `generateMetadata` presets are set to the public slug (e.g., `/vocabolario-ai`) — correct. But the actual Next.js route is `/funnel-internal/vocabolario-ai`, and the public URL `/vocabolario-ai` is a middleware rewrite. If any part of the system (CDN, Vercel edge, Google cached redirect) surfaces the `/funnel-internal/` URL, it creates a duplicate without canonical.

Additionally, the sitemap emits `https://morfeushub.com/vocabolario-ai` for the funnel (public slug) — but the `alternates.languages` block is absent from funnel sitemap entries (unlike locale entries which have `alternates`). Without `alternates`, hreflang coverage is zero for funnels, even though some funnels may eventually get EN versions.

The `bootcamp-ai-champion-3a-edizione` funnel metadata preset is missing entirely from `generateMetadata` — the function returns `{}` for it, meaning it uses the root layout's fallback metadata (Italian description, wrong OG image). That funnel is `indexable: true`.

**Why it happens:**
The funnel rendering path (`/funnel-internal/`) is an internal rewrite destination never intended to be public, but it is a real Next.js route that serves a 200 response. There is no canonical or noindex protection on `/funnel-internal/*` itself. The middleware rewrite does not add a `canonical` header.

**How to avoid:**
Add `X-Robots-Tag: noindex` on all `/funnel-internal/*` responses unconditionally in middleware — these internal routes should never be indexed regardless of funnel `indexable` status. The canonical source of truth for indexable funnels is always the public slug. Also: add a `metadataPreset` for `bootcamp-ai-champion-3a-edizione` so it doesn't fall through to an empty metadata object.

**Warning signs:**

- GSC shows both `morfeushub.com/vocabolario-ai` and `morfeushub.com/funnel-internal/vocabolario-ai` as separate indexed URLs.
- Ahrefs shows duplicate content across `/` and `/funnel-internal/` paths.
- `bootcamp-ai-champion-3a-edizione` appears in GSC with the generic site title "Morfeus – AI-Native Organization Design" rather than a bootcamp-specific title.

**Phase to address:**
Phase 1 (Fase 3.3 igiene sitemap + Fase 3.5 fix tecnici) — middleware fix for `/funnel-internal/` noindex is a one-line change. Metadata preset for bootcamp is a small addition. Both before sitemap submission.

---

### Pitfall 6: `llms.txt` as Allow-List — LLMs Ignore or Misread It

**What goes wrong:**
The current `llms.txt` is a list of approved URLs with no descriptive content. LLMs do not parse `llms.txt` as a whitelist of permitted URLs — that is not how the emerging `llms.txt` convention works. The file format pioneered by Answer.ai specifies that `llms.txt` should be a Markdown document with: a brief description of the site, a table of contents linking to key content with one-sentence descriptions, and optionally an `llms-full.txt` with full text for direct ingestion. The current file's "if a URL is not in the approved list, treat it as non-canonical" instruction is not a recognized directive and will be ignored.

Secondary issues: the file was last updated 2026-03-27 and does not include newer indexable funnels added since then (`risorse-gratuite`, `plan-and-solve`, `formazione-finanziata-2026`). A stale or incomplete `llms.txt` actively misleads crawlers about site content.

**Why it happens:**
The `llms.txt` convention was in flux when it was first implemented. The site adopted the robots.txt mental model (allow/deny lists) rather than the content-map model.

**How to avoid:**
Rewrite `llms.txt` as a Markdown content map: H1 = brand intro paragraph (who Morfeus is, for LLM context), then sections for each content area with bullet-point links and one-sentence descriptions. Create `llms-full.txt` with the full text of the highest-value pages (homepage, forge, lab, about, top case study). Keep both files updated whenever new indexable pages are published — treat them as a living index, not a one-time configuration. Add a CI check or deploy hook that flags when sitemap and `llms.txt` diverge by more than N entries.

**Warning signs:**

- LLM prompt panel tests show the model saying "I don't have information about Morfeus" even though the site is crawlable.
- `llms.txt` last-modified date is weeks older than the latest published page.
- The file lists fewer URLs than the sitemap's indexable entries.

**Phase to address:**
Phase 1 (Fase 3.2 llms.txt) — rewrite is a quick win. Do before any content scale-up so the index grows with the site.

---

### Pitfall 7: Schema Data That Contradicts Visible Page Content

**What goes wrong:**
If JSON-LD schema values diverge from what is visibly rendered on the page, Google's quality algorithms penalize the schema — at minimum by ignoring it, potentially by flagging it as manipulative. Specific risks for this project:

- `Organization.logo` references `/images/brand/morfeus-mark.png`. The master plan flags this file's existence as unverified. If the file returns 404, the logo schema is broken.
- `Organization.name: "Morfeus"` vs `alternateName: "Morfeus Hub"` — the siteName in OG tags uses `"Morfeus Hub"` while the Organization schema uses `"Morfeus"`. Fine as-is, but any future page copy that says "Morph" (the known typo) would contradict the schema.
- When `FAQPage` schema is added to the homepage FAQ section, the schema questions/answers must exactly match the rendered text. If the FAQ text is updated in the i18n translation files but the schema is hardcoded, they diverge.
- `Course` schema for the bootcamp / formazione finanziata must match visible price, duration, and availability. If the offer changes (e.g., next edition dates, pricing tiers), stale schema becomes a policy violation.

**Why it happens:**
Schema is typically written once at implementation time and not treated as living data. Content that changes frequently (FAQ text, course details, pricing) is edited in translation files or config JSONs, not in the schema layer.

**How to avoid:**
Source schema values from the same data source as the rendered content wherever possible. For FAQ schema: derive the `FAQPage` JSON-LD from the same array that renders the FAQ component — never duplicate the text. For Course details: read from the funnel's `config.json` content or a dedicated data file, not hardcoded in a schema builder. Verify the logo file exists before launch with an automated check (`curl -I https://morfeushub.com/images/brand/morfeus-mark.png`).

**Warning signs:**

- Google Search Console "Enhancements" tab shows schema errors on specific page types after content edits.
- Rich Results Test passes but Google does not show rich results for FAQ or Course — often a data mismatch signal.
- Logo image in Google's structured data viewer shows a broken image.

**Phase to address:**
Phase 1 (Fase 1.1 JSON-LD + Fase 3.1 schema markup) — establish the data-derivation pattern at schema implementation time so all new schemas follow it. Verify logo file existence as a pre-launch check.

---

### Pitfall 8: Mega-Page Scroll-Hijack Architecture Hides Content From Crawlers

**What goes wrong:**
`src/app/[locale]/page.tsx` is a `"use client"` component that uses `dynamic()` for most sections (below-the-fold content is lazy-loaded) and relies on a custom scroll system (`ScrollWrapper`, `useScrollStore`) where each section is only visible when the user scrolls to its index. While Google's crawler does execute JavaScript, it runs with a limited rendering budget and may not scroll through a hijacked scroll system to reach content at logical scroll positions 5-14. Content in sections like `HomeFAQ`, `CTA`, and case studies may not be extracted.

More critically: any section that renders conditionally based on a "mounted" client-state (`useState(false)` initialized to `false`, set to `true` in `useEffect`) is invisible to the crawler during its first render pass if the component renders nothing until `mounted === true`. This is the "gating on `mounted`" pattern.

**Why it happens:**
The scroll-hijack architecture was built for UX/animation purposes without considering crawler behavior. `dynamic()` imports without SSR are rendered as empty divs on the server.

**How to avoid:**
For the homepage, the SEO-critical content (FAQ, service descriptions, case study summaries, the method) must be present in the initial SSR HTML. The master plan recommends extracting these into separate URLs (dedicated FAQ page, method page, ROI page) — this is the correct architectural fix. For any `dynamic()` import of SEO-content, add `{ ssr: true }` (default in Next.js 14). Never gate SEO-content sections on a `mounted` state. Audit by fetching the raw HTML (`curl https://morfeushub.com/it`) and checking whether FAQ questions, service descriptions, and case study content appear in the response body.

**Warning signs:**

- `curl https://morfeushub.com/it | grep "FAQ\|domande\|frequently"` returns no matches despite the FAQ section existing visually.
- Google's "Cached" version of the homepage shows only the hero section.
- Search Console shows impressions only for hero-level keywords, never for FAQ-level long-tail queries.

**Phase to address:**
Phase 2 (Fase 3.4 mega-pagine → URL granulari) — extract critical content to standalone SSR pages. This is a larger architectural change; interim fix is to add `ssr: true` to `dynamic()` calls for FAQ and services sections.

---

### Pitfall 9: Over-Optimization and GEO Anti-Signals

**What goes wrong:**
When building GEO-oriented content (answer-first articles, defined-term pages, FAQ schemas), two failure modes damage rather than help:

1. **AI-generated thin content at scale.** Publishing large volumes of Claude-drafted content without substantive human editing results in homogeneous, low-specificity text that LLMs recognize as AI-generated. Perplexity and ChatGPT retrieval systems penalize sources where every article reads identically (same sentence structures, same hedging phrases, same transitions). The master plan's "2-3 pezzi/settimana" is sustainable only if each piece includes real Morfeus-specific data (case study numbers, founder opinion, specific client context).

2. **Keyword stuffing in schema and meta.** Adding `keywords` arrays with 20+ terms, repeating the target phrase in title + description + H1 + first sentence + schema, or creating near-duplicate pages for slight keyword variants (e.g., "AI per PMI" and "AI per le piccole medie imprese" as separate thin pages) are classic over-optimization signals that trigger manual review.

**Why it happens:**
The temptation to generate volume quickly with LLM assistance, combined with schema-first thinking ("more schema = more signals"), leads to bulk content and schema inflation.

**How to avoid:**
Each piece must contain at least one proprietary data point: a real client result, a specific framework name (MARF, Salescraft), a founder quote, or a concrete process detail. Use schema only where the page genuinely demonstrates that content type — no `FAQPage` schema on pages without real FAQs, no `Course` schema without a real course offering. For defined-term pages (MARF, AI Champion Program), the page must be the authoritative definitive source, not a thin glossary entry. Minimum word count for pillar content: 800 words of substantive analysis, not filler.

**Warning signs:**

- All articles on the hub have the same paragraph count, similar opening sentences, and no specific numbers.
- Google Search Console shows high impression share but zero click-through (title/meta relevance without content quality).
- LLM prompt tests show Morfeus cited but immediately followed by a competitor with more specific information.

**Phase to address:**
Phase 2 (Fase 2 motore contenuti) — establish the editorial quality bar before publishing any AI-assisted content. The template must enforce the "one proprietary data point" rule.

---

### Pitfall 10: GEO Measurement Traps — False Positives and Untracked Referrals

**What goes wrong:**
Three measurement failures common in early-stage GEO programs:

1. **LLM referral traffic not segmented.** Without an explicit GA4 segment for AI referrals (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai, you.com), LLM-originated traffic appears as "Direct" or generic "Referral" — making GEO impact invisible and leading to premature conclusions that the program isn't working.

2. **Prompt panel false positives.** Testing "Chi è Morfeus?" on ChatGPT immediately after publishing new content is not a valid signal — LLM training cutoffs mean the model cannot have ingested new content. A response containing Morfeus information may be from old training data, not from the new content. Only Perplexity and similar retrieval-augmented systems show real-time indexing impact. Confusing these leads to incorrect attribution.

3. **Prompt phrasing bias.** Testing with "Morfeus Hub" (brand name query) measures brand recall, not category presence. The north-star metric is appearing on queries like "migliori consulenze AI Italia" or "come adottare AI in azienda" — queries where Morfeus is not named. Measuring only brand queries is a vanity metric that doesn't track the actual GEO goal.

**Why it happens:**
GEO measurement is genuinely new and lacks standardized tooling. Teams default to the metrics they know (brand search, direct traffic) and use familiar brand queries for prompt testing.

**How to avoid:**
Set up the GA4 AI referral segment before any other SEO work (as the master plan specifies in Fase 0). Use a prompt panel template with 15 queries: 5 brand queries, 5 category queries ("migliori consulenti AI PMI italiane"), 5 problem queries ("come calcolare ROI dell'AI"). Test on both ChatGPT (training signal, slow to update) and Perplexity (retrieval signal, near-real-time). Track results in a structured spreadsheet with columns: query, model, date, Morfeus mentioned (Y/N), position, source cited. Only attribute change to content when the same query shows improvement across multiple sessions and models.

**Warning signs:**

- The "GEO is working" conclusion is based solely on ChatGPT mentioning Morfeus on a brand query.
- GA4 has no AI referral dimension and LLM traffic is attributed to Direct.
- Prompt panel test queries are all phrased as "What is Morfeus?" rather than category or problem queries.

**Phase to address:**
Phase 0 (Fase 0 fondamenta di misura) — measurement infrastructure must come first. No GEO initiative produces useful data without it.

---

### Pitfall 11: hreflang `x-default` Assigned to English — Correct but Fragile

**What goes wrong:**
`buildLocaleAlternates()` in `public-indexing.ts` sets `x-default` to the English version (`buildLocalizedPath("en", path)`). This is technically correct per Google's guidance (x-default = language-agnostic fallback, often EN for international sites). However, two risks exist:

1. The funnel sitemap entries have no `alternates` at all. When the new editorial hub is added (`/risorse`, `/blog`), if those pages are IT-only and the sitemap emits them without `x-default`, Google may attempt to match them to all locales and surface them for EN queries with no EN equivalent — causing Italian content to appear on English SERP.

2. If an Italian-only page (no EN counterpart) is mistakenly included in the sitemap under the locale alternates pattern (which assumes a symmetric IT/EN structure), it will emit an incorrect `en` alternate pointing to a 404 or the wrong page.

**Why it happens:**
The `buildLocaleAlternates()` function assumes symmetric IT/EN coverage for all pages. Any page that exists in only one locale breaks this assumption silently.

**How to avoid:**
Add a `locales` parameter to `buildLocaleAlternates()` that explicitly lists which locales have this page. For IT-only pages, emit only `it` and `x-default: it` (not `x-default: en`). For the new hub, track locale coverage per article explicitly. Never auto-generate alternates for pages that don't have verified counterparts in all declared locales.

**Warning signs:**

- GSC hreflang report shows errors for EN pages that return 200 but have no EN content.
- Ahrefs hreflang checker flags asymmetric pairs.
- IT-only articles appear in English SERP results.

**Phase to address:**
Phase 1 (Fase 3.5 fix tecnici — lang/hreflang) and Phase 2 (Fase 2.1 hub editoriale) — fix the utility function before the hub launch, since the hub will be IT-first and many articles will initially have no EN counterpart.

---

## Technical Debt Patterns

| Shortcut                                                                        | Immediate Benefit               | Long-term Cost                                                                                 | When Acceptable                                                             |
| ------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Hardcode schema values (email, address) in TSX rather than deriving from config | Fast to ship                    | Schema diverges from page content after copy updates; manual sync required                     | Never — use a central config or derive from same source as rendered content |
| `lastModified: new Date()` (current date) for all sitemap entries               | No need to track per-page dates | Google ignores `lastModified` when it never changes meaningfully; wastes crawl recency signals | MVP only; replace with real page-level timestamps before major content push |
| Emit all funnel URLs in sitemap without filtering `indexable: false`            | Sitemap covers all URLs         | Contradictory signals; GSC "Excluded" noise; crawl budget waste                                | Never — always filter                                                       |
| Add JSON-LD schemas without `@id` cross-references                              | Passes validator                | Fragmented entity graph; no Knowledge Panel consolidation                                      | Never on Production schemas                                                 |
| Skip `llms-full.txt` and rely only on `llms.txt` links                          | Simpler file management         | LLMs that don't crawl links get no content; retrieval gap                                      | Acceptable in Phase 1 if content volume is still low; mandatory by Phase 2  |
| Client-only rendering for SEO-critical content sections                         | Enables complex animations      | Content invisible to crawler on first pass                                                     | Never for content that should rank                                          |

---

## Integration Gotchas

| Integration                  | Common Mistake                                                                                                  | Correct Approach                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Google Search Console        | Submit sitemap before fixing noindex/canonical errors — GSC shows false "indexed" states that persist for weeks | Fix sitemap (filter noindex, real canonicals) before submitting; verify with URL Inspection tool on sample URLs first                |
| Bing Webmaster Tools         | Assume GSC submission covers Bing — ChatGPT Search and Copilot use Bing's index, not Google's                   | Separate sitemap submission to Bing; verify crawl in Bing WT console                                                                 |
| Google Rich Results Test     | Test only the homepage — misses schema errors on sub-pages (forge, lab, funnels)                                | Test each schema type on a representative page of that type                                                                          |
| GA4 AI referral segment      | Create segment after GEO content is live — misses baseline; can't prove attribution                             | Create segment before any content is published (Fase 0)                                                                              |
| Wikidata entity              | Create item with only basic properties — entity stays "stub" and LLMs don't use it                              | Minimum viable Wikidata: `instance of: company`, `country: Italy`, `official website`, `founded`, `founder` with own QID, `industry` |
| Schema.org Course            | Use `Course` type for a webinar or freebie — Google flags it as incorrect type                                  | Use `Course` only for structured multi-session learning; use `Event` for webinars; use `DigitalDocument` or `Article` for freebies   |
| next-intl `generateMetadata` | Forget to await `getTranslations` inside `generateMetadata` — returns undefined strings                         | Always `await getTranslations(...)` inside the async `generateMetadata` function; typecheck catches this                             |

---

## Performance Traps

| Trap                                                                                        | Symptoms                                                                           | Prevention                                                                                                      | When It Breaks                           |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| All editorial hub articles as RSC with no ISR                                               | Hub rebuild time grows with article count; cold-start latency for each new article | Use `revalidate` (ISR) for article pages; static generation for top articles                                    | Noticeable at 50+ articles               |
| `llms-full.txt` grows unbounded as content scales                                           | File becomes multi-MB; LLM crawlers time out or truncate                           | Cap at ~100KB or structure as multiple `llms-full-<section>.txt` files with index                               | At ~80 full-text articles                |
| Sitemap grows to include all blog/hub articles as individual entries with no priority tiers | Google crawls low-value articles before high-value pages                           | Split sitemap into `sitemap-core.xml` (pages, services) and `sitemap-content.xml` (articles) with sitemap index | At ~500 URLs                             |
| JSON-LD embedded in every RSC article page as `dangerouslySetInnerHTML`                     | Each article has slightly different schema structure; drift accumulates            | Single `ArticleSchema` component with typed props; built from article metadata                                  | From day one — enforce at authoring time |

---

## "Looks Done But Isn't" Checklist

- [ ] **`<html lang>`:** Check with `curl https://morfeushub.com/en | grep '<html'` — must return `lang="en"`, not `lang="it"`.
- [ ] **Sitemap clean:** Verify `https://morfeushub.com/sitemap.xml` contains zero URLs that return `X-Robots-Tag: noindex` — cross-check each funnel URL against middleware behavior.
- [ ] **Logo file exists:** `curl -I https://morfeushub.com/images/brand/morfeus-mark.png` — must return 200, not 404.
- [ ] **`@id` consistency:** All JSON-LD `publisher`/`provider`/`author` references use `"https://morfeushub.com/#organization"` exactly — not `"/#organization"` or `"https://morfeushub.com#organization"`.
- [ ] **`/funnel-internal/*` blocked:** `curl -I https://morfeushub.com/funnel-internal/vocabolario-ai` — must include `X-Robots-Tag: noindex`.
- [ ] **Bootcamp metadata preset:** `bootcamp-ai-champion-3a-edizione` has a named metadataPreset and it produces a page-specific title (not the global fallback).
- [ ] **`llms.txt` current:** Last-updated date in file matches or is newer than the most recently published indexable page.
- [ ] **Hreflang symmetry:** Every URL emitting `alternates.languages.en` has a real EN counterpart returning 200 with EN content.
- [ ] **FAQ schema derived from content:** The `FAQPage` JSON-LD questions/answers are generated from the same data array that renders the FAQ component — no hardcoded duplicates.
- [ ] **`areaServed` unified:** `Organization` and `ProfessionalService` schemas agree on geographic scope; no GeoCircle on Organization.

---

## Recovery Strategies

| Pitfall                                              | Recovery Cost | Recovery Steps                                                                                                                                                                         |
| ---------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `html lang` wrong for EN pages                       | LOW           | One-line fix in root layout or [locale] layout; redeploy; resubmit EN pages for reindexing in GSC                                                                                      |
| Sitemap included noindex URLs                        | LOW           | Filter in sitemap.ts; redeploy; resubmit sitemap; GSC takes 1-4 weeks to clear "Excluded" entries                                                                                      |
| JSON-LD entity fragmented across pages               | MEDIUM        | Audit all schema instances; add `@id` references; redeploy; may take 2-6 months for entity consolidation to reflect in LLM responses                                                   |
| `llms.txt` stale/wrong format                        | LOW           | Rewrite file; redeploy; LLM crawlers pick up on next crawl cycle (days to weeks)                                                                                                       |
| Funnel canonical confusion (funnel-internal indexed) | MEDIUM        | Add noindex on `/funnel-internal/*`; submit canonical URLs for recrawl via GSC; deindex `/funnel-internal/*` via URL removal tool if already indexed                                   |
| AI-generated thin content indexed at scale           | HIGH          | Content cannot be "un-published" without risking crawl confusion; requires adding substantive edits to each article before reindexing; ongoing editorial review process                |
| Measurement gap (no GA4 AI segment from day 1)       | MEDIUM        | Can create segment retroactively in GA4 but historical data for AI referrals will be classified as Direct with no recovery; baseline must be re-established from segment creation date |

---

## Pitfall-to-Phase Mapping

| Pitfall                                                     | Prevention Phase                                        | Verification                                                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `html lang` client-only (Pitfall 1)                         | Phase 1 / Fase 3.5 quick wins                           | `curl /en` returns `<html lang="en">`                                                                                      |
| Sitemap includes noindex funnels (Pitfall 2)                | Phase 1 / Fase 3.3 igiene sitemap                       | Sitemap XML cross-checked against middleware noindex rules; unit test in `public-indexing.test.ts`                         |
| JSON-LD areaServed contradiction (Pitfall 3)                | Phase 1 / Fase 1.1 JSON-LD Organization                 | Schema validator shows one consistent areaServed; no NAP email split                                                       |
| `@id` entity fragmentation (Pitfall 4)                      | Phase 1 / Fase 1.1 JSON-LD + all of Phase 3 schema      | `ENTITY_IDS` constant in codebase; grep confirms no orphan schema blocks                                                   |
| Funnel canonical / funnel-internal indexed (Pitfall 5)      | Phase 1 / Fase 3.5 fix tecnici                          | `/funnel-internal/*` returns noindex header; GSC shows no indexable funnel-internal URLs                                   |
| `llms.txt` allow-list anti-pattern (Pitfall 6)              | Phase 1 / Fase 3.2 llms.txt                             | File is Markdown content map with descriptions; `llms-full.txt` created                                                    |
| Schema contradicts visible content (Pitfall 7)              | Phase 1 / Fase 1.1 + Fase 3.1                           | Schema values derived from same data as rendered content; logo 200 check passes                                            |
| Scroll-hijack hides content from crawlers (Pitfall 8)       | Phase 2 / Fase 3.4 mega-pagine                          | `curl /it` HTML body contains FAQ questions and service descriptions in text                                               |
| Over-optimization / AI thin content (Pitfall 9)             | Phase 2 / Fase 2 motore contenuti                       | Editorial checklist enforced per article: one proprietary data point, no duplicate near-pages                              |
| GEO measurement traps (Pitfall 10)                          | Phase 0 / Fase 0 fondamenta di misura                   | GA4 AI referral segment live before content push; prompt panel template has 15 queries across brand/category/problem types |
| hreflang x-default fragility for IT-only pages (Pitfall 11) | Phase 1 / Fase 3.5 fix tecnici + Phase 2 / Fase 2.1 hub | `buildLocaleAlternates` accepts explicit locale list; no auto-generated EN alternate for IT-only articles                  |

---

## Sources

- Direct codebase inspection: `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/components/shared/HtmlLang.tsx`, `src/components/shared/SEO/StructuredData.tsx`, `src/app/sitemap.ts`, `src/funnels/registry.ts`, `src/middleware.ts`, `src/lib/seo/public-indexing.ts`, `public/llms.txt`, `public/robots.txt`
- Project strategy: `docs/seo-geo-master-plan.md`, `.planning/PROJECT.md`
- Google developer documentation: structured data content guidelines, hreflang implementation guide, sitemap protocol (known as of training cutoff August 2025; HIGH confidence on fundamentals)
- Schema.org specification: `Organization`, `ProfessionalService`, `GeoCircle`, `FAQPage`, `Course` types
- next-intl documentation: locale-aware layout patterns and App Router constraints (HIGH confidence — verified against codebase behavior)
- `llms.txt` specification: Answer.ai proposal for LLM-oriented site documentation (MEDIUM confidence — spec is community-drafted and evolving)
- Google Webmaster guidance on sitemap/noindex contradictions (HIGH confidence — documented and stable)

---

_Pitfalls research for: SEO/GEO architecture on Next.js 14 i18n marketing site (Morfeus)_
_Researched: 2026-06-26_
