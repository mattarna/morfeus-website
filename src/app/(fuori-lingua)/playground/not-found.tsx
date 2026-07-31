import Link from "next/link";
import { SEZIONI } from "@/components/playground/sezioni";
import "@/components/playground/playground.css";
import "@/components/playground/notfound.css";

/* ============================================================
   404 del PLAYGROUND
   ------------------------------------------------------------
   Sta in app/playground/ e non nella radice apposta: Next fa
   scattare la not-found piu' vicina al segmento, e siccome il
   proxy riscrive TUTTO il sottodominio sotto /playground, questa
   copre ogni indirizzo sbagliato di playground.morfeushub.com. Il
   sito madre continua a usare la sua (quella con il glitch).

   Le due 404 devono essere DIVERSE: e' il punto della richiesta di
   Matt. Quindi qui niente glitch, che e' la firma del sito B2B, e
   invece il linguaggio di casa: la filigrana piena, il giallo di
   stato, il mono degli occhielli, e il tono della porta unica.

   La filigrana e' un SVG con testo PIENO, non contornato: in Plus
   Jakarta le cifre sono forme sovrapposte e non fuse, e qualunque
   stroke riporta a galla i bordi interni (il difetto dei "numeri
   rotti", spiegato per esteso in playground.css).

   Le voci in fondo arrivano da sezioni.ts, la stessa lista che
   usano il menu del telefono e il footer: tre consumatori, una
   fonte.
   ============================================================ */

export default function PlaygroundNotFound() {
  return (
    <div className="pg26">
      <section className="nf">
        <svg
          className="filigrana"
          viewBox="0 0 240 130"
          preserveAspectRatio="xMaxYMid meet"
          aria-hidden="true"
        >
          <text x="238" y="104">
            404
          </text>
        </svg>

        <div className="wrap nf-in">
          <p className="nf-occhio">Errore 404 · indirizzo non valido</p>

          <h1 className="nf-tit">Questa stanza non esiste.</h1>

          <p className="nf-sub">
            Il Playground ha una porta sola, e si apre col collaudo. Da qualunque parte volevi
            passare, si entra da lì.
          </p>

          <Link className="btn btn-giallo btn-big nf-cta" href="/">
            Torna all&apos;ingresso →
          </Link>

          <div className="nf-piede">
            <p className="nf-lab">O vai diritto a</p>
            <nav className="nf-voci">
              {SEZIONI.map((s) => (
                <Link key={s.id} href={`/#${s.id}`}>
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
