/* ============================================================
   IL NUCLEO — il visual dell'hero.
   ------------------------------------------------------------
   Riscrittura DS di LabVisualCore, che NON viene toccato: e' un
   componente condiviso e vive di suo su /lab.

   Cosa si conserva (e' la parte "fighissima" da non buttare):
   i quattro nodi con le stesse etichette — CHAMPIONS, COMPLIANCE,
   PROCESSES, AUTONOMY — che orbitano un centro e ci si collegano.
   L'idea e' quella: le quattro cose che il programma innesta.

   Cosa cambia, e perche':

   · COLORE. L'originale e' costruito sul fucsia (rgba(217,70,239)).
     Nel DS quel tono e' un colore-PRODOTTO della pelle Playground,
     non un colore di Morfeus: qui l'unica luce e' il viola-lampada.

   · MOVIMENTO. L'originale insegue il mouse con un tilt 3D a molla,
     su un listener `mousemove` sull'intera finestra. Il DS scrive
     "Motion: SOBRIO — solo feedback. Nessuna entrata orchestrata".
     Quindi niente inseguimento: resta un solo battito sul centro,
     dello stesso tipo dei pallini di stato che il DS gia' anima
     (.badge--verify .dot, .scan-head .on .dot). Come effetto
     collaterale sparisce anche un listener globale non passivo che
     girava a ogni movimento del mouse su tutta la pagina.

   · MATERIA. Niente glow sui tratti: le linee restano hairline e la
     profondita' viene dall'alone DIETRO (.iso). E' la LEGGE 03 del
     DS: "se illumini le linee ottieni il neon; se illumini lo sfondo
     dietro ottieni un oggetto che sta in uno spazio".
   ============================================================ */

const NODI = [
  { id: "champions", label: "CHAMPIONS", x: 96, y: 74 },
  { id: "compliance", label: "COMPLIANCE", x: 404, y: 92 },
  { id: "processes", label: "PROCESSES", x: 110, y: 262 },
  { id: "autonomy", label: "AUTONOMY", x: 392, y: 246 },
];

const CENTRO = { x: 250, y: 168 };

export function LabDsCore() {
  return (
    <div className="iso w-full">
      <svg
        viewBox="0 0 500 336"
        className="w-full h-auto"
        role="img"
        aria-label="I quattro innesti del programma — Champions, Compliance, Processes, Autonomy — collegati a un nucleo comune"
      >
        {/* i collegamenti, sotto ai nodi */}
        <g stroke="var(--accent-line)" strokeWidth="1" fill="none">
          {NODI.map((n) => (
            <line key={n.id} x1={CENTRO.x} y1={CENTRO.y} x2={n.x} y2={n.y} />
          ))}
        </g>

        {/* il perimetro: un rettangolo di quota, non una cornice
            decorativa — richiama i crosshair d'angolo del DS (.xh) */}
        <g stroke="var(--line-strong)" strokeWidth="1" fill="none" opacity="0.9">
          <path d="M14 30 L14 14 L30 14" />
          <path d="M470 14 L486 14 L486 30" />
          <path d="M486 306 L486 322 L470 322" />
          <path d="M30 322 L14 322 L14 306" />
        </g>

        {/* il nucleo */}
        <circle
          cx={CENTRO.x}
          cy={CENTRO.y}
          r="30"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
        />
        <circle
          cx={CENTRO.x}
          cy={CENTRO.y}
          r="7"
          fill="var(--accent-fine)"
          className="ds-battito"
        />

        {/* i quattro nodi */}
        {NODI.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill="var(--flow-base)"
              stroke="var(--accent-fine)"
              strokeWidth="1.25"
            />
            <text
              x={n.x}
              y={n.y - 15}
              textAnchor="middle"
              fill="var(--text-muted)"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
              }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
