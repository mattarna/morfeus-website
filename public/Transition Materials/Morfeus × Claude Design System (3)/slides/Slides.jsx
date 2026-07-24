/* global React */

// ===== Section slide =================================================
window.SectionSlide = function SectionSlide({ number, label, title, italicWord, pageNum, total }) {
  const parts = title.split(italicWord || "§§§");
  return (
    <window.SlideBase variant="deep-space" label={`Section — ${title}`}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 240, lineHeight: 1, letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "2px rgba(235,122,46,0.5)",
          marginBottom: 32
        }}>{String(number).padStart(2, "0")}</div>
        <window.SlideLabel>{label}</window.SlideLabel>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 128, lineHeight: 1.02, letterSpacing: "-0.028em",
          color: "#fff", margin: "36px 0 0 0", maxWidth: 1500, textWrap: "balance"
        }}>
          {italicWord
            ? <>{parts[0]}<window.Italic>{italicWord}</window.Italic>{parts[1]}</>
            : title}
        </h1>
      </div>
      <window.SlideFooter pageNum={pageNum} total={total} />
    </window.SlideBase>
  );
};

// ===== Big Quote slide ==============================================
window.BigQuoteSlide = function BigQuoteSlide({ quote, attribution, pageNum, total }) {
  return (
    <window.SlideBase label={`Big quote`}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 1500 }}>
        <div style={{
          fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 500,
          color: "var(--orange)", fontSize: 160, lineHeight: 0.8,
          marginBottom: -40, opacity: 0.9
        }}>“</div>
        <p style={{
          fontFamily: "var(--font-display)", fontWeight: 500,
          fontSize: 80, lineHeight: 1.1, letterSpacing: "-0.02em",
          color: "#fff", margin: 0, textWrap: "balance"
        }}>
          {quote}
        </p>
        {attribution && (
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 48, height: 1, background: "var(--violet)" }} />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 22, color: "var(--muted)",
              letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700
            }}>{attribution}</span>
          </div>
        )}
      </div>
      <window.SlideFooter pageNum={pageNum} total={total} />
    </window.SlideBase>
  );
};

// ===== Bullet slide =================================================
window.BulletSlide = function BulletSlide({ label, title, italicWord, items, pageNum, total }) {
  const parts = title.split(italicWord || "§§§");
  return (
    <window.SlideBase label={`Bullets — ${title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 100, height: "100%", alignItems: "center" }}>
        <div>
          <window.SlideLabel>{label}</window.SlideLabel>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: 88, lineHeight: 1.05, letterSpacing: "-0.025em",
            color: "#fff", margin: "32px 0 0 0", textWrap: "balance"
          }}>
            {italicWord
              ? <>{parts[0]}<window.Italic>{italicWord}</window.Italic>{parts[1]}</>
              : title}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {items.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
              <span style={{
                width: 44, height: 44, minWidth: 44, borderRadius: 10,
                background: "rgba(235,122,46,0.1)", border: "2px solid var(--orange)",
                color: "var(--orange)", fontSize: 22, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4
              }}>✓</span>
              <span style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                fontSize: 28, lineHeight: 1.45, color: "var(--ghost)", opacity: 0.9
              }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <window.SlideFooter pageNum={pageNum} total={total} />
    </window.SlideBase>
  );
};

// ===== Product slide — "this is Claude" ============================
window.ProductSlide = function ProductSlide({ label, title, italicWord, body, pageNum, total }) {
  const parts = title.split(italicWord || "§§§");
  return (
    <window.SlideBase variant="night" label={`Product — ${title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, height: "100%", alignItems: "center" }}>
        <div>
          <window.SlideLabel>{label}</window.SlideLabel>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: 88, lineHeight: 1.05, letterSpacing: "-0.025em",
            color: "#fff", margin: "32px 0 32px 0", textWrap: "balance"
          }}>
            {italicWord
              ? <>{parts[0]}<window.Italic>{italicWord}</window.Italic>{parts[1]}</>
              : title}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 28, lineHeight: 1.5,
            color: "var(--ghost)", opacity: 0.85, margin: 0, maxWidth: 720
          }}>{body}</p>
        </div>
        <window.FakeClaudeWindow />
      </div>
      <window.SlideFooter pageNum={pageNum} total={total} />
    </window.SlideBase>
  );
};

// Mock Claude window — illustrative, not a pixel-perfect replica.
window.FakeClaudeWindow = function FakeClaudeWindow() {
  return (
    <div style={{
      background: "#0F0E1A",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,104,238,0.15)",
      overflow: "hidden",
      aspectRatio: "16 / 11"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "14px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
        <span style={{ marginLeft: 16, fontSize: 16, color: "var(--muted)", fontFamily: "ui-monospace, Menlo, monospace" }}>claude.ai</span>
      </div>
      <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--orange)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, background: "rgba(255,255,255,0.10)", borderRadius: 4, width: "62%", marginBottom: 10 }} />
            <div style={{ height: 14, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "85%" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <div style={{
            background: "rgba(235,122,46,0.10)",
            border: "1px solid rgba(235,122,46,0.25)",
            borderRadius: 14, padding: "14px 18px", maxWidth: "70%"
          }}>
            <div style={{ height: 12, background: "rgba(255,255,255,0.2)", borderRadius: 4, width: 260, marginBottom: 8 }} />
            <div style={{ height: 12, background: "rgba(255,255,255,0.15)", borderRadius: 4, width: 180 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--orange)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, background: "rgba(255,255,255,0.10)", borderRadius: 4, width: "90%", marginBottom: 10 }} />
            <div style={{ height: 14, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "74%", marginBottom: 10 }} />
            <div style={{ height: 14, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "45%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
