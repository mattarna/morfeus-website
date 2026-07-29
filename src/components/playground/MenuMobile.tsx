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
/* la lista sta in un posto solo: la usa anche il footer */
import { SEZIONI } from "./sezioni";
/* Il css NON si importa qui ma in PlaygroundLanding, subito dopo
   playground.css: i due file hanno regole sullo stesso selettore
   (.island) con la stessa specificita', quindi vince chi arriva
   dopo. Importandolo da qui finiva prima e le regole del telefono
   venivano annullate. */


/** Porta a una sezione SENZA animazione, e senza dipendere da
 *  scrollIntoView({behavior:"instant"}).
 *
 *  Quel valore e' entrato in Safari solo dalla 17.4: sulle versioni
 *  precedenti non viene ignorato, non e' ammesso nell'enumerazione e
 *  SOLLEVA un'eccezione che interrompe il gestore del clic. Risultato
 *  sul telefono: il pannello si chiudeva e non succedeva altro, mentre
 *  su Chrome ristretto funzionava tutto. Un caso in cui provare la
 *  versione mobile dal desktop non basta.
 *
 *  Qui l'animazione si spegne all'origine, mettendo scroll-behavior
 *  auto in linea su <html> (lo stile in linea batte qualunque
 *  selettore), si salta, e si rimette com'era. Funziona ovunque. */
function vaiA(id: string) {
  const meta = document.getElementById(id);
  if (!meta) return;
  const html = document.documentElement;
  const prima = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  try {
    meta.scrollIntoView({ block: "start" });
  } finally {
    html.style.scrollBehavior = prima;
  }
}

/* Il pannello si appende a document.body, NON dentro .pg26.
   .pg26 ha overflow-x: hidden, e su iOS Safari un antenato con
   l'overflow nascosto rompe il position:fixed dei discendenti: il
   pannello si posiziona rispetto al DOCUMENTO invece che alla
   finestra, quindi a pagina scrollata veniva disegnato in cima al
   documento, migliaia di pixel sopra lo schermo. Chrome non lo fa, ed
   e' il motivo per cui restringendo il desktop sembrava a posto.
   Fuori da .pg26 pero' si perdono palette, font e regole (le classi
   sono tutte .pg26 .mnu-*): per questo il pannello viaggia dentro un
   involucro che quella classe ce l'ha, con l'overflow rimesso a posto
   e la grana spenta (vedi .mnu-host in menu.css). */

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
        {SEZIONI.map((v, i) => (
          <a
            key={v.id}
            href={`#${v.id}`}
            onClick={(e) => {
              /* Salto IMMEDIATO, non animato. La pagina ha
                 scroll-behavior: smooth e fra una sezione e l'altra ci
                 sono anche undicimila pixel: col comportamento di
                 default tocchi una voce e parte un'animazione lunga
                 secondi, che su un telefono si legge come "non e'
                 successo niente". Da un menu ci si aspetta di essere
                 gia' arrivati.
                 Lo scorrimento va sbloccato PRIMA del salto, non
                 aspettando il giro di React: col body ancora bloccato
                 il salto non avverrebbe. */
              e.preventDefault();
              document.body.style.overflow = "";
              setAperto(false);
              vaiA(v.id);
              history.replaceState(null, "", `#${v.id}`);
            }}
            style={{ animationDelay: `${28 + i * 22}ms` }}
          >
            <i>{String(i + 1).padStart(2, "0")}</i>
            <span>{v.label}</span>
          </a>
        ))}
        <button
          className="mnu-cta"
          style={{ animationDelay: `${28 + SEZIONI.length * 22}ms` }}
          onClick={() => {
            setAperto(false);
            onCollaudo();
          }}
        >
          <i>{String(SEZIONI.length + 1).padStart(2, "0")}</i>
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

      {aperto
        ? createPortal(
            <div className="pg26 mnu-host">{pannello}</div>,
            document.body,
          )
        : null}
    </>
  );
}
