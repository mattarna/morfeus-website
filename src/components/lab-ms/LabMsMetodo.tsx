import { useTranslations } from "next-intl";

/* ============================================================
   06 · COME FUNZIONA, fascia CARTA (primo stacco)
   ------------------------------------------------------------
   Qui la pagina smette di diagnosticare e spiega COME SI FA. Il
   cambio di fondo annuncia il cambio di discorso: su carta il
   registro non e' piu' lo strumento acceso al buio, e' la scheda
   tecnica stampata.

   WIREFRAME: quello dell'originale, e stavolta per intero. Le tre
   fasi si ALTERNANO ai lati di una linea centrale, con il perno
   sulla linea e la cifra gigante dietro. Prima avevo usato la
   .vtimeline del DS, che e' a colonna sola: va benissimo per un
   indice, ma perde il passo del racconto, e il passo era la cosa
   migliore di quella sezione.

   Restano i pezzi del DS dove hanno senso: .vp per la pill di
   fase, .vsub, .vlist con i marcatori, .vnote in corsivo. Quelle
   regole vivono pero' solo sotto .vstep, quindi il contenuto della
   fase porta ANCHE quella classe: eredita tipografia e colori dal
   sistema, e in lab-ms.css neutralizzo solo la parte di
   impaginazione che qui non serve (l'incolonnamento e la linea).
   Meglio che ricopiare trenta righe di dichiarazioni.

   Nella colonna di destra il testo e' allineato a destra e il
   marcatore dell'elenco passa dall'altra parte, altrimenti i
   puntini restano orfani lontani dal testo. Sotto gli 860px
   l'alternanza non ha senso: tutto torna in colonna a sinistra.
   ============================================================ */

const FASI = ["1", "2", "3"] as const;

export function LabMsMetodo() {
  const t = useTranslations("Lab.how_it_works");

  return (
    <section className="band carta lab" id="how-it-works">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">
          {t.rich("headline", {
            br: () => <br />,
            spanSub: (chunks) => <span className="emph">{chunks}</span>,
          })}
        </h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="cta-row">
          <a className="btn btn-1" href="#contact">
            {t("cta")}
          </a>
          <a className="btn btn-2-ink" href="#levels">
            {t("cta_secondary")}
          </a>
        </div>

        <div className="fasi">
          {FASI.map((n, i) => {
            const bullets = Object.values(
              t.raw(`steps.${n}.bullets`) as Record<string, string>
            );
            const aDestra = i % 2 === 1;

            return (
              <div className={`fase ${aDestra ? "dx" : "sx"}`} key={n}>
                <span className="perno" aria-hidden="true" />
                <span className="cifra" aria-hidden="true">{`0${i + 1}`}</span>

                <div className="contenuto vstep">
                  <span className="vp">{t(`steps.${n}.tag`)}</span>
                  <h3>{t(`steps.${n}.title`)}</h3>
                  <div className="vsub">{t(`steps.${n}.subtitle`)}</div>

                  <ul className="vlist">
                    {bullets.map((b) => (
                      <li key={b}>
                        <span className="dm">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="vnote">{t(`steps.${n}.keyMessage`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
