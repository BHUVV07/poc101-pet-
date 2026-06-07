import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/profile/', '/checkout/', '/orders/'],
    },
    sitemap: 'https://pawluxury.com/sitemap.xml',
  };
}
