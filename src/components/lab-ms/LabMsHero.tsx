import { useTranslations } from "next-intl";
import { LabMsCore } from "./LabMsCore";

/* ============================================================
   01 · HERO
   ------------------------------------------------------------
   WIREFRAME dell'originale, invariato: occhiello → titolo su tre
   righe → sottotitolo → IL DISEGNO ANIMATO → riga di spinta → due
   CTA → barra delle prove. Tutto centrato, com'era.

   DISEGNO tutto nuovo:
   · il titolo non e' piu' un blocco maiuscolo in font-black con tre
     gradienti sovrapposti. E' Clash in tondo minuscolo, peso 500 -
     la scala del DS (.hero h1). L'accento non lo da' un gradiente,
     lo da' UNA PAROLA in Playfair corsivo: "DNA". E' l'idioma .emph,
     ed e' l'unico punto di enfasi del titolo.
   · l'occhiello e' .eye: mono, lettere spaziate, lilla. Niente pill
     col pallino che pulsa.
   · le CTA sono .btn squadrate, raggio 8px. Niente pillole con alone.
   · la barra delle prove diventa .proofline: una riga sola in mono
     con i numeri in lilla, preceduta da una quota.
   ============================================================ */

export function LabMsHero() {
  const t = useTranslations("Lab.hero");
  const prove = Object.values(t.raw("proof_items") as Record<string, string>);

  /* L'accento cade sull'ULTIMA parola della seconda riga, "DNA".
     La prendo dalla copy invece di scriverla nel codice: se domani la
     riga cambia, l'enfasi si sposta con lei e non resta orfana. */
  const riga2 = t("headline.line2").trim();
  const taglio = riga2.lastIndexOf(" ");
  const riga2Testa = taglio > 0 ? riga2.slice(0, taglio) : riga2;
  const riga2Accento = taglio > 0 ? riga2.slice(taglio + 1) : "";

  return (
    <section className="band ink hero lab" id="hero">
      {/* alone ambientale: alleggerisce il nero dell'hero come sulla forge,
          dove la luce la dava il visual centrale. Sta dietro, non tocca il
          disegno (il .quadro e' opaco e ci si appoggia sopra). */}
      <div className="lab-aura" aria-hidden="true" />
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

        <div className="mt-14 text-left">
          <div className="quota">Rilevazioni</div>
          <p className="proofline" style={{ marginTop: 14, borderTop: "none", paddingTop: 0 }}>
            {prove.map((voce, i) => {
              /* la copy tiene numero ed etichetta in una stringa sola
                 ("2.000+ Persone formate"): isolo il numero solo quando
                 la voce comincia con una cifra, altrimenti su "AI Act
                 Compliance inclusa" finirebbe in evidenza "AI". */
              const cifra = /^\d/.test(voce);
              const sp = voce.indexOf(" ");
              return (
                <span key={voce}>
                  {i > 0 && "   ·   "}
                  {cifra && sp > 0 ? (
                    <>
                      <b>{voce.slice(0, sp)}</b>
                      {voce.slice(sp)}
                    </>
                  ) : (
                    voce
                  )}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
