'use client';

import dynamic from 'next/dynamic';

const CryptoLive = dynamic(() => import('@/components/CryptoLive'), { ssr: false });

export default function HomeClient() {
  return <CryptoLive />;
}
