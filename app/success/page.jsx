'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '../../lib/appwrite';
import { updateUserSubscription, recordPayment } from '../../lib/appwrite/user-management';

export default function Success() {
  const [status, setStatus] = useState('processing');
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get current user
        const user = await account.get();
        
        // Verify payment with Stripe
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
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
              amount: paymentData.amount / 100, // Convert from cents
              currency: paymentData.currency,
              status: 'completed',
              paymentGateway: 'stripe',
              transactionId: sessionId,
              planName: paymentData.planName
            });

            // Then update subscription
            await updateUserSubscription(user.$id, {
              tier: paymentData.planName.toLowerCase().replace(' plan', ''),
              customerId: paymentData.customerId,
              planId: sessionId,
              subscriptionId: sessionId,
              paymentGateway: 'stripe',
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
            });

            setStatus('success');
            // Redirect after 5 seconds
            setTimeout(() => {
              router.push('/dashboard');
            }, 5000);
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

    if (sessionId) {
      handlePaymentSuccess();
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-light/10 to-purple-600/10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        {status === 'processing' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Processing your payment...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-light mx-auto"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Payment Successful!</h2>
            <p className="mb-4">Your subscription has been activated.</p>
            <p className="text-sm text-gray-600">Redirecting to dashboard in 5 seconds...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Payment Error</h2>
            <p className="mb-4">There was an error processing your payment.</p>
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-lg hover:opacity-90"
            >
              Return to Pricing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}