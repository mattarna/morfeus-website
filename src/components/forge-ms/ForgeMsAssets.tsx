"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ICONE_ASSET } from "./icone";

/* ============================================================
   07 · COSA COSTRUIAMO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, i NOVE asset
   con titolo e descrizione. Stesse chiavi (`Offerta.assets`).

   DISEGNO. Primo tentativo: avevo tolto le icone lasciando solo il
   codice A01…A09, e sono venuti fuori nove riquadri identici e piatti.
   Sbagliato. Qui torna la forma della pagina vecchia, che su questo
   era giusta: la CASSETTA dell'icona con bordo e fondo scuro, il
   puntino arancio che dice "acceso", l'alone viola dietro l'angolo e
   il filetto che cresce sul fondo al passaggio.

   Le icone pero' sono INLINE e non piu' via Iconify: quella le scarica
   a runtime e dove la richiesta non passa restano caselle vuote.
   Stessi soggetti, stesso aspetto, ma dentro il bundle.
   ============================================================ */

const ASSET = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export function ForgeMsAssets() {
  const t = useTranslations("Offerta.assets");

  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink forge" id="assets">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="nove" style={{ marginTop: 38 }}>
          {ASSET.map((k, i) => (
            <article className="scheda-icona" key={k}>
              <span className="cassetta">
                {ICONE_ASSET[i]}
                <span className="spia" aria-hidden="true" />
              </span>
              <h3>{t(`items.${k}.title`)}</h3>
              <p>{t(`items.${k}.desc`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
