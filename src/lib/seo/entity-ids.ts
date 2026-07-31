/**
 * Central @id constants for JSON-LD entities (schema.org graph).
 *
 * One stable identity per entity node: referenced everywhere instead of
 * hardcoded strings, so Organization / WebSite / Service / Person stay
 * linkable and coherent across the site. Cornerstone of entity
 * disambiguation for SEO/GEO (ENT-01).
 *
 * Entity source data: docs/geo/entity-data.md
 */
/* L'host e' `www`, non il dominio nudo: morfeushub.com risponde 307
   verso www.morfeushub.com. Con il dominio nudo qui, og:url e i nodi
   JSON-LD indicavano un indirizzo che redirige invece di quello
   servito. Se un giorno si decide il contrario, prima si cambia il
   dominio primario su Vercel, poi questa riga. */
export const SITE_URL = "https://www.morfeushub.com";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;

/** Stable @id for a founder/person node, keyed by the team-data slug. */
export const personId = (slug: string): string => `${SITE_URL}/#person-${slug}`;
