/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   Logo + Header + Footer
   ============================================================ */

window.Logo = function Logo({ variant = "horizontal", height = 28 }) {
  const src =
    variant === "symbol"  ? window.__resources.logoSymbol
    : variant === "stacked" ? window.__resources.logoStacked
    : window.__resources.logoHorizontal;
  return <img src={src} alt="Morfeus" style={{ height, display: "block" }} />;
};

window.Header = function Header() {
  return (
    <header style={{
      padding: "22px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "relative", zIndex: 2,
      maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box",
    }}>
      <window.Logo variant="horizontal" height={24} />
      <div style={{
        fontSize: 12, color: "var(--muted)", fontWeight: 500,
        letterSpacing: "0.08em",
      }}>
        Un evento Morfeus
      </div>
    </header>
  );
};

window.Footer = function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 24, flexWrap: "wrap",
      maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <window.Logo variant="symbol" height={22} />
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          Morfeus Hub · morfeushub.com
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)" }}>
        <a href="#" style={{ color: "var(--muted)" }}>Privacy Policy</a>
        <span style={{ margin: "0 10px" }}>·</span>
        © 2026 Morfeus Hub. Tutti i diritti riservati.
      </div>
    </footer>
  );
};

/* ============================================================
   Badge + SectionLabel
   ============================================================ */

window.Badge = function Badge({ children, pulsingDot = true }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "8px 16px", borderRadius: 100,
      background: "rgba(235,122,46,0.10)",
      border: "1px solid rgba(235,122,46,0.25)",
      color: "var(--orange)", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
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

window.SectionLabel = function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      fontSize: 13, fontWeight: 700, color: "var(--violet)",
      letterSpacing: "0.20em", textTransform: "uppercase",
    }}>
      <span style={{ width: 24, height: 1, background: "var(--violet)", opacity: 0.5 }} />
      {children}
    </span>
  );
};

/* ============================================================
   Button
   ============================================================ */

window.Button = function Button({
  children, onClick, kind = "primary", size = "md",
  disabled, fullWidth, pulse = false,
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const primary = kind === "primary";
  const pad = size === "lg" ? "20px 32px" : "16px 24px";
  const fs = size === "lg" ? 17 : 16;
  const style = primary ? {
    background: press ? "var(--orange-pressed)" : hover ? "var(--orange-hover)" : "var(--orange)",
    color: "#fff",
    boxShadow: hover
      ? "0 6px 28px rgba(235,122,46,0.5)"
      : "0 4px 20px rgba(235,122,46,0.35)",
    transform: hover && !press ? "translateY(-1px)" : "translateY(0)",
    border: "none",
    animation: pulse ? "btn-pulse 2.4s infinite" : "none",
  } : {
    background: "transparent", color: "var(--ghost)",
    border: "1px solid rgba(255,255,255,0.14)", boxShadow: "none",
  };
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        fontFamily: "var(--font-body)", fontWeight: 700, fontSize: fs,
        padding: pad, borderRadius: 10,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background .2s, box-shadow .2s, transform .2s",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 10, width: fullWidth ? "100%" : "auto",
        ...style,
      }}>
      {children}
    </button>
  );
};

/* ============================================================
   Input + Select
   ============================================================ */

window.Input = function Input({
  value, onChange, placeholder, type = "text",
  onSubmit, autoFocus,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type} value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onKeyDown={e => e.key === "Enter" && onSubmit?.()}
      style={{
        fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16,
        color: "#fff",
        background: focus ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
        border: `1px solid ${focus ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 10, padding: "16px 18px",
        outline: "none", flex: 1, minWidth: 0,
        transition: "border-color .2s, background .2s, box-shadow .2s",
        boxShadow: focus ? "0 0 0 4px rgba(235,122,46,0.08)" : "none",
        width: "100%", boxSizing: "border-box",
      }}
    />
  );
};

window.Select = function Select({ value, onChange, options, placeholder }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16,
          color: value ? "#fff" : "rgba(255,255,255,0.5)",
          background: focus ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
          border: `1px solid ${focus ? "var(--orange)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 10, padding: "16px 18px",
          outline: "none", width: "100%", boxSizing: "border-box",
          appearance: "none", WebkitAppearance: "none",
          cursor: "pointer",
          transition: "border-color .2s, background .2s, box-shadow .2s",
          boxShadow: focus ? "0 0 0 4px rgba(235,122,46,0.08)" : "none",
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
      </select>
      <svg
        width="12" height="8" viewBox="0 0 12 8" fill="none"
        style={{
          position: "absolute", right: 18, top: "50%",
          transform: "translateY(-50%)", pointerEvents: "none",
          color: "var(--muted)",
        }}>
        <path d="M1 1.5 L6 6.5 L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

window.Checkbox = function Checkbox({ checked, onChange, children }) {
  return (
    <label style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      cursor: "pointer", userSelect: "none",
      fontSize: 14, lineHeight: 1.5, color: "var(--ghost)", opacity: 0.8,
    }}>
      <input
        type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{
          width: 18, height: 18, marginTop: 2, accentColor: "var(--orange)",
          cursor: "pointer", flexShrink: 0,
        }}
      />
      <span>{children}</span>
    </label>
  );
};

/* ============================================================
   CheckItem (bullet con check arancione)
   ============================================================ */

window.CheckItem = function CheckItem({ title, body }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <span style={{
        width: 28, height: 28, minWidth: 28, borderRadius: 8,
        background: "rgba(235,122,46,0.10)",
        border: "1px solid var(--orange)",
        color: "var(--orange)", fontSize: 14, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 3,
      }}>✓</span>
      <div>
        {title && (
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: 18, lineHeight: 1.35, color: "#fff",
            marginBottom: body ? 6 : 0,
          }}>{title}</div>
        )}
        {body && (
          <div style={{
            fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55,
            color: "var(--ghost)", opacity: 0.80,
          }}>{body}</div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   Countdown — target 2026-05-05 18:00 CET
   ============================================================ */

window.Countdown = function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  if (diff <= 0) {
    return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "14px 22px", borderRadius: 12,
        background: "rgba(235,122,46,0.12)",
        border: "1px solid rgba(235,122,46,0.35)",
        color: "var(--orange)", fontSize: 15, fontWeight: 700,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--orange)", boxShadow: "0 0 10px rgba(235,122,46,0.8)",
          animation: "badge-pulse 1.2s infinite",
        }} />
        Il webinar è iniziato —{" "}
        <a href="#" style={{ color: "var(--orange)", textDecoration: "underline" }}>guardalo ora</a>
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, "0");
  const Cell = ({ n, label }) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      minWidth: 64,
    }}>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 600,
        fontSize: 34, lineHeight: 1, color: "#fff",
        letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums",
      }}>{pad(n)}</span>
      <span style={{
        fontSize: 10, fontWeight: 700, color: "var(--muted)",
        letterSpacing: "0.20em", textTransform: "uppercase",
        marginTop: 8,
      }}>{label}</span>
    </div>
  );
  const Sep = () => (
    <span style={{
      fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 28,
      color: "rgba(255,255,255,0.2)", lineHeight: 1, alignSelf: "flex-start",
      marginTop: 2,
    }}>:</span>
  );

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 14,
      padding: "20px 28px", borderRadius: 14,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <Cell n={days} label="Giorni" />
      <Sep />
      <Cell n={hours} label="Ore" />
      <Sep />
      <Cell n={mins} label="Min" />
      <Sep />
      <Cell n={secs} label="Sec" />
    </div>
  );
};

/* ============================================================
   useReveal — intersection-observer fade+rise on scroll
   ============================================================ */

/* Reveal: elements are always visible; a lightweight CSS fade-in-up plays
   on mount. No IntersectionObserver (which was breaking screenshots and
   slow-paint renders). */
window.Reveal = function Reveal({ children, delay = 0, as = "div", style }) {
  const El = as;
  return (
    <El
      style={{
        ...style,
        animation: `reveal-in .7s cubic-bezier(.4,0,.2,1) both`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </El>
  );
};

/* ============================================================
   Italic accent helper
   ============================================================ */

window.Accent = function Accent({ children }) {
  return (
    <span style={{
      fontFamily: "var(--font-italic)", fontStyle: "italic",
      fontWeight: 500, color: "var(--orange)",
    }}>{children}</span>
  );
};
