import { describe, expect, it } from "vitest";
import { codificaReferto, decodificaReferto, indirizzoReferto, type RisposteReferto } from "./permalink";
import { MESTIERI_OPZIONI, RUOLI_OPZIONI, VALORE_OPZIONI } from "./domande";

/* Questi link finiscono nelle email e nelle chat: sopravvivono ai
   rilasci e nessuno li puo' correggere dopo. Se la decodifica sbaglia,
   una persona vede il referto di un altro livello e non ha modo di
   accorgersene. Da qui il numero di test su un file cosi' piccolo. */

const BASE: RisposteReferto = {
  mestiere: MESTIERI_OPZIONI[0].id,
  ruolo: RUOLI_OPZIONI[0].id,
  dichiarato: "L1",
  intento: "applicare",
  urgenza: "alta",
  punti: { contesto: 3, ripetibilita: 1, correzione: 2, controllo: 2, diffusione: 1 },
  ore: 8,
  valoreOra: Number(VALORE_OPZIONI[2].id),
};

describe("andata e ritorno", () => {
  it("restituisce esattamente le risposte di partenza", () => {
    expect(decodificaReferto(codificaReferto(BASE))).toEqual(BASE);
  });

  it("tiene i punti sull'asse giusto: l'ordine e' un contratto", () => {
    const asimmetrico: RisposteReferto = {
      ...BASE,
      punti: { contesto: 0, ripetibilita: 1, correzione: 2, controllo: 3, diffusione: 0 },
    };
    expect(decodificaReferto(codificaReferto(asimmetrico))?.punti).toEqual(asimmetrico.punti);
  });

  it("regge tutti i ruoli, che portano tasca leva e team", () => {
    for (const ruolo of RUOLI_OPZIONI) {
      const r = { ...BASE, ruolo: ruolo.id };
      expect(decodificaReferto(codificaReferto(r))?.ruolo).toBe(ruolo.id);
    }
  });

  it("non lascia il codice in chiaro nell'indirizzo", () => {
    const url = indirizzoReferto(BASE);
    expect(url).toContain("playground.morfeushub.com/referto?r=");
    expect(url).not.toContain(BASE.mestiere);

    /* Il codice deve essere url-safe: niente +, / o = da ri-codificare
       o da far mangiare a una chat. Si guarda SOLO il codice: le barre
       di "https://" sono dell'indirizzo, non sue. */
    const codice = url.split("?r=")[1];
    expect(codice).not.toMatch(/[+/=]/);
  });

  it("non mette mai il nome nel link", () => {
    /* Il tipo non prevede il nome apposta. Se un giorno qualcuno lo
       aggiunge a RisposteReferto, questo test non basta a fermarlo:
       serve ricordarsi del perche', ed e' scritto in cima al modulo. */
    expect(Object.keys(BASE)).not.toContain("nome");
  });
});

describe("un codice che non torna non diventa un referto", () => {
  it("rifiuta vuoto, spazzatura e base64 non nostro", () => {
    expect(decodificaReferto(undefined)).toBeNull();
    expect(decodificaReferto("")).toBeNull();
    expect(decodificaReferto("non-un-codice!!")).toBeNull();
    expect(decodificaReferto(btoa("ciao"))).toBeNull();
  });

  it("rifiuta una versione che non conosce", () => {
    const futuro = btoa("2~agenzia~x~L1~applicare~alta~31221~8~90");
    expect(decodificaReferto(futuro)).toBeNull();
  });

  it("rifiuta un id che non esiste piu'", () => {
    const codice = codificaReferto({ ...BASE, mestiere: "mestiere-cancellato" });
    expect(decodificaReferto(codice)).toBeNull();
  });

  it("rifiuta una radiografia impossibile", () => {
    expect(decodificaReferto(codificaReferto({ ...BASE, punti: { ...BASE.punti, contesto: 7 as never } }))).toBeNull();
  });

  it("rifiuta ore assurde: il conto in euro non si gonfia dall'indirizzo", () => {
    expect(decodificaReferto(codificaReferto({ ...BASE, ore: 99999 }))).toBeNull();
    expect(decodificaReferto(codificaReferto({ ...BASE, ore: -3 }))).toBeNull();
  });

  it("rifiuta un valore-ora fuori dalle fasce del test", () => {
    expect(decodificaReferto(codificaReferto({ ...BASE, valoreOra: 100000 }))).toBeNull();
  });
});
