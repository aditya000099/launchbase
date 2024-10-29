'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    title: "Next.js 14",
    description: "Built with the latest Next.js features including App Router and React Server Components",
    icon: "🚀"
  },
  {
    title: "Authentication",
    description: "Secure authentication system with email verification and password reset",
    icon: "🔐"
  },
  {
    title: "Payment Integration",
    description: "Stripe and PayPal integration for subscription management",
    icon: "💳"
  },
  {
    title: "Email System",
    description: "Mailgun integration with customizable email templates",
    icon: "📧"
  },
  {
    title: "Dark Mode",
    description: "Built-in dark mode support with system preference detection",
    icon: "🌓"
  },
  {
    title: "Responsive Design",
    description: "Mobile-first approach using Tailwind CSS",
    icon: "📱"
  }
];

const techStack = [
  { name: "Next.js", icon: "/nextjs-icon.svg" },
  { name: "React", icon: "/react-icon.svg" },
  { name: "Tailwind CSS", icon: "/tailwind-icon.svg" },
  { name: "Stripe", icon: "/stripe-icon.svg" },
  { name: "PayPal", icon: "/paypal-icon.svg" },
  { name: "Mailgun", icon: "/mailgun-icon.svg" }
];

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
      <main className="flex-grow container mx-auto mt-24 p-4">
        {/* Hero Section */}
        <section className="text-center mb-16 pt-8">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-accent-light to-pink-500 dark:from-accent-dark dark:to-pink-600 text-transparent bg-clip-text">
            Launch Base
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A complete SaaS starter kit built with Next.js, featuring authentication, 
            payments, and email systems - everything you need to launch your SaaS product.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="px-8 py-3 rounded-full bg-accent-light dark:bg-accent-dark dark:text-white text-white hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/aditya000099/launchbase"
              className="px-8 py-3 rounded-full border border-accent-light dark:border-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl border border-accent-light/20 dark:border-accent-dark/20 hover:border-accent-light dark:hover:border-accent-dark transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="mb-2"
                />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
