import { JsonLd, buildBreadcrumbList } from "@/lib/seo/schema";
import { buildLocalizedPath, type SupportedLocale } from "@/lib/seo/public-indexing";

/* ============================================================
   LE BRICIOLE DI PANE, IN FORMA LEGGIBILE DA UNA MACCHINA
   ------------------------------------------------------------
   Le pagine annidate (casi e articoli) mostrano gia' il percorso
   a schermo, ma nessuna lo dichiarava in JSON-LD: nei risultati
   di ricerca compariva l'indirizzo nudo invece del percorso, e
   un motore generativo non aveva modo di capire che un caso sta
   sotto /casi e non a se stante.

   L'helper buildBreadcrumbList esisteva gia' ed era usato solo
   dalla vecchia rotta /case-study. Qui viene incapsulato in un
   componente perche' le pagine caso hanno grafi JSON-LD di forma
   diversa fra loro: una riga sola da aggiungere, senza dover
   toccare la struttura di ognuna.

   La Home viene messa in testa da qui: e' sempre il primo anello
   e ripeterla in ogni pagina e' solo un modo di sbagliarla.
   ============================================================ */

export type Briciola = {
  /** Come si chiama l'anello per un lettore. */
  nome: string;
  /** Percorso senza lingua e senza slash iniziale: "casi/marf-lead-caldo". */
  percorso: string;
};

export function Briciole({
  locale,
  voci,
}: {
  locale: SupportedLocale;
  voci: Briciola[];
}) {
  const schema = buildBreadcrumbList([
    { name: "Home", path: buildLocalizedPath(locale, "") },
    ...voci.map((v) => ({ name: v.nome, path: buildLocalizedPath(locale, v.percorso) })),
  ]);

  return <JsonLd schema={schema} />;
}
