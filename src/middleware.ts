import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths except:
  // - api (API routes)
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - static files (contain a dot in the path)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
