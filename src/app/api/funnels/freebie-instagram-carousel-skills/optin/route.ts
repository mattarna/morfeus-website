import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";
import { getBrevoListId } from "@/lib/brevo/lists";

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

const DEFAULT_FORM_NAME = "Freebie_instagram_carousel_skills";

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

    // Auto-enroll: il contatto entra sia nella list freebie (consegna .zip)
    // sia nella list webinar (riceve invito + reminder dall'automation esistente).
    const freebieListId = getBrevoListId("FREEBIE_INSTAGRAM_CAROUSEL_SKILLS");
    const webinarListId = getBrevoListId("WEBINAR_CLAUDE_5MAG");
    const listIds = [freebieListId, webinarListId].filter(
      (id): id is number => typeof id === "number"
    );

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
          [BREVO_ATTR.JOB_TITLE]: role,
          [BREVO_ATTR.FORM_NAME]: payload.source ?? DEFAULT_FORM_NAME,
          [BREVO_ATTR.OPT_IN]: true,
        },
        ...(listIds.length > 0 ? { listIds } : {}),
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
    console.error("freebie-instagram-carousel-skills optin failed", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
