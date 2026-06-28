import Link from "next/link";

/**
 * Official-site sticky header — "forge hand" (server component, crawlable).
 * Shared chrome for all non-home content pages. Home/forge/lab keep theirs.
 */

const NAV = {
  it: { items: [["chi-siamo", "Chi siamo"], ["forge", "Forge"], ["lab", "Lab"]], cta: "Parliamone", status: "System Operational" },
  en: { items: [["chi-siamo", "About"], ["forge", "Forge"], ["lab", "Lab"]], cta: "Let’s talk", status: "System Operational" },
} as const;

export function SiteHeader({ locale }: { locale: "it" | "en" }) {
  const t = NAV[locale];
  const base = `/${locale}`;
  return (
    <header className="hdr">
      <div className="in">
        <Link href={base} className="brand" aria-label="Morfeus">
          <span className="mk" aria-hidden>M</span>
          <b>Morfeus</b>
        </Link>
        <div className="right">
          <span className="status"><span className="d" aria-hidden /><span>{t.status}</span></span>
          <nav className="navlinks">
            {t.items.map(([slug, label]) => (
              <Link key={slug} href={`${base}/${slug}`}>{label}</Link>
            ))}
          </nav>
          <a href="mailto:hello@morfeushub.com" className="cta">{t.cta}</a>
        </div>
      </div>
    </header>
  );
}
