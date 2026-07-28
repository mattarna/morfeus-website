import { useTranslations } from "next-intl";

/* ============================================================
   02 · PROVE — fascia CARTA.
   ------------------------------------------------------------
   Componente .statgrid del DS ("la prova in numeri"): celle divise da
   filetti, numero in Clash, etichetta in mono, descrizione sotto.

   .statgrid nasce a 2 colonne e i blocchi qui sono 3: porto la griglia
   a 3 colonne inline. Nel tuo /lab in .ms le regolazioni di misura
   stanno inline allo stesso modo (style={{ marginTop: 26 }}), quindi
   resto nell'idioma invece di aggiungere una classe al DS vendorato —
   che va tenuto identico all'originale per poterlo ri-portare.

   .statgrid e' tarato sulla CARTA: filetti e numero usano valori
   d'inchiostro fissi (rgba(11,11,12,.16), var(--inchiostro)). Su una
   fascia ink sparirebbe. E' il motivo per cui questa sezione e' carta
   — oltre all'alternanza, che e' la regola madre del sistema.
   ============================================================ */

const BLOCCHI = ["1", "2", "3"] as const;

export function LabMsProof() {
  const t = useTranslations("Lab.proof");

  return (
    <section className="band carta" id="proof">
      <div className="wrap">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          {t("title")}
        </h2>

        <div
          className="statgrid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 26 }}
        >
          {BLOCCHI.map((n) => (
            <div className="cell" key={n}>
              <div className="k">{t(`blocks.${n}.label`)}</div>
              <div className="n">{t(`blocks.${n}.number`)}</div>
              <p className="l">{t(`blocks.${n}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
