import { Home2026 } from "@/components/home2026/full/Home2026";

/**
 * HOME UFFICIALE — brand 2026.
 *
 * Dal 2026-07-30 la home del sito è la scena "Dossier" (`Home2026`): fasce
 * piene carta/inchiostro che si sfogliano, scroll a scatti sui display alti
 * e scorrimento nativo sui laptop (vedi `engine/useDemoScroll.ts`).
 *
 * Prima qui viveva la home precedente: un componente client di ~260 righe
 * costruito su `useScrollStore` + le sezioni in `components/sections/`.
 * Quella versione NON è cancellata, vive nella cronologia git (il commit
 * che introduce questo file). I suoi componenti restano nel repo: `HomeHero`,
 * `Manifesto`, `TimelineNav`, `SystemStatus` e compagnia sono ancora
 * importati da altre pagine, quindi non diventano codice morto.
 *
 * NIENTE metadata qui: title, description e OpenGraph della home arrivano dal
 * layout della lingua (`[locale]/layout.tsx`, chiavi i18n `title`/`description`).
 * La vecchia route di anteprima `/home-2026` li sovrascriveva con un `noindex`:
 * quel file è stato rimosso e sostituito da un redirect in `next.config.mjs`.
 */
export default function Home() {
  return <Home2026 />;
}
