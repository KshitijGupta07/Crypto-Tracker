'use client';

import { useEffect, useState } from 'react';

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
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setCoins(data);
        setFilteredCoins(data);
        setError(null); // clear error if it was set previously
      } catch (err) {
        console.error('❌ Fetch failed:', err);
        setError('Failed to load coin data. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term)
    );
    setFilteredCoins(results);
  }, [searchTerm, coins]);

  if (loading) return <p className="text-center mt-10 text-gray-600 text-lg">Loading...</p>;

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">📈 Live Crypto Prices</h1>

      {/* 🔍 Search Input */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search coin by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ❌ Show error if exists */}
      {error && (
        <p className="text-center text-red-500 font-medium mb-6">{error}</p>
      )}

      {/* 🪙 Coin Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredCoins.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No matching coins found.
          </p>
        ) : (
          filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-sm uppercase">{coin.symbol}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">
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
          ))
        )}
      </div>
    </div>
  );
}
