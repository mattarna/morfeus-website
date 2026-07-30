/**
 * Fogli Google · registro dei webhook, uno per funnel.
 *
 * Gemello di `lib/brevo/lists.ts`. Ogni funnel che salva su un Foglio
 * ha la SUA app web di Apps Script, quindi il SUO indirizzo e il SUO
 * segreto: un nome generico (SHEET_WEBHOOK_URL) reggerebbe un solo
 * foglio, e il secondo funnel sovrascriverebbe il primo.
 *
 * Gli indirizzi e i segreti veri stanno nelle env di Vercel: qui c'e'
 * solo la mappa fra la chiave del funnel e i nomi delle env. Cosi' si
 * cambia foglio o si passa da dev a prod senza toccare il codice.
 *
 * Aggiungere un funnel = aggiungere una riga qui + le due env su Vercel.
 */

export const SHEET_WEBHOOK_ENV = {
  PLAYGROUND_COLLAUDO: {
    url: "SHEET_PLAYGROUND_COLLAUDO_URL",
    secret: "SHEET_PLAYGROUND_COLLAUDO_SECRET",
  },
} as const;

export type SheetWebhookKey = keyof typeof SHEET_WEBHOOK_ENV;

/** L'indirizzo e il segreto del foglio di quel funnel, letti dalle env.
 *  Torna null se manca anche solo uno dei due: senza entrambi non si
 *  scrive, e chi chiama salta il foglio senza rumore. */
export function getSheetWebhook(
  key: SheetWebhookKey,
): { url: string; secret: string } | null {
  const nomi = SHEET_WEBHOOK_ENV[key];
  const url = process.env[nomi.url];
  const secret = process.env[nomi.secret];
  if (!url || !secret) return null;
  return { url, secret };
}
