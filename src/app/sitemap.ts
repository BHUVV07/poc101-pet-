import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://manasavetpharma.com';

  const blogs = [
    'art-of-veterinary-medicine',
    'understanding-pet-allergies-immunotherapy',
  ];
  
  const blogUrls = blogs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  const routes = ['', '/consultation', '/blog', '/about', '/wholesale', '/petstep'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogUrls];
}
