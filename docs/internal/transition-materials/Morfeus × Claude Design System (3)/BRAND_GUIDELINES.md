# BRAND GUIDELINES — Webinar Claude by Morfeus

**Versione:** 2.0
**Ultimo aggiornamento:** 21 Aprile 2026
**Scopo:** Documento operativo per generare qualsiasi asset visivo del lancio Webinar Claude. Leggere PRIMA di creare qualsiasi pagina, email, slide, grafica o documento.

---

## 1. Identity

**Cos'e':** Un sub-brand temporaneo di Morfeus, creato per il lancio del webinar e dei prodotti Claude (corso + bootcamp). Vive dentro l'ecosistema Morfeus ma ha una personalita' visiva propria.

**Rapporto con Morfeus:** La base e' Morfeus (dark, premium, autorevole). L'energia viene da Claude (arancione caldo, novita', azione). Il risultato e' qualcosa che chi conosce Morfeus riconosce immediatamente, ma che comunica "questo e' nuovo, questo e' diverso, questo e' adesso."

**Cosa NON e':** Non e' una copia dell'identita' Anthropic/Claude. Non e' un rebrand di Morfeus. Non e' un template infobiz generico. Non e' corporate. Non e' hype.

**Tono visivo in una frase:** Competenza concreta con energia. Sai quello che fai e lo dimostri senza urlare.

---

## 2. Color System

### 2.1 Foundation (sfondi)

| Token | HEX | Ruolo |
|---|---|---|
| `night` | `#0B0B0C` | Sfondo primario. Quasi nero. Sempre presente. |
| `deep-space` | `#0F0E1A` | Sfondo sezioni alternate, base per gradienti sottili |
| `dusk` | `#1A1535` | Profondita' gradienti, sfondo card speciali, placeholder foto |

**Regola:** Lo sfondo e' SEMPRE dark. Mai bianco, mai grigio medio. Le variazioni tra night/deep-space/dusk creano profondita' senza mai diventare piatte.

### 2.2 Accent primario (Claude-inspired)

| Token | HEX | Ruolo |
|---|---|---|
| `orange` | `#EB7A2E` | CTA, bottoni, highlight principali, numeri card, badge, checkmark |
| `orange-hover` | `#F09A5C` | Stato hover dei bottoni, glow leggero |
| `orange-pressed` | `#D4652A` | Stato pressed/active |

**Regola:** L'arancione e' il colore dell'azione. Si usa dove l'utente deve fare qualcosa o dove qualcosa e' importante. Non decorativo: funzionale.

### 2.3 Accent secondario (bridge Morfeus)

| Token | HEX | Ruolo |
|---|---|---|
| `violet` | `#7B68EE` | Label di sezione, tag, icone strutturali, bordi decorativi |
| `purple` | `#6558D4` | Gradienti profondi, glow viola, bordi sottili |

**Regola:** Il viola e' il colore della struttura. Marca le sezioni, organizza visivamente, crea atmosfera. Non compete mai con l'arancione per l'attenzione.

### 2.4 Testo

| Token | HEX | Ruolo |
|---|---|---|
| `white` | `#FFFFFF` | Titoli (H1, H2), nomi propri, strong emphasis |
| `ghost` | `#E4E7F0` | Body text, paragrafi. Opacity 0.85-0.90 su sfondo dark |
| `muted` | `#9B9BB0` | Caption, label, disclaimer, metadata, form footer |

**Regola critica sul body text:** Il testo Ghost a opacity 0.85 su sfondo Night produce un contrasto di ~11:1 (AAA). NON scendere sotto opacity 0.80. Il testo deve essere sempre confortevole da leggere, anche per chi ha problemi di vista.

### 2.5 Rapporti di dominanza

In ogni schermata, la distribuzione cromatica deve seguire questa proporzione:

- **~85%** Foundation (night/deep-space/dusk) — lo sfondo domina sempre
- **~10%** Testo (white/ghost/muted) — il contenuto
- **~4%** Arancione — solo CTA, highlight, punti di attenzione
- **~1%** Viola — struttura, atmosfera, accenti decorativi

Se l'arancione occupa piu' del 5% della superficie visibile, stai esagerando. Se il viola e' piu' visibile dell'arancione, la gerarchia e' sbagliata.

---

## 3. Typography

### 3.1 Font Stack

| Ruolo | Font | Fallback | Dove |
|---|---|---|---|
| **Display** | Clash Display | Plus Jakarta Sans, system-ui | Titoli, H1-H3, valori numerici importanti |
| **Italic Accent** | Playfair Display Italic | Georgia, serif | Parole chiave nei titoli, highlight emotivi, contrasto tipografico |
| **Body** | Satoshi | Inter, system-ui | Paragrafi, form, label, caption, bottoni |

**Caricamento (self-hosted):**

I font sono bundlati come file **variable TTF** in `assets/fonts/` e dichiarati tramite `@font-face` in `colors_and_type.css`. Nessuna dipendenza da CDN.

| Famiglia | File | Assi |
|---|---|---|
| Clash Display | `assets/fonts/ClashDisplay-Variable.ttf` | weight 200–700 |
| Satoshi (roman) | `assets/fonts/Satoshi-Variable.ttf` | weight 300–900 |
| Satoshi (italic) | `assets/fonts/Satoshi-VariableItalic.ttf` | weight 300–900 |
| Playfair Display (roman) | `assets/fonts/PlayfairDisplay-Variable.ttf` | weight 400–900 |
| Playfair Display (italic) | `assets/fonts/PlayfairDisplay-Italic-Variable.ttf` | weight 400–900 |

**Clash Display** e' un geometric sans con personalita'. **Satoshi** e' il body companion: neutro, leggibile, professionale. **Playfair Display Italic** e' l'accento espressivo: serif ad alto contrasto, classico ma contemporaneo, usato SOLO in italic e SEMPRE in un colore diverso dal testo circostante (tipicamente arancione) per creare contrasto tipografico.

### 3.1b Regole d'uso dell'Italic Accent (Playfair Display)

**Quando usarlo:**
- 1-3 parole chiave dentro un titolo H1 o H2 (es. "Come usare Claude *al massimo* nel tuo lavoro")
- Parole emotive o concettuali che beneficiano di contrasto (non parole funzionali)
- Headline di grafiche social dove serve impatto visivo
- Mai piu' di un blocco italic per titolo

**Quando NON usarlo:**
- Nel body text (mai)
- Nei label, tag, caption (mai)
- Nei bottoni CTA (mai)
- Come font intero di un titolo (e' un accento, non un sostituto di Clash Display)
- In piu' di 3-4 parole consecutive (perde l'effetto contrasto)

**Colore dell'italic:** Sempre diverso dal testo circostante. Default: `var(--orange)` #EB7A2E. Alternative accettabili: gradiente signature, `var(--violet)`. Mai bianco su bianco (annulla il contrasto).

**Peso:** 500 default nei titoli. Range accettabile: 400-600. Il contrasto thin/thick di Playfair e' gia' molto forte, non serve andare a 700.

```css
.italic-accent {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-weight: 500;
  color: var(--orange);
}
```

### 3.2 Gerarchia e dimensioni

| Elemento | Font | Weight | Size | Spacing | Colore |
|---|---|---|---|---|---|
| H1 (hero) | Clash Display | 600 | clamp(40px, 6vw, 68px) | -0.025em | white |
| H1 italic accent | Playfair Display Italic | 500 | eredita dal H1 | normal | orange |
| H2 (sezione) | Clash Display | 600 | clamp(32px, 4.5vw, 48px) | -0.02em | white |
| H2 italic accent | Playfair Display Italic | 500 | eredita dal H2 | normal | orange |
| H3 (card title) | Clash Display | 600 | 22px | -0.01em | white |
| Body | Satoshi | 400 | 17-18px | normal | ghost, opacity 0.85-0.90 |
| Body card | Satoshi | 400 | 16px (min) | normal | ghost, opacity 0.80 |
| Label/tag | Satoshi | 700 | 12-13px | 0.12-0.20em, uppercase | violet o muted |
| CTA button | Satoshi | 700 | 16-17px | normal | white |
| Form footer | Satoshi | 400 | 13-14px | normal | muted |
| Micro text | Satoshi | 400 | 13px | normal | muted |

**Regola critica sulle dimensioni:** Il body text NON scende MAI sotto 16px su desktop e 15px su mobile. Il comfort di lettura viene prima dell'estetica. Se devi scegliere tra "elegante ma piccolo" e "un pelo piu' grande ma leggibile", scegli sempre il secondo. I titoli possono essere grandi quanto vuoi, ma il testo che le persone devono effettivamente leggere deve essere generoso.

### 3.3 Line height

| Tipo | Line-height |
|---|---|
| Titoli (H1-H3) | 1.02-1.10 |
| Body text | 1.55-1.65 |
| Card text | 1.55 |
| Label/caption | 1.3 |

---

## 4. Gradient & Glow System

I gradienti sono la firma visiva di questo lancio. Connettono il viola Morfeus all'arancione Claude.

### 4.1 Gradienti principali

**Signature gradient (accent, testo hero, decorazioni forti):**
```css
background: linear-gradient(135deg, #6558D4 0%, #EB7A2E 100%);
```
Uso: gradient text nel titolo hero, logo-mark, elementi decorativi singoli. Mai come sfondo di aree grandi.

**Atmosphere gradient (sfondo pagina, sempre presente):**
```css
background:
  radial-gradient(ellipse at 15% 10%, rgba(101,88,212,0.10) 0%, transparent 45%),
  radial-gradient(ellipse at 85% 90%, rgba(235,122,46,0.08) 0%, transparent 50%);
```
Uso: overlay fisso su body. Crea profondita' senza essere visibile consciamente. Il viola in alto a sinistra, l'arancione in basso a destra. Asimmetrico sempre.

**Subtle gradient (bordi card, form, elementi interattivi):**
```css
background: linear-gradient(135deg, rgba(123,104,238,0.3), rgba(235,122,46,0.2));
```
Uso: bordo sottile (1px) con mask technique su card e form. Visibile solo a chi guarda con attenzione.

**Section alternate (sezioni con sfondo diverso):**
```css
background: linear-gradient(180deg, transparent 0%, rgba(15,14,26,0.6) 50%, transparent 100%);
```
Uso: sezioni alternate per creare ritmo verticale. Fade in, fade out, mai un taglio netto.

### 4.2 Glow CTA

```css
box-shadow: 0 4px 20px rgba(235,122,46,0.35);
/* Hover: */
box-shadow: 0 6px 28px rgba(235,122,46,0.5);
```

Il glow arancione dietro i bottoni e' sempre presente. Indica "questo si puo' cliccare." Al hover si intensifica.

### 4.3 Regole

- Mai piu' di un gradient forte per schermata (il signature gradient attira troppo l'occhio)
- I glow viola e arancione nell'atmosfera sono SEMPRE a opacity < 0.12. Se li vedi chiaramente, sono troppo forti
- I gradienti non sostituiscono mai i colori solidi per testo o icone
- Direzione: sempre 135deg per i gradienti lineari (diagonal top-left to bottom-right)

---

## 5. Component Vocabulary

Questi sono i mattoni. Ogni asset li combina liberamente.

### 5.1 Bottoni CTA

```css
/* Primario */
background: var(--orange);
color: white;
font-family: Satoshi;
font-weight: 700;
font-size: 16px;
padding: 16px 28px;
border-radius: 10px;
box-shadow: 0 4px 20px rgba(235,122,46,0.35);
animation: btn-pulse 3s infinite; /* opzionale, solo su CTA principali */

/* Hover */
background: var(--orange-hover);
box-shadow: 0 6px 28px rgba(235,122,46,0.5);
transform: translateY(-1px);

/* Active */
background: var(--orange-pressed);
transform: translateY(0);
```

**Pulse animation (opzionale, solo per CTA primari):**
```css
@keyframes btn-pulse {
  0% { box-shadow: 0 4px 20px rgba(235,122,46,0.35), 0 0 0 0 rgba(235,122,46,0.4); }
  70% { box-shadow: 0 4px 20px rgba(235,122,46,0.35), 0 0 0 15px rgba(235,122,46,0); }
  100% { box-shadow: 0 4px 20px rgba(235,122,46,0.35), 0 0 0 0 rgba(235,122,46,0); }
}
```

Il pulse si disattiva all'hover (animation: none) per non interferire con la transizione.

### 5.2 Card

```css
background: rgba(255,255,255,0.03);
border: 1px solid rgba(255,255,255,0.06);
border-radius: 14px;
padding: 28px-32px;
transition: border-color 0.3s, transform 0.3s, background 0.3s, box-shadow 0.3s;

/* Hover */
border-color: rgba(235,122,46,0.4);
transform: translateY(-4px);
background: rgba(255,255,255,0.05);
box-shadow: 0 10px 30px rgba(0,0,0,0.3);
```

Le card sono quasi invisibili a riposo. Al hover prendono vita con il bordo arancione e il sollevamento. Questo crea interattivita' senza rumore visivo.

### 5.3 Form Card (optin)

```css
background: rgba(255,255,255,0.03);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
padding: 28px;
backdrop-filter: blur(10px);
```

Con bordo gradient sottile via CSS mask:
```css
/* Pseudo-element ::before */
background: linear-gradient(135deg, rgba(123,104,238,0.3), rgba(235,122,46,0.2));
/* mask technique per mostrare solo il bordo */
```

### 5.4 Input Field

```css
background: rgba(0,0,0,0.4);
border: 1px solid rgba(255,255,255,0.12);
color: white;
font-size: 16px;
font-weight: 500;
padding: 16px 18px;
border-radius: 10px;

/* Focus */
border-color: var(--orange);
background: rgba(0,0,0,0.6);
```

Placeholder in color muted. Mai placeholder troppo lungo.

### 5.5 Badge / Tag

**Badge (tipo "Webinar Gratuito"):**
```css
padding: 8px 16px;
border-radius: 100px;
background: rgba(235,122,46,0.10);
border: 1px solid rgba(235,122,46,0.25);
color: var(--orange);
font-size: 13px;
font-weight: 700;
letter-spacing: 0.08em;
text-transform: uppercase;
```

Con dot pulsante opzionale (6px, arancione, glow).

**Tag (tipo "PROJECTS", "SKILLS"):**
```css
padding: 4px 10px;
border-radius: 6px;
background: rgba(123,104,238,0.12);
border: 1px solid rgba(123,104,238,0.25);
color: var(--violet);
font-size: 12px;
font-weight: 700;
letter-spacing: 0.05em;
```

### 5.6 Check Icon (authority list)

```css
width: 26px;
height: 26px;
border-radius: 6px;
background: rgba(235,122,46,0.1);
border: 1px solid var(--orange);
color: var(--orange);
font-size: 13px;
font-weight: 700;
/* Contenuto: ✓ */
```

Sfondo arancione leggero con bordo arancione pieno. Checkmark in arancione. Visibile e pulito su dark.

### 5.7 Separator

```css
height: 1px;
background: rgba(255,255,255,0.06);
```

Sottilissime, quasi invisibili. Servono a creare ritmo, non a dividere.

### 5.8 Section Label

```css
font-family: Satoshi;
font-size: 13px;
font-weight: 700;
color: var(--violet);
letter-spacing: 0.20em;
text-transform: uppercase;
```

Sempre in viola. Sempre uppercase. Marca l'inizio di una nuova area senza essere un titolo.

---

## 6. Spacing & Rhythm

Non griglia rigida. Principi di respiro.

**Principio base:** Ogni elemento deve avere abbastanza spazio intorno da poter essere percepito come unita' autonoma. Se due elementi sembrano appiccicati, aggiungi spazio. Se una sezione sembra vuota, probabilmente e' giusta.

**Range di padding sezione:** 80-120px verticale su desktop, 60-80px su mobile. Le sezioni devono respirare.

**Gap tra card:** 20-24px. Abbastanza vicine da sembrare un gruppo, abbastanza distanti da essere singole.

**Max-width contenuto:** 1100-1120px con padding laterale 24px. Il testo body non supera mai 680-700px di larghezza (leggibilita' ottimale).

**Gerarchia spaziale:**
- Tra sezioni: 80-120px
- Tra titolo sezione e contenuto: 48-64px
- Tra elementi dentro una sezione: 20-32px
- Padding interno card: 28-32px
- Padding interno form: 28px

**Mobile:** Lo spazio si comprime proporzionalmente ma non crolla. Il minimo di padding sezione e' 60px. Le card passano a colonna singola.

---

## 7. Animation & Motion

**Filosofia:** Le animazioni esistono per dare feedback, non per intrattenere. Tutto cio' che si muove deve avere una ragione funzionale.

### Cosa si anima

| Elemento | Animazione | Timing |
|---|---|---|
| CTA button | Pulse glow (opzionale) | 3s infinite, si ferma all'hover |
| Card hover | translateY(-4px) + border orange + shadow | 0.3s cubic-bezier(0.4, 0, 0.2, 1) |
| Button hover | translateY(-1px) + glow intensificato | 0.2s ease |
| Input focus | border-color change | 0.2s ease |
| Badge dot | Opacity pulse | 2s infinite |
| Link hover | Color transition | 0.2s ease |

### Cosa NON si anima MAI

- Testo che appare con fade-in al scroll (rallenta, distrae)
- Parallax su qualsiasi elemento
- Loading spinner decorativi
- Animazioni di ingresso delle sezioni
- Bounce, shake, o qualsiasi effetto "attention-grabbing" oltre il pulse CTA
- Transizioni piu' lunghe di 0.4s

---

## 8. Logo

### 8.1 Logo Morfeus

**File disponibili:** `01_OS/02_brand/logo/`

| Variante | File | Uso |
|---|---|---|
| **m-w** (bianco, simbolo) | `svg/m-w.svg`, `png/m-w.png` | Header pagine dark, favicon |
| **m-w2** (bianco + "Morfeus") | `svg/m-w2.svg`, `png/m-w2.png` | Header con nome brand visibile |
| **m-w3** (bianco, stacked) | `svg/m-w3.svg`, `png/m-w3.png` | Layout verticali, slide title |
| **m-b** (nero, simbolo) | `svg/m-b.svg`, `png/m-b.png` | Sfondi chiari (email testo, PDF) |
| **m-b2** (nero + "Morfeus") | `svg/m-b2.svg`, `png/m-b2.png` | Header documenti chiari |
| **m-c** (colore) | `svg/m-c.svg`, `png/m-c.png` | Accento colore, hero speciali |

**Regole di placement:**
- Header: logo bianco (m-w o m-w2), allineato a sinistra, piccolo. Discreto ma presente.
- Footer: "Un evento Morfeus" + logo piccolo. Link a morfeushub.com.
- Dimensione minima: 90px di larghezza per la versione con testo, 28px per il solo simbolo.
- Mai deformare, ruotare, o cambiare colore al logo.
- In alternativa al file SVG, il logo-mark puo' essere ricreato in CSS: box 28x28px, border-radius 7px, gradient signature, "M" bianco bold 14px centrato.

### 8.2 Logo Claude (Anthropic)

**Uso:** SOLO nelle grafiche di contenuto (slide webinar, immagini social, visual che mostrano il prodotto Claude). NON nell'infrastruttura della pagina (header, footer, favicon, meta tag).

**Perche':** Questo e' un evento Morfeus su Claude, non un evento Claude. Il brand che firma e' Morfeus. Claude e' l'argomento, non il promotore.

**Quando appare:** Quando si parla di Claude come prodotto (screenshot dell'interfaccia, demo, slide "cos'e' Claude"), accanto al logo Morfeus nelle slide introduttive per contestualizzare.

**Quando NON appare:** Landing page, email, checkout, pagine di vendita, footer.

---

## 9. Photography & Imagery

### Foto di Matt

- **Trattamento:** Sfondo rimosso o sfumato nel dark. Overlay leggero per integrare con la palette.
- **Bordo:** border-radius 16-20px, bordo sottile rgba(255,255,255,0.1).
- **Se la foto e' scura:** Aggiungere un glow sottile dietro (viola o arancione a opacity 0.15) per staccarla dallo sfondo.
- **Aspect ratio:** 4:5 per layout verticali, libero per layout orizzontali.

### Screenshot e demo

- Border-radius: 12-14px
- Bordo: 1px solid rgba(255,255,255,0.08)
- Ombra: 0 10px 40px rgba(0,0,0,0.4)
- Se su sfondo dark: leggero glow viola dietro per profondita'

### Placeholder (quando la foto non c'e' ancora)

```css
background: var(--dusk);
/* oppure gradient: */
background: linear-gradient(135deg, rgba(101,88,212,0.4) 0%, rgba(235,122,46,0.4) 100%), #1A1535;
border-radius: 20px;
border: 1px solid rgba(255,255,255,0.1);
```

Con testo "Foto" in muted, centrato, uppercase, piccolo.

### Cosa NON usare MAI

- Stock photo generiche (persone con laptop sorridenti, uffici generici)
- Immagini AI generate con stile irrealistico/fantasy
- Screenshot a bassa risoluzione
- Immagini con watermark

---

## 10. Contrast & Accessibility

**Standard target:** WCAG AA (minimo), AAA dove possibile.

| Combinazione | Contrast ratio | Rating |
|---|---|---|
| white (#FFF) su night (#0B0B0C) | 19.5:1 | AAA |
| ghost (#E4E7F0) su night (#0B0B0C) | 15.2:1 | AAA |
| ghost opacity 0.85 su night | ~11:1 | AAA |
| muted (#9B9BB0) su night | 7.1:1 | AAA |
| orange (#EB7A2E) su night | 6.2:1 | AA |
| violet (#7B68EE) su night | 5.5:1 | AA |

**Regole:**
- Il body text (ghost) non scende MAI sotto opacity 0.80. Default: 0.85-0.90.
- I label in viola e arancione sono AA. Usarli solo per testo breve e decorativo, mai per body text lungo.
- Muted e' AA per testo grande (18px+), ma va bene per caption e disclaimer perche' sono informazioni secondarie.
- I bottoni hanno testo bianco su arancione: contrast ~4.8:1. Accettabile per testo bold 16px+ (AA Large).

---

## 11. Responsive

**Filosofia:** Mobile-first nel pensiero, non necessariamente nel codice. Il 60%+ del traffico arriva da LinkedIn mobile. Ogni decisione di design deve funzionare PRIMA su 375px, POI su desktop.

**Breakpoint principale:** 768px (sotto: mobile, sopra: desktop). Un solo breakpoint per semplicita'.

### Cosa cambia su mobile

- H1: scala giu' via clamp (min 40px)
- Grid card: da 2-4 colonne a 1 colonna
- About grid (foto + testo): da affiancato a stacked
- Form row: da orizzontale a verticale (input sopra, bottone sotto, entrambi full-width)
- Padding sezione: da 80-120px a 60-80px
- Hero meta: da flex row a wrap con gap ridotto

### Cosa NON cambia su mobile

- Colori, gradienti, glow: identici
- Font weights: identici
- Border-radius: identici
- Body font-size: minimo 15px, ideale 16px
- Line-height: identica o leggermente piu' generosa
- CTA prominence: il bottone resta visibile e grande

---

## 12. Mood & Guardrails

### Il tono tradotto in visuale

| Principio | Cosa significa visivamente |
|---|---|
| **Premium ma non corporate** | Dark, pulito, spazio. Niente grigi medi, niente layout da slide aziendale. |
| **Energetico ma non hype** | L'arancione da' energia, il dark la contiene. Niente maiuscole ovunque, niente "!!!". |
| **Competente ma accessibile** | Tipografia professionale, ma linguaggio visivo che non spaventa. Niente jargon visivo. |
| **Concreto** | Ogni elemento ha una funzione. Se non serve, non c'e'. |
| **Mobile-native** | Pensato per chi scrolla con il pollice. Niente hover-dipendente. |

### DO

- Usare spazio negativo generosamente
- Mantenere la gerarchia: un solo punto focale per schermata
- Far respirare ogni sezione
- Usare l'arancione con parsimonia (meno e' piu' impattante)
- Testare sempre su mobile prima di considerare finito
- Mantenere il body text leggibile e generoso nelle dimensioni

### DON'T

- Gradients arcobaleno o neon eccessivi
- Animazioni pesanti che rallentano la pagina
- Stock photo generiche
- Piu' di 2 colori accent (arancione + viola, basta)
- Background pattern geometrici complessi
- Troppi bottoni sulla stessa schermata (1 CTA primario, max 1 secondario)
- Testo body sotto 16px su desktop, sotto 15px su mobile
- Emoji come elementi di design (ok nel copy testuale, mai nel layout)
- Logo giganti o "powered by Morfeus" ripetuto ovunque
- Bordi spessi o colorati sugli elementi (sempre 1px, sempre semi-trasparenti)

---

## 13. Asset Application Notes

Una riga per tipo. Il principio guida, non la struttura.

| Asset | Principio |
|---|---|
| **Landing page (optin)** | Un solo obiettivo: l'email. Tutto serve la conversione. Dark, pulito, form prominente, CTA pulsante. |
| **Thank you page** | Conferma + anticipazione. Tono caldo, prossimo step chiaro. Stessa palette, meno intensita'. |
| **Email** | Dark-on-light invertito: sfondo bianco/grigio chiaro, testo scuro, accenti arancione. Logo Morfeus nero (m-b). Testo body 16px+. |
| **Slide webinar** | 16:9, sfondo night con glow, titoli grandi, poco testo per slide. Logo Morfeus piccolo bottom-left. Logo Claude dove si parla del prodotto. |
| **Sales page** | Long-form dark. Ritmo sezioni alternate. Social proof, offerta, CTA ripetuti. Stessa palette ma piu' densa di contenuto. |
| **Ads (social)** | Formato quadrato o 4:5. Headline grande, arancione su dark. Pochissimo testo. Logo Morfeus piccolo. Deve funzionare in 1.5 secondi. |
| **Post LinkedIn** | Immagini: dark background, testo grande leggibile nel feed. Arancione per highlight. Formato 1:1 o 4:5. |

---

## 14. CSS Variables Reference

Per copia-incolla rapido in qualsiasi asset HTML:

```css
:root {
  /* Foundation */
  --night: #0B0B0C;
  --deep-space: #0F0E1A;
  --dusk: #1A1535;

  /* Accent primary */
  --orange: #EB7A2E;
  --orange-hover: #F09A5C;
  --orange-pressed: #D4652A;

  /* Accent secondary */
  --violet: #7B68EE;
  --purple: #6558D4;

  /* Text */
  --white: #FFFFFF;
  --ghost: #E4E7F0;
  --muted: #9B9BB0;

  /* Utility */
  --hairline: rgba(255,255,255,0.06);

  /* Fonts */
  --font-display: 'Clash Display', 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-italic: 'Playfair Display', Georgia, serif;
  --font-body: 'Satoshi', 'Inter', system-ui, sans-serif;
}
```

**Font loading:**

I font sono self-hosted in `assets/fonts/` (variable TTF). Il singolo `<link rel="stylesheet" href="colors_and_type.css">` carica sia i token sia le `@font-face`. Non aggiungere link a Fontshare o Google Fonts.

```html
<link rel="stylesheet" href="colors_and_type.css">
```

---

*Questo documento e' il riferimento unico (v2.0). Ogni asset parte da qui. Se qualcosa non e' coperto, il principio guida e': dark, pulito, arancione per l'azione, viola per la struttura, Playfair Display Italic per il contrasto espressivo, spazio generoso, testo leggibile. I file BRAND_GUIDELINES_v1_OBSOLETE.md/.html sono archivio storico e NON vanno usati.*
