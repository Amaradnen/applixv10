"use client";

import React, { useState } from "react";
import { useStudioStore } from "../store/useStudioStore";
import { ArrowLeft, CreditCard, Truck, Wallet, Bitcoin, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, checkout, updateCheckout, cardFront, profile, calculateCartTotal } = useStudioStore();
    const [promoInput, setPromoInput] = useState('');

    React.useEffect(() => {
        calculateCartTotal();
    }, [checkout.shipping.method, calculateCartTotal]);

    const hasPhysicalCard = cart.items.some(item => item.type === 'card');

    const handleApplyPromo = () => {
        // Demo promo code
        if (promoInput.toUpperCase() === 'APPLIX10') {
            updateCheckout({ discount: 0.1, promoCode: promoInput });
            calculateCartTotal();
        }
    };

    const handlePlaceOrder = () => {
        // Validate required fields
        if (!checkout.customer.firstName || !checkout.customer.lastName || !checkout.customer.email || !checkout.customer.phone) {
            alert('Veuillez remplir toutes les informations client');
            return;
        }

        if (hasPhysicalCard && (!checkout.shipping.address || !checkout.shipping.city || !checkout.shipping.zip)) {
            alert('Veuillez remplir l\'adresse de livraison');
            return;
        }

        alert('Commande validée ! (Demo mode)');
        router.push('/nfc-studio');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <button
                    onClick={() => router.push('/nfc-studio/cart')}
                    className="text-sm text-white/50 hover:text-white flex items-center gap-2 mb-8 transition"
                >
                    <ArrowLeft size={16} />
                    Retour au panier
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display mb-2">Commande</h1>
                    <p className="text-white/50">Finalisez votre achat</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-bold mb-4">Informations Client</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={checkout.customer.firstName}
                                    onChange={(e) => updateCheckout({ customer: { ...checkout.customer, firstName: e.target.value } })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                    placeholder="Prénom *"
                                />
                                <input
                                    type="text"
                                    value={checkout.customer.lastName}
                                    onChange={(e) => updateCheckout({ customer: { ...checkout.customer, lastName: e.target.value } })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                    placeholder="Nom *"
                                />
                                <input
                                    type="email"
                                    value={checkout.customer.email}
                                    onChange={(e) => updateCheckout({ customer: { ...checkout.customer, email: e.target.value } })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                    placeholder="Email *"
                                />
                                <input
                                    type="tel"
                                    value={checkout.customer.phone}
                                    onChange={(e) => updateCheckout({ customer: { ...checkout.customer, phone: e.target.value } })}
                                    className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                    placeholder="Téléphone *"
                                />
                            </div>
                        </section>

                        {/* Shipping (conditional) */}
                        {hasPhysicalCard && (
                            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h2 className="text-lg font-bold mb-4">Livraison</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={checkout.shipping.address}
                                        onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, address: e.target.value } })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                        placeholder="Adresse *"
                                    />
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            value={checkout.shipping.city}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, city: e.target.value } })}
                                            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                            placeholder="Ville *"
                                        />
                                        <input
                                            type="text"
                                            value={checkout.shipping.zip}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, zip: e.target.value } })}
                                            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                            placeholder="Code Postal *"
                                        />
                                        <input
                                            type="text"
                                            value={checkout.shipping.country}
                                            onChange={(e) => updateCheckout({ shipping: { ...checkout.shipping, country: e.target.value } })}
                                            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                            placeholder="Pays *"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Mode de livraison</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 'standard', label: 'Standard (5-7 jours)', price: 5 },
                                                { value: 'express', label: 'Express (2-3 jours)', price: 15 },
                                                { value: 'pickup', label: 'Retrait en magasin', price: 0 }
                                            ].map((method) => (
                                                <button
                                                    key={method.value}
                                                    onClick={() => updateCheckout({ shipping: { ...checkout.shipping, method: method.value as any } })}
                                                    className={clsx(
                                                        "w-full p-4 rounded-lg border transition-all flex items-center justify-between",
                                                        checkout.shipping.method === method.value
                                                            ? "border-gg-gold bg-gg-gold/10"
                                                            : "border-white/10 hover:border-white/20"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={clsx(
                                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                            checkout.shipping.method === method.value ? "border-gg-gold" : "border-white/30"
                                                        )}>
                                                            {checkout.shipping.method === method.value && <div className="w-2.5 h-2.5 rounded-full bg-gg-gold" />}
                                                        </div>
                                                        <span className="text-sm font-bold">{method.label}</span>
                                                    </div>
                                                    <span className="text-sm font-bold">{method.price > 0 ? `${method.price}€` : 'Gratuit'}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Payment Method */}
                        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-bold mb-4">Mode de paiement</h2>
                            <div className="space-y-2">
                                {[
                                    { value: 'card', label: 'Carte bancaire', icon: CreditCard },
                                    { value: 'cod', label: 'Paiement à la livraison', icon: Wallet },
                                    { value: 'crypto', label: 'Cryptomonnaie', icon: Bitcoin }
                                ].map((method) => {
                                    const Icon = method.icon;
                                    return (
                                        <button
                                            key={method.value}
                                            onClick={() => updateCheckout({ payment: { method: method.value as any } })}
                                            className={clsx(
                                                "w-full p-4 rounded-lg border transition-all flex items-center gap-3",
                                                checkout.payment.method === method.value
                                                    ? "border-gg-gold bg-gg-gold/10"
                                                    : "border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <div className={clsx(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                checkout.payment.method === method.value ? "border-gg-gold" : "border-white/30"
                                            )}>
                                                {checkout.payment.method === method.value && <div className="w-2.5 h-2.5 rounded-full bg-gg-gold" />}
                                            </div>
                                            <Icon size={20} />
                                            <span className="text-sm font-bold">{method.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Promo Code */}
                        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-bold mb-4">Code Promo</h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value)}
                                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/30"
                                    placeholder="Entrez votre code"
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition"
                                >
                                    Appliquer
                                </button>
                            </div>
                            {checkout.promoCode && (
                                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                                    <Check size={12} />
                                    Code {checkout.promoCode} appliqué (-{(checkout.discount! * 100).toFixed(0)}%)
                                </p>
                            )}
                            <p className="text-[10px] text-white/40 mt-2">Essayez: APPLIX10</p>
                        </section>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-4">
                            <h2 className="text-lg font-bold mb-4">Récapitulatif</h2>

                            <div className="space-y-3 mb-6">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-white/60">{item.name} x{item.quantity}</span>
                                        <span className="font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                ))}

                                <div className="border-t border-white/10 pt-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Sous-total</span>
                                        <span className="font-bold">{cart.subtotal.toFixed(2)}€</span>
                                    </div>
                                    {hasPhysicalCard && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/60">Livraison</span>
                                            <span className="font-bold">{cart.shipping > 0 ? `${cart.shipping.toFixed(2)}€` : 'Gratuit'}</span>
                                        </div>
                                    )}
                                    {checkout.discount && checkout.discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-400">
                                            <span>Réduction</span>
                                            <span>-{(cart.subtotal * checkout.discount).toFixed(2)}€</span>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-white/10 pt-3 flex justify-between">
                                    <span className="font-bold">Total</span>
                                    <span className="text-2xl font-bold text-gg-gold">{cart.total.toFixed(2)}€</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full py-4 bg-gg-gold text-black font-bold rounded-xl hover:bg-[#CFA31D] transition flex items-center justify-center gap-2"
                            >
                                <CreditCard size={18} />
                                Payer maintenant
                            </button>

                            <p className="text-[10px] text-white/40 text-center mt-4">
                                Paiement sécurisé • Garantie satisfait ou remboursé
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
