"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Ricerca e filtri del glossario.
 *
 * I termini NON stanno qui dentro: li rende il server, tutti e 85, dentro la
 * pagina. Questo componente si limita a nasconderli agendo sul DOM.
 *
 * Il motivo e' l'indicizzazione: se la lista fosse renderizzata dal client, il
 * crawler troverebbe una pagina vuota. Una pagina che esiste per essere
 * trovata a colpi di ricerca non puo' permetterselo, ed e' anche il senso
 * dell'intero glossario (`DefinedTermSet` nel JSON-LD).
 *
 * Quindi: contenuto nel sorgente HTML, interazione sopra.
 */

const COPY = {
  it: {
    cerca: "Cerca un termine...",
    label: "Cerca un termine",
    filtra: "Filtra per tipo",
    tutti: "Tutti",
    nessuno: "Nessun termine corrisponde alla ricerca.",
  },
  en: {
    cerca: "Search a term...",
    label: "Search a term",
    filtra: "Filter by type",
    tutti: "All",
    nessuno: "No term matches your search.",
  },
} as const;

const TAG = ["morfeus", "ai", "claude"] as const;
const ETICHETTA: Record<(typeof TAG)[number], string> = {
  morfeus: "Morfeus",
  ai: "AI",
  claude: "Claude",
};

export function GlossarioFiltri({ locale }: { locale: "it" | "en" }) {
  const t = COPY[locale];
  const [tag, setTag] = useState<string>("all");
  const q = useRef("");

  /* Applica ricerca e filtro insieme: sono due condizioni sullo stesso
     elenco, tenerle separate farebbe riapparire voci escluse dall'altra. */
  const applica = useCallback((testo: string, tipo: string) => {
    const cerca = testo.trim().toLowerCase();
    let visibili = 0;

    for (const grp of document.querySelectorAll<HTMLElement>("[data-gl-grp]")) {
      let vivi = 0;
      for (const el of grp.querySelectorAll<HTMLElement>("[data-gl-term]")) {
        const nome = el.dataset.glName ?? "";
        const testoVoce = el.dataset.glTesto ?? "";
        const okTipo = tipo === "all" || el.dataset.glTag === tipo;
        const okCerca = !cerca || nome.includes(cerca) || testoVoce.includes(cerca);
        const mostra = okTipo && okCerca;
        el.hidden = !mostra;
        if (mostra) vivi++;
      }
      /* un gruppo senza voci visibili sparisce con la sua lettera */
      grp.hidden = vivi === 0;
      visibili += vivi;
    }

    const vuoto = document.getElementById("gl-nomatch");
    if (vuoto) vuoto.hidden = visibili > 0;
  }, []);

  return (
    <div className="gl-search">
      <input
        type="search"
        placeholder={t.cerca}
        aria-label={t.label}
        onChange={(e) => {
          q.current = e.target.value;
          applica(q.current, tag);
        }}
      />
      <div className="gl-pills" role="group" aria-label={t.filtra}>
        <button
          type="button"
          className="gl-pill"
          aria-pressed={tag === "all"}
          onClick={() => {
            setTag("all");
            applica(q.current, "all");
          }}
        >
          {t.tutti}
        </button>
        {TAG.map((x) => (
          <button
            key={x}
            type="button"
            className="gl-pill"
            aria-pressed={tag === x}
            onClick={() => {
              setTag(x);
              applica(q.current, x);
            }}
          >
            {ETICHETTA[x]}
          </button>
        ))}
      </div>
    </div>
  );
}
