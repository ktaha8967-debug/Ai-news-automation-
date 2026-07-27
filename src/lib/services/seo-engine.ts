import { Article } from '@/types';

export function generateNewsArticleSchema(article: Article, baseUrl: string = 'https://ainews-automation.org') {
  const articleUrl = `${baseUrl}/news/${article.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    'headline': article.title,
    'description': article.metaDescription,
    'image': [article.featuredImage],
    'datePublished': article.publishedAt,
    'dateModified': article.updatedAt,
    'author': {
      '@type': 'Person',
      'name': article.author.name,
      'jobTitle': article.author.role,
      'url': `${baseUrl}/authors/${article.author.slug}`
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Worldwide AI News Network',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/logo.png`
      }
    },
    'keywords': article.keywords.join(', '),
    'articleSection': article.category,
    'citation': article.sources.map(s => s.sourceUrl)
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}
