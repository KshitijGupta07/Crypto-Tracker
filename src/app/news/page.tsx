'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  published_at: string;
  url: string;
  source: { title: string };
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();

        if (Array.isArray(data)) {
          setNews(data); // ✅ data is already an array from the API route
        } else {
          console.error('Unexpected API response:', data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📰 Real-Time Crypto News
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : news.length === 0 ? (
        <p className="text-center text-red-500">No news available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow p-4 hover:bg-blue-100 transition duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-500">
                {item.source?.title} · {new Date(item.published_at).toLocaleString()}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
