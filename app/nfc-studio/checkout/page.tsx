"use client";

import React, { useState } from "react";
import { useStudioStore } from "../store/useStudioStore";
import { ArrowLeft, CreditCard, Truck, Wallet, Bitcoin, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, checkout, updateCheckout, calculateCartTotal } = useStudioStore();
    const [promoInput, setPromoInput] = useState(checkout.promoCode || '');

    React.useEffect(() => {
        calculateCartTotal();
    }, [checkout.shipping.method, calculateCartTotal]);

    // Check if any item in cart is physical (type 'card') or check meta
    const hasPhysicalCard = cart.items.some(item => item.type === 'card' || item.meta?.physical);

    const handleApplyPromo = () => {
        if (promoInput.toUpperCase() === 'APPLIX10') {
            updateCheckout({ discount: 0.1, promoCode: promoInput });
            calculateCartTotal();
        }
    };

    const handlePlaceOrder = () => {
        if (!checkout.customer.fullName || !checkout.customer.email) {
            alert("Ajoute au minimum : Nom complet + Email.");
            return;
        }

        if (hasPhysicalCard) {
            if (!checkout.shipping.address1 || !checkout.shipping.city) {
                alert("Ajoute l'adresse de livraison (Adresse 1 + Ville).");
                return;
            }
        }

        const order = {
            id: "APX-" + Math.random().toString(16).slice(2, 10).toUpperCase(),
            cart: cart.items,
            checkout: checkout,
            totals: {
                subtotal: cart.subtotal,
                shipping: hasPhysicalCard ? cart.shipping : 0,
                total: cart.total
            },
            createdAt: new Date().toISOString()
        };

        console.log("ORDER (demo):", order);
        alert('Commande confirmée ✅\nCheck console for order object.');
        router.push('/nfc-studio'); // Or to a success page if we had one
    };

    const SHIPPING_METHODS = {
        standard: { label: 'Standard (3–7 jours)', price: 9 },
        express: { label: 'Express (1–3 jours)', price: 19 },
        pickup: { label: 'Pickup / Retrait', price: 0 }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Checkout</h1>
                        <p className="text-gray-400">Paiement + livraison (si carte physique).</p>
                    </div>
                    <button
                        onClick={() => router.push('/nfc-studio/cart')}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 flex items-center gap-2 transition"
                    >
                        <ArrowLeft size={16} />
                        Retour panier
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                        {/* Customer Information */}
                        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                            <div className="font-bold text-lg mb-4">Informations client</div>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Nom complet</label>
                                    <input
                                        type="text"
                                        value={checkout.customer.fullName}
                                        onChange={(e) => updateCheckout({ customer: { ...checkout.customer, fullName: e.target.value } })}
                                        className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Téléphone</label>
                                    <input
                                        type="tel"
                                        value={checkout.customer.phone}
                                        onChange={(e) => updateCheckout({ customer: { ...checkout.customer, phone: e.target.value } })}
                                        className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                    <input
                                        type="email"
                                        value={checkout.customer.email}
                                        onChange={(e) => updateCheckout({ customer: { ...checkout.customer, email: e.target.value } })}
                                        className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping */}
                        {hasPhysicalCard ? (
                            <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-bold text-lg">Livraison</div>
                                    <span className="text-[10px] rounded-full border border-white/10 text-white/75 px-2 py-0.5">PHYSIQUE</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Pays</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.country}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, country: e.target.value } })}
                                            className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Ville</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.city}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, city: e.target.value } })}
                                            className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Adresse 1</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.address1}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, address1: e.target.value } })}
                                            className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Adresse 2 (option)</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.address2 || ''}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, address2: e.target.value } })}
                                            className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">ZIP / Code postal</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.zip}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, zip: e.target.value } })}
                                            className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Méthode</div>
                                    <div className="grid md:grid-cols-3 gap-2">
                                        {(['standard', 'express', 'pickup'] as const).map(method => {
                                            const active = checkout.shipping.method === method;
                                            const info = SHIPPING_METHODS[method];
                                            return (
                                                <button
                                                    key={method}
                                                    onClick={() => updateCheckout({ shipping: { ...checkout.shipping, method } })}
                                                    className={clsx(
                                                        "p-3 rounded-xl border text-left transition-all",
                                                        active ? "border-white bg-black/50" : "border-[#222] bg-black/50 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className="font-bold text-sm">{info.label}</div>
                                                    <div className="text-xs text-gray-400">{info.price > 0 ? `${info.price}€` : 'Gratuit'}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                                <div className="flex items-center justify-between">
                                    <div className="font-bold text-lg">Livraison</div>
                                    <span className="text-[10px] rounded-full border border-white/10 text-white/75 px-2 py-0.5">DIGITAL</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">Aucune livraison requise (produits digitaux uniquement).</p>
                            </div>
                        )}

                        {/* Payment */}
                        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
                            <div className="font-bold text-lg mb-1">Paiement</div>
                            <p className="text-sm text-gray-400 mt-1 mb-4">Mode demo (branche Stripe/PayPal/crypto via API).</p>

                            <div className="grid md:grid-cols-3 gap-2">
                                {[
                                    { id: 'card', label: 'Carte', desc: 'Stripe/PayPal (API)' },
                                    { id: 'cod', label: 'Cash on Delivery', desc: 'Paiement à la livraison' },
                                    { id: 'crypto', label: 'Crypto', desc: 'USDT / Wallet' }
                                ].map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => updateCheckout({ payment: { method: p.id as any } })}
                                        className={clsx(
                                            "p-3 rounded-xl border text-left transition-all",
                                            checkout.payment.method === p.id ? "border-white bg-black/50" : "border-[#222] bg-black/50 hover:bg-white/10"
                                        )}
                                    >
                                        <div className="font-bold text-sm">{p.label}</div>
                                        <div className="text-xs text-gray-400">{p.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="text-xs font-bold text-gray-500 uppercase">Code promo</label>
                                <input
                                    type="text"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value)}
                                    className="mt-2 w-full bg-black border border-[#222] rounded-lg p-3 text-white focus:border-white outline-none"
                                />
                                {checkout.promoCode && <div className="text-green-400 text-xs mt-1">Code {checkout.promoCode} appliqué</div>}
                            </div>

                            <div className="mt-4 p-4 rounded-2xl border border-[#222] bg-black/40 text-sm text-gray-300">
                                {checkout.payment.method === 'card' && (
                                    <div>
                                        <div className="font-bold mb-2">Paiement carte (Stripe)</div>
                                        <div className="text-xs text-gray-400">
                                            1) Front appelle <code>/api/create-payment-intent</code><br />
                                            2) Stripe Elements affiche le formulaire<br />
                                            3) Confirmation + webhook → statut "paid"
                                        </div>
                                    </div>
                                )}
                                {checkout.payment.method === 'cod' && (
                                    <div>
                                        <div className="font-bold mb-2">Cash on Delivery</div>
                                        <div className="text-xs text-gray-400">Commande en statut <b>pending</b>, puis <b>paid</b> après confirmation livreur.</div>
                                    </div>
                                )}
                                {checkout.payment.method === 'crypto' && (
                                    <div>
                                        <div className="font-bold mb-2">Crypto (USDT)</div>
                                        <div className="text-xs text-gray-400">Prod: invoice/adresse + vérification transaction + livraison auto.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-[#111] border border-[#222] rounded-2xl p-5 h-fit sticky top-4">
                        <div className="font-bold text-lg">Résumé commande</div>
                        <div className="mt-4 space-y-2 text-sm text-gray-300">
                            {cart.items.map(it => (
                                <div key={it.id} className="flex justify-between gap-3">
                                    <span className="truncate">{it.name} x{it.quantity}</span>
                                    <span>{(it.price * it.quantity).toFixed(2)}€</span>
                                </div>
                            ))}

                            <div className="pt-3 border-t border-[#222] flex justify-between">
                                <span>Sous-total</span><span>{cart.subtotal.toFixed(2)}€</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Livraison</span>
                                <span>{hasPhysicalCard ? `${SHIPPING_METHODS[checkout.shipping.method].price}€` : '0€'}</span>
                            </div>

                            {checkout.discount && checkout.discount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>Réduction</span>
                                    <span>-{(cart.subtotal * checkout.discount).toFixed(2)}€</span>
                                </div>
                            )}

                            <div className="pt-3 border-t border-[#222] flex justify-between font-bold text-white">
                                <span>Total</span><span>{cart.total.toFixed(2)}€</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="mt-5 w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition"
                        >
                            Payer & Finaliser
                        </button>

                        <p className="mt-3 text-xs text-gray-500 text-center">
                            Prod: PaymentIntent (Stripe) + webhook + tracking livraison.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
