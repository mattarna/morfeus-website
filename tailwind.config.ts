import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // NB: `safelist` non esiste piu in Tailwind v4 (rimosso dal tipo Config).
  // Non serve reintrodurlo con `@source inline(...)`: le classi dei temi optin
  // sono stringhe LETTERALI in src/components/mockups/optin-themes.ts, che il
  // rilevatore di sorgenti di v4 scansiona automaticamente.
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // MORFEUS Official Palette v1.0
        night: "#0B0B0C",
        midnight: "#201F6E",
        persian: "#392CB8",
        majorelle: "#533DFC",
        neon: "#6475FA",
        vista: "#8CA5F7",
        "ghost-white": "#E4E7F0",
        forge: "#E8650A",
        // ---- brand 2026 "Progettato. Provato." (pagine contenuto, scope .ms)
        // PORTATI da exp/font-jakarta: stessi nomi, stessi valori. I NOMI
        // restano quelli del brand 2026 perche' li usano ~200 regole in
        // site.css; i VALORI sono allineati alla Official Palette qui sopra
        // ("carta" = ghost-white, "inchiostro" = night). I neutri sono
        // DERIVATI: la palette ufficiale ha 8 colori e nessun grigio.
        // Serve a SiteHeader/SiteFooter, che sono scritti in utility Tailwind.
        carta: "#E4E7F0", // ghost-white
        inchiostro: "#0B0B0C", // night
        "inchiostro-2": "#16161A", // DERIVATO: pannello su night
        "riga-scuro": "#26262B", // DERIVATO: righe su fondo scuro
        firma: "#533DFC", // majorelle
        "firma-hover": "#392CB8", // persian
        lilla: "#8CA5F7", // vista
        ombra: "#7E8091", // DERIVATO: testo attenuato
        // Legacy/Generic mapping (mapping majorelle to purple for backward compat if needed)
        purple: {
          DEFAULT: "#533DFC", // Majorelle Blue
          50: "#EFEDFB",
          100: "#DDD9F8",
          200: "#BBB4F1",
          300: "#998FEA",
          400: "#7764E3",
          500: "#533DFC",
          600: "#533DEC",
          700: "#3925C7",
          800: "#2B1C96",
          900: "#1D1365",
          950: "#130D43",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        prodigy: ["var(--font-prodigy)", "sans-serif"],
        // brand 2026: i tre font del sistema .ms (variabili, self-hostati in
        // public/fonts/webinar-claude/ — vedi src/components/site/fonts.ts)
        clash: ["var(--font-clash)", "var(--font-outfit)", "system-ui", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "var(--font-dm-sans)", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        plex: ["var(--f-mono)", "'IBM Plex Mono'", "monospace"],
      },
      transitionDuration: {
        "1000": "1000ms",
      },
      borderWidth: {
        "1.5": "1.5px",
      },
    },
  },
  plugins: [],
};
export default config;
