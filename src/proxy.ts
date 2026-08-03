import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getFunnelRegistryItem, isRegisteredFunnelSlug } from "./funnels/registry";
import { NON_INDEXABLE_LOCALE_PREFIXES, SUPPORTED_LOCALES } from "./lib/seo/public-indexing";

const intlMiddleware = createMiddleware(routing);
const AB_COOKIE_PREFIX = "mf_ab_";

function getPathSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

function pickVariant(variants: Array<"A" | "B">): "A" | "B" {
  if (variants.length <= 1) {
    return variants[0] ?? "A";
  }
  return Math.random() < 0.5 ? "A" : "B";
}

function buildInternalFunnelPath(slug: string, restSegments: string[]): string {
  const suffix = restSegments.length > 0 ? `/${restSegments.join("/")}` : "";
  return `/funnel-internal/${slug}${suffix}`;
}

/* Le aree private (portal, call-confirmed) non devono essere
   indicizzate in NESSUNA delle due lingue. Qui si guardava solo il
   primo segmento come lingua, e con `localePrefix: 'as-needed'`
   l'inglese non ha prefisso: /portal/... e /call-confirmed passavano
   senza X-Robots-Tag, cioe' erano crawlabili. Solo le versioni
   italiane erano protette. */
function isNonIndexableLocalePath(segments: string[]): boolean {
  if (segments.length === 0) {
    return false;
  }
  const primo = segments[0];
  const conPrefisso = SUPPORTED_LOCALES.includes(primo as (typeof SUPPORTED_LOCALES)[number]);
  const sezione = conPrefisso ? segments[1] : primo;
  if (!sezione) {
    return false;
  }
  return NON_INDEXABLE_LOCALE_PREFIXES.includes(
    sezione as (typeof NON_INDEXABLE_LOCALE_PREFIXES)[number]
  );
}

/* ============================================================
   IL SOTTODOMINIO DEL PLAYGROUND
   ------------------------------------------------------------
   playground.morfeushub.com e' agganciato allo STESSO progetto
   Vercel del sito. Senza una regola qui servirebbe la home B2B:
   stesso contenuto su due host, che per Google e' un duplicato.

   Quindi: su quell'host tutto viene riscritto sotto /playground, e
   sul dominio principale /playground non risponde. Un contenuto, un
   indirizzo. E' lo stesso patto che il sito applica gia' ai funnel,
   che vivono su /<slug> e internamente stanno in /funnel-internal.

   L'host va letto da x-forwarded-host prima che da host: dietro il
   proxy di Vercel e' li' che arriva il nome vero.
   ============================================================ */
const HOST_PLAYGROUND = "playground.morfeushub.com";
const RADICE_PLAYGROUND = "/playground";

/* I domini pubblici del sito: solo da qui /playground viene rimandato
   al sottodominio. Le anteprime (*.vercel.app) e localhost non ci sono
   apposta, cosi' li' la pagina si puo' provare. */
const HOST_PUBBLICI = ["morfeushub.com", "www.morfeushub.com"];

function hostRichiesta(request: NextRequest): string {
  const raw = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return raw.split(":")[0].toLowerCase();
}

/* ============================================================
   Formazione: gate a codice.
   Il cookie mf_formazione contiene direttamente il valore atteso
   (env FORMAZIONE_CODICE). Cambiando la env var, tutti i cookie
   esistenti si invalidano da soli.
   ============================================================ */
const NOME_COOKIE_FORMAZIONE = "mf_formazione";
const RE_FORMAZIONE = /^\/(it|en)\/formazione(?:\/|$)/;
const RE_FORMAZIONE_ACCEDI = /^\/(it|en)\/formazione\/accedi(?:\/|$)/;

function localeFormazione(pathname: string): "it" | "en" {
  return pathname.startsWith("/en/") ? "en" : "it";
}

/* ============================================================
   LE PAGINE CHE ESISTONO SOLO IN ITALIANO
   ------------------------------------------------------------
   I termini contrattuali dei corsi e l'area formazione non si
   traducono: l'offerta e' venduta in Italia, in italiano, e un
   testo legale tradotto "per completezza" e' un testo legale che
   dice una cosa diversa dall'originale in un contenzioso.

   Vivono pero' sotto [locale], quindi Next le costruisce anche in
   inglese, e agli indirizzi senza prefisso (che sono gli indirizzi
   INGLESI) rispondevano con pagine interamente italiane dentro il
   sito inglese.

   Qui si tolgono dal sito inglese. Non con un 404: sono documenti
   che chi ha comprato deve poter riaprire, e sono linkati dai
   funnel. Con un 308 verso /it, che e' dove quelle pagine vivono
   davvero. Nessuna delle tre e' in INDEXABLE_LOCALE_PATHS, quindi
   non c'e' niente da togliere da sitemap.

   EFFETTO COLLATERALE VOLUTO sul gate di /formazione. Il gate qui
   sotto guarda `^/(it|en)/formazione`: la richiesta senza prefisso
   non lo attivava e la pagina si serviva lo stesso, cioe' il codice
   si aggirava chiedendo /formazione invece di /it/formazione.
   Passando prima di qui, il 308 riporta la richiesta sotto /it e il
   gate torna a valere.
   ============================================================ */
const SOLO_ITALIANO = ["/termini-bootcamp", "/termini-corso", "/formazione"];

function soloItaliano(pathname: string): boolean {
  return SOLO_ITALIANO.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = hostRichiesta(request);

  // Prima di tutto il resto: vedi SOLO_ITALIANO qui sopra.
  if (soloItaliano(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/it${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  // Gate /formazione: qualsiasi path sotto /{locale}/formazione, ECCETTO
  // la pagina di accesso stessa, richiede il cookie con il codice.
  if (RE_FORMAZIONE.test(pathname) && !RE_FORMAZIONE_ACCEDI.test(pathname)) {
    const atteso = process.env.FORMAZIONE_CODICE ?? "";
    const cookie = request.cookies.get(NOME_COOKIE_FORMAZIONE)?.value ?? "";
    const ok = atteso.length > 0 && cookie === atteso;
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeFormazione(pathname)}/formazione/accedi`;
      url.search = "";
      const res = NextResponse.redirect(url, 307);
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return res;
    }
  }

  if (host === HOST_PLAYGROUND) {
    // gia' dentro: lascia passare, o si riscrive all'infinito
    if (pathname === RADICE_PLAYGROUND || pathname.startsWith(`${RADICE_PLAYGROUND}/`)) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? RADICE_PLAYGROUND : `${RADICE_PLAYGROUND}${pathname}`;
    return NextResponse.rewrite(url);
  }

  /* Sul dominio principale la rotta interna non esiste: chi ci arriva
     va mandato all'indirizzo vero, che e' il sottodominio. 308 e non
     307 perche' lo spostamento e' definitivo e va detto ai motori.

     La condizione guarda l'HOST e non NODE_ENV. Con NODE_ENV anche le
     ANTEPRIME di Vercel (dove NODE_ENV vale "production") mandavano
     /playground al dominio pubblico: si finiva sul sito vero invece
     che sulla copia in prova, cioe' il playground non era testabile
     prima di pubblicarlo, che e' esattamente a cosa serve un'anteprima.
     Ora il redirect scatta solo sui domini pubblici del sito; su
     un'anteprima e in locale la pagina si serve. */
  if (pathname === RADICE_PLAYGROUND || pathname.startsWith(`${RADICE_PLAYGROUND}/`)) {
    if (HOST_PUBBLICI.includes(host)) {
      const url = new URL(
        pathname.slice(RADICE_PLAYGROUND.length) || "/",
        `https://${HOST_PLAYGROUND}`
      );
      return NextResponse.redirect(url, 308);
    }
    /* In sviluppo il sottodominio non esiste: la rotta si serve com'e',
       saltando next-intl. Senza questo salto il middleware della lingua
       tratta "playground" come un locale sconosciuto e risponde 404,
       cioe' la pagina resta invisibile proprio a chi la sta facendo. */
    return NextResponse.next();
  }

  /* Qui stava il vecchio governo del sottodominio, arrivato dal ramo
     delle pagine e sopravvissuto all'unione: ridichiarava `host` (che
     da solo non compila) e soprattutto metteva noindex su tutto il
     Playground, quando la decisione presa e' l'opposto -- va
     indicizzato. Il blocco in cima a questa funzione fa gia' lo stesso
     lavoro, meglio: legge x-forwarded-host e distingue i domini
     pubblici dalle anteprime. Rimosso il 2026-07-30, all'unione. */

  // Path senza locale (come funnel): mockup per design review
  if (pathname.startsWith("/mockup")) {
    const response = NextResponse.next();
    response.headers.set("x-next-intl-locale", routing.defaultLocale);
    return response;
  }

  // Evento statico: URL pulito → HTML in public (prima di next-intl)
  if (pathname === "/aperitalk" || pathname === "/aperitalk/") {
    const url = request.nextUrl.clone();
    url.pathname = "/PERCORSO_Aperitalk_15apr2026.html";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/aperitivo" || pathname === "/aperitivo/") {
    const url = request.nextUrl.clone();
    url.pathname = "/PERCORSO_Aperitalk_15apr2026_v2.html";
    return NextResponse.rewrite(url);
  }

  // Corso Claude Unlocked: slug con codice segreto (non in robots.txt, non
  // linkato pubblicamente) → indice statico in public, noindex. I file .html
  // (lezioni/allegati) hanno un punto nel path → esclusi dal matcher, serviti
  // come statici; ognuno ha gia` <meta noindex> nell'head.
  if (
    pathname === "/corso-claude-unlocked-a6c95d9c6f" ||
    pathname === "/corso-claude-unlocked-a6c95d9c6f/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/corso-claude-unlocked-a6c95d9c6f/index.html";
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // Percorsi formativi: hub statici in /public con slug hashato. Il matcher
  // esclude i path con estensione (le lezioni .html sono gia` servite come
  // statici), ma l'URL "pulito" della cartella hub cadrebbe qui e finirebbe
  // 404. Rewrite esplicito su index.html + noindex.
  const HUB_STATICI: readonly string[] = [
    "founder-mastery-453eb9d7f8",
    "formazione-morfeus-bf0efbde6e",
    "marketing-mastery-f254dcab0c",
  ];
  for (const slug of HUB_STATICI) {
    if (pathname === `/${slug}` || pathname === `/${slug}/`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${slug}/index.html`;
      const response = NextResponse.rewrite(url);
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }
  }

  // Destinazione interna del rewrite dei funnel: mai indicizzabile in accesso
  // diretto (la URL canonica e` /<slug>, non /funnel-internal/<slug>).
  if (pathname.startsWith("/funnel-internal")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  const segments = getPathSegments(pathname);
  const firstSegment = segments[0];

  if (firstSegment && isRegisteredFunnelSlug(firstSegment)) {
    const funnel = getFunnelRegistryItem(firstSegment);
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = buildInternalFunnelPath(firstSegment, segments.slice(1));

    const response = NextResponse.rewrite(rewrittenUrl);
    if (!funnel?.indexable) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }

    if (funnel?.abTest.enabled) {
      const cookieName = `${AB_COOKIE_PREFIX}${firstSegment}`;
      const existing = request.cookies.get(cookieName)?.value as "A" | "B" | undefined;
      const variant = existing && funnel.abTest.variants.includes(existing)
        ? existing
        : pickVariant(funnel.abTest.variants);

      response.cookies.set(cookieName, variant, {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 90
      });
    }

    return response;
  }

  const response = intlMiddleware(request);
  if (isNonIndexableLocalePath(segments)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return response;
}

export const config = {
  // Match all paths except:
  // - api (API routes)
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - static files (contain a dot in the path)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
