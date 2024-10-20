'use client';

import React from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['All Basic features', 'Feature 4', 'Feature 5'],
  },
  {
    name: 'Enterprise',
    price: '$49.99',
    features: ['All Pro features', 'Feature 6', 'Feature 7', 'Priority Support'],
  },
];

export default function Pricing() {
  return (
    <>
      <NextSeo
        title="Pricing"
        description="Choose the perfect plan for your needs"
      />
      <Header />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-accent-light dark:border-accent-dark rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">✓ {feature}</li>
                ))}
              </ul>
              <Link href="/signup" className="bg-accent-light dark:bg-accent-dark text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200 text-center">
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
