import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";

interface OptinPayload {
  email?: string;
  name?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const DEFAULT_FORM_NAME = "Playbook_imprenditore_milionario";
const PLAYBOOK_LIST_ID = 64;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OptinPayload;
    const email = payload.email?.trim() ?? "";
    const name = payload.name?.trim() ?? "";

    if (!isValidEmail(email) || !name) {
      return NextResponse.json({ success: false, error: "invalid_payload" }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: "missing_brevo_api_key" }, { status: 500 });
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
          [BREVO_ATTR.NOME]: name,
          [BREVO_ATTR.FORM_NAME]: payload.source ?? DEFAULT_FORM_NAME,
          [BREVO_ATTR.OPT_IN]: true,
        },
        listIds: [PLAYBOOK_LIST_ID],
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
    console.error("playbook optin failed", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
