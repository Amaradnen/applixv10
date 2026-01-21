import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature')!;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const orderId = session.metadata?.order_id;

            if (orderId) {
                // Update order status to paid
                await supabase
                    .from('orders')
                    .update({
                        status: 'paid',
                        stripe_payment_intent_id: session.payment_intent as string,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', orderId);

                console.log(`✅ Order ${orderId} marked as paid`);
            }
            break;

        case 'payment_intent.payment_failed':
            const paymentIntent = event.data.object;
            console.error(`❌ Payment failed: ${paymentIntent.id}`);
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
