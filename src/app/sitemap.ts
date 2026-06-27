import { MetadataRoute } from "next";
import { getIndexableCaseStudyEntries, getIndexableLocalizedEntries } from "@/lib/seo/public-indexing";
import { funnelRegistry, getRegisteredFunnelConfig } from "@/funnels/registry";

/**
 * Controlled sitemap generation.
 * Only includes explicitly whitelisted public pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://morfeushub.com";
  const lastModified = new Date();

  const localizedEntries = [
    ...getIndexableLocalizedEntries(baseUrl),
    ...getIndexableCaseStudyEntries(baseUrl),
  ];

  const localizedSitemapEntries: MetadataRoute.Sitemap = localizedEntries.map(({ locale, path, url }) => {
    const counterpartLocale = locale === "en" ? "it" : "en";
    const counterpart =
      path.length === 0 ? `${baseUrl}/${counterpartLocale}` : `${baseUrl}/${counterpartLocale}/${path}`;

    return {
      url,
      lastModified,
      changeFrequency: path.length === 0 ? "weekly" : "monthly",
      priority: path.length === 0 ? 1.0 : path.startsWith("case-study/") ? 0.7 : 0.8,
      alternates: {
        languages: {
          en: locale === "en" ? url : counterpart,
          it: locale === "it" ? url : counterpart,
        },
      },
    };
  });

  const funnelSitemapEntries: MetadataRoute.Sitemap = Object.values(funnelRegistry).flatMap((item) => {
    // Solo funnel indicizzabili: i noindex non devono comparire in sitemap (no segnale contraddittorio)
    if (!item.indexable) {
      return [];
    }
    const config = getRegisteredFunnelConfig(item.slug);
    if (!config) {
      return [];
    }

    return config.steps
      .filter((step) => !step.noindex) // escludi step noindex (es. thank-you / conversion)
      .map((step) => {
      const normalizedStepPath = step.path.trim().replace(/^\/+|\/+$/g, "");
      const url =
        normalizedStepPath.length === 0
          ? `${baseUrl}/${item.slug}`
          : `${baseUrl}/${item.slug}/${normalizedStepPath}`;

      return {
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: step.isConversion ? 0.7 : 0.6,
      };
    });
  });

  return [...localizedSitemapEntries, ...funnelSitemapEntries];
}
