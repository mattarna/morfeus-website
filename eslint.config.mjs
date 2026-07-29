import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Migrazione da .eslintrc.json (ESLint 8) a flat config (ESLint 9).
// Forma presa da Astrolize; le tre regole sotto sono quelle che Morfeus
// aveva gia' e restano invariate (tutte a "warn", non bloccano la CI).
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn",

      // --- Introdotte da eslint-config-next 16 (regole "React Compiler") ---
      // Su Next 14 non esistevano: alla prima esecuzione riportano 126 casi in
      // codice preesistente. PR-2 migra lo stack e NON deve cambiare
      // comportamento, quindi restano a "warn" (visibili, non bloccanti) come
      // era la CI prima. Vanno affrontate in un PR dedicato, non qui.
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",

      // Falso positivo fuori da `next lint`: senza il contesto della cartella
      // pages la regola non riconosce l'App Router e segnala anche gli <a>
      // voluti (es. src/app/error.tsx, dove <Link> puo' non funzionare perche'
      // l'app e' gia' in errore). Segnalata, non bloccante.
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // `public/` sono asset statici serviti tali e quali, non sorgente
    // dell'applicazione: non vanno analizzati.
    // Serviva dirlo esplicitamente qui: `next lint` (ESLint 8) guardava solo
    // le cartelle dell'app, la flat config di ESLint 9 guarda tutto quello
    // che non e' ignorato. Con del .jsx finito dentro public/ il gate lint
    // diventa rosso per materiale che non fa parte del build.
    "public/**",
  ]),
]);

export default eslintConfig;
