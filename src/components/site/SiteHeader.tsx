import Link from "next/link";

/**
 * Official-site header — brand 2026 ("Progettato. Provato.").
 * Fixed inchiostro bar + blur, mono mark watermark + wordmark, real cross-page
 * nav (sito madre), firma CTA. Server component (crawlable).
 * Pairs with SiteFooter; both use the 2026 Tailwind tokens (no site.css).
 */

const MARK_PATHS = [
  "M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z",
  "M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z",
  "M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z",
];

const COPY = {
  it: {
    nav: [
      ["home-2026", "Home"],
      ["chi-siamo", "Chi siamo"],
      ["metodo", "Metodo"],
      ["forge", "MARF"],
      ["lab", "LAB"],
      ["casi", "Casi"],
      ["insights", "Insights"],
    ],
    cta: "Prova il ROIometro",
    home: "Morfeus, home",
  },
  en: {
    nav: [
      ["home-2026", "Home"],
      ["chi-siamo", "About"],
      ["metodo", "Method"],
      ["forge", "MARF"],
      ["lab", "LAB"],
      ["casi", "Cases"],
      ["insights", "Insights"],
    ],
    cta: "Try the ROIometro",
    home: "Morfeus, home",
  },
} as const;

export function SiteHeader({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-riga-scuro bg-inchiostro/85 text-carta backdrop-blur-[14px]">
      <nav
        className="mx-auto flex h-full max-w-[1180px] items-center justify-between gap-6 px-4 md:px-10"
        aria-label="Principale"
      >
        {/* Marchio: mark mono + wordmark */}
        <Link href={`${base}/home-2026`} className="flex items-center gap-2.5" aria-label={t.home}>
          <svg viewBox="0 0 1000 476" fill="currentColor" className="w-[26px] shrink-0" aria-hidden="true">
            {MARK_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
          <span className="font-clash text-[17px] font-semibold tracking-[-0.01em]">Morfeus</span>
        </Link>

        {/* Nav reale cross-pagina */}
        <div className="hidden items-center gap-[26px] lg:gap-[30px] font-plex text-[12px] uppercase tracking-[0.14em] text-carta/75 md:flex">
          {t.nav.map(([slug, label]) => (
            <Link
              key={label}
              href={slug ? `${base}/${slug}` : base}
              className="whitespace-nowrap transition-colors hover:text-carta"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA firma */}
        <a
          href={`${base}/roiometro`}
          className="rounded-[8px] bg-firma px-[18px] py-[11px] font-plex text-[12px] font-semibold text-white transition-colors hover:bg-firma-hover"
        >
          {t.cta}
        </a>
      </nav>
    </header>
  );
}
