"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
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
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

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
      const res = await fetch("/api/funnels/webinar-claude/optin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), role, source: "webinar-claude" }),
      });
      if (!res.ok) throw new Error("submit_failed");
      onComplete?.({ email: email.trim(), name: name.trim(), role });
      router.push(successRedirect);
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/m-w2.png" alt="Morfeus" style={{ height: 24, display: "block" }} />
      <div
        style={{
          fontSize: 12,
          color: "var(--muted)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          fontFamily: "var(--font-body)",
        }}
      >
        Un evento Morfeus
      </div>
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
          margin: "0 auto",
          maxWidth: 680,
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        {content.subheadline}
      </p>

      {content.countdownIso && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <Countdown targetIso={content.countdownIso} />
        </div>
      )}

      <OptinFormTwoStep
        id="form-hero"
        successRedirect={content.formSuccessRedirect}
        ctaStep2={content.formSubmitLabel}
        microStep1={content.formMicrocopy}
      />

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
    { n: "+300", label: "ore di Claude", sub: "utilizzo reale quotidiano" },
    { n: "9.500", label: "lettori newsletter", sub: "professionisti italiani" },
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
      b: "Projects, CoWork, Skills, Plugin. Non le basi. L'utilizzo avanzato che trasforma Claude da chatbot a strumento di lavoro reale.",
    },
    {
      n: "02",
      t: "L'approccio che cambia tutto",
      b: "Il problema non sono le feature che non conosci. È il modo in cui ragioni con lo strumento. \"Fai tutto tu\" è l'errore più costoso che puoi fare con l'AI. Ti mostro l'alternativa.",
    },
    {
      n: "03",
      t: "Demo live dal mio lavoro quotidiano",
      b: "Niente slide, niente teoria. Ti faccio vedere esattamente come uso Claude ogni giorno: cosa gli chiedo, come lo correggo, perché funziona. Poi puoi replicarlo nel tuo.",
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Matteo-Arnaboldi-Presentazione.png"
              alt="Matteo Arnaboldi"
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
            Morfeus è un&apos;azienda che lavora con l&apos;AI da oltre 4 anni. Aiutiamo professionisti e aziende a integrare l&apos;intelligenza artificiale nel loro lavoro con metodo, non con l&apos;hype. Partner Asseprim Confcommercio.
          </p>
          <p style={bioPara}>
            <Accent>+300 ore</Accent> di utilizzo avanzato di Claude.<br />+180 ore di CoWork mode.
          </p>
          <p style={bioPara}>
            Non parlo di AI per sentito dire. La uso ogni giorno per costruire sistemi, workflow e processi che funzionano nel mio lavoro e in quello dei miei clienti.
          </p>
          <p style={bioPara}>
            Ho costruito il mio team di dipendenti AI. Non è un concetto teorico. È il modo in cui gestisco la mia azienda.
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
  return (
    <footer
      className={styles.footerInner}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/m-w.png" alt="Morfeus" style={{ height: 22, display: "block" }} />
        <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Morfeus Hub · morfeushub.com
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
        <Link href="/it/privacy" style={{ color: "var(--muted)" }}>
          Privacy Policy
        </Link>
        <span style={{ margin: "0 10px" }}>·</span>
        © 2026 Morfeus Hub. Tutti i diritti riservati.
      </div>
    </footer>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

const COMMUNITY_URL =
  "https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7";
const CALL_URL = "https://calendar.app.google/KPEsAKzdXdX6C3bX8";
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

  const firstName = "";

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
      <LinkedInLink />

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
