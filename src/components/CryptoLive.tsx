// /components/CryptoLive.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoLive() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Failed to fetch coin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📊 Live Crypto Prices</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:bg-blue-100 hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={coin.image}
                alt={coin.name}
                width={48}
                height={48}
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{coin.name}</h2>
                <p className="text-gray-500 text-sm uppercase">{coin.symbol}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-bold text-xl">
                ${coin.current_price.toLocaleString()}
              </p>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  coin.price_change_percentage_24h >= 0
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
