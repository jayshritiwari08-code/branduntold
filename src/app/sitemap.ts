import { MetadataRoute } from 'next';
import { fetchAllArticles, fetchAllCategories, slugify, BASE_URL } from '@/app/lib/api';

// Revalidate the sitemap dynamically every 60 seconds in production (ISR)
export const revalidate = 60;


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the production domain name instead of localhost:3000
  const productionUrl = 'https://www.branduntold.in';
  const baseUrl = (BASE_URL && !BASE_URL.includes('localhost')) 
    ? (BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL)
    : productionUrl;

  // 1. Fetch dynamic articles and categories from CMS/API
  const [articles, categories] = await Promise.all([
    fetchAllArticles(),
    fetchAllCategories(),
  ]);

  // 2. Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/work-with-me',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 3. Define article routes
  const articleRoutes = articles
    .filter((article) => article.slug)
    .map((article) => {
      const dateStr = article.updated_at || article.date || article.created_at;
      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: dateStr ? new Date(dateStr) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

  // 4. Define category routes
  const categoryRoutes = categories
    .filter((category) => category.heading)
    .map((category) => {
      const dateStr = category.updated_at || category.created_at;
      return {
        url: `${baseUrl}/categories/${slugify(category.heading)}`,
        lastModified: dateStr ? new Date(dateStr) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      };
    });

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
