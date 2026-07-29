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

/** Il nome con cui questo funnel si presenta ovunque: nel campo
 *  form_name che va a Brevo, nel registro, nei conti dei KPI.
 *  La sorgente e' UNA per funnel, non una per bottone: tutti i
 *  punti d'ingresso alla community stanno dentro il referto,
 *  quindi chi passa di li' ha gia' compilato il collaudo. */
export const SORGENTE = "pg.collaudo";

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
