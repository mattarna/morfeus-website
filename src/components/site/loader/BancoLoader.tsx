"use client";

import { useState } from "react";
import { LoaderStrumento } from "./LoaderStrumento";
import { LoaderGriglia } from "./LoaderGriglia";

/* ============================================================
   Il banco di prova: fa rigiocare A e C sulla pagina vera, con la
   testata vera, quante volte serve. Serve a scegliere, non a
   spedire: quando la scelta e' fatta, questa pagina si cancella.

   Le due si guardano UNA ALLA VOLTA e sulla stessa pagina apposta.
   Affiancate in due riquadri sembrerebbero due gif; qui invece si
   vede la cosa che conta davvero, cioe' come finiscono: dove ti
   lasciano l'occhio quando la pagina compare.
   ============================================================ */

type Quale = "a" | "c" | null;

export function BancoLoader({ classiFont }: { classiFont: string }) {
  const [quale, setQuale] = useState<Quale>("a");
  const [lento, setLento] = useState(false);
  /* la chiave forza il rimontaggio: un loader e' un componente che si
     autodistrugge, senza chiave nuova non ripartirebbe */
  const [giro, setGiro] = useState(0);

  const parti = (q: Quale) => {
    setQuale(null);
    /* setTimeout e non requestAnimationFrame: in una scheda non
       visibile il rAF resta sospeso e il rigioco non partirebbe mai
       (succede nel pannello di anteprima, che non compone frame). */
    setTimeout(() => {
      setGiro((g) => g + 1);
      setQuale(q);
    }, 0);
  };

  /* ?lento=N moltiplica le durate. Serve a ispezionare una battuta
     alla volta: il pannello di anteprima non fa screenshot, quindi
     l'unico modo di verificare un'animazione e' leggerne gli stili
     mentre e' in corso, e a velocita' reale finisce prima che la
     lettura arrivi. Non e' un comando per Matt, e' un cacciavite. */
  const daUrl =
    typeof window !== "undefined"
      ? Number(new URLSearchParams(window.location.search).get("lento")) || 0
      : 0;
  const m = daUrl > 0 ? daUrl : lento ? 3 : 1;

  return (
    <>
      {quale === "a" && (
        <LoaderStrumento
          key={`a${giro}`}
          classiFont={classiFont}
          minimo={900 * m}
          massimo={2400 * m}
          onFine={() => setQuale(null)}
        />
      )}
      {quale === "c" && (
        <LoaderGriglia
          key={`c${giro}`}
          classiFont={classiFont}
          minimo={900 * m}
          massimo={2400 * m}
          onFine={() => setQuale(null)}
        />
      )}

      <div className="banco">
        <button type="button" onClick={() => parti("a")}>
          A · strumento
        </button>
        <button type="button" onClick={() => parti("c")}>
          C · griglia
        </button>
        <button
          type="button"
          data-on={lento ? "1" : "0"}
          onClick={() => setLento((v) => !v)}
          title="Allunga l'attesa per vedere le battute una per una"
        >
          {lento ? "Lento ×3" : "Velocità reale"}
        </button>
      </div>
    </>
  );
}
