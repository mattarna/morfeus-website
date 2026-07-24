/* global React */
const { useState, useRef, useEffect } = React;

/* ============================================================
   OptinFormTwoStep
   Step 1: email + CTA inline
   Step 2: nome, ruolo, privacy + conferma (slide-down expansion)
   ============================================================ */

window.OptinFormTwoStep = function OptinFormTwoStep({
  onComplete, id = "form-main",
  ctaStep1 = "Riserva il tuo posto",
  ctaStep2 = "Ci sono. Confermo",
  microStep1 = "Gratuito. Nessuna carta. 10 secondi e sei dentro.",
  microStep2 = "Riceverai il link per partecipare via email entro 2 minuti.",
}) {
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [role, setRole]   = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const expansionRef = useRef(null);

  const goStep2 = () => {
    if (!email.includes("@") || email.length < 4) {
      setError("Inserisci una email valida");
      return;
    }
    setError("");
    setExpanded(true);
  };

  const submit = () => {
    if (!name.trim()) { setError("Il nome è richiesto"); return; }
    if (!role) { setError("Seleziona il tuo ruolo"); return; }
    if (!privacy) { setError("Serve accettare la privacy policy"); return; }
    setError("");
    onComplete?.({ email, name, role });
  };

  // Measure expansion target height for smooth slide-down
  const [expandedH, setExpandedH] = useState(0);
  useEffect(() => {
    if (expanded && expansionRef.current) {
      setExpandedH(expansionRef.current.scrollHeight);
    } else {
      setExpandedH(0);
    }
  }, [expanded]);

  return (
    <div style={{
      maxWidth: 540, margin: "0 auto",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: 28,
      backdropFilter: "blur(10px)",
      position: "relative",
    }}>
      {/* subtle gradient border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, padding: 1,
        background: "linear-gradient(135deg, rgba(123,104,238,0.3), rgba(235,122,46,0.2))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase",
        color: "var(--violet)", fontWeight: 700, marginBottom: 14,
      }}>
        {expanded ? "Ultimo passo" : "Iscriviti gratis"}
      </div>

      {/* Step 1 — email + inline CTA */}
      <div style={{
        display: "flex", gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <window.Input
            type="email" value={email} onChange={setEmail}
            placeholder="La tua email"
            onSubmit={expanded ? submit : goStep2}
          />
        </div>
        {!expanded && (
          <window.Button onClick={goStep2} pulse>
            {ctaStep1} <span style={{ fontSize: 18 }}>→</span>
          </window.Button>
        )}
      </div>

      {/* Step 2 — slide-down expansion */}
      <div style={{
        maxHeight: expanded ? expandedH + 40 : 0,
        overflow: "hidden",
        transition: "max-height .45s cubic-bezier(.4,0,.2,1), margin-top .45s cubic-bezier(.4,0,.2,1)",
        marginTop: expanded ? 16 : 0,
      }}>
        <div ref={expansionRef} style={{
          display: "flex", flexDirection: "column", gap: 12,
          opacity: expanded ? 1 : 0,
          transform: expanded ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity .4s ease .1s, transform .4s ease .1s",
        }}>
          <window.Input
            value={name} onChange={setName}
            placeholder="Il tuo nome"
            onSubmit={submit}
            autoFocus={expanded}
          />
          <window.Select
            value={role} onChange={setRole}
            placeholder="Qual è il tuo ruolo?"
            options={["Freelance", "Dipendente", "Imprenditore / Founder", "Manager", "Altro"]}
          />
          <div style={{ marginTop: 4 }}>
            <window.Checkbox checked={privacy} onChange={setPrivacy}>
              Accetto la <a href="#" style={{ color: "var(--orange)" }}>privacy policy</a> e
              acconsento al trattamento dei dati.
            </window.Checkbox>
          </div>
          <div style={{ marginTop: 6 }}>
            <window.Button onClick={submit} fullWidth size="lg">
              {ctaStep2} <span style={{ fontSize: 18 }}>→</span>
            </window.Button>
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          fontSize: 13, color: "#FF8a6a", marginTop: 12, fontWeight: 500,
        }}>
          {error}
        </div>
      )}

      <div style={{
        fontSize: 13, color: "var(--muted)",
        marginTop: 14, lineHeight: 1.5,
      }}>
        {expanded ? microStep2 : microStep1}
      </div>
    </div>
  );
};

/* ============================================================
   HERO — headline switchable (Opzione A / B via Tweak)
   ============================================================ */

window.Hero = function Hero({ target, onComplete }) {
  const H = window.Accent;

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto",
      padding: "56px 32px 80px",
      position: "relative", zIndex: 1,
    }}>
      {/* Ambient glow behind headline */}
      <div aria-hidden style={{
        position: "absolute",
        top: 140, left: "50%", transform: "translateX(-50%)",
        width: "min(900px, 90vw)", height: 340,
        background: "radial-gradient(ellipse, rgba(235,122,46,0.14) 0%, rgba(123,104,238,0.06) 40%, transparent 70%)",
        filter: "blur(20px)",
        pointerEvents: "none", zIndex: -1,
      }} />

      <window.Reveal>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <window.Badge>Webinar gratuito · Martedì 5 Maggio, ore 18:00</window.Badge>
        </div>
      </window.Reveal>

      <window.Reveal delay={80}>
        <h1 style={headlineStyle}>
          Stai usando Claude al 10%.<br />
          Ti mostro il <H>restante</H> 90%.
        </h1>
      </window.Reveal>

      <window.Reveal delay={160}>
        <p style={{
          fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 19,
          lineHeight: 1.55, color: "var(--ghost)", opacity: 0.85,
          textAlign: "center", margin: "0 auto 44px", maxWidth: 680,
          textWrap: "pretty",
        }}>
          +300 ore di utilizzo reale. Le funzionalità nascoste, gli errori da evitare,
          i workflow che uso ogni giorno. Tutto in un webinar gratuito di un'ora.
        </p>
      </window.Reveal>

      <window.Reveal delay={220}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <window.Countdown target={target} />
        </div>
      </window.Reveal>

      <window.Reveal delay={280}>
        <window.OptinFormTwoStep onComplete={onComplete} id="form-hero" />
      </window.Reveal>
    </section>
  );
};

const headlineStyle = {
  fontFamily: "var(--font-display)", fontWeight: 600,
  fontSize: "clamp(40px, 6vw, 72px)",
  lineHeight: 1.04, letterSpacing: "-0.025em",
  color: "#fff", textAlign: "center",
  margin: "0 auto 24px", maxWidth: 920,
  textWrap: "balance",
};

/* ============================================================
   SOCIAL PROOF BAR — fascia orizzontale con 3 stat
   ============================================================ */

window.SocialProofBar = function SocialProofBar() {
  // Rich items: number + label split for better hierarchy
  const items = [
    { n: "+300", label: "ore di Claude", sub: "utilizzo reale quotidiano" },
    { n: "9.500", label: "lettori newsletter", sub: "professionisti italiani" },
    { n: "H-Farm · Sole 24 Ore · Talent Garden", label: null, sub: "docente & formatore" },
  ];
  return (
    <section style={{
      background: "linear-gradient(180deg, rgba(15,14,26,0.0) 0%, rgba(15,14,26,0.75) 20%, rgba(15,14,26,0.75) 80%, rgba(15,14,26,0.0) 100%)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 32px",
      position: "relative", zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }} className="sp-grid">
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <div style={{
              textAlign: "center",
              padding: "8px 20px",
              position: "relative",
            }}>
              {it.label ? (
                <div style={{
                  display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10,
                  marginBottom: 4, flexWrap: "wrap",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontWeight: 600,
                    fontSize: 28, color: "var(--orange)",
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}>{it.n}</span>
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
                    color: "var(--ghost)", opacity: 0.9,
                  }}>{it.label}</span>
                </div>
              ) : (
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: 16, color: "#fff", opacity: 0.92,
                  letterSpacing: "-0.005em",
                  marginBottom: 4,
                }}>
                  {it.n}
                </div>
              )}
              <div style={{
                fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--muted)", fontWeight: 600,
              }}>
                {it.sub}
              </div>
            </div>
            {i < items.length - 1 && (
              <span className="sp-divider" style={{
                width: 1,
                alignSelf: "center",
                height: 42,
                background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        .sp-grid > div { flex: 1 1 0; min-width: 240px; }
        @media (max-width: 820px) {
          .sp-grid {
            flex-direction: column !important;
            gap: 18px !important;
          }
          .sp-grid .sp-divider { display: none !important; }
          .sp-grid > div { flex: 1 1 auto; }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   FINAL CTA SECTION — copy chiusura + dettagli evento + countdown + form
   ============================================================ */

window.FinalCTA = function FinalCTA({ target, onComplete }) {
  const DotLive = () => (
    <span style={{
      width: 8, height: 8, borderRadius: "50%",
      background: "#FF4D4D",
      boxShadow: "0 0 8px rgba(255,77,77,0.7)",
      animation: "badge-pulse 1.4s infinite",
      display: "inline-block",
    }} />
  );
  const IconWrap = ({ children }) => (
    <span style={{
      width: 14, height: 14, display: "inline-flex",
      alignItems: "center", justifyContent: "center",
      color: "var(--muted)", marginRight: 8,
    }}>{children}</span>
  );
  const Pill = ({ icon, children, accent }) => (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "8px 16px", borderRadius: 100,
      background: accent ? "rgba(235,122,46,0.08)" : "rgba(255,255,255,0.035)",
      border: `1px solid ${accent ? "rgba(235,122,46,0.25)" : "rgba(255,255,255,0.10)"}`,
      fontSize: 13, fontWeight: 500,
      color: accent ? "var(--orange)" : "var(--ghost)",
      opacity: accent ? 1 : 0.92,
      letterSpacing: "0.01em",
    }}>
      {icon && <span style={{ marginRight: 8, display: "inline-flex" }}>{icon}</span>}
      {children}
    </span>
  );

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto",
      padding: "120px 32px 120px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      position: "relative", zIndex: 1,
    }}>
      {/* ambient under the final headline */}
      <div aria-hidden style={{
        position: "absolute",
        top: 80, left: "50%", transform: "translateX(-50%)",
        width: "min(900px, 90vw)", height: 280,
        background: "radial-gradient(ellipse, rgba(235,122,46,0.10) 0%, transparent 70%)",
        filter: "blur(24px)",
        pointerEvents: "none", zIndex: -1,
      }} />

      <window.Reveal>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(40px, 5.6vw, 64px)",
          lineHeight: 1.04, letterSpacing: "-0.025em",
          color: "#fff", textAlign: "center",
          margin: "0 auto 20px", maxWidth: 820, textWrap: "balance",
        }}>
          Ci vediamo il 5 maggio.
        </h2>
      </window.Reveal>

      <window.Reveal delay={80}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 20,
          lineHeight: 1.5, color: "var(--ghost)", opacity: 0.9,
          textAlign: "center",
          margin: "0 auto 36px", maxWidth: 640, textWrap: "pretty",
        }}>
          Un'ora. Gratis.<br/>
          +300 ore di Claude condensate in una <window.Accent>sera</window.Accent>.
        </p>
      </window.Reveal>

      {/* Event details — inline pills with light iconography */}
      <window.Reveal delay={140}>
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 10, flexWrap: "wrap",
          margin: "0 auto 44px", maxWidth: 820,
        }}>
          <Pill accent icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }>Martedì 5 Maggio 2026</Pill>
          <Pill accent icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          }>ore 18:00</Pill>
          <Pill icon={<DotLive />}>YouTube Live</Pill>
          <Pill>~1 ora</Pill>
          <Pill>Gratuito</Pill>
          <Pill>Replay 48h</Pill>
        </div>
      </window.Reveal>

      <window.Reveal delay={200}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
          <window.Countdown target={target} />
        </div>
      </window.Reveal>

      <window.Reveal delay={260}>
        <window.OptinFormTwoStep
          onComplete={onComplete}
          id="form-final"
          microStep1="Riceverai 2-3 email di preparazione al webinar prima del 5 maggio. Nient'altro."
        />
      </window.Reveal>
    </section>
  );
};
