'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header({ user }) {
  return (
    <header className="fixed top-0 w-full backdrop-blur-md bg-background-light/75 dark:bg-background-dark/75 text-text-light dark:text-text-dark p-4 border-b border-accent-light/20 dark:border-accent-dark/20 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/icon.svg"
            alt="Launch Base Logo"
            width={40}
            height={40}
            className="mr-4"
          />
          <h1 className="dark:text-white text-xl font-semibold">Launch Base</h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Home</Link>
          <Link href="/pricing" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Pricing</Link>
          <Link href="/dashboard" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Dashboard</Link>
          <Link href="/account" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Account</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href="/account" className="px-4 py-2 rounded-full bg-accent-light dark:bg-accent-dark dark:text-white text-white hover:opacity-90 transition-opacity">
              Account
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-full border dark:text-white border-accent-light dark:border-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 rounded-full bg-accent-light dark:bg-accent-dark dark:text-white text-white hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
