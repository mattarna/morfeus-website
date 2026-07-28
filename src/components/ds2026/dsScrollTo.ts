/* ============================================================
   Scorrimento alle ancore della pagina.
   ------------------------------------------------------------
   /lab usa useSmoothScroll() dal provider condiviso. Qui NON lo si
   riusa di proposito: quel provider vive nel layout di [locale], che
   ha il bit skip-worktree (importa il chatbot, che non e' nel repo).
   Dipendere da un file che git considera immutabile lega una route
   nuova a un vincolo che non ha motivo di ereditare.

   scrollIntoView nativo fa la stessa cosa in una riga e non porta
   dipendenze. `scroll-behavior:smooth` NON e' impostato globalmente:
   il DS lo mette su `html`, che qui appartiene al layout radice e non
   si tocca. Quindi il comportamento morbido si chiede qui, per chiamata.

   La preferenza di sistema va rispettata a mano: con
   prefers-reduced-motion il salto e' istantaneo. La media query in
   tokens.css azzera transizioni e animazioni CSS, ma non tocca
   scrollIntoView, che e' JS.
   ============================================================ */

export function dsScrollTo(id: string) {
  const bersaglio = document.getElementById(id);
  if (!bersaglio) return;

  const movimentoRidotto = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  bersaglio.scrollIntoView({
    behavior: movimentoRidotto ? "auto" : "smooth",
    block: "start",
  });
}
