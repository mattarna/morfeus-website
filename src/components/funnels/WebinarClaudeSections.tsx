"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  WebinarAudienceContent,
  WebinarFinalCTAContent,
  WebinarHeroContent,
  WebinarHostContent,
  WebinarLearnPointsContent,
  WebinarSocialProofContent,
  WebinarThankYouContent
} from "@/funnels/types";

interface AccentProps {
  accentColor: string;
}

interface WebinarOptinFormProps {
  accentColor: string;
  title?: string;
  microcopy?: string;
  submitLabel?: string;
  successRedirect?: string;
}

function Countdown({ targetIso }: { targetIso: string }) {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const items = [
    { label: "Giorni", value: days },
    { label: "Ore", value: hours },
    { label: "Min", value: mins },
    { label: "Sec", value: secs }
  ];

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
      {items.map((item) => (
        <div key={item.label} className="min-w-[52px] text-center">
          <p className="text-xl font-semibold text-white md:text-2xl">{String(item.value).padStart(2, "0")}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function WebinarOptinForm({
  accentColor,
  title,
  microcopy,
  submitLabel,
  successRedirect
}: WebinarOptinFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.length > 3 && email.includes("@") && name.trim() !== "" && role !== "" && privacy;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/funnels/webinar-claude/optin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          role,
          source: "webinar-claude"
        })
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      router.push(successRedirect ?? "/webinar-claude/thank-you");
    } catch (submitError) {
      console.error(submitError);
      setError("Non siamo riusciti a completare l'iscrizione. Riprova tra pochi secondi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-5 md:p-6"
    >
      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{title ?? "Iscriviti gratis"}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          type="email"
          required
          placeholder="La tua email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
        />
        <input
          type="text"
          required
          placeholder="Il tuo nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
        />
      </div>
      <select
        required
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="mt-3 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
      >
        <option value="">Qual e&apos; il tuo ruolo?</option>
        <option value="Freelance">Freelance</option>
        <option value="Dipendente">Dipendente</option>
        <option value="Imprenditore / Founder">Imprenditore / Founder</option>
        <option value="Manager">Manager</option>
        <option value="Altro">Altro</option>
      </select>
      <label className="mt-4 flex items-start gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} />
        <span>
          Accetto la{" "}
          <a href="/it/privacy" target="_blank" rel="noreferrer" className="underline">
            privacy policy
          </a>{" "}
          e acconsento al trattamento dei dati.
        </span>
      </label>
      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        data-funnel-cta="true"
        data-cta-href={successRedirect ?? "/webinar-claude/thank-you"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {isSubmitting ? "Invio in corso..." : submitLabel ?? "Conferma iscrizione"}
      </button>
      <p className="mt-3 text-xs text-slate-400">
        {microcopy ?? "Riceverai i reminder pre-webinar via email. Nessuna carta richiesta."}
      </p>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
    </form>
  );
}

export function WebinarHeroSection({
  accentColor,
  content
}: AccentProps & { content: WebinarHeroContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#10111a] p-8 md:p-12">
      <p className="inline-flex rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-slate-200">
        {content.badge}
      </p>
      <h1 className="mt-5 max-w-4xl text-3xl font-semibold text-white md:text-5xl">{content.headline}</h1>
      <p className="mt-5 max-w-3xl text-base text-slate-300 md:text-lg">{content.subheadline}</p>
      <p className="mt-6 text-sm font-medium uppercase tracking-[0.1em] text-slate-400">{content.eventLabel}</p>
      {content.countdownIso ? (
        <div className="mt-6">
          <Countdown targetIso={content.countdownIso} />
        </div>
      ) : null}
      <Link
        href={content.ctaHref}
        data-funnel-cta="true"
        data-cta-href={content.ctaHref}
        className="mt-7 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.ctaLabel}
      </Link>
      <WebinarOptinForm
        accentColor={accentColor}
        title={content.formTitle}
        microcopy={content.formMicrocopy}
        submitLabel={content.formSubmitLabel}
        successRedirect={content.formSuccessRedirect}
      />
    </section>
  );
}

export function WebinarSocialProofSection({ content }: { content: WebinarSocialProofContent }) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {content.stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-400">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}

export function WebinarLearnPointsSection({ content }: { content: WebinarLearnPointsContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{content.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {content.points.map((point) => (
          <article key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-base font-semibold text-white">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WebinarAudienceSection({ content }: { content: WebinarAudienceContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <ul className="mt-5 space-y-3 text-slate-300">
        {content.bullets.map((bullet) => (
          <li key={bullet} className="rounded-xl border border-white/10 p-4">
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WebinarHostSection({ content }: { content: WebinarHostContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{content.body}</p>
    </section>
  );
}

export function WebinarFinalCTASection({
  accentColor,
  content
}: AccentProps & { content: WebinarFinalCTAContent }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0f0f16] p-8">
      <h2 className="text-2xl font-semibold text-white">{content.title}</h2>
      <p className="mt-3 max-w-2xl text-slate-300">{content.body}</p>
      {content.countdownIso ? (
        <div className="mt-6">
          <Countdown targetIso={content.countdownIso} />
        </div>
      ) : null}
      <Link
        href={content.ctaHref}
        data-funnel-cta="true"
        data-cta-href={content.ctaHref}
        className="mt-6 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.ctaLabel}
      </Link>
      <WebinarOptinForm
        accentColor={accentColor}
        title={content.formTitle}
        microcopy={content.formMicrocopy}
        submitLabel={content.formSubmitLabel}
        successRedirect={content.formSuccessRedirect}
      />
    </section>
  );
}

export function WebinarThankYouSection({
  accentColor,
  content
}: AccentProps & { content: WebinarThankYouContent }) {
  const generatedIcs = useMemo(() => {
    if (!content.calendarIcsContent) {
      return null;
    }
    return URL.createObjectURL(new Blob([content.calendarIcsContent], { type: "text/calendar;charset=utf-8" }));
  }, [content.calendarIcsContent]);

  useEffect(() => {
    return () => {
      if (generatedIcs) {
        URL.revokeObjectURL(generatedIcs);
      }
    };
  }, [generatedIcs]);

  function handleIcsDownload() {
    if (!generatedIcs) {
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = generatedIcs;
    anchor.download = content.calendarIcsFileName ?? "webinar-claude.ics";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#10111a] p-8 md:p-10">
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{content.title}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{content.body}</p>
      {content.eventDateLabel ? (
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-400">{content.eventDateLabel}</p>
      ) : null}
      <ul className="mt-6 space-y-2 text-slate-300">
        {content.checklist.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 p-4">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {content.calendarGoogleHref ? (
          <Link
            href={content.calendarGoogleHref}
            target="_blank"
            rel="noreferrer"
            data-funnel-cta="true"
            data-cta-href={content.calendarGoogleHref}
            className="inline-flex rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white"
          >
            {content.calendarLabel ?? "Aggiungi a Google Calendar"}
          </Link>
        ) : null}
        {content.calendarIcsContent ? (
          <button
            type="button"
            onClick={handleIcsDownload}
            className="inline-flex rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white"
          >
            Scarica .ics
          </button>
        ) : null}
      </div>
      <Link
        href={content.ctaHref}
        data-funnel-cta="true"
        data-cta-href={content.ctaHref}
        className="mt-7 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.youtubeLabel ?? content.ctaLabel}
      </Link>
    </section>
  );
}
