import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";
import { getBrevoListId } from "@/lib/brevo/lists";

interface OptinPayload {
  email?: string;
  nome?: string;
  cognome?: string;
  telefono?: string;
  /** true = ha P.IVA / azienda con sede in Lombardia (radio gating) */
  pIvaLombardia?: boolean;
  /** true = azienda, false = libero professionista */
  profiloAzienda?: boolean;
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

const FORM_NAME_VALUE = "Formazione Finanziata 2026 - Landing Page";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OptinPayload;
    const email = payload.email?.trim() ?? "";
    const nome = payload.nome?.trim() ?? "";
    const cognome = payload.cognome?.trim() ?? "";
    const telefono = payload.telefono?.trim() ?? "";
    const pIvaLombardia = payload.pIvaLombardia === true;
    const profiloAzienda = payload.profiloAzienda === true;

    if (!isValidEmail(email) || !nome || !cognome || !telefono) {
      return NextResponse.json({ success: false, error: "invalid_payload" }, { status: 400 });
    }

    // Requisito obbligatorio del bando: sede/P.IVA in Lombardia.
    // Difesa lato server in aggiunta al gate del form.
    if (!pIvaLombardia) {
      return NextResponse.json({ success: false, error: "not_eligible_lombardia" }, { status: 422 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: "missing_brevo_api_key" }, { status: 500 });
    }

    const listId = getBrevoListId("FORMAZIONE_FINANZIATA_2026");
    const listIds = [listId].filter((id): id is number => typeof id === "number");

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
          [BREVO_ATTR.NOME]: nome,
          [BREVO_ATTR.COGNOME]: cognome,
          [BREVO_ATTR.TELEFONO]: telefono,
          [BREVO_ATTR.P_IVA_LOMBARDIA]: pIvaLombardia,
          [BREVO_ATTR.SEI_AZIENDA]: profiloAzienda,
          [BREVO_ATTR.FORM_NAME]: FORM_NAME_VALUE,
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
    console.error("formazione-finanziata optin failed", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
