"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AREE_ETICHETTE, CASI, PROBLEMI, type ChiaveProblema, type Area } from "@/lib/casi";

/* ============================================================
   ARCHIVIO DEI CASI.
   ------------------------------------------------------------
   L'unica isola client della pagina. Il filtro lavora su una lista
   gia' presente nel DOM: chi arriva senza JS vede tutti i casi e i
   crawler li leggono. Nessuna chiamata, nessuna attesa.

   I FILTRI PER PROBLEMA NON STANNO PIU' QUI.
   C'erano, ed erano una ripetizione: la sezione "Parti da quello
   che riconosci" elenca gia' gli stessi quattro problemi, poche
   righe sopra. Due elenchi identici a distanza di uno schermo.
   Ha vinto la sezione, per due motivi: e' una sezione approvata del
   copy, con una funzione dichiarata ("riconoscere il proprio
   problema, non cercare il proprio settore"), mentre i chip erano
   un'aggiunta mia; e come chip quelle frasi lunghe occupavano due
   righe di maiuscoletto, che e' il modo peggiore di leggerle.

   Ora quella sezione FILTRA davvero: ogni riga e' un link a
   ?problema=..., il server legge il parametro e passa qui il valore
   iniziale. Funziona senza JS, e' condivisibile come URL e la
   pagina arriva gia' filtrata invece di filtrarsi dopo.

   Restano i chip per AREA, che sono parole corte e non duplicano
   niente. Mai un filtro per tecnologia: lo vieta il brief, e chi
   arriva qui non cerca "un progetto con gli agenti", cerca qualcuno
   che abbia gia' risolto il suo problema.
   ============================================================ */

type Props = {
  locale: "it" | "en";
  problemaIniziale?: ChiaveProblema | null;
  etichette: {
    perArea: string;
    tutte: string;
    nessuno: string;
    filtroAttivo: string;
    togli: string;
    uno: string;
    molti: string;
    suffisso: string;
    timbro: string;
  };
};

const AREE: Area[] = ["Vendite", "Operations", "Margine", "Reporting"];

const CLASSE_AREA: Record<Area, string> = {
  Vendite: "area-vendite",
  Operations: "area-operations",
  Margine: "area-margine",
  Reporting: "area-reporting",
};

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
      {problema && (
        <p className="filtro-attivo">
          <span className="quota" style={{ flex: "none" }}>
            {etichette.filtroAttivo}
          </span>
          <span className="frase">{PROBLEMI[problema][locale]}</span>
          <button type="button" className="filtro" onClick={() => setProblema(null)}>
            {etichette.togli}
          </button>
        </p>
      )}

      <div className="filtri" style={{ marginTop: problema ? 20 : 30 }}>
        <span className="quota" style={{ flex: "none", marginRight: 6 }}>
          {etichette.perArea}
        </span>
        <button
          type="button"
          className="filtro"
          aria-pressed={area === null}
          onClick={() => setArea(null)}
        >
          {etichette.tutte}
        </button>
        {AREE.map((a) => (
          <button
            key={a}
            type="button"
            className="filtro"
            aria-pressed={area === a}
            onClick={() => setArea(area === a ? null : a)}
          >
            {AREE_ETICHETTE[a][locale]}
          </button>
        ))}
      </div>

      <p className="quota" style={{ marginTop: 26 }} aria-live="polite">
        {`${visibili.length} ${
          visibili.length === 1 ? etichette.uno : etichette.molti
        } ${etichette.suffisso}`}
      </p>

      <div className="archivio">
        {visibili.map((c) => {
          const primo = c.numeri[0];
          return (
            <Link
              key={c.slug}
              href={`/${locale}/casi/${c.slug}`}
              className={`voce ${CLASSE_AREA[c.area]}`}
            >
              <span className="barra" aria-hidden="true" />
              <div className="corpo">
                <div className="testata">
                  <span className="area">{AREE_ETICHETTE[c.area][locale]}</span>
                  <span className="chi">
                    {c.chi[locale]}
                    {c.taglia ? (
                      <>
                        <br />
                        {c.taglia}
                      </>
                    ) : null}
                  </span>
                </div>

                <h3>{c.titolo[locale]}</h3>
                <p>{c.sintesi[locale]}</p>

                <div className="piede">
                  {primo && (
                    <span className="esito">
                      <span className="n">{primo.valore}</span>
                      <span className="k">{primo.etichetta[locale]}</span>
                    </span>
                  )}
                  {c.confermato && <span className="timbro">{etichette.timbro}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {visibili.length === 0 && (
        <p className="lead" style={{ marginTop: 24 }}>
          {etichette.nessuno}
        </p>
      )}
    </>
  );
}
