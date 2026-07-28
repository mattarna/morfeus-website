import { useTranslations } from "next-intl";

/* ============================================================
   12 · FAQ, fascia INCHIOSTRO
   ------------------------------------------------------------
   WIREFRAME invariato: titolo di sezione e le domande su due
   colonne, apribili una alla volta.

   DISEGNO: l'accordion e' <details>/<summary> NATIVI. Non e' pigrizia,
   e' la scelta giusta su tre fronti:
     · zero JavaScript, la sezione resta un server component, come
       tutta la pagina tranne lo schema animato
     · funziona da tastiera senza che io scriva un gestore, e gli
       screen reader annunciano gia' aperto/chiuso
     · le risposte sono nel DOM anche da chiuse: un crawler le legge,
       e su una pagina che punta anche alla visibilita' negli LLM
       non e' un dettaglio

   Il segno di apertura e' un piu' che diventa meno ruotando una
   sola stanghetta: coerente col registro del disegno tecnico, dove
   niente gira su se stesso senza motivo.

   Le domande sono 11, dispari: la prima colonna ne prende 6 e la
   seconda 5. Divido per indice invece che a meta' esatta, cosi' la
   colonna piu' lunga resta a sinistra dove l'occhio parte.
   ============================================================ */

export function LabMsFaq() {
  const t = useTranslations("Lab.faq_lab");
  const voci = Object.entries(
    t.raw("items") as Record<string, { q: string; a: string }>
  );

  const meta = Math.ceil(voci.length / 2);
  const colonne = [voci.slice(0, meta), voci.slice(meta)];

  return (
    <section className="band ink lab" id="faq">
      <div className="wrap">
        <div className="eye">Domande</div>
        <h2 className="h-sect max-w-[22ch]">{t("sectionTitle")}</h2>

        <div className="two mt-10 items-start">
          {colonne.map((colonna, i) => (
            <div key={i}>
              {colonna.map(([id, voce]) => (
                <details className="faq" key={id}>
                  <summary>
                    <span>{voce.q}</span>
                    <span className="segno" aria-hidden="true" />
                  </summary>
                  <p className="risposta">{voce.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
