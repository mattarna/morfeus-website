"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "./booking";

/**
 * Menu mobile del sito B2B.
 *
 * Prima non esisteva: sotto `lg` le voci sparivano e restavano solo logo,
 * toggle lingua e la CTA a misura piena, che si accavallavano fra loro. Da
 * telefono il sito non aveva nessun modo di raggiungere le altre pagine.
 *
 * Struttura presa dal menu della home di produzione (`MobileMenu` in
 * fixed/HomeHeader.tsx): chiuso mostra MENU, aperto un pannello a tutto
 * schermo con le voci numerate, la lingua e i contatti in fondo. Li' le
 * voci sono indici di scorrimento della home; qui sono pagine vere, quindi
 * sono `<Link>` e non bottoni.
 *
 * Colori dai token .ms, non i valori cablati dell'originale.
 */

const COPY = {
  it: {
    apri: "Menu",
    chiudi: "Chiudi",
    etichettaApri: "Apri il menu",
    etichettaChiudi: "Chiudi il menu",
    nav: [
      ["chi-siamo", "Chi siamo"],
      ["metodo", "Metodo"],
      ["marf", "MARF"],
      ["lab", "LAB"],
      ["casi", "Casi"],
      ["insights", "Insights"],
      ["glossario", "Glossario"],
      ["impara-ai", "Impara l'AI"],
      ["faq", "FAQ"],
      ["roiometro", "Prenota"],
    ],
    lingua: "Lingua",
    contatti: "Contatti",
  },
  en: {
    apri: "Menu",
    chiudi: "Close",
    etichettaApri: "Open menu",
    etichettaChiudi: "Close menu",
    nav: [
      ["chi-siamo", "About"],
      ["metodo", "Method"],
      ["marf", "MARF"],
      ["lab", "LAB"],
      ["casi", "Cases"],
      ["insights", "Insights"],
      ["glossario", "Glossary"],
      ["impara-ai", "Learn AI"],
      ["faq", "FAQ"],
      ["roiometro", "Book"],
    ],
    lingua: "Language",
    contatti: "Contact",
  },
} as const;

export function SiteMobileMenu({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const base = `/${locale}`;
  const altra = locale === "it" ? "en" : "it";
  const [aperto, setAperto] = useState(false);
  const pathname = usePathname() ?? base;

  /* Il pannello copre lo schermo: se sotto continua a scorrere la pagina,
     chiudendo ti ritrovi in un punto diverso da dove eri. */
  useEffect(() => {
    if (!aperto) return;
    const prima = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prima;
    };
  }, [aperto]);

  /* Esc chiude: e' la scorciatoia che si aspetta chi naviga da tastiera, e
     costa tre righe. */
  useEffect(() => {
    if (!aperto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperto(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aperto]);

  /* Il toggle lingua deve portare alla STESSA pagina nell'altra lingua,
     non alla home: chi sta leggendo non deve perdere il posto. */
  const altraUrl = pathname.startsWith(base)
    ? `/${altra}${pathname.slice(base.length)}`
    : `/${altra}`;

  return (
    <>
      <button
        type="button"
        className="smm-toggle 2xl:hidden"
        aria-expanded={aperto}
        aria-controls="smm-pannello"
        aria-label={aperto ? t.etichettaChiudi : t.etichettaApri}
        onClick={() => setAperto((x) => !x)}
      >
        {aperto ? t.chiudi : t.apri}
      </button>

      <div
        id="smm-pannello"
        className="smm-pannello 2xl:hidden"
        data-aperto={aperto ? "1" : "0"}
        /* inert quando e' chiuso: senza, le voci restano raggiungibili col
           tab anche se non si vedono. In React 19 e' un booleano vero, non
           piu' la stringa vuota che voleva il DOM. */
        inert={!aperto}
      >
        {/* Barra del pannello: il marchio dove sta sempre e la X per
            chiudere. Prima il pannello si fidava del bottone nella barra
            sotto, ma sulla home quella barra e' trasparente e cambia colore
            con la fascia: aperto il menu, sopra restava una striscia vuota
            senza logo e senza via d'uscita. */}
        <div className="smm-barra">
          <Link href={base} onClick={() => setAperto(false)} aria-label="Morfeus">
            <Image
              src="/images/brand/morfeus-mark.png"
              alt="Morfeus"
              width={2064}
              height={267}
              className="h-[17px] w-auto"
            />
          </Link>
          <button
            type="button"
            className="smm-x"
            onClick={() => setAperto(false)}
            aria-label={t.etichettaChiudi}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="smm-voci" aria-label={t.apri}>
          {t.nav.map(([slug, label], i) => {
            const attiva = pathname === `${base}/${slug}`;
            const isPrenota = slug === "roiometro";
            /* "Prenota" e' l'unica voce che non porta a una pagina del
               sito ma al calendario esterno, come la CTA della barra.
               La freccia in salita gia' lo diceva; adesso ci porta. */
            const href = isPrenota ? BOOKING_URL : `${base}/${slug}`;
            const esterno = isPrenota;
            return (
              <Link
                key={slug}
                href={href}
                target={esterno ? "_blank" : undefined}
                rel={esterno ? "noopener noreferrer" : undefined}
                onClick={() => setAperto(false)}
                data-attiva={attiva ? "1" : "0"}
                data-cta={isPrenota ? "1" : "0"}
                aria-current={attiva ? "page" : undefined}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {label}
                {isPrenota ? <span aria-hidden="true"> &#8599;</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="smm-piede">
          <div className="riga">
            <span className="k">{t.lingua}</span>
            <a className="smm-lang" href={altraUrl}>
              <span data-on={locale === "en"}>EN</span>
              <span aria-hidden="true">|</span>
              <span data-on={locale === "it"}>IT</span>
            </a>
          </div>

          <div className="riga bordo">
            <div>
              <span className="k">{t.contatti}</span>
              <a className="mail" href="mailto:hello@morfeushub.com">
                hello@morfeushub.com
              </a>
            </div>
            <div className="social">
              <a
                href="https://www.linkedin.com/company/morfeus-hub-ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/morfeushub.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
