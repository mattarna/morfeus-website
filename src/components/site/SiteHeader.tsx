import Image from "next/image";
import Link from "next/link";
import { LangSwitch } from "./LangSwitch";
import { SiteMobileMenu } from "./SiteMobileMenu";
import { bookingUrl } from "./booking";

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
    /* Da telefono l'etichetta lunga mandava il bottone su due righe, e da
       li' nasceva l'accavallamento con logo e toggle lingua. */
    ctaBreve: "Prenota",
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
    ctaBreve: "Book",
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
        {/* Gruppo sinistro: marchio + (sotto xl) lo switcher lingua.
            Su schermi piccoli la lingua vive qui, a sinistra accanto al
            logo, invece di stare a destra appiccicata alla CTA dove si
            accavallava. Sopra xl la nav piena c'e' e la lingua torna a
            destra (vedi sotto). */}
        <div className="flex items-center gap-[clamp(12px,2vw,20px)]">
          <Link href={base} className="flex items-center" aria-label={t.home}>
            <Image
              src="/images/brand/morfeus-mark.png"
              alt="Morfeus"
              width={2064}
              height={267}
              priority
              /* Appiglio per il loader C: e' qui che la M composta va ad
                 atterrare. Il loader MISURA questo rettangolo invece di
                 tenersi coordinate scritte a mano, che sarebbero giuste
                 su un solo schermo. Se sparisce, il loader rinuncia al
                 volo e chiude in dissolvenza. */
              data-marchio="testata"
              /* Il lockup e' largo 7,7 volte la sua altezza: a 20px occupa
                 155px, che su uno schermo da 375 sono il 41% della barra e
                 non lasciano spazio a CTA e menu. A 15px sta sui 116, la
                 misura che ha sulla barra del sito vecchio. */
              className="h-[15px] w-auto sm:h-[20px]"
            />
          </Link>

          {/* Lingua sempre a sinistra accanto al logo, da sm (640) in su,
              a ogni larghezza (scelta di Matt 2026-07-30): non salta piu'
              a destra con la nav piena, dove si incastrava tra INSIGHTS e
              la CTA. Sul telefono (<640) NO: la barra e' stretta e la
              lingua resta nel pannello del burger. */}
          <span className="hidden sm:inline-flex">
            <LangSwitch locale={locale} label={t.langLabel} />
          </span>
        </div>

        {/* Nav reale cross-pagina. Compare da 2xl (1536): sotto, barra
            compatta col burger. Era xl (1280), ma il MacBook Air (1440) la
            mostrava e va tenuta a burger fin lassu'; la nav piena resta ai
            display grandi. */}
        <div className="hidden items-center gap-[clamp(22px,2.2vw,34px)] text-[16px] uppercase tracking-[0.06em] text-carta/75 2xl:flex">
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

        <div className="flex items-center gap-[clamp(10px,1.6vw,22px)]">
          {/* La lingua NON sta piu' qui a destra: e' sempre a sinistra,
              accanto al logo. A destra restano solo CTA e (sotto xl) burger. */}
          {/* CTA firma. `btn-bar` la rimpicciolisce: il .btn del sistema e'
              tarato sui bottoni dentro le sezioni, dove deve pesare; in una
              barra alta 68px lo stesso bottone diventa il primo oggetto che
              vedi, prima del logo. La classe sta in site.css perche' le
              utility Tailwind (0,1,0) perdono contro `.ms .btn` (0,2,0). */}
          {/* "Prenota una chiamata" porta alla prenotazione, non al
              ROIometro: era l'unica CTA del sito che finiva sul
              calcolatore invece che sul calendario. */}
          <a
            href={bookingUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-1 btn-bar whitespace-nowrap"
          >
            <span className="hidden sm:inline">{t.cta}</span>
            <span className="sm:hidden">{t.ctaBreve}</span>
            {/* freccia in salita: la stessa della barra del sito vecchio */}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17L17 7M17 7H8M17 7v9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Menu mobile: bottone MENU/CHIUDI piu' il pannello a tutto
              schermo. Sotto `lg` e' l'unico modo di raggiungere le altre
              pagine, che li' non sono in barra. */}
          <SiteMobileMenu locale={locale} />
        </div>
      </nav>
    </header>
  );
}
