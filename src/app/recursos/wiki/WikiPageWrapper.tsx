'use client';
import WikiPageClient from './WikiPageClient';
import type { WikiArticle } from '@/lib/wikiSearch';

interface WikiPageWrapperProps {
  allArticles: WikiArticle[];
}

export default function WikiPageWrapper({ allArticles }: WikiPageWrapperProps) {
  return <WikiPageClient allArticles={allArticles} />;
}
