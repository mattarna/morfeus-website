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
  return `/__funnels/${slug}${suffix}`;
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

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  const segments = getPathSegments(pathname);
  const firstSegment = segments[0];

  if (firstSegment && isRegisteredFunnelSlug(firstSegment)) {
    const funnel = getFunnelRegistryItem(firstSegment);
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = buildInternalFunnelPath(firstSegment, segments.slice(1));

    const response = NextResponse.rewrite(rewrittenUrl);
    // Funnel pages are conversion assets and should never be indexed.
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

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
