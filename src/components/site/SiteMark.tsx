/**
 * Animated Morfeus "AI-core" mark — pure CSS/SVG, no JS (server component).
 * Hexagon core + concentric rings + rotating dashed rings + orbiting glow
 * dots + breathing halo. Decorative: aria-hidden. Styles live in site.css.
 */
export function SiteMark() {
  return (
    <div className="mark" aria-hidden>
      <div className="halo" />
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="dash d1" />
      <div className="dash d2" />
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />
      <div className="hex">
        <div className="h1c" />
        <div className="h2c" />
        <div className="core">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
