import { NextRequest, NextResponse } from "next/server";

/* ============================================================
   POST /api/formazione/verifica
   ------------------------------------------------------------
   Verifica il codice inviato dal form di /formazione/accedi.
   - codice corretto  -> setta cookie httpOnly `mf_formazione`
                         (valore = codice) valido 90 giorni,
                         poi redirect a /{locale}/formazione
   - codice sbagliato -> redirect a /{locale}/formazione/accedi
                         con ?err=sbagliato
   - env non settata  -> redirect con ?err=config

   Il cookie CONTIENE il codice (httpOnly, secure): quando cambi la
   env var FORMAZIONE_CODICE, tutti i cookie esistenti diventano
   invalidi in automatico. Rotazione = cambio env var + redeploy.

   Route Node.js (default): niente crypto Edge, tutto sync/lineare.
   ============================================================ */

const NOME_COOKIE = "mf_formazione";
const NOVANTA_GIORNI = 60 * 60 * 24 * 90;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const codice = String(form.get("codice") ?? "").trim();
  const localeRaw = String(form.get("locale") ?? "it");
  const locale = localeRaw === "en" ? "en" : "it";
  const atteso = process.env.FORMAZIONE_CODICE ?? "";

  const back = (why: string) => {
    const url = new URL(`/${locale}/formazione/accedi`, req.url);
    url.searchParams.set("err", why);
    return NextResponse.redirect(url, 303);
  };

  if (!atteso) return back("config");
  if (!codice) return back("vuoto");
  if (codice !== atteso) return back("sbagliato");

  const dest = new URL(`/${locale}/formazione`, req.url);
  const res = NextResponse.redirect(dest, 303);
  res.cookies.set({
    name: NOME_COOKIE,
    value: atteso,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: NOVANTA_GIORNI,
    path: "/",
  });
  return res;
}
