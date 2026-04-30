"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  FreebieHeroContent,
  FreebieThankYouContent,
  FreebieWebinarTeaserContent,
  FunnelStepConfig,
} from "@/funnels/types";

interface SectionProps {
  accentColor: string;
  step: FunnelStepConfig;
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

function renderHeadlineWithAccent(headline: string, accent?: string): React.ReactNode {
  if (!accent) return headline;
  const idx = headline.indexOf(accent);
  if (idx === -1) return headline;
  return (
    <>
      {headline.slice(0, idx)}
      <Accent>{accent}</Accent>
      {headline.slice(idx + accent.length)}
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
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
  size = "md",
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "md" | "lg";
  href?: string;
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "lg" ? "20px 32px" : "16px 24px";
  const fs = size === "lg" ? 17 : 16;

  const baseStyle: React.CSSProperties = {
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
    textDecoration: "none",
  };

  if (href) {
    return (
      <a
        href={href}
        download
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setPress(false); }}
        onMouseDown={() => setPress(true)}
        onMouseUp={() => setPress(false)}
        style={baseStyle}
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
      style={baseStyle}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const [hover, setHover] = useState(false);
  const baseStyle: React.CSSProperties = {
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
    textDecoration: "none",
    boxSizing: "border-box",
  };
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={baseStyle}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
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
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onEnter?: () => void;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      value={value}
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

// ─── HERO + FORM (opt-in) ─────────────────────────────────────────────────────

export function FreebieHeroSection({ step }: SectionProps) {
  const content = step.content.FreebieHero as FreebieHeroContent;
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!name.trim()) { setError("Inserisci il tuo nome"); return; }
    if (!isValidEmail(email.trim())) { setError("Inserisci una email valida"); return; }
    if (!role) { setError("Seleziona la tua posizione lavorativa"); return; }
    if (!privacy) { setError("Serve accettare la privacy policy"); return; }
    setError("");
    setIsSubmitting(true);
    try {
      const sp = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      const utms: Record<string, string> = {};
      utmKeys.forEach((k) => { if (sp.has(k)) utms[k] = sp.get(k)!; });

      const endpoint = content.optinEndpoint ?? "/api/funnels/freebie-cowork-setup-skill/optin";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          role,
          source: content.formName,
          ...utms,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.dataLayer) w.dataLayer.push({ event: "freebie_optin_complete", role, form_name: content.formName, ...utms });
      if (w.fbq) w.fbq("track", "Lead", { content_name: content.formName });

      sessionStorage.setItem("freebie_optin_name", name.trim());

      const utmStr = new URLSearchParams(utms).toString();
      router.push(utmStr ? `${content.successRedirect}?${utmStr}` : content.successRedirect);
    } catch {
      setError("Non siamo riusciti a completare l'iscrizione. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "32px 24px 56px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 40,
          alignItems: "start",
        }}
        className="freebie-hero-grid"
      >
        {/* Left column — copy + cover */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Badge>{content.badge}</Badge>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 54px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--white)",
              margin: 0,
              fontWeight: 600,
            }}
          >
            {renderHeadlineWithAccent(content.headline, content.headlineAccent)}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ghost)",
              margin: 0,
              opacity: 0.85,
              maxWidth: 560,
            }}
          >
            {content.subheadline}
          </p>
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
              maxWidth: 560,
              aspectRatio: "16 / 9",
            }}
          >
            <Image
              src={content.coverSrc}
              alt={content.coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={submit}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 28,
            backdropFilter: "blur(10px)",
            position: "relative",
            maxWidth: 480,
            justifySelf: "stretch",
          }}
        >
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
            {content.formTitle}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <StyledInput value={name} onChange={setName} placeholder="Il tuo nome" onEnter={submit} />
            <StyledInput type="email" value={email} onChange={setEmail} placeholder="La tua email" onEnter={submit} />
            <StyledSelect value={role} onChange={setRole} options={content.rolesOptions} placeholder={content.rolesPlaceholder} />

            {/* Hidden field — FORM_NAME for Brevo segmentation */}
            <input type="hidden" name="form_name" value={content.formName} />

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                cursor: "pointer",
                userSelect: "none",
                fontSize: 13,
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
                {content.privacyText.split("privacy policy")[0]}
                <Link href={content.privacyHref} target="_blank" rel="noreferrer" style={{ color: "var(--orange)" }}>
                  privacy policy
                </Link>
                {content.privacyText.split("privacy policy")[1] ?? ""}
              </span>
            </label>

            <PrimaryButton type="submit" disabled={isSubmitting} fullWidth size="lg">
              {isSubmitting ? "Invio in corso..." : <>{content.formSubmitLabel} <span style={{ fontSize: 18 }}>→</span></>}
            </PrimaryButton>
          </div>

          {error && (
            <div style={{ fontSize: 13, color: "#FF8a6a", marginTop: 12, fontWeight: 500, fontFamily: "var(--font-body)" }}>
              {error}
            </div>
          )}

          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 14, lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
            {content.formMicrocopy}
          </div>
        </form>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .freebie-hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── WEBINAR TEASER ───────────────────────────────────────────────────────────

export function FreebieWebinarTeaserSection({ step }: SectionProps) {
  const content = step.content.FreebieWebinarTeaser as FreebieWebinarTeaserContent;
  return (
    <section
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "24px 24px 72px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at top right, rgba(235,122,46,0.10) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontWeight: 700,
              marginBottom: 14,
              fontFamily: "var(--font-body)",
            }}
          >
            {content.eyebrow}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.2vw, 32px)",
              lineHeight: 1.2,
              color: "var(--white)",
              margin: "0 0 14px 0",
              fontWeight: 600,
            }}
          >
            {content.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "0 0 18px 0",
            }}
          >
            {content.body}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderRadius: 100,
              background: "rgba(235,122,46,0.10)",
              border: "1px solid rgba(235,122,46,0.25)",
              color: "var(--orange)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
            }}
          >
            <span style={{ fontSize: 16 }}>📅</span>
            {content.eventLabel}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

export function FreebieThankYouSection({ step }: SectionProps) {
  const content = step.content.FreebieThankYou as FreebieThankYouContent;
  const [name, setName] = useState<string>("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("freebie_optin_name") : null;
    setName(stored ?? "");
  }, []);

  useEffect(() => {
    setIsVideoOpen(false);
  }, [content.videoEmbedUrl]);

  function downloadIcs() {
    const blob = new Blob([content.calendarIcsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = content.calendarIcsFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const greeting = name ? `${content.greetingPrefix} ${name}` : content.greetingFallback;

  return (
    <section
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "32px 24px 72px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* Greeting + body */}
      <div>
        <Badge>Skill sbloccata</Badge>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.4vw, 48px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--white)",
            margin: "16px 0 14px 0",
            fontWeight: 600,
          }}
        >
          {greeting}, sei dentro.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
            maxWidth: 640,
          }}
        >
          {content.body}
        </p>
      </div>

      {/* Webinar card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(235,122,46,0.10), rgba(123,104,238,0.06))",
          border: "1px solid rgba(235,122,46,0.25)",
          borderRadius: 16,
          padding: "26px 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontWeight: 700,
            marginBottom: 10,
            fontFamily: "var(--font-body)",
          }}
        >
          P.S. - bonus webinar
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.6vw, 28px)",
            lineHeight: 1.2,
            color: "var(--white)",
            margin: "0 0 8px 0",
            fontWeight: 600,
          }}
        >
          {content.webinarCardTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 0 14px 0",
          }}
        >
          {content.webinarCardBody}
        </p>
        <div
          style={{
            fontSize: 14,
            color: "var(--white)",
            fontWeight: 600,
            marginBottom: 16,
            fontFamily: "var(--font-body)",
          }}
        >
          📅 {content.eventDateLabel}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <SecondaryButton href={content.calendarGoogleHref}>
            {content.calendarGoogleLabel}
          </SecondaryButton>
          <SecondaryButton onClick={downloadIcs}>
            {content.calendarIcsLabel}
          </SecondaryButton>
        </div>
      </div>

      {/* Video tutorial — renderizzato solo se videoEmbedUrl e' presente */}
      {content.videoEmbedUrl && (
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3vw, 32px)",
              lineHeight: 1.2,
              color: "var(--white)",
              margin: "0 0 16px 0",
              fontWeight: 600,
            }}
          >
            {content.videoTitle}
          </h2>
          {isVideoOpen ? (
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.4)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
              }}
            >
              <iframe
                src={content.videoEmbedUrl}
                title={content.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                overflow: "hidden",
                padding: 0,
                cursor: "pointer",
                background: "rgba(0,0,0,0.4)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
              }}
            >
              {content.videoThumbnailSrc ? (
                <Image
                  src={content.videoThumbnailSrc}
                  alt={content.videoTitle || "Video thumbnail"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(235,122,46,0.4), rgba(0,0,0,0.65))",
                  }}
                />
              )}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 45%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 74,
                  height: 74,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(235,122,46,0.95)",
                  color: "#fff",
                  fontSize: 26,
                  boxShadow: "0 10px 30px rgba(235,122,46,0.45)",
                }}
              >
                ▶
              </span>
            </button>
          )}
        </div>
      )}

      {/* Download */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.6vw, 28px)",
            lineHeight: 1.2,
            color: "var(--white)",
            margin: 0,
            fontWeight: 600,
          }}
        >
          {content.downloadTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.5,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
          }}
        >
          {content.downloadBody}
        </p>
        <PrimaryButton href={content.downloadHref} size="lg">
          ⬇ {content.downloadLabel}
        </PrimaryButton>
      </div>

      {/* Steps timeline */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 32px)",
            lineHeight: 1.2,
            color: "var(--white)",
            margin: "0 0 24px 0",
            fontWeight: 600,
          }}
        >
          {content.stepsTitle}
        </h2>
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {content.steps.map((stepText, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(235,122,46,0.15)",
                  border: "1px solid rgba(235,122,46,0.4)",
                  color: "var(--orange)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--ghost)",
                  paddingTop: 4,
                }}
              >
                {stepText}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Bottom CTAs — community + newsletter */}
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--violet)",
            fontWeight: 700,
            marginBottom: 10,
            fontFamily: "var(--font-body)",
          }}
        >
          {content.bottomCtasEyebrow}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 32px)",
            lineHeight: 1.2,
            color: "var(--white)",
            margin: "0 0 24px 0",
            fontWeight: 600,
          }}
        >
          {content.bottomCtasTitle}
        </h2>
        <div
          className="freebie-bottom-ctas"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          {content.bottomCtas.map((cta, i) => (
            <a
              key={i}
              href={cta.ctaHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "26px 24px",
                textDecoration: "none",
                color: "inherit",
                transition: "transform .2s, box-shadow .2s, border-color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(235,122,46,0.30)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    lineHeight: 1,
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(235,122,46,0.10)",
                    border: "1px solid rgba(235,122,46,0.25)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {cta.icon}
                </span>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "var(--orange)",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cta.eyebrow}
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  lineHeight: 1.25,
                  color: "var(--white)",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {cta.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--ghost)",
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                {cta.body}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--orange)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: "auto",
                }}
              >
                {cta.ctaLabel} <span style={{ fontSize: 16 }}>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 720px) {
          .freebie-bottom-ctas {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
