import { useTranslations } from "next-intl";
import { LabMsGlifo } from "./LabMsGlifo";

/* ============================================================
   07 · I RISULTATI, fascia INCHIOSTRO
   ------------------------------------------------------------
   Si torna al buio: dopo il metodo, si torna a misurare.

   WIREFRAME invariato: intestazione centrata e sei riquadri in
   griglia a tre colonne, ognuno con icona, titolo e descrizione.

   DISEGNO: sei schede di esito con codice progressivo R01..R06 e il
   glifo a tratto. La cifra fantasma dietro tiene il passo della
   griglia, con sei riquadri uguali serve qualcosa che dia ordine di
   lettura, altrimenti l'occhio non sa da dove cominciare.

   I glifi riusano la stessa gabbia degli altri: due sono nuovi
   (bersaglio, chiave), gli altri quattro erano gia' disegnati.
   ============================================================ */

const ESITI = [
  { k: "1", glifo: "orologio" },
  { k: "2", glifo: "bersaglio" },
  { k: "3", glifo: "curvaSu" },
  { k: "4", glifo: "scudo" },
  { k: "5", glifo: "stella" },
  { k: "6", glifo: "chiave" },
] as const;

export function LabMsRisultati() {
  const t = useTranslations("Lab.outcomes");

  return (
    <section className="band ink lab" id="outcomes">
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

        <div className="three mt-12">
          {ESITI.map((e, i) => (
            <article className="scheda" key={e.k}>
              <span className="filo" />
              <span className="ghost -right-2 -top-6">{`R0${i + 1}`}</span>
              <div className="sopra">
                <LabMsGlifo nome={e.glifo} />
                <h3>{t(`items.${e.k}.title`)}</h3>
                <p>{t(`items.${e.k}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
