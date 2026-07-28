import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "./LangSwitch";

/**
 * La voce MARF punta a /marf, non piu' a /forge. Erano due pagine
 * diverse con lo stesso nome: /forge e' la VECCHIA pagina MARF (il suo
 * metaTitle dice ancora "MARF · Operating Partner AI"), /marf e' quella
 * rifatta sul copy approvato. Il menu mandava alla vecchia.
 * /forge resta raggiungibile: e' la pagina dell'offerta Morf Forge, ed
 * e' linkata dal Lab. Il suo metaTitle pero' e' rimasto quello di MARF
 * e andra' sistemato quando si tocca quella pagina.
 *
 * ALLINEATO ALLA HOME (2026-07-28).
 * Anche nella LARGHEZZA: la barra non ha piu' un contenitore da 1180px
 * centrato, che spingeva logo e bottone verso il centro mentre sulla
 * home stanno agli estremi dello schermo. Ora l'imbottitura e' la
 * stessa della home, clamp(20px,3vw,34px), e i due capi sono ai bordi. Le voci, la tipografia della nav e
 * l'etichetta della CTA sono ora quelle della barra della home-2026:
 * stesse sei destinazioni (senza "Home", che si raggiunge dal logo),
 * corpo a 16px maiuscolo con tracking .06em invece del mono a 12, e
 * "Prenota una chiamata" al posto di "Prova il ROIometro".
 *
 * UNA DIFFERENZA RESTA, ed e' voluta: qui la barra ha un fondo velato
 * e un filetto, mentre sulla home e' trasparente. Sulla home il fondo
 * cambia fascia per fascia e la barra si ricolora di conseguenza; su
 * una pagina che scorre sotto, una barra trasparente lascia il testo
 * che passa dietro alle voci del menu. Se la vuoi trasparente anche
 * qui, si toglie una riga.
 *
 * Official-site header — brand 2026 ("Progettato. Provato.").
 * Fixed inchiostro bar + blur, mono mark watermark + wordmark, real cross-page
 * nav (sito madre), firma CTA. Server component (crawlable).
 * Pairs with SiteFooter; both use the 2026 Tailwind tokens (no site.css).
 */


const COPY = {
  it: {
    nav: [
      ["chi-siamo", "Chi siamo"],
      ["metodo", "Metodo"],
      ["marf", "MARF"],
      ["lab", "LAB"],
      ["casi", "Casi"],
      ["insights", "Insights"],
    ],
    cta: "Prenota una chiamata",
    home: "Morfeus, home",
    langLabel: "Passa all'inglese",
  },
  en: {
    nav: [
      ["chi-siamo", "About"],
      ["metodo", "Method"],
      ["marf", "MARF"],
      ["lab", "LAB"],
      ["casi", "Cases"],
      ["insights", "Insights"],
    ],
    cta: "Book a call",
    home: "Morfeus, home",
    langLabel: "Passa all'italiano",
  },
} as const;

export function SiteHeader({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-riga-scuro/70 bg-inchiostro/80 text-carta backdrop-blur-[14px]">
      <nav
        className="flex h-full items-center justify-between gap-6 px-[clamp(20px,3vw,34px)]"
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
            className="h-[20px] w-auto"
          />
        </Link>

        {/* Nav reale cross-pagina */}
        <div className="hidden items-center gap-[clamp(22px,2.2vw,34px)] text-[16px] uppercase tracking-[0.06em] text-carta/75 lg:flex">
          {t.nav.map(([slug, label]) => (
            <Link
              key={label}
              href={slug ? `${base}/${slug}` : base}
              className="whitespace-nowrap opacity-90 transition-opacity hover:opacity-100"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-[clamp(14px,1.6vw,22px)]">
          {/* Toggle lingua: stessa forma e stessa posizione della home,
              accanto alla CTA. E' un'isola client perche' deve sapere su
              quale pagina sei, per portarti alla stessa nell'altra lingua. */}
          <LangSwitch locale={locale} label={t.langLabel} />

          {/* CTA firma. `btn-bar` la rimpicciolisce: il .btn del sistema e'
              tarato sui bottoni dentro le sezioni, dove deve pesare; in una
              barra alta 68px lo stesso bottone diventa il primo oggetto che
              vedi, prima del logo. La classe sta in site.css perche' le
              utility Tailwind (0,1,0) perdono contro `.ms .btn` (0,2,0). */}
          <a href={`${base}/roiometro`} className="btn btn-1 btn-bar">
            {t.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
