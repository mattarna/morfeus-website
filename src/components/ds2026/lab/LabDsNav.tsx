"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DsLock } from "@/components/ds2026/DsLock";
import { dsScrollTo } from "@/components/ds2026/dsScrollTo";

/* ============================================================
   NAVIGAZIONE — .nav del DS.
   ------------------------------------------------------------
   Sostituisce ServiceHeader, che NON si tocca: e' condiviso con
   /forge. Le voci e le etichette sono le stesse di /lab, prese dagli
   stessi namespace (Lab.landing_footer.nav_links, Lab.ctas): il
   confronto tra le due pagine resta sul design, non sulla copy.

   Il pannello mobile implementa il contratto che il DS scrive per
   esteso in components.css, e che il CSS da solo non puo' garantire:
     · aria-expanded + aria-controls sul tasto
     · [inert] sul pannello quando e' chiuso — fuori da tastiera e
       screen reader — tolto all'apertura
     · il fuoco va sul primo link all'apertura e torna al tasto alla
       chiusura, salvo che la finestra si sia allargata oltre i 900px
       e il tasto sia sparito
     · Esc chiude · mentre e' aperto lo scroll del corpo si blocca
   Il DS insiste su [inert] invece di visibility:hidden perche' la
   visibility resterebbe "hidden" durante la transizione e mettere a
   fuoco il primo link fallirebbe in silenzio.
   ============================================================ */

const VOCI = ["hero", "how-it-works", "comparison", "ai-champ", "contact"] as const;

export function LabDsNav() {
  const t = useTranslations("Lab.landing_footer.nav_links");
  const tc = useTranslations("Lab.ctas");
  const [aperto, setAperto] = useState(false);
  const tastoRef = useRef<HTMLButtonElement>(null);
  const pannelloRef = useRef<HTMLDivElement>(null);

  const chiudi = useCallback((rimettiIlFuoco = true) => {
    setAperto(false);
    // Se la finestra si e' allargata il tasto non c'e' piu': rimettere il
    // fuoco su un elemento sparito lo butterebbe sul body.
    if (rimettiIlFuoco && tastoRef.current?.offsetParent !== null) {
      tastoRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!aperto) return;

    // Il fuoco sul primo link: funziona subito proprio perche' il pannello
    // non e' mai visibility:hidden (vedi nota in testa).
    pannelloRef.current?.querySelector("a")?.focus();

    const bloccato = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const suTasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudi();
    };
    // Oltre i 900px il pannello non ha piu' senso: la barra torna piena.
    const query = window.matchMedia("(min-width: 901px)");
    const suLarghezza = () => chiudi(false);

    document.addEventListener("keydown", suTasto);
    query.addEventListener("change", suLarghezza);
    return () => {
      document.body.style.overflow = bloccato;
      document.removeEventListener("keydown", suTasto);
      query.removeEventListener("change", suLarghezza);
    };
  }, [aperto, chiudi]);

  const vaiA = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    chiudi(false);
    dsScrollTo(id);
  };

  return (
    <header className="nav">
      <div className="nav-in">
        <a href="#hero" onClick={vaiA("hero")} aria-label="Morfeus · inizio pagina">
          <DsLock size={24} />
        </a>

        <nav className="nav-links" aria-label="Sezioni della pagina">
          {VOCI.map((id) => (
            <a key={id} href={`#${id}`} onClick={vaiA(id)}>
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={vaiA("contact")}
            className="btn btn--primary max-[900px]:hidden"
          >
            {tc("sticky")}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>

          <button
            ref={tastoRef}
            type="button"
            className="nav-toggle"
            aria-expanded={aperto}
            aria-controls="lab-ds-nav-panel"
            aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
            onClick={() => (aperto ? chiudi() : setAperto(true))}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              {aperto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="lab-ds-nav-panel"
        ref={pannelloRef}
        className="nav-panel"
        data-aperto={aperto}
        /* Quando e' chiuso il pannello esce da tastiera e screen reader pur
           restando "visibile" per il browser. React 19 supporta `inert` come
           booleano vero: non serve piu' passarlo come stringa. */
        inert={!aperto}
      >
        {VOCI.map((id) => (
          <a key={id} href={`#${id}`} onClick={vaiA(id)}>
            {t(id)}
          </a>
        ))}
      </div>
    </header>
  );
}
