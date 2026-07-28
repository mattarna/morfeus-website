/* ============================================================
   FLUSSO CONTINUO — lo strato vivo dietro tutta la pagina.
   ------------------------------------------------------------
   E' la differenza strutturale piu' grande tra /lab e /lab-ds.
   Oggi /lab e' 13 FASCE che alternano due fondi ("Blue" e "Grid")
   su #030508: ogni giunzione e' uno stacco, e lo scroll e' una
   scala. Il DS ha deciso il contrario il 2026-07-27:

     "le pagine NON sono fasce con stacchi, ma una superficie sola
      attraversata da luci larghe. Il nero pieno sparisce."

   Quindi: una sola superficie a --flow-base (#0A0913, non nero
   pieno: il nero puro affatica), e le luci passano SOPRA le
   giunzioni invece di fermarsi ai bordi delle sezioni.

   Il DS fornisce la struttura (.flow in components.css), la pagina
   fornisce i gradienti — che sono questi qui sotto.

   Perche' `position:sticky` e non `absolute` come nel DS: li' la
   pagina e' un documento statico e il div e' alto quanto tutto il
   documento. Qui la pagina e' lunga qualche migliaio di px e un
   gradiente stirato su tutta quell'altezza si spalma fino a
   sparire. Con sticky lo strato resta alto UNA schermata e
   accompagna lo scroll: le luci restano della densita' giusta.
   ============================================================ */

/* Le scintille: posizioni FISSE, non casuali. Con Math.random() il
   server e il client ne calcolerebbero due diverse e React
   segnalerebbe un mismatch di idratazione a ogni caricamento.
   Nove punti, distribuiti a mano perche' non facciano griglia. */
const SCINTILLE = [
  { left: "12%", top: "18%", opacity: 0.5 },
  { left: "31%", top: "62%", opacity: 0.3 },
  { left: "47%", top: "11%", opacity: 0.42 },
  { left: "58%", top: "78%", opacity: 0.28 },
  { left: "69%", top: "34%", opacity: 0.55 },
  { left: "77%", top: "88%", opacity: 0.22 },
  { left: "84%", top: "23%", opacity: 0.38 },
  { left: "91%", top: "56%", opacity: 0.3 },
  { left: "22%", top: "91%", opacity: 0.26 },
];

export function DsFlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: "var(--flow-base)" }}
    >
      {/* Le tre luci larghe. Alternano il lato (sinistra alta, destra
          media, sinistra bassa): ritmo regolare, non caso — stessa
          regola di .section--luce, che alterna 14% / 86%. */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 70% at 8% -10%, var(--accent-soft) 0%, var(--luce) 30%, var(--luce-coda) 54%, transparent 74%),
            radial-gradient(90% 55% at 96% 38%, var(--luce) 0%, var(--luce-coda) 42%, transparent 68%),
            radial-gradient(110% 60% at 18% 104%, var(--luce) 0%, var(--luce-coda) 40%, transparent 70%)
          `,
        }}
      />

      {/* La griglia blueprint, tenutissima: e' il fondo di un disegno
          tecnico, non un motivo. --grid-line vale .05 di alpha. */}
      <div className="gridbg absolute inset-0 opacity-60" />

      {/* Le scintille del DS (.flow i). */}
      <div className="flow">
        {SCINTILLE.map((s, i) => (
          <i key={i} style={{ left: s.left, top: s.top, opacity: s.opacity }} />
        ))}
      </div>
    </div>
  );
}
