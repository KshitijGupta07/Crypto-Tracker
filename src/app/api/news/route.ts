import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.CRYPTOPANIC_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&currencies=BTC,ETH&public=true`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.results || []);
  } catch (err) {
    console.error("News fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
