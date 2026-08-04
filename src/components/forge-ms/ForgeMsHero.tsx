"use client";

import { useLocale, useTranslations } from "next-intl";
import { MARFVisualCore } from "../shared/MARFVisualCore";
import { bookingUrl } from "@/components/site/booking";

/* ============================================================
   01 · HERO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo su tre righe (la terza in
   evidenza), sottotitolo, il visual dei nodi, due CTA con la riga di
   spinta sopra, i quattro dati di prova. Stessa copy: legge le stesse
   chiavi i18n di prima (`Offerta.hero`).

   DISEGNO nuovo. Prima era una schermata piena a se' stante, con fondo
   #0a111a scritto a mano e i titoli in gradiente. Ora e' la fascia
   `ink` del sito: stesso nero, stessa griglia, stessa tipografia delle
   altre pagine, e l'accento e' la parola in `emph` invece di un
   gradiente su tre colori.

   I quattro dati di prova erano una barra di numeri sotto una riga
   sottile. Diventano una QUOTA piu' quattro voci: e' una misura
   dichiarata, e la riga di quota lo dice prima ancora di leggerli.

   IL VISUAL RESTA com'e' (`MARFVisualCore`): i nodi CRM/OPS/DATA/
   FINANCE che convergono sono il pezzo migliore della pagina, e
   ridisegnarli sarebbe stato cambiare per cambiare.
   ============================================================ */

export function ForgeMsHero() {
  const t = useTranslations("Offerta.hero");
  const locale = useLocale();

  return (
    <section className="band ink hero forge" id="hero">
      <div className="wrap">
        <div className="eye">{t("eyebrow")}</div>

        <h1>
          {t("headline.line1")} {t("headline.line2")}
          <br />
          <span className="emph">{t("headline.line3")}</span>
        </h1>

        <p className="copy">{t("subtitle")}</p>

        {/* il visual dei nodi: invariato */}
        <div className="visual-nodi" style={{ marginTop: 46 }}>
          <MARFVisualCore />
        </div>

        <p className="proofline" style={{ marginTop: 40 }}>
          {t("cta_nudge")}
        </p>

        <div className="cta-row" style={{ marginTop: 18 }}>
          <a className="btn btn-1" href={bookingUrl(locale)} target="_blank" rel="noopener noreferrer">
            {t("cta_primary")}
          </a>
          <a className="btn btn-2-carta" href="#come-funziona">
            {t("cta_secondary")}
          </a>
        </div>

        {/* RIMOSSA la striscia "SISTEMA: OPERATIVO" con i quattro dati
            (Scaling / Pilot / Accesso / Ogni), su richiesta 2026-07-31.
            Era una riga di quota + quattro voci spezzate a meta' (la copy
            "ATTIVO FATTURATO TARGET / Scaling" veniva tagliata sul primo
            spazio, e a schermo si leggeva come due frasi mozze). Le chiavi
            `system_tag` e `proof_items` restano nel file di traduzione:
            non le usa piu' nessuno qui, ma non le tocco. */}
      </div>
    </section>
  );
}
