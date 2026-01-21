"use client";

import { useState } from 'react';
import { useI18N } from '@/contexts/I18NContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const { t } = useI18N();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo: Show success message
        alert('Merci ! Nous vous répondrons dans les 24h.');
        setFormData({ name: '', email: '', service: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Contactez <span className="text-gold">-nous</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Notre équipe est là pour répondre à toutes vos questions
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-card rounded-xl p-6">
                            <Mail className="w-8 h-8 text-gold mb-4" />
                            <h3 className="font-bold mb-2">Email</h3>
                            <a href="mailto:contact@applix.digital" className="text-white/60 hover:text-gold transition">
                                contact@applix.digital
                            </a>
                        </div>

                        <div className="glass-card rounded-xl p-6">
                            <Phone className="w-8 h-8 text-gold mb-4" />
                            <h3 className="font-bold mb-2">Téléphone</h3>
                            <a href="tel:+33123456789" className="text-white/60 hover:text-gold transition">
                                +33 1 23 45 67 89
                            </a>
                        </div>

                        <div className="glass-card rounded-xl p-6">
                            <MapPin className="w-8 h-8 text-gold mb-4" />
                            <h3 className="font-bold mb-2">Adresse</h3>
                            <p className="text-white/60">
                                123 Avenue des Champs-Élysées<br />
                                75008 Paris, France
                            </p>
                        </div>

                        <div className="glass-card rounded-xl p-6">
                            <h3 className="font-bold mb-4">Horaires</h3>
                            <div className="space-y-2 text-sm text-white/60">
                                <div className="flex justify-between">
                                    <span>Lun - Ven</span>
                                    <span>9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Samedi</span>
                                    <span>10:00 - 16:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dimanche</span>
                                    <span>Fermé</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8">
                            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nom complet *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                        placeholder="Jean Dupont"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                        placeholder="jean@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Service concerné *</label>
                                <select
                                    required
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                >
                                    <option value="">Sélectionnez un service</option>
                                    <option value="digital-products">Produits Numériques</option>
                                    <option value="saas-automation">Automation SaaS</option>
                                    <option value="academy">Academy</option>
                                    <option value="hub">Hub Communauté</option>
                                    <option value="templates">Templates</option>
                                    <option value="nfc">NFC Studio</option>
                                    <option value="ai">AI Package</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Message *</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition resize-none"
                                    placeholder="Décrivez votre projet ou posez votre question..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Envoyer le message
                            </button>

                            <p className="text-xs text-white/40 mt-4 text-center">
                                En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                            </p>
                        </form>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="glass-card rounded-xl p-4 mb-20">
                    <div className="aspect-video bg-gradient-to-br from-gold/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-white/40">
                            <MapPin className="w-12 h-12 mx-auto mb-2" />
                            <p>Map placeholder</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center glass-card rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Vous préférez discuter en direct ?</h2>
                    <p className="text-xl text-white/60 mb-8">
                        Réservez un appel de 30 minutes avec notre équipe
                    </p>
                    <button className="px-8 py-4 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition">
                        Réserver un appel
                    </button>
                </div>
            </div>
        </div>
    );
}
