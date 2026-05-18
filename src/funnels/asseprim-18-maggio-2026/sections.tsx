"use client";

import Link from "next/link";
import { useState } from "react";
import type { FunnelStepConfig } from "@/funnels/types";
import styles from "./sections.module.css";

// ─── Shared prop shape ────────────────────────────────────────────────────────

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
      <span
        style={{
          width: 24,
          height: 1,
          background: "var(--violet)",
          opacity: 0.5,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href,
  pulse,
  fullWidth,
}: {
  children: React.ReactNode;
  href: string;
  pulse?: boolean;
  fullWidth?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <Link
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
        fontSize: "clamp(15px, 1.6vw, 18px)",
        padding: "clamp(14px, 3.5vw, 20px) clamp(20px, 5vw, 36px)",
        borderRadius: 10,
        border: "none",
        background: press
          ? "var(--orange-pressed)"
          : hover
          ? "var(--orange-hover)"
          : "var(--orange)",
        color: "#0B0B0C",
        boxShadow: hover
          ? "0 6px 28px rgba(235,122,46,0.50)"
          : "0 4px 20px rgba(235,122,46,0.35)",
        transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
        transition: "background .2s, box-shadow .2s, transform .2s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        animation: pulse ? "btn-pulse 2.4s infinite" : "none",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </Link>
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
    <Link
      href={href}
      data-funnel-cta="true"
      data-cta-href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "clamp(15px, 1.6vw, 18px)",
        padding: "clamp(14px, 3.5vw, 20px) clamp(20px, 5vw, 36px)",
        borderRadius: 10,
        border: "1.5px solid rgba(255,255,255,0.22)",
        background: hover ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.025)",
        color: "var(--ghost)",
        transition: "background .2s, border-color .2s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: fullWidth ? "100%" : "auto",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </Link>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        fontFamily: "var(--font-body)",
        fontSize: 17,
        lineHeight: 1.6,
        color: "var(--ghost)",
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
          border: "1px solid rgba(235,122,46,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--orange)",
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        ✓
      </span>
      <span>{children}</span>
    </div>
  );
}

function CrossItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        fontFamily: "var(--font-body)",
        fontSize: 17,
        lineHeight: 1.6,
        color: "#c9c9d8",
      }}
    >
      <span
        style={{
          flexShrink: 0,
          marginTop: 3,
          color: "var(--muted)",
          fontSize: 16,
          opacity: 0.7,
        }}
      >
        ·
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className={styles.header}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--white)",
              letterSpacing: "-0.02em",
            }}
          >
            morfeus
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--orange)",
              letterSpacing: "-0.02em",
            }}
          >
            hub
          </span>
        </Link>
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
          borderTop: "1px solid var(--hairline)",
          paddingTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          © 2026 Morfeus Hub — P.IVA 12345678901
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link
            href="/it/privacy"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Privacy
          </Link>
          <Link
            href="/it/cookies"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Routing Page ─────────────────────────────────────────────────────────────

export function AsseprimRoutingPageSection({ step }: SectionProps) {
  const content = (step.content as Record<string, unknown>)
    .AsseprimRoutingPage as RoutingContent | undefined;
  if (!content) return null;

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className={styles.heroSection}
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(800px, 90vw)",
            height: 280,
            background:
              "radial-gradient(ellipse, rgba(235,122,46,0.13) 0%, rgba(123,104,238,0.07) 40%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div style={{ display: "inline-flex", marginBottom: 28 }}>
          <Badge>{content.eyebrow}</Badge>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(44px, 7vw, 80px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "var(--white)",
            margin: "0 auto 24px",
            maxWidth: 800,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          A cosa sei{" "}
          <Accent>interessato?</Accent>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.9,
            maxWidth: 640,
            margin: "0 auto",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          {content.subheadline}
        </p>
      </section>

      {/* Choice cards */}
      <section
        className={styles.sectionPad}
        style={{ maxWidth: 1120, margin: "0 auto" }}
      >
        <div className={styles.cardsGrid}>
          {/* Claude Unlocked — primary */}
          <div
            style={{
              borderRadius: 20,
              border: "1px solid rgba(235,122,46,0.30)",
              background:
                "linear-gradient(145deg, rgba(235,122,46,0.08) 0%, rgba(11,11,12,0.95) 60%)",
              padding: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Card glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(235,122,46,0.09)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: "rgba(235,122,46,0.12)",
                  border: "1px solid rgba(235,122,46,0.30)",
                  color: "var(--orange)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    animation: "badge-pulse 2s infinite",
                  }}
                />
                Offerta webinar · 24 ore
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
                  margin: 0,
                }}
              >
                {content.claudeCardTitle}
              </h2>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--ghost)",
                opacity: 0.88,
                margin: 0,
                flex: 1,
              }}
            >
              {content.claudeCardBody}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 36,
                  color: "var(--orange)",
                  letterSpacing: "-0.03em",
                }}
              >
                297€
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--muted)",
                  textDecoration: "line-through",
                }}
              >
                397€
              </span>
            </div>

            <PrimaryButton href={content.claudeCtaHref} pulse fullWidth>
              {content.claudeCtaLabel} <span style={{ fontSize: 18 }}>→</span>
            </PrimaryButton>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--muted)",
                margin: 0,
                textAlign: "center",
              }}
            >
              Accesso immediato · Garanzia 14 giorni
            </p>
          </div>

          {/* Formazione aziendale — secondary */}
          <div
            style={{
              borderRadius: 20,
              border: "1px solid rgba(123,104,238,0.20)",
              background:
                "linear-gradient(145deg, rgba(123,104,238,0.06) 0%, rgba(11,11,12,0.95) 60%)",
              padding: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(123,104,238,0.07)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: "rgba(123,104,238,0.10)",
                  border: "1px solid rgba(123,104,238,0.25)",
                  color: "var(--violet)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  marginBottom: 16,
                }}
              >
                Aziende · Team · Manager
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
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
                color: "var(--ghost)",
                opacity: 0.88,
                margin: 0,
                flex: 1,
              }}
            >
              {content.businessCardBody}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Training interno per team",
                "Coaching per imprenditori e manager",
                "Mentorship e percorsi one-to-one",
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>

            <OutlineButton href={content.businessCtaHref} fullWidth>
              {content.businessCtaLabel} <span style={{ fontSize: 18 }}>→</span>
            </OutlineButton>
          </div>
        </div>

        {/* Urgency note */}
        <div
          style={{
            marginTop: 28,
            padding: "16px 20px",
            borderRadius: 12,
            background: "rgba(235,122,46,0.06)",
            border: "1px solid rgba(235,122,46,0.18)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--orange)",
              animation: "badge-pulse 2s infinite",
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "#ffd6b6",
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

// ─── Business Page ────────────────────────────────────────────────────────────

export function AsseprimBusinessPageSection({ step }: SectionProps) {
  const content = (step.content as Record<string, unknown>)
    .AsseprimBusinessPage as BusinessContent | undefined;
  if (!content) return null;

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className={styles.heroSection}
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(800px, 90vw)",
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(123,104,238,0.14) 0%, rgba(235,122,46,0.06) 40%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div style={{ display: "inline-flex", marginBottom: 28 }}>
          <Badge>{content.eyebrow}</Badge>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(38px, 5.5vw, 68px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--white)",
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
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.9,
            maxWidth: 700,
            margin: "0 auto 48px",
            textWrap: "pretty" as React.CSSProperties["textWrap"],
          }}
        >
          {content.subheadline}
        </p>

        {/* Proof stats */}
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
            fontSize: 15,
            color: "var(--ghost)",
            opacity: 0.92,
          }}
        >
          {[
            "500+ professionisti formati",
            "Percorsi in azienda e one-to-one",
            "Metodo operativo, non teoria",
          ].map((item, i) => (
            <span
              key={i}
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              {i > 0 && (
                <span style={{ color: "var(--orange)", opacity: 0.7 }}>·</span>
              )}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Problems — full-bleed cream */}
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
              "inset 0 12px 24px -12px rgba(0,0,0,0.20), inset 0 -12px 24px -12px rgba(0,0,0,0.20)",
          }}
        />

        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 32px)",
          }}
        >
          <div style={{ marginBottom: 44, textAlign: "center" }}>
            <SectionLabel>{content.painTitle}</SectionLabel>
          </div>

          <div className={styles.painGrid}>
            {content.painItems.map((item) => (
              <div
                key={item}
                style={{
                  padding: "24px 28px",
                  borderRadius: 16,
                  background: "rgba(15,15,26,0.05)",
                  border: "1px solid rgba(15,15,26,0.08)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(63,107,10,0.10)",
                    border: "1px solid rgba(63,107,10,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3F6B0A",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  ·
                </span>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "#2A2420",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer — dark mid */}
      <section
        className={`${styles.salesSectionPadV2} ${styles.sectionDarkMidBg}`}
        style={{ maxWidth: 1120, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>{content.offerTitle}</SectionLabel>
        </div>

        <div className={styles.offerGrid}>
          {content.offerItems.map((item) => (
            <div
              key={item}
              style={{
                padding: "28px 28px",
                borderRadius: 16,
                border: "1px solid var(--hairline)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <CheckItem>{item}</CheckItem>
            </div>
          ))}
        </div>
      </section>

      {/* Process — numbered steps */}
      <section
        className={styles.salesSectionPadV2}
        style={{ maxWidth: 1120, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>{content.processTitle}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--white)",
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
                padding: "clamp(24px, 3vw, 36px)",
                borderRadius: 18,
                border: "1px solid var(--hairline)",
                background: "rgba(255,255,255,0.02)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 48,
                  lineHeight: 1,
                  color: "rgba(235,122,46,0.18)",
                  letterSpacing: "-0.04em",
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
                  color: "var(--ghost)",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          isolation: "isolate",
        }}
      >
        {/* Full-bleed orange warm glow */}
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
              "linear-gradient(180deg, rgba(235,122,46,0.08) 0%, rgba(235,122,46,0.12) 50%, rgba(235,122,46,0.08) 100%)",
            zIndex: -1,
          }}
        />

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 32px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--white)",
              margin: "0 auto 20px",
              maxWidth: 620,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            {content.ctaTitle}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(17px, 1.6vw, 19px)",
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.9,
              margin: "0 auto 36px",
              maxWidth: 560,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            {content.ctaBody}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <PrimaryButton href={content.ctaHref} pulse>
              {content.ctaLabel}{" "}
              <span style={{ fontSize: 18 }}>→</span>
            </PrimaryButton>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            {content.ctaMicrocopy}
          </p>

          <div
            style={{
              marginTop: 56,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "left",
                maxWidth: 480,
                width: "100%",
              }}
            >
              {[
                "Nessun impegno prima della call",
                "30 minuti per capire se ha senso lavorare insieme",
                "Risposta diretta: se non è adatto alla tua azienda, te lo diciamo",
              ].map((item) => (
                <CrossItem key={item}>{item}</CrossItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
