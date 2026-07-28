/* ============================================================
   GLIFI, le icone come disegno tecnico.
   ------------------------------------------------------------
   L'originale usa le Solar "bold-duotone": sagome piene a due toni.
   In questo sistema non funzionano: ogni altro segno della pagina e'
   un TRATTO su carta da disegno, e una sagoma piena ci si stacca
   contro come un adesivo.

   Quindi glifi disegnati a mano, tutti sulla stessa gabbia 24x24, un
   solo spessore, nessun riempimento. Poche primitive per ogni segno:
   se serve dettaglio, il posto giusto e' il testo, non l'icona.

   Restano gli STESSI SETTE soggetti dell'originale, nello stesso
   ordine, cosi' il significato non cambia: elenco, denaro,
   ingranaggio, fiamma · carrello, persona esclusa, curva giu'.
   ============================================================ */

const TRATTI: Record<string, React.ReactNode> = {
  // 4 sintomi
  elenco: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  denaro: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9v6M18 9v6" />
    </>
  ),
  ingranaggio: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
    </>
  ),
  fiamma: (
    <>
      <path d="M12 3c3.2 3.3 5.5 6 5.5 9.2A5.5 5.5 0 0 1 12 21a5.5 5.5 0 0 1-5.5-8.8C6.5 9 8.8 6.3 12 3Z" />
      <path d="M12 16.8c1.3 0 2.2-.9 2.2-2.1 0-1.3-1-2.1-2.2-3.5-1.2 1.4-2.2 2.2-2.2 3.5 0 1.2.9 2.1 2.2 2.1Z" />
    </>
  ),
  // 3 trappole
  carrello: (
    <>
      <path d="M2.5 4h2.6l2.3 10.4h9.6l2-7.4H7" />
      <circle cx="9.5" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </>
  ),
  personaEsclusa: (
    <>
      <circle cx="10" cy="8" r="3.4" />
      <path d="M3.6 20c0-3.3 2.9-5.6 6.4-5.6 1.2 0 2.3.3 3.2.7" />
      <path d="M16 16.5h5.5" />
    </>
  ),
  curvaGiu: (
    <>
      <path d="M3 4v16h18" />
      <path d="M6.5 8.5 11 13l3-2.6 4.5 5.6" />
      <path d="M18.5 12v4h-4" />
    </>
  ),
  // 6 esiti
  orologio: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  bersaglio: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  curvaSu: (
    <>
      <path d="M3 4v16h18" />
      <path d="M6.5 16.5 11 12l3 2.6 4.5-5.6" />
      <path d="M14.5 9h4v4" />
    </>
  ),
  scudo: (
    <>
      <path d="M12 3l7 2.6v5.6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V5.6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  stella: (
    <>
      <path d="m12 3.4 2.5 5.3 5.6.8-4 4 .9 5.7-5-2.7-5 2.7.9-5.7-4-4 5.6-.8L12 3.4Z" />
    </>
  ),
  chiave: (
    <>
      <circle cx="8" cy="8" r="4.2" />
      <path d="m11 11 8.4 8.4" />
      <path d="m16.6 16.6 2-2M14 14l1.6-1.6" />
    </>
  ),
  // 2 per il bridge
  medaglia: (
    <>
      <circle cx="12" cy="9.5" r="5.4" />
      <path d="m8.4 14.2-1.7 6.3 5.3-2.7 5.3 2.7-1.7-6.3" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.6" />
      <rect x="10" y="10" width="4" height="4" rx="0.8" />
      <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />
    </>
  ),
};

export function Glifo({
  nome,
  allarme = false,
}: {
  nome: keyof typeof TRATTI | string;
  allarme?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={allarme ? "glifo allarme" : "glifo"}
      aria-hidden="true"
    >
      {TRATTI[nome] ?? null}
    </svg>
  );
}
