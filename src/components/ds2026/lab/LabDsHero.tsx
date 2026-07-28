import { useTranslations } from "next-intl";
import { LabDsCore } from "@/components/ds2026/lab/LabDsCore";
import { DsCta } from "@/components/ds2026/DsCta";

/* ============================================================
   HERO — la copertina.
   ------------------------------------------------------------
   Copy identica a /lab: stessi namespace (Lab.hero, Lab.ctas), zero
   testi riscritti. Quello che cambia e' solo come sta in pagina.

   SCALA DEL TITOLO. Non uso --fs-hero (clamp 48→150px): a 150px una
   headline di tre righe diventa un muro. Uso i valori dell'hero VERO
   del DS, quello di t-hub.css riga 47:
     clamp(38px,4.8vw,64px) · lh 1.02 · ls -.035em · semibold · 18ch
   Non e' un gusto mio, e' il walk-back del 2026-07-27 gia' applicato:
   "titoli GIGANTI e pagine vuote", bocciato. Il massimo resta sopra
   --fs-display (48px), quindi la gerarchia "niente supera l'hero"
   tiene.

   TITOLO A DUE TONI (.t-duo em). L'<em> non e' corsivo: e' un cambio
   di tono su --accent-fine. Cade sulle righe 2-3 perche' la frase e'
   costruita su un'opposizione — "Non insegniamo" / "La innestiamo" —
   e il secondo termine e' quello che vende. Da' l'accento senza
   aggiungere un colore in piu' alla pagina.
   ============================================================ */

export function LabDsHero() {
  const t = useTranslations("Lab.hero");

  const prove = ["1", "2", "3", "4"].map((n) => t(`proof_items.${n}`));

  return (
    <section id="hero" className="section pt-[calc(var(--sp-10))]">
      <div className="container">
        <div className="grid items-center">
          <div className="col-7">
            {/* i due marcatori di sistema dell'originale, in registro DS:
                chip mono, non testo colorato nudo */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge--accent">
                <span className="dot" />
                {t("system_tag")}
              </span>
              <span className="t-label">{t("version")}</span>
            </div>

            <p className="eyebrow mt-6">{t("eyebrow")}</p>

            <h1
              className="t-duo mt-5"
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "clamp(38px,4.8vw,64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                fontWeight: "var(--fw-semibold)",
                maxWidth: "18ch",
                overflowWrap: "anywhere",
              }}
            >
              {t("headline.line1")}{" "}
              <em>
                {t("headline.line2")} {t("headline.line3")}
              </em>
            </h1>

            <p className="t-lede mt-7">{t("subtitle")}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <DsCta target="contact" variante="primary">
                {t("cta_primary")}
              </DsCta>
              <DsCta target="how-it-works" variante="ghost">
                {t("cta_secondary")}
              </DsCta>
            </div>

            <p className="t-small mt-5">{t("cta_nudge")}</p>
          </div>

          <div className="col-5">
            <LabDsCore />
          </div>
        </div>

        {/* Le quattro prove dell'hero. Nell'originale sono una riga di
            pillole; qui restano una riga sola ma diventano un filo di
            metadati sotto la copertina, in mono: il DS tiene il mono per
            "dati, label, prove", ed e' esattamente cosa sono. */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6"
             style={{ borderColor: "var(--line)" }}>
          {prove.map((prova) => (
            <span key={prova} className="t-data" style={{ color: "var(--text-muted)" }}>
              {prova}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
