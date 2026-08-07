"use client";

/* ============================================================
   PADRONANZA · la lista delle cose da saper fare, con il conto
   ------------------------------------------------------------
   Prima erano due pezzi separati: un simulatore con delle tacche
   astratte da spostare, e piu' sotto un piano scritto. Chiedevano
   alla stessa persona due sforzi diversi per la stessa cosa: capire
   quanto vale muoversi, e capire cosa fare.

   Qui sono una cosa sola. Ogni asse ha tre gradini di padronanza,
   che sono le mosse gia' approvate in PIANO: si spuntano, e il conto
   si rifa'. Quindi la domanda "cosa devo imparare" e la domanda
   "quanto mi rende" hanno la stessa risposta, nello stesso posto.

   PERCHE' IL CONTO SI MUOVE A SCATTI. Il fattore di recupero e'
   agganciato al livello (LV1-2 0,6 · LV3-4 0,5 · LV5-6 0,35 · LV7-8
   0,2) e il livello ha i cancelli. Quindi certe spunte danno punti e
   zero euro, altre cambiano fascia e valgono centinaia di euro al
   mese. Non e' un difetto da smussare: e' la tesi dell'AI Brain
   dimostrata coi numeri suoi, e quando succede lo diciamo.

   QUELLO CHE E' GIA' FATTO NON SI TOGLIE. Le spunte sotto il valore
   misurato sono chiuse: questo strumento risponde a "dove posso
   arrivare", e lasciar simulare di essere messi peggio servirebbe
   solo a gonfiare la perdita di partenza.
   ============================================================ */

import { useMemo, useState } from "react";
import {
  DIMENSIONI,
  calcolaConto,
  calcolaLivello,
  type Dimensione,
  type Punti,
  type Radiografia,
} from "./motore";
import { DIMENSIONI_COPY, PIANO } from "./copy";
import { COMMUNITY, DESTINAZIONI } from "../collegamenti";
import "./padronanza.css";

const SETTIMANE_ANNO = 4.3 * 12;
const ORE_GIORNATA = 8;

const euro = (n: number) => `${Math.round(n).toLocaleString("it-IT")} €`;

/** Spunta disegnata invece che <input type=checkbox>: il segno di
 *  sistema non si puo' colorare in modo affidabile fra i browser, e qui
 *  la spunta e' l'elemento che si guarda di piu'. Il ruolo resta quello
 *  di una casella, quindi il bottone porta aria-pressed. */
function Segno({ stato }: { stato: "vuota" | "fatta" | "scelta" }) {
  return (
    <span className={`pd-segno ${stato}`} aria-hidden="true">
      {stato !== "vuota" ? (
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5l3 3 6-7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export function Padronanza({
  radiografia,
  ore,
  valoreOra,
  personeNelTeam = 0,
}: {
  radiografia: Radiografia;
  ore: number;
  valoreOra: number;
  personeNelTeam?: number;
}) {
  const [simulata, setSimulata] = useState<Radiografia>(radiografia);

  const calcolo = useMemo(() => {
    const oggi = calcolaLivello(radiografia);
    const dopo = calcolaLivello(simulata);
    const contoOggi = calcolaConto(oggi.numero, ore, valoreOra, personeNelTeam);
    const contoDopo = calcolaConto(dopo.numero, ore, valoreOra, personeNelTeam);
    const oreSettimana = contoOggi.oreRecuperabili - contoDopo.oreRecuperabili;

    return {
      oggi,
      dopo,
      euroMese: contoOggi.euroMese - contoDopo.euroMese,
      oreSettimana,
      giornate: Math.round((oreSettimana * SETTIMANE_ANNO) / ORE_GIORNATA),
      spuntate: DIMENSIONI.reduce((n, d) => n + (simulata[d] - radiografia[d]), 0),
      punti: dopo.voto - oggi.voto,
      salito: dopo.numero > oggi.numero,
    };
  }, [radiografia, simulata, ore, valoreOra, personeNelTeam]);

  /** Quanto vale, al mese, portare questo asse fino in fondo. Si guarda
   *  il traguardo e non il gradino singolo: spesso un gradino solo non
   *  cambia fascia, e mostrando quello le targhette restavano tutte
   *  spente mentre la persona spuntava vedendo sempre zero. */
  function valeArrivarci(asse: Dimensione): number {
    if (simulata[asse] >= 3) return 0;
    const adesso = calcolaConto(calcolaLivello(simulata).numero, ore, valoreOra, personeNelTeam);
    const pieno = calcolaConto(
      calcolaLivello({ ...simulata, [asse]: 3 }).numero,
      ore,
      valoreOra,
      personeNelTeam,
    );
    return adesso.euroMese - pieno.euroMese;
  }

  const nessunaLeva = DIMENSIONI.every((d) => valeArrivarci(d) === 0);

  return (
    <div className="pd">
      <div className="pd-testa">
        <div>
          <p className="pd-k">Cosa devi saper fare</p>
          <h2>
            Spunta quello che ti senti di padroneggiare.
            <span>Il conto si rifà mentre lo fai.</span>
          </h2>
        </div>

        {calcolo.spuntate > 0 ? (
          <button className="pd-azzera" type="button" onClick={() => setSimulata(radiografia)}>
            Riporta a com&apos;è oggi
          </button>
        ) : null}
      </div>

      {/* ---------- il conto, appiccicato in alto ----------
          Sta sopra la lista e resta attaccato allo scorrimento: se stesse
          in fondo, chi spunta a meta' elenco non vedrebbe mai cambiare il
          numero, che e' l'unica ragione per spuntare. */}
      <div className={`pd-conto ${calcolo.spuntate > 0 ? "vivo" : ""}`}>
        <div className="pd-conto-c">
          <span className="pd-conto-eti">Recuperi</span>
          <b className={calcolo.euroMese > 0 ? "su" : ""}>
            {calcolo.euroMese > 0 ? euro(calcolo.euroMese) : "0 €"}
          </b>
          <span className="pd-conto-sub">al mese</span>
        </div>
        <div className="pd-conto-c">
          <span className="pd-conto-eti">Ti tornano</span>
          <b>
            {calcolo.oreSettimana > 0
              ? calcolo.oreSettimana.toFixed(1).replace(".", ",")
              : "0"}
            <i>h</i>
          </b>
          <span className="pd-conto-sub">a settimana</span>
        </div>
        <div className="pd-conto-c">
          <span className="pd-conto-eti">Cioè</span>
          <b>{calcolo.giornate > 0 ? calcolo.giornate : 0}</b>
          <span className="pd-conto-sub">giornate all&apos;anno</span>
        </div>
        <div className="pd-conto-c livello">
          <span className="pd-conto-eti">Livello</span>
          <b className={calcolo.salito ? "su" : ""}>
            LV{calcolo.dopo.numero}
            <i>/8</i>
          </b>
          <span className="pd-conto-sub">
            {calcolo.salito ? calcolo.dopo.nome : `resti ${calcolo.oggi.nome}`}
          </span>
        </div>
      </div>

      {/* Il momento che insegna: punti sì, euro no. */}
      {calcolo.punti > 0 && calcolo.euroMese <= 0 ? (
        <p className="pd-lezione">
          <b>Hai guadagnato {calcolo.punti} punti e zero euro.</b> Nessuna di queste spunte ha
          attraversato un cancello: sei migliorato, ma non hai cambiato il modo in cui lavori. È il
          motivo per cui accumulare trucchi non paga e costruire il sistema sì. Guarda gli assi con
          la cifra accanto: sono quelli che spostano il conto.
        </p>
      ) : null}

      {nessunaLeva && calcolo.spuntate === 0 ? (
        <p className="pd-lezione">
          Nessun asse, da solo, sposta il tuo conto: hai già recuperato il grosso. Qui non ci sono
          soldi facili da promettere, e non te ne promettiamo.
        </p>
      ) : null}

      {/* ---------- la lista ---------- */}
      <div className="pd-assi">
        {DIMENSIONI.map((d) => {
          const vale = valeArrivarci(d);
          const fatto = radiografia[d];
          const ora = simulata[d];

          return (
            <section className="pd-asse" key={d}>
              <header className="pd-asse-t">
                <span className="pd-asse-n">{DIMENSIONI_COPY[d].etichetta}</span>
                <span className="pd-asse-p">
                  {ora}/3
                  {ora > fatto ? <i> (oggi {fatto})</i> : null}
                </span>
                {vale > 0 ? <span className="pd-vale">fino a +{euro(vale)}/mese</span> : null}
              </header>

              <ol className="pd-passi">
                {PIANO[d].map((m, i) => {
                  const valore = (i + 1) as Punti;
                  const gia = valore <= fatto;
                  const scelto = valore <= ora;
                  return (
                    <li key={m.quando}>
                      <button
                        type="button"
                        className={`pd-passo ${gia ? "gia" : ""} ${scelto ? "scelto" : ""}`}
                        disabled={gia}
                        aria-pressed={scelto}
                        onClick={() =>
                          setSimulata((s) => ({
                            ...s,
                            /* Ri-spuntando il gradino piu' alto gia' scelto lo
                               si toglie, cosi' si torna indietro senza dover
                               azzerare tutto. */
                            [d]: (s[d] === valore ? valore - 1 : valore) as Punti,
                          }))
                        }
                      >
                        <Segno stato={gia ? "fatta" : scelto ? "scelta" : "vuota"} />
                        <span className="pd-passo-t">{m.cosa}</span>
                        <span className="pd-passo-q">{gia ? "già tuo" : m.quando}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      {/* ---------- le due uscite ---------- */}
      <div className="pd-uscite">
        <div className="pd-uscita primaria">
          <p className="pd-k">Il passo</p>
          <h3>Vuoi analizzare la tua situazione specifica?</h3>
          <p>
            Qui sopra hai visto <b>quanto</b> c&apos;è sul tavolo. Quali di queste cose abbiano senso
            nel tuo caso, e soprattutto in che ordine, si decide guardando i tuoi processi veri:
            mezz&apos;ora sui tuoi numeri. Da lì si decide se e come lavorarci insieme.
          </p>
          <a className="pd-btn giallo" href={DESTINAZIONI.call} target="_blank" rel="noreferrer">
            Prenota l&apos;analisi →
          </a>
        </div>

        <div className="pd-uscita">
          <p className="pd-k">Nel frattempo</p>
          <h3>Questa lista si esegue meglio in compagnia</h3>
          <p>
            La community è gratis ed è dove l&apos;elenco smette di essere un elenco: template
            pronti, e gente che l&apos;ha già fatto sul proprio lavoro.
          </p>
          <a className="pd-btn linea" href={COMMUNITY} target="_blank" rel="noreferrer">
            Entra nel Playground →
          </a>
        </div>
      </div>
    </div>
  );
}
