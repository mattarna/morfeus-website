/* ============================================================
   PLAYGROUND · dove portano i bottoni
   ------------------------------------------------------------
   Un posto solo per gli indirizzi esterni. Il motivo non e'
   l'ordine: e' che questi indirizzi cambiano. Il link di
   prenotazione oggi e' scritto a mano in dodici file di questo
   repo, in tre varianti diverse, e il giorno che cambia bisogna
   trovarli tutti a mano. Qui dentro si cambia in un punto.

   FONTE DI VERITA' del registro: `00_SYSTEM/TRACCIAMENTO.md`
   nel repo CLAUDE, sezione "Il registro dei link".

   REGOLA: nessun indirizzo esterno va scritto dentro un
   componente. Se serve un link nuovo, si aggiunge qui.
   ============================================================ */

/* ------------------------------------------------------------
   L'INTERRUTTORE DEL BOOTCAMP
   Vive qui, con le destinazioni, perche' e' la stessa domanda:
   questa porta e' aperta o no. Sta in un posto SOLO perche' lo
   leggono in due (il collaudo e l'anteprima del referto), e una
   copia scollegata farebbe dire all'anteprima il contrario della
   verita'.

   Quando e' false il referto non propone mai il Bootcamp, nemmeno
   ai profili a cui altrimenti lo proporrebbe: tiene la seconda
   porta migliore e aggiunge la nota che le iscrizioni sono chiuse.
   Si mette true SOLO nella finestra di iscrizioni aperte.
   Stato al 2026-07-30: CHIUSO.
   ------------------------------------------------------------ */
export const BOOTCAMP_APERTO = false;

/* ------------------------------------------------------------
   LE SORGENTI · da quale porta e' entrato

   Il valore finisce in due posti: l'attributo form_name del
   contatto Brevo e la colonna form_name del foglio RISPOSTE. Lo
   script del foglio cerca le colonne PER NOME, quindi un valore
   nuovo cade nella colonna che gia' esiste: per distinguere le
   porte non serve toccare ne' il foglio ne' lo script, basta
   filtrare quella colonna.

   Una sorgente per PORTA, non per bottone: dentro una stessa
   pagina tutti i bottoni aprono lo stesso collaudo e valgono
   uguale. Chi arriva alla community e' comunque passato dal
   referto, quindi ha sempre una sorgente.

   Se si aggiunge una porta, si aggiunge QUI: la rotta che salva
   accetta solo i valori di questo elenco, cosi' nessuno puo'
   riempire il foglio di nomi inventati.
   ------------------------------------------------------------ */
export const SORGENTI = {
  /** La landing lunga, playground.morfeushub.com */
  landing: "pg.collaudo",
  /** La porta corta per i social, /gate */
  gate: "pg.gate",
} as const;

export type Sorgente = (typeof SORGENTI)[keyof typeof SORGENTI];

/** La sorgente di chi non ne dichiara una: e' la landing, che
 *  esisteva prima che le porte fossero due. Cambiarla spezzerebbe
 *  la continuita' dello storico nel foglio. */
export const SORGENTE: Sorgente = SORGENTI.landing;

const VALIDE = new Set<string>(Object.values(SORGENTI));

/**
 * Riporta una sorgente dichiarata dal client a una di quelle note.
 *
 * La rotta che salva e' pubblica: chiunque puo' chiamarla con la
 * sorgente che vuole. Senza elenco chiuso il foglio si riempirebbe di
 * form_name inventati, che e' peggio che non distinguere le porte: i
 * conti per sorgente diventerebbero sbagliati senza che si veda.
 * Un valore sconosciuto non fa fallire il salvataggio (il referto
 * viene prima di tutto): ricade sulla landing.
 */
export function normalizzaSorgente(dichiarata?: string): Sorgente {
  const pulita = dichiarata?.trim() ?? "";
  return VALIDE.has(pulita) ? (pulita as Sorgente) : SORGENTE;
}

/** Invito Circle. Su Circle si chiama "Collaudo | Pagina Principale
 *  Playground". Lo usano tutti i punti d'ingresso alla community.
 *  Attenzione: il funnel del bootcamp usa un invito DIVERSO
 *  (token ...72dc97b8), non e' un refuso, sono due porte. */
export const COMMUNITY =
  "https://morfeus-ai-playground.circle.so/join?invitation_token=34c760f1b5158a6809d4baf29d96ea11150b1368-c31c94e4-64e7-4568-a203-44b95a2aa4ac";

/* ------------------------------------------------------------
   PRENOTAZIONE CALL
   La base sta separata dagli UTM apposta: quando l'indirizzo di
   prenotazione cambia (e Matt ha detto che cambia a breve) si
   tocca una riga sola e tutte le tracciature restano in piedi.
   ------------------------------------------------------------ */
const PRENOTAZIONE = "https://marf.alexcarofiglio.com/book/morfeushub";

/** Gli UTM dicono playground, non website. La home manda
 *  `utm_source=website`: usarlo anche da qui vorrebbe dire vedere
 *  in un conto solo le call arrivate da due posti diversi, che e'
 *  esattamente cio' che il tracciamento serve a evitare. */
const utm = (campagna: string) =>
  `?utm_source=playground&utm_medium=collaudo&utm_campaign=${campagna}`;

/* ------------------------------------------------------------
   LE DESTINAZIONI DEL REFERTO
   Verificate online il 2026-07-29: entrambe le pagine rispondono
   200 SENZA il prefisso /it, che invece da 404.
   ------------------------------------------------------------ */
export const DESTINAZIONI = {
  /** Claude Unlocked, il corso d'ingresso. Va alla pagina di
   *  vendita, non al checkout: i tre tier di prezzo li decide
   *  quella pagina, non il referto. */
  corso: "https://morfeushub.com/claude-unlocked",

  /** Bootcamp AI Champion, 3a edizione. Si mostra solo quando le
   *  iscrizioni sono aperte: lo decide BOOTCAMP_APERTO in
   *  Collaudo.tsx, non questo file. */
  bootcamp: "https://morfeushub.com/bootcamp-ai-champion-3a-edizione",

  /** La call. Stesso indirizzo di prenotazione della home, UTM di
   *  qui. Non si propone mai a chi paga con la tasca dell'azienda:
   *  quel filtro sta nel motore, non qui. */
  call: PRENOTAZIONE + utm("call"),

  /** La call B2B, per chi ha una struttura da muovere. Stesso
   *  indirizzo, campagna diversa: e' l'unico modo per sapere
   *  quante ne arrivano da questo ramo. */
  callB2b: PRENOTAZIONE + utm("call-b2b"),

  /** "Facciamo due chiacchiere": la mezz'ora a chi sta in alto e a cui
   *  non vendiamo niente (richiesta di Mattia). NON e' una call
   *  commerciale e la campagna deve restare separata, se no i conti
   *  delle call vendute si gonfiano con conversazioni che vendita non
   *  erano. */
  parliamone: PRENOTAZIONE + utm("parliamone"),
} as const;

/** Il gradino che esce dal motore, tradotto in un indirizzo.
 *  `community` non e' qui perche' ha un invito suo. */
export const DOVE: Record<string, string> = {
  "claude-unlocked": DESTINAZIONI.corso,
  bootcamp: DESTINAZIONI.bootcamp,
  call: DESTINAZIONI.call,
  "call-b2b": DESTINAZIONI.callB2b,
  community: COMMUNITY,
};
