'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  dateOfBirth: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/account');
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) return <div className="p-10 text-xl">Loading account...</div>;
  if (!user) return <div className="p-10 text-red-600">User data not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">👤 My Account</h1>

      <p className="text-lg mb-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="text-lg mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg mb-2">
        <strong>Date of Birth:</strong>{' '}
        {new Date(user.dateOfBirth).toLocaleDateString()}
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
