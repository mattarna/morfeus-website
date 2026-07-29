# Playground · passaggio di consegne

**Aggiornato:** 2026-07-29, 16:40
**Branch:** `exp/playground-2026` (worktree `C:\Users\Matteo\mf-playground`, aperto da `main`, Next 16)
**Mai pushato.** Nessun remote.

---

## ⚠️ La cosa da leggere per prima

Due sessioni hanno lavorato sullo stesso worktree in contemporanea e si
sono sovrascritte a vicenda. Nessuna riga è andata persa, verificato
confrontando i selettori uno per uno, ma **una modifica è ferma a metà**:

> La passata responsive è nel prototipo HTML **ma non** in
> `playground.css`. Ogni volta che la rigenero, entro un minuto il file
> torna alla versione precedente.

Chi riprende in mano il playground deve, come prima cosa, rigenerare
`playground.css` dal prototipo (vedi *La pipeline* qui sotto) e
verificare che contenga `pointer:coarse`. Se non c'è, la passata
responsive non è attiva.

---

## La pipeline: due file sono GENERATI, non scritti a mano

La fonte di verità della landing è il **prototipo HTML**:

```
C:\Users\Matteo\Desktop\CLAUDE\01_MORFEUS\06_PROJECTS\INFOBUSINESS\
  05_FUNNEL\prototipo\landing-community_v2.html
```

Da lì si generano due file. **Modificarli a mano si perde al primo
rigenero:**

| File generato | Da cosa | Come |
| --- | --- | --- |
| `playground.css` | il `<style>` del prototipo | `estrai_css.py`, che scoperchia tutto sotto `.pg26` |
| il corpo di `PlaygroundLanding.tsx` | il `<body>` del prototipo | `html2jsx.py`, conversione meccanica HTML → JSX |

Di `PlaygroundLanding.tsx` **non** sono generati la testa (import, stato,
`onCollaudo`) e la coda (dove si monta `<Collaudo />`): quelle si
scrivono a mano e sopravvivono al rigenero. Il taglio è alla riga
`<div className="pg26">` e all'ancora `{collaudoAperto ?`.

Gli script stanno nella cartella di lavoro temporanea della sessione che
li ha scritti. **Se servono e non ci sono più, si riscrivono: sono un
centinaio di righe di Python ciascuno.**

---

## Chi tocca cosa (proposta, da confermare)

| Zona | Di chi |
| --- | --- |
| il prototipo HTML | sessione **landing** |
| `playground.css` (generato) | sessione **landing** |
| il corpo di `PlaygroundLanding.tsx` (generato) | sessione **landing** |
| testa e coda di `PlaygroundLanding.tsx` | **condivise**, si toccano poco |
| tutto sotto `collaudo/` | sessione **collaudo** |
| `src/app/playground/*`, `src/proxy.ts` | sessione **landing** |

---

## Cos'è stato fatto sulla landing (14 commit)

### Infrastruttura

- **Rotta** `/playground`, fuori da `[locale]`: la pagina è solo in
  italiano e il routing next-intl le appiccicherebbe un `/it/` che sul
  sottodominio non vuol dire niente.
- **Sottodominio** `playground.morfeushub.com`, già attivo su Vercel e
  con il DNS a posto (CNAME in SiteGround, che è dove sta la zona: il
  dominio è registrato su GoDaddy ma i nameserver sono SiteGround).
  `src/proxy.ts` riscrive quell'host sotto `/playground`; sul dominio
  principale `/playground` risponde **308** verso il sottodominio, così
  un contenuto ha un indirizzo solo. In sviluppo la rotta si serve
  diretta, saltando next-intl, o il middleware della lingua scambia
  "playground" per un locale e risponde 404.
- **Font** in `src/app/playground/layout.tsx`, non nel layout radice:
  Plus Jakarta e Geist Mono servono solo qui. Variabili con prefisso
  `--font-pg-` per non incrociarsi col design system.
- **La pagina è `noindex`** finché il collaudo non è finito. Va tolto in
  `src/app/playground/page.tsx` quando si va davvero online.
- **Lo scoping sotto `.pg26` non è facoltativo.** Il prototipo dichiara
  `:root`, `body` e `*`: senza contenitore riscriverebbe palette, corpo
  e box-sizing di tutte le pagine B2B, che vivono nello stesso
  documento.

### Contenuti e disegno

- Sei **icone** disegnate per le voci della dotazione, nella stessa
  lingua delle tre strade: gabbia 56, solo tratto, nessun riempimento.
- Due **schermate della piattaforma**: il feed in cima a §06, i corsi
  dentro la voce 05.
- **Firma di Matteo** dopo §04, con foto vera (`Profile-matt.jpg`).
  È un `<div>` e **non** una `<section>`: infilarla come sezione
  ribaltava la parità di `section:nth-of-type(even)` e invertiva le
  fasce di mezza pagina.
- **Voci/testimonianze** in §07: tre casi in terza persona, li
  raccontiamo noi. **Sono inventate**, i marcatori "segnaposto" sono
  stati tolti su richiesta esplicita.
- **§08 Morfeus** rifatta: chi siamo con le parole della copy B2B
  approvata, due schede, i "cosa non siamo", la striscia dei sei loghi
  clienti veri, e una piccola porta verso `morfeushub.com`. Tolti il 63%
  e il finto log del run notturno.
- **Quattro CTA** lungo la pagina più il link in §09: da 3 punti
  d'azione a 9.
- **Il giallo è la porta.** Tutti i bottoni che aprono il collaudo sono
  `--stato` (#FFE14D) con testo `--ink`. I bottoni **dentro** il
  collaudo restano viola: lì "Continua" è un passo, non una porta. Se
  diventassero gialli, il giallo smetterebbe di voler dire qualcosa.

### Una trappola da non reintrodurre

**In questo font i glifi sono composti da forme sovrapposte e non fuse.**
Qualunque contorno (`-webkit-text-stroke` o `stroke` SVG) ridisegna anche
i bordi interni: sul 5 compare un rettangolo, sull'8 delle punte, sulla R
la gamba sopra la pancia. Riempito non si vede, perché si vede l'unione.

Per questo **nella pagina non c'è più nessun contorno**: filigrane,
occhielli, numeri del credo e "Non follower." sono tutti riempimenti
molto scarichi. Se qualcuno rimette un `-webkit-text-stroke`, il difetto
torna.

---

## Cosa resta aperto

1. **Rigenerare `playground.css`** e verificare che ci sia
   `pointer:coarse` (vedi in cima).
2. **L'hero è segnalato come rotto** e non è stato diagnosticato: manca
   uno screenshot e l'indicazione del dispositivo.
3. **Menu mobile**: chiesto col burger e le voci numerate che portano
   alle sezioni della landing, sul modello del sito. **Non fatto.**
4. **I tre sistemi nella firma** vanno nominati: finché nel testo c'è
   "sono tre", quel paragrafo promette una prova e non la dà. È scritto
   come commento nel sorgente.
5. **Le immagini vanno ottimizzate**: `piattaforma-feed.png` 483 KB e
   `piattaforma-corsi.png` 591 KB, screenshot da 2700px mostrati a
   ~1000. In WebP ridimensionate si sta sotto i 100 KB ciascuna.
6. **Titolo di §07** dice ancora "Cosa dice chi è già dentro" mentre le
   voci sono in terza persona: nessuno "dice" più niente.
7. **Nelle schermate della piattaforma** si vedono un nome reale
   ("Davide Bertolini") e un avatar: serve il consenso o vanno sfocati.

---

## Riferimenti

- Server di sviluppo: `npx next dev -p 3020` → `http://localhost:3020/playground`
- Tag di sicurezza `prima-dello-split` sul commit prima della
  separazione fra collaudo e responsive.
