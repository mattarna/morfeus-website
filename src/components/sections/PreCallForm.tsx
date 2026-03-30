"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { trackPrecallEvent } from "@/lib/tracking/precall";

type SelectOption = { label: string; value: string };

interface PreCallFormProps {
  locale: string;
  endpoint: string;
  source: string;
  callDate: string;
  callTime: string;
  initialComplete: boolean;
  text: {
    preLabel: string;
    title: string;
    subtitle: string;
    submitLabel: string;
    submittingLabel: string;
    privacyNote: string;
    statusTitle: string;
    statusBody: string;
    statusFallback: string;
    fields: {
      revenue: string;
      friction: string;
      repeatingProblem: string;
      repeatingProblemPlaceholder: string;
    };
    options: {
      revenue: ReadonlyArray<SelectOption>;
      friction: ReadonlyArray<SelectOption>;
    };
    errors: {
      generic: string;
    };
  };
}

interface IntakePayload {
  annualRevenue: string;
  frictionArea: string;
  repeatedProblem: string;
  source: string;
  callDate: string;
  callTime: string;
  locale: string;
}

const EMPTY_FIELD = "";

export function PreCallForm({
  locale,
  endpoint,
  source,
  callDate,
  callTime,
  initialComplete,
  text
}: PreCallFormProps) {
  const [isComplete, setIsComplete] = useState(initialComplete);
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [payload, setPayload] = useState<IntakePayload>({
    annualRevenue: EMPTY_FIELD,
    frictionArea: EMPTY_FIELD,
    repeatedProblem: EMPTY_FIELD,
    source,
    callDate,
    callTime,
    locale
  });

  const slotText = useMemo(() => {
    if (callDate && callTime) {
      return `${callDate} · ${callTime}`;
    }
    return text.statusFallback;
  }, [callDate, callTime, text.statusFallback]);

  const onStart = () => {
    if (!formTouched) {
      setFormTouched(true);
      trackPrecallEvent("precall_form_start", {
        locale,
        source: source || "unknown"
      });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || text.errors.generic);
      }

      trackPrecallEvent("precall_form_submit_success", {
        locale,
        source: source || "unknown"
      });
      setIsComplete(true);
    } catch {
      setErrorMessage(text.errors.generic);
      trackPrecallEvent("precall_form_submit_error", {
        locale,
        source: source || "unknown"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 md:p-16 backdrop-blur-sm text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <Icon icon="solar:check-circle-bold" className="h-10 w-10" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">{text.statusTitle}</h3>
        <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-slate-400">{text.statusBody}</p>
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-vista/80">
          <Icon icon="solar:calendar-bold" className="h-4 w-4" />
          {slotText}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm shadow-2xl">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-forge/20 bg-forge/5 px-3 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-forge" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-forge">{text.preLabel}</span>
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl mb-4">{text.title}</h3>
      <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-400 mb-10">{text.subtitle}</p>

      <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={onSubmit} onFocus={onStart}>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{text.fields.revenue}</span>
          <div className="relative">
            <select
              required
              value={payload.annualRevenue}
              onChange={(event) => setPayload((prev) => ({ ...prev, annualRevenue: event.target.value }))}
              className="w-full h-14 appearance-none rounded-2xl border border-white/10 bg-black/40 px-5 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all"
            >
              <option value="" disabled className="bg-slate-900">{text.fields.revenue}</option>
              {text.options.revenue.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{text.fields.friction}</span>
          <div className="relative">
            <select
              required
              value={payload.frictionArea}
              onChange={(event) => setPayload((prev) => ({ ...prev, frictionArea: event.target.value }))}
              className="w-full h-14 appearance-none rounded-2xl border border-white/10 bg-black/40 px-5 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all"
            >
              <option value="" disabled className="bg-slate-900">{text.fields.friction}</option>
              {text.options.friction.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{text.fields.repeatingProblem}</span>
          <textarea
            rows={4}
            value={payload.repeatedProblem}
            onChange={(event) => setPayload((prev) => ({ ...prev, repeatedProblem: event.target.value }))}
            placeholder={text.fields.repeatingProblemPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all placeholder:text-slate-600 resize-none"
          />
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="on-page-cta group relative w-full sm:w-auto px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
            <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-3 text-white">
              {isSubmitting ? text.submittingLabel : text.submitLabel}
              {!isSubmitting && <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </span>
          </button>
          <div className="mt-6 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="h-4 w-4 text-emerald-500/60" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{text.privacyNote}</p>
          </div>
          {errorMessage ? <p className="mt-4 text-xs font-bold text-red-400 uppercase tracking-widest">{errorMessage}</p> : null}
        </div>
      </form>
    </div>
  );
}
