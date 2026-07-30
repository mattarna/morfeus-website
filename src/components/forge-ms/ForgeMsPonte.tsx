import type { ForgeCopy } from "./copy";

/* ============================================================
   07 · ORGANIZZAZIONI STRUTTURATE (il ponte verso Astrolize)
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, paragrafo, CTA. Stessa copy.

   DISEGNO nuovo, e qui la scelta è NON alzare la voce. È la sezione
   che dice "se sei troppo grande, non siamo noi": deve leggersi come
   un passaggio onesto, non come un'altra offerta. Quindi niente card,
   niente riquadri, niente numeri — solo il testo dentro un quadro
   sobrio con la riga di stato che dichiara il passaggio di mano.
   Una fascia che rallenta, prima della chiusa.
   ============================================================ */

export function ForgeMsPonte({ t, isIt }: { t: ForgeCopy; isIt: boolean }) {
  const c = t.ponte;

  return (
    <section className="band ink forge" id="astrolize">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>

        <div className="quadro" style={{ marginTop: 28, maxWidth: 900 }}>
          <div className="readout">
            <span>{isIt ? "Passaggio · stesso gruppo" : "Handover · same group"}</span>
            <span className="on">
              <i />
              Astrolize
            </span>
          </div>
          <div style={{ padding: 30 }}>
            <p className="copy" style={{ margin: 0, maxWidth: "62ch" }}>
              {c.copy}
            </p>
            <div className="cta-row" style={{ marginTop: 26 }}>
              <a className="btn btn-2-carta" href="mailto:hello@morfeushub.com?subject=Astrolize">
                {c.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
