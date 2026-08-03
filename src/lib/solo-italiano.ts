import { notFound } from "next/navigation";

/* ============================================================
   LE PAGINE CHE ESISTONO SOLO IN ITALIANO
   ------------------------------------------------------------
   Termini contrattuali dei corsi e area formazione: non si
   traducono. L'offerta e' venduta in Italia, in italiano, e un
   testo legale tradotto "per completezza" e' un testo che in un
   contenzioso dice una cosa diversa dall'originale.

   Vivono sotto [locale], quindi senza questa guardia Next le
   costruisce anche in inglese e le serve agli indirizzi senza
   prefisso, che sono gli indirizzi inglesi: pagine interamente
   italiane dentro il sito inglese.

   Due pezzi, e servono entrambi:
   - qui: in inglese la pagina NON ESISTE, quindi non viene nemmeno
     costruita. E' anche cio' che permette a check:en-copy di non
     avere eccezioni: se una pagina non esiste in inglese, non c'e'
     italiano da scusare;
   - in src/proxy.ts (SOLO_ITALIANO): l'indirizzo senza prefisso fa
     308 verso /it, cosi' chi ha il link vecchio o arriva da un
     funnel trova il documento invece di un 404.

   L'ordine conta: il redirect nel proxy corre prima del routing,
   quindi in pratica nessuno vede il 404 di questa guardia. La
   guardia serve a rendere vero, e non solo nascosto, il fatto che
   la pagina inglese non c'e'.
   ============================================================ */
export function guardiaSoloItaliano(locale: string): void {
  if (locale !== "it") notFound();
}
