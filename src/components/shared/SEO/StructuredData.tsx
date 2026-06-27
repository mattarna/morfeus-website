/**
 * Structured Data (JSON-LD) for SEO/GEO
 *
 * Organization (entità arricchita) + WebSite + Service + Founders (Person).
 * @id centralizzati in src/lib/seo/entity-ids.ts (ENT-01). Dati entità: docs/geo/entity-data.md (ENT-02).
 */
import { ORGANIZATION_ID, WEBSITE_ID, SERVICE_ID, personId, SITE_URL } from "@/lib/seo/entity-ids";
import { teamMembers } from "@/app/lib/team-data";

interface StructuredDataProps {
  locale: string;
}

// Founder ufficiali (slug = chiave in team-data). Davide è team, non founder.
const FOUNDER_SLUGS = ["matteo", "alex", "simone", "matteo-alvazzi"] as const;

export function StructuredData({ locale }: StructuredDataProps) {
  const isIt = locale === "it";

  // Founder come Person first-class (entità citabili), referenziati per @id dall'Organization.
  const founderNodes = FOUNDER_SLUGS.map((slug) => {
    const m = teamMembers[slug];
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId(slug),
      name: m.name,
      jobTitle: m.role,
      url: m.linkedin,
      sameAs: [m.linkedin],
      image: `${SITE_URL}${m.image}`,
      worksFor: { "@id": ORGANIZATION_ID },
    };
  });

  // Organization Schema (entità — disambiguazione + NAP coerente + founder)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Morfeus",
    alternateName: "Morfeus Hub",
    legalName: "Numanity S.r.l.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/brand/morfeus-mark.png`,
      width: 400,
      height: 100,
    },
    description: isIt
      ? "Integriamo l'AI nel DNA delle organizzazioni. Ripensiamo struttura, processi e decisioni per rendere l'AI parte integrante del modo di operare."
      : "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions to make AI a core part of how organizations operate.",
    disambiguatingDescription: isIt
      ? "Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI che entra nelle aziende in scaling come Operating Partner: trova dove perdono margine e costruisce sistemi AI — agenti, automazioni e competenze interne — che lo recuperano, misurato in euro."
      : "Morfeus (Numanity S.r.l.) is the Italian AI consulting and training company that embeds into scaling businesses as an Operating Partner: it finds where they lose margin and builds AI systems — agents, automations and internal skills — that recover it, measured in euros.",
    foundingDate: "2023",
    email: "hello@morfeushub.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Jacopo Dal Verme 7",
      postalCode: "20159",
      addressLocality: "Milano",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    taxID: "14209210963",
    founder: FOUNDER_SLUGS.map((slug) => ({ "@id": personId(slug) })),
    sameAs: [
      "https://www.linkedin.com/company/morfeus-hub-ai/",
      "https://www.instagram.com/morfeushub.ai/",
      "https://www.youtube.com/@MorfeusHub",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@morfeushub.com",
      contactType: "customer service",
      availableLanguage: ["English", "Italian"],
    },
    areaServed: { "@type": "Country", name: "Italy" },
    knowsAbout: [
      "Artificial Intelligence",
      "AI Consulting",
      "AI Agents",
      "Business Automation",
      "AI Adoption",
      "AI Training",
      "Operating Partner",
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Morfeus",
    description: isIt
      ? "Morfeus - Integriamo l'AI nel DNA delle organizzazioni"
      : "Morfeus - AI-Native Organization Design",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: isIt ? "it-IT" : "en-US",
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: "Morfeus AI Consulting",
    description: isIt
      ? "Servizi di consulenza AI per trasformare le organizzazioni"
      : "AI consulting services to transform organizations",
    provider: { "@id": ORGANIZATION_ID },
    serviceType: "AI Consulting",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isIt ? "Servizi Morfeus" : "Morfeus Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Morf Lab",
            description: isIt
              ? "Workshop esperienziali per trasformare i team in AI Champion"
              : "Experiential workshops to transform teams into AI Champions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Morf Forge",
            description: isIt
              ? "Operating Partner AI per aziende in scaling: si parte da un Pilot, poi presidio continuativo come Retainer"
              : "AI Operating Partner for scaling companies: start with a Pilot, then an ongoing Retainer partnership",
          },
        },
      ],
    },
  };

  const graphs = [organizationSchema, websiteSchema, serviceSchema, ...founderNodes];

  return (
    <>
      {graphs.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
