/* ============================================================
   PLAYGROUND · le sezioni che vale la pena raggiungere
   ------------------------------------------------------------
   Una lista sola, usata dal menu del telefono E dal footer. Sono
   sei su tredici: la pagina ne ha molte di piu', ma le altre sono
   sezioni di racconto (le strade, il nemico, un giorno dentro) che
   si incontrano scorrendo e che nessuno va a cercare da un elenco.

   Se il footer e il menu tenessero due liste, fra un mese sarebbero
   due liste diverse.
   ============================================================ */

export const SEZIONI = [
  { id: "credo", label: "Il credo" },
  { id: "stanza", label: "Cosa c'è dentro" },
  { id: "prova", label: "Chi c'è dentro" },
  { id: "morfeus", label: "Chi c'è dietro" },
  { id: "perte", label: "È per te?" },
  { id: "faq", label: "Le domande" },
] as const;

/* ---- fuori dal Playground ----
   Solo indirizzi VERIFICATI online il 2026-07-29. Le pagine chi-siamo,
   metodo, casi e insights oggi rispondono 404 in produzione: vivono sul
   branch delle pagine e non sono ancora state spedite. Si aggiungono
   qui quando escono, non prima: un footer con link morti e' peggio di
   un footer con tre voci. */
export const MORFEUS = [
  { href: "https://morfeushub.com/it", label: "Il sito" },
  { href: "https://morfeushub.com/it/forge", label: "MARF" },
  { href: "https://morfeushub.com/it/lab", label: "LAB" },
] as const;

export const CONTATTI = {
  email: "hello@morfeushub.com",
  linkedin: "https://www.linkedin.com/company/morfeus-hub-ai/",
  instagram: "https://www.instagram.com/morfeushub.ai/",
} as const;

export const LEGALE = {
  piva: "14209210963",
  privacy: "/it/privacy",
  cookie: "/it/cookies",
} as const;
