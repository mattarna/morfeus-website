/* global React, ReactDOM */
const { useState } = React;

// ===== Logo =========================================================
window.Logo = function Logo({ variant = "horizontal", height = 28 }) {
  const src =
    variant === "symbol" ? "../../assets/logo/m-w.png"
    : variant === "stacked" ? "../../assets/logo/m-w3.png"
    : "../../assets/logo/m-w2.png";
  return <img src={src} alt="Morfeus" style={{ height, display: "block" }} />;
};

// ===== Header =======================================================
window.Header = function Header() {
  return (
    <header style={{
      padding: "22px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "relative", zIndex: 2,
      maxWidth: 1120, margin: "0 auto", width: "100%", boxSizing: "border-box"
    }}>
      <window.Logo variant="horizontal" height={24} />
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        fontSize: 13, color: "var(--muted)", fontWeight: 500
      }}>
        <span style={{ letterSpacing: "0.08em" }}>Un evento Morfeus</span>
      </div>
    </header>
  );
};

// ===== Badge ========================================================
window.Badge = function Badge({ children, pulsingDot = true }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "8px 16px", borderRadius: 100,
      background: "rgba(235,122,46,0.10)",
      border: "1px solid rgba(235,122,46,0.25)",
      color: "var(--orange)", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase"
    }}>
      {pulsingDot && (
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--orange)",
          boxShadow: "0 0 8px rgba(235,122,46,0.6)",
          animation: "badge-pulse 2s infinite"
        }} />
      )}
      {children}
    </span>
  );
};

// ===== SectionLabel =================================================
window.SectionLabel = function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      fontSize: 13, fontWeight: 700, color: "var(--violet)",
      letterSpacing: "0.20em", textTransform: "uppercase"
    }}>
      <span style={{ width: 24, height: 1, background: "var(--violet)", opacity: 0.5 }} />
      {children}
    </span>
  );
};

// ===== Button =======================================================
window.Button = function Button({ children, onClick, kind = "primary", size = "md", disabled }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const primary = kind === "primary";
  const pad = size === "lg" ? "18px 28px" : "16px 22px";
  const fs = size === "lg" ? 17 : 16;
  const style = primary ? {
    background: press ? "var(--orange-pressed)" : hover ? "var(--orange-hover)" : "var(--orange)",
    color: "#fff",
    boxShadow: hover ? "0 6px 28px rgba(235,122,46,0.5)" : "0 4px 20px rgba(235,122,46,0.35)",
    transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
    border: "none",
  } : {
    background: "transparent", color: "var(--ghost)",
    border: "1px solid rgba(255,255,255,0.12)", boxShadow: "none"
  };
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        fontFamily: "var(--font-body)", fontWeight: 700, fontSize: fs,
        padding: pad, borderRadius: 10, cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background .2s, box-shadow .2s, transform .2s",
        display: "inline-flex", alignItems: "center", gap: 10,
        ...style
      }}>
      {children}
    </button>
  );
};

// ===== Input ========================================================
window.Input = function Input({ value, onChange, placeholder, type = "text", onSubmit }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      onKeyDown={e => e.key === "Enter" && onSubmit?.()}
      style={{
        fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16,
        color: "#fff", background: focus ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
        border: `1px solid ${focus ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 10, padding: "15px 16px",
        outline: "none", flex: 1, minWidth: 0,
        transition: "border-color .2s, background .2s",
        boxShadow: focus ? "0 0 0 4px rgba(235,122,46,0.08)" : "none",
        width: "100%", boxSizing: "border-box"
      }}
    />
  );
};

// ===== Check + Bulleted list ========================================
window.CheckItem = function CheckItem({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <span style={{
        width: 26, height: 26, minWidth: 26, borderRadius: 6,
        background: "rgba(235,122,46,0.1)", border: "1px solid var(--orange)",
        color: "var(--orange)", fontSize: 14, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2
      }}>✓</span>
      <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ghost)", opacity: 0.88 }}>{children}</span>
    </div>
  );
};

// ===== Card =========================================================
window.Card = function Card({ children, number }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "rgba(235,122,46,0.4)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14,
        padding: 28,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
        transition: "all .3s cubic-bezier(.4,0,.2,1)"
      }}
    >
      {number != null && (
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 28, color: "var(--orange)", letterSpacing: "-0.02em",
          marginBottom: 12
        }}>{String(number).padStart(2, "0")}</div>
      )}
      {children}
    </div>
  );
};

// ===== Footer =======================================================
window.Footer = function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 24, flexWrap: "wrap",
      maxWidth: 1120, margin: "0 auto", width: "100%", boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <window.Logo variant="symbol" height={22} />
        <span style={{ fontSize: 13, color: "var(--muted)" }}>Un evento Morfeus · morfeushub.com</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)" }}>
        © 2026 Morfeus · <a href="#" style={{ color: "var(--muted)" }}>Privacy</a> · <a href="#" style={{ color: "var(--muted)" }}>Termini</a>
      </div>
    </footer>
  );
};
