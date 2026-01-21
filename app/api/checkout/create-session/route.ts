import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { items, shipping_address, payment_method } = await request.json();

        // Get authen ticated user (optional for guest checkout)
        const { data: { user } } = await supabase.auth.getUser();

        // Calculate totals
        const subtotal = items.reduce((sum: number, item: any) =>
            sum + (item.price * item.quantity), 0
        );
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;

        // Create order record
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user?.id || null,
                status: payment_method === 'cod' ? 'pending' : 'pending',
                subtotal,
                shipping,
                total,
                currency: 'EUR',
                shipping_address,
                payment_method,
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            meta: { name: item.name, image_url: item.image_url },
        }));

        await supabase.from('order_items').insert(orderItems);

        // Handle payment method
        if (payment_method === 'stripe') {
            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items.map((item: any) => ({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name,
                            images: item.image_url ? [item.image_url] : [],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
                metadata: {
                    order_id: order.id,
                },
            });

            return NextResponse.json({
                sessionId: session.id,
                orderId: order.id
            });
        } else {
            // COD or Crypto - just return order ID
            return NextResponse.json({ orderId: order.id });
        }
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout' },
            { status: 500 }
        );
    }
}
