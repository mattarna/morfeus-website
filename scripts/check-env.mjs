// Verifica la presenza delle env richieste (Brevo/Meta).
// Legge process.env + (best-effort) .env.local / .env, senza dipendenze.
// Default: warning. Con --strict: esce 1 se manca una env required.
import { readFile } from "node:fs/promises";
import path from "node:path";

const strict = process.argv.includes("--strict");
const root = process.cwd();

// Almeno UNA di queste deve essere presente (API key Brevo, con fallback).
const REQUIRED_ANY = [["BREVO_API_KEY_V2", "BREVO_API_KEY"]];

// Tutte richieste (liste dei funnel attivi).
const REQUIRED = [
  "BREVO_WEBINAR_LIST_ID",
  "BREVO_FREEBIE_SKILL_LIST_ID",
  "BREVO_FREEBIE_INSTAGRAM_CAROUSEL_LIST_ID",
  "BREVO_FREEBIE_DESIGN_SYSTEM_LIST_ID",
  "BREVO_FREEBIE_AI_FUNDAMENTALS_LIST_ID",
  "BREVO_FREEBIE_PLAN_SOLVE_LIST_ID",
];

// Consigliate ma non bloccanti.
const OPTIONAL = [
  "BREVO_NEXT_WEBINAR_LIST_ID",
  "BREVO_PLAYBOOK_INFOBIZ_LIST_ID",
  "BREVO_FORMAZIONE_FINANZIATA_LIST_ID",
  "NEXT_PUBLIC_META_PIXEL_ID",
];

async function loadDotenv(file) {
  try {
    const raw = await readFile(path.join(root, file), "utf8");
    const out = {};
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[2] !== "") out[m[1]] = m[2];
    }
    return out;
  } catch {
    return {};
  }
}

async function main() {
  const local = { ...(await loadDotenv(".env")), ...(await loadDotenv(".env.local")) };
  const has = (k) => Boolean(process.env[k] || local[k]);

  const missingRequired = REQUIRED.filter((k) => !has(k));
  const missingAny = REQUIRED_ANY.filter((group) => !group.some(has)).map((g) => g.join(" | "));
  const missingOptional = OPTIONAL.filter((k) => !has(k));

  if (missingRequired.length === 0 && missingAny.length === 0) {
    console.log("[check-env] OK: tutte le env required sono presenti.");
  } else {
    console.warn("[check-env] Env REQUIRED mancanti:");
    for (const k of missingAny) console.warn(`  - (una tra) ${k}`);
    for (const k of missingRequired) console.warn(`  - ${k}`);
  }
  if (missingOptional.length > 0) {
    console.warn("[check-env] Optional mancanti (non bloccanti): " + missingOptional.join(", "));
  }

  if (strict && (missingRequired.length > 0 || missingAny.length > 0)) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("[check-env] errore:", e);
  process.exit(1);
});
