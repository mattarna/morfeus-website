/**
 * Brevo list IDs and the env vars that hold them.
 *
 * IDs are read at runtime from env vars (configured in Vercel) so we can swap
 * accounts (dev vs prod) without code changes. The mapping below is the
 * canonical reference between env var name and list semantics.
 *
 * Full reference: see docs/brevo.md
 */

export const BREVO_LIST_ENV = {
  WEBINAR_CLAUDE_5MAG: "BREVO_WEBINAR_LIST_ID", // dashboard ID: 54
  FREEBIE_COWORK_SETUP_SKILL: "BREVO_FREEBIE_SKILL_LIST_ID", // dashboard ID: 56
  FREEBIE_INSTAGRAM_CAROUSEL_SKILLS: "BREVO_FREEBIE_INSTAGRAM_CAROUSEL_LIST_ID", // dashboard ID: 57
  FREEBIE_DESIGN_SYSTEM_BLUEPRINT: "BREVO_FREEBIE_DESIGN_SYSTEM_LIST_ID", // dashboard ID: 61
} as const;

export type BrevoListEnvKey = keyof typeof BREVO_LIST_ENV;

export function getBrevoListId(key: BrevoListEnvKey): number | undefined {
  const raw = process.env[BREVO_LIST_ENV[key]];
  if (!raw) return undefined;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
