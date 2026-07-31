import { Home2026 } from "@/components/home2026/full/Home2026";
import { LoaderSito } from "@/components/site/loader/LoaderSito";

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
  return (
    <>
      {/* IL SIPARIO CON LA M ANCHE QUI. Le altre pagine lo prendono da
       * SiteShell, ma la home non ci passa: ha un impianto suo. Senza questa
       * riga chi atterrava sulla home non vedeva il sipario, e soprattutto non
       * consumava il cancello di sessione: al primo click interno il sipario si
       * apriva SOPRA la transizione a squadre. Il loader esce in un portal su
       * document.body e si porta dietro la sua classe `.ms`, quindi qui fuori
       * si comporta esattamente come dentro SiteShell. */}
      <LoaderSito />
      <Home2026 />
    </>
  );
}
