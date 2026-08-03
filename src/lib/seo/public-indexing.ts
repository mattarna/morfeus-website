import { COPPIE_SLUG_ARTICOLI } from "../insights-slugs";

export const SUPPORTED_LOCALES = ["en", "it"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/* UN PERCORSO, O UNO PER LINGUA.
   Quasi tutte le pagine vivono sullo stesso percorso nelle due lingue
   (`/forge` e `/it/forge`) e restano una stringa. Gli articoli no: da
   quando l'inglese ha slug suoi (src/lib/insights-slugs.ts) la coppia
   va portata fin qui, perche' e' questa lista a generare la sitemap e
   gli hreflang. Chi legge un percorso passa da `percorsoPerLingua`. */
export type PercorsoIndicizzabile = string | Readonly<Record<SupportedLocale, string>>;

export function percorsoPerLingua(
  percorso: PercorsoIndicizzabile,
  locale: SupportedLocale
): string {
  return typeof percorso === "string" ? percorso : percorso[locale];
}

/**
 * Locale routes that are intentionally indexable/discoverable.
 * Keep this list explicit so sitemap/LLM docs never expose internal routes.
 */
export const INDEXABLE_LOCALE_PATHS: readonly PercorsoIndicizzabile[] = [
  "",
  "forge",
  "lab",
  "chi-siamo",
  "metodo",
  "marf",
  "casi",
  "insights",
  "impara-ai",
  "glossario",
  "faq",
  "roiometro",
  "privacy",
  "cookies",
  // Casi studio (dettaglio): brand 2026
  "casi/brainiac-tesoreria-riconciliata",
  "casi/cyberangels-sales-advisor",
  "casi/cyberangels-report-cfo",
  "casi/globia-scoring-deterministico",
  "casi/marf-lead-caldo",
  "casi/scalers-pre-sales",
  "casi/valueize-best-seller",
  "casi/ag-academy-onboarding",
  /* Insights: articoli (13), un percorso per lingua. Presi dalla mappa
     invece che riscritti qui: due elenchi degli stessi slug divergono
     al primo articolo nuovo, e a divergere sarebbero sitemap e
     hreflang, cioe' esattamente le due cose che nessuno rilegge. */
  ...COPPIE_SLUG_ARTICOLI.map((c) => ({
    it: `insights/${c.it}`,
    en: `insights/${c.en}`,
  })),
];

export const INDEXABLE_CASE_STUDY_SLUGS = [
  "sales",
  "operations",
  "administrative",
  "ecommerce",
  "info-business",
] as const;

export const NON_INDEXABLE_LOCALE_PREFIXES = [
  "portal",
  "call-confirmed",
] as const;

/* IL PREFISSO DELLA LINGUA NELL'INDIRIZZO
   ------------------------------------------------------------
   Il routing e' `localePrefix: 'as-needed'` con default `en`
   (src/i18n/routing.ts): l'inglese vive sugli indirizzi SENZA
   prefisso e /en/... risponde 307 verso /... .

   Qui invece si scriveva sempre `/en/...`, quindi ogni pagina
   inglese dichiarava come canonical e come hreflang un indirizzo
   che redirige, cioe' diceva ai motori che la pagina buona e'
   un'altra rispetto a quella servita.

   La costante e' ripetuta e non importata da routing.ts apposta:
   questo file lo importa anche il proxy, e tirarsi dietro
   next-intl da qui allarga il bundle senza bisogno. Se cambia il
   default in routing.ts, cambia anche qui: lo dice il test. */
export const DEFAULT_LOCALE: SupportedLocale = "en";

/** "" per la lingua di default (nessun prefisso), "/it" per le altre. */
export function localePrefix(locale: SupportedLocale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function buildLocalizedPath(locale: SupportedLocale, path: string): string {
  const normalized = path.trim();
  const prefix = localePrefix(locale);
  if (normalized.length === 0) {
    return prefix === "" ? "/" : prefix;
  }
  return `${prefix}/${normalized}`;
}

export function buildLocalizedUrl(baseUrl: string, locale: SupportedLocale, path: string): string {
  return `${baseUrl}${buildLocalizedPath(locale, path)}`;
}

/* `path` accetta anche la coppia: per gli articoli il canonical e i due
   hreflang stanno su slug diversi, e passando una stringa sola la pagina
   inglese dichiarerebbe come alternativa italiana un indirizzo che non
   esiste. Le pagine a percorso unico continuano a passare una stringa e
   non cambiano di una virgola. */
export function buildLocaleAlternates(path: PercorsoIndicizzabile, locale: SupportedLocale) {
  const perLingua = (l: SupportedLocale) => buildLocalizedPath(l, percorsoPerLingua(path, l));
  return {
    canonical: perLingua(locale),
    languages: {
      en: perLingua("en"),
      it: perLingua("it"),
      "x-default": perLingua("en"),
    },
  };
}

export function getIndexableLocalizedEntries(baseUrl: string) {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INDEXABLE_LOCALE_PATHS.map((percorso) => ({
      locale,
      /* `percorso` e' la voce grezza (stringa o coppia): serve alla
         sitemap per costruire l'indirizzo dell'ALTRA lingua, che sugli
         articoli non si ottiene piu' riusando `path`. */
      percorso,
      path: percorsoPerLingua(percorso, locale),
      url: buildLocalizedUrl(baseUrl, locale, percorsoPerLingua(percorso, locale)),
    }))
  );
}

export function getIndexableCaseStudyEntries() {
  return [];
}
