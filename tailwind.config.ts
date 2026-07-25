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
