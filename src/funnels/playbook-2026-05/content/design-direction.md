# Design Direction

> Queste sono le linee guida visive. Sovrascrivi con il design system del brand quando lo carichi.

## Layout Generale

- Single page per l'index, pagine standalone per i moduli
- Max-width contenuto: 900px centrato
- Spacing generoso tra sezioni (80-120px)
- Mobile-first, responsive
- Sidebar di navigazione sticky sui moduli (desktop)

## Tipografia

- Titoli sezione: bold, grande (48-64px desktop)
- Sottotitoli: medium weight, colore secondario
- Body: 18px min per leggibilità
- Numeri/stat: 72px+, font weight heavy
- Code/formula: monospace con sfondo contrastato

## Componenti

### Index (Hub)
- Hero con proof bar (stat in riga)
- Griglia moduli: card cliccabili con numero, titolo, tag, teaser
- Form lead gen premium (sfondo scuro, campi grandi)
- Footer minimal

### Pagina Modulo
- Header con titolo + tag + durata + link "torna all'indice"
- Table of Contents sticky (sidebar desktop, collapsible mobile)
- Sezioni con heading gerarchici (H2 per macro, H3 per sotto)
- Callout box per i Quick Win (sfondo accento, bordo sinistro)
- Card per i framework (bordo, padding, titolo bold)
- Checklist interattiva (checkbox stilizzate)
- Footer con navigazione: ← Modulo precedente | Torna all'indice | Modulo successivo →

### Componenti riusabili
- `callout-quickwin`: box colorato per azioni immediate
- `framework-card`: card con nome, step, quando usarlo
- `checklist-block`: lista con checkbox
- `connection-badge`: link ad altro modulo con preview
- `stat-number`: numero grande + label sotto
- `tag-pill`: badge colorato per i tag tematici

## Palette suggerita (sovrascrivibile)

- Sfondo hero/form: scuro (quasi nero)
- Sfondo contenuto: chiaro (bianco o off-white)
- Accento primario: colore brand (per CTA, numeri, callout)
- Accento secondario: per tag e badge
- Testo: alto contrasto su entrambi gli sfondi

## Animazioni

- Fade-in on scroll per le card dell'indice
- Smooth scroll tra sezioni
- Hover state sulle card (lift + ombra)
- Progress bar di lettura in alto su ogni modulo (opzionale)

## Mood

- Premium ma non corporate
- Energia da evento live (non da corso online)
- Sensazione di "materiale esclusivo" non di "blog post"
- Pulizia e spazio > decorazione
