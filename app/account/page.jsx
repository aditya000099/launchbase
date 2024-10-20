'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../lib/appwrite';
import ThemeToggle from '../../components/ThemeToggle';
import Link from 'next/link';

export default function Account() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (error) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4 border-b border-accent-light dark:border-accent-dark">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Account</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
