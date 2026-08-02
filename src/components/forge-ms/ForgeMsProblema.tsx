"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ICONE_SINTOMI, ICONE_TRAPPOLE } from "./icone";

/* ============================================================
   03 · STAI CRESCENDO, MA PIÙ CRESCI MENO HAI CONTROLLO
   ------------------------------------------------------------
   WIREFRAME invariato, tutto intero: occhiello, titolo, sottotitolo,
   i QUATTRO sintomi in griglia, poi il secondo movimento (la trappola
   della tecnologia) con il suo titolo, il dato del MIT con la fonte,
   le TRE carte e la frase di chiusura. Stesse chiavi i18n
   (`Offerta.problem_analysis`), stesso ordine.

   DISEGNO nuovo, e qui c'e' l'idea che tiene la sezione: il tema e'
   "sta gia' succedendo e non lo vedi". I quattro sintomi diventano
   STAZIONI con codice progressivo (S01…S04) e cifra fantasma dietro:
   non quattro osservazioni generiche, quattro punti rilevati.

   Il dato del MIT cambia registro perche' cambia natura: non e' una
   nostra osservazione, e' una ricerca esterna che ci da' ragione.
   Diventa l'ALLARME — l'unico blocco arancio della pagina, con la
   campitura a righe dei cartelli di pericolo — e la fonte sta sotto in
   mono, piccola: un dato citato senza fonte visibile non vale niente.
   ============================================================ */

const SINTOMI = ["1", "2", "3", "4"] as const;
const TRAPPOLE = ["1", "2", "3"] as const;

export function ForgeMsProblema() {
  const t = useTranslations("Offerta.problem_analysis");

  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink forge" id="problem-analysis">
      <div className="wrap">
        {/* --- i quattro sintomi --- */}
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="due" style={{ marginTop: 34 }}>
          {SINTOMI.map((k, i) => (
            <article className="stazione" key={k}>
              <span className="filo" />
              <span className="ghost" aria-hidden="true">
                {`0${i + 1}`}
              </span>
              <span className="cassetta piccola">{ICONE_SINTOMI[i]}</span>
              <div className="cod">{`Rilevato · S0${i + 1}`}</div>
              <h3>{t(`symptoms.${k}.title`)}</h3>
              <p>{t(`symptoms.${k}.desc`)}</p>
            </article>
          ))}
        </div>

        {/* --- la trappola della tecnologia --- */}
        <div className="eye" style={{ marginTop: 74 }}>
          {t("trap_label")}
        </div>
        <h2 className="h-sect">{t.rich("trap_headline", rich)}</h2>
        <p className="lead">{t("trap_subtitle")}</p>

        {/* il dato esterno: l'unico allarme della pagina */}
        <div className="allarme" style={{ marginTop: 32 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span className="segno" aria-hidden="true">
              !
            </span>
            <p className="testo">{t("trap_stat")}</p>
          </div>
          <div className="fonte">{t("trap_source")}</div>
        </div>

        <div className="tre" style={{ marginTop: 30 }}>
          {TRAPPOLE.map((k, i) => (
            <article className="stazione" key={k}>
              <span className="filo" />
              <span className="ghost" aria-hidden="true">
                {`0${i + 1}`}
              </span>
              <span className="cassetta piccola">{ICONE_TRAPPOLE[i]}</span>
              <div className="cod">{`Trappola · T0${i + 1}`}</div>
              <h3>{t(`trap_cards.${k}.title`)}</h3>
              <p>{t(`trap_cards.${k}.desc`)}</p>
            </article>
          ))}
        </div>

        <p className="tira-somme" style={{ marginTop: 40 }}>
          {t("trap_closing")}
        </p>
      </div>
    </section>
  );
}
