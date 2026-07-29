import { useTranslations } from "next-intl";

/* ============================================================
   02 · DATI REALI DA AZIENDE REALI
   ------------------------------------------------------------
   WIREFRAME invariato: titolo di sezione, poi tre numeri affiancati,
   ognuno con etichetta e descrizione.

   DISEGNO nuovo: i tre numeri non galleggiano piu' nel vuoto. Stanno
   dentro UN pannello solo, uno strumento a tre quadranti, con la
   striscia di stato in cima e i quadranti divisi da filetti. Dietro
   ogni numero c'e' la sua cifra fantasma.

   Perche' un pannello e non tre blocchi liberi: sono tre letture
   della STESSA misurazione, e un solo strumento lo dice meglio di
   tre riquadri. Cosi' la sezione ha una forma, invece di essere una
   riga di testo grande.

   NIENTE BARRE DI RIEMPIMENTO, per quanto belle: una barra dichiara
   una proporzione, e qui non c'e' una scala nota su cui misurarla.
   Disegnarla sarebbe inventare un dato. Restano il numero e la sua
   etichetta, che sono veri.
   ============================================================ */

const BLOCCHI = ["1", "2", "3"] as const;

export function LabMsProof() {
  const t = useTranslations("Lab.proof");
  const chiusura = t("closing").trim();

  return (
    <section className="band ink lab" id="proof">
      <div className="wrap">
        <div className="eye">Rilevazioni sul campo</div>
        <h2 className="h-sect max-w-[18ch]">{t("title")}</h2>

        <div className="quadro mt-10">
          <div className="readout">
            <span>Misurazioni · aziende clienti</span>
            <span className="on">
              <i />3 letture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {BLOCCHI.map((n, i) => (
              <div
                key={n}
                className="quadrante"
              >
                {/* la cifra fantasma: e' l'indice del quadrante, non un dato */}
                <span className="ghost -right-1 -top-4">{`0${i + 1}`}</span>

                <div className="sopra">
                  <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-[color:var(--ombra)]">
                    {t(`blocks.${n}.label`)}
                  </div>

                  <div className="statnum mt-4 text-[clamp(38px,5vw,60px)]">
                    {t(`blocks.${n}.number`)}
                  </div>

                  <div className="quota mt-5" />

                  <p className="mt-4 text-[16.5px] leading-[1.6] text-[color:var(--testo-ink-2)]">
                    {t(`blocks.${n}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {chiusura ? <p className="compound mt-8">{chiusura}</p> : null}
      </div>
    </section>
  );
}
