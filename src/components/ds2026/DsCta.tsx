"use client";

import { dsScrollTo } from "@/components/ds2026/dsScrollTo";

/* ============================================================
   CTA interna alla pagina — .btn del DS su un'ancora vera.
   ------------------------------------------------------------
   E' un <a href="#id">, non un <button>: la destinazione esiste nel
   documento, quindi deve restare apribile in una scheda nuova, e
   deve funzionare anche se il JS non parte. Il click intercettato
   aggiunge solo lo scorrimento morbido — se non ci fosse, il
   browser salterebbe comunque al posto giusto.

   L'unico client component della pagina insieme alla nav: tutto il
   resto e' server component e non spedisce JS.
   ============================================================ */

export function DsCta({
  target,
  variante = "primary",
  children,
}: {
  target: string;
  variante?: "primary" | "ghost" | "quiet";
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${target}`}
      className={`btn btn--${variante}`}
      onClick={(e) => {
        e.preventDefault();
        dsScrollTo(target);
      }}
    >
      {children}
      <span className="arr" aria-hidden="true">
        →
      </span>
    </a>
  );
}
