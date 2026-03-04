import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getFunnelRegistryItem, isRegisteredFunnelSlug } from "./funnels/registry";

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

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Path senza locale (come funnel): mockup per design review
  if (pathname.startsWith("/mockup")) {
    const response = NextResponse.next();
    response.headers.set("x-next-intl-locale", routing.defaultLocale);
    return response;
  }

  const segments = getPathSegments(pathname);
  const firstSegment = segments[0];

  if (firstSegment && isRegisteredFunnelSlug(firstSegment)) {
    const funnel = getFunnelRegistryItem(firstSegment);
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = buildInternalFunnelPath(firstSegment, segments.slice(1));

    const response = NextResponse.rewrite(rewrittenUrl);

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

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except:
  // - api (API routes)
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - static files (contain a dot in the path)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
