"use client";

import { useTranslations } from "next-intl";
import { conGrassetto } from "./grassetto";

/* ============================================================
   13 · LE DOMANDE
   ------------------------------------------------------------
   WIREFRAME: occhiello, titolo, le domande con risposta. Stesse chiavi
   (`Offerta.faq_operating_system`), ma da 18 domande a OTTO: vedi
   l'elenco DOMANDE qui sotto per quali sono cadute e perche'.

   DISEGNO nuovo, e cambia anche il MECCANISMO. Prima l'apertura era
   gestita in React (`activeFaq` con lo stato che saliva fino alla
   pagina): una domanda alla volta, e senza JavaScript non si apriva
   niente. Ora sono `<details>` nativi — si aprono anche a JS spento,
   il browser li rende accessibili da tastiera senza che noi scriviamo
   nulla, e piu' d'una puo' restare aperta mentre confronti.

   Le righe sono separate da filetti, non da scatole: una domanda e'
   una riga di un elenco, non una card. Il segno + che diventa − e'
   l'unico movimento.

   Le risposte contengono `**grassetto**` in stile markdown nel file
   di traduzione: qui viene reso davvero, invece di comparire con gli
   asterischi a vista.
   ============================================================ */

type Voce = { q: string; a: string };

/* LE OTTO CHE RESTANO, in quest'ordine.
   Diciotto voci chiuse in fondo alla pagina non sono una FAQ: sono un
   muro che nessuno apre. Il file di traduzione NON e' stato toccato:
   le altre dieci sono ancora li', basta rimettere una chiave in questo
   elenco per farla tornare in pagina.

   Cadute perche' la pagina risponde gia', prima e meglio:
     02 a progetto o continuativo -> Come funziona, e il Pilot
     05 in quanto tempo           -> i 30-60 giorni del Pilot
     06 chi decide ogni mese      -> la fase 02, roadmap per impatto
     09 automazioni indipendenti  -> e' tutta la sezione Confronto
     10 lavorate con chiunque     -> e' Per chi e', per chi non e'
     14 come si capisce se il     -> si sovrappone alla 13
        Pilot e' riuscito
     16 consulenza o team         -> l'hero e il Cambio di prospettiva
     18 a cosa serve la call      -> e' la sezione Contatto, due sopra

   Cadute perche' dicono il falso:
     03 "unita' di delivery"      -> vocabolario che non esiste piu'
     04 "slot S, M e L"           -> i livelli si chiamano Focus, Core
                                     e Scale da un pezzo

   Restano le otto obiezioni che una persona ha ancora addosso DOPO
   aver letto tutto: cos'e', quanto costa, com'e' il primo passo, cosa
   succede se va male, se sono pronto, con cosa lo fate, chi lo tiene
   in piedi nel tempo, e cosa NON fate. */
const DOMANDE = ["1", "12", "13", "15", "11", "7", "8", "17"] as const;

export function ForgeMsFaq() {
  const t = useTranslations("Offerta.faq_operating_system");
  const items = t.raw("items") as Record<string, Voce>;

  return (
    <section className="band ink forge" id="faq">
      <div className="wrap">
        <div className="eye">{t("tag")}</div>
        <h2 className="h-sect">{t("sectionTitle")}</h2>

        <div className="faq" style={{ marginTop: 34 }}>
          {DOMANDE.map((k) => {
            const v = items[k];
            if (!v) return null;
            return (
              <details key={k}>
                <summary>
                  <span>{v.q}</span>
                  <span className="segno" aria-hidden="true" />
                </summary>
                <div className="risposta">{conGrassetto(v.a)}</div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
