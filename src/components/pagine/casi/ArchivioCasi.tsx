"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CASI, PROBLEMI, type ChiaveProblema, type Area } from "@/lib/casi";

/* ============================================================
   ARCHIVIO DEI CASI, con i filtri.
   ------------------------------------------------------------
   L'unica isola client della pagina: tutto il resto e' server
   rendered. Il filtro lavora su una lista gia' presente nel DOM,
   quindi chi arriva senza JS vede comunque tutti i casi, e i
   crawler li leggono tutti. Nessuna chiamata, nessuna attesa.

   TRE ASSI, quelli chiesti dal brief: problema, funzione
   aziendale, tipo di sistema. Non si filtra per tecnologia usata,
   ed e' scritto nel brief a caratteri chiari: chi arriva qui non
   sta cercando "un progetto con gli agenti", sta cercando qualcuno
   che abbia gia' risolto il suo problema.

   L'ancora #archivio accetta ?problema=... cosi' le righe della
   diagnosi entrano qui gia' filtrate senza far ripartire la
   pagina. Il valore iniziale arriva da chi monta il componente.
   ============================================================ */

type Props = {
  locale: "it" | "en";
  problemaIniziale?: ChiaveProblema | null;
  etichette: {
    tutti: string;
    perProblema: string;
    perArea: string;
    nessuno: string;
    /* Le parole del conteggio arrivano separate, non come funzione:
       da un server component non si possono passare funzioni a un
       client component. La frase si compone qui. */
    uno: string;
    molti: string;
    suffisso: string;
  };
};

const AREE: Area[] = ["Vendite", "Operations", "Margine", "Reporting"];

export function ArchivioCasi({ locale, problemaIniziale = null, etichette }: Props) {
  const [problema, setProblema] = useState<ChiaveProblema | null>(problemaIniziale);
  const [area, setArea] = useState<Area | null>(null);

  const visibili = useMemo(
    () =>
      CASI.filter(
        (c) => (!problema || c.problema === problema) && (!area || c.area === area)
      ),
    [problema, area]
  );

  return (
    <>
      <div className="filtri" style={{ marginTop: 30 }}>
        <span className="quota" style={{ flex: "none", marginRight: 6 }}>
          {etichette.perProblema}
        </span>
        <button
          type="button"
          className="filtro"
          aria-pressed={problema === null}
          onClick={() => setProblema(null)}
        >
          {etichette.tutti}
        </button>
        {(Object.keys(PROBLEMI) as ChiaveProblema[]).map((k) => (
          <button
            key={k}
            type="button"
            className="filtro"
            aria-pressed={problema === k}
            onClick={() => setProblema(problema === k ? null : k)}
          >
            {PROBLEMI[k][locale]}
          </button>
        ))}
      </div>

      <div className="filtri" style={{ marginTop: 14 }}>
        <span className="quota" style={{ flex: "none", marginRight: 6 }}>
          {etichette.perArea}
        </span>
        {AREE.map((a) => (
          <button
            key={a}
            type="button"
            className="filtro"
            aria-pressed={area === a}
            onClick={() => setArea(area === a ? null : a)}
          >
            {a}
          </button>
        ))}
      </div>

      <p
        className="quota"
        style={{ marginTop: 26 }}
        aria-live="polite"
      >
        {`${visibili.length} ${visibili.length === 1 ? etichette.uno : etichette.molti} ${etichette.suffisso}`}
      </p>

      <div className="archivio">
        {visibili.map((c) => (
          <Link
            key={c.slug}
            href={`/${locale}/casi/${c.slug}`}
            className="voce"
          >
            <div className="chi">
              <b>{c.area}</b>
              {c.chi[locale]}
              {c.taglia ? (
                <>
                  <br />
                  {c.taglia}
                </>
              ) : null}
            </div>

            <div>
              <h3>{c.titolo[locale]}</h3>
              <p>{c.sintesi[locale]}</p>
            </div>

            <div className="esito">
              {c.numeri.slice(0, 1).map((n) => (
                <span key={n.valore}>
                  <span className="n">{n.valore}</span>
                  <span className="k">{n.etichetta[locale]}</span>
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {visibili.length === 0 && (
        <p className="lead" style={{ marginTop: 24 }}>
          {etichette.nessuno}
        </p>
      )}
    </>
  );
}
