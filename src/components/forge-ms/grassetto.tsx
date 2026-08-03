import type { ReactNode } from "react";

/* ============================================================
   Il **grassetto** dei file di traduzione, reso davvero.
   ------------------------------------------------------------
   Diverse stringhe del namespace `Offerta` portano il markdown a
   doppio asterisco (le FAQ, le liste del filtro). I componenti
   precedenti le stampavano cosi' com'erano, e gli asterischi si
   vedevano a schermo: ne ho contati 18 sulla pagina.

   Si spezza sui doppi asterischi e si alternano i pezzi: quelli in
   posizione dispari sono il contenuto fra gli asterischi. Nessun
   dangerouslySetInnerHTML — il testo arriva da un file di
   traduzione, ma resta testo, non HTML da eseguire.
   ============================================================ */
export function conGrassetto(testo: string): ReactNode[] {
  return testo
    .split(/\*\*(.+?)\*\*/g)
    .map((pezzo, i) => (i % 2 === 1 ? <strong key={i}>{pezzo}</strong> : <span key={i}>{pezzo}</span>));
}
