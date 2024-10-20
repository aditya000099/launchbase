'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header user={user} />
      <main className="flex-grow container mx-auto mt-16 p-4 animate-fade-in">
        <h1 className="text-6xl font-bold text-center mb-8 metallic-text">Welcome to Starter SaaS</h1>
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/starter-saas-logo.png"
            alt="Starter SaaS logo"
            width={180}
            height={180}
            priority
            className="animate-slide-in rounded-full"
          />
          <div className="flex gap-4 items-center animate-slide-in" style={{animationDelay: '0.2s'}}>
            <Link
              className="rounded-full border border-accent-light dark:text-white dark:border-accent-dark transition-colors flex items-center justify-center bg-accent-light dark:bg-accent-dark text-white gap-2 hover:bg-opacity-90 dark:hover:bg-opacity-90 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
              href={user ? "/dashboard" : "/signup"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
