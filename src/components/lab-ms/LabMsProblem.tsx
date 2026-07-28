import { useTranslations } from "next-intl";
import { LabMsGlifo } from "./LabMsGlifo";

/* ============================================================
   03 · IL PROBLEMA CHE NON VEDI
   ------------------------------------------------------------
   WIREFRAME invariato, tutto intero: 4 sintomi in griglia 2x2 →
   blocco "l'aggravante" → il dato con la sua fonte → 3 carte trappola
   → la chiusa. Stesso ordine, stessa copy.

   DISEGNO nuovo, e qui c'e' l'idea che tiene la sezione: il tema e'
   "sta gia' succedendo e non lo vedi". Quindi i sintomi sono SCHEDE DI
   RILEVAMENTO — codice progressivo, glifo a tratto, cifra fantasma
   dietro — e il filetto che si accende sul bordo quando ci passi
   sopra e' letteralmente la riga che si rivela.

   L'aggravante cambia registro perche' cambia natura: non e' piu' una
   rilevazione, e' un obbligo di legge. Diventa una PIASTRA con la
   campitura a righe dei cartelli di pericolo e il timbro ruotato. E'
   l'unico punto della pagina dove entra il forge, ed e' per quello
   che si nota.
   ============================================================ */

const SINTOMI = [
  { k: "1", glifo: "elenco" },
  { k: "2", glifo: "denaro" },
  { k: "3", glifo: "ingranaggio" },
  { k: "4", glifo: "fiamma" },
] as const;

const TRAPPOLE = [
  { k: "1", glifo: "carrello" },
  { k: "2", glifo: "personaEsclusa" },
  { k: "3", glifo: "curvaGiu" },
] as const;

export function LabMsProblem() {
  const t = useTranslations("Lab.problem_analysis");

  const rich = {
    br: () => <br />,
    spanSub: (chunks: React.ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink lab" id="problem-analysis">
      <div className="wrap">
        {/* ---- i quattro sintomi ---- */}
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>

        <div className="two mt-8">
          {SINTOMI.map((s, i) => (
            <article className="scheda" key={s.k}>
              <span className="filo" />
              <span className="ghost -right-2 -top-6">{`S0${i + 1}`}</span>

              <div className="sopra">
                <div className="flex items-center justify-between gap-4">
                  <LabMsGlifo nome={s.glifo} />
                  <span className="cod">{`Rilevato · S0${i + 1}`}</span>
                </div>
                <h3>{t(`symptoms.${s.k}.title`)}</h3>
                <p>{t(`symptoms.${s.k}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ---- l'aggravante: cambia registro, entra il forge ---- */}
        <div id="aggravante" className="mt-24">
          <div
            className="eye"
            style={{ color: "var(--marker)" }}
          >
            {t("trap_label")}
          </div>
          <h2 className="h-sect">{t.rich("trap_headline", rich)}</h2>
          <p className="lead">{t("trap_subtitle")}</p>

          {/* la piastra: il dato, la fonte, il timbro */}
          <div className="piastra mt-8 p-7 md:p-9">
            <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
              <div className="shrink-0">
                <LabMsGlifo nome="fiamma" allarme />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-[clamp(19px,2.2vw,26px)] leading-[1.3] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {t("trap_stat")}
                </p>

                <div className="quota mt-6">Fonte</div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--ombra)]">
                  {t("trap_source")}
                </p>
              </div>

              <div className="shrink-0 self-start md:self-center">
                <span
                  className="stamp"
                  style={{ borderColor: "var(--marker)", color: "var(--marker)" }}
                >
                  Obbligo · 2025
                </span>
              </div>
            </div>
          </div>

          {/* le tre trappole */}
          <div className="three mt-6">
            {TRAPPOLE.map((tr, i) => (
              <article className="scheda" key={tr.k}>
                <span className="filo" />
                <div className="sopra">
                  <div className="flex items-center justify-between gap-4">
                    <LabMsGlifo nome={tr.glifo} allarme />
                    <span className="cod" style={{ color: "var(--marker)" }}>
                      {`T0${i + 1}`}
                    </span>
                  </div>
                  <h4>{t(`trap_cards.${tr.k}.title`)}</h4>
                  <p>{t(`trap_cards.${tr.k}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>

          {/* la chiusa: e' una voce umana, quindi Playfair corsivo */}
          <p className="compound mt-12">{t("trap_closing")}</p>
        </div>
      </div>
    </section>
  );
}
