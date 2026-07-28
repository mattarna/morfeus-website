import Link from "next/link";
import { useTranslations } from "next-intl";
import { LabMsGlifo } from "./LabMsGlifo";

/* ============================================================
   10 · IL PONTE LAB → FORGE — fascia INCHIOSTRO
   ------------------------------------------------------------
   WIREFRAME invariato: intestazione centrata, due riquadri
   affiancati (Lab e Forge) con icona, titolo, riga di ruolo e
   descrizione; sotto il connettore fra i due, poi la frase di
   chiusura e il bottone verso Forge.

   DISEGNO: il connettore era una pillola con un "+" dentro. Qui
   diventa un GIUNTO da disegno tecnico — due tratti che entrano da
   sinistra e da destra e un rombo di innesto al centro, mezzo lilla
   e mezzo forge, uno per insegna. Dice "queste due cose si
   incastrano", che e' esattamente l'argomento della sezione.

   Il Forge tiene il suo tono caldo: e' l'unico altro punto della
   pagina dove il forge compare, e qui non e' allarme — e' l'altra
   insegna. Stesso colore, ruolo diverso, e si capisce dal contesto.
   ============================================================ */

export function LabMsBridge() {
  const t = useTranslations("Lab.bridge");

  return (
    <section className="band ink lab" id="bridge">
      <div className="wrap">
        <div className="text-center">
          <div className="eye justify-center">{t("label")}</div>
          <h2 className="h-sect mx-auto max-w-[22ch]">
            {t.rich("headline", {
              br: () => <br />,
              spanSub: (chunks) => <span className="emph">{chunks}</span>,
            })}
          </h2>
          <p className="lead mx-auto">{t("subtitle")}</p>
        </div>

        <div className="two mt-12">
          <article className="scheda" style={{ borderColor: "rgba(140,165,247,.4)" }}>
            <span className="filo" style={{ opacity: 0.75 }} />
            <div className="sopra">
              <div className="flex items-center gap-4">
                <LabMsGlifo nome="medaglia" />
                <div>
                  <h3 style={{ marginTop: 0 }}>{t("lab.title")}</h3>
                  <span className="cod">{t("lab.desc")}</span>
                </div>
              </div>
              <p className="mt-5">{t("lab.detail")}</p>
            </div>
          </article>

          <article className="scheda" style={{ borderColor: "rgba(232,101,10,.35)" }}>
            <span
              className="filo"
              style={{
                opacity: 0.75,
                background:
                  "linear-gradient(90deg, transparent, var(--marker), transparent)",
              }}
            />
            <div className="sopra">
              <div className="flex items-center gap-4">
                <LabMsGlifo nome="cpu" allarme />
                <div>
                  <h3 style={{ marginTop: 0 }}>{t("forge.title")}</h3>
                  <span className="cod" style={{ color: "var(--marker)" }}>
                    {t("forge.desc")}
                  </span>
                </div>
              </div>
              <p className="mt-5">{t("forge.detail")}</p>
            </div>
          </article>
        </div>

        {/* il giunto: due tratti e un rombo d'innesto, mezzo per insegna */}
        <div className="mt-8 flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-16 bg-[rgba(140,165,247,.45)]" />
          <svg viewBox="0 0 28 28" className="h-6 w-6">
            <rect
              x="6"
              y="6"
              width="16"
              height="16"
              transform="rotate(45 14 14)"
              fill="none"
              stroke="rgba(140,165,247,.7)"
              strokeWidth="1"
            />
            <path d="M14 4.5 4.5 14 14 23.5Z" fill="rgba(140,165,247,.22)" />
            <path d="M14 4.5 23.5 14 14 23.5Z" fill="rgba(232,101,10,.22)" />
          </svg>
          <span className="h-px w-16 bg-[rgba(232,101,10,.45)]" />
        </div>

        <p className="compound mx-auto mt-8 max-w-[68ch]">{t("closing")}</p>

        <div className="cta-row justify-center" style={{ marginTop: 26 }}>
          <Link
            className="btn btn-2-carta"
            href="/forge"
            style={{ borderColor: "rgba(232,101,10,.5)", color: "var(--marker)" }}
          >
            {t("forge_cta")}
            <span className="arr" aria-hidden="true">
              {" "}
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
