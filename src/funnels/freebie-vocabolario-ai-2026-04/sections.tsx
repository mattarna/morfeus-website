"use client";

/**
 * Vocabolario AI + Claude: pagina freebie pubblica.
 *
 * Singola sezione gigante (`VocabolarioPage`) per evitare di dover passare
 * lo stato del modal tra sezioni separate del sistema funnel.
 *
 * Design system condiviso col funnel webinar-claude-2026-05 (palette arancione,
 * gradienti, tipografia Clash Display + Satoshi). Riusa `OptinFormTwoStep`
 * dal webinar funnel: il submit hits `/api/funnels/webinar-claude/optin` e
 * redirige a `/webinar-claude/thank-you`.
 */

import {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OptinFormTwoStep } from "@/funnels/webinar-claude-2026-05/sections";
import {
  AI_TERMS,
  CLAUDE_OPS,
  CLAUDE_PRODUCTS,
  NAV_ITEMS,
  USE_CASE_GROUPS,
  type VocabTerm,
} from "@/funnels/freebie-vocabolario-ai-2026-04/data";

// ─── SECTION COLOR MAP ──────────────────────────────────────────────────────
//
// Ogni sezione ha un suo accent colore: usato per heading, hover border delle
// card, dot del badge, chip TOC attivo, sidebar item attivo, glow anchor.
// I CTA principali restano sempre arancione per evitare ambiguità su "dove
// cliccare per il webinar".

interface SectionAccent {
  /** CSS color value (var(--...) o hex) */
  color: string;
  /** Background "tint" rgba con bassa opacità per chip + bordi soft */
  tint: string;
  /** Bordo rgba a media opacità */
  border: string;
  /** Glow box-shadow per anchor highlight */
  glow: string;
}

const SECTION_ACCENT: Record<string, SectionAccent> = {
  "vocab-ai": {
    color: "var(--orange)",
    tint: "rgba(235,122,46,0.10)",
    border: "rgba(235,122,46,0.30)",
    glow: "0 0 0 3px rgba(235,122,46,0.45), 0 0 32px rgba(235,122,46,0.35)",
  },
  "vocab-claude-products": {
    color: "var(--violet)",
    tint: "rgba(123,104,238,0.10)",
    border: "rgba(123,104,238,0.32)",
    glow: "0 0 0 3px rgba(123,104,238,0.45), 0 0 32px rgba(123,104,238,0.35)",
  },
  "vocab-claude-ops": {
    color: "#5EE3FF",
    tint: "rgba(94,227,255,0.10)",
    border: "rgba(94,227,255,0.32)",
    glow: "0 0 0 3px rgba(94,227,255,0.45), 0 0 32px rgba(94,227,255,0.35)",
  },
  "vocab-use-cases": {
    color: "var(--lime)",
    tint: "rgba(181,240,58,0.10)",
    border: "rgba(181,240,58,0.32)",
    glow: "0 0 0 3px rgba(181,240,58,0.45), 0 0 32px rgba(181,240,58,0.35)",
  },
};

const DEFAULT_ACCENT: SectionAccent = SECTION_ACCENT["vocab-ai"];

// Mappa anchor id → sezione di appartenenza per il glow on landing
function accentForAnchorId(anchorId: string): SectionAccent {
  if (anchorId.startsWith("term-ai-")) return SECTION_ACCENT["vocab-ai"];
  if (anchorId.startsWith("term-products-")) return SECTION_ACCENT["vocab-claude-products"];
  if (anchorId.startsWith("term-ops-")) return SECTION_ACCENT["vocab-claude-ops"];
  if (anchorId.startsWith("uc-")) return SECTION_ACCENT["vocab-use-cases"];
  return DEFAULT_ACCENT;
}

// ─── GA4 PUSH HELPER ─────────────────────────────────────────────────────────

function gaPush(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.dataLayer) w.dataLayer.push({ event, ...payload });
}

// ─── SEARCH FILTER ───────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function termMatches(t: VocabTerm, q: string): boolean {
  if (!q) return true;
  const tokens = normalize(q).split(/\s+/).filter(Boolean);
  const haystack = normalize(
    [t.term, t.body, ...(t.keywords ?? [])].join(" ")
  );
  return tokens.every((tk) => haystack.includes(tk));
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function VocabolarioModal({
  open,
  onClose,
  source,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
}) {
  // Lock body scroll while modal is open + ESC to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Iscriviti al webinar"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(11, 11, 12, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "min(8vh, 64px) 16px 24px",
        overflowY: "auto",
        animation: "vocabFadeIn .25s ease",
      }}
    >
      <style>{`
        @keyframes vocabFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes vocabSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          background:
            "linear-gradient(180deg, rgba(26, 21, 53, 0.95) 0%, rgba(15, 14, 26, 0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 20,
          padding: "32px 28px 28px",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,104,238,0.08)",
          animation: "vocabSlideUp .35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--ghost)",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .2s, transform .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: 20, paddingRight: 32 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontWeight: 700,
              marginBottom: 10,
              fontFamily: "var(--font-body)",
            }}
          >
            Webinar gratuito · 5 maggio 2026
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(22px, 3.6vw, 28px)",
              lineHeight: 1.15,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Stai usando Claude al 10%.
            <br />
            Ti mostro il <span style={{ color: "var(--orange)" }}>restante 90%</span>.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--ghost)",
              opacity: 0.85,
              margin: "12px 0 0",
            }}
          >
            Martedì 5 maggio · 18:00 · YouTube Live · Gratis. Iscriviti ora e
            ricevi reminder + link diretto via email.
          </p>
        </div>

        <OptinFormTwoStep
          id={`form-vocab-${source}`}
          source="webinar-claude-vocabolario"
          successRedirect="/webinar-claude/thank-you"
          ctaStep1="Voglio partecipare"
          ctaStep2="Conferma iscrizione"
          microStep1="Riceverai reminder e link diretto via email."
          microStep2="Ultimi dettagli e sei dentro."
        />
      </div>
    </div>
  );
}

// ─── SHARED PIECES ───────────────────────────────────────────────────────────

function CTAButton({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  size = "md",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
  size?: "md" | "lg";
}) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: size === "lg" ? "18px 32px" : "13px 22px",
    borderRadius: 999,
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: size === "lg" ? 17 : 15,
    letterSpacing: "-0.01em",
    cursor: "pointer",
    transition: "transform .15s, background .2s, box-shadow .2s",
    width: fullWidth ? "100%" : undefined,
    border: "none",
    whiteSpace: "nowrap" as const,
  };
  const styles: CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: "var(--orange)",
          color: "#0B0B0C",
          boxShadow:
            "0 8px 24px rgba(235,122,46,0.30), 0 0 0 1px rgba(235,122,46,0.40)",
        }
      : {
          ...base,
          background: "rgba(255,255,255,0.04)",
          color: "var(--ghost)",
          border: "1px solid rgba(255,255,255,0.12)",
        };
  return (
    <button
      type="button"
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        if (variant === "primary") {
          e.currentTarget.style.background = "var(--orange-hover)";
        } else {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        if (variant === "primary") {
          e.currentTarget.style.background = "var(--orange)";
        } else {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(235,122,46,0.10)",
        border: "1px solid rgba(235,122,46,0.30)",
        color: "var(--orange)",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "var(--orange)",
          boxShadow: "0 0 8px rgba(235,122,46,0.6)",
        }}
      />
      {children}
    </span>
  );
}

function TermCard({
  t,
  anchorId,
  accent,
}: {
  t: VocabTerm;
  anchorId: string;
  accent: SectionAccent;
}) {
  return (
    <div
      id={anchorId}
      data-vocab-card
      style={{
        scrollMarginTop: 130,
        padding: "20px 22px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        transition:
          "border-color .25s, background .25s, box-shadow .6s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent.border;
        e.currentTarget.style.background = "rgba(255,255,255,0.035)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
      }}
    >
      {/* Accent dot */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 22,
          left: -4,
          width: 4,
          height: 22,
          borderRadius: 2,
          background: accent.color,
          opacity: 0.7,
        }}
      />
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(18px, 2.2vw, 21px)",
          lineHeight: 1.25,
          color: "#fff",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        {t.term}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.65,
          color: "var(--ghost)",
          opacity: 0.88,
          margin: 0,
        }}
      >
        {t.body}
      </p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  intro,
  id,
  accent,
}: {
  eyebrow?: string;
  /** Parte di titolo NON colorata (sempre bianca) */
  title: string;
  /** Frammento finale del titolo da colorare con l'accent della sezione */
  titleAccent?: string;
  intro?: string;
  id: string;
  accent: SectionAccent;
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 130, marginBottom: 28 }}>
      {eyebrow && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: accent.tint,
            border: `1px solid ${accent.border}`,
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent.color,
            marginBottom: 14,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: accent.color,
              boxShadow: `0 0 8px ${accent.color}`,
            }}
          />
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(28px, 4.5vw, 44px)",
          lineHeight: 1.1,
          color: "#fff",
          letterSpacing: "-0.02em",
          margin: "0 0 14px",
        }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span style={{ color: accent.color }}>{titleAccent}</span>
          </>
        )}
      </h2>
      {intro && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.7vw, 17px)",
            lineHeight: 1.65,
            color: "var(--ghost)",
            opacity: 0.85,
            maxWidth: 720,
            margin: 0,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

// ─── MAIN SECTION ────────────────────────────────────────────────────────────

export function VocabolarioPageSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("hero");
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState<string>("vocab-ai");
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const activeAccent = SECTION_ACCENT[activeNav] ?? DEFAULT_ACCENT;

  const openModal = useCallback(
    (source: string) => {
      setModalSource(source);
      setModalOpen(true);
      gaPush("vocabolario_cta_webinar_click", { source });
    },
    []
  );

  // Page view event
  useEffect(() => {
    gaPush("vocabolario_view");
  }, []);

  // Tracking della search (debounced)
  useEffect(() => {
    if (!query) return;
    const t = setTimeout(() => {
      gaPush("vocabolario_search", { query: query.slice(0, 60) });
    }, 800);
    return () => clearTimeout(t);
  }, [query]);

  // Scroll spy: aggiorna activeNav in base alla section visibile + sticky CTA + back-to-top
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveNav(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));

    function onScroll() {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      const finalTop =
        finalCtaRef.current?.getBoundingClientRect().top ??
        Number.POSITIVE_INFINITY;
      // sticky CTA mobile: dopo l'hero, nascondi vicino al final CTA
      setShowStickyCta(heroBottom < 0 && finalTop > 200);
      // back-to-top floating: dopo aver scrollato di una viewport, nascondi vicino al final CTA
      setShowBackToTop(window.scrollY > 600 && finalTop > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Anchor highlight: glow del termine quando si arriva via #anchor
  useEffect(() => {
    function highlightFromHash() {
      const hash =
        typeof window !== "undefined" ? window.location.hash.slice(1) : "";
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      const accent = accentForAnchorId(hash);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const prevShadow = el.style.boxShadow;
      const prevBorder = el.style.borderColor;
      el.style.boxShadow = accent.glow;
      el.style.borderColor = accent.border;
      window.setTimeout(() => {
        el.style.boxShadow = prevShadow;
        el.style.borderColor = prevBorder;
      }, 1400);
    }
    // delay leggero per lasciare montare i refs
    const t = window.setTimeout(highlightFromHash, 120);
    window.addEventListener("hashchange", highlightFromHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", highlightFromHash);
    };
  }, []);

  // Filtri
  const filteredAi = useMemo(
    () => AI_TERMS.filter((t) => termMatches(t, query)),
    [query]
  );
  const filteredProducts = useMemo(
    () => CLAUDE_PRODUCTS.filter((t) => termMatches(t, query)),
    [query]
  );
  const filteredOps = useMemo(
    () => CLAUDE_OPS.filter((t) => termMatches(t, query)),
    [query]
  );

  const totalMatches =
    filteredAi.length + filteredProducts.length + filteredOps.length;
  const noMatches = query && totalMatches === 0;

  function handleNavClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    gaPush("vocabolario_section_anchor", { section: id });
  }

  return (
    <div style={{ position: "relative", paddingBottom: 100 }}>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "32px 20px 56px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 100,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(900px, 90vw)",
            height: 320,
            background:
              "radial-gradient(ellipse, rgba(235,122,46,0.14) 0%, rgba(123,104,238,0.06) 40%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div style={{ marginBottom: 24 }}>
          <Badge>Warm Up Week · Day 5</Badge>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            maxWidth: 920,
            margin: "0 auto 22px",
          }}
        >
          Vocabolario AI.<br />
          La guida definitiva ai{" "}
          <span style={{ color: "var(--orange)" }}>termini</span> che devi
          conoscere
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            lineHeight: 1.6,
            color: "var(--ghost)",
            opacity: 0.85,
            maxWidth: 700,
            margin: "0 auto 28px",
          }}
        >
          60+ termini spiegati come se fossi al bancone con un amico che lavora
          nell&apos;AI da anni. Più una sezione dedicata a Claude, il tool che
          sta cambiando il modo di lavorare.
        </p>

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 32px",
            textAlign: "left",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: "22px 24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--ghost)",
              opacity: 0.9,
              margin: 0,
            }}
          >
            Ciao! Sono <strong style={{ color: "#fff" }}>Matt</strong>. Negli
            ultimi mesi mi sono accorto di un problema non banale. Tutti
            parlano di AI. Ma davvero pochi sanno cosa stanno dicendo.
            Tokenizzazione? RAG? Fine-tuning? MCP? Per molti sono buzzword da
            buttare nei post. E invece sono termini che servono per capire (e
            usare) bene l&apos;AI.
            <br />
            <br />
            Questa pagina nasce per questo: aiutarti a parlare il linguaggio
            dell&apos;intelligenza artificiale. Con termini spiegati in modo
            chiaro, concreto, senza fuffa. E con una sezione dedicata a Claude,
            perché è lo strumento su cui ho investito più di 300 ore di
            utilizzo reale e su cui tengo un{" "}
            <strong style={{ color: "var(--orange)" }}>
              webinar gratuito il 5 maggio
            </strong>
            .
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <CTAButton onClick={() => openModal("hero")} size="lg">
            Iscriviti al webinar gratuito →
          </CTAButton>
          <CTAButton
            onClick={() => handleNavClick("vocab-ai")}
            variant="ghost"
            size="lg"
          >
            Esplora i termini ↓
          </CTAButton>
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--muted)",
            marginTop: 16,
          }}
        >
          5 maggio · 18:00 · YouTube Live · Gratis
        </div>
      </section>

      {/* ─── STICKY SEARCH + MOBILE TOC ─── */}
      <section
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "10px 20px 12px",
          background: "rgba(11,11,12,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 32,
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <SearchInput
            value={query}
            onChange={setQuery}
            totalMatches={totalMatches}
            hasQuery={Boolean(query)}
          />
          <MobileTOC
            items={NAV_ITEMS.map((n) => ({
              id: n.id,
              label: n.label,
              accent: SECTION_ACCENT[n.id] ?? DEFAULT_ACCENT,
            }))}
            activeId={activeNav}
            onPick={handleNavClick}
          />
        </div>
      </section>

      {/* ─── BODY 2 COLUMNS (DESKTOP) ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 0,
        }}
        className="vocab-grid"
      >
        {/* SIDEBAR: desktop only via CSS */}
        <aside
          aria-label="Indice"
          className="vocab-sidebar"
          style={{
            position: "sticky",
            top: 110,
            alignSelf: "start",
            display: "none",
          }}
        >
          <div
            style={{
              padding: "20px 18px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 14,
              }}
            >
              Indice
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {NAV_ITEMS.map((n) => {
                const itemAccent = SECTION_ACCENT[n.id] ?? DEFAULT_ACCENT;
                const isActive = activeNav === n.id;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(n.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: 8,
                        background: isActive ? itemAccent.tint : "transparent",
                        border: isActive
                          ? `1px solid ${itemAccent.border}`
                          : "1px solid transparent",
                        color: isActive ? itemAccent.color : "var(--ghost)",
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        cursor: "pointer",
                        transition: "background .2s, color .2s, border-color .2s",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: itemAccent.color,
                          opacity: isActive ? 1 : 0.5,
                          flexShrink: 0,
                          boxShadow: isActive
                            ? `0 0 8px ${itemAccent.color}`
                            : "none",
                        }}
                      />
                      <span style={{ minWidth: 0, flex: 1 }}>
                        <span style={{ display: "block" }}>{n.label}</span>
                        {n.count != null && (
                          <span
                            style={{
                              display: "block",
                              fontSize: 11,
                              color: "var(--muted)",
                              marginTop: 2,
                              fontWeight: 500,
                            }}
                          >
                            {n.count} {n.count === 1 ? "voce" : "voci"}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <CTAButton onClick={() => openModal("sidebar")} fullWidth>
                Iscriviti al webinar
              </CTAButton>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 56 }}
        >
          {/* ── No matches ── */}
          {noMatches && (
            <div
              style={{
                padding: "32px 28px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Nessun termine trovato
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--ghost)",
                  opacity: 0.8,
                  margin: "0 0 16px",
                }}
              >
                Niente con &ldquo;{query}&rdquo;. Prova un altro termine o
                cancella la ricerca.
              </p>
              <CTAButton onClick={() => setQuery("")} variant="ghost">
                Cancella ricerca
              </CTAButton>
            </div>
          )}

          {/* ── Vocabolario AI ── */}
          {filteredAi.length > 0 && (
            <section>
              <SectionHeader
                id="vocab-ai"
                eyebrow="Sezione 1 di 3"
                title="Vocabolario"
                titleAccent="AI"
                accent={SECTION_ACCENT["vocab-ai"]}
                intro="I termini fondamentali dell'intelligenza artificiale. Non servono per impressionare qualcuno a una cena. Servono per capire cosa stai usando quando apri ChatGPT, Claude o qualsiasi altro strumento AI."
              />
              <AlphabetJumper
                terms={filteredAi}
                idPrefix="term-ai-"
                accent={SECTION_ACCENT["vocab-ai"]}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 14,
                }}
              >
                {filteredAi.map((t) => (
                  <TermCard
                    key={t.id}
                    t={t}
                    anchorId={`term-ai-${t.id}`}
                    accent={SECTION_ACCENT["vocab-ai"]}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Inline CTA ── */}
          {!query && (
            <InlineCTA onClick={() => openModal("inline-1")} />
          )}

          {/* ── Vocabolario Claude (intro condivisa, attaccata a Prodotti) ── */}
          {(filteredProducts.length > 0 || filteredOps.length > 0) && !query && (
            <SectionHeader
              id="vocab-claude-products"
              eyebrow="Sezione 2 di 3"
              title="Vocabolario"
              titleAccent="Claude"
              accent={SECTION_ACCENT["vocab-claude-products"]}
              intro="Claude è sviluppato da Anthropic e ad oggi è l'ecosistema AI più completo disponibile. Non è un singolo chatbot: è una famiglia di prodotti, modelli e strumenti. Ecco tutto quello che devi conoscere."
            />
          )}

          {filteredProducts.length > 0 && (
            <section
              id={query ? "vocab-claude-products" : undefined}
              style={{ scrollMarginTop: 130 }}
            >
              <SubSectionHeader
                title="I prodotti Claude"
                accent={SECTION_ACCENT["vocab-claude-products"]}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 14,
                }}
              >
                {filteredProducts.map((t) => (
                  <TermCard
                    key={t.id}
                    t={t}
                    anchorId={`term-products-${t.id}`}
                    accent={SECTION_ACCENT["vocab-claude-products"]}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredOps.length > 0 && (
            <section id="vocab-claude-ops" style={{ scrollMarginTop: 130 }}>
              <SubSectionHeader
                title="I termini operativi di Claude"
                accent={SECTION_ACCENT["vocab-claude-ops"]}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 14,
                }}
              >
                {filteredOps.map((t) => (
                  <TermCard
                    key={t.id}
                    t={t}
                    anchorId={`term-ops-${t.id}`}
                    accent={SECTION_ACCENT["vocab-claude-ops"]}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Inline CTA ── */}
          {!query && (
            <InlineCTA onClick={() => openModal("inline-2")} />
          )}

          {/* ── Use cases ── */}
          {!query && (
            <section>
              <SectionHeader
                id="vocab-use-cases"
                eyebrow="Sezione 3 di 3"
                title="Cosa puoi"
                titleAccent="farci"
                accent={SECTION_ACCENT["vocab-use-cases"]}
                intro="Ok, conosci i termini. Ma nella pratica, cosa ci fai? Ecco use case reali, non &ldquo;puoi fare brainstorming&rdquo;. Roba concreta."
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 36 }}
              >
                {USE_CASE_GROUPS.map((g) => (
                  <div key={g.id}>
                    <SubSectionHeader
                      title={g.category}
                      accent={SECTION_ACCENT["vocab-use-cases"]}
                    />
                    <div
                      className="vocab-usecase-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr)",
                        gap: 12,
                      }}
                    >
                      {g.cases.map((uc) => (
                        <div
                          key={uc.id}
                          id={uc.id}
                          style={{
                            scrollMarginTop: 130,
                            padding: "18px 20px",
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 12,
                            position: "relative",
                            transition: "border-color .25s, background .25s, box-shadow .6s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = SECTION_ACCENT["vocab-use-cases"].border;
                            e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              top: 20,
                              left: -3,
                              width: 3,
                              height: 18,
                              borderRadius: 2,
                              background: SECTION_ACCENT["vocab-use-cases"].color,
                              opacity: 0.7,
                            }}
                          />
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 600,
                              fontSize: 17,
                              color: "#fff",
                              margin: "0 0 6px",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {uc.title}
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "var(--ghost)",
                              opacity: 0.85,
                              margin: 0,
                            }}
                          >
                            {uc.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── FINAL CTA BLOCK ─── */}
          <section
            ref={finalCtaRef}
            style={{
              position: "relative",
              padding: "44px 28px 40px",
              borderRadius: 22,
              background:
                "linear-gradient(135deg, rgba(235,122,46,0.10) 0%, rgba(123,104,238,0.10) 100%)",
              border: "1px solid rgba(235,122,46,0.25)",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(235,122,46,0.18) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", textAlign: "center" }}>
              <Badge>Webinar gratuito · 5 maggio 2026</Badge>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 4.5vw, 44px)",
                  lineHeight: 1.08,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  margin: "20px auto 14px",
                  maxWidth: 720,
                }}
              >
                Ora conosci le parole.
                <br />
                Il <span style={{ color: "var(--orange)" }}>5 maggio</span> ti
                mostro come usarle.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  lineHeight: 1.65,
                  color: "var(--ghost)",
                  opacity: 0.88,
                  maxWidth: 640,
                  margin: "0 auto 28px",
                }}
              >
                Martedì 5 maggio alle 18:00 terrò un webinar gratuito su
                YouTube dove condenso tutto quello che ho imparato in oltre
                300 ore di utilizzo reale di Claude. Non teoria. Funzionalità
                nascoste, errori da evitare, workflow concreti che uso ogni
                giorno per gestire il mio business. Se hai letto fin qui, sei
                esattamente il tipo di persona per cui l&apos;ho creato.
              </p>
              <CTAButton onClick={() => openModal("final-cta")} size="lg">
                Iscriviti al webinar gratuito →
              </CTAButton>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 14,
                }}
              >
                Martedì 5 maggio · 18:00 · YouTube Live · Gratis
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ─── STICKY MOBILE CTA ─── */}
      {showStickyCta && (
        <div
          className="vocab-sticky-mobile"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 90,
            padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
            background:
              "linear-gradient(180deg, rgba(11,11,12,0) 0%, rgba(11,11,12,0.92) 30%, rgba(11,11,12,0.96) 100%)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "none",
          }}
        >
          <button
            type="button"
            onClick={() => openModal("sticky")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "14px 16px",
              borderRadius: 999,
              background: "var(--orange)",
              color: "#0B0B0C",
              border: "none",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(235,122,46,0.30)",
            }}
          >
            Iscriviti al webinar gratuito →
          </button>
          <div
            style={{
              textAlign: "center",
              marginTop: 6,
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            5 maggio · 18:00 · YouTube Live
          </div>
        </div>
      )}

      <BackToTopButton
        visible={showBackToTop}
        accent={activeAccent}
        offsetForStickyCta={showStickyCta}
      />

      <VocabolarioModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />

      {/* responsive helpers */}
      <style>{`
        @media (min-width: 960px) {
          .vocab-grid {
            grid-template-columns: 240px minmax(0, 1fr) !important;
            gap: 40px !important;
          }
          .vocab-sidebar {
            display: block !important;
          }
        }
        @media (min-width: 720px) {
          .vocab-usecase-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          }
        }
        @media (max-width: 959px) {
          .vocab-sticky-mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── INLINE CTA & SEARCH (small reused pieces) ───────────────────────────────

function InlineCTA({ onClick }: { onClick: () => void }) {
  return (
    <div
      style={{
        padding: "26px 24px",
        borderRadius: 16,
        background: "rgba(235,122,46,0.06)",
        border: "1px solid rgba(235,122,46,0.20)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0, flex: "1 1 280px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 19,
            color: "#fff",
            letterSpacing: "-0.01em",
            margin: "0 0 4px",
          }}
        >
          Continua su Claude live, il 5 maggio.
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--ghost)",
            opacity: 0.8,
          }}
        >
          Webinar gratuito su YouTube · 18:00 · Gratis
        </div>
      </div>
      <CTAButton onClick={onClick}>Iscriviti gratis →</CTAButton>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  totalMatches,
  hasQuery,
}: {
  value: string;
  onChange: (v: string) => void;
  totalMatches: number;
  hasQuery: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 14,
          padding: "4px 4px 4px 18px",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          aria-hidden
          style={{
            color: "var(--muted)",
            fontSize: 18,
            marginRight: 12,
            display: "inline-flex",
          }}
        >
          ⌕
        </span>
        <input
          type="search"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          placeholder="Cerca un termine (es. RAG, MCP, Skill, allucinazione)..."
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            padding: "12px 0",
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Cancella"
            style={{
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "var(--ghost)",
              width: 32,
              height: 32,
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 14,
              marginRight: 6,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        )}
      </div>
      {hasQuery && (
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            textAlign: "center",
          }}
        >
          {totalMatches === 0
            ? "Nessun risultato"
            : `${totalMatches} ${totalMatches === 1 ? "termine" : "termini"} trovat${totalMatches === 1 ? "o" : "i"}`}
        </div>
      )}
    </div>
  );
}

// ─── SUB-SECTION HEADER (small heading per Prodotti / Operativi / Categorie) ──

function SubSectionHeader({
  title,
  accent,
}: {
  title: string;
  accent: SectionAccent;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "0 0 18px",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: accent.color,
          boxShadow: `0 0 10px ${accent.color}`,
          flexShrink: 0,
        }}
      />
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(20px, 2.6vw, 24px)",
          color: "#fff",
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

// ─── MOBILE TOC: chip orizzontali sticky sotto la search ──────────────────────

function MobileTOC({
  items,
  activeId,
  onPick,
}: {
  items: Array<{ id: string; label: string; accent: SectionAccent }>;
  activeId: string;
  onPick: (id: string) => void;
}) {
  return (
    <div
      className="vocab-mobile-toc"
      style={{
        display: "none",
        marginTop: 10,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        .vocab-mobile-toc::-webkit-scrollbar { display: none; }
        @media (max-width: 959px) {
          .vocab-mobile-toc { display: flex !important; gap: 8px; padding: 0 4px; }
        }
      `}</style>
      {items.map((it) => {
        const isActive = activeId === it.id;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onPick(it.id)}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 999,
              background: isActive ? it.accent.tint : "rgba(255,255,255,0.04)",
              border: isActive
                ? `1px solid ${it.accent.border}`
                : "1px solid rgba(255,255,255,0.10)",
              color: isActive ? it.accent.color : "var(--ghost)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background .2s, color .2s, border-color .2s",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── ALPHABET JUMPER (per la sezione AI: 47 termini sono tanti) ──────────────

function AlphabetJumper({
  terms,
  idPrefix,
  accent,
}: {
  terms: VocabTerm[];
  idPrefix: string;
  accent: SectionAccent;
}) {
  const lettersWithFirstId = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of terms) {
      const letter = t.term[0]?.toUpperCase();
      if (!letter) continue;
      if (!map.has(letter)) map.set(letter, t.id);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [terms]);

  if (lettersWithFirstId.length < 4) return null;

  function jump(letter: string, firstTermId: string) {
    const el = document.getElementById(`${idPrefix}${firstTermId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    gaPush("vocabolario_alphabet_jump", { letter });
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        marginBottom: 18,
        padding: "10px 12px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
          alignSelf: "center",
          marginRight: 8,
        }}
      >
        Salta a:
      </span>
      {lettersWithFirstId.map(([letter, id]) => (
        <button
          key={letter}
          type="button"
          onClick={() => jump(letter, id)}
          style={{
            minWidth: 30,
            height: 30,
            padding: "0 8px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--ghost)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background .2s, color .2s, border-color .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = accent.tint;
            e.currentTarget.style.borderColor = accent.border;
            e.currentTarget.style.color = accent.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "var(--ghost)";
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

// ─── BACK-TO-TOP FAB ─────────────────────────────────────────────────────────

function BackToTopButton({
  visible,
  accent,
  offsetForStickyCta,
}: {
  visible: boolean;
  accent: SectionAccent;
  offsetForStickyCta: boolean;
}) {
  // Su mobile la sticky CTA occupa ~70px in fondo: alziamo il FAB sopra
  const bottomMobile = offsetForStickyCta ? 96 : 24;
  return (
    <>
      <button
        type="button"
        aria-label="Torna su"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="vocab-back-to-top"
        style={{
          position: "fixed",
          right: 20,
          bottom: bottomMobile,
          zIndex: 80,
          width: 44,
          height: 44,
          borderRadius: 999,
          background: "rgba(11,11,12,0.85)",
          border: `1px solid ${accent.border}`,
          color: accent.color,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "var(--font-body)",
          boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${accent.border}`,
          backdropFilter: "blur(10px)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity .25s, transform .25s, bottom .25s, color .3s, border-color .3s",
        }}
      >
        ↑
      </button>
      <style>{`
        @media (min-width: 960px) {
          .vocab-back-to-top {
            bottom: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
