import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml for both EN and IT versions
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://morfeushub.com';
  const lastModified = new Date();
  
  return [
    // English version
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          it: `${baseUrl}/it`,
        },
      },
    },
    // Italian version
    {
      url: `${baseUrl}/it`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          it: `${baseUrl}/it`,
        },
      },
    },
  ];
}


