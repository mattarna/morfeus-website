import crypto from "crypto";

/**
 * Meta Conversions API (CAPI) — invio eventi server-side.
 *
 * Modulo UNICO e riusabile: ogni route di opt-in lo richiama in una riga.
 * Principi (vedi playbook "Il Tracciamento Lato API", Biblioteca Marketing/ADV):
 *  - Eventi standard (Lead, Purchase, ...) + parametri (content_category/content_name).
 *  - Deduplica: stesso `eventId` del pixel browser.
 *  - Match quality: email/telefono hashati SHA-256 + fbp/fbc dai cookie.
 *  - No-op sicuro: se manca META_CAPI_ACCESS_TOKEN non fa nulla (dev/local non si rompe).
 *  - Non-blocking: gli errori non devono mai far fallire l'opt-in.
 *
 * Env richieste (server-only, MAI pubbliche):
 *   META_CAPI_ACCESS_TOKEN   — token Conversions API (segreto)
 *   META_PIXEL_ID            — pixel target (default: pixel globale del sito)
 *   META_TEST_EVENT_CODE     — opzionale, solo per i test in Events Manager
 */

const GRAPH_VERSION = "v21.0";
const DEFAULT_PIXEL_ID = "978948495077175"; // pixel globale Morfeus (fallback)

export type MetaUserData = {
  email?: string;
  phone?: string;
  fbp?: string; // cookie _fbp
  fbc?: string; // cookie _fbc
  clientIp?: string;
  userAgent?: string;
};

export type MetaCustomData = {
  content_category?: string; // famiglia (es. "lead-magnet", "formazione")
  content_name?: string; // funnel specifico (es. "freebie-plan-solve")
  value?: number;
  currency?: string;
};

export type SendMetaEventInput = {
  eventName: string; // "Lead" | "InitiateCheckout" | "Purchase" | ...
  eventId: string; // UUID condiviso col pixel browser (deduplica)
  eventSourceUrl?: string;
  actionSource?: "website" | "system_generated";
  userData: MetaUserData;
  customData?: MetaCustomData;
};

export type SendMetaEventResult =
  | { ok: true; sent: true; fbtrace_id?: string }
  | { ok: true; sent: false; reason: string }
  | { ok: false; sent: false; error: string; status?: number };

/** SHA-256 hex di un valore già normalizzato. Vuoto -> undefined (non inviare il campo). */
function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hashEmail(email?: string): string | undefined {
  const e = (email ?? "").trim().toLowerCase();
  if (!e) return undefined;
  return sha256(e);
}

/** Telefono: Meta vuole solo cifre con prefisso internazionale, niente "+" né separatori. */
function hashPhone(phone?: string): string | undefined {
  const digits = (phone ?? "").replace(/[^\d]/g, "");
  if (!digits) return undefined;
  return sha256(digits);
}

/**
 * Invia un evento alla Conversions API di Meta.
 * Non lancia mai: in caso di errore ritorna un esito e l'opt-in prosegue comunque.
 */
export async function sendMetaCapiEvent(
  input: SendMetaEventInput
): Promise<SendMetaEventResult> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    // Nessun token configurato: no-op silenzioso (sviluppo / non ancora attivato).
    return { ok: true, sent: false, reason: "missing_access_token" };
  }

  const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  const em = hashEmail(input.userData.email);
  const ph = hashPhone(input.userData.phone);

  // user_data: includi solo i campi presenti (più segnali = match quality migliore).
  const userData: Record<string, unknown> = {};
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (input.userData.fbp) userData.fbp = input.userData.fbp;
  if (input.userData.fbc) userData.fbc = input.userData.fbc;
  if (input.userData.clientIp) userData.client_ip_address = input.userData.clientIp;
  if (input.userData.userAgent) userData.client_user_agent = input.userData.userAgent;

  const data: Record<string, unknown> = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: input.actionSource ?? "website",
    user_data: userData,
  };
  if (input.eventSourceUrl) data.event_source_url = input.eventSourceUrl;
  if (input.customData) {
    const cd: Record<string, unknown> = {};
    if (input.customData.content_category) cd.content_category = input.customData.content_category;
    if (input.customData.content_name) cd.content_name = input.customData.content_name;
    if (typeof input.customData.value === "number") cd.value = input.customData.value;
    if (input.customData.currency) cd.currency = input.customData.currency;
    if (Object.keys(cd).length) data.custom_data = cd;
  }

  const body: Record<string, unknown> = { data: [data] };
  if (testEventCode) body.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    // Timeout difensivo: la CAPI non deve mai rallentare la risposta all'utente.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[meta-capi] event rejected", res.status, detail);
      return { ok: false, sent: false, error: "graph_error", status: res.status };
    }
    const json = (await res.json().catch(() => ({}))) as { fbtrace_id?: string };
    return { ok: true, sent: true, fbtrace_id: json.fbtrace_id };
  } catch (err) {
    console.error("[meta-capi] event failed", err);
    return { ok: false, sent: false, error: "request_failed" };
  }
}

/** Estrae fbp/fbc dai cookie di prima parte impostati da fbevents.js, leggibili lato server. */
export function readFbCookies(cookieHeader: string | null | undefined): {
  fbp?: string;
  fbc?: string;
} {
  if (!cookieHeader) return {};
  const out: { fbp?: string; fbc?: string } = {};
  for (const part of cookieHeader.split(";")) {
    const [rawK, ...rest] = part.trim().split("=");
    if (rawK === "_fbp") out.fbp = decodeURIComponent(rest.join("="));
    else if (rawK === "_fbc") out.fbc = decodeURIComponent(rest.join("="));
  }
  return out;
}
