"use client";

/**
 * Vocabolario AI + Claude — pagina freebie pubblica.
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

function TermCard({ t, anchorId }: { t: VocabTerm; anchorId: string }) {
  return (
    <div
      id={anchorId}
      style={{
        scrollMarginTop: 90,
        padding: "20px 22px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        transition: "border-color .25s, background .25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(235,122,46,0.25)";
        e.currentTarget.style.background = "rgba(255,255,255,0.035)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
      }}
    >
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
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 90, marginBottom: 28 }}>
      {eyebrow && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--violet)",
            marginBottom: 10,
          }}
        >
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
  const heroRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

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

  // Scroll spy: aggiorna activeNav in base alla section visibile + sticky CTA
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
      // mostra sticky bar dopo aver scrollato sotto l'hero, nasconde quando si avvicina al CTA finale
      setShowStickyCta(heroBottom < 0 && finalTop > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
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
          Vocabolario AI —<br />
          la guida definitiva ai{" "}
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

      {/* ─── SEARCH BAR ─── */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 20px",
          marginBottom: 32,
        }}
      >
        <SearchInput value={query} onChange={setQuery} totalMatches={totalMatches} hasQuery={Boolean(query)} />
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
        {/* SIDEBAR — desktop only via CSS */}
        <aside
          aria-label="Indice"
          className="vocab-sidebar"
          style={{
            position: "sticky",
            top: 24,
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
                color: "var(--violet)",
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
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(n.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 8,
                      background:
                        activeNav === n.id
                          ? "rgba(235,122,46,0.12)"
                          : "transparent",
                      border:
                        activeNav === n.id
                          ? "1px solid rgba(235,122,46,0.30)"
                          : "1px solid transparent",
                      color:
                        activeNav === n.id ? "var(--orange)" : "var(--ghost)",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: activeNav === n.id ? 600 : 500,
                      cursor: "pointer",
                      transition: "background .2s, color .2s",
                    }}
                  >
                    <div>{n.label}</div>
                    {n.count != null && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          marginTop: 2,
                          fontWeight: 500,
                        }}
                      >
                        {n.count} {n.count === 1 ? "voce" : "voci"}
                      </div>
                    )}
                  </button>
                </li>
              ))}
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
                title="Vocabolario AI"
                intro="I termini fondamentali dell'intelligenza artificiale. Non servono per impressionare qualcuno a una cena. Servono per capire cosa stai usando quando apri ChatGPT, Claude o qualsiasi altro strumento AI."
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
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Inline CTA ── */}
          {!query && (
            <InlineCTA onClick={() => openModal("inline-1")} />
          )}

          {/* ── Vocabolario Claude — Prodotti ── */}
          {(filteredProducts.length > 0 || filteredOps.length > 0) && !query && (
            <SectionHeader
              id="vocab-claude-products"
              eyebrow="Sezione 2 di 3"
              title="Vocabolario Claude"
              intro="Claude è sviluppato da Anthropic e ad oggi è l'ecosistema AI più completo disponibile. Non è un singolo chatbot: è una famiglia di prodotti, modelli e strumenti. Ecco tutto quello che devi conoscere."
            />
          )}

          {filteredProducts.length > 0 && (
            <section
              id={query ? "vocab-claude-products" : undefined}
              style={{ scrollMarginTop: 90 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 3vw, 28px)",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  margin: "0 0 18px",
                }}
              >
                I prodotti Claude
              </h3>
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
                    anchorId={`term-claude-${t.id}`}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredOps.length > 0 && (
            <section id="vocab-claude-ops" style={{ scrollMarginTop: 90 }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 3vw, 28px)",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  margin: "0 0 18px",
                }}
              >
                I termini operativi di Claude
              </h3>
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
                    anchorId={`term-claude-${t.id}`}
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
                title="Cosa puoi farci"
                intro="Ok, conosci i termini. Ma nella pratica, cosa ci fai? Ecco use case reali, non &ldquo;puoi fare brainstorming&rdquo;. Roba concreta."
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 36 }}
              >
                {USE_CASE_GROUPS.map((g) => (
                  <div key={g.id}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "clamp(20px, 2.6vw, 24px)",
                        color: "#fff",
                        letterSpacing: "-0.01em",
                        margin: "0 0 14px",
                      }}
                    >
                      {g.category}
                    </h3>
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
                          style={{
                            padding: "18px 20px",
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 12,
                          }}
                        >
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
