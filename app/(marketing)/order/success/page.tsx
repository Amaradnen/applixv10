"use client";

import Link from 'next/link';
import { CheckCircle, Package, Download } from 'lucide-react';

export default function OrderSuccessPage() {
    // In real app, get order details from URL params or state

    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="mb-8">
                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">Commande confirmée !</h1>
                    <p className="text-xl text-white/60">
                        Merci pour votre commande. Un email de confirmation vous a été envoyé.
                    </p>
                </div>

                {/* Order Details */}
                <div className="glass-card rounded-xl p-8 mb-8 text-left">
                    <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>

                    <div className="space-y-3 text-white/80">
                        <div className="flex justify-between">
                            <span>Numéro de commande</span>
                            <span className="font-mono text-gold">#DEMO-12345</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date</span>
                            <span>{new Date().toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Statut</span>
                            <span className="text-green-400">En préparation</span>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="glass-card rounded-xl p-6">
                        <Package className="w-8 h-8 text-gold mx-auto mb-3" />
                        <h3 className="font-bold mb-2">Suivi de commande</h3>
                        <p className="text-sm text-white/60">
                            Vous recevrez un email avec le numéro de suivi dès l'expédition
                        </p>
                    </div>

                    <div className="glass-card rounded-xl p-6">
                        <Download className="w-8 h-8 text-gold mx-auto mb-3" />
                        <h3 className="font-bold mb-2">Produits numériques</h3>
                        <p className="text-sm text-white/60">
                            Liens de téléchargement envoyés par email
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/digital-products"
                        className="px-6 py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition"
                    >
                        Continuer mes achats
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
