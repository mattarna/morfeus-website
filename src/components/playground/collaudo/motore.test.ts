/* ============================================================
   IL COLLAUDO · verifica del motore
   ------------------------------------------------------------
   Non si testa "il codice gira": si testano i CASI LIMITE che
   nella V1 uscivano sbagliati. Se uno di questi si rompe, il
   referto mente a una persona vera.
   ============================================================ */

import { describe, expect, it } from "vitest";
import {
  calcolaLivello,
  calcolaProposta,
  calcolaVoto,
  collauda,
  DIMENSIONI,
  type Gradino,
  type Intento,
  type Leva,
  type NumeroLivello,
  type Punti,
  type Radiografia,
  type Tasca,
} from "./motore";

const r = (
  contesto: Punti,
  ripetibilita: Punti,
  correzione: Punti,
  controllo: Punti,
  diffusione: Punti,
): Radiografia => ({ contesto, ripetibilita, correzione, controllo, diffusione });

describe("il voto", () => {
  it("va da 0 a 100 sugli estremi", () => {
    expect(calcolaVoto(r(0, 0, 0, 0, 0))).toBe(0);
    expect(calcolaVoto(r(3, 3, 3, 3, 3))).toBe(100);
  });

  it("pesa contesto e ripetibilita' piu' del resto", () => {
    /* stessa quantita' di punti, distribuita diversamente */
    const suiPilastri = calcolaVoto(r(3, 3, 0, 0, 0)); /* 50 */
    const suiSecondari = calcolaVoto(r(0, 0, 0, 3, 3)); /* 30 */
    expect(suiPilastri).toBeGreaterThan(suiSecondari);
  });

  it("salire costa, ma la cima resta raggiungibile", () => {
    /* La curva e' convessa: chi risponde "buono ma non sistema" su tutto
       non deve ritrovarsi a meta' scala. Chi risponde da fuoriclasse si'. */
    expect(calcolaVoto(r(2, 2, 2, 2, 2))).toBe(45); /* Collezionista: hai i pezzi */
    expect(calcolaVoto(r(3, 3, 3, 3, 3))).toBe(100); /* il tetto non si abbassa */
    expect(calcolaLivello(r(2, 2, 2, 2, 2)).numero).toBe(4);
    expect(calcolaLivello(r(3, 3, 3, 3, 3)).numero).toBe(8);
  });

  it("i ranghi bassi sono piu' affollati degli alti", () => {
    /* Su tutte le combinazioni possibili, prese equiprobabili: non e' la
       popolazione vera, e' un metro neutro per verificare la forma. */
    const conteggio = new Array(9).fill(0);
    for (let a = 0; a <= 3; a++)
      for (let b = 0; b <= 3; b++)
        for (let c = 0; c <= 3; c++)
          for (let d = 0; d <= 3; d++)
            for (let e = 0; e <= 3; e++)
              conteggio[
                calcolaLivello(r(a as Punti, b as Punti, c as Punti, d as Punti, e as Punti)).numero
              ]++;
    const bassi = conteggio[1] + conteggio[2] + conteggio[3];
    const alti = conteggio[6] + conteggio[7] + conteggio[8];
    expect(bassi / 1024).toBeGreaterThan(0.55);
    expect(alti / 1024).toBeLessThan(0.08);
    /* ma nessun livello e' irraggiungibile */
    for (let lv = 1; lv <= 8; lv++) expect(conteggio[lv]).toBeGreaterThan(0);
  });

  it("distingue molti piu' casi della V1 (che ne aveva 16)", () => {
    /* Numeri misurati, non stimati: 1024 radiografie distinte che dopo
       l'arrotondamento danno 89 voti diversi. La V1 di voti possibili ne
       aveva 16, perche' sommava cinque valori 0-3 e basta.
       Il livello comunque non guarda solo il voto: guarda la radiografia
       (i cancelli), quindi la risoluzione vera resta quella dei 1024. */
    const radiografie = new Set<string>();
    const voti = new Set<number>();
    for (let a = 0; a <= 3; a++)
      for (let b = 0; b <= 3; b++)
        for (let c = 0; c <= 3; c++)
          for (let d = 0; d <= 3; d++)
            for (let e = 0; e <= 3; e++) {
              radiografie.add(`${a}${b}${c}${d}${e}`);
              voti.add(calcolaVoto(r(a as Punti, b as Punti, c as Punti, d as Punti, e as Punti)));
            }
    expect(radiografie.size).toBe(1024);
    expect(voti.size).toBe(89);
  });
});

describe("i cancelli", () => {
  it("chi ha tutto arriva a Architetto", () => {
    const l = calcolaLivello(r(3, 3, 3, 3, 3));
    expect(l.numero).toBe(8);
    expect(l.nome).toBe("Architetto");
    expect(l.bloccatoDa).toBeNull();
  });

  it("punteggio da AI Champion ma niente diffusione: resta Operatore, e si sa perche'", () => {
    const l = calcolaLivello(r(3, 3, 3, 3, 1));
    expect(l.voto).toBe(87);
    expect(l.numeroAritmetico).toBe(7);
    expect(l.numero).toBe(6);
    expect(l.nome).toBe("Operatore");
    expect(l.bloccatoDa).toBe("diffusione");
  });

  it("tutto tranne il contesto: il punteggio non basta, e il colpevole e' il contesto", () => {
    const l = calcolaLivello(r(1, 3, 3, 3, 3));
    expect(l.numeroAritmetico).toBe(6);
    expect(l.numero).toBe(4);
    expect(l.bloccatoDa).toBe("contesto");
  });

  it("diffusione a 2 apre AI Champion ma non Architetto", () => {
    const champion = calcolaLivello(r(3, 3, 3, 3, 2));
    expect(champion.numero).toBe(7);
    expect(champion.nome).toBe("AI Champion");
    expect(champion.bloccatoDa).toBe("diffusione");
  });

  it("nessun cancello sotto il livello 5", () => {
    const l = calcolaLivello(r(0, 3, 3, 0, 0)); /* 45 punti, contesto a zero */
    expect(l.numero).toBe(4);
    expect(l.bloccatoDa).toBeNull();
  });

  it("il livello reale non supera mai quello del punteggio", () => {
    for (let a = 0; a <= 3; a++)
      for (let b = 0; b <= 3; b++)
        for (let c = 0; c <= 3; c++)
          for (let d = 0; d <= 3; d++)
            for (let e = 0; e <= 3; e++) {
              const l = calcolaLivello(r(a as Punti, b as Punti, c as Punti, d as Punti, e as Punti));
              expect(l.numero).toBeLessThanOrEqual(l.numeroAritmetico);
              /* se ha bloccato, deve dire chi */
              if (l.numero < l.numeroAritmetico) expect(l.bloccatoDa).not.toBeNull();
            }
  });
});

describe("il gradino · tasca aziendale (dipendenti e manager)", () => {
  const aperto = { bootcampAperto: true };

  it("non riceve MAI una call commerciale, nemmeno da livello alto", () => {
    const p = calcolaProposta(
      { tasca: "azienda", leva: "nessuna", intento: "applicare" },
      7,
      aperto,
    );
    expect(p.gradino).not.toBe("call");
  });

  it("il corso d'ingresso lo vede solo chi sta nella sua fascia", () => {
    const dentro = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "applicare" }, 4, aperto);
    const oltre = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "applicare" }, 7, aperto);
    expect(dentro.gradino).toBe("claude-unlocked");
    /* a LV7 il corso sarebbe sotto di lui: resta la stanza */
    expect(oltre.gradino).toBe("community");
  });

  it("non riceve mai il Bootcamp", () => {
    for (let lv = 1; lv <= 8; lv++) {
      const p = calcolaProposta(
        { tasca: "azienda", leva: "nessuna", intento: "delegare" },
        lv as NumeroLivello,
        aperto,
      );
      expect(p.gradino).not.toBe("bootcamp");
    }
  });

  it("il manager che vuole portarla in azienda passa al ponte B2B", () => {
    const p = calcolaProposta({ tasca: "azienda", leva: "struttura", intento: "team" }, 6, aperto);
    expect(p.gradino).toBe("call-b2b");
  });

  it("il collaboratore no, nemmeno con la stessa intenzione e lo stesso livello", () => {
    /* non ha una struttura da muovere: quella conversazione non puo'
       portarla, e proporgliela gli fa solo perdere tempo */
    const p = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "team" }, 6, aperto);
    expect(p.gradino).not.toBe("call-b2b");
  });

  it("stessa intenzione ma livello basso: la proposta a chi decide sarebbe prematura", () => {
    const p = calcolaProposta({ tasca: "azienda", leva: "struttura", intento: "team" }, 3, aperto);
    expect(p.gradino).not.toBe("call-b2b");
    /* a LV3 il posto giusto e' il corso: prima impara, poi la porta a chi decide */
    expect(p.gradino).toBe("claude-unlocked");
  });
});

describe("il gradino · tasca propria", () => {
  const aperto = { bootcampAperto: true };

  it("titolare con struttura che vuole estenderla: call a qualsiasi livello", () => {
    const basso = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "team" }, 1, aperto);
    const alto = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "team" }, 8, aperto);
    expect(basso.gradino).toBe("call");
    expect(alto.gradino).toBe("call");
  });

  it("titolare con struttura ma intento personale e livello basso: prima le fondamenta", () => {
    const p = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "imparare" }, 2, aperto);
    expect(p.gradino).toBe("claude-unlocked");
  });

  it("chi lavora da solo entra nel Bootcamp un gradino prima di chi ha struttura", () => {
    const solo = calcolaProposta({ tasca: "mia", leva: "solo", intento: "applicare" }, 4, aperto);
    const struttura = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "applicare" }, 4, aperto);
    expect(solo.gradino).toBe("bootcamp");
    expect(struttura.gradino).toBe("claude-unlocked");
  });

  it("al vertice non si propone un altro corso", () => {
    const p = calcolaProposta({ tasca: "mia", leva: "solo", intento: "applicare" }, 7, aperto);
    expect(p.gradino).toBe("call");
  });
});

describe("lo switch del Bootcamp", () => {
  const chiuso = { bootcampAperto: false };

  it("a iscrizioni chiuse nessuno resta senza risposta", () => {
    const solo = calcolaProposta({ tasca: "mia", leva: "solo", intento: "applicare" }, 5, chiuso);
    expect(solo.gradino).toBe("claude-unlocked");
    expect(solo.listaAttesaBootcamp).toBe(true);
  });

  it("chi ha tasca e struttura scala sulla call invece che sul corso", () => {
    const p = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "applicare" }, 6, chiuso);
    expect(p.gradino).toBe("call");
    expect(p.listaAttesaBootcamp).toBe(true);
  });

  it("chi non era in fascia Bootcamp non viene messo in lista d'attesa", () => {
    const p = calcolaProposta({ tasca: "mia", leva: "solo", intento: "imparare" }, 2, chiuso);
    expect(p.listaAttesaBootcamp).toBe(false);
  });
});

describe("nessun vicolo cieco", () => {
  const tasche: Tasca[] = ["mia", "azienda"];
  const leve: Leva[] = ["solo", "struttura", "nessuna"];
  const intenti: Intento[] = ["imparare", "applicare", "delegare", "team"];
  const validi: Gradino[] = ["community", "claude-unlocked", "bootcamp", "call", "call-b2b"];

  it("ogni combinazione produce un gradino, con lo switch acceso e spento", () => {
    for (const tasca of tasche)
      for (const leva of leve)
        for (const intento of intenti)
          for (let lv = 1; lv <= 8; lv++)
            for (const bootcampAperto of [true, false]) {
              const p = calcolaProposta({ tasca, leva, intento }, lv as NumeroLivello, {
                bootcampAperto,
              });
              expect(validi).toContain(p.gradino);
              expect(p.motivo.length).toBeGreaterThan(0);
              /* la regola dura: mai una call di vendita a chi paga con la tasca dell'azienda */
              if (tasca === "azienda") expect(p.gradino).not.toBe("call");
            }
  });
});

describe("la conversazione (richiesta di Mattia)", () => {
  const aperto = { bootcampAperto: true };

  it("chi non compra ma ha strada alle spalle viene invitato a parlare", () => {
    const p = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "applicare" }, 7, aperto);
    expect(p.gradino).toBe("community");
    expect(p.conversazione).toBe(true);
  });

  it("chi sta iniziando no: non avrebbe ancora niente da raccontare", () => {
    const p = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "applicare" }, 1, aperto);
    expect(p.conversazione).toBe(false);
  });

  it("il collaboratore avanti, a cui non vendiamo nulla, viene invitato a parlare", () => {
    const p = calcolaProposta({ tasca: "azienda", leva: "nessuna", intento: "team" }, 6, aperto);
    expect(p.gradino).toBe("community");
    expect(p.conversazione).toBe(true);
  });

  it("non si somma a chi una call ce l'ha gia'", () => {
    const call = calcolaProposta({ tasca: "mia", leva: "struttura", intento: "team" }, 6, aperto);
    const b2b = calcolaProposta({ tasca: "azienda", leva: "struttura", intento: "team" }, 6, aperto);
    expect(call.conversazione).toBe(false);
    expect(b2b.conversazione).toBe(false);
  });

  it("non si propone a chi stiamo vendendo qualcosa", () => {
    const corso = calcolaProposta({ tasca: "mia", leva: "solo", intento: "imparare" }, 2, aperto);
    const camp = calcolaProposta({ tasca: "mia", leva: "solo", intento: "applicare" }, 5, aperto);
    expect(corso.conversazione).toBe(false);
    expect(camp.conversazione).toBe(false);
  });
});

describe("il punto debole", () => {
  it("indica la dimensione piu' bassa", () => {
    const e = collauda(
      r(3, 3, 3, 3, 0),
      { tasca: "mia", leva: "solo", intento: "applicare" },
      { bootcampAperto: true },
    );
    expect(e.puntoDebole).toBe("diffusione");
  });

  it("a parita' di punti sceglie quella che pesa di piu'", () => {
    /* contesto (25) e controllo (15) entrambi a 1 */
    const e = collauda(
      r(1, 3, 3, 1, 3),
      { tasca: "mia", leva: "solo", intento: "applicare" },
      { bootcampAperto: true },
    );
    expect(e.puntoDebole).toBe("contesto");
  });

  it("esiste sempre, anche col punteggio pieno", () => {
    const e = collauda(
      r(3, 3, 3, 3, 3),
      { tasca: "mia", leva: "solo", intento: "applicare" },
      { bootcampAperto: true },
    );
    expect(DIMENSIONI).toContain(e.puntoDebole);
  });
});
