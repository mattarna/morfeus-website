import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // GLI ARTICOLI DEVONO SALIRE INSIEME ALLA FUNZIONE
  // ============================================
  // Gli articoli sono file markdown in src/content/insights, letti dal
  // server a RUNTIME: le rotte /insights e /insights/[slug] sono
  // dinamiche (lo dice il build: "ƒ server-rendered on demand"), quindi
  // non vengono cotte a build e i file servono ancora quando la pagina
  // risponde.
  //
  // Il tracciatore di Next include nel bundle serverless solo i file che
  // riesce a VEDERE nel codice. Qui il percorso e' costruito a runtime
  // (path.join(process.cwd(), ...) piu' readdirSync): non c'e' niente da
  // vedere, e senza questa riga i tredici articoli non salgono su Vercel.
  //
  // Come si romperebbe: `listArticleFiles` ora ALZA un errore se la
  // cartella non c'e', invece di restituire una lista vuota in silenzio
  // (vedi src/lib/insights.ts). Un /insights che esplode si nota subito;
  // un /insights vuoto puo' restare online per settimane.
  //
  // Stessa ragione per il content dei funnel, letto allo stesso modo.
  // NB: la chiave va scritta UNA VOLTA SOLA. In un oggetto JavaScript una
  // chiave ripetuta non e' un errore: vince l'ultima e la prima sparisce
  // senza dirlo. Erano finite qui due `outputFileTracingIncludes`, una con
  // gli articoli e una con articoli piu' playbook: funzionava solo perche'
  // la seconda arrivava dopo, e cancellare "il duplicato" sbagliato
  // avrebbe smesso di spedire il playbook senza un errore.
  outputFileTracingIncludes: {
    '/funnel-internal/[slug]/[[...step]]': ['./src/funnels/playbook-2026-05/content/**/*'],
    '/[locale]/insights': ['./src/content/insights/**'],
    '/[locale]/insights/[slug]': ['./src/content/insights/**'],
  },

  // ============================================
  // IMAGE OPTIMIZATION
  // ============================================
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    
    // Remote patterns for external images (OG images from Supabase)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    
    // Device sizes for responsive images
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    
    // Icon sizes for smaller images
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
    
    // Minimize layout shift with long cache
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Compress responses
  compress: true,

  // Power the bundle analyzer in production builds
  productionBrowserSourceMaps: false,

  // NB: `swcMinify` e `optimizeFonts` sono stati RIMOSSI in Next 15/16
  // (ora sono il comportamento predefinito): tenerli fa fallire il build.

  // NB: `outputFileTracingIncludes` sta in cima al file, tutto in una
  // chiave sola. In Next 15+ non vive piu' sotto `experimental`.

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react', 'framer-motion'],
  },

  // ============================================
  // SECURITY HEADERS
  // ============================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Enable XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ============================================
  // REDIRECTS
  // ============================================
  async redirects() {
    return [
      // La home 2026 e' diventata la home vera il 2026-07-30. La route di
      // anteprima /home-2026 non esiste piu': chi l'ha nei preferiti (o nella
      // cronologia) finisce sulla home invece che su un 404.
      {
        source: '/:locale(en|it)/home-2026',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/home-2026',
        destination: '/',
        permanent: true,
      },
      {
        source: '/playbook',
        destination: '/playbook-imprenditore-milionario',
        permanent: true,
      },
      {
        source: '/playbook/:path*',
        destination: '/playbook-imprenditore-milionario/:path*',
        permanent: true,
      },
      {
        source: '/bootcamp-ai-champion-seconda-edizione',
        destination: 'https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione',
        permanent: true,
      },
      {
        source: '/bootcamp-ai-champion-seconda-edizione/',
        destination: 'https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione/',
        permanent: true,
      },
      {
        source: '/:locale(en|it)/offerta',
        destination: '/:locale/forge',
        permanent: true,
      },
      {
        source: '/offerta',
        destination: '/forge',
        permanent: true,
      },
      {
        source: '/:locale(en|it)/operating-system',
        destination: '/:locale/forge',
        permanent: true,
      },
      {
        source: '/operating-system',
        destination: '/forge',
        permanent: true,
      },
      {
        source: '/:locale(en|it)/case-study',
        destination: '/:locale/casi',
        permanent: true,
      },
      {
        source: '/:locale(en|it)/case-study/:slug',
        destination: '/:locale/casi',
        permanent: true,
      },
      {
        source: '/case-study',
        destination: '/casi',
        permanent: true,
      },
      {
        source: '/case-study/:slug',
        destination: '/casi',
        permanent: true,
      },
    ];
  },

  // Il sottodominio del Playground NON si governa da qui: lo fa
  // `src/proxy.ts` (il middleware), che gira prima dei rewrites e ha due
  // cose che una regola in questo file non puo' avere: legge
  // x-forwarded-host (l'unico host affidabile dietro il proxy di Vercel)
  // e riscrive TUTTI i path del sottodominio, non solo la radice. Qui
  // c'era una rewrite che duplicava quel lavoro senza mai entrare in
  // gioco: rimossa il 2026-07-30 per non lasciare due posti che dicono
  // la stessa cosa.
};

export default withNextIntl(nextConfig);
