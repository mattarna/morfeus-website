"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface CaseStudyVisualProps {
  slug: string;
  type: "problem" | "intervention";
}

export function CaseStudyVisuals({ slug, type }: CaseStudyVisualProps) {
  const isProblem = type === "problem";

  // COMMON CONTAINER STYLES
  const containerClasses = "relative w-full aspect-square flex items-center justify-center rounded-[2.5rem] border border-white/5 bg-white/[0.02] overflow-hidden group";

  // SALES VISUALS
  if (slug === "sales") {
    if (isProblem) {
      return (
        <div className={containerClasses}>
          <div className="absolute inset-0 bg-red-500/[0.03] blur-3xl" />
          <svg className="w-full h-full p-12" viewBox="0 0 200 200">
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={Math.random() * 200}
                y1={Math.random() * 200}
                x2={Math.random() * 200}
                y2={Math.random() * 200}
                stroke="rgba(239, 68, 68, 0.2)"
                strokeWidth="1"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={40 + Math.random() * 120}
                cy={40 + Math.random() * 120}
                r="4"
                fill="#EF4444"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}
          </svg>
          <Icon icon="solar:user-block-bold-duotone" className="absolute w-12 h-12 text-red-500/40" />
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-majorelle/5 blur-3xl" />
        <svg className="w-full h-full p-12" viewBox="0 0 200 200">
          <motion.path
            d="M40 40 L160 40 L130 160 L70 160 Z"
            fill="none"
            stroke="url(#grad-funnel)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="grad-funnel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#533DFC" />
              <stop offset="100%" stopColor="#8CA5F7" />
            </linearGradient>
          </defs>
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#533DFC"
              animate={{ 
                cx: [100, 100], 
                cy: [50, 150],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </svg>
        <Icon icon="solar:medal-star-bold-duotone" className="absolute bottom-10 w-8 h-8 text-majorelle" />
      </div>
    );
  }

  // OPERATIONS VISUALS
  if (slug === "operations") {
    if (isProblem) {
      return (
        <div className={containerClasses}>
          <div className="absolute inset-0 bg-red-500/[0.03] blur-3xl" />
          <div className="flex flex-col gap-4">
            <motion.div 
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="w-24 h-8 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center"
            >
              <div className="w-16 h-1 bg-red-500/40 rounded-full" />
            </motion.div>
            <Icon icon="solar:danger-bold" className="w-12 h-12 text-red-500 self-center" />
            <div className="w-24 h-8 rounded-lg border border-white/5 bg-white/5 opacity-20" />
          </div>
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 bg-majorelle/5 blur-3xl" />
        <div className="relative w-32 h-32">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-majorelle/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon icon="solar:cpu-bolt-bold-duotone" className="w-12 h-12 text-majorelle" />
          </div>
        </div>
      </div>
    );
  }

  // ADMINISTRATIVE VISUALS
  if (slug === "administrative") {
    if (isProblem) {
      return (
        <div className={containerClasses}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: [0, 360],
                x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10, Math.random() * 20 - 10]
              }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-20 bg-white/[0.03] border border-white/10 rounded-sm"
            />
          ))}
          <Icon icon="solar:history-bold-duotone" className="w-12 h-12 text-slate-500/40" />
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className="grid grid-cols-3 gap-2 p-12">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-8 h-8 rounded border border-majorelle/30 bg-majorelle/10 flex items-center justify-center"
            >
              <Icon icon="solar:check-read-bold" className="w-4 h-4 text-majorelle" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // E-COMMERCE VISUALS
  if (slug === "ecommerce") {
    if (isProblem) {
      return (
        <div className={containerClasses}>
          <div className="relative">
            <Icon icon="solar:cart-large-bold-duotone" className="w-20 h-20 text-slate-500/20" />
            <motion.div
              animate={{ y: [0, 20], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
              <Icon icon="solar:point-out-bold" className="w-6 h-6 text-red-500/40 rotate-180" />
            </motion.div>
          </div>
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-majorelle/30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon icon="solar:refresh-circle-bold-duotone" className="w-16 h-16 text-majorelle" />
          </div>
        </div>
      </div>
    );
  }

  // INFO-BUSINESS VISUALS
  if (slug === "info-business") {
    if (isProblem) {
      return (
        <div className={containerClasses}>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Icon icon="solar:user-bold-duotone" className="w-8 h-8 text-red-500/60" />
            </div>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-12 bg-red-500/20 origin-bottom"
                style={{ 
                  bottom: "50%", 
                  left: "50%", 
                  transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-20px)` 
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={containerClasses}>
        <div className="relative w-40 h-24 bg-white/[0.03] border border-majorelle/20 rounded-xl p-4 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-majorelle/10 to-transparent"
          />
          <div className="space-y-2">
            <div className="h-2 w-2/3 bg-majorelle/20 rounded" />
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
          </div>
          <Icon icon="solar:book-bookmark-bold-duotone" className="absolute bottom-2 right-2 w-6 h-6 text-majorelle" />
        </div>
      </div>
    );
  }

  // FALLBACK
  return (
    <div className={containerClasses}>
      <Icon icon={isProblem ? "solar:shield-warning-bold-duotone" : "solar:settings-minimalistic-bold-duotone"} className={`w-16 h-16 ${isProblem ? "text-red-500/20" : "text-majorelle/20"}`} />
    </div>
  );
}
