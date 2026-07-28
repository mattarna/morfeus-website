/* ============================================================
   I PILASTRI EDITORIALI
   ------------------------------------------------------------
   Il copy approvato fissa quattro pilastri e mette un paletto
   esplicito: "PMI non e' una categoria editoriale. E' un target".

   Gli articoli in archivio pero' portano ancora le categorie
   vecchie (Adozione, Automazione, Formazione, Margine & ROI, PMI),
   che sono cinque e non coincidono. Qui sta la mappatura, esplicita
   e per slug: e' l'unico modo onesto, perche' due delle vecchie
   categorie si spaccano in due pilastri diversi (Adozione contiene
   sia articoli di adozione sia articoli di scelta) e "PMI" va
   riassegnata per forza.

   E' l'unico campo di questo file dedotto da me: va guardato prima
   di considerarlo vero. Cambiare l'appartenenza di un articolo e'
   una riga.
   ============================================================ */

export const PILASTRI = {
  margine: {
    slug: "margine-e-roi",
    nome: { it: "Margine e ROI", en: "Margin and ROI" },
    domanda: {
      it: "Dove sto perdendo margine?",
      en: "Where am I losing margin?",
    },
    sotto: {
      it: "Value Leak, ROI, costi, priorità.",
      en: "Value Leaks, ROI, costs and priorities.",
    },
  },
  processi: {
    slug: "ai-nei-processi",
    nome: { it: "AI nei processi", en: "AI in workflows" },
    domanda: {
      it: "Come integro l'AI nei processi?",
      en: "How do I put AI into my workflows?",
    },
    sotto: {
      it: "Context Hub, agenti AI, automazione, sistemi in produzione.",
      en: "Context Hubs, AI agents, automation and systems in production.",
    },
  },
  persone: {
    slug: "persone-e-adozione",
    nome: { it: "Persone e adozione", en: "People and adoption" },
    domanda: {
      it: "Come faccio adottare l'AI alle persone?",
      en: "How do I get people to adopt AI?",
    },
    sotto: {
      it: "AI Champion, competenze, governance, AI Act.",
      en: "AI Champions, practical skills, governance and the AI Act.",
    },
  },
  scelte: {
    slug: "scelte-e-governance",
    nome: { it: "Scelte e governance", en: "Decisions and governance" },
    domanda: {
      it: "Come resta governabile nel tempo?",
      en: "How does it stay governable over time?",
    },
    sotto: {
      it: "Regole, responsabilità, cosa automatizzare e cosa tenere umano.",
      en: "Rules, responsibilities, what to automate and what to keep human.",
    },
  },
} as const;

export type ChiavePilastro = keyof typeof PILASTRI;

/** slug articolo -> pilastro. Dedotto leggendo i tredici articoli. */
export const PILASTRO_DI: Record<string, ChiavePilastro> = {
  "value-leak": "margine",
  "come-misurare-il-roi-dell-ai": "margine",
  "quanto-costa-l-ai-in-azienda": "margine",
  "perche-progetti-ai-falliscono": "margine",

  "agenti-ai-in-azienda": "processi",
  "automazione-preventivi-documenti-ai": "processi",
  "come-integrare-ai-nei-processi": "processi",

  "ai-intelligenza-artificiale-posti-di-lavoro": "persone",
  "competenze-ai-azienda-ai-champion": "persone",
  "ai-act-pmi-alfabetizzazione": "persone",

  "come-scegliere-consulenza-ai": "scelte",
  "saas-o-sistema-ai-su-misura": "scelte",
  "ai-per-le-pmi-da-dove-iniziare": "scelte",
};

export function pilastroDi(slug: string): ChiavePilastro {
  return PILASTRO_DI[slug] ?? "margine";
}

/** L'articolo da cui parte tutto. Dichiarato qui, non scelto in pagina. */
export const ARTICOLO_IN_EVIDENZA = "value-leak";
