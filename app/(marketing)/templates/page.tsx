"use client";

import { useI18N } from '@/contexts/I18NContext';
import Link from 'next/link';
import { Layout, Code, Palette, Smartphone, Globe, Zap } from 'lucide-react';

const TEMPLATE_CATEGORIES = [
    { id: 'all', label: 'Tous', count: 127 },
    { id: 'web', label: 'Web Apps', count: 45 },
    { id: 'landing', label: 'Landing Pages', count: 32 },
    { id: 'mobile', label: 'Mobile', count: 18 },
    { id: 'saas', label: 'SaaS', count: 22 },
    { id: 'ecommerce', label: 'E-commerce', count: 10 },
];

const DEMO_TEMPLATES = [
    {
        id: '1',
        slug: 'modern-saas-dashboard',
        name: 'Modern SaaS Dashboard',
        description: 'Complete dashboard with charts, tables, and dark mode',
        tech: ['Next.js', 'Tailwind', 'TypeScript'],
        category: 'saas',
        price: 49,
        image: '/media/templates/saas.jpg',
        featured: true,
    },
    {
        id: '2',
        slug: 'landing-page-agency',
        name: 'Agency Landing Page',
        description: 'High-converting landing page for agencies',
        tech: ['React', 'Framer Motion', 'Tailwind'],
        category: 'landing',
        price: 29,
        image: '/media/templates/agency.jpg',
        featured: false,
    },
    {
        id: '3',
        slug: 'ecommerce-store',
        name: 'E-commerce Store',
        description: 'Full-featured online store with cart and checkout',
        tech: ['Next.js', 'Stripe', 'Supabase'],
        category: 'ecommerce',
        price: 79,
        image: '/media/templates/ecommerce.jpg',
        featured: true,
    },
    {
        id: '4',
        slug: 'mobile-app-ui',
        name: 'Mobile App UI Kit',
        description: 'Complete mobile UI kit with 50+ screens',
        tech: ['React Native', 'Expo', 'NativeWind'],
        category: 'mobile',
        price: 59,
        image: '/media/templates/mobile.jpg',
        featured: false,
    },
    {
        id: '5',
        slug: 'portfolio-creative',
        name: 'Creative Portfolio',
        description: 'Stunning portfolio for designers and developers',
        tech: ['Astro', 'Tailwind', 'View Transitions'],
        category: 'web',
        price: 39,
        image: '/media/templates/portfolio.jpg',
        featured: false,
    },
    {
        id: '6',
        slug: 'blog-platform',
        name: 'Blog Platform',
        description: 'SEO-optimized blog with MDX support',
        tech: ['Next.js', 'Contentlayer', 'Tailwind'],
        category: 'web',
        price: 34,
        image: '/media/templates/blog.jpg',
        featured: false,
    },
];

export default function TemplatesPage() {
    const { t } = useI18N();

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                        <Layout className="w-4 h-4 text-gold" />
                        <span className="text-gold font-bold text-sm">Templates Premium</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Templates <span className="text-gold">Production-Ready</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Lancez votre projet en quelques minutes avec nos templates professionnels
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {TEMPLATE_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`px-4 py-2 rounded-lg font-medium transition ${cat.id === 'all'
                                    ? 'bg-gold text-black'
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {cat.label} <span className="text-sm opacity-60">({cat.count})</span>
                        </button>
                    ))}
                </div>

                {/* Tech Stack Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
                    <span className="text-white/60 text-sm">Stacks:</span>
                    {['Next.js', 'React', 'Vue', 'Astro', 'Tailwind', 'TypeScript'].map((tech) => (
                        <button
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition"
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                {/* Featured Templates */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">✨ Templates en vedette</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {DEMO_TEMPLATES.filter((t) => t.featured).map((template) => (
                            <div
                                key={template.id}
                                className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group"
                            >
                                <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center relative">
                                    <Layout className="w-16 h-16 text-white/40" />
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-black text-xs font-bold">
                                        FEATURED
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition">
                                        {template.name}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4">{template.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {template.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-gold">€{template.price}</div>
                                        <Link
                                            href={`/templates/${template.slug}`}
                                            className="px-4 py-2 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                                        >
                                            Voir le template
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* All Templates Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-6">Tous les templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {DEMO_TEMPLATES.map((template) => (
                            <div
                                key={template.id}
                                className="glass-card rounded-xl overflow-hidden hover:border-gold/50 transition-all group"
                            >
                                <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
                                    <Layout className="w-12 h-12 text-white/40 group-hover:scale-110 transition" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold mb-2 group-hover:text-gold transition">
                                        {template.name}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-3 line-clamp-2">{template.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {template.tech.slice(0, 2).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="font-bold text-gold">€{template.price}</div>
                                        <Link
                                            href={`/templates/${template.slug}`}
                                            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition"
                                        >
                                            Voir
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div className="glass-card rounded-2xl p-12 mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Pourquoi nos templates ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Code className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Code de qualité</h3>
                            <p className="text-white/60 text-sm">TypeScript, ESLint, tests inclus</p>
                        </div>
                        <div className="text-center">
                            <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Performance optimale</h3>
                            <p className="text-white/60 text-sm">Lighthouse 95+, SEO optimisé</p>
                        </div>
                        <div className="text-center">
                            <Palette className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-bold mb-2">Design moderne</h3>
                            <p className="text-white/60 text-sm">UI premium, dark mode, responsive</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Besoin d'un template custom ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Notre équipe peut créer un template sur mesure pour votre projet
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Demander un devis
                    </Link>
                </div>
            </div>
        </div>
    );
}
