/* ============================================================
   Dove si prenota una chiamata.
   ------------------------------------------------------------
   Il calendario esterno di Alex. E' la destinazione di tutte le CTA
   "Prenota una chiamata / Book a call" del sito: home, forge, lab,
   barra, ROI meter.

   IL CALENDARIO PARLA DUE LINGUE (2026-08-04), e finora gliene
   dicevamo una sola. Ogni CTA del sito, anche quelle sulle pagine
   inglesi, mandava allo stesso indirizzo senza `l`: chi prenotava
   dalla versione inglese si trovava davanti un calendario in
   italiano. Il sito era tradotto fino al bottone, e l'ultimo passo,
   quello dove si prende davvero l'appuntamento, tornava italiano.

   Da qui non esce piu' una costante ma una funzione: chi vuole il
   link deve dire in che lingua sta. E' voluto. Con la costante,
   dimenticarsi la lingua era il comportamento predefinito e non lo
   segnalava nessuno; con la funzione, una chiamata senza lingua non
   compila, e il compilatore diventa l'elenco dei posti da sistemare.

   Le UTM restano su entrambe le lingue: servono a MARF per sapere
   che la prenotazione arriva dal sito e non da un funnel o da un
   link privato. Toglierle dal lato inglese avrebbe reso le
   prenotazioni inglesi indistinguibili dal traffico diretto.
   ============================================================ */

const CALENDARIO = "https://marf.alexcarofiglio.com/book/morfeushub";
const UTM = "utm_source=website&utm_medium=organic&utm_campaign=website";

/**
 * L'indirizzo di prenotazione nella lingua della pagina.
 * Qualunque cosa non sia "en" e' italiano, come ovunque nel sito.
 */
export function bookingUrl(locale: string): string {
  return locale === "en" ? `${CALENDARIO}?l=en&${UTM}` : `${CALENDARIO}?${UTM}`;
}
