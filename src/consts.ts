export const SITE = {
  name: 'Ryak Cleaning and Support Services',
  shortName: 'Ryak Cleaning Ireland',
  url: 'https://www.ryakcleaning.ie',
  locale: 'en-IE',
  phone: '+353 1 531 4044',
  phoneDisplay: '01 531 4044',
  phoneHref: 'tel:+35315314044',
  email: 'info@ryakcleaning.ie',
  address: {
    line1: 'Harcourt Centre, Block 4',
    line2: 'Harcourt Road',
    city: 'Dublin 2',
    region: 'Leinster',
    country: 'Ireland',
    countryCode: 'IE',
    postalCode: 'D02 HW77',
    full: 'Harcourt Centre, Block 4, Harcourt Road, Dublin 2, D02 HW77',
    mapsQuery: 'Harcourt Centre, Block 4, Harcourt Road, Dublin 2, D02 HW77',
    mapsUrl: 'https://maps.google.com/?q=Harcourt+Centre,+Block+4,+Harcourt+Road,+Dublin+2,+D02+HW77',
    /** Must match Google Business Profile NAP exactly before launch */
    verified: false,
  },
  belfastUrl: 'https://www.ryakcleaning.com',
  social: {
    facebook: 'https://www.facebook.com/ryakcleaning',
    linkedin: 'https://www.linkedin.com/company/ryak-cleaning',
    twitter: 'https://twitter.com/ryakcleaning',
  },
  geo: {
    latitude: 53.3336,
    longitude: -6.2628,
  },
  openingHours: {
    weekdays: 'Monday to Friday, 8:00am – 6:00pm',
    emergency: '24/7 emergency cleaning response',
  },
} as const;

export const ACCREDITATIONS = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'Alcumus SafeContractor',
  'Constructionline Gold',
  'BICSc',
  'IPAF',
  'FWC',
  'FSB Member',
] as const;

export const STATS = [
  { value: '20+', label: 'Years in commercial cleaning' },
  { value: '100+', label: 'Businesses supported' },
  { value: '32', label: 'Counties covered nationwide' },
  { value: '24/7', label: 'Emergency response cleaning' },
] as const;
