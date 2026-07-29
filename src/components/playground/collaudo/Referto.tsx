/* ============================================================
   IL COLLAUDO · il referto
   ------------------------------------------------------------
   Componente di sola presentazione: non ha stato, quindi resta un
   server component. Il flusso del collaudo (che invece lo stato ce
   l'ha) lo montera' dall'alto passandogli i dati gia' raccolti.

   Tutto quello che c'e' qui dentro viene o dal motore (i numeri) o
   da copy.ts (le parole). In questo file non si scrivono testi: se
   una frase e' cablata nel markup, e' finita nel posto sbagliato.

   La pagina e' a FASCE alternate, non a scatole in colonna: ogni
   fascia e' un tempo di lettura. Vedi la testata di referto.css.
   ============================================================ */

import {
  calcolaConto,
  collauda,
  DIMENSIONI,
  type Gradino,
  type Opzioni,
  type Profilo,
  type Radiografia,
} from "./motore";
import {
  CANCELLO_COPY,
  CONVERSAZIONE_COPY,
  DICHIARATI,
  DIMENSIONI_COPY,
  GRADINI_COPY,
  LIVELLI_COPY,
  LOOP,
  MESTIERI,
  PIANO,
  PIANO_VERTICE,
  STRUTTURE,
  URGENZE,
  VERDETTI,
  nemicoPer,
  verdettoConfronto,
} from "./copy";
import "./referto.css";

export type DatiReferto = {
  nome: string;
  mestiere: keyof typeof MESTIERI;
  struttura: keyof typeof STRUTTURE;
  dichiarato: keyof typeof DICHIARATI;
  doveperdi?: keyof typeof LOOP;
  urgenza: keyof typeof URGENZE;
  oreSettimana: number;
  valoreOra: number;
  personeNelTeam?: number;
  profilo: Profilo;
  radiografia: Radiografia;
  opzioni: Opzioni;
};

/* I colori-prodotto del brand. Servono a far riconoscere il gradino
   prima ancora di leggerne il nome: l'arancio e' Claude Unlocked da
   sempre, il lime e' il Bootcamp. */
const COLORE: Record<Gradino, string> = {
  community: "var(--prod-viola)",
  "claude-unlocked": "var(--prod-arancio)",
  bootcamp: "var(--prod-lime)",
  call: "var(--prod-magenta)",
  "call-b2b": "var(--prod-magenta)",
};

/* Il separatore lo mettiamo a mano invece di usare toLocaleString: il
   componente rende sul server e poi idrata sul client, e se i due hanno
   dati di localizzazione diversi escono due stringhe diverse per lo stesso
   numero. Con una regex il risultato e' identico ovunque. */
const euro = (n: number) => "€ " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const prod = (g: Gradino) => ({ "--prod": COLORE[g] }) as React.CSSProperties;

export function Referto(d: DatiReferto) {
  const { livello, proposta, puntoDebole } = collauda(d.radiografia, d.profilo, d.opzioni);
  const conto = calcolaConto(livello.numero, d.oreSettimana, d.valoreOra, d.personeNelTeam ?? 0);
  const dichiarato = DICHIARATI[d.dichiarato];
  const lotta = nemicoPer(d.profilo.tasca, d.profilo.leva);
  const gradino = GRADINI_COPY[proposta.gradino];
  const gradinoEComunita = proposta.gradino === "community";
  /* niente sotto il massimo: il piano "sistema il punto debole" non ha senso */
  const alVertice = d.radiografia[puntoDebole] === 3;
  /* con la tasca dell'azienda il driver sono le ore, non gli euro: quel
     costo lo sostiene il datore di lavoro, non chi sta leggendo */
  const oreInTesta = d.profilo.tasca === "azienda";
  const mosse = alVertice ? PIANO_VERTICE : PIANO[puntoDebole];

  const cellaPerdita = (
    <div className="rf-cella perdita">
      <p className="k">{oreInTesta ? "Quanto costa alla tua azienda" : "Quanto ti costa oggi"}</p>
      <p className="n">
        {conto.tetto ? "oltre " : ""}
        {euro(conto.euroMese)}
      </p>
      <p className="sub">
        {oreInTesta ? "al mese, sul tuo costo orario" : "al mese, con il modo in cui lavori adesso"}
      </p>
    </div>
  );
  const cellaRecupero = (
    <div className="rf-cella recupero">
      <p className="k">Quanto puoi riprenderti</p>
      <p className="n">{conto.oreRecuperabili} ore</p>
      <p className="sub">a settimana, che tornano tue</p>
    </div>
  );

  return (
    <div className="rf">
      {/* ============ 1 · IL VERDETTO ============ */}
      <div className="rf-band">
        <div className="rf-in rf-hero">
          <p className="rf-cap">
            <span>Referto del collaudo</span>
            <b>{d.nome}</b>
            <span>misurato, non dichiarato</span>
          </p>

          <div className="rf-duo">
            <div className="rf-verdetto">
              <span className="rf-ghost" aria-hidden="true">
                {String(livello.numero).padStart(2, "0")}
              </span>
              <p className="rf-occhio">Il banco dice che sei un</p>
              <h1 className="rf-nome">
                <mark>{LIVELLI_COPY[livello.numero].nome}</mark>
              </h1>
              <p className="rf-riga">{LIVELLI_COPY[livello.numero].riga}</p>
              <p className="rf-voto">
                <b>{livello.voto}</b>
                <span>su 100 · livello {livello.numero} di 8</span>
              </p>

              {/* la porta gratuita sta qui, non solo in fondo: chi legge due
                  schermate e se ne va deve averla vista comunque */}
              <div className="rf-hero-cta">
                <button className="rf-entra">Entra nella community →</button>
                <span className="rf-hero-nota">gratis · il referto resta tuo</span>
              </div>
            </div>

            {/* il pass: la landing lo promette, qui si consegna.
                Tessera con asola e clip, come un badge da evento. */}
            <div className="rf-badge">
              <span className="rf-clip" aria-hidden="true" />
              <div className="rf-pass">
                <div className="prow">
                  <span className="plock">
                    <svg viewBox="0 0 1000 476" fill="currentColor" aria-hidden="true">
                      <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
                      <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
                      <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
                    </svg>
                    PLAYGROUND PASS
                  </span>
                  <span className="free">GRATIS</span>
                </div>
                <h3>{d.nome.toUpperCase()}</h3>
                <p className="psub">Collaudo · referto personale</p>
                <div className="frow">
                  <span className="k">Livello</span>
                  <span className="v">
                    <span className="lv">LV{livello.numero} / 8</span>
                  </span>
                </div>
                <div className="frow">
                  <span className="k">{LIVELLI_COPY[livello.numero].nome}</span>
                  <span className="v">{livello.voto} / 100</span>
                </div>
                <div className="frow">
                  <span className="k">Prima mossa</span>
                  <span className="v">{DIMENSIONI_COPY[puntoDebole].etichetta}</span>
                </div>
                <div className="pfoot">
                  <div className="code" />
                  {/* la matricola non e' finta: e' il livello e il punteggio
                      che hai preso, scritti come li scriverebbe una macchina */}
                  <p className="pserial">
                    <span>
                      N° <b>{String(livello.numero).padStart(2, "0")}-{String(livello.voto).padStart(3, "0")}</b>
                    </span>
                    <span>valido per sempre</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 2 · LA SCALA E IL FRENO ============ */}
      <div className="rf-band scura">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">01</span> Dove sei
          </p>
          <div className="rf-scala-duo">
            <div>
              <div className="rf-confronto">
                <div className="rf-cf">
                  <p className="rf-cf-lab">Ti eri dato</p>
                  <p className="rf-cf-val">{dichiarato.label}</p>
                </div>
                <div className="rf-cf">
                  <p className="rf-cf-lab">Il banco misura</p>
                  <p className="rf-cf-val mis">
                    {LIVELLI_COPY[livello.numero].nome} · {livello.voto}
                  </p>
                  <p className="rf-cf-esito">
                    {verdettoConfronto(dichiarato.atteso, livello.voto)}
                  </p>
                </div>
              </div>

              {livello.bloccatoDa ? (
                <div className="rf-freno">
                  <p className="k">Il freno</p>
                  <h3>
                    {livello.voto} punti, ma il livello si ferma a {livello.numero}.
                  </h3>
                  <p>{CANCELLO_COPY[livello.bloccatoDa]}</p>
                </div>
              ) : null}
            </div>

            <div className="rf-scala">
              {/* dal piu' alto al piu' basso: l'ordine del DOM e' lo stesso che
                  si vede, cosi' chi legge con uno screen reader sente la scala
                  nello stesso verso in cui e' disegnata */}
              {([8, 7, 6, 5, 4, 3, 2, 1] as const).map((n) => {
                const stato = n === livello.numero ? "qui" : n < livello.numero ? "fatto" : "";
                return (
                  <div key={n} className={`rf-grado ${stato}`}>
                    <i>LV{n}</i>
                    <span>{LIVELLI_COPY[n].nome}</span>
                    {n === livello.numero ? <span className="tag">sei qui</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============ 3 · LA RADIOGRAFIA ============ */}
      <div className="rf-band">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">02</span> La radiografia
          </p>
          {DIMENSIONI.map((dim) => {
            const punti = d.radiografia[dim];
            const v = VERDETTI[punti];
            const testo = DIMENSIONI_COPY[dim];
            return (
              <div key={dim} className="rf-dim">
                <span className="rf-dim-nome">{testo.etichetta}</span>
                <span className={`rf-barra ${v.classe}`}>
                  {[1, 2, 3].map((i) => (
                    <i key={i} className={i <= punti ? "on" : ""} />
                  ))}
                </span>
                <span className={`rf-verdetto-p ${v.classe}`}>{v.parola}</span>
                <span className="rf-lezione">{punti >= 2 ? testo.solido : testo.scoperto}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ 4 · IL CONTO ============ */}
      <div className="rf-band scura">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">03</span> Il conto
          </p>
          <div className="rf-specchio" style={{ marginBottom: 28 }}>
            <span>{MESTIERI[d.mestiere]}</span>
            <span>{STRUTTURE[d.struttura]}</span>
            {d.doveperdi ? (
              <span>
                Perdi valore in <b>{LOOP[d.doveperdi]}</b>
              </span>
            ) : null}
            <span>
              <b>{d.oreSettimana} ore</b> a settimana di lavoro ripetitivo
            </span>
            <span>{URGENZE[d.urgenza]}</span>
          </div>
          <div className="rf-conto">
            {oreInTesta ? (
              <>
                {cellaRecupero}
                {cellaPerdita}
              </>
            ) : (
              <>
                {cellaPerdita}
                {cellaRecupero}
              </>
            )}
          </div>
          {conto.team > 0 ? (
            <p className="rf-conto-nota">
              Sono {euro(conto.personale)} del tuo tempo più {euro(conto.team)} di chi lavora con te:
              i tuoi processi li ereditano così come sono, senza poterli cambiare.
            </p>
          ) : null}
        </div>
      </div>

      {/* ============ 5 · NEMICO E DESIDERIO ============ */}
      <div className="rf-band">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">04</span> Contro cosa stai combattendo
          </p>
          <div className="rf-lotta">
            <div className="nemico">
              <h3>Il nemico</h3>
              <p>{lotta.nemico}</p>
            </div>
            <div className="desiderio">
              <h3>Dove vuoi arrivare</h3>
              <p>{lotta.desiderio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 6 · IL PIANO ============ */}
      <div className="rf-band scura">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">05</span> Il piano, da qui
          </p>
          <p className="rf-piano-intro">
            {alVertice
              ? "Non c'è una dimensione scoperta da cui partire: le hai chiuse tutte. Da qui il lavoro cambia natura."
              : `Si parte da ${DIMENSIONI_COPY[puntoDebole].etichetta.toLowerCase()}, che è il punto più scoperto. Sistemato quello, il resto di quello che hai già comincia a reggersi in piedi.`}
          </p>
          {mosse.map((m, i) => (
            <div key={m.quando} className="rf-mossa">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="quando">{m.quando}</span>
              <span className="cosa">{m.cosa}</span>
            </div>
          ))}
          <p className="rf-piano-chiusa">
            <b>Questo piano puoi eseguirlo da solo, e funziona.</b> Qui sotto c&apos;è come farlo
            prima, e con qualcuno che ci è già passato.
          </p>
        </div>
      </div>

      {/* ============ 7 · DA QUI ============ */}
      <div className="rf-band">
        <div className="rf-in">
          <p className="rf-tag">
            <span className="n">06</span> Da qui
          </p>
          <div className="rf-gradini">
            {gradinoEComunita ? (
              <div className="rf-porta spinta" style={prod("community")}>
                <div className="in">
                  <p className="k">{gradino.occhiello}</p>
                  <h3>{gradino.titolo}</h3>
                  <p>{gradino.testo}</p>
                  <button className="vai">{gradino.cta} →</button>
                </div>
              </div>
            ) : (
              <>
                <div className="rf-porta" style={prod("community")}>
                  <div className="in">
                    <p className="k">Se parti gratis</p>
                    <h3>{GRADINI_COPY.community.titolo}</h3>
                    <p>{GRADINI_COPY.community.testo}</p>
                    <button className="vai">{GRADINI_COPY.community.cta} →</button>
                  </div>
                </div>
                <div className="rf-porta spinta" style={prod(proposta.gradino)}>
                  <div className="in">
                    <p className="k">{gradino.occhiello}</p>
                    <h3>{gradino.titolo}</h3>
                    <p>{gradino.testo}</p>
                    <button className="vai">{gradino.cta} →</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {proposta.listaAttesaBootcamp ? (
            <p className="rf-gradini-nota">
              Le iscrizioni al Bootcamp adesso sono chiuse. Ti avvisiamo quando riaprono.
            </p>
          ) : null}

          {proposta.conversazione ? (
            <div className="rf-parliamone">
              <h3>{CONVERSAZIONE_COPY.titolo}</h3>
              <p>{CONVERSAZIONE_COPY.testo}</p>
              <button className="btn btn-linea">{CONVERSAZIONE_COPY.cta} →</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ============ chiusa ============ */}
      <div className="rf-band scura">
        <div className="rf-in rf-chiusa">
          <p>
            Il tuo pass dice <b>{LIVELLI_COPY[livello.numero].nome}</b>. Rifai il collaudo quando hai
            costruito qualcosa: il livello si aggiorna.
          </p>
          <div className="rf-hero-cta" style={{ marginTop: 0 }}>
            <button className="rf-entra">Entra nella community →</button>
            <button className="rf-entra linea">Condividi il livello →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
