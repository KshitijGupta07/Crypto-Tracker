'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();

  // OPTIONAL: UseEffect to check login or redirect...

  const handleLogout = async () => {
    // Call your logout API route
    await fetch('/api/logout', { method: 'POST' });

    // Redirect to login or home page
    router.push('/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">👤</span>
        <h1 className="text-2xl font-bold">Account Info</h1>
      </div>
      <p><strong>Name:</strong> Kshitij Gupta</p>
      <p><strong>Email:</strong> kshitijvgupta@gmail.com</p>
      <p><strong>Date of Birth:</strong> 2004-09-04</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
