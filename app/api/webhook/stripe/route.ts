import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();

        // In production, verify Stripe signature:
        // const sig = request.headers.get('stripe-signature');
        // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        // Mock webhook event
        const event = {
            id: `evt_demo_${Date.now()}`,
            type: 'payment_intent.succeeded',
            data: {
                object: {
                    id: 'pi_demo',
                    amount: 9900,
                    currency: 'eur',
                    status: 'succeeded'
                }
            }
        };

        console.log('Webhook received:', event.type);

        // Handle different event types
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('Payment succeeded:', event.data.object.id);
                // Update order status in database
                break;
            case 'payment_intent.payment_failed':
                console.log('Payment failed:', event.data.object.id);
                // Handle failed payment
                break;
            default:
                console.log('Unhandled event type:', event.type);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Stripe Webhook Handler',
        method: 'POST',
        demo: true,
        events: [
            'payment_intent.succeeded',
            'payment_intent.payment_failed',
            'charge.succeeded'
        ]
    });
}
