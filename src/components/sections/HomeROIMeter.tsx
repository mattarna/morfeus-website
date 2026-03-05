"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";

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
  const frameRef = useRef<number>();
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
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current ?? 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to target changes
  }, [target]);

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
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">{label}</p>
        <p className="text-sm md:text-base font-semibold text-white tabular-nums">{formatter(value)}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roiometer-slider"
        style={{
          background: `linear-gradient(90deg, #4D39EB ${fill}%, rgba(255,255,255,0.1) ${fill}%)`,
        }}
      />
      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-[0.12em]">
        <span>{formatter(min)}</span>
        <span>{formatter(max)}</span>
      </div>
    </div>
  );
}

export function HomeROIMeter() {
  const t = useTranslations("Offerta.roi_meter");
  const locale = useLocale();
  const [department, setDepartment] = useState<DepartmentKey>("operations");
  const [people, setPeople] = useState<number>(DEFAULT_VALUES.people);
  const [cost, setCost] = useState<number>(DEFAULT_VALUES.cost);
  const [manualPct, setManualPct] = useState<number>(DEFAULT_VALUES.manualPct);

  const departmentConfig = useMemo(
    () => DEPARTMENTS_CONFIG.find((d) => d.key === department) ?? DEPARTMENTS_CONFIG[0],
    [department]
  );

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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleReset = () => {
    setPeople(DEFAULT_VALUES.people);
    setCost(DEFAULT_VALUES.cost);
    setManualPct(DEFAULT_VALUES.manualPct);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-0 h-auto lg:h-screen w-full flex items-center justify-center px-6 xl:px-40 py-8 lg:py-4 overflow-hidden">
      <style jsx>{`
        .roiometer-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 999px;
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .roiometer-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #ffffff;
          border: 2px solid #4d39eb;
          box-shadow: 0 0 0 4px rgba(77, 57, 235, 0.2);
          cursor: pointer;
        }
        .roiometer-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #ffffff;
          border: 2px solid #4d39eb;
          box-shadow: 0 0 0 4px rgba(77, 57, 235, 0.2);
          cursor: pointer;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 items-stretch">
          
          {/* Inputs Section */}
          <div className="xl:col-span-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm flex flex-col h-full">
              <div className="mb-3">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1.5 uppercase leading-[1.1]">
                  {t.rich("headline", {
                    spanIndigo: (chunks) => <span className="text-indigo-400">{chunks}</span>
                  })}
                </h2>
                <p className="text-slate-400 font-light text-[13px]">
                  {t("subtitle")}
                </p>
              </div>

              {/* Department Tabs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {DEPARTMENTS_CONFIG.map((dep) => (
                  <button
                    key={dep.key}
                    onClick={() => setDepartment(dep.key)}
                    className={`px-2.5 py-1.5 rounded-full text-[9px] font-bold transition-all border uppercase tracking-wider ${
                      dep.key === department
                        ? "bg-[#4D39EB] border-[#7d6dff] text-white shadow-[0_0_10px_rgba(77,57,235,0.3)]"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {t(`departments.${dep.key}`)}
                  </button>
                ))}
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <MetricSlider
                  label={t("inputs.people")}
                  value={people}
                  min={1}
                  max={100}
                  step={1}
                  onChange={setPeople}
                  formatter={(v) => String(v)}
                />
                <MetricSlider
                  label={t("inputs.cost")}
                  value={cost}
                  min={2000}
                  max={12000}
                  step={100}
                  onChange={setCost}
                  formatter={(v) => formatCurrency(v)}
                />
                <MetricSlider
                  label={t("inputs.manual")}
                  value={manualPct}
                  min={10}
                  max={80}
                  step={1}
                  onChange={setManualPct}
                  formatter={(v) => `${v}%`}
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-7 rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#111118] to-[#07070d] p-5 md:p-6 backdrop-blur-sm shadow-[0_30px_90px_-30px_rgba(77,57,235,0.45)] flex flex-col justify-between">
            
            <div className="space-y-2.5">
              {/* Losing Per Month */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3.5 md:p-4">
                <p className="text-[8px] uppercase tracking-[0.25em] text-rose-400 font-bold mb-1">{t("results.loss_label")}</p>
                <p className="text-2xl md:text-3xl font-black tracking-tighter text-rose-100 tabular-nums">
                  {formatCurrency(Math.max(0, displayedLoss))}
                </p>
                <p className="mt-1 text-slate-400 text-[10px] font-light">{t("results.loss_desc")}</p>
              </div>

              {/* Impact Per Month */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-3.5 md:p-4">
                <p className="text-[8px] uppercase tracking-[0.25em] text-emerald-400 font-bold mb-1">{t("results.impact_label")}</p>
                <p className="text-2xl md:text-3xl font-black tracking-tighter text-emerald-100 tabular-nums">
                  {formatCurrency(Math.max(0, displayedImpactMin))} – {formatCurrency(Math.max(0, displayedImpactMax))}
                </p>
                <p className="mt-1 text-slate-400 text-[10px] font-light">{t("results.impact_desc")}</p>
              </div>

              {/* Annual Impact (MOST PROMINENT) */}
              <div className="rounded-[2rem] border-2 border-indigo-500/30 bg-indigo-500/[0.1] p-4 md:p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -z-10" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-indigo-400 font-bold mb-1.5">{t("results.annual_label")}</p>
                <p className="text-3xl md:text-5xl font-black tracking-tighter text-white tabular-nums drop-shadow-[0_0_20px_rgba(83,61,252,0.5)]">
                  {formatCurrency(Math.max(0, displayedAnnualMin))} – {formatCurrency(Math.max(0, displayedAnnualMax))}
                </p>
                <p className="mt-1.5 text-slate-300 text-[11px] font-medium uppercase tracking-wide">
                  {t(`impact_descs.${department}`)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2.5 items-center mb-3">
                <button
                  onClick={scrollToContact}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {t("ctas.book")}
                  <Icon icon="solar:arrow-right-linear" width={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/10 text-slate-400 text-[9px] font-bold uppercase tracking-widest hover:text-white hover:border-white/30 transition-all"
                >
                  {t("ctas.reset")}
                </button>
              </div>

              <div className="pt-2.5 border-t border-white/10">
                <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                  {t("results.conservative_tag")}
                </p>
                <p className="text-[8px] text-slate-500 leading-relaxed max-w-2xl">
                  {t("results.conservative_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
