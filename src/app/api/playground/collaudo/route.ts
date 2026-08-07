/* ============================================================
   COLLAUDO · il punto dove si salvano i dati
   ------------------------------------------------------------
   Due destinazioni, due lavori (vedi 00_SYSTEM/TRACCIAMENTO.md):

   - BREVO tiene il contatto: nome, email, telefono, sorgente,
     consenso. Serve a mandare le email. Lista Playground_Collaudo.
   - FOGLIO tiene tutta la riga del collaudo: livello, punteggi,
     conto, gradino. Serve a noi per tarare il test.

   Regola dura: nessuna delle due deve MAI bloccare il referto. Una
   persona che ha appena risposto a dodici domande deve vedere il
   suo esito anche se Brevo e' giu' o il foglio non risponde. Per
   questo ogni scrittura e' in un try suo, e la rotta risponde
   comunque 200: i guasti finiscono nei log, non a schermo.
   ============================================================ */

import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";
import { getBrevoListId } from "@/lib/brevo/lists";
import { getSheetWebhook } from "@/lib/sheets/webhooks";
import { normalizzaSorgente } from "@/components/playground/collegamenti";

/** Quello che il gate manda. I nomi sono gli stessi delle colonne del
 *  foglio (RISPOSTE): cosi' il mapping piu' sotto e' una riga sola. */
interface CollaudoPayload {
  id?: string;
  /** Da quale porta e' entrato: la landing o /gate. Vedi SORGENTI. */
  sorgente?: string;
  dispositivo?: string;
  durata_sec?: number;

  nome?: string;
  email?: string;
  telefono?: string;
  consenso?: boolean;

  mestiere?: string;
  ruolo?: string;
  tasca?: string;
  leva?: string;
  intento?: string;
  urgenza?: string;

  dichiarato?: string;
  atteso?: number;
  voto?: number;
  livello?: number;
  livello_nome?: string;
  bloccato_da?: string;
  punto_debole?: string;

  p_contesto?: number;
  p_ripetibilita?: number;
  p_correzione?: number;
  p_controllo?: number;
  p_diffusione?: number;

  ore_settimana?: number;
  valore_ora?: number;
  risparmio_annuo?: number;

  gradino?: string;
  bootcamp_aperto?: boolean;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* L'elenco chiuso delle sorgenti valide e la ricaduta sulla landing
   stanno in collegamenti.ts, accanto al registro: cosi' chi aggiunge
   una porta trova la regola dove aggiunge il valore. */

/* ---- Brevo: solo il contatto ---- */
async function salvaSuBrevo(p: CollaudoPayload, email: string): Promise<void> {
  const brevoApiKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.warn("collaudo: BREVO_API_KEY assente, salto Brevo");
    return;
  }
  const listId = getBrevoListId("PLAYGROUND_COLLAUDO");

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      email,
      attributes: {
        [BREVO_ATTR.NOME]: p.nome?.trim() ?? "",
        // TELEFONO_ e' testo libero: non fa mai fallire l'optin (vedi
        // REGOLA TELEFONO in lib/brevo/attributes.ts)
        ...(p.telefono?.trim() ? { [BREVO_ATTR.TELEFONO]: p.telefono.trim() } : {}),
        [BREVO_ATTR.FORM_NAME]: normalizzaSorgente(p.sorgente),
        [BREVO_ATTR.OPT_IN]: Boolean(p.consenso),
      },
      ...(listId ? { listIds: [listId] } : {}),
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const details = await res.text();
    throw new Error(`brevo ${res.status}: ${details}`);
  }
}

/* ---- Foglio: tutta la riga ----
   Passa da un'applicazione web di Apps Script agganciata al foglio.
   L'indirizzo e il segreto stanno in env: finche' non ci sono, la
   scrittura si salta senza rumore, e Brevo funziona lo stesso. */
async function salvaSuFoglio(p: CollaudoPayload): Promise<void> {
  const foglio = getSheetWebhook("PLAYGROUND_COLLAUDO");
  if (!foglio) {
    console.warn("collaudo: env del foglio Playground assenti, salto il foglio");
    return;
  }
  const { url, secret: segreto } = foglio;

  const riga = {
    id: p.id ?? "",
    data_ora: new Date().toISOString(),
    form_name: normalizzaSorgente(p.sorgente),
    dispositivo: p.dispositivo ?? "",
    durata_sec: p.durata_sec ?? "",
    nome: p.nome?.trim() ?? "",
    email: p.email?.trim() ?? "",
    telefono: p.telefono?.trim() ?? "",
    consenso: p.consenso ? "si" : "no",
    mestiere: p.mestiere ?? "",
    ruolo: p.ruolo ?? "",
    tasca: p.tasca ?? "",
    leva: p.leva ?? "",
    intento: p.intento ?? "",
    urgenza: p.urgenza ?? "",
    dichiarato: p.dichiarato ?? "",
    atteso: p.atteso ?? "",
    voto: p.voto ?? "",
    livello: p.livello ?? "",
    livello_nome: p.livello_nome ?? "",
    bloccato_da: p.bloccato_da ?? "",
    punto_debole: p.punto_debole ?? "",
    p_contesto: p.p_contesto ?? "",
    p_ripetibilita: p.p_ripetibilita ?? "",
    p_correzione: p.p_correzione ?? "",
    p_controllo: p.p_controllo ?? "",
    p_diffusione: p.p_diffusione ?? "",
    ore_settimana: p.ore_settimana ?? "",
    valore_ora: p.valore_ora ?? "",
    risparmio_annuo: p.risparmio_annuo ?? "",
    gradino: p.gradino ?? "",
    bootcamp_aperto: p.bootcamp_aperto ? "si" : "no",
    cta_cliccata: "",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ segreto, tipo: "risposta", riga }),
  });

  if (!res.ok) {
    throw new Error(`foglio ${res.status}`);
  }
}

export async function POST(request: Request) {
  let p: CollaudoPayload;
  try {
    p = (await request.json()) as CollaudoPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "payload_illeggibile" }, { status: 400 });
  }

  const email = p.email?.trim() ?? "";
  // Il consenso e' la condizione: senza, non abbiamo base per trattare
  // il dato e non lo salviamo da nessuna parte.
  if (!isValidEmail(email) || !p.nome?.trim() || !p.consenso) {
    return NextResponse.json({ ok: false, error: "dati_incompleti" }, { status: 400 });
  }

  // Le due scritture sono indipendenti: se Brevo fallisce, il foglio
  // ci prova lo stesso, e viceversa. Nessuna delle due torna un errore
  // al chiamante: il referto va mostrato comunque.
  const esiti = await Promise.allSettled([salvaSuBrevo(p, email), salvaSuFoglio(p)]);
  esiti.forEach((e, i) => {
    if (e.status === "rejected") {
      console.error(`collaudo: ${i === 0 ? "brevo" : "foglio"} fallito`, e.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
