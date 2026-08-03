/* ============================================================
   GLI INDIRIZZI DEGLI ARTICOLI, NELLE DUE LINGUE
   ------------------------------------------------------------
   Fino a qui il sito aveva un percorso solo per pagina, uguale
   nelle due lingue: `buildLocaleAlternates("insights/value-leak")`
   bastava perche' l'italiano e l'inglese vivevano sullo stesso
   slug. Per gli articoli non regge piu': un lettore inglese che
   cerca "how much does AI cost" non deve trovare un indirizzo che
   dice `quanto-costa-l-ai-in-azienda`, e nemmeno un motore.

   Quindi qui, e SOLO qui, sta la coppia. Chi ha bisogno dell'altro
   lato passa da `slugArticolo(...)`: nessuno costruisce l'indirizzo
   dell'altra lingua a mano, altrimenti hreflang e canonical
   divergono in silenzio e nessuno se ne accorge per mesi.

   GLI SLUG ITALIANI NON SI TOCCANO. Sono online, sono in sitemap e
   sono linkati dagli articoli fra loro: cambiarli e' buttare via
   quello che hanno accumulato. Cambia solo il lato inglese, che
   fino a oggi serviva contenuto italiano su un indirizzo italiano
   e quindi non ha niente da perdere. I vecchi indirizzi inglesi
   restano raggiungibili: il redirect 301 sta in next.config.mjs.

   `value-leak` e' identico nelle due lingue apposta: e' un termine
   del vocabolario Morfeus, non una parola italiana da tradurre.
   ============================================================ */

import type { SupportedLocale } from "./seo/public-indexing";

export type CoppiaSlug = { it: string; en: string };

export const COPPIE_SLUG_ARTICOLI: readonly CoppiaSlug[] = [
  { it: "value-leak", en: "value-leak" },
  { it: "agenti-ai-in-azienda", en: "ai-agents-in-business" },
  { it: "ai-act-pmi-alfabetizzazione", en: "ai-act-ai-literacy-obligation" },
  { it: "ai-intelligenza-artificiale-posti-di-lavoro", en: "will-ai-replace-jobs" },
  { it: "ai-per-le-pmi-da-dove-iniziare", en: "ai-for-small-business-where-to-start" },
  { it: "automazione-preventivi-documenti-ai", en: "automating-quotes-and-documents-with-ai" },
  { it: "come-integrare-ai-nei-processi", en: "how-to-integrate-ai-into-workflows" },
  { it: "come-misurare-il-roi-dell-ai", en: "how-to-measure-ai-roi" },
  { it: "come-scegliere-consulenza-ai", en: "how-to-choose-an-ai-consultancy" },
  { it: "competenze-ai-azienda-ai-champion", en: "ai-skills-and-the-ai-champion" },
  { it: "perche-progetti-ai-falliscono", en: "why-ai-projects-fail" },
  { it: "quanto-costa-l-ai-in-azienda", en: "how-much-does-ai-cost-in-business" },
  { it: "saas-o-sistema-ai-su-misura", en: "saas-or-custom-ai-system" },
] as const;

/** Lo slug di un articolo nella lingua chiesta, partendo da quello in una qualsiasi delle due. */
export function slugArticolo(slug: string, verso: SupportedLocale): string | null {
  const coppia = COPPIE_SLUG_ARTICOLI.find((c) => c.it === slug || c.en === slug);
  return coppia ? coppia[verso] : null;
}

/** Tutti gli slug di una lingua, nell'ordine in cui stanno qui sopra. */
export function slugArticoliDi(locale: SupportedLocale): string[] {
  return COPPIE_SLUG_ARTICOLI.map((c) => c[locale]);
}

/** La coppia a partire dallo slug di una delle due lingue. */
export function coppiaSlugArticolo(slug: string): CoppiaSlug | null {
  return COPPIE_SLUG_ARTICOLI.find((c) => c.it === slug || c.en === slug) ?? null;
}

/**
 * Riscrive un percorso interno (`/insights/<slug>`) nella lingua chiesta.
 * Gli altri percorsi tornano intatti: e' pensato per gli `internalLinks`
 * nel frontmatter degli articoli, che sono un misto di rotte semplici
 * (`/roiometro`, `/marf`) e di rimandi ad altri articoli.
 */
export function traduciPercorsoInterno(href: string, verso: SupportedLocale): string {
  const m = href.match(/^\/insights\/([^/#?]+)(.*)$/);
  if (!m) return href;
  const tradotto = slugArticolo(m[1], verso);
  return tradotto ? `/insights/${tradotto}${m[2]}` : href;
}
