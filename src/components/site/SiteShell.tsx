import type { ReactNode } from "react";
import { clashDisplay, jetbrainsMono, playfair, plusJakarta } from "./fonts";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LoaderSito } from "./loader/LoaderSito";
import "./site.css";

/**
 * Shared shell for every official-site content page.
 * Provides the scoped `.ms` design system + brand-2026 font vars, and wraps
 * content with the global header/footer. Server component (crawlable).
 *
 * IL LOADER STA QUI e non pagina per pagina: e' del sito, non di una
 * pagina. Cosi' vale per tutte quelle che passano di qua senza doverlo
 * ricordare a ogni pagina nuova, e chi entra da un caso trovato su
 * Google lo vede come chi entra dalla home. Si mostra una volta per
 * sessione: la regola sta dentro LoaderSito.
 */
export function SiteShell({ locale, children }: { locale: "it" | "en"; children: ReactNode }) {
  return (
    <div className={`ms ${clashDisplay.variable} ${plusJakarta.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <LoaderSito />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
