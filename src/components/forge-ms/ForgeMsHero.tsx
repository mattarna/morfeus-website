import { BOOKING_URL } from "@/components/site/booking";
import type { ForgeCopy } from "./copy";

/* ============================================================
   01 · HERO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo con l'enfasi su "expertise",
   paragrafo, la battuta fra virgolette, due CTA, la riga di prova.
   Stessa copy, stesso ordine.

   DISEGNO nuovo. La riga di prova era un paragrafo grigio in fondo,
   e conteneva i numeri che dimostrano tutto ("60+ sistemi", "dal
   2023"): il dato piu' forte della sezione trattato come una nota a
   pie' di pagina. Ora e' una QUOTA — la riga di misura con le tacche
   — perche' e' esattamente quello che fa: dichiara una misura.

   La battuta resta dov'era ma prende il filetto del pull-quote: e'
   una frase detta, non un paragrafo.
   ============================================================ */

export function ForgeMsHero({ t }: { t: ForgeCopy }) {
  return (
    <section className="band ink hero forge" id="hero">
      <div className="wrap">
        <div className="eye">{t.hero.eye}</div>
        <h1>
          {t.hero.h1a}
          <span className="emph">{t.hero.h1emph}</span>
          {t.hero.h1b}
        </h1>
        <p className="copy">{t.hero.copy}</p>

        <p className="tira-somme" style={{ marginTop: 26 }}>
          {t.hero.lame}
        </p>

        <div className="cta-row" style={{ marginTop: 32 }}>
          <a className="btn btn-1" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            {t.hero.cta1}
          </a>
          <a className="btn btn-2-carta" href="#prodotto">
            {t.hero.cta2}
          </a>
        </div>

        {/* La prova come misura, non come nota a pie' di pagina. La quota
            fa da intestazione (una parola), la riga sotto porta i numeri:
            non si ripetono, si presentano. */}
        <div className="quota" style={{ marginTop: 44 }}>
          <span>{t.hero.proof.pre.replace(/[▸·\s]+$/, "").replace(/^[▸\s]+/, "")}</span>
        </div>
        <p className="proofline" style={{ marginTop: 14 }}>
          <b>{t.hero.proof.b1}</b>
          {t.hero.proof.mid}
          <b>{t.hero.proof.b2}</b>
          {t.hero.proof.post}
        </p>
      </div>
    </section>
  );
}
