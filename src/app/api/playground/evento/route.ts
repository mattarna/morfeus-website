/* ============================================================
   COLLAUDO · gli eventi di comportamento
   ------------------------------------------------------------
   Chi apre il collaudo, dove lo abbandona, cosa clicca nel referto.
   Vanno SOLO al foglio (scheda EVENTI), mai a Brevo: sono numeri per
   tarare il test, non contatti. Chi arriva in fondo e' gia' una riga
   in RISPOSTE, quindi qui interessa soprattutto chi NON ci arriva.

   Best-effort e silenzioso come il salvataggio: un evento perso non
   deve mai disturbare la persona. Nessun dato personale qui dentro,
   solo l'id di sessione: gli eventi sono anonimi finche' non si passa
   il gate (li' l'id si lega all'email in RISPOSTE).
   ============================================================ */

import { NextResponse } from "next/server";
import { getSheetWebhook } from "@/lib/sheets/webhooks";

interface EventoPayload {
  id?: string;
  evento?: string;
  dettaglio?: string;
  dispositivo?: string;
}

/** Solo gli eventi che il foglio conosce: cosi' un refuso lato client
 *  non riempie la scheda di righe che nessuno sa leggere. */
const EVENTI_VALIDI = new Set(["aperto", "abbandonato", "gate", "referto", "cta"]);

export async function POST(request: Request) {
  let p: EventoPayload;
  try {
    p = (await request.json()) as EventoPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!p.evento || !EVENTI_VALIDI.has(p.evento)) {
    return NextResponse.json({ ok: false, error: "evento_sconosciuto" }, { status: 400 });
  }

  const foglio = getSheetWebhook("PLAYGROUND_COLLAUDO");
  if (!foglio) {
    // Nessuna env del foglio: si lascia cadere l'evento senza rumore.
    return NextResponse.json({ ok: true });
  }

  try {
    await fetch(foglio.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        segreto: foglio.secret,
        tipo: "evento",
        riga: {
          data_ora: new Date().toISOString(),
          id: p.id ?? "",
          evento: p.evento,
          dettaglio: p.dettaglio ?? "",
          dispositivo: p.dispositivo ?? "",
        },
      }),
    });
  } catch (err) {
    console.error("collaudo evento: foglio fallito", err);
  }

  return NextResponse.json({ ok: true });
}
