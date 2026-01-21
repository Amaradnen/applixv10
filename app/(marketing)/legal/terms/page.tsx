export default function TermsPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
                <div className="glass-card rounded-xl p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Acceptation des conditions</h2>
                        <p className="text-white/60">
                            En accédant et utilisant APPLIX, vous acceptez d'être lié par ces conditions générales.
                            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Services fournis</h2>
                        <p className="text-white/60">
                            APPLIX fournit une plateforme d'écosystème digital incluant: marketplace de produits numériques,
                            automation SaaS, academy, hub communauté, templates, NFC Studio, et AI Package.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Compte utilisateur</h2>
                        <p className="text-white/60">
                            Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe.
                            Vous acceptez de nous informer immédiatement de toute utilisation non autorisée.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
                        <p className="text-white/60">
                            Tous les contenus (templates, cours, outils) restent la propriété d'APPLIX ou de leurs créateurs.
                            Les licences sont accordées selon le plan choisi (usage personnel ou commercial).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Limitations de responsabilité</h2>
                        <p className="text-white/60">
                            APPLIX ne sera pas responsable des dommages indirects, incidents, ou consécutifs résultant
                            de l'utilisation de nos services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Résiliation</h2>
                        <p className="text-white/60">
                            Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation
                            de ces conditions.
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
