# Service Pages (/servizi/)

## Structure

Each service gets a dynamic route: `/[locale]/servizi/[slug]`

```
servizi/
  [slug]/
    page.tsx    ← Single template, content from i18n JSON
```

## Adding a New Service Page

1. Add content to `messages/it.json` under `Services.<slug>` namespace.
2. Add corresponding content to `messages/en.json`.
3. Add the slug to `src/lib/reserved-slugs.ts` if it could conflict with funnel slugs.
4. The `[slug]/page.tsx` template reads content via `useTranslations("Services.<slug>")`.
5. Include `generateMetadata()` with full SEO.
6. Include StructuredData with `Service` schema.

## i18n Namespace Convention

```json
{
  "Services": {
    "operating-partner": {
      "meta": { "title": "...", "description": "..." },
      "hero": { "headline": "...", "subtitle": "..." },
      "sections": { ... }
    }
  }
}
```

## Design Rules

- Copy-heavy: 30% design, 60% copy
- No framer-motion (CSS animations only)
- Prefer server components
- Single CTA per page (clear conversion target: call booked)
