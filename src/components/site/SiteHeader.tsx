import Link from "next/link";
import Image from "next/image";

/**
 * Official-site header — v7 light-first (server component, crawlable).
 * Brand = Morfeus logo image (white mark inverted to dark for the light header).
 */
const NAV = {
  it: {
    items: [["metodo", "Metodo"], ["servizi", "Servizi"], ["insights", "Insights"], ["glossario", "Glossario"]],
    cta: "Prova il ROIometro",
  },
  en: {
    items: [["metodo", "Method"], ["servizi", "Services"], ["insights", "Insights"], ["glossario", "Glossary"]],
    cta: "Try the ROIometro",
  },
} as const;

export function SiteHeader({ locale }: { locale: "it" | "en" }) {
  const t = NAV[locale];
  const base = `/${locale}`;
  return (
    <header className="hdr">
      <nav className="nav">
        <Link className="brand" href={base} aria-label="Morfeus">
          <Image
            src="/images/brand/morfeus-mark.png"
            alt="Morfeus"
            width={170}
            height={22}
            priority
            style={{ height: 22, width: "auto", filter: "brightness(0)" }}
          />
        </Link>
        <div className="menu">
          {t.items.map(([slug, label]) => (
            <Link key={slug} href={`${base}/${slug}`}>{label}</Link>
          ))}
        </div>
        <div className="nav-cta">
          <a className="btn btn-solid" href={`${base}/roiometro`}>{t.cta}</a>
        </div>
      </nav>
    </header>
  );
}
