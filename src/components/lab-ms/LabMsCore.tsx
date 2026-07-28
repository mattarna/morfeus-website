"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/* ============================================================
   SCHEMA D'INNESTO, il disegno animato dell'hero.
   ------------------------------------------------------------
   Stesso POSTO e stesso RUOLO dell'animazione originale: sta sotto il
   sottotitolo e dice "questo programma innesta quattro cose in un
   nucleo". Il wireframe non si tocca.

   Ma il DISEGNO e' rifatto da zero nel registro nuovo. L'originale era
   vetro e neon: pannelli sfocati, esagoni fucsia, aloni da 80px, un
   rombo in gradiente. Qui e' una TAVOLA TECNICA:

     · i nodi sono quadratini con la crocetta di centro e la loro sigla
       (N01..N04), come punti quotati su un disegno
     · i tracciati sono hairline da 1px, non tubi luminosi
     · il segnale e' un punto che PERCORRE il tracciato e, arrivando,
       fa pulsare l'anello del nucleo: la luce RIVELA, non decora
     · il nucleo e' tre cerchi concentrici e un quadrato ruotato, tutti
       a filo, nessun volume dipinto
     · niente sfumature di riempimento: solo tratto, quote e mono

   E' la stessa lezione che il DS scrive altrove: se illumini le linee
   ottieni il neon, se lasci il tratto netto ottieni uno strumento.
   ============================================================ */

const NODI = [
  { id: "champions", sigla: "N01", label: "CHAMPIONS", x: 150, y: 96, ritardo: 0 },
  { id: "compliance", sigla: "N02", label: "COMPLIANCE", x: 650, y: 110, ritardo: 1 },
  { id: "processes", sigla: "N03", label: "PROCESSES", x: 168, y: 292, ritardo: 2 },
  { id: "autonomy", sigla: "N04", label: "AUTONOMY", x: 636, y: 280, ritardo: 3 },
];

const CX = 400;
const CY = 196;
const DURATA = 4;

export function LabMsCore() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 26 });
  const sy = useSpring(py, { stiffness: 90, damping: 26 });
  // ±5 gradi: quanto basta perche' il disegno reagisca al puntatore
  // senza diventare un giocattolo 3D. Il DS chiede motion sobrio.
  const rotateX = useTransform(sy, [-260, 260], [5, -5]);
  const rotateY = useTransform(sx, [-460, 460], [-5, 5]);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (q.matches) return;

    const suMovimento = (e: MouseEvent) => {
      const r = document.getElementById("lab-schema")?.getBoundingClientRect();
      if (!r) return;
      px.set(e.clientX - r.left - r.width / 2);
      py.set(e.clientY - r.top - r.height / 2);
    };
    window.addEventListener("mousemove", suMovimento, { passive: true });
    return () => window.removeEventListener("mousemove", suMovimento);
  }, [px, py]);

  return (
    <div className="quadro" id="lab-schema">
      <div className="readout">
        <span>Schema · innesto</span>
        <span className="on">
          <i />
          Rilevamento attivo
        </span>
      </div>

      <div style={{ perspective: "1200px" }}>
        <motion.svg
          viewBox="0 0 800 392"
          className="block w-full"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          role="img"
          aria-label="Schema: quattro innesti, Champions, Compliance, Processes, Autonomy, collegati a un nucleo comune"
        >
          {/* reticolo di fondo del disegno */}
          <defs>
            <pattern id="lab-reticolo" width="36" height="36" patternUnits="userSpaceOnUse">
              <path
                d="M36 0H0V36"
                fill="none"
                stroke="rgba(140,165,247,.07)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="392" fill="url(#lab-reticolo)" />

          {/* i quattro tracciati */}
          {NODI.map((n) => {
            const cxCurva = n.x + (CX - n.x) * 0.45;
            const d = `M ${n.x} ${n.y} C ${cxCurva} ${n.y}, ${cxCurva} ${CY}, ${CX} ${CY}`;
            return (
              <g key={n.id}>
                <path d={d} fill="none" stroke="rgba(140,165,247,.28)" strokeWidth="1" />
                {/* il segnale che percorre il tracciato */}
                <motion.circle
                  r="3"
                  fill="#8CA5F7"
                  style={{ offsetPath: `path("${d}")` }}
                  animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: DURATA,
                    repeat: Infinity,
                    delay: n.ritardo,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.85, 1],
                  }}
                />
              </g>
            );
          })}

          {/* il nucleo: tre anelli a filo + quadrato ruotato */}
          <g fill="none" stroke="#8CA5F7">
            <motion.circle
              cx={CX}
              cy={CY}
              r="46"
              strokeWidth="1"
              strokeOpacity="0.35"
              animate={{ strokeOpacity: [0.2, 0.65, 0.2], r: [46, 49, 46] }}
              transition={{ duration: DURATA, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx={CX} cy={CY} r="30" strokeWidth="1" strokeOpacity="0.55" />
            <rect
              x={CX - 17}
              y={CY - 17}
              width="34"
              height="34"
              strokeWidth="1"
              strokeOpacity="0.8"
              transform={`rotate(45 ${CX} ${CY})`}
            />
          </g>
          <circle cx={CX} cy={CY} r="4" fill="#533DFC" />
          {/* crocetta di centro */}
          <g stroke="rgba(140,165,247,.55)" strokeWidth="1">
            <line x1={CX - 60} y1={CY} x2={CX - 52} y2={CY} />
            <line x1={CX + 52} y1={CY} x2={CX + 60} y2={CY} />
            <line x1={CX} y1={CY - 60} x2={CX} y2={CY - 52} />
            <line x1={CX} y1={CY + 52} x2={CX} y2={CY + 60} />
          </g>
          <text
            x={CX}
            y={CY + 78}
            textAnchor="middle"
            fill="#7E8091"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.18em" }}
          >
            NUCLEO
          </text>

          {/* i quattro nodi quotati */}
          {NODI.map((n) => {
            const aSinistra = n.x < CX;
            return (
              <g key={n.id}>
                <rect
                  x={n.x - 9}
                  y={n.y - 9}
                  width="18"
                  height="18"
                  fill="#111113"
                  stroke="#8CA5F7"
                  strokeWidth="1"
                />
                <line
                  x1={n.x - 4}
                  y1={n.y}
                  x2={n.x + 4}
                  y2={n.y}
                  stroke="#8CA5F7"
                  strokeWidth="1"
                />
                <line
                  x1={n.x}
                  y1={n.y - 4}
                  x2={n.x}
                  y2={n.y + 4}
                  stroke="#8CA5F7"
                  strokeWidth="1"
                />
                <text
                  x={aSinistra ? n.x - 16 : n.x + 16}
                  y={n.y - 14}
                  textAnchor={aSinistra ? "end" : "start"}
                  fill="#E4E7F0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12.5,
                    letterSpacing: "0.14em",
                  }}
                >
                  {n.label}
                </text>
                <text
                  x={aSinistra ? n.x - 16 : n.x + 16}
                  y={n.y + 4}
                  textAnchor={aSinistra ? "end" : "start"}
                  fill="#7E8091"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                  }}
                >
                  {n.sigla}
                </text>
              </g>
            );
          })}
        </motion.svg>
      </div>

      <div className="px-[18px] pb-[14px]">
        <div className="quota">4 innesti · 1 nucleo · 0 slide</div>
      </div>
    </div>
  );
}
