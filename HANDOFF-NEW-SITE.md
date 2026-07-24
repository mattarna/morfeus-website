# HANDOFF — Setup nuovo sito (sito + funnel)

> **Scopo:** Questo documento contiene tutto il necessario per ricreare da zero, in un nuovo repo, l'infrastruttura di un sito Next.js che combina **sito madre multilingua** e **sistema funnel registry-driven**. È pensato per essere letto da una nuova chat Claude Code che parte da una cartella vuota.
>
> **Cosa NON contiene:** copy di brand, sezioni di pagina specifiche, funnel reali, componenti decorativi del brand precedente. Solo infrastruttura.
>
> **Cosa contiene:** stack tecnico, config files completi, sistema funnel completo (loader/registry/middleware/tracking), pattern API (Brevo + contact + intake), i18n setup, SEO, scripts utility, governance docs.

---

## 0. Come usare questo handoff

Sei la nuova chat Claude Code in una cartella **vuota**. Il tuo compito:

1. **Leggi tutto il file fino in fondo** prima di iniziare.
2. **Chiedi al user le 6 decisioni preliminari** (sezione 1) — non procedere senza.
3. **Esegui setup nell'ordine** delle sezioni 2 → 14.
4. **Alla fine, esegui la checklist verifica** (sezione 15) e riporta gli esiti.
5. Quando crei file che contengono placeholder `{{BRAND_NAME}}`, `{{BRAND_DOMAIN}}` etc., **sostituiscili** con le risposte del user.

Regole comportamento:

- **Mai usare em dash** ("—") in copy, codice, commit o chat. Usare ", " o "(" / ")" o ":" o "-".
- Mai aggiungere commenti che spiegano _cosa_ fa il codice (gli identifier già lo fanno). Solo commenti _perché_.
- Mai inventare contenuto di marketing. Tutti i placeholder restano placeholder finché il user non fornisce copy.
- Niente emoji in output o codice salvo richiesta esplicita.

---

## 1. Decisioni preliminari (CHIEDI AL USER)

Prima di scrivere qualsiasi file, raccogli queste informazioni dal user via `AskUserQuestion`:

| #   | Variabile                                 | Esempio          | Uso                                        |
| --- | ----------------------------------------- | ---------------- | ------------------------------------------ |
| 1   | `{{PROJECT_NAME}}`                        | `acme-website`   | `package.json name`, cartella repo         |
| 2   | `{{BRAND_NAME}}`                          | `Acme`           | metadata, structured data, footer          |
| 3   | `{{BRAND_DOMAIN}}`                        | `acme.com`       | `metadataBase`, robots, sitemap, canonical |
| 4   | `{{BRAND_EMAIL}}`                         | `hello@acme.com` | contact, structured data                   |
| 5   | `{{LANG_PRIMARY}}` + `{{LANG_SECONDARY}}` | `it` + `en`      | i18n locales, default + alternate          |
| 6   | `{{NEEDS_BREVO}}`                         | `yes` / `no`     | Se no, skippa sezione 8 e API routes Brevo |

Opzionali (chiedi solo se user vuole specificarli ora, altrimenti TODO):

- Colore primario brand (hex), per CSS variable `--accent`
- Font family primaria (default: Outfit + DM Sans da Google Fonts)
- GTM ID + Meta Pixel ID (se no, lascia placeholder)

**Sostituisci `{{...}}` in tutti i file sotto** con i valori raccolti.

---

## 2. Stack tecnico (versioni esatte)

Versioni pinnate, non aggiornare senza motivo:

- **Next.js** `14.2.35` (App Router)
- **React** `^18` + **React DOM** `^18`
- **TypeScript** `^5` (strict)
- **Tailwind CSS** `^3.4.1`
- **next-intl** `^4.6.1` (i18n)
- **framer-motion** `^12.35.0`
- **lenis** `^1.3.18` (smooth scroll, opzionale)
- **zustand** `^5.0.9` (state)
- **@iconify/react** `^6.0.2`
- **vitest** `^4.1.6` (testing)
- **prettier** `^3.8.3`
- **eslint** `^8` + **eslint-config-next** `14.2.35`

Node 20+ richiesto.

---

## 3. Setup iniziale

Da cartella vuota:

```bash
# 1. Inizializza Next.js manualmente (skip CLI scaffold per controllo totale)
npm init -y

# 2. Installa dipendenze runtime
npm install next@14.2.35 react@^18 react-dom@^18 \
  next-intl@^4.6.1 framer-motion@^12.35.0 lenis@^1.3.18 \
  zustand@^5.0.9 @iconify/react@^6.0.2

# 3. Installa devDeps
npm install -D typescript@^5 @types/node@^20 @types/react@^18 @types/react-dom@^18 \
  eslint@^8 eslint-config-next@14.2.35 \
  tailwindcss@^3.4.1 postcss@^8 \
  prettier@^3.8.3 vitest@^4.1.6

# 4. Inizializza git
git init
```

Poi crea i file delle sezioni successive **nell'ordine**, sostituendo `{{...}}`.

---

## 4. File di config (root del repo)

### 4.1 `package.json`

Sostituisci interamente il `package.json` generato da `npm init` con:

```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "check:public-assets": "node scripts/check-public-assets.mjs",
    "check:public-assets:strict": "node scripts/check-public-assets.mjs --strict",
    "report:health": "node scripts/report-health.mjs"
  },
  "dependencies": {
    "@iconify/react": "^6.0.2",
    "framer-motion": "^12.35.0",
    "lenis": "^1.3.18",
    "next": "14.2.35",
    "next-intl": "^4.6.1",
    "react": "^18",
    "react-dom": "^18",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "prettier": "^3.8.3",
    "tailwindcss": "^3.4.1",
    "typescript": "^5",
    "vitest": "^4.1.6"
  },
  "browserslist": ["last 2 versions", "not dead", "not ie 11"]
}
```

### 4.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4.3 `next.config.mjs`

```javascript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ["@iconify/react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Aggiungi qui i redirect specifici del brand
    ];
  },
};

export default withNextIntl(nextConfig);
```

### 4.4 `tailwind.config.ts`

Brand palette parametrizzata. Sostituisci i colori con la palette del nuovo brand se fornita.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/funnels/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand palette (placeholder - sostituire con palette reale)
        primary: "#000000",
        accent: "#FF6600",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4.5 `postcss.config.mjs`

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

### 4.6 `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "warn"
  }
}
```

### 4.7 `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100
}
```

### 4.8 `.prettierignore`

```
.next
node_modules
*.plan.md
```

### 4.9 `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    reporters: "default",
  },
});
```

### 4.10 `.gitignore`

Aggiungi al `.gitignore` standard di Next.js:

```
# Custom
backup_*/
legacyold/
*.plan.md
```

### 4.11 `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

### 4.12 `.env.example`

```
# Brevo (CRM/email) - opzionale, solo se NEEDS_BREVO=yes
BREVO_API_KEY=
BREVO_API_KEY_V2=

# Notifiche
SLACK_WEBHOOK_URL=
CONTACT_EMAIL_TO=hello@{{BRAND_DOMAIN}}

# Analytics (opzionali)
NEXT_PUBLIC_META_PIXEL_ID=
# GTM ID hardcoded in src/app/layout.tsx, modificare lì
```

---

## 5. Struttura cartelle (creare scheletro)

```
{{PROJECT_NAME}}/
├── public/
│   ├── images/
│   ├── fonts/
│   └── robots.txt
├── messages/
│   ├── {{LANG_PRIMARY}}.json
│   └── {{LANG_SECONDARY}}.json
├── scripts/
│   ├── check-public-assets.mjs
│   └── report-health.mjs
├── docs/
│   ├── brevo.md                     (solo se NEEDS_BREVO=yes)
│   ├── growth-governance.md
│   ├── funnel-and-page-checklist.md
│   └── public-asset-policy.md
├── .cursor/rules/
│   ├── site-architecture.mdc
│   ├── funnel-architecture.mdc
│   ├── funnel-tracking.mdc
│   ├── funnel-intake-workflow.mdc
│   ├── funnel-abtest-selective.mdc
│   └── growth-governance.mdc
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── contact/route.ts
    │   │   └── (Brevo optin routes secondo necessità)
    │   ├── [locale]/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── error.tsx
    │   │   └── not-found.tsx
    │   ├── funnel-internal/[slug]/[[...step]]/
    │   │   └── page.tsx
    │   ├── funnel-internal/[slug]/
    │   │   └── layout.tsx
    │   ├── layout.tsx              (root layout)
    │   ├── page.tsx                (root redirect)
    │   ├── error.tsx
    │   ├── global-error.tsx
    │   ├── not-found.tsx
    │   ├── sitemap.ts
    │   └── globals.css
    ├── components/
    │   ├── shared/
    │   │   ├── HtmlLang.tsx
    │   │   ├── ErrorBoundary.tsx
    │   │   └── SEO/StructuredData.tsx
    │   └── funnels/
    │       ├── FunnelRenderer.tsx
    │       ├── FunnelPrimitives.tsx
    │       ├── FunnelTrackingBridge.tsx
    │       └── componentMap.tsx
    ├── funnels/
    │   ├── loader.ts
    │   ├── registry.ts
    │   ├── types.ts
    │   ├── tracking.ts
    │   └── component-contract.ts
    ├── i18n/
    │   ├── routing.ts
    │   ├── navigation.ts
    │   └── request.ts
    ├── lib/
    │   ├── reserved-slugs.ts
    │   ├── seo/
    │   │   ├── public-indexing.ts
    │   │   └── public-indexing.test.ts
    │   └── brevo/                  (solo se NEEDS_BREVO=yes)
    │       ├── attributes.ts
    │       └── lists.ts
    └── middleware.ts
```

---

## 6. App Router — Layout root e locale

### 6.1 `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --accent: #ff6600; /* TODO sostituire con accent del brand */
  --accent-secondary: #000000;
}

html {
  scroll-behavior: smooth;
  background-color: var(--background);
  color: var(--foreground);
}

* {
  -webkit-tap-highlight-color: transparent;
}

*:focus {
  outline: none;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[role="button"]:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--accent-secondary);
  outline-offset: 2px;
  border-radius: 4px;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family:
    var(--font-sans),
    system-ui,
    -apple-system,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  width: 100%;
}

/* WCAG 2.4.1 skip link */
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px 20px;
  background: var(--accent);
  color: #fff;
  transform: translateY(-100%);
}
.skip-link:focus {
  transform: translateY(0);
}
```

### 6.2 `src/app/layout.tsx` (ROOT)

```tsx
import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://{{BRAND_DOMAIN}}"),
  title: {
    default: "{{BRAND_NAME}}",
    template: `%s | {{BRAND_NAME}}`,
  },
  description: "TODO descrizione brand",
  authors: [{ name: "{{BRAND_NAME}} Team" }],
  creator: "{{BRAND_NAME}}",
  publisher: "{{BRAND_NAME}}",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="{{LANG_PRIMARY}}" suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 - GDPR compliance */}
        <Script
          id="consent-mode"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />
        {/* TODO: Aggiungere GTM script qui se l'ID GTM è configurato */}
        {/* TODO: Aggiungere Meta Pixel base se NEXT_PUBLIC_META_PIXEL_ID definito */}
      </head>
      <body className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### 6.3 `src/app/page.tsx` (root redirect a locale)

```tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/{{LANG_PRIMARY}}");
}
```

### 6.4 `src/app/[locale]/layout.tsx`

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/shared/SEO/StructuredData";
import { HtmlLang } from "@/components/shared/HtmlLang";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const safeLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: { default: t("title"), template: `%s | {{BRAND_NAME}}` },
    description: t("description"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: buildLocaleAlternates("", safeLocale),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });

  return (
    <>
      <HtmlLang locale={locale} />
      <StructuredData locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
```

### 6.5 `src/app/[locale]/page.tsx` (scaffold)

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4">{t("description")}</p>
    </main>
  );
}
```

### 6.6 `src/app/[locale]/error.tsx` / `not-found.tsx` / `src/app/error.tsx` / `global-error.tsx`

Scaffold minimi:

```tsx
// src/app/[locale]/error.tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <h2>Errore</h2>
      <button onClick={reset}>Riprova</button>
    </div>
  );
}
```

```tsx
// src/app/[locale]/not-found.tsx
export default function NotFound() {
  return (
    <div className="p-8">
      <h2>404</h2>
    </div>
  );
}
```

Stesso pattern per `src/app/error.tsx`, `not-found.tsx`, `global-error.tsx` (questi senza locale).

### 6.7 `src/components/shared/HtmlLang.tsx`

```tsx
"use client";
import { useEffect } from "react";

export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
```

### 6.8 `src/components/shared/ErrorBoundary.tsx`

Component class standard React Error Boundary, opzionale per ora.

---

## 7. i18n (next-intl)

### 7.1 `src/i18n/routing.ts`

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["{{LANG_PRIMARY}}", "{{LANG_SECONDARY}}"],
  defaultLocale: "{{LANG_PRIMARY}}",
  localePrefix: "as-needed",
});
```

### 7.2 `src/i18n/navigation.ts`

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

### 7.3 `src/i18n/request.ts`

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string;
  try {
    const resolved = await requestLocale;
    locale =
      resolved && (routing.locales as readonly string[]).includes(resolved)
        ? resolved
        : routing.defaultLocale;
  } catch {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 7.4 `messages/{{LANG_PRIMARY}}.json` e `{{LANG_SECONDARY}}.json`

Scaffold minimo (entrambi i file con stessa struttura, copy diversa per lingua):

```json
{
  "Metadata": {
    "title": "{{BRAND_NAME}}",
    "description": "TODO descrizione brand",
    "keywords": "TODO, keyword, brand"
  },
  "Home": {
    "title": "TODO Home title",
    "description": "TODO Home description"
  }
}
```

---

## 8. Brevo integration (SKIP se `NEEDS_BREVO=no`)

Se Brevo non serve, salta questa sezione e tutte le API routes `optin/` correlate.

### 8.1 `src/lib/brevo/attributes.ts`

```typescript
/**
 * Brevo contact attributes - single source of truth.
 * Always import from here. Mai stringhe raw: typo silenti.
 * Reference completa: docs/brevo.md
 */
export const BREVO_ATTR = {
  // Identity (campi italiani, NON FIRSTNAME/LASTNAME)
  NOME: "NOME",
  COGNOME: "COGNOME",
  // Contact
  TELEFONO: "TELEFONO_", // underscore finale intenzionale
  WHATSAPP: "WHATSAPP",
  // Professional
  AZIENDA: "AZIENDA",
  JOB_TITLE: "JOB_TITLE",
  NUMERO_DIPENDENTI: "NUMERO_DIPENDENTI",
  // Lifecycle
  FORM_NAME: "FORM_NAME",
  REFERRAL_NAME: "REFERRAL_NAME",
  CREATED_AT: "CREATED_AT",
  OPT_IN: "OPT_IN",
  DOUBLE_OPT_IN: "DOUBLE_OPT-IN", // trattino intenzionale
  // System
  EXT_ID: "EXT_ID",
} as const;

export type BrevoAttrKey = keyof typeof BREVO_ATTR;
```

### 8.2 `src/lib/brevo/lists.ts`

```typescript
/**
 * Brevo list IDs via env vars. Mai hardcodare ID nel codice.
 * Aggiungere qui ogni nuova lista, poi env var su Vercel.
 */
export const BREVO_LIST_ENV = {
  // Esempio: NEWSLETTER: "BREVO_NEWSLETTER_LIST_ID",
} as const;

export type BrevoListEnvKey = keyof typeof BREVO_LIST_ENV;

export function getBrevoListId(key: BrevoListEnvKey): number | undefined {
  const raw = process.env[BREVO_LIST_ENV[key]];
  if (!raw) return undefined;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
```

### 8.3 Pattern endpoint opt-in Brevo

Ogni `/api/funnels/<funnel>/optin/route.ts` segue questo pattern:

```typescript
import { NextResponse } from "next/server";
import { BREVO_ATTR } from "@/lib/brevo/attributes";
import { getBrevoListId } from "@/lib/brevo/lists";

const DEFAULT_FORM_NAME = "Funnel_TODO";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload.email || typeof payload.email !== "string") {
      return NextResponse.json({ success: false, error: "invalid_email" }, { status: 400 });
    }

    const brevoKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (!brevoKey) {
      return NextResponse.json({ success: false, error: "missing_brevo_key" }, { status: 500 });
    }

    const listId = getBrevoListId("TODO_LIST_KEY");
    const listIds = listId ? [listId] : [];

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        attributes: {
          [BREVO_ATTR.NOME]: payload.nome ?? "",
          [BREVO_ATTR.FORM_NAME]: payload.source ?? DEFAULT_FORM_NAME,
        },
        listIds,
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { success: false, error: "brevo_contact_failed", details },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "unexpected_error", details: String(error) },
      { status: 500 },
    );
  }
}
```

### 8.4 `docs/brevo.md`

Crea documento di reference (versione brand-agnostic):

```markdown
# Brevo - reference operativa

Fonte di verità per integrazione Brevo (CRM/email).
Prima di scrivere/modificare endpoint Brevo, leggi questo file.

> Codice: src/lib/brevo/attributes.ts, src/lib/brevo/lists.ts

## Regola d'oro

Mai stringhe raw per attributi. Sempre `BREVO_ATTR.NOME`, mai `"NOME"`.
Previene errori silenziosi (es. scrivere su `FIRSTNAME` quando il campo custom è `NOME`).

## Custom attributes

Nomi case-sensitive, devono matchare il dashboard Brevo.
Aggiornare la tabella in attributes.ts E in questo file ogni volta.

## Liste

List ID via env var (mai hardcodate).
Aggiungere nuova lista:

1. Crearla su Brevo dashboard
2. Aggiungere chiave in `BREVO_LIST_ENV` (lists.ts)
3. Aggiornare tabella sotto
4. Aggiungere env var su Vercel (production + preview)

## Pattern endpoint opt-in

Ogni `/api/funnels/<funnel>/optin` deve:

1. Validare payload (almeno email)
2. Leggere `BREVO_API_KEY_V2 || BREVO_API_KEY` - se manca: 500
3. Risolvere list ID via `getBrevoListId(...)`
4. POST a `https://api.brevo.com/v3/contacts` con `updateEnabled: true`
5. Su error: 502 con details
6. Su success: `{ success: true }`

## Convenzione FORM_NAME

Sempre popolare. Identifica sorgente del contatto.

- Webinar: `webinar-<topic>`
- Freebie: `Freebie_<nome>` (match con nome lista)
- Lead magnet: `LeadMagnet_<topic>`
```

---

## 9. API routes (sito madre)

### 9.1 `src/app/api/contact/route.ts`

Pattern parametrizzato (rimuovere copy specifico Morfeus, mantenere struttura):

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const emailSubject = `New contact from ${data.fullName} - ${data.company ?? ""}`;
    const emailBody = `
New {{BRAND_NAME}} contact request

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phonePrefix ?? ""} ${data.phone ?? ""}
Company: ${data.company ?? ""}
Role: ${data.role ?? ""}

Message:
${data.message ?? ""}

Submitted: ${data.submittedAt ?? new Date().toISOString()}
Locale: ${data.locale ?? ""}
    `.trim();

    const brevoKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (brevoKey) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "{{BRAND_NAME}} Website", email: "hello@{{BRAND_DOMAIN}}" },
            to: (process.env.CONTACT_EMAIL_TO || "hello@{{BRAND_DOMAIN}}")
              .split(",")
              .map((email) => ({ email: email.trim() })),
            subject: emailSubject,
            textContent: emailBody,
            replyTo: { email: data.email, name: data.fullName },
          }),
        });
      } catch (error) {
        console.error("Brevo email failed:", error);
      }
    }

    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailBody }),
        });
      } catch (error) {
        console.error("Slack failed:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "submission_failed" }, { status: 500 });
  }
}
```

---

## 10. Middleware (i18n + funnel rewrite + A/B + headers SEO)

### 10.1 `src/middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getFunnelRegistryItem, isRegisteredFunnelSlug } from "./funnels/registry";
import { NON_INDEXABLE_LOCALE_PREFIXES, SUPPORTED_LOCALES } from "./lib/seo/public-indexing";

const intlMiddleware = createMiddleware(routing);
const AB_COOKIE_PREFIX = "ab_";

function getPathSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

function pickVariant(variants: Array<"A" | "B">): "A" | "B" {
  if (variants.length <= 1) return variants[0] ?? "A";
  return Math.random() < 0.5 ? "A" : "B";
}

function buildInternalFunnelPath(slug: string, restSegments: string[]): string {
  const suffix = restSegments.length > 0 ? `/${restSegments.join("/")}` : "";
  return `/funnel-internal/${slug}${suffix}`;
}

function isNonIndexableLocalePath(segments: string[]): boolean {
  if (segments.length < 2) return false;
  const locale = segments[0];
  const section = segments[1];
  return (
    SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number]) &&
    NON_INDEXABLE_LOCALE_PREFIXES.includes(
      section as (typeof NON_INDEXABLE_LOCALE_PREFIXES)[number],
    )
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
      const variant =
        existing && funnel.abTest.variants.includes(existing)
          ? existing
          : pickVariant(funnel.abTest.variants);

      response.cookies.set(cookieName, variant, {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
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
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

---

## 11. Sistema Funnel (CUORE dell'infrastruttura)

Il funnel system è registry-driven: ogni funnel ha uno slug root-level (`/slug`), il middleware rewrita a `/funnel-internal/[slug]/[[...step]]`, il loader pesca config + step, il renderer monta i componenti dichiarati in `componentOrder`.

### 11.1 `src/lib/reserved-slugs.ts`

```typescript
/**
 * Slug riservati: NON usabili come funnel slug.
 * Aggiornare ad ogni nuova top-level route.
 */
export const RESERVED_SITE_SLUGS = new Set([
  "{{LANG_PRIMARY}}",
  "{{LANG_SECONDARY}}",
  "api",
  "_next",
  "_vercel",
  "funnel-internal",
  "privacy",
  "cookies",
  // TODO aggiungere qui ogni nuova top-level page del sito madre
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SITE_SLUGS.has(slug);
}
```

### 11.2 `src/funnels/component-contract.ts`

Lista dei nomi di componente validi per il funnel system. **Parti vuoto + minime primitive**, aggiungerai i tuoi quando crei sezioni custom.

```typescript
export const FUNNEL_COMPONENT_NAMES = [
  "Hero",
  "ValueBullets",
  "Agenda",
  "CTABox",
  "ThankYouSummary",
  "VideoSales",
  "OfferStack",
  "CheckoutButton",
] as const;

export type FunnelComponentName = (typeof FUNNEL_COMPONENT_NAMES)[number];

const FUNNEL_COMPONENT_SET = new Set<string>(FUNNEL_COMPONENT_NAMES);

export function isFunnelComponentName(value: string): value is FunnelComponentName {
  return FUNNEL_COMPONENT_SET.has(value);
}
```

### 11.3 `src/funnels/types.ts`

Schema base del funnel config. Espandere con interfacce di contenuto specifiche quando si aggiungono nuovi componenti.

```typescript
export type FunnelVariant = "A" | "B";

import type { FunnelComponentName } from "@/funnels/component-contract";
export type { FunnelComponentName } from "@/funnels/component-contract";

// ============ Content interfaces base ============

export interface HeroContent {
  eyebrow?: string;
  headline: string;
  subheadline: string;
}

export interface ValueBulletsContent {
  title: string;
  items: string[];
}

export interface AgendaContent {
  title: string;
  points: string[];
}

export interface CTABoxContent {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ThankYouSummaryContent {
  title: string;
  body: string;
  checklist?: string[];
}

export interface VideoSalesContent {
  title: string;
  description: string;
  videoUrl?: string;
}

export interface OfferStackContent {
  title: string;
  items: string[];
  priceLabel: string;
}

export interface CheckoutButtonContent {
  label: string;
  href: string;
}

// ============ Funnel step + config ============

export interface FunnelStepContent {
  Hero?: HeroContent;
  ValueBullets?: ValueBulletsContent;
  Agenda?: AgendaContent;
  CTABox?: CTABoxContent;
  ThankYouSummary?: ThankYouSummaryContent;
  VideoSales?: VideoSalesContent;
  OfferStack?: OfferStackContent;
  CheckoutButton?: CheckoutButtonContent;
  // TODO aggiungere qui ogni nuova content interface quando si aggiungono componenti
}

export interface FunnelStepConfig {
  id: string;
  title: string;
  path: string; // "" per step root, "thank-you" per /slug/thank-you, etc.
  componentOrder: FunnelComponentName[];
  content: FunnelStepContent;
  noindex?: boolean;
  isConversion?: boolean;
}

export interface FunnelConfig {
  id: string;
  slug: string;
  accentColor: string;
  steps: FunnelStepConfig[];
}

export interface FunnelRuntime {
  fontPack?: "default" | string;
  theme?: string;
  metadataPreset?: string;
  chatbotStepIds?: string[];
}

export interface FunnelABTest {
  enabled: boolean;
  variants: Array<FunnelVariant>;
}

export interface FunnelRegistryItem {
  slug: string;
  locale: string;
  indexable: boolean;
  runtime?: FunnelRuntime;
  abTest: FunnelABTest;
}
```

### 11.4 `src/funnels/tracking.ts`

```typescript
export type FunnelTrackEventName = "funnel_view" | "cta_click" | "conversion";

export interface FunnelTrackPayload {
  funnel_id: string;
  step_id: string;
  variant?: "A" | "B";
  cta_href?: string;
}
```

### 11.5 `src/funnels/loader.ts`

```typescript
import { getRegisteredFunnelConfig, getFunnelRegistryItem } from "@/funnels/registry";
import { isFunnelComponentName } from "@/funnels/component-contract";
import type { FunnelConfig, FunnelStepConfig } from "@/funnels/types";

function hasUniqueStepIds(steps: FunnelStepConfig[]): boolean {
  const ids = new Set(steps.map((step) => step.id));
  return ids.size === steps.length;
}

function hasValidComponentOrder(step: FunnelStepConfig): boolean {
  return step.componentOrder.every((name) => isFunnelComponentName(name));
}

function validateFunnelConfig(config: FunnelConfig): void {
  if (!config.id || !config.slug) {
    throw new Error("Invalid funnel config: missing id or slug.");
  }
  if (!Array.isArray(config.steps) || config.steps.length === 0) {
    throw new Error(`Invalid funnel config '${config.slug}': at least one step required.`);
  }
  if (!hasUniqueStepIds(config.steps)) {
    throw new Error(`Invalid funnel config '${config.slug}': duplicate step ids.`);
  }
  for (const step of config.steps) {
    if (!step.id || !step.title) {
      throw new Error(`Invalid funnel config '${config.slug}': each step needs id and title.`);
    }
    if (!hasValidComponentOrder(step)) {
      throw new Error(
        `Invalid funnel config '${config.slug}': invalid component in componentOrder.`,
      );
    }
  }
}

export function loadFunnelConfig(slug: string): FunnelConfig | null {
  const registeredItem = getFunnelRegistryItem(slug);
  if (!registeredItem) return null;

  const config = getRegisteredFunnelConfig(slug);
  if (!config) return null;

  validateFunnelConfig(config);
  return config;
}

export function getFunnelStepByPath(
  config: FunnelConfig,
  subPath: string[],
): FunnelStepConfig | null {
  const normalizedPath = subPath.length === 0 ? "" : subPath.join("/");
  return config.steps.find((step) => step.path === normalizedPath) ?? null;
}
```

### 11.6 `src/funnels/registry.ts`

```typescript
import type { FunnelConfig, FunnelRegistryItem } from "@/funnels/types";
import { isReservedSlug } from "@/lib/reserved-slugs";

export const funnelRegistry: Record<string, FunnelRegistryItem> = {};
const funnelConfigMap: Record<string, FunnelConfig> = {};

export function registerFunnel(item: FunnelRegistryItem, config: FunnelConfig): void {
  if (isReservedSlug(item.slug)) {
    throw new Error(
      `Cannot register funnel "${item.slug}": collides with reserved slug. ` +
        `Check src/lib/reserved-slugs.ts.`,
    );
  }
  funnelRegistry[item.slug] = item;
  funnelConfigMap[item.slug] = config;
}

export function getFunnelRegistryItem(slug: string): FunnelRegistryItem | null {
  return funnelRegistry[slug] ?? null;
}

export function isRegisteredFunnelSlug(slug: string): boolean {
  return Boolean(funnelRegistry[slug]);
}

export function getRegisteredFunnelConfig(slug: string): FunnelConfig | null {
  return funnelConfigMap[slug] ?? null;
}

// =====================================================
// REGISTER FUNNELS HERE
// =====================================================
// Pattern per ogni funnel:
//
// import myFunnelConfig from "@/funnels/my-funnel/config.json";
//
// const myFunnelItem: FunnelRegistryItem = {
//   slug: "my-funnel",
//   locale: "{{LANG_PRIMARY}}",
//   indexable: false,
//   abTest: { enabled: false, variants: ["A"] },
// };
// registerFunnel(myFunnelItem, myFunnelConfig as FunnelConfig);
```

### 11.7 `src/components/funnels/FunnelPrimitives.tsx`

```tsx
import Link from "next/link";
import type {
  AgendaContent,
  CTABoxContent,
  CheckoutButtonContent,
  HeroContent,
  OfferStackContent,
  ThankYouSummaryContent,
  ValueBulletsContent,
  VideoSalesContent,
} from "@/funnels/types";

interface AccentProps {
  accentColor: string;
}

export function FunnelHero({ accentColor, content }: AccentProps & { content: HeroContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8 md:p-12">
      {content.eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          {content.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{content.headline}</h1>
      <p className="mt-5 max-w-3xl text-base md:text-lg">{content.subheadline}</p>
    </section>
  );
}

export function FunnelValueBullets({ content }: { content: ValueBulletsContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">{content.title}</h2>
      <ul className="mt-5 space-y-3">
        {content.items.map((item) => (
          <li key={item} className="rounded-xl border border-black/10 p-4">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FunnelAgenda({ content }: { content: AgendaContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">{content.title}</h2>
      <ol className="mt-5 list-decimal space-y-2 pl-6">
        {content.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>
    </section>
  );
}

export function FunnelCTABox({ accentColor, content }: AccentProps & { content: CTABoxContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">{content.title}</h2>
      {content.description ? <p className="mt-3">{content.description}</p> : null}
      <Link
        href={content.ctaHref}
        data-funnel-cta="true"
        data-cta-href={content.ctaHref}
        className="mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.ctaLabel}
      </Link>
    </section>
  );
}

export function FunnelThankYouSummary({ content }: { content: ThankYouSummaryContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h1 className="text-3xl font-semibold">{content.title}</h1>
      <p className="mt-4">{content.body}</p>
      {content.checklist?.length ? (
        <ul className="mt-6 list-disc space-y-2 pl-6">
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function FunnelVideoSales({ content }: { content: VideoSalesContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">{content.title}</h2>
      <p className="mt-3">{content.description}</p>
      <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed">
        {content.videoUrl ? `Video: ${content.videoUrl}` : "Video slot"}
      </div>
    </section>
  );
}

export function FunnelOfferStack({ content }: { content: OfferStackContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">{content.title}</h2>
      <ul className="mt-5 space-y-2">
        {content.items.map((item) => (
          <li key={item} className="rounded-xl border border-black/10 p-4">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-lg font-semibold">{content.priceLabel}</p>
    </section>
  );
}

export function FunnelCheckoutButton({
  accentColor,
  content,
}: AccentProps & { content: CheckoutButtonContent }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-8">
      <Link
        href={content.href}
        data-funnel-cta="true"
        data-cta-href={content.href}
        className="inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: accentColor }}
      >
        {content.label}
      </Link>
    </section>
  );
}
```

### 11.8 `src/components/funnels/componentMap.tsx`

```tsx
import {
  FunnelAgenda,
  FunnelCTABox,
  FunnelCheckoutButton,
  FunnelHero,
  FunnelOfferStack,
  FunnelThankYouSummary,
  FunnelValueBullets,
  FunnelVideoSales,
} from "@/components/funnels/FunnelPrimitives";
import type { FunnelComponentName, FunnelStepConfig } from "@/funnels/types";

interface RenderProps {
  accentColor: string;
  step: FunnelStepConfig;
}

type ComponentRenderer = (props: RenderProps) => JSX.Element | null;

export const funnelComponentMap: Record<FunnelComponentName, ComponentRenderer> = {
  Hero: ({ accentColor, step }) =>
    step.content.Hero ? <FunnelHero accentColor={accentColor} content={step.content.Hero} /> : null,
  ValueBullets: ({ step }) =>
    step.content.ValueBullets ? <FunnelValueBullets content={step.content.ValueBullets} /> : null,
  Agenda: ({ step }) =>
    step.content.Agenda ? <FunnelAgenda content={step.content.Agenda} /> : null,
  CTABox: ({ accentColor, step }) =>
    step.content.CTABox ? (
      <FunnelCTABox accentColor={accentColor} content={step.content.CTABox} />
    ) : null,
  ThankYouSummary: ({ step }) =>
    step.content.ThankYouSummary ? (
      <FunnelThankYouSummary content={step.content.ThankYouSummary} />
    ) : null,
  VideoSales: ({ step }) =>
    step.content.VideoSales ? <FunnelVideoSales content={step.content.VideoSales} /> : null,
  OfferStack: ({ step }) =>
    step.content.OfferStack ? <FunnelOfferStack content={step.content.OfferStack} /> : null,
  CheckoutButton: ({ accentColor, step }) =>
    step.content.CheckoutButton ? (
      <FunnelCheckoutButton accentColor={accentColor} content={step.content.CheckoutButton} />
    ) : null,
  // TODO aggiungere qui i renderer dei componenti custom (Header, Hero, FAQ, etc.) man mano che li crei
};
```

### 11.9 `src/components/funnels/FunnelRenderer.tsx`

```tsx
import { funnelComponentMap } from "@/components/funnels/componentMap";
import type { FunnelConfig, FunnelStepConfig } from "@/funnels/types";

interface FunnelRendererProps {
  funnel: FunnelConfig;
  step: FunnelStepConfig;
}

export function FunnelRenderer({ funnel, step }: FunnelRendererProps) {
  return (
    <main className="mx-auto max-w-5xl space-y-8 p-6 md:p-10">
      {step.componentOrder.map((componentName, idx) => {
        const Renderer = funnelComponentMap[componentName];
        if (!Renderer) return null;
        return (
          <div key={`${componentName}-${idx}`}>
            <Renderer accentColor={funnel.accentColor} step={step} />
          </div>
        );
      })}
    </main>
  );
}
```

### 11.10 `src/components/funnels/FunnelTrackingBridge.tsx`

```tsx
"use client";

import { useEffect } from "react";
import type { FunnelTrackEventName, FunnelTrackPayload } from "@/funnels/tracking";

interface FunnelTrackingBridgeProps {
  funnelId: string;
  stepId: string;
  variant?: "A" | "B";
  isConversionStep: boolean;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushEvent(eventName: FunnelTrackEventName, payload: FunnelTrackPayload) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...payload });
}

export function FunnelTrackingBridge({
  funnelId,
  stepId,
  variant,
  isConversionStep,
}: FunnelTrackingBridgeProps) {
  useEffect(() => {
    const basePayload: FunnelTrackPayload = {
      funnel_id: funnelId,
      step_id: stepId,
      ...(variant ? { variant } : {}),
    };

    pushEvent("funnel_view", basePayload);
    if (isConversionStep) pushEvent("conversion", basePayload);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const ctaElement = target?.closest("[data-funnel-cta='true']") as HTMLElement | null;
      if (!ctaElement) return;

      const ctaHref = ctaElement.getAttribute("data-cta-href") ?? undefined;
      pushEvent("cta_click", {
        ...basePayload,
        ...(ctaHref ? { cta_href: ctaHref } : {}),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [funnelId, stepId, variant, isConversionStep]);

  return null;
}
```

### 11.11 `src/app/funnel-internal/[slug]/layout.tsx`

```tsx
import Script from "next/script";

export default function FunnelSlugLayout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {pixelId && (
        <Script
          id="meta-pixel-funnel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${pixelId}');
              fbq('track','PageView');
            `,
          }}
        />
      )}
      {children}
    </>
  );
}
```

### 11.12 `src/app/funnel-internal/[slug]/[[...step]]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FunnelRenderer } from "@/components/funnels/FunnelRenderer";
import { FunnelTrackingBridge } from "@/components/funnels/FunnelTrackingBridge";
import { getFunnelStepByPath, loadFunnelConfig } from "@/funnels/loader";

interface FunnelPageProps {
  params: {
    slug: string;
    step?: string[];
  };
}

export function generateMetadata({ params }: FunnelPageProps): Metadata {
  const funnel = loadFunnelConfig(params.slug);
  if (!funnel) return {};
  const step = getFunnelStepByPath(funnel, params.step ?? []);

  if (step?.noindex) {
    return {
      title: step.title,
      robots: { index: false, follow: false, nocache: true },
    };
  }

  return { title: step?.title };
}

export default function FunnelPage({ params }: FunnelPageProps) {
  const funnel = loadFunnelConfig(params.slug);
  if (!funnel) notFound();

  const step = getFunnelStepByPath(funnel, params.step ?? []);
  if (!step) notFound();

  const cookieName = `ab_${params.slug}`;
  const variantCookie = cookies().get(cookieName)?.value;
  const variant = variantCookie === "A" || variantCookie === "B" ? variantCookie : undefined;
  const isConversionStep = step.isConversion === true;

  return (
    <>
      <FunnelTrackingBridge
        funnelId={funnel.id}
        stepId={step.id}
        variant={variant}
        isConversionStep={isConversionStep}
      />
      <FunnelRenderer funnel={funnel} step={step} />
    </>
  );
}
```

### 11.13 Component contract test

`src/funnels/component-contract.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { FUNNEL_COMPONENT_NAMES, isFunnelComponentName } from "./component-contract";

describe("funnel component contract", () => {
  it("recognizes known components", () => {
    expect(isFunnelComponentName("Hero")).toBe(true);
    expect(isFunnelComponentName("CTABox")).toBe(true);
  });

  it("rejects unknown components", () => {
    expect(isFunnelComponentName("UnknownComponent")).toBe(false);
  });

  it("keeps component names unique", () => {
    const unique = new Set(FUNNEL_COMPONENT_NAMES);
    expect(unique.size).toBe(FUNNEL_COMPONENT_NAMES.length);
  });
});
```

---

## 12. SEO infrastructure

### 12.1 `src/lib/seo/public-indexing.ts`

```typescript
export const SUPPORTED_LOCALES = ["{{LANG_PRIMARY}}", "{{LANG_SECONDARY}}"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Locale routes intenzionalmente indicizzabili.
 * Aggiungere ogni nuova top-level page del sito madre.
 */
export const INDEXABLE_LOCALE_PATHS = ["", "privacy", "cookies"] as const;

export const NON_INDEXABLE_LOCALE_PREFIXES = [
  // es. "portal", "thank-you", "private"
] as const;

export function buildLocalizedPath(locale: SupportedLocale, path: string): string {
  const normalized = path.trim();
  if (normalized.length === 0) return `/${locale}`;
  return `/${locale}/${normalized}`;
}

export function buildLocalizedUrl(baseUrl: string, locale: SupportedLocale, path: string): string {
  return `${baseUrl}${buildLocalizedPath(locale, path)}`;
}

export function buildLocaleAlternates(path: string, locale: SupportedLocale) {
  return {
    canonical: buildLocalizedPath(locale, path),
    languages: {
      "{{LANG_PRIMARY}}": buildLocalizedPath("{{LANG_PRIMARY}}" as SupportedLocale, path),
      "{{LANG_SECONDARY}}": buildLocalizedPath("{{LANG_SECONDARY}}" as SupportedLocale, path),
      "x-default": buildLocalizedPath("{{LANG_PRIMARY}}" as SupportedLocale, path),
    },
  };
}

export function getIndexableLocalizedEntries(baseUrl: string) {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INDEXABLE_LOCALE_PATHS.map((path) => ({
      locale,
      path,
      url: buildLocalizedUrl(baseUrl, locale, path),
    })),
  );
}
```

### 12.2 `src/lib/seo/public-indexing.test.ts`

```typescript
import { describe, expect, it } from "vitest";
import {
  buildLocalizedPath,
  buildLocalizedUrl,
  buildLocaleAlternates,
  getIndexableLocalizedEntries,
} from "./public-indexing";

describe("buildLocalizedPath", () => {
  it("returns root for empty path", () => {
    expect(buildLocalizedPath("{{LANG_PRIMARY}}", "")).toBe("/{{LANG_PRIMARY}}");
  });
  it("prefixes locale", () => {
    expect(buildLocalizedPath("{{LANG_PRIMARY}}", "privacy")).toBe("/{{LANG_PRIMARY}}/privacy");
  });
});

describe("buildLocaleAlternates", () => {
  it("includes both locales and x-default", () => {
    const result = buildLocaleAlternates("privacy", "{{LANG_PRIMARY}}");
    expect(result.canonical).toBe("/{{LANG_PRIMARY}}/privacy");
    expect(result.languages["{{LANG_PRIMARY}}"]).toBe("/{{LANG_PRIMARY}}/privacy");
    expect(result.languages["x-default"]).toBeDefined();
  });
});

describe("getIndexableLocalizedEntries", () => {
  it("returns entries for all locales x paths", () => {
    const entries = getIndexableLocalizedEntries("https://example.com");
    expect(entries.length).toBeGreaterThan(0);
  });
});
```

### 12.3 `src/components/shared/SEO/StructuredData.tsx`

Schema.org JSON-LD parametrizzato:

```tsx
interface StructuredDataProps {
  locale: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = "https://{{BRAND_DOMAIN}}";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "{{BRAND_NAME}}",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/brand/logo.png`,
    },
    description: "TODO descrizione brand",
    email: "{{BRAND_EMAIL}}",
    contactPoint: {
      "@type": "ContactPoint",
      email: "{{BRAND_EMAIL}}",
      contactType: "customer service",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "{{BRAND_NAME}}",
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage:
      locale === "{{LANG_PRIMARY}}"
        ? "{{LANG_PRIMARY}}-{{LANG_PRIMARY_UPPER}}"
        : "{{LANG_SECONDARY}}-{{LANG_SECONDARY_UPPER}}",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
```

### 12.4 `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from "next";
import { getIndexableLocalizedEntries } from "@/lib/seo/public-indexing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://{{BRAND_DOMAIN}}";
  const entries = getIndexableLocalizedEntries(baseUrl);
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: entry.path === "" ? 1.0 : 0.7,
  }));
}
```

### 12.5 `public/robots.txt`

```
# {{BRAND_NAME}} Website Robots

User-agent: *
Allow: /

Disallow: /api/
Disallow: /_vercel/
Disallow: /funnel-internal/

# AI crawlers (esplicitamente permessi - rimuovi se vuoi opt-out)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://{{BRAND_DOMAIN}}/sitemap.xml
```

---

## 13. Scripts utility

### 13.1 `scripts/check-public-assets.mjs`

```javascript
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const strict = process.argv.includes("--strict");
const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

const blockedDirectories = new Set([
  // Aggiungi nomi cartelle che non devono finire in public/
]);

const maxFileSizeBytes = 8 * 1024 * 1024;

async function getTopLevelEntries(dir) {
  return readdir(dir, { withFileTypes: true });
}

async function getOversizedTopLevelFiles(dir, entries) {
  const oversized = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const fullPath = path.join(dir, entry.name);
    const info = await stat(fullPath);
    if (info.size > maxFileSizeBytes) {
      oversized.push({ name: entry.name, size: info.size });
    }
  }
  return oversized;
}

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

async function main() {
  const entries = await getTopLevelEntries(publicDir);
  const blockedFound = entries
    .filter((entry) => entry.isDirectory() && blockedDirectories.has(entry.name))
    .map((entry) => entry.name);
  const oversizedFiles = await getOversizedTopLevelFiles(publicDir, entries);

  if (blockedFound.length === 0 && oversizedFiles.length === 0) {
    console.log("[public-check] OK");
    return;
  }

  if (blockedFound.length > 0) {
    console.warn("[public-check] Blocked directories:");
    for (const name of blockedFound) console.warn(`  - ${name}`);
  }
  if (oversizedFiles.length > 0) {
    console.warn(`[public-check] Files over ${formatSize(maxFileSizeBytes)}:`);
    for (const file of oversizedFiles) console.warn(`  - ${file.name} (${formatSize(file.size)})`);
  }

  if (strict) process.exitCode = 1;
}

main().catch((error) => {
  console.error("[public-check] Error:", error);
  process.exit(1);
});
```

### 13.2 `scripts/report-health.mjs`

```javascript
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const funnelsDir = path.join(projectRoot, "src", "funnels");

async function walk(dir, files = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath, files);
        continue;
      }
      if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch {
    // dir doesn't exist yet, ok
  }
  return files;
}

function toRepoPath(fullPath) {
  return path.relative(projectRoot, fullPath).replaceAll("\\", "/");
}

async function getLargeFunnelFiles() {
  const files = await walk(funnelsDir);
  const large = [];
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = content.split(/\r?\n/).length;
    if (lines > 1000) large.push({ file: toRepoPath(file), lines });
  }
  return large.sort((a, b) => b.lines - a.lines);
}

async function countFunnelEslintDisables() {
  const files = await walk(funnelsDir);
  let count = 0;
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const matches = content.match(/eslint-disable/g);
    count += matches?.length ?? 0;
  }
  return count;
}

async function main() {
  const [largeFiles, eslintDisableCount] = await Promise.all([
    getLargeFunnelFiles(),
    countFunnelEslintDisables(),
  ]);

  console.log("=== Health Report ===");
  console.log(`Large funnel files (>1000 lines): ${largeFiles.length}`);
  for (const item of largeFiles.slice(0, 12)) {
    console.log(`  - ${item.file}: ${item.lines} lines`);
  }
  console.log(`eslint-disable in src/funnels: ${eslintDisableCount}`);
}

main().catch((error) => {
  console.error("Health report failed:", error);
  process.exit(1);
});
```

---

## 14. Governance docs e Cursor rules

### 14.1 `docs/growth-governance.md`

```markdown
# Growth Governance

Tenere pulita la struttura mentre il progetto cresce.

## Decidere prima il dominio

- Se modifichi `src/app/[locale]/...`: standard **sito madre** (i18n, SEO metadata, route localizzate)
- Se modifichi `src/funnels/**` o `src/app/funnel-internal/**`: standard **funnel** (registry-driven, conversion tracking, no locale prefix)
- Mai mischiare componenti tra sito e funnel.

## Letture obbligatorie prima di implementare

- `.cursor/rules/site-architecture.mdc`
- `.cursor/rules/funnel-architecture.mdc`
- Per SEO: `.cursor/rules/site-seo.mdc` (se esiste)

## Anti-regression

- Preferire registry/config a hardcoding di slug
- Component contract in single source: `src/funnels/component-contract.ts`
- Asset policy: `docs/public-asset-policy.md`

## Validation loop

Prima di chiudere lavoro:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run check:public-assets`
- `npm run report:health`
```

### 14.2 `docs/funnel-and-page-checklist.md`

```markdown
# Funnel & Page Checklist

## Nuovo funnel

- [ ] Slug aggiunto a `src/funnels/registry.ts` con `registerFunnel(...)`
- [ ] Slug NON in `src/lib/reserved-slugs.ts` (collisione)
- [ ] Config JSON validato dal loader
- [ ] Almeno 1 step con componentOrder valido
- [ ] Indexable: true (sales/lead magnet pubblici) o false (thank-you, private)
- [ ] A/B test: enabled solo se serve davvero
- [ ] FORM_NAME definito se ha opt-in
- [ ] Tracking eventi (funnel_view automatico, conversion solo su step finale)

## Nuova pagina sito madre

- [ ] Sotto `src/app/[locale]/<route>/`
- [ ] Aggiunta a `INDEXABLE_LOCALE_PATHS` se va in sitemap
- [ ] Copy in `messages/{{LANG_PRIMARY}}.json` + `{{LANG_SECONDARY}}.json`, mai hardcoded
- [ ] `generateMetadata` con `buildLocaleAlternates(...)`
- [ ] Slug NON in conflitto con funnel registry

## Quality gates pre-merge

- [ ] `npm run lint` clean
- [ ] `npm run typecheck` clean
- [ ] `npm run test` passa
- [ ] `npm run build` riesce
- [ ] `npm run check:public-assets` clean
```

### 14.3 `docs/public-asset-policy.md`

```markdown
# Public Asset Policy

## Allowed in public/

- `images/` - assets ottimizzati (webp/avif preferiti)
- `fonts/` - solo font self-hosted necessari
- `icons/` - favicon, apple-touch-icon
- `logo/` - brand marks
- Root: `robots.txt`, `sitemap.xml` (generato), favicon

## NOT allowed

- File > 8MB (script `check:public-assets` warning/strict)
- Documenti privati, materiali interni
- Backup/dump di altri progetti

## Process

1. Prima di aggiungere asset, verifica peso < 8MB
2. Preferire CDN/Supabase per immagini grosse
3. Eseguire `npm run check:public-assets:strict` in CI

## Blocked directories

Aggiungere a `scripts/check-public-assets.mjs` `blockedDirectories` ogni cartella che non deve esistere in public/.
```

### 14.4 Cursor rules

Crea `.cursor/rules/` con questi file `.mdc`:

**`.cursor/rules/site-architecture.mdc`**:

```markdown
---
description: Project architecture and conventions
alwaysApply: true
---

# Site Architecture

## Two separate worlds

1. **Sito madre** (`src/app/[locale]/...`): locale-prefixed, i18n via next-intl
2. **Funnel area** (`src/app/funnel-internal/...`): no locale prefix, single-language per funnel, middleware rewrite from `/slug`

Mai condividere page components tra i due. Infrastructure (types, tracking, middleware) condivisa ok.

## Folder conventions

src/components/
shared/ → Cross-page (CookieConsent, ErrorBoundary, StructuredData)
funnels/ → Funnel-only (FunnelRenderer, FunnelPrimitives)

## Rules

- Tutta la copy in `messages/*.json`, mai hardcoded in TSX
- Prima di creare route, check `src/lib/reserved-slugs.ts`
- Mai em dash in output
```

**`.cursor/rules/funnel-architecture.mdc`**:

```markdown
---
description: Funnel routing and architecture standards
globs: src/{middleware.ts,app/funnel-internal/**,funnels/**}
alwaysApply: false
---

# Funnel Architecture

- Funnel URLs root-level (`/slug`), risolti solo via registry esplicito in `src/funnels/registry.ts`
- No locale prefix sui funnel
- Middleware rewrite a `/funnel-internal/...` per evitare conflitti dynamic route
- Mai trattare slug non registrato come funnel
```

**`.cursor/rules/funnel-tracking.mdc`**:

```markdown
---
description: Funnel tracking event standards
globs: src/{app/funnel-internal/**,components/funnels/**,funnels/**}/**/*.{ts,tsx}
alwaysApply: false
---

# Funnel Tracking

- Emit `funnel_view` su step view
- Emit `cta_click` su CTA con `data-funnel-cta="true"`
- Emit `conversion` solo su step finali confermati
- Payload include sempre `funnel_id` + `step_id`
- Se A/B abilitato: include `variant`
```

**`.cursor/rules/funnel-intake-workflow.mdc`**:

```markdown
---
description: Funnel intake mandatory workflow
globs: src/{funnels/**,app/funnel-internal/**,middleware.ts}
alwaysApply: false
---

# Funnel Intake Workflow

Quando user chiede di creare/start/build un funnel:

1. Lista step user prima di implementare
2. Continua con input parziali (mark missing as TODO)
3. Report intake status: `complete` / `partial` / `missing`
4. Chiedi slug + obiettivo se mancanti
5. Chiedi A/B intent (yes/no, selective?)

Required intake:

- context (ICP, positioning, offer)
- copy (headlines, CTA, objections)
- flow (steps, conversion target, events)

Output post-intake:

- Proposed structure (routes, steps, componentOrder)
- Risk list (missing inputs)
- Next actions
```

**`.cursor/rules/funnel-abtest-selective.mdc`**:

```markdown
---
description: Selective AB test handling
globs: src/{middleware.ts,funnels/**,app/funnel-internal/**}
alwaysApply: false
---

# Selective AB Testing

- A/B abilitato solo se `abTest.enabled: true` nel registry
- Funnel senza A/B usa config singolo, skip variant assignment
- Persist variant via cookie per-funnel (`ab_<slug>`)
- Variant constrained a quelli dichiarati
- No global randomization
```

**`.cursor/rules/growth-governance.mdc`**:

```markdown
---
description: Persistent growth governance
alwaysApply: true
---

# Growth Governance

## Decidere prima il dominio

- `src/app/[locale]/...` → standard sito madre
- `src/funnels/**` → standard funnel
- Mai mischiare

## Letture obbligatorie

- `.cursor/rules/site-architecture.mdc`
- `.cursor/rules/funnel-architecture.mdc`
- Per SEO: `.cursor/rules/funnel-tracking.mdc`

## Anti-regression

- Registry/config > hardcoding slug
- Component contract in single source
- Asset policy via `scripts/check-public-assets.mjs`

## Validation loop

Prima di chiudere:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run check:public-assets`
- `npm run report:health`
```

---

## 15. Checklist finale verifica setup

Dopo aver creato tutti i file, esegui in ordine:

```bash
# 1. Install dependencies
npm install

# 2. Type check
npm run typecheck

# 3. Lint
npm run lint

# 4. Test
npm run test

# 5. Build
npm run build

# 6. Public assets check
npm run check:public-assets

# 7. Health report
npm run report:health

# 8. Dev server (verifica manuale)
npm run dev
```

Verifiche manuali nel browser su `http://localhost:3000`:

- [ ] Root `/` redirige a `/{{LANG_PRIMARY}}`
- [ ] `/{{LANG_PRIMARY}}` mostra home scaffold
- [ ] `/{{LANG_SECONDARY}}` mostra home in lingua secondaria
- [ ] `/{{LANG_PRIMARY}}/inesistente` mostra 404
- [ ] DevTools → Network: `robots.txt` accessibile
- [ ] DevTools → Sources: `JSON-LD` Organization presente in HTML
- [ ] Response headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` presenti

Test funnel system (richiede registrare almeno un funnel di prova):

- [ ] Registra `test-funnel` in `src/funnels/registry.ts` con config minimo (1 step con Hero)
- [ ] Naviga `/test-funnel` → render funnel
- [ ] Console: `window.dataLayer` contiene evento `funnel_view`
- [ ] Click CTA → evento `cta_click` in dataLayer

---

## 16. Cosa NON è incluso (deciso esplicitamente)

Per chiarezza, queste cose NON fanno parte di questo handoff (vanno costruite quando servono):

- **Componenti decorativi**: HomeHero, ServiceHero, FAQ, Pricing custom, sezioni di marketing — nessuno
- **Sezioni funnel specifiche**: WebinarHero, SalesModules, BootcampProgram, etc. — niente, solo le 8 primitive base
- **Pagine sito**: nessuna oltre home scaffold + privacy/cookies placeholder
- **Funnel reali**: zero funnel registrati. Pattern in `registry.ts` mostra come aggiungere
- **CookieConsent component**: omesso (GDPR banner). Aggiungerlo quando il sito va live
- **Chatbot widget**: omesso. Aggiungerlo se serve
- **Smooth scroll (Lenis)**: dipendenza installata ma non integrata. Wrapper opzionale
- **Zustand stores**: dipendenza installata, nessuno store creato
- **Framer Motion**: dipendenza installata, nessuna animation creata
- **GTM ID hardcoded**: lasciato come TODO in `layout.tsx`
- **Service worker / PWA**: non incluso

---

## 17. Note finali per la chat che esegue

1. **Lavora a chunk piccoli**: crea tutti i file di una sezione, poi typecheck/lint, poi vai avanti. Non creare 50 file in un colpo solo senza verificare.

2. **Sostituisci `{{...}}` ovunque**: cerca con Grep tutte le occorrenze di `{{` nel repo creato prima di completare. Non lasciare placeholder.

3. **Genera `.env.local`** con i valori finali (anche vuoti) per non rompere il dev server.

4. **Crea primo commit** dopo che `npm run build` passa, con messaggio tipo `chore: initial infrastructure scaffold`.

5. **Riporta a Matteo** alla fine:
   - Quali verifiche sono passate
   - Quali TODO restano (es. GTM ID, Meta Pixel, palette finale, copy)
   - Come testare un funnel (registrare uno di prova)

6. **Se incontri scelte non coperte qui**, chiedi a Matteo prima di decidere unilateralmente.

---

**FINE HANDOFF.** Versione: 1.0 — generata 2026-05-24 da chat predecessore.
