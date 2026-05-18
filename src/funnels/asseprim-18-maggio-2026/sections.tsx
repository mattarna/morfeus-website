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
        fontFamily: "var(--font-italic, 'Playfair Display', Georgia, serif)",
        fontStyle: "italic",
        fontWeight: 400,
        color: "var(--orange, #EB7A2E)",
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
  variant = "orange",
}: {
  children: React.ReactNode;
  href: string;
  pulse?: boolean;
  fullWidth?: boolean;
  size?: "md" | "lg" | "xl";
  variant?: "orange" | "violet";
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

  const colors = variant === "violet"
    ? { base: "#7B68EE", hover: "#9B8AFF", press: "#6350D8", shadow: "rgba(123,104,238,0.4)", shadowHover: "rgba(123,104,238,0.55)" }
    : { base: "#EB7A2E", hover: "#F09A5C", press: "#D4652A", shadow: "rgba(235,122,46,0.38)", shadowHover: "rgba(235,122,46,0.55)" };

  const bg = press ? colors.press : hover ? colors.hover : colors.base;

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
          ? `0 6px 28px ${colors.shadowHover}`
          : `0 4px 20px ${colors.shadow}`,
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
          paddingTop: 36,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Top row — brand + links */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              morfeus<span style={{ color: "#EB7A2E" }}>hub</span>
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9B9BB0", lineHeight: 1.5 }}>
              Morfeus Hub S.r.l. — P.IVA 14209210963
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9B9BB0", lineHeight: 1.5 }}>
              Via Jacopo del Verme 7, 20159 Milano (MI), Italia
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <a
              href="mailto:hello@morfeushub.com"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#E4E7F0", textDecoration: "none" }}
            >
              hello@morfeushub.com
            </a>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Cookie", "Termini"].map((l) => (
                <a
                  key={l}
                  href={`/it/${l.toLowerCase()}`}
                  style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9B9BB0", textDecoration: "none" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row — copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#6B6B80" }}>
            © {new Date().getFullYear()} Morfeus Hub S.r.l. — Tutti i diritti riservati.
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#6B6B80" }}>
            Milano, Italia
          </span>
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
            fontSize: "clamp(36px,5vw,58px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 auto 28px",
            maxWidth: 820,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          A cosa sei <Accent>interessato?</Accent>
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
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#E4E7F0",
          }}
        >
          Scegli il tuo percorso
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* ── Choice cards ─────────────────────────────────────────────────── */}
      <section className={styles.sectionPad} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className={styles.cardsGrid}>

          {/* ── Card: Claude Unlocked ─────────────────────────────────── */}
          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(235,122,46,0.25)",
              background:
                "linear-gradient(150deg, rgba(235,122,46,0.10) 0%, rgba(11,11,12,0.97) 55%)",
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
                  "linear-gradient(to right, transparent 0%, rgba(235,122,46,0.70) 40%, rgba(235,122,46,0.70) 60%, transparent 100%)",
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
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(235,122,46,0.08)",
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
                Community · Gratuita
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(28px,3.2vw,38px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {content.claudeCardTitle}
              </h2>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.65,
                color: "#E4E7F0",
                opacity: 0.85,
                margin: 0,
                flex: 1,
              }}
            >
              {content.claudeCardBody}
            </p>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                "Formazione live e sessioni con i founder",
                "Workflow AI, casi studio e confronto tra professionisti",
                "Accesso a percorsi strutturati e ambiente di execution",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#E4E7F0",
                    opacity: 0.85,
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

            <PrimaryButton href={content.claudeCtaHref} fullWidth size="lg">
              {content.claudeCtaLabel} <span style={{ fontSize: 18 }}>→</span>
            </PrimaryButton>
          </div>

          {/* ── Card: Formazione Aziendale ──────────────────────────── */}
          <div
            style={{
              borderRadius: 22,
              border: "1px solid rgba(123,104,238,0.25)",
              background:
                "linear-gradient(150deg, rgba(123,104,238,0.10) 0%, rgba(11,11,12,0.97) 55%)",
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
                  "linear-gradient(to right, transparent 0%, rgba(123,104,238,0.70) 40%, rgba(123,104,238,0.70) 60%, transparent 100%)",
                borderRadius: "22px 22px 0 0",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(123,104,238,0.08)",
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
                  fontSize: "clamp(28px,3.2vw,38px)",
                  lineHeight: 1.05,
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
                fontSize: 16,
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
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#E4E7F0",
                    opacity: 0.85,
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

            <PrimaryButton href={content.businessCtaHref} fullWidth size="lg" variant="violet">
              {content.businessCtaLabel} <span style={{ fontSize: 18 }}>→</span>
            </PrimaryButton>
          </div>
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

  const BOOKING_URL = content.ctaHref;
  const painTitles = [
    "Strumenti abbandonati",
    "Tempo sprecato",
    "Resistenza interna",
    "Zero strategia",
  ];

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
              "radial-gradient(ellipse, rgba(235,122,46,0.14) 0%, rgba(123,104,238,0.08) 40%, transparent 70%)",
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
            fontSize: "clamp(32px,4.5vw,54px)",
            lineHeight: 1.1,
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
            margin: "0 auto 36px",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          {content.subheadline}
        </p>

        {/* CTA above the fold */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <PrimaryButton href={BOOKING_URL} size="xl">
            Prenota una chiamata con un esperto <span style={{ fontSize: 19 }}>→</span>
          </PrimaryButton>
        </div>

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
          }}
        >
          {[
            "Più di 2000 professionisti formati",
            "Percorsi in azienda e one-to-one",
            "Metodo operativo, non teoria",
          ].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
              {i > 0 && <span style={{ color: "#EB7A2E" }}>·</span>}
              <span>{item}</span>
            </span>
          ))}
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
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#EB7A2E",
              }}
            >
              Il problema
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(28px,3.8vw,46px)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#1A1208",
                margin: "0 auto",
                maxWidth: 700,
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Ogni azienda che formiamo racconta{" "}
              <span
                style={{
                  fontFamily: "var(--font-italic, 'Playfair Display', Georgia, serif)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#EB7A2E",
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
                  padding: "clamp(24px,3vw,36px)",
                  borderRadius: 16,
                  background: "rgba(255,252,244,0.70)",
                  border: "1px solid rgba(235,122,46,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Large background number */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -10,
                    right: 16,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 80,
                    lineHeight: 1,
                    color: "rgba(235,122,46,0.08)",
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "#1A1208",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {painTitles[i]}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "#3D3530",
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

      {/* ── Offer — what we build together ────────────────────────────────── */}
      <section
        className={styles.salesSectionPadV2}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,32px)" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <SectionLabel>{content.offerTitle}</SectionLabel>
          </div>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px,3.5vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#fff",
              margin: "16px auto 16px",
              maxWidth: 640,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Non un corso standard. <Accent>Un progetto su misura.</Accent>
          </h2>
          <p
            style={{
              textAlign: "center",
              margin: "0 auto 56px",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#E4E7F0",
              opacity: 0.82,
              maxWidth: 560,
            }}
          >
            Costruiamo insieme il percorso più adatto al tuo scenario, al tuo team e ai tuoi obiettivi.
          </p>

          <div className={styles.offerGrid}>
            {content.offerItems.map((item, i) => {
              const labels = ["Training", "Coaching", "Mentorship", "Percorsi"];
              const icons = ["⚡", "🎯", "👤", "📈"];
              return (
                <div
                  key={item}
                  style={{
                    padding: "clamp(28px,3.5vw,40px)",
                    borderRadius: 18,
                    border: "1px solid rgba(235,122,46,0.15)",
                    background: "rgba(235,122,46,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(235,122,46,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      {icons[i]}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "#fff",
                      }}
                    >
                      {labels[i]}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: 17,
                      lineHeight: 1.65,
                      color: "#E4E7F0",
                      opacity: 0.88,
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
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                margin: "0 auto 12px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#EB7A2E",
              }}
            >
              {content.processTitle}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(28px,3.8vw,46px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#1A1208",
                margin: "0 auto",
                maxWidth: 680,
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Tre passi per partire.{" "}
              <span
                style={{
                  fontFamily: "var(--font-italic, 'Playfair Display', Georgia, serif)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#EB7A2E",
                }}
              >
                Nessuna burocrazia.
              </span>
            </h2>
          </div>

          <div className={styles.processGrid}>
            {content.processSteps.map((item, i) => (
              <div
                key={item}
                style={{
                  padding: "clamp(28px,3.5vw,40px)",
                  borderRadius: 18,
                  background: "rgba(255,252,244,0.70)",
                  border: "1px solid rgba(235,122,46,0.12)",
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
                    fontSize: "clamp(52px,6vw,68px)",
                    lineHeight: 1,
                    color: "rgba(235,122,46,0.18)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  0{i + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: "#3D3530",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section — premium dark ────────────────────────────────────── */}
      <section
        style={{ position: "relative", zIndex: 1, isolation: "isolate" }}
      >
        {/* Dark background with subtle gradient */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            background: "#0B0B0C",
            zIndex: -1,
          }}
        />
        {/* Radial accent glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(900px, 90vw)",
            height: 400,
            background: "radial-gradient(ellipse, rgba(235,122,46,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "clamp(80px,10vw,120px) clamp(20px,4vw,32px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 800,
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
              fontSize: "clamp(32px,4.5vw,54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
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
              fontSize: "clamp(17px,1.6vw,20px)",
              lineHeight: 1.65,
              color: "#E4E7F0",
              opacity: 0.88,
              margin: "0 auto 44px",
              maxWidth: 540,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            {content.ctaBody}
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <PrimaryButton href={BOOKING_URL} pulse size="xl">
              {content.ctaLabel} <span style={{ fontSize: 19 }}>→</span>
            </PrimaryButton>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#9B9BB0",
              margin: "0 0 56px",
            }}
          >
            {content.ctaMicrocopy}
          </p>

          {/* Objection handling */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              textAlign: "left",
              maxWidth: 460,
              margin: "0 auto",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 36,
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
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "#E4E7F0",
                  opacity: 0.85,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(235,122,46,0.15)",
                    border: "1px solid rgba(235,122,46,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#EB7A2E",
                    fontSize: 11,
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
