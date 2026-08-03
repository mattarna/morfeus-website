"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SiteROIMeter } from "@/components/site/SiteROIMeter";

/* ============================================================
   09 · IL ROIOMETRO
   ------------------------------------------------------------
   WIREFRAME invariato: occhiello, titolo, sottotitolo, il calcolatore.

   COSA C'ERA QUI, e perche' era il pezzo peggiore della pagina.
   Questa sezione montava `HomeROIMeter`, il calcolatore della VECCHIA
   home, dentro un `.quadro`. Non era un disegno: era un innesto, e si
   portava dietro tutto quello che aveva addosso.

     · `h-screen` su desktop: si prendeva una schermata intera comunque,
       anche quando il contenuto ne chiedeva meta'.
     · un suo `max-w-[1400px]` dentro il `.wrap` da 1120px del sito: due
       contenitori che si contendono la larghezza.
     · `#4D39EB` scritto a mano, che NON e' il `#533DFC` del brand: il
       viola del calcolatore e quello della pagina erano due viola
       diversi, uno sotto l'altro.
     · rose-500 ed emerald-500, fuori dagli otto colori della palette,
       al posto di `--anomalia` e `--ok`.
     · etichette a `text-[8px]` e `text-[9px]`. La regola del sistema e'
       18px di base e 16 come minimo assoluto per un testo che porta
       significato: qui si stava a meno di meta'.
     · e infine il doppio guscio: una card dentro il `.quadro` dentro la
       fascia, tre bordi concentrici per dire una cosa sola.

   COSA C'E' ORA. `SiteROIMeter`: lo stesso identico calcolo, ma e' il
   componente del KIT — quello che gira su `/roiometro`. Token del
   sistema, tipografia del sistema, `.card` che prende da sola i colori
   della fascia, i due bottoni `btn-1`/`btn-2-carta` di tutte le altre
   pagine, e il numero-verdetto annuale a clamp(34-56px) invece che
   un'etichetta da 8px.

   IL TITOLO INTERNO DEL CALCOLATORE resta nel componente (su
   `/roiometro` e' l'unica intestazione che c'e', e li' serve), ma qui
   sopra c'e' gia' il titolo di fascia che legge la STESSA chiave: si
   nasconde il doppione, con una regola limitata a `.roiometro` dentro
   `.forge`, cosi' `/roiometro` non se ne accorge. Vedi forge-ms.css.
   ============================================================ */

export function ForgeMsRoi() {
  const t = useTranslations("Offerta.roi_meter");

  /* Il titolo contiene `<spanIndigo>`: senza il marcatore next-intl
     stampava `Offerta.roi_meter.headline` al posto della frase. */
  const rich = {
    br: () => <br />,
    spanIndigo: (chunks: ReactNode) => <span className="emph">{chunks}</span>,
  };

  return (
    <section className="band ink forge" id="roi-section">
      <div className="wrap">
        <div className="eye">{t("tag")}</div>
        <h2 className="h-sect">{t.rich("headline", rich)}</h2>
        <p className="lead">{t("subtitle")}</p>
      </div>

      {/* `SiteROIMeter` porta gia' il suo `.wrap`: non va incapsulato in
          un altro, o si stringe due volte. */}
      <div className="roiometro">
        <SiteROIMeter />
      </div>
    </section>
  );
}
