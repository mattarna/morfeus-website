"use client";

import { useState } from "react";
import type { FunnelStepConfig } from "@/funnels/types";
import styles from "./sections.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionProps {
  step: FunnelStepConfig;
}

type RoutingContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  claudeCardTitle: string;
  claudeCardBody: string;
  claudeCtaLabel: string;
  claudeCtaHref: string;
  businessCardTitle: string;
  businessCardBody: string;
  businessCtaLabel: string;
  businessCtaHref: string;
  urgencyNote: string;
};

type BusinessContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  painTitle: string;
  painItems: string[];
  offerTitle: string;
  offerItems: string[];
  processTitle: string;
  processSteps: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
  ctaMicrocopy: string;
};

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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 18px",
        borderRadius: 100,
        background: "rgba(235,122,46,0.12)",
        border: "1px solid rgba(235,122,46,0.30)",
        color: "#EB7A2E",
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
          background: "#EB7A2E",
          boxShadow: "0 0 8px rgba(235,122,46,0.7)",
          animation: "badge-pulse 2s infinite",
          flexShrink: 0,
        }}
      />
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
        fontSize: 12,
        fontWeight: 700,
        color: "#7B68EE",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
      }}
    >
      <span
        style={{
          width: 24,
          height: 1,
          background: "#7B68EE",
          opacity: 0.5,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

/**
 * PrimaryButton — modelled 1:1 on SalesV3PrimaryButton which is confirmed
 * working in production. Key differences from v1: uses plain <a> (not
 * Next.js Link), color is #fff (not #0B0B0C), background has hex fallback.
 */
function PrimaryButton({
  children,
  href,
  pulse,
  fullWidth,
  size = "md",
}: {
  children: React.ReactNode;
  href: string;
  pulse?: boolean;
  fullWidth?: boolean;
  size?: "md" | "lg" | "xl";
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const pad =
    size === "xl"
      ? "clamp(14px,3.5vw,22px) clamp(20px,5vw,36px)"
      : size === "lg"
        ? "clamp(14px,3vw,20px) clamp(18px,4.5vw,32px)"
        : "clamp(12px,2.5vw,16px) clamp(16px,4vw,24px)";
  const fs =
    size === "xl"
      ? "clamp(15px,1.6vw,18px)"
      : size === "lg"
        ? "clamp(15px,1.5vw,17px)"
        : "clamp(14px,1.4vw,16px)";

  const bg = press
    ? "#D4652A"
    : hover
      ? "#F09A5C"
      : "#EB7A2E";

  return (
    <a
      href={href}
      data-funnel-cta="true"
      data-cta-href={href}
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
        background: bg,
        color: "#fff",
        boxShadow: hover
          ? "0 6px 28px rgba(235,122,46,0.55)"
          : "0 4px 20px rgba(235,122,46,0.38)",
        transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
        transition: "background .18s, box-shadow .18s, transform .18s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        animation: pulse ? "btn-pulse 2.4s infinite" : "none",
        textDecoration: "none",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      {children}
    </a>
  );
}

function OutlineButton({
  children,
  href,
  fullWidth,
}: {
  children: React.ReactNode;
  href: string;
  fullWidth?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      data-funnel-cta="true"
      data-cta-href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "clamp(14px,1.5vw,17px)",
        padding: "clamp(12px,2.5vw,16px) clamp(16px,4vw,28px)",
        borderRadius: 10,
        border: "1.5px solid rgba(255,255,255,0.20)",
        background: hover ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        color: "#E4E7F0",
        transition: "background .18s, border-color .18s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        textDecoration: "none",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      {children}
    </a>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className={styles.header}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <a
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 1, textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 19,
              color: "#fff",
              letterSpacing: "-0.025em",
            }}
          >
            morfeus
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 19,
              color: "#EB7A2E",
              letterSpacing: "-0.025em",
            }}
          >
            hub
          </span>
        </a>
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className={styles.footerInner}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#9B9BB0" }}
        >
          © 2026 Morfeus Hub
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Cookie"].map((l) => (
            <a
              key={l}
              href={`/it/${l.toLowerCase()}`}
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#9B9BB0", textDecoration: "none" }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGINA 1 — Smistamento
// ═══════════════════════════════════════════════════════════════════════════════

export function AsseprimRoutingPageSection({ step }: SectionProps) {
  const content = (step.content as Record<string, unknown>)
    .AsseprimRoutingPage as RoutingContent | undefined;
  if (!content) return null;

  return (
    <>
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={styles.heroSection}
        style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(760px,90vw)",
            height: 260,
            background:
              "radial-gradient(ellipse, rgba(235,122,46,0.16) 0%, rgba(123,104,238,0.08) 40%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div style={{ display: "inline-flex", marginBottom: 32 }}>
          <Badge>{content.eyebrow}</Badge>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(52px,8vw,96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: "#fff",
            margin: "0 auto 28px",
            maxWidth: 820,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          A cosa sei
          <br />
          <Accent>interessato?</Accent>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(17px,1.6vw,20px)",
            lineHeight: 1.55,
            color: "#E4E7F0",
            opacity: 0.88,
            maxWidth: 620,
            margin: "0 auto",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          {content.subheadline}
        </p>
      </section>

      {/* ── Section divider ──────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9B9BB0",
          }}
        >
          Scegli il tuo percorso
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── Choice cards ─────────────────────────────────────────────────── */}
      <section className={styles.sectionPad} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={styles.cardsGrid}>

          {/* ── Card primaria: Claude Unlocked ─────────────────────────── */}
          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(235,122,46,0.35)",
              background:
                "linear-gradient(150deg, rgba(235,122,46,0.18) 0%, rgba(11,11,12,0.97) 55%)",
              padding: "clamp(28px,4vw,48px)",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top-border accent */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(to right, transparent 0%, rgba(235,122,46,0.85) 40%, rgba(235,122,46,0.85) 60%, transparent 100%)",
                borderRadius: "22px 22px 0 0",
              }}
            />
            {/* Corner glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "rgba(235,122,46,0.11)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "5px 11px",
                    borderRadius: 100,
                    background: "rgba(235,122,46,0.14)",
                    border: "1px solid rgba(235,122,46,0.32)",
                    color: "#EB7A2E",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#EB7A2E",
                      animation: "badge-pulse 2s infinite",
                    }}
                  />
                  Offerta webinar · 24 ore
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(30px,3.5vw,44px)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.025em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {content.claudeCardTitle}
                </h2>
              </div>
              {/* Savings badge */}
              <div
                style={{
                  flexShrink: 0,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "rgba(235,122,46,0.18)",
                  border: "1px solid rgba(235,122,46,0.35)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#EB7A2E",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  −100€
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    color: "#9B9BB0",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginTop: 3,
                  }}
                >
                  risparmio
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "#E4E7F0",
                opacity: 0.85,
                margin: 0,
                flex: 1,
              }}
            >
              {content.claudeCardBody}
            </p>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(56px,6vw,76px)",
                  lineHeight: 1,
                  color: "#EB7A2E",
                  letterSpacing: "-0.04em",
                }}
              >
                297€
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    color: "#9B9BB0",
                    textDecoration: "line-through",
                  }}
                >
                  397€
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9B9BB0" }}>
                  pagamento unico
                </span>
              </div>
            </div>

            <PrimaryButton href={content.claudeCtaHref} pulse fullWidth size="lg">
              {content.claudeCtaLabel} <span style={{ fontSize: 18 }}>→</span>
            </PrimaryButton>

            {/* Reassurance */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {["⚡ Solo 24 ore", "Accesso immediato", "Garanzia 14 gg"].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "#9B9BB0",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── Card secondaria: Formazione Aziendale ──────────────────── */}
          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(123,104,238,0.22)",
              background:
                "linear-gradient(150deg, rgba(123,104,238,0.07) 0%, rgba(11,11,12,0.97) 55%)",
              padding: "clamp(28px,4vw,48px)",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top-border accent violet */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(to right, transparent 0%, rgba(123,104,238,0.60) 40%, rgba(123,104,238,0.60) 60%, transparent 100%)",
                borderRadius: "22px 22px 0 0",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(123,104,238,0.07)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "5px 11px",
                  borderRadius: 100,
                  background: "rgba(123,104,238,0.10)",
                  border: "1px solid rgba(123,104,238,0.25)",
                  color: "#7B68EE",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  marginBottom: 14,
                }}
              >
                Aziende · Team · Manager
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(30px,3.5vw,44px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {content.businessCardTitle}
              </h2>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "#E4E7F0",
                opacity: 0.85,
                margin: 0,
                flex: 1,
              }}
            >
              {content.businessCardBody}
            </p>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                "Training interno per team marketing, sales e operations",
                "Coaching per imprenditori e leadership team",
                "Mentorship e percorsi one-to-one su casi reali",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: "#E4E7F0",
                    opacity: 0.80,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(123,104,238,0.15)",
                      border: "1px solid rgba(123,104,238,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7B68EE",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <OutlineButton href={content.businessCtaHref} fullWidth>
              {content.businessCtaLabel} <span style={{ fontSize: 17 }}>→</span>
            </OutlineButton>
          </div>
        </div>

        {/* ── Urgency strip ──────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 24,
            padding: "18px 24px",
            borderRadius: 14,
            background: "rgba(235,122,46,0.07)",
            border: "1px solid rgba(235,122,46,0.20)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#EB7A2E",
              animation: "badge-pulse 2s infinite",
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "#f5c9a6",
            }}
          >
            {content.urgencyNote}
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGINA 2 — Formazione Aziendale
// ═══════════════════════════════════════════════════════════════════════════════

export function AsseprimBusinessPageSection({ step }: SectionProps) {
  const content = (step.content as Record<string, unknown>)
    .AsseprimBusinessPage as BusinessContent | undefined;
  if (!content) return null;

  return (
    <>
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className={styles.heroSection}
        style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(800px,90vw)",
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(123,104,238,0.16) 0%, rgba(235,122,46,0.07) 40%, transparent 70%)",
            filter: "blur(22px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div style={{ display: "inline-flex", marginBottom: 30 }}>
          <Badge>{content.eyebrow}</Badge>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(40px,5.5vw,70px)",
            lineHeight: 1.03,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 auto 24px",
            maxWidth: 900,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          {content.headline}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(17px,1.6vw,20px)",
            lineHeight: 1.55,
            color: "#E4E7F0",
            opacity: 0.88,
            maxWidth: 680,
            margin: "0 auto 40px",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          {content.subheadline}
        </p>

        {/* Proof bar */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "6px 20px",
            padding: "11px 24px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 100,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "#E4E7F0",
            opacity: 0.92,
            marginBottom: 36,
          }}
        >
          {[
            "500+ professionisti formati",
            "Percorsi in azienda e one-to-one",
            "Metodo operativo, non teoria",
          ].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
              {i > 0 && <span style={{ color: "#EB7A2E" }}>·</span>}
              <span>{item}</span>
            </span>
          ))}
        </div>

        {/* Customer quote */}
        <div
          style={{
            maxWidth: 580,
            margin: "0 auto",
            padding: "20px 28px",
            borderRadius: 14,
            borderLeft: "3px solid #EB7A2E",
            background: "rgba(235,122,46,0.06)",
            textAlign: "left",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.65,
              color: "#E4E7F0",
              opacity: 0.88,
            }}
          >
            &ldquo;Dopo 60 giorni il team usava Claude ogni giorno. Non avrei creduto possibile un'adozione così rapida.&rdquo;
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#9B9BB0",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            — CEO, PMI manifatturiera · 45 dipendenti
          </p>
        </div>
      </section>

      {/* ── Problems — full-bleed cream ───────────────────────────────────── */}
      <section
        className={styles.salesSectionPadV2}
        style={{ position: "relative", zIndex: 1, isolation: "isolate" }}
      >
        {/* Full-bleed cream band */}
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
              "inset 0 14px 28px -14px rgba(0,0,0,0.22), inset 0 -14px 28px -14px rgba(0,0,0,0.22)",
          }}
        />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,32px)" }}>
          {/* Intro statement */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                margin: "0 auto 12px",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8B6A2A",
              }}
            >
              Il problema
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(26px,3.5vw,42px)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#1A1208",
                margin: "0 auto",
                maxWidth: 680,
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Ogni azienda che formiamo racconta{" "}
              <span
                style={{
                  fontFamily: "var(--font-italic)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#7A4A10",
                }}
              >
                la stessa storia.
              </span>
            </h2>
          </div>

          <div className={styles.painGrid}>
            {content.painItems.map((item, i) => (
              <div
                key={item}
                style={{
                  padding: "clamp(22px,3vw,32px)",
                  borderRadius: 16,
                  background: "rgba(255,252,244,0.65)",
                  border: "1px solid rgba(42,36,32,0.10)",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Large background number */}
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    right: 16,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 80,
                    lineHeight: 1,
                    color: "rgba(42,36,32,0.07)",
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  0{i + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "#2A2420",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offer — dark mid ──────────────────────────────────────────────── */}
      <section
        className={`${styles.salesSectionPadV2} ${styles.sectionDarkMidBg}`}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,32px)" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <SectionLabel>{content.offerTitle}</SectionLabel>
          </div>
          <p
            style={{
              textAlign: "center",
              margin: "12px auto 48px",
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(17px,1.6vw,20px)",
              lineHeight: 1.5,
              color: "#E4E7F0",
              opacity: 0.78,
              maxWidth: 560,
            }}
          >
            Non un corso standard. Un progetto su misura per il tuo scenario.
          </p>

          <div className={styles.offerGrid}>
            {content.offerItems.map((item, i) => {
              const labels = ["Training", "Coaching", "Mentorship", "Percorsi"];
              const icons = ["⚡", "🎯", "👤", "📈"];
              return (
                <div
                  key={item}
                  style={{
                    padding: "clamp(24px,3vw,36px)",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.025)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {/* Mini service header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icons[i]}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#7B68EE",
                      }}
                    >
                      {labels[i]}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: "#E4E7F0",
                      opacity: 0.82,
                    }}
                  >
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process — 01 / 02 / 03 ────────────────────────────────────────── */}
      <section className={styles.salesSectionPadV2}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,32px)" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>{content.processTitle}</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(30px,4vw,48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "#fff",
                margin: "16px auto 0",
                maxWidth: 680,
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Tre passi per partire.{" "}
              <Accent>Nessuna burocrazia.</Accent>
            </h2>
          </div>

          <div className={styles.processGrid}>
            {content.processSteps.map((item, i) => (
              <div
                key={item}
                style={{
                  padding: "clamp(24px,3vw,40px)",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(64px,7vw,80px)",
                    lineHeight: 1,
                    color: "rgba(235,122,46,0.14)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  0{i + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: "#E4E7F0",
                    opacity: 0.85,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ───────────────────────────────────────────────────── */}
      <section
        style={{ position: "relative", zIndex: 1, isolation: "isolate" }}
      >
        {/* Full-bleed warm glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            background:
              "linear-gradient(180deg, rgba(235,122,46,0.09) 0%, rgba(235,122,46,0.15) 50%, rgba(235,122,46,0.09) 100%)",
            zIndex: -1,
          }}
        />

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "clamp(72px,9vw,108px) clamp(20px,4vw,32px)",
            textAlign: "center",
          }}
        >
          {/* Social proof */}
          <p
            style={{
              margin: "0 0 24px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#EB7A2E",
            }}
          >
            Già adottato da 30+ aziende nel 2026
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(36px,5vw,60px)",
              lineHeight: 1.06,
              letterSpacing: "-0.028em",
              color: "#fff",
              margin: "0 auto 22px",
              maxWidth: 620,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            {content.ctaTitle}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(17px,1.6vw,19px)",
              lineHeight: 1.65,
              color: "#E4E7F0",
              opacity: 0.88,
              margin: "0 auto 40px",
              maxWidth: 540,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            {content.ctaBody}
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <PrimaryButton href={content.ctaHref} pulse size="xl">
              {content.ctaLabel} <span style={{ fontSize: 19 }}>→</span>
            </PrimaryButton>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#9B9BB0",
              margin: "0 0 52px",
            }}
          >
            {content.ctaMicrocopy}
          </p>

          {/* Objection handling */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              textAlign: "left",
              maxWidth: 460,
              margin: "0 auto",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 32,
            }}
          >
            {[
              "Nessun impegno prima della call",
              "30 minuti per capire se ha senso lavorare insieme",
              "Risposta diretta: se non è adatto, te lo diciamo",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "#E4E7F0",
                  opacity: 0.78,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "rgba(235,122,46,0.15)",
                    border: "1px solid rgba(235,122,46,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#EB7A2E",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
