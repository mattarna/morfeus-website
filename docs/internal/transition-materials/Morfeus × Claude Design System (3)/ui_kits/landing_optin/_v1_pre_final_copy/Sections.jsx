/* global React */
const { useState } = React;

// ===== Hero =========================================================
window.Hero = function Hero({ onSubmit }) {
  const [email, setEmail] = useState("");

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto", padding: "72px 32px 64px",
      position: "relative", zIndex: 1
    }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <window.Badge>Webinar gratuito · Live</window.Badge>
      </div>

      <h1 style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600, fontSize: "clamp(40px, 6vw, 68px)",
        lineHeight: 1.02, letterSpacing: "-0.025em",
        color: "#fff", textAlign: "center", margin: "0 auto 24px",
        maxWidth: 880, textWrap: "balance"
      }}>
        Come usare Claude <span style={{
          fontFamily: "var(--font-italic)", fontStyle: "italic",
          fontWeight: 500, color: "var(--orange)"
        }}>al massimo</span> nel tuo lavoro.
      </h1>

      <p style={{
        fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 18,
        lineHeight: 1.55, color: "var(--ghost)", opacity: 0.85,
        textAlign: "center", margin: "0 auto 40px", maxWidth: 620
      }}>
        60 minuti con Matt. I workflow veri che oggi mi fanno finire in 30 minuti
        quello che prima richiedeva una giornata. Niente teoria, niente hype.
      </p>

      <div style={{
        display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap",
        fontSize: 13, color: "var(--muted)", letterSpacing: "0.05em",
        marginBottom: 40
      }}>
        <span>📍 Online · Zoom</span>
        <span>·</span>
        <span>Giovedì 2 maggio · 20:30</span>
        <span>·</span>
        <span>60 min + Q&amp;A</span>
      </div>

      <window.OptinForm email={email} setEmail={setEmail} onSubmit={onSubmit} />
    </section>
  );
};

// ===== OptinForm ====================================================
window.OptinForm = function OptinForm({ email, setEmail, onSubmit }) {
  return (
    <div style={{
      maxWidth: 520, margin: "0 auto",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: 28,
      backdropFilter: "blur(10px)",
      position: "relative"
    }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, padding: 1,
        background: "linear-gradient(135deg, rgba(123,104,238,0.3), rgba(235,122,46,0.2))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        pointerEvents: "none"
      }} />
      <div style={{
        fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase",
        color: "var(--violet)", fontWeight: 700, marginBottom: 14
      }}>Iscriviti gratis</div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <window.Input
            type="email" value={email} onChange={setEmail}
            placeholder="nome@esempio.com"
            onSubmit={() => onSubmit?.(email)}
          />
        </div>
        <window.Button onClick={() => onSubmit?.(email)}>
          Iscriviti <span>→</span>
        </window.Button>
      </div>

      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 14 }}>
        Niente spam. Disiscrizione in un click. Ti arriva un promemoria 1h prima.
      </div>
    </div>
  );
};

// ===== Authority list ==============================================
window.AuthoritySection = function AuthoritySection() {
  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto", padding: "64px 32px",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <window.SectionLabel>Cosa imparerai</window.SectionLabel>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: 38, lineHeight: 1.08, letterSpacing: "-0.02em",
            color: "#fff", margin: "20px 0 0 0", textWrap: "balance"
          }}>
            Workflow <span style={{
              fontFamily: "var(--font-italic)", fontStyle: "italic",
              fontWeight: 500, color: "var(--orange)"
            }}>reali</span>, non demo finte.
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6,
            color: "var(--ghost)", opacity: 0.85, marginTop: 20, maxWidth: 440
          }}>
            Ti mostro esattamente come uso Claude ogni giorno. Non prompt da manuale,
            ma i flussi che ho costruito nei mesi di pratica reale.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <window.CheckItem>Projects di Claude configurati per il tuo lavoro</window.CheckItem>
          <window.CheckItem>Artifacts come mini-app usate ogni giorno</window.CheckItem>
          <window.CheckItem>Workflow di scrittura, analisi, ricerca</window.CheckItem>
          <window.CheckItem>Gli errori che ti fanno perdere tempo — e come evitarli</window.CheckItem>
          <window.CheckItem>Q&amp;A live in chiusura — rispondo a tutti</window.CheckItem>
        </div>
      </div>
    </section>
  );
};

// ===== Modules (3 cards) ============================================
window.ModulesSection = function ModulesSection() {
  const modules = [
    { n: 1, t: "Le fondamenta giuste.", b: "Come impostare Claude perché diventi un membro del team, non un gadget. Projects, memoria, contesto." },
    { n: 2, t: "Workflow reali.", b: "Scrittura di email che servono davvero, analisi di documenti lunghi, ricerca strutturata, code review." },
    { n: 3, t: "Il salto di produttività.", b: "Artifacts come strumenti personali. Automazioni senza codice. Quando delegare e quando no." },
  ];

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto", padding: "80px 32px",
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }}>
      <window.SectionLabel>Il webinar</window.SectionLabel>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: 44, lineHeight: 1.06, letterSpacing: "-0.02em",
        color: "#fff", margin: "18px 0 48px 0", textWrap: "balance", maxWidth: 720
      }}>
        Tre blocchi, un risultato <span style={{
          fontFamily: "var(--font-italic)", fontStyle: "italic",
          fontWeight: 500, color: "var(--orange)"
        }}>concreto</span>.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {modules.map(m => (
          <window.Card key={m.n} number={m.n}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.01em",
              color: "#fff", margin: "0 0 12px 0"
            }}>{m.t}</h3>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55,
              color: "var(--ghost)", opacity: 0.80, margin: 0
            }}>{m.b}</p>
          </window.Card>
        ))}
      </div>
    </section>
  );
};

// ===== FinalCTA =====================================================
window.FinalCTA = function FinalCTA({ onClick }) {
  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto", padding: "80px 32px 100px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center"
    }}>
      <window.SectionLabel>Ultimo passo</window.SectionLabel>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em",
        color: "#fff", margin: "20px auto 32px", maxWidth: 780, textWrap: "balance"
      }}>
        Pronto a <span style={{
          fontFamily: "var(--font-italic)", fontStyle: "italic",
          fontWeight: 500, color: "var(--orange)"
        }}>partire</span>?
      </h2>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.55,
        color: "var(--ghost)", opacity: 0.85, margin: "0 auto 40px", maxWidth: 500
      }}>
        Un'email per iscriverti. Un giovedì sera ben speso. Zero impegni successivi.
      </p>
      <window.Button onClick={onClick} size="lg">
        Guarda il webinar gratuito <span>→</span>
      </window.Button>
    </section>
  );
};

// ===== Thank you screen =============================================
window.ThankYou = function ThankYou({ email, onBack }) {
  return (
    <section style={{
      maxWidth: 720, margin: "0 auto", padding: "120px 32px",
      textAlign: "center", position: "relative", zIndex: 1
    }}>
      <div style={{ marginBottom: 32 }}>
        <window.Badge pulsingDot={false}>✓ Iscrizione confermata</window.Badge>
      </div>
      <h1 style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: "clamp(38px, 5.5vw, 58px)", lineHeight: 1.05, letterSpacing: "-0.025em",
        color: "#fff", margin: "0 0 24px 0", textWrap: "balance"
      }}>
        Ci <span style={{
          fontFamily: "var(--font-italic)", fontStyle: "italic",
          fontWeight: 500, color: "var(--orange)"
        }}>vediamo</span> giovedì sera.
      </h1>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6,
        color: "var(--ghost)", opacity: 0.88, margin: "0 auto 16px", maxWidth: 540
      }}>
        Ti ho appena mandato una mail di conferma a <b style={{ color: "#fff" }}>{email || "la tua casella"}</b> con
        il link Zoom. Se non la vedi, controlla spam.
      </p>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6,
        color: "var(--muted)", margin: "0 auto 40px", maxWidth: 480
      }}>
        Un'ora prima dell'evento ti arriva un promemoria. Nel frattempo, niente altro da fare — sei a posto.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <window.Button kind="secondary" onClick={onBack}>← Torna al sito</window.Button>
        <window.Button onClick={() => {}}>Aggiungi al calendario</window.Button>
      </div>
    </section>
  );
};
