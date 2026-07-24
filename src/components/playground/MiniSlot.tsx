"use client";

import { useEffect, useState } from "react";

/**
 * Il voto che non conosci: mini slot-machine nella fascia finale.
 * Rispetta prefers-reduced-motion (mostra "??").
 */
export function MiniSlot() {
  const [v, setV] = useState<string>("47");

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV("??");
      return;
    }
    const id = setInterval(() => {
      setV(String(10 + Math.floor(Math.random() * 86)));
    }, 340);
    return () => clearInterval(id);
  }, []);

  return <span className="v">{v}</span>;
}
