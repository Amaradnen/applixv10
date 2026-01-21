import { createClient } from '@/lib/supabase/server';
import { Search, Plus, Eye } from 'lucide-react';

export default async function NFCTemplatesPage() {
    const supabase = await createClient();

    const { data: templates, error } = await supabase
        .from('nfc_templates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching templates:', error);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">NFC Templates</h1>
                    <p className="text-white/60">Manage card templates (Recto/Verso/Signature)</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Template
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Categories</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                    <option value="event">Event</option>
                </select>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates?.map((template: any) => (
                    <div key={template.id} className="glass-card rounded-xl p-6 hover:border-gold/50 transition-all">
                        {/* Preview */}
                        <div className="aspect-video bg-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-white/10">
                            {template.preview_url ? (
                                <img src={template.preview_url} alt={template.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-white/40 text-sm">No preview</div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="mb-4">
                            <h3 className="font-bold mb-1">{template.name}</h3>
                            <p className="text-sm text-white/60">{template.category || 'Uncategorized'}</p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${template.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                }`}>
                                {template.active ? 'Active' : 'Inactive'}
                            </span>
                            <span className="text-xs text-white/40">
                                {new Date(template.created_at).toLocaleDateString('fr-FR')}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition flex items-center justify-center gap-1">
                                <Eye className="w-4 h-4" />
                                Preview
                            </button>
                            <button className="flex-1 px-3 py-2 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold text-sm transition">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {templates?.length === 0 && (
                <div className="text-center py-12 text-white/60">
                    <p>No templates found. Create your first template!</p>
                </div>
            )}
        </div>
    );
}
