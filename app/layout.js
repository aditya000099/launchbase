'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '../lib/ThemeContext';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import './globals.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <DefaultSeo {...SEO} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <PayPalScriptProvider options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: "USD",
          }}>
            {children}
          </PayPalScriptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
