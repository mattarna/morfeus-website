import { useTranslations } from "next-intl";

/* ============================================================
   01 · HERO — fascia INCHIOSTRO.
   ------------------------------------------------------------
   Idioma preso dal /lab in .ms scritto da Matteo su exp/font-jakarta:
     section.band.ink.hero > .wrap > .eye · h1 (con .emph) · p.copy ·
     p.lame · .cta-row > .btn.btn-1 + .btn.btn-2-carta · p.proofline

   La headline dell'originale e' su tre righe (line1/line2/line3).
   L'opposizione della frase — "Non insegniamo" / "La innestiamo" —
   diventa il taglio a due toni del DS: la seconda parte va in .emph,
   che qui e' Playfair corsivo in lilla. E' la stessa mappatura che hai
   fatto tu sul tuo /lab, dove lo spanSub dell'originale e' diventato
   .emph — non l'ho decisa io.
   ============================================================ */

export function LabMsHero() {
  const t = useTranslations("Lab.hero");

  const prove = ["1", "2", "3", "4"].map((n) => t(`proof_items.${n}`));

  return (
    <section className="band ink hero" id="hero">
      <div className="wrap">
        <div className="eye">{t("eyebrow")}</div>

        <h1>
          {t("headline.line1")}{" "}
          <span className="emph">
            {t("headline.line2")} {t("headline.line3")}
          </span>
        </h1>

        <p className="copy">{t("subtitle")}</p>

        {/* .lame: la riga di carattere sotto il sottotitolo. Nell'originale
            questo spazio lo occupa il "nudge" sopra le CTA; qui sale al
            posto suo, che e' dove il DS lo vuole. */}
        <p className="lame">{t("cta_nudge")}</p>

        <div className="cta-row">
          <a className="btn btn-1" href="#contact">
            {t("cta_primary")}
          </a>
          <a className="btn btn-2-carta" href="#how-it-works">
            {t("cta_secondary")}
          </a>
        </div>

        {/* proofline: le quattro prove dell'hero su una riga sola in mono.
            Il <b> in lilla va sul numero. La copy le tiene come stringhe
            gia' composte ("2.000+ Persone formate"), quindi il numero lo
            isolo sul primo spazio — ma SOLO se la voce comincia con una
            cifra, altrimenti su "AI Act Compliance inclusa" finirebbe in
            grassetto "AI", che non e' un dato. */}
        <p className="proofline">
          {"▸ PROVA · "}
          {prove.map((voce, i) => {
            const cominciaConNumero = /^\d/.test(voce);
            const taglio = voce.indexOf(" ");
            return (
              <span key={voce}>
                {i > 0 && " · "}
                {cominciaConNumero && taglio > 0 ? (
                  <>
                    <b>{voce.slice(0, taglio)}</b>
                    {voce.slice(taglio)}
                  </>
                ) : (
                  voce
                )}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
