"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  WebinarReplayCardsContent,
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

// ─── Sticky Header with countdown ─────────────────────────────────────────────

export function WebinarReplayHeaderSection({ step }: SectionProps) {
  const content: WebinarReplayHeaderContent = step.content.WebinarReplayHeader;
  const targetMs = new Date(content.countdownIso).getTime();

  const [now, setNow] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTinyMobile, setIsTinyMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqTiny = window.matchMedia("(max-width: 380px)");
    const update = () => {
      setIsMobile(mqMobile.matches);
      setIsTinyMobile(mqTiny.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqTiny.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTiny.removeEventListener("change", update);
    };
  }, []);

  const diff = mounted ? Math.max(0, targetMs - now) : 0;
  const expired = mounted && diff <= 0;

  if (expired) {
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
          padding: isMobile ? "0 18px" : "0 32px",
        }}
      >
        <Image
          src="/logo/m-w2.png"
          alt="Morfeus"
          width={120}
          height={isMobile ? 13 : 16}
          priority
          style={{ height: isMobile ? 13 : 16, width: "auto", display: "block" }}
        />
      </header>
    );
  }

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const Cell = ({ n, label }: { n: number; label: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: isMobile ? 26 : 34 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: isMobile ? 18 : 22,
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
          fontSize: isMobile ? 8 : 9,
          fontWeight: 700,
          color: "var(--muted)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginTop: 4,
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
        fontSize: isMobile ? 16 : 20,
        color: "rgba(255,255,255,0.18)",
        lineHeight: 1,
        marginTop: -2,
      }}
    >
      :
    </span>
  );

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
        padding: isMobile ? "0 14px" : "0 32px",
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

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
        {!isTinyMobile && content.label && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? 10 : 11,
              fontWeight: 600,
              color: "var(--muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {content.label}
          </span>
        )}
        <div style={{ display: "inline-flex", alignItems: "center", gap: isMobile ? 4 : 8 }}>
          {!isTinyMobile && (
            <>
              <Cell n={days} label="GG" />
              <Sep />
            </>
          )}
          {!isTinyMobile && (
            <>
              <Cell n={hours} label="HH" />
              <Sep />
            </>
          )}
          <Cell n={mins} label="MIN" />
          <Sep />
          <Cell n={secs} label="SEC" />
        </div>
      </div>
    </header>
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

  const stage: CorsoStage = mounted ? getCorsoStage(now, earlyBirdMs, standardMs) : "earlyBird";

  const corso = content.corso;
  const bootcamp = content.bootcamp;

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

  const bootcampCallHref = bootcamp.callUrl || "#";
  const bootcampCallIsLive = Boolean(bootcamp.callUrl);

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

          {/* Prezzo early bird */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(44px, 8vw, 56px)",
              lineHeight: 1,
              color: "var(--lime)",
              letterSpacing: "-0.02em",
            }}
          >
            {fmtPrice(bootcamp.earlyBirdPrice)} EUR
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(181,240,58,0.7)",
              marginTop: 8,
            }}
          >
            Early bird · prenota la call entro 48h
          </div>

          {/* Prezzo full */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--muted)",
              marginTop: 14,
            }}
          >
            Poi:{" "}
            <span style={{ textDecoration: "line-through" }}>{fmtPrice(bootcamp.fullPrice)} EUR</span>
          </div>

          {/* Opzioni rate */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--muted)",
              marginTop: 6,
            }}
          >
            Oppure: 2 × 680 EUR · 3 × 460 EUR
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
            href={bootcampCallHref}
            target={bootcampCallIsLive ? "_blank" : undefined}
            rel={bootcampCallIsLive ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!bootcampCallIsLive) e.preventDefault();
              trackBootcampCta();
            }}
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
              opacity: bootcampCallIsLive ? 1 : 0.85,
              cursor: bootcampCallIsLive ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (!bootcampCallIsLive) return;
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
            Garanzia di trasferimento: se non riesci a completare il bootcamp, accedi alla prossima cohort gratis.
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
