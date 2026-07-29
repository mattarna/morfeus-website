import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // main non elencava i funnel: rimessi, perche' usano classi Tailwind.
    // Percorsi in piu' sono innocui, uno in meno no.
    "./src/funnels/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // NB: `safelist` non esiste piu' in Tailwind v4 (rimosso dal tipo Config).
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
        // Content pages (sito madre non-home). I NOMI restano quelli del
        // brand 2026, i VALORI sono allineati alla Official Palette v1.0
        // qui sopra — stessa scelta fatta nei token di site.css, dove i
        // nomi sono usati da ~200 regole. Quindi: "carta" = ghost-white,
        // "inchiostro" = night. I neutri sono DERIVATI (la palette
        // ufficiale ha 8 colori e nessun grigio).
        carta: "#E4E7F0", // ghost-white (era #F4F3EF crema)
        inchiostro: "#0B0B0C", // night (era #14132E)
        "inchiostro-2": "#16161A", // DERIVATO (era #211F45)
        "riga-scuro": "#26262B", // DERIVATO (era #2A2850)
        firma: "#533DFC", // majorelle — era gia' allineato
        "firma-hover": "#392CB8", // persian (era #4230D6)
        lilla: "#8CA5F7", // vista (era #A99CFF)
        ombra: "#7E8091", // DERIVATO (era #7A7890)
        anomalia: "#FF5C5C", // stato: errore — fuori palette, resta
        ok: "#1E9E5A", // stato: ok — fuori palette, resta
        marker: "#E8650A", // forge (era il giallo #FFE14D)
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
        clash: ["var(--font-clash)", "var(--font-outfit)", "system-ui", "sans-serif"],
        // I NOMI restano (12 usi di font-satoshi, 89 di font-plex nelle
        // pagine): sono i VALORI ad essere allineati al sistema attuale,
        // stessa scelta fatta per i token della palette.
        // "satoshi" ora e' Plus Jakarta Sans, il font del corpo del DS.
        satoshi: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        // Era la stessa catena rotta di --font-mono: var(--f-mono) e' "SF Mono"
        // (assente su Windows, mai caricato) e "IBM Plex Mono" e' un nome
        // letterale che non corrisponde a nessun @font-face. 89 elementi
        // renderizzavano in Courier New.
        plex: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
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
