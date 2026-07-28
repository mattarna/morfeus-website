/* ============================================================
   LOCKUP DEL LOGO — mark + wordmark.
   ------------------------------------------------------------
   Il path del mark e' quello ufficiale del DS (viewBox 0 0 1000 476,
   le tre barre), copiato dagli HTML di BRAND-2026: non e' ridisegnato.

   Il wordmark e' l'UNICO posto dove entra Clash Display. Regola DS
   del 2026-07-26 che lo ha declassato da font dei titoli a firma del
   logo — i titoli sono passati a Plus Jakarta Sans. Il font arriva da
   --font-logo, che punta a --font-clash-display (vedi lab-ds/layout).

   Tutto scala cambiando SOLO `fontSize` sul .lock: mark e wordmark
   sono dimensionati in `em`.
   ============================================================ */

export function DsLock({ size = 26 }: { size?: number }) {
  return (
    <span className="lock" style={{ fontSize: `${size}px` }}>
      <svg
        className="mark"
        viewBox="0 0 1000 476"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
        <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
        <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
      </svg>
      <span className="wm">Morfeus</span>
    </span>
  );
}
