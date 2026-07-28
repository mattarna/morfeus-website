import { useTranslations } from "next-intl";

/* ============================================================
   04 · I TRE LIVELLI — fascia CARTA.
   ------------------------------------------------------------
   Qui l'idioma esiste gia' identico nel tuo /lab in .ms: .ladder con
   tre .rung come scaletta muta sopra le carte, poi .three con la carta
   centrale in .sel (il livello target) e l'esito in .otag.

   Il livello da evidenziare NON e' il secondo per posizione: e' quello
   marcato TARGET nella copy (Lab.levels.tiers.champion.tag contiene
   "TARGET"). Lo leggo dalla copy invece di scriverci "1" a mano, cosi'
   se domani il target si sposta la pagina segue senza toccare il
   codice.
   ============================================================ */

const LIVELLI = ["literate", "champion", "architect"] as const;

export function LabMsLevels() {
  const t = useTranslations("Lab.levels");

  return (
    <section className="band carta" id="levels">
      <div className="wrap">
        <div className="eye">{t("label")}</div>
        <h2 className="h-sect">
          {t.rich("headline", {
            br: () => <br />,
            spanSub: (chunks) => <span className="emph">{chunks}</span>,
          })}
        </h2>
        <p className="lead">{t("subtitle")}</p>

        {/* la scaletta: puramente decorativa, quindi fuori dall'albero
            accessibile — i tre gradini non aggiungono nulla a chi legge
            con uno screen reader, le carte sotto dicono gia' tutto */}
        <div className="ladder" aria-hidden="true">
          <div className="rung" />
          <div className="rung" />
          <div className="rung" />
        </div>

        <div className="three">
          {LIVELLI.map((k) => {
            const tag = t(`tiers.${k}.tag`);
            const eIlTarget = tag.toUpperCase().includes("TARGET");
            return (
              <div className={eIlTarget ? "card sel" : "card"} key={k}>
                <div className="ck">{tag}</div>
                <div className="ct">{t(`tiers.${k}.name`)}</div>
                <p>{t(`tiers.${k}.desc`)}</p>
                <span className="otag">{t(`tiers.${k}.outcome`)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
