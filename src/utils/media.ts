/** Curated images — unique ID per location (no duplicate stock across counties) */

const pexels = (id: number, w = 1800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const MEDIA = {
  hero: {
    home: pexels(4483610),
    services: pexels(6195951),
    sectors: pexels(209230),
    locations: pexels(325185),
    contact: pexels(4099468),
    about: pexels(4099237),
    news: pexels(4099236),
  },
  breadcrumb: {
    default: pexels(6195125, 1200),
    services: pexels(6195951, 1200),
    sectors: pexels(209230, 1200),
    locations: pexels(325185, 1200),
    contact: pexels(4099468, 1200),
    about: pexels(4099237, 1200),
  },
  feature: {
    kitchen: pexels(2544829, 1200),
    industrial: pexels(265705, 1200),
    office: pexels(1181406, 1200),
    window: pexels(2448384, 1200),
    healthcare: pexels(263402, 1200),
    dataCentre: pexels(325229, 1200),
  },
  locations: {
    dublin: pexels(1796720, 1200),
    cork: pexels(912050, 1200),
    galway: pexels(1285625, 1200),
    limerick: pexels(1486785, 1200),
    waterford: pexels(127873, 1200),
    kildare: pexels(1396122, 1200),
    wicklow: pexels(1770310, 1200),
    meath: pexels(1396132, 1200),
    kilkenny: pexels(5192240, 1200),
    wexford: pexels(3760067, 1200),
    donegal: pexels(417074, 1200),
    kerry: pexels(2165688, 1200),
    sligo: pexels(1118874, 1200),
    athlone: pexels(3184292, 1200),
    dundalk: pexels(250692, 1200),
    belfast: pexels(1486804, 1200),
    derry: pexels(635705, 1200),
    newry: pexels(1396122, 1200),
    antrim: pexels(417074, 1200),
    armagh: pexels(5192240, 1200),
    lisburn: pexels(1181406, 1200),
  },
} as const;

export type MediaSection = keyof typeof MEDIA.breadcrumb;

export function getBreadcrumbImage(section: MediaSection = 'default') {
  return MEDIA.breadcrumb[section] ?? MEDIA.breadcrumb.default;
}

export function getLocationImage(slug: string) {
  return MEDIA.locations[slug as keyof typeof MEDIA.locations] ?? MEDIA.hero.locations;
}

export function getServiceImage(icon: string) {
  const map: Record<string, string> = {
    kitchen: MEDIA.feature.kitchen,
    industrial: MEDIA.feature.industrial,
    office: MEDIA.feature.office,
    contract: MEDIA.feature.office,
    window: MEDIA.feature.window,
    emergency: MEDIA.feature.industrial,
    duct: MEDIA.feature.kitchen,
    power: MEDIA.feature.industrial,
    floor: MEDIA.feature.office,
    road: MEDIA.feature.industrial,
    builders: MEDIA.feature.industrial,
  };
  return map[icon] ?? MEDIA.hero.services;
}

export function getSectorImage(slug: string) {
  const map: Record<string, string> = {
    'data-centres': MEDIA.feature.dataCentre,
    healthcare: MEDIA.feature.healthcare,
    'food-production': MEDIA.feature.kitchen,
    industrial: MEDIA.feature.industrial,
    manufacturing: MEDIA.feature.industrial,
  };
  return map[slug] ?? MEDIA.hero.sectors;
}

export function getOgImage(pathname: string, siteUrl: string) {
  if (pathname.startsWith('/services/commercial-kitchen-cleaning')) {
    return `${siteUrl}/og-default.jpg`;
  }
  if (pathname.startsWith('/locations/')) {
    const slug = pathname.replace('/locations/', '').replace(/\/$/, '');
    const img = getLocationImage(slug);
    return img;
  }
  return `${siteUrl}/og-default.jpg`;
}
