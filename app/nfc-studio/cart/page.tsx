"use client";

import React from "react";
import { useStudioStore } from "../store/useStudioStore";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CartPage() {
    const router = useRouter();
    const { cart, cardFront, profile, updateCartQuantity, removeFromCart, calculateCartTotal, setStep } = useStudioStore();

    React.useEffect(() => {
        calculateCartTotal();
    }, [calculateCartTotal]);

    const hasPhysicalCard = cart.items.some(item => item.type === 'card' || item.meta?.physical);

    const getMaterialName = (material: string) => {
        const names: Record<string, string> = {
            'metal-black': 'Métal Noir',
            'metal-gold': 'Métal Or',
            'metal-silver': 'Métal Argent',
            'pvc-white': 'PVC Blanc',
            'pvc-black': 'PVC Noir',
            'wood-bamboo': 'Bambou',
            'carbon-fiber': 'Fibre de Carbone'
        };
        return names[material] || material;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-5xl mx-auto px-4 py-12">
                <button
                    onClick={() => router.push('/nfc-studio')}
                    className="text-sm text-white/50 hover:text-white flex items-center gap-2 mb-8 transition"
                >
                    <ArrowLeft size={16} />
                    Retour au Studio
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display mb-2">Panier</h1>
                    <p className="text-white/50">Vérifiez votre commande avant de continuer</p>
                </div>

                {cart.items.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                        <ShoppingCart size={48} className="mx-auto mb-4 text-white/20" />
                        <h2 className="text-xl font-bold mb-2">Votre panier est vide</h2>
                        <p className="text-white/50 mb-6">Ajoutez des articles depuis le Studio NFC</p>
                        <button
                            onClick={() => router.push('/nfc-studio')}
                            className="px-6 py-3 bg-gg-gold text-black font-bold rounded-xl hover:bg-[#CFA31D] transition"
                        >
                            Retour au Studio
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.items.map((item) => (
                                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex gap-4">
                                        {/* Item Preview */}
                                        <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                            {item.type === 'card' ? (
                                                <div className="text-xs font-bold text-center">
                                                    <div>NFC</div>
                                                    <div className="text-[8px] text-white/50">CARD</div>
                                                </div>
                                            ) : item.type === 'subscription' ? (
                                                <div className="text-xs font-bold text-center">
                                                    <div>SAAS</div>
                                                    <div className="text-[8px] text-white/50">PRO</div>
                                                </div>
                                            ) : (
                                                <div className="text-xs font-bold text-center">
                                                    <div>PROFIL</div>
                                                    <div className="text-[8px] text-white/50">DIGITAL</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">{item.name}</h3>
                                            {item.type === 'card' && (
                                                <p className="text-xs text-white/50">
                                                    {getMaterialName(cardFront.material)} • {cardFront.texts.name}
                                                </p>
                                            )}
                                            {item.type === 'profile' && (
                                                <p className="text-xs text-white/50">
                                                    {profile.name} • {profile.links.length} liens
                                                </p>
                                            )}
                                            {item.type === 'subscription' && (
                                                <p className="text-xs text-white/50">
                                                    Abonnement Mensuel/Annuel
                                                </p>
                                            )}
                                            <p className="text-lg font-bold text-gg-gold mt-2">{item.price}€</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end gap-3">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-white/40 hover:text-red-400 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="flex items-center gap-2 bg-white/10 rounded-lg">
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-2 hover:bg-white/10 transition"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-white/10 transition"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-4">
                                <h2 className="text-lg font-bold mb-4">Récapitulatif</h2>

                                <div className="space-y-3 mb-6">
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
                                    <div className="border-t border-white/10 pt-3 flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="text-2xl font-bold text-gg-gold">{cart.total.toFixed(2)}€</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push('/nfc-studio/checkout')}
                                    className="w-full py-4 bg-gg-gold text-black font-bold rounded-xl hover:bg-[#CFA31D] transition flex items-center justify-center gap-2"
                                >
                                    Passer la commande
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    onClick={() => router.push('/nfc-studio')}
                                    className="w-full mt-3 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition"
                                >
                                    Continuer les achats
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
