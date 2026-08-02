"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

/* ============================================================
   05 · IL CONFRONTO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, i due grafici a
   confronto (ognuno con titolo, sottotitolo, badge e tre voci), la
   chiusa. Stesse chiavi (`Offerta.comparison`).

   DISEGNO nuovo. Il componente di prima erano 227 righe con due
   "chart" costruiti a mano, colori in esadecimale e barre decorative
   che non misuravano niente: sembravano dati, non lo erano.

   Qui il confronto e' quello che e': due modi di lavorare, tre
   affermazioni per parte. Il dispositivo e' la coppia di colonne del
   DS, e la differenza la fa il segno davanti — croce contro freccia.
   Niente grafici finti: se un grafico non porta un numero, e' un
   ornamento che finge autorevolezza.
   ============================================================ */

export function ForgeMsConfronto() {
  const t = useTranslations("Offerta.comparison");
  const a = t.raw("chart_a.items") as string[];
  const b = t.raw("chart_b.items") as string[];

  /* `closing` porta `<br>` e `<spanIndigo>`: va reso con t.rich e con
     i marcatori dichiarati, altrimenti next-intl stampa il percorso
     della chiave (`Offerta.comparison.closing`) dentro la pagina. */
  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
    spanIndigo: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink forge" id="comparison">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="confronto" style={{ marginTop: 34 }}>
          <div className="colonna">
            <div className="t">{t("chart_a.badge")}</div>
            <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em", margin: "0 0 4px" }}>
              {t("chart_a.title")}
            </h3>
            <p style={{ margin: "0 0 18px", fontSize: 15, color: "var(--ombra)" }}>{t("chart_a.subtitle")}</p>
            <ul>
              {a.map((voce) => (
                <li key={voce}>
                  <span className="m">✕</span>
                  <span>{voce}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="colonna buona">
            <div className="t">{t("chart_b.badge")}</div>
            <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em", margin: "0 0 4px" }}>
              {t("chart_b.title")}
            </h3>
            <p style={{ margin: "0 0 18px", fontSize: 15, color: "var(--ombra)" }}>{t("chart_b.subtitle")}</p>
            <ul>
              {b.map((voce) => (
                <li key={voce}>
                  <span className="m">→</span>
                  <span>{voce}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 36 }}>
          {t.rich("closing", rich)}
        </p>
      </div>
    </section>
  );
}
