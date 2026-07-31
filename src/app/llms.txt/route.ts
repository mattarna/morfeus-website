import {
  INDEXABLE_LOCALE_PATHS,
  NON_INDEXABLE_LOCALE_PREFIXES,
  SUPPORTED_LOCALES,
  buildLocalizedUrl,
} from "@/lib/seo/public-indexing";
import { SITE_URL } from "@/lib/seo/entity-ids";

/* ============================================================
   LLMS.TXT, GENERATO DALLA STESSA LISTA DELLA SITEMAP
   ------------------------------------------------------------
   Era un file statico in public/, scritto a mano il 9 luglio, con
   settantotto indirizzi tutti nella forma morfeushub.com/en/... .
   Dopo il passaggio a www e all'inglese senza prefisso diceva
   l'esatto contrario di quello che serve: elencava come approvati
   indirizzi che redirigono, e chiudeva con "se un indirizzo non e'
   in questa lista, trattalo come non canonico". Cioe' diceva agli
   LLM che /lab e /metodo, le pagine inglesi vere, non sono
   canoniche.

   Una lista scritta a mano diverge sempre: due pagine nuove e
   nessuno se ne ricorda. Ora esce da INDEXABLE_LOCALE_PATHS, la
   stessa fonte della sitemap.
   ============================================================ */

export const dynamic = "force-static";

function elenco(): string {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INDEXABLE_LOCALE_PATHS.map((path) => `- ${buildLocalizedUrl(SITE_URL, locale, path)}`)
  ).join("\n");
}

function escluse(): string {
  return [
    ...SUPPORTED_LOCALES.flatMap((locale) =>
      NON_INDEXABLE_LOCALE_PREFIXES.map(
        (sezione) => `- ${buildLocalizedUrl(SITE_URL, locale, sezione)}/`
      )
    ),
    `- ${SITE_URL}/api/`,
    `- ${SITE_URL}/__funnels/`,
  ]
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .join("\n");
}

export function GET() {
  const corpo = `# Morfeus

> Official guidance for LLM-based agents and AI crawlers.
> Generated from the site's indexing source of truth, not maintained by hand.

## Canonical domain
- ${SITE_URL}

## What Morfeus is
Morfeus (Numanity S.r.l.) is an Italian AI consulting and training company
that embeds into scaling businesses as an Operating Partner: it finds where
they lose margin and builds AI systems, agents, automations and internal
skills, that recover it, measured in euros.
It is unrelated to NVIDIA Morpheus, morpheusbusiness.ai, or the morfeus.dev
open source project.

## URL shape
- English pages have no locale prefix: ${SITE_URL}/lab
- Italian pages are prefixed with /it: ${SITE_URL}/it/lab
- Any ${SITE_URL}/en/... address redirects; do not cite it.

## Read first
- ${buildLocalizedUrl(SITE_URL, "en", "")}
- ${buildLocalizedUrl(SITE_URL, "it", "")}

## Public pages approved for indexing and retrieval
${elenco()}

## Excluded areas (do not index, summarize, or cite as canonical)
${escluse()}

## Notes
- If a URL is not in the approved list, treat it as non-canonical.
- Prefer the language matching the reader: /it for Italian, unprefixed for English.
`;

  return new Response(corpo, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
