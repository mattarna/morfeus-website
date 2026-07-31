import Link from "next/link";
import type { Metadata } from "next";
import { Documento } from "@/components/shared/Documento";
import { SiteShell } from "@/components/site";
import { SITE_URL } from "@/lib/seo/entity-ids";
import "./globals.css";
import "@/components/pagine/kit.css";

/* ============================================================
   LA 404 DEGLI INDIRIZZI CHE NON APPARTENGONO A NESSUN GRUPPO
   ------------------------------------------------------------
   Con due layout radice, un indirizzo inventato non appartiene
   ne' a (sito) ne' a (fuori-lingua): Next non sa quale <html>
   usare e ripiega sul suo guscio spoglio, senza foglio di stile
   e senza tracciamento.

   Questa e' l'unica pagina che apre il documento da sola, e per
   questo usa Documento come i due layout. Il testo e' bilingue:
   fuori da /[locale] non sappiamo chi e' arrivato, quindi la
   prima cosa che offriamo e' proprio la scelta della lingua.

   Richiede `experimental.globalNotFound` in next.config.mjs.
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pagina non trovata · Page not found | Morfeus",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <Documento lang="it">
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
              <Link className="btn btn-3" href="/">
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
    </Documento>
  );
}
