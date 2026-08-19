import { ACCREDITATIONS, SITE } from '../consts';

export interface FaqItem {
  question: string;
  answer: string;
}

export function pageId(siteUrl: string, path: string) {
  const normalised = path.endsWith('/') ? path : `${path}/`;
  return `${siteUrl}${normalised}#webpage`;
}

export function pageUrl(siteUrl: string, path: string) {
  return `${siteUrl}${path.endsWith('/') ? path : `${path}/`}`;
}

export function organizationNode() {
  return {
    '@type': ['Organization', 'LocalBusiness', 'CleaningService'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/images/ryak-logo.webp`,
    },
    image: `${SITE.url}/og-default.jpg`,
    description: SITE.description,
    foundingDate: SITE.foundingDate,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'IE',
      availableLanguage: ['English', 'en-IE'],
    },
    areaServed: [
      { '@type': 'Country', name: 'Ireland' },
      { '@type': 'AdministrativeArea', name: 'Republic of Ireland' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    hasCredential: ACCREDITATIONS.map((name) => ({
      '@type': 'EducationalOccupationalCredential',
      name,
      credentialCategory: 'certification',
    })),
    knowsAbout: [
      'Commercial cleaning',
      'Industrial cleaning',
      'TR19 kitchen extract cleaning',
      'Data centre cleaning',
      'Healthcare cleaning',
      'Emergency cleaning',
    ],
    sameAs: [SITE.social.facebook, SITE.social.linkedin, SITE.social.twitter],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.shortName,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-IE',
  };
}

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  const url = pageUrl(SITE.url, opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': pageId(SITE.url, opts.path),
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  image?: string;
  areaServed?: Record<string, unknown> | Record<string, unknown>[];
}) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? 'Commercial Cleaning',
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: opts.areaServed ?? { '@type': 'Country', name: 'Ireland' },
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function locationServiceSchema(opts: {
  city: string;
  region: string;
  description: string;
  url: string;
}) {
  return serviceSchema({
    name: `Commercial Cleaning ${opts.city}`,
    description: opts.description,
    url: opts.url,
    serviceType: 'Commercial Cleaning',
    areaServed: {
      '@type': 'City',
      name: opts.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: opts.region,
      },
    },
  });
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  pubDate: Date;
  updatedDate?: Date;
  image?: string;
}) {
  const url = pageUrl(SITE.url, opts.path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    author: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.shortName,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/images/ryak-logo.webp`,
      },
    },
    mainEntityOfPage: { '@id': pageId(SITE.url, opts.path) },
    image: opts.image ?? `${SITE.url}/og-default.jpg`,
    inLanguage: 'en-IE',
  };
}

export function itemListSchema(opts: {
  name: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function contactPageSchema(path: string) {
  const url = pageUrl(SITE.url, path);
  return {
    '@type': 'ContactPage',
    '@id': pageId(SITE.url, path),
    url,
    name: 'Contact Ryak Cleaning Ireland',
    description: 'Request a quote or contact Ryak Cleaning at our Dublin head office.',
    mainEntity: { '@id': `${SITE.url}/#organization` },
  };
}

export function collectionPageSchema(opts: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@type': 'CollectionPage',
    '@id': pageId(SITE.url, opts.path),
    url: pageUrl(SITE.url, opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
  };
}
