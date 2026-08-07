"use client";

/* ============================================================
   IL CRUSCOTTO · il referto come strumento, non come pagina
   ------------------------------------------------------------
   Stessa materia del referto editoriale, mestiere opposto. Il
   referto in pagina deve far prendere una decisione adesso, quindi
   e' scuro, largo e racconta. Questo si riapre dal link nell'email,
   si rilegge con calma, si stampa e si inoltra a chi decide: quindi
   e' chiaro, denso, e mostra tutto insieme.

   PERCHE' CHIARO. Non e' un vezzo: e' un documento di lavoro. Il
   fondo notte e' giusto per una landing di sera sul telefono, non
   per una tabella di numeri guardata dieci minuti alla scrivania.

   E' LO STESSO DESIGN SYSTEM: .cru ridichiara i token del Playground
   con i valori chiari, e tutto quello che sta dentro si ribalta da
   solo. Sul perche' NON stia dentro .pg26, vedi cruscotto.css.
   ============================================================ */

import { DIMENSIONI, SCALA, calcolaConto, collauda, type Dimensione } from "./motore";
import {
  CANCELLO_COPY,
  DICHIARATI,
  DIMENSIONI_COPY,
  LIVELLI_COPY,
  MESTIERI,
  STRUTTURE,
  URGENZE,
} from "./copy";
import { RUOLI_OPZIONI } from "./domande";
import { BOOTCAMP_APERTO } from "../collegamenti";
import type { RisposteReferto } from "./permalink";
import { Padronanza } from "./Padronanza";
import "./cruscotto.css";

const SETTIMANE_ANNO = 4.3 * 12;
const ORE_GIORNATA = 8;

const euro = (n: number) => `${Math.round(n).toLocaleString("it-IT")} €`;
const numero = (n: number) => n.toFixed(1).replace(".", ",");

/* ---------- il quadrante ----------
   Un arco di 270 gradi con le tacche delle soglie dei livelli. Non e'
   decorazione: le tacche dicono quanto manca al gradino dopo, che su
   una barra dritta non si vedrebbe. Disegnato a mano invece che con
   una libreria perche' e' una circonferenza e due strokeDasharray, e
   una dipendenza in piu' su una pagina che deve aprirsi da un'email
   non vale il risparmio. */
const R = 56;
const GIRO = 2 * Math.PI * R;
const ARCO = 0.75; /* 270 gradi */
const LUNGO = GIRO * ARCO;

function Quadrante({ voto, livello }: { voto: number; livello: number }) {
  return (
    <svg className="cru-quad" viewBox="0 0 148 148" role="img" aria-label={`Voto ${voto} su 100`}>
      <g transform="rotate(135 74 74)">
        <circle
          cx="74"
          cy="74"
          r={R}
          fill="none"
          stroke="var(--line)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={`${LUNGO} ${GIRO}`}
        />
        <circle
          cx="74"
          cy="74"
          r={R}
          fill="none"
          stroke="var(--viola)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={`${(LUNGO * voto) / 100} ${GIRO}`}
        />
        {/* Le soglie: una tacca per livello, dal secondo in su. */}
        {SCALA.filter((l) => l.sogliaMin > 0).map((l) => {
          const a = 270 * (l.sogliaMin / 100);
          const rad = (a * Math.PI) / 180;
          const x1 = 74 + Math.cos(rad) * (R - 7);
          const y1 = 74 + Math.sin(rad) * (R - 7);
          const x2 = 74 + Math.cos(rad) * (R + 7);
          const y2 = 74 + Math.sin(rad) * (R + 7);
          return (
            <line
              key={l.numero}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--n2)"
              strokeWidth="2"
            />
          );
        })}
      </g>
      <text className="cru-quad-n" x="74" y="76" textAnchor="middle">
        {voto}
      </text>
      <text className="cru-quad-s" x="74" y="95" textAnchor="middle">
        LV{livello} · su 100
      </text>
    </svg>
  );
}

export function Cruscotto({ risposte }: { risposte: RisposteReferto }) {
  const ruolo = RUOLI_OPZIONI.find((x) => x.id === risposte.ruolo);
  const profilo = {
    tasca: ruolo?.tasca ?? ("mia" as const),
    leva: ruolo?.leva ?? ("solo" as const),
    intento: risposte.intento,
  };

  const esito = collauda(risposte.punti, profilo, { bootcampAperto: BOOTCAMP_APERTO });
  const conto = calcolaConto(
    esito.livello.numero,
    risposte.ore,
    risposte.valoreOra,
    ruolo?.team ?? 0,
  );

  const atteso = DICHIARATI[risposte.dichiarato]?.atteso ?? 0;
  const scarto = esito.livello.voto - atteso;
  const giornate = Math.round((conto.oreRecuperabili * SETTIMANE_ANNO) / ORE_GIORNATA);
  const quotaTeam = conto.euroMese > 0 ? (conto.team / (conto.personale + conto.team)) * 100 : 0;

  return (
    <div className="cru">
      <header className="cru-barra">
        <span className="cru-marca">
          <svg viewBox="0 0 1000 476" fill="currentColor" aria-hidden="true">
            <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
            <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
            <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
          </svg>
          <b>Collaudo</b> · referto operativo
        </span>
        <span className="cru-soggetto">
          {MESTIERI[risposte.mestiere] ?? risposte.mestiere} ·{" "}
          {STRUTTURE[risposte.ruolo] ?? risposte.ruolo}
        </span>
      </header>

      <div className="cru-corpo">
        {/* ---------- il titolo ---------- */}
        <section className="cru-hero">
          <div className="cru-hero-t">
            <p className="cru-eti">Il tuo referto</p>
            <h1>
              Sei al livello {esito.livello.numero} di 8.
              <span>{LIVELLI_COPY[esito.livello.numero].nome}</span>
            </h1>
            <p className="cru-hero-r">{LIVELLI_COPY[esito.livello.numero].riga}</p>
            <div className="cru-chip">
              <span>
                Dichiarato {atteso} · misurato {esito.livello.voto}
              </span>
              <span>
                {scarto <= -15
                  ? "usi l'AI da più tempo di quanto la conosci"
                  : scarto >= 15
                    ? "sei meglio di quanto pensi"
                    : "autopercezione onesta"}
              </span>
              <span>urgenza {URGENZE[risposte.urgenza] ?? risposte.urgenza}</span>
            </div>
          </div>
          <Quadrante voto={esito.livello.voto} livello={esito.livello.numero} />
        </section>

        {/* ---------- gli indicatori ---------- */}
        <section className="cru-kpi">
          <article className="cru-tile">
            <p className="cru-eti">Ore che perdi</p>
            <p className="cru-num rosso">
              {numero(conto.oreRecuperabili)}
              <span>h/sett</span>
            </p>
            <p className="cru-nota">
              su {risposte.ore} h/settimana di lavoro ripetitivo dichiarate
            </p>
          </article>

          <article className="cru-tile">
            <p className="cru-eti">In un anno</p>
            <p className="cru-num rosso">
              {giornate}
              <span>giornate</span>
            </p>
            <p className="cru-nota">da 8 ore, buttate in lavoro che non chiede il tuo cervello</p>
          </article>

          <article className="cru-tile larga">
            <p className="cru-eti">Quanto ti costa</p>
            <p className="cru-num rosso">
              {conto.tetto ? "oltre " : ""}
              {euro(conto.euroMese)}
              <span>al mese</span>
            </p>
            {conto.team > 0 ? (
              <>
                <div className="cru-quota" aria-hidden="true">
                  <i className="tu" style={{ width: `${100 - quotaTeam}%` }} />
                  <i className="team" style={{ width: `${quotaTeam}%` }} />
                </div>
                <p className="cru-nota">
                  <b className="p-tu">tu {euro(conto.personale)}</b> ·{" "}
                  <b className="p-team">il tuo team {euro(conto.team)}</b>
                </p>
              </>
            ) : (
              <p className="cru-nota">
                calcolato sulle ore che perdi e sul valore che dai alla tua ora
              </p>
            )}
          </article>
        </section>

        {/* ---------- la scala ---------- */}
        <section className="cru-pannello">
          <div className="cru-testa">
            <h2>La scala</h2>
            <p>Otto livelli. Dal quinto in su non basta il punteggio: servono dei minimi.</p>
          </div>

          <ol className="cru-scala">
            {[...SCALA].reverse().map((l) => {
              const qui = l.numero === esito.livello.numero;
              const fatto = l.numero < esito.livello.numero;
              const mancanti = (Object.entries(l.minimi) as [Dimensione, number][]).filter(
                ([d, min]) => risposte.punti[d] < min,
              );

              return (
                <li
                  key={l.numero}
                  className={[
                    "cru-gradino",
                    qui ? "qui" : "",
                    fatto ? "fatto" : "",
                    !fatto && !qui && mancanti.length > 0 ? "sbarrato" : "",
                  ].join(" ")}
                >
                  <span className="cru-lv">LV{l.numero}</span>
                  <span className="cru-lv-nome">{l.nome}</span>
                  <span className="cru-lv-req">
                    {mancanti.length > 0 ? (
                      <>
                        ti manca{" "}
                        {mancanti.map(([d, min], i) => (
                          <b key={d}>
                            {i > 0 ? " · " : ""}
                            {DIMENSIONI_COPY[d].etichetta} {risposte.punti[d]}→{min}
                          </b>
                        ))}
                      </>
                    ) : fatto ? (
                      <span className="cru-lv-ok">superato</span>
                    ) : qui ? (
                      <span className="cru-lv-qui">sei qui</span>
                    ) : (
                      <span className="cru-lv-voto">servono {l.sogliaMin} punti</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ---------- radiografia ---------- */}
        <section className="cru-pannello">
          <div className="cru-testa">
            <h2>Radiografia</h2>
            <p>Cinque assi, misurati sugli scenari. Non su come ti descrivi.</p>
          </div>

          <div className="cru-assi">
            {DIMENSIONI.map((d) => {
              const v = risposte.punti[d];
              return (
                <div className="cru-asse" key={d}>
                  <div className="cru-asse-r">
                    <span className="cru-asse-n">{DIMENSIONI_COPY[d].etichetta}</span>
                    <span className="cru-tacche" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <i key={i} className={i < v ? "on" : ""} />
                      ))}
                    </span>
                    <span className="cru-asse-v">{v}/3</span>
                  </div>
                  <p className="cru-asse-t">
                    {v >= 2 ? DIMENSIONI_COPY[d].solido : DIMENSIONI_COPY[d].scoperto}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- cosa ti blocca ---------- */}
        {esito.livello.bloccatoDa ? (
          <section className="cru-pannello cru-allarme">
            <div className="cru-testa">
              <h2>Cosa ti tiene fermo</h2>
              <p>
                Col solo punteggio saresti a LV{esito.livello.numeroAritmetico}. Sei a LV
                {esito.livello.numero}.
              </p>
            </div>
            <p className="cru-allarme-t">{CANCELLO_COPY[esito.livello.bloccatoDa]}</p>
            <p className="cru-allarme-k">{DIMENSIONI_COPY[esito.livello.bloccatoDa].etichetta}</p>
          </section>
        ) : null}

        {/* ---------- la padronanza ----------
            Ha mangiato due pannelli che prima erano separati: il
            simulatore con le tacche astratte e il piano scritto. Erano
            la stessa domanda posta due volte. */}
        <section className="cru-pannello">
          <Padronanza
            radiografia={risposte.punti}
            ore={risposte.ore}
            valoreOra={risposte.valoreOra}
            personeNelTeam={ruolo?.team ?? 0}
          />
        </section>

        <footer className="cru-piede">
          <span>Morfeus · Il Collaudo</span>
          <span>I numeri sono i tuoi: vengono dalle risposte che hai dato.</span>
        </footer>
      </div>
    </div>
  );
}
