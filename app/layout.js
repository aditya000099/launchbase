'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '../lib/ThemeContext';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <DefaultSeo {...SEO} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
