import Link from "next/link";

/**
 * Official-site footer — same look as the forge/lab footer (ServiceFooter),
 * adapted for content pages: real cross-page nav (incl. Home) instead of the
 * funnel's in-page anchors. Server component, crawlable.
 */

const COPY = {
  it: {
    siteTitle: "Sito",
    nav: [["", "Home"], ["chi-siamo", "Chi siamo"], ["forge", "Forge"], ["lab", "Lab"]],
    infoTitle: "Info",
    info: [["privacy", "Privacy"], ["cookies", "Cookie Policy"]],
    contactTitle: "Contatto",
    loc: "Milano, Italia",
    quote: { a: "Pillola rossa", or: "o", b: "pillola blu", end: ". A te la scelta." },
    made: "Fatto con tanta AI",
  },
  en: {
    siteTitle: "Site",
    nav: [["", "Home"], ["chi-siamo", "About"], ["forge", "Forge"], ["lab", "Lab"]],
    infoTitle: "Info",
    info: [["privacy", "Privacy"], ["cookies", "Cookie Policy"]],
    contactTitle: "Contact",
    loc: "Milan, Italy",
    quote: { a: "Red pill", or: "or", b: "blue pill", end: ". The choice is yours." },
    made: "Made with a lot of AI",
  },
} as const;

export function SiteFooter({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;
  const year = 2026;
  return (
    <footer className="ftr">
      <div className="c">
        <div className="grid">
          <div>
            <h4>{t.siteTitle}</h4>
            {t.nav.map(([slug, label]) => (
              <Link key={label} href={slug ? `${base}/${slug}` : base}>{label}</Link>
            ))}
          </div>
          <div>
            <h4>{t.infoTitle}</h4>
            {t.info.map(([slug, label]) => (
              <Link key={slug} href={`${base}/${slug}`}>{label}</Link>
            ))}
          </div>
          <div className="contact">
            <h4>{t.contactTitle}</h4>
            <a className="email" href="mailto:hello@morfeushub.com">hello@morfeushub.com</a>
            <span className="loc">{t.loc}</span>
            <span className="piva">P.IVA 14209210963</span>
          </div>
        </div>
        <div className="quote">
          <span className="r">{t.quote.a}</span>&nbsp;&nbsp;{t.quote.or}&nbsp;&nbsp;<span className="b">{t.quote.b}</span>{t.quote.end}
        </div>
        <div className="bar">
          <span>© {year} Morfeus — Numanity S.r.l.</span>
          <span>{t.made}</span>
        </div>
      </div>
    </footer>
  );
}
