export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function buildBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ label: 'Home', href: '/' }, ...items];
}

export function breadcrumbSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}
