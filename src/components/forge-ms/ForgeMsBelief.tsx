"use client";

import React, { type ReactNode } from "react";
import { useTranslations } from "next-intl";

/* ============================================================
   04 · IL CAMBIO DI CONVINZIONE
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, le DUE coppie
   "come lo si fa di solito / come va fatto", ognuna con titolo e
   descrizione da entrambi i lati. Stesse chiavi (`Offerta.belief_shift`).

   DISEGNO, secondo giro (2026-07-31). Il primo giro aveva tolto il
   rosso e il verde e messo tutto in due colonne uniche: un contenitore
   per lato, dentro il quale le due coppie si incollavano l'una
   all'altra. Il risultato era una parete di testo — quattro paragrafi
   lunghi in due scatole — dove non si capiva dove finiva la prima
   coppia e cominciava la seconda, e niente distingueva a colpo d'occhio
   il lato sbagliato da quello giusto.

   Ora:

   · QUATTRO BLOCCHI, non due. Ogni coppia e' una riga della griglia:
     credenza a sinistra, realta' a destra, appaiate. Su schermo stretto
     si impilano nell'ordine giusto (credenza 01, realta' 01, credenza
     02, realta' 02), quindi il confronto regge anche da telefono.

   · ROSSO E VERDE, dai token di stato del sistema (`--anomalia` e
     `--ok`), non da esadecimali nuovi. Sul fondo ink fanno 6.5:1 e
     5.7:1; su carta site.css ne ridefinisce da solo la variante scura,
     quindi se un giorno la fascia cambia il colore si adegua.
     Il colore sta sul SEGNO e sull'etichetta, mai sul corpo del testo:
     un paragrafo rosso e' meno leggibile, e qui il rosso deve marcare
     il ruolo del blocco, non colorare la lettura.

   · OGNI BLOCCO PORTA LA SUA ETICHETTA, numerata come i readout del
     resto della pagina ("COMMON BELIEF · 01"). Cosi' non serve una riga
     d'intestazione sopra le colonne, che impilandosi si perderebbe.
   ============================================================ */

const COPPIE = ["1", "2"] as const;

export function ForgeMsBelief() {
  const t = useTranslations("Offerta.belief_shift");

  /* I messaggi di questa sezione usano QUATTRO marcatori, non due:
     `spanIndigo` e `spanMedium` compaiono dentro le descrizioni delle
     coppie. Se non sono dichiarati qui, next-intl non rende il testo:
     stampa il PERCORSO della chiave (`Offerta.belief_shift.pairs.1...`)
     dentro la pagina. Era il caso di quattro paragrafi su quattro. */
  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
    spanIndigo: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
    spanMedium: (chunks: ReactNode) => <b>{chunks}</b>,
  };

  return (
    <section className="band ink forge" id="belief-shift">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="coppie" style={{ marginTop: 38 }}>
          {COPPIE.map((k) => (
            <React.Fragment key={k}>
              <div className="stazione lato male">
                <div className="lato-testa">
                  <span className="segno" aria-hidden="true">
                    ✕
                  </span>
                  <span className="eti">{`${t("wrong_label")} · 0${k}`}</span>
                </div>
                <h3>{t(`pairs.${k}.wrong_title`)}</h3>
                <p>{t.rich(`pairs.${k}.wrong_desc`, rich)}</p>
              </div>

              <div className="stazione lato bene">
                <div className="lato-testa">
                  <span className="segno" aria-hidden="true">
                    →
                  </span>
                  <span className="eti">{`${t("right_label")} · 0${k}`}</span>
                </div>
                <h3>{t(`pairs.${k}.right_title`)}</h3>
                <p>{t.rich(`pairs.${k}.right_desc`, rich)}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
