export default function RefundPage() {
    return (
        <div className="min-h-screen bg-velvet-black text-white pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Politique de Remboursement</h1>
                <div className="glass-card rounded-xl p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Produits numériques</h2>
                        <p className="text-white/60">
                            En raison de la nature des produits numériques, les remboursements ne sont généralement pas possibles
                            après téléchargement. Cependant, nous examinerons les demandes au cas par cas en cas de:
                        </p>
                        <ul className="list-disc list-inside text-white/60 mt-2 space-y-1">
                            <li>Fichier corrompu ou non fonctionnel</li>
                            <li>Description du produit trompeuse</li>
                            <li>Problème technique empêchant l'utilisation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Abonnements mensuels</h2>
                        <p className="text-white/60">
                            Vous pouvez annuler votre abonnement à tout moment. Aucun remboursement ne sera effectué pour
                            le mois en cours. L'accès reste actif jusqu'à la fin de la période payée.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Abonnements annuels</h2>
                        <p className="text-white/60">
                            Les abonnements annuels peuvent être remboursés au prorata dans les 30 premiers jours.
                            Après 30 jours, aucun remboursement ne sera accordé.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Comment demander un remboursement</h2>
                        <p className="text-white/60">
                            Contactez-nous à refunds@applix.digital avec:
                        </p>
                        <ul className="list-disc list-inside text-white/60 mt-2 space-y-1">
                            <li>Votre numéro de commande</li>
                            <li>Raison de la demande</li>
                            <li>Preuves (si applicable)</li>
                        </ul>
                        <p className="text-white/60 mt-2">
                            Les demandes sont traitées sous 5-7 jours ouvrables.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Délai de traitement</h2>
                        <p className="text-white/60">
                            Les remboursements approuvés sont traités via le mode de paiement original sous 7-14 jours.
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
