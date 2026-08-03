"use client";

import { usePathname } from "next/navigation";
import { traduciPercorsoInterno } from "@/lib/insights-slugs";

/**
 * Toggle IT / EN della barra.
 *
 * E' l'unico pezzo client dell'header, e lo e' per un motivo solo: deve
 * sapere SU QUALE PAGINA sei per mandarti alla stessa pagina nell'altra
 * lingua. Un toggle che riporta sempre alla home fa perdere il posto a
 * chi sta leggendo, ed e' il modo piu' rapido di far chiudere la pagina.
 *
 * Link nudo e non <Link>: il cambio di lingua deve far ricaricare, cosi'
 * next-intl rilegge il locale dalla URL invece di navigare lato client
 * con i messaggi di prima.
 *
 * DUE DIFETTI CORRETTI (2026-08-03).
 *
 * 1. Da QUALSIASI pagina inglese il toggle riportava alla home italiana.
 *    Il codice cercava il prefisso `/en` in cima al percorso, ma con
 *    `localePrefix: 'as-needed'` e default inglese le pagine inglesi
 *    vivono SENZA prefisso: `/metodo`, non `/en/metodo`. Il controllo
 *    falliva sempre e scattava il ripiego sulla home. Esattamente la
 *    cosa che il commento qui sopra dice di voler evitare, e su meta'
 *    del sito.
 *
 * 2. Verso l'italiano puntava allo stesso identico percorso. Sugli
 *    articoli non regge piu': da quando l'inglese ha slug suoi
 *    (src/lib/insights-slugs.ts), `/insights/how-to-measure-ai-roi`
 *    tradotto a mano diventerebbe `/it/insights/how-to-measure-ai-roi`,
 *    che non esiste. Un 404 servito dal bottone della lingua.
 */
export function LangSwitch({ locale, label }: { locale: "it" | "en"; label: string }) {
  const pathname = usePathname() ?? "/";
  const other = locale === "it" ? "en" : "it";

  /* Percorso senza prefisso di lingua, qualunque sia quello attuale:
     /it/casi -> /casi, /metodo -> /metodo, /it -> /. */
  const nudo = pathname.replace(/^\/(it|en)(?=\/|$)/, "") || "/";
  /* Gli articoli cambiano slug fra le due lingue; tutto il resto torna
     identico da qui. */
  const tradotto = traduciPercorsoInterno(nudo, other);
  /* L'inglese non ha prefisso: mettercelo genererebbe un 307 a ogni
     cambio di lingua. */
  const target = other === "en" ? tradotto : `/it${tradotto === "/" ? "" : tradotto}`;

  return (
    <a href={target} className="lang-switch" aria-label={label}>
      <span data-on={locale === "it"}>IT</span>
      <span aria-hidden="true">/</span>
      <span data-on={locale === "en"}>EN</span>
    </a>
  );
}
