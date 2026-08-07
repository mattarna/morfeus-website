"use client";

/* ============================================================
   DOVE PUOI ARRIVARE · il referto che si muove
   ------------------------------------------------------------
   Il referto dice dove sei. Questo dice dove potresti essere, e
   lo dice in euro, muovendo i cursori.

   PERCHE' FUNZIONA, E NON E' UN GIOCHINO. Il conto e' agganciato
   al LIVELLO (fattoreRecupero: LV1-2 0,6 · LV3-4 0,5 · LV5-6 0,35
   · LV7-8 0,2), e il livello ha i CANCELLI. Quindi muovendo gli
   assi succede una cosa che nessun altro test fa vedere:

     alzare "correzione" (peso 20) da' punti e ZERO euro,
     perche' non attraversa nessun cancello;
     alzare "contesto" da 1 a 2 sblocca LV5 e fa scendere il
     fattore da 0,5 a 0,35, cioe' soldi veri.

   E' la tesi dell'AI Brain dimostrata con i numeri della persona:
   non conta accumulare trucchi, conta costruire il sistema. Quando
   capita, il pannello lo dice a voce alta: e' il momento in cui
   qualcuno decide di prenotare.

   SI PUO' SOLO SALIRE. Il minimo di ogni asse e' il valore
   misurato. Non e' per gentilezza: e' che questo strumento risponde
   a "dove posso arrivare", e lasciar simulare di essere messi
   peggio servirebbe solo a gonfiare la perdita di partenza, cioe' a
   mentire al contrario.

   I NUMERI SONO QUELLI DEL MOTORE. Nessuna curva inventata per far
   sembrare il guadagno piu' liscio: il fattore di recupero e' a
   gradini, quindi i salti sono a gradini. Un grafico morbido qui
   sarebbe una bugia grafica.
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
import "./simulatore.css";

/** Giornate lavorative da otto ore in un anno di 4,3 settimane al mese:
 *  la stessa unita' che il conto usa gia' per i mesi, cosi' le due cifre
 *  non si contraddicono. */
const SETTIMANE_ANNO = 4.3 * 12;
const ORE_GIORNATA = 8;

const euro = (n: number) => `${Math.round(n).toLocaleString("it-IT")} €`;

export function Simulatore({
  radiografia,
  ore,
  valoreOra,
  personeNelTeam = 0,
  onCta,
}: {
  radiografia: Radiografia;
  ore: number;
  valoreOra: number;
  personeNelTeam?: number;
  onCta?: (dove: string) => void;
}) {
  const [simulata, setSimulata] = useState<Radiografia>(radiografia);

  const calcolo = useMemo(() => {
    const oggi = calcolaLivello(radiografia);
    const dopo = calcolaLivello(simulata);
    const contoOggi = calcolaConto(oggi.numero, ore, valoreOra, personeNelTeam);
    const contoDopo = calcolaConto(dopo.numero, ore, valoreOra, personeNelTeam);

    /* Il guadagno e' la differenza fra quello che perdi oggi e quello che
       perderesti dopo: salendo di livello resta meno sul tavolo. */
    const euroMese = contoOggi.euroMese - contoDopo.euroMese;
    const oreSettimana = contoOggi.oreRecuperabili - contoDopo.oreRecuperabili;

    return {
      oggi,
      dopo,
      euroMese,
      oreSettimana,
      giornate: Math.round((oreSettimana * SETTIMANE_ANNO) / ORE_GIORNATA),
      mosso: DIMENSIONI.some((d) => simulata[d] !== radiografia[d]),
      puntiGuadagnati: dopo.voto - oggi.voto,
      livelloSalito: dopo.numero > oggi.numero,
    };
  }, [radiografia, simulata, ore, valoreOra, personeNelTeam]);

  /** Quanti euro al mese vale alzare QUESTO asse di uno, adesso.
   *
   *  La targhetta dice gli euro e non il livello, e la differenza non e'
   *  estetica. Il fattore di recupero cambia a fasce (LV1-2, LV3-4,
   *  LV5-6, LV7-8): salire da LV3 a LV4 alza il livello e lascia il conto
   *  identico. Una targhetta "sblocca LV4" prometterebbe un guadagno che
   *  non c'e', e su cinque assi contemporaneamente non guiderebbe verso
   *  niente. Gli euro invece si accendono su pochi assi, che e' esattamente
   *  l'informazione utile: dove conviene spingere. */
  function guadagnoSalendo(asse: Dimensione): number {
    const v = simulata[asse];
    if (v >= 3) return 0;
    const adesso = calcolaConto(calcolaLivello(simulata).numero, ore, valoreOra, personeNelTeam);
    /* Si guarda l'asse portato al massimo, non un solo passo avanti.
       Un passo spesso non basta a cambiare fascia di recupero, quindi
       guardando +1 le targhette restavano tutte spente e la persona
       muoveva a caso vedendo sempre zero: sembrava rotto. Il potenziale
       pieno dice la cosa vera, cioe' se investire su quest'asse paga. */
    const dopo = calcolaConto(
      calcolaLivello({ ...simulata, [asse]: 3 }).numero,
      ore,
      valoreOra,
      personeNelTeam,
    );
    return adesso.euroMese - dopo.euroMese;
  }

  const assiMossi = DIMENSIONI.filter((d) => simulata[d] > radiografia[d]);

  /* Chi ha gia' preso il grosso non ha leve che pagano: il fattore di
     recupero e' 0,2 e nessun asse porta soldi. Senza dirlo, costui vede
     cinque assi spenti e zero euro, cioe' uno strumento che sembra rotto,
     ed e' il profilo a cui teniamo di piu'. Meglio dirgli la verita': non
     c'e' niente di facile da recuperare, ed e' un complimento. */
  const nessunaLeva = DIMENSIONI.every((d) => guadagnoSalendo(d) === 0);

  return (
    <section className="sim">
      <div className="sim-in">
        <p className="sim-k">Dove puoi arrivare</p>
        <h2 className="sim-h">
          Il referto dice dove sei.
          <span>Questo dice quanto vale muoversi.</span>
        </h2>
        <p className="sim-lead">
          Alza gli assi e il conto si rifà con i tuoi numeri. Non tutti valgono uguale, e la
          differenza è la cosa più utile che porti via da qui.
        </p>

        {/* ---------- i cursori ---------- */}
        <div className="sim-assi">
          {DIMENSIONI.map((d) => {
            const minimo = radiografia[d];
            const vale = guadagnoSalendo(d);
            return (
              <div className="sim-asse" key={d}>
                <div className="sim-asse-testa">
                  <span className="sim-asse-nome">{DIMENSIONI_COPY[d].etichetta}</span>
                  {vale > 0 ? (
                    <span className="sim-sblocca">fino a +{euro(vale)} al mese</span>
                  ) : null}
                </div>

                <div className="sim-tacche" role="group" aria-label={DIMENSIONI_COPY[d].etichetta}>
                  {([0, 1, 2, 3] as const).map((v) => {
                    const bloccata = v < minimo;
                    const attiva = v <= simulata[d];
                    return (
                      <button
                        key={v}
                        type="button"
                        disabled={bloccata}
                        aria-label={`${DIMENSIONI_COPY[d].etichetta}: ${v} su 3`}
                        aria-pressed={simulata[d] === v}
                        className={[
                          "sim-tacca",
                          attiva ? "on" : "",
                          v === minimo ? "oggi" : "",
                          v > minimo && attiva ? "aggiunta" : "",
                        ].join(" ")}
                        onClick={() => setSimulata((s) => ({ ...s, [d]: v as Punti }))}
                      />
                    );
                  })}
                  <span className="sim-oggi-eti">oggi {minimo}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- il conto ---------- */}
        <div className={`sim-conto ${calcolo.mosso ? "" : "fermo"}`}>
          {!calcolo.mosso ? (
            nessunaLeva ? (
              <p className="sim-invito">
                Nessun asse, da solo, sposta il tuo conto: hai già recuperato il grosso. Qui non ci
                sono soldi facili da promettere, e non te ne promettiamo.
              </p>
            ) : (
              <p className="sim-invito">Muovi un asse: il conto si rifà da solo.</p>
            )
          ) : (
            <>
              <div className="sim-salto">
                <span className="sim-da">
                  LV{calcolo.oggi.numero} {calcolo.oggi.nome}
                </span>
                <span className="sim-freccia" aria-hidden="true">
                  →
                </span>
                <span className={`sim-a ${calcolo.livelloSalito ? "su" : ""}`}>
                  LV{calcolo.dopo.numero} {calcolo.dopo.nome}
                </span>
              </div>

              <div className="sim-cifre">
                <div className={calcolo.euroMese > 0 ? "vinci" : ""}>
                  <b>{calcolo.euroMese > 0 ? euro(calcolo.euroMese) : "0 €"}</b>
                  <span>al mese che smetti di perdere</span>
                </div>
                <div>
                  <b>
                    {calcolo.oreSettimana > 0
                      ? `${calcolo.oreSettimana.toFixed(1).replace(".", ",")} h`
                      : "0 h"}
                  </b>
                  <span>a settimana che tornano tue</span>
                </div>
                <div>
                  <b>{calcolo.giornate > 0 ? calcolo.giornate : 0}</b>
                  <span>giornate da 8 ore, in un anno</span>
                </div>
              </div>

              {/* Il momento che vende: punti sì, euro no. */}
              {calcolo.puntiGuadagnati > 0 && calcolo.euroMese <= 0 ? (
                <p className="sim-lezione">
                  <b>Hai guadagnato {calcolo.puntiGuadagnati} punti e zero euro.</b> Nessuna di
                  queste mosse ha attraversato un cancello: hai migliorato, ma non hai cambiato il
                  modo in cui lavori. È esattamente il motivo per cui accumulare trucchi non paga, e
                  costruire il sistema sì. Gli assi che spostano il conto sono quelli con la
                  targhetta degli euro: prova da lì.
                </p>
              ) : null}

              {calcolo.oggi.bloccatoDa && !calcolo.livelloSalito ? (
                <p className="sim-lezione">
                  Oggi sei tenuto fermo da <b>{DIMENSIONI_COPY[calcolo.oggi.bloccatoDa].etichetta}</b>.
                  Finché resta lì, il punteggio può salire quanto vuole: il livello no.
                </p>
              ) : null}
            </>
          )}
        </div>

        {/* ---------- il piano, solo per quello che ha mosso ---------- */}
        {assiMossi.length > 0 ? (
          <div className="sim-piano">
            <p className="sim-k">Il piano, per quello che hai appena mosso</p>
            {assiMossi.map((d) => (
              <div className="sim-piano-asse" key={d}>
                <h3>
                  {DIMENSIONI_COPY[d].etichetta}{" "}
                  <span className="sim-delta">
                    {radiografia[d]} → {simulata[d]}
                  </span>
                </h3>
                <ol>
                  {PIANO[d].map((m) => (
                    <li key={m.quando}>
                      <span className="sim-quando">{m.quando}</span>
                      <span>{m.cosa}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
            <p className="sim-dove">
              Queste cose si fanno meglio con qualcuno che le ha già fatte: nel Playground c&apos;è
              chi le ha messe in piedi il mese scorso, e ti dice dove si è impantanato.
            </p>
          </div>
        ) : null}

        {/* ---------- le due uscite ---------- */}
        <div className="sim-uscite">
          <div className="sim-uscita primaria">
            <p className="sim-uscita-k">Il passo</p>
            <h3>Vuoi analizzare la tua situazione specifica?</h3>
            <p>
              Qui hai visto <b>quanto</b> c&apos;è sul tavolo. Quali di queste mosse abbiano senso
              nel tuo caso, e soprattutto in che ordine, si decide guardando i tuoi processi veri:
              mezz&apos;ora sui tuoi numeri. Da lì si decide se e come lavorarci insieme.
            </p>
            <a
              className="sim-btn giallo"
              href={DESTINAZIONI.call}
              target="_blank"
              rel="noreferrer"
              onClick={() => onCta?.("simulatore-call")}
            >
              Prenota l&apos;analisi →
            </a>
          </div>

          <div className="sim-uscita">
            <p className="sim-uscita-k">Nel frattempo</p>
            <h3>Il piano si esegue meglio in compagnia</h3>
            <p>
              La community è gratis ed è dove il piano qui sopra smette di essere un elenco: template
              pronti, e gente che l&apos;ha già fatto sul proprio lavoro.
            </p>
            <a
              className="sim-btn linea"
              href={COMMUNITY}
              target="_blank"
              rel="noreferrer"
              onClick={() => onCta?.("simulatore-community")}
            >
              Entra nel Playground →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
