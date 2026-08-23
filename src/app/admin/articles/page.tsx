import React from 'react';
import { db } from '@/lib/db';
import ArticleManagementClient from '@/components/ArticleManagementClient';

export const dynamic = 'force-dynamic';

export default function ArticleReviewPage() {
  const articles = db.getArticles();

  return <ArticleManagementClient initialArticles={articles} />;
}


