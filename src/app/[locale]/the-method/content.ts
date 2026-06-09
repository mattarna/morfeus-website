// The Method — bilingual content (EN default, IT switchable). One source of truth.

export type Lang = "en" | "it";

export interface Item {
  title: string;
  desc: string;
  quote: string;
}
export interface Quad {
  pos: string;
  name: string;
  desc: string;
}
export interface Step {
  title: string;
  desc: string;
}
export interface Stage {
  rank: string;
  title: string;
  desc: string;
}

export interface MethodContent {
  ui: { lang: string; theme: string; light: string; dark: string };
  brand: { name: string; sub: string; tag: string };
  hero: {
    eyebrow: string;
    title: string;
    thesisPre: string;
    thesisEm: string;
    thesisPost: string;
    attr: string;
    body: string;
  };
  mantras: string[];
  economics: {
    eyebrow: string;
    title: string;
    sub: string;
    x: string;
    y: string;
    result: string;
    quadHint: string;
    foot1: string;
    footEm: string;
    foot2: string;
    quote: string;
  };
  matrix: {
    yAxis: string;
    xLeft: string;
    xMid: string;
    xRight: string;
    grow: string;
    quads: Quad[];
  };
  layers: {
    eyebrow: string;
    title: string;
    sub: string;
    rule: string;
    aHead: string;
    aBody: string;
    bHead: string;
    bBody: string;
  };
  alignment: { tag: string; title: string; sub: string; items: Item[] };
  diagnosis: {
    tag: string;
    quotePre: string;
    quoteEm1: string;
    quoteMid: string;
    quoteEm2: string;
    quotePost: string;
    bar1Name: string;
    bar1Sub: string;
    bar1State: string;
    bar2Name: string;
    bar2Sub: string;
    bar2State: string;
    attr: string;
  };
  training: { tag: string; title: string; sub: string; items: Item[] };
  tool1: {
    tag: string;
    title: string;
    sub: string;
    steps: Step[];
    exampleTag: string;
    example: string;
    foot: string;
  };
  tool2: {
    tag: string;
    title: string;
    sub: string;
    delegateHead: string;
    delegateSub: string;
    delegate: string[];
    keepHead: string;
    keepSub: string;
    keep: string[];
    warnTag: string;
    warn: string;
    quote: string;
  };
  tool3: {
    tag: string;
    title: string;
    sub: string;
    stages: Stage[];
    axisStart: string;
    axisEnd: string;
    quote: string;
  };
  closing: { eyebrow: string; line: string; lineEm: string; tagline: string };
  foot: string;
}

export const CONTENT: Record<Lang, MethodContent> = {
  en: {
    ui: { lang: "EN", theme: "Theme", light: "Light", dark: "Dark" },
    brand: { name: "Morfeus", sub: "The Method", tag: "Operating Standard" },
    hero: {
      eyebrow: "The Morfeus Operating Standard",
      title: "The Method",
      thesisPre: "Your value isn’t your effort. It’s ",
      thesisEm: "how hard you are to replace",
      thesisPost: " — and how much rides on you.",
      attr: "The standard we train, hire, and pay against.",
      body: "Expertise is being commoditized and effort is invisible. What compounds is your approach: how you define done, the questions you ask, and how much you own. This is the standing logic of how we work — the beliefs we align on first, the loop we build inside second, and the tools that make it repeatable in any field.",
    },
    mantras: [
      "Value = how hard to replace, times how much you own.",
      "AI fluency is a consequence of the approach, not the goal.",
      "Always start from the definition of done.",
      "If you can’t repeat it, you didn’t understand it.",
    ],
    economics: {
      eyebrow: "The economics",
      title: "What you’re actually paid for.",
      sub: "Two forces set your value. Most people only push on one — and it’s usually hours, the one that doesn’t compound.",
      x: "How hard you are to replace",
      y: "How much rides on you",
      result: "What you’re worth",
      quadHint: "It’s a multiplication, not a sum.",
      foot1: "Max out one axis and zero the other, and you’re still a commodity or still exposed. The career move is the diagonal — ",
      footEm: "harder to replace and more ownership, at the same time.",
      foot2: "",
      quote:
        "“It’s not about how hard you work — it’s about how easy it is to substitute you. Take more accountability: real objectives, real payments, real consequences.”",
    },
    matrix: {
      yAxis: "Responsibility →",
      xLeft: "Easily replaced",
      xMid: "Replaceability",
      xRight: "Hard to replace",
      grow: "Grow here",
      quads: [
        {
          pos: "High stakes · Replaceable",
          name: "Exposed",
          desc: "All the pressure rides on you, but you can be swapped out. Stressful, fragile, and still not the top of the pay scale.",
        },
        {
          pos: "High stakes · Hard to replace",
          name: "Indispensable",
          desc: "The outcome rides on you, and only you do it that way. Highest leverage, highest pay.",
        },
        {
          pos: "Low stakes · Replaceable",
          name: "Commodity",
          desc: "Anyone can do it and nothing rides on it. Hours are the only lever — and hours don’t compound.",
        },
        {
          pos: "Low stakes · Hard to replace",
          name: "Specialist",
          desc: "Rare skill, but you’re handed the spec and don’t own the result. Valued — and capped.",
        },
      ],
    },
    layers: {
      eyebrow: "How a session works",
      title: "Align first. Then train.",
      sub: "Every working session has two layers, in this order — and the order is the whole point.",
      rule: "Alignment without training is theory. Training without alignment is busywork. You need both, in that order.",
      aHead: "Alignment",
      aBody: "Get the beliefs straight before anyone touches the work — what value is, how it’s earned, what “done” means.",
      bHead: "Training",
      bBody: "Run the build loop against a real bar — frame, build, review, repeat back, raise the bar.",
    },
    alignment: {
      tag: "Part I — Alignment",
      title: "The beliefs under the work.",
      sub: "Before the first move, we agree on how the work actually works. If we don’t share these, every review turns into the same argument.",
      items: [
        {
          title: "Approach beats expertise",
          desc: "You don’t need to be the expert to know whether something is ready. You need a repeatable process for judging it. The expertise follows the approach — not the other way around.",
          quote: "“You don’t need deep coding knowledge to know whether something is ready. It’s about the approach.”",
        },
        {
          title: "The questions are the work",
          desc: "Right answers come from right questions. Right questions come from a clear objective. When you’re stuck, you’re usually asking the wrong thing — go back to the objective.",
          quote: "“It’s always about the questions. If you don’t have a clear objective, you’re not asking yourself the right questions.”",
        },
        {
          title: "Start from the definition of done",
          desc: "The first question on anything: what does done look like? Define the target before you move. No clear target means wrong questions — and you loop on the same wall forever.",
          quote: "“The first question was: what’s the definition of done? If I have to reach the objective, I need a clear objective.”",
        },
        {
          title: "Set your own standards",
          desc: "No one expects mastery in week one. They expect you to hold a bar — and raise it on purpose. Standards are something you set for yourself, not something handed to you.",
          quote: "“You need to set yourself some standards. Nobody’s asking you to be at the level in the first week.”",
        },
      ],
    },
    diagnosis: {
      tag: "The diagnosis",
      quotePre: "“I see improvement in the ",
      quoteEm1: "quality",
      quoteMid: " of the work. I don’t see improvement in the ",
      quoteEm2: "approach",
      quotePost: " — so we keep hitting the same wall.”",
      bar1Name: "Output layer",
      bar1Sub: "the artifact · the visible result",
      bar1State: "Improving ↗",
      bar2Name: "Approach layer",
      bar2Sub: "how you think · the questions you ask",
      bar2State: "Flat →",
      attr: "The output layer can be copied. The approach layer can’t — and it’s the only one that compounds. So that’s the one we train.",
    },
    training: {
      tag: "Part II — Training",
      title: "The loop we build inside.",
      sub: "Skill is built inside a structured loop with guardrails. I set the frame. You build inside it with full creative freedom. We review against the bar. You prove you understood. We raise the bar.",
      items: [
        {
          title: "Frame the project",
          desc: "Someone builds the scaffold and the constraints — including what’s explicitly not wanted inside it. You don’t set up the project; you inherit a clean frame so you can focus on the actual work.",
          quote: "“I set up the project — you never set up the project, I do it for you. Then you start working on it.”",
        },
        {
          title: "Build inside the guardrails",
          desc: "Within the frame you have full creative freedom. The constraints are the moat; the creativity is yours. You always know the boundary you can’t cross.",
          quote: "“You have the creativity to work on whatever you want, but you still know what I do not want inside the project.”",
        },
        {
          title: "Two postures of help",
          desc: "Sometimes you get exactly what you ask for. Sometimes the answer stays eye-level and you find it yourself. The second one is where the approach actually gets built.",
          quote: "“From me you’ll have exactly what you ask — the other is more eye-level, and you’ll find the answers on your own.”",
        },
        {
          title: "Be your own first reviewer",
          desc: "Run your definition of done against your own work before you hand it over. “Came close” should be caught by you, not by me. My review is the backstop, not the first check.",
          quote: "“We came very close — but it was not done.”",
        },
        {
          title: "The repeat-back test",
          desc: "Explain the brief back in your own words. If you can’t repeat it, you didn’t understand it 100%. We do this live, out loud, every time.",
          quote: "“In your own way, explain to me what I just said. If you cannot repeat it, you did not understand it 100%.”",
        },
        {
          title: "Use the corpus",
          desc: "The transcripts are a knowledge base — thousands of them. Ask them what is being said. Use AI on the record to close your own gaps before you ask a person.",
          quote: "“You have thousands of transcripts — you can ask those transcripts questions like ‘what is being said here?’”",
        },
        {
          title: "Critique is care; consequences are real",
          desc: "Critique is given to make you better, never to attack. And missing the bar has consequences — because the objectives and the payments are real.",
          quote: "“It’s not a critique — the best way you can improve is by starting. But if you mess up, there are consequences.”",
        },
      ],
    },
    tool1: {
      tag: "Toolkit — The core skill",
      title: "Defining “done” in a field you don’t know.",
      sub: "You don’t need to be the expert to set the bar — you need a repeatable way to build one. This process is domain-agnostic: it works on a website, a sales call, a contract, a campaign, anything.",
      steps: [
        {
          title: "Accept you’re at zero — it doesn’t disqualify you",
          desc: "Expertise isn’t the prerequisite for judgment. You can set a bar in a domain you’ve never touched.",
        },
        {
          title: "Find the real objective",
          desc: "What does the person who asked actually need? What does success look like to them? Done is defined by their outcome, not your effort.",
        },
        {
          title: "Surface the dimensions that matter",
          desc: "Ask people, ask AI: what does a good version of this have to satisfy? List every axis of quality you can find.",
        },
        {
          title: "Set a threshold on each",
          desc: "Decide what “good enough” is on every axis. Where’s the line between done and not done? That list is your definition of done.",
        },
        {
          title: "Now you can judge",
          desc: "With the bar written down, you can evaluate any output — yours or the AI’s — without being the domain expert.",
        },
      ],
      exampleTag: "Worked on a website",
      example:
        "Knowing nothing about the stack, this process produced a bar like: works on every device, fast, secure, usable, finished. A contract would produce a different list. A sales call, another. The list changes by domain — the process never does.",
      foot: "Write the bar before you start. No bar means wrong questions — and the same wall, again and again.",
    },
    tool2: {
      tag: "Toolkit — The leverage",
      title: "Delegate the doing. Keep the judgment.",
      sub: "AI fluency isn’t the goal — it’s what you get for free once the approach is right. The line is simple: hand AI the execution, never the deciding.",
      delegateHead: "Delegate — the doing",
      delegateSub: "AI is faster than you here. Let it run.",
      delegate: [
        "Drafting and generating",
        "Boilerplate and setup",
        "Search, recall, summarizing",
        "Refactors and variations",
        "First passes on anything",
      ],
      keepHead: "Keep — the judgment",
      keepSub: "This is yours. It’s what you’re paid for.",
      keep: [
        "The objective",
        "The definition of done",
        "The questions",
        "The call on what’s good enough",
        "Ownership of the outcome",
      ],
      warnTag: "The trap",
      warn: "The danger isn’t using AI — it’s offloading the thinking with it. You can have AI and still not finish, because the gap is judgment, not labor. The better your bar and your questions, the more AI multiplies you. Get those wrong and it just helps you fail faster.",
      quote: "“Knowing how to use AI is the consequence of the approach. You had AI — and still didn’t manage to finish the project on your own.”",
    },
    tool3: {
      tag: "Toolkit — Where this goes",
      title: "Four stages. Walk the diagonal.",
      sub: "Nobody starts at the top — I didn’t. On my first platform I knew nothing: not the stack, not the database, not the tooling. This is the ladder I climbed, and the one you’re on. Every stage is more judgment and more ownership than the last.",
      stages: [
        { rank: "Stage 01", title: "Executes", desc: "Does the task as given. Needs the frame and the answers handed over." },
        { rank: "Stage 02", title: "Judges", desc: "Checks own work against a bar before handing it over. Catches its own “almost.”" },
        { rank: "Stage 03", title: "Frames", desc: "Defines done and asks the right questions without being handed them." },
        { rank: "Stage 04", title: "Sets the standard", desc: "Frames the problem and the bar for others. Builds the guardrails everyone works inside." },
      ],
      axisStart: "More dependence",
      axisEnd: "More judgment · more ownership →",
      quote: "“This is exactly what I would ask when I built my first platform. I told them I know nothing — and I still got there, by the approach.”",
    },
    closing: {
      eyebrow: "The standard, in one line",
      line: "Hold a clear definition of done. Ask better questions. Own the outcome. ",
      lineEm: "Make yourself hard to replace.",
      tagline:
        "“The future of work is a metamorphosis — where human creativity and AI precision merge, unlocking new potential and elevating what businesses can achieve.”",
    },
    foot: "Morfeus Hub · The Method · Operating standard for the cohort",
  },

  it: {
    ui: { lang: "IT", theme: "Tema", light: "Chiaro", dark: "Scuro" },
    brand: { name: "Morfeus", sub: "Il Metodo", tag: "Standard Operativo" },
    hero: {
      eyebrow: "Lo Standard Operativo Morfeus",
      title: "Il Metodo",
      thesisPre: "Il tuo valore non è il tuo sforzo. È ",
      thesisEm: "quanto sei difficile da sostituire",
      thesisPost: " — e quanto pesa su di te.",
      attr: "Lo standard con cui formiamo, assumiamo e paghiamo.",
      body: "L’expertise si sta commoditizzando e lo sforzo è invisibile. Ciò che compone è il tuo approccio: come definisci “fatto”, le domande che fai, e quanta responsabilità ti prendi. Questa è la logica di fondo di come lavoriamo — le convinzioni su cui ci allineiamo prima, il loop in cui costruiamo poi, e gli strumenti che lo rendono ripetibile in qualsiasi campo.",
    },
    mantras: [
      "Valore = quanto sei difficile da sostituire, per quanto possiedi.",
      "La padronanza dell’AI è una conseguenza dell’approccio, non l’obiettivo.",
      "Parti sempre dalla definizione di “fatto”.",
      "Se non sai ripeterlo, non l’hai capito.",
    ],
    economics: {
      eyebrow: "L’economia",
      title: "Per cosa vieni pagato davvero.",
      sub: "Due forze determinano il tuo valore. Quasi tutti spingono su una sola — di solito le ore, l’unica che non compone.",
      x: "Quanto sei difficile da sostituire",
      y: "Quanto pesa su di te",
      result: "Quanto vali",
      quadHint: "È una moltiplicazione, non una somma.",
      foot1: "Massimizza un asse e azzera l’altro, e resti comunque una commodity o resti esposto. La mossa di carriera è la diagonale — ",
      footEm: "più difficile da sostituire e più responsabilità, insieme.",
      foot2: "",
      quote:
        "“Non è quanto lavori — è quanto è facile sostituirti. Prenditi più responsabilità: obiettivi reali, pagamenti reali, conseguenze reali.”",
    },
    matrix: {
      yAxis: "Responsabilità →",
      xLeft: "Facile da sostituire",
      xMid: "Sostituibilità",
      xRight: "Difficile da sostituire",
      grow: "Cresci qui",
      quads: [
        {
          pos: "Alta posta · Sostituibile",
          name: "Esposto",
          desc: "Tutta la pressione è su di te, ma sei rimpiazzabile. Stressante, fragile, e nemmeno in cima alla scala retributiva.",
        },
        {
          pos: "Alta posta · Difficile da sostituire",
          name: "Indispensabile",
          desc: "Il risultato dipende da te, e solo tu lo fai così. Massima leva, massima paga.",
        },
        {
          pos: "Bassa posta · Sostituibile",
          name: "Commodity",
          desc: "Chiunque può farlo e niente ci dipende. Le ore sono l’unica leva — e le ore non compongono.",
        },
        {
          pos: "Bassa posta · Difficile da sostituire",
          name: "Specialista",
          desc: "Skill raro, ma ricevi la specifica e non possiedi il risultato. Apprezzato — e con un tetto.",
        },
      ],
    },
    layers: {
      eyebrow: "Come funziona una sessione",
      title: "Prima allinea. Poi allena.",
      sub: "Ogni sessione di lavoro ha due strati, in quest’ordine — e l’ordine è tutto il punto.",
      rule: "Allineamento senza allenamento è teoria. Allenamento senza allineamento è lavoro a vuoto. Servono entrambi, in quest’ordine.",
      aHead: "Allineamento",
      aBody: "Mettere a fuoco le convinzioni prima di toccare il lavoro — cos’è il valore, come si guadagna, cosa significa “fatto”.",
      bHead: "Allenamento",
      bBody: "Girare il loop di costruzione contro un’asticella reale — inquadra, costruisci, revisiona, ripeti, alza l’asticella.",
    },
    alignment: {
      tag: "Parte I — Allineamento",
      title: "Le convinzioni sotto il lavoro.",
      sub: "Prima della prima mossa, ci accordiamo su come funziona davvero il lavoro. Se non le condividiamo, ogni revisione diventa la stessa discussione.",
      items: [
        {
          title: "L’approccio batte l’expertise",
          desc: "Non devi essere l’esperto per sapere se una cosa è pronta. Ti serve un processo ripetibile per giudicarla. L’expertise segue l’approccio — non il contrario.",
          quote: "“Non serve una conoscenza tecnica profonda per sapere se una cosa è pronta. È questione di approccio.”",
        },
        {
          title: "Le domande sono il lavoro",
          desc: "Le risposte giuste vengono dalle domande giuste. Le domande giuste vengono da un obiettivo chiaro. Quando sei bloccato, di solito stai facendo la domanda sbagliata — torna all’obiettivo.",
          quote: "“È sempre questione di domande. Se non hai un obiettivo chiaro, non ti stai facendo le domande giuste.”",
        },
        {
          title: "Parti dalla definizione di “fatto”",
          desc: "La prima domanda su qualsiasi cosa: che aspetto ha “fatto”? Definisci il bersaglio prima di muoverti. Nessun bersaglio chiaro significa domande sbagliate — e sbatti sullo stesso muro all’infinito.",
          quote: "“La prima domanda era: qual è la definizione di ‘fatto’? Se devo raggiungere l’obiettivo, mi serve un obiettivo chiaro.”",
        },
        {
          title: "Datti i tuoi standard",
          desc: "Nessuno si aspetta la maestria alla prima settimana. Si aspettano che tieni un’asticella — e che la alzi di proposito. Gli standard te li dai tu, non te li consegna qualcuno.",
          quote: "“Devi darti degli standard. Nessuno ti chiede di essere al livello nella prima settimana.”",
        },
      ],
    },
    diagnosis: {
      tag: "La diagnosi",
      quotePre: "“Vedo miglioramenti nella ",
      quoteEm1: "qualità",
      quoteMid: " del lavoro. Non vedo miglioramenti nell’",
      quoteEm2: "approccio",
      quotePost: " — così continuiamo a sbattere sullo stesso muro.”",
      bar1Name: "Strato output",
      bar1Sub: "l’artefatto · il risultato visibile",
      bar1State: "In crescita ↗",
      bar2Name: "Strato approccio",
      bar2Sub: "come pensi · le domande che fai",
      bar2State: "Piatto →",
      attr: "Lo strato output si può copiare. Lo strato approccio no — ed è l’unico che compone. Quindi è quello che alleniamo.",
    },
    training: {
      tag: "Parte II — Allenamento",
      title: "Il loop in cui costruiamo.",
      sub: "La competenza si costruisce dentro un loop strutturato con guardrail. Io imposto il telaio. Tu costruisci dentro con piena libertà creativa. Revisioniamo contro l’asticella. Dimostri di aver capito. Alziamo l’asticella.",
      items: [
        {
          title: "Inquadra il progetto",
          desc: "Qualcuno costruisce lo scaffold e i vincoli — incluso ciò che esplicitamente non si vuole dentro. Tu non imposti il progetto; erediti un telaio pulito così ti concentri sul lavoro vero.",
          quote: "“Imposto io il progetto — tu non lo imposti mai, lo faccio per te. Poi inizi a lavorarci.”",
        },
        {
          title: "Costruisci dentro i guardrail",
          desc: "Dentro il telaio hai piena libertà creativa. I vincoli sono il fossato; la creatività è tua. Sai sempre il confine che non puoi superare.",
          quote: "“Hai la creatività per lavorare su quello che vuoi, ma sai comunque cosa NON voglio dentro il progetto.”",
        },
        {
          title: "Due posture d’aiuto",
          desc: "A volte ricevi esattamente ciò che chiedi. A volte la risposta resta all’altezza degli occhi e te la trovi da solo. La seconda è dove l’approccio si costruisce davvero.",
          quote: "“Da me avrai esattamente ciò che chiedi — l’altra è più all’altezza degli occhi, e le risposte le trovi da solo.”",
        },
        {
          title: "Sii il tuo primo revisore",
          desc: "Gira la tua definizione di “fatto” sul tuo lavoro prima di consegnarlo. “Ci sono arrivato vicino” lo devi prendere tu, non io. La mia revisione è la rete di sicurezza, non il primo controllo.",
          quote: "“Ci siamo arrivati molto vicini — ma non era fatto.”",
        },
        {
          title: "Il test del ripeti-indietro",
          desc: "Rispiega il brief con parole tue. Se non sai ripeterlo, non l’hai capito al 100%. Lo facciamo dal vivo, a voce, ogni volta.",
          quote: "“A modo tuo, spiegami cosa ho appena detto. Se non sai ripeterlo, non l’hai capito al 100%.”",
        },
        {
          title: "Usa il corpus",
          desc: "Le trascrizioni sono una knowledge base — a migliaia. Chiedi loro cosa viene detto. Usa l’AI sul materiale per colmare i tuoi buchi prima di chiedere a una persona.",
          quote: "“Hai migliaia di trascrizioni — puoi fare a quelle trascrizioni domande tipo ‘cosa si sta dicendo qui?’”",
        },
        {
          title: "La critica è cura; le conseguenze sono reali",
          desc: "La critica è data per migliorarti, mai per attaccarti. E mancare l’asticella ha conseguenze — perché gli obiettivi e i pagamenti sono reali.",
          quote: "“Non è una critica — il modo migliore per migliorare è iniziare. Ma se sbagli, ci sono conseguenze.”",
        },
      ],
    },
    tool1: {
      tag: "Toolkit — La competenza chiave",
      title: "Definire “fatto” in un campo che non conosci.",
      sub: "Non devi essere l’esperto per fissare l’asticella — ti serve un modo ripetibile per costruirne una. Questo processo è dominio-agnostico: funziona su un sito, una call di vendita, un contratto, una campagna, qualsiasi cosa.",
      steps: [
        {
          title: "Accetta di essere a zero — non ti squalifica",
          desc: "L’expertise non è il prerequisito per il giudizio. Puoi fissare un’asticella in un dominio che non hai mai toccato.",
        },
        {
          title: "Trova l’obiettivo reale",
          desc: "Di cosa ha davvero bisogno chi ha chiesto? Che aspetto ha il successo per lui? “Fatto” è definito dal suo risultato, non dal tuo sforzo.",
        },
        {
          title: "Fai emergere le dimensioni che contano",
          desc: "Chiedi alle persone, chiedi all’AI: cosa deve soddisfare una buona versione di questa cosa? Elenca ogni asse di qualità che trovi.",
        },
        {
          title: "Metti una soglia su ognuna",
          desc: "Decidi cos’è “abbastanza buono” su ogni asse. Dov’è la linea tra fatto e non fatto? Quella lista È la tua definizione di “fatto”.",
        },
        {
          title: "Ora puoi giudicare",
          desc: "Con l’asticella scritta, puoi valutare qualsiasi output — il tuo o quello dell’AI — senza essere l’esperto del dominio.",
        },
      ],
      exampleTag: "Applicato a un sito",
      example:
        "Senza sapere nulla dello stack, questo processo ha prodotto un’asticella tipo: funziona su ogni device, veloce, sicuro, usabile, finito. Un contratto produrrebbe una lista diversa. Una call di vendita, un’altra. La lista cambia col dominio — il processo no.",
      foot: "Scrivi l’asticella prima di partire. Nessuna asticella significa domande sbagliate — e lo stesso muro, ancora e ancora.",
    },
    tool2: {
      tag: "Toolkit — La leva",
      title: "Delega il fare. Tieni il giudizio.",
      sub: "La padronanza dell’AI non è l’obiettivo — è ciò che ottieni gratis una volta che l’approccio è giusto. La linea è semplice: dai all’AI l’esecuzione, mai la decisione.",
      delegateHead: "Delega — il fare",
      delegateSub: "Qui l’AI è più veloce di te. Lasciala correre.",
      delegate: [
        "Stesura e generazione",
        "Boilerplate e setup",
        "Ricerca, recupero, sintesi",
        "Refactor e varianti",
        "Prime bozze di qualsiasi cosa",
      ],
      keepHead: "Tieni — il giudizio",
      keepSub: "Questo è tuo. È ciò per cui vieni pagato.",
      keep: [
        "L’obiettivo",
        "La definizione di “fatto”",
        "Le domande",
        "La decisione su cos’è abbastanza buono",
        "La proprietà del risultato",
      ],
      warnTag: "La trappola",
      warn: "Il pericolo non è usare l’AI — è scaricarci il pensiero. Puoi avere l’AI e comunque non finire, perché il gap è giudizio, non lavoro. Migliori sono l’asticella e le tue domande, più l’AI ti moltiplica. Sbagliale e ti aiuta solo a fallire più in fretta.",
      quote: "“Sapere usare l’AI è la conseguenza dell’approccio. Avevi l’AI — e comunque non sei riuscito a finire il progetto da solo.”",
    },
    tool3: {
      tag: "Toolkit — Dove porta",
      title: "Quattro stadi. Percorri la diagonale.",
      sub: "Nessuno parte dalla cima — io no. Alla mia prima piattaforma non sapevo nulla: né lo stack, né il database, né gli strumenti. Questa è la scala che ho salito, e quella su cui sei tu. Ogni stadio è più giudizio e più responsabilità del precedente.",
      stages: [
        { rank: "Stadio 01", title: "Esegue", desc: "Fa il task così com’è dato. Ha bisogno del telaio e delle risposte consegnate." },
        { rank: "Stadio 02", title: "Giudica", desc: "Controlla il proprio lavoro contro un’asticella prima di consegnarlo. Prende il proprio “quasi”." },
        { rank: "Stadio 03", title: "Inquadra", desc: "Definisce “fatto” e fa le domande giuste senza che gliele consegnino." },
        { rank: "Stadio 04", title: "Detta lo standard", desc: "Inquadra il problema e l’asticella per gli altri. Costruisce i guardrail in cui tutti lavorano." },
      ],
      axisStart: "Più dipendenza",
      axisEnd: "Più giudizio · più responsabilità →",
      quote: "“È esattamente quello che chiederei quando ho costruito la mia prima piattaforma. Ho detto loro che non so nulla — e ci sono arrivato lo stesso, con l’approccio.”",
    },
    closing: {
      eyebrow: "Lo standard, in una riga",
      line: "Tieni una definizione di “fatto” chiara. Fai domande migliori. Possiedi il risultato. ",
      lineEm: "Renditi difficile da sostituire.",
      tagline:
        "“Il futuro del lavoro è una metamorfosi — dove la creatività umana e la precisione dell’AI si fondono, sbloccando nuovo potenziale ed elevando ciò che le aziende possono ottenere.”",
    },
    foot: "Morfeus Hub · Il Metodo · Standard operativo per il team",
  },
};
