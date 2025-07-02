import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomeClient from './homeclient' // adjust path if needed

export default async function HomePage() {
    const cookie=await cookies()
  const token = cookie.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800"></h1>
      <HomeClient />
    </main>
  );
}
