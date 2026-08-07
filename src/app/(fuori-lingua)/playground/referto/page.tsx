import type { Metadata } from "next";
import { Referto } from "@/components/playground/collaudo/Referto";
import { decodificaReferto } from "@/components/playground/collaudo/permalink";
import { RUOLI_OPZIONI } from "@/components/playground/collaudo/domande";
import { BOOTCAMP_APERTO } from "@/components/playground/collegamenti";
import "@/components/playground/playground.css";
import "@/components/playground/referto-perso.css";

/* ============================================================
   /referto · il referto che si puo' riaprire
   ------------------------------------------------------------
   Indirizzo pubblico: playground.morfeushub.com/referto?r=<codice>
   (il proxy riscrive il sottodominio sotto /playground).

   Prima di questa pagina il referto viveva solo nella memoria del
   browser: bastava chiudere il tab e dodici domande sparivano. I
   dati li avevamo noi, in Brevo e nel foglio; la sola persona che
   non poteva piu' vedere il suo referto era chi lo aveva fatto.

   Qui il referto si ricostruisce dalle risposte cifrate nel codice.
   Nessuna lettura da database: Referto() e' una funzione pura, e le
   risposte bastano. Quindi il link non scade, non dipende da un
   servizio acceso, e si puo' mandare per email.

   SENZA NOME, per scelta. Il codice non porta dati personali (vedi
   permalink.ts), quindi qui non sappiamo chi sia: il referto e' lo
   stesso, l'intestazione no. Il referto col nome resta sul
   dispositivo di chi l'ha fatto, dove il nome sta gia'.

   FUORI DALL'INDICE: e' il risultato di una persona, non una pagina
   del sito. Non c'e' niente da cercare qui.
   ============================================================ */

const TITOLO = "Il tuo referto · Il Collaudo";
const DESCRIZIONE =
  "Il referto del Collaudo: il tuo livello, la radiografia sui cinque assi e la prima cosa da sistemare.";

/** Chi apre un link condiviso non e' chi ha fatto il collaudo, e noi
 *  non sappiamo chi sia. "Ospite" e' la parola onesta, e sul pass del
 *  referto suona come quello che e': un lasciapassare in prestito. */
const SENZA_NOME = "Ospite";

export const metadata: Metadata = {
  title: TITOLO,
  description: DESCRIZIONE,
  robots: { index: false, follow: false },
  alternates: { canonical: "https://playground.morfeushub.com/referto" },
};

export default async function RefertoPage({
  searchParams,
}: {
  searchParams: Promise<{ r?: string }>;
}) {
  const { r } = await searchParams;
  const risposte = decodificaReferto(r);

  /* Link rotto, vecchio o manomesso. Non e' un 404: la pagina esiste,
     e' il codice a non dire niente. E chi ci arriva ha in mano un link
     che gli era stato promesso valido, quindi merita una via d'uscita
     invece di un muro. */
  if (!risposte) {
    return (
      <div className="pg26 rf-perso">
        <div>
          <p className="rf-perso-k">Il Collaudo</p>
          <h1>Questo referto non si apre.</h1>
          <p className="rf-perso-p">
            Il link è incompleto o non è più valido: succede quando viene spezzato da una chat o
            copiato a metà. Il referto non si è perso, si rifà: sono dodici domande e due minuti e
            mezzo.
          </p>
          <a className="btn btn-giallo btn-big" href="/playground/gate">
            Rifai il Collaudo →
          </a>
        </div>
      </div>
    );
  }

  /* Tasca, leva e persone nel team non stanno nel link: si ricavano
     dal ruolo, che e' l'unico posto dove sono definite. Tenerle nel
     codice vorrebbe dire poterle contraddire. */
  const ruolo = RUOLI_OPZIONI.find((x) => x.id === risposte.ruolo);

  return (
    <div className="pg26">
      <Referto
        nome={SENZA_NOME}
        mestiere={risposte.mestiere}
        struttura={risposte.ruolo}
        dichiarato={risposte.dichiarato}
        urgenza={risposte.urgenza}
        oreSettimana={risposte.ore}
        valoreOra={risposte.valoreOra}
        personeNelTeam={ruolo?.team ?? 0}
        profilo={{
          tasca: ruolo?.tasca ?? "mia",
          leva: ruolo?.leva ?? "solo",
          intento: risposte.intento,
        }}
        radiografia={risposte.punti}
        opzioni={{ bootcampAperto: BOOTCAMP_APERTO }}
      />
    </div>
  );
}
