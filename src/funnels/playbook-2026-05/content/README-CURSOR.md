# ISTRUZIONI PER CURSOR

> Questo file spiega la struttura della folder e come usarla per costruire il sito.

## Architettura

```
landing-page/
├── README-CURSOR.md          ← SEI QUI (istruzioni per il builder)
├── design-direction.md       ← Mood, layout, componenti, animazioni
├── index.md                  ← Hub principale con indice e form lead gen
├── moduli/                   ← Una pagina per ogni intervento
│   ├── 01-marco-regole-infobusiness.md
│   ├── 02-michele-offerte-conversione.md
│   ├── 03-roberto-war-machine.md
│   ├── 04-federico-creativita-advertising.md
│   ├── 05-formula-partner-incubatore.md
│   ├── 06-simone-vendita-etica.md
│   └── 07-michelangelo-meta-ads.md
└── _template-modulo.md       ← Template per aggiungere nuovi moduli
```

## Come aggiungere un nuovo modulo

1. Duplica `_template-modulo.md`
2. Rinomina con il pattern: `XX-nome-titolo-breve.md`
3. Compila tutte le sezioni seguendo il template
4. Aggiungi la voce nell'indice di `index.md` (sezione MODULI)
5. Rebuilda

## Logica di navigazione

- `index.md` → è la landing page principale (home)
- Ogni file in `moduli/` → è una pagina standalone raggiungibile dall'indice
- Ogni pagina modulo ha un link "← Torna all'indice" e "→ Modulo successivo"
- Il form di lead gen è SOLO su index.md (gating opzionale sui moduli)

## Convenzioni

- Tutto il copy è in italiano
- I blocchi `[DESIGN]` contengono istruzioni visive per il builder, non vanno renderizzati
- I blocchi `[COPY]` contengono il testo da renderizzare
- Le sezioni con `<!-- SCALABILE -->` sono pensate per essere replicate
