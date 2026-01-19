import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { amount, currency = 'eur' } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Mock Stripe Payment Intent
        // In production, replace with:
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        // const paymentIntent = await stripe.paymentIntents.create({
        //   amount: amount * 100,
        //   currency,
        //   automatic_payment_methods: { enabled: true },
        // });

        const mockClientSecret = `pi_demo_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;

        return NextResponse.json({
            clientSecret: mockClientSecret,
            amount,
            currency,
            status: 'requires_payment_method',
            demo: true,
            message: 'This is a demo payment intent. No real charge will be made.'
        });

    } catch (error) {
        console.error('Payment intent error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment intent' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Create Payment Intent API',
        method: 'POST',
        body: {
            amount: 'number (in euros)',
            currency: 'string (default: eur)'
        },
        demo: true
    });
}
