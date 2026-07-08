import Link from "next/link";

/**
 * Official-site footer — brand 2026 ("Progettato. Provato.").
 * Re-adaptation of the home footer (HomeFooter) onto the 2026 design system:
 * inchiostro surface + blueprint grid + mono mark watermark + "System Operational"
 * log device. Cross-page nav uses real links (the home footer's scroll-index
 * buttons are dead on content pages). Server component, crawlable.
 */

const GRID_BG = {
  backgroundColor: "#14132E",
  backgroundImage:
    "linear-gradient(rgba(169,156,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(169,156,255,.09) 1px,transparent 1px)",
  backgroundSize: "28px 28px",
} as const;

const MARK_PATHS = [
  "M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z",
  "M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z",
  "M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z",
];

const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/company/morfeus-hub-ai/"],
  ["Instagram", "https://www.instagram.com/morfeushub.ai/"],
  ["YouTube", "https://www.youtube.com/@MorfeusHub"],
] as const;

const COPY = {
  it: {
    navTitle: "Navigazione",
    nav: [
      ["", "Home"],
      ["chi-siamo", "Chi siamo"],
      ["metodo", "Metodo"],
      ["casi", "Casi"],
      ["insights", "Insights"],
      ["impara-ai", "Impara l'AI"],
      ["glossario", "Glossario"],
      ["faq", "FAQ"],
    ],
    socialTitle: "Seguici",
    infoTitle: "Info",
    info: [
      ["privacy", "Privacy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Pillola rossa", or: "o", b: "pillola blu", end: ". A te la scelta." },
    loc: "Milano, Italia",
    copyright: "Numanity S.r.l.",
    made: "Fatto con tanta AI",
    status: "System Operational",
  },
  en: {
    navTitle: "Navigation",
    nav: [
      ["", "Home"],
      ["chi-siamo", "About"],
      ["metodo", "Method"],
      ["casi", "Cases"],
      ["insights", "Insights"],
      ["impara-ai", "Learn AI"],
      ["glossario", "Glossary"],
      ["faq", "FAQ"],
    ],
    socialTitle: "Follow us",
    infoTitle: "Info",
    info: [
      ["privacy", "Privacy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Red pill", or: "or", b: "blue pill", end: ". The choice is yours." },
    loc: "Milan, Italy",
    copyright: "Numanity S.r.l.",
    made: "Made with a lot of AI",
    status: "System Operational",
  },
} as const;

export function SiteFooter({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;
  const year = new Date().getFullYear();
  const colTitle =
    "font-plex text-[11px] uppercase tracking-[0.22em] text-lilla/70 font-medium";
  const linkCls =
    "font-satoshi text-[15px] text-carta/75 hover:text-carta transition-colors w-fit";

  return (
    <footer className="relative overflow-hidden text-carta" style={GRID_BG}>
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 pt-20 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-14">
          {/* Col 1 — Navigazione (link reali cross-pagina) */}
          <nav className="flex flex-col gap-4" aria-label={t.navTitle}>
            <h4 className={colTitle}>{t.navTitle}</h4>
            <div className="flex flex-col gap-2.5">
              {t.nav.map(([slug, label]) => (
                <Link key={label} href={slug ? `${base}/${slug}` : base} className={linkCls}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Col 2 — Social */}
          <div className="flex flex-col gap-4">
            <h4 className={colTitle}>{t.socialTitle}</h4>
            <div className="flex flex-col gap-2.5">
              {SOCIAL.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Info */}
          <div className="flex flex-col gap-4">
            <h4 className={colTitle}>{t.infoTitle}</h4>
            <div className="flex flex-col gap-2.5">
              {t.info.map(([slug, label]) => (
                <Link key={slug} href={`${base}/${slug}`} className={linkCls}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Contatto + firma */}
          <div className="flex flex-col gap-5 col-span-2 md:col-span-1 md:items-end md:text-right">
            <p className="font-plex text-[11px] tracking-[0.14em] uppercase">
              <span className="text-anomalia">{t.quote.a}</span>
              <span className="text-ombra"> {t.quote.or} </span>
              <span className="text-lilla">{t.quote.b}</span>
              <span className="text-carta/70">{t.quote.end}</span>
            </p>
            <div className="flex flex-col gap-1.5 md:items-end">
              <a
                href="mailto:hello@morfeushub.com"
                className="font-clash text-[17px] text-carta hover:text-lilla transition-colors"
              >
                hello@morfeushub.com
              </a>
              <span className="font-satoshi text-[14px] text-carta/60">{t.loc}</span>
              <span className="font-plex text-[11px] text-ombra tracking-wide">
                P.IVA 14209210963
              </span>
            </div>
          </div>
        </div>

        {/* Barra finale */}
        <div className="mt-16 pt-6 border-t border-riga-scuro flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <span className="font-plex text-[11px] text-ombra tracking-wide">
            &copy; {year} Morfeus &middot; {t.copyright}
          </span>
          <span className="font-plex text-[11px] text-ombra tracking-wide italic">{t.made}</span>
        </div>
      </div>

      {/* Mark mono gigante in filigrana (currentColor, nessun gradiente) */}
      <div
        className="pointer-events-none select-none absolute -bottom-[8%] left-1/2 -translate-x-1/2 w-[min(1100px,120%)] text-carta/[0.05] hidden md:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1000 476" fill="currentColor" className="w-full h-auto">
          {MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>

      {/* System Operational — dispositivo log a vista */}
      <div className="absolute right-6 md:right-10 bottom-5 z-20 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
        <span className="font-plex text-[10px] uppercase tracking-[0.18em] text-ombra">
          {t.status}
        </span>
      </div>
    </footer>
  );
}
