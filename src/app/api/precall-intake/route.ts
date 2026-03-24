import { NextResponse } from "next/server";

interface IntakePayload {
  sector?: string;
  annualRevenue?: string;
  frictionArea?: string;
  repeatedProblem?: string;
  source?: string;
  callDate?: string;
  callTime?: string;
  locale?: string;
}

function isMissingRequiredField(payload: IntakePayload): boolean {
  return !payload.sector || !payload.annualRevenue || !payload.frictionArea || !payload.repeatedProblem;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IntakePayload;

    if (isMissingRequiredField(payload)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const forwardUrl = process.env.PRECALL_INTAKE_FORWARD_URL;
    if (!forwardUrl) {
      return NextResponse.json({
        ok: true,
        forwarded: false,
        message: "Saved locally (forward endpoint not configured)."
      });
    }

    const upstream = await fetch(forwardUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload,
        source: payload.source ?? "",
        callDate: payload.callDate ?? "",
        callTime: payload.callTime ?? "",
        locale: payload.locale ?? "it"
      })
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Forward endpoint responded with an error." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
