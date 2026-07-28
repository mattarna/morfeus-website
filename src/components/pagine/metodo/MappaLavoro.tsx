"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   MAPPA DEL MODO DI LAVORARE.
   ------------------------------------------------------------
   Il brief chiede una mappa scroll-driven con rail laterale su
   desktop. Il rail resta fermo e segna a che punto sei mentre le
   cinque tappe scorrono.

   DEGRADA BENE, ed e' il motivo per cui il rail e' l'unica parte
   client: le tappe sono server rendered e stanno tutte nel DOM.
   Senza JavaScript si legge tutto, semplicemente il rail non
   evidenzia nessuna voce. Si perde l'indicazione, non il contenuto.

   L'osservatore usa una fascia stretta al centro dello schermo
   (-45% sopra, -45% sotto): senza quella, con tappe alte piu' di
   mezzo schermo, due tappe risultano visibili insieme e la voce
   attiva sfarfalla. La fascia stretta fa si' che sia attiva sempre
   e solo la tappa che sta passando davanti agli occhi.

   Con prefers-reduced-motion lo scorrimento del rail e' immediato.
   ============================================================ */

export type Tappa = { id: string; indice: string; titolo: string; testo: string };

export function MappaLavoro({ tappe }: { tappe: Tappa[] }) {
  const [attiva, setAttiva] = useState<string>(tappe[0]?.id ?? "");
  const contenitore = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodi = tappe
      .map((t) => document.getElementById(t.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodi.length) return;

    const osservatore = new IntersectionObserver(
      (voci) => {
        const dentro = voci.filter((v) => v.isIntersecting);
        if (dentro.length) setAttiva(dentro[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    nodi.forEach((n) => osservatore.observe(n));
    return () => osservatore.disconnect();
  }, [tappe]);

  const vaiA = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const ridotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: ridotto ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="mappa" ref={contenitore}>
      <nav className="rail-mappa" aria-label="Le fasi del metodo">
        {tappe.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            aria-current={attiva === t.id ? "true" : undefined}
            onClick={vaiA(t.id)}
          >
            {t.indice}
          </a>
        ))}
      </nav>

      <div>
        {tappe.map((t) => (
          <article className="tappa" id={t.id} key={t.id}>
            <div className="indice">{t.indice}</div>
            <h3>{t.titolo}</h3>
            <p>{t.testo}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
