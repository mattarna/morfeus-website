# Public Asset Policy

`public/` must only contain files that are intentionally exposed to end users.

## Allowed prefixes

- `images/`
- `logo/`
- `fonts/`
- `icons/`
- `home/`
- `social-proof/`
- `claude-unlocked/`
- `fabio-eccomi/`
- `Document/`
- Root files required by the app (`favicon`, `robots`, sitemap, web manifest, social images)

## Disallowed content in `public/`

- Transition or design working directories.
- Internal handoff packages and skill bundles.
- Large archive or preview-only exports not used by production routes.

## Process

1. New folders in `public/` must be reviewed during PR.
2. Run `npm run check:public-assets` before merge.
3. If a path is intentionally public but blocked, update the allowlist in `scripts/check-public-assets.mjs` with rationale in the PR description.
