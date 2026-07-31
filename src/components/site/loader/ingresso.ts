/* ============================================================
   Siamo entrati adesso, o ci stiamo muovendo dentro?

   Il sito ha due animazioni e fanno due mestieri diversi:
   - il sipario con la M (LoaderGriglia) e' dell'INGRESSO, si apre
     una volta quando una persona arriva da fuori;
   - le squadre (PageTransition) sono del MOVIMENTO INTERNO, fra una
     pagina e l'altra.
   Non devono mai andare in scena insieme.

   Il cancello di sessione da solo non basta a garantirlo. La home
   non passa da SiteShell e non consuma il sipario, quindi la
   bandierina di sessione poteva restare abbassata fino al primo
   click: li' il sipario partiva SOPRA la transizione. E se lo
   storage e' negato (navigazione privata, blocco cookie) la
   bandierina non si alza mai, e il sipario ripartirebbe a ogni
   cambio pagina.

   Questa vive a livello di MODULO apposta: un modulo si ricarica a
   ogni caricamento vero del documento, che e' esattamente la vita
   che serve a questa informazione. Nessuno deve ricordarsi di
   azzerarla.
   ============================================================ */

let navigatoDentro = false;

/* Da chiamare quando parte una navigazione interna, e da chiamare
   PRIMA che parta davvero: se si alzasse dopo, la pagina nuova
   farebbe in tempo a montare il suo sipario e avremmo perso la corsa. */
export function segnaNavigazioneInterna(): void {
  navigatoDentro = true;
}

export function eUnIngressoDaFuori(): boolean {
  return !navigatoDentro;
}
