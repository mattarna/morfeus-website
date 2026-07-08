"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Method index + panel (tab interaction) — client island.
 * All panes are rendered server-side in the DOM (crawlable); only visibility
 * toggles client-side. Used on /chi-siamo and /metodo.
 */
export type MethodPhase = {
  ix: string;
  title: string;
  h3: string;
  pl: string;
  chips: string[];
  points: string[];
  link: { label: string; href: string };
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MethodTabs({ phases }: { phases: MethodPhase[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="method">
      <div className="idx">
        {phases.map((p, i) => (
          <button key={p.ix} className={i === active ? "on" : undefined} onClick={() => setActive(i)} type="button">
            <span className="ix">{p.ix}</span> {p.title}
          </button>
        ))}
      </div>
      <div className="panel">
        {phases.map((p, i) => (
          <div key={p.ix} className={`pane ${i === active ? "on" : ""}`.trim()}>
            <h3>{p.h3}</h3>
            <p className="pl">{p.pl}</p>
            <div className="chips">
              {p.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
            <div className="plist">
              {p.points.map((pt) => (
                <div key={pt}><span className="arr">→</span><span>{pt}</span></div>
              ))}
            </div>
            <Link className="tlink" href={p.link.href}>{p.link.label} <Arrow /></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
