"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface FormData {
  // Step 1
  fullName: string;
  email: string;
  phonePrefix: string;
  phoneCountry: string;
  phone: string;
  company: string;
  role: string;
  // Step 2
  services: string[];
  aiMaturity: string;
  teamSize: string;
  // Step 3
  challenge: string;
  timeline: string;
  budget: string;
  notes: string;
}

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phonePrefix: "+39",
  phoneCountry: "IT",
  phone: "",
  company: "",
  role: "",
  services: [],
  aiMaturity: "",
  teamSize: "",
  challenge: "",
  timeline: "",
  budget: "",
  notes: "",
};

const COUNTRY_CODES = [
  { code: "+54", country: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "+43", country: "AT", flag: "🇦🇹", name: "Austria" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgium" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "+56", country: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+57", country: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "+420", country: "CZ", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+358", country: "FI", flag: "🇫🇮", name: "Finland" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+30", country: "GR", flag: "🇬🇷", name: "Greece" },
  { code: "+385", country: "HR", flag: "🇭🇷", name: "Croatia" },
  { code: "+36", country: "HU", flag: "🇭🇺", name: "Hungary" },
  { code: "+353", country: "IE", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", country: "IL", flag: "🇮🇱", name: "Israel" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "+351", country: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "+40", country: "RO", flag: "🇷🇴", name: "Romania" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+386", country: "SI", flag: "🇸🇮", name: "Slovenia" },
  { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "+380", country: "UA", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
].sort((a, b) => a.name.localeCompare(b.name));

const ROLES = [
  { en: "CEO / Founder", it: "CEO / Founder" },
  { en: "CTO / IT Director", it: "CTO / IT Director" },
  { en: "COO / Operations", it: "COO / Operations" },
  { en: "HR / People Director", it: "HR / People Director" },
  { en: "Marketing / Sales Director", it: "Marketing / Sales Director" },
  { en: "Manager", it: "Manager" },
  { en: "Other", it: "Altro" },
];

const SERVICES = [
  { id: "lab", en: "Morf Lab – AI Workshops & Training", it: "Morf Lab – Workshop e formazione AI" },
  { id: "path", en: "Morf Path – AI Adoption & Governance", it: "Morf Path – AI Adoption & Governance" },
  { id: "forge", en: "Morf Forge – Rapid Development & MVP", it: "Morf Forge – Sviluppo rapido & MVP" },
  { id: "unsure", en: "Not sure, I need guidance", it: "Non sono sicuro, ho bisogno di orientamento" },
];

const AI_MATURITY = [
  { en: "We haven't started with AI yet", it: "Non abbiamo ancora iniziato con l'AI" },
  { en: "We're experimenting with AI tools", it: "Stiamo sperimentando con tool AI" },
  { en: "We have some AI pilots running", it: "Abbiamo alcuni pilot AI in corso" },
  { en: "We have AI in production but want to scale", it: "Abbiamo AI in produzione ma vogliamo scalare" },
];

const TEAM_SIZE = [
  { en: "1-10 people", it: "1-10 persone" },
  { en: "11-50 people", it: "11-50 persone" },
  { en: "51-200 people", it: "51-200 persone" },
  { en: "200+ people", it: "200+ persone" },
];

const TIMELINE = [
  { en: "Urgent / ASAP", it: "Urgente / ASAP" },
  { en: "Within 1-3 months", it: "Entro 1-3 mesi" },
  { en: "3-6 months", it: "3-6 mesi" },
  { en: "6+ months / Just exploring", it: "6+ mesi / Sto solo esplorando" },
];

const BUDGET = [
  { en: "Under €10K", it: "Meno di €10K" },
  { en: "€10K - €30K", it: "€10K - €30K" },
  { en: "€30K - €100K", it: "€30K - €100K" },
  { en: "€100K+", it: "€100K+" },
  { en: "Not defined yet", it: "Non ancora definito" },
  { en: "Prefer not to say", it: "Preferisco non rispondere" },
];

const TRANSLATIONS = {
  en: {
    step1Title: "About You",
    step2Title: "Your Interest",
    step3Title: "Your Project",
    fullName: "Full Name",
    email: "Business Email",
    phone: "Phone Number",
    phonePlaceholder: "Phone number",
    company: "Company Name",
    role: "Your Role",
    selectRole: "Select your role...",
    services: "Services of Interest",
    servicesHint: "Select all that apply",
    aiMaturity: "Current AI Maturity",
    teamSize: "Team Size Involved",
    challenge: "Main Challenge",
    challengePlaceholder: "Briefly describe the challenge or goal you'd like to address with AI...",
    timeline: "Expected Timeline",
    budget: "Indicative Budget",
    budgetOptional: "(Optional)",
    notes: "Additional Notes",
    notesPlaceholder: "Anything else you'd like us to know?",
    back: "Back",
    continue: "Continue",
    submit: "Submit Request",
    sending: "Sending...",
    successTitle: "Request Sent!",
    successMessage: "Thank you for your interest. We'll get back to you within 24 hours.",
    close: "Close",
    step: "Step",
    of: "of",
  },
  it: {
    step1Title: "Chi Sei",
    step2Title: "Il Tuo Interesse",
    step3Title: "Il Tuo Progetto",
    fullName: "Nome Completo",
    email: "Email Aziendale",
    phone: "Numero di Telefono",
    phonePlaceholder: "Numero di telefono",
    company: "Nome Azienda",
    role: "Il Tuo Ruolo",
    selectRole: "Seleziona il tuo ruolo...",
    services: "Servizi di Interesse",
    servicesHint: "Seleziona tutti quelli che si applicano",
    aiMaturity: "Maturità AI Attuale",
    teamSize: "Dimensione Team Coinvolto",
    challenge: "Sfida Principale",
    challengePlaceholder: "Descrivi brevemente la sfida o l'obiettivo che vorresti affrontare con l'AI...",
    timeline: "Timeline Prevista",
    budget: "Budget Indicativo",
    budgetOptional: "(Opzionale)",
    notes: "Note Aggiuntive",
    notesPlaceholder: "C'è qualcos'altro che vorresti farci sapere?",
    back: "Indietro",
    continue: "Continua",
    submit: "Invia Richiesta",
    sending: "Invio in corso...",
    successTitle: "Richiesta Inviata!",
    successMessage: "Grazie per il tuo interesse. Ti ricontatteremo entro 24 ore.",
    close: "Chiudi",
    step: "Step",
    of: "di",
  },
};

export function ContactForm({ isOpen, onClose, locale }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM_DATA,
    phonePrefix: locale === 'it' ? '+39' : '+1',
    phoneCountry: locale === 'it' ? 'IT' : 'US',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  const lang = (locale === "it" ? "it" : "en") as "en" | "it";

  // Reset scroll on step change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(1);
        setFormData({
          ...INITIAL_FORM_DATA,
          phonePrefix: locale === 'it' ? '+39' : '+1',
          phoneCountry: locale === 'it' ? 'IT' : 'US',
        });
        setIsSuccess(false);
        setErrors({});
      }, 500);
    }
  }, [isOpen, locale]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleService = (serviceId: string) => {
    const current = formData.services;
    if (current.includes(serviceId)) {
      updateField("services", current.filter((s) => s !== serviceId));
    } else {
      updateField("services", [...current, serviceId]);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Required";
      if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Required";
      if (!formData.phone.trim()) newErrors.phone = "Required";
      if (!formData.company.trim()) newErrors.company = "Required";
      if (!formData.role) newErrors.role = "Required";
    } else if (step === 2) {
      if (formData.services.length === 0) newErrors.services = ["Required"];
      if (!formData.aiMaturity) newErrors.aiMaturity = "Required";
      if (!formData.teamSize) newErrors.teamSize = "Required";
    } else if (step === 3) {
      if (!formData.challenge.trim() || formData.challenge.length < 20) newErrors.challenge = "Required";
      if (!formData.timeline) newErrors.timeline = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 4000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Fallback: open email client
      const subject = encodeURIComponent(`New Request from ${formData.fullName} - ${formData.company}`);
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${formData.company}\nRole: ${formData.role}\n\nServices: ${formData.services.join(", ")}\nAI Maturity: ${formData.aiMaturity}\nTeam Size: ${formData.teamSize}\n\nChallenge: ${formData.challenge}\nTimeline: ${formData.timeline}\nBudget: ${formData.budget || "Not specified"}\n\nNotes: ${formData.notes || "None"}`
      );
      window.open(`mailto:hello@morfeushub.com,simone@morfeushub.com?subject=${subject}&body=${body}`, "_blank");
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[550px] lg:w-[600px] xl:w-[650px] z-[999] bg-[#0a0a12] border-l border-white/20 shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Inner gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 100% at 100% 0%, rgba(77, 57, 235, 0.08) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(77, 57, 235, 0.05) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-white/5">
            {/* Close Button - SVG for 100% visibility */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all flex items-center justify-center z-50 group"
              aria-label="Close"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform group-hover:rotate-90 duration-300"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Form Title */}
            <h2 className="text-2xl font-semibold text-white mb-1 pr-12">
              {locale === "it" ? "Invia una Richiesta" : "Send a Request"}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              {locale === "it" ? "Compila il form e ti ricontatteremo entro 24h" : "Fill out the form and we'll get back to you within 24h"}
            </p>

            {/* Progress Bar - Unified Style */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                  {t.step} {currentStep} {t.of} 3
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#4D39EB] font-semibold">
                  {currentStep === 1 ? t.step1Title : currentStep === 2 ? t.step2Title : t.step3Title}
                </span>
              </div>
              
              {/* Discrete Step Indicators */}
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10"
                  >
                    <div
                      className={`h-full bg-gradient-to-r from-[#4D39EB] to-[#8B7CF7] transition-all duration-700 ease-out ${
                        step < currentStep 
                          ? "w-full" 
                          : step === currentStep 
                            ? "w-full" 
                            : "w-0"
                      }`}
                      style={{ 
                        opacity: step <= currentStep ? 1 : 0,
                        boxShadow: step === currentStep ? "0 0 15px rgba(77, 57, 235, 0.4)" : "none"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content - Scrollable */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide md:scrollbar-default"
          >
            {isSuccess ? (
              <SuccessMessage t={t} />
            ) : (
              <>
                {currentStep === 1 && (
                  <Step1
                    formData={formData}
                    updateField={updateField}
                    errors={errors}
                    t={t}
                    lang={lang}
                  />
                )}
                {currentStep === 2 && (
                  <Step2
                    formData={formData}
                    updateField={updateField}
                    toggleService={toggleService}
                    t={t}
                    lang={lang}
                  />
                )}
                {currentStep === 3 && (
                  <Step3
                    formData={formData}
                    updateField={updateField}
                    errors={errors}
                    t={t}
                    lang={lang}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer - Actions */}
          {!isSuccess && (
            <div className="flex-shrink-0 px-8 py-6 border-t border-white/5 bg-[#0a0a12]/80 backdrop-blur-sm">
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex-1 h-12 rounded-full border border-white/10 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Icon icon="solar:arrow-left-linear" width={18} />
                    {t.back}
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 h-12 rounded-full bg-[#4D39EB] hover:bg-[#5d4af7] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(77,57,235,0.5)]"
                  >
                    {t.continue}
                    <Icon icon="solar:arrow-right-linear" width={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon icon="svg-spinners:ring-resize" width={18} />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.submit}
                        <Icon icon="solar:check-circle-linear" width={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================
// STEP COMPONENTS
// ============================================

function Step1({
  formData,
  updateField,
  errors,
  t,
  lang,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  errors: Partial<FormData>;
  t: typeof TRANSLATIONS.en;
  lang: "en" | "it";
}) {
  return (
    <div className="space-y-6 opacity-100">
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.fullName} *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
            errors.fullName ? "border-red-500/50" : "border-white/10"
          } text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all`}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.email} *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
            errors.email ? "border-red-500/50" : "border-white/10"
          } text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all`}
          placeholder="john@company.com"
        />
      </div>

      {/* Phone with Country Code */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.phone} *
        </label>
        <div className="flex gap-2">
          <div className="relative w-[130px] flex-shrink-0">
            <select
              value={`${formData.phonePrefix}|${formData.phoneCountry}`}
              onChange={(e) => {
                const [prefix, country] = e.target.value.split('|');
                updateField("phonePrefix", prefix);
                updateField("phoneCountry", country);
              }}
              className="w-full h-12 px-3 pl-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer text-sm"
            >
              {COUNTRY_CODES.map((cc) => (
                <option key={`${cc.code}-${cc.country}`} value={`${cc.code}|${cc.country}`} className="bg-[#0a0a12]">
                  {cc.flag} {cc.name} ({cc.code})
                </option>
              ))}
            </select>
            {/* Flag Icon */}
            <img 
              src={`https://flagcdn.com/w20/${formData.phoneCountry.toLowerCase()}.png`}
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-auto rounded-sm pointer-events-none"
            />
            <Icon
              icon="solar:alt-arrow-down-linear"
              width={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value.replace(/[^0-9]/g, ''))}
            className={`flex-1 h-12 px-4 rounded-xl bg-white/5 border ${
              errors.phone ? "border-red-500/50" : "border-white/10"
            } text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all`}
            placeholder={t.phonePlaceholder}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.company} *
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => updateField("company", e.target.value)}
          className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
            errors.company ? "border-red-500/50" : "border-white/10"
          } text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all`}
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.role} *
        </label>
        <div className="relative">
          <select
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={`w-full h-12 px-4 rounded-xl bg-white/5 border ${
              errors.role ? "border-red-500/50" : "border-white/10"
            } text-white focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer`}
          >
            <option value="" className="bg-[#0a0a12]">
              {t.selectRole}
            </option>
            {ROLES.map((role) => (
              <option key={role.en} value={role.en} className="bg-[#0a0a12]">
                {role[lang]}
              </option>
            ))}
          </select>
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  formData,
  updateField,
  toggleService,
  t,
  lang,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  toggleService: (serviceId: string) => void;
  t: typeof TRANSLATIONS.en;
  lang: "en" | "it";
}) {
  return (
    <div className="space-y-8 opacity-100">
      {/* Services - Multi Select */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.services} *
        </label>
        <p className="text-[11px] text-slate-500 mb-3">{t.servicesHint}</p>
        <div className="space-y-2">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                formData.services.includes(service.id)
                  ? "bg-[#4D39EB]/15 border-[#4D39EB]/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    formData.services.includes(service.id)
                      ? "bg-[#4D39EB] border-[#4D39EB]"
                      : "border-white/20"
                  }`}
                >
                  {formData.services.includes(service.id) && (
                    <Icon icon="solar:check-linear" width={14} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{service[lang]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Maturity - Single Select */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-3">
          {t.aiMaturity} *
        </label>
        <div className="space-y-2">
          {AI_MATURITY.map((option) => (
            <button
              key={option.en}
              onClick={() => updateField("aiMaturity", option.en)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                formData.aiMaturity === option.en
                  ? "bg-[#4D39EB]/15 border-[#4D39EB]/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.aiMaturity === option.en
                      ? "bg-[#4D39EB] border-[#4D39EB]"
                      : "border-white/20"
                  }`}
                >
                  {formData.aiMaturity === option.en && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{option[lang]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Team Size - Single Select */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-3">
          {t.teamSize} *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TEAM_SIZE.map((option) => (
            <button
              key={option.en}
              onClick={() => updateField("teamSize", option.en)}
              className={`p-4 rounded-xl border text-center transition-all ${
                formData.teamSize === option.en
                  ? "bg-[#4D39EB]/15 border-[#4D39EB]/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <span className="text-sm font-medium">{option[lang]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({
  formData,
  updateField,
  errors,
  t,
  lang,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  errors: Partial<FormData>;
  t: typeof TRANSLATIONS.en;
  lang: "en" | "it";
}) {
  return (
    <div className="space-y-6 opacity-100">
      {/* Challenge - Textarea */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.challenge} *
        </label>
        <textarea
          value={formData.challenge}
          onChange={(e) => updateField("challenge", e.target.value)}
          rows={4}
          className={`w-full p-4 rounded-xl bg-white/5 border ${
            errors.challenge ? "border-red-500/50" : "border-white/10"
          } text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all resize-none`}
          placeholder={t.challengePlaceholder}
        />
        <div className="flex justify-between items-center mt-2">
          <p className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${
            formData.challenge.length >= 20 ? "text-green-500/70" : "text-[#4D39EB]"
          }`}>
            {formData.challenge.length < 20 
              ? (lang === 'it' ? `Minimo 20 caratteri: ${formData.challenge.length}/20` : `Min 20 characters: ${formData.challenge.length}/20`)
              : (lang === 'it' ? "Lunghezza minima raggiunta" : "Minimum length reached")
            }
          </p>
        </div>
      </div>

      {/* Timeline - Single Select */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-3">
          {t.timeline} *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TIMELINE.map((option) => (
            <button
              key={option.en}
              onClick={() => updateField("timeline", option.en)}
              className={`p-4 rounded-xl border text-center transition-all ${
                formData.timeline === option.en
                  ? "bg-[#4D39EB]/15 border-[#4D39EB]/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <span className="text-sm font-medium">{option[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Budget - Single Select (Optional) */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-1">
          {t.budget} <span className="text-slate-500 normal-case">{t.budgetOptional}</span>
        </label>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {BUDGET.map((option) => (
            <button
              key={option.en}
              onClick={() => updateField("budget", option.en)}
              className={`p-3 rounded-xl border text-center transition-all ${
                formData.budget === option.en
                  ? "bg-[#4D39EB]/15 border-[#4D39EB]/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <span className="text-xs font-medium">{option[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes - Textarea (Optional) */}
      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
          {t.notes} <span className="text-slate-500 normal-case">{t.budgetOptional}</span>
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          rows={3}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#4D39EB]/50 focus:bg-white/[0.07] transition-all resize-none"
          placeholder={t.notesPlaceholder}
        />
      </div>
    </div>
  );
}

function SuccessMessage({ t }: { t: typeof TRANSLATIONS.en }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
      <div className="w-20 h-20 rounded-full bg-[#4D39EB]/20 flex items-center justify-center mb-6">
        <Icon icon="solar:check-circle-bold" width={48} className="text-[#4D39EB]" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">{t.successTitle}</h3>
      <p className="text-slate-400 max-w-xs">{t.successMessage}</p>
    </div>
  );
}

