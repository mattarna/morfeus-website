import { useTranslations } from "next-intl";

/* ============================================================
   05 · IL BIVIO — fascia INCHIOSTRO
   ------------------------------------------------------------
   WIREFRAME invariato: due colonne a confronto, ognuna con titolo,
   sottotitolo, un grafico che mostra l'andamento, un'etichetta di
   verdetto e tre voci di elenco.

   DISEGNO: i due grafici sono l'unico posto della pagina dove serve
   una CURVA, e qui la curva e' l'argomento — una decade, l'altra
   compone. Disegnate come diagrammi tecnici: assi a filo, tacche di
   quota, tratteggio sotto la curva che perde e riempimento pieno
   sotto quella che accumula.

   Gli elenchi usano .blist del DS nelle due varianti gia' previste,
   .loss (pallino rosso) e .gain (pallino lilla): non ho inventato
   una lista nuova, esisteva.
   ============================================================ */

function Curva({ tipo }: { tipo: "perde" | "accumula" }) {
  const perde = tipo === "perde";
  // due tracciati sulla stessa gabbia: partono dallo stesso punto e si
  // separano. E' il confronto a rendere leggibile il bivio.
  const d = perde
    ? "M 12 44 C 60 40, 96 74, 140 108 S 196 138, 236 142"
    : "M 12 138 C 60 134, 96 116, 140 84 S 196 34, 236 16";
  const area = `${d} L 236 152 L 12 152 Z`;
  const tinta = perde ? "#FF5C5C" : "#8CA5F7";

  return (
    <svg viewBox="0 0 248 168" className="mt-6 block w-full" aria-hidden="true">
      <defs>
        <pattern
          id={`tratteggio-${tipo}`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke={tinta} strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
        <linearGradient id={`pieno-${tipo}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tinta} stopOpacity="0.28" />
          <stop offset="100%" stopColor={tinta} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* reticolo di quota */}
      <g stroke="rgba(140,165,247,.14)" strokeWidth="1">
        <line x1="12" y1="40" x2="236" y2="40" />
        <line x1="12" y1="96" x2="236" y2="96" />
        <line x1="12" y1="152" x2="236" y2="152" />
      </g>
      {/* assi */}
      <g stroke="rgba(140,165,247,.4)" strokeWidth="1">
        <line x1="12" y1="8" x2="12" y2="152" />
        <line x1="12" y1="152" x2="240" y2="152" />
        <line x1="124" y1="148" x2="124" y2="156" />
      </g>

      <path d={area} fill={perde ? `url(#tratteggio-${tipo})` : `url(#pieno-${tipo})`} />
      <path d={d} fill="none" stroke={tinta} strokeWidth="1.5" />
      <circle cx="236" cy={perde ? 142 : 16} r="3.5" fill={tinta} />

      <text
        x="124"
        y="166"
        textAnchor="middle"
        fill="#7E8091"
        style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em" }}
      >
        18 MESI
      </text>
    </svg>
  );
}

export function LabMsBivio() {
  const t = useTranslations("Lab.comparison");
  const vociA = t.raw("chart_a.items") as string[];
  const vociB = t.raw("chart_b.items") as string[];

  return (
    <section className="band ink lab" id="comparison">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">
          {t.rich("headline", {
            br: () => <br />,
            spanSub: (chunks) => <span className="emph">{chunks}</span>,
          })}
        </h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="two mt-10">
          {/* A · senza Champion */}
          <article className="scheda">
            <div className="sopra">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 style={{ marginTop: 0, color: "var(--testo-ink-3)" }}>
                    {t("chart_a.title")}
                  </h3>
                  <p style={{ marginTop: 6 }}>{t("chart_a.subtitle")}</p>
                </div>
                <span
                  className="cod shrink-0"
                  style={{ color: "var(--anomalia)" }}
                >
                  {t("chart_a.badge")}
                </span>
              </div>

              <Curva tipo="perde" />

              <ul className="blist loss">
                {vociA.map((v) => (
                  <li key={v}>
                    <span className="bd" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* B · con Champion — e' la strada scelta, quindi il bordo e' acceso */}
          <article className="scheda" style={{ borderColor: "rgba(140,165,247,.55)" }}>
            <span className="filo" style={{ opacity: 0.9 }} />
            <div className="sopra">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 style={{ marginTop: 0 }}>{t("chart_b.title")}</h3>
                  <p style={{ marginTop: 6, color: "var(--lilla)" }}>
                    {t("chart_b.subtitle")}
                  </p>
                </div>
                <span className="cod shrink-0">{t("chart_b.badge")}</span>
              </div>

              <Curva tipo="accumula" />

              <ul className="blist gain">
                {vociB.map((v) => (
                  <li key={v}>
                    <span className="bd" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
