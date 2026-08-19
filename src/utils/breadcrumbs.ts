export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function buildBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ label: 'Home', href: '/' }, ...items];
}

export function breadcrumbSchema(items: BreadcrumbItem[], siteUrl: string, currentPath?: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const itemUrl = item.href
        ? `${siteUrl}${item.href}`
        : isLast && currentPath
          ? `${siteUrl}${currentPath}`
          : undefined;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };
}
