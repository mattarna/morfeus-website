"use client";

import { usePathname } from "next/navigation";

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
 */
export function LangSwitch({ locale, label }: { locale: "it" | "en"; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const other = locale === "it" ? "en" : "it";

  /* Sostituisce SOLO il primo segmento: /it/casi -> /en/casi. Se per
     qualche motivo il prefisso non c'e', si ripiega sulla home. */
  const target = pathname.startsWith(`/${locale}`)
    ? `/${other}${pathname.slice(locale.length + 1)}`
    : `/${other}`;

  return (
    <a href={target} className="lang-switch" aria-label={label}>
      <span data-on={locale === "it"}>IT</span>
      <span aria-hidden="true">/</span>
      <span data-on={locale === "en"}>EN</span>
    </a>
  );
}
