'use client';

import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    name: 'Basic Plan',
    price: 9.99,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    popular: false,
  },
  {
    name: 'Pro Plan',
    price: 19.99,
    features: ['All Basic features', 'Feature 4', 'Feature 5'],
    popular: true,
  },
  {
    name: 'Lifetime Plan',
    price: 499,
    features: ['Lifetime Access', 'All Pro features', 'Priority Support', 'Future Updates'],
    popular: false,
  },
];

export default function Pricing() {
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (plan) => {
    try {
      setIsProcessing(true);
      const stripe = await stripePromise;
      
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: plan.name,
          amount: Math.round(plan.price * 100),
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <NextSeo
        title="Pricing | Launch Base"
        description="Choose the perfect plan for your needs"
      />
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-24 mt-16"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        
        {/* <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedGateway('stripe')}
            className={`px-4 py-2 rounded-full ${
              selectedGateway === 'stripe' 
                ? 'bg-accent-light dark:bg-accent-dark text-white' 
                : 'border border-accent-light dark:border-accent-dark'
            }`}
          >
            <Image src="/stripe-p.svg" alt="Stripe" width={60} height={24} />
          </button>
          <button
            onClick={() => setSelectedGateway('paypal')}
            className={`px-4 py-2 rounded-full ${
              selectedGateway === 'paypal' 
                ? 'bg-accent-light dark:bg-accent-dark text-white' 
                : 'border border-accent-light dark:border-accent-dark'
            }`}
          >
            <Image src="/paypal-p.svg" alt="PayPal" width={60} height={24} />
          </button>
        </div> */}

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border border-accent-light dark:border-accent-dark rounded-2xl p-8 flex flex-col ${
                plan.popular ? 'bg-accent-light/5 dark:bg-accent-dark/5' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-light dark:bg-accent-dark text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-4xl font-bold mb-6">${plan.price}<span className="text-sm font-normal">{plan.price !== 499 ? '/month' : ''}</span></p>
              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePayment(plan)}
                disabled={isProcessing}
                className="w-full bg-accent-light dark:bg-accent-dark text-white py-3 px-6 rounded-full hover:opacity-90 transition-opacity duration-200 text-center font-medium disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
