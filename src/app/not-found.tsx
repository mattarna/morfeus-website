import Link from "next/link";
import { SiteShell } from "@/components/site";
import "@/components/pagine/kit.css";

/* ============================================================
   404 GLOBALE: quella che scatta quando l'indirizzo non ha nemmeno
   un prefisso di lingua valido (/pippo, /it-IT/qualcosa...).
   ------------------------------------------------------------
   Stesso vestito della 404 dentro la lingua, con una differenza
   sostanziale: qui NON sappiamo in che lingua sta chi e' arrivato,
   perche' fuori da /[locale] non c'e' contesto next-intl. Quindi il
   testo e' bilingue e la prima scelta e' proprio la lingua.

   Server component: senza useLocale non serve nulla lato client.
   ============================================================ */

export default function GlobalNotFound() {
  return (
    <SiteShell locale="it">
      <section className="band ink pg">
        <div className="wrap text-center">
          <div className="eye">Errore 404 · Error 404</div>
          <h1 className="h-sect">
            Questa pagina <span className="emph">non esiste</span>.
          </h1>
          <p className="lead">
            L&apos;indirizzo non corrisponde a nessuna pagina del sito. Scegli la lingua e
            riparti da li&apos;.
          </p>
          <p className="lead">
            This address does not match any page on the site. Pick a language and start from
            there.
          </p>

          <div className="cta-row centrata">
            <Link className="btn btn-1" href="/it">
              Vai al sito in italiano
            </Link>
            <Link className="btn btn-3" href="/en">
              Go to the English site
            </Link>
          </div>

          {/* La cifra sta a margine come una quota su un disegno tecnico:
              chi arriva qui deve trovare l'uscita, non leggere l'errore. */}
          <div className="quota-404" aria-hidden="true">
            404
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
