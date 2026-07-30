import type { ForgeCopy } from "./copy";

/* ============================================================
   02 · PERCHÉ L'AI NON TI HA ANCORA DATO ROI
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, lead, tre schede (A01, A02,
   A03), le due curve a confronto, la frase che ribalta. Stessa copy,
   stesso ordine.

   DISEGNO nuovo. Le tre schede avevano gia' un codice (A01/A02/A03) ma
   era un'etichetta muta sopra al titolo. Diventa il codice della
   STAZIONE, con la sua cifra fantasma dietro: la sezione elenca tre
   modi di perdere valore, e ognuno e' un punto identificato, non un
   generico "problema".

   Le due curve stavano in due riquadri qualsiasi. Restano affiancate
   — il confronto e' il senso del blocco — ma prendono la testata con
   il tag di stato, e il rosso compare SOLO nella curva che decade:
   e' l'unico punto della sezione dove entra l'allarme.
   ============================================================ */

/* Curva "valore che decade": sale a un picco, poi crolla verso lo zero. */
const PlotPerdita = (
  <svg className="plot" viewBox="0 0 320 140" fill="none" aria-hidden="true">
    <line className="grid-l" x1="8" y1="42" x2="312" y2="42" />
    <line className="grid-l" x1="8" y1="82" x2="312" y2="82" />
    <line className="grid-l" x1="8" y1="122" x2="312" y2="122" />
    <path
      className="area"
      d="M8,120 C30,120 52,36 88,42 C128,47 152,98 200,110 C250,122 286,120 312,120 L312,130 L8,130 Z"
    />
    <path className="line" d="M8,120 C30,120 52,36 88,42 C128,47 152,98 200,110 C250,122 286,120 312,120" />
    <circle className="end" cx="312" cy="120" r="3.5" />
  </svg>
);

/* Curva "valore che compone": piatta all'inizio, poi accelera verso l'alto. */
const PlotCompone = (
  <svg className="plot" viewBox="0 0 320 140" fill="none" aria-hidden="true">
    <line className="grid-l" x1="8" y1="42" x2="312" y2="42" />
    <line className="grid-l" x1="8" y1="82" x2="312" y2="82" />
    <line className="grid-l" x1="8" y1="122" x2="312" y2="122" />
    <path className="area" d="M8,120 C86,118 142,108 200,90 C250,74 286,50 312,20 L312,130 L8,130 Z" />
    <path className="line" d="M8,120 C86,118 142,108 200,90 C250,74 286,50 312,20" />
    <circle className="end" cx="312" cy="20" r="3.5" />
  </svg>
);

export function ForgeMsProblema({ t }: { t: ForgeCopy }) {
  const c = t.problema;

  return (
    <section className="band carta forge" id="problema">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>
        <p className="lead">{c.lead}</p>

        {/* i tre modi di perdere valore, come punti identificati */}
        <div className="tre" style={{ marginTop: 30 }}>
          {c.cards.map((card) => (
            <article className="stazione" key={card.ck}>
              <span className="filo" />
              <span className="ghost" aria-hidden="true">
                {card.ck.replace(/^A/, "")}
              </span>
              <div className="cod">{card.ck}</div>
              <h3>{card.ct}</h3>
              <p>{card.p}</p>
            </article>
          ))}
        </div>

        {/* il confronto fra le due curve */}
        <div className="curve">
          <div className="curva perdita">
            <div className="chead">
              <div>
                <div className="ctit">{c.curve.loss.title}</div>
                <div className="csub">{c.curve.loss.sub}</div>
              </div>
              <span className="ctag">{c.curve.loss.tag}</span>
            </div>
            {PlotPerdita}
            <div className="axis">{c.curve.axisT}</div>
            <ul>
              {c.curve.loss.bullets.map((b) => (
                <li key={b}>
                  <span className="dot" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="curva compone">
            <div className="chead">
              <div>
                <div className="ctit">{c.curve.gain.title}</div>
                <div className="csub">{c.curve.gain.sub}</div>
              </div>
              <span className="ctag">{c.curve.gain.tag}</span>
            </div>
            {PlotCompone}
            <div className="axis">{c.curve.axisT}</div>
            <ul>
              {c.curve.gain.bullets.map((b) => (
                <li key={b}>
                  <span className="dot" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 32 }}>
          {c.pivota}
          <b>{c.pivotb}</b>
          {c.pivotc}
        </p>
      </div>
    </section>
  );
}
