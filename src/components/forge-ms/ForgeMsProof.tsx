"use client";

import { useTranslations } from "next-intl";

/* ============================================================
   02 · RISULTATI OPERATIVI
   ------------------------------------------------------------
   WIREFRAME invariato: titolo, i tre numeri (240k · 85% · +1.500) con
   etichetta e descrizione, la frase di chiusura. Stesse chiavi i18n
   (`Offerta.proof`).

   DISEGNO nuovo. I tre numeri erano in gradiente bianco-grigio e si
   perdevano. Ora diventano il DATO: corpo del display, colore pieno,
   etichetta sotto, descrizione in terza battuta.

   FASCIA, corretta il 2026-07-31. Era `carta`. La pagina alternava
   ink/carta a ogni sezione, sei stacchi su tredici, e meta' pagina
   restava pallida: scatola bianca su fondo quasi bianco, contrasto
   intorno al 4%. Il Lab, da cui questa pagina prende il metodo, tiene
   undici fasce ink e DUE stacchi carta soltanto. Qui si fa lo stesso:
   la prova sta sull'ink, dove i numeri si accendono.
   ============================================================ */

const BLOCCHI = ["1", "2", "3"] as const;

export function ForgeMsProof() {
  const t = useTranslations("Offerta.proof");

  return (
    <section className="band ink forge" id="proof">
      <div className="wrap">
        <h2 className="h-sect">{t("title")}</h2>

        <div className="tre" style={{ marginTop: 40, gap: 34 }}>
          {BLOCCHI.map((k) => (
            <div className="dato" key={k}>
              <span className="cifra">{t(`blocks.${k}.number`)}</span>
              <span className="eti">{t(`blocks.${k}.label`)}</span>
              <p>{t(`blocks.${k}.description`)}</p>
            </div>
          ))}
        </div>

        <p className="tira-somme" style={{ marginTop: 44 }}>
          {t("closing").trim()}
        </p>
      </div>
    </section>
  );
}
