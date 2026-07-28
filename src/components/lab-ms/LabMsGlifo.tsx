/* ============================================================
   GLIFI — le icone come disegno tecnico.
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
};

export function LabMsGlifo({
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
