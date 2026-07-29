/* global React */

/* ============================================================
   LETTERA DI MATT — sezione lettera aperta dopo Hero
   Nessun label, sfondo deep-space, firma con foto placeholder.
   ============================================================ */

window.LetterSection = function LetterSection({ onCtaClick }) {
  // Local accent that works on cream paper — burnt orange, underline for emphasis
  const H = ({ children }) => (
    <span style={{
      fontFamily: "var(--font-italic)", fontStyle: "italic",
      fontWeight: 600,
      color: "#C85A15",
      backgroundImage: "linear-gradient(to bottom, transparent 82%, rgba(200,90,21,0.25) 82%)",
      backgroundRepeat: "no-repeat",
    }}>{children}</span>
  );

  // Full italic, warm letter paragraphs — updated to v4 copy
  const paragraphs = [
    <>
      Quando ho iniziato a usare Claude facevo come tutti.<br />
      Gli facevo una domanda. Lui rispondeva. Io copiavo e incollavo.
    </>,
    <>
      Funzionava? Sì. Ma dopo un po' ho iniziato a sentire
      che c'era qualcosa che non vedevo.
      Qualcosa che lo strumento poteva fare e che io non gli stavo chiedendo.
    </>,
    <>Così ho iniziato a scavare.</>,
    <>
      Non i tutorial da 10 minuti su YouTube.
      Non i thread con <span style={{ opacity: 0.75 }}>«10 prompt che ti cambiano la vita»</span>.
      Quelli li avevo già provati. Non funzionano.
    </>,
    <>
      Ho iniziato a usare Claude nel mio lavoro reale,
      ogni giorno, su problemi veri.<br />
      Gestisco un'azienda che lavora con l'AI da oltre 4 anni.
      Non è un hobby. È quello che faccio.<br />
      A sbagliare. A capire perché sbagliavo.
      A rifare da capo con un approccio diverso.
    </>,
    <>
      +300 ore dopo, quello che ho trovato <H>ha cambiato il modo in cui lavoro</H>.
    </>,
    <>
      Non parlo di «risparmiare un po' di tempo».
      Parlo di avere un collaboratore che conosce il mio contesto,
      segue le mie regole, produce al mio standard.
      Ogni giorno. Senza che io debba ricominciare da zero ogni volta.
    </>,
    <>
      La cosa che mi ha sorpreso di più?<br />
      Non erano le feature che non conoscevo.
      Era il modo in cui ragionavo con lo strumento.
      Quello era l'errore. E nessuno ne parla.
    </>,
    <>
      Ho deciso di fare questo webinar perché credo
      che quelle +300 ore non debbano essere necessarie.
    </>,
    <>
      In una sera ti mostro cosa ho trovato.
      Quello che funziona, quello che non funziona,
      e <H>l'approccio che cambia tutto</H>.
    </>,
    <>Poi decidi tu cosa farne.</>,
  ];

  return (
    <section style={{
      // Warm cream backdrop contrasted with page — feels like a letter laid on a table
      background: `
        radial-gradient(ellipse at top, rgba(235,122,46,0.06), transparent 60%),
        linear-gradient(180deg, rgba(15,14,26,0.0) 0%, rgba(25,21,35,0.35) 8%, rgba(25,21,35,0.35) 92%, rgba(15,14,26,0.0) 100%)
      `,
      padding: "100px 24px 120px",
      position: "relative", zIndex: 1,
    }}>
      <window.Reveal>
        <div style={{
          maxWidth: 760, margin: "0 auto",
          position: "relative",
        }}>
          {/* The "paper" */}
          <div style={{
            position: "relative",
            background: `
              linear-gradient(180deg, #F5EFE4 0%, #EFE7D8 100%)
            `,
            color: "#2A2420",
            padding: "clamp(48px, 7vw, 88px) clamp(32px, 6vw, 80px)",
            borderRadius: 4,
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.08),
              0 30px 80px -20px rgba(0,0,0,0.55),
              0 60px 120px -40px rgba(0,0,0,0.45)
            `,
            // Subtle paper texture — noise via layered gradients
            backgroundBlendMode: "normal",
          }}>
            {/* Ruled lines hint — very faint */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "repeating-linear-gradient(180deg, transparent 0 31px, rgba(42,36,32,0.035) 31px 32px)",
              borderRadius: 4,
              mixBlendMode: "multiply",
            }} />

            {/* Date + location — top right, subtle */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: 32,
              position: "relative", zIndex: 1,
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
              color: "#6B5E54", letterSpacing: "0.10em", textTransform: "uppercase",
            }}>
              <span>Una lettera aperta</span>
              <span>Milano, aprile 2026</span>
            </div>

            {/* Salutation */}
            <div style={{
              fontFamily: "var(--font-italic)", fontStyle: "italic",
              fontSize: 22, lineHeight: 1.3,
              color: "#2A2420", opacity: 0.65,
              marginBottom: 36,
              position: "relative", zIndex: 1,
              letterSpacing: "0.01em",
            }}>
              Ciao,
            </div>

            {/* Body — ALL italic */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 22,
              position: "relative", zIndex: 1,
            }}>
              {paragraphs.map((p, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-italic)", fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(17px, 1.5vw, 19px)",
                  lineHeight: 1.75,
                  color: "#2A2420",
                  margin: 0, textWrap: "pretty",
                  letterSpacing: "0.005em",
                }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature block */}
            <div style={{
              marginTop: 56,
              position: "relative", zIndex: 1,
            }}>
              {/* Handwritten-style signature */}
              <div style={{
                fontFamily: "var(--font-italic)", fontStyle: "italic",
                fontWeight: 500,
                fontSize: 34, lineHeight: 1,
                color: "#2A2420",
                letterSpacing: "0.01em",
                transform: "rotate(-2deg)",
                transformOrigin: "left center",
                marginBottom: 14,
                display: "inline-block",
              }}>
                Matteo
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 13, fontWeight: 500,
                color: "#6B5E54", letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                Matteo Arnaboldi · CEO & Co-Founder, Morfeus Hub
              </div>
            </div>
          </div>

          {/* CTA after the letter */}
          <div style={{
            marginTop: 56,
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 14,
          }}>
            <window.Button onClick={onCtaClick} size="lg" pulse>
              Ok Matt, ci sono <span style={{ fontSize: 18 }}>→</span>
            </window.Button>
            <div style={{
              fontSize: 13, color: "var(--muted)", fontWeight: 500,
            }}>
              Martedì 5 Maggio, ore 18:00. Gratuito.
            </div>
          </div>
        </div>
      </window.Reveal>
    </section>
  );
};


/* ============================================================
   COSA VEDRAI / IN UNA SERA — 2×2 grid + CTA intermedio
   ============================================================ */

window.LearnSection = function LearnSection({ onCtaClick }) {
  const items = [
    {
      n: "01",
      t: "Le funzionalità che il 95% non sa che esistono",
      b: "Projects, CoWork, Skills, Plugin. Non le basi. L'utilizzo avanzato che trasforma Claude da chatbot a strumento di lavoro reale.",
    },
    {
      n: "02",
      t: "L'approccio che cambia tutto",
      b: "Il problema non sono le feature che non conosci. È il modo in cui ragioni con lo strumento. \"Fai tutto tu\" è l'errore più costoso che puoi fare con l'AI. Ti mostro l'alternativa.",
    },
    {
      n: "03",
      t: "Demo live dal mio lavoro quotidiano",
      b: "Niente slide, niente teoria. Ti faccio vedere esattamente come uso Claude ogni giorno: cosa gli chiedo, come lo correggo, perché funziona. Poi puoi replicarlo nel tuo.",
    },
    {
      n: "04",
      t: "Dove porta tutto questo quando lo padroneggi",
      b: "Il mio team AI: sistemi che lavorano con me, conoscono il mio contesto, seguono le mie regole e producono al mio standard. Non è fantascienza — è quello che succede quando conosci lo strumento a fondo.",
    },
  ];

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto",
      padding: "120px 32px",
      position: "relative", zIndex: 1,
    }}>
      <window.Reveal>
        <window.SectionLabel>In una sera</window.SectionLabel>
      </window.Reveal>

      <window.Reveal delay={80}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05, letterSpacing: "-0.025em",
          color: "#fff", margin: "24px 0 20px 0",
          maxWidth: 820, textWrap: "balance",
        }}>
          Le <window.Accent>4 cose</window.Accent> che cambiano come lavori con Claude
        </h2>
      </window.Reveal>

      <window.Reveal delay={140}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6,
          color: "var(--ghost)", opacity: 0.80,
          margin: "0 0 72px 0", maxWidth: 640,
          textWrap: "pretty",
        }}>
          Non "prompt engineering base". Non "scrivi prompt migliori".
          Workflow concreti che usano le feature vere di Claude — quelle
          che il 95% della gente non sa nemmeno esistano.
        </p>
      </window.Reveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
      }} className="learn-grid">
        {items.map((it, i) => (
          <window.Reveal key={it.n} delay={i * 60}>
            <window.LearnCard n={it.n} title={it.t} body={it.b} />
          </window.Reveal>
        ))}
      </div>

      {/* CTA intermedio */}
      <window.Reveal delay={260}>
        <div style={{
          marginTop: 64,
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 14,
        }}>
          <window.Button onClick={onCtaClick} size="lg" pulse>
            Voglio vedere tutto questo <span style={{ fontSize: 18 }}>→</span>
          </window.Button>
          <div style={{
            fontSize: 13, color: "var(--muted)", fontWeight: 500,
          }}>
            Gratuito. Un'ora. Il 5 maggio alle 18:00.
          </div>
        </div>
      </window.Reveal>

      <style>{`
        @media (max-width: 720px) {
          .learn-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

/* Single card for the LearnSection — hover lift, orange number, title, body */
window.LearnCard = function LearnCard({ n, title, body }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "36px 34px 38px",
        background: hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? "rgba(235,122,46,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        height: "100%",
        transition: "border-color .25s, background .25s, transform .25s",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        display: "flex", flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: 15, letterSpacing: "0.02em",
        color: "var(--orange)", marginBottom: 20,
        fontVariantNumeric: "tabular-nums",
      }}>
        {n} <span style={{ opacity: 0.4, fontWeight: 400, margin: "0 2px" }}>/</span>
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.015em",
        color: "#fff", margin: "0 0 14px 0",
        textWrap: "balance",
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6,
        color: "var(--ghost)", opacity: 0.78,
        margin: 0, textWrap: "pretty",
      }}>
        {body}
      </p>
    </div>
  );
};

/* ============================================================
   PER CHI È — 4 punti + chiusura 3 righe
   ============================================================ */

window.AudienceSection = function AudienceSection() {
  const points = [
    "Usi Claude o ChatGPT ma senti che stai grattando la superficie.",
    "Hai provato a fare qualcosa di avanzato e i risultati ti hanno deluso.",
    "Sei un professionista, freelance o imprenditore che vuole lavorare meglio, non solo più veloce.",
    "Hai un'ora libera il 5 maggio e abbastanza curiosità per scoprire cosa ti stai perdendo.",
  ];

  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto",
      padding: "120px 32px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      position: "relative", zIndex: 1,
    }}>
      <window.Reveal>
        <window.SectionLabel>È per te se</window.SectionLabel>
      </window.Reveal>

      <window.Reveal delay={80}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(38px, 5vw, 56px)",
          lineHeight: 1.05, letterSpacing: "-0.025em",
          color: "#fff", margin: "24px 0 56px 0",
          maxWidth: 820, textWrap: "balance",
        }}>
          Questo webinar è <window.Accent>per te</window.Accent> se
        </h2>
      </window.Reveal>

      <ul style={{
        listStyle: "none", margin: 0, padding: 0,
        display: "flex", flexDirection: "column", gap: 16,
        maxWidth: 820,
      }}>
        {points.map((p, i) => (
          <window.Reveal key={p} delay={i * 60} as="li">
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              padding: "22px 26px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600, fontSize: 22,
                color: "var(--violet)",
                minWidth: 32, lineHeight: 1.3,
                fontVariantNumeric: "tabular-nums",
              }}>0{i + 1}</span>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 17, lineHeight: 1.5,
                color: "var(--ghost)", opacity: 0.92,
              }}>{p}</span>
            </div>
          </window.Reveal>
        ))}
      </ul>

      {/* Chiusura 3 righe — stacked, italic-ish */}
      <window.Reveal delay={320}>
        <div style={{
          marginTop: 64,
          display: "flex", flexDirection: "column", gap: 6,
          maxWidth: 640,
        }}>
          <p style={closingLine}>Non serve esperienza tecnica.</p>
          <p style={closingLine}>Non serve saper programmare.</p>
          <p style={{ ...closingLine, color: "#fff", opacity: 1 }}>
            Serve <window.Accent>volerlo sapere</window.Accent>.
          </p>
        </div>
      </window.Reveal>
    </section>
  );
};

const closingLine = {
  fontFamily: "var(--font-display)", fontWeight: 500,
  fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.3,
  color: "var(--ghost)", opacity: 0.88,
  margin: 0, letterSpacing: "-0.01em",
};

/* ============================================================
   CHI È MATT — bio con foto placeholder, 4 blocchi
   ============================================================ */

window.HostSection = function HostSection() {
  const H = window.Accent;
  return (
    <section style={{
      maxWidth: 1120, margin: "0 auto",
      padding: "120px 32px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      position: "relative", zIndex: 1,
    }}>
      <window.Reveal>
        <window.SectionLabel>Chi parla</window.SectionLabel>
      </window.Reveal>

      <div style={{
        marginTop: 48,
        display: "grid", gap: 56,
        gridTemplateColumns: "280px 1fr",
        alignItems: "start",
      }} className="host-grid">
        <window.Reveal delay={80}>
          <div style={{
            width: 240, height: 240, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(101,88,212,0.25) 0%, rgba(235,122,46,0.20) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 72,
              color: "#fff", opacity: 0.55, letterSpacing: "-0.03em",
            }}>MA</span>
            <span style={{
              position: "absolute", bottom: 14, left: "50%",
              transform: "translateX(-50%)",
              fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase",
              color: "var(--muted)", fontWeight: 700,
            }}>Foto placeholder</span>
          </div>
        </window.Reveal>

        <window.Reveal delay={140}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 44px)",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: "#fff", margin: "0 0 10px 0",
            }}>
              Matteo Arnaboldi
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500,
              color: "var(--ghost)", opacity: 0.7,
              margin: "0 0 32px 0", letterSpacing: "0.01em",
            }}>
              CEO e Co-Founder di Morfeus Hub
            </p>

            {/* Block 1 — Morfeus / contesto azienda */}
            <p style={bioPara}>
              Morfeus è un'azienda che lavora con l'AI da oltre 4 anni.
              Aiutiamo professionisti e aziende a integrare l'intelligenza artificiale
              nel loro lavoro con metodo, non con l'hype.
              Partner Asseprim Confcommercio.
            </p>

            {/* Block 2 — utilizzo Claude */}
            <p style={bioPara}>
              <H>+300 ore</H> di utilizzo avanzato di Claude.<br/>
              +180 ore di CoWork mode.
            </p>
            <p style={bioPara}>
              Non parlo di AI per sentito dire.
              La uso ogni giorno per costruire sistemi, workflow e processi
              che funzionano nel mio lavoro e in quello dei miei clienti.
            </p>
            <p style={bioPara}>
              Ho costruito il mio team di dipendenti AI.
              Non è un concetto teorico. È il modo in cui gestisco la mia azienda.
            </p>

            {/* Block 3 — istituzioni */}
            <div style={{
              margin: "28px 0", padding: "20px 22px",
              background: "rgba(123,104,238,0.06)",
              border: "1px solid rgba(123,104,238,0.20)",
              borderRadius: 12, maxWidth: 620,
            }}>
              <p style={{ ...bioPara, margin: 0, opacity: 1 }}>
                Docente H-FARM.<br/>
                Formatore Il Sole 24 Ore Formazione e Talent Garden.
              </p>
            </div>

            {/* Block 4 — LinkedIn */}
            <p style={{ ...bioPara, marginBottom: 28 }}>
              Su LinkedIn condivido quello che imparo.{" "}
              <b style={{ color: "#fff" }}>16.000 professionisti</b> mi seguono per questo.
            </p>

            <a
              href="https://www.linkedin.com/in/matteo-arnaboldi/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "var(--ghost)", textDecoration: "none",
                fontSize: 14, fontWeight: 500,
                transition: "border-color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--orange)";
                e.currentTarget.style.background = "rgba(235,122,46,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
              </svg>
              Profilo LinkedIn
            </a>
          </div>
        </window.Reveal>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .host-grid {
            grid-template-columns: 1fr !important;
            justify-items: start !important;
          }
        }
      `}</style>
    </section>
  );
};

const bioPara = {
  fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6,
  color: "var(--ghost)", opacity: 0.88,
  margin: "0 0 18px 0", maxWidth: 620,
};
