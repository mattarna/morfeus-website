"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Al cambio di pagina si riparte dall'alto, di colpo.
 *
 * PERCHE' SERVE. `globals.css` mette `scroll-behavior: smooth` sul
 * documento, e quella regola non distingue fra due cose diverse: lo
 * scorrimento verso un'ancora nella stessa pagina (dove il movimento e'
 * voluto) e il salto in cima quando si apre un'altra pagina (dove il
 * movimento e' un difetto). Nel secondo caso il salto diventa
 * un'animazione lunga piu' di un secondo: misurata, partendo da 3000px
 * scendeva 3000 -> 1569 -> 177 -> 0. Se in quel secondo la persona
 * tocca lo schermo, o il contenuto nuovo si assesta, l'animazione si
 * interrompe a meta' e la pagina si apre gia' scrollata -- il sintomo
 * era "dal menu non arrivo mai in cima, ma alla seconda sezione".
 *
 * Qui lo smooth si spegne per un istante, si salta in cima, e si
 * rimette com'era. Le ancore interne continuano a scorrere dolcemente:
 * sei componenti del sito ci contano.
 *
 * useLayoutEffect e non useEffect: agisce prima che il browser disegni,
 * quindi non si vede il salto.
 */
export function InCimaAlCambioPagina() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const doc = document.documentElement;
    doc.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    /* Si toglie l'override al fotogramma dopo: rimetterlo subito
       lascerebbe allo smooth il tempo di riprendersi il salto ancora in
       corso. Si svuota la proprieta' invece di rimettere il valore
       precedente, cosi' torna a comandare il CSS.

       IL RIPRISTINO VA GARANTITO ANCHE NEL CLEANUP. Prima li' c'era
       solo cancelAnimationFrame: se il componente si smontava prima del
       fotogramma -- una navigazione rapida, o il doppio montaggio di
       StrictMode -- il ripristino non avveniva mai e `auto` restava
       incollato al documento. Verificato in pagina: dopo un cambio di
       pagina lo scorrimento dolce delle ancore era sparito in silenzio,
       che e' il modo peggiore in cui possa sparire. */
    const ripristina = () => {
      doc.style.scrollBehavior = "";
    };
    const id = requestAnimationFrame(ripristina);
    return () => {
      cancelAnimationFrame(id);
      ripristina();
    };
  }, [pathname]);

  return null;
}
