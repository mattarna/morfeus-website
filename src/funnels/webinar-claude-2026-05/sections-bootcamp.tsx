"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BootcampPricingContent, BootcampThankYouContent } from "@/funnels/types";
import styles from "./sections.module.css";

// ─── Shared prop shape ────────────────────────────────────────────────────────

interface SectionProps {
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any;
}

// ─── Lime palette (hardcoded — distinto dal funnel corso che usa arancione) ──

const LIME = "#B5F03A";
const LIME_HOVER = "#C5F75E";
const LIME_PRESSED = "#9BD827";
const LIME_GLOW_35 = "rgba(181,240,58,0.35)";
const LIME_GLOW_50 = "rgba(181,240,58,0.50)";
const LIME_SOFT_10 = "rgba(181,240,58,0.10)";
const LIME_SOFT_18 = "rgba(181,240,58,0.18)";
const LIME_BORDER_25 = "rgba(181,240,58,0.30)";
const VIOLET_BORDER = "rgba(123,104,238,0.45)";
const VIOLET_SOFT = "rgba(123,104,238,0.08)";

// ─── Primitives ───────────────────────────────────────────────────────────────

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-italic)",
        fontStyle: "italic",
        fontWeight: 500,
        color: LIME,
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
        background: LIME_SOFT_10,
        border: `1px solid ${LIME_BORDER_25}`,
        color: LIME,
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
            background: LIME,
            boxShadow: `0 0 8px ${LIME_GLOW_50}`,
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
        color: LIME,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        fontFamily: "var(--font-italic)",
        fontStyle: "italic",
      }}
    >
      <span style={{ width: 24, height: 1, background: LIME, opacity: 0.5, flexShrink: 0 }} />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href,
  onClick,
  fullWidth,
  pulse,
  size = "md",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  pulse?: boolean;
  size?: "md" | "lg" | "xl";
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
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
    background: press ? LIME_PRESSED : hover ? LIME_HOVER : LIME,
    color: "#0B0B0C",
    boxShadow: hover ? `0 6px 28px ${LIME_GLOW_50}` : `0 4px 20px ${LIME_GLOW_35}`,
    transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
    transition: "background .2s, box-shadow .2s, transform .2s",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: fullWidth ? "100%" : "auto",
    animation: pulse ? "btn-pulse-lime 2.4s infinite" : "none",
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
      type="button"
      onClick={onClick}
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
    border: `2px solid ${hover ? LIME_HOVER : LIME}`,
    background: hover ? LIME_SOFT_10 : "transparent",
    color: LIME,
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
      <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={styleProps} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} style={styleProps}>
      {children}
    </button>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  } else {
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: name, ...params });
  }
}

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function readPricing(step: { content?: { BootcampPricing?: BootcampPricingContent } } | undefined): BootcampPricingContent {
  return (
    step?.content?.BootcampPricing ?? {
      currentPrice: 1397,
      listPrice: 6700,
      stackValue: 6282,
      currency: "EUR",
      callUrl: "",
    }
  );
}

/** CTA href: stringa vuota nel config = href="#" no-op (placeholder Calendly) */
function callHref(pricing: BootcampPricingContent): string {
  return pricing.callUrl && pricing.callUrl.trim().length > 0 ? pricing.callUrl : "#";
}

function onCtaClick(block: string) {
  trackEvent("bootcamp_cta_click", { block });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — HEADER
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampHeaderSection() {
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
      <Image
        src="/logo/m-w2.png"
        alt="Morfeus"
        width={120}
        height={logoHeight}
        priority
        style={{ height: logoHeight, width: "auto", display: "block" }}
      />
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 01 — HERO
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampHeroSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 32px) clamp(40px, 6vw, 60px)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 90vw)",
          height: 360,
          background: `radial-gradient(ellipse, ${LIME_SOFT_18} 0%, rgba(123,104,238,0.06) 40%, transparent 70%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ display: "inline-flex", marginBottom: 28 }}>
        <Badge>3a Edizione · Solo 25 posti · Accesso via call di selezione</Badge>
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(36px, 5.8vw, 68px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "0 auto 22px",
          maxWidth: 940,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Costruisci i tuoi <Accent>dipendenti AI.</Accent>
        <br />
        Smetti di usare Claude. Inizia a delegargli lavoro.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.88,
          maxWidth: 760,
          margin: "0 auto 36px",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Il Bootcamp AI Champion è il percorso avanzato per professionisti e aziende che vogliono passare dall&apos;AI come strumento all&apos;AI come sistema operativo — con metodo, supervisione e risultati verificabili.
      </p>

      {/* Proof bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "clamp(16px, 4vw, 36px)",
          marginBottom: 36,
          fontFamily: "var(--font-body)",
          color: "var(--ghost)",
          opacity: 0.85,
          fontSize: 14,
        }}
      >
        <ProofStat value="2.000+" label="persone formate" />
        <Sep />
        <ProofStat value="3a" label="edizione" />
        <Sep />
        <ProofStat value="17h" label="di formazione reale" />
      </div>

      {/* Scarcity notice */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: LIME,
          opacity: 0.95,
          margin: "0 auto 32px",
          maxWidth: 640,
          letterSpacing: "0.02em",
        }}
      >
        ⚠ Posti chiusi a 25 partecipanti, accesso solo via call di selezione
      </p>

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("hero")}>
          Prenota la call di selezione →
        </PrimaryButton>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--muted)",
            opacity: 0.75,
            margin: 0,
          }}
        >
          25 posti · Call gratuita · Zero impegno fino alla decisione
        </p>
      </div>

      {/* Logo bar */}
      <div
        style={{
          marginTop: 64,
          paddingTop: 32,
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          Ci hanno scelto
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "clamp(20px, 5vw, 40px)",
            opacity: 0.7,
            color: "var(--ghost)",
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span>HFarm</span>
          <span>·</span>
          <span>Talent Garden</span>
          <span>·</span>
          <span>Confcommercio</span>
          <span>·</span>
          <span>Asseprim</span>
          <span>·</span>
          <span>Sole 24 Ore Formazione</span>
        </div>
      </div>
    </section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
      <strong style={{ color: LIME, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{value}</strong>
      <span style={{ color: "var(--ghost)", opacity: 0.8, fontSize: 13 }}>{label}</span>
    </span>
  );
}

function Sep() {
  return (
    <span aria-hidden style={{ width: 1, height: 16, background: "var(--hairline)" }} />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 02 — IL SALTO CHE MANCA (Level Gap)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampLevelGapSection() {
  return (
    <section
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <SectionLabel>Il problema che nessuno nomina</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 32px",
            maxWidth: 800,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Sai usare Claude.
          <br />
          Non hai ancora <Accent>un sistema.</Accent>
        </h2>

        <div style={{ maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
          <p style={{ margin: "0 0 14px" }}>C&apos;è un punto in cui molti si bloccano.</p>
          <p style={{ margin: "0 0 14px" }}>
            Hai fatto il corso — o hai imparato da solo. Sai scrivere prompt. Sai che Claude è potente. Lo usi. Forse tutti i giorni.
          </p>
          <p style={{ margin: "0 0 14px" }}>Eppure qualcosa non è cambiato davvero.</p>
          <p style={{ margin: "0 0 14px" }}>
            Fai ancora la maggior parte del lavoro tu. Ogni task riparte da zero. Nessun flusso è automatizzato. L&apos;AI ti aiuta, ma non lavora <em>per te</em>.
          </p>
          <p style={{ margin: 0, color: LIME, fontWeight: 500 }}>Questo è il plateau L2. Ci finiscono quasi tutti.</p>
        </div>

        {/* 3 livelli */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginTop: 48,
          }}
        >
          <LevelCard
            dot="🔴"
            level="LIVELLO 1"
            title="L'AI l'hai provata"
            body="Ci hai giocato. Non ha cambiato niente. Fai ancora tutto tu."
          />
          <LevelCard
            dot="🟡"
            level="LIVELLO 2"
            title="L'AI lavora CON te"
            body="La guidi tu. Sai come usarla. Risparmi qualcosa. Ma il sistema non esiste ancora."
            badge="Dove sei ora"
          />
          <LevelCard
            dot="🟢"
            level="LIVELLO 3"
            title="L'AI lavora PER te"
            body="Hai costruito un sistema. Ha procedure, memoria, logica. Lavora anche quando non ci sei."
            badge="Dove ti porta il bootcamp"
            highlight
          />
        </div>

        <div style={{ marginTop: 44, maxWidth: 720, fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65, color: "var(--ghost)" }}>
          <p style={{ margin: "0 0 14px", opacity: 0.9 }}>Il problema non sei tu. È l&apos;approccio.</p>
          <p style={{ margin: "0 0 14px", opacity: 0.9 }}>
            Imparare uno strumento non basta per costruire un sistema. Servono metodo, supervisione esterna, e il tempo di implementare su casi reali — non esercizi didattici.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "#fff" }}>
            Il salto da L2 a L3 non si fa da soli. O meglio: si può fare, ma costa 5 volte di più in tempo e in errori.
          </p>
        </div>

        {/* Cost box — Costo autodidatta L3 */}
        <div
          style={{
            marginTop: 36,
            padding: "clamp(20px, 4vw, 32px)",
            background: "var(--night)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 14,
            maxWidth: 720,
          }}
        >
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body)", fontSize: 13, color: LIME, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Costo del percorso autodidatta verso L3
          </p>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.4vw, 38px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            <span style={{ color: LIME }}>9.000–20.000 EUR.</span>
            <br />
            Più 1 anno del tuo tempo.
          </p>
          <p style={{ margin: "0 0 6px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--ghost)" }}>
            È quello che spendi a fare da solo il salto da L2 a L3.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 14, lineHeight: 1.55, color: "var(--muted)" }}>
            Senza che nessuno ti dica quando il tuo standard è troppo basso, o troppo alto.
          </p>
        </div>

        <p
          style={{
            marginTop: 32,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--muted)",
            cursor: "pointer",
          }}
          onClick={() => scrollToId("offerta")}
        >
          Se hai già il contesto e vuoi vedere il programma →{" "}
          <span style={{ color: LIME, fontWeight: 600, textDecoration: "underline" }}>vai diretto all&apos;offerta ↓</span>
        </p>
      </div>
    </section>
  );
}

function LevelCard({
  dot,
  level,
  title,
  body,
  badge,
  highlight,
}: {
  dot: string;
  level: string;
  title: string;
  body: string;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--night)",
        border: `1px solid ${highlight ? LIME : "var(--hairline)"}`,
        borderRadius: 14,
        padding: 22,
        position: "relative",
        boxShadow: highlight ? `0 12px 40px ${LIME_SOFT_18}` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{dot}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          {level}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 22,
          color: "#fff",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.85 }}>
        {body}
      </p>
      {badge && (
        <span
          style={{
            display: "inline-block",
            marginTop: 14,
            padding: "5px 12px",
            borderRadius: 100,
            background: highlight ? LIME : "rgba(255,255,255,0.06)",
            color: highlight ? "#0B0B0C" : "var(--muted)",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 03 — PERCHÉ DA SOLO NON FUNZIONA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampWhyAloneSection() {
  const enemies = [
    {
      n: "01",
      title: "Il metodo fai-da-te",
      body: "Impari per tentativi. Senza struttura, non sai cosa sai e cosa non sai. Ogni nuovo caso riparte da zero. Ci vuole 10 volte più tempo per arrivare allo stesso livello — e senza garanzia di arrivarci.",
    },
    {
      n: "02",
      title: "La formazione che insegna le feature",
      body: "\"Questo è il tasto X. Questo è il comando Y.\" Ti insegnano lo strumento, non il metodo. Esci sapendo cos'è Claude. Non sai costruire qualcosa con Claude.",
    },
    {
      n: "03",
      title: "Il bootcamp da 200 persone",
      body: "Paghi. Accedi. Speriamo che funzioni. Nessuna selezione, nessun limite, nessuna supervisione reale. Con 200 persone in aula non puoi avere correzione individuale. Esci con un certificato e un hard disk di replay che non guarderai mai.",
    },
    {
      n: "04",
      title: "Il consulente AI a giornata",
      body: "2.000–5.000 EUR per una giornata. Il consulente fa. Tu guardi. La settimana dopo sei di nuovo da solo — più dipendente di prima. Hai pagato per una soluzione, non per una competenza.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Non è colpa tua</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4.6vw, 48px)",
            lineHeight: 1.07,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 18px",
            maxWidth: 820,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          I 4 motivi per cui l&apos;AI
          <br />
          non ha ancora <Accent>cambiato niente</Accent>
          <br />
          nel tuo lavoro
        </h2>

        <p
          style={{
            margin: "0 auto 48px",
            maxWidth: 720,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          Non parliamo di persone. Parliamo di approcci che non funzionano per definizione.
        </p>

        <div className={styles.bootcampEnemiesGrid}>
          {enemies.map((e) => (
            <div
              key={e.n}
              style={{
                background: "var(--dusk)",
                border: "1px solid var(--hairline)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 36,
                  color: LIME,
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                {e.n}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 21, color: "#fff", margin: "0 0 12px" }}>
                {e.title}
              </h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--ghost)", opacity: 0.85 }}>
                {e.body}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: 48,
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: 18,
            fontWeight: 600,
            color: "#fff",
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Nessuno di questi approcci costruisce un sistema. Te lo fanno usare, o te lo costruiscono. Non è la stessa cosa.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 04 — IL METODO M-V-A
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampMethodSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  const steps = [
    {
      letter: "M",
      title: "MANUALE",
      body: [
        "Prima capisci il task completamente. Ogni passaggio, ogni decisione, ogni eccezione, ogni standard di qualità.",
        "Non perché l'AI sia stupida. Perché non puoi delegare quello che non sai spiegare ad alta voce. Se non riesci a descrivere il processo con precisione, ottieni output che sembra giusto ma non lo è, e non lo capisci finché è troppo tardi.",
        "Questa fase è dove quasi tutta la formazione AI si ferma. Ti insegna cosa fare con lo strumento, non come capire cosa delegare e come farlo bene.",
      ],
    },
    {
      letter: "V",
      title: "VALIDATO",
      body: [
        "Costruisci il sistema. Lo testi. Lo correggi. Finché produce al tuo standard, senza che tu debba supervisionarlo ogni volta.",
        "Questa è la fase in cui il sistema guadagna la tua fiducia. Non la fiducia cieca: la fiducia basata su dati. “Ho testato. Funziona. Produce quello che voglio, nel mio tono, con i miei criteri.”",
        "È anche la fase in cui quasi tutti si bloccano.",
      ],
    },
    {
      letter: "A",
      title: "ATTIVATO",
      body: [
        "Quando funziona sempre, non ci torni. Non lo aggiusti. Non lo sorvegli.",
        "Produce mentre sei su altro. Lavora mentre dormi. Il tuo tempo smette di essere il collo di bottiglia.",
        "Questa è L3.",
      ],
    },
  ];

  return (
    <section
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Il motivo per cui funziona</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 22px",
            maxWidth: 820,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Non è un corso.
          <br />
          È un <Accent>metodo in tre fasi</Accent>.
        </h2>

        <p
          style={{
            margin: "0 auto 14px",
            maxWidth: 760,
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.95,
            textAlign: "center",
          }}
        >
          Il bootcamp usa un metodo preciso. Si chiama <strong style={{ color: "#fff" }}>M-V-A</strong>.
        </p>

        <p
          style={{
            margin: "0 auto 56px",
            maxWidth: 760,
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          Tre fasi. Una sequenza obbligata. Non puoi saltare la seconda per arrivare alla terza, e quasi tutti si fermano esattamente lì.
        </p>

        {/* 3 step (dark, no cream) */}
        <div className={styles.bootcampMvaGrid}>
          {steps.map((s) => (
            <div
              key={s.letter}
              style={{
                background: "var(--night)",
                border: "1px solid var(--hairline)",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: LIME,
                    color: "#0B0B0C",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 26,
                    boxShadow: `0 8px 24px ${LIME_GLOW_35}`,
                    flexShrink: 0,
                  }}
                >
                  {s.letter}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff", margin: 0, letterSpacing: "0.05em" }}>
                  {s.title}
                </h3>
              </div>
              {s.body.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--ghost)",
                    opacity: 0.92,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Perché tra V e A quasi tutti si fermano */}
        <div
          style={{
            marginTop: 48,
            padding: "clamp(24px, 4vw, 36px)",
            background: VIOLET_SOFT,
            border: `1px solid ${VIOLET_BORDER}`,
            borderRadius: 16,
            maxWidth: 820,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>
            Perché tra V e A quasi tutti si fermano.
          </h3>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.92 }}>
            Non è un problema di bravura. È strutturale.
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.92 }}>
            La transizione da Validato ad Attivato richiede una cosa che da soli non puoi darti: feedback esterno sul tuo standard.
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.92 }}>
            Sai cosa vuoi dall&apos;output, ma non sai se il sistema lo produce davvero al livello che serve, perché sei tu che lo giudichi e sei tu che lo correggi. È un circolo chiuso. Il tuo standard è invisibile a te stesso mentre lo applichi.
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.92 }}>
            Hai bisogno di qualcuno che guardi il tuo sistema dall&apos;esterno, ti dica dove il tuo standard è troppo basso o troppo alto, e ti mostri esattamente dove lasciare andare e dove tenere il controllo.
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.92 }}>
            Nessun corso pre-registrato te lo può dare. Nessun tutorial. Nessuna AI che si auto-valuta.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "#fff", fontWeight: 600 }}>
            Ci vuole qualcuno che lavora con te, sul tuo caso, e ti corregge mentre costruisci.
          </p>
        </div>

        {/* Le alternative ti portano a M */}
        <p
          style={{
            margin: "40px auto 0",
            maxWidth: 720,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#fff",
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Le alternative ti portano a <strong style={{ color: LIME }}>M</strong>.
          <br />
          Qualche volta a <strong style={{ color: LIME }}>V</strong>.
          <br />
          Il bootcamp ti porta ad <Accent>A</Accent>.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36, gap: 10 }}>
          <PrimaryButton size="lg" href={callHref(pricing)} onClick={() => onCtaClick("method")}>
            Prenota la call di selezione
          </PrimaryButton>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", margin: 0 }}>
            Nella call vedi a che punto sei nel metodo, e dove si applica al tuo lavoro specifico.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 05 — LA TRASFORMAZIONE
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampTransformationSection() {
  const before = [
    "Ogni prompt riparte da zero — non hai template né procedure standardizzate",
    "Usi Claude per task isolati, non per flussi di lavoro completi",
    "Non sai valutare l'output — a volte ti fidi troppo, a volte rifai tutto tu",
    "Il tuo uso di Claude dipende dall'umore del giorno, non da un sistema",
    "Hai competenza, non infrastruttura",
    "Quando Claude aggiorna qualcosa, sei di nuovo punto a capo",
  ];
  const after = [
    "Hai procedure AI documentate per i tuoi task ad alto impatto",
    "Sai costruire prompt complessi che producono output affidabili e ripetibili",
    "Hai un sistema di validazione — sai quando fidarti e quando correggere",
    "Alcune aree del tuo lavoro girano in autonomia: tu supervisioni, non esegui",
    "Il tuo livello non dipende dallo strumento: il metodo vale anche quando Claude cambia",
    "Hai un progetto finale reale — uno skill o un workflow funzionante che usi già da lunedì",
  ];

  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Prima e dopo il bootcamp</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 56px",
            maxWidth: 800,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Da &ldquo;<Accent>uso l&apos;AI</Accent>&rdquo; a
          <br />
          &ldquo;ho un sistema operativo AI&rdquo;
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <BeforeAfterColumn label="PRIMA" sublabel="(dove sei ora)" items={before} kind="before" />
          <BeforeAfterColumn label="DOPO" sublabel="(cosa costruisci)" items={after} kind="after" />
        </div>

        <div
          style={{
            marginTop: 52,
            padding: "28px 32px",
            maxWidth: 760,
            margin: "52px auto 0",
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.5,
              color: "#fff",
            }}
          >
            &ldquo;Il bootcamp non finisce con un certificato. Finisce con un sistema che usi il lunedì dopo.&rdquo;
          </p>
        </div>

        {/* 3 numeri */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            marginTop: 52,
            textAlign: "center",
          }}
        >
          <NumberStat big="5–8h/sett." label="risparmiate in media dopo il bootcamp" />
          <NumberStat big="~3 mesi" label="payback period (a 25 EUR/h)" />
          <NumberStat big="4x" label="ROI anno 1 — conservativo" />
        </div>
      </div>
    </section>
  );
}

function BeforeAfterColumn({
  label,
  sublabel,
  items,
  kind,
}: {
  label: string;
  sublabel: string;
  items: string[];
  kind: "before" | "after";
}) {
  const isBefore = kind === "before";
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${isBefore ? "rgba(220,80,80,0.30)" : LIME_BORDER_25}`,
        borderRadius: 16,
        padding: "clamp(22px, 4vw, 32px)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 24,
          color: isBefore ? "rgba(255,180,180,0.85)" : LIME,
          margin: "0 0 4px",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </h3>
      <p style={{ margin: "0 0 22px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)" }}>
        {sublabel}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: isBefore ? 0.75 : 1,
              padding: "10px 0",
              borderBottom: idx < items.length - 1 ? "1px solid var(--hairline)" : "none",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: isBefore ? "rgba(220,80,80,0.85)" : LIME,
                fontWeight: 700,
                flexShrink: 0,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              {isBefore ? "✗" : "✓"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NumberStat({ big, label }: { big: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 38px)", color: LIME, lineHeight: 1.1 }}>
        {big}
      </div>
      <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ghost)", opacity: 0.85 }}>
        {label}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 06 — LE 7 SESSIONI + FORMATO (Program)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampProgramSection() {
  const sessions = [
    {
      n: "Sessione 1",
      title: "Il Sistema — Mindset operativo + Framework M-V-A + Context Engineering",
      outcome: "capisci il metodo che userai nelle 6 sessioni successive. Esci con una mappa chiara di cosa delegare e perché.",
    },
    {
      n: "Sessione 2",
      title: "Prompt Engineering Avanzato — Architettura delle richieste complesse",
      outcome: "sai costruire prompt strutturati che producono output prevedibili su task reali del tuo lavoro.",
    },
    {
      n: "Sessione 3",
      title: "Skill e Automazione — Costruire strumenti personalizzati",
      outcome: "costruisci la tua prima skill personalizzata su Claude. È tua. Funziona sul tuo workflow.",
    },
    {
      n: "Sessione 4",
      title: "Plan & Solve — Metodo per progetti complessi in 6 fasi",
      outcome: "sai come usare Claude su task non lineari, con più step e più variabili. Niente più \"non so da dove iniziare\".",
    },
    {
      n: "Sessione 5",
      title: "Workflow Reali — Use case end-to-end",
      outcome: "analizzi e costruisci un flusso di lavoro completo. Vedi come si integrano prompt, skill e supervisione in un sistema funzionante.",
    },
    {
      n: "Sessione 6",
      title: "Sicurezza, Privacy e Sistema Operativo AI",
      outcome: "sai quali dati puoi e non puoi passare all'AI, come costruire un sistema sicuro in azienda, e quali sono i rischi reali (non quelli dei giornali).",
    },
    {
      n: "Sessione 7",
      title: "Progetto Finale e Next Level — Claude Code, Cursor, futuro",
      outcome: "presenti il tuo progetto finale. Esci con un sistema funzionante e una roadmap su dove andare dopo.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Il programma</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 18px",
            maxWidth: 820,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          7 sessioni live.
          <br />
          <Accent>14 ore</Accent> di formazione reale.
          <br />
          Un sistema che funziona.
        </h2>

        <p
          style={{
            margin: "0 auto 48px",
            maxWidth: 720,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          Ogni sessione ha un obiettivo operativo preciso. Esci con qualcosa che usi — non con slide da ripassare.
        </p>

        {/* Format box */}
        <div
          style={{
            background: "var(--night)",
            border: `1px solid ${VIOLET_BORDER}`,
            borderRadius: 16,
            padding: "clamp(22px, 4vw, 30px)",
            marginBottom: 36,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 20,
              color: "#fff",
              margin: "0 0 18px",
            }}
          >
            Formato che rispetta il tuo tempo:
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
            <FormatBullet icon="📅">Bisettimanale (1 settimana on, 1 settimana off)</FormatBullet>
            <FormatBullet icon="⏱">7 sessioni live da 2h = <strong style={{ color: LIME }}>14h totali in ~13 settimane</strong></FormatBullet>
            <FormatBullet icon="🎥">Replay permanenti — rivedi ogni sessione quando vuoi, per sempre</FormatBullet>
            <FormatBullet icon="💬">Gruppo WhatsApp attivo per tutta la durata + 30 giorni post-bootcamp</FormatBullet>
            <FormatBullet icon="🏗">Progetto finale guidato su un caso reale tuo</FormatBullet>
          </ul>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.55,
            }}
          >
            Il formato bisettimanale non è una scelta commerciale. È la condizione perché l&apos;implementazione funzioni. Hai bisogno di tempo tra una sessione e l&apos;altra per applicare, sbagliare, tornare con le domande giuste.
          </p>
        </div>

        {/* 7 sessioni */}
        <div style={{ display: "grid", gap: 14 }}>
          {sessions.map((s, idx) => (
            <div
              key={s.n}
              style={{
                background: "var(--night)",
                border: "1px solid var(--hairline)",
                borderRadius: 14,
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 20,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: LIME_SOFT_18,
                  border: `1px solid ${LIME_BORDER_25}`,
                  color: LIME,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--muted)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: "0 0 6px",
                  }}
                >
                  {s.n}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 19,
                    color: "#fff",
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                  }}
                >
                  🎯 {s.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-italic)",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--ghost)",
                    opacity: 0.85,
                    lineHeight: 1.55,
                  }}
                >
                  Outcome: {s.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Box differenziante: replay permanenti */}
        <div
          style={{
            marginTop: 40,
            padding: "clamp(22px, 4vw, 30px)",
            background: LIME_SOFT_10,
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "#fff",
              margin: "0 0 8px",
            }}
          >
            Replay permanenti — non a tempo.
          </h3>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ghost)", lineHeight: 1.6 }}>
            Sì, per sempre. Rivedi ogni sessione quando vuoi. La maggior parte dei competitor non li dà, o li toglie dopo 90 giorni.{" "}
            <strong style={{ color: LIME }}>Noi no.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function FormatBullet({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 12, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: "var(--ghost)" }}>
      <span style={{ flexShrink: 0, fontSize: 16 }}>{icon}</span>
      <span>{children}</span>
    </li>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 07 — CHI INSEGNA (Founders + timeline)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampFoundersSection() {
  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Con chi sarai in aula</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 22px",
            maxWidth: 720,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Non formatori.
          <br />
          <Accent>I founder.</Accent>
        </h2>

        <p
          style={{
            margin: "0 auto 56px",
            maxWidth: 760,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.88,
            textAlign: "center",
          }}
        >
          Matteo e Alex non sono professionisti della formazione che si sono reinventati AI educator. Sono i founder di Morfeus Hub, usano Claude professionalmente dal 2021, e insegnano ciò che applicano ogni giorno.
        </p>

        {/* 2 founder card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          <FounderCard
            imgSrc="/images/team/Profile-matt.jpg"
            imgAlt="Matteo Arnaboldi, CEO Morfeus"
            name="Matteo"
            role="Co-founder · CEO Morfeus · AI in uso professionale dal 2021"
            tag="Founder & lead trainer"
            bullets={[
              "Usa Claude professionalmente dal 2021, prima ancora che esistesse ChatGPT",
              "Il framework M-V-A nasce dai progetti reali con Enel, Sisal, BNP Paribas, Zara",
              "Speaker e partner formativo di HFarm, Talent Garden, Sole 24 Ore Formazione",
              "Tiene di persona ogni call di selezione e ogni sessione live",
            ]}
          />
          <FounderCard
            imgSrc="/images/team/Profile-alex.webp"
            imgAlt="Alex Carofiglio, Head of Product & CTO Morfeus"
            name="Alex"
            role="Co-founder · Head of Product & CTO · Prompt engineering e sistemi AI"
            tag="Architettura tecnica"
            bullets={[
              "Costruisce e mantiene i sistemi AI interni di Morfeus, ne è il primo utente",
              "Le skill, i plugin e i workflow che vedrai sono i suoi: testati ogni giorno",
              "Tiene le sessioni su prompt avanzato, automazione e architettura sistemi",
              "Tra una sessione e l'altra è lui che risponde nel gruppo, non un assistente",
            ]}
          />
        </div>

        {/* Box "perché conta che siano i founder?" */}
        <div
          style={{
            marginTop: 40,
            padding: "clamp(22px, 4vw, 30px)",
            background: "var(--dusk)",
            border: `1px solid ${VIOLET_BORDER}`,
            borderRadius: 16,
            maxWidth: 820,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "#fff", margin: "0 0 14px" }}>
            Perché conta che siano i founder?
          </h3>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
            Perché quello che insegnano non è teoria. È ciò che hanno costruito, testato e usano loro stessi ogni giorno. Non puoi fare le stesse domande a un formatore a contratto.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
            Quando costruisci qualcosa che non funziona, lo sanno. Perché ci sono passati.
          </p>
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  imgSrc,
  imgAlt,
  name,
  role,
  tag,
  bullets,
}: {
  imgSrc: string;
  imgAlt: string;
  name: string;
  role: string;
  tag: string;
  bullets: string[];
}) {
  const hasImg = imgSrc.trim().length > 0;
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${LIME_BORDER_25}`,
        borderRadius: 18,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            overflow: "hidden",
            background: "var(--night)",
            border: `2px solid ${LIME_BORDER_25}`,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textAlign: "center",
            lineHeight: 1.2,
            padding: 4,
          }}
        >
          {hasImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              alt={imgAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <span>Foto in arrivo</span>
          )}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#fff", margin: "0 0 4px" }}>
            {name}
          </h3>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
            {role}
          </p>
        </div>
      </div>

      <span
        style={{
          alignSelf: "flex-start",
          padding: "5px 12px",
          borderRadius: 100,
          background: LIME_SOFT_10,
          border: `1px solid ${LIME_BORDER_25}`,
          color: LIME,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
        }}
      >
        {tag}
      </span>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
        {bullets.map((b, idx) => (
          <li
            key={idx}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--ghost)",
              opacity: 0.9,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: LIME, flexShrink: 0, fontWeight: 700 }}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 08 — RISULTATI (Results) + recensioni testuali
// ═══════════════════════════════════════════════════════════════════════════════

interface BootcampReview {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const bootcampReviews: BootcampReview[] = [
  {
    initials: "AG",
    name: "Alessandro Giandolfo",
    role: "Studente Morfeus",
    company: "Edizione Claude Unlocked",
    quote:
      "Ho sostituito il fai da te con un metodo solido e una gestione strategica delle mie capacità. La forza di questa esperienza sta nell'equilibrio perfetto tra una chiarezza cristallina e una concretezza che genera risultati immediati.",
    rating: 5,
  },
  {
    initials: "AV",
    name: "Andrea Vitali",
    role: "Studente Morfeus",
    company: "Edizione Claude Unlocked",
    quote:
      "La vera differenza rispetto ad altri corsi è la forte componente pratica: ti porta davvero a cambiare il modo di usare questi strumenti e ti spinge a fare un salto di livello. È un percorso che, lezione dopo lezione, fa accendere nuove lampadine.",
    rating: 5,
  },
  {
    initials: "GB",
    name: "Giovanni Bocca",
    role: "Studente Morfeus",
    company: "Edizione Claude Unlocked",
    quote:
      "Premesse rispettate e promesse mantenute: il corso è stata un'ottima opportunità di acquisire contesto, basi e soprattutto metodo. Teoria e pratica affrontate hanno già cambiato il mio modo di approcciare all'automazione lato AI.",
    rating: 5,
  },
];

function ReviewCardLime({ initials, name, role, company, quote, rating }: BootcampReview) {
  return (
    <div
      style={{
        background: "var(--night)",
        border: `1px solid ${LIME_BORDER_25}`,
        borderRadius: 18,
        padding: "32px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        height: "100%",
        boxSizing: "border-box",
        boxShadow: `0 12px 40px ${LIME_SOFT_10}`,
      }}
    >
      <div style={{ display: "inline-flex", gap: 4 }} aria-label={`${rating} stelle su 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < rating ? LIME : "rgba(255,255,255,0.10)"}
            stroke={i < rating ? LIME : "rgba(255,255,255,0.18)"}
            strokeWidth="1.4"
            aria-hidden
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: 19,
          lineHeight: 1.6,
          color: "#fff",
          margin: 0,
          flex: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: LIME_SOFT_18,
            border: `2px solid ${LIME}`,
            display: "grid",
            placeItems: "center",
            color: LIME,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          {initials}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "#fff", lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", marginTop: 3, lineHeight: 1.35 }}>
            {role} · {company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BootcampResultsSection() {
  return (
    <section
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>La prova</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 56px",
            maxWidth: 760,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Cosa succede <Accent>davvero</Accent>
          <br />
          dopo il bootcamp
        </h2>

        {/* 4 stat */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          <NumberStat big="2.000+" label="professionisti formati da Morfeus Hub" />
          <NumberStat big="3" label="edizioni del bootcamp (questa è la terza)" />
          <NumberStat big="40+ → 25" label="edizioni precedenti ridotte per qualità" />
          <NumberStat big="60%+" label="partecipanti fuori da marketing e comunicazione" />
        </div>

        {/* Recensioni testuali in risalto */}
        <div style={{ marginTop: 16, marginBottom: 12 }}>
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 24px)",
              lineHeight: 1.4,
              color: LIME,
              textAlign: "center",
              margin: "0 auto 36px",
              maxWidth: 720,
            }}
          >
            Cosa dice chi ci è già passato.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 22,
            }}
          >
            {bootcampReviews.map((r) => (
              <ReviewCardLime key={r.name} {...r} />
            ))}
          </div>
        </div>

        {/* Box dato non-marketing */}
        <div
          style={{
            marginTop: 40,
            padding: "clamp(22px, 4vw, 30px)",
            background: "var(--night)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            maxWidth: 820,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 21, color: "#fff", margin: "0 0 14px" }}>
            Un dato che ci teniamo a dire:
          </h3>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)" }}>
            Nelle prime due edizioni, oltre il <strong style={{ color: LIME }}>60% dei partecipanti non lavorava in marketing o comunicazione</strong>.
          </p>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
            Commerciali, avvocati, consulenti, manager HR, ingegneri, imprenditori, architetti.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
            Il metodo M-V-A funziona perché si applica al tuo lavoro reale — non a template generici.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 09 — PER CHI È / PER CHI NON È (Audience)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampAudienceSection() {
  const isFor = [
    { strong: "Sei un freelance o professionista", rest: " che vuole trasformare ore di lavoro esecutivo in output dell'AI — e fatturare di più sulle stesse ore" },
    { strong: "Sei un imprenditore o manager", rest: " che ha bisogno di capire davvero cosa può fare l'AI — non da un consulente esterno, ma in prima persona — per prendere decisioni di investimento consapevoli" },
    { strong: "La tua azienda ti manda", rest: " perché vogliono qualcuno che torni con un metodo reale, non un PowerPoint. Sei il moltiplicatore interno." },
    { strong: "Sei un consulente o formatore", rest: " che vuole costruire una competenza AI vendibile — e al tempo stesso automatizzare parte del tuo lavoro" },
    { strong: "Lavori nel content o nel marketing", rest: " e vuoi un sistema di produzione AI che non dipenda ogni volta da quanto sei ispirato quel giorno" },
    { strong: "Sei un solopreneur", rest: " che non può ancora permettersi un team — e vuole costruire i \"dipendenti\" che non paghi" },
  ];

  const isNotFor = [
    { strong: "Non hai mai aperto Claude o ChatGPT.", rest: " Il bootcamp non parte da zero. Per questo esiste Claude Unlocked. (Se vuoi partire da lì, contattaci — te lo includiamo.)" },
    { strong: "Stai cercando trucchi e shortcut.", rest: " Se pensi che il problema sia non avere \"il prompt giusto\", questo non è il posto. Qui si costruisce metodo, non si colleziona copy-paste." },
    { strong: "Vuoi una certificazione per il CV.", rest: " Il certificato c'è, ma non è il punto. Se la tua priorità è un badge, ci sono percorsi più economici." },
    { strong: "Non hai 2 ore ogni due settimane.", rest: " Il bootcamp è bisettimanale. Non è intensivo. Ma richiede presenza e implementazione tra una sessione e l'altra. Se non hai questo spazio ora, aspetta la prossima edizione." },
    { strong: "Ti aspetti che qualcuno faccia al posto tuo.", rest: " Il bootcamp ti dà metodo e supervisione. Tu costruisci. Non è una consulenza." },
  ];

  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Sii onesto con te stesso</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 56px",
            maxWidth: 760,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Questo bootcamp
          <br />
          <Accent>è per te?</Accent>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          <AudienceColumn label="PER CHI È" sublabel="✓" items={isFor} kind="for" />
          <AudienceColumn label="PER CHI NON È" sublabel="✗" items={isNotFor} kind="against" />
        </div>

        <div
          style={{
            marginTop: 44,
            padding: "clamp(22px, 4vw, 30px)",
            background: "var(--dusk)",
            border: `1px solid ${VIOLET_BORDER}`,
            borderRadius: 16,
            maxWidth: 820,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.55,
              color: "#fff",
            }}
          >
            &ldquo;La call di selezione non è una formalità. Incontriamo ogni persona prima di confermare il posto: un bootcamp pieno di persone sbagliate non funziona per nessuno.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function AudienceColumn({
  label,
  sublabel,
  items,
  kind,
}: {
  label: string;
  sublabel: string;
  items: Array<{ strong: string; rest: string }>;
  kind: "for" | "against";
}) {
  const isFor = kind === "for";
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${isFor ? LIME_BORDER_25 : "var(--hairline)"}`,
        borderRadius: 16,
        padding: "clamp(22px, 4vw, 32px)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 24,
          color: isFor ? LIME : "var(--muted)",
          margin: "0 0 24px",
          letterSpacing: "0.04em",
        }}
      >
        {label} {sublabel}
      </h3>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: isFor ? 1 : 0.8,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: isFor ? LIME : "var(--muted)",
                fontWeight: 700,
                flexShrink: 0,
                fontSize: 16,
                lineHeight: 1.5,
              }}
            >
              {isFor ? "✓" : "✗"}
            </span>
            <span>
              <strong style={{ color: "#fff" }}>{item.strong}</strong>
              {item.rest}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10A — ROI (Facciamo i conti) — sezione individuale
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampROISection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Facciamo i conti</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 28px",
            maxWidth: 820,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          <span style={{ color: LIME }}>1.397 euro.</span>
          <br />
          O <Accent>13.000 euro all&apos;anno</Accent>
          <br />
          che escono dalla finestra.
        </h2>

        <div
          style={{
            margin: "0 auto",
            maxWidth: 740,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.92,
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 14px" }}>
            Ogni settimana che lavori senza un sistema AI, ci sono ore che fai tu che non dovresti fare tu.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            Non perché tu non sia bravo. Perché stai usando il tuo tempo per cose che un sistema potrebbe fare al tuo posto, e meglio, e più velocemente, e senza che tu ci sia.
          </p>
          <p style={{ margin: 0, color: "#fff", fontWeight: 600 }}>
            Fai il conto sulla tua situazione.
          </p>
        </div>

        {/* Box scenario */}
        <div
          style={{
            marginTop: 40,
            padding: "clamp(24px, 4vw, 36px)",
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            display: "grid",
            gap: 22,
          }}
        >
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.6vw, 24px)", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
            5 ore a settimana liberate.
            <span style={{ color: "var(--muted)", fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400, fontSize: 16, display: "block", marginTop: 6 }}>
              Stima conservativa di chi ha completato le edizioni precedenti.
            </span>
          </p>

          <RoiScenario
            tier="25 EUR/h"
            label="Dipendente, consulente, professionista"
            yearly="6.000 EUR/anno"
            payback="Il bootcamp si ripaga in 3 mesi. Poi è puro guadagno ogni anno."
          />
          <RoiScenario
            tier="50 EUR/h"
            label="Freelance, libero professionista"
            yearly="12.000 EUR/anno"
            payback="Il bootcamp si ripaga in 6 settimane. Il primo cliente che prendi con le ore liberate copre tutto."
          />
          <RoiScenario
            tier="Imprenditore o azienda"
            label="Mandi qualcuno dall'azienda al bootcamp"
            yearly="3-5x effetto moltiplicatore"
            payback="Quella persona torna con un sistema costruito sul vostro workflow. In 3-6 mesi diventa il punto di riferimento interno sull'AI."
          />
        </div>

        {/* Box riassunto */}
        <div
          style={{
            marginTop: 28,
            padding: "clamp(20px, 4vw, 28px)",
            background: VIOLET_SOFT,
            border: `1px solid ${VIOLET_BORDER}`,
            borderRadius: 16,
            display: "grid",
            gap: 10,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ghost)",
          }}
        >
          <p style={{ margin: 0, color: "#fff", fontWeight: 600 }}>
            Il bootcamp costa {pricing.currentPrice.toLocaleString("it-IT")} euro.
          </p>
          <p style={{ margin: 0 }}>
            Non farlo costa <strong style={{ color: LIME }}>6.000-12.000 euro all&apos;anno</strong>, ogni anno, finché non costruisci il sistema.
          </p>
          <p style={{ margin: 0 }}>
            E il gap tra chi ha il sistema e chi non ce l&apos;ha si allarga ogni mese.
          </p>
        </div>

        {/* Box deducibilità */}
        <div
          style={{
            marginTop: 22,
            padding: "16px 22px",
            background: LIME_SOFT_10,
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 12,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ghost)",
          }}
        >
          Deducibile come formazione professionale. Costo netto dopo deducibilità (24%): <strong style={{ color: LIME }}>~{Math.round(pricing.currentPrice * 0.76).toLocaleString("it-IT")} EUR</strong>.
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40, gap: 10, textAlign: "center" }}>
          <PrimaryButton size="lg" href={callHref(pricing)} onClick={() => onCtaClick("roi")}>
            Prenota la call di selezione
          </PrimaryButton>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", margin: 0 }}>
            Nella call fai il calcolo sulla tua situazione specifica.
          </p>
        </div>
      </div>
    </section>
  );
}

function RoiScenario({ tier, label, yearly, payback }: { tier: string; label: string; yearly: string; payback: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(160px, 220px) 1fr",
        gap: 18,
        alignItems: "start",
        paddingTop: 18,
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div>
        <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: LIME, letterSpacing: "-0.01em" }}>
          {tier}
        </p>
        <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      <div>
        <p style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "#fff" }}>
          {yearly}
        </p>
        <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.9 }}>
          {payback}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10B — PER LE AZIENDE (B2B compatto, ricalca pattern v2 corso)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampB2BSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      style={{
        padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 32px)",
        background: "var(--night)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          background: "linear-gradient(135deg, rgba(101,88,212,0.18) 0%, rgba(123,104,238,0.10) 50%, rgba(15,14,26,0.90) 100%)",
          border: `1px solid ${VIOLET_BORDER}`,
          borderRadius: 24,
          padding: "clamp(36px, 5vw, 56px) clamp(26px, 4vw, 52px)",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(123,104,238,0.15), 0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
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
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 32,
            alignItems: "center",
          }}
          className={styles.bootcampB2bGrid}
        >
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
                fontSize: "clamp(26px, 3.5vw, 38px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: "0 0 18px",
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Mandi una persona chiave? <Accent>Parliamone.</Accent>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--ghost)", opacity: 0.92, margin: "0 0 12px" }}>
              Abbiamo formato i team di <strong style={{ color: "#fff" }}>Enel, Sisal, BNP Paribas, Zara</strong> e decine di altre aziende italiane.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--ghost)", opacity: 0.95, margin: "0 0 24px" }}>
              Deducibile come formazione professionale, finanziabile via Fondimpresa/Fondir. La persona torna con un sistema costruito sul vostro workflow, non con un certificato.
            </p>
            <OutlineButton href={callHref(pricing)} onClick={() => onCtaClick("b2b")}>
              Prenota una call commerciale →
            </OutlineButton>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 240,
                aspectRatio: "1 / 1",
                display: "grid",
                placeItems: "center",
              }}
            >
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
                style={{ position: "relative", zIndex: 1, opacity: 0.95, width: "70%", height: "70%" }}
              >
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
// SECTION 11 — L'OFFERTA COMPLETA (Offer)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampOfferSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  const stack = [
    { title: "7 sessioni live da 2h con Matteo e Alex (i founder)", body: "14h totali × 250€/h. Non collaboratori, non tutor.", value: "3.500 EUR" },
    { title: "Corso AI Basics — lezioni preparatorie pre-registrate", body: "Livella il gruppo prima del via. Setup, fondamenta, mindset.", value: "197 EUR" },
    { title: "Claude Unlocked — corso base incluso", body: "Il prerequisito logico del bootcamp. Se non lo hai già, lo ricevi.", value: "397 EUR" },
    { title: "Replay permanenti di tutte le sessioni", body: "Non a tempo, non a 90 giorni. Per sempre.", value: "697 EUR" },
    { title: "Gruppo WhatsApp — durata bootcamp + 30gg post", body: "Supporto, domande, feedback tra le sessioni.", value: "297 EUR" },
    { title: "Progetto finale guidato su un caso reale tuo", body: "Un sistema funzionante, deliverable reale, non un esercizio.", value: "897 EUR" },
    { title: "Pacchetto plugin e skill bonus", body: "Costruiti sui framework Morfeus. Pronti all'uso.", value: "297 EUR" },
    { title: "Certificato di completamento Morfeus Hub", body: "Riconosciuto dai nostri partner.", value: "incluso" },
  ];

  return (
    <section
      id="offerta"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Cosa ricevi</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 22px",
            maxWidth: 820,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Tutto quello che è incluso
          <br />
          nel <Accent>Bootcamp AI Champion</Accent>
        </h2>

        <p
          style={{
            margin: "0 auto 56px",
            maxWidth: 760,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.88,
            textAlign: "center",
          }}
        >
          Costruire un sistema AI non si fa in un webinar e non si fa da soli. Quello che segue è tutto ciò che ti serve per farlo — e che abbiamo messo dentro al bootcamp.
        </p>

        {/* Stack list */}
        <div style={{ display: "grid", gap: 0, marginBottom: 40 }}>
          {stack.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 18,
                padding: "20px 4px",
                borderBottom: idx < stack.length - 1 ? "1px solid var(--hairline)" : "none",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: LIME_SOFT_18,
                  border: `1px solid ${LIME_BORDER_25}`,
                  color: LIME,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                ✓
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "#fff", margin: "0 0 4px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.8 }}>
                  {item.body}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: LIME,
                  textAlign: "right",
                  flexShrink: 0,
                  marginTop: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Totale stack */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            marginBottom: 32,
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "var(--ghost)",
          }}
        >
          Valore totale percepito dello stack:{" "}
          <strong style={{ color: LIME, fontFamily: "var(--font-display)", fontSize: 22 }}>
            {pricing.stackValue.toLocaleString("it-IT")} EUR
          </strong>
        </div>

        {/* Reveal prezzo */}
        <div
          style={{
            background: "var(--dusk)",
            border: `2px solid ${LIME}`,
            borderRadius: 18,
            padding: "clamp(28px, 5vw, 44px)",
            textAlign: "center",
            boxShadow: `0 16px 60px ${LIME_SOFT_18}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 700,
              color: LIME,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Il tuo investimento
          </p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 18, flexWrap: "wrap", marginBottom: 14 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(22px, 3vw, 28px)",
                color: "var(--muted)",
                textDecoration: "line-through",
                opacity: 0.75,
              }}
            >
              {pricing.stackValue.toLocaleString("it-IT")} EUR
            </span>
            <span style={{ color: "var(--muted)", fontSize: 28, lineHeight: 1 }}>→</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 72px)",
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              {pricing.currentPrice.toLocaleString("it-IT")} EUR
            </span>
          </div>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
            Listino del bootcamp: <span style={{ textDecoration: "line-through" }}>{pricing.listPrice.toLocaleString("it-IT")} EUR</span> · Stai accedendo al prezzo riservato attuale.
            <br />
            Accesso solo via call di selezione · Pagamento confermato post-call
            <br />
            Fattura disponibile · Deducibile come formazione professionale
          </p>

          <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("offer")}>
            Prenota la call di selezione →
          </PrimaryButton>
          <p style={{ margin: "12px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)" }}>
            25 posti · Call gratuita · Zero impegno fino alla decisione
          </p>
        </div>

        {/* Anchoring 3 colonne */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
            marginTop: 56,
          }}
        >
          <AnchorBox
            title="Percorso autodidatta"
            lines={[
              "150–300 ore del tuo tempo",
              "3.750–7.500 EUR in corsi e risorse",
              "Zero supervisione, zero correzione",
              "Risultato: forse",
            ]}
          />
          <AnchorBox
            title="Consulente AI — 1 giornata"
            lines={[
              "2.000–5.000 EUR",
              "Lui fa, tu guardi",
              "La settimana dopo sei di nuovo solo",
              "Nessun metodo, dipendenza totale",
            ]}
          />
          <AnchorBox
            title="Bootcamp AI Champion"
            lines={[
              `${pricing.currentPrice.toLocaleString("it-IT")} EUR · 14h di formazione reale`,
              "Metodo + supervisione + implementazione",
              "Esci con un sistema funzionante",
              "ROI stimato: 4x in anno 1",
            ]}
            highlight
          />
        </div>

        {/* ROI box */}
        <div
          style={{
            marginTop: 48,
            padding: "clamp(24px, 4vw, 32px)",
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(20px, 2.6vw, 26px)",
              color: "#fff",
              margin: "0 0 6px",
              lineHeight: 1.3,
            }}
          >
            Il prezzo del bootcamp è <span style={{ color: LIME }}>{pricing.currentPrice.toLocaleString("it-IT")} EUR</span>.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(20px, 2.6vw, 26px)",
              color: "#fff",
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            Il prezzo di non farlo è <span style={{ color: LIME }}>6.000 EUR all&apos;anno</span>.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 15, color: "var(--muted)", lineHeight: 1.55 }}>
            5–8h/settimana che continui a fare tu. Ogni anno. Finché non costruisci il sistema.
          </p>
        </div>
      </div>
    </section>
  );
}

function AnchorBox({ title, lines, highlight }: { title: string; lines: string[]; highlight?: boolean }) {
  return (
    <div
      style={{
        background: highlight ? LIME_SOFT_10 : "var(--dusk)",
        border: highlight ? `2px solid ${LIME}` : "1px solid var(--hairline)",
        borderRadius: 14,
        padding: 22,
        position: "relative",
      }}
    >
      {highlight && (
        <span
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 12px",
            borderRadius: 100,
            background: LIME,
            color: "#0B0B0C",
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Consigliato
        </span>
      )}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 18,
          color: highlight ? LIME : "#fff",
          margin: "0 0 14px",
        }}
      >
        {title}
      </h3>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
        {lines.map((l, idx) => (
          <li key={idx} style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.9 }}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — GARANZIA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampGuaranteeSection() {
  return (
    <section
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 14 }}>
          <SectionLabel>La nostra garanzia</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 56px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Investimento <Accent>protetto.</Accent>
          <br />
          Su due livelli.
        </h2>

        <div style={{ display: "grid", gap: 20, textAlign: "left" }}>
          <GuaranteeCard
            icon="🛡"
            title="Garanzia di continuità — trasferimento gratuito"
            body={[
              "Se per qualsiasi motivo non riesci a completare il percorso (lavoro, imprevisti, salute), ti trasferiamo all'edizione successiva senza costi aggiuntivi.",
              "Non perdi l'investimento. Cambi la finestra temporale.",
            ]}
            primary
          />
          <GuaranteeCard
            icon="🎯"
            title="La call di selezione è già una garanzia"
            body={[
              "Prima di confermare il tuo posto, fai una call di selezione con noi.",
              "Non è un colloquio di vendita. È una conversazione reale per capire se il bootcamp è il passo giusto per te ora, con il tuo livello e i tuoi obiettivi.",
              "Se non lo è, te lo diciamo in quella call. Non prendiamo persone che non siamo sicuri di poter portare al risultato.",
              "Questo è il vero risk reversal: entri solo se ha senso entrare.",
            ]}
          />
        </div>

        <p
          style={{
            marginTop: 40,
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--muted)",
            textAlign: "center",
          }}
        >
          Abbiamo ridotto i posti da 40+ a 25 partecipanti proprio per questo: con meno persone possiamo garantire supervisione reale. Non è un claim di marketing. È la ragione per cui il numero esiste.
        </p>
      </div>
    </section>
  );
}

function GuaranteeCard({ icon, title, body, primary }: { icon: string; title: string; body: string[]; primary?: boolean }) {
  return (
    <div
      style={{
        background: "var(--night)",
        border: `1px solid ${primary ? LIME_BORDER_25 : VIOLET_BORDER}`,
        borderRadius: 16,
        padding: "clamp(22px, 4vw, 30px)",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px", lineHeight: 1.3 }}>
        {title}
      </h3>
      <div style={{ display: "grid", gap: 12 }}>
        {body.map((p, idx) => (
          <p key={idx} style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — FAQ
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampFAQSection() {
  const faqs = [
    {
      q: "Ho paura di iniziare e di mollare a metà.",
      a: [
        "È la paura più onesta che si possa avere prima di un percorso che richiede impegno. Tutti la sentono. Anche noi, prima di investire su noi stessi, l'abbiamo sentita.",
        "Quello che cambia rispetto a tutto quello che hai provato prima è semplice: non sei da solo davanti allo schermo. Tra una sessione e l'altra c'è il gruppo. E noi vediamo se ti perdi.",
        "Il formato bisettimanale è pensato esattamente per questo: 2 ore intense, due settimane per applicare nel tuo lavoro vero, e qualcuno che si accorge se sparisci.",
        "Non puoi mollare in silenzio quando qualcuno ti sta guardando lavorare.",
      ],
    },
    {
      q: "Non ho tempo per un percorso di 3 mesi.",
      a: [
        "Il bootcamp è bisettimanale: una sessione ogni due settimane. Sono 2 ore ogni quindici giorni, più implementazione nel tuo lavoro reale.",
        "Non ti chiediamo di mettere il tuo lavoro in pausa. Ti chiediamo di applicare quello che impari mentre lavori. Questo è esattamente il motivo del formato bisettimanale.",
        "Se non hai nemmeno questo spazio, aspetta la prossima edizione. Non ha senso entrare con meno attenzione di quella che serve.",
      ],
    },
    {
      q: "Posso imparare da solo. Ho già YouTube, corsi online, risorse gratis.",
      a: [
        "Puoi. Il percorso autodidatta funziona — richiede in media 150–300 ore per arrivare allo stesso livello. Senza nessuno che ti corregge quando vai nella direzione sbagliata.",
        "Il problema non è l'accesso alle informazioni. È la struttura, la sequenza, e la supervisione. Puoi guardare ore di contenuto senza mai costruire qualcosa che funziona davvero.",
        "14 ore con metodo e correzione live valgono più di 200 ore da soli: non come slogan, ma come dato di chi ha fatto entrambi.",
      ],
    },
    {
      q: "Ho già fatto un corso AI. Questo cosa aggiunge?",
      a: [
        "Dipende dal corso. Se hai fatto Claude Unlocked — il nostro corso — sei già a L2. Il bootcamp ti porta a L3.",
        "Se hai fatto un altro corso: la domanda giusta non è \"so già usare l'AI?\" ma \"ho un sistema che lavora per me?\". Se la risposta è no, il bootcamp ha senso.",
        "La differenza non è nel contenuto — è nel formato. Un corso ti dà conoscenza. Il bootcamp ti dà implementazione guidata su casi reali tuoi, con supervisione e correzione.",
      ],
    },
    {
      q: "Non so se sono al livello giusto.",
      a: [
        "Questa è esattamente la domanda da portare in call.",
        "Il livello minimo richiesto: saper usare Claude in modo autonomo su task semplici. Il livello ideale: hai già Claude Unlocked o equivalente.",
        "Se hai dubbi sul tuo livello, lo valutiamo insieme in 15 minuti. Non ti confermiamo il posto se non sei pronto. Non è nel nostro interesse.",
      ],
    },
    {
      q: "Il mio settore è molto specifico. Funzionerà per me?",
      a: [
        "Nelle prime due edizioni, oltre il 60% dei partecipanti non lavorava in marketing o comunicazione. Consulenti finanziari, avvocati, ingegneri, manager HR, architetti, imprenditori.",
        "Il metodo M-V-A non è settore-specifico — è processo-specifico. Si applica a qualunque flusso di lavoro che ha input, elaborazione e output. Se lavori con testo, documenti, analisi o decisioni, si applica al tuo lavoro.",
        "Portaci il tuo caso in call. Se non siamo sicuri che funzioni, te lo diciamo.",
      ],
    },
    {
      q: "La call di selezione è solo un modo per vendermi qualcosa.",
      a: [
        "Lo capisco. Dall'esterno assomiglia a un'upsell call.",
        "La differenza: abbiamo 25 posti, non 250. Abbiamo rifiutato persone nelle edizioni precedenti. Non perché fossero inadatte, ma perché il momento non era quello giusto per loro.",
        "La call è di 20–30 minuti. Parliamo con ogni candidato. Non è scalabile come tattica di vendita: funziona solo se è genuina.",
        "Se vuoi verificarlo prima: guarda le testimonianze di chi ci è già passato.",
      ],
    },
    {
      q: "L'AI cambia troppo velocemente. Quello che imparo oggi sarà obsoleto.",
      a: [
        "Vero per i tool. Non vero per il metodo.",
        "Claude cambia. Le feature cambiano. Il modo in cui si costruisce un sistema di delegazione — la logica, la struttura, la validazione — quello è più stabile degli strumenti.",
        "M-V-A non è \"come si usa Claude nel 2026\". È come si costruisce qualsiasi sistema AI. Quando Claude cambia, il metodo si adatta. La competenza resta.",
      ],
    },
    {
      q: "Ho già Claude Unlocked. Devo ancora pagare tutto?",
      a: [
        "No. Chi ha già comprato Claude Unlocked riceve il valore del corso (147 EUR) come credito sul prezzo del bootcamp.",
        "Non paghi due volte lo stesso contenuto. Il corso era il prerequisito — lo hai già.",
        "Portalo in call e lo gestiamo lì.",
      ],
    },
    {
      q: "Perché solo 25 posti? Non è solo marketing?",
      a: [
        "Non è marketing. È un vincolo reale.",
        "Matteo e Alex insegnano in prima persona ogni sessione live. Con più di 25 persone, la qualità della supervisione scende: lo abbiamo visto nelle prime edizioni con 40+ partecipanti.",
        "Con 25 persone possiamo correggere, rispondere a domande specifiche, seguire i progetti individuali. Con 50 non possiamo.",
        "Quando diciamo 25, intendiamo 25. Punto.",
      ],
    },
  ];

  return (
    <section
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <SectionLabel>Le domande che stai già facendo</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.8vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 auto 56px",
            maxWidth: 720,
            textAlign: "center",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Risposte <Accent>oneste</Accent>
          <br />
          alle obiezioni reali
        </h2>

        <div style={{ display: "grid", gap: 12 }}>
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} index={idx + 1} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ index, q, a }: { index: number; q: string; a: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${open ? LIME_BORDER_25 : "var(--hairline)"}`,
        borderRadius: 14,
        overflow: "hidden",
        transition: "border-color .2s",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontSize: 16,
          fontWeight: 600,
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          lineHeight: 1.4,
        }}
      >
        <span style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
          <span style={{ color: LIME, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
            {String(index).padStart(2, "0")}
          </span>
          <span>{q}</span>
        </span>
        <span
          aria-hidden
          style={{
            color: LIME,
            fontSize: 22,
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform .25s",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 24px 60px", display: "grid", gap: 12 }}>
          {a.map((p, idx) => (
            <p key={idx} style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.65, color: "var(--ghost)", opacity: 0.9 }}>
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 14 — CTA FINALE
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampFinalCTASection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 14 }}>
          <SectionLabel>Sei arrivato fin qui</SectionLabel>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(34px, 5.4vw, 60px)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "0 0 36px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Costruisci i tuoi <Accent>dipendenti AI.</Accent>
          <br />
          O continui a fare tutto tu.
        </h2>

        <div
          style={{
            display: "grid",
            gap: 16,
            maxWidth: 760,
            margin: "0 auto 36px",
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.92,
          }}
        >
          <p style={{ margin: 0 }}>
            Il Bootcamp AI Champion è la 3a edizione di un percorso testato e rifinito. 14 ore di formazione reale, metodo M-V-A, supervisione dei founder, 25 posti.
          </p>
          <p style={{ margin: 0 }}>
            Non è un corso. Non è una consulenza. È il percorso per costruire il tuo sistema operativo AI — con metodo, con supporto, con risultati verificabili.
          </p>
          <p style={{ margin: 0 }}>
            Il prezzo è <strong style={{ color: LIME }}>{pricing.currentPrice.toLocaleString("it-IT")} EUR</strong>. Il costo di non farlo è <strong style={{ color: LIME }}>6.000 EUR all&apos;anno</strong> di lavoro che continui a fare tu.
          </p>
          <p style={{ margin: 0 }}>
            La call di selezione è gratuita, dura 20–30 minuti, e non c&apos;è nessun impegno finché non decidi tu.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "#fff" }}>
            Se sei arrivato fin qui, hai già le informazioni che ti servono.
          </p>
        </div>

        <p style={{ margin: "0 0 28px", fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>
          I posti rimasti si vedono in call. Non facciamo scarcity falsa: quando sono finiti, sono finiti.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("final")}>
            Prenota la call di selezione →
          </PrimaryButton>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", margin: 0 }}>
            25 posti · Call gratuita · Zero impegno fino alla decisione
          </p>
          <div style={{ marginTop: 18 }}>
            <OutlineButton href={callHref(pricing)} onClick={() => onCtaClick("final-b2b")}>
              Per aziende: prenota una call con noi →
            </OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — THANK YOU BOOTCAMP (post-acquisto Bootcamp AI Champion v3)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampThankYouSection({ step }: SectionProps) {
  const content = (step.content?.BootcampThankYou ?? {}) as BootcampThankYouContent;

  const whatsappHref = content.whatsappGroupUrl && content.whatsappGroupUrl.trim().length > 0 ? content.whatsappGroupUrl : "#";
  const circleHref = content.circleUrl && content.circleUrl.trim().length > 0 ? content.circleUrl : "#";
  const claudeHref = content.claudeUrl && content.claudeUrl.trim().length > 0 ? content.claudeUrl : "https://claude.ai";
  const supportEmail = content.supportEmail && content.supportEmail.trim().length > 0 ? content.supportEmail : "hello@morfeushub.com";

  const cardBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "26px 28px",
    boxSizing: "border-box",
  };

  const steps = [
    {
      n: "01",
      tone: "lime" as const,
      title: "Entra nel gruppo WhatsApp",
      body: "Qui c'è tutto: aggiornamenti, annunci, domande tra partecipanti e con noi. Il tuo primo messaggio: presentati in 2 righe.",
      ctaLabel: "Entra nel gruppo WhatsApp →",
      ctaHref: whatsappHref,
      ctaIcon: "whatsapp" as const,
      priority: "Priorità massima",
    },
    {
      n: "02",
      tone: "lime" as const,
      title: "Accedi a Claude Unlocked — è già tuo",
      body: "Il corso base è incluso nel bootcamp. Entra su Circle e inizia subito dal Modulo 0 — è il prerequisito fondamentale per il Live #1. Non saltarlo.",
      ctaLabel: "Accedi a Circle →",
      ctaHref: circleHref,
      ctaIcon: "external" as const,
      priority: "Priorità massima",
    },
    {
      n: "03",
      tone: "violet" as const,
      title: "Completa le 3 ore di lezioni pre-registrate",
      body: "Sono il livellamento. Tutti i partecipanti le guardano prima del Live #1 — ti mettono sullo stesso piano di partenza indipendentemente dalla tua esperienza attuale.",
      priority: "Priorità alta",
    },
    {
      n: "04",
      tone: "violet" as const,
      title: "Configura il tuo account Claude",
      body: "Se non ce l'hai già: attiva un abbonamento Claude Pro su claude.ai. È lo strumento che useremo durante tutto il bootcamp. Senza di esso non puoi seguire le sessioni pratiche.",
      ctaLabel: "Vai a claude.ai →",
      ctaHref: claudeHref,
      ctaIcon: "external" as const,
      priority: "Priorità alta",
    },
  ];

  const timeline = [
    { when: "Adesso", what: "Entra nel gruppo, inizia il corso", note: "WhatsApp + Circle + Modulo 0" },
    { when: "Entro fine maggio", what: "Completa le lezioni pre-registrate", note: "3h di contenuto — il livellamento" },
    { when: "Prima settimana di giugno", what: "Live #1 — Si inizia", note: "Data esatta comunicata nel gruppo WhatsApp" },
    { when: "~13 settimane dopo", what: "Progetto finale + certificato", note: "Esci con un sistema operativo AI funzionante" },
  ];

  const sessions = [
    { n: "01", title: "Il Sistema", body: "Mindset operativo, framework M-V-A, context engineering" },
    { n: "02", title: "Prompt Engineering Avanzato", body: "Architettura delle richieste complesse" },
    { n: "03", title: "Skill e Automazione", body: "Costruire strumenti personalizzati" },
    { n: "04", title: "Plan & Solve", body: "Metodo per progetti complessi in 6 fasi" },
    { n: "05", title: "Workflow Reali", body: "Use case end-to-end nel tuo lavoro" },
    { n: "06", title: "Sicurezza, Privacy e Sistema Operativo AI", body: "" },
    { n: "07", title: "Progetto Finale e Next Level", body: "Claude Code, Cursor, il futuro" },
  ];

  return (
    <section
      className={styles.sectionPad}
      style={{
        maxWidth: 980,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── 1. Hero / Conferma ────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Badge>Bootcamp AI Champion · v3</Badge>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(40px, 6vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "20px auto 18px auto",
            maxWidth: 780,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Sei uno dei <Accent>25</Accent>.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 auto 18px",
            maxWidth: 660,
          }}
        >
          Hai superato la selezione. Hai investito. Adesso costruiamo il tuo sistema AI — con metodo e con noi accanto.
        </p>
        <p
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: 17,
            lineHeight: 1.5,
            color: LIME,
            opacity: 0.95,
            margin: 0,
          }}
        >
          Benvenuto nel bootcamp.
        </p>
      </div>

      {/* ── 2. Notice tecnica ────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "16px 20px",
          background: LIME_SOFT_10,
          border: `1px solid ${LIME_BORDER_25}`,
          borderRadius: 12,
          marginBottom: 64,
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
            background: LIME_SOFT_18,
            color: LIME,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ghost)" }}>
          Controlla la tua email: riceverai a breve la ricevuta Stripe e le istruzioni di accesso a Circle. Se non la vedi entro 10 minuti, controlla spam o scrivi a hello@morfeushub.com.
        </div>
      </div>

      {/* ── 3. Prossimi passi (4 step) ────────────────────────────────── */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionLabel>Cosa fai adesso · in ordine</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 14px auto",
              maxWidth: 720,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            I tuoi <Accent>prossimi passi</Accent>.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "0 auto",
              maxWidth: 620,
            }}
          >
            Non aspettare giugno per iniziare. Queste azioni nei prossimi giorni ti faranno arrivare al Live #1 già a un livello completamente diverso.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((s) => (
            <BcTyStepCard key={s.n} {...s} />
          ))}
        </div>
      </div>

      {/* ── 4. Timeline / Roadmap ──────────────────────────────────── */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <SectionLabel>Quando succede cosa</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 3.6vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 14px auto",
              maxWidth: 720,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            La tua <Accent>roadmap</Accent>.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "0 auto",
              maxWidth: 560,
            }}
          >
            Il bootcamp parte a inizio giugno. Prima, preparati.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 11,
              top: 6,
              bottom: 6,
              width: 1,
              background: `linear-gradient(180deg, ${LIME_BORDER_25} 0%, rgba(255,255,255,0.06) 100%)`,
            }}
          />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 22 }}>
            {timeline.map((t, i) => (
              <li key={i} style={{ position: "relative" }}>
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: -24,
                    top: 8,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: i === 0 ? LIME : "rgba(255,255,255,0.08)",
                    border: i === 0 ? `2px solid ${LIME}` : "2px solid rgba(255,255,255,0.15)",
                    boxShadow: i === 0 ? `0 0 12px ${LIME_GLOW_50}` : "none",
                  }}
                />
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "18px 22px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: i === 0 ? LIME : "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    {t.when}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 600,
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      color: "#fff",
                      marginBottom: 6,
                    }}
                  >
                    {t.what}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: "var(--ghost)",
                      opacity: 0.8,
                    }}
                  >
                    {t.note}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 5. Le 7 sessioni live ─────────────────────────────────── */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <SectionLabel>Le 7 sessioni live</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 3.6vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 14px auto",
              maxWidth: 720,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Cosa <Accent>costruiamo insieme</Accent>.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "0 auto",
              maxWidth: 620,
            }}
          >
            Cadenza bisettimanale — 1 settimana on, 1 settimana off per implementare. Replay permanente su Circle.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sessions.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                gap: 18,
                padding: "16px 20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  color: LIME,
                  width: 32,
                }}
              >
                {s.n}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16.5,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: "#fff",
                    marginBottom: s.body ? 4 : 0,
                  }}
                >
                  {s.title}
                </div>
                {s.body && (
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: "var(--ghost)",
                      opacity: 0.8,
                    }}
                  >
                    {s.body}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Contatto / Supporto ─────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <SectionLabel>Hai domande?</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 3.4vw, 36px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px 0 0 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Siamo <Accent>raggiungibili</Accent>.
          </h2>
        </div>
        <div style={{ ...cardBase, padding: "30px 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: LIME,
              marginBottom: 10,
            }}
          >
            Supporto bootcamp
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: 0.92,
              margin: "0 0 22px 0",
              maxWidth: 620,
            }}
          >
            Per qualsiasi domanda su logistica, accessi, pagamenti o contenuto del bootcamp — scrivi sul gruppo WhatsApp o a <strong style={{ color: "#fff" }}>{supportEmail}</strong>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href={whatsappHref}
              target={whatsappHref.startsWith("http") ? "_blank" : undefined}
              rel={whatsappHref.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                background: LIME,
                color: "#0B0B0C",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                border: `1px solid ${LIME}`,
                boxShadow: `0 4px 18px ${LIME_GLOW_35}`,
                transition: "background .15s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Gruppo WhatsApp
            </a>
            <a
              href={`mailto:${supportEmail}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                background: "transparent",
                color: LIME,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                border: `1px solid ${LIME_BORDER_25}`,
                transition: "background .15s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {supportEmail}
            </a>
          </div>
        </div>
      </div>

      {/* ── Note finale ─────────────────────────────────────────────── */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 12,
          lineHeight: 1.5,
          color: "var(--muted)",
          opacity: 0.7,
          margin: "48px 0 0 0",
        }}
      >
        Hai ricevuto questa pagina perché hai acquistato il Bootcamp AI Champion v3.
      </p>
    </section>
  );
}

function BcTyStepCard({
  n,
  tone,
  title,
  body,
  ctaLabel,
  ctaHref,
  ctaIcon,
  priority,
}: {
  n: string;
  tone: "lime" | "violet";
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: "whatsapp" | "external";
  priority: string;
}) {
  const isLime = tone === "lime";
  const accent = isLime ? LIME : "var(--violet)";
  const accentSoft = isLime ? LIME_SOFT_10 : VIOLET_SOFT;
  const accentBorder = isLime ? LIME_BORDER_25 : VIOLET_BORDER;

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "26px 28px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: 10,
          background: accentSoft,
          border: `1px solid ${accentBorder}`,
          display: "grid",
          placeItems: "center",
          color: accent,
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {priority}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 19,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: "#fff",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
          }}
        >
          {body}
        </p>
        {ctaLabel && ctaHref && (
          <div style={{ marginTop: 6 }}>
            <a
              href={ctaHref}
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: isLime ? LIME : "transparent",
                color: isLime ? "#0B0B0C" : LIME,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 10,
                textDecoration: "none",
                border: isLime ? `1px solid ${LIME}` : `1px solid ${LIME_BORDER_25}`,
                boxShadow: isLime ? `0 4px 18px ${LIME_GLOW_35}` : "none",
                transition: "background .15s",
              }}
            >
              {ctaIcon === "whatsapp" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              )}
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function BootcampFooterSection() {
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
          <Link href="/it/termini-bootcamp" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Termini e Condizioni</Link>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={muted}>
          <strong style={{ color: "var(--muted)", opacity: 1 }}>Disclaimer:</strong> I prodotti e servizi venduti su questo sito non costituiscono proiezione, promessa o garanzia di guadagno. I risultati individuali possono variare e dipendono dall&apos;impegno, dall&apos;esperienza e dalle condizioni individuali di ciascun partecipante.
        </p>
        <p style={muted}>
          Il Bootcamp AI Champion è un programma di formazione professionale indipendente. Claude è un marchio di Anthropic, PBC. Questo bootcamp non è affiliato a, sponsorizzato da, o approvato da Anthropic.
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
// SECTION — STICKY MOBILE CTA BAR
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampStickyBarSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  const [isMobile, setIsMobile] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearOffer, setNearOffer] = useState(false);
  const [nearFinal, setNearFinal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener("change", updateMobile);

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.55);

      const offer = document.getElementById("offerta");
      if (offer) {
        const r = offer.getBoundingClientRect();
        setNearOffer(r.top < window.innerHeight * 0.90 && r.bottom > window.innerHeight * 0.10);
      }

      const footer = document.querySelector("footer");
      if (footer) {
        const r = footer.getBoundingClientRect();
        setNearFinal(r.top < window.innerHeight * 1.1);
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
    trackEvent("bootcamp_sticky_click", {});
    scrollToId("offerta");
  };

  const show = isMobile && pastHero && !nearOffer && !nearFinal;

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
          background: LIME,
          color: "#0B0B0C",
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
          boxShadow: `0 4px 18px ${LIME_GLOW_35}`,
        }}
      >
        Prenota la call · {pricing.currentPrice.toLocaleString("it-IT")}€ <span style={{ fontSize: 16 }}>→</span>
      </button>
    </div>
  );
}

