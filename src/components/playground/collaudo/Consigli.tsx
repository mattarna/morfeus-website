/* ============================================================
   GLI ALTRI FRONTI · i consigli che c'erano gia' e non si vedevano
   ------------------------------------------------------------
   Il referto sceglie il punto piu' scoperto e da' il piano per
   quello: e' giusto, perche' una persona che esce con quattro
   cantieri aperti non ne apre nessuno.

   Ma PIANO ha tre mosse per TUTTI e cinque gli assi, e quattro
   quinti di quel lavoro non si vedevano mai. Qui compare la prima
   mossa di ciascuno degli altri: la piu' piccola, quella che si fa
   oggi. Non un secondo piano che compete col primo, un promemoria
   di dove si andra' quando il primo gira.

   SOLO SULLA PAGINA DEL LINK, non nell'overlay del collaudo. Li' il
   referto deve far scegliere UNA porta e ogni riga in piu' allontana
   la scelta. Qui si legge con calma, e allora aver messo via anche
   il resto e' un servizio.
   ============================================================ */

import { DIMENSIONI, PESI, type Dimensione } from "./motore";
import { DIMENSIONI_COPY, PIANO } from "./copy";
import "./consigli.css";

export function Consigli({
  radiografia,
  giaCoperto,
}: {
  radiografia: Record<Dimensione, number>;
  /** L'asse su cui il referto ha gia' dato il piano: ripeterlo qui
   *  farebbe sembrare il documento scritto da due persone diverse. */
  giaCoperto: Dimensione;
}) {
  /* Stesso ordine con cui il referto sceglie il punto debole: prima il
     piu' scoperto, e a parita' di punti quello che pesa di piu'. Cosi'
     la lista si legge come una coda di priorita' vera, non come un
     elenco alfabetico. */
  const altri = DIMENSIONI.filter((d) => d !== giaCoperto).sort(
    (a, b) => radiografia[a] - radiografia[b] || PESI[b] - PESI[a],
  );

  return (
    <section className="cs">
      <div className="cs-in">
        <p className="cs-k">Gli altri fronti</p>
        <h2>Quando il piano qui sopra gira, si continua da qui.</h2>
        <p className="cs-lead">
          Uno alla volta, in quest&apos;ordine: prima quello dove sei più scoperto. Di ciascuno c&apos;è
          la prima mossa, quella che si fa oggi.
        </p>

        <ol className="cs-lista">
          {altri.map((d) => (
            <li key={d}>
              <div className="cs-testa">
                <span className="cs-nome">{DIMENSIONI_COPY[d].etichetta}</span>
                <span className="cs-punti" aria-label={`${radiografia[d]} su 3`}>
                  {[0, 1, 2].map((i) => (
                    <i key={i} className={i < radiografia[d] ? "on" : ""} />
                  ))}
                </span>
              </div>
              <p className="cs-stato">
                {radiografia[d] >= 2 ? DIMENSIONI_COPY[d].solido : DIMENSIONI_COPY[d].scoperto}
              </p>
              <p className="cs-mossa">
                <b>La prima mossa:</b> {PIANO[d][0].cosa}
              </p>
            </li>
          ))}
        </ol>

        <p className="cs-chiusa">
          Non serve farli tutti. Serve farne uno fino in fondo: il collaudo si rifà, e il livello si
          muove solo quando una cosa è davvero cambiata.
        </p>
      </div>
    </section>
  );
}
