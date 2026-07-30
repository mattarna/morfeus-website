import { BOOKING_URL } from "@/components/site/booking";
import type { ForgeCopy } from "./copy";

/* ============================================================
   04 · IL PERCORSO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, lead, le quattro tappe,
   il blocco "perché adesso" (convinzione contro realtà), la nota,
   la CTA. Stessa copy, stesso ordine.

   DISEGNO nuovo, ed è il punto che cambia di più — con motivo. Le
   quattro tappe erano quattro riquadri identici in fila: nulla diceva
   che fossero CONSECUTIVE, né che si salga. Ma il senso della sezione
   è tutto lì ("ogni gradino dimostra valore prima del successivo").

   Ora sono una SCALA: una linea le attraversa, ogni tappa ha il suo
   perno sulla linea, e il primo perno è pieno perché il gradino zero è
   gratis — si parte da lì. Da telefono la linea si raddrizza e diventa
   verticale a sinistra: stessa lettura, altra direzione.

   Il "perché adesso" resta un confronto a due colonne, ma la differenza
   non la fa più il colore del testo: la fa il segno davanti. Una croce
   spenta contro una freccia che va avanti.
   ============================================================ */

export function ForgeMsPercorso({ t, isIt }: { t: ForgeCopy; isIt: boolean }) {
  const c = t.scala;

  return (
    <section className="band carta forge" id="percorso">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>
        <p className="lead">{c.lead}</p>

        {/* la scala: quattro tappe su una linea sola */}
        <div className="scala" style={{ marginTop: 38 }}>
          {c.steps.map((s) => (
            <div className="gradino" key={s.n}>
              <span className="perno" aria-hidden="true" />
              <div className="tappa">
                {isIt ? "Gradino" : "Step"} {s.n}
              </div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>

        {/* perché adesso */}
        <div className="eye" style={{ marginTop: 52 }}>
          {c.belief.eye}
        </div>
        <div className="confronto" style={{ marginTop: 16 }}>
          <div className="colonna">
            <div className="t">{c.belief.noTitle}</div>
            <ul>
              {c.belief.no.map((x) => (
                <li key={x}>
                  <span className="m">✕</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="colonna buona">
            <div className="t">{c.belief.yesTitle}</div>
            <ul>
              {c.belief.yes.map((x) => (
                <li key={x}>
                  <span className="m">→</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 28 }}>
          {c.belief.note}
        </p>

        <div className="cta-row" style={{ marginTop: 32 }}>
          <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
