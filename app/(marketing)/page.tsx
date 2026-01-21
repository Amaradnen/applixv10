"use client";

import { useI18N } from "@/contexts/I18NContext";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function HomePage() {
    const { t } = useI18N();

    const services = [
        {
            title: "Produits Numériques",
            description: "Templates, outils, et ressources premium pour créateurs",
            href: "/digital-products",
            icon: "📦",
        },
        {
            title: "Automation SaaS",
            description: "Agents intelligents pour automatiser votre workflow",
            href: "/saas-automation",
            icon: "🤖",
        },
        {
            title: "Académie",
            description: "Formations professionnelles et certifications",
            href: "/academy",
            icon: "🎓",
        },
        {
            title: "Hub Communautaire",
            description: "Accédez à une communauté exclusive et des ressources VIP",
            href: "/hub",
            icon: "🌟",
        },
        {
            title: "Templates",
            description: "Bibliothèque de templates Next.js, React, et plus",
            href: "/templates",
            icon: "⚡",
        },
        {
            title: "Cartes NFC",
            description: "Cartes de visite connectées premium",
            href: "/nfc-studio",
            icon: "💳",
        },
        {
            title: "Package IA",
            description: "Suite complète d'outils IA pour votre business",
            href: "/ai-package",
            icon: "🧠",
        },
    ];

    const stats = [
        { label: "Clients satisfaits", value: "10,000+" },
        { label: "Produits vendus", value: "50,000+" },
        { label: "Pays desservis", value: "120+" },
        { label: "Taux de satisfaction", value: "98%" },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video Placeholder */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-velvet-black via-velvet-gray to-velvet-black opacity-50" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white via-gold to-gold-light bg-clip-text text-transparent">
                                APPLIX
                            </span>
                        </h1>
                        <p className="text-2xl md:text-4xl font-light text-white/80 mb-4">
                            {t.home.hero.subtitle}
                        </p>
                        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-3xl mx-auto">
                            {t.home.hero.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/services"
                                className="px-8 py-4 rounded-lg bg-gold text-black font-bold text-lg hover:bg-gold-light transition shadow-2xl flex items-center gap-2 group"
                            >
                                {t.home.hero.cta_primary}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-lg transition flex items-center gap-2"
                            >
                                {t.common.pricing}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1 h-2 rounded-full bg-gold" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-velvet-gray/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</div>
                                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Nos <span className="text-gold">Services</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Un écosystème complet pour transformer votre présence digitale
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, idx) => (
                            <Link
                                key={idx}
                                href={service.href}
                                className="group p-8 glass-card rounded-2xl hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-5xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition">
                                    {service.title}
                                </h3>
                                <p className="text-white/60 mb-4">{service.description}</p>
                                <div className="flex items-center text-gold text-sm font-bold group-hover:gap-2 transition-all">
                                    {t.common.learn_more}
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-velvet-gray/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Premium Quality</h3>
                            <p className="text-white/60">
                                Des produits et services de qualité supérieure, conçus par des experts
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center">
                                <Shield className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Support 24/7</h3>
                            <p className="text-white/60">
                                Une équipe dédiée pour vous accompagner à chaque étape
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Résultats Rapides</h3>
                            <p className="text-white/60">
                                Déployez et monétisez vos projets en quelques minutes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Prêt à transformer votre <span className="text-gold">business digital</span> ?
                    </h2>
                    <p className="text-xl text-white/60 mb-12">
                        Rejoignez plus de 10,000 entreprises qui nous font confiance
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="px-8 py-4 rounded-lg bg-gold text-black font-bold text-lg hover:bg-gold-light transition shadow-2xl"
                        >
                            Voir les tarifs
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-lg transition"
                        >
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
