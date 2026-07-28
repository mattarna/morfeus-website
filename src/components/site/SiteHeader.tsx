import Image from "next/image";
import Link from "next/link";

/**
 * Official-site header — brand 2026 ("Progettato. Provato.").
 * Fixed inchiostro bar + blur, mono mark watermark + wordmark, real cross-page
 * nav (sito madre), firma CTA. Server component (crawlable).
 * Pairs with SiteFooter; both use the 2026 Tailwind tokens (no site.css).
 */


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
        {/* Marchio: il lockup UFFICIALE, non una ricostruzione.
            Prima qui c'erano il mark ridisegnato in SVG e la parola
            "Morfeus" composta in Clash: due approssimazioni del logo
            vero, che vive in public/images/brand/morfeus-mark.png ed
            e' gia' quello usato da home, footer e header dei funnel.
            Un logo non si ricompone a mano, si usa. */}
        <Link href={`${base}/home-2026`} className="flex items-center" aria-label={t.home}>
          <Image
            src="/images/brand/morfeus-mark.png"
            alt="Morfeus"
            width={2064}
            height={267}
            priority
            className="h-[26px] w-auto"
          />
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
