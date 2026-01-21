"use client";

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Check } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'France',
        payment_method: 'card',
    });

    const subtotal = getTotalPrice();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Demo: Create order (replace with real Supabase call)
        console.log('Creating order...', { formData, items, total });

        // Clear cart and redirect
        clearCart();
        router.push('/order/success');
    };

    if (items.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Paiement</h1>

                {/* Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[
                        { num: 1, label: 'Livraison', icon: Truck },
                        { num: 2, label: 'Paiement', icon: CreditCard },
                        { num: 3, label: 'Confirmation', icon: Check },
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.num} className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-gold text-black' : 'bg-white/10 text-white/40'
                                        } transition`}
                                >
                                    {step > s.num ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={step >= s.num ? 'text-white' : 'text-white/40'}>{s.label}</span>
                                {s.num < 3 && <div className="w-12 h-0.5 bg-white/20" />}
                            </div>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Step 1: Shipping */}
                            {step === 1 && (
                                <div className="glass-card rounded-xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                                placeholder="votre@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Nom complet</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.full_name}
                                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                                placeholder="Jean Dupont"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Adresse</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                                placeholder="123 Rue Example"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Ville</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                                    placeholder="Paris"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Code postal</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.postal_code}
                                                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                                    placeholder="75001"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                                        >
                                            Continuer vers le paiement
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <div className="glass-card rounded-xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Méthode de paiement</h2>

                                    <div className="space-y-4 mb-6">
                                        <div
                                            onClick={() => setFormData({ ...formData, payment_method: 'card' })}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${formData.payment_method === 'card'
                                                    ? 'border-gold bg-gold/10'
                                                    : 'border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="w-5 h-5 text-gold" />
                                                    <span className="font-medium">Carte bancaire</span>
                                                </div>
                                                {formData.payment_method === 'card' && <Check className="w-5 h-5 text-gold" />}
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => setFormData({ ...formData, payment_method: 'paypal' })}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${formData.payment_method === 'paypal'
                                                    ? 'border-gold bg-gold/10'
                                                    : 'border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 text-gold">💳</div>
                                                    <span className="font-medium">PayPal</span>
                                                </div>
                                                {formData.payment_method === 'paypal' && <Check className="w-5 h-5 text-gold" />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-blue-400">
                                            🔒 Mode démonstration - Aucun paiement réel ne sera effectué
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 font-bold transition"
                                        >
                                            Retour
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                                        >
                                            Confirmer la commande
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="glass-card rounded-xl p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-4">Résumé</h2>

                                <div className="space-y-3 mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-white/80">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-3 space-y-2">
                                    <div className="flex justify-between text-white/80">
                                        <span>Sous-total</span>
                                        <span>€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/80">
                                        <span>Livraison</span>
                                        <span>{shipping === 0 ? 'Gratuite' : `€${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="pt-2 border-t border-white/10 flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-gold">€{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
