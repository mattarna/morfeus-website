"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { useScrollStore } from "@/app/store/useScrollStore";

const DEFAULT_VALUES = {
  people: 10,
  cost: 3200,
  manualPct: 35,
} as const;

type DepartmentKey = "operations" | "sales" | "finance" | "hr" | "marketing";

type DepartmentConfig = {
  key: DepartmentKey;
  efficiency: number;
  upliftMin: number;
  upliftMax: number;
};

const DEPARTMENTS: DepartmentConfig[] = [
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
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
}

function MetricSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onCommit,
  formatter,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  onCommit: () => void;
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
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
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
  const t = useTranslations("ROIometer");
  const locale = useLocale();
  const currentIndex = useScrollStore((s) => s.currentIndex);
  const setIndex = useScrollStore((s) => s.setIndex);
  const [isDesktop, setIsDesktop] = useState(false);
  const [department, setDepartment] = useState<DepartmentKey>("operations");
  const [people, setPeople] = useState<number>(DEFAULT_VALUES.people);
  const [cost, setCost] = useState<number>(DEFAULT_VALUES.cost);
  const [manualPct, setManualPct] = useState<number>(DEFAULT_VALUES.manualPct);
  const [mounted, setMounted] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      if (window.innerWidth < 1024) return true;
      if (window.matchMedia('(pointer: coarse)').matches && 
          window.matchMedia('(hover: none)').matches) {
        return true;
      }
      return false;
    };
    
    const updateViewport = () => setIsDesktop(!checkIsMobile());
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const handleCtaClick = (index: number) => {
    if (isDesktop) {
      setIndex(index);
    } else {
      const element = document.getElementById(`section-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = !isDesktop || currentIndex === 10;

  const departmentConfig = useMemo(
    () => DEPARTMENTS.find((d) => d.key === department) ?? DEPARTMENTS[0],
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

  // Strict consistency mode: annual derives from displayed monthly values.
  const roundedAnnualMin = roundedImpactMin * 12;
  const roundedAnnualMax = roundedImpactMax * 12;

  const displayedLoss = useAnimatedNumber(roundedLoss);
  const displayedImpactMin = useAnimatedNumber(roundedImpactMin);
  const displayedImpactMax = useAnimatedNumber(roundedImpactMax);
  const displayedAnnualMin = useAnimatedNumber(roundedAnnualMin);
  const displayedAnnualMax = useAnimatedNumber(roundedAnnualMax);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const formatCurrency = (val: number) => {
    if (!mounted) return `${val} €`;
    return currencyFormatter.format(val);
  };

  const track = (event: string, payload: Record<string, string | number>) => {
    if (typeof window === "undefined" || !window.dataLayer) return;
    window.dataLayer.push({ event, ...payload });
  };

  useEffect(() => {
    if (isActive && !viewedRef.current) {
      viewedRef.current = true;
      track("roiometer_result_view", { department });
    }
  }, [isActive, department]);

  const handleDepartmentChange = (key: DepartmentKey) => {
    setDepartment(key);
    track("roiometer_interaction", { field: "department", value: key });
  };

  const handleReset = () => {
    setPeople(DEFAULT_VALUES.people);
    setCost(DEFAULT_VALUES.cost);
    setManualPct(DEFAULT_VALUES.manualPct);
    track("roiometer_interaction", { field: "reset", value: "defaults" });
  };

  return (
    <section className="relative z-0 min-h-screen lg:h-screen w-full bg-black flex items-center justify-center px-6 lg:pl-40 lg:pr-16 py-10 lg:py-2 overflow-hidden">
      <style jsx>{`
        .roiometer-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: box-shadow 0.2s ease;
        }
        .roiometer-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #ffffff;
          border: 2px solid #4d39eb;
          box-shadow: 0 0 0 4px rgba(77, 57, 235, 0.25);
          cursor: pointer;
        }
        .roiometer-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #ffffff;
          border: 2px solid #4d39eb;
          box-shadow: 0 0 0 4px rgba(77, 57, 235, 0.25);
          cursor: pointer;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_100%,rgba(77,57,235,0.18)_0%,transparent_70%)]" />
      </div>

      <div
        className={`relative z-10 w-full max-w-[1200px] transition-all duration-1000 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div className="xl:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm flex flex-col h-full">
              <div className="text-left mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white leading-[1.1] uppercase">
                  {t("headline")}
                </h2>
                <p className="mt-3 text-[13px] md:text-sm text-slate-400 leading-relaxed">
                  {t("subheadline")}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-8">
                {DEPARTMENTS.map((dep) => (
                  <button
                    key={dep.key}
                    onClick={() => handleDepartmentChange(dep.key)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold transition-all border uppercase tracking-wider ${
                      dep.key === department
                        ? "bg-[#4D39EB] border-[#7d6dff] text-white shadow-[0_0_15px_rgba(77,57,235,0.3)]"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {t(`departments.${dep.key}.label`)}
                  </button>
                ))}
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <MetricSlider
                  label={t("inputs.people")}
                  value={people}
                  min={1}
                  max={50}
                  step={1}
                  onChange={setPeople}
                  onCommit={() => track("roiometer_interaction", { field: "people", value: people, department })}
                  formatter={(v) => String(v)}
                />
                <MetricSlider
                  label={t("inputs.cost")}
                  value={cost}
                  min={2000}
                  max={10000}
                  step={100}
                  onChange={setCost}
                  onCommit={() => track("roiometer_interaction", { field: "cost", value: cost, department })}
                  formatter={(v) => formatCurrency(v)}
                />
                <MetricSlider
                  label={t("inputs.manualPct")}
                  value={manualPct}
                  min={10}
                  max={60}
                  step={1}
                  onChange={setManualPct}
                  onCommit={() => track("roiometer_interaction", { field: "manualPct", value: manualPct, department })}
                  formatter={(v) => `${v}%`}
                />
              </div>
            </div>
          </div>

          <div className="xl:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#111118] to-[#07070d] p-6 md:p-8 backdrop-blur-sm shadow-[0_30px_90px_-30_rgba(77,57,235,0.45)] flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.07] p-4 md:p-5 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-rose-200/80 font-semibold mb-2.5">{t("results.losingLabel")}</p>
                <p className="text-3xl md:text-4xl font-black tracking-tighter text-rose-100 tabular-nums">
                  {formatCurrency(Math.max(0, displayedLoss))}
                </p>
                </div>
                <p className="mt-2.5 text-xs md:text-sm text-slate-300 leading-relaxed">{t("results.losingSub")}</p>
              </div>

              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.09] p-4 md:p-5 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/90 font-semibold mb-2.5">{t("results.impactLabel")}</p>
                  <p className="text-3xl md:text-4xl font-black tracking-tighter text-emerald-100 tabular-nums">
                    {formatCurrency(Math.max(0, displayedImpactMin))} - {formatCurrency(Math.max(0, displayedImpactMax))}
                  </p>
                </div>
                <p className="mt-2.5 text-xs md:text-sm text-slate-300 leading-relaxed">{t("results.impactSub")}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-sky-300/25 bg-sky-500/[0.08] p-4 md:p-5 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-sky-200/90 font-semibold mb-2">{t("results.annualLabel")}</p>
              <p className="text-3xl md:text-4xl font-black tracking-tighter text-sky-100 tabular-nums">
                {formatCurrency(Math.max(0, displayedAnnualMin))} - {formatCurrency(Math.max(0, displayedAnnualMax))}
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center py-4">
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">{t(`departments.${department}.impact`)}</p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  onClick={() => {
                    track("roiometer_cta_click", { cta: "book_diagnosis", department });
                    handleCtaClick(13);
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm md:text-base font-bold hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {t("ctaPrimary")}
                  <Icon icon="solar:arrow-right-up-linear" width={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/15 text-slate-300 text-sm md:text-base font-semibold hover:text-white hover:border-white/25 transition-all"
                >
                  {t("ctaSecondary")}
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#a89dff] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4D39EB] animate-pulse" />
                  {t("trustPill")}
                </p>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{t("disclaimer")}</p>
                <p className="text-xs text-slate-500">{t("benchmark")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
