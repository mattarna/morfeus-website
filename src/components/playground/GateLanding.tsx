"use client";

/* ============================================================
   /gate · la porta corta del Playground
   ------------------------------------------------------------
   Pagina da social: due blocchi e un bottone solo. Chi arriva qui
   non conosce Morfeus, quindi il bottone parla di risultato
   ("scopri il tuo livello") e non di nome proprio ("fai il
   Collaudo"): il nome lo impara dentro la pagina.

   PERCHE' NON E' UNA OPTIN CON CAMPO EMAIL. L'email la chiede gia'
   il Collaudo, a fine domande. Chiederla anche qui vorrebbe dire
   chiederla due volte e perdere gente in cima per un dato che poi
   arriva comunque. Qui il bottone apre il Collaudo e basta.

   IL DISEGNO NON E' NUOVO, E' QUELLO DELLA LANDING. La hero e' il
   campo viola (.cover > .field), con eyebrow, .esito e .sysline:
   gli stessi device, cosi' le due pagine sono riconoscibilmente
   la stessa mano invece che due siti. L'unica cosa disegnata qui
   e' la scheda del referto, che sulla landing non serviva: qui e'
   il prodotto, e mostrarlo vale piu' che raccontarlo.

   IL CSS. playground.css porta i token e i pezzi comuni; e serve
   anche al Collaudo, che in collaudo.css USA le variabili senza
   dichiararle. Senza quell'import l'overlay si aprirebbe scolorito.
   ============================================================ */

import { useCallback, useState } from "react";
import { Collaudo } from "./collaudo/Collaudo";
import { LEGALE } from "./sezioni";
import { SORGENTI } from "./collegamenti";
import "./playground.css";
import "./gate.css";

/** Ripetuto in cima e in fondo: due copie a mano divergono al primo
 *  ripensamento. */
const AZIONE = "Scopri il tuo livello ed entra";

/** La radiografia della scheda d'esempio. I punti NON sono decorativi:
 *  9/15 e' esattamente il totale che con la formula del referto
 *  (10 + 9/15 x 85) da' il 61 stampato sopra, e 61 cade nella banda
 *  media, cioe' il Livello 2. Se un giorno cambiano i punti, il voto
 *  va rifatto: una scheda che si contraddice da sola e' peggio che
 *  non averla. */
const ASSI = [
  { nome: "Contesto", punti: 3 },
  { nome: "Ripetibilità", punti: 1 },
  { nome: "Correzione", punti: 2 },
  { nome: "Controllo", punti: 2 },
  { nome: "Diffusione", punti: 1 },
];

const COSA_OTTIENI = [
  {
    n: "01",
    titolo: "Il tuo livello reale",
    testo: "Un numero, non una sensazione. Misurato su come lavori, non su come ti descrivi.",
  },
  {
    n: "02",
    titolo: "La radiografia",
    testo: "Cinque assi: cosa regge già, e dove esattamente ti stai bloccando.",
  },
  {
    n: "03",
    titolo: "Il tuo piano di lavoro",
    testo: "La prima mossa da fare adesso, e cosa puoi tranquillamente saltare.",
  },
  {
    n: "04",
    titolo: "La porta della community",
    testo: "Aperta, in fondo al referto. Da lì entri nel Playground.",
  },
];

export function GateLanding() {
  const [collaudoAperto, setCollaudoAperto] = useState(false);
  const onCollaudo = useCallback(() => setCollaudoAperto(true), []);

  return (
    <div className="pg26 gate">
      <header className="gate-testa">
        <div className="wrap">
          <span className="gate-marchio">
            Morfeus <strong>AI Playground</strong>
          </span>
          <span className="gate-marchio-stato">
            Community <span className="chipst">aperta</span>
          </span>
        </div>
      </header>

      <main>
        {/* ========== 01 · IL CAMPO ========== */}
        <section className="cover gate-cover">
          <div className="field">
            <div className="wrap inner">
              <div className="gate-grid">
                <div className="gate-col">
                  <div className="eyebrow">La community di Morfeus</div>

                  <h1>
                    Non ti serve un altro corso di AI.
                    <span className="l2">Ti serve la stanza dove si usa sul serio.</span>
                  </h1>

                  <p className="sub">
                    Il Playground è la community gratuita di professionisti e imprenditori che
                    hanno smesso di improvvisare con l&apos;AI e si dicono cosa funziona davvero.
                    Non follower: gente che costruisce.
                  </p>

                  <div className="esito">
                    <div>
                      <b>La porta</b>
                      <span>Si entra da una sola parte: il Collaudo.</span>
                    </div>
                    <div>
                      <b>Il pedaggio</b>
                      <span>Dodici domande. Due minuti e mezzo.</span>
                    </div>
                    <div>
                      <b>Cosa ti resta</b>
                      <span>Il tuo livello e il tuo piano di lavoro.</span>
                    </div>
                  </div>

                  <div className="ctas">
                    <button className="btn btn-giallo btn-big" type="button" onClick={onCollaudo}>
                      {AZIONE} →
                    </button>
                  </div>

                  <div className="sysline">
                    <span>
                      <b>1.000+</b> BUILDER DENTRO
                    </span>
                    <span>
                      INGRESSO <b>GRATIS</b>
                    </span>
                    <span>
                      COLLAUDO <span className="chipst">2&apos;30&quot;</span>
                    </span>
                  </div>

                  {/* Sotto i 560px la landing nasconde .esito e .sysline: tre
                      voci impilate spingerebbero il bottone sotto la piega.
                      La prova pero' non puo' sparire proprio sul telefono, che
                      e' da dove arriva chi clicca da un social: torna qui in
                      una riga sola, con lo stesso device della landing. */}
                  <p className="sys-mob">
                    <b>1.000+</b> builder dentro · <b>gratis</b> · 2 minuti e mezzo
                  </p>
                </div>

                {/* La scheda: quello che esce dal Collaudo. E' un esempio e
                    lo dichiara, perche' una schermata di prodotto senza
                    etichetta si legge come il risultato di qualcun altro. */}
                <aside className="ref" aria-label="Esempio di referto">
                  <div className="ref-testa">
                    <span>Il tuo referto</span>
                    <span className="ref-tag">esempio</span>
                  </div>

                  <div className="ref-voto">
                    <strong>61</strong>
                    <span>/100</span>
                  </div>

                  <div className="ref-livello">
                    <span className="ref-livello-nome">Livello 2 di 3</span>
                    <span className="ref-spina" aria-hidden="true">
                      <i className="on" />
                      <i className="on" />
                      <i />
                    </span>
                  </div>

                  <div className="ref-assi">
                    {ASSI.map((a) => (
                      <div className="ref-asse" key={a.nome}>
                        <span className="ref-asse-nome">{a.nome}</span>
                        <span className="ref-barra" aria-hidden="true">
                          {[0, 1, 2].map((i) => (
                            <i key={i} className={i < a.punti ? "on" : ""} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="ref-mossa">
                    <b>La tua prima mossa</b>
                    <span>Rendi permanente il contesto: smetti di ripresentarti ogni mattina.</span>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 02 · PERCHE' IL COLLAUDO ========== */}
        <section className="gate-perche">
          <div className="wrap">
            <div className="gate-perche-testa">
              <p className="gate-eyebrow">Il Collaudo</p>
              <h2>
                Non serve a noi.
                <span className="gate-giallo">Serve a te.</span>
              </h2>
              <div className="gate-perche-testo">
                <p>
                  Potremmo metterti un bottone &laquo;iscriviti&raquo; e farti entrare al buio. Non
                  lo facciamo per un motivo pratico: se non sai a che punto sei, una community
                  diventa rumore. Leggi tutto, applichi niente, e dopo un mese sei fermo dov&apos;eri.
                </p>
                <p>
                  Il Collaudo non ti chiede come <em>pensi</em> di essere messo. Ti mette davanti a
                  situazioni di lavoro vere e misura come le risolvi oggi.
                </p>
              </div>
            </div>

            <ol className="gate-carte">
              {COSA_OTTIENI.map((c) => (
                <li className="gate-carta" key={c.n}>
                  <span className="gate-carta-n">{c.n}</span>
                  <b>{c.titolo}</b>
                  <span className="gate-carta-testo">{c.testo}</span>
                </li>
              ))}
            </ol>

            <div className="gate-chiusa">
              <p>Il referto è tuo: te lo tieni anche se in community non entri.</p>
              <button className="btn btn-giallo btn-big" type="button" onClick={onCollaudo}>
                {AZIONE} →
              </button>
              <p className="under-cta">Gratis · 12 domande · 2 minuti e mezzo</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="gate-piede">
        <div className="wrap">
          <p>© 2026 Morfeus · P.IVA {LEGALE.piva}</p>
          <p className="gate-piede-link">
            <a href={LEGALE.privacy}>Privacy</a>
            <a href={LEGALE.cookie}>Cookie</a>
          </p>
        </div>
      </footer>

      {/* Il Collaudo si apre qui sopra, come nella landing. La sorgente
          e' l'unica differenza: separa nel foglio e in Brevo chi e'
          entrato da questa pagina da chi e' entrato dalla landing. */}
      {collaudoAperto ? (
        <Collaudo onChiudi={() => setCollaudoAperto(false)} sorgente={SORGENTI.gate} />
      ) : null}
    </div>
  );
}
