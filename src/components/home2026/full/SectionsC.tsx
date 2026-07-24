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

const ROI_STEP_KEYS = ["mapping", "architecture", "execution", "optimization", "scale"] as const;

export function RoiSystemPanel({ active }: { active: boolean }) {
  const t = useTranslations("ROI");
  const [activeStep, setActiveStep] = useState(0);

  const progress = (activeStep / (ROI_STEP_KEYS.length - 1)) * 84;
  const currentKey = ROI_STEP_KEYS[activeStep];

  return (
    <section className="panel band carta tight" data-active={active}>
      <div className="wrap rsys">
        <div className="eye fx d1">{t("label")}</div>
        <h2 className="h-sect fx d2" style={{ marginInline: "auto", maxWidth: "24ch" }}>
          {t("headline_1")} <span className="emph">{t("headline_2")}</span>
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
        <div className="fx d3">
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
      </div>
    </section>
  );
}
