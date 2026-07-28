"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PILASTRI, type ChiavePilastro } from "@/lib/pilastri";

/* ============================================================
   ARCHIVIO DEGLI ARTICOLI.
   ------------------------------------------------------------
   Stessa forma dell'archivio dei Casi, e non per pigrizia: sono due
   indici che fanno lo stesso gesto, e se li disegnassi diversi il
   sito parlerebbe due lingue nello stesso punto.

   I FILTRI SONO SOLO PER PILASTRO. Niente ricerca a testo libero:
   con tredici articoli una casella di ricerca e' teatro, aggiunge
   un campo da compilare e non fa risparmiare nulla. Se un giorno
   saranno cinquanta si rimette, e a quel punto servira' davvero.

   Il vincolo SEO del brief resta rispettato altrove: ogni pilastro
   deve avere anche un URL reale e indicizzabile. Questo filtro
   migliora la navigazione, non lo sostituisce.
   ============================================================ */

export type VoceArticolo = {
  slug: string;
  titolo: string;
  descrizione: string;
  pilastro: ChiavePilastro;
  lettura: string;
  data: string;
};

const CLASSE_PILASTRO: Record<ChiavePilastro, string> = {
  margine: "area-margine",
  processi: "area-operations",
  persone: "area-vendite",
  scelte: "area-reporting",
};

export function ArchivioArticoli({
  locale,
  voci,
  etichette,
}: {
  locale: "it" | "en";
  voci: VoceArticolo[];
  etichette: { tutti: string; uno: string; molti: string; suffisso: string; leggi: string };
}) {
  const [pilastro, setPilastro] = useState<ChiavePilastro | null>(null);

  const visibili = useMemo(
    () => voci.filter((v) => !pilastro || v.pilastro === pilastro),
    [voci, pilastro]
  );

  return (
    <>
      <div className="filtri" style={{ marginTop: 30 }}>
        <button
          type="button"
          className="filtro"
          aria-pressed={pilastro === null}
          onClick={() => setPilastro(null)}
        >
          {etichette.tutti}
        </button>
        {(Object.keys(PILASTRI) as ChiavePilastro[]).map((k) => (
          <button
            key={k}
            type="button"
            className="filtro"
            aria-pressed={pilastro === k}
            onClick={() => setPilastro(pilastro === k ? null : k)}
          >
            {PILASTRI[k].nome[locale]}
          </button>
        ))}
      </div>

      <p className="quota" style={{ marginTop: 26 }} aria-live="polite">
        {`${visibili.length} ${
          visibili.length === 1 ? etichette.uno : etichette.molti
        } ${etichette.suffisso}`}
      </p>

      <div className="archivio">
        {visibili.map((v) => (
          <Link
            key={v.slug}
            href={`/${locale}/insights/${v.slug}`}
            className={`voce ${CLASSE_PILASTRO[v.pilastro]}`}
          >
            <span className="barra" aria-hidden="true" />
            <div className="corpo">
              <div className="testata">
                <span className="area">{PILASTRI[v.pilastro].nome[locale]}</span>
                <span className="chi">{v.lettura}</span>
              </div>
              <h3>{v.titolo}</h3>
              <p>{v.descrizione}</p>
              <div className="piede">
                <span className="esito">
                  <span className="k" style={{ marginTop: 0 }}>
                    {v.data}
                  </span>
                </span>
                <span className="timbro">{etichette.leggi}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
