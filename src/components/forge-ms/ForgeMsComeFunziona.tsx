"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { bookingUrl } from "@/components/site/booking";
import { ICONE_MARF } from "./icone";

/* ============================================================
   06 · COME FUNZIONA
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, le QUATTRO fasi
   (tag, titolo, sottotitolo, tre punti, messaggio chiave), il riquadro
   MARF con i suoi quattro punti e la chiusa, la CTA. Stesse chiavi
   (`Offerta.how_it_works`).

   DISEGNO. Primo tentativo: avevo messo le quattro fasi su una riga
   sola, a quattro colonne strette. Sbagliato — il testo si comprimeva
   e il ritmo spariva. Qui torna la STRUTTURA DELLA PAGINA VECCHIA, che
   su questo aveva ragione: blocchi ampi in colonna, alternati destra e
   sinistra intorno a una linea centrale, con la cifra della fase
   gigante dietro e il nodo sulla linea. Da sotto i 1000px si
   raddrizzano tutti a sinistra.

   Il riquadro MARF resta un blocco a se' — e' il prodotto dentro il
   percorso, non una quinta fase — con la riga di stato in cima.

   NOTA su `marf_box.title`: contiene un tag <spanIndigo>, quindi va
   letto con `t.rich` e non con `t()`. Chiamandolo con `t()` next-intl
   restituiva la CHIAVE GREZZA, e in pagina si leggeva
   "OFFERTA.HOW_IT_WORKS.MARF_BOX.TITLE".
   ============================================================ */

const FASI = ["1", "2", "3", "4"] as const;
const PUNTI_MARF = ["1", "2", "3", "4"] as const;

export function ForgeMsComeFunziona() {
  const t = useTranslations("Offerta.how_it_works");
  const locale = useLocale();

  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
    spanIndigo: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band carta forge" id="come-funziona">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        {/* le quattro fasi: blocchi ampi che scendono a zig-zag */}
        <div className="fasi" style={{ marginTop: 64 }}>
          {FASI.map((k) => {
            const bullets = t.raw(`steps.${k}.bullets`) as string[];
            return (
              <article className="fase" key={k}>
                <span className="cifra" aria-hidden="true">
                  {`0${k}`}
                </span>

                <span className="tag">
                  <i />
                  {t(`steps.${k}.tag`)}
                </span>

                <h3>{t(`steps.${k}.title`)}</h3>
                <p className="sotto">{t(`steps.${k}.subtitle`)}</p>

                <ul>
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <p className="chiave">{t(`steps.${k}.keyMessage`)}</p>
              </article>
            );
          })}
        </div>

        {/* il sistema dentro il percorso */}
        <div className="quadro" style={{ marginTop: 80 }}>
          <div className="readout">
            <span>MARF</span>
            <span className="on">
              <i />
              {t("tag")}
            </span>
          </div>
          <div className="quadro-corpo">
            <h3
              style={{
                fontSize: "clamp(22px,2.6vw,30px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                margin: "0 0 16px",
                maxWidth: "24ch",
              }}
            >
              {t.rich("marf_box.title", rich)}
            </h3>
            <p className="copy" style={{ margin: 0, maxWidth: "68ch" }}>
              {t("marf_box.text")}
            </p>

            {/* i quattro punti come pannelli, non testo che galleggia:
                icona duotone, pannello con superficie propria, corpi a
                18px. Lo stile vive in forge-ms.css (blocco 8). */}
            <div className="marf-griglia" style={{ marginTop: 30 }}>
              {PUNTI_MARF.map((k, i) => (
                <div className="marf-punto" key={k}>
                  <span className="cassetta piccola">{ICONE_MARF[i]}</span>
                  <div className="cod">{`0${k}`}</div>
                  <h4>{t(`marf_box.bullets.${k}.title`)}</h4>
                  <p>{t(`marf_box.bullets.${k}.desc`)}</p>
                </div>
              ))}
            </div>

            <p className="tira-somme" style={{ marginTop: 30 }}>
              {t("marf_box.closing")}
            </p>
          </div>
        </div>

        <div className="cta-row" style={{ marginTop: 38 }}>
          <a className="btn btn-1" href={bookingUrl(locale)} target="_blank" rel="noopener noreferrer">
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
