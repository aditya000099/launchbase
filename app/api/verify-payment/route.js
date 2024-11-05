import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request) {
  try {
    const { sessionId, orderId, gateway, planName } = await request.json();

    if (gateway === 'stripe') {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        return NextResponse.json({
          success: true,
          amount: session.amount_total,
          currency: session.currency,
          customerId: session.customer,
          planName: session.metadata?.planName || planName || 'Basic Plan'
        });
      }
    }

    if (gateway === 'paypal') {
      const base = process.env.NEXT_PUBLIC_PAYPAL_MODE === 'sandbox' 
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com';

      try {
        // Get access token
        const auth = await fetch(`${base}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`).toString('base64')}`,
          },
          body: 'grant_type=client_credentials',
        });

        const { access_token } = await auth.json();

        // First, get order details
        const orderDetails = await fetch(`${base}/v2/checkout/orders/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        });

        const orderData = await orderDetails.json();

        // If order isn't captured yet, capture it
        if (orderData.status === 'APPROVED') {
          const capture = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
            },
          });

          const captureData = await capture.json();

          if (captureData.status === 'COMPLETED') {
            return NextResponse.json({
              success: true,
              amount: parseFloat(captureData.purchase_units[0].payments.captures[0].amount.value),
              currency: captureData.purchase_units[0].payments.captures[0].amount.currency_code,
              planName: planName || captureData.purchase_units[0].description || 'Basic Plan'
            });
          }
        } else if (orderData.status === 'COMPLETED') {
          // Order was already captured
          return NextResponse.json({
            success: true,
            amount: parseFloat(orderData.purchase_units[0].payments.captures[0].amount.value),
            currency: orderData.purchase_units[0].payments.captures[0].amount.currency_code,
            planName: planName || orderData.purchase_units[0].description || 'Basic Plan'
          });
        }

        throw new Error('Payment not completed');
      } catch (paypalError) {
        console.error('PayPal API Error:', paypalError);
        throw new Error(`PayPal verification failed: ${paypalError.message}`);
      }
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Payment verification failed' 
    }, { 
      status: 400 
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { 
      status: 500 
    });
  }
} 