"use client";

import { useState } from "react";
import styles from "./team-hub.module.css";

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
  neutral: { color: "rgba(255,255,255,0.75)", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)" },
  danger: { color: RED, bg: RED_SOFT, border: RED_BORDER },
  warning: { color: YELLOW, bg: YELLOW_SOFT, border: YELLOW_BORDER },
  success: { color: GREEN, bg: GREEN_SOFT, border: GREEN_BORDER },
};

function Pill({ children, tone = "neutral", size = "md" }: { children: React.ReactNode; tone?: Tone; size?: "sm" | "md" }) {
  const t = toneMap[tone];
  const isSm = size === "sm";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: isSm ? "3px 9px" : "5px 12px",
        borderRadius: 100,
        background: t.bg,
        border: `1px solid ${t.border}`,
        color: t.color,
        fontSize: isSm ? 11 : 12,
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

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h2 className={styles.h2}>{title}</h2>
    </div>
  );
}

function Card({
  children,
  tone = "neutral",
  padding,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "corso" | "bootcamp";
  padding?: string;
}) {
  const cls =
    tone === "corso"
      ? `${styles.card} ${styles.cardCorso}`
      : tone === "bootcamp"
        ? `${styles.card} ${styles.cardBootcamp}`
        : styles.card;
  return (
    <div className={cls} style={padding ? { padding } : undefined}>
      {children}
    </div>
  );
}

function Td({ children, label, mono }: { children: React.ReactNode; label?: string; mono?: boolean }) {
  return (
    <td data-label={label ?? ""} className={mono ? styles.mono : undefined}>
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
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--orange)",
          textDecoration: "none",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 13.5,
          lineHeight: 1.5,
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
          padding: "4px 10px",
          fontSize: 11,
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: copied ? GREEN : "rgba(255,255,255,0.7)",
          background: copied ? GREEN_SOFT : "rgba(255,255,255,0.06)",
          border: `1px solid ${copied ? GREEN_BORDER : "rgba(255,255,255,0.14)"}`,
          borderRadius: 6,
          cursor: "pointer",
          transition: "all .15s",
        }}
      >
        {copied ? "Copiato" : "Copia"}
      </button>
    </span>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export function WebinarTeamHubSection() {
  return (
    <div className={styles.container}>
      {/* ── Hero header ─────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroPills}>
          <Pill tone="warning">🔒 Pagina interna</Pill>
          <Pill tone="neutral">noindex / nofollow</Pill>
          <Pill tone="neutral" size="sm">Owner: Matteo</Pill>
          <Pill tone="neutral" size="sm">Aggiornato 30 apr 2026</Pill>
        </div>
        <h1 className={styles.heroTitle}>Team Hub — Webinar Claude × Morfeus</h1>
        <p className={styles.heroSub}>
          Single source of truth per il lancio del 5 maggio 2026. URL, prezzi, timeline, sequenze email, asset mancanti. Condividi solo col team.
        </p>
      </div>

      {/* ── Evento ──────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Evento" title="Webinar live · 5 maggio 2026" />
        <Card>
          <div className={styles.kvGrid}>
            <KeyVal label="Data" value="5 Maggio 2026" />
            <KeyVal label="Orario" value="18:00 CET" />
            <KeyVal label="Durata" value="~75 minuti" />
            <KeyVal label="Piattaforma" value="YouTube Live" />
            <KeyVal label="Mittente email" value="matteo@morfeushub.com" mono />
          </div>
          <div style={{ marginTop: 22, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <KeyVal
              label="Titolo"
              value={`"Quello che ho imparato in 300+ ore di Claude — e che il 95% non sa"`}
            />
          </div>
        </Card>
      </section>

      <hr className={styles.divider} />

      {/* ── Timeline ───────────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Timeline critica" title="Date che fanno cambiare prezzo o stato" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 200 }}>Data</th>
                <th style={{ width: 220 }}>Evento</th>
                <th>Cosa cambia</th>
              </tr>
            </thead>
            <tbody>
              <TimelineRow date="5 maggio" event="Webinar live" change="Carrello aperto" />
              <TimelineRow
                date="7 maggio · 23:59"
                event="Fine flash 48h"
                change={
                  <span className={styles.pillRow}>
                    <Pill tone="corso" size="sm">Corso</Pill>
                    <span>147€ → 297€</span>
                    <span style={{ color: "var(--muted)" }}>·</span>
                    <Pill tone="bootcamp" size="sm">Bootcamp</Pill>
                    <span>early bird chiude: 1.297€ → 1.500€</span>
                  </span>
                }
              />
              <TimelineRow
                date="12 maggio · martedì"
                event="Live #1"
                change={
                  <span className={styles.pillRow}>
                    <Pill tone="corso" size="sm">Corso</Pill>
                    <span>297€ → 397€</span>
                  </span>
                }
              />
              <TimelineRow
                date="13 maggio"
                event="Corso evergreen"
                change={
                  <span className={styles.pillRow}>
                    <Pill tone="corso" size="sm">Corso</Pill>
                    <span>397€ fisso da qui in poi</span>
                  </span>
                }
              />
              <TimelineRow date="19 maggio · martedì" event="Live #2" change="—" />
              <TimelineRow
                date="26 maggio · martedì"
                event="Live #3"
                change={
                  <span className={styles.pillRow}>
                    <Pill tone="bootcamp" size="sm">Bootcamp</Pill>
                    <span>deadline prenotazione call Mattia</span>
                  </span>
                }
              />
              <TimelineRow date="2 giugno · martedì" event="Live #4" change="—" />
              <TimelineRow
                date="Prima settimana giugno"
                event="Bootcamp inizia"
                change="—"
              />
            </tbody>
          </table>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Prodotti & Pricing ─────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Prodotti & pricing" title="Listini, finestre, leve commerciali" />
        <div className={styles.twoCol}>
          {/* Corso card */}
          <Card tone="corso">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              <Pill tone="corso">Corso</Pill>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Claude Unlocked
              </h3>
            </div>
            <PriceTier tier="Flash 48h" price="147€" window="5 mag → 7 mag 23:59" tone="corso" />
            <PriceTier tier="Launch week" price="297€" window="7 mag → 12 mag 23:59" tone="corso" />
            <PriceTier tier="Evergreen" price="397€" window="Dal 13 maggio" tone="corso" last />
            <ul
              style={{
                listStyle: "none",
                margin: "16px 0 0 0",
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.95,
              }}
            >
              <li style={{ marginBottom: 6 }}>
                Credito verso bootcamp: <strong style={{ color: ORANGE }}>147€ fisso</strong> (indipendente dal prezzo pagato)
              </li>
              <li>
                Checkout: <Pill tone="danger" size="sm">⏳ In arrivo</Pill>
              </li>
            </ul>
          </Card>

          {/* Bootcamp card */}
          <Card tone="bootcamp">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              <Pill tone="bootcamp">Bootcamp</Pill>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                AI Champion
              </h3>
            </div>
            <PriceTier tier="Early bird" price="1.297€" window="Fino al 7 mag 23:59" tone="bootcamp" />
            <PriceTier
              tier={<>Leva Mattia <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>(in call, non pubblica)</span></>}
              price="1.197€"
              window="Solo in call"
              tone="bootcamp"
            />
            <PriceTier tier="Full price" price="1.500€" window="Dall'8 maggio" tone="bootcamp" last />
            <div
              style={{
                marginTop: 18,
                padding: "14px 16px",
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "var(--ghost)",
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <strong style={{ color: "#fff" }}>Rate early bird:</strong> 2×680€ = 1.360€ · 3×460€ = 1.380€
              </div>
              <div>
                <strong style={{ color: "#fff" }}>Rate full price:</strong> 2×800€ = 1.600€ · 3×550€ = 1.650€
              </div>
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: "16px 0 0 0",
                padding: 0,
                fontFamily: "var(--font-body)",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.95,
              }}
            >
              <li style={{ marginBottom: 6 }}>
                Posti: <strong style={{ color: LIME }}>25 cap fisso</strong>
              </li>
              <li style={{ marginBottom: 6 }}>Vendita: solo via call di selezione con Mattia (no checkout diretto)</li>
              <li style={{ marginBottom: 6 }}>Deadline prenotazione call: 26 maggio (Live #3)</li>
              <li>
                Calendly Mattia: <Pill tone="danger" size="sm">⏳ In arrivo</Pill>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Link · Funnel webinar ──────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Link · Funnel webinar" title="Pagine pubbliche del funnel" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 290 }}>Pagina</th>
                <th>URL</th>
                <th style={{ width: 180 }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Optin page</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/webinar-claude" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Thank you (post-registrazione)</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/webinar-claude/thank-you" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Replay</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/webinar-claude/replay" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>YouTube Live</strong></Td>
                <Td label="URL"><CopyableLink href="https://youtube.com/live/Pa2-LKvlJ3g?feature=share" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Google Calendar (template)</strong></Td>
                <Td label="URL">
                  <CopyableLink
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar%3A+come+usare+Claude+come+un+Pro+%E2%80%94+Morfeus+%7C+Matteo+Arnaboldi&dates=20260505T160000Z%2F20260505T171500Z&location=YouTube+Live&ctz=Europe%2FRome"
                    label="https://calendar.google.com/… (link completo nella TY page)"
                  />
                </Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Apple / Outlook (.ics)</strong></Td>
                <Td label="URL">Generato automaticamente nella thank-you page</Td>
                <Td label="Stato"><StatusBadge status="auto" /></Td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Link · Prodotti ────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Link · Prodotti" title="Sales page, TY page, checkout" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 110 }}>Tag</th>
                <th style={{ width: 250 }}>Pagina</th>
                <th>URL</th>
                <th style={{ width: 180 }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td label="Tag"><Pill tone="corso" size="sm">Corso</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Sales Page V1</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/claude-unlocked-v1" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="corso" size="sm">Corso</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Sales Page V2</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/claude-unlocked-v2" /></Td>
                <Td label="Stato"><StatusBadge status="wip" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="bootcamp" size="sm">Bootcamp</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Sales Page V1</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="bootcamp" size="sm">Bootcamp</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Sales Page V2</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion-v2" /></Td>
                <Td label="Stato"><StatusBadge status="wip" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="corso" size="sm">Corso</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Checkout</strong></Td>
                <Td label="URL"><span style={{ color: "var(--muted)", fontStyle: "italic" }}>(in arrivo)</span></Td>
                <Td label="Stato"><StatusBadge status="missing" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="bootcamp" size="sm">Bootcamp</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Checkout</strong></Td>
                <Td label="URL"><span style={{ color: "var(--muted)" }}>n/a — vendita solo via call Mattia</span></Td>
                <Td label="Stato"><StatusBadge status="na" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="corso" size="sm">Corso</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>TY page (post-acquisto)</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/claude-unlocked-v1/access-9x4q2k7n" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="bootcamp" size="sm">Bootcamp</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>TY page (post-acquisto)</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/bootcamp-ai-champion/access-25-m3p8r7q4" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Tag"><Pill tone="bootcamp" size="sm">Bootcamp</Pill></Td>
                <Td label="Pagina"><strong style={{ color: "#fff" }}>Calendly Mattia (call)</strong></Td>
                <Td label="URL"><span style={{ color: "var(--muted)", fontStyle: "italic" }}>(in arrivo)</span></Td>
                <Td label="Stato"><StatusBadge status="missing" /></Td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Link · Community + freebie ─────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Link · Community & freebie" title="Asset organici e community" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 280 }}>Cosa</th>
                <th>URL</th>
                <th style={{ width: 140 }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td label="Cosa"><strong style={{ color: "#fff" }}>Community Circle</strong></Td>
                <Td label="URL"><CopyableLink href="https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Cosa"><strong style={{ color: "#fff" }}>Freebie Cowork Setup</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/claude-skill-anatomy" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
              <tr>
                <Td label="Cosa"><strong style={{ color: "#fff" }}>Freebie Caroselli IG</strong></Td>
                <Td label="URL"><CopyableLink href="https://www.morfeushub.com/instagram-carousel-skills" /></Td>
                <Td label="Stato"><StatusBadge status="live" /></Td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Email sequences ────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Email sequences" title="Panoramica flussi Brevo" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 230 }}>Flusso</th>
                <th style={{ width: 80 }}>Cod.</th>
                <th>Email incluse</th>
                <th style={{ width: 130 }}>Stato</th>
              </tr>
            </thead>
            <tbody>
              <EmailFlowRow name="Caldi (già iscritti)" code="A" emails="A1 data ufficiale · A2 cosa vedrai" />
              <EmailFlowRow name="Lista esistente" code="B" emails="B1 lancio · B2 followup · B3 social proof · B4 ultimo treno" />
              <EmailFlowRow name="Nuovi iscritti" code="C" emails="C1 conferma · C2 problema che nessuno nomina" />
              <EmailFlowRow name="Reminder (tutti)" code="R" emails="R1 28apr · R2 30apr · R3 2mag · R4 4mag sera · R5 mattina 5mag · R6 1h prima · R7 live" />
              <EmailFlowRow name="Post-webinar — Corso" code="PW" emails="PW1 replay · PW2 differenziazione · PW3 proof · PW4 obiezioni · PW5 scarcity · PW6 last call · PW7 bootcamp" tone="corso" />
              <EmailFlowRow name="Post-webinar — Grazie (no acquisto)" code="TY" emails="TY1 grazie · TY2 evergreen" />
              <EmailFlowRow name="Acquirenti Corso" code="AQ" emails="AQ1 stripe · AQ2 welcome · AQ3 upsell bootcamp · AQ4 produzione · AQ5 corso pronto · AQ6 onboarding" tone="corso" />
              <EmailFlowRow name="Acquirenti Bootcamp" code="AB" emails="AB1 stripe · AB2 welcome · AB3 reminder sessione" tone="bootcamp" />
            </tbody>
          </table>
        </div>

        {/* UTM */}
        <div style={{ marginTop: 32 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 19,
              letterSpacing: "-0.01em",
              color: "#fff",
              margin: "0 0 12px 0",
            }}
          >
            UTM — formato standard
          </h3>
          <div className={styles.codeBox}>
            ?utm_source=brevo&amp;utm_medium=email&amp;utm_campaign=[flusso]&amp;utm_content=[email_id]
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: 170 }}>Email</th>
                  <th style={{ width: 290 }}>utm_campaign</th>
                  <th>utm_content</th>
                </tr>
              </thead>
              <tbody>
                <UtmRow email="C1" campaign="webinar-flusso-c" content="c1" />
                <UtmRow email="C2" campaign="webinar-flusso-c" content="c2" />
                <UtmRow email="A1" campaign="webinar-flusso-a" content="a1" />
                <UtmRow email="B1" campaign="webinar-flusso-b" content="b1" />
                <UtmRow email="PW1–PW7" campaign="webinar-post-corso" content="pw1 … pw7" />
                <UtmRow email="AQ1–AQ6" campaign="webinar-acquirenti-corso" content="aq1 … aq6" />
                <UtmRow email="AB1–AB3" campaign="webinar-acquirenti-bootcamp" content="ab1 … ab3" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── Ancora mancante ────────────────────────────────────────── */}
      <section className={styles.section}>
        <SectionHeader eyebrow="Ancora mancante" title="Asset bloccanti per il go-live" />
        <div className={`${styles.tableWrap} ${styles.danger}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 270 }}>Cosa</th>
                <th style={{ width: 180 }}>Chi deve fornire</th>
                <th style={{ width: 180 }}>Urgenza</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <MissingRow
                what={<><Pill tone="corso" size="sm">Corso</Pill> <strong style={{ color: "#fff" }}>Checkout</strong></>}
                who="Matteo"
                urgency="critical"
                urgencyLabel="🔴 Prima del webinar"
                note="Serve nelle email PW come CTA acquisto"
              />
              <MissingRow
                what={<><Pill tone="bootcamp" size="sm">Bootcamp</Pill> <strong style={{ color: "#fff" }}>Calendly Mattia</strong></>}
                who="Mattia / Matteo"
                urgency="critical"
                urgencyLabel="🔴 Prima del webinar"
                note="Serve in email PW7, AQ3 e nella sales page bootcamp"
              />
              <MissingRow
                what={<><Pill tone="corso" size="sm">Corso</Pill> <strong style={{ color: "#fff" }}>Sales Page V2</strong></>}
                who="Team / Dev"
                urgency="warning"
                urgencyLabel="🟡 Post-webinar"
                note="V1 è live, V2 è upgrade copy"
              />
              <MissingRow
                what={<><Pill tone="bootcamp" size="sm">Bootcamp</Pill> <strong style={{ color: "#fff" }}>Sales Page V2</strong></>}
                who="Team / Dev"
                urgency="warning"
                urgencyLabel="🟡 Post-webinar"
                note="V1 è live, V2 è upgrade copy"
              />
              <MissingRow
                what={<><Pill tone="bootcamp" size="sm">Bootcamp</Pill> <strong style={{ color: "#fff" }}>Date prima cohort</strong></>}
                who="Matteo"
                urgency="warning"
                urgencyLabel="🟡 Prima del Live #1"
                note="Da comunicare agli iscritti call"
              />
              <MissingRow
                what={<><Pill tone="bootcamp" size="sm">Bootcamp</Pill> <strong style={{ color: "#fff" }}>Video testimonianze cohort</strong></>}
                who="Matteo"
                urgency="warning"
                urgencyLabel="🟡 Pre-Live #1"
                note="3–5 video per sales page bootcamp V2"
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className={styles.footer}>
        <p className={styles.footerLine}>
          Owner: Matteo Arnaboldi · matteo@morfeushub.com · Aggiornato 30 aprile 2026
        </p>
        <p className={styles.footerSub}>Pagina interna · noindex / nofollow</p>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function KeyVal({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <div className={styles.kvLabel}>{label}</div>
      <div className={`${styles.kvValue}${mono ? ` ${styles.mono}` : ""}`}>{value}</div>
    </div>
  );
}

function PriceTier({
  tier,
  price,
  window,
  tone,
  last,
}: {
  tier: React.ReactNode;
  price: string;
  window: string;
  tone: "corso" | "bootcamp";
  last?: boolean;
}) {
  const accent = tone === "corso" ? ORANGE : LIME;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 12,
        alignItems: "baseline",
        padding: "12px 0",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            marginBottom: 2,
          }}
        >
          {tier}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          {window}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 700,
          color: accent,
          letterSpacing: "-0.01em",
        }}
      >
        {price}
      </div>
    </div>
  );
}

function TimelineRow({
  date,
  event,
  change,
}: {
  date: string;
  event: string;
  change: React.ReactNode;
}) {
  return (
    <tr>
      <Td label="Data"><strong style={{ color: "#fff" }}>{date}</strong></Td>
      <Td label="Evento">{event}</Td>
      <Td label="Cosa cambia">{change}</Td>
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
  tone?: "corso" | "bootcamp";
}) {
  return (
    <tr>
      <Td label="Flusso">
        {tone ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Pill tone={tone} size="sm">{tone === "corso" ? "Corso" : "Bootcamp"}</Pill>
            <strong style={{ color: "#fff" }}>{name}</strong>
          </span>
        ) : (
          <strong style={{ color: "#fff" }}>{name}</strong>
        )}
      </Td>
      <Td label="Codice">
        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 6,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {code}
        </span>
      </Td>
      <Td label="Email incluse">{emails}</Td>
      <Td label="Stato"><StatusBadge status="ready" /></Td>
    </tr>
  );
}

function UtmRow({ email, campaign, content }: { email: string; campaign: string; content: string }) {
  return (
    <tr>
      <Td label="Email"><strong style={{ color: "#fff" }}>{email}</strong></Td>
      <Td label="utm_campaign" mono>{campaign}</Td>
      <Td label="utm_content" mono>{content}</Td>
    </tr>
  );
}

function MissingRow({
  what,
  who,
  urgency,
  urgencyLabel,
  note,
}: {
  what: React.ReactNode;
  who: string;
  urgency: "critical" | "warning";
  urgencyLabel: string;
  note: string;
}) {
  return (
    <tr>
      <Td label="Cosa">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {what}
        </span>
      </Td>
      <Td label="Chi">{who}</Td>
      <Td label="Urgenza">
        <Pill tone={urgency === "critical" ? "danger" : "warning"} size="sm">{urgencyLabel}</Pill>
      </Td>
      <Td label="Note">{note}</Td>
    </tr>
  );
}
