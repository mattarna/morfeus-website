/**
 * InsightCover — copertine SVG astratte in-brand per gli articoli Insights.
 * 7 pattern (forbice, funnel, loop-spezzato, stack-bars, grid-nodes,
 * shield-check, spark-cross). Palette DS: carta/inchiostro/firma/lilla/ombra.
 * Server component (no JS runtime).
 *
 * ViewBox 800×450 (16:9): rende bene sia come thumbnail card sia come banner.
 * Le fasce/palette (carta o inchiostro) sono passate via prop.
 */

export type CoverKind =
  | "forbice"
  | "funnel"
  | "loop-spezzato"
  | "stack-bars"
  | "grid-nodes"
  | "shield-check"
  | "spark-cross";

type Palette = {
  bg: string;
  grid: string;
  primary: string; // firma
  secondary: string; // lilla / ombra
  faint: string;
  text: string;
};

const PAL_CARTA: Palette = {
  bg: "#E4E7F0",
  grid: "rgba(83,61,252,.08)",
  primary: "#533DFC",
  secondary: "#7E8091",
  faint: "rgba(83,61,252,.10)",
  text: "#0B0B0C",
};

const PAL_INK: Palette = {
  bg: "#0B0B0C",
  grid: "rgba(140,165,247,.11)",
  primary: "#8CA5F7",
  secondary: "#7E8091",
  faint: "rgba(140,165,247,.10)",
  text: "#E4E7F0",
};

function Grid({ p }: { p: Palette }) {
  return (
    <>
      <defs>
        <pattern id="cov-grid-lt" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke={p.grid} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={p.bg} />
      <rect width="800" height="450" fill="url(#cov-grid-lt)" />
    </>
  );
}

/* ------------------- Pattern 1 · Forbice ------------------- */
function Forbice({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M60,340 C220,320 360,290 700,220 L700,90 C400,190 240,290 60,340 Z"
        fill={p.faint}
      />
      <path
        d="M60,340 C220,320 360,290 700,220"
        fill="none"
        stroke={p.secondary}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60,340 C220,280 360,180 700,90"
        fill="none"
        stroke={p.primary}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line x1="60" y1="380" x2="740" y2="380" stroke={p.grid} strokeWidth="1" />
    </g>
  );
}

/* ------------------- Pattern 2 · Funnel ------------------- */
function Funnel({ p }: { p: Palette }) {
  return (
    <g>
      <path d="M120,90 L680,90 L560,240 L560,360 L240,360 L240,240 Z" fill={p.faint} stroke={p.primary} strokeWidth="2" strokeLinejoin="round" />
      <line x1="200" y1="150" x2="600" y2="150" stroke={p.primary} strokeOpacity="0.35" strokeWidth="2" />
      <line x1="260" y1="220" x2="540" y2="220" stroke={p.primary} strokeOpacity="0.6" strokeWidth="2" />
      <line x1="300" y1="290" x2="500" y2="290" stroke={p.primary} strokeWidth="2.5" />
      <circle cx="400" cy="360" r="6" fill={p.primary} />
    </g>
  );
}

/* ------------------- Pattern 3 · Loop spezzato ------------------- */
function LoopSpezzato({ p }: { p: Palette }) {
  return (
    <g>
      <circle cx="400" cy="225" r="130" fill="none" stroke={p.secondary} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 6" />
      <path
        d="M400,95 A130,130 0 1 1 305,320"
        fill="none"
        stroke={p.primary}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="400" cy="95" r="7" fill={p.primary} />
      <circle cx="305" cy="320" r="7" fill={p.bg} stroke={p.primary} strokeWidth="3" />
      <line x1="500" y1="130" x2="540" y2="90" stroke={p.secondary} strokeOpacity="0.5" strokeWidth="2" />
      <line x1="540" y1="130" x2="500" y2="90" stroke={p.secondary} strokeOpacity="0.5" strokeWidth="2" />
    </g>
  );
}

/* ------------------- Pattern 4 · Stack bars ------------------- */
function StackBars({ p }: { p: Palette }) {
  const bars = [
    { x: 130, h: 90, o: 0.4 },
    { x: 220, h: 150, o: 0.55 },
    { x: 310, h: 210, o: 0.7 },
    { x: 400, h: 260, o: 0.85 },
    { x: 490, h: 200, o: 0.7 },
    { x: 580, h: 140, o: 0.5 },
  ];
  return (
    <g>
      <line x1="90" y1="360" x2="720" y2="360" stroke={p.grid} strokeWidth="1" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={360 - b.h}
          width="52"
          height={b.h}
          rx="4"
          fill={p.primary}
          opacity={b.o}
        />
      ))}
      <line x1="90" y1="220" x2="720" y2="220" stroke={p.secondary} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 6" />
    </g>
  );
}

/* ------------------- Pattern 5 · Grid nodes ------------------- */
function GridNodes({ p }: { p: Palette }) {
  const nodes = [
    { x: 180, y: 130 }, { x: 320, y: 130 }, { x: 480, y: 130 }, { x: 620, y: 130 },
    { x: 180, y: 225 }, { x: 320, y: 225 }, { x: 480, y: 225 }, { x: 620, y: 225 },
    { x: 180, y: 320 }, { x: 320, y: 320 }, { x: 480, y: 320 }, { x: 620, y: 320 },
  ];
  const links = [
    [0,4],[4,5],[5,1],[1,6],[6,10],[10,11],[11,7],[7,3],[2,6],[8,9]
  ];
  return (
    <g>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={p.primary}
          strokeOpacity="0.5"
          strokeWidth="2"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="12" fill={p.bg} stroke={p.primary} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="4" fill={p.primary} />
        </g>
      ))}
    </g>
  );
}

/* ------------------- Pattern 6 · Shield check ------------------- */
function ShieldCheck({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M400,80 L560,140 L560,240 C560,320 490,370 400,395 C310,370 240,320 240,240 L240,140 Z"
        fill={p.faint}
        stroke={p.primary}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M320,235 L385,300 L490,180"
        fill="none"
        stroke={p.primary}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="240" y1="140" x2="560" y2="140" stroke={p.secondary} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 6" />
    </g>
  );
}

/* ------------------- Pattern 7 · Spark cross ------------------- */
function SparkCross({ p }: { p: Palette }) {
  return (
    <g>
      <line x1="80" y1="380" x2="740" y2="380" stroke={p.grid} strokeWidth="1" />
      <path
        d="M80,340 L200,300 L280,320 L400,220 L520,240 L620,130 L740,110"
        fill="none"
        stroke={p.primary}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80,140 L200,180 L280,160 L400,240 L520,220 L620,320 L740,330"
        fill="none"
        stroke={p.secondary}
        strokeOpacity="0.7"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="400" cy="230" r="9" fill={p.bg} stroke={p.primary} strokeWidth="3" />
    </g>
  );
}

// React 19: il namespace JSX globale non c'e' piu', si passa da React.JSX
const PATTERNS: Record<CoverKind, (p: Palette) => React.JSX.Element> = {
  forbice: (p) => <Forbice p={p} />,
  funnel: (p) => <Funnel p={p} />,
  "loop-spezzato": (p) => <LoopSpezzato p={p} />,
  "stack-bars": (p) => <StackBars p={p} />,
  "grid-nodes": (p) => <GridNodes p={p} />,
  "shield-check": (p) => <ShieldCheck p={p} />,
  "spark-cross": (p) => <SparkCross p={p} />,
};

export function InsightCover({
  kind,
  variant = "carta",
  category,
  className,
}: {
  kind: CoverKind;
  variant?: "carta" | "ink";
  category?: string;
  className?: string;
}) {
  const p = variant === "ink" ? PAL_INK : PAL_CARTA;
  const draw = PATTERNS[kind] || PATTERNS.forbice;
  return (
    <svg
      className={className}
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={category ? `Illustrazione: ${category}` : "Illustrazione articolo"}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <Grid p={p} />
      {draw(p)}
      {category ? (
        <text
          x="32"
          y="42"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="14"
          letterSpacing="1.6"
          fill={p.primary}
        >
          ▸ {category.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}

/** Fallback mapping da categoria in caso `coverKind` non sia specificato nel frontmatter. */
export function coverKindFromCategory(category: string): CoverKind {
  const c = (category || "").toLowerCase();
  if (c.includes("margine") || c.includes("roi") || c.includes("margin")) return "forbice";
  if (c.includes("automa")) return "grid-nodes";
  if (c.includes("govern") || c.includes("compliance") || c.includes("act")) return "shield-check";
  if (c.includes("formaz") || c.includes("training") || c.includes("champion")) return "grid-nodes";
  if (c.includes("cost") || c.includes("prezz") || c.includes("prezzi")) return "stack-bars";
  if (c.includes("fall") || c.includes("errori")) return "loop-spezzato";
  if (c.includes("lavoro") || c.includes("cambia")) return "spark-cross";
  return "funnel";
}
