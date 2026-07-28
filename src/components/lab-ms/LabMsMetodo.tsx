import { useTranslations } from "next-intl";

/* ============================================================
   06 · COME FUNZIONA, fascia CARTA (primo stacco)
   ------------------------------------------------------------
   Qui la pagina smette di diagnosticare e spiega COME SI FA. Il
   cambio di fondo annuncia il cambio di discorso: su carta il
   registro non e' piu' lo strumento acceso al buio, e' la scheda
   tecnica stampata. E' il primo dei due stacchi chiari della pagina.

   WIREFRAME invariato: intestazione, due CTA, poi le tre fasi in
   timeline verticale con numero grande, marcatore, titolo,
   sottotitolo, elenco puntato e la frase chiave a chiudere.

   DISEGNO: .vtimeline del DS, usata per quello per cui e' nata -
   ha gia' il pallino, la linea di collegamento, la cifra fantasma,
   la pill di fase, l'elenco con i trattini e la nota in corsivo, e
   ha gia' le varianti carta. Non c'era niente da inventare: c'era
   da riconoscere che esisteva.
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

        <div className="cta-row" style={{ marginTop: 28 }}>
          <a className="btn btn-1" href="#contact">
            {t("cta")}
          </a>
          <a className="btn btn-2-ink" href="#levels">
            {t("cta_secondary")}
          </a>
        </div>

        <div className="vtimeline">
          {FASI.map((n, i) => {
            const bullets = Object.values(
              t.raw(`steps.${n}.bullets`) as Record<string, string>
            );
            return (
              <div className="vstep" key={n}>
                <span className="dot" />
                <span className="num">{`0${i + 1}`}</span>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}
