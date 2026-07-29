import type { Metadata } from "next";
import { SiteShell } from "@/components/site";
import { siteFontVars } from "@/components/site/fonts";
import { BancoLoader } from "@/components/site/loader/BancoLoader";
import "@/components/pagine/kit.css";

/* ============================================================
   BANCO LOADER · pagina di servizio, non del sito.
   ------------------------------------------------------------
   Esiste per scegliere fra la direzione A e la C guardandole sulla
   pagina vera, con la testata vera.

   Sta sotto /mockup perche' e' l'unico ramo che il proxy lascia
   passare senza prefisso di lingua (src/proxy.ts, "path senza
   locale: mockup per design review"). Una cartella nuova a radice
   veniva riscritta in /it/... da next-intl e rispondeva 404.

   DA CANCELLARE quando la scelta e' fatta, insieme al perdente.
   ============================================================ */

export const metadata: Metadata = {
  title: "Banco loader",
  robots: { index: false, follow: false },
};

export default function LoaderLab() {
  return (
    <SiteShell locale="it">
      <section className="band ink hero pg">
        <div className="wrap">
          <div className="eye">Banco di prova · interno</div>
          <h1>
            Due modi di far partire il sito.{" "}
            <span className="emph">Si sceglie guardandoli</span>.
          </h1>
          <p className="copy">
            In basso i due tasti. Guarda soprattutto la fine: A ti lascia al centro
            dello schermo, C ti lascia sulla testata. È lì che si decide, non
            nell&apos;effetto.
          </p>
        </div>
      </section>

      <section className="band carta pg">
        <div className="wrap">
          <div className="eye">Cosa guardare</div>
          <h2 className="h-sect">
            Le tre domande che <span className="emph">decidono</span>.
          </h2>
          <p className="lead">
            Primo: dopo averlo visto tre volte, dà ancora qualcosa o è già un
            pedaggio? Secondo: quando finisce, sai dove guardare? Terzo: sembra
            fatto dalla stessa mano che ha fatto le pagine, o è un pezzo riportato?
          </p>
          <div className="quota" style={{ marginTop: 34 }}>
            A dura circa un secondo · C circa un secondo e mezzo
          </div>
        </div>
      </section>

      <BancoLoader classiFont={siteFontVars} />

      {/* La barra dei comandi. Sta qui e non in un CSS condiviso perche'
          e' arredamento del banco: se ne va con la pagina. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .banco{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);
            z-index:60;display:flex;gap:8px;padding:8px;border-radius:999px;
            background:rgba(11,11,12,.86);border:1px solid #26262b;
            backdrop-filter:blur(10px)}
          .banco button{font-family:var(--font-mono);font-size:12px;
            letter-spacing:.12em;text-transform:uppercase;color:#e4e7f0;
            background:transparent;border:1px solid #26262b;border-radius:999px;
            padding:9px 16px;cursor:pointer}
          .banco button:hover{border-color:#8ca5f7;color:#8ca5f7}
          .banco button[data-on="1"]{border-color:#533dfc;color:#8ca5f7}
        `,
        }}
      />
    </SiteShell>
  );
}
