import { useTranslations } from "next-intl";

/* ============================================================
   08 · INVESTIMENTO, fascia CARTA (secondo stacco)
   ------------------------------------------------------------
   Il secondo stacco chiaro, e cade dove si parla di soldi. Su carta
   il blocco legge come un preventivo stampato invece che come una
   schermata: e' il registro giusto per un numero che qualcuno deve
   portare a un consiglio.

   WIREFRAME invariato: intestazione centrata su due righe, un
   riquadro con il prezzo grande, quattro voci di cosa comprende, la
   CTA, e la nota sotto.

   DISEGNO: il riquadro diventa un modulo, striscia di stato in
   cima, prezzo come voce di quota, requisiti con la spunta
   disegnata a bordo. Niente card lucida: un documento.
   ============================================================ */

export function LabMsInvestimento() {
  const t = useTranslations("Lab.investment");
  const voci = Object.values(t.raw("card.items") as Record<string, string>);

  return (
    <section className="band carta lab" id="investment">
      <div className="wrap">
        <div className="text-center">
          <div className="eye justify-center">{t("label")}</div>
          <h2 className="h-sect mx-auto max-w-[16ch]">
            {t("headline.line1")}
            <br />
            <span className="emph">{t("headline.line2")}</span>
          </h2>
          <p className="lead mx-auto">{t("subtitle")}</p>
        </div>

        <div className="quadro centrato mt-12 max-w-[760px]">
          <div className="readout">
            <span>Programma · su misura</span>
            <span className="on">
              <i />
              Proposta valida 10 giorni
            </span>
          </div>

          <div className="corpo-modulo">
            <div className="quota">Investimento</div>
            {/* Qui stava la cifra ("A partire da €4.500"), e la scala era
                tarata su quella: 42px, interlinea zero, tre parole. Ora la
                voce e' una frase, e a 42px andava a capo occupando il
                doppio dell'altezza. A 30px sta su una riga in italiano e
                in inglese, e resta comunque la voce piu' grande della
                scheda: sopra ha una quota da 13px, sotto voci da 16,5px.
                Il tetto e' 26 e non 30: nel modulo la riga ha 663px, e a
                30px la frase italiana ne chiede 668, cioe' va a capo per
                cinque pixel. A 26 ne chiede 579 e il margine e' del 14%,
                che regge una copy un po' piu' lunga o un font di ripiego.
                L'interlinea non e' piu' `none` perche' una frase, se un
                giorno va a capo su schermo stretto, non deve impastarsi. */}
            <p
              className="mt-4 text-[clamp(20px,2.1vw,26px)] leading-[1.2] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {t("card.price")}
            </p>

            <div className="quota mt-9">Comprende</div>

            <ul className="mt-5 flex flex-col gap-4">
              {voci.map((v) => (
                <li className="spunta" key={v}>
                  <i />
                  <span className="text-[16.5px] leading-[1.6]">{v}</span>
                </li>
              ))}
            </ul>

            <div className="cta-row centrata" style={{ marginTop: 32 }}>
              <a className="btn btn-1" href="#contact">
                {t("card.cta")}
              </a>
            </div>
          </div>
        </div>

        <p className="compound centrato mt-8 max-w-[62ch]">{t("note")}</p>
      </div>
    </section>
  );
}
