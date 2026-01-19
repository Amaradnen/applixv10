"use client";

import React from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
    const router = useRouter();
    const { cardFront, profile, cart, addToCart, setStep } = useStudioStore();

    const handleAddCardToCart = () => {
        addToCart({
            type: 'card',
            name: `Carte NFC ${cardFront.material}`,
            price: 49.99,
            quantity: 1
        });
    };

    const handleAddProfileToCart = () => {
        addToCart({
            type: 'profile',
            name: `Profil Digital - ${profile.name}`,
            price: 9.99,
            quantity: 1
        });
    };

    const handleGoToCart = () => {
        router.push('/nfc-studio/cart');
    };

    return (
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl h-full flex flex-col">
            <button onClick={() => setStep(2)} className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition w-fit">
                <ArrowLeft size={12} /> Retour au Profil
            </button>

            <div>
                <h2 className="text-xl font-bold font-display text-white mb-1">Récapitulatif</h2>
                <p className="text-xs text-white/50">Ajoutez vos créations au panier</p>
            </div>

            <div className="space-y-6 flex-1">
                {/* Card Summary */}
                <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4">Carte NFC</h3>
                    <div className="space-y-2 text-sm text-white/60 mb-4">
                        <div className="flex justify-between">
                            <span>Matériau</span>
                            <span className="text-white capitalize">{cardFront.material.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Template</span>
                            <span className="text-white capitalize">{cardFront.template}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Nom</span>
                            <span className="text-white">{cardFront.texts.name}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleAddCardToCart}
                        className="w-full py-3 bg-gg-gold text-black font-bold rounded-lg hover:bg-[#CFA31D] transition"
                    >
                        Ajouter au panier - 49.99€
                    </button>
                </section>

                {/* Profile Summary */}
                <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4">Profil Digital</h3>
                    <div className="space-y-2 text-sm text-white/60 mb-4">
                        <div className="flex justify-between">
                            <span>Nom</span>
                            <span className="text-white">{profile.name || 'Non défini'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thème</span>
                            <span className="text-white capitalize">{profile.theme}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Liens</span>
                            <span className="text-white">{profile.links.length} liens</span>
                        </div>
                    </div>
                    <button
                        onClick={handleAddProfileToCart}
                        className="w-full py-3 bg-gg-gold text-black font-bold rounded-lg hover:bg-[#CFA31D] transition"
                    >
                        Ajouter au panier - 9.99€
                    </button>
                </section>

                {/* Cart Summary */}
                {cart.items.length > 0 && (
                    <section className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <ShoppingCart size={16} />
                            Panier ({cart.items.length} article{cart.items.length > 1 ? 's' : ''})
                        </h3>
                        <div className="space-y-2 text-sm text-white/60 mb-4">
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span className="text-white">{(item.price * item.quantity).toFixed(2)}€</span>
                                </div>
                            ))}
                            <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                                <span className="text-white">Total</span>
                                <span className="text-gg-gold">{cart.total.toFixed(2)}€</span>
                            </div>
                        </div>
                        <button
                            onClick={handleGoToCart}
                            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
                        >
                            Voir le panier et commander
                        </button>
                    </section>
                )}
            </div>

            {cart.items.length === 0 && (
                <div className="text-center text-white/40 text-xs italic py-4">
                    Ajoutez des articles au panier pour continuer
                </div>
            )}
        </div>
    );
}
