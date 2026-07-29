"use client";

/* ============================================================
   IL COLLAUDO · il flusso
   ------------------------------------------------------------
   L'overlay a schermo pieno: dodici domande, il calcolo, il gate,
   e alla fine il referto.

   COSA STA DOVE. Qui c'e' solo lo stato e il disegno. Le domande e
   il copy stanno in domande.ts, il punteggio in motore.ts, i testi
   del referto in copy.ts. Nessuna frase e' cablata in questo file
   tranne quelle di servizio (intro, calcolo, gate).

   IL RITMO. Al clic l'opzione si accende, compare un verdetto di
   due-quattro parole, e dopo ~400ms si va avanti da soli. Nessun
   bottone "procedi" tranne sullo slider, che non puo' avanzare da
   solo. La lezione lunga non sta qui: e' nella radiografia del
   referto, dove c'e' il tempo di leggerla.
   ============================================================ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BLOCCHI,
  BLOCCO_DI,
  DICHIARATO_OPZIONI,
  INTENTO_OPZIONI,
  MESTIERI_OPZIONI,
  PROGRESSO,
  RUOLI_OPZIONI,
  SCENE,
  URGENZA_OPZIONI,
  VALORE_OPZIONI,
  famigliaDi,
  pagaLAzienda,
} from "./domande";
import type { Dimensione, Intento, Punti } from "./motore";
import { Referto } from "./Referto";
import "./collaudo.css";

const ATTESA = 420; /* ms fra il clic e la schermata dopo */
const BOOTCAMP_APERTO = true; /* l'interruttore della spec §6 */

type Fase = "intro" | "domande" | "calcolo" | "gate" | "referto";

type Risposte = {
  mestiere: string;
  ruolo: string;
  dichiarato: string;
  intento: Intento;
  punti: Partial<Record<Dimensione, Punti>>;
  ore: number;
  valoreOra: number;
  urgenza: string;
};

/* I passi sono di due nature sole: quelli a scelta, che avanzano da
   soli, e lo slider, che ha bisogno di un bottone. Dichiarare l'unione
   invece di lasciarla dedurre serve a poter scrivere `corrente.aiuto`
   senza che il compilatore si lamenti sul ramo sbagliato. */
type Opzione = { label: string; verdetto?: string; applica: (x: Risposte) => Risposte };
type Passo =
  | { tipo: "scelta"; apertura?: string; domanda: string; aiuto?: string; mescola?: boolean; opzioni: Opzione[] }
  | { tipo: "slider"; domanda: string; aiuto?: string };

const VUOTE: Risposte = {
  mestiere: "",
  ruolo: "",
  dichiarato: "",
  intento: "applicare",
  punti: {},
  ore: 8,
  valoreOra: 45,
  urgenza: "media",
};

/* Fisher-Yates. Serve solo sugli scenari: toglie il vizio per cui la
   risposta migliore sta sempre in fondo. Le scale (il dichiarato, il
   valore dell'ora, l'urgenza) restano in ordine, perche' sono scale. */
function mescola<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export function Collaudo({ onChiudi }: { onChiudi: () => void }) {
  const [fase, setFase] = useState<Fase>("intro");
  const [passo, setPasso] = useState(0);
  const [r, setR] = useState<Risposte>(VUOTE);
  const [scelta, setScelta] = useState<number | null>(null);
  const [verdetto, setVerdetto] = useState<string | null>(null);
  const [gate, setGate] = useState({ nome: "", cognome: "", email: "", telefono: "" });
  const [erroreGate, setErroreGate] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const famiglia = useMemo(() => famigliaDi(r.mestiere, r.ruolo), [r.mestiere, r.ruolo]);

  /* I dodici passi, montati sulla famiglia: le scene cambiano solo la
     riga di apertura, le opzioni e i punteggi restano gli stessi per
     tutti. E' cio' che tiene il voto confrontabile fra profili diversi. */
  const passi: Passo[] = useMemo(() => {
    const scene = SCENE.map((s) => ({
      tipo: "scelta" as const,
      apertura: typeof s.apertura === "string" ? s.apertura : s.apertura[famiglia],
      domanda: s.domanda,
      mescola: true,
      opzioni: s.opzioni.map((o) => ({
        label: o.t,
        verdetto: o.v,
        applica: (x: Risposte): Risposte => ({ ...x, punti: { ...x.punti, [s.dimensione]: o.pt } }),
      })),
    }));

    const lista: Passo[] = [
      {
        tipo: "scelta",
        domanda: "Che lavoro fai?",
        aiuto: "Serve a parlare del tuo mestiere invece che in generale.",
        opzioni: MESTIERI_OPZIONI.map((m) => ({
          label: m.label,
          applica: (x: Risposte): Risposte => ({ ...x, mestiere: m.id }),
        })),
      },
      {
        tipo: "scelta",
        domanda: "Qual è il tuo ruolo?",
        opzioni: RUOLI_OPZIONI.map((o) => ({
          label: o.label,
          applica: (x: Risposte): Risposte => ({ ...x, ruolo: o.id }),
        })),
      },
      {
        tipo: "scelta",
        domanda: "Come ti daresti, a occhio?",
        aiuto: "Rispondi d'istinto: fra poco il banco misura davvero.",
        opzioni: DICHIARATO_OPZIONI.map((o) => ({
          label: o.label,
          applica: (x: Risposte): Risposte => ({ ...x, dichiarato: o.id }),
        })),
      },
      {
        tipo: "scelta",
        domanda: "Cosa vuoi dall'AI nei prossimi tre mesi?",
        opzioni: INTENTO_OPZIONI.map((o) => ({
          label: o.label,
          applica: (x: Risposte): Risposte => ({ ...x, intento: o.id }),
        })),
      },
      ...scene,
      { tipo: "slider", domanda: "Quante ore a settimana se ne vanno in lavoro che si ripete?", aiuto: "Mail, documenti, riscritture, report, ricerche." },
      {
        tipo: "scelta",
        domanda: pagaLAzienda(r.ruolo) ? "Quanto costa un'ora del tuo tempo alla tua azienda?" : "Quanto vale un'ora del tuo tempo?",
        opzioni: VALORE_OPZIONI.map((o) => ({
          label: o.label,
          applica: (x: Risposte): Risposte => ({ ...x, valoreOra: o.id }),
        })),
      },
      {
        tipo: "scelta",
        domanda: "Quanto è urgente sistemarla?",
        opzioni: URGENZA_OPZIONI.map((o) => ({
          label: o.label,
          applica: (x: Risposte): Risposte => ({ ...x, urgenza: o.id }),
        })),
      },
    ];
    return lista;
  }, [famiglia, r.ruolo]);

  const corrente = passi[passo];
  /* mescolato una volta per passo: se rimescolasse a ogni render le
     opzioni ballerebbero sotto il dito */
  const ordine = useMemo(
    () => (corrente?.tipo === "scelta" && corrente.mescola ? mescola(corrente.opzioni) : corrente?.tipo === "scelta" ? corrente.opzioni : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [passo],
  );

  const avanti = useCallback(() => {
    setScelta(null);
    setVerdetto(null);
    setPasso((p) => {
      if (p + 1 >= passi.length) {
        setFase("calcolo");
        return p;
      }
      return p + 1;
    });
  }, [passi.length]);

  function scegli(i: number, opt: { verdetto?: string; applica: (x: Risposte) => Risposte }) {
    if (scelta !== null) return; /* doppio tap: il primo comanda */
    setScelta(i);
    setVerdetto(opt.verdetto ?? null);
    setR((x) => opt.applica(x));
    timer.current = setTimeout(avanti, ATTESA);
  }

  function indietro() {
    if (passo === 0) return;
    if (timer.current) clearTimeout(timer.current);
    setScelta(null);
    setVerdetto(null);
    setPasso((p) => p - 1);
  }

  function inviaGate() {
    const mailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(gate.email.trim());
    if (!gate.nome.trim() || !gate.cognome.trim() || !mailOk) {
      setErroreGate(true);
      return;
    }
    /* TODO Brevo: qui il contatto con tutti i campi della spec §7 */
    setFase("referto");
  }

  const avanzamento = fase === "domande" ? PROGRESSO[passo] : fase === "intro" ? 0 : 100;

  return (
    <div className="cl-overlay" role="dialog" aria-modal="true" aria-label="Il Collaudo">
      <header className="cl-testa">
        <span className="cl-marchio">
          <svg viewBox="0 0 1000 476" fill="currentColor" aria-hidden="true">
            <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
            <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
            <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
          </svg>
          Il Collaudo
        </span>

        {/* una barra sola che si riempie, con tre segni sopra a dire
            dove finisce un blocco. Mai la percentuale in cifre. */}
        <div className="cl-barra" aria-hidden="true">
          <i style={{ width: `${avanzamento}%` }} />
          <b style={{ left: "40%" }} />
          <b style={{ left: "85%" }} />
        </div>

        <button className="cl-chiudi" onClick={onChiudi} aria-label="Chiudi il collaudo">✕</button>
      </header>

      <div className="cl-palco">
        {fase === "intro" ? (
          <div className="cl-dentro cl-intro">
            <p className="cl-occhio">La soglia della stanza</p>
            <h2>Misura il tuo AI Brain.</h2>
            <p className="cl-lead">
              Dodici domande, due minuti e mezzo. Non è un quiz: sono situazioni di lavoro vere, e
              da come le risolvi si vede a che livello sei. Alla fine hai il tuo referto e la prima
              cosa da sistemare.
            </p>
            <button className="cl-via" onClick={() => setFase("domande")}>Inizia il collaudo →</button>
          </div>
        ) : null}

        {fase === "domande" && corrente ? (
          <div className="cl-dentro" key={passo}>
            <p className="cl-occhio">
              {BLOCCHI[BLOCCO_DI[passo]]}
              <span className="cl-conta">{passo + 1} / {passi.length}</span>
            </p>

            {corrente.tipo === "scelta" ? (
              <>
                {/* Quando c'e' una scena, la cosa grande e' la SCENA: e'
                    quella che va letta e capita. "Come parti con l'AI?" e'
                    una consegna di quattro parole, e teneva il corpo piu'
                    grosso della pagina mentre la situazione stava in
                    grigetto sopra: gerarchia rovesciata, ora raddrizzata. */}
                {corrente.apertura ? (
                  <>
                    <h2>{corrente.apertura}</h2>
                    <p className="cl-consegna">{corrente.domanda}</p>
                  </>
                ) : (
                  <h2>{corrente.domanda}</h2>
                )}
                {corrente.aiuto ? <p className="cl-aiuto">{corrente.aiuto}</p> : null}

                <div className="cl-opzioni">
                  {ordine.map((o, i) => (
                    <button
                      key={o.label}
                      className={`cl-opt${scelta === i ? " presa" : ""}${scelta !== null && scelta !== i ? " spenta" : ""}`}
                      onClick={() => scegli(i, o)}
                      disabled={scelta !== null}
                    >
                      <span>{o.label}</span>
                      {scelta === i && verdetto ? <em className="cl-verdetto">{verdetto}</em> : null}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>{corrente.domanda}</h2>
                {corrente.aiuto ? <p className="cl-aiuto">{corrente.aiuto}</p> : null}
                <div className="cl-slider">
                  <p className="cl-ore">
                    <b>{r.ore}</b> ore a settimana
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={r.ore}
                    onChange={(e) => setR((x) => ({ ...x, ore: Number(e.target.value) }))}
                    aria-label="Ore a settimana di lavoro che si ripete"
                  />
                  <p className="cl-nota">{r.ore >= 10 ? "Più di una giornata di lavoro a settimana." : " "}</p>
                  <button className="cl-via" onClick={avanti}>Avanti →</button>
                </div>
              </>
            )}

            {passo > 0 ? (
              <button className="cl-indietro" onClick={indietro}>← torna indietro</button>
            ) : null}
          </div>
        ) : null}

        {fase === "calcolo" ? <Calcolo onFine={() => setFase("gate")} /> : null}

        {fase === "gate" ? (
          <div className="cl-dentro cl-gate">
            <p className="cl-occhio">Il referto è pronto</p>
            <h2>Dove te lo mandiamo?</h2>
            <p className="cl-lead">
              Lo vedi comunque qui sotto fra un secondo. La mail è la tua copia, insieme al primo
              mattone da applicare.
            </p>
            <div className="cl-campi">
              <label>
                <span>Nome</span>
                <input value={gate.nome} onChange={(e) => setGate({ ...gate, nome: e.target.value })} autoComplete="given-name" />
              </label>
              <label>
                <span>Cognome</span>
                <input value={gate.cognome} onChange={(e) => setGate({ ...gate, cognome: e.target.value })} autoComplete="family-name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={gate.email} onChange={(e) => setGate({ ...gate, email: e.target.value })} autoComplete="email" />
              </label>
              <label>
                <span>Telefono <i>facoltativo</i></span>
                <input type="tel" value={gate.telefono} onChange={(e) => setGate({ ...gate, telefono: e.target.value })} autoComplete="tel" />
              </label>
            </div>
            {erroreGate ? <p className="cl-errore">Servono nome, cognome e una mail valida.</p> : null}
            <button className="cl-via" onClick={inviaGate}>Mostrami il referto →</button>
          </div>
        ) : null}

        {fase === "referto" ? (
          <Referto
            nome={gate.nome}
            mestiere={r.mestiere}
            struttura={r.ruolo}
            dichiarato={r.dichiarato}
            urgenza={r.urgenza}
            oreSettimana={r.ore}
            valoreOra={r.valoreOra}
            personeNelTeam={RUOLI_OPZIONI.find((x) => x.id === r.ruolo)?.team ?? 0}
            profilo={{
              tasca: RUOLI_OPZIONI.find((x) => x.id === r.ruolo)?.tasca ?? "mia",
              leva: RUOLI_OPZIONI.find((x) => x.id === r.ruolo)?.leva ?? "solo",
              intento: r.intento,
            }}
            radiografia={{
              contesto: r.punti.contesto ?? 0,
              ripetibilita: r.punti.ripetibilita ?? 0,
              correzione: r.punti.correzione ?? 0,
              controllo: r.punti.controllo ?? 0,
              diffusione: r.punti.diffusione ?? 0,
            }}
            opzioni={{ bootcampAperto: BOOTCAMP_APERTO }}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ---------- il calcolo ----------
   Quattro secondi di elaborazione a vista. Non e' un caricamento finto
   per far scena: il referto che arriva dopo un'attesa viene letto,
   quello che compare di colpo viene scrollato. */
const RIGHE = [
  "leggo le tue cinque risposte al banco",
  "incrocio quello che ti sei dato con quello che hai fatto",
  "calcolo le ore recuperabili al tuo livello",
  "preparo il referto",
];

function Calcolo({ onFine }: { onFine: () => void }) {
  const [viste, setViste] = useState(0);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    RIGHE.forEach((_, i) => t.push(setTimeout(() => setViste(i + 1), 380 + i * 620)));
    t.push(setTimeout(onFine, 380 + RIGHE.length * 620 + 420));
    return () => t.forEach(clearTimeout);
  }, [onFine]);

  return (
    <div className="cl-dentro cl-calcolo">
      <p className="cl-occhio">Elaborazione</p>
      <h2>Sto preparando il tuo referto.</h2>
      <ul className="cl-log">
        {RIGHE.map((riga, i) => (
          <li key={riga} className={i < viste ? "on" : ""}>
            <span>{riga}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
