/* global React */

/* ============================================================
   IL CAMBIAMENTO — 3 livelli di rapporto con l'AI
   Posizionata DOPO "Chi parla" per chiudere con la visione.
   3 card orizzontali: Fai tutto tu → L'AI lavora con te → L'AI lavora per te
   ============================================================ */

window.ChangeSection = function ChangeSection() {
  const levels = [
    {
      n: "01",
      stage: "Oggi",
      title: "Fai tutto tu",
      paragraphs: [
        "Ogni task, ogni decisione, ogni output passa da te.",
        "Lavori 50, 60 ore a settimana e il collo di bottiglia sei sempre tu.",
        "L'AI? L'hai provata. Ma non ha cambiato niente di concreto.",
      ],
      tone: "dim",
    },
    {
      n: "02",
      stage: "In una sera",
      title: "L'AI lavora con te",
      paragraphs: [
        "Sai come usarla davvero. Le dai contesto, la guidi, la correggi. L'output è al tuo standard.",
        "Risparmi ore ogni settimana su lavoro che prima facevi a mano.",
        "Il tuo tempo torna ad essere tuo.",
      ],
      tone: "mid",
    },
    {
      n: "03",
      stage: "La destinazione",
      title: "L'AI lavora per te",
      paragraphs: [
        "Hai un sistema. L'AI conosce il tuo contesto, segue le tue regole, produce senza che tu debba ricominciare ogni volta da zero.",
        "Non è un assistente. È un membro del team.",
      ],
      tone: "bright",
    },
  ];

  return (
    <section style={{
      maxWidth: 1200, margin: "0 auto",
      padding: "140px 32px 120px",
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <window.Reveal>
        <window.SectionLabel>Il cambiamento</window.SectionLabel>
      </window.Reveal>

      <window.Reveal delay={80}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05, letterSpacing: "-0.025em",
          color: "#fff", margin: "24px 0 28px 0",
          maxWidth: 900, textWrap: "balance",
        }}>
          Il modo in cui lavori sta per cambiare.
        </h2>
      </window.Reveal>

      <window.Reveal delay={140}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6,
          color: "var(--ghost)", opacity: 0.88,
          margin: "0 0 72px 0", maxWidth: 720,
          textWrap: "pretty",
        }}>
          Siamo passati dalla carta ai fogli di calcolo. Dai fogli di calcolo ai SAAS.
          Ora il prossimo salto è qui.<br/>
          La domanda è semplice: <window.Accent>lo vuoi guidare</window.Accent> o lo vuoi subire?
        </p>
      </window.Reveal>

      {/* Progress rail desktop-only */}
      <div style={{ position: "relative" }}>
        <div
          aria-hidden
          className="change-rail"
          style={{
            position: "absolute",
            top: 88, left: "8%", right: "8%", height: 1,
            background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(123,104,238,0.35) 50%, rgba(235,122,46,0.55) 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div className="change-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          position: "relative", zIndex: 1,
        }}>
          {levels.map((lv, i) => (
            <window.Reveal key={lv.n} delay={i * 80}>
              <LevelCard {...lv} />
            </window.Reveal>
          ))}
        </div>
      </div>

      {/* Chiusura sotto le card */}
      <window.Reveal delay={300}>
        <div style={{
          marginTop: 80,
          maxWidth: 760, marginLeft: "auto", marginRight: "auto",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 500,
            fontSize: "clamp(20px, 2.2vw, 24px)",
            lineHeight: 1.45, letterSpacing: "-0.01em",
            color: "var(--ghost)", opacity: 0.95,
            margin: 0, textWrap: "pretty",
          }}>
            La maggior parte dei professionisti è ferma al{" "}
            <span style={{
              color: "rgba(255,255,255,0.6)", fontWeight: 600,
            }}>livello 1</span>.<br/>
            Questo webinar ti fa capire come si può arrivare al{" "}
            <span style={{ color: "var(--violet)", fontWeight: 600 }}>2</span>{" "}
            e ti fa vedere cosa succede al{" "}
            <span style={{ color: "var(--orange)", fontWeight: 600 }}>3</span>.
          </p>
        </div>
      </window.Reveal>

      <style>{`
        @media (max-width: 880px) {
          .change-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .change-rail { display: none !important; }
        }
      `}</style>
    </section>
  );
};

function LevelCard({ n, stage, title, paragraphs, tone }) {
  const [hover, setHover] = React.useState(false);

  // Tone progression: dim (grigio basso) → mid (violet) → bright (orange glow)
  const palette = tone === "dim" ? {
    bg: "rgba(255,255,255,0.02)",
    bgHover: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.06)",
    borderHover: "rgba(255,255,255,0.10)",
    num: "rgba(255,255,255,0.25)",
    title: "rgba(255,255,255,0.75)",
    body: "rgba(228,231,240,0.65)",
    dot: "rgba(255,255,255,0.3)",
    stageColor: "var(--muted)",
    stageBg: "rgba(255,255,255,0.05)",
    stageBorder: "rgba(255,255,255,0.08)",
    divider: "rgba(255,255,255,0.05)",
    glow: "none",
  } : tone === "mid" ? {
    bg: "rgba(255,255,255,0.035)",
    bgHover: "rgba(123,104,238,0.06)",
    border: "rgba(123,104,238,0.20)",
    borderHover: "rgba(123,104,238,0.35)",
    num: "var(--violet)",
    title: "#fff",
    body: "rgba(228,231,240,0.88)",
    dot: "var(--violet)",
    stageColor: "var(--violet)",
    stageBg: "rgba(123,104,238,0.12)",
    stageBorder: "rgba(123,104,238,0.22)",
    divider: "rgba(123,104,238,0.15)",
    glow: hover ? "0 20px 60px -20px rgba(123,104,238,0.25)" : "none",
  } : {
    bg: "rgba(235,122,46,0.04)",
    bgHover: "rgba(235,122,46,0.08)",
    border: "rgba(235,122,46,0.30)",
    borderHover: "rgba(235,122,46,0.50)",
    num: "var(--orange)",
    title: "#fff",
    body: "rgba(228,231,240,0.92)",
    dot: "var(--orange)",
    stageColor: "var(--orange)",
    stageBg: "rgba(235,122,46,0.12)",
    stageBorder: "rgba(235,122,46,0.25)",
    divider: "rgba(235,122,46,0.15)",
    glow: hover ? "0 20px 60px -15px rgba(235,122,46,0.35)" : "0 8px 30px -15px rgba(235,122,46,0.18)",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "36px 30px 34px",
        background: hover ? palette.bgHover : palette.bg,
        border: `1px solid ${hover ? palette.borderHover : palette.border}`,
        borderRadius: 16,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "background .3s, border-color .3s, transform .3s, box-shadow .3s",
        boxShadow: palette.glow,
        display: "flex", flexDirection: "column",
        height: "100%", boxSizing: "border-box",
      }}
    >
      {/* Dot connector — aligns with rail */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -5, left: "50%", transform: "translateX(-50%)",
          width: 10, height: 10, borderRadius: "50%",
          background: palette.dot,
          boxShadow: tone === "bright" ? "0 0 0 4px rgba(235,122,46,0.15), 0 0 14px rgba(235,122,46,0.5)" :
                     tone === "mid"    ? "0 0 0 4px rgba(123,104,238,0.10)" :
                                         "0 0 0 4px rgba(255,255,255,0.03)",
          transition: "box-shadow .3s",
        }}
      />

      {/* Header row: number + stage pill */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 26,
        gap: 12,
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 44, lineHeight: 1, letterSpacing: "-0.03em",
          color: palette.num,
          fontVariantNumeric: "tabular-nums",
          transition: "color .3s",
        }}>
          {n}
        </div>
        <div style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.20em", textTransform: "uppercase",
          color: palette.stageColor,
          padding: "5px 10px", borderRadius: 100,
          background: palette.stageBg,
          border: `1px solid ${palette.stageBorder}`,
          whiteSpace: "nowrap",
        }}>
          Livello {n}
        </div>
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.02em",
        color: palette.title, margin: "0 0 20px 0",
        transition: "color .3s",
      }}>
        {title}
      </h3>

      <div style={{
        display: "flex", flexDirection: "column", gap: 10,
        flex: 1,
      }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{
            fontFamily: "var(--font-body)",
            fontSize: 15, lineHeight: 1.6,
            color: palette.body,
            margin: 0, textWrap: "pretty",
          }}>
            {p}
          </p>
        ))}
      </div>

      {/* Bottom stage label — subtle */}
      <div style={{
        marginTop: 24,
        paddingTop: 16,
        borderTop: `1px solid ${palette.divider}`,
        fontFamily: "var(--font-italic)", fontStyle: "italic",
        fontSize: 13, lineHeight: 1.4,
        color: palette.stageColor,
        transition: "color .3s",
        opacity: 0.9,
      }}>
        {stage}
      </div>
    </div>
  );
}
