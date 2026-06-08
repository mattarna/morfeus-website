/**
 * Brevo contact attributes — single source of truth.
 *
 * Always import from here when calling the Brevo API. Never use raw string
 * literals for attribute names: typos silently write data to the wrong field.
 *
 * Full reference (system fields, custom fields, automations, lists):
 * see docs/brevo.md
 */

export const BREVO_ATTR = {
  // Identity (custom fields, italian)
  NOME: "NOME",
  COGNOME: "COGNOME",

  // Contact channels
  // ⚠️ REGOLA TELEFONO: per il numero di telefono raccolto dagli utenti usa SEMPRE
  // TELEFONO (→ "TELEFONO_"). È un campo Testo libero: accetta qualsiasi formato e
  // NON fa mai fallire l'optin. NON usare SMS/WHATSAPP/LANDLINE_NUMBER per l'input
  // utente: i campi nativi SMS/WhatsApp validano il formato (E.164) e possono
  // rifiutare l'intero contatto. Normalizza a +39… quando puoi.
  TELEFONO: "TELEFONO_", // underscore finale intenzionale (matches Brevo)
  WHATSAPP: "WHATSAPP", // ⚠️ non per input utente diretto — vedi REGOLA TELEFONO sopra
  LANDLINE_NUMBER: "LANDLINE_NUMBER",
  SMS: "SMS", // ⚠️ non per input utente diretto — vedi REGOLA TELEFONO sopra
  LINKEDIN: "LINKEDIN",

  // Professional context
  AZIENDA: "AZIENDA",
  JOB_TITLE: "JOB_TITLE",
  NUMERO_DIPENDENTI: "NUMERO_DIPENDENTI",
  BIO: "BIO",

  // Formazione finanziata 2026 (boolean custom fields)
  P_IVA_LOMBARDIA: "P_IVA_LOMBARDIA", // boolean: ha P.IVA / azienda con sede in Lombardia
  SEI_AZIENDA: "SEI_AZIENDA", // boolean: true = azienda, false = libero professionista

  // Acquisition / lifecycle
  FORM_NAME: "FORM_NAME",
  REFERRAL_NAME: "REFERRAL_NAME",
  WS_DAY: "WS_DAY",
  DATA_ENTRATA: "DATA_ENTRATA",
  CREATED_AT: "CREATED_AT",
  OPT_IN: "OPT_IN",
  DOUBLE_OPT_IN: "DOUBLE_OPT-IN", // hyphen is intentional (matches Brevo)
  ACTIVE_STATUS: "ACTIVE_STATUS",

  // System
  EXT_ID: "EXT_ID",
  CONTACT_TIMEZONE: "CONTACT_TIMEZONE",
} as const;

export type BrevoAttrKey = keyof typeof BREVO_ATTR;
