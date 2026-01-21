"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Search, Zap, TrendingUp, Users, Mail } from 'lucide-react';

const DEMO_AGENTS = [
    {
        id: '1',
        slug: 'sales-lead-qualifier',
        name: 'Sales Lead Qualifier',
        description: 'Automatically qualify and route leads from forms to your CRM',
        category: 'Sales',
        integrations: ['HubSpot', 'Salesforce', 'Slack'],
        price: 'À partir de €49/mois',
        icon: TrendingUp,
    },
    {
        id: '2',
        slug: 'support-ticket-router',
        name: 'Support Ticket Router',
        description: 'Route support tickets to the right team based on priority and keywords',
        category: 'Support',
        integrations: ['Zendesk', 'Intercom', 'Teams'],
        price: 'À partir de €39/mois',
        icon: Users,
    },
    {
        id: '3',
        slug: 'email-marketing-automation',
        name: 'Email Marketing Automation',
        description: 'Automate email campaigns based on user behavior and triggers',
        category: 'Marketing',
        integrations: ['Mailchimp', 'SendGrid', 'HubSpot'],
        price: 'À partir de €59/mois',
        icon: Mail,
    },
];

export default function SaaSAutomationPage() {
    const { t } = useI18N();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                        <Zap className="w-4 h-4 text-gold" />
                        <span className="text-gold font-bold text-sm">Automation SaaS</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Agents <span className="text-gold">Intelligents</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Automatisez vos workflows avec des agents IA préconfigurés pour votre business
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-16">
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">50+</div>
                        <div className="text-white/60">Agents disponibles</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">10k+</div>
                        <div className="text-white/60">Heures économisées</div>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-gold mb-2">98%</div>
                        <div className="text-white/60">Satisfaction client</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Rechercher un agent..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                        />
                    </div>
                    <select className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                        <option value="">Toutes les catégories</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="support">Support</option>
                        <option value="hr">HR</option>
                    </select>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {DEMO_AGENTS.map((agent) => {
                        const Icon = agent.icon;
                        return (
                            <div key={agent.id} className="glass-card rounded-xl p-6 hover:border-gold/50 transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-gold" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition">
                                    {agent.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-4">
                                    {agent.description}
                                </p>

                                {/* Integrations */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {agent.integrations.map((integration) => (
                                        <span
                                            key={integration}
                                            className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 text-white/80"
                                        >
                                            {integration}
                                        </span>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="text-sm text-white/60">{agent.price}</div>
                                    <Link
                                        href={`/saas-automation/agents/${agent.slug}`}
                                        className="px-4 py-2 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold font-bold text-sm transition"
                                    >
                                        En savoir plus
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ROI Calculator Section */}
                <div className="glass-card rounded-2xl p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-4 text-center">
                        Calculateur de <span className="text-gold">ROI</span>
                    </h2>
                    <p className="text-white/60 text-center mb-8">
                        Découvrez combien vous pouvez économiser avec l'automation
                    </p>
                    <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Heures manuelles/mois</label>
                                <input
                                    type="number"
                                    defaultValue={40}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Taux horaire (€)</label>
                                <input
                                    type="number"
                                    defaultValue={50}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                />
                            </div>
                        </div>
                        <div className="glass rounded-lg p-6 text-center">
                            <div className="text-sm text-white/60 mb-2">Économies mensuelles estimées</div>
                            <div className="text-4xl font-bold text-gold">€2,000</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à automatiser ?
                    </h2>
                    <p className="text-xl text-white/60 mb-8">
                        Demandez une démonstration personnalisée
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Demander une démo
                    </Link>
                </div>
            </div>
        </div>
    );
}
