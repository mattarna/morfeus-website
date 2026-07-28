import Link from "next/link";

/* I colori passano da variabili CSS (definite nei token .ms di site.css)
   invece che da hex inline: l'inline batte ogni classe, quindi cablati
   qui il footer restava fuori da qualsiasi cambio di palette.
   I fallback replicano i token e servono solo se il footer finisse
   renderizzato fuori da .ms. */
const GRID_BG = {
  backgroundColor: "var(--footer-bg, #0B0B0C)",
  backgroundImage:
    "linear-gradient(var(--footer-grid, rgba(140,165,247,.055)) 1px,transparent 1px),linear-gradient(90deg,var(--footer-grid, rgba(140,165,247,.055)) 1px,transparent 1px)",
  backgroundSize: "36px 36px",
} as const;

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
      ["marf", "MARF"],
      ["playground", "Playground"],
      ["privacy", "Privacy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Pillola rossa", or: "o", b: "pillola blu", end: ". A te la scelta." },
    loc: "Milano, Italia",
    copyright: "Numanity S.r.l.",
    made: "Made with love, by Morfeus and a lot of AI.",
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
      ["marf", "MARF"],
      ["playground", "Playground"],
      ["privacy", "Privacy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Red pill", or: "or", b: "blue pill", end: ". The choice is yours." },
    loc: "Milan, Italy",
    copyright: "Numanity S.r.l.",
    made: "Made with love, by Morfeus and a lot of AI.",
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
      {/* Gradiente di stacco in cima */}
      <div
        className="absolute inset-x-0 top-0 h-[120px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, var(--footer-fade, #0B0B0C) 0%, var(--footer-fade-mid, rgba(11,11,12,0.6)) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-20 pt-24 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-20 lg:gap-x-28">
          {/* Col 1 — Navigazione */}
          <nav className="flex flex-col gap-5 md:gap-8" aria-label={t.navTitle}>
            <h4 className={colTitle}>{t.navTitle}</h4>
            <div className="flex flex-col gap-2.5 md:gap-3">
              {t.nav.map(([slug, label]) => (
                <Link key={label} href={slug ? `${base}/${slug}` : base} className={linkCls}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Col 2 — Social */}
          <div className="flex flex-col gap-5 md:gap-8">
            <h4 className={colTitle}>{t.socialTitle}</h4>
            <div className="flex flex-col gap-2.5 md:gap-3">
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
          <div className="flex flex-col gap-5 md:gap-8">
            <h4 className={colTitle}>{t.infoTitle}</h4>
            <div className="flex flex-col gap-2.5 md:gap-3">
              {t.info.map(([slug, label]) => (
                <Link key={slug} href={`${base}/${slug}`} className={linkCls}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Contatto + firma + copyright */}
          <div className="flex flex-col gap-6 md:gap-8 col-span-2 md:col-span-1 md:items-end md:text-right">
            <p className="font-plex text-[11px] md:text-[12px] tracking-[0.14em] uppercase font-semibold">
              <span className="text-anomalia">{t.quote.a}</span>
              <span className="text-ombra"> {t.quote.or} </span>
              <span className="text-lilla">{t.quote.b}</span>
              <span className="text-carta/70">{t.quote.end}</span>
            </p>

            <div className="flex flex-col gap-2 md:items-end mt-2">
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

            <div className="flex flex-col items-start md:items-end gap-2 mt-8">
              <span className="font-plex text-[11px] text-ombra tracking-wide">
                &copy;{year} Morfeus &middot; {t.copyright}
              </span>
              <span className="font-plex text-[11px] text-carta/50 flex items-center gap-1.5">
                <span className="text-firma">&#x1F49C;</span>
                <span className="italic">{t.made}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo wordmark filigrana — stesso asset della home */}
      <div
        className="pointer-events-none select-none absolute bottom-0 left-0 right-0 hidden md:block"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      >
        <div className="relative w-full max-w-[1400px] aspect-[4/1] mx-auto translate-y-[30%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/morfeus-mark.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: "brightness(0.9) saturate(1.3)",
              mixBlendMode: "lighten",
            }}
          />
        </div>
      </div>

      {/* System Operational */}
      <div className="absolute right-6 md:right-10 bottom-5 z-20 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
        <span className="font-plex text-[10px] uppercase tracking-[0.18em] text-ombra">
          {t.status}
        </span>
      </div>
    </footer>
  );
}
