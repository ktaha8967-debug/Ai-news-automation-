import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ainews-automation.org';
  const articles = db.getArticles();
  const topics = db.getTopics();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/editorial-standards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  topics.forEach((t) => {
    routes.push({
      url: `${baseUrl}/topics/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  articles.forEach((a) => {
    routes.push({
      url: `${baseUrl}/news/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  return routes;
}
