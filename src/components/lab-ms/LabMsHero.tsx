import { useTranslations } from "next-intl";
import { LabMsCore } from "./LabMsCore";

/* ============================================================
   01 · HERO
   ------------------------------------------------------------
   WIREFRAME dell'originale: occhiello → titolo su tre righe →
   sottotitolo → IL DISEGNO ANIMATO → riga di spinta → due CTA.
   Tutto centrato, com'era.

   La barra "Rilevazioni" che chiudeva l'hero non c'e' piu'. Non
   aggiungeva niente: tre delle quattro voci sono gia' i numeri della
   sezione "Rilevazioni sul campo" poco sotto, e la quarta (AI Act)
   torna in altri sei punti della pagina, ognuno con il suo contesto.
   Letta di fila la riga si leggeva anche male, perche' i punti medi
   interni a "Ore recuperate · settimana · team medio" si confondevano
   con quelli che separano le voci. L'hero chiude sulle CTA.

   DISEGNO tutto nuovo:
   · il titolo non e' piu' un blocco maiuscolo in font-black con tre
     gradienti sovrapposti. E' Clash in tondo minuscolo, peso 500 -
     la scala del DS (.hero h1). L'accento non lo da' un gradiente,
     lo da' UNA PAROLA in Playfair corsivo: "DNA". E' l'idioma .emph,
     ed e' l'unico punto di enfasi del titolo.
   · l'occhiello e' .eye: mono, lettere spaziate, lilla. Niente pill
     col pallino che pulsa.
   · le CTA sono .btn squadrate, raggio 8px. Niente pillole con alone.
   ============================================================ */

export function LabMsHero() {
  const t = useTranslations("Lab.hero");

  /* L'accento cade sull'ULTIMA parola della seconda riga, "DNA".
     La prendo dalla copy invece di scriverla nel codice: se domani la
     riga cambia, l'enfasi si sposta con lei e non resta orfana. */
  const riga2 = t("headline.line2").trim();
  const taglio = riga2.lastIndexOf(" ");
  const riga2Testa = taglio > 0 ? riga2.slice(0, taglio) : riga2;
  const riga2Accento = taglio > 0 ? riga2.slice(taglio + 1) : "";

  return (
    <section className="band ink hero lab" id="hero">
      <div className="wrap text-center">
        <div className="eye justify-center">{t("eyebrow")}</div>

        <h1 className="mx-auto mt-4">
          {t("headline.line1")}
          <br />
          {riga2Testa}{" "}
          {riga2Accento && <span className="emph">{riga2Accento}</span>}
          <br />
          {t("headline.line3")}
        </h1>

        <p className="copy mx-auto">{t("subtitle")}</p>

        {/* il disegno, esattamente dove stava l'animazione */}
        <div className="mt-12 text-left">
          <LabMsCore />
        </div>

        <p className="lame mx-auto text-center">{t("cta_nudge")}</p>

        <div className="cta-row justify-center">
          <a className="btn btn-1" href="#contact">
            {t("cta_primary")}
          </a>
          <a className="btn btn-2-carta" href="#how-it-works">
            {t("cta_secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
