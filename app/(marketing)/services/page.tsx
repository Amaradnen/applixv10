"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { ShoppingBag, Zap, Book, Users, Layout, Crown, ArrowRight } from 'lucide-react';

const SERVICES = [
    {
        id: 'digital-products',
        name: 'Produits Numériques',
        description: 'Marketplace de templates, outils, et ressources premium',
        icon: ShoppingBag,
        href: '/digital-products',
        color: 'from-blue-500/20 to-purple-500/20',
    },
    {
        id: 'saas-automation',
        name: 'Automation SaaS',
        description: 'Agents intelligents pour automatiser vos workflows',
        icon: Zap,
        href: '/saas-automation',
        color: 'from-purple-500/20 to-pink-500/20',
    },
    {
        id: 'academy',
        name: 'Academy',
        description: 'Cours premium pour développeurs et designers',
        icon: Book,
        href: '/academy',
        color: 'from-green-500/20 to-teal-500/20',
    },
    {
        id: 'hub',
        name: 'Hub Communauté',
        description: 'Communauté exclusive avec ressources et support',
        icon: Users,
        href: '/hub',
        color: 'from-orange-500/20 to-red-500/20',
    },
    {
        id: 'templates',
        name: 'Templates',
        description: 'Templates production-ready pour vos projets',
        icon: Layout,
        href: '/templates',
        color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
        id: 'nfc-studio',
        name: 'NFC Studio',
        description: 'Créez des cartes de visite NFC intelligentes',
        icon: Crown,
        href: '/nfc-studio',
        color: 'from-gold/20 to-yellow-500/20',
    },
    {
        id: 'ai-package',
        name: 'AI Package',
        description: 'Génération de contenu IA pour votre business',
        icon: Zap,
        href: '/ai-package',
        color: 'from-pink-500/20 to-purple-500/20',
    },
];

export default function ServicesPage() {
    const { t } = useI18N();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Nos <span className="text-gold">Services</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Un écosystème complet pour créateurs, développeurs, et entrepreneurs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {SERVICES.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className="glass-card rounded-xl p-8 hover:border-gold/50 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition">
                                    {service.name}
                                </h3>
                                <p className="text-white/60 mb-6">{service.description}</p>

                                <div className="flex items-center gap-2 text-gold font-bold">
                                    <span>En savoir plus</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-20">
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">10k+</div>
                        <div className="text-white/60 text-sm">Clients satisfaits</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">500+</div>
                        <div className="text-white/60 text-sm">Ressources</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">24/7</div>
                        <div className="text-white/60 text-sm">Support</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">99%</div>
                        <div className="text-white/60 text-sm">Satisfaction</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Découvrez comment APPLIX peut transformer votre business
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                        >
                            Voir les prix
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition"
                        >
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
