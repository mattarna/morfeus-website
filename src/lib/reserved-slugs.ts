/**
 * Reserved slugs that CANNOT be used as funnel slugs.
 * These are either locale prefixes, site pages, or system routes.
 * 
 * Update this set whenever a new top-level site page is added.
 */
export const RESERVED_SITE_SLUGS = new Set([
  // Locale prefixes
  "it",
  "en",

  // Site madre pages (under /[locale]/...)
  "servizi",
  "case-study",
  "portal",
  "privacy",
  "cookies",
  "forge",
  "lab",
  "call-confirmed",
  "aperitalk",
  "aperitivo",

  // System routes
  "api",
  "_next",
  "_vercel",
  "__funnels",
  "funnel-internal",
  "mockup",
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SITE_SLUGS.has(slug);
}
