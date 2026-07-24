/* global React */
// Slide primitives — shared across slide types.

window.SlideBase = function SlideBase({ children, variant = "night", bleed = false, label }) {
  const bg = variant === "deep-space" ? "#0F0E1A"
           : variant === "dusk" ? "#1A1535"
           : "#0B0B0C";
  return (
    <section
      data-screen-label={label}
      data-om-validate
      style={{
        width: 1920, height: 1080, background: bg,
        position: "relative", overflow: "hidden",
        fontFamily: "var(--font-body)", color: "var(--ghost)"
      }}>
      {/* Atmosphere overlay — always */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse at 15% 10%, rgba(101,88,212,0.12) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 90%, rgba(235,122,46,0.10) 0%, transparent 50%)
        `
      }} />
      <div style={{ position: "relative", width: "100%", height: "100%", padding: bleed ? 0 : "80px 96px", boxSizing: "border-box" }}>
        {children}
      </div>
      <window.SlideChrome />
    </section>
  );
};

window.SlideChrome = function SlideChrome() {
  return (
    <>
      {/* Morfeus mark bottom-left */}
      <img src="../assets/logo/m-w2.png" alt="Morfeus"
        style={{ position: "absolute", bottom: 40, left: 48, height: 28, opacity: 0.85 }} />
      {/* hairline bottom */}
      <div style={{
        position: "absolute", left: 96, right: 96, bottom: 84,
        height: 1, background: "rgba(255,255,255,0.06)"
      }} />
    </>
  );
};

window.SlideLabel = function SlideLabel({ children }) {
  return (
    <span style={{
      fontFamily: "var(--font-body)", fontWeight: 700,
      fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase",
      color: "var(--violet)", display: "inline-flex", alignItems: "center", gap: 20
    }}>
      <span style={{ width: 48, height: 1, background: "var(--violet)", opacity: 0.5 }} />
      {children}
    </span>
  );
};

window.Italic = function Italic({ children, color = "var(--orange)" }) {
  return (
    <span style={{
      fontFamily: "var(--font-italic)", fontStyle: "italic",
      fontWeight: 500, color
    }}>{children}</span>
  );
};

window.SlideFooter = function SlideFooter({ pageNum, total }) {
  return (
    <div style={{
      position: "absolute", bottom: 40, right: 48,
      fontSize: 14, color: "var(--muted)", letterSpacing: "0.10em",
      fontFamily: "ui-monospace, Menlo, monospace"
    }}>
      {pageNum != null && total != null ? `${String(pageNum).padStart(2,'0')} / ${String(total).padStart(2,'0')}` : null}
    </div>
  );
};
