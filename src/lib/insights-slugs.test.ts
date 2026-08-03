import { describe, expect, it } from "vitest";
import {
  COPPIE_SLUG_ARTICOLI,
  coppiaSlugArticolo,
  slugArticolo,
  slugArticoliDi,
  traduciPercorsoInterno,
} from "./insights-slugs";
import { buildLocaleAlternates } from "./seo/public-indexing";

/* Questi test guardano l'unico punto dove italiano e inglese possono
   divergere in silenzio. Uno slug duplicato o una coppia sbagliata non
   si vede aprendo il sito: si vede in Search Console, settimane dopo,
   sotto forma di hreflang che non torna. */
describe("coppie slug degli articoli", () => {
  it("non ha slug duplicati dentro la stessa lingua", () => {
    for (const locale of ["it", "en"] as const) {
      const slugs = slugArticoliDi(locale);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("risolve una coppia partendo da entrambi i lati", () => {
    expect(slugArticolo("quanto-costa-l-ai-in-azienda", "en")).toBe(
      "how-much-does-ai-cost-in-business"
    );
    expect(slugArticolo("how-much-does-ai-cost-in-business", "it")).toBe(
      "quanto-costa-l-ai-in-azienda"
    );
    expect(coppiaSlugArticolo("value-leak")).toEqual({ it: "value-leak", en: "value-leak" });
  });

  it("torna null per uno slug che non e' un articolo", () => {
    expect(slugArticolo("non-esiste", "en")).toBeNull();
    expect(coppiaSlugArticolo("non-esiste")).toBeNull();
  });

  /* Il difetto vero che questo previene: passando una stringa sola,
     la pagina inglese dichiarava come alternativa italiana il proprio
     slug inglese, cioe' un indirizzo che sotto /it non esiste. */
  it("costruisce hreflang reciproci sugli slug giusti", () => {
    const coppia = coppiaSlugArticolo("come-misurare-il-roi-dell-ai");
    expect(coppia).not.toBeNull();
    const percorsi = { it: `insights/${coppia!.it}`, en: `insights/${coppia!.en}` };

    const en = buildLocaleAlternates(percorsi, "en");
    const it = buildLocaleAlternates(percorsi, "it");

    expect(en.canonical).toBe("/insights/how-to-measure-ai-roi");
    expect(it.canonical).toBe("/it/insights/come-misurare-il-roi-dell-ai");
    /* Reciproci: le due pagine devono puntarsi a vicenda con gli stessi
       due indirizzi, altrimenti Google ignora la coppia. */
    expect(en.languages).toEqual(it.languages);
    expect(en.languages.it).toBe("/it/insights/come-misurare-il-roi-dell-ai");
    expect(en.languages.en).toBe("/insights/how-to-measure-ai-roi");
  });

  it("traduce i rimandi interni e lascia stare tutto il resto", () => {
    expect(traduciPercorsoInterno("/insights/value-leak", "en")).toBe("/insights/value-leak");
    expect(traduciPercorsoInterno("/insights/perche-progetti-ai-falliscono", "en")).toBe(
      "/insights/why-ai-projects-fail"
    );
    expect(traduciPercorsoInterno("/roiometro", "it")).toBe("/roiometro");
    expect(traduciPercorsoInterno("/insights/mai-esistito", "en")).toBe("/insights/mai-esistito");
  });

  it("copre tutti e tredici gli articoli", () => {
    expect(COPPIE_SLUG_ARTICOLI).toHaveLength(13);
  });
});
