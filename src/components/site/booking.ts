/* ============================================================
   Dove si prenota una chiamata.
   ------------------------------------------------------------
   Il calendario esterno di Alex. E' la stessa destinazione che usano
   gia' tutte le altre CTA "Prenota una chiamata / Book a call" del
   sito (home, lab, sezione contatti, RoiCalc): la barra era l'unica
   che puntava a /roiometro, cioe' alla pagina del calcolatore, non
   alla prenotazione. Allineata qui.

   La stessa URL e' ripetuta a mano in una manciata di componenti piu'
   vecchi: se un domani cambia il calendario, quelli vanno ancora
   cercati a uno a uno. Questo modulo e' il posto dove farli convergere
   quando si tocca quella zona. */
export const BOOKING_URL =
  "https://marf.alexcarofiglio.com/book/morfeushub?utm_source=website&utm_medium=organic&utm_campaign=website";
