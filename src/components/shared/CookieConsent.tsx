"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GDPR-Compliant Cookie Consent Banner
 * 
 * Features:
 * - Appears on first visit, blocks until user makes a choice
 * - Stores consent in localStorage
 * - Supports Accept All, Reject All, and Customize options
 * - European GDPR compliant with granular consent
 */

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = "morfeus_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365;

/* Il viola e' quello che Matt approva sul "We value your privacy", ma
   preso dal brand invece che a mano: #533dfc e' la firma majorelle del
   sito, praticamente identico al #4D39EB di prima. Stesso look, un
   colore solo in tutto il sito. */
const VIOLA = "#533dfc";

/* Il banner era solo in inglese su un sito italiano. Testo per lingua:
   la lingua la sa gia' dal path (vedi sotto), qui restano le parole. */
const COPY = {
  it: {
    titolo: "Rispettiamo la tua privacy",
    testo:
      'Usiamo i cookie per migliorare la navigazione, analizzare il traffico e personalizzare i contenuti. Cliccando "Accetta tutti" acconsenti all\'uso dei cookie.',
    accetta: "Accetta tutti",
    rifiuta: "Rifiuta tutti",
    personalizza: "Personalizza",
    salva: "Salva le preferenze",
    indietro: "Indietro",
    sempreAttivi: "Sempre attivi",
    necessariT: "Cookie necessari",
    necessariD: "Indispensabili al funzionamento del sito",
    analyticsT: "Cookie analitici",
    analyticsD: "Ci aiutano a capire come le persone usano il sito",
    marketingT: "Cookie di marketing",
    marketingD: "Servono a mostrare annunci personalizzati",
    leggi: "Leggi la nostra",
    e: "e la",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
  en: {
    titolo: "We value your privacy",
    testo:
      'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
    accetta: "Accept All",
    rifiuta: "Reject All",
    personalizza: "Customize",
    salva: "Save Preferences",
    indietro: "Back",
    sempreAttivi: "Always On",
    necessariT: "Necessary Cookies",
    necessariD: "Required for the website to function properly",
    analyticsT: "Analytics Cookies",
    analyticsD: "Help us understand how visitors interact with our site",
    marketingT: "Marketing Cookies",
    marketingD: "Used to deliver personalized advertisements",
    leggi: "Read our",
    e: "and",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
} as const;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export function CookieConsent() {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];
  const locale = firstSegment === "it" || firstSegment === "en" ? firstSegment : "en";
  const t = COPY[locale];
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  // Check if consent was already given
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed: CookiePreferences = JSON.parse(stored);
        const expiryTime = parsed.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        
        // If consent is still valid, don't show banner
        if (Date.now() < expiryTime) {
          setIsVisible(false);
          // Still push to dataLayer for tags that need it on every page load
          updateDataLayer(parsed);
          return;
        }
      } catch {
        // Invalid stored data, show banner
      }
    }
    
    // Small delay for smoother page load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateDataLayer = (prefs: CookiePreferences) => {
    if (typeof window === "undefined") return;

    const consentUpdate = {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
    };

    // Update Google Consent Mode
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", consentUpdate);
    }

    // Push custom event for GTM triggers
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookie_consent_update",
      consent_preferences: {
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        necessary: prefs.necessary,
      },
      ...consentUpdate,
    });
  };

  const saveConsent = (prefs: CookiePreferences) => {
    const toSave = { ...prefs, timestamp: Date.now() };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn("[Cookie Consent] Could not save preferences to localStorage:", e);
    }
    setIsVisible(false);
    
    // Update DataLayer and Consent Mode
    updateDataLayer(toSave);
    
    if (prefs.analytics) {
      console.log("[Cookie Consent] Analytics enabled");
    }
    if (prefs.marketing) {
      console.log("[Cookie Consent] Marketing enabled");
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center sm:items-end justify-center p-4 sm:p-6 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto z-0"
        onClick={() => {}} // Prevent closing by clicking backdrop (GDPR requires explicit choice)
      />
      
      {/* Banner */}
      <div className="relative w-full max-w-2xl bg-[#100e1c] border border-white/12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] pointer-events-auto overflow-hidden animate-fadeIn z-10">
        {/* Gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${VIOLA}, transparent)` }}
        />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${VIOLA}26` }}
            >
              <svg className="w-6 h-6" style={{ color: VIOLA }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t.titolo}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed px-2 sm:px-0">
                {t.testo}
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="mb-6 p-4 bg-white/2 rounded-xl border border-white/8 space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{t.necessariT}</p>
                  <p className="text-xs text-slate-500">{t.necessariD}</p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0"
                  style={{ background: `${VIOLA}26`, color: VIOLA }}
                >
                  {t.sempreAttivi}
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{t.analyticsT}</p>
                  <p className="text-xs text-slate-500">{t.analyticsD}</p>
                </div>
                <button
                  aria-label={t.analyticsT}
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className="relative w-12 h-6 rounded-full transition-colors shrink-0"
                  style={{ background: preferences.analytics ? VIOLA : "rgba(255,255,255,0.1)" }}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    preferences.analytics ? "left-7" : "left-1"
                  }`} />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{t.marketingT}</p>
                  <p className="text-xs text-slate-500">{t.marketingD}</p>
                </div>
                <button
                  aria-label={t.marketingT}
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className="relative w-12 h-6 rounded-full transition-colors shrink-0"
                  style={{ background: preferences.marketing ? VIOLA : "rgba(255,255,255,0.1)" }}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    preferences.marketing ? "left-7" : "left-1"
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {showDetails ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="w-full sm:flex-1 h-14 text-white text-[15px] font-semibold rounded-xl transition-all"
                  style={{ background: VIOLA }}
                >
                  {t.salva}
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full sm:flex-1 h-14 bg-white/5 border border-white/10 text-white text-[15px] font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  {t.indietro}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="w-full h-14 text-white text-[15px] font-semibold rounded-xl transition-all"
                  style={{ background: VIOLA, boxShadow: `0 10px 30px ${VIOLA}33` }}
                >
                  {t.accetta}
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="w-full sm:flex-1 h-14 bg-white/5 border border-white/10 text-white text-[15px] font-medium rounded-xl hover:bg-white/10 transition-all"
                  >
                    {t.rifiuta}
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="w-full sm:flex-1 h-14 bg-transparent border border-white/10 text-slate-400 text-[15px] font-medium rounded-xl hover:text-white hover:border-white/20 transition-all"
                  >
                    {t.personalizza}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Privacy Policy Link */}
          <p className="mt-4 text-center text-xs text-slate-500">
            {t.leggi}{" "}
            <a href={`/${locale}/privacy`} className="hover:underline" style={{ color: VIOLA }}>
              {t.privacy}
            </a>
            {" "}{t.e}{" "}
            <a href={`/${locale}/cookies`} className="hover:underline" style={{ color: VIOLA }}>
              {t.cookie}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

