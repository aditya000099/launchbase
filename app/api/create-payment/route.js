import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const product = await req.json();

    const lineItems = [{
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          metadata: {
            planName: product.name,
          }
        },
        unit_amount: product.amount,
      },
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: 'payment',
      metadata: {
        planName: product.name, // Store plan name in metadata
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment creation failed' },
      { status: 500 }
    );
  }
} 