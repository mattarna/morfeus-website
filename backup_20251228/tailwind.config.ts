import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Morfeus purple accent colors
        purple: {
          DEFAULT: "#4D39EB",
          50: "#EFEDFB",
          100: "#DDD9F8",
          200: "#BBB4F1",
          300: "#998FEA",
          400: "#7764E3",
          500: "#4D39EB",
          600: "#533DEC",
          700: "#3925C7",
          800: "#2B1C96",
          900: "#1D1365",
          950: "#130D43",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      transitionDuration: {
        "1000": "1000ms",
      },
    },
  },
  plugins: [],
};
export default config;
