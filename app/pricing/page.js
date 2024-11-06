'use client';

import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { PayPalButtons } from "@paypal/react-paypal-js";

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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripePayment = async (plan) => {
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
          gateway: 'stripe',
          currency: 'inr'
        }),
      });

      const session = await response.json();

      if (session.error) throw new Error(session.error);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.error('Stripe payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async (data, actions) => {
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedPlan.name,
          amount: selectedPlan.price,
          gateway: 'paypal',
          currency: 'USD'
        }),
      });

      const orderData = await response.json();
      
      if (orderData.error) {
        throw new Error(orderData.error);
      }
      
      return orderData.id;
    } catch (error) {
      console.error('PayPal payment error:', error);
      alert('Failed to create PayPal order. Please try again.');
      return null;
    }
  };

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <>
      {/* <NextSeo
        title="Pricing | Launch Base"
        description="Choose the perfect plan for your needs"
      /> */}
      <Header />
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  handleStripePayment(selectedPlan);
                }}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Image src="/stripe-p.svg" alt="Stripe" width={60} height={24} />
                Pay with Stripe
              </button>
              
              <div className="w-full">
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={handlePayPalPayment}
                  onApprove={async (data, actions) => {
                    try {
                      setIsProcessing(true);
                      const response = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          orderId: data.orderID,
                          gateway: 'paypal',
                          planName: selectedPlan.name
                        }),
                      });
                      
                      const result = await response.json();
                      if (result.success) {
                        window.location.href = `/success?orderId=${data.orderID}&gateway=paypal&plan=${encodeURIComponent(selectedPlan.name)}`;
                      } else {
                        throw new Error(result.error || 'Payment verification failed');
                      }
                    } catch (error) {
                      console.error('PayPal verification error:', error);
                      alert('Payment verification failed. Please contact support.');
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  onError={(err) => {
                    console.error('PayPal Error:', err);
                    alert('There was an error processing your payment. Please try again.');
                  }}
                  onCancel={() => {
                    alert('Payment cancelled');
                    setShowPaymentModal(false);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-24 mt-16"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        
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
                onClick={() => handleGetStarted(plan)}
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
