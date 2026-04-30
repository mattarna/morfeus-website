"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * Termini e Condizioni — Claude Unlocked (corso digitale)
 * Pagina linkata dal checkout / footer della sales page del corso.
 * Ultima revisione: 30 aprile 2026.
 */
export default function TerminiCorsoPage() {
  const locale = useLocale();
  const isIT = locale === "it";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href={`/${locale}`} className="text-white/80 hover:text-white transition-colors text-sm">
            ← {isIT ? "Torna al sito" : "Back to site"}
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
          Termini e Condizioni — Claude Unlocked
        </h1>
        <p className="text-slate-500 text-sm mb-2">
          Morfeus Hub S.r.l. · P.IVA 14209210963 · Via Jacopo del Verme 7, 20159 Milano (MI), Italia
        </p>
        <p className="text-slate-500 text-sm mb-12">
          Email: <a href="mailto:hello@morfeushub.com" className="underline decoration-slate-700 hover:text-white">hello@morfeushub.com</a> · Ultima revisione: 30 aprile 2026
        </p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10 text-[15px] leading-relaxed">
          {/* 1. Parti del contratto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Parti del contratto</h2>
            <p className="text-slate-300 mb-4">Il presente contratto è stipulato tra:</p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-4">
              <li>
                <strong className="text-white">Morfeus Hub S.r.l.</strong>, con sede legale in Via Jacopo del Verme 7, 20159 Milano (MI), Italia, P.IVA 14209210963 (di seguito &ldquo;Morfeus Hub&rdquo; o &ldquo;Venditore&rdquo;)
              </li>
              <li>Il soggetto che procede all&apos;acquisto del corso (di seguito &ldquo;Utente&rdquo; o &ldquo;Acquirente&rdquo;)</li>
            </ul>
            <p className="text-slate-300">
              Completando l&apos;acquisto, l&apos;Utente dichiara di aver letto, compreso e accettato integralmente i presenti Termini e Condizioni.
            </p>
          </section>

          {/* 2. Oggetto del contratto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Oggetto del contratto</h2>
            <p className="text-slate-300 mb-4">
              Il presente contratto regola l&apos;acquisto e la fruizione del corso digitale denominato <strong className="text-white">&ldquo;Claude Unlocked&rdquo;</strong> (di seguito &ldquo;il Corso&rdquo;), erogato da Morfeus Hub S.r.l. tramite la piattaforma Circle (circle.so).
            </p>
            <p className="text-slate-300">
              Il Corso è un prodotto di formazione digitale composto da lezioni video pre-registrate, materiali didattici, risorse scaricabili e accesso alla community di riferimento, nella misura e con i contenuti descritti nella pagina di vendita ufficiale al momento dell&apos;acquisto.
            </p>
          </section>

          {/* 3. Accesso al corso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">3. Accesso al corso</h2>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">3.1 Modalità di accesso</h3>
              <p className="text-slate-400 text-sm">
                L&apos;accesso al Corso avviene tramite la piattaforma <strong className="text-white">Circle (circle.so)</strong>. Completato il pagamento, l&apos;Utente riceverà entro 24 ore le istruzioni per creare o accedere al proprio account e fruire dei contenuti.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">3.2 Durata dell&apos;accesso</h3>
              <p className="text-slate-400 text-sm">
                L&apos;accesso al Corso è <strong className="text-white">lifetime</strong> (a tempo indeterminato), nei limiti di quanto previsto all&apos;art. 3.3. Non sono previste scadenze di accesso ai contenuti acquistati.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">3.3 Continuità del servizio</h3>
              <p className="text-slate-400 text-sm">
                Morfeus Hub garantisce l&apos;accesso al Corso per tutta la durata di attività della piattaforma Circle e del relativo spazio. In caso di cessazione della piattaforma o di migrazione verso altra soluzione, Morfeus Hub si impegna a garantire all&apos;Utente l&apos;accesso equivalente ai contenuti tramite soluzioni alternative, con preavviso di almeno 30 giorni ove tecnicamente possibile. Morfeus Hub non può essere ritenuta responsabile per interruzioni dipendenti da terze parti (es. malfunzionamenti della piattaforma Circle).
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3">3.4 Requisiti tecnici</h3>
              <p className="text-slate-400 text-sm">
                L&apos;accesso al Corso richiede una connessione internet funzionante e un dispositivo compatibile con la piattaforma Circle. È responsabilità dell&apos;Utente disporre degli strumenti tecnici necessari.
              </p>
            </div>
          </section>

          {/* 4. Prezzi e modalità di pagamento */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">4. Prezzi e modalità di pagamento</h2>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">4.1 Prezzi</h3>
              <p className="text-slate-400 text-sm mb-4">
                Il prezzo del Corso varia in funzione della fase di lancio e delle promozioni attive al momento dell&apos;acquisto, come indicato nella pagina di vendita ufficiale. Il prezzo mostrato al momento del checkout è quello vincolante per l&apos;acquisto.
              </p>
              <p className="text-slate-400 text-sm mb-3">A titolo indicativo, i prezzi del Corso sono:</p>
              <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
                <li>
                  <strong className="text-white">147,00 €</strong> (IVA inclusa ove applicabile) — fase flash lancio
                </li>
                <li>
                  <strong className="text-white">297,00 €</strong> (IVA inclusa ove applicabile) — fase launch week
                </li>
                <li>
                  <strong className="text-white">397,00 €</strong> (IVA inclusa ove applicabile) — prezzo evergreen standard
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">4.2 Modalità di pagamento</h3>
              <p className="text-slate-400 text-sm">
                Il pagamento avviene in un&apos;unica soluzione, tramite i metodi indicati al checkout (carta di credito/debito, altri metodi abilitati). Il pagamento è elaborato da fornitori terzi di servizi di pagamento (es. Stripe). Morfeus Hub non memorizza dati di pagamento.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3">4.3 Fatturazione</h3>
              <p className="text-slate-400 text-sm">
                Su richiesta espressa dell&apos;Utente, inviata a <a href="mailto:hello@morfeushub.com" className="text-white underline decoration-slate-700">hello@morfeushub.com</a> entro 5 giorni dall&apos;acquisto, verrà emessa fattura. Per soggetti titolari di P.IVA, la fattura verrà emessa automaticamente previa comunicazione dei dati fiscali al momento del checkout.
              </p>
            </div>
          </section>

          {/* 5. Rinuncia espressa al diritto di recesso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Rinuncia espressa al diritto di recesso</h2>
            <p className="text-slate-300 mb-4">
              Ai sensi dell&apos;art. 59, comma 1, lettera o) del D.Lgs. 206/2005 (Codice del Consumo), <strong className="text-white">il diritto di recesso non si applica</strong> ai contratti di fornitura di contenuto digitale su supporto non materiale, qualora l&apos;esecuzione del contratto sia iniziata con il <strong className="text-white">consenso espresso</strong> del consumatore e con la sua <strong className="text-white">espressa rinuncia</strong> al diritto di recesso.
            </p>
            <p className="text-slate-300 mb-3">Completando l&apos;acquisto e confermando l&apos;accettazione dei presenti Termini, l&apos;Utente:</p>
            <ol className="list-decimal pl-6 text-slate-300 space-y-2 mb-4">
              <li>Esprime il proprio consenso all&apos;avvio immediato della fornitura del contenuto digitale;</li>
              <li>
                Dichiara di essere consapevole che, per effetto dell&apos;avvio immediato della fornitura, <strong className="text-white">perde il diritto di recesso</strong> previsto dall&apos;art. 52 del D.Lgs. 206/2005.
              </li>
            </ol>
            <p className="text-slate-300">
              La rinuncia al diritto di recesso ha effetto dal momento in cui l&apos;Utente riceve le credenziali di accesso al Corso.
            </p>
          </section>

          {/* 6. Politica di rimborso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Politica di rimborso</h2>
            <p className="text-slate-300 mb-4">
              <strong className="text-white">Il Corso non è soggetto a politica di rimborso.</strong> Una volta completato l&apos;acquisto e fornito l&apos;accesso alla piattaforma, non è previsto il rimborso del prezzo pagato, per alcuna ragione, salvo diversa valutazione discrezionale di Morfeus Hub comunicata per iscritto a <a href="mailto:hello@morfeushub.com" className="text-white underline decoration-slate-700">hello@morfeushub.com</a>.
            </p>
            <p className="text-slate-300 mb-4">
              L&apos;assenza di rimborso è conseguenza diretta della rinuncia al diritto di recesso di cui all&apos;art. 5 e della natura del prodotto digitale, il cui contenuto è accessibile interamente fin dall&apos;attivazione.
            </p>
            <p className="text-slate-300">
              Per qualsiasi dubbio o difficoltà tecnica prima dell&apos;acquisto, l&apos;Utente è invitato a contattare <a href="mailto:hello@morfeushub.com" className="text-white underline decoration-slate-700">hello@morfeushub.com</a>.
            </p>
          </section>

          {/* 7. Proprietà intellettuale e licenza d'uso */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">7. Proprietà intellettuale e licenza d&apos;uso</h2>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">7.1 Titolarità</h3>
              <p className="text-slate-400 text-sm">
                Tutti i contenuti del Corso — inclusi, senza limitazione, video, audio, testi, slide, materiali scaricabili, framework, metodologie e ogni altro materiale didattico — sono di esclusiva proprietà di Morfeus Hub S.r.l. e sono protetti dalle norme vigenti in materia di diritto d&apos;autore e proprietà intellettuale.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">7.2 Licenza personale non trasferibile</h3>
              <p className="text-slate-400 text-sm mb-3">
                Con l&apos;acquisto, l&apos;Utente ottiene una <strong className="text-white">licenza personale, non esclusiva e non trasferibile</strong> per fruire dei contenuti del Corso esclusivamente per uso personale e professionale proprio. È espressamente vietato:
              </p>
              <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
                <li>Condividere le credenziali di accesso con terzi;</li>
                <li>Riprodurre, distribuire, vendere o trasmettere i contenuti del Corso, in tutto o in parte;</li>
                <li>Caricare i contenuti su piattaforme pubbliche o private di terzi;</li>
                <li>Usare i contenuti per creare prodotti formativi derivati da vendere o distribuire;</li>
                <li>Registrare le sessioni live eventualmente incluse nel Corso senza autorizzazione scritta.</li>
              </ul>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3">7.3 Violazioni</h3>
              <p className="text-slate-400 text-sm">
                La violazione delle disposizioni di cui all&apos;art. 7.2 comporta la revoca immediata dell&apos;accesso al Corso, senza rimborso, e l&apos;eventuale azione legale per risarcimento dei danni.
              </p>
            </div>
          </section>

          {/* 8. Obblighi e responsabilità dell'Utente */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Obblighi e responsabilità dell&apos;Utente</h2>
            <p className="text-slate-300 mb-3">L&apos;Utente si impegna a:</p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-4">
              <li>Fornire dati veritieri e completi al momento dell&apos;acquisto;</li>
              <li>Utilizzare la piattaforma Circle nel rispetto dei Termini di Servizio di Circle stessa;</li>
              <li>Non tenere comportamenti lesivi nei confronti di Morfeus Hub, dei suoi collaboratori o degli altri utenti della community;</li>
              <li>Non diffondere contenuti diffamatori, illeciti o in violazione di diritti di terzi all&apos;interno della community.</li>
            </ul>
            <p className="text-slate-300">
              Morfeus Hub si riserva il diritto di sospendere o revocare l&apos;accesso dell&apos;Utente in caso di violazione dei presenti obblighi, senza rimborso e senza necessità di preavviso.
            </p>
          </section>

          {/* 9. Account e sicurezza */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Account e sicurezza</h2>
            <p className="text-slate-300 mb-4">
              L&apos;Utente è responsabile della custodia e della riservatezza delle proprie credenziali di accesso alla piattaforma Circle. In caso di smarrimento o compromissione delle credenziali, l&apos;Utente deve contattare immediatamente <a href="mailto:hello@morfeushub.com" className="text-white underline decoration-slate-700">hello@morfeushub.com</a>.
            </p>
            <p className="text-slate-300">
              Morfeus Hub non è responsabile per accessi non autorizzati all&apos;account dell&apos;Utente derivanti da negligenza nella custodia delle credenziali.
            </p>
          </section>

          {/* 10. Modifiche ai contenuti */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Modifiche ai contenuti</h2>
            <p className="text-slate-300 mb-4">
              Morfeus Hub si riserva il diritto di aggiornare, integrare o modificare i contenuti del Corso in qualsiasi momento, al fine di mantenerli aggiornati e di qualità. Gli aggiornamenti sono inclusi nell&apos;accesso lifetime senza costi aggiuntivi.
            </p>
            <p className="text-slate-300">
              Morfeus Hub si riserva altresì il diritto di rimuovere contenuti che risultino obsoleti, non più pertinenti o in violazione di normative vigenti. Tali modifiche non costituiscono inadempimento contrattuale.
            </p>
          </section>

          {/* 11. Limitazione di responsabilità */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">11. Limitazione di responsabilità</h2>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">11.1 Risultati</h3>
              <p className="text-slate-400 text-sm">
                I contenuti del Corso sono forniti a scopo formativo. Morfeus Hub non garantisce specifici risultati economici, professionali o di altra natura derivanti dall&apos;applicazione dei contenuti appresi. I risultati dipendono dall&apos;impegno, dall&apos;applicazione e dalle circostanze individuali di ciascun Utente.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3">11.2 Responsabilità massima</h3>
              <p className="text-slate-400 text-sm">
                In nessun caso Morfeus Hub potrà essere ritenuta responsabile per danni indiretti, consequenziali, perdita di profitti o danni derivanti dall&apos;uso o dall&apos;impossibilità di usare i contenuti del Corso. La responsabilità massima di Morfeus Hub è in ogni caso limitata al prezzo pagato dall&apos;Utente per il Corso.
              </p>
            </div>
          </section>

          {/* 12. Trattamento dei dati personali */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Trattamento dei dati personali</h2>
            <p className="text-slate-300 mb-4">
              Il trattamento dei dati personali dell&apos;Utente è disciplinato dall&apos;Informativa sulla Privacy di Morfeus Hub S.r.l., disponibile sul sito morfeushub.com, nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana applicabile.
            </p>
            <p className="text-slate-300">
              I dati forniti al momento dell&apos;acquisto saranno trattati per finalità di esecuzione del contratto, gestione del rapporto con l&apos;Utente ed eventuali comunicazioni di carattere commerciale (previa acquisizione del consenso ove richiesto).
            </p>
          </section>

          {/* 13. Modifiche ai presenti Termini */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Modifiche ai presenti Termini</h2>
            <p className="text-slate-300">
              Morfeus Hub si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno comunicate agli Utenti attivi via email con preavviso di almeno 15 giorni. L&apos;accesso continuato al Corso dopo la data di entrata in vigore delle modifiche costituisce accettazione dei nuovi Termini.
            </p>
          </section>

          {/* 14. Legge applicabile e foro competente */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Legge applicabile e foro competente</h2>
            <p className="text-slate-300 mb-4">
              I presenti Termini e Condizioni sono disciplinati dalla legge italiana. Per qualsiasi controversia derivante dal presente contratto, le parti concordano la competenza esclusiva del <strong className="text-white">Foro di Milano</strong>, fatte salve le disposizioni inderogabili a tutela del consumatore previste dal D.Lgs. 206/2005.
            </p>
            <p className="text-slate-300">
              Per la risoluzione alternativa delle controversie, l&apos;Utente consumatore può rivolgersi alla piattaforma ODR (Online Dispute Resolution) della Commissione Europea, accessibile all&apos;indirizzo: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-slate-700">https://ec.europa.eu/consumers/odr</a>
            </p>
          </section>

          {/* 15. Contatti */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Contatti</h2>
            <p className="text-slate-300 mb-4">
              Per qualsiasi comunicazione relativa al presente contratto, all&apos;accesso al Corso o ai pagamenti:
            </p>
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">Morfeus Hub S.r.l.</p>
              <p className="text-slate-400 text-sm mb-1">Via Jacopo del Verme 7, 20159 Milano (MI), Italia</p>
              <p className="text-slate-400 text-sm">
                Email: <a href="mailto:hello@morfeushub.com" className="text-white underline decoration-slate-700">hello@morfeushub.com</a>
              </p>
            </div>
          </section>

          {/* Footnote */}
          <section className="pt-4">
            <p className="text-slate-500 text-xs italic">
              I presenti Termini e Condizioni sono redatti ai sensi del D.Lgs. 206/2005 (Codice del Consumo), del D.Lgs. 70/2003 (Commercio Elettronico) e del Regolamento (UE) 2016/679 (GDPR).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
