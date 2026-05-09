"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type {
  WebinarReplayCardsContent,
  WebinarReplayCountdownBannerContent,
  WebinarReplayExpiredContent,
  WebinarReplayHeaderContent,
  WebinarReplayVideoContent,
} from "@/funnels/types";

// ─── Shared types ─────────────────────────────────────────────────────────────

interface SectionProps {
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any;
}

// ─── Pricing helpers ──────────────────────────────────────────────────────────

type CorsoStage = "earlyBird" | "standard" | "full";

function getCorsoStage(now: number, earlyBirdMs: number, standardMs: number): CorsoStage {
  if (now < earlyBirdMs) return "earlyBird";
  if (now < standardMs) return "standard";
  return "full";
}

// ─── Inline countdown (in-card) ───────────────────────────────────────────────

function InlineCountdown({
  targetMs,
  now,
  mounted,
  color,
}: {
  targetMs: number;
  now: number;
  mounted: boolean;
  color: string;
}) {
  const diff = mounted ? Math.max(0, targetMs - now) : 0;
  if (mounted && diff <= 0) return null;

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const cells: { n: number; label: string }[] = [
    { n: days, label: "GG" },
    { n: hours, label: "HH" },
    { n: mins, label: "MIN" },
    { n: secs, label: "SEC" },
  ];

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {cells.map((c, i) => (
        <div
          key={c.label}
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 30,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 26,
                lineHeight: 1,
                color,
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {pad(c.n)}
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 4,
                fontFamily: "var(--font-body)",
              }}
            >
              {c.label}
            </span>
          </div>
          {i < cells.length - 1 && (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 22,
                color: "rgba(255,255,255,0.18)",
                lineHeight: 1,
                marginTop: -2,
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Sticky Header (logo + label, no countdown) ───────────────────────────────

export function WebinarReplayHeaderSection({ step }: SectionProps) {
  const content: WebinarReplayHeaderContent = step.content.WebinarReplayHeader;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mqMobile.matches);
    update();
    mqMobile.addEventListener("change", update);
    return () => mqMobile.removeEventListener("change", update);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(11,11,12,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        height: isMobile ? 56 : 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 18px" : "0 32px",
        gap: 12,
      }}
    >
      <Image
        src="/logo/m-w2.png"
        alt="Morfeus"
        width={120}
        height={isMobile ? 13 : 16}
        priority
        style={{ height: isMobile ? 13 : 16, width: "auto", display: "block", flexShrink: 0 }}
      />
      {content.label && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: isMobile ? 10 : 11,
            fontWeight: 700,
            color: "var(--orange)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {content.label}
        </span>
      )}
    </header>
  );
}

// ─── Countdown banner (under video) ───────────────────────────────────────────

export function WebinarReplayCountdownBannerSection({ step }: SectionProps) {
  const content: WebinarReplayCountdownBannerContent = step.content.WebinarReplayCountdownBanner;
  const targetMs = new Date(content.countdownIso).getTime();

  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = mounted ? Math.max(0, targetMs - now) : 0;
  if (mounted && diff <= 0) return null;

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const cells: { n: number; label: string }[] = [
    { n: days, label: "GG" },
    { n: hours, label: "HH" },
    { n: mins, label: "MIN" },
    { n: secs, label: "SEC" },
  ];

  return (
    <section
      style={{
        padding: "32px 24px 0",
        maxWidth: 860,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "rgba(235,122,46,0.06)",
          border: "1px solid rgba(235,122,46,0.25)",
          borderRadius: 14,
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {content.label && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--orange)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {content.label}
          </span>
        )}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "nowrap",
          }}
        >
          {cells.map((c, i) => (
            <div
              key={c.label}
              style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 44,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(32px, 7vw, 44px)",
                    lineHeight: 1,
                    color: "var(--orange)",
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pad(c.n)}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--muted)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: 6,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.label}
                </span>
              </div>
              {i < cells.length - 1 && (
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(26px, 5vw, 36px)",
                    color: "rgba(255,255,255,0.20)",
                    lineHeight: 1,
                    marginTop: -10,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video YouTube embed ──────────────────────────────────────────────────────

export function WebinarReplayVideoSection({ step }: SectionProps) {
  const content: WebinarReplayVideoContent = step.content.WebinarReplayVideo;
  const embedSrc = `https://www.youtube.com/embed/${content.youtubeId}`;

  function trackYoutubeClick() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "youtube_link_click", source: "replay_page" });
  }

  return (
    <section
      style={{
        padding: "80px 24px 0",
        maxWidth: 860,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <iframe
          src={embedSrc}
          title="Webinar Claude — Replay"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <a
          href={content.watchOnYoutubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackYoutubeClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            borderRadius: 100,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.16)",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--ghost)",
            textDecoration: "none",
            transition: "background .2s, border-color .2s, transform .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            aria-hidden
            width="22"
            height="16"
            viewBox="0 0 28 20"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 10 0 10s0 4.7.6 6.9a3.5 3.5 0 0 0 2.5 2.5C5.3 20 14 20 14 20s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5C28 14.7 28 10 28 10s0-4.7-.6-6.9z"
              fill="#FF0033"
            />
            <path d="M11.2 14.3 18.4 10 11.2 5.7v8.6z" fill="#fff" />
          </svg>
          <span>Preferisco guardare su YouTube</span>
          <span style={{ fontSize: 16, opacity: 0.7 }}>→</span>
        </a>
      </div>
    </section>
  );
}

// ─── Context (1-line bridge) ──────────────────────────────────────────────────

export function WebinarReplayContextSection() {
  return (
    <section
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "40px 24px 32px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.85,
          margin: 0,
        }}
      >
        Hai visto il sistema. Questo è il passo successivo.
      </p>
      <div
        aria-hidden
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          maxWidth: 400,
          margin: "32px auto 0",
        }}
      />
    </section>
  );
}

// ─── Two product cards (corso + bootcamp) ─────────────────────────────────────

interface CardCheckProps {
  color: string;
  bg: string;
}

function CheckIcon({ color, bg }: CardCheckProps) {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: bg,
        border: `1px solid ${color}`,
        color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      ✓
    </span>
  );
}

function fmtPrice(value: number): string {
  return new Intl.NumberFormat("it-IT").format(value);
}

export function WebinarReplayCardsSection({ step }: SectionProps) {
  const content: WebinarReplayCardsContent = step.content.WebinarReplayCards;

  const earlyBirdMs = new Date(content.countdownIso).getTime();
  const standardMs = new Date(content.standardDeadlineIso).getTime();

  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const evergreen = content.evergreen === true;
  const stage: CorsoStage = evergreen
    ? "full"
    : mounted
    ? getCorsoStage(now, earlyBirdMs, standardMs)
    : "earlyBird";

  const corso = content.corso;
  const bootcamp = content.bootcamp;

  const corsoTimerTargetMs =
    stage === "earlyBird" ? earlyBirdMs : stage === "standard" ? standardMs : 0;
  const bootcampDeadlineMs = new Date(bootcamp.earlyBirdDeadlineIso).getTime();

  const corsoActivePrice =
    stage === "earlyBird" ? corso.earlyBirdPrice : stage === "standard" ? corso.standardPrice : corso.fullPrice;
  const corsoCheckoutUrl =
    stage === "earlyBird"
      ? corso.checkoutUrlEarlyBird
      : stage === "standard"
      ? corso.checkoutUrlStandard
      : corso.checkoutUrlFull;
  const corsoSubtext =
    stage === "earlyBird"
      ? "Prezzo flash · valido fino al 7 maggio 23:59"
      : stage === "standard"
      ? "Prezzo standard · valido fino al 12 maggio"
      : "Prezzo definitivo";

  function trackCorsoCta() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer)
      w.dataLayer.push({ event: "cta_corso_click", price: corsoActivePrice, stage, source: "replay_page" });
    if (w.fbq) w.fbq("track", "InitiateCheckout", { content_name: "claude-unlocked", value: corsoActivePrice, currency: "EUR" });
  }

  function trackBootcampCta() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "cta_bootcamp_click", source: "replay_page" });
  }

  function trackInfoCorso() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "info_corso_click", source: "replay_page" });
  }

  function trackInfoBootcamp() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "info_bootcamp_click", source: "replay_page" });
  }

  return (
    <section
      style={{
        padding: "48px 24px",
        maxWidth: 960,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {/* CARD SX — Claude Unlocked (corso) */}
        <article
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(235,122,46,0.25)",
            borderRadius: 16,
            padding: 32,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tag */}
          <div style={{ marginBottom: 18 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 100,
                background: "rgba(235,122,46,0.10)",
                border: "1px solid rgba(235,122,46,0.25)",
                color: "var(--orange)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              Corso base
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 34px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 22px",
            }}
          >
            Claude Unlocked
          </h2>

          {/* Prezzo grande */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(44px, 8vw, 56px)",
              lineHeight: 1,
              color: "var(--orange)",
              letterSpacing: "-0.02em",
            }}
          >
            {fmtPrice(corsoActivePrice)} EUR
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
              marginTop: 8,
            }}
          >
            {corsoSubtext}
          </div>

          {/* Countdown corso */}
          {corsoTimerTargetMs > 0 && (
            <div style={{ marginTop: 16 }}>
              <InlineCountdown
                targetMs={corsoTimerTargetMs}
                now={now}
                mounted={mounted}
                color="var(--orange)"
              />
            </div>
          )}

          {/* Price ladder */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--muted)",
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <span
              style={{
                color: stage === "earlyBird" ? "var(--orange)" : "var(--muted)",
                fontWeight: stage === "earlyBird" ? 700 : 400,
                textDecoration: stage !== "earlyBird" ? "line-through" : "none",
              }}
            >
              {fmtPrice(corso.earlyBirdPrice)} EUR
            </span>
            <span style={{ opacity: 0.5 }}>→</span>
            <span
              style={{
                color: stage === "standard" ? "var(--orange)" : "var(--muted)",
                fontWeight: stage === "standard" ? 700 : 400,
                textDecoration: stage === "full" ? "line-through" : "none",
              }}
            >
              {fmtPrice(corso.standardPrice)} EUR
            </span>
            <span style={{ opacity: 0.5 }}>→</span>
            <span
              style={{
                color: stage === "full" ? "var(--orange)" : "var(--muted)",
                fontWeight: stage === "full" ? 700 : 400,
              }}
            >
              {fmtPrice(corso.fullPrice)} EUR
            </span>
          </div>

          {/* Benefit list */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "26px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "10 moduli, ~48 lezioni, accesso immediato",
              "4 live settimanali post-acquisto incluse",
              "Pacchetto skill e plugin pre-costruiti",
            ].map((b) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--ghost)",
                  opacity: 0.92,
                }}
              >
                <CheckIcon color="var(--orange)" bg="rgba(235,122,46,0.10)" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Spacer to push CTA to the bottom */}
          <div style={{ flex: 1, minHeight: 28 }} />

          {/* CTA primario */}
          <a
            href={corsoCheckoutUrl}
            onClick={trackCorsoCta}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              padding: 16,
              borderRadius: 10,
              background: "var(--orange)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: 17,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(235,122,46,0.35)",
              animation: "btn-pulse 2.4s infinite",
              transition: "background .2s, box-shadow .2s, transform .2s",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--orange-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--orange)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Acquista ora — {fmtPrice(corsoActivePrice)} EUR
            <span style={{ fontSize: 18 }}>→</span>
          </a>

          {/* Link secondario */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <Link
              href={corso.salesPageUrl}
              onClick={trackInfoCorso}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ghost)";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Scopri tutti i dettagli →
            </Link>
          </div>
        </article>

        {/* CARD DX — Bootcamp AI Champion */}
        <article
          style={{
            background: "rgba(181,240,58,0.04)",
            border: "1px solid rgba(181,240,58,0.25)",
            borderRadius: 16,
            padding: 32,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tag */}
          <div style={{ marginBottom: 18 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 100,
                background: "rgba(181,240,58,0.10)",
                border: "1px solid rgba(181,240,58,0.25)",
                color: "var(--lime)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              Bootcamp · 25 posti
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 34px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 22px",
            }}
          >
            AI Champion
          </h2>

          {/* Countdown early bird (nascosto in evergreen) */}
          {!evergreen && (
            <>
              <div style={{ marginTop: 4 }}>
                <InlineCountdown
                  targetMs={bootcampDeadlineMs}
                  now={now}
                  mounted={mounted}
                  color="var(--lime)"
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(181,240,58,0.7)",
                  marginTop: 14,
                }}
              >
                Early bird · prenota la call entro 48h
              </div>
            </>
          )}

          {/* Info pagamento */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
              marginTop: 14,
            }}
          >
            Pagamento in un&apos;unica soluzione o rateizzabile
          </div>

          {/* Benefit list */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "26px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "7 sessioni live con i founder (13 settimane)",
              "Progetto reale + supporto WhatsApp",
              "Call di selezione gratuita · zero impegno",
            ].map((b) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--ghost)",
                  opacity: 0.92,
                }}
              >
                <CheckIcon color="var(--lime)" bg="rgba(181,240,58,0.10)" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{ flex: 1, minHeight: 28 }} />

          {/* CTA primario */}
          <a
            href={bootcamp.callUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackBootcampCta}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              padding: 16,
              borderRadius: 10,
              background: "var(--lime)",
              color: "#0B0B0C",
              fontFamily: "var(--font-body)",
              fontSize: 17,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(181,240,58,0.30)",
              animation: "btn-pulse-lime 2.4s infinite",
              transition: "background .2s, box-shadow .2s, transform .2s",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--lime-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--lime)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Prenota la call — è gratuita
            <span style={{ fontSize: 18 }}>→</span>
          </a>

          {/* Link secondario */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <Link
              href={bootcamp.salesPageUrl}
              onClick={trackInfoBootcamp}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ghost)";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Scopri tutti i dettagli →
            </Link>
          </div>

          {/* Garanzia bootcamp */}
          <div
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Garanzia di trasferimento: se non riesci a completare il bootcamp, accedi alla prossima edizione gratis.
          </div>
        </article>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function WebinarReplayFAQSection() {
  const faqs = [
    {
      q: "Posso comprare il corso adesso e salire al bootcamp dopo?",
      a:
        "Sì. Se acquisti Claude Unlocked ora, ricevi un credito fisso di 147 EUR da scalare sull'iscrizione al bootcamp. Non paghi due volte la stessa cosa.",
    },
    {
      q: "Il prezzo del corso sale davvero il 7 maggio?",
      a:
        "Sì, automaticamente. 147 EUR per le prossime 48 ore. Dal 7 maggio: 297 EUR. Dal 13 maggio: 397 EUR definitivo. Non è urgency marketing — è la struttura di lancio che abbiamo comunicato prima del webinar.",
    },
    {
      q: "La call con Mattia è una sales call?",
      a:
        "No. La call esiste perché con 25 posti e 3 mesi di lavoro insieme, un partecipante non motivato rallenta tutti. Mattia valuta il tuo caso d'uso e la tua disponibilità. Se dopo la call non è la cosa giusta per te, non compri. Nessun impegno.",
    },
  ];

  return (
    <section
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--violet)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Domande frequenti
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 38px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: 0,
          }}
        >
          Hai domande?
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {faqs.map((item) => (
          <details
            key={item.q}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                padding: "20px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                fontFamily: "var(--font-body)",
                fontSize: 17,
                fontWeight: 500,
                color: "var(--ghost)",
              }}
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  color: "var(--muted)",
                  fontSize: 14,
                  transition: "transform 0.2s ease",
                }}
              >
                ▸
              </span>
            </summary>
            <div
              style={{
                paddingBottom: 20,
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.8,
              }}
            >
              {item.a}
            </div>
          </details>
        ))}
      </div>
      <style jsx>{`
        details[open] > summary > span[aria-hidden] {
          transform: rotate(90deg);
        }
        summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </section>
  );
}

// ─── Minimal footer ───────────────────────────────────────────────────────────

export function WebinarReplayFooterSection() {
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "var(--muted)",
    textDecoration: "none",
    transition: "color .2s",
  };

  return (
    <footer
      style={{
        padding: "40px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Link
          href="/it/privacy"
          target="_blank"
          rel="noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ghost)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/it/cookies"
          target="_blank"
          rel="noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ghost)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
        >
          Cookie Policy
        </Link>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--muted)",
          margin: 0,
        }}
      >
        © 2026 Morfeus Hub S.r.l. · P.IVA 14209210963 · morfeushub.com
      </p>
    </footer>
  );
}

// ─── Replay Expired Overlay ──────────────────────────────────────────────────
//
// Quando l'orario corrente supera `cutoffIso`, questo componente prende il
// sopravvento sulla pagina replay con un overlay full-screen `position: fixed`
// + `z-index` alto, indipendente dall'ordinamento delle altre sezioni.
//
// Strategia idratazione: prima del mount lato client renderizziamo `null`
// (la pagina replay sotto rimane visibile durante SSR). Al mount controlliamo
// `Date.now()` contro `cutoffIso` e se siamo oltre la deadline montiamo
// l'overlay. Per chi visita la pagina dopo il cutoff c'è un breve flash
// iniziale del replay sotto, immediatamente coperto dall'overlay.

export function WebinarReplayExpiredSection({ step }: SectionProps) {
  const content: WebinarReplayExpiredContent = step.content.WebinarReplayExpired;
  const cutoffMs = new Date(content.cutoffIso).getTime();

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [forcePreview, setForcePreview] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [roleFocus, setRoleFocus] = useState(false);

  const ctaRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Override: ?preview=expired forza l'overlay anche prima del cutoff (utile per
  // QA / per mostrare al team come apparirà la pagina post-scadenza)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setForcePreview(sp.get("preview") === "expired");
  }, []);

  const expired = forcePreview || (mounted && now >= cutoffMs);

  // Blocca scroll del documento sottostante quando l'overlay è attivo
  useEffect(() => {
    if (!expired) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [expired]);

  if (!expired) return null;

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Inserisci una email valida"); return; }
    if (!name.trim()) { setError("Il nome è richiesto"); return; }
    if (!role) { setError("Seleziona la tua professione"); return; }
    if (!privacy) { setError("Serve accettare la privacy policy"); return; }
    setError("");
    setSubmitting(true);
    try {
      const sp = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      const utms: Record<string, string> = {};
      utmKeys.forEach(k => { if (sp.has(k)) utms[k] = sp.get(k)!; });

      const res = await fetch("/api/funnels/webinar-claude/next-webinar-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          role,
          source: "next-webinar-waitlist",
          ...utms,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.dataLayer) w.dataLayer.push({ event: "next_webinar_waitlist_complete", role, ...utms });
      if (w.fbq) w.fbq("track", "Lead", { content_name: "next-webinar-waitlist" });

      setSuccess(true);
    } catch {
      setError("Non siamo riusciti a registrare l'iscrizione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  function trackCorso() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "expired_corso_click", source: "replay_expired" });
  }

  function trackBootcamp() {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: "expired_bootcamp_click", source: "replay_expired" });
  }

  const inputBase: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: 16,
    color: "#fff",
    borderRadius: 10,
    padding: "16px 18px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
  };

  function focusedInputStyle(focused: boolean): React.CSSProperties {
    return {
      ...inputBase,
      background: focused ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
      border: `1px solid ${focused ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
      boxShadow: focused ? "0 0 0 4px rgba(235,122,46,0.08)" : "none",
    };
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="replay-expired-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg, #0b0b0c)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: isMobile ? "48px 20px 56px" : "80px 32px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Image
          src="/logo/m-w2.png"
          alt="Morfeus"
          width={140}
          height={isMobile ? 16 : 20}
          priority
          style={{ height: isMobile ? 16 : 20, width: "auto", display: "block", marginBottom: isMobile ? 36 : 56 }}
        />

        {/* Badge */}
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
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--orange)",
              boxShadow: "0 0 8px rgba(235,122,46,0.6)",
              flexShrink: 0,
            }}
          />
          {content.badge}
        </span>

        {/* Headline */}
        <h1
          id="replay-expired-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: isMobile ? "clamp(40px, 12vw, 56px)" : "clamp(56px, 7vw, 84px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 22px",
          }}
        >
          {content.headlinePre}{" "}
          <span
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--orange)",
            }}
          >
            {content.headlineAccent}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            maxWidth: 540,
            margin: "0 0 44px",
          }}
        >
          {content.subheadline}
        </p>

        {/* Stato 1: solo bottone CTA (prima di aprire il form) */}
        {!formOpen && !success && (
          <button
            type="button"
            onClick={() => {
              setFormOpen(true);
              // focus email al frame successivo
              setTimeout(() => emailRef.current?.focus(), 50);
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: isMobile ? 17 : 18,
              padding: isMobile ? "20px 28px" : "22px 36px",
              borderRadius: 12,
              border: "none",
              background: "var(--orange)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(235,122,46,0.45)",
              cursor: "pointer",
              width: "100%",
              maxWidth: 520,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background .2s, box-shadow .2s, transform .2s",
              animation: "btn-pulse 2.4s infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--orange-hover, #f08a44)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(235,122,46,0.6)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--orange)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(235,122,46,0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {content.ctaLabel} <span style={{ fontSize: 19 }}>→</span>
          </button>
        )}

        {/* Stato 2/3: form aperto o success */}
        {(formOpen || success) && (
        <form
          onSubmit={submit}
          style={{
            width: "100%",
            maxWidth: 520,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: isMobile ? 22 : 28,
            backdropFilter: "blur(10px)",
            position: "relative",
            textAlign: "left",
            boxSizing: "border-box",
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
            {success ? content.successTitle : content.formTitle}
          </div>

          {success ? (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.9,
                margin: 0,
              }}
            >
              {content.successBody}
            </p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="La tua email"
                  autoComplete="email"
                  style={focusedInputStyle(emailFocus)}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  placeholder="Il tuo nome"
                  autoComplete="given-name"
                  style={focusedInputStyle(nameFocus)}
                />
                <div style={{ position: "relative", width: "100%" }}>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onFocus={() => setRoleFocus(true)}
                    onBlur={() => setRoleFocus(false)}
                    style={{
                      ...focusedInputStyle(roleFocus),
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                      color: role ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <option value="" disabled>{content.rolesPlaceholder}</option>
                    {content.rolesOptions.map((o) => (
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
                    Accetto la{" "}
                    <Link href={content.privacyHref} target="_blank" rel="noreferrer" style={{ color: "var(--orange)" }}>
                      privacy policy
                    </Link>{" "}
                    e acconsento al trattamento dei dati.
                  </span>
                </label>

                <button
                  ref={ctaRef}
                  type="submit"
                  disabled={submitting}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 17,
                    padding: "18px 26px",
                    borderRadius: 10,
                    border: "none",
                    background: "var(--orange)",
                    color: "#fff",
                    boxShadow: "0 6px 28px rgba(235,122,46,0.5)",
                    cursor: submitting ? "default" : "pointer",
                    opacity: submitting ? 0.6 : 1,
                    width: "100%",
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "background .2s, box-shadow .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => {
                    if (submitting) return;
                    e.currentTarget.style.background = "var(--orange-hover, #f08a44)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--orange)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {submitting ? "Invio in corso..." : <>{content.formSubmitLabel} <span style={{ fontSize: 18 }}>→</span></>}
                </button>
              </div>

              {error && (
                <div style={{ fontSize: 13, color: "#FF8a6a", marginTop: 12, fontWeight: 500, fontFamily: "var(--font-body)" }}>
                  {error}
                </div>
              )}

              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 14, lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                {content.formMicrocopy}
              </div>
            </>
          )}
        </form>
        )}

        {/* Divider */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            width: "100%",
            maxWidth: 360,
            margin: isMobile ? "44px 0 28px" : "56px 0 32px",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--muted)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Oppure
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Secondary CTAs: corso + bootcamp */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
            width: "100%",
            maxWidth: 520,
          }}
        >
          <Link
            href={content.corsoHref}
            onClick={trackCorso}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              padding: "16px 20px",
              borderRadius: 10,
              border: "1px solid rgba(235,122,46,0.30)",
              background: "rgba(235,122,46,0.06)",
              color: "var(--ghost)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background .2s, border-color .2s, transform .2s",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(235,122,46,0.12)";
              e.currentTarget.style.borderColor = "rgba(235,122,46,0.50)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(235,122,46,0.06)";
              e.currentTarget.style.borderColor = "rgba(235,122,46,0.30)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {content.corsoLabel} <span style={{ fontSize: 16, opacity: 0.8 }}>→</span>
          </Link>

          <Link
            href={content.bootcampHref}
            onClick={trackBootcamp}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              padding: "16px 20px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              color: "var(--ghost)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background .2s, border-color .2s, transform .2s",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {content.bootcampLabel} <span style={{ fontSize: 16, opacity: 0.8 }}>→</span>
          </Link>
        </div>

        {/* Footer mini */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--muted)",
            margin: isMobile ? "40px 0 0" : "56px 0 0",
            opacity: 0.7,
          }}
        >
          © 2026 Morfeus Hub S.r.l. · morfeushub.com
        </p>
      </div>
    </div>
  );
}
