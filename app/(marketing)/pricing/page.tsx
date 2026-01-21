"use client";

import { useState } from 'react';
import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: { monthly: 0, yearly: 0 },
        description: 'Pour découvrir APPLIX',
        features: [
            { text: '3 templates de base', included: true },
            { text: 'Communauté Discord', included: true },
            { text: '1 carte NFC', included: true },
            { text: 'Support email', included: true },
            { text: 'Cours Academy', included: false },
            { text: 'Automation agents', included: false },
            { text: 'Support prioritaire', included: false },
            { text: 'Accès Hub VIP', included: false },
        ],
        cta: 'Commencer gratuitement',
        highlighted: false,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: { monthly: 49, yearly: 490 },
        description: 'Pour les professionnels',
        features: [
            { text: 'Tous les templates', included: true },
            { text: 'Hub Pro + ressources', included: true },
            { text: '10 cartes NFC', included: true },
            { text: 'Support prioritaire', included: true },
            { text: 'Tous les cours Academy', included: true },
            { text: '3 automation agents', included: true },
            { text: 'Remises 20%', included: true },
            { text: 'Accès Hub VIP', included: false },
        ],
        cta: 'Devenir Pro',
        highlighted: true,
    },
    {
        id: 'business',
        name: 'Business',
        price: { monthly: 149, yearly: 1490 },
        description: 'Pour les équipes',
        features: [
            { text: 'Tout du plan Pro', included: true },
            { text: 'Hub VIP illimité', included: true },
            { text: 'Cartes NFC illimitées', included: true },
            { text: 'Support 24/7', included: true },
            { text: 'Automation illimitée', included: true },
            { text: 'Coaching mensuel', included: true },
            { text: 'API access', included: true },
            { text: 'White-label options', included: true },
        ],
        cta: 'Devenir Business',
        highlighted: false,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: { monthly: null, yearly: null },
        description: 'Solutions sur mesure',
        features: [
            { text: 'Tout du plan Business', included: true },
            { text: 'Déploiement on-premise', included: true },
            { text: 'SLA garanti', included: true },
            { text: 'Compte manager dédié', included: true },
            { text: 'Formation équipe', included: true },
            { text: 'Intégrations custom', included: true },
            { text: 'Audit de sécurité', included: true },
            { text: 'Contrat personnalisé', included: true },
        ],
        cta: 'Nous contacter',
        highlighted: false,
    },
];

export default function PricingPage() {
    const { t } = useI18N();
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Tarifs <span className="text-gold">Transparents</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                        Choisissez le plan parfait pour votre business
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 glass-card rounded-full p-2">
                        <button
                            onClick={() => setBilling('monthly')}
                            className={`px-6 py-2 rounded-full font-bold transition ${billing === 'monthly'
                                    ? 'bg-gold text-black'
                                    : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Mensuel
                        </button>
                        <button
                            onClick={() => setBilling('yearly')}
                            className={`px-6 py-2 rounded-full font-bold transition ${billing === 'yearly'
                                    ? 'bg-gold text-black'
                                    : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Annuel
                            <span className="ml-2 text-xs">(-17%)</span>
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {PLANS.map((plan) => {
                        const price = plan.price[billing];
                        return (
                            <div
                                key={plan.id}
                                className={`rounded-xl p-8 ${plan.highlighted
                                        ? 'bg-gradient-to-b from-gold/20 to-gold/5 border-2 border-gold scale-105'
                                        : 'glass-card'
                                    } hover:scale-105 transition-transform`}
                            >
                                {plan.highlighted && (
                                    <div className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                        POPULAIRE
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                                <div className="mb-6">
                                    {price !== null ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-gold">€{price}</span>
                                                <span className="text-white/60">/{billing === 'monthly' ? 'mois' : 'an'}</span>
                                            </div>
                                            {billing === 'yearly' && price > 0 && (
                                                <div className="text-sm text-white/60 mt-1">
                                                    €{(price / 12).toFixed(2)}/mois
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-2xl font-bold text-gold">Sur devis</div>
                                    )}
                                </div>

                                <button
                                    className={`w-full py-3 rounded-lg font-bold transition mb-6 ${plan.highlighted
                                            ? 'bg-gold text-black hover:bg-gold-light'
                                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {plan.cta}
                                </button>

                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <X className="w-5 h-5 text-white/20 flex-shrink-0 mt-0.5" />
                                            )}
                                            <span className={feature.included ? 'text-white/80' : 'text-white/40'}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Questions fréquentes</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Puis-je changer de plan à tout moment ?',
                                a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont appliqués immédiatement.',
                            },
                            {
                                q: 'Y a-t-il une période d\'essai ?',
                                a: 'Le plan Starter est gratuit pour toujours. Vous pouvez tester les fonctionnalités de base avant de passer Pro.',
                            },
                            {
                                q: 'Les paiements sont-ils sécurisés ?',
                                a: 'Absolument. Nous utilisons Stripe pour tous les paiements, avec encryption SSL et conformité PCI.',
                            },
                            {
                                q: 'Puis-je annuler mon abonnement ?',
                                a: 'Oui, vous pouvez annuler à tout moment. Aucun engagement, aucune pénalité.',
                            },
                        ].map((faq, idx) => (
                            <div key={idx} className="glass-card rounded-xl p-6">
                                <h3 className="font-bold mb-2">{faq.q}</h3>
                                <p className="text-white/60 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Notre équipe est là pour vous conseiller
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Parler à un expert
                    </Link>
                </div>
            </div>
        </div>
    );
}
