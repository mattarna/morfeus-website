/* global React */

// ===== Title slide ==================================================
window.TitleSlide = function TitleSlide({ eyebrow, title, italicWord, subtitle, meta, pageNum, total }) {
  const parts = title.split(italicWord || "§§§");
  return (
    <window.SlideBase label={`01 Title`}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 1500 }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            padding: "12px 22px", borderRadius: 100,
            background: "rgba(235,122,46,0.10)",
            border: "1px solid rgba(235,122,46,0.25)",
            color: "var(--orange)", fontSize: 18, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase"
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "var(--orange)", boxShadow: "0 0 10px rgba(235,122,46,0.6)"
            }} />
            {eyebrow}
          </span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: 140, lineHeight: 1.02, letterSpacing: "-0.028em",
          color: "#fff", margin: 0, textWrap: "balance"
        }}>
          {italicWord
            ? <>{parts[0]}<window.Italic>{italicWord}</window.Italic>{parts[1]}</>
            : title}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 32,
            lineHeight: 1.4, color: "var(--ghost)", opacity: 0.85,
            margin: "44px 0 0 0", maxWidth: 1100
          }}>{subtitle}</p>
        )}
        {meta && (
          <div style={{
            marginTop: 56, display: "flex", gap: 28, alignItems: "center",
            fontSize: 20, color: "var(--muted)", letterSpacing: "0.05em"
          }}>
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ opacity: 0.4 }}>·</span>}
                <span>{m}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <window.SlideFooter pageNum={pageNum} total={total} />
    </window.SlideBase>
  );
};
