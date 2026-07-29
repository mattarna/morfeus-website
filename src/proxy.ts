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

function isNonIndexableLocalePath(segments: string[]): boolean {
  if (segments.length < 2) {
    return false;
  }
  const locale = segments[0];
  const section = segments[1];
  return (
    SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number]) &&
    NON_INDEXABLE_LOCALE_PREFIXES.includes(section as (typeof NON_INDEXABLE_LOCALE_PREFIXES)[number])
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

function hostRichiesta(request: NextRequest): string {
  const raw = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return raw.split(":")[0].toLowerCase();
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = hostRichiesta(request);

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
     In sviluppo NO: in locale il sottodominio non esiste e il redirect
     sbatterebbe fuori dal server di sviluppo, rendendo la pagina
     invisibile proprio a chi la sta costruendo. */
  if (pathname === RADICE_PLAYGROUND || pathname.startsWith(`${RADICE_PLAYGROUND}/`)) {
    if (process.env.NODE_ENV === "production") {
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
