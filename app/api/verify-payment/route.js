import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items']
    });
    
    if (session.payment_status === 'paid') {
      return NextResponse.json({
        success: true,
        amount: session.amount_total,
        currency: session.currency,
        customerId: session.customer,
        planName: session.metadata.planName,
        paymentIntent: session.payment_intent,
        lineItems: session.line_items.data
      });
    } else {
      throw new Error('Payment not completed');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
} 