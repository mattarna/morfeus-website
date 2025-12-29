import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://morfeushub.com"),
  title: {
    default: "Morfeus – AI-Native Organization Design",
    template: `%s | Morfeus`,
  },
  description: "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions.",
  openGraph: {
    title: "Morfeus – AI-Native Organization Design",
    description: "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions.",
    url: "https://morfeushub.com",
    siteName: "Morfeus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morfeus – AI-Native Organization Design",
    description: "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preconnect for critical third-party origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} font-outfit antialiased bg-black text-slate-300`}>
        {children}
      </body>
    </html>
  );
}
