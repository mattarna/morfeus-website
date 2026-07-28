import { useTranslations } from "next-intl";

/* ============================================================
   09 · AI CHAMP PROGRAM, fascia INCHIOSTRO
   ------------------------------------------------------------
   WIREFRAME invariato: intestazione centrata, due numeri grandi
   affiancati con etichetta e sottotitolo, poi la riga di etichette.

   NOTA: la copy contiene anche un case_study (28 processi, 6
   Champion...) che la pagina online NON mostra, il componente si
   ferma alle etichette. L'ho lasciato fuori anche qui: la richiesta
   e' riadattare la pagina che esiste, non aggiungerle contenuti.
   Ma e' materiale buono, e la sezione lo reggerebbe: se lo vuoi
   dentro e' mezz'ora.

   DISEGNO: i due numeri entrano nello stesso strumento a due
   quadranti gia' usato per le prove, e' la stessa natura di dato,
   quindi merita la stessa forma. La ripetizione qui e' voluta: e'
   cosi' che un vocabolario diventa riconoscibile.
   ============================================================ */

const STAT = ["1", "2"] as const;

export function LabMsProgramma() {
  const t = useTranslations("Lab.program");
  const etichette = t.raw("tags") as string[];

  return (
    <section className="band ink lab" id="ai-champ">
      <div className="wrap">
        <div className="text-center">
          <div className="eye justify-center">{t("label")}</div>
          <h2 className="h-sect mx-auto max-w-[20ch]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="emph">{chunks}</span>,
            })}
          </h2>
          <p className="lead mx-auto">{t("subtitle")}</p>
        </div>

        <div className="quadro mt-12">
          <div className="readout">
            <span>Programma · erogato</span>
            <span className="on">
              <i />
              Dal 2023
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {STAT.map((n, i) => (
              <div
                key={n}
                className="quadrante"
              >
                <span className="ghost -right-1 -top-4">{`0${i + 1}`}</span>
                <div className="sopra">
                  <div className="statnum text-[clamp(40px,5.5vw,66px)]">
                    {t(`stats.${n}.number`)}
                  </div>
                  <p className="mt-4 text-[19px] font-medium">
                    {t(`stats.${n}.label`)}
                  </p>
                  <div className="quota mt-5" />
                  <p className="mt-4 text-[16px] text-[color:var(--testo-ink-3)]">
                    {t(`stats.${n}.sub`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {etichette.map((e) => (
            <span className="otag" key={e} style={{ marginTop: 0 }}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
