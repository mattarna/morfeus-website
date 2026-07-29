"use client";

/* ============================================================
   PLAYGROUND · il menu del telefono
   ------------------------------------------------------------
   Sull'isola in alto le quattro voci spariscono sotto i 900px e
   fin qui nessuno poteva piu' raggiungere le sezioni: c'era il
   logo, il bottone del collaudo, e basta. Questo e' il pezzo che
   mancava.

   Modello: il menu del sito Morfeus B2B (logo · CTA · MENU/CHIUDI,
   pannello a schermo pieno con le voci numerate, contatti in
   fondo). Stessa meccanica, pelle del Playground: giallo sulla
   CTA, viola sui numeri, notte sul fondo.

   Perche' non sta in playground.css: quel file e' generato dal
   prototipo HTML, e questo componente ha uno stato React che nel
   prototipo non puo' esistere. Come collaudo.css e referto.css,
   si porta il suo.
   ============================================================ */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
/* Il css NON si importa qui ma in PlaygroundLanding, subito dopo
   playground.css: i due file hanno regole sullo stesso selettore
   (.island) con la stessa specificita', quindi vince chi arriva
   dopo. Importandolo da qui finiva prima e le regole del telefono
   venivano annullate. */

/* NON tutte le sezioni: sei.
   Un menu con dentro quattordici voci non e' un menu, e' un indice che
   scorre, e obbliga a leggere una lista per scegliere. Queste sono le
   quattro gia' curate sull'isola del desktop piu' due che sul telefono
   servono davvero: chi c'e' dietro e se la cosa fa per te.
   Restano fuori le sezioni di racconto (le strade, il nemico, un giorno
   dentro): si incontrano scorrendo, e nessuno le cerca da un menu. */
const VOCI = [
  { id: "credo", label: "Il credo" },
  { id: "stanza", label: "Cosa c'è dentro" },
  { id: "prova", label: "Chi c'è dentro" },
  { id: "morfeus", label: "Chi c'è dietro" },
  { id: "perte", label: "È per te?" },
  { id: "faq", label: "Le domande" },
];

/** Dove appendere il pannello: la radice della pelle del playground. */
function ospite(): HTMLElement {
  return (document.querySelector(".pg26") as HTMLElement | null) ?? document.body;
}

export function MenuMobile({ onCollaudo }: { onCollaudo: () => void }) {
  const [aperto, setAperto] = useState(false);

  /* con il pannello aperto la pagina sotto non deve scorrere */
  useEffect(() => {
    if (!aperto) return;
    const prima = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prima;
    };
  }, [aperto]);

  /* Esc chiude: e' un pannello a schermo pieno, e restarci
     intrappolati con la tastiera aperta e' il modo piu' veloce per
     far chiudere la scheda */
  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperto(false);
    };
    window.addEventListener("keydown", suTasto);
    return () => window.removeEventListener("keydown", suTasto);
  }, [aperto]);

  /* IL PANNELLO ESCE DALL'ISOLA, MA NON DALLA PELLE.
     L'isola ha un backdrop-filter, e un filtro crea un blocco di
     contenimento per i discendenti in position:fixed: il pannello si
     ancorava alla pastiglia e veniva fuori alto 118px invece che a
     tutto schermo.
     Va portato fuori, ma NON su document.body: li' finirebbe fuori da
     .pg26 e perderebbe di colpo palette, font e regole (e' successo:
     un div nudo in mezzo alla pagina). Si aggancia quindi a .pg26,
     che un blocco di contenimento non lo crea: lo dimostra la sua
     stessa grana, che e' fixed e copre lo schermo. */
  const pannello = (
    <div className="mnu-pannello" id="menu-playground">
      <nav className="mnu-voci">
        {VOCI.map((v, i) => (
          <a
            key={v.id}
            href={`#${v.id}`}
            onClick={() => {
              /* si sblocca lo scorrimento SUBITO, non aspettando il
                 giro di React: se il body e' ancora bloccato quando il
                 browser esegue il salto all'ancora, il salto non
                 avviene e resti dove sei */
              document.body.style.overflow = "";
              setAperto(false);
            }}
            style={{ animationDelay: `${28 + i * 22}ms` }}
          >
            <i>{String(i + 1).padStart(2, "0")}</i>
            <span>{v.label}</span>
          </a>
        ))}
        <button
          className="mnu-cta"
          style={{ animationDelay: `${28 + VOCI.length * 22}ms` }}
          onClick={() => {
            setAperto(false);
            onCollaudo();
          }}
        >
          <i>{String(VOCI.length + 1).padStart(2, "0")}</i>
          <span>Fai il collaudo →</span>
        </button>
      </nav>

      <div className="mnu-piede">
        <p className="mnu-lab">Il Playground è di Morfeus</p>
        <a href="mailto:hello@morfeushub.com">hello@morfeushub.com</a>
        <p className="mnu-lab mnu-nota">1100+ builder dentro · ingresso gratis</p>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="mnu-tasto"
        onClick={() => setAperto((x) => !x)}
        aria-expanded={aperto}
        aria-controls="menu-playground"
      >
        {aperto ? "Chiudi" : "Menu"}
      </button>

      {aperto ? createPortal(pannello, ospite()) : null}
    </>
  );
}
