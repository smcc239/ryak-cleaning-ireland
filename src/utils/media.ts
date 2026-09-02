/** Ryak-owned photography — local assets in /public/images/ryak/ */

const img = (file: string) => `/images/ryak/${file}`;

const IMAGES = {
  heroCommercial: img('hero-commercial.jpg'),
  floorMopping: img('floor-mopping.jpg'),
  cleanroomFloor: img('cleanroom-floor.jpg'),
  windowAbseil: img('window-abseil.jpg'),
  powerWashing: img('power-washing.jpg'),
  industrialConfined: img('industrial-confined.jpg'),
  industrialCrane: img('industrial-crane.jpg'),
  emergencySpill: img('emergency-spill.jpg'),
  emergencyFire: img('emergency-fire.jpg'),
  educationSchool: img('education-school.jpg'),
  wasteCleanup: img('waste-cleanup.jpg'),
  roofMaintenance: img('roof-maintenance.jpg'),
  suppliesMacro: img('supplies-macro.jpg'),
  floorBelfast: img('floor-belfast.jpg'),
  maintenanceSpray: img('maintenance-spray.jpg'),
} as const;

export const MEDIA = {
  hero: {
    home: IMAGES.heroCommercial,
    services: IMAGES.heroCommercial,
    sectors: IMAGES.industrialCrane,
    locations: IMAGES.floorMopping,
    contact: IMAGES.heroCommercial,
    about: IMAGES.heroCommercial,
    news: IMAGES.suppliesMacro,
  },
  breadcrumb: {
    default: IMAGES.floorMopping,
    services: IMAGES.heroCommercial,
    sectors: IMAGES.industrialCrane,
    locations: IMAGES.floorMopping,
    contact: IMAGES.heroCommercial,
    about: IMAGES.heroCommercial,
  },
  feature: {
    kitchen: IMAGES.maintenanceSpray,
    industrial: IMAGES.industrialConfined,
    office: IMAGES.floorMopping,
    window: IMAGES.windowAbseil,
    healthcare: IMAGES.cleanroomFloor,
    dataCentre: IMAGES.cleanroomFloor,
    emergency: IMAGES.emergencySpill,
    duct: IMAGES.maintenanceSpray,
    power: IMAGES.powerWashing,
    floor: IMAGES.floorMopping,
    road: IMAGES.wasteCleanup,
    builders: IMAGES.roofMaintenance,
    contract: IMAGES.heroCommercial,
  },
  locations: {
    dublin: IMAGES.heroCommercial,
    cork: IMAGES.floorMopping,
    galway: IMAGES.cleanroomFloor,
    limerick: IMAGES.suppliesMacro,
    waterford: IMAGES.floorMopping,
    kildare: IMAGES.cleanroomFloor,
    wicklow: IMAGES.suppliesMacro,
    meath: IMAGES.floorMopping,
    kilkenny: IMAGES.cleanroomFloor,
    wexford: IMAGES.suppliesMacro,
    donegal: IMAGES.floorMopping,
    kerry: IMAGES.cleanroomFloor,
    sligo: IMAGES.suppliesMacro,
    athlone: IMAGES.floorMopping,
    dundalk: IMAGES.cleanroomFloor,
    belfast: IMAGES.floorBelfast,
    derry: IMAGES.floorBelfast,
    newry: IMAGES.floorBelfast,
    antrim: IMAGES.floorBelfast,
    armagh: IMAGES.floorBelfast,
    lisburn: IMAGES.floorBelfast,
  },
} as const;

export type MediaSection = keyof typeof MEDIA.breadcrumb;

export function isLocalImage(src: string) {
  return src.startsWith('/images/');
}

export function getBreadcrumbImage(section: MediaSection = 'default') {
  return MEDIA.breadcrumb[section] ?? MEDIA.breadcrumb.default;
}

export function getLocationImage(slug: string) {
  return MEDIA.locations[slug as keyof typeof MEDIA.locations] ?? MEDIA.feature.floor;
}

export function getServiceImage(icon: string) {
  const map: Record<string, string> = {
    kitchen: MEDIA.feature.kitchen,
    industrial: MEDIA.feature.industrial,
    office: MEDIA.feature.office,
    contract: MEDIA.feature.contract,
    window: MEDIA.feature.window,
    emergency: MEDIA.feature.emergency,
    duct: MEDIA.feature.duct,
    power: MEDIA.feature.power,
    floor: MEDIA.feature.floor,
    road: MEDIA.feature.road,
    builders: MEDIA.feature.builders,
  };
  return map[icon] ?? MEDIA.hero.services;
}

export function getSectorImage(slug: string) {
  const map: Record<string, string> = {
    'data-centres': MEDIA.feature.dataCentre,
    healthcare: MEDIA.feature.healthcare,
    'food-production': MEDIA.feature.industrial,
    industrial: MEDIA.feature.industrial,
    manufacturing: MEDIA.feature.industrial,
    education: IMAGES.educationSchool,
    construction: IMAGES.roofMaintenance,
    transport: MEDIA.heroCommercial,
    'marine-shipping': IMAGES.industrialCrane,
    'offices-professional-services': MEDIA.feature.office,
  };
  return map[slug] ?? MEDIA.hero.sectors;
}

export function getOgImage(pathname: string, siteUrl: string) {
  if (pathname.startsWith('/services/window-cleaning')) {
    return `${siteUrl}${MEDIA.feature.window}`;
  }
  if (pathname.startsWith('/services/')) {
    return `${siteUrl}${MEDIA.hero.services}`;
  }
  if (pathname.startsWith('/locations/')) {
    const slug = pathname.replace('/locations/', '').replace(/\/$/, '');
    return `${siteUrl}${getLocationImage(slug)}`;
  }
  return `${siteUrl}/og-default.jpg`;
}
