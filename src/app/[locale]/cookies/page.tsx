"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * Cookie Policy Page - COMPLETE VERSION
 * Full GDPR-compliant cookie policy based on original morfeushub.com content
 */
export default function CookiePolicy() {
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
          Cookie Policy
        </h1>
        <p className="text-slate-500 text-sm mb-12">
          {isIT ? "Ultimo aggiornamento" : "Last updated"}: 06/09/2024
        </p>

        <div className="prose prose-invert prose-slate max-w-none space-y-10 text-[15px] leading-relaxed">
          
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isIT ? "Cosa Sono i Cookie" : "What Are Cookies"}
            </h2>
            <p className="text-slate-300">
              {isIT 
                ? "I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Vengono utilizzati per migliorare l'esperienza di navigazione, memorizzare preferenze e raccogliere informazioni statistiche sull'utilizzo del sito."
                : "Cookies are small text files stored on your device when you visit a website. They are used to improve browsing experience, store preferences, and collect statistical information about site usage."}
            </p>
          </section>

          {/* Tipi di Cookie */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {isIT ? "Tipi di Cookie Utilizzati" : "Types of Cookies Used"}
            </h2>

            {/* Necessary */}
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {isIT ? "Cookie Funzionali (Necessari)" : "Functional Cookies (Necessary)"}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#4D39EB]/20 text-[10px] font-semibold text-[#4D39EB] uppercase">
                  {isIT ? "Sempre attivi" : "Always on"}
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                {isIT 
                  ? "L'archiviazione tecnica o l'accesso sono strettamente necessari al fine legittimo di consentire l'uso di un servizio specifico esplicitamente richiesto dall'abbonato o dall'utente, o al solo scopo di effettuare la trasmissione di una comunicazione su una rete di comunicazione elettronica."
                  : "Technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network."}
              </p>
            </div>

            {/* Preferences */}
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                {isIT ? "Cookie di Preferenze" : "Preference Cookies"}
              </h3>
              <p className="text-slate-400 text-sm">
                {isIT 
                  ? "L'archiviazione tecnica o l'accesso sono necessari per lo scopo legittimo di memorizzare le preferenze che non sono richieste dall'abbonato o dall'utente."
                  : "Technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user."}
              </p>
            </div>

            {/* Statistics */}
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                {isIT ? "Cookie Statistici" : "Statistics Cookies"}
              </h3>
              <p className="text-slate-400 text-sm">
                {isIT 
                  ? "L'archiviazione tecnica o l'accesso che viene utilizzato esclusivamente per scopi statistici. L'archiviazione tecnica o l'accesso che viene utilizzato esclusivamente per scopi statistici anonimi. Senza un mandato di comparizione, una conformità volontaria da parte del vostro Fornitore di Servizi Internet, o ulteriori registrazioni da parte di terzi, le informazioni memorizzate o recuperate per questo scopo da sole non possono di solito essere utilizzate per l'identificazione."
                  : "Technical storage or access that is used exclusively for statistical purposes. Technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this purpose alone cannot usually be used to identify you."}
              </p>
            </div>

            {/* Marketing */}
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {isIT ? "Cookie di Marketing" : "Marketing Cookies"}
              </h3>
              <p className="text-slate-400 text-sm">
                {isIT 
                  ? "L'archiviazione tecnica o l'accesso sono necessari per creare profili di utenti per inviare pubblicità, o per tracciare l'utente su un sito web o su diversi siti web per scopi di marketing simili."
                  : "Technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes."}
              </p>
            </div>
          </section>

          {/* Google Analytics */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Google Analytics
            </h2>
            <p className="text-slate-300">
              {isIT 
                ? "Questo sito utilizza Google Analytics, un servizio di analisi web fornito da Google Inc. (\"Google\"). Google Analytics utilizza i cookie per consentire al sito di analizzare come gli utenti utilizzano il sito stesso."
                : "This site uses Google Analytics, a web analytics service provided by Google Inc. (\"Google\"). Google Analytics uses cookies to enable the site to analyze how users use the site."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT 
                ? "Le informazioni generate dai cookie sull'utilizzo del sito saranno trasmesse e archiviate presso i server di Google. Google potrebbe anche trasferire queste informazioni a terzi qualora ciò sia richiesto dalla legge o qualora tali terzi trattino le informazioni per conto di Google."
                : "The information generated by the cookie about your use of the website will be transmitted to and stored by Google on its servers. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT 
                ? "Per maggiori informazioni sulla privacy di Google:"
                : "For more information about Google's privacy:"}{" "}
              <a href="http://www.google.com/intl/it/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                Google Privacy Policy
              </a>
            </p>
          </section>

          {/* Google Remarketing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Google Remarketing
            </h2>
            <p className="text-slate-300">
              {isIT 
                ? "Il sito utilizza la funzione di remarketing di Google per visualizzare annunci pubblicitari. Questi permettono di visualizzare annunci personalizzati in base alle visite precedenti."
                : "The site uses Google's remarketing feature to display advertisements. These allow displaying personalized ads based on previous visits."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT 
                ? "Google Remarketing è un servizio fornito da una terza società (Google), indipendente dal Sito. Se non si desidera ricevere pubblicità basata sugli interessi, è possibile impedire la memorizzazione dei cookie da parte di Google selezionando le relative impostazioni del proprio browser."
                : "Google Remarketing is a service provided by a third-party company (Google), independent from the Site. If you do not wish to receive interest-based advertising, you can prevent the storage of cookies by Google by selecting the appropriate settings in your browser."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT ? "Disattiva gli annunci personalizzati:" : "Disable personalized ads:"}{" "}
              <a href="http://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                Google Ads Settings
              </a>
            </p>
          </section>

          {/* Facebook Pixel */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Facebook Pixel
            </h2>
            <p className="text-slate-300">
              {isIT 
                ? "Il Pixel di Facebook è un servizio di Facebook Inc. che consente il follow-up del comportamento degli utenti dopo aver cliccato su un annuncio di Facebook. La misura di conversione permette di misurare, analizzare e ottimizzare l'efficacia degli annunci di Facebook per scopi di ricerche statistiche e di mercato."
                : "The Facebook Pixel is a service provided by Facebook Inc. that allows follow-up of user behavior after clicking on a Facebook ad. The conversion measurement allows measuring, analyzing, and optimizing the effectiveness of Facebook ads for statistical and market research purposes."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT 
                ? "I dati raccolti sul Sito, con l'uso del Pixel di conversione, non permettono al Sito alcuna conclusione circa l'identità dell'utente. Tuttavia, non si può escludere che Facebook colleghi ai dati utente trasmessi altri dati individuali relativi dell'utente."
                : "The data collected on the Site using the conversion Pixel does not allow the Site to draw any conclusions about the identity of the user. However, it cannot be excluded that Facebook may link other individual user data to the transmitted user data."}
            </p>
            <p className="text-slate-400 mt-4">
              {isIT ? "Privacy Policy di Facebook:" : "Facebook Privacy Policy:"}{" "}
              <a href="https://www.facebook.com/about/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                Facebook Privacy
              </a>
            </p>
            <p className="text-slate-400 mt-2">
              {isIT ? "Revoca del consenso per Facebook:" : "Revoke consent for Facebook:"}{" "}
              <a href="https://www.facebook.com/ads/website_custom_audiences/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                Facebook Ad Preferences
              </a>
            </p>
          </section>

          {/* Come gestire i cookie */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isIT ? "Come Gestire i Cookie" : "How to Manage Cookies"}
            </h2>
            <p className="text-slate-300 mb-4">
              {isIT 
                ? "Puoi gestire le tue preferenze sui cookie in diversi modi:"
                : "You can manage your cookie preferences in several ways:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>{isIT ? "Tramite il banner di consenso che appare alla prima visita" : "Through the consent banner that appears on first visit"}</li>
              <li>{isIT ? "Modificando le impostazioni del tuo browser" : "By changing your browser settings"}</li>
              <li>{isIT ? "Utilizzando i link di opt-out forniti sopra" : "Using the opt-out links provided above"}</li>
            </ul>
          </section>

          {/* Opt-out links */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isIT ? "Link per Opt-Out" : "Opt-Out Links"}
            </h2>
            <p className="text-slate-300 mb-4">
              {isIT 
                ? "Puoi consultare i seguenti siti per comprendere e gestire le preferenze di tracciamento:"
                : "You can consult the following sites to understand and manage tracking preferences:"}
            </p>
            <ul className="space-y-3 text-slate-400">
              <li>
                <strong className="text-white">YourOnlineChoices (EU):</strong>{" "}
                <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                  youronlinechoices.eu
                </a>
              </li>
              <li>
                <strong className="text-white">Network Advertising Initiative (USA):</strong>{" "}
                <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                  networkadvertising.org
                </a>
              </li>
              <li>
                <strong className="text-white">Digital Advertising Alliance (USA):</strong>{" "}
                <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                  aboutads.info
                </a>
              </li>
              <li>
                <strong className="text-white">DAAC (Canada):</strong>{" "}
                <a href="http://youradchoices.ca/choices/" target="_blank" rel="noopener noreferrer" className="text-[#4D39EB] hover:underline">
                  youradchoices.ca
                </a>
              </li>
            </ul>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              {isIT ? "Contatti" : "Contact"}
            </h2>
            <p className="text-slate-300">
              {isIT 
                ? "Per domande sulla nostra Cookie Policy, contattaci a:"
                : "For questions about our Cookie Policy, contact us at:"}{" "}
              <a href="mailto:hello@morfeushub.com" className="text-[#4D39EB] hover:underline">hello@morfeushub.com</a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Morfeus (NUMANITY S.R.L.). {isIT ? "Tutti i diritti riservati." : "All rights reserved."}
          </p>
        </div>
      </div>
    </main>
  );
}
