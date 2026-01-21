"use client";

import Link from "next/link";
import { useI18N } from "@/contexts/I18NContext";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function MarketingFooter() {
    const { t } = useI18N();

    const services = [
        { href: "/digital-products", label: t.nav.digital_products },
        { href: "/saas-automation", label: t.nav.saas_automation },
        { href: "/academy", label: t.nav.academy },
        { href: "/hub", label: t.nav.hub },
        { href: "/templates", label: t.nav.templates },
    ];

    const company = [
        { href: "/case-studies", label: t.nav.case_studies },
        { href: "/blog", label: t.nav.blog },
        { href: "/pricing", label: t.nav.pricing },
        { href: "/contact", label: t.nav.contact },
    ];

    const legal = [
        { href: "/legal/privacy", label: t.footer.privacy },
        { href: "/legal/terms", label: t.footer.terms },
        { href: "/legal/refund", label: t.footer.refund },
        { href: "/legal/shipping", label: t.footer.shipping },
    ];

    const social = [
        { icon: Facebook, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Github, href: "#" },
    ];

    return (
        <footer className="bg-velvet-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg bg-black border border-white/10">
                                <img src="/assets/logo.jpg" alt="APPLIX Logo" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-white text-xl">APPLIX</span>
                                <span className="text-xs text-white/40 uppercase tracking-wider">Digital Ecosystem</span>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm mb-6">{t.footer.tagline}</p>
                        <div className="flex gap-3">
                            {social.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
                                    >
                                        <Icon className="w-4 h-4 text-white/70 hover:text-gold transition" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">{t.footer.services_title}</h3>
                        <ul className="space-y-2">
                            {services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 hover:text-white text-sm transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">{t.footer.company_title}</h3>
                        <ul className="space-y-2">
                            {company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 hover:text-white text-sm transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">{t.footer.legal_title}</h3>
                        <ul className="space-y-2">
                            {legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 hover:text-white text-sm transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">{t.footer.copyright}</p>
                    <div className="flex items-center gap-4">
                        <a href="https://applix.digital" className="text-white/60 hover:text-gold text-sm transition">
                            applix.digital
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
