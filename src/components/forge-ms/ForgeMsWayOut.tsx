"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

/* ============================================================
   11 · LA VIA D'USCITA
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, i TRE punti,
   il riquadro d'uscita con titolo e testo. Stesse chiavi
   (`Offerta.way_out`).

   DISEGNO nuovo, e qui la scelta e' NON alzare la voce. E' la sezione
   che toglie il rischio — "se non funziona, esci" — e va letta come
   una cosa detta con calma, non come un'altra promessa da vendere.

   I tre punti diventano stazioni sobrie; il riquadro d'uscita prende
   il QUADRO con la riga di stato, che dichiara il patto. Nessun
   colore d'allarme, nessun numero gigante: qui il tono E' il
   messaggio.
   ============================================================ */

const PUNTI = ["1", "2", "3"] as const;

export function ForgeMsWayOut() {
  const t = useTranslations("Offerta.way_out");

  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink forge" id="way-out">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="tre" style={{ marginTop: 34 }}>
          {PUNTI.map((k, i) => (
            <article className="stazione" key={k}>
              <span className="filo" />
              <div className="cod">{`0${i + 1}`}</div>
              <h3>{t(`points.${k}.title`)}</h3>
              <p>{t(`points.${k}.desc`)}</p>
            </article>
          ))}
        </div>

        <div className="quadro" style={{ marginTop: 38, maxWidth: 900 }}>
          <div className="readout">
            <span>{t("exit_box_title")}</span>
            <span className="on">
              <i />
              {t("days_label")}
            </span>
          </div>
          <div className="quadro-corpo">
            <p className="copy" style={{ margin: 0, maxWidth: "64ch" }}>
              {t("exit_box_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
