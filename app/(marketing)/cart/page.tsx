"use client";

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

    const subtotal = getTotalPrice();
    const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.99) : 0;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ShoppingCart className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
                    <p className="text-white/60 mb-8">Ajoutez des produits pour commencer</p>
                    <Link
                        href="/digital-products"
                        className="inline-block px-6 py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Découvrir les produits
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Panier ({getTotalItems()} articles)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="glass-card rounded-xl p-6 flex gap-6">
                                {/* Product Image */}
                                {item.image_url && (
                                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                                    <p className="text-sm text-white/60 mb-3">
                                        {item.type === 'digital' ? 'Produit numérique' : 'Produit physique'}
                                    </p>
                                    <div className="text-gold font-bold">€{item.price.toFixed(2)}</div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col items-end gap-4">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-white/60 hover:text-red-400 transition"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass-card rounded-xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Résumé de commande</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-white/80">
                                    <span>Sous-total</span>
                                    <span>€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/80">
                                    <span>Livraison</span>
                                    <span>{shipping === 0 ? 'Gratuite' : `€${shipping.toFixed(2)}`}</span>
                                </div>
                                {shipping === 0 && subtotal > 0 && (
                                    <div className="text-xs text-green-400">
                                        ✓ Livraison gratuite à partir de €50
                                    </div>
                                )}
                                <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-gold">€{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full py-3 rounded-lg bg-gold text-black font-bold text-center hover:bg-gold-light transition"
                            >
                                Passer la commande
                            </Link>

                            <Link
                                href="/digital-products"
                                className="block w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-center mt-3 transition"
                            >
                                Continuer mes achats
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
