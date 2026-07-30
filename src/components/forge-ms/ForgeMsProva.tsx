import Link from "next/link";
import type { ForgeCopy } from "./copy";

/* Casi reali del cluster expertise-business (fonte: /casi). */
const CASE_HREFS = ["ag-academy-onboarding", "scalers-pre-sales", "globia-scoring-deterministico"] as const;

/* ============================================================
   06 · LA PROVA
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, lead, i tre casi con la
   citazione e il numero, il link a tutti i casi. Stessa copy, stesso
   ordine, stesse destinazioni.

   DISEGNO nuovo. Erano tre card affiancate, e a tre colonne la
   citazione andava a capo ogni due parole mentre il numero — che è la
   cosa che convince — finiva schiacciato in fondo. Ora sono RIGHE
   EDITORIALI separate da filetti: citazione a sinistra, numero a
   destra, timbro in coda. È esattamente il modo in cui /casi mostra
   le stesse cose, ed è giusto che due pagine che mostrano un caso lo
   mostrino allo stesso modo — chi arriva qui dopo aver visto l'archivio
   riconosce la forma.
   ============================================================ */

export function ForgeMsProva({ t, base }: { t: ForgeCopy; base: string }) {
  const c = t.casi;

  return (
    <section className="band carta forge" id="casi">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>
        <p className="lead">{c.lead}</p>

        <div className="prove">
          {c.cards.map((card, i) => (
            <Link className="prova" href={`${base}/casi/${CASE_HREFS[i]}`} key={card.meta}>
              <div>
                <div className="meta">{card.meta}</div>
                <p className="q">
                  {card.qa}
                  <span className="emph">{card.qEmph}</span>
                  {card.qb}
                </p>
              </div>
              <p className="who">
                <b>{card.whoB}</b>
                {card.whoRest}
              </p>
              <div className="coda">
                <span className="timbro">{c.stamp}</span>
                <span className="freccia">{c.open}</span>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 26 }}>
          <Link className="btn btn-3" href={`${base}/casi`}>
            {c.all}
          </Link>
        </p>
      </div>
    </section>
  );
}
