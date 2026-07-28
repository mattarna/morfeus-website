"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

/* ============================================================
   IL NUCLEO ANIMATO — porto di LabVisualCore nella palette 2026.
   ------------------------------------------------------------
   L'originale (src/components/shared/LabVisualCore.tsx) NON si tocca:
   e' condiviso e vive su /lab.

   RESTA TUTTO quello che lo rende vivo, uno per uno:
     · i 4 nodi con icona in pannello di vetro, che ondeggiano
     · i tracciati neurali che si disegnano e si spengono
     · la scintilla che percorre ogni tracciato fino al centro
     · il nucleo esagonale: vetro esterno, esagono interno che pulsa,
       rombo con l'icona, 3 satelliti in orbita
     · il tilt 3D che segue il mouse
     · l'alone dietro e la trama di punti sopra

   CAMBIA SOLO LA MATERIA: il fucsia/rosa dell'originale
   (#d946ef, rose-400, violet-600) diventa la rampa ufficiale
   majorelle → neon → vista. Il fucsia non e' un colore di Morfeus:
   era l'unica nota fuori palette della pagina.

   I caratteri delle etichette passano a Plex (font-plex), come ogni
   altra micro-etichetta del sistema.
   ============================================================ */

const NODI = [
  { id: "champions", label: "CHAMPIONS", icon: "solar:stars-bold-duotone", x: -180, y: -100, delay: 0 },
  { id: "compliance", label: "COMPLIANCE", icon: "solar:shield-check-bold-duotone", x: 180, y: -80, delay: 0.5 },
  { id: "processes", label: "PROCESSES", icon: "solar:settings-minimalistic-bold-duotone", x: -160, y: 100, delay: 1 },
  { id: "autonomy", label: "AUTONOMY", icon: "solar:key-bold-duotone", x: 160, y: 90, delay: 1.5 },
];

export function LabMsCore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-200, 200], [10, -10]);
  const rotateY = useTransform(springX, [-200, 200], [-10, 10]);

  useEffect(() => {
    const suMovimento = (e: MouseEvent) => {
      const rect = document
        .getElementById("lab-ms-core")
        ?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    // passive: l'originale non lo dichiarava e il listener gira su ogni
    // movimento del mouse in tutta la pagina. Qui non chiamiamo mai
    // preventDefault, quindi dirlo al browser gli lascia libero lo scroll.
    window.addEventListener("mousemove", suMovimento, { passive: true });
    return () => window.removeEventListener("mousemove", suMovimento);
  }, [mouseX, mouseY]);

  return (
    <div
      id="lab-ms-core"
      className="group/core relative flex w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-carta/10 bg-inchiostro/40 backdrop-blur-xs aspect-video md:aspect-21/9"
      style={{ perspective: "1000px" }}
    >
      {/* ambiente dietro: majorelle, non fucsia */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(83,61,252,0.14),transparent_70%)] opacity-60 transition-opacity duration-1000 group-hover/core:opacity-100" />

      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ms-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(100, 117, 250, 0.55)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="ms-glow">
              <feGaussianBlur stdDeviation="2" result="sfocato" />
              <feMerge>
                <feMergeNode in="sfocato" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {NODI.map((n) => {
            const x0 = 400 + n.x;
            const y0 = 200 + n.y;
            const cx = 400 + n.x * 0.4;
            const tracciato = `M ${x0} ${y0} C ${cx} ${y0}, ${cx} 200, 400 200`;

            return (
              <g key={n.id}>
                {/* il tracciato spento, sempre visibile */}
                <path
                  d={tracciato}
                  fill="none"
                  stroke="#E4E7F0"
                  strokeOpacity="0.05"
                  strokeWidth="1"
                />
                {/* il tracciato che si accende e si spegne */}
                <motion.path
                  d={tracciato}
                  fill="none"
                  stroke="url(#ms-line-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: n.delay,
                    ease: "easeInOut",
                  }}
                />
                {/* la scintilla che corre verso il centro */}
                <motion.circle
                  r="1.5"
                  fill="#8CA5F7"
                  filter="url(#ms-glow)"
                  style={{ offsetPath: `path("${tracciato}")` }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: n.delay,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* il nucleo */}
        <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
          <motion.div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-majorelle/15 blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.div
            className="relative flex h-28 w-28 items-center justify-center md:h-36 md:w-36"
            whileHover={{ scale: 1.1 }}
          >
            <div className="ms-hex absolute inset-0 rotate-90 border border-carta/10 bg-carta/5 backdrop-blur-xl" />
            <motion.div
              className="ms-hex absolute inset-3 rotate-90 border border-majorelle/40 bg-majorelle/20 shadow-[inset_0_0_20px_rgba(83,61,252,0.25)] md:inset-5"
              animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative z-20 flex h-10 w-10 rotate-45 items-center justify-center rounded-xl border border-carta/20 bg-linear-to-br from-persian via-majorelle to-neon shadow-[0_0_40px_rgba(83,61,252,0.55)] md:h-14 md:w-14">
              <Icon
                icon="solar:brain-bold"
                className="h-6 w-6 -rotate-45 text-white md:h-8 md:w-8"
              />
            </div>

            {[0, 120, 240].map((angolo) => (
              <motion.div
                key={angolo}
                className="absolute h-1.5 w-1.5 rounded-full bg-vista shadow-[0_0_15px_#8CA5F7]"
                animate={{ rotate: [angolo, angolo + 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50%", originY: "180%", top: "0%", left: "48%" }}
              />
            ))}
          </motion.div>
        </div>

        {/* i quattro nodi */}
        {NODI.map((n) => (
          <motion.div
            key={n.id}
            className="absolute z-20 flex flex-col items-center gap-2"
            style={{
              left: `calc(50% + ${n.x}px)`,
              top: `calc(50% + ${n.y}px)`,
              transform: "translate(-50%, -50%) translateZ(30px)",
            }}
          >
            <motion.div
              className="flex items-center justify-center rounded-2xl border border-carta/10 bg-inchiostro/60 p-3 shadow-2xl backdrop-blur-md transition-all group-hover/core:border-majorelle/40 md:p-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: n.delay }}
            >
              <Icon icon={n.icon} className="h-5 w-5 text-vista md:h-6 md:w-6" />
            </motion.div>
            <span className="font-plex text-[10px] font-semibold uppercase tracking-[0.3em] text-carta/25 transition-colors group-hover/core:text-vista/70 md:text-xs">
              {n.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* trama di punti, per il registro tecnico */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #E4E7F0 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <style jsx>{`
        .ms-hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}
