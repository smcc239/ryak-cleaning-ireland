export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavMegaColumn {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  mega?: NavMegaColumn[];
  links?: NavLink[];
}

export const aboutLinks: NavLink[] = [
  { label: 'About Us', href: '/about-us/', description: 'Family-run since 2003' },
  { label: 'Accreditations', href: '/accreditations/', description: 'ISO 9001, ISO 14001 & more' },
  { label: 'Careers', href: '/careers/', description: 'Join our Dublin team' },
];

export const resourceLinks: NavLink[] = [
  { label: 'Guides & Insights', href: '/news/', description: 'TR19, data centre cleaning & more' },
  { label: 'Service Areas', href: '/locations/', description: 'Republic of Ireland & Northern Ireland' },
];

export function buildServiceMega(services: NavLink[]): NavMegaColumn[] {
  const half = Math.ceil(services.length / 2);
  return [
    { title: 'Core services', links: services.slice(0, half) },
    { title: 'Specialist services', links: services.slice(half) },
  ];
}

export function buildSectorMega(sectors: NavLink[]): NavMegaColumn[] {
  const half = Math.ceil(sectors.length / 2);
  return [
    { title: 'Key sectors', links: sectors.slice(0, half) },
    { title: 'More industries', links: sectors.slice(half) },
  ];
}
