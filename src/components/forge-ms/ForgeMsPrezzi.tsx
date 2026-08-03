"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BOOKING_URL } from "@/components/site/booking";
import { ICONE_INCLUSO, ICONE_CODA } from "./icone";

/* ============================================================
   10 · I LIVELLI
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, i tre paragrafi di
   introduzione, i TRE livelli (capacita', presidio, destinatario), il
   blocco "cosa includiamo dal primo progetto", Enterprise e la nota
   finale. Stesse chiavi (`Offerta.pricing`).

   DISEGNO, terzo giro (2026-07-31). Non sembravano schede di tier, e
   non lo erano: erano tre elenchi puntati incolonnati. Confronto con
   la vecchia pagina, che come scheda funzionava meglio: sei cose se
   n'erano perse per strada, e qui tornano.

     1. ALTEZZA PARI. C'era `alignItems: "start"`, quindi le tre schede
        finivano a tre altezze diverse e il colpo d'occhio non era piu'
        un confronto: erano tre blocchi sfalsati. Ora si allungano tutte
        alla riga, ed e' l'unico modo perche' un tier si confronti.

     2. LA CTA IN OGNI TIER, in fondo e allineata fra le tre
        (`margin-top: auto`). Mancava del tutto: la sezione faceva
        scegliere e poi non dava dove cliccare, e la scelta moriva li'.

     3. TESTATA STACCATA. Codice, nome e capacita' stanno in un blocco
        con un filetto sotto, come nella vecchia. Prima colavano nel
        corpo senza stacco e il nome del tier non era un titolo.

     4. IL NOME PIU' GRANDE: da 26-34px a 34-46px. E' la parola che si
        cerca scorrendo, e in tre colonne strette deve vincere.

     5. LE SPUNTE. I pallini da 5px sono diventati spunte vere, verdi
        sui due sobri e viola sul consigliato: sono capacita' incluse,
        e una spunta lo dice, un pallino no.

     6. PRIMA "PER CHI E'", POI "GOVERNANCE". Era invertito: si leggeva
        l'elenco delle capacita' prima di sapere se quel tier ti
        riguarda. Prima ci si riconosce, poi si guarda cosa c'e' dentro.

   VIA LA CIFRA FANTASMA. Con `top: -16px` usciva dalla scheda e finiva
   a cavallo del bordo superiore: nello screenshot il 02 e il 03
   galleggiavano sopra le schede. Non aggiungeva profondita', aggiungeva
   sporco. Il livello consigliato resta riconoscibile per quello che
   conta: fondo che vira al viola, bordo in firma, filo acceso in cima,
   ombra che lo stacca, e la scheda che sporge dalla riga.
   ============================================================ */

const LIVELLI = ["1", "2", "3"] as const;
const GOV = ["1", "2", "3", "4", "5", "6", "7"] as const;

export function ForgeMsPrezzi() {
  const t = useTranslations("Offerta.pricing");
  /* L'etichetta del bottone sta in `Offerta.ctas`. Prima qui c'era
     `sectionTitle`, che e' il titolo della sezione ("Tiers & Capacita'"):
     sul bottone si leggeva un titolo, non un invito. */
  const tc = useTranslations("Offerta.ctas");
  const bonus = t.raw("bonus.items") as Record<string, { title: string; desc: string }>;

  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
    spanCore: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band carta forge" id="pricing">
      <div className="wrap">
        <div className="eye">{t("tag")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>

        <p className="lead">{t("intro_1")}</p>
        <p className="copy" style={{ maxWidth: "68ch" }}>
          {t("intro_2")}
        </p>
        <p className="copy" style={{ maxWidth: "68ch" }}>
          {t("intro_3")}
        </p>

        {/* La frase che orienta la scelta: contiene un tag <spanCore>,
            quindi va letta con t.rich. Sta qui e non in una riga di stato:
            e' un ragionamento intero, non un'etichetta. */}
        <p className="tira-somme" style={{ marginTop: 30 }}>
          {t.rich("subtitle_nudge", rich)}
        </p>

        {/* i tre livelli: il consigliato sporge dalla riga */}
        <div className="livelli" style={{ marginTop: 44 }}>
          {LIVELLI.map((k, i) => {
            const scelto = k === "2";
            return (
              <article className={`livello${scelto ? " scelto" : ""}`} key={k}>
                <div className="testa">
                  <div className="riga">
                    <span className="cod">{`Livello 0${i + 1}`}</span>
                    {scelto ? <span className="distintivo">{t("tiers.2.badge")}</span> : null}
                  </div>
                  <h3 className="nome">{t(`tiers.${k}.name`)}</h3>
                  <div className="capacita">{t(`tiers.${k}.capacity_value`)}</div>
                </div>

                <div className="corpo">
                  <div className="gruppo">{t(`tiers.${k}.for_label`)}</div>
                  <p className="perchi">{t(`tiers.${k}.for_value`)}</p>

                  <div className="gruppo">{t(`tiers.${k}.governance_label`)}</div>
                  <ul>
                    {GOV.map((g) => (
                      <li key={g}>{t(`tiers.${k}.governance.${g}`)}</li>
                    ))}
                  </ul>

                  {/* LA BARRA IN FONDO. Il bottone da solo, appoggiato al
                      bianco, non chiudeva la scheda: sembrava un elemento
                      sospeso. Qui e' un piede vero, che va da bordo a bordo
                      (i margini negativi annullano il padding del corpo) con
                      un filetto sopra e il fondo in tinta. */}
                  <div className="piede">
                    <a
                      className={`btn ${scelto ? "btn-1" : "btn-2-firma"} tier-cta`}
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tc("pricing")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* cosa e' incluso dal primo progetto */}
        <div className="quadro" style={{ marginTop: 52 }}>
          <div className="readout">
            <span>{t("bonus.title")}</span>
            <span className="on">
              <i />
              Incluso
            </span>
          </div>
          {/* i due "incluso" con la loro icona, come nella vecchia pagina
              (cpu-bolt per MARF, mappa per l'assessment). Erano gli unici
              blocchi della sezione senza un segno, e a fianco dei tre tier
              pieni di spunte sembravano una nota a pie' di pagina. */}
          <div className="marf-griglia dentro-quadro">
            {Object.entries(bonus).map(([k, v], i) => (
              <div className="marf-punto" key={k}>
                <span className="cassetta piccola">{ICONE_INCLUSO[i]}</span>
                <div className="cod">{`Incluso 0${k}`}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* precisazioni, non offerte: icona in riga con l'etichetta, piu'
            piccola di quelle degli "incluso" — sono note, non promesse */}
        <div className="due coda" style={{ marginTop: 36 }}>
          <div className="colonna">
            <div className="t">
              <span className="segnetto">{ICONE_CODA[0]}</span>
              {t("enterprise.title")}
            </div>
            <p>{t("enterprise.text")}</p>
          </div>
          <div className="colonna">
            <div className="t">
              <span className="segnetto">{ICONE_CODA[1]}</span>
              {t("note.title")}
            </div>
            <p>{t("note.text")}</p>
          </div>
        </div>

        <div className="cta-row" style={{ marginTop: 36 }}>
          <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {tc("pricing")}
          </a>
        </div>
      </div>
    </section>
  );
}
