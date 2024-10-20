'use client';

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from '../components/ThemeToggle';
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (error) {
        // User is not logged in
      }
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4 border-b border-accent-light dark:border-accent-dark">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your SaaS</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium">
                  Login
                </Link>
                <Link href="/signup" className="text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-16 p-4">
        <h1 className="text-6xl font-bold text-center mb-8 metallic-text">Welcome to Your SaaS</h1>
        <div className="flex flex-col items-center gap-8">
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="flex gap-4 items-center">
            <Link
              className="rounded-full border border-accent-light dark:border-accent-dark transition-colors flex items-center justify-center bg-accent-light dark:bg-accent-dark dark:text-white text-white gap-2 hover:bg-opacity-90 dark:hover:bg-opacity-90 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href={user ? "/dashboard" : "/signup"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
