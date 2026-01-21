"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18N } from "@/contexts/I18NContext";
import { Menu, X, Globe } from "lucide-react";
import clsx from "clsx";

export default function MarketingNav() {
    const { locale, setLocale, t } = useI18N();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: t.nav.home },
        { href: "/services", label: t.nav.services },
        { href: "/digital-products", label: t.nav.digital_products },
        { href: "/saas-automation", label: t.nav.saas_automation },
        { href: "/academy", label: t.nav.academy },
        { href: "/hub", label: t.nav.hub },
        { href: "/templates", label: t.nav.templates },
        { href: "/pricing", label: t.nav.pricing },
    ];

    const toggleLocale = () => {
        setLocale(locale === 'fr' ? 'en' : 'fr');
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg bg-black border border-white/10">
                        <img src="/assets/logo.jpg" alt="APPLIX Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-display font-bold text-white text-xl tracking-tight">APPLIX</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold transition-colors">
                            Digital Ecosystem
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-2 rounded-lg text-xs font-medium uppercase tracking-wide text-white/70 hover:text-white hover:bg-white/5 transition"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLocale}
                        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                        <Globe className="w-4 h-4 text-gold" />
                        <span className="text-xs font-bold uppercase text-white">{locale}</span>
                    </button>

                    {/* Open App Button */}
                    <Link
                        href="/app"
                        className="hidden md:block px-4 py-2 rounded-lg bg-gold text-black font-bold text-sm hover:bg-gold-light transition shadow-lg"
                    >
                        {t.nav.open_app}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5 text-white" />
                        ) : (
                            <Menu className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full glass border-b border-white/10 p-4">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-2 mt-4">
                            <button
                                onClick={toggleLocale}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                            >
                                <Globe className="w-4 h-4 text-gold" />
                                <span className="text-sm font-bold text-white">{locale === 'fr' ? 'Français' : 'English'}</span>
                            </button>
                            <Link
                                href="/app"
                                className="flex-1 px-4 py-3 rounded-lg bg-gold text-black font-bold text-sm text-center hover:bg-gold-light transition"
                            >
                                {t.nav.open_app}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
