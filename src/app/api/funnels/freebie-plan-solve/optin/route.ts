import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";
import { getBrevoListId } from "@/lib/brevo/lists";

interface OptinPayload {
  email?: string;
  // Il gate del wizard Plan & Solve raccoglie email + telefono (opzionale) + progetto.
  phone?: string;
  project?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Normalizza il telefono verso formato +39 E.164, coerente coi dati esistenti
 * nell'attributo Brevo TELEFONO_ (testo → non valida, non rompe mai l'optin).
 * Conservativo: se non riconosce, restituisce comunque qualcosa di sensato.
 */
function normalizePhone(raw?: string): string {
  const p = (raw ?? "").replace(/[\s\-().]/g, "");
  if (!p) return "";
  if (p.startsWith("+")) return p;
  if (p.startsWith("0039")) return "+" + p.slice(2);
  if (p.startsWith("00")) return "+" + p.slice(2);
  if (p.startsWith("39")) return "+" + p;
  return "+39" + p;
}

const DEFAULT_FORM_NAME = "Freebie_plan_&_solve";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OptinPayload;
    const email = payload.email?.trim() ?? "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "invalid_payload" }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: "missing_brevo_api_key" }, { status: 500 });
    }

    const freebieListId = getBrevoListId("FREEBIE_PLAN_SOLVE");
    if (typeof freebieListId !== "number") {
      return NextResponse.json({ success: false, error: "missing_brevo_list_id" }, { status: 500 });
    }

    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          [BREVO_ATTR.FORM_NAME]: payload.source ?? DEFAULT_FORM_NAME,
          [BREVO_ATTR.OPT_IN]: true,
          // Telefono opzionale → attributo testo TELEFONO_ (solo se fornito).
          ...(normalizePhone(payload.phone) ? { [BREVO_ATTR.TELEFONO]: normalizePhone(payload.phone) } : {}),
        },
        listIds: [freebieListId],
        updateEnabled: true,
      }),
    });

    if (!contactResponse.ok) {
      const details = await contactResponse.text();
      return NextResponse.json(
        { success: false, error: "brevo_contact_failed", details },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("freebie-plan-solve optin failed", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
