import { MetadataRoute } from "next";
import {
  buildLocalizedUrl,
  getIndexableLocalizedEntries,
  percorsoPerLingua,
} from "@/lib/seo/public-indexing";
import { SITE_URL } from "@/lib/seo/entity-ids";
import { funnelRegistry, getRegisteredFunnelConfig } from "@/funnels/registry";

/**
 * Controlled sitemap generation.
 * Only includes explicitly whitelisted public pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const localizedEntries = [
    ...getIndexableLocalizedEntries(baseUrl),
  ];

  const localizedSitemapEntries: MetadataRoute.Sitemap = localizedEntries.map(({ locale, percorso, path, url }) => {
    const counterpartLocale = locale === "en" ? "it" : "en";
    /* L'indirizzo dell'altra lingua passa dallo stesso helper della
       pagina: costruito a mano tornava sempre con /en davanti, cioe'
       un hreflang che redirige.
       E parte da `percorso`, non da `path`: sugli articoli le due lingue
       hanno slug diversi, e riusare il percorso gia' risolto avrebbe
       dichiarato come alternativa italiana lo slug inglese. */
    const counterpart = buildLocalizedUrl(
      baseUrl,
      counterpartLocale,
      percorsoPerLingua(percorso, counterpartLocale)
    );

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

  /* Il Playground vive sul sottodominio e si serve alla radice
     (playground.morfeushub.com, rewrite per host in next.config). Va
     nella sitemap perche' e' pubblico e va indicizzato; l'host diverso
     e' voluto, Google tratta il sottodominio come sito a se'. */
  const playgroundEntry: MetadataRoute.Sitemap = [
    {
      url: "https://playground.morfeushub.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [...localizedSitemapEntries, ...funnelSitemapEntries, ...playgroundEntry];
}
