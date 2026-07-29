/* ============================================================
   IL COLLAUDO · i testi del referto
   ------------------------------------------------------------
   Separati dal motore apposta: la logica si verifica coi test,
   il copy si verifica leggendolo. Tenerli insieme voleva dire
   non poter fare ne' l'una ne' l'altra cosa.

   VINCOLO (spec §5-bis, Matt 2026-07-29): niente testo che suoni
   scritto da un'AI. In pratica, qui dentro:
     · niente "non X, e' Y" e niente antitesi a specchio
     · niente aforisma di chiusura su ogni riga
     · niente complimenti a chi legge, il banco misura e basta
     · niente percentuali inventate: o il numero e' vero, o non c'e'
     · se non la diresti a voce a un cliente, non va in pagina

   ACCENTI: nei commenti restano ASCII (stile del repo), ma nelle
   stringhe che finiscono in pagina si scrive in italiano vero.
   "Ripetibilita'" a video sembra un refuso, e lo e'.
   ============================================================ */

import type {
  Dimensione,
  DimensioneCancello,
  Gradino,
  Leva,
  NumeroLivello,
  Punti,
  Tasca,
} from "./motore";

/* ---------- i livelli ---------- */

export const LIVELLI_COPY: Record<NumeroLivello, { nome: string; riga: string }> = {
  1: { nome: "Spettatore", riga: "La guardi da fuori. Quando la apri è per curiosità, non per lavorare." },
  2: { nome: "Utente", riga: "La usi quando ti serve. Ogni volta è una partenza da zero." },
  3: { nome: "Prompter", riga: "La usi tutti i giorni e sai chiedere. Il lavoro di prepararla lo fai tu, ogni volta." },
  4: { nome: "Collezionista", riga: "Hai i pezzi buoni: prompt salvati, qualche progetto impostato. Non si tengono insieme." },
  5: { nome: "Costruttore", riga: "L'AI parte già sapendo chi sei. Da qui il lavoro si accumula invece di ricominciare." },
  6: { nome: "Operatore", riga: "Hai routine che girano: dai i dati nuovi e l'output esce nel tuo formato." },
  7: { nome: "AI Champion", riga: "Quello che hai costruito lo usa anche qualcun altro, non solo tu." },
  8: { nome: "Architetto", riga: "Il sistema regge senza di te: scritto, governato, verificabile." },
};

/* ---------- le 5 dimensioni ---------- */

export const DIMENSIONI_COPY: Record<
  Dimensione,
  { etichetta: string; solido: string; scoperto: string }
> = {
  contesto: {
    etichetta: "Contesto",
    solido: "L'AI parte sapendo chi sei, cosa vendi e come scrivi.",
    scoperto: "Ogni conversazione riparte da capo. Il contesto lo rimetti tu, a mano, tutte le volte.",
  },
  ripetibilita: {
    etichetta: "Ripetibilità",
    solido: "Il lavoro che torna ha già la sua strada: dai i dati, esce nel tuo formato.",
    scoperto: "Il lavoro che torna lo rifai da capo. È qui che se ne vanno le ore.",
  },
  correzione: {
    etichetta: "Correzione",
    solido: "Quando sbaglia, la correzione la salvi. La volta dopo quell'errore non c'è più.",
    scoperto: "Le correzioni le rifai a voce ogni volta, e l'errore torna.",
  },
  controllo: {
    etichetta: "Controllo",
    solido: "Verifichi dove il danno sarebbe alto, e il sistema ti dice dove guardare.",
    scoperto: "O ti fidi al buio, o ricontrolli tutto a mano e il tempo risparmiato lo ributti in verifica.",
  },
  diffusione: {
    etichetta: "Diffusione",
    solido: "Quello che hai costruito lo esegue anche qualcun altro, senza che tu stia lì.",
    scoperto: "Vive solo nella tua testa. Se ti fermi tu, si ferma tutto.",
  },
};

export const VERDETTI: Record<Punti, { parola: string; classe: string }> = {
  0: { parola: "scoperto", classe: "v0" },
  1: { parola: "debole", classe: "v1" },
  2: { parola: "buono", classe: "v2" },
  3: { parola: "solido", classe: "v3" },
};

/* ---------- la riga del cancello ----------
   Compare solo quando un cancello ha tenuto fermo il livello. E' il
   momento in cui il referto alza la voce, quindi succede una volta sola. */

export const CANCELLO_COPY: Record<DimensioneCancello, string> = {
  contesto:
    "Su tutto il resto sei avanti, ma l'AI continua a non sapere chi sei. Finché il contesto lo rimetti a mano, quello che costruisci sopra non tiene.",
  ripetibilita:
    "Il punteggio ci sarebbe. Quello che manca è che il lavoro ripetuto abbia una sua strada: oggi lo rifai, ogni volta.",
  diffusione:
    "Il tuo sistema non esce dalla tua testa. Funziona, ma nessun altro lo esegue: per questo il livello si ferma qui.",
  controllo:
    "Ti manca il pezzo di verifica. Un sistema che nessuno controlla non si può dare a nessuno.",
};

/* ---------- dichiarato vs misurato ---------- */

export function verdettoConfronto(atteso: number, misurato: number): string {
  const scarto = misurato - atteso;
  if (scarto <= -15) return "Usi l'AI da più tempo di quanto la conosci.";
  if (scarto >= 15) return "Ti sei dato meno di quello che vali: il metodo c'è già.";
  return "Ti sei valutato con precisione.";
}

/* ---------- contro cosa stai combattendo ----------
   Il nemico e' sempre lo stesso (il dilettantismo, non le persone).
   Cambia dove ti fa male. I desideri sono voice of customer reale,
   dalle presentazioni del bootcamp: sono parole loro, non nostre. */

export const NEMICO: Record<string, { nemico: string; desiderio: string }> = {
  "mia-struttura": {
    nemico:
      "In azienda l'AI è già entrata: la usano, ognuno a modo suo, senza che nessuno abbia deciso come. Quello che manca è il metodo. E il metodo che manca a te è lo stesso che manca a loro, perché i tuoi processi li ereditano così come sono.",
    desiderio:
      "Lavorare metà del tempo e produrre il doppio. Istruire quello che sai invece di assumere qualcuno che lo impari da capo.",
  },
  "mia-solo": {
    nemico:
      "Chi vende corsi di prompt ti ha convinto che il problema fosse trovare le parole giuste. Il tempo se ne va prima: nel rispiegare ogni volta chi sei, cosa fai e come lo fai.",
    desiderio:
      "Avere la testa libera per il lavoro vero, non per il confezionamento. E suonare come te, non come tutti gli altri che usano gli stessi strumenti.",
  },
  azienda: {
    nemico:
      "Nella tua azienda l'AI la usano già in tanti, di nascosto e senza metodo. Chi porta ordine in quel disordine non è quello che la sa usare meglio: è quello che sa mostrare cosa cambia.",
    desiderio:
      "Smettere di essere quello bravo che nessuno ha notato, e diventare quello a cui chiedono come si fa.",
  },
};

export function nemicoPer(tasca: Tasca, leva: Leva) {
  if (tasca === "azienda") return NEMICO.azienda;
  return leva === "struttura" ? NEMICO["mia-struttura"] : NEMICO["mia-solo"];
}

/* ---------- il piano ----------
   Tre mosse che partono dalla dimensione piu' debole. Devono essere
   davvero eseguibili da soli: e' quello che rende credibile il gradino
   che viene dopo. */

export type Mossa = { quando: string; cosa: string };

export const PIANO: Record<Dimensione, Mossa[]> = {
  contesto: [
    { quando: "Oggi", cosa: "Scrivi in un file chi sei, cosa vendi, come scrivi e le tue regole. Mezz'ora, non serve che sia bello." },
    { quando: "Entro 7 giorni", cosa: "Aprilo all'inizio di ogni lavoro serio per una settimana. Segnati dove l'output cambia davvero e dove no." },
    { quando: "Entro 30 giorni", cosa: "Quel file smette di essere un copia e incolla e diventa il posto fisso da cui parti: un progetto dedicato, con dentro le istruzioni." },
  ],
  ripetibilita: [
    { quando: "Oggi", cosa: "Prendi il lavoro che hai rifatto più volte questo mese. Scrivi i passaggi come li spiegheresti a una persona nuova." },
    { quando: "Entro 7 giorni", cosa: "Falli eseguire all'AI su un caso vero. Dove sbaglia, aggiusta le istruzioni invece dell'output." },
    { quando: "Entro 30 giorni", cosa: "Quando esce giusto due volte di fila senza ritocchi, quella è una routine. Passa alla seconda." },
  ],
  correzione: [
    { quando: "Oggi", cosa: "La prossima volta che correggi qualcosa, fermati un attimo e scrivi perché era sbagliato." },
    { quando: "Entro 7 giorni", cosa: "Quelle righe mettile dentro le istruzioni del progetto, non in una nota a parte che poi non riapri." },
    { quando: "Entro 30 giorni", cosa: "Rileggi la lista. Se un errore è tornato, l'istruzione era vaga: riscrivila più stretta." },
  ],
  controllo: [
    { quando: "Oggi", cosa: "Fai l'elenco di cosa, nel tuo lavoro, non può uscire sbagliato: numeri, nomi, date, promesse ai clienti." },
    { quando: "Entro 7 giorni", cosa: "Chiedi sempre da dove viene il dato. Verifica a mano solo quello che sta nell'elenco." },
    { quando: "Entro 30 giorni", cosa: "L'elenco entra nelle istruzioni, e l'output ti indica da solo i punti da controllare." },
  ],
  diffusione: [
    { quando: "Oggi", cosa: "Scegli la cosa che ti funziona meglio e scrivila in modo che possa eseguirla qualcun altro." },
    { quando: "Entro 7 giorni", cosa: "Falla fare a una persona senza spiegargliela a voce. Dove si blocca, lì mancano le istruzioni." },
    { quando: "Entro 30 giorni", cosa: "Quando la fa uguale senza chiamarti, hai il primo pezzo che non dipende più da te." },
  ],
};

/* Quando non c'e' niente sotto il massimo, il piano "sistema il punto
   debole" non esiste: dire a chi ha finito la scala di scrivere il file
   di contesto e' il modo piu' veloce per perdere credibilita'. */
export const PIANO_VERTICE: Mossa[] = [
  {
    quando: "Oggi",
    cosa: "Qui il collaudo non ha più niente da misurarti. Scegli l'area di lavoro dove il sistema non è ancora arrivato: di solito è quella che ti sembra troppo di testa per delegarla.",
  },
  {
    quando: "Entro 7 giorni",
    cosa: "Portaci lo stesso metodo che hai usato altrove. Se lì non funziona, il motivo è la cosa più interessante che puoi scoprire questo mese.",
  },
  {
    quando: "Entro 30 giorni",
    cosa: "Scrivi cosa succede al tuo sistema se domani cambi modello. Se la risposta è che si rifà tutto, quello è il prossimo lavoro.",
  },
];

/* ---------- i gradini ----------
   Nessun prezzo, mai: l'high-ticket si vende in call (decisione Matt
   2026-07-29). Qui c'e' cosa e', non quanto costa. */

export const GRADINI_COPY: Record<
  Gradino,
  { occhiello: string; titolo: string; testo: string; cta: string }
> = {
  community: {
    occhiello: "Il posto giusto adesso",
    titolo: "La stanza",
    testo:
      "Ci sono dentro fondatori e operatori che l'AI la usano per lavorare, non per parlarne. Porti il lavoro che non vuoi più rifare da zero e vedi come lo hanno risolto quelli che ci sono già passati.",
    cta: "Entra nella community",
  },
  "claude-unlocked": {
    occhiello: "Da dove si parte",
    titolo: "Claude Unlocked",
    testo:
      "Il corso che ti porta dalle fondamenta: il contesto, le istruzioni, il primo progetto che regge senza che tu lo rimetta in piedi ogni mattina.",
    cta: "Vai al corso",
  },
  bootcamp: {
    occhiello: "Per accorciare i tempi",
    titolo: "Bootcamp AI Champion",
    testo:
      "Si lavora sul tuo caso, non su esempi. Gruppo piccolo, tre mesi, e alla fine hai costruito qualcosa che gira: non appunti su come si farebbe.",
    cta: "Candidati al Bootcamp",
  },
  call: {
    occhiello: "Per accorciare i tempi",
    titolo: "Una call sul tuo sistema",
    testo:
      "Mezz'ora sui tuoi processi e i tuoi numeri, per capire cosa ha senso costruire e soprattutto in che ordine. Da lì si decide se e come lavorarci insieme.",
    cta: "Prenota la call",
  },
  "call-b2b": {
    occhiello: "Il passo che conta per te",
    titolo: "Una call sull'azienda",
    testo:
      "Prepariamo insieme la proposta da portare a chi decide: cosa cambia, per chi, e con quali numeri. Sei tu a portarla, con qualcosa di solido in mano.",
    cta: "Prenota la call",
  },
};

export const CONVERSAZIONE_COPY = {
  titolo: "Facciamo due chiacchiere",
  testo:
    "A questo livello non abbiamo niente da venderti. Però ci interessa sapere come lavori: mezz'ora, ci racconti come te lo sei costruito e ti diciamo cosa faremmo noi al posto tuo.",
  cta: "Prenota mezz'ora",
};

/* ---------- lo specchio ---------- */

/* Le etichette dello specchio: piu' corte di quelle che si leggono nel
   questionario, perche' li' sono una scelta da capire e qui sono un
   promemoria di cosa hai risposto. Le chiavi restano le stesse. */
export const MESTIERI: Record<string, string> = {
  agenzia: "Agenzia, marketing o comunicazione",
  consulenza: "Consulenza e advisory",
  studio: "Studio professionale",
  tecnico: "Studio tecnico, ingegneria o architettura",
  formazione: "Formazione, coaching o info-business",
  "azienda-servizi": "Azienda di servizi",
  "azienda-prodotto": "Azienda di prodotto",
  ecommerce: "E-commerce e vendita online",
  tech: "Tech, software o IT",
  altro: "Altro",
};

export const STRUTTURE: Record<string, string> = {
  "imprenditore-piccolo": "Imprenditore con un piccolo team",
  "imprenditore-grande": "Imprenditore con un team di oltre 10 persone",
  freelance: "Freelance, lavora da solo",
  manager: "Manager in azienda",
  dipendente: "Collaboratore o dipendente",
};

export const LOOP: Record<string, string> = {
  acquisizione: "acquisizione e vendite",
  delivery: "delivery e clienti",
  operations: "team e operations",
  controllo: "controllo e decisioni",
};

export const URGENZE: Record<string, string> = {
  alta: "Urgente, sta perdendo terreno adesso",
  media: "Nei prossimi due o tre mesi",
  bassa: "Sta esplorando, senza fretta",
};

/* Le etichette sono identiche a quelle del questionario: nel referto la
   riga "ti eri dato" deve suonare come l'eco della sua risposta, non come
   una nostra parafrasi.
   L'atteso e' dove finisce, sui 100, chi si descrive cosi'. I cinque
   gradini distano 17-20 punti, quindi lo scarto di 15 che fa scattare il
   verdetto del confronto resta significativo. */
export const DICHIARATI: Record<string, { label: string; atteso: number }> = {
  L0: { label: "Poco. La guardo più di quanto la usi", atteso: 8 },
  L1: { label: "Tutti i giorni, ma vado a braccio", atteso: 25 },
  L1p: { label: "Ho i miei prompt buoni e me li riuso", atteso: 45 },
  L2: { label: "Le ho dato un contesto fisso e ci lavoro dentro", atteso: 65 },
  L3: { label: "Quello che ho costruito lo usa anche qualcun altro", atteso: 85 },
};
