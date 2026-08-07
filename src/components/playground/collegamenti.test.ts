import { describe, expect, it } from "vitest";
import { SORGENTE, SORGENTI, normalizzaSorgente } from "./collegamenti";

/* La sorgente e' l'unico dato del collaudo che arriva dal client senza
   passare da un calcolo: e' l'unico che si puo' falsificare. Finisce nel
   form_name di Brevo e nella colonna form_name del foglio, cioe' nei
   conti per porta d'ingresso. Se l'elenco chiuso si rompe, i conti
   diventano sbagliati in silenzio: nessuno se ne accorge guardando il
   foglio, perche' le righe finte sembrano vere. Da qui i test. */
describe("normalizzaSorgente", () => {
  it("tiene le sorgenti note", () => {
    expect(normalizzaSorgente(SORGENTI.gate)).toBe("pg.gate");
    expect(normalizzaSorgente(SORGENTI.landing)).toBe("pg.collaudo");
  });

  it("ricade sulla landing quando la sorgente manca", () => {
    expect(normalizzaSorgente(undefined)).toBe(SORGENTE);
    expect(normalizzaSorgente("")).toBe(SORGENTE);
    expect(normalizzaSorgente("   ")).toBe(SORGENTE);
  });

  it("rifiuta una sorgente inventata invece di scriverla nel foglio", () => {
    expect(normalizzaSorgente("pg.qualsiasi-cosa")).toBe(SORGENTE);
    expect(normalizzaSorgente("../../etc")).toBe(SORGENTE);
  });

  it("tollera gli spazi attorno a una sorgente valida", () => {
    expect(normalizzaSorgente("  pg.gate  ")).toBe("pg.gate");
  });

  it("tiene le porte distinte: due sorgenti diverse non collassano", () => {
    expect(SORGENTI.gate).not.toBe(SORGENTI.landing);
  });
});
