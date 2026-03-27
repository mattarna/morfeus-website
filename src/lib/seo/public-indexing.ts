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
  "privacy",
  "cookies",
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

export function getIndexableCaseStudyEntries(baseUrl: string) {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INDEXABLE_CASE_STUDY_SLUGS.map((slug) => {
      const path = `case-study/${slug}`;
      return {
        locale,
        path,
        url: buildLocalizedUrl(baseUrl, locale, path),
      };
    })
  );
}
