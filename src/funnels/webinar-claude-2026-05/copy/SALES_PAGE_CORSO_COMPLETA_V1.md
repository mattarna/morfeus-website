# SALES PAGE CORSO CLAUDE — Documento Completo v1

**Data:** 26 Aprile 2026
**Tipo:** LANCIO 🔴 (post-webinar, cart open-close)
**Pricing:** 67€ early bird (24h) → 97€ (giorni 2-7) → 147€ (evergreen)
**Target:** Professionisti italiani 28-45, 85% principianti AI, traffico caldo dal webinar
**Awareness:** Livello 4 — Product Aware
**Status:** Copy + struttura + visual direction + personalizzazione dinamica v1.1

---

## ARCHITETTURA PAGINA — 14 blocchi

```
1.  HERO                           → Cattura + CTA + timer
2.  DA WEBINAR A DECISIONE         → Bridge dal live alla pagina
3.  PROBLEMA + COSTO NON AGIRE     → Riattiva il dolore in breve
4.  MECCANISMO / METODO            → Perché funziona (3 step)
5.  COSA C'È DENTRO                → 10 moduli con outcome
6.  PROOF                          → Authority + testimonial
7.  PER CHI È / PER CHI NON È     → Auto-selezione
8.  COMPARISON TABLE               → vs YouTube vs Corso generico
9.  OFFERTA: STACK + PREZZO        → Reveal Hormozi
10. GARANZIA                       → Risk reversal offensivo
11. FAQ / OBIEZIONI                → Smonta i blocchi finali
12. URGENZA + SCARSITÀ             → Timer + scala prezzo
13. CTA FINALE + RECAP             → Chiusura arco narrativo
14. SEZIONE B2B                    → Lead gen aziende
```

**CTA distribuite:** Blocchi 1, 9, 12, 13. Quattro punti di conversione.
**Lunghezza stimata:** ~2.500-3.000 parole (variante live/replay), ~3.500-4.000 (variante email).
**Tono:** Collega competente. Diretto, concreto, zero hype. I numeri parlano.

---

## SISTEMA DI PERSONALIZZAZIONE DINAMICA

La pagina cambia contenuto in base alla provenienza del visitatore, passata come parametro URL.

### Meccanismo tecnico

```
URL base: salespage.morfeushub.com/corso-claude

Variante LIVE:    ?src=live      (link in chat YouTube durante il webinar)
Variante REPLAY:  ?src=replay    (link nelle email di replay / pagina replay)
Variante EMAIL:   ?src=email     (link da email a lista senza webinar)
Fallback:         nessun param   → trattato come REPLAY (caso più comune)
```

**Implementazione:** JavaScript client-side legge `URLSearchParams`, mostra/nasconde blocchi con `data-variant="live|replay|email"`. Nessun server-side necessario. Un singolo file HTML con CSS che gestisce la visibilità.

### Mappa delle varianti

```
BLOCCO                  LIVE          REPLAY        EMAIL
─────────────────────────────────────────────────────────────
1  HERO                 Variante A    Variante B    Variante C
2  BRIDGE               Variante A    Variante B    Variante C (diventa "Value Prop")
3  PROBLEMA             Compresso     Medio         Esteso
4  MECCANISMO           = identico    = identico    = identico
5  MODULI               = identico    = identico    = identico
6  PROOF                = identico    = identico    = identico
7  PER CHI È            = identico    = identico    = identico
8  COMPARISON           = identico    = identico    = identico
9  OFFERTA/PREZZO       = identico    = identico    = identico
10 GARANZIA             = identico    = identico    = identico
11 FAQ                  = identico    = identico    + 1 FAQ extra
12 URGENZA              Variante A    Variante B    Variante C
13 CTA FINALE           Variante A    Variante B    Variante C
14 B2B                  = identico    = identico    = identico
```

**Blocchi che cambiano: 1, 2, 3, 12, 13 + 1 FAQ aggiuntiva per email.**
**Blocchi identici: 4-10, 14.** Lo stack, il prezzo, la garanzia e il meccanismo non cambiano mai — sono la struttura portante dell'offerta.

### Logica per variante

| Variante | Chi è | Cosa sa | Cosa serve |
|---|---|---|---|
| **LIVE** | Ha visto il webinar in diretta. Energy alta. | Sa tutto: problema, meccanismo, demo, promessa. | Spinta alla decisione. Minima frizione. Urgenza massima. |
| **REPLAY** | Ha visto il replay (o lo sta guardando). Energy media. | Sa quasi tutto ma senza il momentum del live. | Ricostruire il momentum. Collegare al replay. Urgenza reale. |
| **EMAIL** | È in lista ma non ha visto il webinar. Energy bassa. | Sa poco o nulla del corso. Conosce Morfeus vagamente. | Educazione rapida. Problema + meccanismo + promessa from scratch. |

---
---

## BLOCCO 1 — HERO

### Struttura e funzione

Cattura e converte. CTA diretta + prezzo early bird + timer. Nessun elemento che distrae dall'azione. Il copy cambia in base alla provenienza: chi ha visto il live ha bisogno di meno contesto, chi arriva da email ha bisogno di più promessa.

---

### Copy — VARIANTE A (src=live)

Chi ha appena visto il webinar in diretta. Sa tutto. Serve solo la spinta.

**[Badge in alto]**

```
Esclusiva partecipanti live | Prezzo early bird: ancora per [TIMER COUNTDOWN]
```

**[Headline]**

```
Smetti di usare Claude al 10%.
Impara il sistema completo in 48 lezioni.
```

*"sistema completo" in Playfair Display Italic arancione.*

**[Subheadline]**

```
Hai appena visto il metodo in azione. 10 moduli per farlo tuo 
— con il prezzo più basso che vedrai mai.
```

**[Proof bar]**

```
2.000+ professionisti formati  ·  HFarm, Talent Garden, Sole 24 Ore  ·  Garanzia 14 giorni
```

**[CTA primaria]**

```
Voglio padroneggiare Claude — Entra a 67€
```

**[Micro-copy]**

```
Prezzo riservato ai partecipanti live. Tra [X ore] sale a 97€.
```

**[Scala prezzo]**

```
67€ early bird (24h) → 97€ (giorni 2-7) → 147€ prezzo pieno
```

---

### Copy — VARIANTE B (src=replay)

Ha visto il replay o lo sta guardando. Ha il contesto ma non il momentum del live.

**[Badge in alto]**

```
Offerta webinar | Prezzo early bird: ancora per [TIMER COUNTDOWN]
```

**[Headline]**

```
Smetti di usare Claude al 10%.
Impara il sistema completo in 48 lezioni.
```

*"sistema completo" in Playfair Display Italic arancione.*

**[Subheadline]**

```
Il corso che ti porta da "faccio domande all'AI" a "Claude lavora 
con me ogni giorno" — con un metodo testato su 2.000+ professionisti.
```

**[Proof bar]**

```
2.000+ professionisti formati  ·  HFarm, Talent Garden, Sole 24 Ore  ·  Garanzia 14 giorni
```

**[CTA primaria]**

```
Voglio padroneggiare Claude — Entra a 67€
```

**[Micro-copy]**

```
Prezzo più basso di sempre. Tra [X ore] sale a 97€.
```

**[Scala prezzo]**

```
67€ early bird (24h) → 97€ (giorni 2-7) → 147€ prezzo pieno
```

---

### Copy — VARIANTE C (src=email)

Non ha visto il webinar. Conosce Morfeus dalla lista email. Serve promessa forte e contesto rapido.

**[Badge in alto]**

```
Offerta lancio | Prezzo speciale: ancora per [TIMER COUNTDOWN]
```

**[Headline]**

```
Il 95% usa Claude come Google.
Questo corso ti insegna il restante 90%.
```

*"restante 90%" in Playfair Display Italic arancione.*

**[Subheadline]**

```
48 lezioni pratiche per trasformare Claude da chatbot a partner 
di lavoro quotidiano. Il metodo che 2.000+ professionisti hanno 
già usato per risparmiare 5-8 ore a settimana.
```

**[Proof bar]**

```
2.000+ professionisti formati  ·  HFarm, Talent Garden, Sole 24 Ore  ·  Garanzia 14 giorni
```

**[CTA primaria]**

```
Scopri il corso — Entra a 67€
```

**[Micro-copy]**

```
Prezzo di lancio per pochi giorni. Poi sale a 97€ e poi a 147€.
```

**[Scala prezzo]**

```
67€ lancio → 97€ (tra pochi giorni) → 147€ prezzo pieno
```

### Elementi visivi

- **Background:** Dark pieno (#0B0B0C). Nessuna immagine hero, nessuna illustrazione. Il focus è tutto su testo e CTA.
- **Timer countdown:** Numeri in Clash Display arancione (#EB7A2E) con leggero glow (20% opacity blur). Formato HH:MM:SS. Posizionato nel badge in alto. È l'unico elemento "vivo" dell'hero.
- **Headline:** Clash Display 600, grande (48-56px desktop, 32-36px mobile). "Sistema completo" in Playfair Display Italic arancione.
- **Proof bar:** Tre elementi separati da dot (·) arancione. Font Satoshi 400, dimensione ridotta (14-16px). Divider sottile sopra e sotto.
- **CTA:** Bottone pieno arancione (#EB7A2E), testo bianco, Clash Display 600, centrato. Padding generoso (16px 48px). Border-radius 8px.
- **Scala prezzo:** Testo piccolo (14px), Satoshi 400, grigio chiaro. Sotto la CTA.
- **Layout mobile:** Headline su 2-3 righe. Proof bar impilata verticalmente. Bottone full-width.
- **Nessuna immagine.** Coerente con optin page e pagina bootcamp v2.

---
---

## BLOCCO 2 — DA WEBINAR A DECISIONE / VALUE PROP INTRO

### Struttura e funzione

Ponte dalla provenienza del visitatore alla pagina. Per chi ha visto il webinar (live o replay), trasforma l'esperienza in momentum. Per chi arriva da email, presenta la value proposition da zero. Non vende ancora. Crea continuità e pone la scelta.

---

### Copy — VARIANTE A (src=live)

Breve. Chi ha visto il live ha il momentum. Basta ricordarglielo e indirizzarlo.

**[Headline sezione]**

```
Hai visto cosa succede quando usi Claude davvero.
```

*"davvero" in Playfair Display Italic arancione.*

**[Body]**

```
Hai visto output che non sembravano generati da una macchina.
Hai visto workflow che risparmiano ore, non minuti.
Hai visto cosa cambia quando Claude ha il contesto giusto.

Adesso hai due strade.

Tornare a usarlo come prima.
Oppure imparare il sistema che hai visto in azione.
```

---

### Copy — VARIANTE B (src=replay)

Medio. Ricostruisce il collegamento con il replay e aggiunge il frame della scelta.

**[Headline sezione]**

```
Hai visto cosa succede quando usi Claude davvero.
```

*"davvero" in Playfair Display Italic arancione.*

**[Body]**

```
Nel webinar hai visto la differenza tra fare domande all'AI 
e avere un sistema che lavora con te.

Hai visto output che non sembravano generati da una macchina.
Hai visto workflow che risparmiano ore, non minuti.
Hai visto cosa cambia quando Claude ha il contesto giusto.

Adesso hai due strade.

Tornare a usarlo come prima — una domanda ogni tanto, 
un testo ogni tanto, quella sensazione che "per il mio lavoro 
non funziona".

Oppure imparare il sistema che hai visto in azione.
Strutturato in 10 moduli. Costruito per chi parte da zero 
o da "ci ho provato ma non ha funzionato".
```

---

### Copy — VARIANTE C (src=email)

Questa variante sostituisce completamente il ponte webinar. Diventa una intro alla value proposition per chi non ha contesto.

**[Headline sezione]**

```
Stai usando Claude al 10% delle sue capacità.
E non è colpa tua.
```

*"non è colpa tua" in Playfair Display Italic arancione.*

**[Body]**

```
La maggior parte dei professionisti usa Claude come un Google 
più intelligente. Fa domande. Ottiene risposte generiche. 
Pensa "bah, niente di speciale".

Ma Claude non è un motore di ricerca. 
È uno strumento che può lavorare CON te — ogni giorno, 
su ogni progetto, nel tuo ambiente di lavoro.

Il problema è che nessuno ti ha mai mostrato come si fa.

I tutorial su YouTube ti insegnano dove cliccare.
I prompt copiati da Twitter funzionano una volta.
I corsi "AI" parlano di tutto e non ti insegnano nulla 
di applicabile al tuo lunedì mattina.

Questo corso è diverso.
10 moduli. Un metodo. Un sistema che costruisci pezzo per pezzo 
— calibrato sul tuo lavoro, non su demo generiche.
```

---

### Elementi visivi (tutte le varianti)

- **Layout:** Testo centrato o allineato a sinistra, colonna stretta (max 600px). Ampio respiro tra le righe (line-height 1.8).
- **Le righe "Hai visto..." (varianti A e B):** Accento visivo con linea verticale arancione a sinistra (3px, #EB7A2E), stile blockquote elegante. Padding-left 24px.
- **Variante C:** Nessun blockquote. Paragrafi standard con spazio tra loro. La riga "Questo corso è diverso." isolata, con spazio sopra (24px) e font leggermente più grande o in Clash Display.
- **Nessuna CTA.** Scorre naturalmente nella sezione successiva.
- **Nessuna immagine.** Blocco conversazionale puro.
- **Transizione verso blocco 3:** Nessun divider pesante. Solo spazio (80-100px).

---
---

## BLOCCO 3 — PROBLEMA + COSTO DEL NON AGIRE

### Struttura e funzione

La profondità di questa sezione cambia drasticamente per variante. Il webinar ha già educato chi ha visto il live/replay. Chi arriva da email ha bisogno della diagnosi completa. Il box dato concreto è identico per tutti — è l'ancora razionale. Tecnica Suby (PASTOR framework): il dato concreto converte più della narrazione su traffico caldo.

---

### Copy — VARIANTE A (src=live) — COMPRESSO

Chi ha visto il live ha sentito il problema nel webinar. Basta riattivare il dolore e quantificare.

**[Headline sezione]**

```
Il problema che non si risolve da solo.
```

**[Body]**

```
Lo sai già. L'hai visto nel webinar.

Ogni settimana perdi ore in task che l'AI potrebbe fare in minuti. 
I tuoi colleghi che hanno un sistema fanno in 20 minuti 
quello che tu fai in 3 ore.

Più aspetti, più il gap si allarga.
```

**[Box dato concreto]**

```
Ogni settimana senza un sistema = 5-8 ore perse.
A 25€/ora, sono 500-800€ al mese.
Il corso costa 67.
```

---

### Copy — VARIANTE B (src=replay) — MEDIO

Ha visto il replay ma senza il momentum. Riattiva il dolore con più dettaglio.

**[Headline sezione]**

```
Il problema che non si risolve da solo.
```

**[Body]**

```
Lo sai già. Non serve che te lo spieghi.

Ogni settimana perdi ore in task che l'AI potrebbe fare in minuti. 
Scrivi email da zero. Prepari presentazioni da zero. 
Fai ricerche copiando e incollando. 
Rileggi, correggi, riformuli — manualmente.

Nel frattempo, i tuoi colleghi che hanno capito come usare Claude 
fanno in 20 minuti quello che tu fai in 3 ore. 
Non perché siano più bravi.
Perché hanno un sistema. Tu no.

E più aspetti, più il gap si allarga.
```

**[Box dato concreto]**

```
Ogni settimana senza un sistema = 5-8 ore perse.
A 25€/ora, sono 500-800€ al mese.
Il corso costa 67.
```

---

### Copy — VARIANTE C (src=email) — ESTESO

Non ha visto il webinar. Serve la diagnosi completa: riconoscimento del problema, amplificazione, costo dell'inazione, frame "non è colpa tua, è colpa del metodo".

**[Headline sezione]**

```
Se hai provato l'AI e hai pensato "non fa per me", 
leggi questo.
```

*"leggi questo" in Playfair Display Italic arancione.*

**[Body — Riconoscimento]**

```
Hai scaricato ChatGPT. O hai provato Claude. 
Hai fatto qualche domanda. Hai ottenuto risposte 
che avresti potuto trovare su Google.

Hai pensato: "Ok, carino. Ma per il mio lavoro 
non cambia nulla."

E hai ragione. A quel livello, non cambia nulla.
```

**[Body — Diagnosi]**

```
Ecco cosa sta succedendo davvero.

L'AI generativa ha 5 livelli di utilizzo.
Il Livello 1 è domanda/risposta — quello che fanno tutti.
Il Livello 4 è un partner di lavoro che conosce il tuo 
business, i tuoi clienti, il tuo modo di lavorare, 
e ti produce output come li faresti tu. Ma meglio. 
E in un decimo del tempo.

Il 95% delle persone non supera mai il Livello 1.
Non perché siano stupide. Perché nessuno gli ha mai 
mostrato che i livelli successivi esistono.

I tutorial YouTube? Ti insegnano feature.
I corsi "AI"? Ti parlano di 15 strumenti diversi.
I prompt magici su Twitter? Funzionano una volta.

Nessuno di questi ti insegna un METODO.
Un sistema che funziona lunedì mattina, quando apri 
il laptop e devi lavorare davvero.
```

**[Body — Costo dell'inazione]**

```
Nel frattempo, chi ha capito come funziona davvero 
sta risparmiando 5-8 ore a settimana.

Fa ricerche in 10 minuti, non in 2 ore.
Scrive email, report, presentazioni in un quarto del tempo.
Ha un collega digitale che conosce i suoi clienti, 
il suo settore, il suo tono di voce.

Non perché siano più bravi di te.
Perché hanno un sistema. Tu non ancora.

E ogni settimana che aspetti, il gap si allarga.
Tra sei mesi non avrai "più tempo per imparare". 
Avrai meno tempo, più concorrenza, e lo stesso problema 
— solo più grande.
```

**[Box dato concreto]**

```
Ogni settimana senza un sistema = 5-8 ore perse.
A 25€/ora, sono 500-800€ al mese.
Il corso costa 67.
```

---

### Elementi visivi (tutte le varianti)

- **Body:** Satoshi 400, colonna stretta (max 600px). Tono fattuale, non drammatico.
- **Variante C — "5 livelli":** Opzionale: mini-grafico verticale con 5 step numerati. Step 1 evidenziato in grigio ("sei qui"), step 4 evidenziato in arancione ("il corso ti porta qui"). Semplice, testuale, non illustrato. Se troppo complesso, solo testo.
- **Box dato concreto (identico per tutte le varianti):** Card con sfondo #0F0E1A, bordo arancione sottile (1px, #EB7A2E), border-radius 12px, padding generoso (32px).
  - "5-8" e "500-800€" in Clash Display arancione, grandi (48-64px). Sono i numeri che l'occhio vede per primi.
  - "67" in Clash Display bianco, stessa dimensione. Il contrasto arancione (costo problema) vs bianco (costo soluzione) è il messaggio visivo.
  - I numeri SONO il visual. Nessuna icona, nessuna illustrazione.
- **Nessuna immagine.** Il dato è il visual.

---
---

## BLOCCO 4 — MECCANISMO / METODO (MEDIO)

### Struttura e funzione

Recap sintetico del metodo. Non enciclopedico — chi arriva dal webinar lo ha già sentito. Qui serve chiarezza e differenziazione in 3 step: (1) il mindset prima delle feature, (2) la personalizzazione, (3) il metodo che resta. Tecnica Schwartz: meccanismo unico che giustifica la promessa. Include sotto-blocco "effetti collaterali" (ispirato dalla pagina bootcamp v2).

### Copy

**[Headline sezione]**

```
Perché questo corso funziona dove gli altri falliscono.
```

*"funziona" in Playfair Display Italic arancione.*

**[Intro]**

```
La maggior parte dei corsi AI ti insegna dove cliccare.
Funziona per la demo. Non funziona per il lunedì mattina.

Dopo due settimane sei punto e a capo, perché sapere 
dove si trova un bottone non è sapere COME lavorare 
con l'intelligenza artificiale.

Questo corso è costruito al contrario.
```

**[Step 1]**

```
STEP 1 — Prima il pensiero, poi lo strumento.

Il Modulo 0 si chiama "Come ragionare con l'AI". Non 
"Come usare Claude". Impari il framework T/Q/D — quali 
task delegare, quali tenere, quali verificare. Prima di 
aprire lo strumento, sai già cosa chiedergli.

Nessun competitor parte da qui.
```

**[Step 2]**

```
STEP 2 — Dal setup al sistema personalizzato.

Moduli 1-6: non impari le feature. Costruisci il TUO 
ambiente di lavoro. Projects con le TUE istruzioni. 
Contesto che riflette il TUO business. Skill che 
automatizzano i TUOI task ripetitivi.

Non è un corso generico su "l'AI". È il tuo Claude, 
configurato per il tuo lavoro.
```

**[Step 3]**

```
STEP 3 — Metodo che resta, anche quando lo strumento cambia.

Moduli 7-9: workflow reali, progetti complessi, sicurezza. 
Il 70% di quello che impari si applica a qualsiasi AI. 
I tool cambiano ogni 6 mesi. Il metodo no.

È la differenza tra imparare a guidare e imparare 
dove sono i bottoni di una macchina specifica.
```

**[Sotto-blocco: effetti collaterali]**

```
Effetti collaterali riportati dagli studenti:

→ I colleghi ti chiedono "come fai?"
→ Smetti di temere che l'AI ti sostituisca
→ Inizi a vedere opportunità dove prima vedevi task
→ Non riesci più a lavorare senza Claude aperto
```

### Elementi visivi

- **I 3 step come card:** Tre card orizzontali (desktop) o impilate (mobile).
  - **Numero grande** a sinistra di ogni card: "01", "02", "03" in Clash Display arancione, semi-trasparente (30% opacity), dimensione enorme (120px+). Funziona come watermark posizionale.
  - **Icona minimale** sopra il titolo, lineare in arancione (line-weight 1.5px):
    - Step 1: icona cervello (ragionamento/mindset)
    - Step 2: icona ingranaggi/building blocks (sistema)
    - Step 3: icona bussola (metodo/direzione)
  - **Sfondo card:** #0F0E1A, border-radius 12px, hover leggero su desktop (shadow + bordo arancione).
  - La progressione visiva 01 → 02 → 03 comunica "percorso strutturato" prima ancora di leggere.

- **Sotto-blocco "Effetti collaterali":** Stile diverso dal resto della sezione.
  - Frecce (→) in arancione.
  - Sfondo con gradient viola molto sottile (#7B68EE al 5%) o nessuno sfondo, solo un tono leggermente diverso.
  - Font leggermente più piccolo. Deve sembrare un momento di respiro, non una sezione formale. Un post-it inserito con un sorriso.

- **Nessuna immagine.** Le card e i numeri grandi sono il visual.

---
---

## BLOCCO 5 — COSA C'È DENTRO (STACK MODULI)

### Struttura e funzione

Lista dei 10 moduli con outcome specifico per ciascuno. NON è la sezione offerta/prezzo (quella è il blocco 9). Qui il lettore capisce cosa impara e cosa cambia dopo ogni modulo. Formato outcome-first: non "cosa contiene" ma "cosa cambia per te". Ogni modulo è un micro-promessa.

### Copy

**[Headline sezione]**

```
10 moduli. 48 lezioni. Un sistema completo.
```

**[Intro]**

```
Non una lista di video da guardare. Un percorso 
con un ordine preciso: ogni modulo sblocca il successivo.
```

**[Modulo 0]**

```
MODULO 0 — Come ragionare con l'AI
Impari il mindset prima delle feature. Framework T/Q/D: 
sai cosa delegare, cosa tenere, cosa verificare. 
Dopo questo modulo pensi diversamente.
```

**[Modulo 1]**

```
MODULO 1 — Setup e primi passi
Account, piano, interfaccia. Se vieni da ChatGPT, 
la migrazione è coperta. In 15 minuti sei operativo.
```

**[Modulo 2]**

```
MODULO 2 — Chat: usare Claude ogni giorno
Input vocale (3x più veloce), prompting pratico, 
artifacts, analisi immagini, PDF e dati. 
Il modulo che usi dal giorno 1.
```

**[Modulo 3]**

```
MODULO 3 — Projects: il tuo Claude specializzato
Istruzioni personalizzate, file di contesto, knowledge base.
Claude smette di essere generico e inizia a conoscere 
il tuo lavoro.
```

**[Modulo 4]**

```
MODULO 4 — CoWork: Claude come collega
La funzionalità che cambia tutto. Claude lavora sui tuoi 
file, i tuoi documenti, le tue presentazioni. Non in una 
chat — nel tuo ambiente di lavoro.
```

**[Modulo 5]**

```
MODULO 5 — Il segreto della qualità: dare contesto
Istruzioni stratificate, contesto persistente, 
memoria. Claude che ti conosce e migliora ogni giorno.
```

**[Modulo 6]**

```
MODULO 6 — Skills, plugin e connettori
Installa capacità pre-costruite con un click. 
Crea le tue. Collega Claude ai tuoi strumenti esterni.
Il modulo dove Claude diventa un sistema, non un chatbot.
```

**[Modulo 7]**

```
MODULO 7 — Workflow: dal problema al risultato
Ricerca, contenuti, documenti, presentazioni, 
review. Use case reali, non demo costruite.
Il modulo più pratico del corso.
```

**[Modulo 8]**

```
MODULO 8 — Plan & Solve: progetti complessi
Il metodo per affrontare qualsiasi progetto: 
pianifica prima, esegui dopo. Due sistemi 
(Planner + Executor) che lavorano insieme.
```

**[Modulo 9]**

```
MODULO 9 — Sicurezza, privacy e prossimi passi
Cosa condividere, cosa no. Come restare aggiornati. 
La visione di dove stai andando: il tuo "team AI".
```

**[Chiusura sezione]**

```
Totale: ~4-5 ore di contenuto. Lezioni da 10-15 minuti.
Guardi quando vuoi. Applichi subito.
Nessuna lezione è teoria senza pratica.
```

### Elementi visivi

- **Griglia 10 card:** 5 righe x 2 colonne su desktop, 1 colonna su mobile.
  - **Ogni card:** sfondo #0F0E1A, bordo sottile grigio scuro (#2A2A2A), border-radius 12px, padding 24px.
  - **Numero modulo:** in alto a sinistra, Clash Display arancione, grande (32px), semi-bold.
  - **Titolo modulo:** Clash Display bianco, subito sotto il numero.
  - **Descrizione outcome:** Satoshi 400, grigio chiaro (#B0B0B0), 2-3 righe.
  - **Icona:** in alto a destra di ogni card, icona lineare arancione (line-weight 1.5px, 24px). Una per modulo:
    - Mod 0: cervello (ragionamento)
    - Mod 1: ingranaggio (setup)
    - Mod 2: bolla chat (conversazione)
    - Mod 3: cartella (projects)
    - Mod 4: handshake (collega/CoWork)
    - Mod 5: bersaglio (contesto/qualità)
    - Mod 6: plug/connettore (skills/plugin)
    - Mod 7: frecce circolari (workflow)
    - Mod 8: checklist (plan & solve)
    - Mod 9: lucchetto (sicurezza)
  - **NOTA:** Icone lineari custom in stile Morfeus. Se non disponibili, meglio solo il numero grande senza icona. Niente è peggio di icone generiche.
  - **Hover desktop:** Card si alza leggermente (box-shadow), bordo diventa arancione. Feedback "questo è vivo".

- **Chiusura sezione:** Testo centrato sotto le card, Satoshi 400. Spazio generoso sopra (40px).

---
---

## BLOCCO 6 — PROOF (AUTHORITY + SOCIAL PROOF)

### Struttura e funzione

Proof calibrata per un corso a 67-147€: non serve pesante, serve credibile. Authority dei founder (non formatori: imprenditori) + logo wall partner + 2-3 testimonianze con risultato specifico. Tecnica Bencivenga: proof razionale (numeri, loghi) + proof emotiva (testimonianze con volto).

### Copy

**[Headline sezione]**

```
Chi te lo insegna. E chi l'ha già fatto.
```

*"già fatto" in Playfair Display Italic arancione.*

**[Authority — chi siamo]**

```
Non siamo formatori che hanno letto dell'AI.

Morfeus nasce nel 2024 da un'agenzia di marketing 
che usa l'AI dal 2021 — prima del boom ChatGPT.

Matteo e Alex hanno ottimizzato ogni processo della 
loro agenzia con l'intelligenza artificiale. Copy, 
analisi, workflow, reportistica. Non è teoria 
accademica — è sopravvivenza competitiva.

Poi hanno capito che quel metodo serviva a tutti.

Da allora: 2.000+ professionisti formati.
Partnership con HFarm, Talent Garden, Confcommercio, 
Sole 24 Ore Formazione.
Formazione per Enel, Sisal, BNP Paribas, Zara.

Insegnano quello che fanno ogni giorno.
Non quello che hanno letto.
```

**[Testimonianze — 2-3]**

```
[TESTIMONIANZA 1 — con nome, ruolo, foto]
"[Frase risultato specifico]"
— Nome Cognome, Ruolo @ Azienda

[TESTIMONIANZA 2]
"[Frase risultato specifico]"
— Nome Cognome, Ruolo @ Azienda

[TESTIMONIANZA 3 — opzionale]
"[Frase risultato specifico]"
— Nome Cognome, Ruolo @ Azienda
```

*NOTA PER MATT: Servono 2-3 testimonianze reali con risultato specifico. Idealmente: profilo, situazione prima, risultato dopo, tempo. Se non disponibili, usare i feedback WhatsApp già raccolti.*

### Elementi visivi

- **Layout authority:** Due colonne su desktop. Testo authority a sinistra (60% width), logo wall a destra (40% width). Mobile: testo sopra, loghi sotto.

- **Logo wall partner:** Riga orizzontale con loghi HFarm, Talent Garden, Sole 24 Ore, Confcommercio, Asseprim.
  - Tutti in versione **monocromatica bianca** (non a colori — i loghi a colori su sfondo scuro sono caos visivo).
  - Opacity 70%, che sale a 100% al hover.
  - Su mobile: griglia 2x3 o scroll orizzontale.

- **Foto founder (opzionale ma raccomandato):** Una foto di Matteo e Alex.
  - Non stock, non in posa corporate. Ideale: foto naturale mentre lavorano/insegnano, sfondo scuro o neutro. Taglio dalla vita in su.
  - Deve comunicare "questi due lavorano davvero con questi strumenti".
  - Se la foto non esiste o non è di qualità professionale, **meglio senza**. Una foto mediocre è peggio di nessuna foto.

- **Testimonianze card:** Ogni testimonianza come card con:
  - Foto persona: round (60px), bordo arancione 2px.
  - Nome e ruolo in Clash Display, piccolo.
  - Azienda in Satoshi, grigio chiaro.
  - Citazione tra virgolette in Satoshi Italic.
  - Se non ci sono foto reali: iniziale del nome in cerchio arancione (avatar generato). Ma le foto reali convertono il 30%+ in più.
  - Sfondo card: #1A1535, border-radius 12px.
  - Layout: 2 testimonianze affiancate su desktop, 3 in riga se tre. Mobile: impilate. Se 4+: slider/carousel.

---
---

## BLOCCO 7 — PER CHI È / PER CHI NON È

### Struttura e funzione

Auto-selezione. Chi si riconosce nella lista "per chi è" ha già deciso. La lista "NON è per te" riduce i rimborsi e rafforza la decisione degli altri (esclusione = desiderabilità). Filtra il pubblico ampio del webinar verso chi è realmente in target.

### Copy

**[Headline sezione]**

```
Questo corso è per te? Scoprilo in 30 secondi.
```

**[Per chi È]**

```
✓ Sei un professionista che vuole usare l'AI nel lavoro 
  quotidiano, ma non sa da dove partire davvero

✓ Hai provato ChatGPT o Claude e hai pensato "bah, 
  niente di speciale" — perché nessuno ti ha mostrato 
  il Livello 2, 3 e 4

✓ Vedi colleghi e competitor ottenere risultati con l'AI 
  e vuoi capire come fanno

✓ Non sei tecnico e non vuoi diventarlo — vuoi un metodo 
  pratico, non un corso di programmazione

✓ Sei un imprenditore, freelance o manager che vuole 
  risparmiare ore ogni settimana su task ripetitivi

✓ Vuoi smettere di navigare tra tutorial YouTube 
  e prompt copiati da Twitter senza costruire nulla 
  di strutturato
```

**[Per chi NON è]**

```
✗ Cerchi un corso su "l'AI in generale" — questo è 
  verticale su Claude. Il 70% si applica ovunque, 
  ma il focus è uno strumento, un metodo.

✗ Sei già al Livello 4-5 (hai Projects configurati, 
  usi skill personalizzate, hai un workflow quotidiano 
  strutturato) — il corso base non aggiunge abbastanza. 
  Guarda il bootcamp.

✗ Vuoi risultati senza fare nulla — il corso richiede 
  4-5 ore di impegno e la volontà di applicare. 
  Non è una pillola magica.

✗ Pensi che l'AI sia una moda che passerà — questo 
  corso non è per te. È per chi ha capito che il mondo 
  è cambiato e vuole stare dalla parte giusta.
```

### Elementi visivi

- **Layout:** Due colonne su desktop. "Per chi è" a sinistra, "Per chi NON è" a destra. Mobile: una sotto l'altra.

- **Colonna "Per chi è":**
  - Sfondo: #0F0E1A
  - Bordo superiore: 3px arancione (#EB7A2E)
  - Check mark (✓) in arancione per ogni item
  - Spazio generoso tra item (24px)

- **Colonna "Per chi NON è":**
  - Sfondo: #0F0E1A (identico)
  - Bordo superiore: 3px rosso scuro (#8B2500, non rosso pieno — siamo su dark theme)
  - X mark (✗) in rosso scuro per ogni item
  - Stesso spacing

- **Il contrasto cromatico** arancione (sì) vs rosso scuro (no) guida l'occhio. Chi si riconosce a sinistra si sente confermato. Chi si riconosce a destra si auto-esclude.

- **Nessuna immagine.** Il visual è nella struttura stessa.

---
---

## BLOCCO 8 — COMPARISON TABLE

### Struttura e funzione

Posizionamento competitivo visivo. Differenzia il corso dalle due alternative che il prospect sta considerando: imparare da solo (YouTube/tutorial) e i corsi AI generici. Il colpo decisivo è la riga "Costo reale" dove il tempo del prospect diventa una valuta. Ispirato dalla sezione comparison della pagina bootcamp v2 (YouTube vs Videocorsi vs Bootcamp).

### Copy

**[Headline sezione]**

```
Imparare da solo vs. Corso generico AI vs. Corso Claude Morfeus.
```

**[Tabella]**

```
                          DA SOLO          CORSO GENERICO     CORSO CLAUDE
                          (YouTube +       AI                 MORFEUS
                          tutorial)                                

Tempo per risultati       6-12 mesi        4-6 settimane      1 settimana

Struttura e ordine        Nessuno.         Generica.          Percorso in 
                          Salti da un      Copre tutto         10 moduli con 
                          video all'altro  e niente            ordine preciso

Focus                     Sparso su        "AI" in generale   Verticale Claude.
                          10 tool diversi                      Un metodo, uno 
                                                              strumento

Parte dal mindset?        No               Raramente          Sì. Modulo 0: 
                                                              come ragionare 
                                                              con l'AI

Personalizzazione         Nessuna          Template            Il TUO Claude, 
                                           generici            configurato per 
                                                              il TUO lavoro

Supporto                  Nessuno          Community           4 live settimanali
                                           generica            con i founder

Costo reale               "Gratis" +       100-500€            67€ early bird.
                          150-300h del     + tempo per          4-5h totali.
                          tuo tempo        filtrare             Applicabile 
                                           il contenuto         subito.
                                           utile               

Garanzia                  —                Variabile           14 giorni. 
                                                              Nessuna domanda.

Aggiornamenti             Devi cercarli    Dipende             Inclusi. Il corso 
                          tu ogni volta                        evolve con Claude.
```

**[Chiusura]**

```
Il tuo tempo vale più di 15€ all'ora? 
Allora il corso si ripaga prima di YouTube.
```

### Elementi visivi

- **Tabella con 3 colonne.** Trattamento forte sulla terza:
  - **Colonne 1-2 (Da solo, Corso generico):** sfondo scuro neutro (#0B0B0C), testo grigio chiaro (#B0B0B0).
  - **Colonna 3 (Corso Claude Morfeus):** sfondo leggermente più chiaro (#1A1535), bordo arancione completo (top + sides + bottom, 2px), header con sfondo arancione pieno (#EB7A2E) e testo bianco. È la colonna evidenziata — l'occhio va lì prima.
  - **Riga "Costo reale":** sfondo di tutta la riga leggermente diverso (#0F0E1A) per evidenziare il punto decisivo.

- **Mobile:** NON comprimere la tabella. Trasformare in 3 card impilate, ciascuna con il nome dell'opzione come header e i criteri come lista interna. La card "Corso Claude Morfeus" con bordo arancione pieno.

- **Chiusura:** Testo centrato, sotto la tabella. "15€" in Clash Display. Frase in Satoshi.

---
---

## BLOCCO 9 — OFFERTA: STACK + PREZZO

### Struttura e funzione

Il momento teatrale della pagina. Reveal Hormozi: costruisci il valore con lo stack, poi riveli il prezzo. Il prospect deve pensare "solo 67€?!" prima ancora di leggere la cifra. Tecnica: valore dichiarato crescente → totale → prezzo reale drammaticamente più basso. Scala prezzo visiva per urgenza.

### Copy

**[Headline sezione]**

```
Ecco cosa ottieni. E quanto costa davvero.
```

*"davvero" in Playfair Display Italic arancione.*

**[Stack item 1]**

```
IL CORSO COMPLETO
10 moduli, ~48 lezioni, ~4-5 ore di contenuto pratico.
Dal mindset al sistema personalizzato.
Valore: 297€
```

**[Stack item 2]**

```
4 LIVE SETTIMANALI CON I FOUNDER
Sessioni dal vivo dove fai domande, lavori con noi, 
vedi demo in tempo reale. Non sei solo.
Valore: 197€
```

**[Stack item 3]**

```
PACCHETTO SKILL E PLUGIN CURATO
Strumenti pre-costruiti che installi in 1 click. 
Funzionano subito per i task più comuni.
Valore: 97€
```

**[Stack item 4]**

```
AGGIORNAMENTI FUTURI INCLUSI
Claude evolve. Il corso evolve con lui. 
Non diventa obsoleto tra 3 mesi.
Valore: non quantificabile
```

**[Valore totale]**

```
Valore totale: 591€
```

**[Reveal prezzo]**

```
Il tuo investimento oggi:

67€

Sessantasette euro.

Meno di una cena fuori. 
Meno di un'ora di consulenza con un esperto AI.
Per un sistema che ti restituisce 5-8 ore ogni settimana.
```

**[Scala prezzo visiva]**

```
  67€              97€              147€
  EARLY BIRD       STANDARD         PREZZO PIENO
  (prossime 24h)   (giorni 2-7)     (dal 13 maggio)
  
  ▲ Sei qui
```

**[CTA — bottone arancione pieno, grande]**

```
Entra nel corso a 67€ — Prezzo early bird
```

**[Micro-copy]**

```
Pagamento sicuro · Accesso immediato · Garanzia 14 giorni
```

**[Credito upgrade]**

```
Se dopo il corso vuoi fare il Bootcamp AI Champion, 
il costo del corso ti viene rimborsato come credito. 
Non perdi nulla.
```

### Elementi visivi

- **Stack cards:** Ogni componente come card separata.
  - Sfondo: #0F0E1A, border-radius 12px, padding 24px.
  - Icona a sinistra (lineare, arancione, 24px).
  - Titolo in Clash Display bianco.
  - Descrizione in Satoshi grigio chiaro.
  - **Valore dichiarato allineato a destra**, Clash Display arancione. Quando si arriva al reveal, i valori vengono barrati (strikethrough) visivamente.

- **Il reveal del prezzo — il momento centrale della pagina:**
  - "Valore totale: 591€" con riga barrata (strikethrough), grigio.
  - **Spazio vuoto** (40-60px di respiro).
  - **"67€"** — ENORME. Clash Display, 80-120px, arancione (#EB7A2E), centrato. Leggero glow/shadow arancione (box-shadow: 0 0 40px rgba(235,122,46,0.15)). È il numero più grande dell'intera pagina.
  - Sotto: "Sessantasette euro." in Satoshi, grigio chiaro, come conferma incredula.

- **Scala prezzo visiva:** Barra orizzontale (progress bar style).
  - Tre marcatori: 67€, 97€, 147€.
  - Marcatore 67€: pallino arancione pieno, label "SEI QUI" con freccia animata o evidenziata.
  - Marcatori 97€ e 147€: pallini vuoti, grigio.
  - Gradiente tra 67€ e 97€: arancione → grigio. Comunica "il tempo sta scorrendo".

- **CTA:** Bottone pieno arancione, grande, full-width su mobile. Stesso stile dell'hero ma più grande — è la CTA principale della pagina.

- **Box credito upgrade:** Separato, con bordo sottile grigio, sfondo neutro. Discreto — non compete con la CTA. Icona piccola (freccia circolare o badge "credito") a sinistra del testo.

---
---

## BLOCCO 10 — GARANZIA

### Struttura e funzione

Risk reversal offensivo. La garanzia non è una nota legale — è una leva di vendita. Tecnica Hormozi: più è forte la garanzia, più è forte la fiducia nel prodotto. "L'unico rischio è non provare" = inversione psicologica completa.

### Copy

**[Titolo]**

```
GARANZIA "PROVA TUTTO" — 14 GIORNI
```

**[Body]**

```
Non ti chiediamo di fidarti di noi.
Ti chiediamo di provare.

Accedi al corso. Guarda le lezioni. 
Applica il metodo al tuo lavoro.

Se dopo 14 giorni non ha cambiato il modo in cui 
lavori con l'AI, ti rimborsiamo. Intero importo. 
Nessuna domanda. Nessuna burocrazia.

Perché offriamo questa garanzia? 
Perché sappiamo che funziona.

Abbiamo formato 2.000+ professionisti. 
Il tasso di rimborso è sotto il 3%.
Chi chiede il rimborso non era il cliente giusto 
— e va bene così.

L'unico rischio reale è non provare.
```

### Elementi visivi

- **Box garanzia:** Sfondo #1A1535, bordo arancione 2px, border-radius 16px, padding generoso (40px).

- **Badge garanzia:** A sinistra del testo (desktop) o centrato sopra (mobile).
  - Opzione A: Cerchio con bordo arancione (2px), icona scudo + check mark al centro, testo circolare "GARANZIA 14 GIORNI". Stile pulito, non troppo corporate.
  - Opzione B (più elegante): **"14" enorme** in Clash Display arancione, opacity 15%, come watermark dietro il testo. Nessun badge — il numero stesso comunica sicurezza.
  - Raccomando opzione B per coerenza con il design system (tipografia > illustrazione).

- **Ultima riga** ("L'unico rischio reale è non provare"): in Playfair Display Italic arancione. È il punch finale. Isolata, con spazio sopra (24px).

---
---

## BLOCCO 11 — FAQ / OBIEZIONI

### Struttura e funzione

Smonta i blocchi finali dei quasi-buyer. Tecnica Kennedy: ogni obiezione non gestita è una vendita persa. Framework Voss adattato per ogni risposta: valida → reframi → prova → ponte verso l'azione. 8 FAQ sulle obiezioni più frequenti dall'armamentario. La prima (tempo) aperta di default.

### Copy

**[Headline sezione]**

```
Le domande che ti stai facendo.
```

**[FAQ 1 — aperta di default]**

```
D: "Non ho tempo di seguire un altro corso."

R: Capisco. Se lavori 8-10 ore al giorno, l'ultima cosa 
che vuoi è un altro impegno.

Ma ecco il paradosso: le 4-5 ore che investi nel corso 
te ne restituiscono 5-8 OGNI SETTIMANA.

Non è tempo in più. È l'investimento che ti libera tempo. 
Lezioni da 10-15 minuti, guardabili quando vuoi, 
applicabili subito. Non è un master — è un toolkit.
```

**[FAQ 2]**

```
D: "Ho già provato ChatGPT/Claude e non mi ha impressionato."

R: Corretto. Se hai fatto domande e hai ottenuto risposte 
generiche, il tuo giudizio è giusto. Quelle risposte 
SONO generiche.

Ma quello era il Livello 1 — domanda/risposta. 
Come giudicare Excel dopo aver fatto solo una somma. 
Il 95% non supera mai il Livello 1 perché nessuno 
gli ha mostrato che il 2, 3 e 4 esistono.

A Livello 4, Claude non ti dà risposte. 
Lavora CON te. Il corso ti porta lì.
```

**[FAQ 3]**

```
D: "Non sono tecnico."

R: L'85% dei nostri studenti non ha alcun background tecnico.

Abbiamo formato commercialisti, avvocati, marketer, 
HR manager, imprenditori. Nessuno era "tecnico".

Se sai usare email e WhatsApp, sai usare Claude. 
Il Modulo 0 si chiama "Come ragionare con l'AI". 
Non "Come programmare l'AI".
```

**[FAQ 4]**

```
D: "L'AI cambia troppo velocemente, tra 3 mesi è tutto diverso."

R: Se questo fosse un corso su UN tool specifico, 
avresti ragione.

Ma questo corso insegna il METODO. Come pensare, 
come strutturare, come costruire sistemi con l'AI.

I tool cambiano. Il metodo resta. 
Noi usiamo l'AI dal 2021. I tool sono cambiati 
5 volte. Il nostro metodo funziona ancora.

Più aspetti, più il gap si allarga. 
Chi inizia oggi ha un vantaggio su chi inizia a ottobre.
```

**[FAQ 5]**

```
D: "Perché Claude e non ChatGPT?"

R: Il corso insegna un metodo che funziona con qualsiasi AI.
Ma usa Claude come strumento primario per un motivo: 
è il più adatto al lavoro professionale strutturato.

Projects, CoWork, Skills, Connettori — funzionalità 
che gli altri non hanno allo stesso livello.

Il 70% di quello che impari si applica ovunque. 
Stai imparando a guidare, non a usare una macchina 
specifica.
```

**[FAQ 6]**

```
D: "Il prezzo sale davvero?"

R: Sì. Non è una finta scadenza.

67€ per le prime 24 ore dopo il webinar.
97€ dal giorno 2 al giorno 7.
147�� dal 13 maggio, per sempre.

Il contenuto non cambierà. Il prezzo sì.
```

**[FAQ 7]**

```
D: "E se poi voglio fare il bootcamp?"

R: Il costo del corso ti viene rimborsato come credito 
sull'iscrizione al Bootcamp AI Champion.

Non perdi nulla. Il corso è il primo step. 
Il bootcamp è il secondo, per chi vuole andare oltre.
```

**[FAQ 8]**

```
D: "Ho bisogno del piano a pagamento di Claude?"

R: Puoi iniziare con il piano gratuito.

Per le funzionalità avanzate (Projects, CoWork) 
serve il Pro: 18€/mese. Meno di un pranzo fuori, 
per uno strumento che ti risparmia 5+ ore a settimana.

Tutti i nostri studenti hanno il Pro. 
Nessuno l'ha mai cancellato dopo il corso.
```

**[FAQ 9 — SOLO VARIANTE C (src=email)]**

```
D: "Non ho visto il webinar. Mi perdo qualcosa?"

R: No. Il webinar era una demo dal vivo del metodo.

Tutto quello che è stato mostrato nel webinar è insegnato 
nel corso — in modo più approfondito, strutturato 
e replicabile.

Il webinar ti fa dire "wow". 
Il corso ti fa dire "adesso so farlo".

Non ti perdi nulla. Anzi: il corso è più completo.
```

*Nota implementazione: Questa FAQ viene mostrata solo quando `src=email`. Per le varianti live e replay è nascosta (display:none).*

### Elementi visivi

- **Formato accordion:** Click/tap per espandere. Nessun visual complesso.
  - Domanda in Clash Display 600, bianco.
  - Risposta in Satoshi 400, grigio chiaro.
  - Bordo inferiore sottile (1px, #2A2A2A) tra le FAQ.
  - Icona + / × a destra della domanda, arancione. Il + ruota a × quando aperta. Transizione smooth (200ms).

- **FAQ 1 aperta di default** (tempo = obiezione #1). Le altre chiuse.

- **Su mobile:** Tutte chiuse, tap per espandere. Una sola aperta alla volta (le altre si chiudono quando ne apri una).

- **Nessuna immagine, nessuna icona per FAQ.** Il formato accordion è il visual. Pulito, leggibile, funzionale.

---
---

## BLOCCO 12 — URGENZA + SCARSITÀ

### Struttura e funzione

Urgenza reale, non artificiale. Il timer countdown è il visual dominante. Il framing cambia per variante: chi ha visto il live ha urgenza da "esclusività partecipanti", chi ha visto il replay ha urgenza da deadline, chi viene da email ha urgenza da "costo dell'attesa".

---

### Copy — VARIANTE A (src=live)

Urgenza massima. Ha appena visto il webinar. Il prezzo è riservato a chi era presente.

**[Headline sezione]**

```
Questo prezzo esiste solo per chi era al webinar.
```

**[Timer countdown]**

```
IL PREZZO ESCLUSIVO SCADE TRA:

[  HH  :  MM  :  SS  ]
```

**[Body]**

```
67€. Solo per le prossime [X ore].
Poi sale a 97€. E dopo 7 giorni, a 147€. Per sempre.

Non tornerà a questo prezzo. Non ci sarà un'altra 
occasione identica.

Eri presente. Hai visto il metodo. Sai che funziona.
L'unica domanda è: agisci adesso o paghi di più dopo?
```

**[CTA]**

```
Blocca il prezzo a 67€ — Entra adesso
```

---

### Copy — VARIANTE B (src=replay)

Urgenza da deadline. Ha visto il replay, sa cosa contiene il corso.

**[Headline sezione]**

```
Il prezzo di oggi è il più basso che vedrai mai.
```

**[Timer countdown]**

```
IL PREZZO EARLY BIRD SCADE TRA:

[  HH  :  MM  :  SS  ]
```

**[Body]**

```
Tra [X ore], il prezzo sale da 67€ a 97€.
Dopo 7 giorni, sale a 147€. Per sempre.

Non è una strategia di marketing. 
È il prezzo del webinar: riservato a chi ha partecipato 
e decide di agire.

Tre cose che non cambieranno dopo la scadenza:
— Il corso resta lo stesso
— La garanzia resta 14 giorni
— La qualità resta identica

L'unica cosa che cambia è il prezzo.

Ogni settimana di attesa sono 5-8 ore perse 
e un prezzo più alto.
```

**[CTA]**

```
Blocca il prezzo a 67€ — Entra adesso
```

---

### Copy — VARIANTE C (src=email)

Urgenza da costo dell'attesa. Non ha visto il webinar, quindi l'urgenza non è "esclusività" ma "ogni giorno che aspetti perdi ore e paghi di più".

**[Headline sezione]**

```
Ogni settimana che aspetti, perdi 5-8 ore. 
E il prezzo sale.
```

**[Timer countdown]**

```
IL PREZZO DI LANCIO SCADE TRA:

[  HH  :  MM  :  SS  ]
```

**[Body]**

```
Il corso è appena uscito. Il prezzo di lancio 
è il più basso che ci sarà mai:

67€ — adesso.
97€ — tra pochi giorni.
147€ — prezzo pieno, per sempre.

Il contenuto non cambierà. La garanzia 14 giorni 
resta identica. L'unica cosa che cambia è quanto paghi.

Ma il prezzo non è l'urgenza vera.

L'urgenza vera è che ogni settimana senza un sistema 
sono 5-8 ore buttate in task che l'AI potrebbe fare 
per te. A 25€/ora, sono 500-800€ al mese di tempo perso.

Il corso costa meno di una settimana di ritardo.
```

**[CTA]**

```
Entra nel corso a 67€ — Prezzo di lancio
```

---

### Elementi visivi (tutte le varianti)

- **Timer countdown — il visual dominante della sezione:**
  - Quattro box affiancati (Ore, Minuti, Secondi — oppure Giorni se >24h).
  - Ogni box: sfondo #1A1535, bordo arancione 1px, border-radius 8px, padding 16px.
  - Numeri in Clash Display arancione, 48-64px.
  - Label sotto ogni box ("Ore", "Min", "Sec") in Satoshi, grigio, piccolo (12px).
  - Leggero glow arancione dietro i box (box-shadow: 0 0 30px rgba(235,122,46,0.15)).
  - Centrato. È l'elemento più visibile della sezione.

- **CTA:** Subito dopo il body, senza spazio. Stesso stile bottone arancione pieno.

- **Nessuna immagine.** Il timer è il visual.

---
---

## BLOCCO 13 — CTA FINALE + RECAP

### Struttura e funzione

Chiusura dell'arco narrativo. Il recap dello stack è identico per tutti. Cambiano: la frase di apertura (collega al percorso del visitatore), il copy CTA, e la frase di chiusura.

---

### Copy — VARIANTE A (src=live)

Chiusura diretta. Richiama il live e chiude con forza.

**[Headline sezione]**

```
Eri al webinar. Hai visto tutto. Adesso decidi.
```

**[Recap]**

```
Stai per ottenere:

→ 10 moduli, 48 lezioni, ~4-5 ore di contenuto pratico
→ Il metodo dal mindset al sistema personalizzato
→ 4 live settimanali con i founder
�� Pacchetto skill e plugin pronto all'uso
→ Aggiornamenti inclusi per sempre
→ Garanzia 14 giorni, nessuna domanda

Valore: 591€
Il tuo prezzo oggi: 67€

Se dopo il corso vuoi fare il bootcamp, 
il costo del corso è un credito.
```

**[CTA finale]**

```
Sì, voglio padroneggiare Claude — Entra a 67€
```

**[Micro-copy]**

```
Pagamento sicuro · Accesso immediato · 14 giorni di garanzia
Prezzo esclusivo partecipanti live: ancora per [TIMER]
```

**[Frase di chiusura]**

```
Il 95% tornerà a usare Claude come prima.
Tu hai visto che c'è un altro modo. Agisci.
```

*"Agisci" in Playfair Display Italic arancione.*

---

### Copy — VARIANTE B (src=replay)

Chiusura con frame della scelta.

**[Headline sezione]**

```
Ricapitoliamo.
```

**[Recap]**

```
Stai per ottenere:

→ 10 moduli, 48 lezioni, ~4-5 ore di contenuto pratico
→ Il metodo dal mindset al sistema personalizzato
→ 4 live settimanali con i founder
→ Pacchetto skill e plugin pronto all'uso
→ Aggiornamenti inclusi per sempre
→ Garanzia 14 giorni, nessuna domanda

Valore: 591€
Il tuo prezzo oggi: 67€

Se dopo il corso vuoi fare il bootcamp, 
il costo del corso è un credito.
```

**[CTA finale]**

```
Sì, voglio padroneggiare Claude — Entra a 67€
```

**[Micro-copy]**

```
Pagamento sicuro · Accesso immediato · 14 giorni di garanzia
Prezzo early bird valido ancora per [TIMER]
```

**[Frase di chiusura]**

```
Il 95% continuerà a usare Claude al 10%.
Tu puoi scegliere di non essere tra quelli.
```

*"scegliere" in Playfair Display Italic arancione.*

---

### Copy — VARIANTE C (src=email)

Chiusura che sintetizza l'intera proposta per chi non ha contesto dal webinar.

**[Headline sezione]**

```
Tutto quello che ottieni. In sintesi.
```

**[Recap]**

```
Stai per ottenere:

→ 10 moduli, 48 lezioni, ~4-5 ore di contenuto pratico
→ Il metodo dal mindset al sistema personalizzato
→ 4 live settimanali con i founder
→ Pacchetto skill e plugin pronto all'uso
→ Aggiornamenti inclusi per sempre
→ Garanzia 14 giorni, nessuna domanda

Valore: 591€
Il tuo prezzo oggi: 67€

Se dopo il corso vuoi fare il bootcamp, 
il costo del corso è un credito.
```

**[CTA finale]**

```
Voglio imparare a usare Claude davvero — Entra a 67€
```

**[Micro-copy]**

```
Pagamento sicuro · Accesso immediato · 14 giorni di garanzia
Prezzo di lancio: ancora per [TIMER]
```

**[Frase di chiusura]**

```
Il 95% usa Claude come Google. 
Il restante 5% ha un sistema.
Questo corso è il sistema.
```

*"il sistema" in Playfair Display Italic arancione.*

---

### Elementi visivi (tutte le varianti)

- **Recap con frecce arancioni (→):** Ogni riga un elemento. Frecce animate opzionali (fade-in sequenziale al scroll).

- **Prezzo "67€":** Clash Display arancione, grande (64-80px), centrato. Replica il reveal del blocco 9 in versione compatta.

- **CTA:** Bottone full-width su mobile. Stesso stile hero e blocco 9. Micro-animazione hover (scale 1.02, 150ms).

- **Timer mini:** Formato inline nel micro-copy. Testo dinamico per variante (partecipanti live / early bird / lancio).

- **Frase di chiusura:** Isolata, centrata, con spazio generoso sopra (60px). Parola chiave in Playfair Italic arancione. È l'ultima cosa che il prospect legge.

- **Nessuna immagine.** La chiusura è tipografica.

---
---

## BLOCCO 14 — SEZIONE B2B

### Struttura e funzione

Lead generation aziende. Non è una mini-sales page B2B — è un invito. 3-4 righe, CTA verso chiamata commerciale. Separata visivamente dal resto per comunicare "questo è un altro percorso" senza interrompere il flusso di acquisto del corso.

### Copy

**[Headline]**

```
Hai un'azienda? Vuoi formare il tuo team?
```

**[Body]**

```
Abbiamo formato team in Enel, Sisal, BNP Paribas, Zara 
e decine di altre aziende.

Se vuoi portare Claude nel tuo team con un percorso 
personalizzato, parliamone.
```

**[CTA — bottone outline arancione]**

```
Prenota una chiamata commerciale →
```

### Elementi visivi

- **Divider** sopra la sezione: linea sottile (1px, #2A2A2A). Crea separazione netta dal flusso principale.
- **Stile:** Più leggero del resto della pagina. Meno padding (40-60px vs 80-120px delle altre sezioni).
- **CTA:** Bottone **outline** (non pieno) arancione. Differenzia dalla CTA principale (che è piena). Border 2px, testo arancione, sfondo trasparente.
- **Link:** Calendly o form contatto.
- **Nessuna immagine, nessun logo qui.** I loghi sono già nel blocco 6. Ripeterli è ridondante.

---
---

## RIEPILOGO VISUAL ASSETS NECESSARI

| # | Asset | Tipo | Priorità | Note |
|---|---|---|---|---|
| 1 | Icone 10 moduli | Icone lineari custom (10 pz) | Alta | Stile Morfeus, line-weight 1.5px, arancione. Se non custom, solo numeri grandi. |
| 2 | Icone 3 step meccanismo | Icone lineari (3 pz) | Media | Cervello, ingranaggi, bussola |
| 3 | Loghi partner | Monocromatici bianchi (5 pz) | Alta | HFarm, TG, Sole24Ore, Confcommercio, Asseprim |
| 4 | Foto founder | 1 foto Matt + Alex | Media-Alta | Naturale, non corporate. Se non di qualità, skip. |
| 5 | Foto testimonial | 2-3 foto persone reali | Alta | Round crop 60px, bordo arancione 2px |
| 6 | Testimonianze testo | 2-3 citazioni con risultato | Alta | Nome, ruolo, azienda, frase specifica |
| 7 | Timer countdown | Componente JS | Alta | Collegato a deadline reale post-webinar |
| 8 | Scala prezzo | Progress bar custom | Media | 3 marcatori (67/97/147) con indicatore "sei qui" |

### Cosa NON mettere nella pagina

- Nessuna immagine stock (persone al computer, uffici, grafici generici)
- Nessun mockup finto dell'interfaccia del corso (è in pre-vendita)
- Nessuna illustrazione generativa AI-style
- Nessuna gif animata
- Nessuna hero image
- Nessun video embed nell'hero (il webinar è il video — qui si compra)

### Principio visivo

La pagina è dark, tipografica, con accenti arancione. I numeri sono i visual. Le card sono la struttura. Il timer è il movimento. Meno immagini = più impatto. Ogni elemento visivo ha una funzione di conversione. Se non converte, non c'è.

---
---

## IMPLEMENTAZIONE TECNICA — PERSONALIZZAZIONE DINAMICA

### Architettura

Un singolo file HTML. Zero server-side. Il JavaScript legge il parametro `src` dall'URL e mostra/nasconde i blocchi con attributi `data-variant`.

### Struttura HTML

```html
<!-- Ogni blocco variante ha un data-attribute -->
<div class="hero-section" data-variant="live">
  <!-- Copy variante A -->
</div>
<div class="hero-section" data-variant="replay">
  <!-- Copy variante B -->
</div>
<div class="hero-section" data-variant="email">
  <!-- Copy variante C -->
</div>

<!-- I blocchi statici non hanno data-variant -->
<div class="mechanism-section">
  <!-- Copy identico per tutti -->
</div>
```

### JavaScript

```javascript
(function() {
  const params = new URLSearchParams(window.location.search);
  const src = params.get('src') || 'replay'; // fallback = replay
  
  // Nascondi tutte le varianti
  document.querySelectorAll('[data-variant]').forEach(el => {
    el.style.display = 'none';
  });
  
  // Mostra solo la variante corretta
  document.querySelectorAll(`[data-variant="${src}"]`).forEach(el => {
    el.style.display = '';
  });
})();
```

### URL da generare

| Dove si usa | URL |
|---|---|
| Link in chat YouTube (durante il live) | `salespage.morfeushub.com/corso-claude?src=live` |
| Link nella pagina replay | `salespage.morfeushub.com/corso-claude?src=replay` |
| Link nelle email di replay | `salespage.morfeushub.com/corso-claude?src=replay` |
| Link nelle email alla lista (no webinar) | `salespage.morfeushub.com/corso-claude?src=email` |
| Link da post social / organic | `salespage.morfeushub.com/corso-claude?src=email` |
| Nessun parametro (fallback) | Mostra variante REPLAY |

### Testing

Prima del lancio, verificare tutte e tre le varianti:
1. Aprire `?src=live` — controllare hero, bridge, problema compresso, urgenza esclusiva, CTA finale live
2. Aprire `?src=replay` — controllare hero, bridge, problema medio, urgenza standard, CTA finale replay
3. Aprire `?src=email` — controllare hero, value prop intro, problema esteso con 5 livelli, FAQ 9 visibile, urgenza da costo attesa, CTA finale email
4. Aprire senza parametri — deve mostrare variante replay
5. Mobile test per tutte e tre

### Metriche da tracciare (per variante)

- **Conversion rate** per `src` (GA4 o Stripe metadata)
- **Scroll depth** per `src` (la variante email è più lunga — verificare che arrivi alla CTA)
- **Time on page** per `src`
- **Click-through rate** sulle CTA distribuite (blocchi 1, 9, 12, 13)

Questo permette di capire quale variante converte di più e ottimizzare per il ciclo evergreen.
