"use client";

import Link from 'next/link';
import { Search, Calendar, TrendingUp } from 'lucide-react';

const DEMO_CASE_STUDIES = [
    {
        id: '1',
        slug: 'saas-startup-automation',
        client: 'TechFlow SaaS',
        industry: 'SaaS',
        title: '+300% de productivité avec l\'automation',
        description: 'Comment TechFlow a automatisé son onboarding client et économisé 40h/semaine',
        results: { metric1: '+300%', metric2: '40h', metric3: '€15k' },
        image: '/media/case-studies/techflow.jpg',
        date: '2026-01-15',
    },
    {
        id: '2',
        slug: 'ecommerce-growth',
        client: 'Boutique Mode+',
        industry: 'E-commerce',
        title: 'De 0 à 50k€/mois en 6 mois',
        description: 'L\'histoire de Boutique Mode+ qui a explosé ses ventes grâce à nos templates',
        results: { metric1: '50k€/mois', metric2: '+400%', metric3: '15k clients' },
        image: '/media/case-studies/boutique.jpg',
        date: '2026-01-10',
    },
];

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Success <span className="text-gold">Stories</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Découvrez comment nos clients réussissent avec APPLIX
                    </p>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Rechercher une étude de cas..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Toutes les industries</option>
                        <option value="saas">SaaS</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="agency">Agency</option>
                    </select>
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {DEMO_CASE_STUDIES.map((cs) => (
                        <Link
                            key={cs.id}
                            href={`/case-studies/${cs.slug}`}
                            className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group"
                        >
                            <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
                                <TrendingUp className="w-16 h-16 text-white/40 group-hover:scale-110 transition" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold">
                                        {cs.industry}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-white/60">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(cs.date).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-gold transition">
                                    {cs.title}
                                </h3>
                                <p className="text-white/60 text-sm mb-4">{cs.client}</p>
                                <p className="text-white/60 mb-6">{cs.description}</p>

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gold mb-1">{cs.results.metric1}</div>
                                        <div className="text-xs text-white/60">Croissance</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gold mb-1">{cs.results.metric2}</div>
                                        <div className="text-xs text-white/60">Économisées</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gold mb-1">{cs.results.metric3}</div>
                                        <div className="text-xs text-white/60">Revenue</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Votre success story commence ici</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Rejoignez des centaines d'entreprises qui font confiance à APPLIX
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Discutons de votre projet
                    </Link>
                </div>
            </div>
        </div>
    );
}
