/* ============================================================
   PLAYGROUND · dove portano i bottoni
   ------------------------------------------------------------
   Un posto solo per gli indirizzi esterni: un token di invito
   sparso in tre componenti e' un token che fra sei mesi qualcuno
   cambia in due punti su tre.

   FONTE DI VERITA': `00_SYSTEM/TRACCIAMENTO.md` nel repo CLAUDE,
   piu' il registro dei funnel che quel file elenca.

   LA SORGENTE E' UNA SOLA PER FUNNEL, non una per bottone. Tutti e
   tre i punti da cui si entra nella community stanno dentro il
   referto, quindi chi passa di li' ha gia' compilato il collaudo:
   sapere QUALE dei tre bottoni ha premuto non aggiunge niente a
   quello che gia' sappiamo di lui, e costerebbe tre form diversi.
   ============================================================ */

/** Il nome con cui questo funnel si presenta ovunque: nel campo
 *  form_name che va a Brevo, nel registro, nei conti dei KPI. */
export const SORGENTE = "pg.collaudo";

/** Invito Circle. Su Circle si chiama "Collaudo | Pagina Principale
 *  Playground". Lo usano tutti i punti d'ingresso alla community. */
export const COMMUNITY =
  "https://morfeus-ai-playground.circle.so/join?invitation_token=34c760f1b5158a6809d4baf29d96ea11150b1368-c31c94e4-64e7-4568-a203-44b95a2aa4ac";

/* Destinazioni non ancora decise. Restano a null apposta: cosi' si
   vede a colpo d'occhio cosa manca, invece di scoprirlo cliccando. */
export const DESTINAZIONI = {
  corso: null as string | null, // Claude Unlocked
  bootcamp: null as string | null, // candidatura Bootcamp AI Champion
  call: null as string | null, // prenotazione call
} as const;
