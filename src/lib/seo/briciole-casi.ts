import type { SupportedLocale } from "./public-indexing";

/* ============================================================
   IL NOME DI OGNI CASO NELLE BRICIOLE DI PANE
   ------------------------------------------------------------
   Le otto pagine caso sono nate in momenti diversi e il testo
   del percorso a schermo e' scritto in quattro modi diversi:
   `crumbs: {casi, label}`, `crumbs: {casi, sep, title, num}`,
   `crumbCasi`/`crumbTail`, e in quattro casi non c'e' affatto.

   Per il JSON-LD serve un nome solo per caso, uguale in tutte le
   pagine, quindi sta qui invece che dentro ogni file: cosi' si
   legge la lista in un colpo e si vede subito se ne manca uno.

   Dove il testo a schermo esisteva gia', e' ripreso alla lettera
   per non dire due cose diverse nello stesso punto.
   ============================================================ */

type Etichetta = Record<SupportedLocale, string>;

export const NOME_CASO: Record<string, Etichetta> = {
  "ag-academy-onboarding": {
    it: "AG Academy · Caso #013",
    en: "AG Academy · Case #013",
  },
  "brainiac-tesoreria-riconciliata": {
    it: "Brainiac · Caso #049",
    en: "Brainiac · Case #049",
  },
  "cyberangels-report-cfo": {
    it: "Cyberangels Report Engine · Caso #027",
    en: "Cyberangels Report Engine · Case #027",
  },
  "cyberangels-sales-advisor": {
    it: "Cyberangels Sales Advisor · Caso #016",
    en: "Cyberangels Sales Advisor · Case #016",
  },
  "globia-scoring-deterministico": {
    it: "Globia · Caso #068",
    en: "Globia · Case #068",
  },
  "marf-lead-caldo": {
    it: "MARF · Caso #001",
    en: "MARF · Case #001",
  },
  "scalers-pre-sales": {
    it: "Scalers · Caso #067",
    en: "Scalers · Case #067",
  },
  "valueize-best-seller": {
    it: "Valueize · Caso #032",
    en: "Valueize · Case #032",
  },
};

/** "Casi" in italiano, "Cases" in inglese: e' l'anello intermedio. */
export const NOME_INDICE_CASI: Etichetta = { it: "Casi", en: "Cases" };

export const NOME_INDICE_INSIGHTS: Etichetta = { it: "Insights", en: "Insights" };
