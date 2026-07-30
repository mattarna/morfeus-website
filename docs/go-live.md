# Go-live — pagine 2026

Checklist per portare online il branch `exp/pagine-2026`.
Audit eseguito il **2026-07-30**. Aggiorna man mano che spunti le voci.

---

## 1. Stato tecnico — verificato ✅

| Controllo                          | Comando                       | Esito 30/07                                                               |
| ---------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Build di produzione                | `npm run build`               | ✅ 106/106 pagine, 0 errori (era 110: −2 home-2026, −2 playground locale) |
| Tipi                               | `npm run typecheck`           | ✅                                                                        |
| Lint                               | `npm run lint`                | ✅                                                                        |
| Policy asset `public/`             | `npm run check:public-assets` | ✅                                                                        |
| Pagine IT (14)                     | —                             | ✅ tutte 200                                                              |
| Errori console (home, casi)        | —                             | ✅ nessuno                                                                |
| URL hardcoded (`localhost`, ngrok) | —                             | ✅ nessuna                                                                |
| Riferimenti a file cancellati      | —                             | ✅ nessuno                                                                |

**La build è il gate autorevole**: passa da clone pulito, non solo in locale (vedi regola in `CLAUDE.md`).

---

## 2. Allineamento dei registri — verificato ✅

Aggiungere una pagina significa toccare **sei** file. Stato:

| File                                         | Contiene le pagine 2026?                              |
| -------------------------------------------- | ----------------------------------------------------- |
| `src/lib/seo/public-indexing.ts` (→ sitemap) | ✅ sì, tutte + 8 casi + 13 insights                   |
| `public/llms.txt`                            | ✅ sì (aggiornato 2026-07-09)                         |
| `src/lib/reserved-slugs.ts`                  | ✅ sì                                                 |
| `next.config.mjs` (redirect legacy)          | ✅ codificati                                         |
| `public/robots.txt`                          | ⚠️ vedi §4.1                                          |
| `docs/site-tree.md`                          | ✅ **riallineato il 2026-07-30** (era fermo al 04/05) |

---

## 3. Decisioni da prendere prima di spedire ⚠️

### 3.1 La home — ✅ FATTO il 2026-07-30

`/it` e `/en` ora servono la scena 2026 (`Home2026`). La route di anteprima
`/home-2026` è stata rimossa e redirige (308) alla home. Il logo della testata,
che puntava all'anteprima, ora punta alla home.

La home precedente non è cancellata: vive nella cronologia git, e i suoi
componenti (`HomeHero`, `Manifesto`, `TimelineNav`…) restano nel repo perché
usati da altre pagine.

_Nota: la regola sul `skip-worktree` non si applica più — `git ls-files -v`
non riporta più file marcati. La nota in `CLAUDE.md` è storica._

### 3.2 forge vs marf

`/marf` (nuova, nel menu) e `/forge` (vecchia pagina MARF riusata come offerta Morf Forge, con `metaTitle` ancora di MARF).
Due pagine vicine che si fanno concorrenza su Google. Scegliere:

- **A** — restano distinte: riscrivere title/description di `/forge` perché parli di Morf Forge e non di MARF.
- **B** — si accorpano: `/forge` ↪️ `/marf` (redirect permanente).

### 3.3 Variabili d'ambiente su Vercel

`npm run check:env` in locale segnala **7 variabili obbligatorie mancanti**:

```
(una tra) BREVO_API_KEY_V2 | BREVO_API_KEY
BREVO_WEBINAR_LIST_ID
BREVO_FREEBIE_SKILL_LIST_ID
BREVO_FREEBIE_INSTAGRAM_CAROUSEL_LIST_ID
BREVO_FREEBIE_DESIGN_SYSTEM_LIST_ID
BREVO_FREEBIE_AI_FUNDAMENTALS_LIST_ID
BREVO_FREEBIE_PLAN_SOLVE_LIST_ID
```

Probabilmente è solo il `.env` locale incompleto (il sito in produzione raccoglie lead, quindi su Vercel ci sono). **Da confermare nel pannello Vercel prima di spedire**: se ne manca una, l'optin di quel funnel sottoscrive senza lista e il lead si perde silenziosamente.

---

## 4. Correzioni piccole consigliate

### 4.1 `robots.txt` non blocca `/mockup`

I mockup di design review (`/mockup/optin-premium`, `/mockup/optin-infobiz`) sono raggiungibili e **non** bloccati. Non sono in sitemap, ma un crawler che trova il link li indicizza. Da aggiungere:

```
Disallow: /mockup/
```

`/playground` (sotto-brand) è già coperto: il proxy gli mette `X-Robots-Tag: noindex`.

### 4.2 Pagine pubbliche non linkate

`/it/roiometro` è indicizzabile e in sitemap ma non compare nel menu. Se è voluto (atterraggio da campagne) va bene; altrimenti è una pagina orfana, che Google penalizza.

_(La pagina `/it/playground` è stata **rimossa** il 30/07: il Playground vive su `playground.morfeushub.com`.)_

### 4.3 Route legacy nel codice

`case-study/`, `operating-system/`, `servizi/` (solo README) restano come cartelle. Non sono raggiungibili (i redirect vincono), non pesano sul sito. Si rimuovono fra qualche mese, quando i redirect avranno passato tutto il valore SEO.

---

## 5. Le pagine vecchie dopo il go-live

Domanda ricorrente: _le vecchie restano online? rallentano?_

**No, e no.** Il modello corretto è:

| Caso                              | Cosa fare                                  | Perché                                                                     |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| Pagina con un erede               | **301/308 → nuova URL**                    | Passa il posizionamento acquisito. Cancellare e basta lo brucia.           |
| Pagina senza erede                | `noindex` + fuori dal menu, o **410 Gone** | Dice a Google "non esiste più", niente 404 sparsi                          |
| Versione precedente da conservare | **cronologia git**                         | Il codice resta recuperabile per sempre, ma **non è deployato: zero peso** |

**Performance:** un redirect è una risposta HTTP minima, cache-ata da browser e CDN. Non si percepisce. Togliere le pagine morte dal build lo rende semmai più **leggero**. L'unico vero errore sarebbe lasciare pagine morte ancora **linkate** dal sito: confonde i crawler e disperde autorevolezza.

Redirect già codificati (si attivano con questo deploy): `operating-system` → `forge`, `case-study/*` → `casi`, `offerta` → `forge`.

---

## 6. Sequenza di messa online

```bash
# 1. dalla cartella del branch
npm run check:public-assets && npm run lint && npm run typecheck && npm run test
npm run build          # MAI in pipe: perderesti l'exit code

# 2. verifica autorevole da clone pulito (path CORTO su Windows)
git clone --branch exp/pagine-2026 --single-branch . C:/ck
cd C:/ck && npm ci && npm run build
```

3. Commit + push del branch.
4. **Preview Vercel**: controllare le pagine nuove sul dominio di anteprima prima del merge.
5. Merge su `main` → deploy automatico.
6. **Dopo il deploy**, verificare sul dominio vero:
   - `/it/operating-system` e `/it/case-study/sales` → devono rispondere **308**, non più 200
   - `/sitemap.xml` → deve contenere le pagine nuove
   - le 14 pagine IT → 200
7. Google Search Console: inviare la sitemap aggiornata.

---

## 7. Aperto / da fare dopo

- [x] ~~Swap home 2026~~ — fatto 30/07
- [ ] Decisione forge vs marf (§3.2)
- [x] ~~Conferma env Brevo su Vercel~~ — confermate presenti su Vercel
- [ ] `Disallow: /mockup/` in robots.txt (§4.1)
- [ ] Niente è ancora committato: il lavoro vive solo nel worktree `mf-pages`
