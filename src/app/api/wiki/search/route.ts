import { NextResponse } from 'next/server';
import { getAllWikiArticles } from '@/lib/wikiSearch';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const allArticles = await getAllWikiArticles();
    
    // Search in title, description and content
    const results = allArticles.filter(article => {
      const content = `${article.title} ${article.description} ${article.content || ''}`;
      return content.toLowerCase().includes(query.toLowerCase());
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Wiki search error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
