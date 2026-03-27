import { MetadataRoute } from "next";
import { getIndexableLocalizedEntries } from "@/lib/seo/public-indexing";

/**
 * Controlled sitemap generation.
 * Only includes explicitly whitelisted public pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://morfeushub.com";
  const lastModified = new Date();

  const entries = getIndexableLocalizedEntries(baseUrl);

  return entries.map(({ locale, path, url }) => {
    const counterpartLocale = locale === "en" ? "it" : "en";
    const counterpart = path.length === 0
      ? `${baseUrl}/${counterpartLocale}`
      : `${baseUrl}/${counterpartLocale}/${path}`;

    return {
      url,
      lastModified,
      changeFrequency: path.length === 0 ? "weekly" : "monthly",
      priority: path.length === 0 ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: locale === "en" ? url : counterpart,
          it: locale === "it" ? url : counterpart,
        },
      },
    };
  });
}
