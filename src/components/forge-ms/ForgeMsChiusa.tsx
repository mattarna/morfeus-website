import { BOOKING_URL } from "@/components/site/booking";
import type { ForgeCopy } from "./copy";

/* ============================================================
   08 · IL PRIMO PASSO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, paragrafo, due CTA.
   Stessa copy.

   DISEGNO: la chiusa resta la `ctaq` centrata delle altre pagine, e
   non prende dispositivi nuovi. È voluto: dopo otto sezioni che
   misurano, l'ultima cosa che si vede deve essere una domanda sola e
   un bottone. Aggiungere un quadro qui sarebbe rumore.
   ============================================================ */

export function ForgeMsChiusa({ t }: { t: ForgeCopy }) {
  const c = t.cta;

  return (
    <section className="band carta ctaq forge" id="cta">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2>
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>
        <p>{c.p}</p>
        <div className="cta-row">
          <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {c.cta1}
          </a>
          <a className="btn btn-2-ink" href="mailto:hello@morfeushub.com">
            {c.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
