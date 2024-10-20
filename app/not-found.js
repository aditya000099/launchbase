'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-accent-light dark:text-accent-dark mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="bg-accent-light dark:bg-accent-dark text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200">
            Go back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
