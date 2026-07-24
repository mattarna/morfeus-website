/* global React */
const { useState: useStateTY, useEffect: useEffectTY } = React;

/* ============================================================
   THANK YOU — conferma iscrizione custom (4 blocchi)
   1) Header personalizzato con nome
   2) Alert "non sei pronto"
   3) Step 1/2 community + Step 2/2 calendario
   4) Chiamata strategica (imprenditore/professionista)
   5) Condividi
   ============================================================ */

const COMMUNITY_URL = "https://morfeus-ai-playground.circle.so/join?invitation_token=3e3d851f1b5c16a3dcdd249f6ab67f37af107f74-57169ac8-4206-407a-914d-a1ef537dc2f7";
const CALL_URL      = "https://calendar.app.google/KPEsAKzdXdX6C3bX8";
const GCAL_URL      = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar%3A+come+usare+Claude+come+un+Pro+%E2%80%94+Morfeus+%7C+Matteo+Arnaboldi&dates=20260505T160000Z%2F20260505T171500Z&details=Webinar+gratuito%3A+quello+che+io+e+il+nostro+team+abbiamo+imparato+usando+Claude+per+pi%C3%B9+di+300+ore.%0A%0ALe+funzionalit%C3%A0+nascoste%2C+gli+errori+da+evitare%2C+i+workflow+che+uso+ogni+giorno.+Tutto+in+un%27ora.%0A%0A%E2%96%B6+Partecipa+qui%3A+https%3A%2F%2Fyoutube.com%2Flive%2FPa2-LKvlJ3g%3Ffeature%3Dshare%0A%0ACon+Matteo+Arnaboldi+%E2%80%94+CEO+Morfeus+Hub%0Amorfeushub.com&location=YouTube+Live+%E2%80%94+https%3A%2F%2Fyoutube.com%2Flive%2FPa2-LKvlJ3g%3Ffeature%3Dshare&ctz=Europe%2FRome";
const SHARE_URL     = typeof window !== "undefined" ? window.location.href.split("?")[0].split("#")[0] : "";
const SHARE_TEXT    = "Il 5 maggio c'è un webinar gratuito su come usare davvero Claude per lavorare meglio. Penso possa interessarti.";

window.ThankYou = function ThankYou({ submission, onBack }) {
  const firstName = (submission?.name || "").trim().split(" ")[0];
  const email     = submission?.email || "";

  const [step1Done, setStep1Done] = useStateTY(false);
  const [step2Done, setStep2Done] = useStateTY(false);

  const addToCalendar = () => {
    // 5 Maggio 2026, 18:00-19:15 CEST
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Morfeus//Webinar Claude//IT",
      "BEGIN:VEVENT",
      "UID:webinar-claude-morfeus-20260505@morfeus.it",
      "DTSTAMP:20260501T000000Z",
      "DTSTART:20260505T160000Z",
      "DTEND:20260505T171500Z",
      "SUMMARY:Webinar: come usare Claude come un Pro — Morfeus | Matteo Arnaboldi",
      "DESCRIPTION:Webinar gratuito: quello che io e il nostro team abbiamo imparato usando Claude per più di 300 ore.\\n\\nLe funzionalità nascoste\\, gli errori da evitare\\, i workflow che uso ogni giorno. Tutto in un'ora.\\n\\nPartecipa qui: https://youtube.com/live/Pa2-LKvlJ3g?feature=share\\n\\nCon Matteo Arnaboldi — CEO Morfeus Hub\\nmorfeushub.com",
      "LOCATION:YouTube Live — https://youtube.com/live/Pa2-LKvlJ3g?feature=share",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "webinar-morfeus-claude-5mag2026.ics";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStep2Done(true);
  };

  return (
    <section style={{
      maxWidth: 720, margin: "0 auto",
      padding: "72px 24px 100px",
      position: "relative", zIndex: 1,
    }}>

      {/* === Header === */}
      <window.Reveal>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 52px)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: "#fff", margin: "0 0 16px 0", textWrap: "balance",
          }}>
            Quasi fatto
            {firstName && <>, <window.Accent>{firstName}</window.Accent></>}.
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 17,
            lineHeight: 1.55, color: "var(--ghost)", opacity: 0.85,
            margin: "0 auto", maxWidth: 520,
          }}>
            Ancora un paio di cose prima di essere davvero pronto per martedì 5 maggio.
          </p>
          {email && (
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              lineHeight: 1.5, color: "var(--muted)",
              margin: "20px auto 0", maxWidth: 520,
            }}>
              Email di conferma inviata a <span style={{ color: "rgba(255,255,255,0.75)" }}>{email}</span> — se non la vedi, controlla lo spam.
            </p>
          )}
        </div>
      </window.Reveal>

      {/* === Alert === */}
      <window.Reveal delay={100}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "14px 18px",
          background: "rgba(235,122,46,0.06)",
          border: "1px solid rgba(235,122,46,0.25)",
          borderRadius: 12,
          marginBottom: 32,
        }}>
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            display: "grid", placeItems: "center",
            borderRadius: 8,
            background: "rgba(235,122,46,0.15)",
            color: "var(--orange)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4" /><path d="M12 17h.01" />
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
          </div>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: 15,
            lineHeight: 1.4, color: "var(--ghost)",
          }}>
            Non hai ancora finito.{" "}
            <span style={{ color: "var(--orange)", fontWeight: 600 }}>
              Mancano 2 step
            </span>{" "}
            prima di essere pronto.
          </div>
        </div>
      </window.Reveal>

      {/* === Step 1: Calendar === */}
      <window.Reveal delay={180}>
        <StepCard
          stepLabel="Step 1 di 2"
          done={step2Done}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
          title="Aggiungi l'evento al calendario"
          body={<>Martedì <b style={{ color: "rgba(255,255,255,0.9)" }}>5 maggio 2026, dalle 18:00 alle 19:00 (CEST)</b>. Un'ora netta, online.</>}
          cta={
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
              <a
                href={GCAL_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => setStep2Done(true)}
                style={primaryStepCTA}
                onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover, #d66d24)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Google Calendar
              </a>
              <button
                type="button" onClick={addToCalendar}
                style={secondaryStepCTA}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                File .ics (Apple, Outlook…)
              </button>
            </div>
          }
        />
      </window.Reveal>

      {/* === Step 2: Community === */}
      <window.Reveal delay={240}>
        <StepCard
          stepLabel="Step 2 di 2"
          done={step1Done}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          }
          title="Entra nella community Morfeus"
          body={<>Prima di martedì, unisciti al <b style={{ color: "rgba(255,255,255,0.9)" }}>Morfeus AI Playground</b> su Circle. È dove condividiamo prompt, workflow, clip dai workshop e dove puoi fare domande dirette al team prima e dopo il webinar.</>}
          cta={
            <a
              href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => setStep1Done(true)}
              style={secondaryStepCTA}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Entra nella community
            </a>
          }
        />
      </window.Reveal>

      {/* === LinkedIn connect (bonus, sotto gli step) === */}
      <window.Reveal delay={280}>
        <a
          href="https://www.linkedin.com/in/matteo-arnaboldi/"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "16px 20px",
            background: "rgba(10,102,194,0.06)",
            border: "1px solid rgba(10,102,194,0.22)",
            borderRadius: 12,
            marginBottom: 24,
            textDecoration: "none",
            transition: "background .2s, border-color .2s, transform .2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(10,102,194,0.10)";
            e.currentTarget.style.borderColor = "rgba(10,102,194,0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(10,102,194,0.06)";
            e.currentTarget.style.borderColor = "rgba(10,102,194,0.22)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: 40, height: 40, flexShrink: 0,
            display: "grid", placeItems: "center",
            borderRadius: 10,
            background: "#0a66c2",
            color: "#fff",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: 15, lineHeight: 1.25, letterSpacing: "-0.01em",
              color: "#fff", marginBottom: 3,
            }}>
              Connettiti con Matteo su LinkedIn
            </div>
            <div style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              lineHeight: 1.4, color: "var(--ghost)", opacity: 0.75,
            }}>
              Ti aggiorno personalmente su cosa sto costruendo ogni settimana.
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
      </window.Reveal>

      {/* === Chiamata strategica === */}
      <window.Reveal delay={320}>
        <div style={{
          position: "relative",
          padding: "32px 28px 30px",
          background: "linear-gradient(135deg, rgba(235,122,46,0.08) 0%, rgba(123,104,238,0.05) 100%)",
          border: "1px solid rgba(235,122,46,0.22)",
          borderRadius: 16,
          marginBottom: 24,
          overflow: "hidden",
        }}>
          {/* ambient glow */}
          <div aria-hidden style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(235,122,46,0.20) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: 14,
            }}>
              Non puoi aspettare martedì?
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: "clamp(22px, 2.6vw, 28px)",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              color: "#fff", margin: "0 0 14px 0", textWrap: "balance",
            }}>
              Prenota una chiamata strategica con il team.
            </h3>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 15,
              lineHeight: 1.6, color: "var(--ghost)", opacity: 0.9,
              margin: "0 0 22px 0", maxWidth: 560, textWrap: "pretty",
            }}>
              Se sei un imprenditore o un professionista e hai bisogno di capire
              <i style={{ fontFamily: "var(--font-italic)" }}> oggi </i>
              come impostare il tuo workflow con l'AI, parla direttamente con noi.
              30 minuti, senza impegno, su Google Meet.
            </p>
            <a
              href={CALL_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 22px",
                background: "var(--orange)", color: "#fff",
                fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600,
                borderRadius: 10, textDecoration: "none",
                border: "1px solid rgba(235,122,46,0.5)",
                transition: "transform .15s, background .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "#d66d24"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.background = "var(--orange)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Prenota la chiamata
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
        </div>
      </window.Reveal>

      {/* === Share === */}
      <window.Reveal delay={380}>
        <ShareBlock />
      </window.Reveal>

      {/* Footer note */}
      <window.Reveal delay={440}>
        <p style={{
          textAlign: "center",
          fontFamily: "var(--font-body)", fontSize: 13,
          lineHeight: 1.5, color: "var(--muted)",
          margin: "40px 0 0 0",
        }}>
          Martedì 5 maggio 2026 · 18:00–19:00 CEST · Online
        </p>
      </window.Reveal>

      {onBack && (
        <window.Reveal delay={500}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              type="button" onClick={onBack}
              style={{
                background: "transparent", border: "none",
                color: "var(--muted)", fontSize: 12,
                cursor: "pointer", textDecoration: "underline",
                fontFamily: "var(--font-body)",
              }}
            >
              ← Torna al sito
            </button>
          </div>
        </window.Reveal>
      )}
    </section>
  );
};

/* ------------ Step card ------------ */
function StepCard({ stepLabel, done, icon, title, body, cta }) {
  return (
    <div style={{
      position: "relative",
      padding: "26px 26px 24px",
      background: done ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.025)",
      border: `1px solid ${done ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 14,
      marginBottom: 18,
      transition: "background .3s, border-color .3s",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, marginBottom: 14,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: done ? "rgb(52,211,153)" : "var(--violet)",
        }}>
          {stepLabel}
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 11, fontWeight: 600,
          padding: "4px 10px", borderRadius: 100,
          background: done ? "rgba(52,211,153,0.12)" : "rgba(235,122,46,0.10)",
          color: done ? "rgb(52,211,153)" : "var(--orange)",
          border: `1px solid ${done ? "rgba(52,211,153,0.25)" : "rgba(235,122,46,0.22)"}`,
        }}>
          {done ? "✓ Completato" : "● Da fare"}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, flexShrink: 0,
          display: "grid", placeItems: "center",
          borderRadius: 9,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: done ? "rgb(52,211,153)" : "#fff",
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.015em",
          color: "#fff", margin: 0,
        }}>
          {title}
        </h3>
      </div>

      <p style={{
        fontFamily: "var(--font-body)", fontSize: 14,
        lineHeight: 1.55, color: "var(--ghost)", opacity: 0.82,
        margin: "0 0 18px 0", textWrap: "pretty",
      }}>
        {body}
      </p>

      {cta}
    </div>
  );
}

/* ------------ Share block ------------ */
function ShareBlock() {
  const [copied, setCopied] = useStateTY(false);
  const url = SHARE_URL || "https://morfeus.it/webinar-claude";
  const encText = encodeURIComponent(SHARE_TEXT + " " + url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = url; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch(e) {}
      document.body.removeChild(ta);
    }
  };

  return (
    <div style={{
      padding: "24px 26px",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.015em",
          color: "#fff", margin: 0,
        }}>
          Condividi con chi pensi possa servire
        </h3>
      </div>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 14,
        lineHeight: 1.55, color: "var(--ghost)", opacity: 0.80,
        margin: "0 0 18px 0",
      }}>
        Se conosci un collega, un amico imprenditore o un professionista che vuole capire come usare davvero l'AI — passaglielo.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={copyLink} style={shareBtn(copied)}>
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Link copiato
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copia link
            </>
          )}
        </button>

        <a href={`https://wa.me/?text=${encText}`} target="_blank" rel="noopener noreferrer" style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>

        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>

        <a href={`mailto:?subject=${encodeURIComponent("Webinar Morfeus × Claude — 5 maggio")}&body=${encText}`} style={shareBtn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Email
        </a>
      </div>
    </div>
  );
}

/* ------------ styles ------------ */
const primaryStepCTA = {
  display: "inline-flex", alignItems: "center", gap: 10,
  padding: "12px 20px",
  background: "var(--orange)", color: "#fff",
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
  borderRadius: 10, textDecoration: "none",
  border: "1px solid rgba(235,122,46,0.5)",
  transition: "background .15s",
  width: "100%", justifyContent: "center", boxSizing: "border-box",
};

const secondaryStepCTA = {
  display: "inline-flex", alignItems: "center", gap: 10,
  padding: "12px 20px",
  background: "rgba(255,255,255,0.02)", color: "#fff",
  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
  borderRadius: 10, cursor: "pointer",
  border: "1px solid rgba(255,255,255,0.14)",
  transition: "background .15s",
  width: "100%", justifyContent: "center", boxSizing: "border-box",
};

function shareBtn(active) {
  return {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 14px",
    background: active ? "rgba(52,211,153,0.10)" : "rgba(255,255,255,0.03)",
    color: active ? "rgb(52,211,153)" : "var(--ghost)",
    border: `1px solid ${active ? "rgba(52,211,153,0.30)" : "rgba(255,255,255,0.10)"}`,
    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
    borderRadius: 9, textDecoration: "none", cursor: "pointer",
    transition: "background .15s, border-color .15s, color .15s",
  };
}
