"use client";

import type { FunnelStepConfig } from "@/funnels/types";

interface SectionProps {
  accentColor: string;
  step: FunnelStepConfig;
}

const BENEFITS: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: "🎯",
    title: "Un prompt sul TUO progetto",
    body: "Non una lezione astratta: lo strumento ti intervista in 5 passi sul tuo lavoro reale e monta il metodo addosso a quello.",
  },
  {
    icon: "⚡",
    title: "Pronto da incollare",
    body: "Ti porti via un prompt di avvio gia' pronto: lo copi in Claude o ChatGPT e l'AI parte a costruire il piano con te, una tappa alla volta.",
  },
  {
    icon: "🔓",
    title: "Zero costi, zero codice",
    body: "Gratis, nessuna carta richiesta. Funziona con l'AI che gia' usi: bastano 5 minuti per averlo in mano.",
  },
];

export function PlanSolveOptinExtrasSection({ step }: SectionProps) {
  void step;
  return (
    <section
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "8px 24px 64px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Cosa ottieni */}
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
        Cosa ottieni
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 3.6vw, 38px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--white)",
          margin: "0 0 28px 0",
          fontWeight: 600,
          maxWidth: 720,
        }}
      >
        In 5 minuti, il metodo che fa fare all&apos;AI un lavoro grande senza che crolli a meta&apos; —
        montato sul tuo progetto.
      </h2>

      <div
        className="ps-optin-benefits"
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 36 }}
      >
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 26,
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(235,122,46,0.10)",
                border: "1px solid rgba(235,122,46,0.25)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {b.icon}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                lineHeight: 1.25,
                color: "var(--white)",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {b.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ghost)",
                opacity: 0.85,
                margin: 0,
              }}
            >
              {b.body}
            </p>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(235,122,46,0.08), rgba(123,104,238,0.05))",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "24px 26px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "18px 36px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--white)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            4.8 <span style={{ color: "var(--orange)", fontSize: 19 }}>★★★★★</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            valutazione media dei corsisti
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--white)",
            }}
          >
            500+
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)" }}>
            corsisti su Claude Unlocked
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
            flex: "1 1 260px",
            minWidth: 240,
          }}
        >
          E&apos; lo stesso metodo che insegniamo nei nostri corsi — qui in versione gratuita, pronta da
          provare oggi.
        </p>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .ps-optin-benefits {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
