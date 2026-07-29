"use client";

/**
 * RoiCalc · ROIometro della HOME 2026.
 * Stesso identico calcolo di SiteROIMeter (/roiometro), montaggio ripensato
 * per il full-screen: numero-verdetto eroe in alto, metriche mensili sotto,
 * i tre slider in fila orizzontale. Componente autonomo (il DS /roiometro
 * NON è toccato).
 */

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const BOOKING_URL =
  "https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website";

const DEFAULT_VALUES = { people: 10, cost: 3500, manualPct: 35 } as const;

type DepartmentKey = "operations" | "sales" | "finance" | "hr" | "marketing";

const DEPARTMENTS: { key: DepartmentKey; efficiency: number; upliftMin: number; upliftMax: number }[] = [
  { key: "operations", efficiency: 0.55, upliftMin: 800, upliftMax: 1200 },
  { key: "sales", efficiency: 0.6, upliftMin: 1500, upliftMax: 2500 },
  { key: "finance", efficiency: 0.45, upliftMin: 600, upliftMax: 1000 },
  { key: "hr", efficiency: 0.4, upliftMin: 500, upliftMax: 800 },
  { key: "marketing", efficiency: 0.65, upliftMin: 1200, upliftMax: 2000 },
];

const round100 = (v: number) => Math.round(v / 100) * 100;

function useAnimatedNumber(target: number, duration = 450): number {
  const [value, setValue] = useState(target);
  // React 19: useRef vuole un valore iniziale esplicito
  const frameRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(target);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(frameRef.current ?? 0);
    startRef.current = value;
    timeRef.current = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - timeRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startRef.current + (target - startRef.current) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="rc-slider">
      <div className="rc-slider-top">
        <span className="rc-slider-label">{label}</span>
        <span className="rc-slider-value">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rc-range"
        style={{ background: `linear-gradient(90deg, #533DFC ${fill}%, rgba(140, 165, 247,0.14) ${fill}%)` }}
      />
    </div>
  );
}

export function RoiCalc() {
  const t = useTranslations("Offerta.roi_meter");
  const locale = useLocale();
  const [department, setDepartment] = useState<DepartmentKey>("operations");
  const [people, setPeople] = useState<number>(DEFAULT_VALUES.people);
  const [cost, setCost] = useState<number>(DEFAULT_VALUES.cost);
  const [manualPct, setManualPct] = useState<number>(DEFAULT_VALUES.manualPct);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cfg = DEPARTMENTS.find((d) => d.key === department) ?? DEPARTMENTS[0];
  const manualRatio = manualPct / 100;
  const rawLoss = people * cost * manualRatio;
  const directSavings = rawLoss * cfg.efficiency;
  const freedFte = people * manualRatio * cfg.efficiency;
  const impactMin = directSavings + freedFte * cfg.upliftMin;
  const impactMax = directSavings + freedFte * cfg.upliftMax;

  const loss = useAnimatedNumber(round100(rawLoss));
  const impMin = useAnimatedNumber(round100(impactMin));
  const impMax = useAnimatedNumber(round100(impactMax));
  const annualMin = useAnimatedNumber(round100(impactMin) * 12);
  const annualMax = useAnimatedNumber(round100(impactMax) * 12);

  const eur = (v: number) => {
    const n = Math.max(0, Math.round(v));
    if (!mounted) return `${n} EUR`;
    return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);
  };

  const reset = () => {
    setPeople(DEFAULT_VALUES.people);
    setCost(DEFAULT_VALUES.cost);
    setManualPct(DEFAULT_VALUES.manualPct);
  };

  return (
    <div className="rc">
      {/* testata */}
      <div className="rc-head">
        <div className="eye">ROIometro</div>
        <h2 className="h-sect" style={{ margin: "10px 0 0", maxWidth: "20ch" }}>
          {t.rich("headline", {
            spanIndigo: (c) => <span className="emph">{c}</span>,
          })}
        </h2>
      </div>

      {/* selettore reparto */}
      <div className="rc-depts">
        {DEPARTMENTS.map((d) => (
          <button
            key={d.key}
            type="button"
            data-on={d.key === department}
            onClick={() => setDepartment(d.key)}
          >
            {t(`departments.${d.key}`)}
          </button>
        ))}
      </div>

      <div className="rc-body">
        {/* LETTURA · il verdetto */}
        <div className="rc-readout">
          <div className="rc-annual-label">{t("results.annual_label")}</div>
          <div className="rc-annual">
            {eur(annualMin)}
            <span className="dash">–</span>
            {eur(annualMax)}
          </div>
          <p className="rc-annual-desc">{t(`impact_descs.${department}`)}</p>

          <div className="rc-subs">
            <div className="rc-sub loss">
              <span className="lab">{t("results.loss_label")}</span>
              <span className="val">{eur(loss)}</span>
              <span className="desc">{t("results.loss_desc")}</span>
            </div>
            <div className="rc-sub gainv">
              <span className="lab">{t("results.impact_label")}</span>
              <span className="val">
                {eur(impMin)}
                <span className="dash">–</span>
                {eur(impMax)}
              </span>
              <span className="desc">{t("results.impact_desc")}</span>
            </div>
          </div>
        </div>

        {/* CONTROLLI · tre slider in fila + azioni */}
        <div className="rc-controls">
          <div className="rc-sliders">
            <Slider
              label={t("inputs.people")}
              value={people}
              min={1}
              max={100}
              step={1}
              onChange={setPeople}
              display={String(people)}
            />
            <Slider
              label={t("inputs.cost")}
              value={cost}
              min={2000}
              max={12000}
              step={100}
              onChange={setCost}
              display={eur(cost)}
            />
            <Slider
              label={t("inputs.manual")}
              value={manualPct}
              min={10}
              max={80}
              step={1}
              onChange={setManualPct}
              display={`${manualPct}%`}
            />
          </div>

          <div className="rc-actions">
            <div className="rc-cta-row">
              <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t("ctas.book")}
              </a>
              <button type="button" className="btn btn-2-carta" onClick={reset}>
                {t("ctas.reset")}
              </button>
            </div>
            <p className="rc-note">{t("results.conservative_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
