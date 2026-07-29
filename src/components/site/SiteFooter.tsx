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

/* Gli stessi tre della home, nello stesso ordine. Prima qui c'era
   Instagram al posto di X: due footer che elencano social diversi
   sono due footer diversi, e basta quello a farli sembrare tali. */
const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/company/morfeus-hub-ai/"],
  ["X (Twitter)", "https://x.com"],
  ["Youtube", "https://youtube.com"],
] as const;

const COPY = {
  it: {
    navTitle: "Navigazione",
    /* NOTA: sulla home questa colonna elenca le SEZIONI del deck
       (Inizio, Visione, Il Problema...). Qui elenca le PAGINE, perche'
       quelle sezioni fuori dalla home non esistono. E' l'unica
       differenza rimasta fra i due footer, ed e' una differenza di
       destinazione, non di forma. */
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
    socialTitle: "Social",
    infoTitle: "Informazioni",
    info: [
      ["privacy", "Privacy Policy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Pillola rossa", or: "o", b: "pillola blu", end: ". A te la scelta." },
    loc: "Milano, Italia",
    copyright: "Tutti i diritti riservati.",
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
    socialTitle: "Social",
    infoTitle: "Information",
    info: [
      ["privacy", "Privacy Policy"],
      ["cookies", "Cookie Policy"],
    ],
    quote: { a: "Red pill", or: "or", b: "blue pill", end: ". The choice is yours." },
    loc: "Milan, Italy",
    copyright: "All rights reserved.",
    made: "Made with love, by Morfeus and a lot of AI.",
    status: "System Operational",
  },
} as const;

export function SiteFooter({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    /* ALTO QUANTO LO SCHERMO (2026-07-28). Sulla home il footer non e'
       una striscia in fondo alla pagina: e' l'ultimo pannello del deck,
       e occupa una schermata intera. Qui era una fascia alta quanto il
       suo contenuto, ed era l'ultima cosa che faceva sembrare i due
       footer due oggetti diversi.
       min-height e non height: se un giorno le colonne crescono, il
       footer si allunga invece di tagliare. */
    <footer
      className="relative flex min-h-screen flex-col justify-center overflow-hidden text-carta"
      style={GRID_BG}
    >
      {/* Gradiente di stacco in cima */}
      <div
        className="absolute inset-x-0 top-0 h-[120px] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, var(--footer-fade, #0B0B0C) 0%, var(--footer-fade-mid, rgba(11,11,12,0.6)) 40%, transparent 100%)",
        }}
      />

      {/* Stessa imbottitura del pannello footer della home
          (`.d26 section.panel`): con px-6/md:px-16/lg:px-20 le colonne
          partivano piu' verso il centro e la quarta si stringeva, ed e' da
          li' che nascevano gli a-capo nel blocco legale. */}
      <div
        className="relative z-10 w-full"
        style={{ padding: "clamp(72px, 7vw, 92px) clamp(20px, 5vw, 40px)" }}
      >
        <div className="msf-grid">
          {/* Col 1 — Navigazione */}
          <nav aria-label={t.navTitle}>
            <h4>{t.navTitle}</h4>
            {t.nav.map(([slug, label]) => (
              <Link key={label} href={slug ? `${base}/${slug}` : base}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Col 2 — Social */}
          <div>
            <h4>{t.socialTitle}</h4>
            {SOCIAL.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>

          {/* Col 3 — Info */}
          <div>
            <h4>{t.infoTitle}</h4>
            {t.info.map(([slug, label]) => (
              <Link key={slug} href={`${base}/${slug}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Col 4 — Contatto + firma + copyright */}
          <div className="msf-brandcol">
            <p className="msf-pill">
              <span style={{ color: "var(--anomalia)" }}>{t.quote.a}</span>
              <span style={{ color: "var(--ombra)" }}> {t.quote.or} </span>
              <span style={{ color: "var(--lilla)" }}>{t.quote.b}</span>
              <span style={{ color: "#c6c4d8" }}>{t.quote.end}</span>
            </p>

            <div className="msf-meta">
              <a className="mail" href="mailto:hello@morfeushub.com">
                hello@morfeushub.com
              </a>
              <br />
              {t.loc}
              <br />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                P.IVA 14209210963
              </span>
            </div>

            <div className="msf-legal">
              &copy;{year} Morfeus. {t.copyright}
              <br />
              <span className="love">&#x1F49C; {t.made}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo wordmark filigrana — stesso asset e stesse misure della home */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/morfeus-mark.png"
        alt=""
        aria-hidden="true"
        className="msf-mark select-none"
        style={{ filter: "brightness(0.9) saturate(1.3)" }}
      />

      {/* System Operational */}
      <div className="msf-status">
        <span className="dot" />
        {t.status}
      </div>
    </footer>
  );
}
