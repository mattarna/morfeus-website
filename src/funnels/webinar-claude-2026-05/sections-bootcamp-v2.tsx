"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BootcampV2PricingContent } from "@/funnels/types";
import styles from "./sections.module.css";

// ─── Shared prop shape ────────────────────────────────────────────────────────

interface SectionProps {
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any;
}

// ─── Lime palette (hardcoded — identica a v1 per coerenza visiva) ────────────

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

function readPricing(step: { content?: { BootcampV2Pricing?: BootcampV2PricingContent } } | undefined): BootcampV2PricingContent {
  return (
    step?.content?.BootcampV2Pricing ?? {
      currentPrice: 1500,
      earlyBirdPrice: 1297,
      listPrice: 1500,
      stackValue: 8900,
      currency: "EUR",
      callUrl: "",
    }
  );
}

/** CTA href: stringa vuota nel config = href="#" no-op (placeholder Calendly Mattia) */
function callHref(pricing: BootcampV2PricingContent): string {
  return pricing.callUrl && pricing.callUrl.trim().length > 0 ? pricing.callUrl : "#";
}

function onCtaClick(block: string) {
  trackEvent("bootcamp_v2_cta_click", { block });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — HEADER
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2HeaderSection() {
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
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: LIME,
          opacity: 0.7,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        v2 · preview
      </span>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 01 — HERO
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2HeroSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      id="hero"
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

      {/* Pre-headline (eyebrow) */}
      <p
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: "clamp(15px, 1.5vw, 18px)",
          color: LIME,
          opacity: 0.9,
          margin: "0 auto 22px",
          letterSpacing: "0.01em",
        }}
      >
        Sai usare l&apos;AI. Ma sai costruire un sistema?
      </p>

      {/* Headline — 3 righe, "delegargli" in accent */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(36px, 5.8vw, 68px)",
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
          color: "#fff",
          margin: "0 auto 26px",
          maxWidth: 940,
          textWrap: "balance" as React.CSSProperties["textWrap"],
        }}
      >
        Costruisci i tuoi dipendenti AI.
        <br />
        Smetti di usare Claude.
        <br />
        Inizia a <Accent>delegargli</Accent> lavoro.
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          color: "var(--ghost)",
          opacity: 0.88,
          maxWidth: 780,
          margin: "0 auto 32px",
          textWrap: "pretty" as React.CSSProperties["textWrap"],
        }}
      >
        Per professionisti e team che hanno superato la fase &laquo;provo ChatGPT&raquo; e vogliono un sistema AI che lavora al loro standard, senza ricominciare da zero ogni volta.
      </p>

      {/* Proof pill — formato inline */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(8px, 2vw, 14px)",
          marginBottom: 32,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--ghost)",
          opacity: 0.75,
        }}
      >
        <span><strong style={{ color: LIME }}>2.000+</strong> professionisti formati</span>
        <span aria-hidden style={{ opacity: 0.5 }}>·</span>
        <span>3ª edizione</span>
        <span aria-hidden style={{ opacity: 0.5 }}>·</span>
        <span>25 posti</span>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("hero")}>
          Prenota la call di selezione →
        </PrimaryButton>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: LIME,
            opacity: 0.85,
            margin: "0 0 4px",
            fontStyle: "italic",
          }}
        >
          25 posti — call di selezione obbligatoria
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--muted)",
            opacity: 0.75,
            margin: 0,
            maxWidth: 440,
          }}
        >
          Call gratuita con Mattia, 15 minuti. Zero impegno, zero vendita aggressiva.
        </p>
      </div>

      {/* Logo bar partner */}
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

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 02 — IL SALTO CHE MANCA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2LevelGapSection() {
  return (
    <section
      id="level-gap"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Pre-headline */}
        <SectionLabel>Sei bravo con l&apos;AI. Questo è il problema.</SectionLabel>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 32px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Usare l&apos;AI è una cosa.
          <br />
          <Accent>Costruirsi qualcosa</Accent> che lavora per te è un&apos;altra.
        </h2>

        {/* Intro narrative */}
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            marginBottom: 56,
          }}
        >
          <p style={{ margin: "0 0 18px" }}>Non stai partendo da zero.</p>
          <p style={{ margin: "0 0 18px" }}>
            Sai già fare cose che la maggior parte dei tuoi colleghi non sa fare. Sai quando un prompt funziona e quando no. Sai leggere un output e capire se regge. Sai quali scorciatoie valgono e quali fanno perdere tempo.
          </p>
          <p style={{ margin: "0 0 18px" }}>Questo ti mette in un posto strano.</p>
          <p style={{ margin: 0 }}>
            Sei troppo avanti per sentirti principiante.
            <br />
            Non sei ancora abbastanza avanti da smettere di farcela tu.
          </p>
        </div>

        {/* Momento — Carriera */}
        <Moment
          tag="MOMENTO — CARRIERA"
          when="Il lunedì mattina."
        >
          <p style={{ margin: "0 0 18px" }}>
            Hai costruito qualcosa nel weekend. Un prompt che funziona davvero, un template che ti taglia tre ore di lavoro. Arrivi in ufficio con quella sensazione &mdash; piccola, ma reale &mdash; di aver fatto qualcosa di intelligente.
          </p>
          <p style={{ margin: "0 0 18px", fontWeight: 600, color: "#fff" }}>Nessuno lo vede.</p>
          <p style={{ margin: 0 }}>
            Non perché non apprezzino. Ma perché il risultato è lo stesso di prima. Solo consegnato prima. E quindi quelle tre ore &mdash; che dovevano essere tue &mdash; le hai riempite con altro lavoro, un&apos;altra richiesta, un&apos;altra riunione. Il tuo cervello è ancora il collo di bottiglia. L&apos;AI ti ha reso più veloce. Non ti ha liberato.
          </p>
        </Moment>

        {/* Momento — Freelance */}
        <Moment
          tag="MOMENTO — FREELANCE"
          when="Il venerdì pomeriggio."
        >
          <p style={{ margin: "0 0 18px" }}>
            Un cliente ti manda un messaggio: &laquo;Puoi fare la stessa cosa anche per gli altri cinque progetti?&raquo;
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Sai già come risponderai.
            <br />
            Sì, ma dimmi quando. Perché queste cose le fai tu, seduto, una alla volta.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Con l&apos;AI lavori tre volte più veloce. Ma il sistema sei ancora tu. Non puoi accenderlo e tornare il giorno dopo. Non puoi delegarlo mentre dormi. Non puoi replicarti.
          </p>
          <p style={{ margin: "0 0 18px" }}>Ogni ora che produci è un&apos;ora che passi davanti allo schermo.</p>
          <p style={{ margin: 0 }}>
            Fai il conto: cinque ore a settimana che potresti far girare senza essere lì. Cinquanta euro l&apos;ora. Cinquantadue settimane.
            <br />
            <strong style={{ color: LIME, fontSize: "1.05em" }}>
              13.000 euro che non guadagni
            </strong>{" "}
            &mdash; non perché non sei bravo, ma perché il tuo sistema richiede che tu ci sia.
          </p>
        </Moment>

        {/* Momento — Imprenditore */}
        <Moment
          tag="MOMENTO — IMPRENDITORE"
          when="La domenica sera."
        >
          <p style={{ margin: "0 0 18px" }}>
            Stai guardando la settimana che finisce. Il team usa l&apos;AI &mdash; hai pagato le licenze, hai condiviso qualche articolo, hai detto &laquo;esplorate pure.&raquo;
          </p>
          <p style={{ margin: "0 0 18px", fontWeight: 600, color: "#fff" }}>Ognuno la usa a modo suo.</p>
          <p style={{ margin: "0 0 18px" }}>
            Chi per le email. Chi per le slide. Chi non la usa perché &laquo;tanto poi devo ricontrollare tutto.&raquo; Stai gestendo un&apos;organizzazione dove ogni persona ha un giocattolo diverso e nessuno sa cosa fa il vicino. Non è adozione dell&apos;AI. È automazione individuale senza sistema.
          </p>
          <p style={{ margin: 0 }}>
            E tu sai esattamente cosa manca &mdash; ma non hai ancora avuto il tempo di costruirlo.
          </p>
        </Moment>

        {/* Closing */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.95,
          }}
        >
          <p style={{ margin: "0 0 18px" }}>Il problema non è che stai facendo le cose male.</p>
          <p style={{ margin: "0 0 18px" }}>
            Il problema è che stai facendo le cose giuste nel modo sbagliato: caso per caso, ripartendo da zero ogni volta, portando ancora tu il peso di ogni singola decisione.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            C&apos;è una linea &mdash; sottile, quasi invisibile &mdash; che separa chi <Accent>usa</Accent> l&apos;AI da chi ha costruito qualcosa che <Accent>lavora</Accent> per lui mentre lui fa altro.
          </p>
          <p style={{ margin: "0 0 18px", color: "#fff", fontWeight: 600 }}>
            Non l&apos;hai ancora attraversata.
          </p>
          <p style={{ margin: 0, opacity: 0.7, fontSize: "0.95em" }}>
            E nella sezione che viene dopo, ti spiego perché non è colpa tua.
          </p>
        </div>
      </div>
    </section>
  );
}

function Moment({
  tag,
  when,
  children,
}: {
  tag: string;
  when: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: 48,
        paddingTop: 32,
        borderTop: `1px solid ${VIOLET_BORDER}`,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: LIME,
          opacity: 0.7,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin: "0 0 12px",
          fontWeight: 700,
        }}
      >
        {tag}
      </p>
      <p
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: "clamp(18px, 2vw, 22px)",
          color: "#fff",
          margin: "0 0 20px",
          letterSpacing: "0.005em",
        }}
      >
        {when}
      </p>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(16px, 1.5vw, 18px)",
          lineHeight: 1.7,
          color: "var(--ghost)",
          opacity: 0.92,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 03 — DISARMO DELL'EGO (NUOVO)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2DisarmoEgoSection() {
  return (
    <section
      id="disarmo-ego"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionLabel>Prima di andare avanti.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 24px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Probabilmente stai pensando
          <br />
          una di <Accent>queste tre cose</Accent>.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 0 56px",
          }}
        >
          Lascia che le prenda sul serio, prima che tu le usi per chiudere questa pagina.
        </p>

        <Objection
          objection="«Non sono abbastanza tecnico.»"
        >
          <p style={{ margin: "0 0 18px" }}>
            Il <strong style={{ color: LIME }}>60% delle persone</strong> nelle cohort precedenti non aveva un background tecnico. Avvocati, HR manager, architetti, consulenti, formatori. Il bootcamp non insegna a programmare &mdash; insegna a pensare in modo sistematico. Se sai usare un foglio Excel, hai già il profilo giusto.
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontStyle: "italic", fontSize: "0.95em" }}>
            E per essere onesti: se la competenza richiesta fosse saper programmare, io stesso non sarei qui a insegnare questo. Non è quella la materia.
          </p>
        </Objection>

        <Objection
          objection="«Il mio settore è troppo specifico.»"
        >
          <p style={{ margin: "0 0 18px" }}>
            Ogni professionista, in ogni settore, fa queste cose ogni settimana: scrive email, prepara documenti, fa ricerche, analizza dati, gestisce progetti, ripete gli stessi processi.
          </p>
          <p style={{ margin: "0 0 18px", color: "#fff", fontWeight: 600 }}>
            Queste sono le materie prime di un sistema AI.
          </p>
          <p style={{ margin: 0 }}>
            La sessione 5 del bootcamp non è su un caso generico &mdash; è costruita sul tuo lavoro, nel tuo settore. Porti il tuo caso. Costruisci il tuo sistema. Le edizioni precedenti avevano avvocati, commercialisti, imprenditori del retail, consulenti finanziari, content creator. Ognuno ha costruito qualcosa di completamente diverso. Ognuno ha funzionato.
          </p>
        </Objection>

        <Objection
          objection="«Ho già fatto un corso AI e non è cambiato niente.»"
        >
          <p style={{ margin: "0 0 18px" }}>
            Normale. <strong style={{ color: "#fff" }}>Non è colpa tua &mdash; è il formato.</strong>
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Un corso registrato ti dà informazioni. Il bootcamp ti dà trasformazione. La differenza non è il contenuto &mdash; è che qualcuno ti segue mentre lo costruisci, ti dice &laquo;non così, fai così&raquo;, ti corregge in tempo reale. Senza quello, la maggior parte della formazione finisce in una cartella che non apri più.
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontStyle: "italic", fontSize: "0.95em" }}>
            (E per essere trasparenti: anche una buona formazione di base, da sola, ti porta a un certo punto. Per costruire il sistema completo &mdash; quello che lavora per te mentre fai altro &mdash; serve il bootcamp.)
          </p>
        </Objection>

        <div
          style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.5,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0 0 8px", opacity: 0.85 }}>
            Se ti sei riconosciuto in una di queste tre cose?
          </p>
          <p style={{ margin: 0, fontWeight: 600 }}>
            Bene. Sei <Accent>esattamente</Accent> la persona per cui è stato costruito.
          </p>
        </div>
      </div>
    </section>
  );
}

function Objection({ objection, children }: { objection: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 36,
        padding: "28px 28px 28px 32px",
        borderRadius: 12,
        background: "var(--dusk)",
        border: `1px solid ${LIME_BORDER_25}`,
        position: "relative",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 28,
          bottom: 28,
          width: 3,
          background: LIME,
          borderRadius: 2,
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(18px, 1.9vw, 22px)",
          color: "#fff",
          margin: "0 0 16px",
          letterSpacing: "-0.005em",
        }}
      >
        {objection}
      </p>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 1.4vw, 17px)",
          lineHeight: 1.65,
          color: "var(--ghost)",
          opacity: 0.92,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 04 — PERCHÉ DA SOLO NON FUNZIONA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2WhyAloneSection() {
  return (
    <section
      id="why-alone"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionLabel>Il problema non sei tu.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 24px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Sono i quattro modi
          <br />
          in cui <Accent>l&apos;AI si impara male</Accent>.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 0 56px",
          }}
        >
          Se hai già provato e non hai ancora il sistema che volevi, è quasi certamente per uno di questi quattro motivi.
        </p>

        <Enemy
          title="Il labirinto dei tutorial."
          body={
            <>
              YouTube, Reddit, community online, corsi a 19 euro. Il problema non è che le risorse non ci siano &mdash; è che nessuno ti dice &laquo;stai sbagliando&raquo;. Sbagli, non lo sai, ci aggiungi sopra. Tre mesi dopo hai una pila di prompt che funzionano raramente e non capisci perché.{" "}
              <strong style={{ color: "#fff" }}>Il fai-da-te produce esperienza. Non sistema.</strong>
            </>
          }
        />

        <Enemy
          title="La demo che non usi mai."
          body={
            <>
              &laquo;I 10 prompt per il marketing. Come generare email in 2 minuti. I 5 tool del 2025.&raquo; Dopo il workshop torni al tuo lavoro e non sai da dove iniziare. Hai visto cosa fa lo strumento &mdash; non come integrarlo nel tuo.{" "}
              <strong style={{ color: "#fff" }}>La formazione generica produce spettatori entusiasti. Non operatori.</strong>
            </>
          }
        />

        <Enemy
          title="Il bootcamp da 200 persone."
          body={
            <>
              Nessuna selezione. Nessun cap. Scrivi la domanda nella chat e speri che venga letta. Il formatore ha studiato la documentazione &mdash; non usa lo strumento nel lavoro reale. Zero feedback personalizzato, zero progetto tuo, zero accountability.{" "}
              <strong style={{ color: "#fff" }}>Paghi, guardi, dimentichi.</strong>
            </>
          }
        />

        <Enemy
          title="Il consulente a giornata."
          body={
            <>
              Viene, fa, se ne va. 2.000&minus;5.000 euro per una panoramica. Zero competenza trasferita. Zero autonomia costruita. Il mese dopo hai un problema nuovo e devi richiamare.{" "}
              <strong style={{ color: "#fff" }}>Non ha creato la tua competenza &mdash; ha creato la sua dipendenza.</strong>
            </>
          }
        />

        <div
          style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0 0 12px", opacity: 0.75, fontStyle: "italic" }}>
            Il denominatore comune?
          </p>
          <p style={{ margin: 0, color: "#fff" }}>
            Tutti e quattro ti insegnano <Accent>cosa</Accent> fare.
            <br />
            Nessuno ti fa costruire <Accent>qualcosa che funziona ancora dopo sei mesi</Accent>.
          </p>
        </div>
      </div>
    </section>
  );
}

function Enemy({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 32,
        paddingBottom: 32,
        borderBottom: `1px solid ${VIOLET_BORDER}`,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(20px, 2.2vw, 26px)",
          color: LIME,
          margin: "0 0 14px",
          letterSpacing: "-0.005em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 1.4vw, 17px)",
          lineHeight: 1.7,
          color: "var(--ghost)",
          opacity: 0.92,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 05 — METODO M-V-A
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2MethodSection() {
  return (
    <section
      id="method"
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <SectionLabel>Il motivo per cui funziona.</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 28px",
              maxWidth: 760,
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Non è un corso.
            <br />
            È un <Accent>percorso in tre fasi</Accent>.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.9,
              maxWidth: 720,
              margin: "0 auto 56px",
            }}
          >
            Il metodo che insegniamo nel bootcamp si chiama <strong style={{ color: LIME }}>M-V-A</strong>.
            <br />
            Non è teoria. È il processo che usiamo per costruire sistemi AI nel nostro business &mdash; e che insegniamo perché è l&apos;unico che produce qualcosa che funziona ancora dopo sei mesi.
          </p>
        </div>

        {/* 3 cards M-V-A */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 56,
          }}
        >
          <PhaseCard
            letter="M"
            label="Manuale"
            body="Prima capisci il task. Completamente. Ogni passaggio, ogni decisione, ogni eccezione. Non puoi automatizzare quello che non sai spiegare ad alta voce. Questa fase è dove la maggior parte della formazione si ferma — e lascia lì le persone."
          />
          <PhaseCard
            letter="V"
            label="Validato"
            body="Costruisci il sistema. Lo testi. Lo rompi. Lo aggiusti. Esci con qualcosa che funziona con la tua voce, i tuoi standard, il tuo stile — non con output generici che sembrano scritti da un robot. Questa è la fase dove la fiducia nel sistema si costruisce davvero."
          />
          <PhaseCard
            letter="A"
            label="Automatizzato"
            body="Quando funziona sempre, lo deleghi. Completamente. Non ci pensi più. Non lo supervisi. Lavora per te mentre fai altro."
            highlight
          />
        </div>

        {/* Closing emphatic */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 24,
            borderTop: `1px solid ${VIOLET_BORDER}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(18px, 1.9vw, 22px)",
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "0 0 8px",
            }}
          >
            Le alternative ti portano a M. Qualche volta a V.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.4vw, 28px)",
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Il bootcamp ti porta ad <Accent>A</Accent>.
          </p>

          <p
            style={{
              marginTop: 36,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--muted)",
              opacity: 0.85,
              maxWidth: 560,
              marginInline: "auto",
              lineHeight: 1.6,
            }}
          >
            Il framework completo &mdash; come si costruisce ogni fase, come si testa, come si scala &mdash; è il cuore delle 7 sessioni. <span style={{ color: LIME }}>Nella call con Mattia vedi dove si applica al tuo caso specifico.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  letter,
  label,
  body,
  highlight,
}: {
  letter: string;
  label: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--deep-space)",
        border: `1px solid ${highlight ? LIME_BORDER_25 : "rgba(123,104,238,0.20)"}`,
        borderRadius: 16,
        padding: "28px 24px",
        position: "relative",
        boxShadow: highlight ? `0 0 0 1px ${LIME_BORDER_25}, 0 8px 32px rgba(181,240,58,0.08)` : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(48px, 5vw, 64px)",
            color: LIME,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {letter}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(20px, 2vw, 24px)",
            color: "#fff",
            letterSpacing: "-0.005em",
          }}
        >
          {label}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(14px, 1.3vw, 16px)",
          lineHeight: 1.65,
          color: "var(--ghost)",
          opacity: 0.88,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 06 — LA TRASFORMAZIONE
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2TransformationSection() {
  return (
    <section
      id="transformation"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <SectionLabel>Da dove parti. Dove arrivi.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 56px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Il prima.
          <br />
          Il <Accent>dopo</Accent>.
          <br />
          E i problemi che preferiresti avere.
        </h2>

        {/* IL PRIMA */}
        <div style={{ marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--muted)",
              opacity: 0.7,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 700,
            }}
          >
            IL PRIMA
          </p>
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--muted)",
              opacity: 0.7,
              margin: "0 0 24px",
            }}
          >
            (Alcune di queste suonano familiari.)
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.78,
            }}
          >
            {[
              "Usi l'AI quando ti viene in mente. Non hai un sistema — hai una raccolta di trucchi.",
              "Ogni volta che lo strumento si aggiorna, ricominci da capo.",
              "Non sai se quello che stai facendo è «il modo giusto» o se stai perdendo tempo.",
              "Hai la sensazione che ci sia molto di più — ma non sai come arrivarci da solo.",
              "Quando ti blocchi, non hai nessuno a cui chiedere.",
              "Se sei un manager o un imprenditore: sai che il team dovrebbe usare l'AI meglio, ma non sai da dove iniziare senza creare più caos di quello che risolvi.",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--hairline)" }}>
                <span aria-hidden style={{ color: "var(--muted)", flexShrink: 0 }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IL DOPO */}
        <div style={{ marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: LIME,
              opacity: 0.85,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 700,
            }}
          >
            IL DOPO
          </p>
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 14,
              color: LIME,
              opacity: 0.75,
              margin: "0 0 28px",
            }}
          >
            (Non è una lista di feature. È quello che succede.)
          </p>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.7,
              color: "var(--ghost)",
              opacity: 0.95,
            }}
          >
            <p style={{ margin: "0 0 18px" }}>
              Il lunedì mattina apri il laptop. Il sistema ha già preparato il briefing settimanale, organizzato le priorità, risposto alle email ricorrenti nel tuo tono. Tu prendi il caffè e inizi dal lavoro che conta.
            </p>
            <p style={{ margin: "0 0 18px" }}>
              Hai un progetto reale completato &mdash; non un esercizio. Un deliverable che usi davvero.
            </p>
            <p style={{ margin: "0 0 18px" }}>
              I tuoi clienti si chiedono come fai a consegnare così tanto in così poco tempo. Non te lo chiedono in modo generico &mdash; te lo chiedono con una punta di invidia.
            </p>
            <p style={{ margin: "0 0 18px" }}>
              Il tuo capo ti propone il ruolo di referente AI interno. Non l&apos;avevi chiesto &mdash; te lo chiedono loro.
            </p>
            <p style={{ margin: "0 0 18px" }}>
              I competitor ti chiedono se hai assunto persone nuove. No: hai costruito un sistema.
            </p>
            <p style={{ margin: 0 }}>
              Non dipendi più dal tool specifico. Se domani esce qualcosa di meglio, ci passi in un pomeriggio &mdash; perché hai un <Accent>metodo</Accent>, non una dipendenza.
            </p>
          </div>
        </div>

        {/* Problemi che preferiresti avere */}
        <div
          style={{
            paddingTop: 40,
            borderTop: `1px solid ${LIME_BORDER_25}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: LIME,
              margin: "0 0 28px",
              lineHeight: 1.3,
              letterSpacing: "0.005em",
            }}
          >
            E poi ci sono i problemi che preferiresti avere.
          </p>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.7,
              color: "var(--ghost)",
              opacity: 0.92,
            }}
          >
            <p style={{ margin: "0 0 14px" }}>
              Devi riorganizzare l&apos;agenda perché hai troppi clienti per le fasce orarie che avevi.
            </p>
            <p style={{ margin: "0 0 14px" }}>
              Il commercialista ti chiede come mai il fatturato di questo trimestre è il doppio dell&apos;anno scorso.
            </p>
            <p style={{ margin: "0 0 24px" }}>
              Il capo ti chiede se puoi formare anche il resto del team.
            </p>
            <p style={{ margin: 0, color: "#fff", fontWeight: 600 }}>
              Non sono problemi. Sono segnali che il sistema funziona.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 07 — LE 7 SESSIONI
// ═══════════════════════════════════════════════════════════════════════════════

const PROGRAM_SESSIONS: Array<{
  weeks: string;
  title: string;
  body: string;
  outcome: string;
}> = [
  {
    weeks: "Settimana 1–2",
    title: "Da consumatore ad architetto",
    body: "Costruisci il tuo sistema operativo AI. Definisci cosa delegare, cosa tenere, come strutturare il lavoro in modo che non dipenda da te ogni volta.",
    outcome: "la mappa del tuo workflow AI.",
  },
  {
    weeks: "Settimana 3–4",
    title: "Da domande a istruzioni",
    body: "Smetti di «chiedere» all'AI. Impara a guidarla con precisione — non come un utente, come un architetto che sa esattamente cosa vuole e come ottenerlo.",
    outcome: "il tuo manuale di istruzioni personalizzato.",
  },
  {
    weeks: "Settimana 5–6",
    title: "Da manuale ad automatico",
    body: "Costruisci strumenti che lavorano per te, nel tuo tono, con i tuoi standard. Questa è la sessione dove il sistema inizia a ridursi il lavoro in modo tangibile.",
    outcome: "le tue prime skill operative attive.",
  },
  {
    weeks: "Settimana 7–8",
    title: "Da task a progetti",
    body: "Qualsiasi progetto complesso, con un metodo. Non improvvisazione — architettura. Ogni progetto diventa ripetibile.",
    outcome: "il processo Plan & Solve applicato al tuo lavoro.",
  },
  {
    weeks: "Settimana 9–10",
    title: "Dal generico al tuo",
    body: "Workflow costruiti sul tuo lavoro reale, non su casi inventati da qualcun altro. La sessione più citata nelle edizioni precedenti come la più impattante — perché lavori sul tuo caso, con i tuoi dati, nel tuo settore.",
    outcome: "il sistema che usi il lunedì mattina dopo.",
  },
  {
    weeks: "Settimana 11–12",
    title: "Da rischio a protezione",
    body: "Privacy, sicurezza, governance. Tutto quello che serve per usare l'AI in modo professionale — non amatoriale. Senza questo, ogni sistema è un rischio.",
    outcome: "le linee guida per il tuo contesto specifico.",
  },
  {
    weeks: "Settimana 13",
    title: "Da partecipante a operatore",
    body: "Progetto finale reale + panoramica del futuro (Claude Code, Cursor, ecosistema). Non ti chiudiamo su un tool — ti diamo il metodo per aggiornarti da solo quando l'AI evolve.",
    outcome: "un deliverable completo e l'autonomia di non aver più bisogno di nessuno per tenerti aggiornato.",
  },
];

export function BootcampV2ProgramSection() {
  return (
    <section
      id="program"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <SectionLabel>13 settimane · 7 sessioni · 1 sistema</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 24px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Non impari <Accent>l&apos;AI</Accent>.
          <br />
          Costruisci il tuo sistema operativo.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.88,
            margin: "0 0 56px",
          }}
        >
          Il bootcamp non è 7 lezioni su come usare Claude. È 7 trasformazioni progressive &mdash; ognuna con un output concreto che porti fuori con te.
        </p>

        {/* 7 sessioni */}
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            counterReset: "session",
          }}
        >
          {PROGRAM_SESSIONS.map((s, i) => (
            <li
              key={s.weeks}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "clamp(16px, 3vw, 28px)",
                padding: "24px 0",
                borderBottom: i < PROGRAM_SESSIONS.length - 1 ? "1px solid var(--hairline)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  color: LIME,
                  opacity: 0.5,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  paddingTop: 4,
                  minWidth: 56,
                }}
              >
                0{i + 1}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--muted)",
                    opacity: 0.7,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: "0 0 6px",
                    fontWeight: 700,
                  }}
                >
                  {s.weeks}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    color: "#fff",
                    margin: "0 0 12px",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(15px, 1.4vw, 17px)",
                    lineHeight: 1.65,
                    color: "var(--ghost)",
                    opacity: 0.9,
                    margin: "0 0 14px",
                  }}
                >
                  {s.body}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-italic)",
                    fontStyle: "italic",
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    color: LIME,
                    margin: 0,
                  }}
                >
                  Esci con: <span style={{ color: "var(--ghost)", fontStyle: "normal" }}>{s.outcome}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Il formato */}
        <div
          style={{
            marginTop: 48,
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            padding: "32px clamp(20px, 4vw, 36px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: LIME,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 18px",
              fontWeight: 700,
            }}
          >
            Il formato
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.7,
              color: "var(--ghost)",
              opacity: 0.92,
            }}
          >
            <li style={{ padding: "8px 0", display: "flex", gap: 12 }}>
              <span aria-hidden style={{ color: LIME, flexShrink: 0 }}>·</span>
              <span><strong style={{ color: "#fff" }}>Bisettimanale</strong> &mdash; 1 settimana impari, 1 settimana applichi nel tuo lavoro reale.</span>
            </li>
            <li style={{ padding: "8px 0", display: "flex", gap: 12 }}>
              <span aria-hidden style={{ color: LIME, flexShrink: 0 }}>·</span>
              <span><strong style={{ color: "#fff" }}>2 ore ogni 2 settimane</strong>: non è tempo in più, è tempo investito nel tuo lavoro.</span>
            </li>
            <li style={{ padding: "8px 0", display: "flex", gap: 12 }}>
              <span aria-hidden style={{ color: LIME, flexShrink: 0 }}>·</span>
              <span><strong style={{ color: "#fff" }}>3h di lezioni preparatorie</strong> pre-registrate prima dell&apos;inizio.</span>
            </li>
            <li style={{ padding: "8px 0", display: "flex", gap: 12 }}>
              <span aria-hidden style={{ color: LIME, flexShrink: 0 }}>·</span>
              <span><strong style={{ color: "#fff" }}>Replay permanenti</strong> di ogni sessione.</span>
            </li>
            <li style={{ padding: "8px 0", display: "flex", gap: 12 }}>
              <span aria-hidden style={{ color: LIME, flexShrink: 0 }}>·</span>
              <span><strong style={{ color: "#fff" }}>Gruppo WhatsApp</strong> per tutta la durata + 30 giorni post.</span>
            </li>
          </ul>
          <p
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px dashed ${LIME_BORDER_25}`,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#fff",
              fontWeight: 600,
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            Durata totale: <span style={{ color: LIME }}>~13 settimane</span> · <span style={{ color: LIME }}>17h totali</span> · <span style={{ color: LIME }}>25 persone selezionate</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 08 — CHI INSEGNA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2FoundersSection() {
  return (
    <section
      id="founders"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <SectionLabel>Chi c&apos;è dall&apos;altra parte.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 28px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          I competitor mandano formatori.
          <br />
          <Accent>Noi</Accent> mandiamo i founder.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.9,
            margin: "0 0 48px",
          }}
        >
          <strong style={{ color: "#fff" }}>Matteo e Alex</strong> non sono esperti di AI. Sono imprenditori che l&apos;hanno usata per trasformare il loro business &mdash; e che ora insegnano quello che fanno ogni giorno, non quello che hanno letto su un manuale.
        </p>

        {/* Foto founder placeholder */}
        <div
          style={{
            marginBottom: 48,
            padding: "clamp(24px, 4vw, 40px)",
            border: `1px dashed ${LIME_BORDER_25}`,
            borderRadius: 16,
            background: VIOLET_SOFT,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            🔴 Placeholder foto
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ghost)", opacity: 0.7, margin: 0 }}>
            Inserire scatto professionale di Matteo e Alex (no stock, contesto lavorativo reale)
          </p>
        </div>

        {/* La storia che non ti aspetti */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.4vw, 28px)",
            color: "#fff",
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}
        >
          La storia che non ti aspetti.
        </h3>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            marginBottom: 32,
          }}
        >
          <p style={{ margin: "0 0 18px" }}>
            Quando Matteo ha iniziato con l&apos;AI, ha fatto esattamente quello che probabilmente stai facendo tu.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Ha provato decine di tool. Ha seguito tutorial. Ha costruito cose che non usava il giorno dopo. Ha perso mesi a ottimizzare workflow che non scalavano. Per un anno intero ha creduto di star costruendo qualcosa &mdash; e invece girava in cerchio senza saperlo.
          </p>
          <p style={{ margin: 0, color: "#fff", fontWeight: 600 }}>
            Il metodo M-V-A non è nato da un whiteboard. È nato da quegli errori.
          </p>
        </div>

        {/* Origin story specifica — placeholder Matt */}
        <div
          style={{
            padding: "20px 24px",
            borderLeft: `3px solid ${LIME}`,
            background: LIME_SOFT_10,
            borderRadius: 4,
            marginBottom: 32,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: LIME,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 700,
            }}
          >
            🔴 Da completare — Matt
          </p>
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              color: "var(--ghost)",
              opacity: 0.9,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Aggiungere qui un momento specifico e reale dal percorso personale con l&apos;AI &mdash; più concreto e personale, più efficace. Es. &laquo;C&apos;è stata una settimana di ottobre 2022 in cui ho buttato via 40 ore di lavoro perché avevo costruito un sistema su un tool che non esisteva più.&raquo; Il dettaglio specifico fa tutta la differenza.
          </p>
        </div>

        {/* Damaging admission */}
        <p
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 1.3vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            opacity: 0.85,
            margin: "0 0 56px",
          }}
        >
          (E per essere completamente trasparenti: ci guadagniamo da questo. Ovviamente. Ma il motivo per cui insegniamo in prima persona &mdash; senza delegare a formatori esterni &mdash; è che nessuno insegna questo come lo sappiamo insegnare noi. Perché viviamo quello che insegniamo, ogni giorno.)
        </p>

        {/* Perché i founder insegnano direttamente */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.4vw, 28px)",
            color: "#fff",
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}
        >
          Perché i founder insegnano direttamente.
        </h3>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            marginBottom: 56,
          }}
        >
          <p style={{ margin: "0 0 18px", color: "#fff", fontWeight: 600 }}>
            Non è marketing. È struttura.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Poche cohort all&apos;anno. 25 persone per cohort. Ogni sessione è live &mdash; non una slide deck pre-registrata. Gli esempi non sono &laquo;casi studio generici&raquo; &mdash; sono i progetti reali su cui stiamo lavorando mentre vi insegniamo.
          </p>
          <p style={{ margin: 0 }}>
            Se fossimo 200 persone, non funzionerebbe. A <strong style={{ color: LIME }}>25</strong>, funziona.
          </p>
        </div>

        {/* I numeri */}
        <div
          style={{
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            padding: "28px clamp(20px, 4vw, 36px)",
            marginBottom: 32,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: LIME,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 18px",
              fontWeight: 700,
            }}
          >
            I numeri
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
            }}
          >
            <NumberBlock value="2.000+" label="professionisti formati" />
            <NumberBlock value="dal 2021" label="utilizzo professionale AI" />
            <NumberBlock value="3ª" label="edizione del bootcamp" />
            <NumberBlock value="40+ → 25" label="cap ridotto per alzare qualità" />
          </div>
        </div>

        {/* Partner */}
        <div style={{ textAlign: "center" }}>
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
            Partner
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
      </div>
    </section>
  );
}

function NumberBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(24px, 2.6vw, 32px)",
          color: LIME,
          margin: "0 0 4px",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--ghost)",
          opacity: 0.8,
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 09 — RISULTATI
// ═══════════════════════════════════════════════════════════════════════════════

const TESTIMONIAL_PLACEHOLDERS: Array<{
  profile: string;
  name: string;
  role: string;
  quote: string;
  result: string;
}> = [
  {
    profile: "Freelance",
    name: "[Nome Cognome]",
    role: "[Ruolo · Settore]",
    quote: "[Quote 1-2 frasi specifica, concreta, con risultato misurabile. Non generica.]",
    result: "[outcome misurabile — es. risparmio 6 ore a settimana]",
  },
  {
    profile: "Dipendente",
    name: "[Nome Cognome]",
    role: "[Ruolo · Settore]",
    quote: "[Quote 1-2 frasi specifica, concreta, con risultato misurabile.]",
    result: "[outcome misurabile — es. promosso a referente AI interno]",
  },
  {
    profile: "Imprenditore",
    name: "[Nome Cognome]",
    role: "[Ruolo · Settore]",
    quote: "[Quote 1-2 frasi specifica, concreta, con risultato misurabile.]",
    result: "[outcome misurabile — es. team produce il doppio senza assumere]",
  },
];

export function BootcampV2ResultsSection() {
  return (
    <section
      id="results"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <SectionLabel>Quello che succede dopo.</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px 0 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            2.000+ professionisti formati.
            <br />
            <Accent>Nessuno</Accent> è tornato al vecchio modo di lavorare.
          </h2>
        </div>

        {/* Placeholder banner */}
        <div
          style={{
            marginBottom: 32,
            padding: "16px 20px",
            background: LIME_SOFT_10,
            border: `1px dashed ${LIME_BORDER_25}`,
            borderRadius: 8,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: LIME,
          }}
        >
          🔴 <strong>Placeholder testimonial</strong> — Matt inserirà 3-5 testimonial reali. Profili ideali: freelance · dipendente · imprenditore · consulente · content creator · azienda.
        </div>

        {/* Testimonial grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            marginBottom: 56,
          }}
        >
          {TESTIMONIAL_PLACEHOLDERS.map((t) => (
            <TestimonialCard key={t.profile} testimonial={t} />
          ))}
        </div>

        {/* I numeri */}
        <div
          style={{
            paddingTop: 32,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "clamp(16px, 4vw, 36px)",
            fontFamily: "var(--font-body)",
            color: "var(--ghost)",
          }}
        >
          <span>
            <strong style={{ color: LIME, fontFamily: "var(--font-display)", fontSize: 22, marginRight: 6 }}>2.000+</strong>
            persone formate
          </span>
          <span aria-hidden style={{ opacity: 0.4 }}>·</span>
          <span>
            <strong style={{ color: LIME, fontFamily: "var(--font-display)", fontSize: 22, marginRight: 6 }}>3ª</strong>
            edizione
          </span>
          <span aria-hidden style={{ opacity: 0.4 }}>·</span>
          <span>
            <strong style={{ color: LIME, fontFamily: "var(--font-display)", fontSize: 22, marginRight: 6 }}>40+</strong>
            partecipanti nelle cohort precedenti
          </span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: { profile: string; name: string; role: string; quote: string; result: string };
}) {
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${VIOLET_BORDER}`,
        borderRadius: 14,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "4px 10px",
          borderRadius: 100,
          background: LIME_SOFT_10,
          border: `1px solid ${LIME_BORDER_25}`,
          color: LIME,
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {testimonial.profile}
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 17,
            color: "#fff",
            margin: "0 0 2px",
            letterSpacing: "-0.005em",
          }}
        >
          {testimonial.name}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", opacity: 0.8, margin: 0 }}>
          {testimonial.role}
        </p>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.92,
          margin: 0,
          fontStyle: "italic",
        }}
      >
        &laquo;{testimonial.quote}&raquo;
      </p>
      <p
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontSize: 14,
          color: LIME,
          margin: 0,
          paddingTop: 8,
          borderTop: "1px solid var(--hairline)",
        }}
      >
        Risultato: <span style={{ color: "var(--ghost)", fontStyle: "normal" }}>{testimonial.result}</span>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — PER CHI È / PER CHI NON È
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2AudienceSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      id="audience"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Questo fa per te?</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Per chi è. Per chi <Accent>non è</Accent>.
          </h2>
        </div>

        {/* 2 colonne */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            marginBottom: 40,
          }}
        >
          {/* È per te se */}
          <div
            style={{
              background: "var(--dusk)",
              border: `1px solid ${LIME_BORDER_25}`,
              borderRadius: 16,
              padding: "28px clamp(20px, 3vw, 32px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: LIME,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 20px",
                fontWeight: 700,
              }}
            >
              È per te se
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.3vw, 16px)",
                lineHeight: 1.6,
                color: "var(--ghost)",
              }}
            >
              {[
                "Sei un freelance o professionista autonomo che vende il proprio tempo — e vuole smettere di essere il collo di bottiglia del proprio lavoro.",
                "Sei un imprenditore o manager che deve capire l'AI per prendere decisioni strategiche, non delegarle ciecamente.",
                "Sei un consulente o formatore che vuole aggiungere una competenza che può vendere ai clienti entro 3 mesi.",
                "Sei un content creator o marketer che produce ogni giorno e vuole un sistema che lavora nel suo stile, non output generici.",
                "Sei un solopreneur che non può permettersi un team — ma può costruirsi un sistema che funziona come uno.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--hairline)" }}>
                  <span aria-hidden style={{ color: LIME, flexShrink: 0, fontWeight: 700 }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non è per te se */}
          <div
            style={{
              background: "var(--dusk)",
              border: `1px solid ${VIOLET_BORDER}`,
              borderRadius: 16,
              padding: "28px clamp(20px, 3vw, 32px)",
              opacity: 0.92,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--muted)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 20px",
                fontWeight: 700,
              }}
            >
              Non è per te se
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.3vw, 16px)",
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.78,
              }}
            >
              {[
                "Cerchi una soluzione rapida senza impegno.",
                "Non hai un caso d'uso concreto su cui lavorare.",
                "Vuoi «capire l'AI in generale» senza applicarla a un problema specifico.",
                "Preferisci guardare piuttosto che costruire.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--hairline)" }}>
                  <span aria-hidden style={{ color: "var(--muted)", flexShrink: 0 }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: 13,
                color: "var(--muted)",
                opacity: 0.85,
                lineHeight: 1.5,
              }}
            >
              (Non è un giudizio &mdash; è rispetto per il tuo tempo e il nostro. Il bootcamp funziona solo se ci sei davvero.)
            </p>
          </div>
        </div>

        {/* Il profilo comune */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.65,
            color: "var(--ghost)",
            margin: "0 auto 56px",
            maxWidth: 760,
            textAlign: "center",
            opacity: 0.95,
          }}
        >
          <strong style={{ color: "#fff" }}>Il profilo comune:</strong> sai già che l&apos;AI può fare di più. Vuoi costruire qualcosa, non solo usare uno strumento. Hai 2 ore ogni 2 settimane da investire &mdash; integrate nel lavoro reale.
        </p>

        {/* Non sei sicuro? */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 32,
            borderTop: `1px solid ${LIME_BORDER_25}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(20px, 2.2vw, 26px)",
              color: "#fff",
              margin: "0 0 12px",
              letterSpacing: "-0.005em",
            }}
          >
            Non sei sicuro?
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.6,
              color: "var(--ghost)",
              opacity: 0.9,
              maxWidth: 640,
              margin: "0 auto 32px",
            }}
          >
            La call con Mattia serve esattamente a questo. Non devi sapere se sei pronto &mdash; devi solo essere onesto su dove sei. Il resto lo valuta lui.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <PrimaryButton size="lg" href={callHref(pricing)} onClick={() => onCtaClick("audience")}>
              Prenota la call di selezione →
            </PrimaryButton>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--muted)",
                opacity: 0.75,
                margin: 0,
              }}
            >
              25 posti · Call gratuita · Zero impegno fino alla decisione
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10b — PER LE AZIENDE
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2B2BSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      id="b2b"
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionLabel>Sei un&apos;azienda?</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 32px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Non stai comprando formazione.
          <br />
          Stai comprando un <Accent>moltiplicatore interno</Accent>.
        </h2>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            marginBottom: 48,
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            Hai una persona in azienda che dovrebbe essere il punto di riferimento sull&apos;AI.
          </p>
          <p style={{ margin: "0 0 16px", color: "#fff", fontWeight: 600 }}>
            Il bootcamp la trasforma in questo. In 3 mesi.
          </p>
          <p style={{ margin: 0 }}>
            Torna con un sistema operativo AI costruito sul vostro workflow, la capacità di formare gradualmente i colleghi, e la competenza per valutare ogni proposta AI che vi arriva &mdash; e dire no a quelle inutili.
          </p>
        </div>

        {/* Tabella ROI */}
        <div
          style={{
            background: "var(--deep-space)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          <RoiRow label="Investimento bootcamp" value="1.500 EUR (deducibile)" />
          <RoiRow
            label="Risparmio diretto sulla persona (5h/sett × 50 EUR/h × 52 settimane)"
            value="13.000 EUR/anno"
            highlight
          />
          <RoiRow
            label="Effetto moltiplicatore (forma 2 colleghi al 30%)"
            value="+8.000–12.000 EUR/anno"
          />
          <RoiRow label="ROI anno 1 solo sulla persona" value="8.7x" highlight />
          <RoiRow label="ROI anno 1 con cascata interna" value="14–17x" highlight />
          <RoiRow
            label="Confronto: 2 giornate consulente AI esterno"
            value="4.000–10.000 EUR · zero competenza trasferita"
          />
          <RoiRow label="Costo netto dopo deducibilità (24%)" value="~1.140 EUR" highlight />
        </div>

        {/* Closing */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "#fff",
              margin: "0 0 24px",
              lineHeight: 1.3,
              letterSpacing: "-0.005em",
            }}
          >
            Per <Accent>1.140 euro netti</Accent> hai un referente AI interno. Per sempre.
          </p>
          <PrimaryButton size="lg" href={callHref(pricing)} onClick={() => onCtaClick("b2b")}>
            Parla con Mattia — call riservata aziende →
          </PrimaryButton>
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--muted)",
              opacity: 0.7,
              fontStyle: "italic",
            }}
          >
            🔴 URL Calendly versione aziende da definire (se diverso dal principale)
          </p>
        </div>
      </div>
    </section>
  );
}

function RoiRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 20,
        padding: "16px 24px",
        borderBottom: "1px solid var(--hairline)",
        alignItems: "center",
        background: highlight ? LIME_SOFT_10 : "transparent",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(13px, 1.3vw, 15px)",
          color: "var(--ghost)",
          opacity: 0.92,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(15px, 1.5vw, 17px)",
          color: highlight ? LIME : "#fff",
          textAlign: "right",
          letterSpacing: "-0.005em",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — PENSA SE... (NUOVO)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2PensaSeSection() {
  return (
    <section
      id="pensa-se"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Tre mesi da adesso.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(48px, 7vw, 88px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: LIME,
            margin: "24px 0 32px",
          }}
        >
          Pensa se.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: "0 0 64px",
            fontStyle: "italic",
          }}
        >
          Non è fantasia. È quello che ci descrivono le persone che escono dal bootcamp.
        </p>

        {/* Cluster 1 — Carriera */}
        <PensaSeCluster>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se la prossima valutazione dice: <Accent>indispensabile.</Accent>
          </p>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se il tuo capo ti propone il ruolo di referente AI interno. Non l&apos;avevi chiesto &mdash; te lo chiedono loro.
          </p>
          <p style={{ margin: 0 }}>
            Pensa se sei la persona a cui tutti chiedono &laquo;come fai?&raquo; Non perché lo spieghi &mdash; perché i risultati si vedono.
          </p>
        </PensaSeCluster>

        {/* Cluster 2 — Freelance */}
        <PensaSeCluster>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se quel cliente che ti ha scritto giovedì lo prendi. Perché adesso hai le ore.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se gestisci otto clienti invece di cinque &mdash; senza lavorare un&apos;ora in più.
          </p>
          <p style={{ margin: 0 }}>
            Pensa se il tuo sistema porta tre richieste di preventivo mentre dormi.
          </p>
        </PensaSeCluster>

        {/* Cluster 3 — Imprenditore */}
        <PensaSeCluster>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se i competitor ti chiedono se hai assunto qualcuno.
          </p>
          <p style={{ margin: "0 0 14px" }}>
            Pensa se il tuo team di dieci produce come uno da quaranta.
          </p>
          <p style={{ margin: 0 }}>
            Pensa se il prossimo trimestre fatturi il doppio &mdash; e l&apos;unica cosa che è cambiata è il sistema.
          </p>
        </PensaSeCluster>

        {/* Closing statement */}
        <p
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: `1px solid ${LIME_BORDER_25}`,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(20px, 2.2vw, 26px)",
            color: "#fff",
            letterSpacing: "-0.005em",
            lineHeight: 1.4,
          }}
        >
          Tre mesi. Un bootcamp. <span style={{ color: LIME }}>Venticinque persone selezionate come te.</span>
        </p>
      </div>
    </section>
  );
}

function PensaSeCluster({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 36,
        padding: "24px 0",
        fontFamily: "var(--font-body)",
        fontSize: "clamp(16px, 1.5vw, 18px)",
        lineHeight: 1.65,
        color: "var(--ghost)",
        opacity: 0.95,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — LA SCELTA (NUOVO)
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2LaSceltaSection() {
  return (
    <section
      id="la-scelta"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Adesso sai.</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Hai due strade.
            <br />
            <Accent>Nessuna delle due</Accent> è gratis.
          </h2>
        </div>

        {/* 2 strade */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 56,
          }}
        >
          {/* Strada uno */}
          <div
            style={{
              background: "rgba(11,11,12,0.6)",
              border: "1px solid var(--hairline)",
              borderRadius: 16,
              padding: "32px clamp(24px, 4vw, 36px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--muted)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 8px",
                fontWeight: 700,
              }}
            >
              Strada uno
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                color: "#fff",
                margin: "0 0 20px",
                letterSpacing: "-0.005em",
              }}
            >
              Continui come fai adesso.
            </h3>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.65,
                color: "var(--ghost)",
                opacity: 0.85,
              }}
            >
              <p style={{ margin: "0 0 16px" }}>
                Funziona, certo. L&apos;AI la usi, hai imparato come si usa, ottieni risultati decenti.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Ma il gap tra chi usa l&apos;AI e chi ha un sistema si allarga ogni mese. Tra 12 mesi, chi ha costruito un sistema sarà stato promosso, avrà preso più clienti, avrà scalato senza assumere nessuno. Chi non ha un sistema sarà ancora lì &mdash; più veloce, forse, ma ancora lui il collo di bottiglia di tutto.
              </p>
              <p
                style={{
                  margin: 0,
                  paddingTop: 16,
                  borderTop: "1px solid var(--hairline)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Ogni mese che aspetti: oltre 1.000 euro di opportunità non colte.
              </p>
            </div>
          </div>

          {/* Strada due */}
          <div
            style={{
              background: "var(--dusk)",
              border: `1px solid ${LIME}`,
              borderRadius: 16,
              padding: "32px clamp(24px, 4vw, 36px)",
              boxShadow: `0 0 0 1px ${LIME_BORDER_25}, 0 12px 40px rgba(181,240,58,0.10)`,
              position: "relative",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: LIME,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 8px",
                fontWeight: 700,
              }}
            >
              Strada due
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                color: "#fff",
                margin: "0 0 20px",
                letterSpacing: "-0.005em",
              }}
            >
              Costruisci il sistema.
            </h3>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.65,
                color: "var(--ghost)",
                opacity: 0.95,
              }}
            >
              <p style={{ margin: "0 0 16px", color: "#fff" }}>
                3 mesi. 7 sessioni. <strong style={{ color: LIME }}>25 persone selezionate</strong>. I founder con te.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Alla fine hai un sistema operativo AI costruito sul tuo lavoro. Non una competenza astratta &mdash; qualcosa che usi il lunedì mattina dopo.
              </p>
              <p
                style={{
                  margin: 0,
                  paddingTop: 16,
                  borderTop: `1px solid ${LIME_BORDER_25}`,
                  color: LIME,
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                Non si torna indietro.
              </p>
            </div>
          </div>
        </div>

        {/* Il costo reale */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 32,
            paddingBottom: 32,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            borderBottom: `1px solid ${VIOLET_BORDER}`,
            marginBottom: 32,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--muted)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 24px",
              fontWeight: 700,
            }}
          >
            Il costo reale
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              color: "#fff",
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            <p style={{ margin: 0 }}>
              Il bootcamp è <span style={{ color: LIME }}>1.500 euro</span>.
            </p>
            <p style={{ margin: 0 }}>
              Il costo di non farlo è <span style={{ color: LIME }}>13.000 euro all&apos;anno</span>.
            </p>
          </div>
        </div>

        {/* Closing emotional */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          E il costo vero non sono solo i soldi. È la carriera che non accelera. I clienti che non prendi. Il sistema che non costruisci. <span style={{ color: "#fff", fontWeight: 600 }}>Il vantaggio che qualcun altro sta costruendo adesso mentre aspetti.</span>
        </p>

        {/* Bridge */}
        <p
          style={{
            marginTop: 56,
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.5vw, 18px)",
            color: LIME,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Se hai scelto la strada due — ecco cosa ricevi.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — L'OFFERTA COMPLETA
// ═══════════════════════════════════════════════════════════════════════════════

const OFFER_STACK: Array<{ label: string; value: string }> = [
  { label: "Accesso a Claude Unlocked (10 moduli, ~48 lezioni, ~4-5h)", value: "197 EUR" },
  { label: "3h di lezioni preparatorie pre-registrate", value: "297 EUR" },
  { label: "7 sessioni live da 2h con i founder (14h totali)", value: "3.500 EUR" },
  { label: "Replay permanenti di tutte le sessioni", value: "697 EUR" },
  { label: "Gruppo WhatsApp — durata bootcamp + 30 giorni post", value: "497 EUR" },
  { label: "Progetto finale guidato — deliverable reale, non esercizio", value: "997 EUR" },
  { label: "Template library + pacchetto skill e plugin bonus", value: "497 EUR" },
  { label: "Accesso anticipato a nuove skill e aggiornamenti post-bootcamp", value: "424 EUR" },
  { label: "Certificato di completamento Morfeus", value: "297 EUR" },
  { label: "Framework M-V-A completo — IP Morfeus", value: "1.497 EUR" },
];

export function BootcampV2OfferSection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      id="offer"
      style={{
        background: "var(--deep-space)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Quello che ottieni.</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "20px auto 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            Il valore. Il <Accent>prezzo</Accent>.
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.9,
            margin: "0 0 32px",
            textAlign: "center",
          }}
        >
          Ecco cosa è incluso nel bootcamp.
        </p>

        {/* Stack table */}
        <div
          style={{
            background: "var(--dusk)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          {OFFER_STACK.map((row) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 20,
                padding: "14px 24px",
                borderBottom: "1px solid var(--hairline)",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 1.3vw, 15px)",
                  color: "var(--ghost)",
                  opacity: 0.92,
                  lineHeight: 1.45,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  color: "var(--ghost)",
                  textAlign: "right",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 20,
              padding: "20px 24px",
              alignItems: "center",
              background: LIME_SOFT_18,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(16px, 1.6vw, 18px)",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Valore totale
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                color: LIME,
                textAlign: "right",
                letterSpacing: "-0.01em",
              }}
            >
              {pricing.stackValue.toLocaleString("it-IT")} EUR
            </span>
          </div>
        </div>

        {/* Price reveal */}
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            background: "var(--night)",
            border: `1px solid ${LIME}`,
            borderRadius: 16,
            marginBottom: 32,
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--muted)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 12px",
              fontWeight: 700,
            }}
          >
            Il tuo investimento
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(48px, 8vw, 80px)",
              color: LIME,
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {pricing.currentPrice.toLocaleString("it-IT")} EUR
          </p>
          <p
            style={{
              marginTop: 14,
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 13,
              color: "var(--muted)",
              opacity: 0.85,
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            (Hai già acquistato il corso base? Il suo valore viene scalato dal prezzo del bootcamp. Non paghi due volte.)
          </p>
        </div>

        {/* Per confronto */}
        <div style={{ marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(20px, 2.2vw, 26px)",
              color: "#fff",
              margin: "0 0 24px",
              textAlign: "center",
              letterSpacing: "-0.005em",
            }}
          >
            Per confronto.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            <CompareCard
              label="Consulente AI a giornata"
              body="2.000–5.000 EUR per una giornata. Zero competenza trasferita, zero follow-up, zero sistema costruito."
            />
            <CompareCard
              label="Trial and error da autodidatta"
              body="150–300 ore per lo stesso livello. A 25 EUR/h: fino a 7.500 EUR di tempo — senza nessuno che ti dica «stai sbagliando»."
            />
            <CompareCard
              label="Dipendente entry-level"
              body="25.000–35.000 EUR/anno. Claude Pro + bootcamp: 1.716 EUR totali."
            />
          </div>
          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: LIME,
              fontWeight: 600,
            }}
          >
            Il bootcamp si ripaga in 6 settimane di applicazione.
          </p>
        </div>

        {/* Perché 1.500 EUR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "var(--dusk)",
              border: "1px solid var(--hairline)",
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: LIME,
                margin: "0 0 10px",
                letterSpacing: "-0.005em",
              }}
            >
              Perché 1.500 EUR e non di più?
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.88,
                margin: 0,
              }}
            >
              Il range di mercato per bootcamp equivalenti è 3.000-5.000 EUR. Teniamo il prezzo accessibile perché la missione è portare la competenza AI ai professionisti italiani &mdash; non solo a chi ha già un budget grande.
            </p>
          </div>
          <div
            style={{
              background: "var(--dusk)",
              border: "1px solid var(--hairline)",
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: LIME,
                margin: "0 0 10px",
                letterSpacing: "-0.005em",
              }}
            >
              Perché non meno?
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--ghost)",
                opacity: 0.88,
                margin: 0,
              }}
            >
              Non è un corso. È 3 mesi con i founder, 25 posti selezionati, un progetto reale. Il prezzo riflette la profondità.
            </p>
          </div>
        </div>

        {/* Add-on + Early bird */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 40,
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: "var(--ghost)",
            opacity: 0.9,
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            Add-on opzionale &mdash; Consulenza 1-on-1 con Mattia post-bootcamp: <strong style={{ color: LIME, fontStyle: "normal" }}>300 EUR</strong>.
          </p>
          <p style={{ margin: 0 }}>
            Early bird (solo 48h post-webinar): <strong style={{ color: LIME, fontStyle: "normal" }}>{pricing.earlyBirdPrice.toLocaleString("it-IT")} EUR</strong> &mdash; risparmio di {(pricing.currentPrice - pricing.earlyBirdPrice).toLocaleString("it-IT")} EUR.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("offer")}>
            Prenota la call di selezione →
          </PrimaryButton>
          <p
            style={{
              marginTop: 14,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--muted)",
              opacity: 0.75,
            }}
          >
            25 posti · 1 sola classe · La prossima cohort non ha data certa
          </p>
        </div>
      </div>
    </section>
  );
}

function CompareCard({ label, body }: { label: string; body: string }) {
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: "1px solid var(--hairline)",
        borderRadius: 12,
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 15,
          color: "#fff",
          margin: "0 0 10px",
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--ghost)",
          opacity: 0.85,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 14 — GARANZIA
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2GuaranteeSection() {
  return (
    <section
      id="guarantee"
      style={{
        background: "var(--dusk)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionLabel>Il rischio è nostro.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 32px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          La vera garanzia
          <br />
          è che <Accent>non ti facciamo entrare</Accent> se non sei pronto.
        </h2>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            marginBottom: 40,
          }}
        >
          <p style={{ margin: "0 0 18px", color: "#fff", fontWeight: 600 }}>
            La call di selezione non è una formalità. È la garanzia principale.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Mattia valuta tre cose: <strong style={{ color: LIME }}>motivazione</strong>, <strong style={{ color: LIME }}>caso d&apos;uso reale</strong>, <strong style={{ color: LIME }}>disponibilità di tempo</strong>. Se uno dei tre manca, ti indirizza altrove. Non per farti un torto &mdash; per non farti sprecare né il tuo tempo né i tuoi soldi.
          </p>
          <p style={{ margin: 0 }}>
            In ogni cohort precedente abbiamo rifiutato persone che volevano pagare. Perché un partecipante non adatto non è un guadagno &mdash; è un errore che paga tutto il gruppo.
          </p>
        </div>

        {/* Garanzia di trasferimento */}
        <div
          style={{
            background: "var(--deep-space)",
            border: `1px solid ${LIME_BORDER_25}`,
            borderRadius: 14,
            padding: "24px clamp(20px, 3vw, 32px)",
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: LIME,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 12px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span aria-hidden style={{ fontSize: 16 }}>🛡</span>
            Se entri e non riesci a completare
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.95,
              margin: "0 0 12px",
            }}
          >
            <strong style={{ color: "#fff" }}>Garanzia di trasferimento</strong> &mdash; ti spostiamo alla prossima cohort, senza costi aggiuntivi.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.95,
              margin: 0,
            }}
          >
            I replay restano per sempre. Non c&apos;è una finestra che scade.
          </p>
        </div>

        {/* Closing statement */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(20px, 2.4vw, 28px)",
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.3,
            letterSpacing: "-0.005em",
            margin: 0,
          }}
        >
          A questo punto, l&apos;unico rischio reale è <Accent>non provarci</Accent>.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 15 — FAQ
// ═══════════════════════════════════════════════════════════════════════════════

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "«1.500 euro sono troppi.»",
    a: "L'investimento è significativo — hai ragione a pensarci bene. Facciamo il calcolo: se risparmi 5 ore a settimana (stima conservativa), a 25 EUR/h sono 5.750 EUR/anno. Il bootcamp si ripaga in meno di 3 mesi — e il risparmio continua ogni anno. Se sei freelance a 50 EUR/h: 13.000 EUR/anno di valore recuperato. Il numero cambia, il principio no. Nella call con Mattia puoi fare il calcolo sulla tua situazione specifica.",
  },
  {
    q: "«Non ho tempo per 3 mesi.»",
    a: "Il bootcamp è 2 ore ogni 2 settimane. Non è tempo in più — è tempo investito nel tuo lavoro. L'homework non è «studia questa cosa extra»: è «applica nel tuo lavoro reale quello che abbiamo visto insieme». Tutte le persone delle edizioni precedenti lavoravano full-time. Nessuno ha trovato il formato incompatibile. E se perdi una sessione, il replay è permanente.",
  },
  {
    q: "«Posso imparare da solo.»",
    a: "Puoi. La domanda è: quanto tempo ti serve? 6-12 mesi, 150-300 ore di trial and error, per arrivare allo stesso livello — senza nessuno che ti dice «stai sbagliando». A 25 EUR/h: fino a 7.500 EUR di tempo investito. Il bootcamp ti porta lì in 17 ore strutturate. La frase più comune di chi finisce: «Se avessi fatto questo 6 mesi fa avrei risparmiato centinaia di ore.»",
  },
  {
    q: "«Ho già fatto un corso AI — cosa c'è di diverso?»",
    a: "Se hai fatto un corso e il lunedì dopo lavoravi esattamente come prima, il tuo scetticismo è giustificato. La differenza non è il contenuto — è il formato. Un corso ti dà informazioni. Il bootcamp ti dà trasformazione: sessioni live, feedback in tempo reale, un progetto sul tuo lavoro reale, un gruppo di 25 persone selezionate. Hai costruito qualcosa con quel corso che usi ancora oggi? Se la risposta è no, non era colpa tua — era il formato.",
  },
  {
    q: "«La call di selezione sembra una tattica di vendita.»",
    a: "Capisco. Molte «call gratuite» sono sales call aggressive. Questa no. La call esiste perché con 25 posti e 3 mesi di lavoro insieme, un partecipante non motivato rallenta tutti. Mattia valuta motivazione, caso d'uso reale, e disponibilità di tempo. Non ti vende nulla — ti qualifica. Nelle edizioni precedenti abbiamo rifiutato persone che volevano pagare. Se dopo la call senti pressione, semplicemente non compri. Nessun impegno.",
  },
  {
    q: "«L'AI cambia troppo velocemente — tra 3 mesi è tutto diverso.»",
    a: "Se il bootcamp ti insegnasse un tool, avresti ragione. Il bootcamp insegna il metodo — come pensare, come strutturare, come costruire sistemi. Il metodo non diventa obsoleto. Usiamo l'AI dal 2021: i tool sono cambiati cinque volte, il metodo funziona ancora. E i replay sono permanenti — il bootcamp non scade.",
  },
  {
    q: "«Il corso base mi basta.»",
    a: "Se il tuo obiettivo è usare meglio l'AI, la formazione base basta. La differenza è tra sapere e saper fare. La formazione ti dà la conoscenza. Il bootcamp ti dà la competenza — quella si costruisce solo facendo, con feedback, con qualcuno che ti dice «non così, fai così». È la differenza tra leggere un libro di cucina e cucinare per 3 mesi con uno chef. Il libro ti dà le ricette. Lo chef ti dà il palato.",
  },
  {
    q: "«Perché Claude e non ChatGPT?»",
    a: "Il 60-70% del metodo è agnostico — funziona con qualsiasi AI. Claude è lo strumento che usiamo noi, dopo averli provati tutti dal 2021. Projects, CoWork, Skill, Connettori — per il lavoro professionale strutturato non hanno equivalenti. Non te lo insegniamo perché ci pagano — te lo insegniamo perché è quello che usiamo ogni giorno. E nella sessione 7 c'è una panoramica dell'intero ecosistema futuro: non ti chiudiamo su un tool, ti diamo il metodo per valutare qualsiasi nuovo strumento.",
  },
];

export function BootcampV2FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="faq"
      style={{
        background: "var(--night)",
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionLabel>Le domande che stai facendo.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "20px 0 56px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Domande. <Accent>Risposte vere.</Accent>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--dusk)",
        border: `1px solid ${isOpen ? LIME_BORDER_25 : "var(--hairline)"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color .2s",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(15px, 1.5vw, 17px)",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          letterSpacing: "-0.005em",
        }}
      >
        <span>{question}</span>
        <span
          aria-hidden
          style={{
            color: LIME,
            fontSize: 20,
            fontWeight: 400,
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
            transition: "transform .2s",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "0 24px 22px",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.3vw, 16px)",
            lineHeight: 1.7,
            color: "var(--ghost)",
            opacity: 0.92,
            animation: "reveal-in .25s ease both",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 16 — CTA FINALE
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2FinalCTASection({ step }: SectionProps) {
  const pricing = readPricing(step);
  return (
    <section
      id="final-cta"
      style={{
        background: "linear-gradient(180deg, var(--deep-space) 0%, var(--night) 100%)",
        padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 32px) clamp(60px, 8vw, 80px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          width: "min(900px, 90vw)",
          height: 460,
          background: `radial-gradient(ellipse, ${LIME_SOFT_18} 0%, rgba(123,104,238,0.06) 40%, transparent 70%)`,
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        <SectionLabel>Hai visto tutto.</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(40px, 6.4vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "20px 0 36px",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Adesso <Accent>decidi</Accent>.
        </h2>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.95,
            marginBottom: 36,
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            In 3 mesi hai un sistema operativo AI costruito sul tuo lavoro.
          </p>
          <p style={{ margin: "0 0 8px" }}>
            Costruito con te, dai founder.
          </p>
          <p style={{ margin: 0 }}>
            Con <strong style={{ color: LIME }}>24 professionisti selezionati</strong> come te.
          </p>
        </div>

        <div
          style={{
            paddingTop: 28,
            paddingBottom: 28,
            borderTop: `1px solid ${VIOLET_BORDER}`,
            borderBottom: `1px solid ${VIOLET_BORDER}`,
            marginBottom: 40,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(17px, 1.7vw, 20px)",
            lineHeight: 1.5,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          <p style={{ margin: "0 0 6px" }}>
            Il prezzo è <span style={{ color: LIME, fontWeight: 700 }}>{pricing.currentPrice.toLocaleString("it-IT")} euro</span>.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            Il costo di non farlo è <span style={{ color: LIME, fontWeight: 700 }}>13.000 euro all&apos;anno</span>.
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontSize: "0.95em" }}>
            E il gap si allarga ogni mese.
          </p>
        </div>

        {/* CTA primaria */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <PrimaryButton size="xl" href={callHref(pricing)} pulse onClick={() => onCtaClick("final-cta")}>
            Prenota la call di selezione →
          </PrimaryButton>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: LIME,
              opacity: 0.85,
              margin: "0 0 4px",
              fontStyle: "italic",
            }}
          >
            25 posti · Call gratuita · Zero impegno fino alla decisione
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--muted)",
              opacity: 0.75,
              margin: 0,
              maxWidth: 480,
            }}
          >
            La prossima cohort inizia a giugno. I 25 posti si stanno riempiendo.
          </p>
        </div>

        {/* CTA aziende secondaria */}
        <div
          style={{
            paddingTop: 36,
            borderTop: "1px solid var(--hairline)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: 0,
            }}
          >
            Sei un&apos;azienda? Mattia può parlare con il tuo responsabile.
          </p>
          <OutlineButton href={callHref(pricing)} onClick={() => onCtaClick("final-cta-b2b")}>
            Manda la tua persona chiave — parla con Mattia
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2FooterSection() {
  return (
    <footer
      style={{
        background: "var(--night)",
        padding: "clamp(40px, 6vw, 60px) clamp(20px, 5vw, 32px) clamp(28px, 4vw, 36px)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--muted)",
        }}
      >
        <div>
          <Image src="/logo/m-w2.png" alt="Morfeus" width={100} height={14} style={{ height: 14, width: "auto", display: "block", opacity: 0.7 }} />
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="/it/privacy" style={{ color: "var(--muted)", textDecoration: "none" }}>Privacy</a>
          <a href="/it/cookies" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookie</a>
          <span>P.IVA 12345678901</span>
        </div>
      </div>
      <p
        style={{
          maxWidth: 1120,
          margin: "16px auto 0",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: "var(--muted)",
          opacity: 0.5,
          textAlign: "center",
        }}
      >
        © Morfeus Hub. Bootcamp AI Champion — Terza Edizione.
      </p>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — STICKY BAR
// ═══════════════════════════════════════════════════════════════════════════════

export function BootcampV2StickyBarSection({ step }: SectionProps) {
  const [visible, setVisible] = useState(false);
  const pricing = readPricing(step);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(11,11,12,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${LIME_BORDER_25}`,
        padding: "12px clamp(16px, 4vw, 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ghost)" }}>
        <strong style={{ color: LIME }}>25 posti</strong> · 3a edizione · accesso via call di selezione
      </div>
      <PrimaryButton href={callHref(pricing)} onClick={() => onCtaClick("sticky")} size="md">
        Prenota la call →
      </PrimaryButton>
    </div>
  );
}
