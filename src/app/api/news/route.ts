import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.CRYPTOPANIC_API_KEY;
  const url = `https://cryptopanic.com/api/v1/posts/?&auth_token=${API_KEY}&currencies=BTC,ETH,XRP`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return NextResponse.json(data.results); // results is the array of news posts
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
