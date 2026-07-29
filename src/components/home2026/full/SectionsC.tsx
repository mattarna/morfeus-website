"use client";

/**
 * HOME 2026 · sezioni 9-11: ROI System, ROIometro, Casi.
 * Copy identico alla home di produzione (stesse chiavi next-intl).
 * Il ROIometro usa RoiCalc (montaggio dedicato home, stesso calcolo di /roiometro).
 */

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RoiCalc } from "./RoiCalc";

/* ============ [9] ROI SYSTEM · CARTA · timeline interattiva a 5 stadi ============ */

/* Value Recovery System — gli step sono cambiati con il copy B2B della
   home di produzione: architecture/execution/optimization/scale sono
   diventati champions/context/agents/compound. Le vecchie chiavi restano
   nei messages perche' le legge ancora la home v1 di questo progetto. */
const ROI_STEP_KEYS = ["mapping", "champions", "context", "agents", "compound"] as const;

export function RoiSystemPanel({ active }: { active: boolean }) {
  const t = useTranslations("ROI");
  const [activeStep, setActiveStep] = useState(0);

  const progress = (activeStep / (ROI_STEP_KEYS.length - 1)) * 84;
  const currentKey = ROI_STEP_KEYS[activeStep];

  return (
    <section className="panel band carta tight" data-active={active}>
      <div className="wrap rsys">
        <div className="eye fx d1">{t("label")}</div>
        {/* a capo fisso fra le due meta': "DA VALUE LEAK" sopra,
            "A VALORE CHE SI ACCUMULA" sotto. Lasciato al flusso, il
            titolo spezzava in mezzo alla seconda frase. */}
        <h2 className="h-sect fx d2" style={{ marginInline: "auto", maxWidth: "24ch" }}>
          {t("headline_1")}
          <br />
          <span className="emph">{t("headline_2")}</span>
        </h2>

        {/* palco del contenuto: cambia con lo stadio selezionato */}
        <div className="stagearea">
          <span className="ghost" key={`g-${currentKey}`} aria-hidden="true">
            {t(`steps.${currentKey}.concept`)}
          </span>
          <div className="swap" key={currentKey}>
            <p className="principle">{t(`steps.${currentKey}.principle`)}</p>
            <p className="expl">{t(`steps.${currentKey}.explanation`)}</p>
          </div>
        </div>

        {/* stepper: 5 stadi cliccabili */}
        <div className="fx d3 rsys-desktop">
          <div className="dots">
            <span className="prog" style={{ width: `${progress}%` }} />
            {ROI_STEP_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                data-on={i === activeStep}
                data-past={i < activeStep}
                onClick={() => setActiveStep(i)}
                aria-label={t(`steps.${key}.label`)}
              >
                <i />
              </button>
            ))}
          </div>
          <div className="dot-labels">
            {ROI_STEP_KEYS.map((key, i) => (
              <span key={key} data-on={i === activeStep}>
                {t(`steps.${key}.label`)}
              </span>
            ))}
          </div>
        </div>

        {/* Da telefono lo stesso contenuto e' una LISTA di cinque schede:
            quella aperta mostra principio e spiegazione, le altre restano
            righe con numero, etichetta e pallino.
            Lo stepper orizzontale qui non funziona e basta: cinque
            etichette su 375px si sovrappongono l'una all'altra
            ("CONTEXTAGENTICOMPOUND"), e il testo dello stadio vive lontano
            dal punto che si tocca.
            E' markup a parte e non una riscrittura del palco perche' il
            desktop e' approvato e non va toccato: l'uno esclude l'altra a
            colpi di media query, non convivono mai. */}
        <ul className="rsys-mobile">
          {ROI_STEP_KEYS.map((key, i) => {
            const aperta = i === activeStep;
            return (
              <li key={key} data-on={aperta}>
                <button
                  type="button"
                  onClick={() => setActiveStep(i)}
                  aria-expanded={aperta}
                >
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lab">{t(`steps.${key}.label`)}</span>
                  <span className="pallino" aria-hidden="true" />
                </button>
                {aperta ? (
                  <div className="corpo">
                    <p className="principle">{t(`steps.${key}.principle`)}</p>
                    <p className="expl">{t(`steps.${key}.explanation`)}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="outcome fx d4">{t("outcome")}</div>
      </div>
    </section>
  );
}

/* ============ [10] ROIOMETRO · INCHIOSTRO · riusa il componente brand 2026 ============ */

export function RoiMeterPanel({ active }: { active: boolean }) {
  return (
    <section className="panel band ink tight" data-active={active}>
      <div className="wrap" style={{ width: "100%" }}>
        <div className="fx d1">
          <RoiCalc />
        </div>
      </div>
    </section>
  );
}

/* ============ [11] CASI · CARTA · menu interattivo ============ */

const CASE_KEYS = ["marf", "salescraft", "marketing_army", "ai_champ"] as const;

export function CasesPanel({ active }: { active: boolean }) {
  const t = useTranslations("CaseStudy");
  const [activeCase, setActiveCase] = useState(0);

  const key = CASE_KEYS[activeCase];
  const tags = t.raw(`cases.${key}.tags`) as string[];

  return (
    <section className="panel band carta" data-active={active}>
      <div className="wrap cases-grid">
        {/* SINISTRA · metrica del caso selezionato */}
        <div className="fx d1">
          <div className="eye" style={{ marginBottom: 20 }}>
            {t("label")}
          </div>
          <div className="swap" key={key}>
            <div className="case-metric">
              {t(`cases.${key}.metric`)}
              <small>{t(`cases.${key}.metricLabel`)}</small>
            </div>
            <p className="case-desc">{t(`cases.${key}.description`)}</p>
            <div className="case-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* DESTRA · menu dei casi */}
        <div className="cases-menu fx d2">
          {CASE_KEYS.map((k, i) => (
            <button key={k} type="button" data-on={i === activeCase} onClick={() => setActiveCase(i)}>
              <span className="cn">C{i + 1}</span>
              <span className="name">{t(`cases.${k}.name`)}</span>
              <span className="dot" />
            </button>
          ))}
        </div>

        {/* Da telefono i casi stanno tutti in fila, aperti, e non si
            toccano: un menu che scambia il contenuto di un riquadro sopra
            funziona quando i due blocchi si vedono insieme, cioe' da
            desktop. Impilati, tocchi un nome e il testo cambia da
            un'altra parte, fuori dallo schermo. */}
        <ul className="cases-mobile">
          {CASE_KEYS.map((k, i) => {
            const caseTags = t.raw(`cases.${k}.tags`) as string[];
            return (
              <li key={k}>
                <div className="cn">C{i + 1}</div>
                <h3>{t(`cases.${k}.name`)}</h3>
                <div className="case-metric">
                  {t(`cases.${k}.metric`)}
                  <small>{t(`cases.${k}.metricLabel`)}</small>
                </div>
                <p className="case-desc">{t(`cases.${k}.description`)}</p>
                <div className="case-tags">
                  {caseTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
