"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const DEMO_PRODUCTS = [
    {
        id: '1',
        slug: 'nextjs-saas-template',
        name: 'Next.js SaaS Template',
        price: 49.99,
        type: 'digital' as const,
        category: 'Templates',
        image_url: '/media/products/nextjs-saas.jpg',
        description: 'Complete SaaS template with auth, payments, and dashboard',
        rating: 4.9,
        sales: 1243,
    },
    {
        id: '2',
        slug: 'premium-icons-pack',
        name: 'Premium Icons Pack',
        price: 29.99,
        type: 'digital' as const,
        category: 'Icons',
        image_url: '/media/products/icons.jpg',
        description: '500+ premium icons in SVG format',
        rating: 4.8,
        sales: 2156,
    },
    {
        id: '3',
        slug: 'landing-page-bundle',
        name: 'Landing Page Bundle',
        price: 79.99,
        type: 'digital' as const,
        category: 'Templates',
        image_url: '/media/products/landing.jpg',
        description: '10 high-converting landing page templates',
        rating: 5.0,
        sales: 892,
    },
];

export default function DigitalProductsPage() {
    const { t } = useI18N();
    const { addItem } = useCartStore();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Produits <span className="text-gold">Numériques</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Templates, outils, et ressources premium pour créateurs et développeurs
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-12">
                    <div className="flex-1 min-w-[300px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Rechercher des produits..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Toutes les catégories</option>
                        <option value="templates">Templates</option>
                        <option value="icons">Icons</option>
                        <option value="fonts">Fonts</option>
                        <option value="graphics">Graphics</option>
                    </select>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Trier par</option>
                        <option value="popular">Plus populaires</option>
                        <option value="recent">Plus récents</option>
                        <option value="price-low">Prix croissant</option>
                        <option value="price-high">Prix décroissant</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEMO_PRODUCTS.map((product) => (
                        <div key={product.id} className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group">
                            {/* Image */}
                            <div className="aspect-video bg-white/5 overflow-hidden relative">
                                <div className="w-full h-full bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
                                    <span className="text-white/40 text-sm">{product.name}</span>
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-black text-xs font-bold">
                                    {product.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition">
                                    {product.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Rating & Sales */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-gold text-gold" />
                                        <span className="font-bold">{product.rating}</span>
                                    </div>
                                    <div className="text-white/60">
                                        {product.sales} ventes
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-gold">
                                        €{product.price.toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => addItem(product)}
                                        className="px-4 py-2 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition flex items-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Vous êtes créateur ?
                    </h2>
                    <p className="text-xl text-white/60 mb-8">
                        Vendez vos produits numériques sur APPLIX
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Devenir vendeur
                    </Link>
                </div>
            </div>
        </div>
    );
}
