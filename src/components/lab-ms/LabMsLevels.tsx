import { useTranslations } from "next-intl";

/* ============================================================
   04 · I TRE LIVELLI
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello e titolo centrati, sottotitolo, la
   scaletta ascendente, tre schede affiancate con quella centrale
   evidenziata, i risultati come chip.

   DISEGNO nuovo, costruito su due tuoi dispositivi:
   · .ladder, la scaletta a tre gradini che sale. Esiste gia' nel DS
     ed e' nata per questa sezione: non l'ho reinventata.
   · la rotaia: e' la tua .vtimeline coricata. Le fasi verticali hanno
     senso quando si susseguono nel tempo; i livelli si leggono in
     parallelo, quindi la linea va in orizzontale e i tre pallini
     cadono sull'asse delle tre colonne. Quello pieno e' il target.

   IL COLORE segue il significato, non l'ordine: 01 e 02 sono lilla
   perche' si fanno dentro l'azienda; 03 passa a forge perche' la copy
   dice che quel livello "si porta dentro con Morf Forge", cioe' non
   e' piu' LAB. Il cambio di tono dice la stessa cosa del testo.
   ============================================================ */

const LIVELLI = [
  { id: "literate", cifra: "01", tono: "var(--lilla)" },
  { id: "champion", cifra: "02", tono: "var(--lilla)" },
  { id: "architect", cifra: "03", tono: "var(--marker)" },
] as const;

export function LabMsLevels() {
  const t = useTranslations("Lab.levels");
  const insight = t("insight").trim();

  return (
    <section className="band ink lab" id="levels">
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

        {/* la scaletta del DS: tre gradini che salgono */}
        <div className="ladder mx-auto mt-12 max-w-[420px]" aria-hidden="true">
          <div className="rung" />
          <div className="rung" />
          <div className="rung" />
        </div>

        {/* la rotaia: i tre pallini cadono sull'asse delle colonne */}
        <div className="rail hidden md:block" aria-hidden="true">
          <span style={{ left: "16.66%", marginLeft: -5.5 }} />
          <span className="pieno" style={{ left: "50%", marginLeft: -5.5 }} />
          <span style={{ left: "83.33%", marginLeft: -5.5 }} />
        </div>

        <div className="three">
          {LIVELLI.map((liv) => {
            const tag = t(`tiers.${liv.id}.tag`);
            const eIlTarget = tag.toUpperCase().includes("TARGET");
            const esiti = t(`tiers.${liv.id}.outcome`).split(" · ");

            return (
              <article
                className="scheda flex flex-col"
                key={liv.id}
                style={
                  eIlTarget
                    ? { borderColor: "rgba(140,165,247,.55)" }
                    : undefined
                }
              >
                <span className="filo" style={{ opacity: eIlTarget ? 0.9 : undefined }} />
                <span className="ghost -right-2 -top-6">{liv.cifra}</span>

                <div className="sopra flex h-full flex-col">
                  <span className="cod" style={{ color: liv.tono }}>
                    {tag}
                  </span>

                  <h3 style={{ color: liv.tono }}>{t(`tiers.${liv.id}.name`)}</h3>

                  <p className="grow">{t(`tiers.${liv.id}.desc`)}</p>

                  <div className="mt-5 border-t border-[color:var(--surf-bd)] pt-5">
                    <div className="flex flex-wrap gap-2">
                      {esiti.map((esito) => (
                        <span
                          key={esito}
                          className="otag"
                          style={{
                            marginTop: 0,
                            borderColor:
                              liv.tono === "var(--marker)"
                                ? "rgba(232,101,10,.4)"
                                : undefined,
                            color: liv.tono,
                          }}
                        >
                          {esito}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {insight.length > 0 && <p className="compound mt-12">{insight}</p>}
      </div>
    </section>
  );
}
