/* ============================================================
   IL COLLAUDO · le domande
   ------------------------------------------------------------
   Solo dati: cosa si chiede, in che ordine, quanto vale ogni
   risposta. Il come si disegna sta in Collaudo.tsx, il come si
   calcola in motore.ts. Tenere separate le tre cose e' l'unico
   modo per rileggere il copy senza inciampare nel codice.

   VINCOLO ANTI-SLOP (spec §5-bis): vale per ogni stringa di
   questo file. Niente antitesi a specchio, niente aforisma di
   chiusura, niente complimenti a chi risponde, niente numeri
   inventati. Se non la diresti a voce, non va in pagina.
   ============================================================ */

import type { Dimensione, Intento, Leva, Punti, Tasca } from "./motore";

/* ---------- le famiglie di scena ----------
   Non e' il settore: e' la FORMA del lavoro, e sono tre.
   Le quattro opzioni di ogni scena restano uguali per tutti (e' cio'
   che tiene il voto comparabile fra un commercialista e un
   e-commerce manager): cambia solo la riga che apre. */
export type Famiglia = "A" | "B" | "C";

export const MESTIERI_OPZIONI: { id: string; label: string; famiglia: Famiglia }[] = [
  { id: "agenzia", label: "Agenzia, marketing o comunicazione", famiglia: "A" },
  { id: "consulenza", label: "Consulenza e advisory", famiglia: "A" },
  { id: "studio", label: "Studio professionale (commercialista, avvocato, notaio)", famiglia: "A" },
  { id: "tecnico", label: "Studio tecnico, ingegneria o architettura", famiglia: "A" },
  { id: "formazione", label: "Formazione, coaching o info-business", famiglia: "A" },
  { id: "azienda-servizi", label: "Azienda di servizi: lavoro su commesse per clienti", famiglia: "A" },
  { id: "azienda-prodotto", label: "Azienda di prodotto: vendo qualcosa che si ripete", famiglia: "B" },
  { id: "ecommerce", label: "E-commerce e vendita online", famiglia: "B" },
  { id: "tech", label: "Tech, software o IT", famiglia: "B" },
  { id: "altro", label: "Altro", famiglia: "A" },
];

/* Il ruolo porta tre cose in una domanda sola: chi paga (tasca), cosa
   moltiplica l'AI Brain (leva) e quante persone ereditano i tuoi processi.

   MANAGER E DIPENDENTE SONO DUE COSE DIVERSE, e vale la pena tenerle
   separate: l'ICP dice che il manager e' un "lead B2B travestito", perche'
   ha una struttura che puo' muovere e accesso a un budget che non e' il
   suo portafoglio. Il collaboratore no. Entrambi pagano con la tasca
   dell'azienda (quindi niente high-ticket personale per nessuno dei due),
   ma solo al manager ha senso proporre il ponte verso l'azienda. La
   differenza la porta la LEVA, non la tasca. */
export const RUOLI_OPZIONI: {
  id: string;
  label: string;
  tasca: Tasca;
  leva: Leva;
  team: number;
}[] = [
  { id: "imprenditore-piccolo", label: "Imprenditore, ho un piccolo team", tasca: "mia", leva: "struttura", team: 5 },
  { id: "imprenditore-grande", label: "Imprenditore, ho un team di oltre 10 persone", tasca: "mia", leva: "struttura", team: 15 },
  { id: "freelance", label: "Freelance, lavoro da solo", tasca: "mia", leva: "solo", team: 0 },
  { id: "manager", label: "Manager", tasca: "azienda", leva: "struttura", team: 0 },
  { id: "dipendente", label: "Collaboratore o dipendente", tasca: "azienda", leva: "nessuna", team: 0 },
];

/** Vero per chi non tira fuori i soldi di tasca propria: a queste persone
 *  non si propone mai un percorso high-ticket personale. */
export function pagaLAzienda(ruolo: string): boolean {
  return RUOLI_OPZIONI.find((r) => r.id === ruolo)?.tasca === "azienda";
}

export function famigliaDi(mestiere: string, ruolo: string): Famiglia {
  /* chi lavora dentro un'azienda ha quella forma di lavoro a prescindere
     dal settore: le scene gli parlano di reparto e di chi decide */
  if (pagaLAzienda(ruolo)) return "C";
  return MESTIERI_OPZIONI.find((m) => m.id === mestiere)?.famiglia ?? "A";
}

/* ---------- blocco A · il profilo ---------- */

export const DICHIARATO_OPZIONI = [
  { id: "L0", label: "La sto guardando da fuori" },
  { id: "L1", label: "La uso ogni giorno, con prompt scritti al volo" },
  { id: "L1p", label: "Ho prompt salvati e qualche routine che riuso" },
  { id: "L2", label: "Ho un sistema: contesto, istruzioni, qualche automazione" },
];

export const INTENTO_OPZIONI: { id: Intento; label: string }[] = [
  { id: "imparare", label: "Capirla e imparare a usarla bene" },
  { id: "applicare", label: "Applicarla al mio lavoro e liberare ore vere" },
  { id: "delegare", label: "Delegarle pezzi interi del mio flusso" },
  { id: "team", label: "Portarla al mio team o alla mia azienda" },
];

/* ---------- blocco B · il banco ----------
   Cinque scene, una per dimensione, nell'ordine in cui si costruisce
   davvero un AI Brain: prima l'AI deve sapere chi sei, poi il lavoro
   ripetuto prende una strada, poi gli errori si fissano, poi si
   controlla, e alla fine esce dalla tua testa. */

export type Scena = {
  dimensione: Dimensione;
  /** una stringa se la scena vale identica per tutti, altrimenti una per famiglia */
  apertura: string | Record<Famiglia, string>;
  domanda: string;
  opzioni: { t: string; pt: Punti; v: string }[];
};

export const SCENE: Scena[] = [
  {
    dimensione: "contesto",
    apertura: {
      A: "Devi preparare una proposta per un cliente che conta.",
      B: "Devi scrivere la pagina di un prodotto nuovo.",
      C: "Devi preparare il documento che presenta un progetto a chi decide.",
    },
    domanda: "Come parti con l'AI?",
    /* Riscritte dopo il primo giro in pagina. Nella tabella in chat
       sembravano a posto, sullo schermo suonavano finte, e il motivo
       era la simmetria: tre opzioni su quattro attaccavano con "Le",
       due chiudevano con la stessa terzina col due punti, e tutte
       erano lunghe uguali. Nessuno risponde con quel ritmo. Ora
       attacchi diversi, lunghezze diverse, nessuna terzina. */
    opzioni: [
      { t: "Chiedo, e poi aggiusto quello che esce.", pt: 0, v: "pagina bianca" },
      { t: "Mi scrivo un prompt lungo, con dentro tutto quello che serve sapere.", pt: 1, v: "il prompt lo rifai" },
      { t: "Parto da una mia vecchia che era andata bene: rifai uguale, ma per questo.", pt: 2, v: "l'esempio lo reincolli" },
      { t: "Do solo i dati nuovi. Come lavoro e come scrivo lo sa già.", pt: 3, v: "lei ti conosce già" },
    ],
  },
  {
    dimensione: "ripetibilita",
    apertura: {
      A: "Ogni settimana rifai lo stesso tipo di documento per un cliente diverso.",
      B: "Ogni settimana rifai lo stesso lavoro: stessi passaggi, dati diversi.",
      C: "Ogni settimana rifai lo stesso report per il tuo reparto.",
    },
    domanda: "Con l'AI come lo gestisci?",
    opzioni: [
      { t: "Riparto da capo ogni volta: spiego, incollo, correggo.", pt: 0, v: "lo ripaghi ogni volta" },
      { t: "Ho il prompt buono salvato in una nota e lo incollo.", pt: 1, v: "la memoria sei tu" },
      { t: "Ho un progetto dedicato dove è già tutto impostato.", pt: 2, v: "metà strada" },
      { t: "Do solo i dati nuovi e l'output esce già nel mio formato.", pt: 3, v: "questa è una routine" },
    ],
  },
  {
    dimensione: "correzione",
    apertura: {
      A: "L'output esce sbagliato: tono generico, niente che sappia di te.",
      B: "L'output esce sbagliato: tono generico, niente che sappia del vostro prodotto.",
      C: "L'output esce sbagliato: tono generico, niente che sappia come si scrive da voi.",
    },
    domanda: "Cosa fai?",
    opzioni: [
      { t: "Lo riscrivo a mano, faccio prima.", pt: 0, v: "l'errore resta tuo" },
      { t: "Cambio le parole del prompt e riprovo finché esce meglio.", pt: 1, v: "non sai perché è uscito" },
      { t: "Le spiego cosa non va e perché, e faccio rifare.", pt: 2, v: "va rispiegato domani" },
      { t: "Correggo, e la correzione la salvo nelle istruzioni.", pt: 3, v: "quell'errore non torna" },
    ],
  },
  {
    dimensione: "controllo",
    apertura: {
      A: "L'AI mette un dato dentro un documento che va al cliente.",
      B: "L'AI mette un dato dentro qualcosa che vedranno i clienti.",
      C: "L'AI mette un dato dentro qualcosa che va a chi decide.",
    },
    domanda: "Cosa fai prima di mandarlo?",
    opzioni: [
      { t: "Mi fido: se lo dice, un motivo c'è.", pt: 0, v: "nessuno se ne accorge" },
      { t: "Ricontrollo tutto a mano, riga per riga.", pt: 1, v: "il tempo torna in verifica" },
      { t: "Verifico i dati critici, il resto lo guardo a campione.", pt: 2, v: "controlli dove serve" },
      { t: "Il sistema cita le fonti: verifico dove indica, e i numeri sempre.", pt: 3, v: "ti dice dove guardare" },
    ],
  },
  {
    /* una riga sola per tutte e tre: "domani non ci sei" funziona
       identica per il freelance, per il founder e per il dipendente,
       e vestirla per forza sarebbe stato un vezzo */
    dimensione: "diffusione",
    apertura: "Domani parti e per due settimane non ci sei.",
    domanda: "Quello che hai costruito con l'AI, cosa succede?",
    opzioni: [
      { t: "Niente: non ho costruito niente, uso l'AI e basta.", pt: 0, v: "non c'è niente da fermare" },
      { t: "Si ferma: quel modo di lavorare ce l'ho solo io in testa.", pt: 1, v: "vive solo lì" },
      { t: "Ho scritto qualcosa, ma senza di me si arrangiano.", pt: 2, v: "scritto, mai collaudato" },
      { t: "Altri lo eseguono uguale, senza chiamarmi.", pt: 3, v: "non dipende da te" },
    ],
  },
];

/* ---------- blocco C · i numeri ---------- */

export const VALORE_OPZIONI = [
  { id: 25, label: "Meno di 30 euro" },
  { id: 45, label: "Fra 30 e 60 euro" },
  { id: 90, label: "Fra 60 e 120 euro" },
  { id: 200, label: "Fra 120 e 300 euro" },
  { id: 450, label: "Oltre 300 euro" },
];

export const URGENZA_OPZIONI = [
  { id: "alta", label: "Urgente: sto perdendo terreno adesso" },
  { id: "media", label: "Nei prossimi due o tre mesi" },
  { id: "bassa", label: "Sto esplorando, senza fretta" },
];

/* ---------- la barra ----------
   Non lineare, e non e' una furbizia: i 12 passi non pesano uguale, quindi
   una barra lineare sarebbe gia' distorta, solo nel verso sbagliato.
   Blocco A ~28s (19% del tempo ma 33% dei passi), B ~95s, C ~22s.
   Quindi: A vola fino al 40%, B avanza bene perche' e' la parte che pesa,
   C rallenta ma sono tre tap da cinque secondi.
   Parte da 5 con nessuna risposta data: si finisce di piu' partendo da un
   avanzamento regalato che da zero. La percentuale non si mostra mai in
   cifre, solo la barra. */
export const PROGRESSO = [5, 13.75, 22.5, 31.25, 40, 49, 58, 67, 76, 85, 90, 95];

export const BLOCCHI = ["Chi sei", "Il banco", "I numeri"] as const;
/** a quale blocco appartiene ogni passo, per l'occhiello e i segni sulla barra */
export const BLOCCO_DI = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2];
