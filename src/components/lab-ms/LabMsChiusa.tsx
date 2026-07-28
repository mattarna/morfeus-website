import { useTranslations } from "next-intl";

/* ============================================================
   13 · LA CHIUSA, fascia INCHIOSTRO
   ------------------------------------------------------------
   Nell'originale la sezione 13 e' un footer tutto suo (ServiceFooter)
   con navigazione, link legali, contatti e la frase di marca.

   QUI NON LO RICOSTRUISCO, e la ragione e' che sarebbe un doppione:
   SiteShell monta gia' il SiteFooter del sistema, quello vero, che
   sta anche su /insights e su tutte le altre pagine del sito madre.
   Due footer uno sopra l'altro sarebbero un errore, non una fedelta'.

   Quello che invece si perderebbe e' la FRASE DI MARCA, che e' copy
   buona e chiude la pagina con la voce giusta. Quindi resta, da sola,
   come ultima battuta prima del footer di sistema.

   La copy usa quattro tag rich diversi (spanRose, spanOr, spanIndigo,
   spanSub) ereditati dalla vecchia palette. Li mappo sul vocabolario
   nuovo: il soggetto in Playfair corsivo, il resto in tono pieno o
   attenuato. Dichiararli tutti e' obbligatorio, un tag non
   dichiarato next-intl lo stampa grezzo in pagina.
   ============================================================ */

export function LabMsChiusa() {
  const t = useTranslations("Lab.landing_footer");

  return (
    <section className="band ink lab">
      <div className="wrap text-center">
        <div className="quota justify-center">Morf Lab</div>

        <p
          className="mx-auto mt-8 max-w-[24ch] text-[clamp(28px,4.4vw,52px)] leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {t.rich("brand_quote", {
            spanRose: (c) => <span className="emph">{c}</span>,
            spanOr: (c) => <span>{c}</span>,
            spanIndigo: (c) => <span style={{ color: "var(--lilla)" }}>{c}</span>,
            spanSub: (c) => (
              <span style={{ color: "var(--testo-ink-3)" }}>{c}</span>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
