# CLAUDE.md — Morfeus Website

Guida operativa per agenti AI (Claude Code). Leggi questo PRIMA di esplorare: ti orienta in 30 secondi.

## Cos'è

Sito marketing **Next.js 14** (App Router, TypeScript) con un **sistema funnel config-driven** (landing, freebie, sales, bootcamp). Deploy su **Vercel**: push su `main` → deploy automatico. Email/lead via **Brevo**.

## Comandi

```bash
npm run dev               # sviluppo
npm run build             # build di produzione (autorevole)
npm run typecheck         # tsc --noEmit
npm run test              # vitest
npm run lint              # next lint
npm run check:public-assets[:strict]  # policy asset in public/
```

**La CI (`.github/workflows/quality-gates.yml`) gira `npm ci → check:public-assets → lint → typecheck → test → build` su ogni push/PR.** Prima di pushare, gira la sequenza in locale.

## Mappa del repo

| Percorso                                              | Cosa                                                                       |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| `src/funnels/<nome>/config.json`                      | Definizione di un funnel (step, `componentOrder`, `content`)               |
| `src/funnels/registry.ts`                             | Registra ogni funnel (slug, locale, `indexable`, runtime/metadataPreset)   |
| `src/components/funnels/componentMap.tsx`             | Mappa nome-componente → sezione React                                      |
| `src/funnels/component-contract.ts`                   | Elenco nomi-componente validi (+ `loader.ts` valida)                       |
| `src/middleware.ts`                                   | Routing `/<slug>` → `/funnel-internal/<slug>` + X-Robots per non-indexable |
| `src/app/funnel-internal/[slug]/[[...step]]/page.tsx` | Render funnel + `generateMetadata` (preset SEO)                            |
| `src/lib/brevo/lists.ts`                              | Mapping chiave logica → env var della lista Brevo                          |
| `src/app/api/funnels/<freebie>/optin/route.ts`        | Endpoint optin → Brevo                                                     |
| `src/lib/reserved-slugs.ts`                           | Slug riservati (non usabili come funnel)                                   |

## Come aggiungere un FREEBIE (runbook)

1. Crea `src/funnels/freebie-<nome>-<anno>-<mese>/config.json` (copia da un freebie esistente): step `optin` (path `""`) con `FreebieHero` + step `thank-you` (path `"thank-you"`, `isConversion: true`, `noindex: true`) con `FreebieThankYou`.
2. Crea l'API route `src/app/api/funnels/freebie-<nome>/optin/route.ts` (copia esistente; cambia la chiave `getBrevoListId(...)` e il `DEFAULT_FORM_NAME`).
3. Aggiungi il mapping lista in `src/lib/brevo/lists.ts` (`FREEBIE_...: "BREVO_FREEBIE_..._LIST_ID"`).
4. Registra in `src/funnels/registry.ts` (`registerFunnel(...)`, `indexable: false`).
5. Metti la cover in `public/freebies/<nome>/cover.png` (ottimizzata: <500KB).
6. Imposta l'env var della lista su **Vercel** (`BREVO_FREEBIE_..._LIST_ID`), altrimenti l'optin sottoscrive senza lista.
7. Verifica: `npm run typecheck && npm run test && npm run build`.

I componenti freebie condivisi (`FreebieHero`, `FreebieThankYou`, `FreebieWebinarTeaser`, `FreebieHub`) vivono in `src/funnels/freebie-cowork-setup-skill-2026-04/sections.tsx` e `freebie-hub-2026-06/sections.tsx`.

## ⛔ Regole dure (lezioni reali)

- **Committa SEMPRE i file sorgente untracked importati** da codice tracciato. Un file presente solo sul tuo disco passa la build locale ma rompe Vercel (`Module not found`). Controlla `git status` per `??` su file `.ts/.tsx` importati. _(il pre-push hook lo verifica)_
- **Tieni `package-lock.json` in sync** con `package.json` (`npm ci` è strict; un lock disallineato = CI rossa). Dopo `npm install` di una dep, committa anche il lock.
- **Niente garanzia "14 giorni" / "soddisfatti o rimborsati"** nelle copy: **non esiste**, è pubblicità ingannevole. (Eccezioni reali e diverse: rimborso regionale Formazione Finanziata, garanzia di _trasferimento_ dei bootcamp.)
- **Gira la sequenza CI in locale prima del push.** Vercel e GitHub Actions buildano su clone pulito: ciò che funziona solo localmente non basta.
- **Niente backup (`*.bak`) né immagini >8MB in git.** Ottimizza gli asset (resize + re-encode) prima di committare.
- **Telefono utente → sempre l'attributo Brevo `TELEFONO_`** (`BREVO_ATTR.TELEFONO`). MAI `SMS`/`WHATSAPP`/`LANDLINE_NUMBER` per l'input utente: i campi nativi validano il formato (E.164) e fanno fallire l'intero optin. `TELEFONO_` è testo libero. Vedi `docs/brevo.md` (REGOLA TELEFONO).

## Altri doc

- `.cursor/rules/*.mdc` — regole dettagliate (architettura, componenti, SEO, visual identity) per Cursor
- `docs/brevo.md` — integrazione Brevo (liste, attributi, API key)
- `docs/site-tree.md` — mappa pagine; `src/funnels/README.md` — pattern funnel
- `.planning/` — stato GSD (PROJECT, ROADMAP, STATE, task)
