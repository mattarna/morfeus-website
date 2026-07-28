import { useTranslations } from "next-intl";

/* ============================================================
   PROVE — la riga di statistiche.
   ------------------------------------------------------------
   E' il componente .stats del DS, nato apposta per questo: "il modo
   piu' diretto che ha un sito B2B di dichiarare la propria scala".
   Numero grande di peso medio (alla scala grande il bold diventa
   greve), etichetta sotto in mono.

   ⚠️ UNA COSA RESTA APERTA, ED E' DI MATTEO, NON MIA.
   Il DS ha una regola esplicita su questo componente:

     "ogni numero porta la FONTE. Un '93+' nudo impressiona per un
      secondo e non regge la seconda domanda. Con la fonte diventa
      una cosa su cui un CFO ci puo' litigare, che e' esattamente
      quello che vogliamo. Se la fonte non c'e', il numero non entra."

   La copy di Lab.proof NON ha fonti: 2.000+, 8-15h e 100+ arrivano
   nudi. Ho lasciato lo slot .src VUOTO invece di riempirlo io: una
   fonte inventata e' peggio di una fonte assente, e non tocca a me
   decidere come si chiama il dato interno di Morfeus. Piu' avanti
   nella pagina il problema non si pone — il 2.4x di McKinsey la
   fonte ce l'ha (Lab.problem_analysis.trap_source) e infatti la
   mostro.
   ============================================================ */

const BLOCCHI = ["1", "2", "3"] as const;

export function LabDsProof() {
  const t = useTranslations("Lab.proof");

  return (
    <section id="proof" className="section section--luce">
      <div className="container">
        <h2 className="t-display t-duo max-w-[16ch]">{t("title")}</h2>

        <div className="stats mt-12">
          {BLOCCHI.map((n) => (
            <div key={n} className="stat">
              <span className="n act">{t(`blocks.${n}.number`)}</span>
              <span className="k">{t(`blocks.${n}.label`)}</span>
              <p className="t-small mt-5 max-w-[42ch]">
                {t(`blocks.${n}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
