export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
                <div className="glass-card rounded-xl p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
                        <p className="text-white/60">
                            APPLIX collecte des informations personnelles lorsque vous vous inscrivez à nos services,
                            passez une commande, ou interagissez avec notre plateforme. Les données collectées incluent:
                            nom, email, adresse, informations de paiement (cryptées via Stripe).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
                        <p className="text-white/60">
                            Vos données sont utilisées pour: fournir nos services, traiter vos commandes, envoyer
                            des mises à jour importantes, améliorer notre plateforme, et personnaliser votre expérience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Protection des données</h2>
                        <p className="text-white/60">
                            Nous utilisons des mesures de sécurité conformes aux standards de l'industrie (SSL, encryption,
                            authentification 2FA) pour protéger vos informations personnelles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
                        <p className="text-white/60">
                            Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic, et personnaliser
                            le contenu. Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Vos droits RGPD</h2>
                        <p className="text-white/60">
                            Conformément au RGPD, vous avez le droit d'accéder, modifier, supprimer vos données,
                            ou de vous opposer à leur traitement. Contactez-nous à privacy@applix.digital.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
                        <p className="text-white/60">
                            Nous pouvons mettre à jour cette politique. Les modifications seront publiées sur cette page
                            avec la date de mise à jour.
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
