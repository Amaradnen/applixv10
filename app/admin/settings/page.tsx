import { Save } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-white/60">Configure platform settings</p>
            </div>

            <div className="space-y-6">
                {/* Languages */}
                <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Languages</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Default Language</label>
                            <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Available Languages</label>
                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span>Français</span>
                                </label>
                                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span>English</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Stripe Publishable Key</label>
                            <input
                                type="text"
                                placeholder="pk_live_..."
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Stripe Secret Key</label>
                            <input
                                type="password"
                                placeholder="sk_live_..."
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span className="text-sm">Enable Cash on Delivery</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span className="text-sm">Enable Crypto (USDT)</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">USDT Wallet Address</label>
                            <input
                                type="text"
                                placeholder="0x..."
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Site Settings */}
                <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Site Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Site Name</label>
                            <input
                                type="text"
                                defaultValue="APPLIX"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Site URL</label>
                            <input
                                type="text"
                                defaultValue="https://applix.digital"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Contact Email</label>
                            <input
                                type="email"
                                placeholder="contact@applix.digital"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Settings */}
                <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Email Configuration</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">SMTP Host</label>
                            <input
                                type="text"
                                placeholder="smtp.sendgrid.net"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">SMTP Port</label>
                                <input
                                    type="number"
                                    placeholder="587"
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">SMTP User</label>
                                <input
                                    type="text"
                                    placeholder="apikey"
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">SMTP Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Storage Info */}
                <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Storage Information</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-white/60">Supabase Project</span>
                            <span className="font-mono text-sm">mlfiqzxyrdoqmsxiunnq</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white/60">NFC Assets Bucket</span>
                            <span className="text-green-400">✓ Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white/60">Product Files Bucket</span>
                            <span className="text-green-400">✓ Active</span>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button className="w-full px-6 py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save All Settings
                </button>
            </div>
        </div>
    );
}
