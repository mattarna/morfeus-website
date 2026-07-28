/* ============================================================
   I DUE DIAGRAMMI DI MARF.
   ------------------------------------------------------------
   Server component: sono disegni fermi, non hanno bisogno di JS.

   Stesso registro del resto del sito: tratto a filo, nessun volume
   dipinto, etichette in mono. Il colore segue la narrativa gia'
   fissata: vista per il lavoro, verde per cio' che esce come
   decisione e azione.

   Perche' un disegno e non un elenco: il verbo di queste due
   sezioni e' "collega". Un elenco puo' solo prometterlo, una figura
   lo mostra. E' l'unico punto della pagina dove il disegno porta
   informazione invece di decorare.
   ============================================================ */

const MONO = { fontFamily: "var(--font-mono)", letterSpacing: "0.12em" };

/* SCHEMA: dati + processi + persone -> MARF -> decisioni e azioni */
export function SchemaCentrale({
  ingressi,
  centro,
  uscite,
}: {
  ingressi: string[];
  centro: string;
  uscite: string[];
}) {
  return (
    <svg viewBox="0 0 900 300" className="diagramma" role="img" aria-label={`${ingressi.join(", ")} entrano in ${centro} ed escono come ${uscite.join(" e ")}`}>
      {/* i tre ingressi */}
      {ingressi.map((v, i) => {
        const y = 62 + i * 88;
        return (
          <g key={v}>
            <rect
              x="14"
              y={y - 24}
              width="212"
              height="48"
              rx="6"
              fill="none"
              stroke="var(--lavoro)"
              strokeOpacity="0.55"
            />
            <text x="120" y={y + 5} textAnchor="middle" fill="var(--carta)" style={{ ...MONO, fontSize: 13 }}>
              {v.toUpperCase()}
            </text>
            <path
              d={`M 226 ${y} C 300 ${y}, 320 150, 372 150`}
              fill="none"
              stroke="var(--lavoro)"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* il centro */}
      <rect x="374" y="106" width="152" height="88" rx="8" fill="none" stroke="var(--lavoro)" strokeWidth="1.5" />
      <text x="450" y="145" textAnchor="middle" fill="var(--carta)" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em" }}>
        {centro}
      </text>
      <text x="450" y="170" textAnchor="middle" fill="var(--ombra)" style={{ ...MONO, fontSize: 11 }}>
        DATI · PROCESSI · PERSONE
      </text>

      {/* le due uscite */}
      {uscite.map((v, i) => {
        const y = 106 + i * 88;
        return (
          <g key={v}>
            <path
              d={`M 526 150 C 578 150, 596 ${y}, 660 ${y}`}
              fill="none"
              stroke="var(--guadagno)"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            <rect x="662" y={y - 24} width="224" height="48" rx="6" fill="none" stroke="var(--guadagno)" strokeOpacity="0.6" />
            <text x="774" y={y + 5} textAnchor="middle" fill="var(--guadagno)" style={{ ...MONO, fontSize: 13 }}>
              {v.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* CONVERGENZA: gli strumenti esistenti entrano in MARF e tornano ai reparti */
export function Convergenza({
  strumenti,
  centro,
  reparti,
}: {
  strumenti: string[];
  centro: string;
  reparti: string[];
}) {
  const passoSx = 300 / (strumenti.length + 1);
  const passoDx = 300 / (reparti.length + 1);

  return (
    <svg viewBox="0 0 900 320" className="diagramma" role="img" aria-label={`${strumenti.join(", ")} convergono in ${centro} e tornano a ${reparti.join(", ")}`}>
      {strumenti.map((s, i) => {
        const y = passoSx * (i + 1) + 10;
        return (
          <g key={s}>
            <text x="16" y={y + 4} fill="var(--ombra)" style={{ ...MONO, fontSize: 12.5 }}>
              {s.toUpperCase()}
            </text>
            <path
              d={`M 200 ${y} C 280 ${y}, 300 160, 366 160`}
              fill="none"
              stroke="var(--lavoro)"
              strokeOpacity="0.32"
              strokeWidth="1"
            />
            <circle cx="200" cy={y} r="2.5" fill="var(--lavoro)" fillOpacity="0.7" />
          </g>
        );
      })}

      <rect x="368" y="126" width="164" height="68" rx="8" fill="none" stroke="var(--lavoro)" strokeWidth="1.5" />
      <text x="450" y="167" textAnchor="middle" fill="var(--carta)" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 25, letterSpacing: "-0.02em" }}>
        {centro}
      </text>

      {reparti.map((r, i) => {
        const y = passoDx * (i + 1) + 10;
        return (
          <g key={r}>
            <path
              d={`M 534 160 C 600 160, 620 ${y}, 700 ${y}`}
              fill="none"
              stroke="var(--guadagno)"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <circle cx="700" cy={y} r="2.5" fill="var(--guadagno)" />
            <text x="714" y={y + 4} fill="var(--guadagno)" style={{ ...MONO, fontSize: 12.5 }}>
              {r.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
