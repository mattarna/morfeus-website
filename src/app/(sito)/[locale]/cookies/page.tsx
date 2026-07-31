import { SiteShell } from "@/components/site";
import "@/components/site/legale.css";

/**
 * Cookie Policy — contenuto GDPR completo dal morfeushub.com originale.
 * Il TESTO non e' cambiato: solo il vestito, ora dentro SiteShell e sul
 * design system 2026 (components/site/legale.css).
 */
export default async function CookiePolicy({
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
        <h1>Cookie Policy</h1>
        <p className="leg-meta">
          {isIT ? "Ultimo aggiornamento" : "Last updated"}: 30/07/2026
        </p>
        <div className="leg-rule" />

        {/* Cosa sono i cookie */}
        <section>
          <h2>{isIT ? "Cosa Sono i Cookie" : "What Are Cookies"}</h2>
          <p>
            {isIT
              ? "I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Vengono utilizzati per migliorare l'esperienza di navigazione, memorizzare preferenze e raccogliere informazioni statistiche sull'utilizzo del sito."
              : "Cookies are small text files stored on your device when you visit a website. They are used to improve browsing experience, store preferences, and collect statistical information about site usage."}
          </p>
        </section>

        {/* Tipi di Cookie */}
        <section>
          <h2>{isIT ? "Tipi di Cookie Utilizzati" : "Types of Cookies Used"}</h2>

          <div className="leg-box">
            <div className="leg-box-head">
              <h3>{isIT ? "Cookie Funzionali (Necessari)" : "Functional Cookies (Necessary)"}</h3>
              <span className="leg-pill">{isIT ? "Sempre attivi" : "Always on"}</span>
            </div>
            <p>
              {isIT
                ? "L'archiviazione tecnica o l'accesso sono strettamente necessari al fine legittimo di consentire l'uso di un servizio specifico esplicitamente richiesto dall'abbonato o dall'utente, o al solo scopo di effettuare la trasmissione di una comunicazione su una rete di comunicazione elettronica."
                : "Technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network."}
            </p>
          </div>

          <div className="leg-box">
            <h3>{isIT ? "Cookie di Preferenze" : "Preference Cookies"}</h3>
            <p>
              {isIT
                ? "L'archiviazione tecnica o l'accesso sono necessari per lo scopo legittimo di memorizzare le preferenze che non sono richieste dall'abbonato o dall'utente."
                : "Technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user."}
            </p>
          </div>

          <div className="leg-box">
            <h3>{isIT ? "Cookie Statistici" : "Statistics Cookies"}</h3>
            <p>
              {isIT
                ? "L'archiviazione tecnica o l'accesso che viene utilizzato esclusivamente per scopi statistici. L'archiviazione tecnica o l'accesso che viene utilizzato esclusivamente per scopi statistici anonimi. Senza un mandato di comparizione, una conformità volontaria da parte del vostro Fornitore di Servizi Internet, o ulteriori registrazioni da parte di terzi, le informazioni memorizzate o recuperate per questo scopo da sole non possono di solito essere utilizzate per l'identificazione."
                : "Technical storage or access that is used exclusively for statistical purposes. Technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this purpose alone cannot usually be used to identify you."}
            </p>
          </div>

          <div className="leg-box">
            <h3>{isIT ? "Cookie di Marketing" : "Marketing Cookies"}</h3>
            <p>
              {isIT
                ? "L'archiviazione tecnica o l'accesso sono necessari per creare profili di utenti per inviare pubblicità, o per tracciare l'utente su un sito web o su diversi siti web per scopi di marketing simili."
                : "Technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes."}
            </p>
          </div>
        </section>

        {/* Google Analytics */}
        <section>
          <h2>Google Analytics</h2>
          <p>
            {isIT
              ? 'Questo sito utilizza Google Analytics, un servizio di analisi web fornito da Google Inc. ("Google"). Google Analytics utilizza i cookie per consentire al sito di analizzare come gli utenti utilizzano il sito stesso.'
              : 'This site uses Google Analytics, a web analytics service provided by Google Inc. ("Google"). Google Analytics uses cookies to enable the site to analyze how users use the site.'}
          </p>
          <p className="sec">
            {isIT
              ? "Le informazioni generate dai cookie sull'utilizzo del sito saranno trasmesse e archiviate presso i server di Google. Google potrebbe anche trasferire queste informazioni a terzi qualora ciò sia richiesto dalla legge o qualora tali terzi trattino le informazioni per conto di Google."
              : "The information generated by the cookie about your use of the website will be transmitted to and stored by Google on its servers. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf."}
          </p>
          <p className="sec">
            {isIT ? "Per maggiori informazioni sulla privacy di Google:" : "For more information about Google's privacy:"}{" "}
            <a href="http://www.google.com/intl/it/policies/privacy/" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
          </p>
        </section>

        {/* Google Remarketing */}
        <section>
          <h2>Google Remarketing</h2>
          <p>
            {isIT
              ? "Il sito utilizza la funzione di remarketing di Google per visualizzare annunci pubblicitari. Questi permettono di visualizzare annunci personalizzati in base alle visite precedenti."
              : "The site uses Google's remarketing feature to display advertisements. These allow displaying personalized ads based on previous visits."}
          </p>
          <p className="sec">
            {isIT
              ? "Google Remarketing è un servizio fornito da una terza società (Google), indipendente dal Sito. Se non si desidera ricevere pubblicità basata sugli interessi, è possibile impedire la memorizzazione dei cookie da parte di Google selezionando le relative impostazioni del proprio browser."
              : "Google Remarketing is a service provided by a third-party company (Google), independent from the Site. If you do not wish to receive interest-based advertising, you can prevent the storage of cookies by Google by selecting the appropriate settings in your browser."}
          </p>
          <p className="sec">
            {isIT ? "Disattiva gli annunci personalizzati:" : "Disable personalized ads:"}{" "}
            <a href="http://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
          </p>
        </section>

        {/* Facebook Pixel */}
        <section>
          <h2>Facebook Pixel</h2>
          <p>
            {isIT
              ? "Il Pixel di Facebook è un servizio di Facebook Inc. che consente il follow-up del comportamento degli utenti dopo aver cliccato su un annuncio di Facebook. La misura di conversione permette di misurare, analizzare e ottimizzare l'efficacia degli annunci di Facebook per scopi di ricerche statistiche e di mercato."
              : "The Facebook Pixel is a service provided by Facebook Inc. that allows follow-up of user behavior after clicking on a Facebook ad. The conversion measurement allows measuring, analyzing, and optimizing the effectiveness of Facebook ads for statistical and market research purposes."}
          </p>
          <p className="sec">
            {isIT
              ? "I dati raccolti sul Sito, con l'uso del Pixel di conversione, non permettono al Sito alcuna conclusione circa l'identità dell'utente. Tuttavia, non si può escludere che Facebook colleghi ai dati utente trasmessi altri dati individuali relativi dell'utente."
              : "The data collected on the Site using the conversion Pixel does not allow the Site to draw any conclusions about the identity of the user. However, it cannot be excluded that Facebook may link other individual user data to the transmitted user data."}
          </p>
          <p className="sec">
            {isIT ? "Privacy Policy di Facebook:" : "Facebook Privacy Policy:"}{" "}
            <a href="https://www.facebook.com/about/privacy" target="_blank" rel="noopener noreferrer">
              Facebook Privacy
            </a>
          </p>
          <p className="sec">
            {isIT ? "Revoca del consenso per Facebook:" : "Revoke consent for Facebook:"}{" "}
            <a href="https://www.facebook.com/ads/website_custom_audiences/" target="_blank" rel="noopener noreferrer">
              Facebook Ad Preferences
            </a>
          </p>
        </section>

        {/* Brevo */}
        <section>
          <h2>Brevo</h2>
          <p>
            {isIT
              ? "Questo sito utilizza Brevo (Brevo SAS), una piattaforma di email marketing e marketing automation, per la gestione della mailing list e delle comunicazioni con gli utenti. Brevo può utilizzare cookie e tecnologie simili per tracciare l'apertura delle email, l'interazione con i contenuti e il comportamento di navigazione a fini di marketing automation."
              : "This site uses Brevo (Brevo SAS), an email marketing and marketing automation platform, to manage the mailing list and communications with users. Brevo may use cookies and similar technologies to track email opens, content interaction, and browsing behavior for marketing automation purposes."}
          </p>
          <p className="sec">
            {isIT
              ? "I dati raccolti sono trattati da Brevo in qualità di responsabile del trattamento per conto del Titolare, nel rispetto del GDPR."
              : "The data collected is processed by Brevo as a data processor on behalf of the Controller, in compliance with the GDPR."}
          </p>
          <p className="sec">
            {isIT ? "Privacy Policy di Brevo:" : "Brevo Privacy Policy:"}{" "}
            <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">
              brevo.com/legal/privacypolicy
            </a>
          </p>
        </section>

        {/* Come gestire i cookie */}
        <section>
          <h2>{isIT ? "Come Gestire i Cookie" : "How to Manage Cookies"}</h2>
          <p>
            {isIT
              ? "Puoi gestire le tue preferenze sui cookie in diversi modi:"
              : "You can manage your cookie preferences in several ways:"}
          </p>
          <ul>
            <li>
              {isIT
                ? "Tramite il banner di consenso che appare alla prima visita"
                : "Through the consent banner that appears on first visit"}
            </li>
            <li>{isIT ? "Modificando le impostazioni del tuo browser" : "By changing your browser settings"}</li>
            <li>{isIT ? "Utilizzando i link di opt-out forniti sopra" : "Using the opt-out links provided above"}</li>
          </ul>
        </section>

        {/* Opt-out links */}
        <section>
          <h2>{isIT ? "Link per Opt-Out" : "Opt-Out Links"}</h2>
          <p>
            {isIT
              ? "Puoi consultare i seguenti siti per comprendere e gestire le preferenze di tracciamento:"
              : "You can consult the following sites to understand and manage tracking preferences:"}
          </p>
          <ul>
            <li>
              <strong>YourOnlineChoices (EU):</strong>{" "}
              <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
                youronlinechoices.eu
              </a>
            </li>
            <li>
              <strong>Network Advertising Initiative (USA):</strong>{" "}
              <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">
                networkadvertising.org
              </a>
            </li>
            <li>
              <strong>Digital Advertising Alliance (USA):</strong>{" "}
              <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>
            </li>
            <li>
              <strong>DAAC (Canada):</strong>{" "}
              <a href="http://youradchoices.ca/choices/" target="_blank" rel="noopener noreferrer">
                youradchoices.ca
              </a>
            </li>
          </ul>
        </section>

        {/* Contatti */}
        <section>
          <h2>{isIT ? "Contatti" : "Contact"}</h2>
          <p>
            {isIT ? "Per domande sulla nostra Cookie Policy, contattaci a:" : "For questions about our Cookie Policy, contact us at:"}{" "}
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
