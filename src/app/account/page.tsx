// /app/account/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  dateOfBirth: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/account');
        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    }

    fetchUser();
  }, [router]);

  if (!user) return <div className="text-center mt-10 text-gray-700">Loading account...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">👤 Account Info</h1>
      <p className="text-gray-700 mb-2">Name: {user.name}</p>
      <p className="text-gray-700 mb-2">Email: {user.email}</p>
      <p className="text-gray-700">Date of Birth: {user.dateOfBirth}</p>
    </div>
  );
}
