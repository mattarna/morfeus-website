import type { ReactNode } from "react";
import { fraunces, plexMono, playfair } from "./fonts";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import "./site.css";

/**
 * Shared shell for every official-site content page.
 * Provides the scoped `.ms` design system + brand-2026 font vars, and wraps
 * content with the global header/footer. Server component (crawlable).
 */
export function SiteShell({ locale, children }: { locale: "it" | "en"; children: ReactNode }) {
  return (
    <div className={`ms ${fraunces.variable} ${plexMono.variable} ${playfair.variable}`}>
      {/* Brand 2026 display/body fonts. TODO self-host (woff2 in public/fonts) per produzione;
          per ora via Fontshare CDN cosi Clash/Satoshi rendono davvero. */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap"
      />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
