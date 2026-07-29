"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ImparaPercorso } from "@/lib/impara-percorsi";

/**
 * I quattro percorsi con le lezioni a fisarmonica.
 *
 * E' un componente client perche' serve lo stato di apertura, ma il contenuto
 * finisce lo stesso nell'HTML: in App Router i componenti client vengono resi
 * dal server al primo caricamento e poi idratati. Le 18 domande e risposte
 * sono quindi nel sorgente della pagina, che e' il punto: sono la materia del
 * `FAQPage` nei dati strutturati e il motivo per cui questa pagina esiste.
 *
 * L'avanzamento (quante lezioni hai aperto) vive in localStorage. Si legge
 * dentro useEffect e non durante il render: leggerlo prima darebbe un HTML
 * diverso fra server e browser, e l'idratazione salterebbe.
 */

const CHIAVE = "morfeus-impara-viste";

export function ImparaPercorsi({
  percorsi,
  locale,
}: {
  percorsi: ImparaPercorso[];
  locale: "it" | "en";
}) {
  const [aperte, setAperte] = useState<Set<string>>(new Set());
  const [viste, setViste] = useState<Set<string>>(new Set());
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const grezzo = localStorage.getItem(CHIAVE);
      if (grezzo) setViste(new Set(JSON.parse(grezzo) as string[]));
    } catch {
      /* localStorage negato (navigazione privata, terze parti bloccate):
         si perde solo l'avanzamento, la pagina funziona identica. */
    }
    setPronto(true);
  }, []);

  const apri = (id: string) => {
    setAperte((prima) => {
      const dopo = new Set(prima);
      if (dopo.has(id)) dopo.delete(id);
      else dopo.add(id);
      return dopo;
    });
    setViste((prima) => {
      if (prima.has(id)) return prima;
      const dopo = new Set(prima).add(id);
      try {
        localStorage.setItem(CHIAVE, JSON.stringify([...dopo]));
      } catch {
        /* vedi sopra */
      }
      return dopo;
    });
  };

  return (
    <>
      {percorsi.map((p) => {
        const fatte = p.lezioni.filter((l) => viste.has(l.id)).length;
        const quota = Math.round((fatte / p.lezioni.length) * 100);
        return (
          <div className="ia-blocco" id={p.id} key={p.id}>
            <div className="eye">{p.eye}</div>
            <h2>{p.titolo}</h2>
            <p className="ia-intro">{p.intro}</p>

            <div className="ia-meta">
              <span className="ia-tag">{p.livello}</span>
              <span className="durata">{p.durata}</span>
            </div>

            <div className="ia-prog">
              <div
                className="bar"
                role="progressbar"
                aria-valuenow={pronto ? quota : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={
                  locale === "it"
                    ? `Avanzamento del percorso ${p.titolo}`
                    : `Progress for ${p.titolo}`
                }
              >
                {/* larghezza a 0 finche' non abbiamo letto localStorage,
                    altrimenti il primo render del browser non combacia con
                    quello del server */}
                <span style={{ width: pronto ? `${quota}%` : 0 }} />
              </div>
              <span className="pc">
                {pronto ? fatte : 0}/{p.lezioni.length}
              </span>
            </div>

            <div className="ia-lezioni">
              {p.lezioni.map((l) => {
                const isAperta = aperte.has(l.id);
                return (
                  <div
                    className="ia-lezione"
                    key={l.id}
                    id={l.anchor}
                    data-aperta={isAperta ? "1" : "0"}
                    data-vista={pronto && viste.has(l.id) ? "1" : "0"}
                  >
                    <h3 className="q">
                      <button
                        type="button"
                        aria-expanded={isAperta}
                        aria-controls={`r-${l.id}`}
                        onClick={() => apri(l.id)}
                      >
                        <span className="n">{l.n}</span>
                        <span className="t">{l.q}</span>
                        <svg
                          className="ic"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </h3>
                    <div className="risposta" id={`r-${l.id}`} role="region">
                      <div>
                        <div className="pad">
                          <p>{l.a}</p>
                          {l.gloss ? (
                            <Link className="appro" href={`/${locale}${l.gloss.href}`}>
                              {l.gloss.label} &rarr;
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
