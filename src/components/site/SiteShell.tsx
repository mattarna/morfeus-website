import type { ReactNode } from "react";
import { bodyTestVars, clashDisplay, jetbrainsMono, playfair, satoshi } from "./fonts";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import "./site.css";
import "./site-body-test.css";

/**
 * Shared shell for every official-site content page.
 * Provides the scoped `.ms` design system + brand-2026 font vars, and wraps
 * content with the global header/footer. Server component (crawlable).
 */
export function SiteShell({ locale, children }: { locale: "it" | "en"; children: ReactNode }) {
  return (
    <div className={`ms ${clashDisplay.variable} ${satoshi.variable} ${playfair.variable} ${jetbrainsMono.variable} ${bodyTestVars}`}>
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
