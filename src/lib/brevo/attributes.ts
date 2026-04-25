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
  TELEFONO: "TELEFONO_", // trailing underscore is intentional (matches Brevo)
  WHATSAPP: "WHATSAPP",
  LANDLINE_NUMBER: "LANDLINE_NUMBER",
  SMS: "SMS",
  LINKEDIN: "LINKEDIN",

  // Professional context
  AZIENDA: "AZIENDA",
  JOB_TITLE: "JOB_TITLE",
  NUMERO_DIPENDENTI: "NUMERO_DIPENDENTI",
  BIO: "BIO",

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
