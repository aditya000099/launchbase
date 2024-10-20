'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header({ user }) {
  return (
    <header className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4 border-b border-accent-light dark:border-accent-dark">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/starter-saas-logo.png"
            alt="Starter SaaS Logo"
            width={40}
            height={40}
            className="mr-4"
          />
          <h1 className="dark:text-white text-2xl font-bold">SaaS Starter</h1>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-accent-light dark:hover:text-accent-dark">Home</Link>
          <Link href="/pricing" className="hover:text-accent-light dark:hover:text-accent-dark">Pricing</Link>
          <Link href="/dashboard" className="hover:text-accent-light dark:hover:text-accent-dark">Dashboard</Link>
          <Link href="/account" className="hover:text-accent-light dark:hover:text-accent-dark">Account</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href="/account" className="text-sm font-medium">
              Account
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
  );
}
