"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BOOKING_URL } from "@/components/site/booking";

/* ============================================================
   12 · IL PRIMO PASSO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, la CTA, il
   blocco "come funziona la call" con i tre passi, i tre badge di
   rassicurazione. Stesse chiavi (`Offerta.contact`).

   DISEGNO nuovo. I tre passi della call diventano una SCALA corta —
   sono consecutivi, ed e' l'ultima cosa che una persona deve capire
   prima di prenotare: cosa succede dopo che clicca.

   I tre badge ("niente demo, niente venditori, niente materiale
   informativo") restano in coda ma perdono la forma a pillola
   colorata: diventano una riga di quota. Sono condizioni dichiarate,
   non decorazioni.

   FASCIA CARTA, dal 2026-07-31. E' la sezione dove si chiede di
   prenotare, e stava su ink come le nove sezioni intorno: passava
   inosservata proprio dove non doveva. Ora e' l'unica fascia chiara
   fra il Pilot (ink) e le domande (ink), quindi scorrendo si accende
   da sola, senza bisogno di decorarla. Il salto di superficie fa il
   lavoro che farebbe un riquadro colorato, ma senza aggiungere niente.
   ============================================================ */

const PASSI = ["1", "2", "3"] as const;

export function ForgeMsContatto() {
  const t = useTranslations("Offerta.contact");
  const badges = t.raw("badges") as Record<string, string>;

  /* Il titolo usa `<spanIndigo>` sulla parola da evidenziare. Qui NON lo
     rendo in corsivo viola come nelle altre sezioni: lo evidenzio a
     PENNARELLO (`.marca`), come la home fa sulla sua headline. In Forge
     l'arancio e' il colore di "qualcosa si perde", e la frase parla
     esattamente di questo ("quanto stai perdendo... senza saperlo"):
     il segno e il significato coincidono. */
  const rich = {
    br: () => <br />,
    spanSub: (chunks: ReactNode) => <span className="marca">{chunks}</span>,
    spanIndigo: (chunks: ReactNode) => <span className="marca">{chunks}</span>,
  };

  return (
    <section className="band carta forge contatto" id="contact">
      <div className="wrap">
        {/* IL BLOCCO CTA, rifatto come la home (2026-07-31).
            La home chiude la hero CENTRATA: occhiello a pastiglia, headline
            con la parola a pennarello, sotto-titolo, bottone grande con
            freccia, e un chip col pallino verde che rassicura. Qui c'erano
            gli stessi ingredienti ma allineati a sinistra come una sezione
            di contenuto qualsiasi, e il bottone piatto: non diceva "fermati
            e agisci". Ora e' un blocco centrato a se'. */}
        <div className="cta-hero">
          <div className="eye">{t("label")}</div>
          <h2 className="h-sect">{t.rich("headline", rich)}</h2>
          <p className="lead">{t("subtitle")}</p>

          <div className="cta-row" style={{ marginTop: 32 }}>
            <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t("cta")}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* i tre "non e'" diventano la rassicurazione col pallino verde,
              come il chip della home, invece della quota grigia in coda */}
          <div className="rassicura">
            <span className="pallino" aria-hidden="true" />
            <span>{Object.values(badges).join(" · ")}</span>
          </div>
        </div>

        {/* cosa succede dopo che clicchi */}
        <div className="eye" style={{ marginTop: 60 }}>
          {t("call_section_title")}
        </div>
        <div className="scala" style={{ marginTop: 26, ["--tappe" as string]: 3 }}>
          {PASSI.map((k) => (
            <div className="gradino" key={k}>
              <span className="perno" aria-hidden="true" />
              <div className="tappa">{`0${k}`}</div>
              <h3>{t(`call_steps.${k}.title`)}</h3>
              <p>{t(`call_steps.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
