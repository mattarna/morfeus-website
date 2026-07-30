export const SUPPORTED_LOCALES = ["en", "it"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Locale routes that are intentionally indexable/discoverable.
 * Keep this list explicit so sitemap/LLM docs never expose internal routes.
 */
export const INDEXABLE_LOCALE_PATHS = [
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
  // Insights: articoli (13)
  "insights/value-leak",
  "insights/agenti-ai-in-azienda",
  "insights/ai-act-pmi-alfabetizzazione",
  "insights/ai-intelligenza-artificiale-posti-di-lavoro",
  "insights/ai-per-le-pmi-da-dove-iniziare",
  "insights/automazione-preventivi-documenti-ai",
  "insights/come-integrare-ai-nei-processi",
  "insights/come-misurare-il-roi-dell-ai",
  "insights/come-scegliere-consulenza-ai",
  "insights/competenze-ai-azienda-ai-champion",
  "insights/perche-progetti-ai-falliscono",
  "insights/quanto-costa-l-ai-in-azienda",
  "insights/saas-o-sistema-ai-su-misura",
] as const;

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

export function buildLocalizedPath(locale: SupportedLocale, path: string): string {
  const normalized = path.trim();
  if (normalized.length === 0) {
    return `/${locale}`;
  }
  return `/${locale}/${normalized}`;
}

export function buildLocalizedUrl(baseUrl: string, locale: SupportedLocale, path: string): string {
  return `${baseUrl}${buildLocalizedPath(locale, path)}`;
}

export function buildLocaleAlternates(path: string, locale: SupportedLocale) {
  return {
    canonical: buildLocalizedPath(locale, path),
    languages: {
      en: buildLocalizedPath("en", path),
      it: buildLocalizedPath("it", path),
      "x-default": buildLocalizedPath("en", path),
    },
  };
}

export function getIndexableLocalizedEntries(baseUrl: string) {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INDEXABLE_LOCALE_PATHS.map((path) => ({
      locale,
      path,
      url: buildLocalizedUrl(baseUrl, locale, path),
    }))
  );
}

export function getIndexableCaseStudyEntries() {
  return [];
}
