"use client";

/**
 * DemoStage · palco della HOME 2026.
 * Desktop: blocca lo scroll nativo e muove i pannelli con translateY (snap 1000ms).
 * Mobile: flusso nativo, nessuna interferenza.
 * UI fissa: rail di navigazione a sinistra + hint di scroll (mix-blend difference,
 * leggibili sia su carta che su inchiostro).
 */

import { ReactNode, useEffect } from "react";
import {
  DEMO_TOTAL_STEPS,
  DEMO_TRANSITION,
  getDemoTranslateVh,
  jumpToIndex,
  useDemoScroll,
  useDemoStore,
  useIsDesktop,
} from "./useDemoScroll";

export type RailPoint = { label: string; index: number; range: [number, number] };

export function DemoStage({
  points,
  header,
  children,
}: {
  points: RailPoint[];
  header?: ReactNode;
  children: ReactNode;
}) {
  const currentIndex = useDemoStore((s) => s.currentIndex);
  const isDesktop = useIsDesktop();

  useDemoScroll();

  /* La home riparte sempre dall'inizio quando viene montata. */
  useEffect(() => {
    useDemoStore.getState().setIndex(0);
  }, []);

  /* Lock dello scroll nativo, solo desktop (stessa strategia della produzione). */
  useEffect(() => {
    if (isDesktop) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isDesktop]);

  const translateY = getDemoTranslateVh(currentIndex);

  return (
    <>
      {header}

      {/* Il rail e' l'indice delle sezioni del deck. Oltre l'ultimo punto
          c'e' il footer, che sezione non e': li' il rail sconfinava sopra
          la prima colonna e sembrava un secondo menu. Si spegne. */}
      <nav
        className="demo-ui demo-rail"
        aria-label="Sezioni"
        data-oltre={currentIndex > (points[points.length - 1]?.range[1] ?? 99)}
      >
        {points.map((p) => (
          <button
            key={p.index}
            type="button"
            data-on={currentIndex >= p.range[0] && currentIndex <= p.range[1]}
            onClick={() => jumpToIndex(p.index)}
          >
            <span>{p.label}</span>
          </button>
        ))}
      </nav>
      <div className="demo-ui demo-hint" data-hidden={currentIndex >= DEMO_TOTAL_STEPS - 1}>
        Scorri
      </div>

      {isDesktop ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(-${translateY}vh)`,
            transition: DEMO_TRANSITION,
            willChange: "transform",
          }}
        >
          {children}
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>{children}</div>
      )}
    </>
  );
}
