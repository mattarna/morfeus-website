import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Power the bundle analyzer in production builds
  productionBrowserSourceMaps: false,
  
  // Optimize fonts
  optimizeFonts: true,

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
      {
        // Redirect specifico richiesto per il bootcamp
        source: '/bootcamp-ai-champion-seconda-edizione',
        destination: 'https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione',
        permanent: true,
      },
      {
        // Redirect per la versione senza slash finale (opzionale ma consigliato)
        source: '/bootcamp-ai-champion-seconda-edizione/',
        destination: 'https://go.morfeushub.com/bootcamp-ai-champion-seconda-edizione/',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
