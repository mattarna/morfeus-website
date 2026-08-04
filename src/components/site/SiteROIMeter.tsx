"use client";

import { useLocale, useTranslations } from "next-intl";
/* Una copia a mano dell'URL viveva qui: non sapeva la lingua, quindi
   anche dalle pagine inglesi mandava al calendario italiano. */
import { bookingUrl } from "@/components/site/booking";
import { useEffect, useRef, useState } from "react";

const DEFAULT_VALUES = {
  people: 10,
  cost: 3500,
  manualPct: 35,
} as const;

type DepartmentKey = "operations" | "sales" | "finance" | "hr" | "marketing";

type DepartmentConfig = {
  key: DepartmentKey;
  efficiency: number;
  upliftMin: number;
  upliftMax: number;
};

const DEPARTMENTS_CONFIG: DepartmentConfig[] = [
  { key: "operations", efficiency: 0.55, upliftMin: 800, upliftMax: 1200 },
  { key: "sales", efficiency: 0.6, upliftMin: 1500, upliftMax: 2500 },
  { key: "finance", efficiency: 0.45, upliftMin: 600, upliftMax: 1000 },
  { key: "hr", efficiency: 0.4, upliftMin: 500, upliftMax: 800 },
  { key: "marketing", efficiency: 0.65, upliftMin: 1200, upliftMax: 2000 },
];

function roundForDisplay(value: number): number {
  return Math.round(value / 100) * 100;
}

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
      const elapsed = now - timeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = startRef.current + (target - startRef.current) * eased;
      setValue(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current ?? 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

function MetricSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatter: (value: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-plex text-[10px] uppercase tracking-[0.16em] text-lilla">{label}</p>
        <p className="font-clash text-[16px] font-semibold text-carta">{formatter(value)}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="site-roi-slider"
        style={{
          background: `linear-gradient(90deg, #533DFC ${fill}%, rgba(140,165,247,0.12) ${fill}%)`,
        }}
      />
      <div className="flex items-center justify-between font-plex text-[10px] uppercase tracking-[0.1em] text-ombra">
        <span>{formatter(min)}</span>
        <span>{formatter(max)}</span>
      </div>
    </div>
  );
}

export function SiteROIMeter() {
  const t = useTranslations("Offerta.roi_meter");
  const locale = useLocale();
  const [department, setDepartment] = useState<DepartmentKey>("operations");
  const [people, setPeople] = useState<number>(DEFAULT_VALUES.people);
  const [cost, setCost] = useState<number>(DEFAULT_VALUES.cost);
  const [manualPct, setManualPct] = useState<number>(DEFAULT_VALUES.manualPct);
  const [mounted, setMounted] = useState(false);

  const departmentConfig = DEPARTMENTS_CONFIG.find((d) => d.key === department) ?? DEPARTMENTS_CONFIG[0];
  const manualRatio = manualPct / 100;
  const rawLoss = people * cost * manualRatio;
  const rawDirectSavings = rawLoss * departmentConfig.efficiency;
  const freedFte = people * manualRatio * departmentConfig.efficiency;
  const rawUpliftMin = freedFte * departmentConfig.upliftMin;
  const rawUpliftMax = freedFte * departmentConfig.upliftMax;
  const rawImpactMin = rawDirectSavings + rawUpliftMin;
  const rawImpactMax = rawDirectSavings + rawUpliftMax;

  const roundedLoss = roundForDisplay(rawLoss);
  const roundedImpactMin = roundForDisplay(rawImpactMin);
  const roundedImpactMax = roundForDisplay(rawImpactMax);
  const roundedAnnualMin = roundedImpactMin * 12;
  const roundedAnnualMax = roundedImpactMax * 12;

  const displayedLoss = useAnimatedNumber(roundedLoss);
  const displayedImpactMin = useAnimatedNumber(roundedImpactMin);
  const displayedImpactMax = useAnimatedNumber(roundedImpactMax);
  const displayedAnnualMin = useAnimatedNumber(roundedAnnualMin);
  const displayedAnnualMax = useAnimatedNumber(roundedAnnualMax);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: number) => {
    if (!mounted) {
      return `${value} EUR`;
    }

    return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const reset = () => {
    setPeople(DEFAULT_VALUES.people);
    setCost(DEFAULT_VALUES.cost);
    setManualPct(DEFAULT_VALUES.manualPct);
  };

  return (
    <div className="wrap">
      <style jsx>{`
        .site-roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          outline: none;
          border: 1px solid rgba(140, 165, 247, 0.16);
        }
        .site-roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #e4e7f0;
          border: 2px solid #533dfc;
          box-shadow: 0 0 0 4px rgba(83, 61, 252, 0.16);
          cursor: pointer;
        }
        .site-roi-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #e4e7f0;
          border: 2px solid #533dfc;
          box-shadow: 0 0 0 4px rgba(83, 61, 252, 0.16);
          cursor: pointer;
        }
      `}</style>

      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="card">
          <div className="ck">
            {t.rich("headline", {
              spanIndigo: (chunks) => <span style={{ color: "var(--lilla)" }}>{chunks}</span>,
            })}
          </div>
          <p className="mt-3 text-[15px] text-[#c2c6d4]">{t("subtitle")}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {DEPARTMENTS_CONFIG.map((dep) => (
              <button
                key={dep.key}
                type="button"
                onClick={() => setDepartment(dep.key)}
                className="rounded-[999px] border px-3 py-[7px] font-plex text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors"
                style={
                  dep.key === department
                    ? {
                        background: "rgba(83,61,252,0.18)",
                        borderColor: "rgba(140,165,247,0.4)",
                        color: "#e4e7f0",
                      }
                    : {
                        background: "transparent",
                        borderColor: "rgba(140,165,247,0.16)",
                        color: "#8ca5f7",
                      }
                }
              >
                {t(`departments.${dep.key}`)}
              </button>
            ))}
          </div>

          <div className="mt-7 space-y-5">
            <MetricSlider
              label={t("inputs.people")}
              value={people}
              min={1}
              max={100}
              step={1}
              onChange={setPeople}
              formatter={(value) => String(value)}
            />
            <MetricSlider
              label={t("inputs.cost")}
              value={cost}
              min={2000}
              max={12000}
              step={100}
              onChange={setCost}
              formatter={(value) => formatCurrency(value)}
            />
            <MetricSlider
              label={t("inputs.manual")}
              value={manualPct}
              min={10}
              max={80}
              step={1}
              onChange={setManualPct}
              formatter={(value) => `${value}%`}
            />
          </div>
        </div>

        <div className="card sel">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[12px] border border-[color:rgba(255,92,92,0.28)] bg-[rgba(255,92,92,0.06)] p-4">
              <div className="font-plex text-[10px] uppercase tracking-[0.16em] text-anomalia">
                {t("results.loss_label")}
              </div>
              <div className="mt-2 font-clash text-[clamp(28px,3.4vw,40px)] font-semibold leading-none text-carta">
                {formatCurrency(Math.max(0, displayedLoss))}
              </div>
              <p className="mt-2 text-[13px] text-[#c2c6d4]">{t("results.loss_desc")}</p>
            </div>

            <div className="rounded-[12px] border border-[color:rgba(30,158,90,0.28)] bg-[rgba(30,158,90,0.06)] p-4">
              <div className="font-plex text-[10px] uppercase tracking-[0.16em] text-ok">
                {t("results.impact_label")}
              </div>
              <div className="mt-2 font-clash text-[clamp(24px,3vw,34px)] font-semibold leading-none text-carta">
                {formatCurrency(Math.max(0, displayedImpactMin))}
                <span className="mx-2 text-lilla">-</span>
                {formatCurrency(Math.max(0, displayedImpactMax))}
              </div>
              <p className="mt-2 text-[13px] text-[#c2c6d4]">{t("results.impact_desc")}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[18px] border border-[color:rgba(140,165,247,0.22)] bg-[rgba(255,255,255,0.02)] p-5">
            <div className="font-plex text-[10px] uppercase tracking-[0.18em] text-lilla">
              {t("results.annual_label")}
            </div>
            <div className="mt-3 font-clash text-[clamp(34px,4.6vw,56px)] font-semibold leading-[0.95] text-carta">
              {formatCurrency(Math.max(0, displayedAnnualMin))}
              <span className="mx-2 text-lilla">-</span>
              {formatCurrency(Math.max(0, displayedAnnualMax))}
            </div>
            <p className="mt-3 max-w-[44ch] text-[14px] text-[#aeb2c2]">{t(`impact_descs.${department}`)}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn btn-1" href={bookingUrl(locale)} target="_blank" rel="noopener noreferrer">
              {t("ctas.book")}
            </a>
            <button type="button" onClick={reset} className="btn btn-2-carta">
              {t("ctas.reset")}
            </button>
          </div>

          <div className="mt-5 border-t border-[color:var(--riga-scuro)] pt-4">
            <div className="font-plex text-[10px] uppercase tracking-[0.18em] text-lilla">
              {t("results.conservative_tag")}
            </div>
            <p className="mt-2 max-w-[60ch] text-[12.5px] text-ombra">{t("results.conservative_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
