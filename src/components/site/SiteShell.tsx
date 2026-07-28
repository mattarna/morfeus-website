import type { ReactNode } from "react";
import { clashDisplay, playfair, plusJakarta, satoshi } from "./fonts";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import "./site.css";
import "./site-font-experiment.css";
import "./site-palette-experiment.css";

/**
 * Shared shell for every official-site content page.
 * Provides the scoped `.ms` design system + brand-2026 font vars, and wraps
 * content with the global header/footer. Server component (crawlable).
 */
export function SiteShell({ locale, children }: { locale: "it" | "en"; children: ReactNode }) {
  return (
    <div
      className={`ms ${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${plusJakarta.variable}`}
    >
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
