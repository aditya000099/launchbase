'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-t border-accent-light dark:border-accent-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Image
              src="/icon.svg"
              alt="Launch Base Logo"
              width={40}
              height={40}
              className="mb-2"
            />
            <p>Your professional SaaS solution</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="font-bold mb-2">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 Starter SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
