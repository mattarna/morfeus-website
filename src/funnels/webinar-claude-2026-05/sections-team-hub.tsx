"use client";

import { useState } from "react";

// ─── Palette ─────────────────────────────────────────────────────────────────

const ORANGE = "#eb7a2e";
const ORANGE_SOFT = "rgba(235,122,46,0.08)";
const ORANGE_BORDER = "rgba(235,122,46,0.30)";
const LIME = "#B5F03A";
const LIME_SOFT = "rgba(181,240,58,0.08)";
const LIME_BORDER = "rgba(181,240,58,0.30)";
const RED = "#ff5d5d";
const RED_SOFT = "rgba(255,93,93,0.08)";
const RED_BORDER = "rgba(255,93,93,0.30)";
const YELLOW = "#fbbf24";
const YELLOW_SOFT = "rgba(251,191,36,0.08)";
const YELLOW_BORDER = "rgba(251,191,36,0.30)";
const GREEN = "#4ade80";
const GREEN_SOFT = "rgba(74,222,128,0.08)";
const GREEN_BORDER = "rgba(74,222,128,0.30)";

// ─── Primitives ──────────────────────────────────────────────────────────────

type Tone = "corso" | "bootcamp" | "neutral" | "danger" | "warning" | "success";

const toneMap: Record<Tone, { color: string; bg: string; border: string }> = {
  corso: { color: ORANGE, bg: ORANGE_SOFT, border: ORANGE_BORDER },
  bootcamp: { color: LIME, bg: LIME_SOFT, border: LIME_BORDER },
  neutral: { color: "rgba(255,255,255,0.7)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)" },
  danger: { color: RED, bg: RED_SOFT, border: RED_BORDER },
  warning: { color: YELLOW, bg: YELLOW_SOFT, border: YELLOW_BORDER },
  success: { color: GREEN, bg: GREEN_SOFT, border: GREEN_BORDER },
};

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  const t = toneMap[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 100,
        background: t.bg,
        border: `1px solid ${t.border}`,
        color: t.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: "live" | "wip" | "missing" | "auto" | "ready" | "na" }) {
  if (status === "live") return <Pill tone="success">✅ Live</Pill>;
  if (status === "wip") return <Pill tone="warning">🚧 In preparazione</Pill>;
  if (status === "missing") return <Pill tone="danger">⏳ Mancante</Pill>;
  if (status === "auto") return <Pill tone="neutral">⚙️ Automatico</Pill>;
  if (status === "ready") return <Pill tone="success">✅ Pronto</Pill>;
  return <Pill tone="neutral">—</Pill>;
}

function SectionTitle({ children, eyebrow }: { children: React.ReactNode; eyebrow: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 6,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(22px, 2.6vw, 28px)",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          color: "#fff",
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function Card({
  children,
  tone = "neutral",
  padding = "20px 22px",
}: {
  children: React.ReactNode;
  tone?: Tone;
  padding?: string;
}) {
  const t = toneMap[tone];
  return (
    <div
      style={{
        background: tone === "neutral" ? "rgba(255,255,255,0.025)" : t.bg,
        border: `1px solid ${tone === "neutral" ? "rgba(255,255,255,0.08)" : t.border}`,
        borderRadius: 12,
        padding,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

function Th({ children, w }: { children: React.ReactNode; w?: number | string }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "10px 14px",
        fontFamily: "var(--font-body)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color: "var(--muted)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        width: w,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td
      style={{
        padding: "12px 14px",
        fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "var(--font-body)",
        fontSize: mono ? 12 : 13.5,
        lineHeight: 1.5,
        color: "var(--ghost)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        verticalAlign: "top",
        wordBreak: mono ? "break-all" : "normal",
      }}
    >
      {children}
    </td>
  );
}

function CopyableLink({ href, label }: { href: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const display = label ?? href;

  function copy() {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--orange)",
          textDecoration: "none",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12,
          wordBreak: "break-all",
        }}
      >
        {display}
      </a>
      <button
        type="button"
        onClick={copy}
        title="Copia URL"
        style={{
          flexShrink: 0,
          padding: "2px 8px",
          fontSize: 10,
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: copied ? GREEN : "var(--muted)",
          background: copied ? GREEN_SOFT : "rgba(255,255,255,0.04)",
          border: `1px solid ${copied ? GREEN_BORDER : "rgba(255,255,255,0.10)"}`,
          borderRadius: 6,
          cursor: "pointer",
          transition: "all .15s",
        }}
      >
        {copied ? "OK" : "Copia"}
      </button>
    </span>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export function WebinarTeamHubSection() {
  return (
    <div
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "32px 24px 80px",
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "20px 22px",
          background: "linear-gradient(135deg, rgba(235,122,46,0.06) 0%, rgba(181,240,58,0.06) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 14,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <Pill tone="warning">🔒 Pagina interna</Pill>
          <Pill tone="neutral">noindex / nofollow</Pill>
          <Pill tone="neutral">Owner: Matteo</Pill>
          <Pill tone="neutral">Aggiornato: 30 apr 2026</Pill>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.6vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 10px 0",
          }}
        >
          Team Hub — Webinar Claude × Morfeus
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
            maxWidth: 720,
          }}
        >
          Single source of truth per il lancio del 5 maggio 2026. URL, prezzi, timeline, sequenze email, asset mancanti. Condividi solo col team.
        </p>
      </div>

      {/* ── Evento ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Evento">Webinar live · 5 maggio 2026</SectionTitle>
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            <KeyVal label="Data" value="5 Maggio 2026" />
            <KeyVal label="Orario" value="18:00 CET" />
            <KeyVal label="Durata prevista" value="~75 minuti" />
            <KeyVal label="Piattaforma" value="YouTube Live" />
            <KeyVal label="Mittente email" value="matteo@morfeushub.com" mono />
          </div>
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <KeyVal
              label="Titolo"
              value={`"Quello che ho imparato in 300+ ore di Claude — e che il 95% non sa"`}
            />
          </div>
        </Card>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Timeline critica">Date che fanno cambiare prezzo o stato</SectionTitle>
        <Card padding="0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={170}>Data</Th>
                <Th w={210}>Evento</Th>
                <Th>Cosa cambia</Th>
              </tr>
            </thead>
            <tbody>
              <TimelineRow date="5 maggio" event="Webinar live" change="Carrello aperto" />
              <TimelineRow
                date="7 maggio · 23:59"
                event="Fine flash 48h"
                change={
                  <span>
                    <Pill tone="corso">Corso</Pill> 147€ → 297€ &nbsp;·&nbsp; <Pill tone="bootcamp">Bootcamp</Pill> early bird chiude: 1.297€ → 1.500€
                  </span>
                }
              />
              <TimelineRow
                date="12 maggio · martedì"
                event="Live #1"
                change={
                  <span>
                    <Pill tone="corso">Corso</Pill> 297€ → 397€
                  </span>
                }
              />
              <TimelineRow
                date="13 maggio"
                event="Corso evergreen"
                change={
                  <span>
                    <Pill tone="corso">Corso</Pill> 397€ fisso da qui in poi
                  </span>
                }
              />
              <TimelineRow date="19 maggio · martedì" event="Live #2" change="—" />
              <TimelineRow
                date="26 maggio · martedì"
                event="Live #3"
                change={
                  <span>
                    <Pill tone="bootcamp">Bootcamp</Pill> deadline prenotazione call Mattia
                  </span>
                }
              />
              <TimelineRow date="2 giugno · martedì" event="Live #4" change="—" />
              <TimelineRow
                date="Prima settimana giugno"
                event="Bootcamp inizia"
                change="—"
                last
              />
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Prodotti & Pricing ────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Prodotti & pricing">Listini, finestre, leve commerciali</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 16,
          }}
        >
          {/* Corso card */}
          <Card tone="corso">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Pill tone="corso">Corso</Pill>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Claude Unlocked
              </h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 14 }}>
              <thead>
                <tr>
                  <Th w={140}>Tier</Th>
                  <Th w={90}>Prezzo</Th>
                  <Th>Finestra</Th>
                </tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>
                    <strong style={{ color: "#fff" }}>Flash 48h</strong>
                  </Td>
                  <Td>
                    <span style={{ color: ORANGE, fontWeight: 700 }}>147€</span>
                  </Td>
                  <Td>5 mag → 7 mag 23:59</Td>
                </Tr>
                <Tr>
                  <Td>
                    <strong style={{ color: "#fff" }}>Launch week</strong>
                  </Td>
                  <Td>
                    <span style={{ color: ORANGE, fontWeight: 700 }}>297€</span>
                  </Td>
                  <Td>7 mag → 12 mag 23:59</Td>
                </Tr>
                <Tr last>
                  <Td>
                    <strong style={{ color: "#fff" }}>Evergreen</strong>
                  </Td>
                  <Td>
                    <span style={{ color: ORANGE, fontWeight: 700 }}>397€</span>
                  </Td>
                  <Td>Dal 13 maggio</Td>
                </Tr>
              </tbody>
            </table>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.9,
              }}
            >
              <li>
                Credito verso bootcamp: <strong style={{ color: ORANGE }}>147€ fisso</strong> (indipendente dal prezzo pagato)
              </li>
              <li>
                Checkout: <Pill tone="danger">⏳ In arrivo</Pill>
              </li>
            </ul>
          </Card>

          {/* Bootcamp card */}
          <Card tone="bootcamp">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Pill tone="bootcamp">Bootcamp</Pill>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                AI Champion
              </h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 14 }}>
              <thead>
                <tr>
                  <Th w={170}>Tipo</Th>
                  <Th w={100}>Prezzo</Th>
                  <Th>Finestra</Th>
                </tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>
                    <strong style={{ color: "#fff" }}>Early bird</strong>
                  </Td>
                  <Td>
                    <span style={{ color: LIME, fontWeight: 700 }}>1.297€</span>
                  </Td>
                  <Td>Fino al 7 mag 23:59</Td>
                </Tr>
                <Tr>
                  <Td>
                    <strong style={{ color: "#fff" }}>Leva Mattia</strong>
                    <br />
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>(in call, non pubblica)</span>
                  </Td>
                  <Td>
                    <span style={{ color: LIME, fontWeight: 700 }}>1.197€</span>
                  </Td>
                  <Td>Solo in call</Td>
                </Tr>
                <Tr last>
                  <Td>
                    <strong style={{ color: "#fff" }}>Full price</strong>
                  </Td>
                  <Td>
                    <span style={{ color: LIME, fontWeight: 700 }}>1.500€</span>
                  </Td>
                  <Td>Dall&apos;8 maggio</Td>
                </Tr>
              </tbody>
            </table>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.9,
                marginBottom: 10,
              }}
            >
              <strong style={{ color: "#fff" }}>Rate early bird:</strong> 2×680€ = 1.360€ · 3×460€ = 1.380€<br />
              <strong style={{ color: "#fff" }}>Rate full price:</strong> 2×800€ = 1.600€ · 3×550€ = 1.650€
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.9,
              }}
            >
              <li>
                Posti: <strong style={{ color: LIME }}>25 cap fisso</strong>
              </li>
              <li>Vendita: solo via call di selezione con Mattia (no checkout diretto)</li>
              <li>Deadline prenotazione call: 26 maggio (Live #3)</li>
              <li>
                Calendly Mattia: <Pill tone="danger">⏳ In arrivo</Pill>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* ── Link funnel webinar ──────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Link · Funnel webinar">Pagine pubbliche del funnel</SectionTitle>
        <Card padding="0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={260}>Pagina</Th>
                <Th>URL</Th>
                <Th w={170}>Stato</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Optin page</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/webinar-claude" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Thank you (post-registrazione)</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/webinar-claude/thank-you" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Replay</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/webinar-claude/replay" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>YouTube Live</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://youtube.com/live/Pa2-LKvlJ3g?feature=share" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Google Calendar (template)</strong>
                </Td>
                <Td>
                  <CopyableLink
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar%3A+come+usare+Claude+come+un+Pro+%E2%80%94+Morfeus+%7C+Matteo+Arnaboldi&dates=20260505T160000Z%2F20260505T171500Z&location=YouTube+Live&ctz=Europe%2FRome"
                    label="https://calendar.google.com/calendar/render?action=TEMPLATE&… (link completo nella thank-you page)"
                  />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr last>
                <Td>
                  <strong style={{ color: "#fff" }}>Apple / Outlook (.ics)</strong>
                </Td>
                <Td>Generato automaticamente nella thank-you page</Td>
                <Td>
                  <StatusBadge status="auto" />
                </Td>
              </Tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Link prodotti ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Link · Prodotti">Sales page, TY page, checkout</SectionTitle>
        <Card padding="0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={100}>Tag</Th>
                <Th w={230}>Pagina</Th>
                <Th>URL</Th>
                <Th w={170}>Stato</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Sales Page V1</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/claude-unlocked-v1" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Sales Page V2</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/claude-unlocked-v2" />
                </Td>
                <Td>
                  <StatusBadge status="wip" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Sales Page V1</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Sales Page V2</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion-v2" />
                </Td>
                <Td>
                  <StatusBadge status="wip" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Checkout</strong>
                </Td>
                <Td>
                  <span style={{ color: "var(--muted)", fontStyle: "italic" }}>(in arrivo)</span>
                </Td>
                <Td>
                  <StatusBadge status="missing" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Checkout</strong>
                </Td>
                <Td>
                  <span style={{ color: "var(--muted)" }}>n/a — vendita solo via call Mattia</span>
                </Td>
                <Td>
                  <StatusBadge status="na" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>TY page (post-acquisto)</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/claude-unlocked-v1/access-9x4q2k7n" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>TY page (post-acquisto)</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion/access-25-m3p8r7q4" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr last>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill>
                </Td>
                <Td>
                  <strong style={{ color: "#fff" }}>Calendly Mattia (call)</strong>
                </Td>
                <Td>
                  <span style={{ color: "var(--muted)", fontStyle: "italic" }}>(in arrivo)</span>
                </Td>
                <Td>
                  <StatusBadge status="missing" />
                </Td>
              </Tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Link community + freebie ─────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Link · Community & freebie">Asset organici e community</SectionTitle>
        <Card padding="0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={260}>Cosa</Th>
                <Th>URL</Th>
                <Th w={120}>Stato</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Community Circle</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <strong style={{ color: "#fff" }}>Freebie Cowork Setup</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/claude-skill-anatomy" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
              <Tr last>
                <Td>
                  <strong style={{ color: "#fff" }}>Freebie Caroselli IG</strong>
                </Td>
                <Td>
                  <CopyableLink href="https://www.morfeushub.com/instagram-carousel-skills" />
                </Td>
                <Td>
                  <StatusBadge status="live" />
                </Td>
              </Tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Email sequences ──────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Email sequences">Panoramica flussi Brevo</SectionTitle>
        <Card padding="0">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={210}>Flusso</Th>
                <Th w={70}>Cod.</Th>
                <Th>Email incluse</Th>
                <Th w={120}>Stato</Th>
              </tr>
            </thead>
            <tbody>
              <EmailFlowRow
                name="Caldi (già iscritti)"
                code="A"
                emails="A1 data ufficiale · A2 cosa vedrai"
              />
              <EmailFlowRow
                name="Lista esistente"
                code="B"
                emails="B1 lancio · B2 followup · B3 social proof · B4 ultimo treno"
              />
              <EmailFlowRow
                name="Nuovi iscritti"
                code="C"
                emails="C1 conferma · C2 problema che nessuno nomina"
              />
              <EmailFlowRow
                name="Reminder (tutti)"
                code="R"
                emails="R1 28apr · R2 30apr · R3 2mag · R4 4mag sera · R5 mattina 5mag · R6 1h prima · R7 live"
              />
              <EmailFlowRow
                name="Post-webinar — Corso"
                code="PW"
                emails="PW1 replay · PW2 differenziazione · PW3 proof · PW4 obiezioni · PW5 scarcity · PW6 last call · PW7 bootcamp"
                tone="corso"
              />
              <EmailFlowRow
                name="Post-webinar — Grazie (no acquisto)"
                code="TY"
                emails="TY1 grazie · TY2 evergreen"
              />
              <EmailFlowRow
                name="Acquirenti Corso"
                code="AQ"
                emails="AQ1 stripe · AQ2 welcome · AQ3 upsell bootcamp · AQ4 produzione · AQ5 corso pronto · AQ6 onboarding"
                tone="corso"
              />
              <EmailFlowRow
                name="Acquirenti Bootcamp"
                code="AB"
                emails="AB1 stripe · AB2 welcome · AB3 reminder sessione"
                tone="bootcamp"
                last
              />
            </tbody>
          </table>
        </Card>

        {/* UTM */}
        <div style={{ marginTop: 18 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "-0.01em",
              color: "#fff",
              margin: "0 0 10px 0",
            }}
          >
            UTM — formato standard
          </h3>
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12.5,
              color: "var(--ghost)",
              marginBottom: 14,
              wordBreak: "break-all",
            }}
          >
            ?utm_source=brevo&amp;utm_medium=email&amp;utm_campaign=[flusso]&amp;utm_content=[email_id]
          </div>
          <Card padding="0">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th w={150}>Email</Th>
                  <Th w={280}>utm_campaign</Th>
                  <Th>utm_content</Th>
                </tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>C1</Td>
                  <Td mono>webinar-flusso-c</Td>
                  <Td mono>c1</Td>
                </Tr>
                <Tr>
                  <Td>C2</Td>
                  <Td mono>webinar-flusso-c</Td>
                  <Td mono>c2</Td>
                </Tr>
                <Tr>
                  <Td>A1</Td>
                  <Td mono>webinar-flusso-a</Td>
                  <Td mono>a1</Td>
                </Tr>
                <Tr>
                  <Td>B1</Td>
                  <Td mono>webinar-flusso-b</Td>
                  <Td mono>b1</Td>
                </Tr>
                <Tr>
                  <Td>PW1–PW7</Td>
                  <Td mono>webinar-post-corso</Td>
                  <Td mono>pw1 … pw7</Td>
                </Tr>
                <Tr>
                  <Td>AQ1–AQ6</Td>
                  <Td mono>webinar-acquirenti-corso</Td>
                  <Td mono>aq1 … aq6</Td>
                </Tr>
                <Tr last>
                  <Td>AB1–AB3</Td>
                  <Td mono>webinar-acquirenti-bootcamp</Td>
                  <Td mono>ab1 … ab3</Td>
                </Tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* ── Ancora mancante ──────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <SectionTitle eyebrow="Ancora mancante">Asset bloccanti per il go-live</SectionTitle>
        <Card padding="0" tone="danger">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th w={250}>Cosa</Th>
                <Th w={170}>Chi deve fornire</Th>
                <Th w={140}>Urgenza</Th>
                <Th>Note</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill> &nbsp;<strong style={{ color: "#fff" }}>Checkout</strong>
                </Td>
                <Td>Matteo</Td>
                <Td>
                  <Pill tone="danger">🔴 Prima del webinar</Pill>
                </Td>
                <Td>Serve nelle email PW come CTA acquisto</Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill> &nbsp;<strong style={{ color: "#fff" }}>Calendly Mattia</strong>
                </Td>
                <Td>Mattia / Matteo</Td>
                <Td>
                  <Pill tone="danger">🔴 Prima del webinar</Pill>
                </Td>
                <Td>Serve in email PW7, AQ3 e nella sales page bootcamp</Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="corso">Corso</Pill> &nbsp;<strong style={{ color: "#fff" }}>Sales Page V2</strong>
                </Td>
                <Td>Team / Dev</Td>
                <Td>
                  <Pill tone="warning">🟡 Post-webinar</Pill>
                </Td>
                <Td>V1 è live, V2 è upgrade copy</Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill> &nbsp;<strong style={{ color: "#fff" }}>Sales Page V2</strong>
                </Td>
                <Td>Team / Dev</Td>
                <Td>
                  <Pill tone="warning">🟡 Post-webinar</Pill>
                </Td>
                <Td>V1 è live, V2 è upgrade copy</Td>
              </Tr>
              <Tr>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill> &nbsp;<strong style={{ color: "#fff" }}>Date prima cohort</strong>
                </Td>
                <Td>Matteo</Td>
                <Td>
                  <Pill tone="warning">🟡 Prima del Live #1</Pill>
                </Td>
                <Td>Da comunicare agli iscritti call</Td>
              </Tr>
              <Tr last>
                <Td>
                  <Pill tone="bootcamp">Bootcamp</Pill> &nbsp;<strong style={{ color: "#fff" }}>Video testimonianze cohort</strong>
                </Td>
                <Td>Matteo</Td>
                <Td>
                  <Pill tone="warning">🟡 Pre-Live #1</Pill>
                </Td>
                <Td>3–5 video per sales page bootcamp V2</Td>
              </Tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 48,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--muted)",
            margin: 0,
            opacity: 0.7,
          }}
        >
          Owner: Matteo Arnaboldi · matteo@morfeushub.com · Aggiornato 30 aprile 2026
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--muted)",
            margin: "6px 0 0 0",
            opacity: 0.55,
            fontStyle: "italic",
          }}
        >
          Pagina interna · noindex / nofollow
        </p>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function KeyVal({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "var(--font-display)",
          fontSize: mono ? 13 : 16,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: mono ? 0 : "-0.005em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Tr({ children }: { children: React.ReactNode; last?: boolean }) {
  return <tr>{children}</tr>;
}

function TimelineRow({
  date,
  event,
  change,
  last,
}: {
  date: string;
  event: string;
  change: React.ReactNode;
  last?: boolean;
}) {
  return (
    <tr>
      <Td>
        <strong style={{ color: "#fff" }}>{date}</strong>
      </Td>
      <Td>{event}</Td>
      <td
        style={{
          padding: "12px 14px",
          fontFamily: "var(--font-body)",
          fontSize: 13.5,
          lineHeight: 1.5,
          color: "var(--ghost)",
          borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
          verticalAlign: "top",
        }}
      >
        {change}
      </td>
    </tr>
  );
}

function EmailFlowRow({
  name,
  code,
  emails,
  tone,
}: {
  name: string;
  code: string;
  emails: string;
  tone?: Tone;
  last?: boolean;
}) {
  return (
    <tr>
      <Td>
        {tone ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Pill tone={tone}>{tone === "corso" ? "Corso" : "Bootcamp"}</Pill>
            <strong style={{ color: "#fff" }}>{name}</strong>
          </span>
        ) : (
          <strong style={{ color: "#fff" }}>{name}</strong>
        )}
      </Td>
      <Td>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 6,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 12,
            color: "#fff",
          }}
        >
          {code}
        </span>
      </Td>
      <Td>{emails}</Td>
      <Td>
        <StatusBadge status="ready" />
      </Td>
    </tr>
  );
}
