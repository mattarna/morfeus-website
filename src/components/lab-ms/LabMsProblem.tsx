import { useTranslations } from "next-intl";

/* ============================================================
   03 · IL PROBLEMA — fascia INCHIOSTRO.
   ------------------------------------------------------------
   E' la sezione piu' lunga dell'originale e la porto INTERA, nello
   stesso ordine: i 4 sintomi, poi "l'aggravante" con il dato McKinsey,
   poi le 3 carte della trappola, poi la chiusa. Niente tagli: la
   richiesta e' riadattare lo stile, non riscrivere la pagina.

   I titoli della copy usano i tag rich <br></br> e <spanSub>. Nel DS
   .ms lo spanSub diventa .emph — mappatura tua, presa dal tuo /lab su
   exp/font-jakarta, dove "Tu non lo sai." passa da spanSub a emph.

   Le carte portano un codice progressivo (S01..S04, T01..T03) nel .ck:
   e' l'idioma del sistema, che nel tuo /lab numera le carte allo
   stesso modo. L'originale quel codice non ce l'ha — e' l'unica
   aggiunta, ed e' tipografia, non contenuto.
   ============================================================ */

const SINTOMI = ["1", "2", "3", "4"] as const;
const TRAPPOLE = ["1", "2", "3"] as const;

export function LabMsProblem() {
  const t = useTranslations("Lab.problem_analysis");

  const rich = {
    br: () => <br />,
    spanSub: (chunks: React.ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink" id="problem-analysis">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="four" style={{ marginTop: 28 }}>
          {SINTOMI.map((n, i) => (
            <div className="card" key={n}>
              <div className="ck">{`S0${i + 1}`}</div>
              <div className="ct">{t(`symptoms.${n}.title`)}</div>
              <p>{t(`symptoms.${n}.desc`)}</p>
            </div>
          ))}
        </div>

        {/* L'aggravante: nell'originale e' un blocco a se', dopo i sintomi.
            Resta dov'e', con lo stesso ruolo di rilancio. */}
        <div style={{ marginTop: 64 }}>
          <div className="eye">{t("trap_label")}</div>
          <h2 className="h-sect">{t.rich("trap_headline", rich)}</h2>
          <p className="lead">{t("trap_subtitle")}</p>

          {/* Il dato con la sua fonte. Qui la fonte c'e' (McKinsey) ed e'
              attaccata al numero: e' l'unico modo in cui un dato regge la
              seconda domanda di un CFO. */}
          <div className="card" style={{ marginTop: 26 }}>
            <div className="ck">DATO</div>
            <p style={{ fontSize: 15.5 }}>{t("trap_stat")}</p>
            <p
              className="mono"
              style={{ fontSize: 11, color: "var(--ombra)", marginTop: 10 }}
            >
              {t("trap_source")}
            </p>
          </div>

          <div className="three" style={{ marginTop: 22 }}>
            {TRAPPOLE.map((n, i) => (
              <div className="card" key={n}>
                <div className="ck">{`T0${i + 1}`}</div>
                <div className="ct">{t(`trap_cards.${n}.title`)}</div>
                <p>{t(`trap_cards.${n}.desc`)}</p>
              </div>
            ))}
          </div>

          {/* La chiusa e' una citazione: nel DS il registro della voce e'
              .lame (Clash, corpo medio, larghezza corta). */}
          <p className="lame" style={{ marginTop: 30 }}>
            {t("trap_closing")}
          </p>
        </div>
      </div>
    </section>
  );
}
