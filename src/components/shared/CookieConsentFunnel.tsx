"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GDPR cookie banner — funnel variant.
 *
 * Same behavior as `CookieConsent` (writes the same `morfeus_cookie_consent`
 * localStorage key and pushes the same Consent Mode v2 update), but styled to
 * match the dark + orange/violet aesthetic of the funnel pages
 * (webinar-claude, cowork-setup-creator, claude-skill-anatomy).
 *
 * Renders as a non-blocking bottom bar so it does not interrupt the
 * conversion flow; users still have to make an explicit choice before
 * analytics/marketing storage moves from "denied" to "granted".
 */

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = "morfeus_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365;

const COLORS = {
  orange: "#EB7A2E",
  orangeHover: "#F09A5C",
  orangePressed: "#D4652A",
  violet: "#7B68EE",
  deepSpace: "#0F0E1A",
  dusk: "#1A1535",
  ghost: "#E4E7F0",
  muted: "#9B9BB0",
  hairline: "rgba(255,255,255,0.08)",
};

const FONT_BODY = "'Satoshi', 'Inter', system-ui, sans-serif";

export function CookieConsentFunnel() {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];
  // Funnels are IT-first; only override if the URL explicitly says otherwise
  const locale = firstSegment === "en" ? "en" : "it";

  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  });
  const [hoverAccept, setHoverAccept] = useState(false);
  const [hoverReject, setHoverReject] = useState(false);
  const [hoverCustomize, setHoverCustomize] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed: CookiePreferences = JSON.parse(stored);
        const expiryTime = parsed.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (Date.now() < expiryTime) {
          setIsVisible(false);
          updateDataLayer(parsed);
          return;
        }
      } catch {
        // fall through and show banner
      }
    }
    const timer = setTimeout(() => setIsVisible(true), 800);
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

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", consentUpdate);
    }

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
    updateDataLayer(toSave);
  };

  const handleAcceptAll = () =>
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });

  const handleRejectAll = () =>
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });

  const handleSavePreferences = () => saveConsent(preferences);

  if (!isVisible) return null;

  const t = locale === "it"
    ? {
        title: "Cookie & privacy",
        body:
          "Usiamo cookie tecnici sempre attivi e, con il tuo consenso, cookie di analisi e marketing per migliorare il funnel e le campagne.",
        accept: "Accetta tutti",
        reject: "Rifiuta",
        customize: "Personalizza",
        save: "Salva preferenze",
        back: "Indietro",
        necessary: "Cookie necessari",
        necessaryHint: "Richiesti per il corretto funzionamento del funnel.",
        always: "Sempre attivi",
        analytics: "Analitici",
        analyticsHint: "Ci aiutano a capire come visitatori interagiscono con il funnel.",
        marketing: "Marketing",
        marketingHint: "Misurano l'efficacia delle campagne pubblicitarie.",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        and: "e",
      }
    : {
        title: "Cookies & privacy",
        body:
          "We use strictly necessary cookies and, with your consent, analytics and marketing cookies to improve the funnel and our campaigns.",
        accept: "Accept all",
        reject: "Reject",
        customize: "Customize",
        save: "Save preferences",
        back: "Back",
        necessary: "Necessary cookies",
        necessaryHint: "Required for the funnel to work properly.",
        always: "Always on",
        analytics: "Analytics",
        analyticsHint: "Help us understand how visitors interact with the funnel.",
        marketing: "Marketing",
        marketingHint: "Measure the performance of our ad campaigns.",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        and: "and",
      };

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        position: "relative",
        width: 44,
        height: 24,
        borderRadius: 999,
        border: `1px solid ${on ? COLORS.orange : COLORS.hairline}`,
        background: on ? "rgba(235,122,46,0.25)" : "rgba(255,255,255,0.04)",
        cursor: "pointer",
        transition: "background .2s, border-color .2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 22 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: on ? COLORS.orange : "#fff",
          boxShadow: on ? "0 0 8px rgba(235,122,46,0.6)" : "0 1px 3px rgba(0,0,0,0.4)",
          transition: "left .2s, background .2s",
        }}
      />
    </button>
  );

  return (
    <div
      role="dialog"
      aria-label={t.title}
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        fontFamily: FONT_BODY,
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 720,
          background: `linear-gradient(180deg, ${COLORS.deepSpace} 0%, ${COLORS.dusk} 100%)`,
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 16,
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,104,238,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: "20px 22px",
          color: COLORS.ghost,
          position: "relative",
          overflow: "hidden",
          animation: "reveal-in .4s ease-out both",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.orange}, ${COLORS.violet}, transparent)`,
            opacity: 0.6,
          }}
        />

        {!showDetails ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: COLORS.orange,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: COLORS.orange,
                    boxShadow: "0 0 8px rgba(235,122,46,0.6)",
                  }}
                />
                {t.title}
              </span>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: COLORS.muted,
                  margin: 0,
                  maxWidth: 620,
                }}
              >
                {t.body}{" "}
                <a
                  href={`/${locale}/privacy`}
                  style={{ color: COLORS.ghost, textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  {t.privacy}
                </a>{" "}
                {t.and}{" "}
                <a
                  href={`/${locale}/cookies`}
                  style={{ color: COLORS.ghost, textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  {t.cookies}
                </a>
                .
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={handleAcceptAll}
                onMouseEnter={() => setHoverAccept(true)}
                onMouseLeave={() => setHoverAccept(false)}
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "12px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: hoverAccept ? COLORS.orangeHover : COLORS.orange,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: hoverAccept
                    ? "0 6px 24px rgba(235,122,46,0.5)"
                    : "0 4px 18px rgba(235,122,46,0.35)",
                  transition: "background .2s, box-shadow .2s",
                }}
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                onMouseEnter={() => setHoverReject(true)}
                onMouseLeave={() => setHoverReject(false)}
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "12px 20px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.hairline}`,
                  background: hoverReject ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                  color: COLORS.ghost,
                  cursor: "pointer",
                  transition: "background .2s",
                }}
              >
                {t.reject}
              </button>
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                onMouseEnter={() => setHoverCustomize(true)}
                onMouseLeave={() => setHoverCustomize(false)}
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  fontSize: 13,
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: "transparent",
                  color: hoverCustomize ? COLORS.ghost : COLORS.muted,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  transition: "color .2s",
                }}
              >
                {t.customize}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: COLORS.orange,
              }}
            >
              {t.customize}
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Necessary */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${COLORS.hairline}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ghost }}>{t.necessary}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{t.necessaryHint}</div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: COLORS.orange,
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(235,122,46,0.12)",
                    border: "1px solid rgba(235,122,46,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.always}
                </span>
              </div>

              {/* Analytics */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${COLORS.hairline}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ghost }}>{t.analytics}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{t.analyticsHint}</div>
                </div>
                <Toggle
                  on={preferences.analytics}
                  onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                />
              </div>

              {/* Marketing */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${COLORS.hairline}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ghost }}>{t.marketing}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{t.marketingHint}</div>
                </div>
                <Toggle
                  on={preferences.marketing}
                  onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleSavePreferences}
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "12px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: COLORS.orange,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(235,122,46,0.35)",
                }}
              >
                {t.save}
              </button>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "12px 20px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.hairline}`,
                  background: "rgba(255,255,255,0.02)",
                  color: COLORS.ghost,
                  cursor: "pointer",
                }}
              >
                {t.back}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes reveal-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
