"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./page-transition.css";

/* Le cifre del contratto stanno qui, e solo qui: passano al CSS come
   custom properties inline. 180 + 220 = 440ms percepiti, piu' la
   copertura, che dura quanto dura la navigazione vera. */
const EXIT_MS = 180;
const ENTER_MS = 220;

/* Rete di sicurezza: se dopo questo tempo la rotta non e' cambiata, la
   navigazione non stava passando dal router. Si torna visibili e si va col
   browser: meglio un cambio secco che una pagina rimasta invisibile.
   Misurato in sviluppo: copertura 76-109ms su rotte gia' compilate, fino a
   ~1.4s quando Turbopack compila la rotta al primo ingresso. In produzione
   le pagine sono statiche e prefetchate, quindi siamo sempre nel primo caso.
   La soglia sta larga apposta: deve scattare solo per un vero blocco. */
const SAFETY_MS = 3000;

type Phase = "idle" | "exiting" | "entering";

/* Non tutto quello che ha un href e' una rotta di Next. Sotto /public
   vivono i pacchetti statici (corsi, lezioni, playbook): sono documenti a
   se', il router non li conosce e devono restare navigazioni normali.
   I prefissi sono senza hash apposta, cosi' coprono anche le cartelle
   versionate tipo /corso-claude-unlocked-a6c95d9c6f. */
const ROTTE_NON_CLIENT = [
  "/api",
  "/funnel-internal",
  "/__funnels",
  "/claude-unlocked",
  "/corso-claude-unlocked",
  "/formazione-morfeus",
  "/marketing-mastery",
  "/freebies",
  "/playbook-assets",
];

function passaDalRouter(pathname: string): boolean {
  if (ROTTE_NON_CLIENT.some((prefisso) => pathname.startsWith(prefisso))) return false;
  // Qualsiasi cosa finisca con un'estensione e' un file, non una pagina
  const ultimo = pathname.split("/").pop() ?? "";
  return !ultimo.includes(".");
}

function menoMovimento(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [pathRenderizzato, setPathRenderizzato] = useState(pathname);

  const timers = useRef<number[]>([]);
  const destinazione = useRef<string | null>(null);

  const azzeraTimer = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const fraPoco = useCallback((ms: number, azione: () => void) => {
    timers.current.push(window.setTimeout(azione, ms));
  }, []);

  useEffect(() => azzeraTimer, [azzeraTimer]);

  /* L'entrata parte quando la rotta e' DAVVERO cambiata, non a tempo. Se la
     pagina nuova ci mette di piu', la copertura dura di piu': nessuna attesa
     finta, e nessun rischio di scoprire una pagina non ancora pronta.

     Si adegua lo stato in fase di render invece che dentro un effetto: e' il
     modo che React indica per reagire a un valore esterno cambiato, e non
     costa il giro di render in piu' che un effetto farebbe pagare proprio
     nel momento in cui la pagina nuova sta montando.

     Con "meno movimento" non intercettiamo i click, quindi la fase resta
     idle. Se l'impostazione cambia a meta' transizione ci pensa il CSS, che
     in quel media query rimette il contenuto visibile. */
  if (pathRenderizzato !== pathname) {
    setPathRenderizzato(pathname);
    setPhase(menoMovimento() ? "idle" : "entering");
  }

  /* Coda dell'entrata. Qui si smonta anche la rete di sicurezza: la rotta e'
     arrivata, quindi i timer dell'uscita hanno finito il loro lavoro. */
  useEffect(() => {
    if (phase !== "entering") return;
    destinazione.current = null;
    azzeraTimer();
    const id = window.setTimeout(() => setPhase("idle"), ENTER_MS);
    return () => window.clearTimeout(id);
  }, [phase, azzeraTimer]);

  /* Il router di Next non espone un "sto per andarmene": la pagina vecchia
     resta montata finche' la nuova non e' pronta, e su rotte prefetchate quel
     tempo e' zero. Per avere un'uscita bisogna prendersela: si intercetta il
     click, si anima, poi si naviga. */
  useEffect(() => {
    const alClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (menoMovimento()) return;

      const target = event.target;
      const anchor = target instanceof Element ? target.closest("a") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      // Via di fuga per chi la vuole evitare su un singolo link
      if (anchor.dataset.noTransition !== undefined) return;

      const grezzo = anchor.getAttribute("href");
      if (!grezzo || grezzo.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      // Stessa pagina (ancora o filtro): e' un movimento interno, non un cambio
      if (url.pathname === window.location.pathname) return;
      if (!passaDalRouter(url.pathname)) return;

      const href = url.pathname + url.search + url.hash;

      event.preventDefault();
      destinazione.current = href;
      azzeraTimer();
      setPhase("exiting");
      fraPoco(EXIT_MS, () => router.push(href));
      fraPoco(SAFETY_MS, () => {
        if (destinazione.current !== href) return;
        setPhase("idle");
        window.location.href = href;
      });
    };

    document.addEventListener("click", alClick, true);
    return () => document.removeEventListener("click", alClick, true);
  }, [router, azzeraTimer, fraPoco]);

  const durate = {
    "--pt-exit": `${EXIT_MS}ms`,
    "--pt-enter": `${ENTER_MS}ms`,
  } as CSSProperties;

  return (
    <>
      <div className="pt-shell" data-phase={phase} style={durate}>
        {children}
      </div>
      <div className="pt-line" data-phase={phase} style={durate} aria-hidden="true">
        <span className="pt-line__head" />
      </div>
    </>
  );
}
