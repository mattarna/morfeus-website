"use client";

import { useCallback, useState } from "react";
import "./playground.css";

/* ============================================================
   PLAYGROUND · la landing, portata dal prototipo HTML.
   ------------------------------------------------------------
   Il markup e' quello di landing-community_v2.html, convertito in
   JSX in modo meccanico: class -> className, attributi SVG in
   camelCase, style come oggetto, tag vuoti autochiusi. Il COPY non
   e' stato toccato in nessun punto.

   PERCHE' E' UN CLIENT COMPONENT.
   Ogni CTA della pagina apre il collaudo, che e' un overlay con
   stato. Spezzare le sezioni in server component per poi passare
   loro la funzione di apertura vorrebbe dire infilare un wrapper
   client attorno a ogni bottone: piu' file, stesso JavaScript.
   Next renderizza comunque i client component sul server, quindi
   l'HTML che arriva al crawler e' completo: non si perde niente
   lato SEO.

   TUTTO STA SOTTO .pg26. Il CSS di questa pagina dichiara palette,
   corpo e reset, e senza contenitore li imporrebbe al resto del
   sito. Vedi la testata di playground.css.
   ============================================================ */

export function PlaygroundLanding() {
  const [collaudoAperto, setCollaudoAperto] = useState(false);
  const onCollaudo = useCallback(() => setCollaudoAperto(true), []);

  return (
    <div className="pg26">
      {/* ===== TROFEO · simbolo riusabile ===== */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D6D1FF" /><stop offset="1" stopColor="#9A8FFF" /></linearGradient>
          <linearGradient id="tg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8F80FF" /><stop offset="1" stopColor="#4536C4" /></linearGradient>
          <linearGradient id="tg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6A58F2" /><stop offset="1" stopColor="#31258F" /></linearGradient>
          <linearGradient id="tg4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#F1EFFF" /><stop offset="1" stopColor="#C9C2FF" /></linearGradient>
          <symbol id="trofeo" viewBox="0 0 420 470">
            <g transform="rotate(-4 210 235)">
              <polygon points="104,104 46,120 34,166 58,180 74,138 110,132" fill="#6A58F2" />
              <polygon points="58,180 74,220 116,238 110,132 74,138" fill="#4536C4" />
              <polygon points="316,104 374,120 386,166 362,180 346,138 310,132" fill="#A99DFF" />
              <polygon points="362,180 346,220 304,238 310,132 346,138" fill="#7A6BF3" />
              <polygon points="88,58 332,58 320,96 100,96" fill="url(#tg4)" />
              <polygon points="100,96 320,96 306,112 114,112" fill="#31258F" opacity=".45" />
              <polygon points="114,112 176,112 210,306 158,268 126,196" fill="url(#tg2)" />
              <polygon points="176,112 246,112 210,306" fill="url(#tg3)" />
              <polygon points="246,112 306,112 294,196 262,268 210,306" fill="url(#tg1)" />
              <polygon points="176,112 210,214 246,112" fill="#FFFFFF" opacity=".18" />
              <polygon points="114,112 126,196 158,268 148,170" fill="#FFFFFF" opacity=".07" />
              <polygon points="192,306 228,306 220,352 200,352" fill="url(#tg3)" />
              <polygon points="192,306 210,352 220,352 228,306" fill="#8F80FF" opacity=".35" />
              <polygon points="180,352 240,352 248,374 172,374" fill="url(#tg1)" />
              <polygon points="150,374 270,374 256,394 164,394" fill="url(#tg4)" />
              <polygon points="164,394 256,394 296,436 124,436" fill="url(#tg2)" />
              <polygon points="256,394 296,436 210,436" fill="#31258F" opacity=".5" />
              <polygon points="124,436 296,436 296,454 124,454" fill="#241B6E" />
              <text x="44" y="52" fontFamily="monospace" fontSize="20" fill="#EDEFF7">+</text>
              <text x="378" y="248" fontFamily="monospace" fontSize="16" fill="#D6D1FF">+</text>
              <text x="70" y="330" fontFamily="monospace" fontSize="14" fill="#D6D1FF" opacity=".8">+</text>
            </g>
          </symbol>
          {/* icone delle 3 strade · linea tecnica, stesso peso di tratto, famiglia CAMPO */}
          <symbol id="ic-frag" viewBox="0 0 56 56">
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="15" r="3.2" /><circle cx="29" cy="9" r="3.2" /><circle cx="46" cy="19" r="3.2" />
              <circle cx="9" cy="35" r="3.2" /><circle cx="27" cy="29" r="3.2" /><circle cx="45" cy="39" r="3.2" />
              <circle cx="18" cy="49" r="3.2" /><circle cx="36" cy="47" r="3.2" />
            </g>
            <path d="M14 18 L24 27" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity=".5" />
          </symbol>
          <symbol id="ic-recipe" viewBox="0 0 56 56">
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M15 9 h27 a3 3 0 0 1 3 3 v29" opacity=".45" />
              <rect x="8" y="16" width="30" height="33" rx="3" />
              <path d="M15 26 H31 M15 33 H30 M15 40 H26" />
            </g>
          </symbol>
          <symbol id="ic-cam" viewBox="0 0 56 56">
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="7" y="19" width="30" height="21" rx="4" />
              <circle cx="20" cy="29.5" r="5.4" />
              <path d="M41 23.5 l8 -4.5 v21 l-8 -4.5 z" />
            </g>
          </symbol>
          {/* LE SEI VOCI DELLA DOTAZIONE.
               Ogni icona dice la MECCANICA della voce, non la sua categoria:
               non "chat" ma due voci che si rispondono, non "video" ma il
               segnale in onda, non "libro" ma due moduli impilati. */}
          <symbol id="ic-conf" viewBox="0 0 56 56">
            {/* confronto: due voci che si rispondono, non un forum */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M6 13 h27 a3 3 0 0 1 3 3 v13 a3 3 0 0 1-3 3 H16 l-7 6 v-6 H6 a3 3 0 0 1-3-3 V16 a3 3 0 0 1 3-3 z" />
              <path d="M50 24 h-11 a3 3 0 0 0-3 3 v13 a3 3 0 0 0 3 3 h11 l4 5 v-5 a3 3 0 0 0 0-0 V27 a3 3 0 0 0-3-3 z" opacity=".55" />
            </g>
            <path d="M12 21 h13 M12 26 h8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
          </symbol>
          <symbol id="ic-live" viewBox="0 0 56 56">
            {/* live: non un tasto play, un segnale in onda che parte da un punto */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="5" y="12" width="34" height="26" rx="4" />
              <path d="M18 21 l9 4 -9 4 z" strokeLinejoin="round" />
              <path d="M18 45 h8" />
            </g>
            <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55">
              <path d="M45 18 a12 12 0 0 1 0 14" />
              <path d="M49 13 a19 19 0 0 1 0 24" />
            </g>
            <path d="M22 44 v-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
          </symbol>
          <symbol id="ic-feed" viewBox="0 0 56 56">
            {/* feed: un flusso di cose GIA' provate, quindi ognuna spuntata */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="5" y="9" width="46" height="11" rx="3" />
              <rect x="5" y="24" width="46" height="11" rx="3" opacity=".7" />
              <rect x="5" y="39" width="46" height="11" rx="3" opacity=".4" />
              <path d="M11 14.5 l2.6 2.6 L19 11.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M11 29.5 l2.6 2.6 L19 26.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".5" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
          <symbol id="ic-adv" viewBox="0 0 56 56">
            {/* advisor: qualcuno che ATTRAVERSA la soglia, non un ritratto */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="19" cy="16" r="6" />
              <path d="M7 44 c0-8 5.4-13 12-13 s12 5 12 13" />
              <path d="M40 8 v40" />
            </g>
            <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".5">
              <circle cx="45" cy="20" r="4.6" />
              <path d="M36 44 c0-6.5 4-10.5 9-10.5 s9 4 9 10.5" />
            </g>
          </symbol>
          <symbol id="ic-corsi" viewBox="0 0 56 56">
            {/* due corsi: due moduli impilati, e il secondo e' pieno quanto il primo */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M5 20 L28 10 l23 10 -23 10 z" />
              <path d="M12 26 v11 c0 3.6 7.2 6.5 16 6.5 s16-2.9 16-6.5 V26" />
            </g>
            <path d="M51 22 v10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
          </symbol>
          <symbol id="ic-mattone" viewBox="0 0 56 56">
            {/* il primo mattone: un blocco che si INCASTRA in un posto vuoto,
                 tratteggiato perche' il posto c'era gia' e aspettava */}
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="6" y="30" width="20" height="14" rx="2.5" />
              <rect x="30" y="30" width="20" height="14" rx="2.5" />
              <rect x="18" y="10" width="20" height="14" rx="2.5" />
              <path d="M28 24 v6" strokeLinecap="round" />
            </g>
            <path d="M18 44 h20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity=".5" />
          </symbol>
          <symbol id="markm" viewBox="0 0 1000 476">
            <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" /><path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" /><path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
          </symbol>
        </defs>
      </svg>

      <nav className="island">
        <a className="brand" href="#campo" aria-label="Torna all'inizio">
          <svg viewBox="0 0 1000 476" fill="currentColor" aria-hidden="true"><use href="#markm" /></svg>
          <span className="wm">Playground</span>
        </a>
        <span className="sep"></span>
        <span className="links">
          <a href="#credo">Il credo</a>
          <a href="#stanza">Il Playground</a>
          <a href="#prova">Chi c'è</a>
          <a href="#faq">FAQ</a>
        </span>
        <button className="mcta" onClick={onCollaudo}>Fai il collaudo →</button>
      </nav>

      {/* ============ 01 · HERO · il campo ============ */}
      <section className="cover" id="campo">
        <div className="field">
          <div className="wrap inner">
            <div className="cover-grid">
              <div>
                <div className="eyebrow">Playground · la community di Morfeus</div>
                <h1>Non ti serve un altro corso di AI.<span className="l2">Ti serve stare a contatto con chi la usa sul serio.</span></h1>
                <p className="sub">La usi già ogni giorno, ma alla cieca, in mezzo al rumore dei guru. Qui stai in mezzo ai fondatori e agli operatori che la usano davvero, e che si dicono cosa funziona e cosa no. Si entra facendo il collaudo: due minuti e mezzo per scoprire a che livello sei.</p>
                {/* WIREFRAME · testo di prima passata, da riempire insieme */}
                <div className="esito">
                  <div><b>Il tuo livello</b><span>Misurato su come lavori, non su come ti descrivi.</span></div>
                  <div><b>Il primo pezzo</b><span>Il file di contesto: lo applichi in dieci minuti.</span></div>
                  <div><b>I tuoi pari</b><span>1100+ che costruiscono, non che commentano.</span></div>
                </div>
                <div className="ctas">
                  <button className="btn btn-bianco btn-big" onClick={onCollaudo}>Fai il collaudo ed entra →</button>
                </div>
                <div className="sysline">
                  <span><b>1100+</b> BUILDER DENTRO</span>
                  <span>INGRESSO <b>GRATIS</b></span>
                  <span>PLAYGROUND <span className="chipst">APERTO</span></span>
                </div>
                <p className="sys-mob"><b>1100+</b> builder dentro · ingresso <b>gratis</b></p>
              </div>
              <svg className="trophy" viewBox="0 0 420 470" aria-hidden="true"><use href="#trofeo" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* il nastro · uno per pagina */}
      <div className="nastro" aria-hidden="true">
        <div className="ntrack">
          <span><b>SI GUADAGNA</b>, NON SI COMPRA</span><span>///</span><span><b>1100+</b> BUILDER DENTRO</span><span>///</span><span>LIVE OGNI <b>SETTIMANA</b></span><span>///</span><span>IL <b>COLLAUDO</b> È LA PORTA</span><span>///</span><span>SISTEMI CHE <b>GIRANO</b>, NON PROMPT</span><span>///</span>
          <span><b>SI GUADAGNA</b>, NON SI COMPRA</span><span>///</span><span><b>1100+</b> BUILDER DENTRO</span><span>///</span><span>LIVE OGNI <b>SETTIMANA</b></span><span>///</span><span>IL <b>COLLAUDO</b> È LA PORTA</span><span>///</span><span>SISTEMI CHE <b>GIRANO</b>, NON PROMPT</span><span>///</span>
        </div>
      </div>

      {/* ============ 02 · IL PROBLEMA ============ */}
      <section id="problema" data-n="01">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">01</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">01</span> Il problema</div>
          <h2 className="shead">Usi l'AI venti volte al giorno.<br />E ogni mattina riparte da capo.</h2>
          <div className="prose">
            <p>Le chiedi una cosa, sistemi quello che esce, la richiedi. Funziona, a metà. E ogni mattina riparte da capo, come se non ti avesse mai conosciuto.</p>
            <p>Il punto non è che ti manca un altro corso, o l'ultimo tool uscito martedì. Il punto è che la stai imparando <strong>da solo, a tentoni, senza un metro</strong>. Nessuno ti dice se lo stai facendo bene.</p>
          </div>
          <div className="pullq">
            <span className="pq-lab">Il punto cieco</span>
            <p>E quando usi una cosa da solo, senza confronto, <span className="pq-hi">ti convinci di essere bravo proprio perché non vedi cosa c'è oltre.</span></p>
          </div>
          <div className="selfrows">
            <div className="selfrow"><span className="tick">◆</span><span>Riscrivi lo stesso prompt dieci volte finché esce decente. E domani lo riscrivi da capo.</span></div>
            <div className="selfrow"><span className="tick">◆</span><span>I tuoi la usano di nascosto, ognuno a modo suo, e non sai cosa entra nei documenti che vanno ai clienti.</span></div>
            <div className="selfrow"><span className="tick">◆</span><span>Hai già comprato due o tre corsi. Li hai finiti, forse. E sei fermo lì.</span></div>
            <div className="selfrow"><span className="tick">◆</span><span>Segui newsletter e video, salvi tutto, applichi niente.</span></div>
            <div className="selfrow"><span className="tick">◆</span><span>Senti che l'onda è già arrivata, e hai il dubbio di esserti svegliato tardi.</span></div>
          </div>
          <div className="prose">
            <p>E intanto il tempo passa. Non ti crolla addosso niente: è una perdita lenta, che non fa rumore. Ogni settimana rifai a mano cose che potrebbero girare da sole, e il vantaggio che potevi prenderti se lo prende chi si è mosso con metodo. <strong>Un ritardo così non si vede. Finché non si vede.</strong></p>
            <p>E la cosa strana è che ci hai già provato, a uscirne. Vediamo perché non ha funzionato.</p>
          </div>
        </div>
      </section>

      {/* ============ 03 · PERCHÉ NON HA FUNZIONATO ============ */}
      <section id="strade" data-n="02">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">02</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">02</span> Le tre strade</div>
          <h2 className="shead">Ci hai già provato, a uscirne.<br />In tre modi, probabilmente.</h2>
          <div className="grid3">
            <div className="gcell">
              <span className="pn">STRADA / 01</span>
              <span className="gico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-frag" /></svg></span>
              <h3>Da solo, gratis</h3>
              <p>YouTube, i thread, la newsletter del momento. Hai imparato tante cose sciolte e nessun sistema. Gratis ti è costato sei mesi di tentativi.</p>
            </div>
            <div className="gcell">
              <span className="pn">STRADA / 02</span>
              <span className="gico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-recipe" /></svg></span>
              <h3>Un corso</h3>
              <p>L'hai comprato, magari due. Ti hanno dato ricette: prompt da copiare. Ma una ricetta non è saper cucinare, e infatti sei tornato a fare a modo tuo.</p>
            </div>
            <div className="gcell">
              <span className="pn">STRADA / 03</span>
              <span className="gico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-cam" /></svg></span>
              <h3>Un guru</h3>
              <p>Uno di quelli che l'AI la spiega ma non la usa per lavorare davvero. Ti ha venduto la teoria di un principiante con una telecamera.</p>
            </div>
          </div>
          <div className="momento">
            <span className="chipst m-eye">IL PUNTO</span>
            <p className="m-pre">Sembrano tre strade diverse. Hanno lo stesso buco: sono tutte informazione, e tu sei sempre da solo.</p>
            <h3>Le cose non si imparano leggendo come si fanno.<br /><span>Si imparano stando vicino a chi le fa già.</span></h3>
            <p className="m-after">Nessuno ti guarda mentre lavori e ti dice "no, così no, guarda come faccio io". Un video non ti corregge. Una newsletter non ti risponde. È quello che ti è mancato: non un altro contenuto, le persone giuste intorno. E il motivo per cui è così difficile trovarle è che il mercato è pieno di quelle sbagliate.</p>
          </div>
        </div>
      </section>

      {/* ============ 04 · IL NEMICO ============ */}
      <section id="nemico" data-n="03">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">03</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">03</span> Il nemico</div>
          <h2 className="shead">Il mondo dell'AI si è riempito<br />di finti esperti.</h2>
          <p className="lede">Gente che l'ha scoperta sei mesi fa, ha letto tre thread e si è rifatta la bio. E adesso te la spiega.</p>
          {/* LA DOMANDA PRESIEDE, non introduce.
               Prima era una citazione ferma in cima e sotto quattro identikit
               slegati: quattro descrizioni, nessun meccanismo. Ora la domanda
               resta appesa a fianco mentre scorri il bestiario, quindi ogni
               figura si legge come un reperto sotto quel test. Zero parole
               cambiate: e' solo cambiato chi guarda cosa. */}
          <div className="nemico-grid">
          <div className="nemico-q">
          <div className="manifesto">
            <span className="eye">La domanda che li smaschera tutti</span>
            <h3>"Quali sistemi usi ogni giorno che lavorano al posto tuo?"</h3>
            <p>Se balbetta, stai comprando la teoria di un principiante con una telecamera. La truffa moderna è questa: vendere un'esperienza che non hai.</p>
          </div>
          </div>
          <div className="enemies">
            <div className="enemy">
              <div className="en"><i>✕</i><h4>Lo smanettone della complessità</h4></div>
              <p>Ti vende il sistema iper-tecnico che non capisci, e ti fa sentire scemo apposta. <strong>Se ti serve un ingegnere per usarlo, ha fallito lui, non tu.</strong></p>
            </div>
            <div className="enemy">
              <div className="en"><i>✕</i><h4>Il corsificio teorico</h4></div>
              <p>Video su "come funziona un LLM" che non ti hanno mai fatto guadagnare un euro. <strong>Hai comprato tre corsi e sei fermo: ti hanno venduto nozioni, non un metodo.</strong></p>
            </div>
            <div className="enemy">
              <div className="en"><i>✕</i><h4>Il tool-zapper</h4></div>
              <p>Il modello nuovo del martedì, l'app del momento. <strong>Salta da un giocattolo all'altro e non costruisce niente: si tiene solo occupato.</strong></p>
            </div>
            <div className="enemy">
              <div className="en"><i>✕</i><h4>Il fuffa-guru</h4></div>
              <p>I "500 prompt", la rendita passiva, la macchina in copertina. <strong>Lotterie vendute a gente stanca.</strong></p>
            </div>
          </div>
          </div>
          <div className="ribalta">
            <p className="r-pre">Questa stanza è costruita per essere l'esatto contrario. Qui dentro non ci sono guru con la telecamera: ci sono operatori che l'AI la usano per lavorare davvero, ogni giorno, e ti fanno vedere cosa gira e cosa no.</p>
            <p className="r-big">L'autorità, qui, te la guadagni facendo.<br /><span className="vh">Non parlando.</span></p>
            <p className="r-after">Il finto esperto è il primo dei paletti su cui è costruito questo posto. Ecco gli altri.</p>
          </div>
        </div>
      </section>

      {/* ============ FIRMA · CHI TIENE LA STANZA ============
           Non numerata: le altre sono i capitoli dell'argomento, questa e' la
           firma in calce. Sta qui, subito dopo il test che smaschera i finti
           esperti, perche' e' il posto in cui chi scrive la pagina ci si
           sottopone. Copy da _pre-campo/chi-siamo.html: sono parole sue. */}
      <div id="firma">
        <div className="wrap">
          <div className="firma">
            <div className="fi-foto">
              {/* FOTO MATTEO · 4:5. Una foto vera, non uno scatto da palco:
                   il senso di questo blocco e' vicinanza, non autorevolezza. */}
              <img src="/playground/matteo.jpg" alt="Matteo Arnaboldi" loading="lazy" decoding="async" />
            </div>
            <div className="fi-testo">
              <div className="fi-eye">Chi tiene la stanza</div>
              <h2>Matteo <span className="vh">Arnaboldi</span>.</h2>
              <p className="fi-ruolo">Fondatore di Morfeus</p>
              <p className="fi-p">Qui sopra ho scritto che i finti esperti si smascherano con una domanda sola. Vale anche per me, quindi rispondo per primo: <b>i sistemi che lavorano al posto mio ogni giorno sono tre</b>, girano dentro Morfeus su clienti che pagano, e nella stanza trovi com'è fatto ognuno.</p>
              {/* DA RIEMPIRE COI TRE VERI: nome e una riga a testa. Finché
                   restano "tre", questo blocco promette una prova e non la dà,
                   che è precisamente il difetto della versione di prima. */}
              <div className="fi-regola">
                <span className="fi-rk">Cosa porto qui, e cosa no</span>
                <p>Non porto la versione bella, quella che si fa vedere dopo che ha funzionato. Porto quella ancora aperta: <b>dove si è rotta, cosa ho cambiato, cosa ho buttato via.</b> È l'unica parte che serve a chi sta costruendo adesso.</p>
              </div>
              <p className="fi-chiusa">Sto nella stanza tutti i giorni, non dietro un pannello. Se qui dentro qualcosa non funziona, me lo dici lì e ti rispondo io.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 05 · COSA CREDIAMO ============ */}
      <section id="credo" data-n="04">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">04</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">04</span> Il credo</div>
          <h2 className="shead">Un posto lo capisci<br /><span className="grad">da quello che ci si dice dentro.</span></h2>
          <p className="lede">Non sono slogan da mettere in bio. Sono il filtro di chi entra, e di cosa si dice qui.</p>
          <div className="credo">
            <div className="credorow">
              <span className="cn">01</span>
              <div>
                <h3>Chi impara a pensare e creare sistemi con l'AI adesso ottiene un vantaggio sleale per i prossimi dieci anni.</h3>
                <p>Non conta essere arrivati primi. Conta il metodo: chi lo costruisce ora parte con anni di margine su chi sta ancora guardando dalla finestra.</p>
              </div>
            </div>
            <div className="credorow">
              <span className="cn">02</span>
              <div>
                <h3>Il vero potere non è usare l'AI. È costruirti un cervello AI che lavora per te.</h3>
                <p>Usarla la usano tutti, ogni mattina, ripartendo da zero. Avere un sistema che ti conosce e lavora secondo i tuoi standard è un'altra categoria di gioco.</p>
              </div>
            </div>
            <div className="credorow">
              <span className="cn">03</span>
              <div>
                <h3>L'AI non serve a fare di più. Serve a riprenderti il tempo e la vita che vuoi.</h3>
                <p>Non hai aperto la tua attività per riempire le ore liberate con altre ore. Le liberi per pensare. O per staccare davvero.</p>
              </div>
            </div>
            <div className="credorow">
              <span className="cn">04</span>
              <div>
                <h3>La crescita non è assumere di più. È far rendere il doppio chi hai già.</h3>
                <p>Prima costruisci il sistema per te, poi lo estendi alle tue persone. La struttura non si gonfia: si potenzia. E smetti di assumere per disperazione.</p>
              </div>
            </div>
            <div className="credorow">
              <span className="cn">05</span>
              <div>
                <h3>Non vince chi sa programmare. Vince chi sa esattamente cosa vuole.</h3>
                <p>Qui non si scrive codice. Si impara ad avere in testa con chiarezza il risultato, e a farsi affiancare da chi questi sistemi li costruisce per lavoro. Il resto lo fa l'AI.</p>
              </div>
            </div>
            <div className="credorow">
              <span className="cn">06</span>
              <div>
                <h3>Non siamo spettatori della rivoluzione. Siamo quelli che la usano per costruire.</h3>
                <p>Qui non si commenta cosa sta succedendo. Si costruisce mentre succede.</p>
              </div>
            </div>
          </div>
          <div className="prose">
            <p>Se hai fatto sì con la testa almeno tre volte, questo posto è tuo. Ecco cosa ci trovi dentro.</p>
          </div>
        </div>
      </section>

      {/* ============ 06 · LA STANZA ============ */}
      <section id="stanza" data-n="05">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">05</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">05</span> Il Playground</div>
          <h2 className="shead">Cosa c'è <span className="vh">dentro</span>.</h2>

          {/* LA STANZA, VISTA.
               La sezione chiede "cosa c'e' dentro" e poi risponde con sei
               riquadri di testo. Questa e' l'unica riga della pagina in cui il
               lettore VEDE che la stanza esiste, invece di leggerlo. Sta prima
               dei riquadri perche' e' il piano largo: i riquadri sono i dettagli.
               Cornice, non ritaglio: la colonna di sinistra con gli spazi veri
               (Welcome Hub, Claude Unlocked, Morfeus Academy) e' meta' del punto. */}
          <figure className="schermo">
            <figcaption className="sc-eye"><span>La stanza · vista dall'interno</span><span>Feed</span></figcaption>
            {/* IL PORTATILE. Una schermata rettangolare appoggiata sulla
                 pagina resta un'immagine; dentro uno schermo diventa un posto
                 in cui qualcuno sta lavorando adesso. È disegnato in CSS, non
                 è un mockup scaricato: nessun asset in più e i colori restano
                 quelli della palette. */}
            <div className="sc-vetro">
              <img src="/playground/piattaforma-feed.png" alt="Il feed del Playground: nella colonna di sinistra gli spazi della community, al centro i post dei membri." loading="lazy" decoding="async" />
            </div>
          </figure>
          {/* DUE RANGHI, non sei tessere uguali.
               I sei elementi sono di natura diversa: quattro sono un RITMO (una
               cosa che succede, e continua a succedere finche' resti), due sono
               MATERIALE che ti porti via il primo giorno. In sei riquadri identici
               quella differenza spariva, ed e' proprio la differenza che decide
               se vale la pena entrare oggi o "un giorno".
               Le due etichette sono le uniche parole nuove: sono insegne, non copy. */}
          <div className="stack">
            <div className="rank" style={{ gridColumn: "1/-1" }}>
              <span className="rk">Il ritmo</span>
              <span className="rkn">01 — 04</span>
            </div>
            <div className="stackcell">
              <span className="sl">In dotazione · 01</span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-conf" /></svg></span>
              <h3>Il confronto vero, ogni giorno</h3>
              <p>Builder che si scambiano cosa stanno costruendo, cosa gira e cosa no. Fai una domanda la mattina, la sera hai tre risposte da gente che quel problema l'ha già risolto. È la cosa che nessun corso ti dà: non impari da un video, ti correggi con chi lo fa già.</p>
            </div>
            <div className="stackcell">
              <span className="sl">In dotazione · 02</span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-live" /></svg></span>
              <h3>Live settimanali</h3>
              <p>Ogni settimana si costruisce qualcosa dal vivo, si portano casi reali, si risponde alle domande. Niente teoria: mani sulla tastiera. Vedi le mosse mentre vengono fatte, ed è lì che scatta il "ah, ecco come si fa".</p>
            </div>
            <div className="stackcell">
              <span className="sl">In dotazione · 03</span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-feed" /></svg></span>
              <h3>Il feed di cosa funziona</h3>
              <p>Un flusso continuo di sistemi reali che i membri (e noi) usiamo davvero, con cosa hanno cambiato. Niente screenshot di prompt: roba che gira. Smetti di indovinare cosa vale la pena provare, lo vedi già provato da qualcuno come te.</p>
            </div>
            <div className="stackcell">
              <span className="sl">In dotazione · 04</span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-adv" /></svg></span>
              <h3>Gli advisor che passano di qui</h3>
              <p>Chi in Morfeus costruisce <span className="hlv">AI Brain</span> per aziende vere, e per le enterprise americane, è dentro la stanza. Non guru con la telecamera: operatori. Hai accesso a chi lo fa per lavoro, non a chi ne parla.</p>
            </div>
            <div className="rank rank-2" style={{ gridColumn: "1/-1" }}>
              <span className="rk">Quello che ti porti a casa</span>
              <span className="rkn">05 — 06</span>
            </div>
            <div className="stackcell corsi" style={{ gridColumn: "1/-1" }}>
              <div className="ctxt">
                <span className="sl">In dotazione · 05</span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-corsi" /></svg></span>
                <h3>Due corsi completi. Gratis.</h3>
                <p>AI Basics e AI Fundamentals: più di sette ore di corso, dentro il Playground, senza tirare fuori un euro. Non sono assaggi né demo: sono i corsi con cui si parte davvero, quelli che altrove ti venderebbero.</p>
                <div className="cchips"><span className="chip-pill">AI Basics</span><span className="chip-pill">AI Fundamentals</span></div>
                {/* La prova sta attaccata alla promessa, non in fondo alla
                     pagina: questa e' la cella con l'affermazione piu' facile da
                     non credere ("due corsi interi, gratis"), e la schermata la
                     chiude sul posto. */}
                <figure className="schermo schermo-in">
                  <figcaption className="sc-eye"><span>Dentro la piattaforma</span><span>Courses</span></figcaption>
                  <div className="sc-vetro">
                    <img src="/playground/piattaforma-corsi.png" alt="La sezione Courses del Playground con i corsi della Morfeus Academy e il numero di iscritti." loading="lazy" decoding="async" />
                  </div>
                </figure>
              </div>
              <div className="cnum"><b>+7h</b><span>di corso · incluse</span></div>
            </div>
            <div className="stackcell cell-accent" style={{ gridColumn: "1/-1" }}>
              <span className="sl">In dotazione · 06 <span className="chipst">SUBITO</span></span>
              <span className="sico"><svg viewBox="0 0 56 56" aria-hidden="true"><use href="#ic-mattone" /></svg></span>
              <h3>Il tuo primo mattone, oggi</h3>
              <p>Appena entri, col collaudo ti porti a casa il file di contesto: il pezzo che fa smettere l'AI di ripartire da zero ogni mattina. Lo applichi in dieci minuti. Entri e hai già qualcosa che funziona in mano. Non "un giorno". Oggi.</p>
            </div>
          </div>
          <div className="reveal">
            <div>
              <h3>Tutto questo è gratis. Sì, gratis.</h3>
              <p>Quello che altrove sta dietro un abbonamento mensile, qui è la porta d'ingresso. Sotto ti spiego perché, senza giri di parole.</p>
            </div>
            <span className="stampone">GRATIS VERO</span>
          </div>
        </div>
      </section>

      {/* ============ 07 · PERCHÉ È GRATIS ============ */}
      <section id="gratis" data-n="06">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">06</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">06</span> Perché è gratis</div>
          <h2 className="shead">Quando una cosa è gratis,<br />è giusto chiedersi dov'è la <span className="kox">fregatura</span>.</h2>
          <div className="calm">
            <p>Non c'è. Ma ti spiego il meccanismo, così decidi tu.</p>
            <p>Morfeus vive vendendo percorsi seri a chi vuole andare a fondo: bootcamp, affiancamenti, la roba a pagamento. La community non è quella roba. È il posto dove ci conosciamo prima, <strong>senza che tu tiri fuori un euro</strong>.</p>
            <p>Funziona così: la stanza è piena di valore vero, gratis. Con il tempo, qualcuno vorrà fare il passo dopo e lavorare con noi sul serio. La maggior parte no, e va benissimo. Bastano quei pochi a tenere la stanza aperta e gratis per tutti gli altri.</p>
            <p className="northstar">Preferiamo così. La nostra ossessione non è venderti qualcosa oggi. È avere gente che resta, che costruisce, e che magari tra un anno decide di fare di più perché si è trovata bene. Non ci serve strapparti un sì adesso.</p>
            <p>L'unica cosa che ti chiediamo, per entrare, è il collaudo. Due minuti e mezzo. E anche quello, prima ancora di darti la stanza, ti lascia già in mano il tuo livello e il tuo primo mattone.</p>
            <p>Detto questo, a parole è facile. Guarda chi c'è già dentro, e cosa gira.</p>
          </div>
          {/* Il meccanismo e' gia' scritto qui sopra, in tre frasi. Il disegno
               non aggiunge argomenti: li mette in fila, perche' un modello di
               business spiegato a parole chiede fiducia e disegnato si guarda.
               Le tre etichette sono compressioni delle frasi qui sopra. */}
          <div className="mecc">
            <div className="mstep">
              <span className="mn">01</span>
              <p>La stanza è piena di valore vero, <b>gratis</b>.</p>
            </div>
            <div className="mstep">
              <span className="mn">02</span>
              <p>Col tempo <b>qualcuno</b> vuole fare il passo dopo e lavorare con noi sul serio.</p>
            </div>
            <div className="mstep mstep-out">
              <span className="mn">03</span>
              <p>Bastano quei pochi a tenere la stanza <b>aperta e gratis</b> per tutti gli altri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 08 · LA PROVA ============ */}
      <section id="prova" data-n="07">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">07</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">07</span> Chi c'è già dentro</div>
          <h2 className="shead"><span className="din">Non follower.</span><br />Gente che costruisce.</h2>
          <div className="stats">
            <div className="stat"><b>1100+</b><span>builder dentro</span></div>
            <div className="stat"><b>1 / sett</b><span>live · si costruisce dal vivo</span></div>
            <div className="stat"><b>0 €</b><span>per entrare · si guadagna, non si compra</span></div>
          </div>
          <div className="revhead">
            <h3>Cosa dice chi è già dentro.</h3>
            <span className="rl">Le voci · con nome e contesto</span>
          </div>

          <div className="voci" data-scorre="true">
            <div className="voci-nastro">
              {/* il contenuto e' duplicato: e' cosi' che un nastro continuo si
                   ricongiunge senza salto a meta' corsa */}
              <div className="voci-serie">
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">SF</span>
                    <div><div className="vc-nm">Silvia Ferrero</div><div className="vc-rr">Consulente del lavoro · studio da 4</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> In studio ogni risposta ai clienti veniva riscritta da zero, e ognuno aveva il suo modo. Sulle stesse identiche domande.</p>
                    <p><b>Cosa ha fatto.</b> Ha costruito il file di contesto dello studio in una sera: i quattro format di risposta, le cose che a un cliente non si scrivono mai, il modo in cui firmano. La prima versione era troppo lunga e veniva ignorata, l'ha tagliata a metà.</p>
                    <p><b>Cosa è cambiato.</b> Le bozze escono già nel tono dello studio e lei rilegge invece di scrivere. Non scrive più veloce: ha smesso di ricominciare.</p>
                  </div>
                </figure>
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">AP</span>
                    <div><div className="vc-nm">Andrea Pilotto</div><div className="vc-rr">E-commerce arredamento</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> Le schede prodotto le affidava fuori. Tra briefing, giri di revisione e attese, un lancio erano tre settimane buone.</p>
                    <p><b>Cosa ha fatto.</b> Ha messo in piedi il sistema sul proprio catalogo: materiali, misure, tono. Con dentro una regola che pesa più di tutte: se la scheda tecnica manca, non si inventa niente e la cosa viene segnalata.</p>
                    <p><b>Cosa è cambiato.</b> Le schede si fanno dentro, in giornata. La prima volta ha rifatto tutto a mano perché non si fidava. La seconda no.</p>
                  </div>
                </figure>
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">MR</span>
                    <div><div className="vc-nm">Marta Ronchi</div><div className="vc-rr">Agenzia di comunicazione · 9 persone</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> L'AI la usavano tutti, tutti i giorni, e nessuno sapeva cosa stessero facendo gli altri. Nei documenti che andavano ai clienti finiva di tutto.</p>
                    <p><b>Cosa ha fatto.</b> Il collaudo l'ha messa a L1. Ha portato il caso alla live del giovedì e in quaranta minuti sono uscite le regole: cosa può uscire in bozza, cosa deve passare da una persona, dove finiscono i prompt che funzionano.</p>
                    <p><b>Cosa è cambiato.</b> Quelle regole stanno in un canale, non nelle chat private di ognuno. E il team ha smesso di passare da lei per ogni cosa.</p>
                  </div>
                </figure>
              </div>
              <div className="voci-serie" aria-hidden="true">
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">SF</span>
                    <div><div className="vc-nm">Silvia Ferrero</div><div className="vc-rr">Consulente del lavoro · studio da 4</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> In studio ogni risposta ai clienti veniva riscritta da zero, e ognuno aveva il suo modo. Sulle stesse identiche domande.</p>
                    <p><b>Cosa ha fatto.</b> Ha costruito il file di contesto dello studio in una sera: i quattro format di risposta, le cose che a un cliente non si scrivono mai, il modo in cui firmano. La prima versione era troppo lunga e veniva ignorata, l'ha tagliata a metà.</p>
                    <p><b>Cosa è cambiato.</b> Le bozze escono già nel tono dello studio e lei rilegge invece di scrivere. Non scrive più veloce: ha smesso di ricominciare.</p>
                  </div>
                </figure>
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">AP</span>
                    <div><div className="vc-nm">Andrea Pilotto</div><div className="vc-rr">E-commerce arredamento</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> Le schede prodotto le affidava fuori. Tra briefing, giri di revisione e attese, un lancio erano tre settimane buone.</p>
                    <p><b>Cosa ha fatto.</b> Ha messo in piedi il sistema sul proprio catalogo: materiali, misure, tono. Con dentro una regola che pesa più di tutte: se la scheda tecnica manca, non si inventa niente e la cosa viene segnalata.</p>
                    <p><b>Cosa è cambiato.</b> Le schede si fanno dentro, in giornata. La prima volta ha rifatto tutto a mano perché non si fidava. La seconda no.</p>
                  </div>
                </figure>
                <figure className="voce-card">
                  <div className="vc-testa">
                    <span className="vc-av" aria-hidden="true">MR</span>
                    <div><div className="vc-nm">Marta Ronchi</div><div className="vc-rr">Agenzia di comunicazione · 9 persone</div></div>
                  </div>
                  <div className="vc-arco">
                    <p><b>Prima.</b> L'AI la usavano tutti, tutti i giorni, e nessuno sapeva cosa stessero facendo gli altri. Nei documenti che andavano ai clienti finiva di tutto.</p>
                    <p><b>Cosa ha fatto.</b> Il collaudo l'ha messa a L1. Ha portato il caso alla live del giovedì e in quaranta minuti sono uscite le regole: cosa può uscire in bozza, cosa deve passare da una persona, dove finiscono i prompt che funzionano.</p>
                    <p><b>Cosa è cambiato.</b> Quelle regole stanno in un canale, non nelle chat private di ognuno. E il team ha smesso di passare da lei per ogni cosa.</p>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 08 · CHI C'È DIETRO · MORFEUS ============ */}
      <section id="morfeus" data-n="08">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">08</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">08</span> Chi c'è dietro</div>
          <h2 className="shead">Dietro il Playground<br />c'è <span className="vh">Morfeus</span>.</h2>
          <p className="lede">Morfeus è un <strong>AI Operating Partner</strong>. Entriamo nei processi in cui valore, tempo e sapere si stanno disperdendo, costruiamo i sistemi che li rendono utilizzabili, e lavoriamo col team finché diventano parte dell'operatività.</p>

          <div className="prose">
            <p>Un'azienda non cambia perché compra un software. Cambia quando individua un problema reale, costruisce un sistema che lo risolve e mette le persone nelle condizioni di usarlo ogni giorno. <strong>Lavoriamo su tutte e tre le parti.</strong></p>
            <p>Non consegniamo una strategia da presentare al board: costruiamo la cosa che deve funzionare dentro l'azienda. Il Playground è il posto in cui quel lavoro si vede mentre lo facciamo.</p>
          </div>

          <div className="morf morf-2">
            <div className="mcard">
              <span className="ml">Come lavoriamo</span>
              <b>1000+<i>ore di Claude al mese</i></b>
              <p>Il team ci passa dentro ogni mese, su lavoro vero: progettare, testare, far girare sistemi su casi di clienti. Quello che trovi nel Playground nasce da lì, non da un libro.</p>
            </div>
            <div className="mcard">
              <span className="ml">Con chi lavoriamo</span>
              <div className="mlogos"><span>H-Farm</span><span>Sisal</span><span>Edison</span><span>Zara</span></div>
              <p>Aziende che vogliono portare l'AI nei processi senza lasciare tutto all'iniziativa del singolo. Il sistema deve essere utile, controllabile e usabile ogni giorno.</p>
            </div>
          </div>

          <span className="nots-lab">Cosa non siamo</span>
          <div className="nots">
            <div className="notcard">
              <i>✕</i>
              <b>Non una scuola di AI</b>
              <span>Non vendiamo lezioni su come funzionano i modelli.</span>
            </div>
            <div className="notcard">
              <i>✕</i>
              <b>Non un'agenzia che vende ore</b>
              <span>Costruiamo sistemi, e restano tuoi.</span>
            </div>
            <div className="notcard">
              <i>✕</i>
              <b>Non consulenti da slide</b>
              <span>Se un sistema non gira, non l'abbiamo consegnato.</span>
            </div>
          </div>

          {/* La porta per chi ha un'azienda. Piccola e di lato, non una
               seconda offerta: chi e' arrivato qui sta valutando la stanza,
               non un preventivo. Ma se ha dei processi da sistemare deve
               sapere dove si va, e va detto una volta sola. */}
          <div className="verso-morfeus">
            <div>
              <span className="vm-lab">Hai un'azienda?</span>
              <p>Se il problema non è imparare l'AI ma <strong>metterla dentro i processi</strong>, quello è il lavoro che facciamo a pagamento. La stanza resta gratis e resta tua comunque.</p>
            </div>
            <a className="btn btn-ghost" href="https://morfeushub.com" target="_blank" rel="noopener">Vai su morfeushub.com →</a>
          </div>

          <div className="prose">
            <p>A questo punto la domanda vera non è se la stanza è buona. È se è per te. Vediamo.</p>
          </div>
        </div>
      </section>

      {/* ============ 09 · PER TE / NON PER TE ============ */}
      <section id="perte" data-n="09">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">09</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">09</span> Il filtro</div>
          <h2 className="shead">Questa stanza non è per tutti.</h2>
          <div className="pairs">
            <div className="pair si">
              <span className="pt">È per te se</span>
              <ul>
                <li>Hai un'attività che gira e con l'AI vuoi smettere di andare a tentoni.</li>
                <li>La usi già ogni giorno e senti che potresti tirarci fuori dieci volte tanto.</li>
                <li>Vuoi vedere sistemi reali che girano, non l'ennesimo thread di prompt.</li>
                <li>Sei disposto a farti correggere e a mostrare cosa stai costruendo.</li>
                <li>Preferisci una stanza di operatori a un altro corso registrato.</li>
                <li>Vuoi sapere a che punto sei davvero, senza raccontartela.</li>
              </ul>
            </div>
            <div className="pair no">
              <span className="pt">Non è per te se</span>
              <ul>
                <li>Cerchi la rendita passiva o la scorciatoia.</li>
                <li>Vuoi che qualcuno faccia il lavoro al posto tuo.</li>
                <li>Ti interessa solo giocare con l'ultimo tool del momento.</li>
                <li>Non hai intenzione di metterci le mani, solo guardare.</li>
                <li>Ti dà fastidio che qualcuno ti dica "così no, guarda come faccio io".</li>
                <li>Pensi di sapere già tutto. E non sai rispondere a "quali sistemi usi ogni giorno che lavorano al posto tuo?"</li>
              </ul>
            </div>
          </div>
          <div className="pairclose"><strong>Se ti sei riconosciuto almeno tre volte nella colonna di sinistra, la stanza è tua.</strong> Si entra da qui sotto.</div>
        </div>
      </section>

      {/* ============ 10 · LA SOGLIA ============ */}
      <section id="soglia" data-n="10">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">10</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">10</span> La soglia</div>
          <div className="soglia">
            <div className="sg-grid">
            <div>
            <div className="eco">Non si entra cliccando "iscriviti".</div>
            <h3>Si entra <span className="vh" style={{ color: "var(--uv)" }}>collaudandosi</span>.</h3>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}><span className="chipst">PORTA UNICA</span><span className="chipst">2 MIN 30</span></div>
            <p className="porta">È il rito d'ingresso della stanza. Due minuti e mezzo, undici domande su come lavori davvero con l'AI. E prima ancora di entrare, esci con tre cose:</p>
            <div className="out">
              <div><b>Il tuo livello</b><span>Misurato sugli scenari, non su come ti descrivi. Con la scala L1 → L3 del metodo.</span></div>
              <div><b>Le ore sul tavolo</b><span>Quante ore (e quanti euro) stai lasciando ogni settimana al tuo modo attuale di usarla.</span></div>
              <div><b>Il primo mattone</b><span>Il file di contesto: lo applichi in dieci minuti e l'AI smette di ripartire da zero.</span></div>
            </div>
            <p className="porta">Serve a due cose. A te, per sapere da dove parti. Alla stanza, perché qui dentro il livello è la lingua comune: tutti sanno da dove sono partiti e dove stanno andando.</p>
            <p className="porta">E sì, <strong>è l'unica porta</strong>. Chi non ha due minuti e mezzo per capire a che punto è, probabilmente non è ancora pronto per questa stanza. E va bene così.</p>
            <div className="ctarow">
              <button className="btn btn-viola btn-big" onClick={onCollaudo}>Inizia il collaudo d'ingresso →</button>
              <span className="under-cta" style={{ marginTop: "0" }}>2 min 30 · 11 domande · gratis</span>
            </div>
            </div>
            <aside className="sg-pass" aria-hidden="true">
              <div className="tickp" style={{ transform: "rotate(3deg)" }}>
                <div className="head"><div className="hrow"><span className="hlock"><svg viewBox="0 0 1000 476" fill="currentColor"><use href="#markm" /></svg><b>Playground</b></span><span className="eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
                <h4>Pass Playground</h4><div className="hsub">Si stacca al collaudo</div></div>
                <div className="body">
                  <div className="meter"><i className="m1 off"></i><i className="m2 off"></i><i className="m3 off"></i><span className="lv">L?<i>/3</i></span></div>
                  <div className="frow"><span className="k">Titolare</span><span className="v">Il tuo nome</span></div>
                  <div className="frow"><span className="k">Voto misurato</span><span className="v">? / 95</span></div>
                  <div className="frow"><span className="k">Prima mossa</span><span className="v">Il file di contesto</span></div>
                  <div className="perf"></div>
                </div>
                <div className="stub"><span className="stamp">DA STACCARE</span><span className="no">NON IN VENDITA<br /><b>si guadagna</b></span></div>
              </div>
            </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11 · FAQ ============ */}
      <section id="faq" data-n="11">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">11</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">11</span> Le domande</div>
          <h2 className="shead">Quello che è giusto chiedersi.</h2>
          <div className="faq">
            <details>
              <summary>"Uso già l'AI ogni giorno, cosa vuoi che scopra?"</summary>
              <p className="a">Forse niente. O forse scopri, in due minuti, che la usi da più tempo di quanto la conosci. Il collaudo te lo dice sui fatti, non sulle impressioni. E se sei davvero avanti, la stanza è dove trovi finalmente pari al tuo livello.</p>
            </details>
            <details>
              <summary>"Non sono tecnico, temo sia troppo per me."</summary>
              <p className="a">Non serve essere tecnici. Qui non si programma: si impara a pensare con l'AI e a farsi affiancare da chi la costruisce. Metà della stanza partiva da dove parti tu.</p>
            </details>
            <details>
              <summary>"Non ho tempo."</summary>
              <p className="a">Il collaudo sono due minuti e mezzo. La stanza la usi quanto vuoi: dieci minuti a settimana o tutti i giorni. Non è un corso da finire, è un posto dove torni quando ti serve.</p>
            </details>
            <details>
              <summary>"Ho già visto community morte, tutte silenzio e spam."</summary>
              <p className="a">Anche noi, e le odiamo. Questa ha una live ogni settimana, un feed di roba che gira e gli advisor dentro. Se entri e c'è silenzio, esci. Ma non è così.</p>
            </details>
            <details>
              <summary>"Devo per forza fare il test per entrare?"</summary>
              <p className="a">Sì. È l'unica porta, ed è voluto. Ti dà il tuo livello e il primo mattone, e tiene la stanza fatta di gente che ci tiene davvero.</p>
            </details>
            <details>
              <summary>"E dopo il test, cosa succede?"</summary>
              <p className="a">Entri nella community, gratis. Ti arriva il referto e il file di contesto. Nessuna chiamata a sorpresa, nessuna pressione. Se un giorno vorrai fare di più, lo decidi tu.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ 12 · UN GIORNO NELLA STANZA ============ */}
      <section id="giorno" data-n="12">
        <svg className="filigrana" viewBox="0 0 240 130" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"><text x="238" y="104">12</text></svg>
        <div className="wrap">
          <div className="stag"><span className="n">12</span> Com'è, dentro</div>
          <h2 className="shead">Immagina tra <span className="vh">un mese</span>.</h2>
          {/* I tre paragrafi sono quelli approvati, parola per parola. Cambia
               solo che ora hanno accanto il momento in cui succedono: il testo
               raccontava gia' una sequenza (martedi' -> giovedi' -> il punto) e
               la teneva nascosta dentro la prosa. */}
          <div className="giorno giorno-rail">
            <div className="gstep"><span className="gt">Martedì</span>
            <p>È martedì mattina. Hai un flusso che non gira: lo posti nella stanza. Prima di pranzo hai due risposte, una di un fondatore che l'ha risolto la settimana scorsa, una di un advisor che ti gira il pezzo che ti mancava.</p>
            </div>
            <div className="gstep"><span className="gt">Giovedì</span>
            <p>Giovedì c'è la live: porti il tuo caso, lo sistemate insieme, dal vivo. Nel frattempo, nel feed, vedi tre sistemi nuovi che qualcuno come te ha messo in piedi. Ne provi uno.</p></div>
            <div className="gstep g-fine"><span className="gt">La differenza</span>
            <p><strong>Non stai più imparando l'AI da solo, di notte, sperando di indovinare. La stai costruendo in mezzo a gente che la costruisce.</strong> È tutta qui la differenza.</p></div>
          </div>
        </div>
      </section>

      {/* ============ 13 · FINALE ============ */}
      <section id="fine">
        <div className="wrap finale">
          <div className="chiusa">
          <span className="eco">Non ti serve un altro corso.</span>
          <span className="eco">Non ti serve l'ennesimo tool.</span>
          <h2>Ti serve stare in mezzo a chi l'AI la usa sul serio. E un modo per sapere da dove parti.</h2>
          <p className="sub">La stanza è aperta. Il collaudo sono due minuti e mezzo. Il primo mattone te lo porti a casa comunque.</p>
          <div style={{ marginTop: "36px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <button className="btn btn-viola btn-big" onClick={onCollaudo}>Fai il collaudo ed entra →</button>
            <span className="under-cta" style={{ marginTop: "0" }}>1100+ builder dentro · gratis · 2 min 30</span>
          </div>
          </div>
          <div className="ps">
            <b>PS</b>
            Anche se decidi di non entrare, il collaudo ti lascia il tuo livello e il tuo file di contesto. Due minuti e mezzo ben spesi, in ogni caso. Ma se ti sei riconosciuto fin qui, ci vediamo dentro.
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p><b>PLAYGROUND</b> · di Morfeus · si guadagna, non si compra</p>
          <p>PROTOTIPO · COPY v1 · TODO: <b>Brevo</b> (gate) · <b>link Circle</b> · foto/loghi</p>
        </div>
      </footer>

      {/* ============================================================
           IL COLLAUDO · overlay
           ============================================================ */}
      {collaudoAperto ? (
        <div
          className="cd-overlay on"
          role="dialog"
          aria-modal="true"
          aria-label="Il Collaudo"
          onClick={() => setCollaudoAperto(false)}
        >
          {/* SEGNAPOSTO. Il collaudo vero (11 domande, slider, calcolo,
              referto e gate email) e' il secondo passo del porting: e'
              l'unico pezzo che non si converte in modo meccanico, perche'
              nel prototipo e' JavaScript che scrive HTML a mano, e qui
              deve diventare stato di React. */}
          <div className="cd-wrap" style={{ textAlign: "center", paddingTop: "22vh" }}>
            <p className="cd-sub">Il collaudo arriva nel passo successivo del porting.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
