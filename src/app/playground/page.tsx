import type { Metadata } from "next";
import { PlaygroundChrome } from "@/components/playground/PlaygroundChrome";
import { MiniSlot } from "@/components/playground/MiniSlot";

const P = "/playground";

export const metadata: Metadata = {
  title: "AI Playground · Non hai un problema di AI. Hai un problema di metodo.",
  description:
    "AI Playground di Morfeus: il metodo AI Brain per costruirti un cervello AI persistente che lavora come te. Metodo misurato, prova prima della promessa.",
  robots: { index: false, follow: false },
};

const NON = [
  ["500 prompt pronti", "le ricette non insegnano a cucinare"],
  ["Rendite passive con l'AI", "i soldi mentre dormi li fa chi te li vende"],
  ["Automatizza tutto", "automatizzare il caos produce caos automatico"],
  ["Anche se parti da zero", "noi parliamo a chi un mestiere ce l'ha già"],
  ["Diventa 10x", "senza metodo diventi solo 10x più veloce a sbagliare"],
  ["L'AI ti ruberà il lavoro", "il terrorismo è l'altro modo di venderti fuffa"],
];

const CREDO = [
  [
    "Il modello è il motore. Non è il pilota.",
    "Il 95% aspetta il modello nuovo per migliorare. Ma due persone con lo stesso modello ottengono risultati opposti: la differenza non è mai lo strumento, è chi lo guida e con che sistema.",
  ],
  [
    "L'AI senza contesto è un estraneo che scrive bene.",
    "Ogni chat che apri da zero è un consulente brillante che non sa chi sei. Prima l'AI ti conosce, poi lavora: si chiama AI Brain, ed è il cuore di tutto quello che insegniamo.",
  ],
  [
    "Un errore corretto e salvato vale più di cento prompt.",
    "Chi colleziona prompt resta un collezionista. Chi trasforma ogni errore in un'istruzione permanente sta costruendo un sistema che domani sbaglia meno di oggi.",
  ],
  [
    "La leva è sul lavoro che già fai.",
    "Niente business nuovi da inventare, niente reinvenzioni. Più margine, più clienti, più ore libere dal mestiere che hai già: è lì che l'AI paga, ed è lì che ti portiamo.",
  ],
  [
    "Prova > promessa. Sempre.",
    "Ogni cosa che insegniamo la usiamo prima noi, coi nostri numeri in vista. Quando non funziona lo diciamo. È più lento dell'hype: è anche il motivo per cui poi funziona.",
  ],
];

const FATTI = [
  ["1000+", "ore di Claude avanzato al mese. Il fossato tecnico: nessuno nel mercato italiano ci sta quanto noi."],
  ["B2B", "lo stesso metodo che trovi qui è quello che i team aziendali ci pagano per installare. Non teoria da palco: delivery."],
  ["6.1K", "iscritti a AI Espresso, tra le newsletter AI in più rapida crescita. Ogni settimana, gratis, da anni."],
  ["930+", "builder nella community. Non follower: gente che costruisce e si dice cosa funziona davvero."],
];

export default function PlaygroundHome() {
  return (
    <PlaygroundChrome active="home">
      {/* 1 · HERO */}
      <section className="fascia scuro hero">
        <div className="wrap">
          <div className="verita">
            <div className="eyebrow">AI PLAYGROUND · l&apos;insegna formativa di Morfeus</div>
            <h1>
              Non hai un problema di{" "}AI.
              <br />
              Hai un problema <span className="emph">di metodo.</span>
            </h1>
            <p className="lead sub">
              La usi già, ogni giorno. Ma da principiante. E un principiante con l&apos;AI fa danni 10 volte più
              veloci: proposte generiche, ore buttate a riscrivere, dati che escono senza controllo.
            </p>
            <a className="scroll-hint" href="#non-siamo">
              <span>ENTRA NEL PLAYGROUND</span>
              <span className="arr">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2 · COSA NON SIAMO */}
      <section className="fascia chiaro" id="non-siamo">
        <div className="wrap">
          <div className="eyebrow">cosa non troverai qui</div>
          <h2>Prima di entrare, un patto.</h2>
          <p className="lead">
            Il mercato dell&apos;AI è pieno di rumore. Ti diciamo subito cosa NON siamo, così non perdiamo tempo né tu
            né noi.
          </p>
          <div className="non-list">
            {NON.map(([strike, verdict], i) => (
              <div className="non" key={i}>
                <span className="x">✗</span>
                <span>
                  <s>{strike}</s>
                  {"  "}
                  {verdict}
                </span>
              </div>
            ))}
          </div>
          <p className="non-verdict">Se cercavi questo, là fuori è pieno. Questa non è la stanza.</p>
        </div>
      </section>

      {/* 3 · IL CREDO */}
      <section className="fascia scuro">
        <div className="wrap slim">
          <div className="eyebrow">cosa crediamo</div>
          <h2>
            Il credo del Playground.
            <br />
            <span className="emph">Cinque tesi, nessuno sconto.</span>
          </h2>
          <div className="credo">
            {CREDO.map(([title, body], i) => (
              <div className="tesi" key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{title}</b>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · LA PROMESSA + BIVIO */}
      <section className="fascia chiaro">
        <div className="wrap">
          <div className="eyebrow">la promessa · il metodo AI Brain</div>
          <h2>
            Costruisci il tuo AI Brain.
            <br />
            Ottieni un <span className="mk">Dipendente AI</span>.
          </h2>
          <p className="lead">
            L&apos;AI senza un sistema è un consulente brillante che ogni mattina non si ricorda chi sei. L&apos;AI
            Brain è il cervello persistente che costruisci: conosce il tuo mestiere, la tua voce, le tue regole. E da
            quel momento non hai più un tool: hai un dipendente che ti conosce. Il percorso ha tre livelli. Più un
            quarto, riservato a chi ha una struttura.
          </p>

          <div className="livelli">
            <div className="liv">
              <span className="tag">LIVELLO 1 · DOVE STA IL 95%</span>
              <b>Tu 90% · AI 10%</b>
              <p>Prompt sparsi, pagina bianca ogni volta. L&apos;AI fa il 10% e tu ripaghi il conto ogni giorno, in ore.</p>
              <span className="qui">SEI QUI?</span>
            </div>
            <div className="liv evid">
              <span className="tag">LIVELLO 2 · DOVE TI PORTIAMO</span>
              <b>AI 90% · tu 10%, con controllo</b>
              <p>L&apos;AI Brain conosce te e il tuo lavoro: tu dai i dati nuovi e decidi, lui produce. Le ore tornano tue.</p>
            </div>
            <div className="liv">
              <span className="tag">LIVELLO 3 · LA FRONTIERA</span>
              <b>Automazione</b>
              <p>Dove il tuo occhio non serve più, il flusso gira da solo. Ci si arriva per gradi, non per hype.</p>
            </div>
          </div>
          <a className="link-weak" href={`${P}/metodo`}>
            Il metodo, per intero →
          </a>

          <div className="bivio">
            <div className="eyebrow">i percorsi</div>
            <p className="domanda">
              Una domanda sola decide la strada: <b>lo vuoi per te, o per la tua azienda?</b>
            </p>
            <div className="strade">
              <div className="strada">
                <span className="per">PER TE · professionisti e freelance</span>
                <b>Impara a costruirlo.</b>
                <div className="steps">
                  Corso · Claude Unlocked
                  <br />
                  <span className="fr">↓</span>
                  <br />
                  Bootcamp · AI Champion
                </div>
                <p>
                  Dal primo AI Brain al sistema che lavora per te. Il corso ti dà la padronanza dello strumento, il
                  bootcamp il metodo per costruire il sistema.
                </p>
              </div>
              <div className="strada premium">
                <span className="per">PER LA TUA STRUTTURA · founder, agency owner, studi</span>
                <b>Costruiscilo per te. Poi dallo alla tua squadra.</b>
                <div className="steps">
                  Affiancamento 1:1
                  <br />
                  <span className="fr">↓</span>
                  <br />
                  Percorso imprenditori · in coorte
                  <br />
                  <span className="fr">↓</span>
                  <br />
                  Partner sulla tua azienda
                </div>
                <p>
                  Non assumere un altro: istruisci l&apos;esperienza che hai già. È la strada del quarto livello, quella
                  che finisce con le AI che lavorano per la tua azienda, non solo per te.
                </p>
              </div>
            </div>
            <a className="link-weak" href={`${P}/il-collaudo`}>
              Non sai quale strada è la tua? Il collaudo te lo dice in 2&apos;30&Prime; →
            </a>
          </div>
        </div>
      </section>

      {/* 5 · MATTEO */}
      <section className="fascia scuro">
        <div className="wrap">
          <div className="eyebrow">chi c&apos;è dietro</div>
          <div className="matteo-grid">
            <div className="matteo-foto">
              FOTO MATTEO
              <br />
              (placeholder · 4:5)
            </div>
            <div>
              <h2>
                Matteo Arnaboldi.
                <br />
                <span className="emph">Il bimbo, non il fenomeno.</span>
              </h2>
              <p className="matteo-quote">
                &ldquo;Non sono il guru arrivato. Sono quello che sta{" "}
                <span className="hl">mille e passa ore al mese</span> dentro Claude a costruire sistemi veri, per me e
                per le aziende che ci pagano. Quello che funziona lo insegno. Quello che non funziona lo dico.&rdquo;
              </p>
              <div className="fatti">
                {FATTI.map(([n, p], i) => (
                  <div className="fatto" key={i}>
                    <span className="n">{n}</span>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <a className="link-weak" href={`${P}/chi-siamo`}>
                  La storia intera →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · LE PROVE */}
      <section className="fascia chiaro">
        <div className="wrap">
          <div className="eyebrow">le prove</div>
          <h2>Stai guardando il metodo in azione.</h2>
          <p className="lead">
            La prova più onesta che abbiamo è questa: tutto ciò che vedi è costruito col metodo che insegniamo.
          </p>
          <div className="meta-proof">
            <span className="k">META-DIMOSTRAZIONE · IL LANCIO FATTO COL METODO</span>
            <b>L&apos;intero lancio del Playground è uscito da un AI Brain.</b>
            <p>
              Landing costruita in 10 minuti. 412 iscritti al webinar in 24 ore. 180.000 persone raggiunte su LinkedIn.
              Non un caso studio di un cliente: il nostro, coi numeri in vista. Il metodo che compri è il metodo che ci
              ha venduto.
            </p>
            <div className="proof-nums">
              <div className="pn">
                <span className="v">10 min</span>
                <span className="l">landing online</span>
              </div>
              <div className="pn">
                <span className="v">412</span>
                <span className="l">iscritti in 24h</span>
              </div>
              <div className="pn">
                <span className="v">180K</span>
                <span className="l">reach LinkedIn</span>
              </div>
            </div>
          </div>
          <a className="link-weak" href={`${P}/storie`}>
            Le storie di chi l&apos;ha applicato →
          </a>
        </div>
      </section>

      {/* 7 · FINALE */}
      <section className="fascia scuro finale">
        <div className="wrap slim">
          <div className="mini-slot">
            <MiniSlot />
            <span className="su">/100</span>
          </div>
          <h2>
            Fin qui, il nostro metodo.
            <br />
            <span className="emph">E il tuo, a che livello è?</span>
          </h2>
          <p className="lead">
            Il collaudo: 5 scenari veri, 2 minuti e mezzo. Voto misurato, radiografia dei punti deboli, e quanto ti
            costa al mese non saperlo. Gratis.
          </p>
          <a className="btn1" href={`${P}/il-collaudo`}>
            Mettiti al banco ▸
          </a>
        </div>
      </section>
    </PlaygroundChrome>
  );
}
