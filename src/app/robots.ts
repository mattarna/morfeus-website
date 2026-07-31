import type { MetadataRoute } from "next";
import {
  NON_INDEXABLE_LOCALE_PREFIXES,
  SUPPORTED_LOCALES,
  buildLocalizedPath,
} from "@/lib/seo/public-indexing";
import { SITE_URL } from "@/lib/seo/entity-ids";

/* ============================================================
   ROBOTS.TXT, GENERATO E NON SCRITTO A MANO
   ------------------------------------------------------------
   Era un file statico in public/. Diceva due cose non piu' vere:
   la sitemap sul dominio nudo (che redirige verso www) e i blocchi
   scritti come /en/portal/, quando l'inglese non ha piu' il
   prefisso e vive su /portal/. Le aree private inglesi restavano
   quindi fuori dal blocco.

   Ora host e percorsi arrivano dagli stessi helper che generano
   canonical e sitemap: se cambia la strategia dei prefissi, questo
   file la segue da solo invece di mentire in silenzio.
   ============================================================ */

const CRAWLER_AI = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "Google-Extended",
  "PerplexityBot",
  "Bytespider",
  "Applebot-Extended",
];

/** /portal/ e /it/portal/ ... in tutte le lingue, prefissate e non. */
function areeVietate(): string[] {
  const percorsi = SUPPORTED_LOCALES.flatMap((locale) =>
    NON_INDEXABLE_LOCALE_PREFIXES.map((sezione) => `${buildLocalizedPath(locale, sezione)}/`)
  );
  return [...new Set(percorsi)].sort();
}

export default function robots(): MetadataRoute.Robots {
  const vietate = ["/api/", "/_vercel/", "/__funnels/", "/mockup/", ...areeVietate()];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...vietate,
          // Cartelle di lavoro finite in public/: non sono pagine.
          "/Transition%20Materials/",
          "/skill-wcag-accessibility-1.0.0/",
          "/freebies/",
        ],
      },
      // I crawler AI sono ammessi esplicitamente: senza una riga con il
      // loro nome, alcuni applicano la policy piu' restrittiva che
      // trovano invece di quella generica.
      ...CRAWLER_AI.map((userAgent) => ({ userAgent, allow: "/", disallow: vietate })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
