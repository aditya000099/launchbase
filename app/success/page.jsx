'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = "force-no-store";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '../../lib/appwrite';
import { updateUserSubscription, recordPayment } from '../../lib/appwrite/user-management';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

// Create a client component for the payment processing logic
function PaymentProcessor() {
  const [status, setStatus] = useState('processing');
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('orderId');
  const gateway = searchParams.get('gateway');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get current user
        const user = await account.get();
        
        // Verify payment based on gateway
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            sessionId, 
            orderId,
            gateway 
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        const paymentData = await response.json();

        if (paymentData.success) {
          try {
            // Record payment first
            await recordPayment({
              userId: user.$id,
              type: 'one-time',
              amount: gateway === 'stripe' ? paymentData.amount / 100 : paymentData.amount,
              currency: paymentData.currency || 'USD',
              status: 'completed',
              paymentGateway: gateway,
              transactionId: gateway === 'stripe' ? sessionId : orderId,
              planName: paymentData.planName
            });

            // Then update subscription
            await updateUserSubscription(user.$id, {
              tier: paymentData.planName.toLowerCase().replace(' plan', ''),
              customerId: paymentData.customerId || user.$id,
              planId: gateway === 'stripe' ? sessionId : orderId,
              subscriptionId: gateway === 'stripe' ? sessionId : orderId,
              paymentGateway: gateway,
              startDate: new Date().toISOString(),
              endDate: paymentData.planName === 'Lifetime Plan' 
                ? new Date(2099, 11, 31).toISOString() // Far future date for lifetime
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
            });

            setStatus('success');
            // Redirect after 3 seconds
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          } catch (error) {
            console.error('Error updating database:', error);
            setStatus('error');
          }
        } else {
          throw new Error('Payment not successful');
        }
      } catch (error) {
        console.error('Error processing payment success:', error);
        setStatus('error');
      }
    };

    if ((sessionId || orderId) && gateway) {
      handlePaymentSuccess();
    }
  }, [sessionId, orderId, gateway, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 rounded-2xl bg-card shadow-lg max-w-md mx-4"
      >
        {status === 'processing' && (
          <>
            <div className="mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-accent-light border-t-transparent rounded-full mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Redirecting to dashboard...
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3 }}
              className="h-1 bg-green-500 rounded-full"
            />
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-red-500">Payment Error</h1>
            <p className="text-muted-foreground mb-6">
              There was an error processing your payment.
            </p>
            <button
              onClick={() => router.push('/pricing')}
              className="px-6 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Return to Pricing
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

// Main page component
export default function SuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-light" />
        </div>
      }
    >
      <PaymentProcessor />
    </Suspense>
  );
}