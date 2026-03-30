"use client";

import { FormEvent, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
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
    nextLabel: string;
    backLabel: string;
    privacyNote: string;
    statusTitle: string;
    statusBody: string;
    statusFallback: string;
    steps: {
      step1: { overline: string; title: string };
      step2: { overline: string; title: string };
      step3: { overline: string; title: string };
      step4: { overline: string; title: string };
      step5: { overline: string; title: string };
    };
    fields: {
      email: string;
      revenue: string;
      employees: string;
      friction: string;
      problemDuration: string;
      triedSolving: string;
      blocker: string;
      decisionMaker: string;
      urgency: string;
      goal: string;
      goalPlaceholder: string;
    };
    options: {
      revenue: ReadonlyArray<SelectOption>;
      employees: ReadonlyArray<SelectOption>;
      friction: ReadonlyArray<SelectOption>;
      problemDuration: ReadonlyArray<SelectOption>;
      triedSolving: ReadonlyArray<SelectOption>;
      blocker: ReadonlyArray<SelectOption>;
      decisionMaker: ReadonlyArray<SelectOption>;
      urgency: ReadonlyArray<SelectOption>;
    };
    errors: {
      generic: string;
    };
  };
}

interface IntakePayload {
  email: string;
  annualRevenue: string;
  employees: string;
  frictionArea: string;
  problemDuration: string;
  triedSolving: string;
  blocker: string;
  decisionMaker: string;
  urgency: string;
  goal: string;
  source: string;
  callDate: string;
  callTime: string;
  locale: string;
}

const EMPTY_FIELD = "";

const StepHeader = ({ overline, title }: { overline: string; title: string }) => (
  <div className="col-span-full mb-2 mt-10 first:mt-0">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-vista/20 bg-vista/5 px-2.5 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-vista" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-vista/80">{overline}</span>
      </div>
      <h4 className="text-xl font-bold tracking-tight text-white">{title}</h4>
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: ReadonlyArray<SelectOption> }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</span>
    <div className="relative">
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 appearance-none rounded-2xl border border-white/10 bg-black/40 px-5 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all"
      >
        <option value="" disabled className="bg-slate-900">{label}</option>
        {options.map((option) => (
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
);

const InputField = ({ label, value, onChange, type = "text", placeholder }: { label: string, value: string, onChange: (val: string) => void, type?: string, placeholder?: string }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</span>
    <input
      type={type}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || label}
      className="w-full h-14 rounded-2xl border border-white/10 bg-black/40 px-5 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all placeholder:text-slate-600"
    />
  </div>
);

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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [payload, setPayload] = useState<IntakePayload>({
    email: EMPTY_FIELD,
    annualRevenue: EMPTY_FIELD,
    employees: EMPTY_FIELD,
    frictionArea: EMPTY_FIELD,
    problemDuration: EMPTY_FIELD,
    triedSolving: EMPTY_FIELD,
    blocker: EMPTY_FIELD,
    decisionMaker: EMPTY_FIELD,
    urgency: EMPTY_FIELD,
    goal: EMPTY_FIELD,
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

  const handleNext = () => {
    // Validate current step before advancing
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = Boolean(payload.email && payload.annualRevenue && payload.employees);
      // Basic email validation
      if (isValid && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        isValid = false;
      }
    } else if (currentStep === 2) {
      isValid = Boolean(payload.frictionArea && payload.problemDuration);
    } else if (currentStep === 3) {
      isValid = Boolean(payload.triedSolving && payload.blocker);
    } else if (currentStep === 4) {
      isValid = Boolean(payload.decisionMaker && payload.urgency);
    }
    
    if (isValid) {
      setErrorMessage("");
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      setErrorMessage(locale === "it" ? "Compila tutti i campi richiesti per continuare." : "Please fill in all required fields to continue.");
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

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
    if (currentStep < totalSteps) {
      handleNext();
      return;
    }
    
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
    <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm shadow-2xl relative overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-forge/20 bg-forge/5 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-forge" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-forge">{text.preLabel}</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Step {currentStep} / {totalSteps}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
        <div 
          className="h-full bg-forge transition-all duration-500 ease-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
        />
      </div>

      <h3 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl mb-4">{text.title}</h3>
      <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-400 mb-10">{text.subtitle}</p>

      <form className="relative min-h-[300px]" onSubmit={onSubmit} onFocus={onStart}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StepHeader overline={text.steps.step1.overline} title={text.steps.step1.title} />
              
              <div className="md:col-span-2">
                <InputField 
                  label={text.fields.email} 
                  value={payload.email} 
                  onChange={(val) => setPayload(p => ({ ...p, email: val }))} 
                  type="email"
                />
              </div>
              
              <SelectField 
                label={text.fields.revenue} 
                value={payload.annualRevenue} 
                onChange={(val) => setPayload(p => ({ ...p, annualRevenue: val }))} 
                options={text.options.revenue} 
              />
              
              <SelectField 
                label={text.fields.employees} 
                value={payload.employees} 
                onChange={(val) => setPayload(p => ({ ...p, employees: val }))} 
                options={text.options.employees} 
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StepHeader overline={text.steps.step2.overline} title={text.steps.step2.title} />

              <div className="md:col-span-2">
                <SelectField 
                  label={text.fields.friction} 
                  value={payload.frictionArea} 
                  onChange={(val) => setPayload(p => ({ ...p, frictionArea: val }))} 
                  options={text.options.friction} 
                />
              </div>

              <div className="md:col-span-2">
                <SelectField 
                  label={text.fields.problemDuration} 
                  value={payload.problemDuration} 
                  onChange={(val) => setPayload(p => ({ ...p, problemDuration: val }))} 
                  options={text.options.problemDuration} 
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StepHeader overline={text.steps.step3.overline} title={text.steps.step3.title} />

              <div className="md:col-span-2">
                <SelectField 
                  label={text.fields.triedSolving} 
                  value={payload.triedSolving} 
                  onChange={(val) => setPayload(p => ({ ...p, triedSolving: val }))} 
                  options={text.options.triedSolving} 
                />
              </div>

              <div className="md:col-span-2">
                <SelectField 
                  label={text.fields.blocker} 
                  value={payload.blocker} 
                  onChange={(val) => setPayload(p => ({ ...p, blocker: val }))} 
                  options={text.options.blocker} 
                />
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StepHeader overline={text.steps.step4.overline} title={text.steps.step4.title} />

              <SelectField 
                label={text.fields.decisionMaker} 
                value={payload.decisionMaker} 
                onChange={(val) => setPayload(p => ({ ...p, decisionMaker: val }))} 
                options={text.options.decisionMaker} 
              />

              <SelectField 
                label={text.fields.urgency} 
                value={payload.urgency} 
                onChange={(val) => setPayload(p => ({ ...p, urgency: val }))} 
                options={text.options.urgency} 
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <StepHeader overline={text.steps.step5.overline} title={text.steps.step5.title} />

              <div className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">{text.fields.goal}</span>
                <textarea
                  rows={4}
                  value={payload.goal}
                  onChange={(event) => setPayload((prev) => ({ ...prev, goal: event.target.value }))}
                  placeholder={text.fields.goalPlaceholder}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white focus:border-majorelle/50 focus:outline-none focus:ring-4 focus:ring-majorelle/5 transition-all placeholder:text-slate-600 resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col gap-4">
          {errorMessage ? <p className="text-xs font-bold text-red-400 uppercase tracking-widest">{errorMessage}</p> : null}
          
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="group relative px-6 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <Icon icon="solar:arrow-left-linear" className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  {text.backLabel}
                </span>
              </button>
            )}
            
            <button
              type={currentStep === totalSteps ? "submit" : "button"}
              onClick={currentStep < totalSteps ? handleNext : undefined}
              disabled={isSubmitting}
              className="on-page-cta group relative flex-1 sm:flex-none px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-800" />
              <div className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                {currentStep === totalSteps 
                  ? (isSubmitting ? text.submittingLabel : text.submitLabel)
                  : text.nextLabel}
                {!isSubmitting && currentStep === totalSteps && <Icon icon="solar:check-circle-bold" className="w-4 h-4" />}
                {currentStep < totalSteps && <Icon icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
            <Icon icon="solar:shield-check-bold" className="h-4 w-4 text-emerald-500/60" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{text.privacyNote}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
