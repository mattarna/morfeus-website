/**
 * Structured Data (JSON-LD) for SEO
 * 
 * Implements Schema.org Organization and WebSite schemas
 * for better Google search results and rich snippets
 */

interface StructuredDataProps {
  locale: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = "https://morfeushub.com";
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Morfeus",
    alternateName: "Morfeus Hub",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/m-w2.png`,
      width: 400,
      height: 100,
    },
    description: locale === "it" 
      ? "Integriamo l'AI nel DNA delle organizzazioni. Ripensiamo struttura, processi e decisioni per rendere l'AI parte integrante del modo di operare."
      : "We integrate AI into the DNA of organizations. Rethinking structure, processes, and decisions to make AI a core part of how organizations operate.",
    email: "info@morfeushub.com",
    sameAs: [
      "https://www.linkedin.com/company/morfeus-hub-ai/",
      "https://www.instagram.com/morfeushub.ai/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@morfeushub.com",
      contactType: "customer service",
      availableLanguage: ["English", "Italian"],
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 41.9028,
        longitude: 12.4964,
      },
      geoRadius: "10000",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "AI Consulting",
      "Digital Transformation",
      "Business Automation",
      "AI Strategy",
      "Machine Learning",
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Morfeus",
    description: locale === "it"
      ? "Morfeus - Integriamo l'AI nel DNA delle organizzazioni"
      : "Morfeus - AI-Native Organization Design",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: locale === "it" ? "it-IT" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Morfeus AI Consulting",
    description: locale === "it"
      ? "Servizi di consulenza AI per trasformare le organizzazioni"
      : "AI consulting services to transform organizations",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    serviceType: "AI Consulting",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "it" ? "Servizi Morfeus" : "Morfeus Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Morph Lab",
            description: locale === "it"
              ? "Workshop esperienziali per trasformare i team in AI Champion"
              : "Experiential workshops to transform teams into AI Champions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Morph Path",
            description: locale === "it"
              ? "AI Adoption & Governance per sistemi scalabili"
              : "AI Adoption & Governance for scalable systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Morph Forge",
            description: locale === "it"
              ? "Sviluppo rapido e MVP con AI"
              : "Rapid development and AI-first MVPs",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}

