"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FunnelStepConfig } from "@/funnels/types";

interface SectionProps {
  accentColor: string;
  step: FunnelStepConfig;
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
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

export function PlanSolveThankYouSection({ step }: SectionProps) {
  void step;
  const [name, setName] = useState("");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("freebie_optin_name") : null;
    setName(stored ?? "");
  }, []);

  const greeting = name ? `${name}, ci siamo.` : "Ci siamo.";

  return (
    <section
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "40px 24px 80px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      {/* Check mail */}
      <div>
        <Badge>Risorsa in arrivo via email</Badge>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.6vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--white)",
            margin: "18px 0 16px 0",
            fontWeight: 600,
          }}
        >
          {greeting} Controlla la tua mail per accedere a{" "}
          <span
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--orange)",
            }}
          >
            Plan &amp; Solve
          </span>
          .
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.9,
            margin: 0,
            maxWidth: 640,
          }}
        >
          Ti abbiamo appena inviato l&apos;email con il link al tuo strumento Plan &amp; Solve. Aprila e
          parti: in 5 minuti monti il metodo sul tuo progetto reale e ti porti via un prompt pronto per
          Claude o ChatGPT.
        </p>
        <div
          style={{
            marginTop: 18,
            padding: "14px 18px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          📩 Non la trovi? Controlla <strong style={{ color: "var(--ghost)" }}>spam</strong> o{" "}
          <strong style={{ color: "var(--ghost)" }}>promozioni</strong>, e aggiungi il nostro indirizzo ai
          contatti così le prossime arrivano dritte in posta.
        </div>
      </div>

      {/* Course social proof (no sales) */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(235,122,46,0.10), rgba(123,104,238,0.06))",
          border: "1px solid rgba(235,122,46,0.25)",
          borderRadius: 18,
          padding: "30px 28px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontWeight: 700,
            marginBottom: 12,
            fontFamily: "var(--font-body)",
          }}
        >
          Se vuoi andare oltre
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3.2vw, 32px)",
            lineHeight: 1.18,
            color: "var(--white)",
            margin: "0 0 12px 0",
            fontWeight: 600,
          }}
        >
          Il metodo completo lo impari dentro Claude Unlocked.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.9,
            margin: "0 0 20px 0",
            maxWidth: 560,
          }}
        >
          Quello che ti arriva via mail è un assaggio. Il Plan &amp; Solve completo — pre-mortem, doppia
          validazione, sprint e piano vivente — e tutto il resto su Claude lo impari passo-passo, su casi
          veri, nel corso.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", marginBottom: 24 }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 700,
                color: "var(--white)",
                lineHeight: 1,
              }}
            >
              500+
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)", marginTop: 4 }}>
              corsisti
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 700,
                color: "var(--white)",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              4.8 <span style={{ color: "var(--orange)", fontSize: 22 }}>★★★★★</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)", marginTop: 4 }}>
              valutazione media
            </div>
          </div>
        </div>

        <a
          href="/claude-unlocked"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 16,
            padding: "15px 26px",
            borderRadius: 10,
            background: "var(--orange)",
            color: "#fff",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(235,122,46,0.35)",
          }}
        >
          Scopri Claude Unlocked <span style={{ fontSize: 18 }}>→</span>
        </a>
        <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-body)", marginTop: 12 }}>
          Il freebie ti dà la mappa. Il corso ti insegna a percorrerla.
        </div>
      </div>

      {/* Back to resources */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/risorse-gratuite"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Tutte le risorse gratuite di Morfeus
        </Link>
      </div>
    </section>
  );
}
