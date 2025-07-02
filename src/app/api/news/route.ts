// /app/api/news/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await res.json();

    if (!data.articles) {
      return NextResponse.json({ error: 'No articles found' }, { status: 404 });
    }

    return NextResponse.json(data.articles);
  } catch (err) {
    console.error('News fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
