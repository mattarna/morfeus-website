# Case Study Pages (/case-study/)

## Structure

Each case study gets a dynamic route: `/[locale]/case-study/[slug]`

```
case-study/
  [slug]/
    page.tsx    ← Single template, content from i18n JSON
```

## Adding a New Case Study

1. Add content to `messages/it.json` under `CaseStudy.<slug>` namespace.
2. Add corresponding content to `messages/en.json`.
3. Add the slug to `src/lib/reserved-slugs.ts` if it could conflict with funnel slugs.
4. The `[slug]/page.tsx` template reads content via `useTranslations("CaseStudy.<slug>")`.
5. Include `generateMetadata()` with full SEO.
6. Include StructuredData with `Article` schema.

## i18n Namespace Convention

```json
{
  "CaseStudy": {
    "progetto-alfa": {
      "meta": { "title": "...", "description": "..." },
      "hero": { "client": "...", "industry": "...", "headline": "..." },
      "challenge": { ... },
      "solution": { ... },
      "results": { "metrics": [...], "testimonial": "..." },
      "cta": { ... }
    }
  }
}
```

## Design Rules

- Proof-heavy: structured evidence, measurable results
- Single schema template for all case studies
- All case studies are indexed (no noindex)
- CTA converts to call booked
- Links to relevant service page
