"use client";

import { useEffect, useState } from "react";
import styles from "./sections.module.css";

const SHARE_URL = "https://morfeushub.com/playbook-imprenditore-milionario";
const SHARE_TEXT =
  "Ho scaricato il playbook di Infobusiness Milionario: tutto quello detto sul palco trasformato in moduli pronti da caricare nel tuo Claude. Tieni:";
const SHARE_FULL = `${SHARE_TEXT} ${SHARE_URL}`;

const enc = encodeURIComponent;

const WHATSAPP_HREF = `https://wa.me/?text=${enc(SHARE_FULL)}`;
const TELEGRAM_HREF = `https://t.me/share/url?url=${enc(SHARE_URL)}&text=${enc(SHARE_TEXT)}`;
const EMAIL_HREF = `mailto:?subject=${enc("Playbook Infobusiness Milionario")}&body=${enc(SHARE_FULL)}`;
const X_HREF = `https://x.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(SHARE_URL)}`;
const LINKEDIN_HREF = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(SHARE_URL)}`;

export function SharePill() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  async function handlePillClick() {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Playbook Infobusiness Milionario",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      } catch {
        // user dismissed native share or unsupported, fall through to popover
      }
    }
    setOpen(true);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.sharePill}
        onClick={handlePillClick}
        aria-label="Condividi il playbook"
      >
        <span className={styles.sharePillIcon} aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </span>
        <span className={styles.sharePillLabel}>Condividi</span>
        <span className={styles.sharePillBadge} aria-hidden>+</span>
      </button>

      {open && (
        <div
          className={styles.shareBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className={styles.shareModal}>
            <button
              type="button"
              className={styles.shareModalClose}
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <p className={styles.shareModalKicker}>Manda il playbook a un amico</p>
            <h3 id="share-modal-title" className={styles.shareModalTitle}>
              Conosci qualcuno a cui <span className={styles.accent}>servirebbe?</span>
            </h3>
            <p className={styles.shareModalLead}>
              11 speaker, 80+ azioni, 25+ framework. Lui ringrazia. Tu fai una cosa buona.
            </p>

            <div className={styles.shareOptions}>
              <a className={styles.shareOption} href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" data-channel="whatsapp">
                <span className={styles.shareOptionIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <span>WhatsApp</span>
              </a>
              <a className={styles.shareOption} href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" data-channel="telegram">
                <span className={styles.shareOptionIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </span>
                <span>Telegram</span>
              </a>
              <a className={styles.shareOption} href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer" data-channel="linkedin">
                <span className={styles.shareOptionIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </span>
                <span>LinkedIn</span>
              </a>
              <a className={styles.shareOption} href={X_HREF} target="_blank" rel="noopener noreferrer" data-channel="x">
                <span className={styles.shareOptionIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                <span>X</span>
              </a>
              <a className={styles.shareOption} href={EMAIL_HREF} data-channel="email">
                <span className={styles.shareOptionIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <span>Email</span>
              </a>
            </div>

            <button type="button" className={styles.shareCopyButton} onClick={handleCopy} data-copied={copied}>
              <span className={styles.shareCopyIcon} aria-hidden>
                {copied ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </span>
              <span className={styles.shareCopyLabel}>{copied ? "Link copiato" : "Copia il link"}</span>
              <span className={styles.shareCopyUrl}>{SHARE_URL.replace("https://", "")}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
