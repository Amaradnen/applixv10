export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Politique d'Expédition</h1>
                <div className="glass-card rounded-xl p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Produits numériques</h2>
                        <p className="text-white/60">
                            Les produits numériques (templates, cours, outils) sont disponibles immédiatement après l'achat.
                            Vous recevrez un email avec les liens de téléchargement dans les 5 minutes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Produits physiques (cartes NFC)</h2>
                        <p className="text-white/60">
                            Les cartes NFC sont expédiées sous 1-3 jours ouvrables après validation du paiement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Frais de livraison</h2>
                        <div className="text-white/60">
                            <p className="mb-2">Tarifs selon la localisation:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>France métropolitaine: 5,99€ (gratuit à partir de 50€)</li>
                                <li>Europe: 9,99€ (gratuit à partir de 100€)</li>
                                <li>International: 19,99€ (gratuit à partir de 200€)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Délais de livraison</h2>
                        <div className="text-white/60">
                            <p className="mb-2">Délais estimés:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>France: 2-4 jours ouvrables</li>
                                <li>Europe: 5-10 jours ouvrables</li>
                                <li>International: 10-20 jours ouvrables</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Suivi de commande</h2>
                        <p className="text-white/60">
                            Un numéro de suivi vous sera envoyé dès l'expédition de votre commande.
                            Vous pouvez suivre votre colis via votre espace client.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Problèmes de livraison</h2>
                        <p className="text-white/60">
                            En cas de colis perdu ou endommagé, contactez-nous à shipping@applix.digital sous 48h.
                            Nous traiterons votre demande prioritairement.
                        </p>
                    </section>

                    <p className="text-white/40 text-sm pt-6 border-t border-white/10">
                        Dernière mise à jour: 21 janvier 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
