import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pawluxury.com';

  const products = [
    'royal-velvet-orthopedic-bed',
    'grand-reserve-venison-salmon',
    'tuscan-leather-gilded-collar',
    'mongolian-cashmere-sweater',
    'organic-lavender-silk-elixir',
    'bespoke-oak-indoor-den',
  ];
  
  const productUrls = products.map(slug => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
  }));

  const blogs = [
    'art-of-holistic-pet-wellness',
    'designing-spaces-pet-comfort-luxury-decor',
  ];
  
  const blogUrls = blogs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  const routes = ['', '/shop', '/categories', '/consultation', '/blog', '/about'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...productUrls, ...blogUrls];
}
