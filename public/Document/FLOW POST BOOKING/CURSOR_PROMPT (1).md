# CURSOR PROMPT — Morfeus Funnel Pre-Call

Copia e incolla questo prompt in Cursor per costruire tutte le pagine del funnel.

---

## PROMPT DA DARE A CURSOR

```
Devi costruire le pagine web del funnel pre-call di Morfeus nel sito Next.js esistente.

Leggi prima di tutto il file CURSOR_BRIEF.md nella root di questa cartella. 
Contiene le specifiche tecniche complete: pagine da costruire, struttura sezioni, 
copy di ogni elemento, logica condizionale, parametri URL, comportamento del form. 
È la tua fonte di verità per tutta la build.

Istruzioni operative:

1. STILE
   Non creare nessun nuovo sistema di stile. Usa esattamente i componenti, 
   le variabili CSS e il design system già presenti nel progetto.
   Riferisciti ai file di stile esistenti per colori, font, spaziature, 
   border-radius, animazioni.

2. ORDINE DI COSTRUZIONE
   Inizia dalla Thank You Page (/it/call-confermata).
   Poi costruisci la pagina caso studio Sales (/it/casi-studio/sales).
   Usala come template per le altre quattro pagine caso studio — 
   stessa struttura, contenuto diverso secondo CURSOR_BRIEF.md §4.3.

3. THANK YOU PAGE — punti critici
   - La headline è dinamica: legge il parametro URL ?name e lo inserisce nel testo
   - Il video mostrato dipende da ?source (linkedin → video A, cold_email → video B)
   - Il form ha due stati: Stato A (default) e Stato B (se ?form=complete o dopo submit)
   - Il passaggio da Stato A a Stato B avviene senza reload pagina
   - I placeholder video e l'endpoint del form sono definiti come costanti 
     configurabili in cima al file — non hardcodati nel JSX
   - Tutti i parametri URL sono opzionali: la pagina funziona anche senza

4. PAGINE CASO STUDIO — punti critici
   - Struttura identica per tutte e 5 le pagine: 6 sezioni (Hero, Problema, 
     Intervento, Risultati, Citazione, CTA Tripla)
   - Il video è un embed placeholder nella sezione Hero
   - Le metriche nella sezione Risultati hanno un formato visivo specifico:
     [label bold]  [valore prima] → [valore dopo in Majorelle bold]  (timeframe in corsivo)
   - La CTA Tripla è uguale su tutte e 5 le pagine: newsletter + webinar + LinkedIn
   - Tutte le pagine hanno meta tag noindex, nofollow

5. COSA NON FARE
   - Non aggiungere footer (non previsto su queste pagine)
   - Non modificare la nav esistente
   - Non creare nuovi componenti di stile non presenti nel design system
   - Non hardcodare URL di video o endpoint API — usare costanti configurabili
   - Non inventare copy: tutto il copy è nel CURSOR_BRIEF.md

6. PLACEHOLDER
   Dove il CURSOR_BRIEF indica [PLACEHOLDER_*], lasciare una costante 
   con nome descrittivo in cima al file, commentata con "// TODO: sostituire con URL reale"

Inizia con la Thank You Page. Quando hai finito mostrami il risultato 
e aspetta conferma prima di procedere con le pagine caso studio.
```

---

## NOTE PER MATT

**Cosa caricare nella cartella prima di dare il prompt:**
- `CURSOR_BRIEF.md` (questo file)
- Accesso al progetto Next.js esistente (Cursor lo vede già se è aperto nel workspace)

**I DOCX dei case study e del copy non servono a Cursor** — tutto il copy necessario 
è già estratto e inserito nel CURSOR_BRIEF.md in formato machine-readable.
I DOCX restano come fonte di verità per te, non per Cursor.

**Dopo la build, le cose da fare manualmente:**
1. Inserire URL video Loom (due varianti: LinkedIn e cold email) al posto di `PLACEHOLDER_VIDEO_LINKEDIN` e `PLACEHOLDER_VIDEO_COLDEMAIL`
2. Inserire URL webinar al posto di `PLACEHOLDER_WEBINAR_URL`
3. Inserire endpoint MARF al posto di `ENDPOINT_MARF_PLACEHOLDER`
4. Inserire i PNG white dei loghi clienti nella sezione credibilità della Thank You Page
5. Testare il flusso completo con parametri URL reali

**Se Cursor fa assunzioni sbagliate:**
Rimandalo al CURSOR_BRIEF.md con: "Rileggi la sezione [X] del CURSOR_BRIEF.md 
e correggi secondo quelle specifiche."
