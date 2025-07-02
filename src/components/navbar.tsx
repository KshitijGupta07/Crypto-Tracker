'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
  <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white-600">CryptoTracker 💹</h1>
        
        <ul className="flex gap-6 text-gray-700 font-medium text-base">
          <li>
            <Link href="/home" className="hover:text-blue-600 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
          </li>
          <li>
            <Link href="/account" className="hover:text-blue-600 transition-colors">Account</Link>
          </li>
          <li>
            <Link href="/help" className="hover:text-blue-600 transition-colors">Help</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
