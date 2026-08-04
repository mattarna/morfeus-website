"use client";

import { useLocale, useTranslations } from "next-intl";
import { bookingUrl } from "@/components/site/booking";
import { conGrassetto } from "./grassetto";

/* ============================================================
   08 · PER CHI SÌ, PER CHI NO
   ------------------------------------------------------------
   WIREFRAME invariato: titolo, le due liste da cinque voci, la chiusa,
   la CTA. Stesse chiavi (`Offerta.filter`).

   DISEGNO nuovo. Prima erano due card con spunte verdi e croci rosse:
   un semaforo. Ma non essere il cliente giusto non e' un errore, e il
   rosso lo fa sembrare tale — per giunta a chi sta ancora leggendo.

   Stesso confronto a due colonne del resto della pagina: freccia da una
   parte, croce spenta dall'altra, nessun colore d'allarme. La chiusa
   prende il pull-quote perche' e' la frase che decide.
   ============================================================ */

export function ForgeMsFiltro() {
  const t = useTranslations("Offerta.filter");
  const locale = useLocale();
  const si = t.raw("for_you.bullets") as Record<string, string>;
  const no = t.raw("not_for_you.bullets") as Record<string, string>;

  return (
    <section className="band ink forge" id="filter">
      <div className="wrap">
        <div className="eye">{t("tag")}</div>
        <h2 className="h-sect">{t("headline")}</h2>

        <div className="confronto" style={{ marginTop: 34 }}>
          <div className="colonna buona">
            <div className="t">{t("for_you.title")}</div>
            <ul>
              {Object.values(si).map((v) => (
                <li key={v}>
                  <span className="m">→</span>
                  <span>{conGrassetto(v)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="colonna">
            <div className="t">{t("not_for_you.title")}</div>
            <ul>
              {Object.values(no).map((v) => (
                <li key={v}>
                  <span className="m">✕</span>
                  <span>{conGrassetto(v)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 34 }}>
          {t("closing")}
        </p>

        <div className="cta-row" style={{ marginTop: 30 }}>
          <a className="btn btn-1" href={bookingUrl(locale)} target="_blank" rel="noopener noreferrer">
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
