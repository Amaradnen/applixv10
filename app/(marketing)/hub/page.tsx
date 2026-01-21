"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Crown, Zap, Lock, Check } from 'lucide-react';

const MEMBERSHIP_TIERS = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        billing: '/mois',
        description: 'Parfait pour découvrir',
        icon: Zap,
        features: [
            'Accès aux ressources gratuites',
            'Communauté Discord',
            '3 templates de base',
            'Support par email',
        ],
        cta: 'Commencer gratuitement',
        highlighted: false,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        billing: '/mois',
        description: 'Pour les professionnels',
        icon: Crown,
        features: [
            'Tout du plan Free',
            'Accès à tous les templates',
            'Cours exclusifs',
            'Support prioritaire',
            'Remises sur les produits',
            'Webinaires mensuels',
        ],
        cta: 'Devenir Pro',
        highlighted: true,
    },
    {
        id: 'vip',
        name: 'VIP',
        price: 99,
        billing: '/mois',
        description: 'Accès illimité',
        icon: Crown,
        features: [
            'Tout du plan Pro',
            'Accès à vie aux nouveaux cours',
            'Coaching 1-on-1 (2h/mois)',
            'Accès aux archives complètes',
            'Licence commerciale',
            'Slack privé VIP',
        ],
        cta: 'Devenir VIP',
        highlighted: false,
    },
];

const DEMO_RESOURCES = [
    {
        id: '1',
        title: 'Next.js SaaS Starter',
        type: 'Template',
        tier: 'pro',
    },
    {
        id: '2',
        title: 'Landing Page Builder',
        type: 'Tool',
        tier: 'vip',
    },
    {
        id: '3',
        title: 'Design System Figma',
        type: 'Design',
        tier: 'pro',
    },
];

export default function HubPage() {
    const { t } = useI18N();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        APPLIX <span className="text-gold">Hub</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Rejoignez une communauté exclusive de créateurs et accédez à des ressources premium
                    </p>
                </div>

                {/* Live Stats */}
                <div className="glass-card rounded-xl p-6 mb-16 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/60">3,428 membres actifs</span>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="text-white/60">127 ressources disponibles</div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="text-white/60">Mis à jour aujourd'hui</div>
                </div>

                {/* Membership Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {MEMBERSHIP_TIERS.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.id}
                                className={`rounded-xl p-8 ${tier.highlighted
                                        ? 'bg-gradient-to-b from-gold/20 to-gold/5 border-2 border-gold'
                                        : 'glass-card'
                                    } hover:scale-105 transition-transform`}
                            >
                                {tier.highlighted && (
                                    <div className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                        POPULAIRE
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className="w-8 h-8 text-gold" />
                                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                                </div>

                                <p className="text-white/60 text-sm mb-6">{tier.description}</p>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-gold">€{tier.price}</span>
                                        <span className="text-white/60">{tier.billing}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span className="text-white/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold transition ${tier.highlighted
                                            ? 'bg-gold text-black hover:bg-gold-light'
                                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Resources Preview */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Ressources <span className="text-gold">Exclusives</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DEMO_RESOURCES.map((resource) => (
                            <div key={resource.id} className="glass-card rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-4 right-4 px-2 py-1 rounded bg-gold/20 text-gold text-xs font-bold uppercase">
                                    {resource.tier}
                                </div>
                                <div className="aspect-video bg-white/5 rounded-lg mb-4 flex items-center justify-center backdrop-blur">
                                    <Lock className="w-12 h-12 text-white/40" />
                                </div>
                                <h3 className="font-bold mb-2">{resource.title}</h3>
                                <p className="text-white/60 text-sm">{resource.type}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community */}
                <div className="glass-card rounded-2xl p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-4 text-center">
                        Rejoignez la communauté
                    </h2>
                    <p className="text-white/60 text-center mb-8">
                        Connectez-vous avec des créateurs du monde entier
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">3.4k+</div>
                            <div className="text-white/60">Membres</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">500+</div>
                            <div className="text-white/60">Messages/jour</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">24/7</div>
                            <div className="text-white/60">Support actif</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Prêt à faire partie du Hub ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Commencez gratuitement, passez Pro quand vous voulez
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Rejoindre maintenant
                    </Link>
                </div>
            </div>
        </div>
    );
}
