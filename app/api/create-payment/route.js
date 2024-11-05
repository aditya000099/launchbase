import { NextResponse } from 'next/server';

// Helper functions for currency handling
function createStripeOrder(name, amount, currency = 'inr') {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency,
        product_data: {
          name,
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    metadata: {
      planName: name
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&gateway=stripe&plan=${encodeURIComponent(name)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });
}

async function createPayPalOrder(name, amount, currency = 'USD') {
  const base = process.env.NEXT_PUBLIC_PAYPAL_MODE === 'sandbox' 
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

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

  // Create order
  const order = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toString(),
        },
        description: name,
      }],
    }),
  });

  return order.json();
}

export async function POST(request) {
  try {
    const { name, amount, gateway, currency } = await request.json();

    if (gateway === 'stripe') {
      const session = await createStripeOrder(name, amount, currency);
      return NextResponse.json({ id: session.id });
    }

    if (gateway === 'paypal') {
      const orderData = await createPayPalOrder(name, amount, currency);
      if (orderData.id) {
        return NextResponse.json({ 
          id: orderData.id,
          planName: name
        });
      } else {
        throw new Error('Failed to create PayPal order');
      }
    }

    return NextResponse.json({ error: 'Invalid payment gateway' }, { status: 400 });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 