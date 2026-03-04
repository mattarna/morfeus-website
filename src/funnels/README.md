# Funnel Infrastructure

Questa cartella contiene solo infrastruttura e convenzioni, non funnel attivi.

## Come aggiungere un funnel

1. Crea una cartella `src/funnels/<slug>/`.
2. Parti da `src/funnels/_templates/config.template.json`.
3. Inserisci il funnel in `src/funnels/registry.ts`:
   - entry in `funnelRegistry`
   - import config e registrazione in `funnelConfigMap`
4. Se vuoi A/B test, abilita `abTest.enabled` e dichiara le varianti.
5. Usa componenti in `src/components/funnels` e aggiorna i nomi consentiti in `src/funnels/types.ts` se necessario.

## Workflow operativo standard (utente + assistant)

Quando l'utente chiede di creare un funnel, si parte sempre da un intake non bloccante:

1. Preparare cartella funnel: `src/funnels/<slug>/`.
2. Aggiungere `context/` con strategia (ICP, positioning, prodotto, offerta).
3. Aggiungere `copy/` con copy disponibili per gli step.
4. Compilare `brief` con flow step, CTA map, tracking e A/B scope.
5. L'assistant marca stato intake: `complete`, `partial`, `missing`.
6. Se incompleto, si procede con TODO espliciti e assunzioni dichiarate.

## Handoff minimo richiesto

- Obiettivo funnel e conversione primaria.
- ICP e livello di awareness.
- Offerta/prodotto e condizioni economiche.
- Struttura step funnel (opt-in, thank-you, sales, quiz, etc.).
- Copy già disponibile e aree mancanti.
- Eventi tracking richiesti.
- Indicazione A/B test (sì/no, su quali step).

## Skill workflow (marketing skill)

Quando serve una Skill dedicata funnel, usare uno di questi percorsi:

1. **Upload diretto**: Skill già pronta, viene solo caricata in `.cursor/skills/<skill-name>/`.
2. **Review + upload**: revisione struttura/quality, poi publish.
3. **Creazione ad hoc**: la skill viene creata da zero e poi pubblicata.
4. **Refactor skill esistente**: consolidamento o semplificazione skill già presenti.
5. **Bozza rapida + hardening**: prima versione veloce, poi revisione completa.

Standard Skill:

- Path: `.cursor/skills/<skill-name>/SKILL.md`
- Naming: lowercase con hyphen
- `description` deve includere cosa fa (WHAT) e quando usarla (WHEN)

## Routing

- URL pubblico funnel: `/slug` (senza `/it` o `/en`)
- Rewrite middleware interno: `/__funnels/slug/...`
- Sito madre locale resta su `/it` e `/en`
