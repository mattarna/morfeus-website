"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

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

export function CookieConsent() {
  const locale = useLocale();
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

  const saveConsent = (prefs: CookiePreferences) => {
    const toSave = { ...prefs, timestamp: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(toSave));
    setIsVisible(false);
    
    // Here you would initialize analytics based on consent
    if (prefs.analytics) {
      // Initialize Google Analytics, etc.
      console.log("[Cookie Consent] Analytics enabled");
    }
    if (prefs.marketing) {
      // Initialize marketing pixels
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
    <div className="fixed inset-0 z-[999] flex items-end justify-center p-4 sm:p-6 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={() => {}} // Prevent closing by clicking backdrop (GDPR requires explicit choice)
      />
      
      {/* Banner */}
      <div className="relative w-full max-w-2xl bg-[#0a0a12] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4D39EB] to-transparent" />
        
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4D39EB]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#4D39EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                We value your privacy
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/5 space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Necessary Cookies</p>
                  <p className="text-xs text-slate-500">Required for the website to function properly</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#4D39EB]/20 text-[10px] font-semibold text-[#4D39EB] uppercase tracking-wider">
                  Always On
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Analytics Cookies</p>
                  <p className="text-xs text-slate-500">Help us understand how visitors interact with our site</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    preferences.analytics ? "bg-[#4D39EB]" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    preferences.analytics ? "left-7" : "left-1"
                  }`} />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Marketing Cookies</p>
                  <p className="text-xs text-slate-500">Used to deliver personalized advertisements</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    preferences.marketing ? "bg-[#4D39EB]" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    preferences.marketing ? "left-7" : "left-1"
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showDetails ? (
              <>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 h-12 bg-[#4D39EB] text-white text-sm font-semibold rounded-xl hover:bg-[#5d4af7] transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 h-12 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 h-12 bg-[#4D39EB] text-white text-sm font-semibold rounded-xl hover:bg-[#5d4af7] transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 h-12 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 h-12 bg-transparent border border-white/10 text-slate-400 text-sm font-medium rounded-xl hover:text-white hover:border-white/20 transition-colors"
                >
                  Customize
                </button>
              </>
            )}
          </div>

          {/* Privacy Policy Link */}
          <p className="mt-4 text-center text-xs text-slate-500">
            Read our{" "}
            <a 
              href={`/${locale}/privacy`}
              className="text-[#4D39EB] hover:underline"
            >
              Privacy Policy
            </a>
            {" "}and{" "}
            <a 
              href={`/${locale}/cookies`}
              className="text-[#4D39EB] hover:underline"
            >
              Cookie Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

