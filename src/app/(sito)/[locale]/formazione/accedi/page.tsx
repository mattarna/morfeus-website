import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import "@/components/pagine/kit.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ err?: string }>;
};

const COPY = {
  it: {
    metaTitle: "Accesso · Formazione · Morfeus",
    eye: "Libreria · percorsi interni",
    h1: "Accesso riservato",
    lead: "Inserisci il codice che hai ricevuto per aprire la libreria dei percorsi.",
    label: "Codice",
    placeholder: "il tuo codice",
    submit: "Entra",
    nota: "Il codice resta valido 90 giorni sul tuo dispositivo. Se lo perdi, ti serve quello nuovo.",
    err: {
      sbagliato: "Codice sbagliato. Riprova.",
      vuoto: "Manca il codice.",
      config: "Configurazione non completa lato server. Contatta chi ti ha mandato il link.",
    } as Record<string, string>,
  },
  en: {
    metaTitle: "Access · Formazione · Morfeus",
    eye: "Library · internal paths",
    h1: "Restricted access",
    lead: "Enter the code you received to open the library.",
    label: "Code",
    placeholder: "your code",
    submit: "Enter",
    nota: "The code stays valid for 90 days on your device. If you lose it, you need the new one.",
    err: {
      sbagliato: "Wrong code. Try again.",
      vuoto: "Missing code.",
      config: "Server not configured. Contact whoever sent you the link.",
    } as Record<string, string>,
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = locale === "it" ? COPY.it : COPY.en;
  return {
    title: { absolute: t.metaTitle },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}

export default async function AccediPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = (await searchParams) ?? {};
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale: "it" | "en" = isIt ? "it" : "en";
  const err = sp.err && t.err[sp.err] ? t.err[sp.err] : null;

  return (
    <SiteShell locale={safeLocale}>
      <section className="band ink pg" id="accedi">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div className="eye">{t.eye}</div>
          <h1>{t.h1}</h1>
          <p className="copy" style={{ marginTop: 18 }}>
            {t.lead}
          </p>

          <form
            action="/api/formazione/verifica"
            method="POST"
            style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}
          >
            <input type="hidden" name="locale" value={safeLocale} />
            <label
              htmlFor="codice"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ombra)",
              }}
            >
              {t.label}
            </label>
            <input
              id="codice"
              name="codice"
              type="password"
              required
              autoFocus
              autoComplete="off"
              spellCheck={false}
              placeholder={t.placeholder}
              style={{
                padding: "14px 18px",
                fontSize: 17,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                background: "var(--surf-bg)",
                color: "var(--testo-ink)",
                border: "1px solid var(--surf-bd)",
                borderRadius: "var(--r-s, 8px)",
                outline: "none",
              }}
            />
            {err ? (
              <p
                role="alert"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "var(--marker)",
                  marginTop: 4,
                }}
              >
                {err}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn btn-1"
              style={{ marginTop: 10, alignSelf: "flex-start" }}
            >
              {t.submit} &nbsp;→
            </button>
          </form>

          <p
            style={{
              marginTop: 44,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ombra)",
              maxWidth: 460,
              lineHeight: 1.5,
            }}
          >
            {t.nota}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
