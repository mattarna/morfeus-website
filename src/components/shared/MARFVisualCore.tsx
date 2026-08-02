"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

/* Le posizioni sono in PERCENTUALE del riquadro, non in pixel.
   Erano `x: -180 / +180` px, messe in `left: calc(50% + Xpx)`. Su
   desktop tornava, ma il riquadro e' fluido: su un telefono da ~340px
   il centro sta a 170 e un nodo a +180 finisce a 350, cioe' FUORI. E il
   contenitore ha `overflow-hidden`, quindi i nodi di destra venivano
   tagliati a meta' (FINANCE e DATA) invece di stringersi.

   In percentuale l'offset e' sempre proporzionato al riquadro, a
   qualsiasi larghezza, e il taglio non puo' piu' succedere. I valori
   sono gli stessi rapporti del disegno originale. */
const NODES = [
  { id: "crm", label: "CRM", icon: "solar:users-group-rounded-bold-duotone", x: -17.3, y: -22.4, delay: 0 },
  { id: "finance", label: "FINANCE", icon: "solar:wallet-money-bold-duotone", x: 17.3, y: -18, delay: 0.5 },
  { id: "ops", label: "OPS", icon: "solar:settings-minimalistic-bold-duotone", x: -15.4, y: 22.4, delay: 1 },
  { id: "data", label: "DATA", icon: "solar:database-bold-duotone", x: 15.4, y: 20.2, delay: 1.5 },
];

export function MARFVisualCore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-200, 200], [10, -10]);
  const rotateY = useTransform(springX, [-200, 200], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("marf-core-container")?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  /* PROPORZIONE DEL RIQUADRO. Era `aspect-video` fino a md: 16:9 su un
     telefono da 350px vuol dire un riquadro alto 197px, dentro il quale
     devono stare un esagono da 112px PIU' quattro nodi con etichetta.
     Non ci stanno, e i nodi finivano addosso al centro. Su schermo
     stretto il riquadro diventa QUADRATO, che e' lo spazio verticale
     che serve; da sm in su torna panoramico come prima. */
  return (
    <div
      id="marf-core-container"
      className="relative w-full aspect-square sm:aspect-video md:aspect-21/9 flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#030508]/40 border border-white/5 backdrop-blur-xs group/core perspective-[1000px]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,57,235,0.1),transparent_70%)] opacity-50 group-hover/core:opacity-100 transition-opacity duration-1000" />
      
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Neural Lines Container */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(77, 57, 235, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Neural Pathways */}
          {NODES.map((node) => {
            const startX = 400 + node.x;
            const startY = 200 + node.y;
            const controlX = 400 + node.x * 0.4;
            
            const path = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} 200, 400 200`;
            
            return (
              <g key={node.id}>
                <path 
                  d={path} 
                  fill="none" 
                  stroke="white" 
                  strokeOpacity="0.03" 
                  strokeWidth="1" 
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#line-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  r="1.5"
                  fill="#4D39EB"
                  filter="url(#glow)"
                  style={{ offsetPath: `path("${path}")` }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut"
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Core (Hexagon Pulse) */}
        <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-majorelle/10 blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-white/3 rotate-90 clip-hex backdrop-blur-xl border border-white/10" />
            <motion.div 
              className="absolute inset-3 md:inset-5 bg-majorelle/20 rotate-90 clip-hex border border-majorelle/40 shadow-[inset_0_0_20px_rgba(77,57,235,0.2)]"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative z-20 w-10 h-10 md:w-14 md:h-14 bg-linear-to-br from-majorelle via-majorelle to-vista rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(77,57,235,0.5)] rotate-45 border border-white/20">
              <Icon icon="solar:cpu-bolt-bold" className="w-6 h-6 md:w-8 md:h-8 text-white -rotate-45" />
            </div>

            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-vista shadow-[0_0_15px_#00F2FF]"
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50%", originY: "180%", top: "0%", left: "48%" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Floating Labels (Nodes) */}
        {NODES.map((node) => (
          <motion.div
            key={node.id}
            className="absolute z-20 flex flex-col items-center gap-2"
            /* Gli scarti sono moltiplicati per --sx/--sy, che valgono 1
               su desktop e crescono su mobile: la percentuale da sola non
               basta, perche' l'esagono centrale ha una misura FISSA
               (112px) e su un riquadro piccolo occupa una quota molto
               maggiore. Se i nodi non si allargano, ci finiscono sopra. */
            style={{
              left: `calc(50% + ${node.x}% * var(--sx, 1))`,
              top: `calc(50% + ${node.y}% * var(--sy, 1))`,
              transform: "translate(-50%, -50%) translateZ(30px)",
            }}
          >
            <motion.div 
              className="p-3 md:p-4 rounded-2xl bg-[#030508]/60 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover/core:border-indigo-500/30 transition-all"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: node.delay }}
            >
              <Icon icon={node.icon} className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
            </motion.div>
            {/* whitespace-nowrap: senza, su schermo stretto "FINANCE" andava
                a capo lettera per lettera. E la spaziatura scende su
                mobile, dove 0.3em allargava l'etichetta piu' del nodo. */}
            <span className="whitespace-nowrap text-[10px] md:text-xs font-mono font-bold tracking-[0.14em] md:tracking-[0.3em] text-white/20 uppercase group-hover/core:text-indigo-400/60 transition-colors">
              {node.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid Overlay for technical feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <style jsx>{`
        .clip-hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        /* Quanto stanno larghi i nodi rispetto al centro. Su desktop il
           riquadro e' panoramico e l'esagono e' una frazione piccola:
           gli scarti del disegno originale bastano. Su telefono il
           riquadro e' quadrato e l'esagono pesa molto di piu', quindi i
           nodi vanno spinti in fuori o si sovrappongono al centro. */
        #marf-core-container {
          --sx: 1;
          --sy: 1;
        }
        @media (max-width: 767px) {
          #marf-core-container {
            --sx: 1.5;
            --sy: 1.35;
          }
        }
      `}</style>
    </div>
  );
}
