import { useLocale, useTranslations } from "next-intl";
/* L'URL era scritto a mano nel bottone: non sapeva la lingua, quindi
   anche da /lab in inglese mandava al calendario italiano. */
import { bookingUrl } from "@/components/site/booking";

/* ============================================================
   11 · CONTATTO, fascia INCHIOSTRO
   ------------------------------------------------------------
   WIREFRAME invariato: intestazione con CTA, il blocco "cosa
   succede durante la call" con tre passi numerati, i tre badge di
   cosa NON e', e la riga finale di pill.

   DISEGNO: i tre passi della call diventano un ORDINE DI SERVIZIO -
   tre righe dentro un solo pannello, divise da filetti, con l'orario
   progressivo in mono a sinistra. Sono venti minuti scanditi, e
   scriverlo cosi' lo rende una promessa verificabile invece di tre
   riquadri generici.

   I tre badge negativi restano negativi ma cambiano segno grafico:
   invece di spunte, un trattino. Dicono cosa NON succede, e un
   trattino lo dice meglio di una spunta.

   Attenzione al tag rich: qui la copy usa <spanIndigo>, non
   <spanSub> come nel resto della pagina. Va dichiarato, o next-intl
   stampa il markup grezzo.
   ============================================================ */

const PASSI = [
  { k: "1", quando: "00:00" },
  { k: "2", quando: "00:07" },
  { k: "3", quando: "00:15" },
] as const;

export function LabMsContatto() {
  const t = useTranslations("Lab.contact");
  const locale = useLocale();
  const pills = t.raw("footer_pills") as string[];

  return (
    <section className="band ink lab" id="contact">
      <div className="wrap">
        <div className="ctaq">
          <div className="eye justify-center">{t("label")}</div>
          <h2 className="h-sect mx-auto max-w-[18ch]">
            {t.rich("headline", {
              br: () => <br />,
              spanIndigo: (chunks) => <span className="emph">{chunks}</span>,
            })}
          </h2>
          <p>{t("subtitle")}</p>

          <div className="cta-row">
            <a
              className="btn btn-1"
              href={bookingUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        {/* l'ordine di servizio della call */}
        <div className="quadro centrato mt-14 max-w-[800px]">
          <div className="readout">
            <span>{t("call_section_title")}</span>
            <span className="on">
              <i />
              20 minuti
            </span>
          </div>

          {PASSI.map((p) => (
            <div
              key={p.k}
              className="riga-ordine"
            >
              <span className="font-mono text-[13px] tracking-[0.12em] text-[color:var(--ombra)]">
                {p.quando}
              </span>
              <div>
                <h3 className="text-[19px] tracking-[-0.01em]">
                  {t(`call_steps.${p.k}.title`)}
                </h3>
                <p className="mt-2 text-[16.5px] leading-[1.6] text-[color:var(--testo-ink-2)]">
                  {t(`call_steps.${p.k}.desc`)}
                </p>
              </div>
            </div>
          ))}

          {/* cosa NON e': trattino, non spunta */}
          <div className="riga-chiusa">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {[t("badges.no_demo"), t("badges.no_sales"), t("badges.no_info")].map(
                (b) => (
                  <span
                    key={b}
                    className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.12em] text-[color:var(--ombra)]"
                  >
                    <span className="h-px w-4 bg-[color:var(--ombra)]" />
                    {b}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {pills.map((p) => (
            <span className="otag" key={p} style={{ marginTop: 0 }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
