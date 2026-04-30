"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * Termini e Condizioni — Bootcamp AI Champion v2
 * Documento ufficiale di iscrizione e partecipazione, erogato da Morfeus Hub S.r.l.
 * Ultima revisione: 30 aprile 2026
 */
export default function TerminiBootcampPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link
            href={`/${locale}`}
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            ← Torna al sito
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
          Termini e Condizioni — Bootcamp AI Champion v2
        </h1>
        <p className="text-slate-400 text-sm mb-2">
          Morfeus Hub S.r.l. — P.IVA 14209210963
        </p>
        <p className="text-slate-400 text-sm mb-2">
          Via Jacopo del Verme 7, 20159 Milano (MI), Italia
        </p>
        <p className="text-slate-400 text-sm mb-2">
          Email:{" "}
          <a
            href="mailto:hello@morfeushub.com"
            className="text-[#4D39EB] hover:underline"
          >
            hello@morfeushub.com
          </a>
        </p>
        <p className="text-slate-500 text-sm mb-12 italic">
          Ultima revisione: 30 aprile 2026
        </p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10 text-[15px] leading-relaxed">

          {/* 1. Parti del contratto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Parti del contratto
            </h2>
            <p className="text-slate-300 mb-3">
              Il presente contratto è stipulato tra:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
              <li>
                <strong className="text-white">Morfeus Hub S.r.l.</strong>, con sede legale in Via Jacopo del Verme 7, 20159 Milano (MI), Italia, P.IVA 14209210963 (di seguito «Morfeus Hub» o «Venditore»)
              </li>
              <li>
                Il soggetto che procede all&apos;iscrizione al bootcamp (di seguito «Partecipante» o «Acquirente»)
              </li>
            </ul>
            <p className="text-slate-300">
              La conferma dell&apos;iscrizione da parte di Morfeus Hub, a seguito della call di selezione di cui all&apos;art. 3, costituisce accettazione reciproca e vincolante del presente contratto.
            </p>
          </section>

          {/* 2. Oggetto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Oggetto del contratto
            </h2>
            <p className="text-slate-300 mb-3">
              Il presente contratto regola l&apos;iscrizione e la partecipazione al programma di formazione intensiva denominato <strong className="text-white">«Bootcamp AI Champion v2»</strong> (di seguito «il Bootcamp»), erogato da Morfeus Hub S.r.l. tramite la piattaforma Circle (circle.so).
            </p>
            <p className="text-slate-300">
              Il Bootcamp è un programma formativo intensivo, in formato blended (contenuti pre-registrati + sessioni live sincrone), progettato per portare il Partecipante a costruire un sistema operativo AI completo applicato al proprio contesto lavorativo, secondo il metodo proprietario <strong className="text-white">M-V-A</strong> (Manuale, Validato, Automatizzato).
            </p>
          </section>

          {/* 3. Procedura di iscrizione */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Procedura di iscrizione e accettazione
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              3.1 Call di selezione obbligatoria
            </h3>
            <p className="text-slate-300 mb-4">
              L&apos;iscrizione al Bootcamp non è disponibile tramite checkout diretto. Per accedere al programma, il candidato deve <strong className="text-white">prenotare e sostenere una call di selezione gratuita</strong> con il team Morfeus Hub. La call ha l&apos;obiettivo di verificare l&apos;idoneità del candidato al programma e garantire la qualità dell&apos;esperienza formativa.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              3.2 Diritto di selezione
            </h3>
            <p className="text-slate-300 mb-4">
              Morfeus Hub si riserva il diritto insindacabile di accettare o rifiutare la candidatura di qualsiasi soggetto, senza obbligo di motivazione. Il rifiuto non comporta alcun obbligo economico da parte di Morfeus Hub.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              3.3 Perfezionamento del contratto
            </h3>
            <p className="text-slate-300 mb-2">
              Il contratto si intende perfezionato nel momento in cui:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>La candidatura è accettata da Morfeus Hub a seguito della call di selezione;</li>
              <li>Il Partecipante completa il pagamento (intero o prima rata) entro il termine comunicato.</li>
            </ol>

            <h3 className="text-lg font-semibold text-white mb-2">
              3.4 Numero massimo di partecipanti
            </h3>
            <p className="text-slate-300">
              Il Bootcamp è limitato a un massimo di <strong className="text-white">25 partecipanti per edizione</strong>. I posti sono assegnati in ordine di conferma del pagamento. Il raggiungimento del limite massimo può comportare il rifiuto di candidature anche successivamente idonee.
            </p>
          </section>

          {/* 4. Contenuto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Contenuto del Bootcamp
            </h2>
            <p className="text-slate-300 mb-3">
              Il Bootcamp include i seguenti elementi:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-4 ml-2">
              <li><strong className="text-white">Corso Claude Unlocked</strong>, incluso come prerequisito (valore di listino 397,00 €), con accesso lifetime alla piattaforma Circle;</li>
              <li><strong className="text-white">3 ore di lezioni preparatorie pre-registrate</strong>, disponibili prima dell&apos;avvio delle sessioni live;</li>
              <li><strong className="text-white">7 sessioni live da 2 ore</strong>, tenute direttamente dai founder di Morfeus Hub (Matteo Arnaboldi e Alex), con cadenza bisettimanale (una settimana attiva, una di consolidamento);</li>
              <li><strong className="text-white">Replay permanenti</strong> di tutte le sessioni live;</li>
              <li><strong className="text-white">Gruppo WhatsApp</strong> dedicato alla classe, attivo per tutta la durata del Bootcamp e per 30 giorni successivi al termine;</li>
              <li><strong className="text-white">Progetto finale</strong> applicato al contesto lavorativo reale del Partecipante;</li>
              <li><strong className="text-white">Certificato di completamento</strong> al termine del programma;</li>
              <li><strong className="text-white">Pacchetto plugin/skill bonus</strong> (dettaglio comunicato prima dell&apos;avvio della classe).</li>
            </ol>

            <h3 className="text-lg font-semibold text-white mb-2">
              4.1 Add-on opzionale
            </h3>
            <p className="text-slate-300 mb-4">
              È disponibile, su base opzionale, un <strong className="text-white">servizio di consulenza 1-on-1 post-bootcamp</strong> al prezzo di 300,00 €. L&apos;acquisto dell&apos;add-on è disciplinato da accordo separato.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              4.2 Durata complessiva
            </h3>
            <p className="text-slate-300">
              Il Bootcamp ha una durata complessiva di circa <strong className="text-white">13 settimane</strong> (circa 3,5 mesi), incluso il periodo di attività del gruppo WhatsApp post-programma.
            </p>
          </section>

          {/* 5. Prezzi */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Prezzi e modalità di pagamento
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              5.1 Prezzi
            </h3>
            <p className="text-slate-300 mb-3">
              I prezzi del Bootcamp sono i seguenti:
            </p>

            <p className="text-white font-semibold mb-2">Quota intera:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li><strong className="text-white">1.297,00 €</strong> (early bird, riservato alle prime 48 ore post-webinar, soggetto a disponibilità di posti)</li>
              <li><strong className="text-white">1.500,00 €</strong> (prezzo full standard)</li>
            </ul>

            <p className="text-white font-semibold mb-2">Pagamento rateale:</p>
            <p className="text-slate-300 italic mb-2">Early bird (1.297,00 €):</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>2 rate: 680,00 € × 2 = 1.360,00 €</li>
              <li>3 rate: 460,00 € × 3 = 1.380,00 €</li>
            </ul>
            <p className="text-slate-300 italic mb-2">Prezzo full (1.500,00 €):</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>2 rate: 800,00 € × 2 = 1.600,00 €</li>
              <li>3 rate: 550,00 € × 3 = 1.650,00 €</li>
            </ul>

            <p className="text-slate-300 mb-4">
              Il prezzo applicabile è quello comunicato da Morfeus Hub al momento della conferma dell&apos;iscrizione. Il pagamento rateale comporta un lieve incremento rispetto alla quota intera, come indicato sopra.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              5.2 Modalità di pagamento
            </h3>
            <p className="text-slate-300 mb-4">
              Il pagamento avviene tramite i metodi indicati al momento della conferma dell&apos;iscrizione (carta di credito/debito, bonifico bancario o altri metodi abilitati). Il pagamento è elaborato da fornitori terzi di servizi di pagamento. Morfeus Hub non memorizza dati di pagamento.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              5.3 Scadenza rate
            </h3>
            <p className="text-slate-300 mb-2">
              In caso di pagamento rateale, le rate successive alla prima scadono secondo il calendario comunicato al momento dell&apos;iscrizione. Il mancato pagamento di una rata entro 7 giorni dalla scadenza, previa notifica via email, comporta:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>La sospensione dell&apos;accesso alla piattaforma Circle e al gruppo WhatsApp;</li>
              <li>La possibilità per Morfeus Hub di risolvere il contratto e richiedere il pagamento delle rate residue qualora la sospensione superi i 15 giorni.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              5.4 Fatturazione
            </h3>
            <p className="text-slate-300 mb-4">
              Su richiesta espressa del Partecipante, inviata a{" "}
              <a href="mailto:hello@morfeushub.com" className="text-[#4D39EB] hover:underline">
                hello@morfeushub.com
              </a>{" "}
              entro 5 giorni dall&apos;acquisto, verrà emessa fattura. Per soggetti titolari di P.IVA, la fattura verrà emessa automaticamente previa comunicazione dei dati fiscali. Il Bootcamp può essere deducibile come spesa di formazione professionale: Morfeus Hub non fornisce consulenza fiscale e si raccomanda di verificare l&apos;applicabilità con il proprio commercialista.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              5.5 Credito Claude Unlocked
            </h3>
            <p className="text-slate-300">
              Il Partecipante che abbia previamente acquistato il corso Claude Unlocked ha diritto a un <strong className="text-white">credito fisso di 147,00 €</strong>, detratto dal prezzo del Bootcamp al momento della conferma dell&apos;iscrizione, indipendentemente dal prezzo effettivamente pagato per il corso. Il credito non è cumulabile con altre promozioni salvo diversa indicazione scritta di Morfeus Hub.
            </p>
          </section>

          {/* 6. Recesso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Rinuncia espressa al diritto di recesso
            </h2>
            <p className="text-slate-300 mb-3">
              Ai sensi dell&apos;art. 59, comma 1, lettera o) del D.Lgs. 206/2005 (Codice del Consumo), <strong className="text-white">il diritto di recesso non si applica</strong> ai contratti di fornitura di contenuto digitale su supporto non materiale qualora l&apos;esecuzione del contratto sia iniziata con il <strong className="text-white">consenso espresso</strong> del consumatore e con la sua <strong className="text-white">espressa rinuncia</strong> al diritto di recesso.
            </p>
            <p className="text-slate-300 mb-3">
              Completando il pagamento e accedendo ai materiali del Bootcamp (corso Claude Unlocked, lezioni preparatorie, piattaforma Circle, gruppo WhatsApp), il Partecipante:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Esprime il proprio consenso all&apos;avvio immediato della fornitura del contenuto digitale;</li>
              <li>Dichiara di essere consapevole che, per effetto dell&apos;accesso immediato ai contenuti e alla community, <strong className="text-white">perde il diritto di recesso</strong> previsto dall&apos;art. 52 del D.Lgs. 206/2005.</li>
            </ol>
            <p className="text-slate-300">
              La rinuncia al diritto di recesso ha effetto dal momento dell&apos;accesso alla piattaforma Circle o al gruppo WhatsApp, a seconda di quale avvenga per primo.
            </p>
          </section>

          {/* 7. Garanzia di trasferimento */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Garanzia di trasferimento
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              7.1 Definizione
            </h3>
            <p className="text-slate-300 mb-4">
              Morfeus Hub offre una <strong className="text-white">Garanzia di Trasferimento</strong>: qualora il Partecipante, per cause documentate, non riesca a completare il Bootcamp, potrà partecipare gratuitamente alla <strong className="text-white">edizione successiva</strong>, senza alcun costo aggiuntivo.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              7.2 Condizioni di applicazione
            </h3>
            <p className="text-slate-300 mb-2">
              La Garanzia di Trasferimento si applica esclusivamente se:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Il Partecipante ha completato il pagamento integrale del Bootcamp (o di tutte le rate concordate);</li>
              <li>Il Partecipante ha partecipato ad almeno <strong className="text-white">2 sessioni live</strong> prima di comunicare l&apos;impossibilità a proseguire;</li>
              <li>Il Partecipante comunica per iscritto a hello@morfeushub.com l&apos;intenzione di avvalersi della garanzia <strong className="text-white">prima del termine della quarta sessione live</strong>, allegando documentazione a supporto delle cause impeditive (es. motivi di salute, emergenze familiari, imprevisti professionali documentati);</li>
              <li>Morfeus Hub valuta e approva la richiesta. La valutazione è effettuata entro 10 giorni lavorativi dalla ricezione della richiesta completa.</li>
            </ol>

            <h3 className="text-lg font-semibold text-white mb-2">
              7.3 Esclusioni
            </h3>
            <p className="text-slate-300 mb-2">
              La Garanzia di Trasferimento non si applica in caso di:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Semplice cambio di priorità o mancanza di tempo non documentata;</li>
              <li>Mancato completamento per assenze non comunicate;</li>
              <li>Risoluzione del contratto per inadempimento del Partecipante.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              7.4 Natura della garanzia
            </h3>
            <p className="text-slate-300">
              La Garanzia di Trasferimento consiste esclusivamente nel diritto a partecipare all&apos;edizione successiva. Non comporta alcun rimborso in denaro, neppure parziale. La disponibilità dell&apos;edizione successiva dipende dall&apos;organizzazione di Morfeus Hub; qualora non venisse organizzata un&apos;edizione entro 18 mesi, Morfeus Hub si riserva di valutare soluzioni alternative di pari valore.
            </p>
          </section>

          {/* 8. Politica di rimborso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Politica di rimborso
            </h2>
            <p className="text-slate-300">
              Fatte salve le disposizioni di cui all&apos;art. 7 (Garanzia di Trasferimento), <strong className="text-white">il Bootcamp non è soggetto a politica di rimborso in denaro</strong>. Una volta confermata l&apos;iscrizione e fornito l&apos;accesso alla piattaforma e ai materiali, non è previsto il rimborso del prezzo pagato o delle rate già saldate.
            </p>
          </section>

          {/* 9. Cancellazione */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Cancellazione o modifica della classe da parte di Morfeus Hub
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              9.1 Cancellazione
            </h3>
            <p className="text-slate-300 mb-2">
              Qualora Morfeus Hub dovesse cancellare un&apos;edizione del Bootcamp per cause di forza maggiore o per numero insufficiente di partecipanti, il Partecipante avrà diritto a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Il trasferimento all&apos;edizione successiva, oppure</li>
              <li>Il rimborso integrale delle somme versate, a propria scelta.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              9.2 Modifica delle date
            </h3>
            <p className="text-slate-300 mb-4">
              Morfeus Hub si riserva il diritto di modificare le date delle sessioni live con preavviso di almeno 7 giorni. Modifiche minori al calendario non costituiscono inadempimento contrattuale.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              9.3 Sostituzione dei docenti
            </h3>
            <p className="text-slate-300">
              In caso di impedimento temporaneo di uno dei founder, Morfeus Hub si riserva il diritto di designare un sostituto qualificato per la specifica sessione. Tale sostituzione non costituisce inadempimento contrattuale.
            </p>
          </section>

          {/* 10. Obblighi */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Obblighi e responsabilità del Partecipante
            </h2>
            <p className="text-slate-300 mb-2">
              Il Partecipante si impegna a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Partecipare attivamente alle sessioni live nei giorni e negli orari comunicati da Morfeus Hub;</li>
              <li>Completare i materiali preparatori pre-registrati prima delle sessioni live corrispondenti;</li>
              <li>Tenere un comportamento rispettoso nei confronti dei docenti e degli altri partecipanti, sia durante le sessioni live che nel gruppo WhatsApp e nella piattaforma Circle;</li>
              <li>Non registrare le sessioni live, condividere le credenziali di accesso o distribuire i materiali del Bootcamp a terzi;</li>
              <li>Fornire dati veritieri e completi al momento dell&apos;iscrizione.</li>
            </ul>
            <p className="text-slate-300">
              Morfeus Hub si riserva il diritto di escludere il Partecipante dal Bootcamp in caso di violazione dei presenti obblighi, senza rimborso e senza necessità di preavviso.
            </p>
          </section>

          {/* 11. Assenze */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Assenze
            </h2>
            <p className="text-slate-300">
              Il Bootcamp prevede 7 sessioni live. Tutte le sessioni sono registrate e i <strong className="text-white">replay sono disponibili permanentemente</strong> nella piattaforma Circle. In caso di assenza a una o più sessioni, il Partecipante potrà recuperare tramite i replay. Le assenze non danno diritto a rimborso né a sessioni di recupero individuali, salvo accordo scritto specifico con Morfeus Hub.
            </p>
          </section>

          {/* 12. Proprietà intellettuale */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Proprietà intellettuale e licenza d&apos;uso
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              12.1 Titolarità
            </h3>
            <p className="text-slate-300 mb-4">
              Tutti i contenuti del Bootcamp, inclusi senza limitazione lezioni video, materiali didattici, framework M-V-A, metodologie, template, slide e ogni altro contenuto, sono di esclusiva proprietà di Morfeus Hub S.r.l. e sono protetti dalle norme vigenti in materia di diritto d&apos;autore e proprietà intellettuale.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              12.2 Licenza personale non trasferibile
            </h3>
            <p className="text-slate-300 mb-2">
              Con l&apos;iscrizione, il Partecipante ottiene una <strong className="text-white">licenza personale, non esclusiva e non trasferibile</strong> per fruire dei contenuti del Bootcamp esclusivamente per uso personale e professionale proprio. È espressamente vietato:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4 ml-2">
              <li>Condividere le credenziali di accesso con terzi;</li>
              <li>Riprodurre, distribuire, vendere o trasmettere i contenuti del Bootcamp, in tutto o in parte;</li>
              <li>Registrare le sessioni live senza autorizzazione scritta di Morfeus Hub;</li>
              <li>Usare i contenuti per creare prodotti formativi derivati da vendere o distribuire.</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-2">
              12.3 Violazioni
            </h3>
            <p className="text-slate-300">
              La violazione delle disposizioni di cui all&apos;art. 12.2 comporta la revoca immediata dell&apos;accesso al Bootcamp, senza rimborso, e l&apos;eventuale azione legale per risarcimento dei danni.
            </p>
          </section>

          {/* 13. Limitazione responsabilità */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              13. Limitazione di responsabilità
            </h2>

            <h3 className="text-lg font-semibold text-white mb-2">
              13.1 Risultati
            </h3>
            <p className="text-slate-300 mb-4">
              I contenuti del Bootcamp sono forniti a scopo formativo. Morfeus Hub non garantisce specifici risultati economici, professionali o di altra natura derivanti dall&apos;applicazione di quanto appreso. I risultati dipendono dall&apos;impegno, dall&apos;applicazione e dalle circostanze individuali di ciascun Partecipante.
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              13.2 Responsabilità massima
            </h3>
            <p className="text-slate-300">
              In nessun caso Morfeus Hub potrà essere ritenuta responsabile per danni indiretti, consequenziali o perdita di profitti. La responsabilità massima di Morfeus Hub è in ogni caso limitata al prezzo effettivamente pagato dal Partecipante per il Bootcamp.
            </p>
          </section>

          {/* 14. Trattamento dati */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              14. Trattamento dei dati personali
            </h2>
            <p className="text-slate-300 mb-3">
              Il trattamento dei dati personali del Partecipante è disciplinato dall&apos;Informativa sulla Privacy di Morfeus Hub S.r.l., disponibile sul sito{" "}
              <Link href={`/${locale}/privacy`} className="text-[#4D39EB] hover:underline">
                morfeushub.com/privacy
              </Link>
              , nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana applicabile.
            </p>
            <p className="text-slate-300">
              I dati forniti al momento dell&apos;iscrizione saranno trattati per finalità di esecuzione del contratto, gestione del rapporto con il Partecipante e comunicazioni relative al programma formativo. Le immagini e le registrazioni delle sessioni live non saranno usate per finalità di marketing senza il consenso espresso del Partecipante.
            </p>
          </section>

          {/* 15. Modifiche */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              15. Modifiche ai presenti Termini
            </h2>
            <p className="text-slate-300">
              Morfeus Hub si riserva il diritto di modificare i presenti Termini e Condizioni per le edizioni future del Bootcamp. I Termini in vigore al momento della conferma dell&apos;iscrizione si applicano per tutta la durata del rapporto contrattuale in corso.
            </p>
          </section>

          {/* 16. Legge applicabile */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              16. Legge applicabile e foro competente
            </h2>
            <p className="text-slate-300 mb-3">
              I presenti Termini e Condizioni sono disciplinati dalla legge italiana. Per qualsiasi controversia derivante dal presente contratto, le parti concordano la competenza esclusiva del <strong className="text-white">Foro di Milano</strong>, fatte salve le disposizioni inderogabili a tutela del consumatore previste dal D.Lgs. 206/2005.
            </p>
            <p className="text-slate-300">
              Per la risoluzione alternativa delle controversie, il Partecipante consumatore può rivolgersi alla piattaforma ODR (Online Dispute Resolution) della Commissione Europea, accessibile all&apos;indirizzo:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4D39EB] hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          {/* 17. Contatti */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              17. Contatti
            </h2>
            <p className="text-slate-300 mb-3">
              Per qualsiasi comunicazione relativa al presente contratto, all&apos;accesso al Bootcamp o ai pagamenti:
            </p>
            <div className="p-5 bg-white/[0.02] rounded-xl border border-white/5 text-slate-300">
              <p className="text-white font-semibold mb-1">Morfeus Hub S.r.l.</p>
              <p className="text-sm">Via Jacopo del Verme 7, 20159 Milano (MI), Italia</p>
              <p className="text-sm">
                Email:{" "}
                <a href="mailto:hello@morfeushub.com" className="text-[#4D39EB] hover:underline">
                  hello@morfeushub.com
                </a>
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-4 italic">
              Per informazioni sulla call di selezione: contattare hello@morfeushub.com con oggetto «Call Bootcamp AI Champion».
            </p>
          </section>

          {/* Note finale */}
          <section>
            <p className="text-slate-500 text-xs italic">
              I presenti Termini e Condizioni sono redatti ai sensi del D.Lgs. 206/2005 (Codice del Consumo), del D.Lgs. 70/2003 (Commercio Elettronico) e del Regolamento (UE) 2016/679 (GDPR).
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Morfeus Hub S.r.l. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </main>
  );
}
