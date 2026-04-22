import { NextResponse } from "next/server";

interface OptinPayload {
  email?: string;
  name?: string;
  role?: string;
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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OptinPayload;
    const email = payload.email?.trim() ?? "";
    const name = payload.name?.trim() ?? "";
    const role = payload.role?.trim() ?? "";

    if (!isValidEmail(email) || !name || !role) {
      return NextResponse.json({ success: false, error: "invalid_payload" }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: "missing_brevo_api_key" }, { status: 500 });
    }

    const listId = process.env.BREVO_WEBINAR_LIST_ID
      ? Number.parseInt(process.env.BREVO_WEBINAR_LIST_ID, 10)
      : undefined;

    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
          ROLE: role,
          SOURCE: payload.source ?? "webinar-claude",
          OPTIN_AT: new Date().toISOString(),
          ...(payload.utm_source && { UTM_SOURCE: payload.utm_source }),
          ...(payload.utm_medium && { UTM_MEDIUM: payload.utm_medium }),
          ...(payload.utm_campaign && { UTM_CAMPAIGN: payload.utm_campaign }),
          ...(payload.utm_content && { UTM_CONTENT: payload.utm_content }),
          ...(payload.utm_term && { UTM_TERM: payload.utm_term }),
        },
        ...(listId ? { listIds: [listId] } : {}),
        updateEnabled: true
      })
    });

    if (!contactResponse.ok) {
      const details = await contactResponse.text();
      return NextResponse.json({ success: false, error: "brevo_contact_failed", details }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("webinar optin failed", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
