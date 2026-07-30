import Link from "next/link";
import type { ForgeCopy } from "./copy";

/* ============================================================
   03 · IL PRODOTTO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, i tre movimenti (01 raccoglie,
   02 automatizza, 03 connette), la frase che inquadra, la frase sul
   valore che si accumula, il link a MARF. Stessa copy, stesso ordine.

   DISEGNO nuovo. I tre movimenti erano tre card slegate. Sono i tre
   pezzi di UN impianto — raccoglie, automatizza, connette sono passaggi
   consecutivi, non opzioni — quindi vivono dentro un QUADRO unico con
   la sua riga di stato in cima. Il quadro dice "questo e' un sistema
   solo"; le tre stazioni dentro dicono cosa fa.

   Le icone restano quelle di prima, invariate: erano gia' buone e
   ridisegnarle sarebbe stato cambiare per cambiare.
   ============================================================ */

/* 01 · Raccoglie e pulisce → strati di dati */
const IcoRaccoglie = (
  <svg
    className="glifo"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

/* 02 · Automatizza → la scarica */
const IcoAutomatizza = (
  <svg
    className="glifo"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

/* 03 · Connette → nodi che si parlano */
const IcoConnette = (
  <svg
    className="glifo"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="5" cy="6" r="2.3" />
    <circle cx="19" cy="6" r="2.3" />
    <circle cx="12" cy="18" r="2.3" />
    <path d="M7 6h10M6.6 7.9 10.8 16.2M17.4 7.9 13.2 16.2" />
  </svg>
);

const ICONE = [IcoRaccoglie, IcoAutomatizza, IcoConnette];

export function ForgeMsProdotto({ t, base, isIt }: { t: ForgeCopy; base: string; isIt: boolean }) {
  const c = t.marf;

  return (
    <section className="band ink forge" id="prodotto">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>

        {/* un impianto solo, tre movimenti dentro */}
        <div className="quadro" style={{ marginTop: 30 }}>
          <div className="readout">
            <span>{isIt ? "Sistema · tre movimenti" : "System · three movements"}</span>
            <span className="on">
              <i />
              {isIt ? "In esercizio" : "Running"}
            </span>
          </div>
          <div className="tre" style={{ padding: 26, gap: 26 }}>
            {c.cards.map((card, i) => (
              <article key={card.n}>
                {ICONE[i]}
                <div className="cod" style={{ marginTop: 14 }}>
                  {card.n}
                </div>
                <h3 style={{ margin: "10px 0 8px", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {card.t}
                </h3>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "var(--testo-ink-2)" }}>{card.p}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 32 }}>
          {c.framea}
          <b>{c.frameb}</b>
          {c.framec}
        </p>

        <p className="copy" style={{ marginTop: 22, maxWidth: "62ch" }}>
          {c.compound}
        </p>

        <p style={{ marginTop: 22 }}>
          <Link className="btn btn-3" href={`${base}/marf`}>
            {c.link}
          </Link>
        </p>
      </div>
    </section>
  );
}
