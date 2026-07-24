import type { Metadata } from "next";
import { PlaygroundChrome } from "@/components/playground/PlaygroundChrome";

const P = "/playground";

export const metadata: Metadata = {
  title: "Il Metodo AI Brain · AI Playground",
  description:
    "Il Metodo AI Brain: come costruire un cervello AI persistente che conosce te, il tuo lavoro e le tue regole. I 4 strati, la scala dei livelli, il muro anti-fuffa.",
  robots: { index: false, follow: false },
};

const STRATI = [
  ["01", "Contesto", "Chi sei, cosa fai, la tua voce, i tuoi clienti, i tuoi vincoli. La base che l'AI non deve più chiederti."],
  ["02", "Skill", "I tuoi modi di lavorare, codificati: come scrivi una proposta, come analizzi un cliente, come rispondi."],
  ["03", "Workflow", "Le sequenze che ripeti ogni settimana, trasformate in procedure che l'AI esegue con te al comando."],
  ["04", "Automazioni", "I pezzi dove il tuo occhio non serve più: girano da soli, tu controlli il risultato."],
];

const MURO_NO = [
  "«500 prompt segreti»: ricette che non ti insegnano a cucinare",
  "«Automatizza tutto»: automatizzare il caos produce caos automatico",
  "«Rendita passiva»: soldi mentre dormi, da una fonte che non hai",
  "«Anche se parti da zero»: il target è chi cerca scorciatoie",
  "«Diventa 10x» come slogan nudo: senza sistema, 10x più veloce a sbagliare",
];

const MURO_SI = [
  "Un sistema di pensiero + un cervello che resta e cresce nel tempo",
  "Automazione per gradi, solo dove il controllo non serve più",
  "Più margine e più ore dal lavoro che già fai, non da uno nuovo",
  "Parliamo a chi un mestiere ce l'ha già e vuole giocarlo meglio",
  "Numeri reali, i nostri per primi. Quando non funziona, lo diciamo",
];

export default function MetodoPage() {
  return (
    <PlaygroundChrome active="metodo">
      {/* 1 · HERO */}
      <section className="fascia scuro hero-doc">
        <div className="wrap">
          <div className="eyebrow">il metodo · il meccanismo proprietario</div>
          <h1>
            Non ti diamo prompt.
            <br />
            Ti diamo un <span className="emph">cervello.</span>
          </h1>
          <p className="lead">
            Tutti vendono strumenti e liste di prompt. Noi insegniamo una cosa sola: come costruirti un{" "}
            <b style={{ color: "var(--core-carta)" }}>AI Brain</b> personale, un cervello AI persistente che conosce il
            tuo mestiere, la tua voce e le tue regole, e lavora come te. La sequenza è una sola:{" "}
            <b style={{ color: "var(--core-carta)" }}>costruisci il tuo AI Brain. Ottieni un Dipendente AI.</b> Ecco come
            funziona, per intero.
          </p>
        </div>
      </section>

      {/* 2 · PERCHÉ L'AI DA SOLA NON BASTA */}
      <section className="fascia scuro" style={{ paddingTop: 20 }}>
        <div className="wrap slim">
          <div className="eyebrow">il problema vero</div>
          <h2>
            L&apos;AI è geniale.
            <br />
            <span className="emph">Ma ogni mattina ti dimentica.</span>
          </h2>
          <p className="lead">
            Il modello non è il problema: è già più bravo di quanto ti serva. Il problema è che riparti da zero ogni
            volta. Ecco la differenza tra come lo usa il 95% e come lo usiamo noi.
          </p>
          <div className="metafora">
            <div className="mcard bad">
              <span className="h">✗ senza sistema</span>
              <b>Un ubriaco brillante</b>
              <p>
                Apri la chat, spieghi chi sei, cosa fai, con che tono. Ottieni una risposta. Domani riapri e devi
                rispiegare tutto daccapo. Ogni volta pagina bianca. Ogni volta lo stesso attrito.
              </p>
            </div>
            <div className="mcard good">
              <span className="h">✓ con l&apos;AI Brain</span>
              <b>Un Dipendente AI che ti conosce</b>
              <p>
                Il contesto è salvato una volta per tutte. L&apos;AI sa già chi sei, come scrivi, cosa vendi, quali
                errori non deve rifare. Tu dai i dati nuovi, lui produce. Ogni giorno parte da dove eravate rimasti. Non
                è più un tool: è un Dipendente AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · L'AI BRAIN · 4 STRATI */}
      <section className="fascia chiaro">
        <div className="wrap">
          <div className="eyebrow">cos&apos;è · l&apos;anatomia</div>
          <h2>
            L&apos;AI Brain è fatto di
            <br />
            <span className="mk">quattro strati</span>.
          </h2>
          <p className="lead">
            Non è un prompt lungo. È un sistema che cresce nel tempo: più lo usi, più sa, meno lavori. L&apos;AI Brain è
            ciò che costruisci: il metodo. Il Dipendente AI è ciò che diventa una volta costruito: il risultato.
          </p>
          <div className="strati">
            {STRATI.map(([n, title, desc], i) => (
              <div className="strato" key={i}>
                <span className="n">{n}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · I 3 LIVELLI DIAGNOSTICI */}
      <section className="fascia scuro">
        <div className="wrap">
          <div className="eyebrow">i livelli · dove sei ora</div>
          <h2>
            Dal prompt a caso
            <br />
            all&apos;automazione. <span className="emph">Per gradi.</span>
          </h2>
          <p className="lead">
            Il metodo è una scala. Quasi tutti sono al primo gradino e non lo sanno: credono di «usare l&apos;AI», ma
            stanno solo chattando. I gradini universali sono tre. Il quarto esiste solo per chi ha una struttura.
          </p>
          <div className="scala">
            <div className="grado">
              <span className="lv">1</span>
              <div>
                <span className="tag">dove sta il 95%</span>
                <b>Tu 90% · AI 10%</b>
                <p>
                  Prompt sparsi, chat usa-e-getta, pagina bianca ogni volta. L&apos;AI fa il 10% del lavoro e tu ripaghi
                  il conto ogni giorno, in ore perse a riscrivere e correggere. Sembra veloce. Non lo è.
                </p>
                <div className="barra">
                  <span className="tu" style={{ width: "90%" }} />
                  <span className="ai" style={{ width: "10%" }} />
                </div>
              </div>
              <span className="segno">SEI QUI?</span>
            </div>
            <div className="grado evid">
              <span className="lv">2</span>
              <div>
                <span className="tag">dove ti portiamo</span>
                <b>AI 90% · tu 10%, con controllo</b>
                <p>
                  L&apos;AI Brain conosce te e il tuo lavoro. Tu porti i dati nuovi e le decisioni, lui produce il
                  grosso. Le ore tornano tue e la qualità sale, perché il sistema ricorda gli standard che gli hai dato.
                  Qui l&apos;AI inizia davvero a pagare.
                </p>
                <div className="barra">
                  <span className="tu" style={{ width: "10%" }} />
                  <span className="ai" style={{ width: "90%" }} />
                </div>
              </div>
            </div>
            <div className="grado">
              <span className="lv">3</span>
              <div>
                <span className="tag">la frontiera</span>
                <b>Automazione</b>
                <p>
                  I flussi dove il tuo controllo non aggiunge nulla girano da soli. Non ci si arriva col bottone magico:
                  ci si arriva dopo aver costruito contesto e fiducia nei livelli 1 e 2. È la conseguenza del metodo, non
                  la sua scorciatoia.
                </p>
                <div className="barra">
                  <span className="ai" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
            <div className="grado">
              <span className="lv">4</span>
              <div>
                <span className="tag">solo per chi ha una struttura</span>
                <b>Le AI lavorano per la tua azienda</b>
                <p>
                  Fin qui il metodo moltiplica te. C&apos;è un gradino in più, e non è per tutti: prima costruisci il tuo
                  AI Brain per te, poi lo dai alla tua squadra. Non sei più tu a presidiare ogni interazione: il metodo è
                  entrato nella struttura, e lavora anche quando tu non sei al computer. È il passo di chi ha un team da
                  moltiplicare: founder, agency owner, studi.
                </p>
              </div>
            </div>
          </div>
          <a className="link-weak" href={`${P}/il-collaudo`}>
            Scopri a che livello sei davvero →
          </a>
        </div>
      </section>

      {/* 5 · IL MURO ANTI-FUFFA */}
      <section className="fascia chiaro">
        <div className="wrap">
          <div className="eyebrow">il muro anti-fuffa</div>
          <h2>
            Cosa questo metodo <span className="mk">non</span> è.
          </h2>
          <p className="lead">
            Il mercato dell&apos;AI è saturo di promesse bruciate. La linea che ci separa dalla fuffa non è sottile: è un
            muro. Da che parte stai lo capisci subito.
          </p>
          <div className="muro">
            <div className="col no">
              <span className="h">✗ la fuffa promette</span>
              {MURO_NO.map((t, i) => (
                <div className="row" key={i}>
                  <span className="i">×</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="col si">
              <span className="h">✓ il metodo costruisce</span>
              {MURO_SI.map((t, i) => (
                <div className="row" key={i}>
                  <span className="i">✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <p
            className="lead"
            style={{
              fontFamily: "var(--font-emph)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--core-inchiostro)",
              maxWidth: "48ch",
            }}
          >
            Prova &gt; promessa. È più lento dell&apos;hype. È anche il motivo per cui poi funziona.
          </p>
        </div>
      </section>

      {/* 6 · COME SI COSTRUISCE · MODULO 0 */}
      <section className="fascia scuro">
        <div className="wrap slim">
          <div className="eyebrow">come si costruisce</div>
          <h2>
            Prima come pensi.
            <br />
            <span className="emph">Poi il cervello.</span>
          </h2>
          <p className="lead">
            L&apos;ordine conta, ed è l&apos;ordine che il 95% salta. Ecco perché comprano dieci corsi di prompt e non
            cambia niente.
          </p>
          <div className="step2">
            <div className="stepc">
              <span className="n">MODULO 0 · COME SI PENSA</span>
              <b>Come pensare con l&apos;AI</b>
              <p>
                Non «quali tasti premere», ma come impostare il problema perché l&apos;AI diventi una leva e non un
                generatore di testo mediocre. È il modulo che nessuno vende perché non «si vede». È anche quello che fa
                la differenza tra il livello 1 e il livello 2.
              </p>
              <div className="warn">⚠ qui si perde il 95%</div>
            </div>
            <div className="stepc">
              <span className="n">POI · LA COSTRUZIONE</span>
              <b>Il tuo AI Brain in Claude</b>
              <p>
                Con il modo di pensare a posto, costruisci gli strati: contesto, skill, workflow, automazioni. Non in
                teoria: sul tuo mestiere reale, coi tuoi casi. Alla fine non hai imparato «a usare uno strumento»: hai un
                Dipendente AI che lavora come te, al posto tuo, sotto il tuo controllo. E se hai una squadra, il gradino
                dopo è suo: prima lo costruisci per te, poi lo dai alla tua struttura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · FINALE */}
      <section className="fascia chiaro finale-doc">
        <div className="wrap slim">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            e tu, a che livello sei?
          </div>
          <h2>
            Il metodo l&apos;hai capito.
            <br />
            <span className="emph">Ora misura il tuo punto di partenza.</span>
          </h2>
          <p className="lead">
            Il collaudo: 5 scenari veri, 2 minuti e mezzo. Voto misurato, radiografia dei punti deboli, e quanto ti
            costa al mese restare al livello 1. Gratis.
          </p>
          <a className="btn1" href={`${P}/il-collaudo`}>
            Mettiti al banco ▸
          </a>
        </div>
      </section>
    </PlaygroundChrome>
  );
}
