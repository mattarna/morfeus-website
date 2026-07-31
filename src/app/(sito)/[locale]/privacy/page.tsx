import { SiteShell } from "@/components/site";
import "@/components/site/legale.css";

/**
 * Privacy Policy — contenuto GDPR completo dal morfeushub.com originale.
 * Il TESTO non e' cambiato: solo il vestito, ora dentro SiteShell e sul
 * design system 2026 (vedi components/site/legale.css). Da pagina bespoke
 * a pagina del sito.
 */
export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: "it" | "en" = locale === "it" ? "it" : "en";
  const isIT = safeLocale === "it";

  return (
    <SiteShell locale={safeLocale}>
      <main className="legale">
        <p className="leg-eye">{isIT ? "Legale" : "Legal"}</p>
        <h1>{isIT ? "Informativa sulla Privacy" : "Privacy Policy"}</h1>
        <p className="leg-meta">
          {isIT ? "Ultimo aggiornamento" : "Last updated"}: 30/07/2026
        </p>
        <div className="leg-rule" />

        {/* Intro */}
        <section>
          <p>
            {isIT
              ? 'In questa sezione, in accordo con la nuova normativa europea introdotta dal Regolamento UE 679/2016 e con la normativa italiana (D.lgs. n. 196/2003), vengono fornite le informazioni in merito al trattamento dei dati personali degli utenti che consultano le pagine del sito internet https://morfeushub.com/ (di seguito: "Sito") o che usufruiscono dei servizi sullo stesso messi a disposizione.'
              : 'This section provides information regarding the processing of personal data of users who consult the pages of the website https://morfeushub.com/ (hereinafter: "Site") or who use the services made available on it, in accordance with the new European regulation introduced by EU Regulation 679/2016 and Italian legislation (Legislative Decree No. 196/2003).'}
          </p>
          <p className="sec">
            {isIT
              ? "L'informativa è resa esclusivamente per il Sito e non anche per gli altri siti web eventualmente consultati dall'utente tramite i link presenti all'interno del Sito."
              : "This notice is provided exclusively for the Site and not for other websites that the user may visit through links within the Site."}
          </p>
        </section>

        {/* Titolare del trattamento */}
        <section>
          <h2>{isIT ? "Titolare del Trattamento" : "Data Controller"}</h2>
          <div className="leg-box">
            <p>
              <strong>NUMANITY S.R.L.</strong>
            </p>
            <p>P.IVA: 14209210963</p>
            <p>Via Jacopo Dal Verme 7, CAP 20159</p>
            <p>Milano (MI), Italia</p>
            <p>
              Email: <a href="mailto:hello@morfeushub.com">hello@morfeushub.com</a>
            </p>
          </div>
        </section>

        {/* A - Tipologia di dati trattati */}
        <section>
          <h2>A - {isIT ? "Tipologia di Dati Trattati" : "Types of Data Processed"}</h2>

          <h3>I. {isIT ? "Dati Identificativi" : "Identifying Data"}</h3>
          <p>
            {isIT
              ? "In accordo con la nuova normativa europea introdotta dal Regolamento UE 679/2016 e con la normativa italiana (D.lgs. n. 196/2003), la consultazione del Sito può comportare il trattamento di dati idonei a identificare direttamente o indirettamente una persona fisica quali: nome, cognome, indirizzo e-mail, numero di telefono, indirizzo IP."
              : "In accordance with the new European regulation introduced by EU Regulation 679/2016 and Italian legislation (Legislative Decree No. 196/2003), consulting the Site may involve the processing of data suitable for directly or indirectly identifying a natural person such as: name, surname, email address, telephone number, IP address."}
          </p>
          <p className="sec">
            {isIT
              ? 'Il Sito non richiede all\'Interessato di fornire dati c.d. "particolari", ovvero, secondo quanto previsto dal GDPR (art. 9), i dati personali che rivelino l\'origine razziale o etnica, le opinioni politiche, le convinzioni religiose o filosofiche, o l\'appartenenza sindacale, nonché dati genetici, dati biometrici intesi a identificare in modo univoco una persona fisica, dati relativi alla salute o alla vita sessuale o all\'orientamento sessuale della persona.'
              : 'The Site does not require the Data Subject to provide so-called "special" data, i.e., according to the GDPR (art. 9), personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, as well as genetic data, biometric data intended to uniquely identify a natural person, data concerning health or a person\'s sex life or sexual orientation.'}
          </p>

          <h3>II. {isIT ? "Dati di Navigazione" : "Navigation Data"}</h3>
          <p>
            {isIT
              ? "I dati di navigazione sono dati acquisiti automaticamente dai sistemi e dai programmi preposti al funzionamento del Sito e sono necessari per la fruizione dei servizi web (es. indirizzi IP, browser utilizzato, nome del sito tramite il quale è stato effettuato l'accesso)."
              : "Navigation data is data automatically acquired by the systems and programs responsible for the operation of the Site and is necessary for the use of web services (e.g., IP addresses, browser used, name of the site through which access was made)."}
          </p>
          <p className="sec">
            {isIT
              ? "Tali dati vengono acquisiti anche in mancanza di registrazione al Sito o richiesta di informazioni. I dati di navigazione vengono utilizzati esclusivamente in maniera aggregata per elaborare statistiche anonime sulla consultazione del Sito e per controllarne il corretto funzionamento e non consentono di identificare gli utenti interessati, venendo, inoltre, cancellati subito dopo l'elaborazione in forma anonima."
              : "Such data is acquired even without registration to the Site or request for information. Navigation data is used exclusively in aggregate form to process anonymous statistics on Site consultation and to check its correct functioning, and does not allow identification of the users concerned, being deleted immediately after processing in anonymous form."}
          </p>
          <p className="sec">
            {isIT
              ? "Possono, tuttavia, essere utilizzate per l'accertamento di responsabilità in caso di reati informatici compiuti ai danni del sito web."
              : "However, they may be used to ascertain responsibility in case of computer crimes committed against the website."}
          </p>

          <h3>
            III.{" "}
            {isIT
              ? "Dati Forniti Volontariamente dall'Utente"
              : "Data Voluntarily Provided by the User"}
          </h3>
          <p>
            {isIT
              ? "I dati personali forniti volontariamente dall'utente (come ad esempio nome, cognome, indirizzo e-mail) allo scopo di contattare i membri del Sito o per ricevere informazioni ed alla mailing list, sono utilizzati al solo fine di rispondere alle richieste formulate dall'interessato e per ottemperare agli obblighi di legge."
              : "Personal data voluntarily provided by the user (such as name, surname, email address) for the purpose of contacting Site members or receiving information and the mailing list, are used solely to respond to requests made by the data subject and to comply with legal obligations."}
          </p>
          <p className="sec">
            {isIT
              ? "La base giuridica di tali trattamenti è l'adempimento delle prestazioni inerenti alla richiesta di informazioni e di contatto e/o di invio di materiale informativo ed il rispetto di obblighi di legge."
              : "The legal basis for such processing is the fulfillment of services related to requests for information and contact and/or sending informational material and compliance with legal obligations."}
          </p>

          <h3>
            IV.{" "}
            {isIT
              ? "Dati Raccolti Tramite Cookie Analitici"
              : "Data Collected Through Analytical Cookies"}
          </h3>
          <p>
            {isIT
              ? "Tali cookie sono utilizzati per tracciare le preferenze di navigazione dell'utente e per la raccolta di dati statistici. L'utente può disattivare tali cookie accedendo alle impostazioni del proprio browser."
              : "These cookies are used to track user browsing preferences and to collect statistical data. The user can disable these cookies by accessing their browser settings."}
          </p>
        </section>

        {/* B - Finalità del trattamento */}
        <section>
          <h2>B - {isIT ? "Finalità del Trattamento" : "Purpose of Processing"}</h2>
          <p>
            {isIT
              ? "I dati personali raccolti vengono usati per:"
              : "Personal data collected is used for:"}
          </p>
          <ul>
            <li>
              {isIT
                ? "ricavare informazioni statistiche anonime sull'uso del portale web"
                : "obtaining anonymous statistical information on the use of the web portal"}
            </li>
            <li>
              {isIT
                ? "per controllarne il corretto funzionamento del portale web"
                : "checking the correct functioning of the web portal"}
            </li>
            <li>
              {isIT
                ? "invio di contenuti e aggiornamenti attraverso iscrizione alla mailing list"
                : "sending content and updates through mailing list subscription"}
            </li>
            <li>
              {isIT
                ? "l'accertamento di responsabilità in caso di ipotetici reati informatici ai danni del sito web"
                : "ascertaining responsibility in case of hypothetical computer crimes against the website"}
            </li>
            <li>
              {isIT
                ? "il rispetto di ogni altro obbligo di legge non compreso nelle finalità precedenti"
                : "compliance with any other legal obligation not included in the previous purposes"}
            </li>
          </ul>
          <p className="sec">
            {isIT
              ? "La comunicazione dei dati può essere effettuata solo a seguito di richiesta da parte dell'Autorità Giudiziaria nei termini di legge."
              : "Data communication can only be made following a request from the Judicial Authority in accordance with the law."}
          </p>
        </section>

        {/* C - Base giuridica */}
        <section>
          <h2>C - {isIT ? "Base Giuridica del Trattamento" : "Legal Basis for Processing"}</h2>

          <h3>I. {isIT ? "Esecuzione di un Contratto" : "Contract Execution"}</h3>
          <p>
            {isIT
              ? "Base giuridica del trattamento dei dati personali è l'adempimento delle prestazioni inerenti la consultazione del Sito, il rispetto di obblighi di legge ed il legittimo interesse del Sito ad effettuare trattamenti necessari a tali finalità."
              : "The legal basis for the processing of personal data is the fulfillment of services related to Site consultation, compliance with legal obligations, and the legitimate interest of the Site in carrying out processing necessary for such purposes."}
          </p>

          <h3>II. {isIT ? "Consenso dell'Interessato" : "Data Subject Consent"}</h3>
          <p>
            {isIT
              ? "L'invio facoltativo, esplicito e volontario di posta elettronica, messaggi o qualsiasi tipo di comunicazioni indirizzate ai recapiti indicati su questo portale web comporta la successiva acquisizione dell'indirizzo del mittente o di eventuali altri dati personali che saranno utilizzati per rispondere alle richieste. Tale trattamento avviene sulla base del consenso dell'interessato."
              : "The optional, explicit, and voluntary sending of emails, messages, or any type of communications addressed to the contacts indicated on this web portal entails the subsequent acquisition of the sender's address or any other personal data that will be used to respond to requests. Such processing takes place on the basis of the data subject's consent."}
          </p>
          <p className="sec">
            {isIT
              ? "Si assicura che tale trattamento sarà improntato ai principi di liceità, correttezza, trasparenza, adeguatezza, pertinenza e necessità di cui all'art. 5, paragrafo 1 del GDPR."
              : "It is ensured that such processing will be based on the principles of lawfulness, fairness, transparency, adequacy, relevance, and necessity referred to in art. 5, paragraph 1 of the GDPR."}
          </p>

          <h3>
            III.{" "}
            {isIT ? "Adempimento di Obblighi Legali" : "Fulfillment of Legal Obligations"}
          </h3>
          <p>
            {isIT
              ? "Il trattamento dei dati personali potrà avvenire senza consenso dell'interessato nel caso in cui il Titolare debba adempiere ad un obbligo legale."
              : "The processing of personal data may take place without the consent of the data subject in cases where the Controller must fulfill a legal obligation."}
          </p>
        </section>

        {/* D - Modalità e durata */}
        <section>
          <h2>
            D - {isIT ? "Modalità e Durata del Trattamento" : "Methods and Duration of Processing"}
          </h2>
          <p>
            {isIT
              ? "I dati personali sono trattati attraverso strumenti informatici e in conformità con il Regolamento UE n. 679/2016 e al D.Lgs n. 196/2003."
              : "Personal data is processed through computer tools and in accordance with EU Regulation No. 679/2016 and Legislative Decree No. 196/2003."}
          </p>
          <p className="sec">
            {isIT
              ? "La conservazione dei dati trattati durerà per il tempo necessario alle finalità descritte nella presente informativa, quindi, per il minimo tempo necessario ovvero fino ad una esplicita richiesta dell'interessato e comunque nel rispetto dei limiti temporali imposti dalla legge."
              : "The retention of processed data will last for the time necessary for the purposes described in this notice, therefore, for the minimum time necessary or until an explicit request from the data subject and in any case in compliance with the time limits imposed by law."}
          </p>
          <p className="sec">
            {isIT
              ? "Il Titolare si impegna ad adottare tutte le misure di sicurezza adeguate per prevenire la perdita e l'alterazione dei dati personali, nonché qualunque utilizzo illecito e non autorizzato degli stessi."
              : "The Controller undertakes to adopt all adequate security measures to prevent the loss and alteration of personal data, as well as any unlawful and unauthorized use thereof."}
          </p>
        </section>

        {/* Responsabili del trattamento */}
        <section>
          <h2>{isIT ? "Responsabili del Trattamento" : "Data Processors"}</h2>
          <p>
            {isIT
              ? "Per erogare i propri servizi, il Titolare si avvale di fornitori terzi che trattano dati personali per suo conto, in qualità di responsabili del trattamento ai sensi dell'art. 28 del GDPR. Di seguito i principali:"
              : "To provide its services, the Controller relies on third-party providers that process personal data on its behalf, as data processors pursuant to art. 28 of the GDPR. The main ones are listed below:"}
          </p>
          <ul>
            <li>
              <strong>Google (Google Ireland Ltd. / Google LLC)</strong> —{" "}
              {isIT
                ? "servizi di analisi e advertising (Google Analytics, Google Remarketing). Eventuali trasferimenti verso gli Stati Uniti avvengono nel rispetto delle garanzie previste dal GDPR."
                : "analytics and advertising services (Google Analytics, Google Remarketing). Any transfers to the United States take place in compliance with the safeguards provided by the GDPR."}
            </li>
            <li>
              <strong>Meta (Meta Platforms Ireland Ltd.)</strong> —{" "}
              {isIT
                ? "servizi di advertising e misurazione (Facebook Pixel). Eventuali trasferimenti verso gli Stati Uniti avvengono nel rispetto delle garanzie previste dal GDPR."
                : "advertising and measurement services (Facebook Pixel). Any transfers to the United States take place in compliance with the safeguards provided by the GDPR."}
            </li>
            <li>
              <strong>Brevo (Brevo SAS, {isIT ? "Francia" : "France"})</strong> —{" "}
              {isIT
                ? "piattaforma di email marketing e marketing automation per la gestione della mailing list e delle comunicazioni."
                : "email marketing and marketing automation platform for managing the mailing list and communications."}
            </li>
          </ul>
          <p className="sec">
            {isIT
              ? "L'elenco aggiornato dei responsabili del trattamento può essere richiesto in qualsiasi momento scrivendo a "
              : "The updated list of data processors can be requested at any time by writing to "}
            <a href="mailto:hello@morfeushub.com">hello@morfeushub.com</a>.
          </p>
        </section>

        {/* Diritti dell'interessato */}
        <section>
          <h2>{isIT ? "Diritti dell'Interessato" : "Data Subject Rights"}</h2>
          <p>
            {isIT
              ? "In qualità di interessato, ai sensi degli artt. 15-22 del GDPR, hai diritto a:"
              : "As a data subject, pursuant to articles 15-22 of the GDPR, you have the right to:"}
          </p>
          <ul>
            <li>{isIT ? "Accesso ai dati personali" : "Access to personal data"}</li>
            <li>{isIT ? "Rettifica dei dati inesatti" : "Rectification of inaccurate data"}</li>
            <li>{isIT ? "Cancellazione dei dati (diritto all'oblio)" : "Erasure of data (right to be forgotten)"}</li>
            <li>{isIT ? "Limitazione del trattamento" : "Restriction of processing"}</li>
            <li>{isIT ? "Portabilità dei dati" : "Data portability"}</li>
            <li>{isIT ? "Opposizione al trattamento" : "Objection to processing"}</li>
            <li>{isIT ? "Revoca del consenso in qualsiasi momento" : "Withdrawal of consent at any time"}</li>
            <li>{isIT ? "Proporre reclamo all'Autorità Garante" : "Lodge a complaint with the Supervisory Authority"}</li>
          </ul>
          <p>
            {isIT ? "Per esercitare i tuoi diritti, contattaci a:" : "To exercise your rights, contact us at:"}{" "}
            <a href="mailto:hello@morfeushub.com">hello@morfeushub.com</a>
          </p>
        </section>

        <p className="leg-foot">
          © {new Date().getFullYear()} Morfeus (NUMANITY S.R.L.).{" "}
          {isIT ? "Tutti i diritti riservati." : "All rights reserved."}
        </p>
      </main>
    </SiteShell>
  );
}
