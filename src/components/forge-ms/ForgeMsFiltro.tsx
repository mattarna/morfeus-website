import type { ForgeCopy } from "./copy";

/* ============================================================
   05 · IL FILTRO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, lead, le due liste (sei nel
   posto giusto se / meglio più avanti se), la nota finale. Stessa copy,
   stesso ordine.

   DISEGNO nuovo. Prima le due colonne erano due `.card` con dentro
   utility Tailwind e le spunte colorate a mano (verde e rosso inline).
   Un semaforo: e questa non è una sezione da semaforo, è una sezione
   che dice "non tutti, e va bene così". Ora usa lo stesso confronto a
   due colonne del "perché adesso", con lo stesso segno: chi è nel posto
   giusto ha la freccia, chi no ha la croce spenta. Nessun rosso: non
   essere il cliente giusto non è un errore.

   La nota finale — «la domanda che conta non è quanto fatturi, è quanti
   siete» — è la frase che chiude il ragionamento. Prende il pull-quote.
   ============================================================ */

export function ForgeMsFiltro({ t }: { t: ForgeCopy }) {
  const c = t.filtro;

  return (
    <section className="band ink forge" id="filtro">
      <div className="wrap">
        <div className="eye">{c.eye}</div>
        <h2 className="h-sect">
          {c.h2a}
          <span className="emph">{c.h2emph}</span>
          {c.h2b}
        </h2>
        <p className="lead">{c.lead}</p>

        <div className="confronto" style={{ marginTop: 30 }}>
          <div className="colonna buona">
            <div className="t">{c.yesTitle}</div>
            <ul>
              {c.yes.map((x) => (
                <li key={x}>
                  <span className="m">→</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="colonna">
            <div className="t">{c.noTitle}</div>
            <ul>
              {c.no.map((x) => (
                <li key={x}>
                  <span className="m">✕</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="tira-somme" style={{ marginTop: 30 }}>
          {c.note}
        </p>
      </div>
    </section>
  );
}
