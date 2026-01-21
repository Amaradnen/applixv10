"use client";

import Link from 'next/link';
import { Search, Calendar, Tag } from 'lucide-react';

const DEMO_POSTS = [
    {
        id: '1',
        slug: 'guide-automation-2026',
        title: 'Le guide complet de l\'automation en 2026',
        excerpt: 'Découvrez les meilleures pratiques pour automatiser votre business avec l\'IA',
        category: 'Automation',
        date: '2026-01-20',
        readTime: '8 min',
        image: '/media/blog/automation.jpg',
    },
    {
        id: '2',
        slug: 'nextjs-15-nouveautes',
        title: 'Next.js 15: Tout ce qui change',
        excerpt: 'Analyse complète des nouvelles fonctionnalités de Next.js 15',
        category: 'Développement',
        date: '2026-01-18',
        readTime: '6 min',
        image: '/media/blog/nextjs.jpg',
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Le <span className="text-gold">Blog</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Actualités, tutoriels, et insights sur le développement et l'entrepreneuriat
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Rechercher un article..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Toutes les catégories</option>
                        <option value="dev">Développement</option>
                        <option value="automation">Automation</option>
                        <option value="business">Business</option>
                        <option value="design">Design</option>
                    </select>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {DEMO_POSTS.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group"
                        >
                            <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
                                <span className="text-white/40 text-lg font-bold">Blog Post</span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-xs">
                                    <span className="px-2 py-1 rounded bg-gold/20 text-gold font-bold">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-white/60">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    <span className="text-white/60">{post.readTime}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition">
                                    {post.title}
                                </h3>
                                <p className="text-white/60 text-sm line-clamp-2">{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="glass-card rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Recevez nos derniers articles directement dans votre boîte mail
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                        />
                        <button className="px-6 py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition">
                            S'abonner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
