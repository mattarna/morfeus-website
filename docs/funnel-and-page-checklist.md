# Funnel & Page Release Checklist

## Funnel checklist

- [ ] Slug is unique and registered in `src/funnels/registry.ts`.
- [ ] Runtime behavior is declarative (no slug hardcode in route/layout).
- [ ] Component names are in `src/funnels/component-contract.ts`.
- [ ] Funnel config loads without validation errors.
- [ ] Tracking bridge and conversion step are verified.
- [ ] Metadata behavior (index/noindex) is validated for all steps.

## Sito madre checklist

- [ ] `generateMetadata` contains title, description, canonical, alternates, OG, Twitter, robots.
- [ ] Single H1 and locale copy parity (`it` and `en`) are verified.
- [ ] Route is correctly linked with locale-aware paths.
- [ ] Images use constrained dimensions and avoid layout shift.

## Final quality checklist

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run check:public-assets`
- [ ] `npm run report:health`
