'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../lib/appwrite';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../../components/ThemeToggle';

export default function Dashboard() {
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

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4 border-b border-accent-light dark:border-accent-dark">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={20}
              className="dark:invert mr-4"
            />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user && (
              <Link href="/account" className="text-sm font-medium">
                Account
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h2>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
}
