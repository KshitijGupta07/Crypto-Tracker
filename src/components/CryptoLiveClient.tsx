'use client';

import dynamic from 'next/dynamic';

// Dynamically load CryptoLive on client only
const CryptoLive = dynamic(() => import('./CryptoLive'), { ssr: false });

export default function CryptoLiveClientWrapper() {
  return <CryptoLive />;
}
