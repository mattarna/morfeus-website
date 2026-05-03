"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  SalesV3FinalCTAContent,
  SalesV3HeroContent,
  SalesV3PricingContent,
  SalesV3UrgencyContent,
  SalesV3Variant,
  WebinarFinalCTAContent,
  WebinarHeroContent,
  WebinarThankYouContent,
} from "@/funnels/types";
import styles from "./sections.module.css";

// ─── Shared prop shape ────────────────────────────────────────────────────────

interface SectionProps {
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-italic)",
        fontStyle: "italic",
        fontWeight: 500,
        color: "var(--orange)",
      }}
    >
      {children}
    </span>
  );
}

function Badge({ children, pulsingDot = true }: { children: React.ReactNode; pulsingDot?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        borderRadius: 100,
        background: "rgba(235,122,46,0.10)",
        border: "1px solid rgba(235,122,46,0.25)",
        color: "var(--orange)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
      }}
    >
      {pulsingDot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--orange)",
            boxShadow: "0 0 8px rgba(235,122,46,0.6)",
            animation: "badge-pulse 2s infinite",
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontSize: 13,
        fontWeight: 700,
        color: "var(--violet)",
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
      }}
    >
      <span style={{ width: 24, height: 1, background: "var(--violet)", opacity: 0.5, flexShrink: 0 }} />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  fullWidth,
  pulse,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  pulse?: boolean;
  size?: "md" | "lg";
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "lg" ? "20px 32px" : "16px 24px";
  const fs = size === "lg" ? 17 : 16;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: fs,
        padding: pad,
        borderRadius: 10,
        border: "none",
        background: press ? "var(--orange-pressed)" : hover ? "var(--orange-hover)" : "var(--orange)",
        color: "#fff",
        boxShadow: hover
          ? "0 6px 28px rgba(235,122,46,0.5)"
          : "0 4px 20px rgba(235,122,46,0.35)",
        transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
        transition: "background .2s, box-shadow .2s, transform .2s",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        animation: pulse ? "btn-pulse 2.4s infinite" : "none",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 14,
        padding: "12px 20px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.14)",
        background: hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        color: "var(--ghost)",
        transition: "background .2s",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </button>
  );
}

function StyledInput({
  type = "text",
  value,
  onChange,
  placeholder,
  onEnter,
  autoFocus,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  autoFocus?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: 16,
        color: "#fff",
        background: focus ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
        border: `1px solid ${focus ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 10,
        padding: "16px 18px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color .2s, background .2s",
        boxShadow: focus ? "0 0 0 4px rgba(235,122,46,0.08)" : "none",
      }}
    />
  );
}

function StyledSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: 16,
          color: value ? "#fff" : "rgba(255,255,255,0.5)",
          background: focus ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
          border: `1px solid ${focus ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 10,
          padding: "16px 18px",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          appearance: "none",
          WebkitAppearance: "none",
          cursor: "pointer",
          transition: "border-color .2s, background .2s",
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#111" }}>{o}</option>
        ))}
      </select>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}
      >
        <path d="M1 1.5 L6 6.5 L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function Countdown({ targetIso }: { targetIso: string }) {
  const targetMs = new Date(targetIso).getTime();
  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div style={{ height: 88 }} />;

  const diff = Math.max(0, targetMs - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (diff <= 0) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 22px",
          borderRadius: 12,
          background: "rgba(235,122,46,0.12)",
          border: "1px solid rgba(235,122,46,0.35)",
          color: "var(--orange)",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "var(--font-body)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--orange)",
            boxShadow: "0 0 10px rgba(235,122,46,0.8)",
            animation: "badge-pulse 1.2s infinite",
          }}
        />
        Il webinar è iniziato — guardalo ora
      </div>
    );
  }

  const Cell = ({ n, label }: { n: number; label: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1,
          color: "#fff",
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {pad(n)}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "var(--muted)",
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          marginTop: 8,
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
      </span>
    </div>
  );

  const Sep = () => (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 28,
        color: "rgba(255,255,255,0.2)",
        lineHeight: 1,
        alignSelf: "flex-start",
        marginTop: 2,
      }}
    >
      :
    </span>
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "20px 28px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Cell n={days} label="Giorni" />
      <Sep />
      <Cell n={hours} label="Ore" />
      <Sep />
      <Cell n={mins} label="Min" />
      <Sep />
      <Cell n={secs} label="Sec" />
    </div>
  );
}

// ─── Optin Form Two-Step ──────────────────────────────────────────────────────

function OptinFormTwoStep({
  onComplete,
  id,
  ctaStep1 = "Riserva il tuo posto",
  ctaStep2 = "Ci sono. Confermo",
  microStep1 = "Gratuito. Nessuna carta. 10 secondi e sei dentro.",
  microStep2 = "Riceverai il link per partecipare via email entro 2 minuti.",
  successRedirect = "/webinar-claude/thank-you",
}: {
  onComplete?: (data: { email: string; name: string; role: string }) => void;
  id?: string;
  ctaStep1?: string;
  ctaStep2?: string;
  microStep1?: string;
  microStep2?: string;
  successRedirect?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const expansionRef = useRef<HTMLDivElement>(null);
  const [expandedH, setExpandedH] = useState(0);

  useEffect(() => {
    if (expanded && expansionRef.current) {
      setExpandedH(expansionRef.current.scrollHeight);
    } else {
      setExpandedH(0);
    }
  }, [expanded]);

  function goStep2() {
    if (!email.includes("@") || email.length < 4) {
      setError("Inserisci una email valida");
      return;
    }
    setError("");
    setExpanded(true);
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!name.trim()) { setError("Il nome è richiesto"); return; }
    if (!role) { setError("Seleziona il tuo ruolo"); return; }
    if (!privacy) { setError("Serve accettare la privacy policy"); return; }
    setError("");
    setIsSubmitting(true);
    try {
      // Capture UTM params from current URL
      const sp = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      const utms: Record<string, string> = {};
      utmKeys.forEach(k => { if (sp.has(k)) utms[k] = sp.get(k)!; });

      const res = await fetch("/api/funnels/webinar-claude/optin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), role, source: "webinar-claude", ...utms }),
      });
      if (!res.ok) throw new Error("submit_failed");

      // GA4 conversion event
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.dataLayer) w.dataLayer.push({ event: "webinar_optin_complete", role, ...utms });
      // Meta Pixel Lead event
      if (w.fbq) w.fbq("track", "Lead", { content_name: "webinar-claude" });

      onComplete?.({ email: email.trim(), name: name.trim(), role });

      // Store first name for thank-you page personalisation
      sessionStorage.setItem("wc_optin_name", name.trim());

      // Redirect preserving UTM params
      const utmStr = new URLSearchParams(utms).toString();
      router.push(utmStr ? `${successRedirect}?${utmStr}` : successRedirect);
    } catch {
      setError("Non siamo riusciti a completare l'iscrizione. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      style={{
        maxWidth: 540,
        margin: "0 auto",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 28,
        backdropFilter: "blur(10px)",
        position: "relative",
      }}
    >
      {/* gradient border via mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          padding: 1,
          background: "linear-gradient(135deg, rgba(123,104,238,0.3), rgba(235,122,46,0.2))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "var(--violet)",
          fontWeight: 700,
          marginBottom: 14,
          fontFamily: "var(--font-body)",
        }}
      >
        {expanded ? "Ultimo passo" : "Iscriviti gratis"}
      </div>

      {/* Step 1 — email */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <StyledInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="La tua email"
            onEnter={expanded ? submit : goStep2}
          />
        </div>
        {!expanded && (
          <PrimaryButton onClick={goStep2} pulse>
            {ctaStep1} <span style={{ fontSize: 18 }}>→</span>
          </PrimaryButton>
        )}
      </div>

      {/* Step 2 — slide-down */}
      <div
        style={{
          maxHeight: expanded ? expandedH + 40 : 0,
          overflow: "hidden",
          transition: "max-height .45s cubic-bezier(.4,0,.2,1), margin-top .45s cubic-bezier(.4,0,.2,1)",
          marginTop: expanded ? 16 : 0,
        }}
      >
        <div
          ref={expansionRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity .4s ease .1s, transform .4s ease .1s",
          }}
        >
          <StyledInput
            value={name}
            onChange={setName}
            placeholder="Il tuo nome"
            onEnter={submit}
            autoFocus={expanded}
          />
          <StyledSelect
            value={role}
            onChange={setRole}
            placeholder="Qual è il tuo ruolo?"
            options={["Freelance", "Dipendente", "Imprenditore / Founder", "Manager", "Altro"]}
          />
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              cursor: "pointer",
              userSelect: "none",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ghost)",
              opacity: 0.8,
              fontFamily: "var(--font-body)",
              marginTop: 4,
            }}
          >
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--orange)", cursor: "pointer", flexShrink: 0 }}
            />
            <span>
              Accetto la{" "}
              <Link href="/it/privacy" target="_blank" rel="noreferrer" style={{ color: "var(--orange)" }}>
                privacy policy
              </Link>{" "}
              e acconsento al trattamento dei dati.
            </span>
          </label>
          <PrimaryButton type="submit" disabled={isSubmitting} fullWidth size="lg">
            {isSubmitting ? "Invio in corso..." : <>{ctaStep2} <span style={{ fontSize: 18 }}>→</span></>}
          </PrimaryButton>
        </div>
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "#FF8a6a", marginTop: 12, fontWeight: 500, fontFamily: "var(--font-body)" }}>
          {error}
        </div>
      )}

      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 14, lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
        {expanded ? microStep2 : microStep1}
      </div>
    </form>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

export function WebinarHeaderSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const logoHeight = isMobile ? 13 : 16;

  return (
    <header
      className={styles.header}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Logo Morfeus — m-w2 (symbol + wordmark) */}
      <Image src="/logo/m-w2.png" alt="Morfeus" width={120} height={logoHeight} priority style={{ height: logoHeight, width: "auto", display: "block" }} />
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

export function WebinarHeroSection({ step }: SectionProps) {
  const content: WebinarHeroContent = step.content.WebinarHero;
  const scrollToForm = () => {
    document.getElementById("final-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={styles.heroSection}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Ambient glow behind headline */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 140,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 90vw)",
          height: 340,
          background:
            "radial-gradient(ellipse, rgba(235,122,46,0.14) 0%, rgba(123,104,238,0.06) 40%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Badge>{content.badge}</Badge>
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(40px, 6vw, 72px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: "#fff",
          textAlign: "center",
          margin: "0 auto 24px",
          maxWidth: 920,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Stai usando Claude al 10%.<br />
        Ti mostro il <Accent>restante</Accent> 90%.
      </h1>

      <p
        className={styles.heroSubheadline}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.85,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 680,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        {content.subheadline}
      </p>

      <OptinFormTwoStep
        id="form-hero"
        successRedirect={content.formSuccessRedirect}
        ctaStep2={content.formSubmitLabel}
        microStep1={content.formMicrocopy}
      />

      {content.countdownIso && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Countdown targetIso={content.countdownIso} />
        </div>
      )}

      {/* Scroll hint */}
      <div
        style={{
          textAlign: "center",
          marginTop: 48,
          fontSize: 12,
          color: "var(--muted)",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
        }}
        onClick={scrollToForm}
      >
        Scopri cosa impari →
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF BAR ─────────────────────────────────────────────────────────

export function WebinarSocialProofSection() {
  const items = [
    { n: "+300", label: "ore di Claude", sub: "uso complessivo del team Morfeus" },
    { n: "9.500", label: "lettori newsletter", sub: "AI Espresso" },
    { n: "H-Farm · Sole 24 Ore · Talent Garden", label: null, sub: "docente & formatore" },
  ];

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, rgba(15,14,26,0.0) 0%, rgba(15,14,26,0.75) 20%, rgba(15,14,26,0.75) 80%, rgba(15,14,26,0.0) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "36px 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className={styles.statsRow}
        style={{
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className={styles.statItem}>
              {it.label ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 28,
                      color: "var(--orange)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {it.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--ghost)",
                      opacity: 0.9,
                    }}
                  >
                    {it.label}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#fff",
                    opacity: 0.92,
                    letterSpacing: "-0.005em",
                    marginBottom: 4,
                    textAlign: "center",
                  }}
                >
                  {it.n}
                </div>
              )}
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                }}
              >
                {it.sub}
              </div>
            </div>
            {i < items.length - 1 && (
              <span
                className={styles.statDivider}
                style={{
                  width: 1,
                  height: 42,
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── LETTER ───────────────────────────────────────────────────────────────────

export function WebinarLetterSection() {
  const scrollToForm = () => {
    document.getElementById("final-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const H = ({ children }: { children: React.ReactNode }) => (
    <span
      style={{
        fontFamily: "var(--font-italic)",
        fontStyle: "italic",
        fontWeight: 600,
        color: "#C85A15",
        backgroundImage: "linear-gradient(to bottom, transparent 82%, rgba(200,90,21,0.25) 82%)",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </span>
  );

  const paragraphs: React.ReactNode[] = [
    <>Quando ho iniziato a usare Claude facevo come tutti.<br />Gli facevo una domanda. Lui rispondeva. Io copiavo e incollavo.</>,
    <>Funzionava? Sì. Ma dopo un po&apos; ho iniziato a sentire che c&apos;era qualcosa che non vedevo. Qualcosa che lo strumento poteva fare e che io non gli stavo chiedendo.</>,
    <>Così ho iniziato a scavare.</>,
    <>Non i tutorial da 10 minuti su YouTube. Non i thread con <span style={{ opacity: 0.75 }}>«10 prompt che ti cambiano la vita»</span>. Quelli li avevo già provati. Non funzionano.</>,
    <>Ho iniziato a usare Claude nel mio lavoro reale, ogni giorno, su problemi veri.<br />Gestisco un&apos;azienda che lavora con l&apos;AI da oltre 4 anni. Non è un hobby. È quello che faccio.<br />A sbagliare. A capire perché sbagliavo. A rifare da capo con un approccio diverso.</>,
    <>+300 ore dopo, quello che ho trovato <H>ha cambiato il modo in cui lavoro</H>.</>,
    <>Non parlo di «risparmiare un po&apos; di tempo». Parlo di avere un collaboratore che conosce il mio contesto, segue le mie regole, produce al mio standard. Ogni giorno. Senza che io debba ricominciare da zero ogni volta.</>,
    <>La cosa che mi ha sorpreso di più?<br />Non erano le feature che non conoscevo. Era il modo in cui ragionavo con lo strumento. Quello era l&apos;errore. E nessuno ne parla.</>,
    <>Ho deciso di fare questo webinar perché credo che quelle +300 ore non debbano essere necessarie.</>,
    <>In una sera ti mostro cosa ho trovato. Quello che funziona, quello che non funziona, e <H>l&apos;approccio che cambia tutto</H>.</>,
    <>Poi decidi tu cosa farne.</>,
  ];

  return (
    <section
      className={styles.sectionPadLg}
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(235,122,46,0.06), transparent 60%), linear-gradient(180deg, rgba(15,14,26,0.0) 0%, rgba(25,21,35,0.35) 8%, rgba(25,21,35,0.35) 92%, rgba(15,14,26,0.0) 100%)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
        {/* The paper */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #F5EFE4 0%, #EFE7D8 100%)",
            color: "#2A2420",
            padding: "clamp(48px, 7vw, 88px) clamp(32px, 6vw, 80px)",
            borderRadius: 4,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -20px rgba(0,0,0,0.55), 0 60px 120px -40px rgba(0,0,0,0.45)",
          }}
        >
          {/* Ruled lines */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "repeating-linear-gradient(180deg, transparent 0 31px, rgba(42,36,32,0.035) 31px 32px)",
              borderRadius: 4,
              mixBlendMode: "multiply",
            }}
          />

          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              color: "#6B5E54",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
            }}
          >
            <span>Una lettera aperta</span>
            <span>Milano, aprile 2026</span>
          </div>

          {/* Salutation */}
          <div
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.3,
              color: "#2A2420",
              opacity: 0.65,
              marginBottom: 36,
              position: "relative",
              zIndex: 1,
              letterSpacing: "0.01em",
            }}
          >
            Ciao,
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-italic)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(17px, 1.5vw, 19px)",
                  lineHeight: 1.75,
                  color: "#2A2420",
                  margin: 0,
                  textWrap: "pretty" as React.CSSProperties["textWrap"],
                  letterSpacing: "0.005em",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div style={{ marginTop: 56, position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 34,
                lineHeight: 1,
                color: "#2A2420",
                letterSpacing: "0.01em",
                transform: "rotate(-2deg)",
                transformOrigin: "left center",
                marginBottom: 14,
                display: "inline-block",
              }}
            >
              Matteo
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#6B5E54",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Matteo Arnaboldi · CEO & Co-Founder, Morfeus Hub
            </div>
          </div>
        </div>

        {/* CTA after letter */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <PrimaryButton onClick={scrollToForm} size="lg" pulse>
            Ok Matt, ci sono <span style={{ fontSize: 18 }}>→</span>
          </PrimaryButton>
          <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
            Martedì 5 Maggio, ore 18:00. Gratuito.
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LEARN POINTS ─────────────────────────────────────────────────────────────

function LearnCard({ n, title, body }: { n: string; title: string; body: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "36px 34px 38px",
        background: hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? "rgba(235,122,46,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        transition: "border-color .25s, background .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "0.02em",
          color: "var(--orange)",
          marginBottom: 20,
        }}
      >
        {n} <span style={{ opacity: 0.4, fontWeight: 400, margin: "0 2px" }}>/</span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          color: "#fff",
          margin: "0 0 14px 0",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.78,
          margin: 0,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        {body}
      </p>
    </div>
  );
}

export function WebinarLearnPointsSection() {
  const scrollToForm = () => {
    document.getElementById("final-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const items = [
    {
      n: "01",
      t: "Le funzionalità che il 95% non sa che esistono",
      b: "Projects, CoWork, Skills, Plugin, Claude Code, Dispatch e altre funzioni avanzate. Non le basi. L'utilizzo avanzato che trasforma Claude da chatbot a strumento di lavoro reale.",
    },
    {
      n: "02",
      t: "L'approccio che cambia tutto",
      b: "Il problema non sono le feature che non conosci. È il modo in cui ragioni con lo strumento. \"Fai tutto tu\" è l'errore più costoso che puoi fare con l'AI. Ti mostro l'alternativa.",
    },
    {
      n: "03",
      t: "Demo live dal mio lavoro quotidiano",
      b: "Niente slide, niente teoria. Ti faccio vedere esattamente come io e il team Morfeus usiamo Claude ogni giorno: cosa gli chiedo, come lo correggo, perché funziona. Poi puoi replicarlo nel tuo.",
    },
    {
      n: "04",
      t: "Dove porta tutto questo quando lo padroneggi",
      b: "Il mio team AI: sistemi che lavorano con me, conoscono il mio contesto, seguono le mie regole e producono al mio standard. Non è fantascienza — è quello che succede quando conosci lo strumento a fondo.",
    },
  ];

  return (
    <section
      className={styles.sectionPad}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel>In una sera</SectionLabel>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "24px 0 20px 0",
          maxWidth: 820,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Le <Accent>4 cose</Accent> che cambiano come lavori con Claude
      </h2>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.80,
          margin: "0 0 72px 0",
          maxWidth: 640,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Non &ldquo;prompt engineering base&rdquo;. Non &ldquo;scrivi prompt migliori&rdquo;. Workflow concreti che usano le feature vere di Claude — quelle che il 95% della gente non sa nemmeno esistano.
      </p>

      <div className={styles.learnGrid}>
        {items.map((it) => (
          <LearnCard key={it.n} n={it.n} title={it.t} body={it.b} />
        ))}
      </div>

      <div
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <PrimaryButton onClick={scrollToForm} size="lg" pulse>
          Voglio vedere tutto questo <span style={{ fontSize: 18 }}>→</span>
        </PrimaryButton>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
          Gratuito. Un&apos;ora. Il 5 maggio alle 18:00.
        </div>
      </div>
    </section>
  );
}

// ─── AUDIENCE ─────────────────────────────────────────────────────────────────

export function WebinarAudienceSection() {
  const points = [
    "Usi Claude o ChatGPT ma senti che stai grattando la superficie.",
    "Hai provato a fare qualcosa di avanzato e i risultati ti hanno deluso.",
    "Sei un professionista, freelance o imprenditore che vuole lavorare meglio, non solo più veloce.",
    "Hai un'ora libera il 5 maggio e abbastanza curiosità per scoprire cosa ti stai perdendo.",
  ];

  const closingLine: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: "clamp(22px, 2.4vw, 28px)",
    lineHeight: 1.3,
    color: "var(--ghost)",
    opacity: 0.88,
    margin: 0,
    letterSpacing: "-0.01em",
  };

  return (
    <section
      className={styles.sectionPad}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel>È per te se</SectionLabel>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "24px 0 56px 0",
          maxWidth: 820,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Questo webinar è <Accent>per te</Accent> se
      </h2>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
        {points.map((p, i) => (
          <li
            key={p}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              padding: "22px 26px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                color: "var(--violet)",
                minWidth: 32,
                lineHeight: 1.3,
              }}
            >
              0{i + 1}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.5, color: "var(--ghost)", opacity: 0.92 }}>
              {p}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 6, maxWidth: 640 }}>
        <p style={closingLine}>Non serve esperienza tecnica.</p>
        <p style={closingLine}>Non serve saper programmare.</p>
        <p style={{ ...closingLine, color: "#fff", opacity: 1 }}>
          Serve <Accent>volerlo sapere</Accent>.
        </p>
      </div>
    </section>
  );
}

// ─── HOST ─────────────────────────────────────────────────────────────────────

export function WebinarHostSection() {
  const bioPara: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 17,
    lineHeight: 1.6,
    color: "var(--ghost)",
    opacity: 0.88,
    margin: "0 0 18px 0",
    maxWidth: 620,
  };

  return (
    <section
      className={styles.sectionPad}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel>Chi parla</SectionLabel>

      <div className={styles.hostGrid}>
        {/* Avatar */}
        <div className={styles.hostAvatarWrap}>
          <div className={styles.hostAvatar}>
            <Image
              src="/matteo-arnaboldi-hoodie.png"
              alt="Matteo Arnaboldi"
              width={240}
              height={240}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 10px 0",
            }}
          >
            Matteo Arnaboldi
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500, color: "var(--ghost)", opacity: 0.7, margin: "0 0 32px 0" }}>
            CEO e Co-Founder di Morfeus Hub
          </p>

          <p style={bioPara}>
            Morfeus è un&apos;azienda software che sviluppa prodotti AI e aiuta le aziende a integrare l&apos;intelligenza artificiale nei propri processi. Lavoriamo con l&apos;AI dal 2021 — prima che diventasse hype. Partner Asseprim Confcommercio.
          </p>
          <p style={bioPara}>
            <Accent>+300 ore</Accent> di utilizzo avanzato di Claude.<br />+180 ore di CoWork mode.
          </p>
          <p style={bioPara}>
            Non parlo di AI per sentito dire. La uso ogni giorno per costruire sistemi, workflow e processi che funzionano nel mio lavoro e in quello dei miei clienti.
          </p>
          <p style={bioPara}>
            Io e il mio team abbiamo costruito un intero team a parte di dipendenti AI.
          </p>

          {/* Institutions badge */}
          <div
            style={{
              margin: "28px 0",
              padding: "20px 22px",
              background: "rgba(123,104,238,0.06)",
              border: "1px solid rgba(123,104,238,0.20)",
              borderRadius: 12,
              maxWidth: 620,
            }}
          >
            <p style={{ ...bioPara, margin: 0, opacity: 1 }}>
              Docente H-FARM.<br />Formatore Il Sole 24 Ore Formazione e Talent Garden.
            </p>
          </div>

          <p style={{ ...bioPara, marginBottom: 28 }}>
            Su LinkedIn condivido quello che imparo.{" "}
            <strong style={{ color: "#fff" }}>16.000 professionisti</strong> mi seguono per questo.
          </p>

          <LinkedInLink />
        </div>
      </div>
    </section>
  );
}

function LinkedInLink() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="https://www.linkedin.com/in/matteo-arnaboldi/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        borderRadius: 10,
        border: hover ? "1px solid var(--orange)" : "1px solid rgba(255,255,255,0.14)",
        background: hover ? "rgba(235,122,46,0.06)" : "transparent",
        color: "var(--ghost)",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "var(--font-body)",
        transition: "border-color .2s, background .2s",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
      Profilo LinkedIn
    </a>
  );
}

// ─── CHANGE ───────────────────────────────────────────────────────────────────

function LevelCard({
  n,
  stage,
  title,
  paragraphs,
  tone,
}: {
  n: string;
  stage: string;
  title: string;
  paragraphs: string[];
  tone: "dim" | "mid" | "bright";
}) {
  const [hover, setHover] = useState(false);

  type Palette = {
    bg: string; bgHover: string; border: string; borderHover: string;
    num: string; title: string; body: string; dot: string;
    stageColor: string; stageBg: string; stageBorder: string;
    divider: string; glow: string;
  };

  const palette: Palette =
    tone === "dim"
      ? {
          bg: "rgba(255,255,255,0.02)", bgHover: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.06)", borderHover: "rgba(255,255,255,0.10)",
          num: "rgba(255,255,255,0.25)", title: "rgba(255,255,255,0.75)",
          body: "rgba(228,231,240,0.65)", dot: "rgba(255,255,255,0.3)",
          stageColor: "var(--muted)", stageBg: "rgba(255,255,255,0.05)",
          stageBorder: "rgba(255,255,255,0.08)", divider: "rgba(255,255,255,0.05)",
          glow: "none",
        }
      : tone === "mid"
      ? {
          bg: "rgba(255,255,255,0.035)", bgHover: "rgba(123,104,238,0.06)",
          border: "rgba(123,104,238,0.20)", borderHover: "rgba(123,104,238,0.35)",
          num: "var(--violet)", title: "#fff",
          body: "rgba(228,231,240,0.88)", dot: "var(--violet)",
          stageColor: "var(--violet)", stageBg: "rgba(123,104,238,0.12)",
          stageBorder: "rgba(123,104,238,0.22)", divider: "rgba(123,104,238,0.15)",
          glow: hover ? "0 20px 60px -20px rgba(123,104,238,0.25)" : "none",
        }
      : {
          bg: "rgba(235,122,46,0.04)", bgHover: "rgba(235,122,46,0.08)",
          border: "rgba(235,122,46,0.30)", borderHover: "rgba(235,122,46,0.50)",
          num: "var(--orange)", title: "#fff",
          body: "rgba(228,231,240,0.92)", dot: "var(--orange)",
          stageColor: "var(--orange)", stageBg: "rgba(235,122,46,0.12)",
          stageBorder: "rgba(235,122,46,0.25)", divider: "rgba(235,122,46,0.15)",
          glow: hover
            ? "0 20px 60px -15px rgba(235,122,46,0.35)"
            : "0 8px 30px -15px rgba(235,122,46,0.18)",
        };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "36px 30px 34px",
        background: hover ? palette.bgHover : palette.bg,
        border: `1px solid ${hover ? palette.borderHover : palette.border}`,
        borderRadius: 16,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "background .3s, border-color .3s, transform .3s, box-shadow .3s",
        boxShadow: palette.glow,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Dot connector */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -5,
          left: "50%",
          transform: "translateX(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: palette.dot,
          boxShadow:
            tone === "bright"
              ? "0 0 0 4px rgba(235,122,46,0.15), 0 0 14px rgba(235,122,46,0.5)"
              : tone === "mid"
              ? "0 0 0 4px rgba(123,104,238,0.10)"
              : "0 0 0 4px rgba(255,255,255,0.03)",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26, gap: 12 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: palette.num,
            transition: "color .3s",
          }}
        >
          {n}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: palette.stageColor,
            padding: "5px 10px",
            borderRadius: 100,
            background: palette.stageBg,
            border: `1px solid ${palette.stageBorder}`,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-body)",
          }}
        >
          Livello {n}
        </div>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 28,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: palette.title,
          margin: "0 0 20px 0",
          transition: "color .3s",
        }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: palette.body,
              margin: 0,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            {p}
          </p>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: `1px solid ${palette.divider}`,
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: 13,
          lineHeight: 1.4,
          color: palette.stageColor,
          opacity: 0.9,
        }}
      >
        {stage}
      </div>
    </div>
  );
}

export function WebinarChangeSection() {
  const levels: Array<{ n: string; stage: string; title: string; paragraphs: string[]; tone: "dim" | "mid" | "bright" }> = [
    {
      n: "01", stage: "Oggi", title: "Fai tutto tu", tone: "dim",
      paragraphs: [
        "Ogni task, ogni decisione, ogni output passa da te.",
        "Lavori 50, 60 ore a settimana e il collo di bottiglia sei sempre tu.",
        "L'AI? L'hai provata. Ma non ha cambiato niente di concreto.",
      ],
    },
    {
      n: "02", stage: "In una sera", title: "L'AI lavora con te", tone: "mid",
      paragraphs: [
        "Sai come usarla davvero. Le dai contesto, la guidi, la correggi. L'output è al tuo standard.",
        "Risparmi ore ogni settimana su lavoro che prima facevi a mano.",
        "Il tuo tempo torna ad essere tuo.",
      ],
    },
    {
      n: "03", stage: "La destinazione", title: "L'AI lavora per te", tone: "bright",
      paragraphs: [
        "Hai un sistema. L'AI conosce il tuo contesto, segue le tue regole, produce senza che tu debba ricominciare ogni volta da zero.",
        "Non è un assistente. È un membro del team.",
      ],
    },
  ];

  return (
    <section
      className={styles.sectionPadLg}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionLabel>Il cambiamento</SectionLabel>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "24px 0 28px 0",
          maxWidth: 900,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Il modo in cui lavori sta per cambiare.
      </h2>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.88,
          margin: "0 0 72px 0",
          maxWidth: 720,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Siamo passati dalla carta ai fogli di calcolo. Dai fogli di calcolo ai SAAS. Ora il prossimo salto è qui.
        <br />La domanda è semplice:{" "}
        <Accent>lo vuoi guidare</Accent> o lo vuoi subire?
      </p>

      {/* Rail + cards */}
      <div style={{ position: "relative" }}>
        <div
          aria-hidden
          className={styles.changeRail}
          style={{
            position: "absolute",
            top: 88,
            left: "8%",
            right: "8%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(123,104,238,0.35) 50%, rgba(235,122,46,0.55) 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div className={styles.changeGrid}>
          {levels.map((lv) => (
            <LevelCard key={lv.n} {...lv} />
          ))}
        </div>
      </div>

      {/* Closing line */}
      <div style={{ marginTop: 80, maxWidth: 760, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.2vw, 24px)",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            color: "var(--ghost)",
            opacity: 0.95,
            margin: 0,
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          La maggior parte dei professionisti è ferma al{" "}
          <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>livello 1</span>.
          <br />
          Questo webinar ti fa capire come si può arrivare al{" "}
          <span style={{ color: "var(--violet)", fontWeight: 600 }}>2</span> e ti fa vedere cosa succede al{" "}
          <span style={{ color: "var(--orange)", fontWeight: 600 }}>3</span>.
        </p>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

export function WebinarFinalCTASection({ step }: SectionProps) {
  const content: WebinarFinalCTAContent = step.content.WebinarFinalCTA;

  const Pill = ({ children, accent, icon }: { children: React.ReactNode; accent?: boolean; icon?: React.ReactNode }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 100,
        background: accent ? "rgba(235,122,46,0.08)" : "rgba(255,255,255,0.035)",
        border: `1px solid ${accent ? "rgba(235,122,46,0.25)" : "rgba(255,255,255,0.10)"}`,
        fontSize: 13,
        fontWeight: 500,
        color: accent ? "var(--orange)" : "var(--ghost)",
        opacity: accent ? 1 : 0.92,
        fontFamily: "var(--font-body)",
      }}
    >
      {icon}
      {children}
    </span>
  );

  return (
    <section
      className={styles.finalCtaSection}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Ambient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 90vw)",
          height: 280,
          background: "radial-gradient(ellipse, rgba(235,122,46,0.10) 0%, transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(40px, 5.6vw, 64px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: "#fff",
          textAlign: "center",
          margin: "0 auto 20px",
          maxWidth: 820,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Ci vediamo il 5 maggio.
      </h2>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 20,
          lineHeight: 1.5,
          color: "var(--ghost)",
          opacity: 0.9,
          textAlign: "center",
          margin: "0 auto 36px",
          maxWidth: 640,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Un&apos;ora. Gratis.<br />+300 ore di Claude condensate in una <Accent>sera</Accent>.
      </p>

      {/* Event pills */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          margin: "0 auto 44px",
          maxWidth: 820,
        }}
      >
        <Pill accent icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}>Martedì 5 Maggio 2026</Pill>
        <Pill accent icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}>ore 18:00</Pill>
        <Pill icon={<span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4D4D", boxShadow: "0 0 8px rgba(255,77,77,0.7)", animation: "badge-pulse 1.4s infinite", display: "inline-block" }} />}>YouTube Live</Pill>
        <Pill>~1 ora</Pill>
        <Pill>Gratuito</Pill>
        <Pill>Replay 48h</Pill>
      </div>

      {content.countdownIso && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
          <Countdown targetIso={content.countdownIso} />
        </div>
      )}

      <span id="final-form-anchor" />
      <OptinFormTwoStep
        id="form-final"
        successRedirect={content.formSuccessRedirect}
        ctaStep2={content.formSubmitLabel}
        microStep1="Riceverai 2-3 email di preparazione al webinar prima del 5 maggio. Nient&apos;altro."
      />
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export function WebinarFooterSection() {
  const muted: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 11,
    lineHeight: 1.6,
    color: "var(--muted)",
    opacity: 0.75,
  };

  return (
    <footer
      className={styles.footerInner}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top bar: logo + links */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/m-w.png" alt="Morfeus" style={{ height: 20, display: "block" }} />
          <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            morfeushub.com
          </span>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", display: "flex", gap: 16 }}>
          <Link href="/it/privacy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Privacy Policy</Link>
          <Link href="/it/cookies" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Cookie Policy</Link>
        </div>
      </div>

      {/* Disclaimers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={muted}>
          <strong style={{ color: "var(--muted)", opacity: 1 }}>Facebook Disclaimer:</strong> This Website is not a part of Facebook or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. Facebook is a trademark of Facebook Inc. Disclaimer: The products and services sold on this web site are not to be interpreted as a promise or guarantee of earnings. — Questo sito non fa parte di Facebook o Facebook Inc. Inoltre, questo sito NON è approvato da Facebook in alcun modo. Facebook è un marchio registrato di Facebook, Inc. I prodotti/servizi venduti su questo sito NON costituiscono proiezione, promessa o garanzia di guadagno.
        </p>
        <p style={muted}>
          <strong style={{ color: "var(--muted)", opacity: 1 }}>YouTube Disclaimer:</strong> This site is not a part of YouTube or Google LLC. YouTube is a trademark of Google LLC.
        </p>
        <p style={muted}>
          I risultati individuali possono variare. Nessun risultato è garantito e dipende dall&apos;impegno, dall&apos;esperienza e dalle condizioni individuali di ciascun partecipante. / Individual results may vary. No results are guaranteed.
        </p>
        <p style={muted}>
          Questo contenuto rispetta le linee guida AGCM in materia di correttezza pubblicitaria e pratiche commerciali.
        </p>
        <p style={{ ...muted, marginTop: 6 }}>
          Morfeus Hub S.r.l. — P.IVA 14209210963 — Milano, Italia
        </p>
        <p style={{ ...muted, marginTop: 4, opacity: 1 }}>
          © 2026 Morfeus Hub S.r.l. — Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

const COMMUNITY_URL =
  "https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7";
const CALL_URL = "https://marf.alexcarofiglio.com/book/morfeushub";
const GCAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar%3A+come+usare+Claude+come+un+Pro+%E2%80%94+Morfeus+%7C+Matteo+Arnaboldi&dates=20260505T160000Z%2F20260505T171500Z&details=Webinar+gratuito%3A+quello+che+io+e+il+nostro+team+abbiamo+imparato+usando+Claude+per+pi%C3%B9+di+300+ore.%0A%0ALe+funzionalit%C3%A0+nascoste%2C+gli+errori+da+evitare%2C+i+workflow+che+uso+ogni+giorno.+Tutto+in+un%27ora.%0A%0A%E2%96%B6+Partecipa+qui%3A+https%3A%2F%2Fyoutube.com%2Flive%2FPa2-LKvlJ3g%3Ffeature%3Dshare%0A%0ACon+Matteo+Arnaboldi+%E2%80%94+CEO+Morfeus+Hub%0Amorfeushub.com&location=YouTube+Live+%E2%80%94+https%3A%2F%2Fyoutube.com%2Flive%2FPa2-LKvlJ3g%3Ffeature%3Dshare&ctz=Europe%2FRome";

function StepCard({
  stepLabel,
  done,
  icon,
  title,
  body,
  cta,
}: {
  stepLabel: string;
  done: boolean;
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  cta: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        padding: "26px 26px 24px",
        background: done ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${done ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 14,
        marginBottom: 18,
        transition: "background .3s, border-color .3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: done ? "rgb(52,211,153)" : "var(--violet)",
            fontFamily: "var(--font-body)",
          }}
        >
          {stepLabel}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 100,
            background: done ? "rgba(52,211,153,0.12)" : "rgba(235,122,46,0.10)",
            color: done ? "rgb(52,211,153)" : "var(--orange)",
            border: `1px solid ${done ? "rgba(52,211,153,0.25)" : "rgba(235,122,46,0.22)"}`,
            fontFamily: "var(--font-body)",
          }}
        >
          {done ? "✓ Completato" : "● Da fare"}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: 9,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: done ? "rgb(52,211,153)" : "#fff",
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: "#fff",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.82,
          margin: "0 0 18px 0",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        {body}
      </p>

      {cta}
    </div>
  );
}

function ShareBlock() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href.split("?")[0].split("#")[0] : "https://morfeushub.com/webinar-claude";
  const shareText = encodeURIComponent("Il 5 maggio c'è un webinar gratuito su come usare davvero Claude per lavorare meglio. Penso possa interessarti. " + url);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* */ }
      document.body.removeChild(ta);
    }
  }

  const shareBtn = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: active ? "rgba(52,211,153,0.10)" : "rgba(255,255,255,0.03)",
    color: active ? "rgb(52,211,153)" : "var(--ghost)",
    border: `1px solid ${active ? "rgba(52,211,153,0.30)" : "rgba(255,255,255,0.10)"}`,
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 9,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background .15s, border-color .15s, color .15s",
  });

  return (
    <div
      style={{
        padding: "24px 26px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.015em", color: "#fff", margin: 0 }}>
          Condividi con chi pensi possa servire
        </h3>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.80, margin: "0 0 18px 0" }}>
        Se conosci un collega, un amico imprenditore o un professionista che vuole capire come usare davvero l&apos;AI — passaglielo.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={copyLink} style={shareBtn(copied)}>
          {copied ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Link copiato</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copia link</>
          )}
        </button>
        <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href={`mailto:?subject=${encodeURIComponent("Webinar Morfeus × Claude — 5 maggio")}&body=${shareText}`} style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email
        </a>
      </div>
    </div>
  );
}

export function WebinarThankYouSection({ step }: SectionProps) {
  const content: WebinarThankYouContent = step.content.WebinarThankYou;
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("wc_optin_name");
    if (stored) setFirstName(stored.split(" ")[0]);
  }, []);

  function addToCalendar() {
    if (!content.calendarIcsContent) return;
    const blob = new Blob([content.calendarIcsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = content.calendarIcsFileName ?? "webinar-claude.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStep2Done(true);
  }

  const primaryStepCTA: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    background: "var(--orange)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 10,
    textDecoration: "none",
    border: "1px solid rgba(235,122,46,0.5)",
    transition: "background .15s",
    width: "100%",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  return (
    <section
      className={styles.thankYouSection}
      style={{
        maxWidth: 720,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "0 0 16px 0",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Quasi fatto{firstName && <>, <Accent>{firstName}</Accent></>}.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 auto",
            maxWidth: 520,
          }}
        >
          Ancora un paio di cose prima di essere davvero pronto per martedì 5 maggio.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--muted)",
            margin: "20px auto 0",
            maxWidth: 520,
          }}
        >
          Email di conferma in arrivo — se non la vedi, controlla lo spam.
        </p>
      </div>

      {/* Alert */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px",
          background: "rgba(235,122,46,0.06)",
          border: "1px solid rgba(235,122,46,0.25)",
          borderRadius: 12,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: 8,
            background: "rgba(235,122,46,0.15)",
            color: "var(--orange)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4" /><path d="M12 17h.01" />
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.4, color: "var(--ghost)" }}>
          Non hai ancora finito.{" "}
          <span style={{ color: "var(--orange)", fontWeight: 600 }}>Mancano 2 step</span> prima di essere pronto.
        </div>
      </div>

      {/* Step 1: Calendar */}
      <StepCard
        stepLabel="Step 1 di 2"
        done={step2Done}
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
        title="Aggiungi l'evento al calendario"
        body={<>Martedì <strong style={{ color: "rgba(255,255,255,0.9)" }}>5 maggio 2026, dalle 18:00 alle 19:00 (CEST)</strong>. Un&apos;ora netta, online.</>}
        cta={
          <div className={styles.thankYouStepsRow} style={{ width: "100%", marginTop: 0 }}>
            <a
              href={content.calendarGoogleHref ?? GCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStep2Done(true)}
              style={primaryStepCTA}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Google Calendar
            </a>
            <SecondaryButton onClick={addToCalendar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              File .ics (Apple, Outlook…)
            </SecondaryButton>
          </div>
        }
      />

      {/* Step 2: Community */}
      <StepCard
        stepLabel="Step 2 di 2"
        done={step1Done}
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        title="Entra nella community Morfeus"
        body={<>Prima di martedì, unisciti al <strong style={{ color: "rgba(255,255,255,0.9)" }}>Morfeus AI Playground</strong> su Circle. È dove condividiamo prompt, workflow, clip dai workshop e dove puoi fare domande dirette al team prima e dopo il webinar.</>}
        cta={
          <SecondaryButton onClick={() => { window.open(COMMUNITY_URL, "_blank"); setStep1Done(true); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Entra nella community
          </SecondaryButton>
        }
      />

      {/* LinkedIn connect */}
      <div
        style={{
          padding: "24px 26px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          marginTop: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--violet)", flexShrink: 0 }}>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.015em", color: "#fff", margin: 0 }}>
            Connettiti con Matteo su LinkedIn
          </h3>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.80, margin: "0 0 18px 0" }}>
          Condivido ogni settimana quello che imparo usando l&apos;AI nel lavoro reale — workflow, strumenti, riflessioni senza hype. Seguono 16.000 professionisti.
        </p>
        <LinkedInLink />
      </div>

      {/* Call strategica */}
      <div
        style={{
          position: "relative",
          padding: "32px 28px 30px",
          background: "linear-gradient(135deg, rgba(235,122,46,0.08) 0%, rgba(123,104,238,0.05) 100%)",
          border: "1px solid rgba(235,122,46,0.22)",
          borderRadius: 16,
          marginTop: 24,
          marginBottom: 24,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(235,122,46,0.20) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 14,
              fontFamily: "var(--font-body)",
            }}
          >
            Non puoi aspettare martedì?
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(22px, 2.6vw, 28px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 14px 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Prenota una chiamata strategica con il team.
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: 0.9,
              margin: "0 0 22px 0",
              maxWidth: 560,
            }}
          >
            Se sei un imprenditore o un professionista e hai bisogno di capire <em>oggi</em> come impostare il tuo workflow con l&apos;AI, parla direttamente con noi. 30 minuti, senza impegno, su Google Meet.
          </p>
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              background: "var(--orange)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 10,
              textDecoration: "none",
              border: "1px solid rgba(235,122,46,0.5)",
              transition: "transform .15s, background .15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Prenota la chiamata
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </div>

      {/* Share */}
      <ShareBlock />

      {/* Footer note */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.5,
          color: "var(--muted)",
          margin: "40px 0 0 0",
        }}
      >
        Martedì 5 maggio 2026 · 18:00–19:00 CEST · Online
      </p>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function WebinarFAQSection() {
  const faqs = [
    {
      q: "Devo pagare qualcosa?",
      a: "No. Il webinar è completamente gratuito. Nessuna carta di credito, nessun impegno. Ti iscrivi con la tua email e ricevi il link per partecipare.",
    },
    {
      q: "Devo saper programmare o avere esperienza tecnica?",
      a: "No. Il webinar parte dal presupposto che usi Claude (o un altro strumento AI) per il tuo lavoro quotidiano, anche solo per fare domande e ottenere risposte. Se sai usare un browser, sei dentro.",
    },
    {
      q: "Funziona anche se uso ChatGPT o Gemini e non Claude?",
      a: "Il mindset e l'approccio che mostro valgono per qualsiasi strumento AI. Però il webinar è verticale su Claude per una ragione precisa: ad oggi è lo strumento che sta costruendo l'ecosistema più completo per lavorare davvero — Projects, CoWork mode, Skills, Plugin, Claude Code. Nessun altro tool ha un sistema così integrato per passare dalla semplice chat a workflow di lavoro reali. È lo strumento su cui ho 300+ ore e quello su cui costruisco ogni giorno.",
    },
    {
      q: "E se il 5 maggio non posso esserci?",
      a: "Il replay sarà disponibile per diverse settimane dopo il webinar. Iscriviti comunque: riceverai il link via email per guardarlo quando vuoi.",
    },
    {
      q: "Quanto dura?",
      a: "Circa un'ora. Inizio alle 18:00, fine stimata entro le 19:15.",
    },
    {
      q: "Dove si svolge?",
      a: "Su YouTube Live. Non devi scaricare nulla. Riceverai il link diretto via email dopo l'iscrizione.",
    },
    {
      q: "Chi è Matteo Arnaboldi?",
      a: "CEO e Co-Founder di Morfeus Hub, azienda che lavora con l'AI dal 2021. Docente H-FARM, formatore Il Sole 24 Ore e Talent Garden. +300 ore di utilizzo avanzato di Claude. Su LinkedIn lo seguono 16.000 professionisti.",
    },
  ];

  return (
    <section
      className={styles.sectionPad}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      <SectionLabel>Domande frequenti</SectionLabel>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "24px auto 56px auto",
          maxWidth: 820,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Tutto quello che <Accent>ti stai chiedendo</Accent>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820, margin: "0 auto", textAlign: "left" }}>
        {faqs.map((item) => (
          <details
            key={item.q}
            className={styles.faqItem}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <summary
              className={styles.faqSummary}
              style={{
                cursor: "pointer",
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(17px, 1.8vw, 19px)",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                className={styles.faqIcon}
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(235,122,46,0.12)",
                  border: "1px solid rgba(235,122,46,0.3)",
                  color: "var(--orange)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 1,
                  transition: "transform 0.2s ease",
                }}
              >
                +
              </span>
            </summary>
            <div
              style={{
                padding: "0 26px 22px 26px",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.88,
              }}
            >
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─── LOGOS ────────────────────────────────────────────────────────────────────

export function WebinarLogosSection() {
  const logos = [
    { src: "/loghi_bianchi_clienti/loghi_bianchi/H-FARM.png", alt: "H-FARM" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Sole_24_Ore.png", alt: "Il Sole 24 Ore" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Talent_Garden.png", alt: "Talent Garden" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Confcommercio.png", alt: "Confcommercio" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Asseprim.png", alt: "Asseprim" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/CNA.png", alt: "CNA" },
  ];

  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "44px 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Formazione e partnership
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px 52px",
          }}
        >
          {/* eslint-disable @next/next/no-img-element */}
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              style={{
                height: 68,
                width: "auto",
                display: "block",
                opacity: 0.40,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.40"; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BANNER ───────────────────────────────────────────────────────────────────

export function WebinarBannerSection() {
  return (
    <section
      style={{
        padding: "0 32px 80px",
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Ambient glow behind the image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(235,122,46,0.12) 0%, rgba(123,104,238,0.08) 50%, transparent 75%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <Image
        src="/locandina_logo_16-9_webinar_claude.webp"
        alt="Webinar gratuito — +300 ore di Claude. In una sera. — Matteo Arnaboldi, CEO Morfeus Hub — 5 Maggio ore 18:00"
        width={1120}
        height={626}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.04), 0 24px 64px -16px rgba(0,0,0,0.55), 0 48px 96px -32px rgba(0,0,0,0.40)",
        }}
      />
    </section>
  );
}

// ─── STICKY MOBILE CTA BAR ────────────────────────────────────────────────────

export function WebinarStickyBarSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [formsVisible, setFormsVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener("change", updateMobile);

    const visibleSet = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visibleSet.add(e.target.id);
          else visibleSet.delete(e.target.id);
        });
        setFormsVisible(visibleSet.size > 0);
      },
      { threshold: 0.1 }
    );

    const tryObserve = () => {
      ["form-hero", "form-final"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };
    tryObserve();
    const t = setTimeout(tryObserve, 300);

    return () => {
      mq.removeEventListener("change", updateMobile);
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("form-final") ?? document.getElementById("final-form-anchor");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - window.innerHeight * 0.32;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const show = isMobile && !formsVisible;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        background: "rgba(10,9,20,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)" as React.CSSProperties["WebkitBackdropFilter"],
        borderTop: "1px solid rgba(255,255,255,0.10)",
        zIndex: 200,
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <button
        type="button"
        onClick={scrollToForm}
        style={{
          width: "100%",
          padding: "17px",
          background: "var(--orange)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 16,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxSizing: "border-box",
          boxShadow: "0 4px 24px rgba(235,122,46,0.45)",
          animation: "btn-pulse 2.4s infinite",
        }}
      >
        Iscriviti gratis <span style={{ fontSize: 20 }}>→</span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
 * SALES PAGE (corso-claude) — 17 sezioni
 *
 * Step `/webinar-claude/corso` del funnel webinar-claude.
 * Maps 1:1 al doc master: copy/SALES_PAGE_CORSO_COMPLETA_V1.md
 * Tre varianti URL-driven live | replay | email selezionate via ?src=.
 * Cinque blocchi branchano per variante (hero, bridge, problem, urgency,
 * finalCTA) + la FAQ aggiunge un item per la coorte email. Tutti gli altri
 * blocchi sono identici fra varianti.
 * Le primitive Accent / Badge / SectionLabel sono quelle dichiarate sopra
 * (sezione webinar). PrimaryButton webinar è separato dal SalesV3PrimaryButton
 * — quest'ultimo aggiunge supporto href anchor + size "xl".
 * ═══════════════════════════════════════════════════════════════════════════════ */

// ─── Variant hook ─────────────────────────────────────────────────────────────

function isVariant(v: string | null): v is SalesV3Variant {
  return v === "live" || v === "replay" || v === "email";
}

function useSalesV3Variant(): SalesV3Variant {
  const [variant, setVariant] = useState<SalesV3Variant>("replay");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const src = sp.get("src");
    if (isVariant(src)) setVariant(src);
  }, []);
  return variant;
}

// ─── Pricing hook (auto-advances stage based on deadlines) ────────────────────

type PricingStage = "earlyBird" | "standard" | "full";
interface CurrentPricing {
  stage: PricingStage;
  price: number;
  checkoutUrl: string;
  activeDeadlineIso: string | null;
}

function useCurrentPricing(pricing: SalesV3PricingContent): CurrentPricing {
  const [now, setNow] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const earlyDeadline = useMemo(
    () => new Date(pricing.earlyBirdDeadlineIso).getTime(),
    [pricing.earlyBirdDeadlineIso]
  );
  const stdDeadline = useMemo(
    () => new Date(pricing.standardDeadlineIso).getTime(),
    [pricing.standardDeadlineIso]
  );

  if (!mounted) {
    return {
      stage: "earlyBird",
      price: pricing.earlyBirdPrice,
      checkoutUrl: pricing.checkoutUrlEarlyBird,
      activeDeadlineIso: pricing.earlyBirdDeadlineIso,
    };
  }
  if (now < earlyDeadline) {
    return {
      stage: "earlyBird",
      price: pricing.earlyBirdPrice,
      checkoutUrl: pricing.checkoutUrlEarlyBird,
      activeDeadlineIso: pricing.earlyBirdDeadlineIso,
    };
  }
  if (now < stdDeadline) {
    return {
      stage: "standard",
      price: pricing.standardPrice,
      checkoutUrl: pricing.checkoutUrlStandard,
      activeDeadlineIso: pricing.standardDeadlineIso,
    };
  }
  return {
    stage: "full",
    price: pricing.fullPrice,
    checkoutUrl: pricing.checkoutUrlFull,
    activeDeadlineIso: null,
  };
}

// ─── GA4 / Meta tracking helper ───────────────────────────────────────────────

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.dataLayer) w.dataLayer.push({ event: name, ...params });
  if (w.gtag) w.gtag("event", name, params);
}

function trackCheckoutClick(block: string, variant: SalesV3Variant, stage: PricingStage, price: number) {
  trackEvent("sales_cta_click", { block, variant, pricing_stage: stage, price });
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.fbq) w.fbq("track", "InitiateCheckout", { value: price, currency: "EUR", content_name: "corso-claude" });
  }
}

// ─── Scroll helpers ───────────────────────────────────────────────────────────

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const y = window.scrollY + rect.top - 40;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

// ─── Primitives ───────────────────────────────────────────────────────────────
// Accent, Badge, SectionLabel are reused from webinar-claude primitives
// (declared at the top of this same file).

function SalesV3PrimaryButton({
  children,
  onClick,
  href,
  type = "button",
  disabled,
  fullWidth,
  pulse,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  pulse?: boolean;
  size?: "md" | "lg" | "xl";
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  // Responsive padding/fontSize via clamp — su mobile auto-shrink
  const pad =
    size === "xl"
      ? "clamp(14px, 3.5vw, 22px) clamp(20px, 5vw, 36px)"
      : size === "lg"
        ? "clamp(14px, 3vw, 20px) clamp(18px, 4.5vw, 32px)"
        : "clamp(12px, 2.5vw, 16px) clamp(16px, 4vw, 24px)";
  const fs =
    size === "xl"
      ? "clamp(15px, 1.6vw, 18px)"
      : size === "lg"
        ? "clamp(15px, 1.5vw, 17px)"
        : "clamp(14px, 1.4vw, 16px)";

  const styleProps: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: fs,
    padding: pad,
    borderRadius: 10,
    border: "none",
    background: press ? "var(--orange-pressed)" : hover ? "var(--orange-hover)" : "var(--orange)",
    color: "#fff",
    boxShadow: hover ? "0 6px 28px rgba(235,122,46,0.5)" : "0 4px 20px rgba(235,122,46,0.35)",
    transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
    transition: "background .2s, box-shadow .2s, transform .2s",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.5 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: fullWidth ? "100%" : "auto",
    animation: pulse ? "btn-pulse 2.4s infinite" : "none",
    textDecoration: "none",
    boxSizing: "border-box",
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setPress(false); }}
        onMouseDown={() => setPress(true)}
        onMouseUp={() => setPress(false)}
        style={styleProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={styleProps}
    >
      {children}
    </button>
  );
}

function OutlineButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);
  const styleProps: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: 16,
    padding: "14px 22px",
    borderRadius: 10,
    border: `2px solid ${hover ? "var(--orange-hover)" : "var(--orange)"}`,
    background: hover ? "rgba(235,122,46,0.08)" : "transparent",
    color: "var(--orange)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "background .2s, border-color .2s",
    textDecoration: "none",
    boxSizing: "border-box",
  };
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={styleProps}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={styleProps}
    >
      {children}
    </button>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function CountdownCells({ targetIso, compact = false }: { targetIso: string; compact?: boolean }) {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div style={{ height: compact ? 36 : 96 }} />;

  const diff = Math.max(0, targetMs - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (diff <= 0) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 10,
          background: "rgba(235,122,46,0.12)",
          border: "1px solid rgba(235,122,46,0.35)",
          color: "var(--orange)",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "var(--font-body)",
        }}
      >
        Prezzo aggiornato — il prossimo step è attivo
      </div>
    );
  }

  // Responsive sizing: clamp values fluidly between mobile and desktop
  const cellSize = compact
    ? { fs: "clamp(20px, 5vw, 22px)", pad: "10px 12px", min: "clamp(48px, 14vw, 56px)", label: 9 }
    : { fs: "clamp(28px, 7vw, 44px)", pad: "clamp(12px, 3vw, 16px) clamp(12px, 3vw, 18px)", min: "clamp(58px, 16vw, 76px)", label: 11 };
  const Cell = ({ n, label }: { n: number; label: string }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--dusk)",
        border: "1px solid rgba(235,122,46,0.25)",
        borderRadius: 10,
        padding: cellSize.pad,
        minWidth: cellSize.min,
        boxShadow: compact ? "none" : "0 0 30px rgba(235,122,46,0.10)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: cellSize.fs,
          lineHeight: 1,
          color: "var(--orange)",
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {pad(n)}
      </span>
      <span
        style={{
          fontSize: cellSize.label,
          fontWeight: 700,
          color: "var(--muted)",
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          marginTop: 8,
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className={styles.timerRow}>
      {days > 0 && <Cell n={days} label="Giorni" />}
      <Cell n={hours} label="Ore" />
      <Cell n={mins} label="Min" />
      <Cell n={secs} label="Sec" />
    </div>
  );
}

function InlineTimer({ targetIso }: { targetIso: string }) {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!mounted) return <span>—</span>;
  const diff = Math.max(0, targetMs - now);
  if (diff <= 0) return <span style={{ color: "var(--orange)" }}>scaduto</span>;
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (d > 0) return <span style={{ fontVariantNumeric: "tabular-nums" }}>{d}g {pad(h)}:{pad(m)}:{pad(ss)}</span>;
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{pad(h)}:{pad(m)}:{pad(ss)}</span>;
}

// ─── Page-view tracker ────────────────────────────────────────────────────────

function SalesV3PageVariantTracker() {
  const variant = useSalesV3Variant();
  useEffect(() => {
    trackEvent("sales_view", { variant });
  }, [variant]);
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 0 — HEADER
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3HeaderSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const logoHeight = isMobile ? 13 : 16;

  return (
    <>
      <SalesV3PageVariantTracker />
      <header
        className={styles.header}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Image
          src="/logo/m-w2.png"
          alt="Morfeus"
          width={120}
          height={logoHeight}
          priority
          style={{ height: logoHeight, width: "auto", display: "block" }}
        />
      </header>
    </>
  );
}

// ─── Hero VSL (autoplay muted, facade pattern) ────────────────────────────────

function HeroVSL({ youtubeId, thumbnailSrc, title }: { youtubeId?: string; thumbnailSrc?: string; title?: string }) {
  const [mounted, setMounted] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  const isPlaceholder = !youtubeId || youtubeId === "PLACEHOLDER_VIDEO_ID";

  useEffect(() => {
    if (isPlaceholder) return;
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, [isPlaceholder]);

  function unmute() {
    const w = playerRef.current?.contentWindow;
    if (!w) return;
    w.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*");
    w.postMessage(JSON.stringify({ event: "command", func: "setVolume", args: [80] }), "*");
    setUnmuted(true);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 780,
        margin: "0 auto 40px",
        aspectRatio: "16 / 9",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(235,122,46,0.22), 0 24px 64px rgba(0,0,0,0.55)",
        border: "1px solid rgba(235,122,46,0.30)",
        background: "var(--dusk)",
      }}
    >
      {/* Iframe (lazy mounted to allow facade to paint first) */}
      {!isPlaceholder && mounted && (
        <iframe
          ref={playerRef}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title={title ?? "Video Sales Letter"}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            background: "#000",
          }}
        />
      )}

      {/* Facade thumbnail (visible until iframe mounts, or always for placeholder) */}
      {(!mounted || isPlaceholder) && (
        <div
          aria-label={title ?? "Video Sales Letter — anteprima"}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: thumbnailSrc ? `url(${thumbnailSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "var(--dusk)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* Dark vignette overlay so play button stays readable */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          {/* Play button */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: 92,
              height: 92,
              borderRadius: "50%",
              background: "var(--orange)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 14px 44px rgba(235,122,46,0.55)",
              animation: "btn-pulse 2.4s infinite",
            }}
          >
            <svg width="32" height="36" viewBox="0 0 32 36" fill="white" aria-hidden>
              <path d="M3 1 L29 18 L3 35 Z" />
            </svg>
          </div>
          {isPlaceholder && (
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                right: 14,
                textAlign: "center",
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              Video in arrivo — segnaposto
            </div>
          )}
        </div>
      )}

      {/* Unmute pill */}
      {!isPlaceholder && mounted && !unmuted && (
        <button
          type="button"
          onClick={unmute}
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            background: "rgba(0,0,0,0.78)",
            border: "1px solid rgba(255,255,255,0.20)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 100,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)" as React.CSSProperties["WebkitBackdropFilter"],
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          Riproduci con audio
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3HeroSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const content = step.content.SalesV3Hero as SalesV3HeroContent;
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const copy = content[variant];

  const onCheckout = () => trackCheckoutClick("hero", variant, current.stage, current.price);

  return (
    <section
      className={styles.salesHeroSection}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 90vw)",
          height: 320,
          background:
            "radial-gradient(ellipse, rgba(235,122,46,0.14) 0%, rgba(123,104,238,0.06) 40%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <Badge>{copy.badge}</Badge>
        {current.activeDeadlineIso && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.06em",
            }}
          >
            scade tra <span style={{ color: "var(--orange)", fontWeight: 700 }}><InlineTimer targetIso={current.activeDeadlineIso} /></span>
          </span>
        )}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(36px, 5.5vw, 64px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "0 auto 22px",
          maxWidth: 920,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {copy.headlinePre}
        <br />
        {copy.headlinePost}
        <br />
        <Accent>{copy.headlineAccent}</Accent>{copy.headlineEnd}
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.88,
          maxWidth: 720,
          margin: "0 auto 40px",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        {copy.subheadline}
      </p>

      {/* VSL */}
      <HeroVSL
        youtubeId={content.vslYoutubeId}
        thumbnailSrc={content.vslThumbnailSrc}
        title={content.vslTitle}
      />

      {/* Proof pill — moved between subheadline/VSL and CTA per v2 */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "6px 18px",
          padding: "10px 22px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 100,
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--ghost)",
          opacity: 0.92,
          marginBottom: 28,
          maxWidth: "100%",
        }}
      >
        {content.proofBar.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            {i > 0 && <span style={{ color: "var(--orange)", opacity: 0.7 }}>·</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <SalesV3PrimaryButton href={current.checkoutUrl} onClick={onCheckout} size="xl" pulse>
          {copy.ctaLabel} <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
      </div>

      <div
        style={{
          fontSize: 14,
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
          marginBottom: 28,
          lineHeight: 1.5,
        }}
      >
        {current.activeDeadlineIso && current.stage === "earlyBird" && (
          <>
            Prezzo sale a <strong style={{ color: "var(--orange)" }}>297€</strong> tra <strong style={{ color: "var(--orange)" }}><InlineTimer targetIso={current.activeDeadlineIso} /></strong>
            <br />
          </>
        )}
        {copy.microcopy}
      </div>

      {/* Price scale */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--muted)",
          padding: "12px 20px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 100,
          flexWrap: "wrap",
        }}
      >
        <PriceScalePill value="147€" label="early bird" active={current.stage === "earlyBird"} />
        <span style={{ color: "var(--muted)", opacity: 0.4 }}>→</span>
        <PriceScalePill value="297€" label="standard" active={current.stage === "standard"} />
        <span style={{ color: "var(--muted)", opacity: 0.4 }}>→</span>
        <PriceScalePill value="397€" label="prezzo pieno" active={current.stage === "full"} />
      </div>
    </section>
  );
}

function PriceScalePill({ value, label, active }: { value: string; label: string; active: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 6,
        fontWeight: active ? 700 : 500,
        color: active ? "var(--orange)" : "var(--muted)",
      }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{value}</span>
      <span style={{ textTransform: "uppercase", fontSize: 10, letterSpacing: "0.16em" }}>{label}</span>
      {active && <span style={{ marginLeft: 4, color: "var(--orange)" }}>● sei qui</span>}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — BRIDGE (variant-aware)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3BridgeSection() {
  const variant = useSalesV3Variant();

  const headline =
    variant === "email" ? (
      <>
        Stai usando Claude al 10% delle sue capacita&apos;.<br />
        E <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>non e&apos; colpa tua</span>.
      </>
    ) : (
      <>Hai visto cosa succede quando usi Claude <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>davvero</span>.</>
    );

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
      }}
    >
      {/* Full-bleed cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#2A2420",
              margin: 0,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            {headline}
          </h2>
        </div>

        {variant === "live" && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "#3A322B",
              paddingLeft: 24,
              borderLeft: "3px solid var(--orange)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p>Hai visto output che non sembravano generati da una macchina.</p>
            <p>Hai visto workflow che risparmiano ore, non minuti.</p>
            <p>Hai visto cosa cambia quando Claude ha il contesto giusto.</p>
            <p>Hai visto la differenza tra fare domande all&apos;AI e avere un sistema che lavora con te.</p>
            <p style={{ marginTop: 16, color: "#2A2420", fontWeight: 500 }}>Adesso hai due strade.</p>
            <p>Tornare a usarlo come prima.</p>
            <p>Oppure imparare il sistema che hai visto in azione.</p>
          </div>
        )}

        {variant === "replay" && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "#3A322B",
              paddingLeft: 24,
              borderLeft: "3px solid var(--orange)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p>Nel webinar hai visto la differenza tra fare domande all&apos;AI e avere un sistema che lavora con te.</p>
            <p>Hai visto output che non sembravano generati da una macchina.</p>
            <p>Hai visto workflow che risparmiano ore, non minuti.</p>
            <p>Hai visto cosa cambia quando Claude ha il contesto giusto.</p>
            <p style={{ marginTop: 16, color: "#2A2420", fontWeight: 500 }}>Adesso hai due strade.</p>
            <p>
              Tornare a usarlo come prima: una domanda ogni tanto, un testo ogni tanto, quella sensazione che &ldquo;per il mio lavoro non funziona&rdquo;.
            </p>
            <p style={{ marginTop: 12 }}>
              Oppure imparare il sistema che hai visto in azione. Strutturato in 10 moduli. Costruito per chi parte da zero o da &ldquo;ci ho provato ma non ha funzionato&rdquo;.
            </p>
          </div>
        )}

        {variant === "email" && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "#3A322B",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 640,
              marginInline: "auto",
            }}
          >
            <p>
              La maggior parte dei professionisti usa Claude come un Google piu&apos; intelligente. Fa domande. Ottiene risposte generiche. Pensa &ldquo;bah, niente di speciale&rdquo;.
            </p>
            <p>
              Ma Claude non e&apos; un motore di ricerca. E&apos; uno strumento che puo&apos; lavorare CON te, ogni giorno, su ogni progetto, nel tuo ambiente di lavoro.
            </p>
            <p>Il problema e&apos; che nessuno ti ha mai mostrato come si fa.</p>
            <p>I tutorial su YouTube ti insegnano dove cliccare.</p>
            <p>I prompt copiati da Twitter funzionano una volta.</p>
            <p>
              I corsi &ldquo;AI&rdquo; parlano di tutto e non ti insegnano nulla di applicabile al tuo lunedi&apos; mattina.
            </p>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                color: "#2A2420",
              }}
            >
              Questo corso e&apos; diverso.
            </p>
            <p>
              10 moduli. Un metodo. Un sistema che costruisci pezzo per pezzo, calibrato sul tuo lavoro, non su demo generiche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2.5 — I TRE LIVELLI (v2)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3ThreeLevelsSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "three-levels", variant });
    scrollToId("offerta");
  };

  return (
    <section
      className={`${styles.salesSectionPadV2} ${styles.sectionDarkMidBg}`}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <SectionLabel>Il cambiamento</SectionLabel>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(30px, 4.2vw, 48px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 18px",
          maxWidth: 820,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Il tuo modo di lavorare sta diventando obsoleto.
        <br />
        Non è una previsione. <Accent>È già in corso</Accent>.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.88,
          margin: "0 auto 56px",
          maxWidth: 700,
          textAlign: "center",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        La maggior parte dei professionisti è ferma al Livello 1.
        Il corso ti porta al <Accent>Livello 2</Accent>.
        E ti fa vedere dove porta il Livello 3.
      </p>

      <div className={styles.threeLevelsGrid}>
        <SalesV3LevelCard
          n="1"
          tag="LIVELLO 1"
          title="Fai tutto tu."
          body="Ogni task passa da te. Ogni decisione. Ogni output. Hai provato l'AI — una domanda, una risposta, copia e incolla. Funziona? Sì. Ma il collo di bottiglia sei ancora tu. Sempre."
          footer="Qui è fermo il 95% dei professionisti."
          variant="neutral"
        />
        <SalesV3LevelCard
          n="2"
          tag="LIVELLO 2"
          title="L'AI lavora con te."
          body="Sai come usarla davvero. Le dai contesto, la guidi, la correggi. L'output è al tuo standard. Risparmi 5-8 ore ogni settimana su lavoro che prima facevi a mano. Il tuo tempo torna ad essere tuo."
          footer="Questo è dove ti porta Claude Unlocked."
          variant="primary"
          badge="DOVE TI PORTA QUESTO CORSO"
        />
        <SalesV3LevelCard
          n="3"
          tag="LIVELLO 3"
          title="L'AI lavora per te."
          body="Hai un sistema. Claude conosce il tuo contesto, segue le tue regole, produce al tuo standard senza che tu debba ricominciare da zero ogni volta. Non è un assistente. È un membro del team. Un dipendente AI che lavora con te ogni giorno."
          footer="Questo è dove ti porta il Bootcamp AI Champion."
          variant="violet"
          badge="IL PASSO SUCCESSIVO"
        />
      </div>

      <p
        style={{
          marginTop: 56,
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.92,
          textAlign: "center",
          maxWidth: 720,
          marginInline: "auto",
        }}
      >
        Il corso è il primo step. <strong style={{ color: "#fff" }}>Il Livello 2 è il prerequisito.</strong>
        <br />
        Non puoi costruire un sistema AI senza padroneggiare lo strumento prima.
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 36 }}>
        <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
          Voglio iniziare dal Livello 2 <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          {current.price}€ oggi · Accesso immediato
        </div>
      </div>
    </section>
  );
}

function SalesV3LevelCard({
  n,
  tag,
  title,
  body,
  footer,
  variant,
  badge,
}: {
  n: string;
  tag: string;
  title: string;
  body: string;
  footer: string;
  variant: "neutral" | "primary" | "violet";
  badge?: string;
}) {
  const palette = {
    neutral: {
      border: "1px solid rgba(255,255,255,0.08)",
      borderTop: "3px solid rgba(255,255,255,0.18)",
      bg: "var(--deep-space)",
      tagColor: "var(--muted)",
      titleColor: "var(--ghost)",
      footerColor: "var(--muted)",
      glow: "none",
    },
    primary: {
      border: "1px solid rgba(235,122,46,0.40)",
      borderTop: "3px solid var(--orange)",
      bg: "linear-gradient(180deg, rgba(235,122,46,0.06) 0%, var(--deep-space) 100%)",
      tagColor: "var(--orange)",
      titleColor: "#fff",
      footerColor: "var(--orange)",
      glow: "0 0 50px rgba(235,122,46,0.18)",
    },
    violet: {
      border: "1px solid rgba(123,104,238,0.40)",
      borderTop: "3px solid var(--violet)",
      bg: "linear-gradient(180deg, rgba(123,104,238,0.06) 0%, var(--deep-space) 100%)",
      tagColor: "var(--violet)",
      titleColor: "#fff",
      footerColor: "var(--violet)",
      glow: "0 0 40px rgba(123,104,238,0.15)",
    },
  }[variant];

  return (
    <div style={{ position: "relative", paddingTop: badge ? 24 : 0 }}>
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 14px",
            background: variant === "primary" ? "var(--orange)" : "var(--violet)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            borderRadius: 100,
            whiteSpace: "nowrap",
            boxShadow: `0 6px 20px ${variant === "primary" ? "rgba(235,122,46,0.45)" : "rgba(123,104,238,0.40)"}`,
            zIndex: 2,
          }}
        >
          {badge}
        </span>
      )}
      <div
        style={{
          background: palette.bg,
          border: palette.border,
          borderTop: palette.borderTop,
          borderRadius: 16,
          padding: "32px 26px 28px",
          boxShadow: palette.glow,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: palette.tagColor,
              fontFamily: "var(--font-body)",
            }}
          >
            {tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 56,
              lineHeight: 1,
              color: palette.tagColor,
              opacity: 0.18,
              letterSpacing: "-0.04em",
            }}
          >
            {n}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.2vw, 26px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: palette.titleColor,
            margin: 0,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.88,
            margin: 0,
            flex: 1,
          }}
        >
          {body}
        </p>
        <p
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: 15,
            lineHeight: 1.5,
            color: palette.footerColor,
            margin: 0,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {footer}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — PROBLEMA + COSTO NON AGIRE (variant-aware: compresso/medio/esteso)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3ProblemSection() {
  const variant = useSalesV3Variant();

  const headline =
    variant === "email" ? (
      <>
        Se hai provato l&apos;AI e hai pensato &ldquo;non fa per me&rdquo;, <Accent>leggi questo</Accent>.
      </>
    ) : (
      <>Il problema che non si risolve da solo.</>
    );

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 760,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <SectionLabel>Il problema</SectionLabel>
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(30px, 4.2vw, 46px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 36px",
          maxWidth: 760,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {headline}
      </h2>

      {variant === "live" && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.8,
            color: "var(--ghost)",
            opacity: 0.92,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          <p>Lo sai gia&apos;. L&apos;hai visto nel webinar.</p>
          <p>
            Ogni settimana perdi ore in task che l&apos;AI potrebbe fare in minuti. I tuoi colleghi che hanno un sistema fanno in 20 minuti quello che tu fai in 3 ore.
          </p>
          <p>Piu&apos; aspetti, piu&apos; il gap si allarga.</p>
        </div>
      )}

      {variant === "replay" && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.8,
            color: "var(--ghost)",
            opacity: 0.92,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          <p>Lo sai gia&apos;. Non serve che te lo spieghi.</p>
          <p>
            Ogni settimana perdi ore in task che l&apos;AI potrebbe fare in minuti. Scrivi email da zero. Prepari presentazioni da zero. Fai ricerche copiando e incollando. Rileggi, correggi, riformuli — manualmente.
          </p>
          <p>
            Nel frattempo, i tuoi colleghi che hanno capito come usare Claude fanno in 20 minuti quello che tu fai in 3 ore. Non perche&apos; siano piu&apos; bravi. Perche&apos; hanno un sistema. Tu no.
          </p>
          <p>E piu&apos; aspetti, piu&apos; il gap si allarga.</p>
        </div>
      )}

      {variant === "email" && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.8,
            color: "var(--ghost)",
            opacity: 0.92,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          {/* Riconoscimento */}
          <p>
            Hai scaricato ChatGPT. O hai provato Claude. Hai fatto qualche domanda. Hai ottenuto risposte che avresti potuto trovare su Google.
          </p>
          <p>Hai pensato: &ldquo;Ok, carino. Ma per il mio lavoro non cambia nulla.&rdquo;</p>
          <p style={{ fontStyle: "italic", color: "#fff" }}>E hai ragione. A quel livello, non cambia nulla.</p>

          {/* Diagnosi */}
          <p
            style={{
              marginTop: 20,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 22,
              color: "#fff",
            }}
          >
            Ecco cosa sta succedendo davvero.
          </p>
          <p>
            La maggior parte delle persone usa l&apos;AI al Livello 1: domanda/risposta. Utile, ma non trasformativo.
          </p>
          <p>
            Al <Accent>Livello 2</Accent> — quello a cui arriva dopo il corso — hai un partner di lavoro che conosce il tuo business, i tuoi clienti, il tuo modo di lavorare, e ti produce output come li faresti tu. Ma meglio. E in un decimo del tempo.
          </p>
          <p>
            Il 95% delle persone non supera mai il Livello 1. Non perche&apos; siano stupide. Perche&apos; nessuno gli ha mai mostrato che i livelli successivi esistono.
          </p>
          <p>
            I tutorial YouTube? Ti insegnano feature. I corsi &ldquo;AI&rdquo;? Ti parlano di 15 strumenti diversi. I prompt copiati da Twitter? Funzionano una volta.
          </p>
          <p>
            Nessuno di questi ti insegna un metodo. Un sistema che funziona lunedi&apos; mattina, quando apri il laptop e devi lavorare davvero.
          </p>

          {/* Costo dell'inazione */}
          <p
            style={{
              marginTop: 20,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 22,
              color: "#fff",
            }}
          >
            Nel frattempo, chi ha capito come funziona davvero sta risparmiando 5-8 ore a settimana.
          </p>
          <p>
            Fa ricerche in 10 minuti, non in 2 ore. Scrive email, report, presentazioni in un quarto del tempo. Ha un collega digitale che conosce i suoi clienti, il suo settore, il suo tono di voce.
          </p>
          <p>
            Non perche&apos; siano piu&apos; bravi di te. Perche&apos; hanno un sistema. Tu non ancora.
          </p>
          <p>
            E ogni settimana che aspetti, il gap si allarga. Tra sei mesi non avrai &ldquo;piu&apos; tempo per imparare&rdquo;. Avrai meno tempo, piu&apos; concorrenza, e lo stesso problema — solo piu&apos; grande.
          </p>
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — MECCANISMO / METODO (3 step + effetti collaterali)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3MechanismSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "mechanism", variant });
    scrollToId("offerta");
  };
  const steps = [
    {
      n: "01",
      title: "Prima il pensiero, poi lo strumento.",
      body: (
        <>
          Il Modulo 0 non si chiama &ldquo;Come usare Claude&rdquo;. Si chiama &ldquo;Come ragionare con l&apos;AI&rdquo;.
          <br />
          <br />
          Prima di aprire lo strumento, impari il Framework <strong style={{ color: "#1A1814" }}>T/Q/D</strong>: quali task <strong style={{ color: "#1A1814" }}>delegare</strong> completamente a Claude, quali <strong style={{ color: "#1A1814" }}>tenere</strong> perché richiedono il tuo giudizio, quali <strong style={{ color: "#1A1814" }}>verificare</strong> insieme prima di usarli.
          <br />
          <br />
          In 10 minuti sai già cosa chiedere, come chiederlo, e perché il 95% delle persone ottiene risposte generiche.
          <br />
          <br />
          <span style={{ color: "#C85A15", fontStyle: "italic" }}>questa è la parte più importante</span>
        </>
      ),
    },
    {
      n: "02",
      title: "Dal setup al sistema personalizzato.",
      body: (
        <>
          Moduli 1-6: non impari le feature. Costruisci il <strong style={{ color: "#1A1814" }}>TUO</strong> ambiente di lavoro.
          Projects con le TUE istruzioni. Contesto che riflette il TUO business. Skill che automatizzano i TUOI task ripetitivi.
          <br />
          Non è un corso generico su &ldquo;l&apos;AI&rdquo;. È il tuo Claude, configurato per il tuo lavoro.
        </>
      ),
    },
    {
      n: "03",
      title: "Metodo che resta, anche quando lo strumento cambia.",
      body: (
        <>
          Workflow reali, progetti complessi, sicurezza. Il <strong style={{ color: "#1A1814" }}>70%</strong> di quello
          che impari si applica a qualsiasi AI. I tool cambiano ogni 6 mesi. Il metodo no.
          <br />
          È la differenza tra imparare a guidare e imparare dove sono i bottoni di una macchina specifica.
        </>
      ),
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
      }}
    >
      {/* Full-bleed cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--orange)",
              padding: "6px 14px",
              background: "rgba(235,122,46,0.10)",
              border: "1px solid rgba(235,122,46,0.30)",
              borderRadius: 100,
            }}
          >
            Il metodo
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#2A2420",
            margin: "16px auto 24px",
            maxWidth: 880,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Perché questo corso <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>funziona</span> dove gli altri falliscono.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "#3A322B",
            margin: "0 auto 56px",
            maxWidth: 760,
            textAlign: "center",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          La maggior parte dei corsi AI ti insegna dove cliccare. Funziona per la demo. Non funziona per il lunedi&apos; mattina.
          <br />
          <br />
          Dopo due settimane sei punto e a capo, perche&apos; sapere dove si trova un bottone non e&apos; sapere COME lavorare con l&apos;intelligenza artificiale.
          <br />
          <br />
          Questo corso e&apos; costruito al contrario.
        </p>

        <div className={styles.stepGrid}>
          {steps.map((s) => (
            <MechanismStepCard key={s.n} n={s.n} title={s.title} body={s.body} />
          ))}
        </div>

        {/* Inline CTA — desktop only */}
        <div className={styles.ctaDesktopOnly} style={{ marginTop: 56 }}>
          <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
            Voglio questo metodo — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
          </SalesV3PrimaryButton>
          <div style={{ fontSize: 12, color: "#6B5E54", fontFamily: "var(--font-body)" }}>
            Pagamento sicuro · Accesso immediato
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4.4 — EFFETTI COLLATERALI (sezione dedicata, dopo "Il metodo")
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3EffettiCollateraliSection() {
  const effetti = [
    "Il tuo capo ti chiede com'è che consegni prima degli altri. Non c'è una risposta breve.",
    "I colleghi ti mandano messaggi chiedendo “come hai fatto quel documento?” Inizi a non sapere da dove iniziare a spiegare.",
    "Ti propongono il ruolo di referente AI del team. Non l'avevi chiesto.",
    "I clienti ti descrivono ai loro contatti come “la persona più preparata con cui abbia mai lavorato.” Non sanno cosa c'è dietro.",
    "Guardi il calendario e realizzi che hai spazio per un cliente nuovo. Non hai lavorato un'ora in più.",
    "Il tuo commercialista ti chiede se hai assunto qualcuno. Non hai assunto nessuno.",
    "La domenica sera non ha più quella sensazione. Sai già che il sistema regge. Lunedì è un giorno come gli altri.",
    "Non riesci più a capire come lavoravi prima. Non nel senso che hai dimenticato. Nel senso che ti sembra impossibile.",
    "Smetti di chiederti se l'AI ti sostituirà. Sei tu che decidi cosa fare e cosa delegare. La domanda cambia.",
    "Non riesci più a lavorare senza Claude aperto. Non per dipendenza. Per standard.",
  ];

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 880,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Wrapper card con accent viola — coerente col vecchio sotto-blocco */}
      <div
        style={{
          padding: "clamp(36px, 5vw, 56px) clamp(28px, 4vw, 48px)",
          background:
            "linear-gradient(180deg, rgba(123,104,238,0.09) 0%, rgba(123,104,238,0.02) 100%)",
          border: "1px solid rgba(123,104,238,0.25)",
          borderRadius: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative violet glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(123,104,238,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 12 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--violet)",
              fontFamily: "var(--font-body)",
              padding: "6px 14px",
              background: "rgba(123,104,238,0.18)",
              border: "1px solid rgba(123,104,238,0.40)",
              borderRadius: 100,
            }}
          >
            Avvertenza
          </span>
        </div>

        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.5vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "16px auto 18px",
            maxWidth: 720,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Effetti <Accent>collaterali</Accent>.
        </h2>

        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.88,
            margin: "0 auto 36px",
            maxWidth: 640,
            textAlign: "center",
          }}
        >
          Questi sono gli effetti collaterali riportati da chi ha completato il sistema.
          <br />
          Non li abbiamo promessi. <strong style={{ color: "#fff" }}>Continuano ad arrivare.</strong>
        </p>

        {/* Lista effetti */}
        <ul
          style={{
            position: "relative",
            zIndex: 1,
            margin: "0 auto",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.95,
            maxWidth: 720,
          }}
        >
          {effetti.map((e, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span
                style={{
                  color: "var(--orange)",
                  flexShrink: 0,
                  fontWeight: 700,
                  marginTop: 1,
                }}
              >
                →
              </span>
              <span>{e}</span>
            </li>
          ))}
        </ul>

        {/* Footer didascalico */}
        <p
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 36,
            paddingTop: 24,
            borderTop: "1px solid rgba(123,104,238,0.18)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--muted)",
            textAlign: "center",
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          Effetti riportati da professionisti nei settori: marketing, legale, HR, consulenza, architettura, finanza.
          <br />
          <strong style={{ color: "var(--ghost)" }}>Nessuno di loro era un programmatore.</strong>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4.5 — BENEFITS / COSA CAMBIA DOPO IL CORSO (4 card, grid 2x2)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3BenefitsSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "benefits", variant });
    scrollToId("offerta");
  };
  const benefits = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Risparmi 5-8 ore a settimana.",
      body: "Francesca preparava i suoi report in 4 ore. Adesso in 40 minuti — e Claude conosce gia' la sua voce, i suoi clienti, il suo formato. Il corso si ripaga la prima settimana.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      title: "L'output esce gia' come lo faresti tu.",
      body: "Claude conosce il tuo tono, il tuo settore, i tuoi clienti, le tue regole di stile. Scrivi “fammi il report” e il report esce gia' nel tuo standard. Non devi correggere il registro ogni volta.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      title: "Smetti di chiederti “mi sostituira'?”.",
      body: "Capisci come funziona, cosa puo' fare, cosa non puo' fare. La domanda smette di essere “mi ruba il lavoro?” e diventa “cosa gli delego oggi?”.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 7h4l2-3h6l2 3h4v13H3z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      ),
      title: "Non riparte da zero ogni conversazione.",
      body: "Configuri il tuo ambiente una volta. Claude si ricorda il contesto, le tue regole, i tuoi clienti. Ogni conversazione riparte da dove l'hai lasciata — non da un foglio bianco.",
    },
  ];

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Subtle violet ambient glow to differentiate from orange-heavy sections */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(123,104,238,0.08) 0%, rgba(101,88,212,0.04) 50%, transparent 75%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(32px, 4.5vw, 50px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 56px",
          maxWidth: 880,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Cosa cambia <Accent>dopo il corso</Accent>.
      </h2>

      <div className={styles.benefitsGridV2}>
        {benefits.map((b, i) => (
          <BenefitCard key={i} {...b} />
        ))}
      </div>

      {/* Inline CTA — desktop only */}
      <div className={styles.ctaDesktopOnly} style={{ marginTop: 56 }}>
        <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
          Voglio questi cambiamenti — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Pagamento sicuro · Accesso immediato
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "26px 26px",
        background: hover ? "rgba(123,104,238,0.06)" : "var(--deep-space)",
        border: `1px solid ${hover ? "rgba(123,104,238,0.30)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        transition: "background .25s, border-color .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "rgba(123,104,238,0.12)",
          border: "1px solid rgba(123,104,238,0.25)",
          display: "grid",
          placeItems: "center",
          color: "var(--violet)",
          marginBottom: 18,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 19,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: "#fff",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.85,
          margin: 0,
          flex: 1,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function MechanismStepCard({ n, title, body }: { n: string; title: string; body: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "32px 30px",
        background: hover ? "#FFFCF5" : "#FBF7EE",
        border: `1px solid ${hover ? "rgba(200,90,21,0.35)" : "rgba(42,36,32,0.10)"}`,
        borderRadius: 16,
        transition: "background .25s, border-color .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        overflow: "hidden",
        boxSizing: "border-box",
        height: "100%",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 14px rgba(42,36,32,0.06)",
      }}
    >
      {/* Watermark numero */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -16,
          right: 8,
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(80px, 18vw, 130px)",
          lineHeight: 1,
          color: "var(--orange)",
          opacity: 0.12,
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {n}
      </span>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        Step {n}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          color: "#2A2420",
          margin: "0 0 14px",
          position: "relative",
          zIndex: 1,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.65,
          color: "#3A322B",
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4.6 — PROMISE LETTER (future pacing — Matteo to reader)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3PromiseLetterSection() {
  // Subtle italic-orange highlight (re-using webinar letter visual language)
  const H = ({ children }: { children: React.ReactNode }) => (
    <span
      style={{
        fontFamily: "var(--font-italic)",
        fontStyle: "italic",
        fontWeight: 600,
        color: "#C85A15",
        backgroundImage: "linear-gradient(to bottom, transparent 82%, rgba(200,90,21,0.25) 82%)",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </span>
  );

  const paragraphs: React.ReactNode[] = [
    <>So cosa stai pensando mentre leggi questa pagina.</>,
    <>&ldquo;Magari funziona. Ma io ho già provato.&rdquo;</>,
    <>Hai già aperto Claude decine di volte. Hai scritto prompt. Hai guardato tutorial. Hai copiato template che sembravano buoni. E dopo una settimana eri esattamente nello stesso posto. Tu, davanti allo schermo, a correggere output che non erano tuoi.</>,
    <>Non è un tuo fallimento. È che ti mancava <H>il pezzo che fa tenere insieme tutto il resto</H>.</>,
    <>Me ne sono accorto una sera. Erano le undici. Stavo ancora lavorando su un report che avrei dovuto finire nel pomeriggio. Avevo usato Claude. Avevo &ldquo;automatizzato&rdquo;. Ma ero ancora lì, a correggere, a riscrivere, a chiedermi perché non capiva cosa volevo.</>,
    <>Quella sera ho smesso di cercare il prompt migliore. E <H>ho iniziato a costruire il sistema</H>.</>,
    <>Sei mesi dopo, ti scrivo da un posto diverso.</>,
    <>Non da un posto facile, devo dirtelo. C&apos;è stato un momento in cui ho realizzato quanto tempo avevo sprecato. Quanto potenziale avevo lasciato sul tavolo. Fa male, quella realizzazione.</>,
    <>Ma quello che è venuto dopo vale più di qualsiasi cosa avessi fatto nei due anni precedenti.</>,
    <>Stamattina il mio capo mi ha chiesto come faccio a produrre così tanto. Ho sorriso. Non sapevo da dove iniziare a spiegare.</>,
    <>La settimana scorsa un cliente mi ha detto che non ha mai lavorato con qualcuno così preparato. Non sa cosa c&apos;è dietro.</>,
    <>Non sono diventato più intelligente. Non lavoro più ore. Ho solo <H>smesso di ricominciare da zero ogni giorno</H>.</>,
    <>Sai qual è la cosa più strana? Non mi ricordo più com&apos;era lavorare senza. Non nel senso che ho dimenticato. Nel senso che ci provo, e non riesco a capire come facevo. Come perdevo ore su cose che adesso si fanno da sole. Come portavo a casa quella stanchezza la sera. Come mi svegliavo già in ritardo.</>,
    <>Lo so che hai paura.</>,
    <>Paura che non funzioni, che anche questa sia una promessa vuota.</>,
    <>Ma sai cosa non ti dicono mai? Che hai paura anche se funziona. Paura di quello che succede dopo. Di dover cambiare abitudini radicate. Di diventare la persona a cui gli altri chiedono aiuto.</>,
    <>Entrambe le paure sono reali.</>,
    <>Ma c&apos;è una terza paura, quella che non fa rumore: restare uguale. Tra uno, due, cinque anni. Stesso laptop, stesso lavoro, stessa sensazione di correre senza arrivare. <H>Quella paura non grida. Consuma.</H></>,
    <>L&apos;unica differenza tra dove sei tu adesso e dove sono io è questa: a un certo punto ho smesso di aspettare il momento in cui sarei stato pronto.</>,
    <>Nessuno è mai pronto. <H>Si inizia. E si diventa.</H></>,
  ];

  return (
    <section
      className={styles.sectionPadLg}
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(235,122,46,0.06), transparent 60%), linear-gradient(180deg, rgba(15,14,26,0.0) 0%, rgba(25,21,35,0.35) 8%, rgba(25,21,35,0.35) 92%, rgba(15,14,26,0.0) 100%)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
        {/* The paper */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #F5EFE4 0%, #EFE7D8 100%)",
            color: "#2A2420",
            padding: "clamp(48px, 7vw, 88px) clamp(32px, 6vw, 80px)",
            borderRadius: 4,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -20px rgba(0,0,0,0.55), 0 60px 120px -40px rgba(0,0,0,0.45)",
          }}
        >
          {/* Ruled lines */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "repeating-linear-gradient(180deg, transparent 0 31px, rgba(42,36,32,0.035) 31px 32px)",
              borderRadius: 4,
              mixBlendMode: "multiply",
            }}
          />

          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              color: "#6B5E54",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span>Una lettera</span>
            <span>Dal tuo io di tra 6 mesi</span>
          </div>

          {/* Salutation */}
          <div
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.3,
              color: "#2A2420",
              opacity: 0.65,
              marginBottom: 36,
              position: "relative",
              zIndex: 1,
              letterSpacing: "0.01em",
            }}
          >
            A me, oggi.
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative", zIndex: 1 }}>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-italic)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(17px, 1.55vw, 19px)",
                  lineHeight: 1.78,
                  color: "#2A2420",
                  margin: 0,
                  textWrap: "pretty" as React.CSSProperties["textWrap"],
                  letterSpacing: "0.005em",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div style={{ marginTop: 56, position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: 1.1,
                color: "#2A2420",
                letterSpacing: "0.01em",
                transform: "rotate(-2deg)",
                transformOrigin: "left center",
                marginBottom: 14,
                display: "inline-block",
              }}
            >
              Il tuo io di tra 6 mesi
            </div>
          </div>

          {/* P.S. */}
          <div
            style={{
              marginTop: 36,
              paddingTop: 24,
              borderTop: "1px solid rgba(42, 36, 32, 0.15)",
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.45vw, 18px)",
              lineHeight: 1.7,
              color: "#2A2420",
              opacity: 0.85,
              letterSpacing: "0.005em",
            }}
          >
            <strong style={{ fontStyle: "normal", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B5E54", marginRight: 10 }}>
              P.S.
            </strong>
            La prima settimana penserai di non star facendo abbastanza. È normale. Continua.
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — COSA C'È DENTRO (10 moduli)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3ModulesSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "modules", variant });
    scrollToId("offerta");
  };

  const modules = [
    {
      n: "00",
      title: "Come ragionare con l'AI",
      outcome: "Dopo questo modulo sai esattamente cosa chiedere a Claude e perché — prima ancora di aprirlo. Hai un framework che usi per sempre, su qualsiasi AI.",
      topics: [
        "Il Framework T/Q/D: delega, tieni, verifica — la decisione in 10 secondi",
        "L'errore #1 di chi ottiene risposte generiche (e come evitarlo da subito)",
        "Come trattare l'AI come un collega, non come un motore di ricerca",
      ],
    },
    {
      n: "01",
      title: "Setup e primi passi",
      outcome: "Account, piano, interfaccia. Se vieni da ChatGPT, la migrazione e' coperta. In 15 minuti sei operativo.",
      topics: [
        "Account, piani, differenze fra Free e Pro",
        "L'interfaccia di Claude spiegata sezione per sezione",
        "Migrazione da ChatGPT: cosa cambia, cosa resta",
        "Settings essenziali e shortcut da imparare subito",
      ],
    },
    {
      n: "02",
      title: "Chat: usare Claude ogni giorno",
      outcome: "Input vocale (3x piu' veloce), prompting pratico, artifacts, analisi immagini, PDF e dati. Il modulo che usi dal giorno 1.",
      topics: [
        "Input vocale: 3x più veloce della tastiera",
        "Prompting pratico (no \"prompt magici\", solo struttura)",
        "Artifacts: documenti che si modificano in tempo reale",
        "Analisi immagini, PDF e dati allegati",
      ],
    },
    {
      n: "03",
      title: "Projects: il tuo Claude specializzato",
      outcome: "Dopo questo modulo hai un Claude che ti conosce. Non devi più spiegare chi sei, come parli, a chi ti rivolgi. Lo sa già.",
      topics: [
        "Configuri un Project per ogni ruolo, cliente o tipo di lavoro",
        "Costruisci la tua knowledge base: settore, tono, clienti, regole",
        "3 Project reali di Matteo e Alex — copiali e adattali al tuo lavoro",
      ],
    },
    {
      n: "04",
      title: "CoWork: Claude come collega",
      outcome: "La funzionalita' che cambia tutto. Claude lavora sui tuoi file, i tuoi documenti, le tue presentazioni. Non in una chat — nel tuo ambiente di lavoro.",
      topics: [
        "Setup di CoWork mode passo per passo",
        "Lavorare su documenti, presentazioni, fogli di calcolo",
        "Gestire più file insieme",
        "Limiti, best practice e cose da NON fare",
      ],
    },
    {
      n: "05",
      title: "Il segreto della qualità: dare contesto",
      outcome: "Dopo questo modulo Claude ti migliora ogni giorno. Non riparte da zero a ogni conversazione. Ti ricorda. Evolve con te.",
      topics: [
        "Istruzioni stratificate: cosa dici una volta sola e cosa aggiorni",
        "Il tuo stile, tono e lessico codificati in modo permanente",
        "Come aggiornare il contesto quando il tuo lavoro cambia",
      ],
    },
    {
      n: "06",
      title: "Skills, plugin, connettori e MCP",
      outcome: "Installa capacita' pre-costruite con un click. Crea le tue. Collega Claude ai tuoi strumenti esterni con connettori e MCP server. Il modulo dove Claude diventa un sistema, non un chatbot.",
      topics: [
        "Skill marketplace: installazioni in 1 click",
        "Costruire le tue skill custom (senza codice)",
        "Connettori: Google Drive, Gmail, Calendar, Notion",
        "MCP server: collegare Claude a strumenti aziendali e API custom",
        "Esempi business: report, analisi, pipeline",
      ],
    },
    {
      n: "07",
      title: "Workflow: dal problema al risultato",
      outcome: "Dopo questo modulo smetti di \"provare Claude\" e inizi a lavorare con Claude. Use case reali sul tuo tipo di lavoro — non demo.",
      topics: [
        "Ricerca strutturata che produce sintesi usabili, non riassunti",
        "Contenuti che escono già nel tuo brand voice",
        "Documenti complessi (offerte, report, contratti) costruiti in sessione",
        "Presentazioni complete da un brief grezzo",
      ],
    },
    {
      n: "08",
      title: "Plan & Solve: progetti complessi",
      outcome: "Il metodo per affrontare qualsiasi progetto: pianifica prima, esegui dopo. Due sistemi (Planner + Executor) che lavorano insieme.",
      topics: [
        "Sistema Planner: scomporre prima di muoversi",
        "Sistema Executor: eseguire un piano già strutturato",
        "Quando usare quale (errore costoso da evitare)",
        "Recupero da errori e iterazione efficiente",
      ],
    },
    {
      n: "09",
      title: "Sicurezza, privacy e prossimi passi",
      outcome: "Cosa condividere, cosa no. Come restare aggiornati. La visione di dove stai andando: il tuo team AI.",
      topics: [
        "Cosa puoi condividere con Claude (e cosa NON)",
        "Privacy reale del piano Pro vs versione gratuita",
        "Come restare aggiornati senza impazzire",
        "La visione: il tuo team AI nei prossimi 12 mesi",
      ],
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
      }}
    >
      {/* Full-bleed cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
        <Image
          src="/claude-unlocked/logo-full-black.png"
          alt="Claude Unlocked"
          width={1980}
          height={860}
          style={{
            display: "block",
            height: "auto",
            width: "min(120px, 28vw)",
            margin: "0 auto 14px",
          }}
        />
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--orange)",
              padding: "6px 14px",
              background: "rgba(235,122,46,0.10)",
              border: "1px solid rgba(235,122,46,0.30)",
              borderRadius: 100,
            }}
          >
            Il programma
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#2A2420",
            margin: "16px auto 18px",
            maxWidth: 880,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          10 moduli. 48 lezioni. Un <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>sistema completo</span>.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "#3A322B",
            margin: "0 auto 48px",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          Non una lista di video da guardare. Un percorso con un ordine preciso: ogni modulo sblocca il successivo. Clicca un modulo per vedere cosa c&apos;è dentro.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {modules.map((m, i) => (
            <ModuleAccordion key={m.n} module={m} defaultOpen={i === 0} />
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "#3A322B",
            margin: "48px auto 40px",
            maxWidth: 720,
            textAlign: "center",
          }}
        >
          Totale: ~<strong style={{ color: "#1A1814" }}>8-9 ore</strong> di contenuto. Lezioni da 10-15 minuti. Guardi quando vuoi. Applichi subito. Nessuna lezione è teoria senza pratica.
        </p>

        {/* Inline CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 16 }}>
          <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
            Voglio tutto questo — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
          </SalesV3PrimaryButton>
          <div style={{ fontSize: 12, color: "#6B5E54", fontFamily: "var(--font-body)" }}>
            Pagamento sicuro · Accesso immediato
          </div>
        </div>
      </div>
    </section>
  );
}

interface ModuleData {
  n: string;
  title: string;
  outcome: string;
  topics: string[];
}

function ModuleAccordion({ module: m, defaultOpen }: { module: ModuleData; defaultOpen?: boolean }) {
  return (
    <details
      className={styles.faqItem}
      open={defaultOpen}
      style={{
        background: "#FBF7EE",
        border: "1px solid rgba(42,36,32,0.10)",
        borderRadius: 14,
        overflow: "hidden",
        transition: "border-color .2s",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
      }}
    >
      <summary
        className={styles.faqSummary}
        style={{
          cursor: "pointer",
          padding: "22px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, flex: 1, minWidth: 0 }}>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 32,
              color: "var(--orange)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              minWidth: 56,
            }}
          >
            {m.n}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(17px, 1.6vw, 20px)",
                color: "#2A2420",
                letterSpacing: "-0.005em",
                marginBottom: 4,
                lineHeight: 1.25,
              }}
            >
              {m.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#6B5E54",
                lineHeight: 1.45,
              }}
            >
              {m.outcome}
            </div>
          </div>
        </div>
        <span
          aria-hidden
          className={styles.faqIcon}
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(235,122,46,0.14)",
            border: "1px solid rgba(235,122,46,0.40)",
            color: "var(--orange)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1,
            transition: "transform 0.2s ease",
          }}
        >
          +
        </span>
      </summary>
      <div
        style={{
          padding: "0 26px 26px clamp(26px, 8vw, 100px)",
          borderTop: "1px solid rgba(42,36,32,0.08)",
          marginTop: -1,
        }}
      >
        <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {m.topics.map((topic, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 12,
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.55,
                color: "#3A322B",
              }}
            >
              <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>·</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — PROOF (Founder story + Authority + Loghi partner)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3ProofSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "founder", variant });
    scrollToId("offerta");
  };

  const logos = [
    { src: "/loghi_bianchi_clienti/loghi_bianchi/H-FARM.png", alt: "H-FARM" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Sole_24_Ore.png", alt: "Il Sole 24 Ore" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Talent_Garden.png", alt: "Talent Garden" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Confcommercio.png", alt: "Confcommercio" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/Asseprim.png", alt: "Asseprim" },
    { src: "/loghi_bianchi_clienti/loghi_bianchi/CNA.png", alt: "CNA" },
  ];

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <SectionLabel>Chi te lo insegna</SectionLabel>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(32px, 4.5vw, 50px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 56px",
          maxWidth: 820,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Chi te lo insegna. è chi <Accent>l&apos;ha gia&apos; fatto</Accent>.
      </h2>

      {/* Founder block: photo + authority story */}
      <div className={styles.authorityGrid}>
        {/* Authority text (left, wider) */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.95,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(22px, 2.4vw, 28px)",
              lineHeight: 1.25,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Non siamo formatori che hanno letto dell&apos;AI.
          </p>
          <p>
            Morfeus nasce nel 2024 da un&apos;agenzia di marketing che usa l&apos;intelligenza artificiale dal <strong style={{ color: "#fff" }}>2021</strong> — prima del boom ChatGPT.
          </p>
          <p>
            Matteo e Alex hanno ottimizzato ogni processo della loro agenzia con l&apos;AI: copy, analisi, workflow, reportistica.
            Non è teoria accademica. È sopravvivenza competitiva.
          </p>
          <p>Poi hanno capito che quel metodo serviva anche a tutti gli altri.</p>

          <ul
            style={{
              margin: "10px 0 0",
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <li style={{ display: "flex", gap: 14, fontSize: 16 }}>
              <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>→</span>
              <span><strong style={{ color: "#fff" }}>2.000+</strong> professionisti formati negli ultimi 18 mesi</span>
            </li>
            <li style={{ display: "flex", gap: 14, fontSize: 16 }}>
              <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>→</span>
              <span>Docenti per <strong style={{ color: "#fff" }}>HFarm, Sole 24 Ore Formazione, Talent Garden, Confcommercio</strong></span>
            </li>
            <li style={{ display: "flex", gap: 14, fontSize: 16 }}>
              <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>→</span>
              <span>Formazione interna per <strong style={{ color: "#fff" }}>Enel, Sisal, BNP Paribas, Zara</strong></span>
            </li>
            <li style={{ display: "flex", gap: 14, fontSize: 16 }}>
              <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>→</span>
              <span><strong style={{ color: "#fff" }}>+300 ore</strong> di utilizzo reale di Claude su lavoro vero</span>
            </li>
          </ul>

          <p
            style={{
              marginTop: 16,
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--orange)",
            }}
          >
            &ldquo;Quello che insegniamo nel corso è il metodo che noi usiamo ogni giorno.
            <br /><br />
            Morfeus usa l&apos;AI dal 2021 — prima del boom ChatGPT. Non per fare bella figura. Per sopravvivere come azienda piccola in un mercato che si muoveva più veloce di noi.
            <br /><br />
            Abbiamo sbagliato metodo molte volte. Quello che insegniamo è quello che ha funzionato, non quello che suona bene in una slide.&rdquo;
          </p>
          <div
            style={{
              marginTop: 14,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            — Matteo Arnaboldi, CEO Morfeus Hub
          </div>
        </div>

        {/* Founder photo (right, square + glow) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 320,
              aspectRatio: "1 / 1",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(235,122,46,0.30)",
              boxShadow: "0 0 60px rgba(235,122,46,0.18), 0 24px 48px rgba(0,0,0,0.45)",
              background: "var(--dusk)",
            }}
          >
            <Image
              src="/matteo-arnaboldi-hoodie.png"
              alt="Matteo Arnaboldi, CEO Morfeus Hub"
              fill
              sizes="(max-width: 768px) 280px, 320px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 18,
                color: "#fff",
                letterSpacing: "-0.005em",
              }}
            >
              Matteo Arnaboldi
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--muted)",
                marginTop: 4,
                letterSpacing: "0.04em",
              }}
            >
              CEO &amp; Co-Founder, Morfeus Hub
            </div>
          </div>
        </div>
      </div>

      {/* Logo wall (full-width, BIG logos) */}
      <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          Partner, docenze e formazione aziendale
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(20px, 3vw, 28px) clamp(24px, 5vw, 56px)",
          }}
        >
          {/* eslint-disable @next/next/no-img-element */}
          {logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              loading="lazy"
              className={styles.salesPartnerLogo}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            />
          ))}
        </div>
      </div>

      {/* Inline CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 64 }}>
        <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
          Voglio imparare da loro — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Pagamento sicuro · Accesso immediato
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6.5 — RECENSIONI (testimonianze + screenshot feedback)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Reviews — testimonianze testuali + griglia screenshot di feedback.
 *
 * STATO ATTUALE: contenuti placeholder.
 *
 * Per popolare con dati reali:
 *  - Sostituire array `reviews` con quote / nome / ruolo / azienda reali
 *  - Mettere gli screenshot in /public/reviews-screenshots/<filename>.{jpg|png}
 *    e popolare l'array `screenshots` con `{src, alt}`. Se l'array è vuoto,
 *    il blocco screenshot viene nascosto automaticamente.
 */
export function SalesV3ReviewsSection() {
  // TODO: sostituire con reviews reali
  const reviews: Array<{
    initials: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    rating?: number;
  }> = [
    {
      initials: "AG",
      name: "Alessandro Giandolfo",
      role: "Studente Claude Unlocked",
      company: "Cohort Morfeus",
      quote:
        "Ho sostituito il “fai da te” con un metodo solido e una gestione strategica delle mie capacità. La forza di questa esperienza sta nell'equilibrio perfetto tra una chiarezza cristallina e una concretezza che genera risultati immediati.",
      rating: 5,
    },
    {
      initials: "AV",
      name: "Andrea Vitali",
      role: "Studente Claude Unlocked",
      company: "Cohort Morfeus",
      quote:
        "La vera differenza rispetto ad altri corsi è la forte componente pratica… ti porta davvero a cambiare il modo di usare questi strumenti e ti spinge a fare un salto di livello. È un percorso che, lezione dopo lezione, fa accendere nuove lampadine.",
      rating: 5,
    },
    {
      initials: "GB",
      name: "Giovanni Bocca",
      role: "Studente Claude Unlocked",
      company: "Cohort Morfeus",
      quote:
        "Premesse rispettate e promesse mantenute: il corso è stata un'ottima opportunità di acquisire contesto, basi e soprattutto metodo. Teoria e pratica affrontate durante il bootcamp hanno già cambiato il mio modo di approcciare all'automazione lato AI.",
      rating: 5,
    },
  ];

  // TODO: popolare con file in /public/reviews-screenshots/
  const screenshots: Array<{ src: string; alt: string }> = [
    // Esempio: { src: "/reviews-screenshots/whatsapp-feedback-01.jpg", alt: "Feedback WhatsApp di uno studente" },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
      }}
    >
      {/* Full-bleed cream background — esce dai bordi del container parent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--orange)",
            padding: "6px 14px",
            background: "rgba(235,122,46,0.10)",
            border: "1px solid rgba(235,122,46,0.30)",
            borderRadius: 100,
          }}
        >
          Recensioni
        </span>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(30px, 4.2vw, 46px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#2A2420",
          margin: "16px auto 18px",
          maxWidth: 820,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Cosa dice <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>chi ha già fatto il salto</span>.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "#6B5E54",
          margin: "0 auto 56px",
          maxWidth: 660,
          textAlign: "center",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Voci reali di chi ha applicato il metodo nel proprio lavoro quotidiano.
      </p>

      <div className={styles.reviewsGrid}>
        {reviews.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>

      {screenshots.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Feedback raw — schermate dirette
          </div>
          <div className={styles.screenshotsGrid}>
            {screenshots.map((s, i) => (
              <ScreenshotCard key={i} src={s.src} alt={s.alt} />
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  );
}

function ReviewCard({
  initials,
  name,
  role,
  company,
  quote,
  rating,
}: {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: hover ? "#FFFCF5" : "#FBF7EE",
        border: `1px solid ${hover ? "rgba(200,90,21,0.35)" : "rgba(42,36,32,0.10)"}`,
        borderRadius: 16,
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxSizing: "border-box",
        height: "100%",
        transition: "background .25s, border-color .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 14px rgba(42,36,32,0.06)",
      }}
    >
      {rating !== undefined && (
        <div style={{ display: "inline-flex", gap: 3 }} aria-label={`${rating} stelle su 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={i < rating ? "#EB7A2E" : "rgba(42,36,32,0.10)"}
              stroke={i < rating ? "#EB7A2E" : "rgba(42,36,32,0.18)"}
              strokeWidth="1.4"
              aria-hidden
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      )}
      <p
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: 17,
          lineHeight: 1.6,
          color: "#1A1814",
          margin: 0,
          flex: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 14, borderTop: "1px solid rgba(42,36,32,0.10)" }}>
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(235,122,46,0.14)",
            border: "2px solid #EB7A2E",
            display: "grid",
            placeItems: "center",
            color: "#C85A15",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          {initials}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "#2A2420",
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#6B5E54",
              marginTop: 2,
              lineHeight: 1.3,
            }}
          >
            {role} · {company}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenshotCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "var(--dusk)",
        aspectRatio: "9 / 16",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — PER CHI È / PER CHI NON È
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3AudienceSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "audience", variant });
    scrollToId("offerta");
  };

  const yes = [
    "Sei un professionista che vuole usare l'AI nel lavoro quotidiano, ma non sa da dove partire davvero.",
    "Hai provato ChatGPT o Claude e hai pensato \"bah, niente di speciale\" — perché nessuno ti ha mostrato il Livello 2 e oltre.",
    "Vedi colleghi e competitor ottenere risultati con l'AI e vuoi capire come fanno.",
    "Non sei tecnico e non vuoi diventarlo — vuoi un metodo pratico, non un corso di programmazione.",
    "Sei un imprenditore, freelance o manager che vuole risparmiare ore ogni settimana su task ripetitivi.",
    "Vuoi smettere di navigare tra tutorial YouTube e prompt copiati da Twitter senza costruire nulla di strutturato.",
  ];
  const no = [
    "Cerchi un corso su \"l'AI in generale\" — questo è verticale su Claude. Il 70% si applica ovunque, ma il focus è uno strumento, un metodo.",
    "Hai già Projects configurati, usi skill personalizzate e hai un workflow quotidiano strutturato — il corso base non aggiunge abbastanza. Guarda il Bootcamp AI Champion.",
    "Vuoi risultati senza fare nulla — il corso richiede 8-9 ore di impegno e la volontà di applicare. Non è una pillola magica.",
    "Pensi che l'AI sia una moda che passerà — questo corso non è per te. È per chi ha capito che il mondo è cambiato e vuole stare dalla parte giusta.",
  ];

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <SectionLabel>Auto-selezione</SectionLabel>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(32px, 4.5vw, 50px)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 56px",
          maxWidth: 820,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Questo corso è per te? <Accent>Scoprilo in 30 secondi</Accent>.
      </h2>

      <div className={styles.audienceGrid}>
        <div
          style={{
            background: "var(--deep-space)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderTop: "3px solid var(--orange)",
            borderRadius: 14,
            padding: "32px 28px",
            boxSizing: "border-box",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 18,
              fontFamily: "var(--font-body)",
            }}
          >
            È per te se…
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {yes.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 14, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--ghost)" }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(235,122,46,0.15)",
                    border: "1px solid var(--orange)",
                    color: "var(--orange)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "var(--deep-space)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderTop: "3px solid #8B2500",
            borderRadius: 14,
            padding: "32px 28px",
            boxSizing: "border-box",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "#C56750",
              marginBottom: 18,
              fontFamily: "var(--font-body)",
            }}
          >
            NON è per te se…
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {no.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 14, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.85 }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(139,37,0,0.15)",
                    border: "1px solid #8B2500",
                    color: "#C56750",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✗
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Micro-quote — obiezione "non sono tecnico" */}
      <figure
        style={{
          marginTop: 40,
          marginInline: "auto",
          maxWidth: 640,
          padding: "20px 28px",
          borderLeft: "3px solid var(--orange)",
          background: "rgba(235,122,46,0.04)",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <blockquote
          style={{
            margin: 0,
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 18px)",
            lineHeight: 1.55,
            color: "var(--ghost)",
          }}
        >
          &ldquo;Anche temi non immediati diventano chiari e comprensibili per chi non è tecnico.&rdquo;
        </blockquote>
        <figcaption
          style={{
            marginTop: 10,
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          — Danilo Maver, studente Claude Unlocked
        </figcaption>
      </figure>

      {/* Inline CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 56 }}>
        <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
          Mi riconosco — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Pagamento sicuro · Accesso immediato
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — COMPARISON TABLE
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3ComparisonSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const onCheckout = () => {
    trackEvent("sales_inline_cta_click", { block: "comparison", variant });
    scrollToId("offerta");
  };

  const rows: Array<{ label: string; a: string; b: string; c: string; highlight?: boolean }> = [
    { label: "Tempo per risultati", a: "6-12 mesi", b: "4-6 settimane", c: "1 settimana" },
    { label: "Struttura e ordine", a: "Nessuno. Salti da un video all'altro.", b: "Generica. Copre tutto e niente.", c: "Percorso in 10 moduli con ordine preciso." },
    { label: "Focus", a: "Sparso su 10 tool diversi.", b: "\"AI\" in generale.", c: "Verticale Claude. Un metodo, uno strumento." },
    { label: "Parte dal mindset?", a: "No.", b: "Raramente.", c: "Sì. Modulo 0: come ragionare con l'AI." },
    { label: "Personalizzazione", a: "Nessuna.", b: "Template generici.", c: "Il TUO Claude, configurato per il TUO lavoro." },
    { label: "Supporto", a: "Nessuno.", b: "Community generica.", c: "4 live settimanali con i founder." },
    { label: "Costo reale", a: "\"Gratis\" + 150-300h del tuo tempo.", b: "100-500€ + tempo per filtrare il contenuto utile.", c: "147€ early bird. 4-5h totali. Applicabile subito.", highlight: true },
    { label: "Aggiornamenti", a: "Devi cercarli tu ogni volta.", b: "Dipende.", c: "Inclusi. Il corso evolve con Claude." },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
      }}
    >
      {/* Full-bleed cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--orange)",
              padding: "6px 14px",
              background: "rgba(235,122,46,0.10)",
              border: "1px solid rgba(235,122,46,0.30)",
              borderRadius: 100,
            }}
          >
            Posizionamento
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#2A2420",
            margin: "16px auto 48px",
            maxWidth: 920,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Imparare da solo <span style={{ color: "#9B8E83" }}>vs</span> Corso generico AI <span style={{ color: "#9B8E83" }}>vs</span> <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>Claude Unlocked</span>.
        </h2>

        {/* Desktop table */}
        <div className={styles.comparisonTable}>
          <ComparisonHeaderCell label="Criterio" />
          <ComparisonHeaderCell label="Da solo (YouTube + tutorial)" />
          <ComparisonHeaderCell label="Corso generico AI" />
          <ComparisonHeaderCell label="Claude Unlocked Morfeus" highlight />
          {rows.map((r, i) => (
            <ComparisonRow key={i} row={r} />
          ))}
        </div>

        {/* Mobile stacked */}
        <div className={styles.comparisonStack}>
          <ComparisonMobileCard title="Da solo (YouTube + tutorial)" rows={rows.map((r) => ({ k: r.label, v: r.a }))} />
          <ComparisonMobileCard title="Corso generico AI" rows={rows.map((r) => ({ k: r.label, v: r.b }))} />
          <ComparisonMobileCard title="Claude Unlocked Morfeus" highlight rows={rows.map((r) => ({ k: r.label, v: r.c }))} />
        </div>

        <p
          style={{
            marginTop: 40,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "#2A2420",
            textAlign: "center",
          }}
        >
          Il tuo tempo vale più di <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(40px, 6vw, 56px)", color: "#2A2420", letterSpacing: "-0.02em", lineHeight: 1, margin: "0 6px", verticalAlign: "middle" }}>12€</span> all&apos;ora? Allora il corso si ripaga prima di YouTube.
        </p>

        {/* Inline CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 56 }}>
          <SalesV3PrimaryButton onClick={onCheckout} size="lg" pulse>
            Salto le scorciatoie — Entra a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
          </SalesV3PrimaryButton>
          <div style={{ fontSize: 12, color: "#6B5E54", fontFamily: "var(--font-body)" }}>
            Pagamento sicuro · Accesso immediato
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonHeaderCell({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <div
      style={{
        padding: "20px 20px",
        background: highlight ? "var(--orange)" : "#E5DECF",
        borderRight: "1px solid rgba(42,36,32,0.10)",
        borderBottom: "1px solid rgba(42,36,32,0.10)",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 16,
        color: highlight ? "#fff" : "#2A2420",
        letterSpacing: "-0.005em",
        lineHeight: 1.3,
      }}
    >
      {label}
    </div>
  );
}

function ComparisonRow({ row }: { row: { label: string; a: string; b: string; c: string; highlight?: boolean } }) {
  const baseCell: React.CSSProperties = {
    padding: "20px 20px",
    borderRight: "1px solid rgba(42,36,32,0.08)",
    borderBottom: "1px solid rgba(42,36,32,0.08)",
    fontFamily: "var(--font-body)",
    fontSize: 16,
    lineHeight: 1.55,
    color: "#3A322B",
    background: row.highlight ? "rgba(235,122,46,0.06)" : "transparent",
    boxSizing: "border-box",
  };
  return (
    <>
      <div style={{ ...baseCell, fontWeight: 600, color: "#2A2420" }}>{row.label}</div>
      <div style={{ ...baseCell }}>{row.a}</div>
      <div style={{ ...baseCell }}>{row.b}</div>
      <div
        style={{
          ...baseCell,
          background: row.highlight ? "rgba(235,122,46,0.16)" : "rgba(235,122,46,0.08)",
          color: "#2A2420",
          fontWeight: 500,
          borderRight: "2px solid var(--orange)",
          borderLeft: "2px solid var(--orange)",
        }}
      >
        {row.c}
      </div>
    </>
  );
}

function ComparisonMobileCard({ title, rows, highlight }: { title: string; rows: Array<{ k: string; v: string }>; highlight?: boolean }) {
  return (
    <div
      style={{
        background: highlight ? "#FBF7EE" : "#FBF7EE",
        border: highlight ? "2px solid var(--orange)" : "1px solid rgba(42,36,32,0.10)",
        borderRadius: 14,
        padding: "24px 22px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 18,
          color: highlight ? "var(--orange)" : "#2A2420",
          margin: "0 0 18px",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((r) => (
          <div key={r.k}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "#9B8E83", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 4 }}>{r.k}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "#3A322B" }}>{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8.5 — BONUS INCLUSI (drum-roll prima dell'offerta)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3BonusSection() {
  const bonuses = [
    {
      tag: "Bonus #1",
      title: "4 live settimanali con i founder",
      body: "Sessioni dal vivo dove fai domande, lavori con noi, vedi demo in tempo reale. Non sei solo davanti a un video.",
      value: "197€",
      icon: "⏵",
    },
    {
      tag: "Bonus #2",
      title: "Pacchetto Skill & Plugin curato",
      body: "Strumenti pre-costruiti che installi in 1 click. Funzionano subito sui task più comuni — non devi inventarli da zero.",
      value: "297€",
      icon: "✦",
    },
    {
      tag: "Bonus #3",
      title: "Aggiornamenti per sempre",
      body: "Claude ha già ricevuto aggiornamenti significativi da quando abbiamo lanciato il corso. Ogni volta, gli studenti hanno ricevuto le lezioni aggiornate — automaticamente, senza riacquistare. In un mercato dove i corsi AI diventano obsoleti in pochi mesi, questo è il bonus più importante.",
      value: "non quantificabile",
      icon: "↻",
    },
    {
      tag: "Bonus #4",
      title: "Credito upgrade Bootcamp",
      body: "Se dopo il corso vuoi fare il Bootcamp AI Champion, quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. Non perdi nulla.",
      value: "fino a 147€",
      icon: "↗",
    },
  ];

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <SectionLabel>I bonus inclusi</SectionLabel>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(30px, 4.2vw, 46px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "16px auto 18px",
          maxWidth: 820,
          textAlign: "center",
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        E in più, dentro il corso, c&apos;è anche <Accent>tutto questo</Accent>.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.85,
          margin: "0 auto 56px",
          maxWidth: 640,
          textAlign: "center",
        }}
      >
        Quattro bonus inclusi nel prezzo che da soli valgono più del corso stesso. Tutti compresi senza supplementi.
      </p>

      <div className={styles.bonusGrid}>
        {bonuses.map((b) => (
          <BonusCard key={b.tag} {...b} />
        ))}
      </div>

      {/* Visual total */}
      <div
        style={{
          marginTop: 48,
          padding: "24px 28px",
          background: "var(--deep-space)",
          border: "1px solid rgba(235,122,46,0.30)",
          borderRadius: 14,
          textAlign: "center",
          maxWidth: 560,
          marginInline: "auto",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            marginBottom: 8,
          }}
        >
          Valore complessivo dei bonus
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 52px)",
            color: "var(--orange)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          ~360€
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--ghost)",
            opacity: 0.85,
          }}
        >
          Più di 5 volte il prezzo del corso. <strong style={{ color: "#fff" }}>Tutto incluso</strong>.
        </div>
      </div>
    </section>
  );
}

function BonusCard({ tag, title, body, value, icon }: { tag: string; title: string; body: string; value: string; icon: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "26px 26px",
        background: hover ? "rgba(255,255,255,0.04)" : "var(--deep-space)",
        border: `1px solid ${hover ? "rgba(235,122,46,0.30)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        transition: "background .25s, border-color .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontFamily: "var(--font-body)",
            padding: "5px 10px",
            background: "rgba(235,122,46,0.12)",
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>{icon}</span>
          {tag}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 18,
            color: value.includes("€") ? "var(--orange)" : "var(--muted)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textAlign: "right",
            minWidth: 0,
          }}
        >
          {value.includes("€") && <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 4, fontWeight: 500 }}>vale</span>}
          {value}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 19,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: "#fff",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.85,
          margin: 0,
          flex: 1,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — OFFERTA: STACK + REVEAL PREZZO
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3OfferSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);

  const items: Array<{ title: string; body: string; value: string; subValue?: string }> = [
    { title: "Il corso completo", body: "10 moduli, ~8-9 ore di contenuto pratico. Dal mindset al sistema personalizzato.", value: "397€" },
    { title: "4 live settimanali con i founder", body: "Sessioni live dedicate solo agli studenti Claude Unlocked. Fai domande, lavora con noi, vedi demo in tempo reale.\n📅 12 maggio · 19 maggio · 26 maggio · 2 giugno\nReplay inclusi e permanenti.", value: "1.000€", subValue: "(4 sessioni × 250€, tariffa consulenza Morfeus)" },
    { title: "Pacchetto skill e plugin curato", body: "Strumenti pre-costruiti sui nostri framework proprietari. Installi in 1 click. Funzionano subito per i task più comuni.", value: "197€" },
    { title: "Aggiornamenti futuri inclusi", body: "Claude evolve. Il corso evolve con lui. In un mercato dove i corsi AI diventano obsoleti in pochi mesi, gli studenti ricevono le lezioni aggiornate automaticamente, senza riacquistare. Questo e' il bonus piu' importante.", value: "non quantificabile" },
  ];

  const onCheckout = () => trackCheckoutClick("offer", variant, current.stage, current.price);

  return (
    <section
      id="offerta"
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 960,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Strong orange ambient glow — mark the section visually */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "70%",
          background:
            "radial-gradient(ellipse, rgba(235,122,46,0.18) 0%, rgba(123,104,238,0.08) 50%, transparent 75%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* "Zona acquisto" badge floating above the box */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            background: "var(--orange)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            borderRadius: 100,
            boxShadow: "0 8px 28px rgba(235,122,46,0.45)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          La tua decisione · Zona acquisto
        </span>
      </div>

      {/* PURCHASE BOX wrapping all content */}
      <div
        style={{
          background: "linear-gradient(180deg, var(--dusk) 0%, rgba(15,14,26,0.95) 100%)",
          border: "2px solid var(--orange)",
          borderRadius: 24,
          padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
          boxShadow: "0 0 80px rgba(235,122,46,0.20), 0 32px 80px rgba(0,0,0,0.55)",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <SectionLabel>L&apos;offerta</SectionLabel>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.5vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "16px auto 40px",
            maxWidth: 720,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Ecco cosa ottieni. E quanto costa <Accent>davvero</Accent>.
        </h2>

        {/* Stack */}
        <div className={styles.offerStack}>
          {items.map((it, i) => (
            <OfferStackCard key={i} index={i + 1} title={it.title} body={it.body} value={it.value} subValue={it.subValue} />
          ))}
        </div>

      {/* Total + reveal */}
      <div style={{ textAlign: "center", marginTop: 56 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--muted)",
            marginBottom: 4,
          }}
        >
          Valore totale
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 32,
            color: "var(--muted)",
            textDecoration: "line-through",
            textDecorationColor: "var(--orange)",
            letterSpacing: "-0.02em",
          }}
        >
          1.594€
        </div>
      </div>

      {/* Box ROI — spostato qui dalla sezione Problema (v2) */}
      <div
        style={{
          marginTop: 44,
          background: "rgba(15,14,26,0.65)",
          border: "1px solid rgba(235,122,46,0.30)",
          borderRadius: 14,
          padding: "28px clamp(20px, 4vw, 36px)",
          textAlign: "center",
          maxWidth: 640,
          marginInline: "auto",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 14,
            fontFamily: "var(--font-body)",
          }}
        >
          Il calcolo semplice
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ghost)", lineHeight: 1.6 }}>
            Ogni settimana senza un sistema = <strong style={{ color: "var(--orange)" }}>5-8 ore</strong> di produttività persa.
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ghost)", lineHeight: 1.6 }}>
            A 25€/ora: <strong style={{ color: "var(--orange)" }}>500-800€</strong> al mese. Ogni mese. Senza che te ne accorga.
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#fff", marginTop: 6, lineHeight: 1.6 }}>
            Il corso costa <strong style={{ color: "#fff" }}>147€</strong>. Si ripaga la prima settimana.
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 36 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--ghost)",
            opacity: 0.7,
            marginBottom: 8,
          }}
        >
          Il tuo investimento oggi
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(72px, 13vw, 156px)",
            lineHeight: 1,
            color: "var(--orange)",
            letterSpacing: "-0.04em",
            textShadow: "0 0 60px rgba(235,122,46,0.25)",
            margin: "8px 0 12px",
          }}
        >
          {current.price}€
        </div>
        <div
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--ghost)",
            opacity: 0.85,
          }}
        >
          {priceWords(current.price)}.
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.92,
            margin: "20px auto 0",
            maxWidth: 580,
          }}
        >
          Meno di una cena fuori. Meno di un&apos;ora di consulenza con un esperto AI. Per un sistema che ti restituisce 5-8 ore ogni settimana.
        </div>
      </div>

      {/* Visual price scale */}
      <PriceScaleBar pricing={pricing} current={current} />

      {/* Cosa succede dopo il pagamento */}
      <PostPurchaseBox />

      {/* CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
        <SalesV3PrimaryButton href={current.checkoutUrl} onClick={onCheckout} size="xl" pulse>
          Entra nel corso a {current.price}€ <span style={{ fontSize: 18 }}>→</span>
        </SalesV3PrimaryButton>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 14,
          fontSize: 13,
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        Pagamento sicuro · Accesso immediato
      </div>

      {/* Credito upgrade box */}
      <div
        style={{
          marginTop: 36,
          padding: "18px 22px",
          background: "rgba(123,104,238,0.05)",
          border: "1px solid rgba(123,104,238,0.20)",
          borderRadius: 12,
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          maxWidth: 720,
          marginInline: "auto",
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "rgba(123,104,238,0.15)",
            color: "var(--violet)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          €
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--ghost)" }}>
          <strong style={{ color: "#fff" }}>Credito upgrade Bootcamp.</strong> Se dopo il corso vuoi fare il Bootcamp AI Champion, quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. Non perdi nulla.
        </div>
      </div>
      </div>
      {/* /PURCHASE BOX */}
    </section>
  );
}

function priceWords(n: number): string {
  if (n === 147) return "Centoquarantasette euro";
  if (n === 297) return "Duecentonovantasette euro";
  if (n === 397) return "Trecentonovantasette euro";
  return `${n} euro`;
}

function OfferStackCard({ index, title, body, value, subValue }: { index: number; title: string; body: string; value: string; subValue?: string }) {
  const isPrice = value.includes("€");
  return (
    <div
      className={styles.offerStackCard}
      style={{
        padding: "20px 22px",
        background: "var(--deep-space)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        boxSizing: "border-box",
      }}
    >
      <span
        className={styles.offerStackIndex}
        style={{
          background: "rgba(235,122,46,0.14)",
          color: "var(--orange)",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {index}
      </span>
      <div className={styles.offerStackBody}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "#fff", marginBottom: 4, lineHeight: 1.25 }}>
          {title}
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: "var(--ghost)", opacity: 0.8, whiteSpace: "pre-line" }}>
          {body}
        </div>
      </div>
      <div
        className={styles.offerStackValue}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 17,
            color: "var(--orange)",
            textDecoration: isPrice ? "line-through" : "none",
            textDecorationColor: "var(--muted)",
            opacity: isPrice ? 0.85 : 0.7,
          }}
        >
          {value}
        </div>
        {subValue && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              lineHeight: 1.3,
              color: "var(--muted)",
              fontStyle: "italic",
              textAlign: "right",
              maxWidth: 220,
            }}
          >
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}

function PostPurchaseBox() {
  const sectionTitle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.20em",
    textTransform: "uppercase",
    color: "var(--orange)",
    marginBottom: 16,
  };
  const liStyle: React.CSSProperties = {
    display: "flex",
    gap: 12,
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.55,
    color: "var(--ghost)",
  };
  const checkSpan: React.CSSProperties = {
    color: "var(--orange)",
    fontWeight: 700,
    flexShrink: 0,
  };
  const separator: React.CSSProperties = {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    margin: "28px 0",
  };

  return (
    <div
      style={{
        marginTop: 44,
        padding: "32px clamp(20px, 4vw, 32px)",
        background: "#1A1830",
        border: "1px solid rgba(235, 122, 46, 0.40)",
        borderRadius: 12,
        maxWidth: 720,
        marginInline: "auto",
      }}
    >
      {/* Sezione 1 — Maggio è il tuo mese di preparazione */}
      <div style={sectionTitle}>Maggio è il tuo mese di preparazione</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        <p style={{ ...liStyle, margin: 0 }}>
          Prima che il corso esca il <strong style={{ color: "#fff", fontWeight: 600 }}>5 giugno</strong>, hai 4 settimane per costruire le fondamenta.
        </p>
        <p style={{ ...liStyle, margin: 0 }}>Chi le salta arriva al corso da zero.</p>
        <p style={{ ...liStyle, margin: 0, color: "#fff", fontWeight: 500 }}>Chi le fa, entra già avanzato.</p>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        <li style={liStyle}>
          <span style={checkSpan}>✓</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>AI Basics</strong>: il punto di partenza che tutti danno per scontato ma che fa tutta la differenza
          </span>
        </li>
        <li style={liStyle}>
          <span style={checkSpan}>✓</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>Lezione di benvenuto</strong>: come strutturare il mese per arrivare pronti
          </span>
        </li>
        <li style={liStyle}>
          <span style={checkSpan}>✓</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>Community + pacchetto skill e plugin</strong>: operativo dal primo giorno
          </span>
        </li>
      </ul>

      <div style={separator} />

      {/* Sezione 2 — Le 4 live di maggio */}
      <div style={sectionTitle}>Le 4 live di maggio · solo per i founding member</div>
      <p style={{ ...liStyle, margin: "0 0 16px", color: "#fff", fontWeight: 500 }}>
        Non sono sessioni di attesa. Sono <span style={{ color: "var(--orange)" }}>il percorso</span>.
      </p>
      <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        <li style={liStyle}>
          <span style={{ ...checkSpan, color: "var(--ghost)", opacity: 0.85 }}>📅</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>12 maggio</strong> · Live #1
          </span>
        </li>
        <li style={liStyle}>
          <span style={{ ...checkSpan, color: "var(--ghost)", opacity: 0.85 }}>📅</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>19 maggio</strong> · Live #2
          </span>
        </li>
        <li style={liStyle}>
          <span style={{ ...checkSpan, color: "var(--ghost)", opacity: 0.85 }}>📅</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>26 maggio</strong> · Live #3
          </span>
        </li>
        <li style={liStyle}>
          <span style={{ ...checkSpan, color: "var(--ghost)", opacity: 0.85 }}>📅</span>
          <span>
            <strong style={{ color: "#fff", fontWeight: 600 }}>2 giugno</strong> · Live #4
          </span>
        </li>
      </ul>
      <p style={{ ...liStyle, opacity: 0.92, margin: 0 }}>
        Lavori con noi ogni settimana. Arrivi al corso il <strong style={{ color: "#fff", fontWeight: 600 }}>5 giugno</strong> con un mese di pratica già fatto. <strong style={{ color: "#fff", fontWeight: 600 }}>I replay sono tuoi per sempre.</strong>
      </p>

      <div style={separator} />

      {/* Sezione 3 — Il 5 giugno entra il corso completo */}
      <div style={sectionTitle}>Il 5 giugno entra il corso completo</div>
      <p style={{ ...liStyle, margin: 0, color: "var(--orange)", fontWeight: 500 }}>
        E tu ci arrivi già avanzato.
      </p>
    </div>
  );
}

function PriceScaleBar({ pricing, current }: { pricing: SalesV3PricingContent; current: CurrentPricing }) {
  const stages: Array<{ key: PricingStage; price: number; label: string }> = [
    { key: "earlyBird", price: pricing.earlyBirdPrice, label: "prossime 48h" },
    { key: "standard", price: pricing.standardPrice, label: "fino al 12 maggio" },
    { key: "full", price: pricing.fullPrice, label: "dal 13 maggio" },
  ];
  return (
    <div
      style={{
        marginTop: 44,
        padding: "20px 24px",
        background: "var(--deep-space)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
      }}
    >
      {stages.map((s, i) => {
        const active = s.key === current.stage;
        const passed = stages.findIndex((x) => x.key === current.stage) > i;
        return (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 0", minWidth: 130 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: active ? "var(--orange)" : passed ? "var(--muted)" : "transparent",
                border: `2px solid ${active ? "var(--orange)" : "var(--muted)"}`,
                boxShadow: active ? "0 0 14px rgba(235,122,46,0.5)" : "none",
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  color: active ? "var(--orange)" : passed ? "var(--muted)" : "var(--ghost)",
                  textDecoration: passed ? "line-through" : "none",
                }}
              >
                {s.price}€
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: active ? "var(--orange)" : "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {active ? "● sei qui" : s.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9.5 — UPSELL BOOTCAMP (compact, post-acquisto)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3UpsellBootcampSection() {
  const variant = useSalesV3Variant();
  const onClick = () => trackEvent("sales_upsell_bootcamp_click", { block: "post-offer", variant });

  return (
    <section
      className={styles.salesSectionPadSm}
      style={{
        maxWidth: 880,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "32px clamp(24px, 4vw, 40px)",
          background: "linear-gradient(135deg, rgba(101,88,212,0.10) 0%, rgba(15,14,26,0.85) 100%)",
          border: "1px dashed rgba(123,104,238,0.35)",
          borderRadius: 16,
          boxShadow: "0 0 30px rgba(123,104,238,0.10)",
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--violet)",
              fontFamily: "var(--font-body)",
            }}
          >
            Il passo successivo
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.6vw, 30px)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: "#fff",
            margin: "0 0 14px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Vuoi il <Accent>Livello 3</Accent>? C&apos;è una strada. Ed è già inclusa.
        </h3>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.92,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 22,
          }}
        >
          <p style={{ margin: 0 }}>
            Il corso ti porta a padroneggiare Claude. Per chi vuole andare oltre — costruire un sistema AI che lavora in autonomia, con metodo e supporto guidato — c&apos;è il <strong style={{ color: "#fff" }}>Bootcamp AI Champion</strong>.
          </p>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Massimo 25 posti. Deadline prenotazione call: <strong style={{ color: "#fff" }}>26 maggio</strong>.
          </p>
          <p style={{ margin: 0 }}>
            E quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. Comprare il corso adesso <strong style={{ color: "var(--violet)" }}>non ti costa niente in più</strong>.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <a
            href="https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={onClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "rgba(123,104,238,0.12)",
              border: "1px solid var(--violet)",
              color: "var(--violet)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 10,
              textDecoration: "none",
              transition: "background .2s, transform .2s",
            }}
          >
            Scopri il Bootcamp AI Champion <span style={{ fontSize: 16 }}>→</span>
          </a>
          <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
            Prima si padroneggia lo strumento. Poi si costruisce il sistema.
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — GARANZIA
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3GuaranteeSection() {
  return (
    <section
      className={styles.salesSectionPadSm}
      style={{
        maxWidth: 880,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "var(--dusk)",
          border: "2px solid var(--orange)",
          borderRadius: 18,
          padding: "clamp(28px, 5vw, 44px) clamp(24px, 5vw, 44px) clamp(28px, 5vw, 40px)",
          overflow: "hidden",
        }}
      >
        {/* Watermark "14" */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -40,
            right: -10,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(180px, 35vw, 280px)",
            lineHeight: 1,
            color: "var(--orange)",
            opacity: 0.06,
            letterSpacing: "-0.05em",
            pointerEvents: "none",
          }}
        >
          14
        </span>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontFamily: "var(--font-body)",
            marginBottom: 14,
          }}
        >
          Garanzia &ldquo;prova tutto&rdquo; — 14 giorni
        </div>
        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 22px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Non ti chiediamo di fidarti di noi. Ti chiediamo di provare.
        </h2>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <p>Accedi al corso. Guarda le lezioni. Applica il metodo al tuo lavoro.</p>
          <p>
            Se dopo 14 giorni non ha cambiato il modo in cui lavori con l&apos;AI, ti rimborsiamo. Intero importo. Nessuna domanda. Nessuna burocrazia.
          </p>
          <p>
            Perché offriamo questa garanzia? Perché sappiamo che funziona. Abbiamo formato 2.000+ professionisti. Il tasso di rimborso è sotto il 3%. Chi chiede il rimborso non era il cliente giusto — e va bene così.
          </p>
        </div>

        <p
          style={{
            position: "relative",
            zIndex: 1,
            margin: "28px 0 0",
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--orange)",
            textAlign: "center",
          }}
        >
          L&apos;unico rischio reale è non provare.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — FAQ (+ FAQ extra per email variant)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3FAQSection() {
  const variant = useSalesV3Variant();

  const baseFaqs: Array<{ q: string; a: React.ReactNode }> = [
    {
      q: "Non ho tempo di seguire un altro corso.",
      a: (
        <>
          Capisco. Se lavori 8-10 ore al giorno, l&apos;ultima cosa che vuoi è un altro impegno.
          <br /><br />
          Ma ecco il paradosso: le 8-9 ore che investi nel corso te ne restituiscono 5-8 OGNI SETTIMANA.
          <br /><br />
          Non è tempo in più. È l&apos;investimento che ti libera tempo. Lezioni da 10-15 minuti, guardabili quando vuoi, applicabili subito. Non è un master — è un toolkit.
        </>
      ),
    },
    {
      q: "Ho già provato ChatGPT/Claude e non mi ha impressionato.",
      a: (
        <>
          Corretto. Se hai fatto domande e hai ottenuto risposte generiche, il tuo giudizio è giusto. Quelle risposte SONO generiche.
          <br /><br />
          Ma quello era il Livello 1 — domanda/risposta. Come giudicare Excel dopo aver fatto solo una somma. Il 95% non supera mai il Livello 1 perche&apos; nessuno gli ha mostrato che il Livello 2 esiste.
          <br /><br />
          A Livello 2, Claude non ti da&apos; risposte. Lavora CON te. Il corso ti porta li&apos;.
        </>
      ),
    },
    {
      q: "Non sono tecnico.",
      a: (
        <>
          L&apos;85% dei nostri studenti non ha alcun background tecnico. Abbiamo formato commercialisti, avvocati, marketer, HR manager, imprenditori. Nessuno era &ldquo;tecnico&rdquo;.
          <br /><br />
          Se sai usare email e WhatsApp, sai usare Claude. Il Modulo 0 si chiama &ldquo;Come ragionare con l&apos;AI&rdquo;. Non &ldquo;Come programmare l&apos;AI&rdquo;.
        </>
      ),
    },
    {
      q: "L'AI cambia troppo velocemente, tra 3 mesi è tutto diverso.",
      a: (
        <>
          Se questo fosse un corso su UN tool specifico, avresti ragione.
          <br /><br />
          Ma questo corso insegna il METODO. Come pensare, come strutturare, come costruire sistemi con l&apos;AI. I tool cambiano. Il metodo resta.
          <br /><br />
          Noi usiamo l&apos;AI dal 2021. I tool sono cambiati 5 volte. Il nostro metodo funziona ancora. Più aspetti, più il gap si allarga. Chi inizia oggi ha un vantaggio su chi inizia a ottobre.
        </>
      ),
    },
    {
      q: "Perché Claude e non ChatGPT?",
      a: (
        <>
          Il corso insegna un metodo che funziona con qualsiasi AI. Ma usa Claude come strumento primario per un motivo: è il più adatto al lavoro professionale strutturato.
          <br /><br />
          Projects, CoWork, Skills, Connettori — funzionalità che gli altri non hanno allo stesso livello.
          <br /><br />
          Il 70% di quello che impari si applica ovunque. Stai imparando a guidare, non a usare una macchina specifica.
        </>
      ),
    },
    {
      q: "Il prezzo sale davvero?",
      a: (
        <>
          Sì. Non è una finta scadenza.
          <br /><br />
          147€ per le prime 48 ore dopo il webinar. 297€ dal 8 al 12 maggio. 397€ dal 13 maggio, per sempre.
          <br /><br />
          Il contenuto non cambierà. Il prezzo sì.
        </>
      ),
    },
    {
      q: "E se poi voglio fare il bootcamp?",
      a: (
        <>
          Quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. Non perdi nulla. Il corso è il primo step. Il bootcamp è il secondo, per chi vuole andare oltre.
        </>
      ),
    },
    {
      q: "Ho bisogno del piano a pagamento di Claude?",
      a: (
        <>
          Puoi iniziare con il piano gratuito. Per le funzionalità avanzate (Projects, CoWork) serve il Pro: 18€/mese. Meno di un pranzo fuori, per uno strumento che ti risparmia 5+ ore a settimana.
          <br /><br />
          Tutti i nostri studenti hanno il Pro. Nessuno l&apos;ha mai cancellato dopo il corso.
        </>
      ),
    },
  ];

  const emailExtra = {
    q: "Non ho visto il webinar. Mi perdo qualcosa?",
    a: (
      <>
        No. Il webinar era una demo dal vivo del metodo. Tutto quello che è stato mostrato è insegnato nel corso — in modo più approfondito, strutturato e replicabile.
        <br /><br />
        Il webinar ti fa dire &ldquo;wow&rdquo;. Il corso ti fa dire &ldquo;adesso so farlo&rdquo;. Non ti perdi nulla. Anzi: il corso è più completo.
      </>
    ),
  };

  const faqs = variant === "email" ? [...baseFaqs, emailExtra] : baseFaqs;

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 880,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      <SectionLabel>FAQ</SectionLabel>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(32px, 4.5vw, 48px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "20px auto 48px",
          maxWidth: 720,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Le domande che <Accent>ti stai facendo</Accent>.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
        {faqs.map((item, i) => (
          <details
            key={item.q}
            className={styles.faqItem}
            open={i === 0}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <summary
              className={styles.faqSummary}
              style={{
                cursor: "pointer",
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 1.6vw, 18px)",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "-0.005em",
              }}
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                className={styles.faqIcon}
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(235,122,46,0.12)",
                  border: "1px solid rgba(235,122,46,0.3)",
                  color: "var(--orange)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 1,
                  transition: "transform 0.2s ease",
                }}
              >
                +
              </span>
            </summary>
            <div
              style={{
                padding: "0 26px 22px",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--ghost)",
                opacity: 0.88,
              }}
            >
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11.5 — BOOTCAMP BRIDGE (full version, post-FAQ)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3BootcampBridgeSection() {
  const variant = useSalesV3Variant();
  const onClick = () => trackEvent("sales_upsell_bootcamp_click", { block: "post-faq", variant });

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(181,240,58,0.14) 0%, rgba(181,240,58,0.06) 50%, rgba(15,14,26,0.92) 100%)",
          border: "1px solid rgba(181,240,58,0.30)",
          borderRadius: 24,
          padding: "clamp(40px, 5vw, 64px) clamp(28px, 4vw, 56px)",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(181,240,58,0.14), 0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(181,240,58,0.22) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 16 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#B5F03A",
              fontFamily: "var(--font-body)",
              padding: "6px 14px",
              background: "rgba(181,240,58,0.16)",
              border: "1px solid rgba(181,240,58,0.40)",
              borderRadius: 100,
            }}
          >
            Il passo successivo
          </span>
        </div>

        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.8vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "16px auto 32px",
            maxWidth: 780,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Il corso ti porta al Livello 2.
          <br />
          Chi vuole il <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#B5F03A" }}>Livello 3</span> ha una strada.
        </h2>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.95,
            maxWidth: 720,
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <p style={{ margin: 0 }}>
            Padroneggiare Claude è il primo step. Non puoi costruire un sistema di dipendenti AI senza prima padroneggiare lo strumento. <strong style={{ color: "#fff" }}>Il corso ti dà questa competenza</strong> — completa, applicabile, reale.
          </p>
          <p style={{ margin: 0 }}>
            Per chi vuole andare oltre: costruire dipendenti AI con metodo e supporto guidato, implementare nel proprio lavoro con qualcuno che ti corregge quando sbagli — c&apos;è il <strong style={{ color: "#B5F03A" }}>Bootcamp AI Champion</strong>.
          </p>
          <ul style={{ margin: "4px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            <li style={{ display: "flex", gap: 14 }}>
              <span style={{ color: "#B5F03A", fontWeight: 700 }}>→</span>
              <span>Il metodo <strong style={{ color: "#fff" }}>M-V-A</strong> sviluppato da Morfeus</span>
            </li>
            <li style={{ display: "flex", gap: 14 }}>
              <span style={{ color: "#B5F03A", fontWeight: 700 }}>→</span>
              <span>Implementazione guidata da Matt e Mattia</span>
            </li>
            <li style={{ display: "flex", gap: 14 }}>
              <span style={{ color: "#B5F03A", fontWeight: 700 }}>→</span>
              <span>Massimo <strong style={{ color: "#fff" }}>25 posti</strong>. Deadline prenotazione call: <strong style={{ color: "#fff" }}>26 maggio</strong></span>
            </li>
            <li style={{ display: "flex", gap: 14 }}>
              <span style={{ color: "#B5F03A", fontWeight: 700 }}>→</span>
              <span>Quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. <strong style={{ color: "#fff" }}>Non perdi niente</strong> comprando il corso adesso.</span>
            </li>
          </ul>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 36 }}>
          <a
            href="https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={onClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 28px",
              background: "#B5F03A",
              color: "#0F0E1A",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 8px 30px rgba(181,240,58,0.40)",
              transition: "transform .15s, box-shadow .2s",
            }}
          >
            Scopri il Bootcamp AI Champion <span style={{ fontSize: 18 }}>→</span>
          </a>
          <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-italic)", fontStyle: "italic" }}>
            Prima si padroneggia. Poi si costruisce il sistema.
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — URGENZA + SCARSITÀ (variant-aware)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3UrgencySection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const content = step.content.SalesV3Urgency as SalesV3UrgencyContent;
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const copy = content[variant];

  const onCheckout = () => trackCheckoutClick("urgency", variant, current.stage, current.price);

  const liveBody = (
    <>
      <p>147€. Solo per le prossime ore. Poi sale a 297€. E dopo 7 giorni, a 397€. Per sempre.</p>
      <p>Non tornerà a questo prezzo. Non ci sarà un&apos;altra occasione identica.</p>
      <p>Eri presente. Hai visto il metodo. Sai che funziona. L&apos;unica domanda è: agisci adesso o paghi di più dopo?</p>
    </>
  );
  const replayBody = (
    <>
      <p>Tra poco, il prezzo sale da 147€ a 297€. Dopo 7 giorni, sale a 397€. Per sempre.</p>
      <p>Non è una strategia di marketing. È il prezzo del webinar: riservato a chi ha partecipato e decide di agire.</p>
      <ul style={{ margin: "12px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        <li>— Il corso resta lo stesso</li>
        <li>— La qualità resta identica</li>
      </ul>
      <p>L&apos;unica cosa che cambia è il prezzo.</p>
      <p>Ogni settimana di attesa sono 5-8 ore perse e un prezzo più alto.</p>
    </>
  );
  const emailBody = (
    <>
      <p>Il corso è appena uscito. Il prezzo di lancio è il più basso che ci sarà mai:</p>
      <p>
        <strong style={{ color: "var(--orange)" }}>147€</strong> — adesso.<br />
        <strong style={{ color: "#fff" }}>297€</strong> — tra pochi giorni.<br />
        <strong style={{ color: "var(--muted)" }}>397€</strong> — prezzo pieno, per sempre.
      </p>
      <p>Il contenuto non cambierà. L&apos;unica cosa che cambia è quanto paghi.</p>
      <p>Ma il prezzo non è l&apos;urgenza vera.</p>
      <p>L&apos;urgenza vera è che ogni settimana senza un sistema sono 5-8 ore buttate in task che l&apos;AI potrebbe fare per te. A 25€/ora, sono 500-800€ al mese di tempo perso.</p>
      <p>Il corso costa meno di una settimana di ritardo.</p>
    </>
  );

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 760,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(28px, 4vw, 42px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          margin: "0 auto 36px",
          maxWidth: 720,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        {copy.headlinePre} <Accent>{copy.headlineAccent}</Accent>{copy.headlineEnd && <> {copy.headlineEnd}</>}
      </h2>

      {current.activeDeadlineIso && (
        <>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 18,
              fontFamily: "var(--font-body)",
            }}
          >
            {copy.timerLabel}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <CountdownCells targetIso={current.activeDeadlineIso} />
          </div>
        </>
      )}

      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--ghost)",
          opacity: 0.92,
          maxWidth: 620,
          margin: "0 auto 36px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {variant === "live" ? liveBody : variant === "replay" ? replayBody : emailBody}
      </div>

      <SalesV3PrimaryButton href={current.checkoutUrl} onClick={onCheckout} size="xl" pulse>
        {copy.ctaLabel} <span style={{ fontSize: 18 }}>→</span>
      </SalesV3PrimaryButton>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — CTA FINALE + RECAP (variant-aware)
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3FinalCTASection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const content = step.content.SalesV3FinalCTA as SalesV3FinalCTAContent;
  const pricing = step.content.SalesV3Pricing as SalesV3PricingContent;
  const current = useCurrentPricing(pricing);
  const copy = content[variant];

  const onCheckout = () => trackCheckoutClick("final", variant, current.stage, current.price);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        color: "#2A2420",
        padding: "clamp(72px, 9vw, 110px) 0",
        isolation: "isolate",
        textAlign: "center",
      }}
    >
      {/* Full-bleed cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          background: "#F0EBE0",
          zIndex: -1,
          boxShadow:
            "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
        }}
      />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(24px, 4vw, 56px)" }}>
        <div style={{ marginBottom: 22 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              background: "rgba(235,122,46,0.12)",
              border: "1px solid rgba(235,122,46,0.30)",
              color: "var(--orange)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              borderRadius: 100,
            }}
          >
            Ultimo passo
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.5vw, 50px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#2A2420",
            margin: "0 auto 36px",
            maxWidth: 720,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          {copy.headlinePre} <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>{copy.headlineAccent}</span>{copy.headlineEnd}
        </h2>

        {/* RECAP STACK — palette light */}
        <div
          style={{
            margin: "0 auto 40px",
            maxWidth: 640,
            textAlign: "left",
            padding: "28px 28px",
            background: "#FBF7EE",
            border: "1px solid rgba(42,36,32,0.10)",
            borderRadius: 14,
            fontFamily: "var(--font-body)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 14px rgba(42,36,32,0.06)",
          }}
        >
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6B5E54",
            }}
          >
            Stai per ottenere
          </p>
          <ul
            style={{
              margin: "0 0 22px",
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 16,
              lineHeight: 1.55,
              color: "#3A322B",
            }}
          >
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--orange)", flexShrink: 0, fontWeight: 700 }}>→</span>
              <span>10 moduli, 48 lezioni, ~8-9 ore di contenuto pratico</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--orange)", flexShrink: 0, fontWeight: 700 }}>→</span>
              <span>Il metodo dal mindset al sistema personalizzato</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--orange)", flexShrink: 0, fontWeight: 700 }}>→</span>
              <span>4 live settimanali con i founder</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--orange)", flexShrink: 0, fontWeight: 700 }}>→</span>
              <span>Pacchetto skill e plugin pronto all&apos;uso</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--orange)", flexShrink: 0, fontWeight: 700 }}>→</span>
              <span>Aggiornamenti inclusi per sempre</span>
            </li>
          </ul>
          <div
            style={{
              paddingTop: 18,
              borderTop: "1px solid rgba(42,36,32,0.10)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
              flexWrap: "wrap",
              fontSize: 15,
              lineHeight: 1.5,
              color: "#3A322B",
            }}
          >
            <span>
              Valore: <strong style={{ color: "#9B8E83", textDecoration: "line-through" }}>1.594€</strong>
            </span>
            <span>
              Il tuo prezzo oggi: <strong style={{ color: "var(--orange)", fontFamily: "var(--font-display)", fontSize: 22 }}>{current.price}€</strong>
            </span>
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              lineHeight: 1.5,
              color: "#6B5E54",
              fontStyle: "italic",
            }}
          >
            Se dopo il corso vuoi fare il bootcamp, quello che hai pagato per il corso ti viene scalato dal prezzo del Bootcamp. Non perdi nulla.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <SalesV3PrimaryButton href={current.checkoutUrl} onClick={onCheckout} size="xl" pulse>
            {copy.ctaLabel} <span style={{ fontSize: 18 }}>→</span>
          </SalesV3PrimaryButton>
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 13,
            color: "#6B5E54",
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
          }}
        >
          Accesso immediato · Pagamento sicuro
          {current.activeDeadlineIso && current.stage === "earlyBird" && (
            <>
              <br />
              Prezzo early bird scade tra <strong style={{ color: "var(--orange)" }}><InlineTimer targetIso={current.activeDeadlineIso} /></strong>
            </>
          )}
        </div>

        <p
          style={{
            marginTop: 56,
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.5,
            color: "#3A322B",
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          {copy.closingPre} <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500, color: "#C85A15" }}>{copy.closingAccent}</span>{copy.closingEnd && <> {copy.closingEnd}</>}
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 14 — SEZIONE B2B
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3B2BSection() {
  const variant = useSalesV3Variant();
  const onClick = () => trackEvent("sales_b2b_call_click", { variant });

  return (
    <section
      className={styles.salesSectionPadV2}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(101,88,212,0.18) 0%, rgba(123,104,238,0.10) 50%, rgba(15,14,26,0.90) 100%)",
          border: "1px solid rgba(123,104,238,0.30)",
          borderRadius: 24,
          padding: "clamp(40px, 5vw, 64px) clamp(28px, 4vw, 56px)",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(123,104,238,0.15), 0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        {/* Decorative violet glow inside the card */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(123,104,238,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div className={styles.b2bGrid} style={{ position: "relative", zIndex: 1 }}>
          {/* Left: text + CTA */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 14px",
                  background: "rgba(123,104,238,0.18)",
                  border: "1px solid rgba(123,104,238,0.40)",
                  color: "var(--violet)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  borderRadius: 100,
                }}
              >
                Per le aziende
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: "0 0 20px",
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Hai un&apos;azienda? Vuoi formare il <Accent>tuo team</Accent>?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.92,
                margin: "0 0 14px",
              }}
            >
              Abbiamo formato i team di <strong style={{ color: "#fff" }}>Enel, Sisal, BNP Paribas, Zara</strong> e decine di altre aziende italiane.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.85,
                margin: "0 0 28px",
              }}
            >
              Se vuoi portare Claude nel tuo team con un percorso personalizzato sul vostro contesto, processi e settore — parliamone in 30 minuti.
            </p>
            <div>
              <OutlineButton href="https://marf.alexcarofiglio.com/book/morfeushub" onClick={onClick}>
                Prenota una chiamata commerciale <span style={{ fontSize: 16 }}>→</span>
              </OutlineButton>
            </div>
          </div>

          {/* Right: team illustration */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 280,
                aspectRatio: "1 / 1",
                display: "grid",
                placeItems: "center",
              }}
            >
              {/* Decorative background circles */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(123,104,238,0.18) 0%, transparent 60%)",
                }}
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--violet)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={styles.b2bDecoIcon}
                style={{ position: "relative", zIndex: 1, opacity: 0.95 }}
              >
                {/* Office building / team icon */}
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <line x1="9" y1="9" x2="9" y2="9" />
                <line x1="9" y1="12" x2="9" y2="12" />
                <line x1="9" y1="15" x2="9" y2="15" />
                <line x1="9" y1="18" x2="9" y2="18" />
                <line x1="15" y1="14" x2="15" y2="14" />
                <line x1="15" y1="17" x2="15" y2="17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 15 — FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3FooterSection() {
  const muted: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 11,
    lineHeight: 1.6,
    color: "var(--muted)",
    opacity: 0.75,
  };

  return (
    <footer
      className={styles.footerInner}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/m-w.png" alt="Morfeus" style={{ height: 20, display: "block" }} />
          <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            morfeushub.com
          </span>
          <span aria-hidden style={{ color: "var(--muted)", opacity: 0.4 }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/claude-unlocked/logo-mark-light.png"
              alt="Claude Unlocked"
              style={{ height: 22, width: 22, display: "block", borderRadius: 5 }}
            />
            <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.85 }}>
              Claude Unlocked
            </span>
          </span>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)", display: "flex", gap: 16 }}>
          <Link href="/it/privacy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Privacy Policy</Link>
          <Link href="/it/cookies" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Cookie Policy</Link>
          <Link href="/it/termini-corso" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Termini e Condizioni</Link>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={muted}>
          <strong style={{ color: "var(--muted)", opacity: 1 }}>Disclaimer:</strong> I prodotti e servizi venduti su questo sito non costituiscono proiezione, promessa o garanzia di guadagno. I risultati individuali possono variare e dipendono dall&apos;impegno, dall&apos;esperienza e dalle condizioni individuali di ciascun partecipante.
        </p>
        <p style={muted}>
          Il Claude Unlocked Morfeus è un prodotto formativo indipendente. Claude è un marchio di Anthropic, PBC. Questo corso non è affiliato a, sponsorizzato da, o approvato da Anthropic.
        </p>
        <p style={muted}>
          Questo contenuto rispetta le linee guida AGCM in materia di correttezza pubblicitaria e pratiche commerciali.
        </p>
        <p style={{ ...muted, marginTop: 6 }}>
          Morfeus Hub S.r.l. — P.IVA 14209210963 — Milano, Italia
        </p>
        <p style={{ ...muted, marginTop: 4, opacity: 1 }}>
          © 2026 Morfeus Hub S.r.l. — Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 16 — STICKY MOBILE CTA BAR
// ═══════════════════════════════════════════════════════════════════════════════

export function SalesV3StickyBarSection({ step }: SectionProps) {
  const variant = useSalesV3Variant();
  const pricing = step?.content?.SalesV3Pricing as SalesV3PricingContent | undefined;
  const current = useCurrentPricing(pricing ?? { earlyBirdPrice: 67, standardPrice: 97, fullPrice: 147, currency: "EUR", earlyBirdDeadlineIso: "", standardDeadlineIso: "", checkoutUrlEarlyBird: "", checkoutUrlStandard: "", checkoutUrlFull: "", b2bCallUrl: "" });

  const [isMobile, setIsMobile] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearOffer, setNearOffer] = useState(false);
  const [nearFinalCta, setNearFinalCta] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener("change", updateMobile);

    // Cache element references on each scroll (rebuilt as DOM updates)
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.55);

      const offer = document.getElementById("offerta");
      if (offer) {
        const r = offer.getBoundingClientRect();
        setNearOffer(r.top < window.innerHeight * 0.90 && r.bottom > window.innerHeight * 0.10);
      }

      // Final CTA non ha id dedicato — cerchiamo il footer come proxy della chiusura
      const footer = document.querySelector("footer");
      if (footer) {
        const r = footer.getBoundingClientRect();
        // Quando il footer è già in vista (siamo arrivati alla chiusura) nascondi
        setNearFinalCta(r.top < window.innerHeight * 1.1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      mq.removeEventListener("change", updateMobile);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onClick = () => {
    trackEvent("sales_sticky_click", { variant, pricing_stage: current.stage });
    scrollToId("offerta");
  };

  const show = isMobile && pastHero && !nearOffer && !nearFinalCta;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 14px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
        background: "rgba(10,9,20,0.94)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)" as React.CSSProperties["WebkitBackdropFilter"],
        borderTop: "1px solid rgba(255,255,255,0.08)",
        zIndex: 200,
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        pointerEvents: show ? "auto" : "none",
      }}
      aria-hidden={!show}
    >
      <button
        type="button"
        onClick={onClick}
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "var(--orange)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxSizing: "border-box",
          boxShadow: "0 4px 18px rgba(235,122,46,0.40)",
        }}
      >
        Acquista a {current.price}€ <span style={{ fontSize: 16 }}>→</span>
      </button>
    </div>
  );
}
