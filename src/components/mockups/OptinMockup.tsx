"use client";

import { useState } from "react";
import { optinThemeConfig, type OptinThemeVariant } from "./optin-themes";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

const MOCKUP_COPY = {
  logo: "MORFEUS",
  badge: "WEBINAR GRATUITO",
  badgeLive: "LIVE",
  headline: "Costruisci il tuo primo AI Employee in",
  headlineHighlight: "30 giorni",
  subheadline:
    "Passi ore su task ripetitivi? Scopri il framework step-by-step che trasforma ChatGPT in un AI Employee operativo. Webinar live + accesso ad AI Playground incluso.",
  vslPlaceholder: "Inserisci qui il tuo VSL",
  ctaPrimary: "Registrati al webinar — gratis",
  ctaPrimarySub: "100% gratuito",
  socialProofTitle: "Oltre 100 professionisti già registrati",
  socialProofNumber: "127+",
  painTitle: "Ti capita di...",
  painPoints: [
    "Usare ChatGPT a sprazzi senza un sistema che lo integri nel workflow",
    "Perdere ore ogni settimana su task ripetitivi che potresti delegare",
    "Temere che tra 2 mesi cambi tutto — strumenti nuovi, approccio perso",
    "Provare l'AI e poi tornare al metodo vecchio perché non si integra",
  ],
  benefitsTitle: "Cosa scoprirai",
  benefits: [
    "Chiarezza su cos'è un AI Employee in pratica — non teoria",
    "Esempi di use case reali che puoi replicare subito",
    "Framework step-by-step per costruirne uno in 30 giorni",
    "Come evitare l'errore 'tool hopping' — metodo > strumenti",
  ],
  agendaTitle: "Cosa succede nel webinar",
  agendaPoints: [
    "Introduzione: da ChatGPT occasionale ad AI Employee operativo",
    "Demo: un AI Employee in azione su un task reale",
    "Il framework in 4 fasi (progettare, costruire, deployare, mantenere)",
    "Come evitare l'errore 'tool hopping' — metodo > strumenti",
  ],
  urgencyText: "I posti sono limitati — registrati ora",
  formTitle: "Prenota il tuo posto",
  formCta: "Registrati al webinar — gratis",
  privacyDisclaimer: "Niente spam. Disiscrizione in un click.",
};

interface OptinMockupProps {
  variant: OptinThemeVariant;
  videoUrl?: string;
  videoCoverImageUrl?: string;
}

const PAGE_BG = { infobiz: "#1a1625", premium: "#050508" } as const;

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  return url;
}

export function OptinMockup({
  variant,
  videoUrl,
  videoCoverImageUrl,
}: OptinMockupProps) {
  const t = optinThemeConfig[variant];
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(videoUrl);

  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen px-6 py-10 md:px-10 md:py-14"
      style={{ backgroundColor: PAGE_BG[variant] }}
    >
      <div className="mx-auto w-full max-w-[720px] flex flex-col gap-10 md:gap-14">
        {/* Header / Logo */}
        <header>
          <span
            className={`text-xs font-semibold tracking-[0.2em] uppercase ${t.logoColor}`}
          >
            {MOCKUP_COPY.logo}
          </span>
        </header>

        {/* Hero */}
        <section className="p-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${t.highlightBg} ${t.highlightText}`}
            >
              {MOCKUP_COPY.badge}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${t.heroSubheadlineColor} border ${variant === "infobiz" ? "border-white/20" : "border-white/10"}`}
            >
              {MOCKUP_COPY.badgeLive}
            </span>
          </div>
          <h1
            className={`text-3xl font-bold leading-tight md:text-4xl md:leading-tight ${t.heroHeadlineColor}`}
          >
            {MOCKUP_COPY.headline}{" "}
            <span
              className={`inline-block px-1.5 py-0.5 rounded ${t.highlightBg} ${t.highlightText} font-semibold`}
            >
              {MOCKUP_COPY.headlineHighlight}
            </span>
          </h1>
          <p
            className={`mt-5 text-base leading-relaxed md:text-lg ${t.heroSubheadlineColor}`}
          >
            {MOCKUP_COPY.subheadline}
          </p>
        </section>

        {/* VSL */}
        <section className="w-full">
          <div
            className={`relative overflow-hidden rounded-xl ${variant === "infobiz" ? "shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : "border border-white/[0.08] shadow-xl"}`}
          >
            <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center group">
              {hasVideo && isPlaying ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getYouTubeEmbedUrl(videoUrl!)}
                  title="VSL"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-opacity group-hover:opacity-90 ${
                    hasVideo && videoCoverImageUrl ? "" : ""
                  }`}
                  onClick={() => hasVideo && setIsPlaying(true)}
                >
                  {hasVideo && videoCoverImageUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={videoCoverImageUrl}
                        alt="VSL Cover"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
                      />
                      <button
                        className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${variant === "infobiz" ? "bg-white/20 border border-white/30" : "bg-white/10 border border-white/20"}`}
                      >
<PlayIcon className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 ${variant === "infobiz" ? "bg-gray-800/60" : "bg-white/[0.03]"}`}
                      />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${variant === "infobiz" ? "bg-white/20" : "bg-white/10"} border ${variant === "infobiz" ? "border-white/30" : "border-white/20"}`}
                        >
                          <PlayIcon className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" />
                        </div>
                        <span
                          className={`text-sm font-medium ${t.heroSubheadlineColor}`}
                        >
                          {MOCKUP_COPY.vslPlaceholder}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA after VSL */}
        <section className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={scrollToForm}
            className={`w-full max-w-sm rounded-full px-6 py-4 text-sm font-semibold transition-all ${t.ctaBg} ${t.ctaBorder} ${t.ctaText} ${t.ctaHover}`}
          >
            {MOCKUP_COPY.ctaPrimary}
          </button>
          <span className={`text-xs ${t.bodyColor}`}>
            {MOCKUP_COPY.ctaPrimarySub}
          </span>
        </section>

        {/* Social Proof */}
        <section
          className={`rounded-2xl p-8 md:p-10 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
        >
          <p
            className={`text-center text-4xl md:text-5xl font-bold ${t.highlightText}`}
          >
            {MOCKUP_COPY.socialProofNumber}
          </p>
          <p
            className={`mt-2 text-center text-base md:text-lg ${t.cardTextColor}`}
          >
            {MOCKUP_COPY.socialProofTitle}
          </p>
        </section>

        {/* Pain / Agitazione */}
        <section
          className={`rounded-2xl p-8 md:p-10 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
        >
          <h2
            className={`text-xl font-semibold md:text-2xl ${t.cardTextColor}`}
          >
            {MOCKUP_COPY.painTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {MOCKUP_COPY.painPoints.map((item, i) => (
              <li
                key={i}
                className={`flex gap-3 ${t.cardTextColor}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center`}
                >
                  <CloseCircleIcon
                    className={`w-5 h-5 ${variant === "infobiz" ? "text-red-400" : "text-red-400/80"}`}
                  />
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefici / Cosa scoprirai */}
        <section
          className={`rounded-2xl p-8 md:p-10 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
        >
          <h2
            className={`text-xl font-semibold md:text-2xl ${t.cardTextColor}`}
          >
            {MOCKUP_COPY.benefitsTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {MOCKUP_COPY.benefits.map((item, i) => (
              <li
                key={i}
                className={`flex gap-3 rounded-xl p-4 ${variant === "infobiz" ? "bg-gray-50" : "border border-white/[0.06]"} ${t.cardTextColor}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${t.highlightText} ${variant === "infobiz" ? "bg-amber-100" : "bg-amber-500/20"}`}
                >
                  {i + 1}
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Agenda */}
        <section
          className={`rounded-2xl p-8 md:p-10 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
        >
          <h2
            className={`text-xl font-semibold md:text-2xl ${t.cardTextColor}`}
          >
            {MOCKUP_COPY.agendaTitle}
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-6">
            {MOCKUP_COPY.agendaPoints.map((point, i) => (
              <li
                key={i}
                className={`text-sm md:text-base ${t.cardTextColor}`}
              >
                {point}
              </li>
            ))}
          </ol>
        </section>

        {/* Urgenza */}
        <section className="flex justify-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${t.highlightBg} ${t.highlightText}`}
          >
            <ClockIcon className="w-4 h-4" />
            {MOCKUP_COPY.urgencyText}
          </div>
        </section>

        {/* Form */}
        <section
          id="form"
          className={`rounded-2xl p-8 md:p-10 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
        >
          <h2
            className={`text-xl font-semibold md:text-2xl ${t.cardTextColor}`}
          >
            {MOCKUP_COPY.formTitle}
          </h2>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="mockup-name"
                className={`block text-xs font-semibold uppercase tracking-wider ${t.labelColor} mb-2`}
              >
                Nome
              </label>
              <input
                id="mockup-name"
                type="text"
                placeholder="Il tuo nome"
                className={`w-full rounded-xl px-4 py-3 text-sm ${t.inputBg} ${t.inputBorder} ${t.inputFocusBorder} ${t.cardTextColor} placeholder-zinc-500 focus:outline-none transition-colors`}
              />
            </div>
            <div>
              <label
                htmlFor="mockup-email"
                className={`block text-xs font-semibold uppercase tracking-wider ${t.labelColor} mb-2`}
              >
                Email *
              </label>
              <input
                id="mockup-email"
                type="email"
                placeholder="tua@email.com"
                required
                className={`w-full rounded-xl px-4 py-3 text-sm ${t.inputBg} ${t.inputBorder} ${t.inputFocusBorder} ${t.cardTextColor} placeholder-zinc-500 focus:outline-none transition-colors`}
              />
            </div>
            <button
              type="submit"
              className={`mt-6 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${t.ctaBg} ${t.ctaBorder} ${t.ctaText} ${t.ctaHover}`}
            >
              {MOCKUP_COPY.formCta}
            </button>
          </form>
          <p className={`mt-4 text-xs ${t.bodyColor}`}>
            {MOCKUP_COPY.privacyDisclaimer}
          </p>
        </section>

        {/* Footer */}
        <footer className="pb-8">
          <p className={`text-center text-xs ${t.bodyColor}`}>
            {MOCKUP_COPY.privacyDisclaimer}
          </p>
        </footer>
      </div>
    </div>
  );
}
