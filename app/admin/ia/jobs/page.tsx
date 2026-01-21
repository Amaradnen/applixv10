import { createClient } from '@/lib/supabase/server';
import { Search, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default async function IAJobsPage() {
    const supabase = await createClient();

    const { data: jobs, error } = await supabase
        .from('applix_jobs')
        .select(`
      *,
      artifacts:applix_job_artifacts(*)
    `)
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        console.error('Error fetching jobs:', error);
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'executed': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'failed': return <AlertCircle className="w-5 h-5 text-red-400" />;
            case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
            default: return <Clock className="w-5 h-5 text-white/40" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'executed': return 'bg-green-500/20 text-green-400';
            case 'failed': return 'bg-red-500/20 text-red-400';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'approved': return 'bg-blue-500/20 text-blue-400';
            default: return 'bg-white/10 text-white/80';
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">IA Jobs Viewer</h1>
                    <p className="text-white/60">Monitor n8n workflow jobs and artifacts</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search by chat ID, goal..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Interfaces</option>
                    <option value="EBOOKS">EBOOKS</option>
                    <option value="DESIGNS">DESIGNS</option>
                    <option value="CONTENT">CONTENT</option>
                </select>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="executed">Executed</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {/* Jobs Table */}
            <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 font-medium text-white/80">Job ID</th>
                            <th className="text-left p-4 font-medium text-white/80">Interface</th>
                            <th className="text-left p-4 font-medium text-white/80">Goal</th>
                            <th className="text-left p-4 font-medium text-white/80">Status</th>
                            <th className="text-left p-4 font-medium text-white/80">Parse</th>
                            <th className="text-left p-4 font-medium text-white/80">Artifacts</th>
                            <th className="text-left p-4 font-medium text-white/80">Date</th>
                            <th className="text-right p-4 font-medium text-white/80">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs?.map((job: any) => (
                            <tr key={job.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div className="font-mono text-xs text-gold">
                                        {job.id.slice(0, 8)}...
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-400">
                                        {job.interface}
                                    </span>
                                </td>
                                <td className="p-4 max-w-xs">
                                    <div className="truncate text-white/80">{job.goal || '-'}</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(job.status)}
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {job.parse_ok === true ? (
                                        <span className="text-green-400 text-xs">✓ OK</span>
                                    ) : job.parse_ok === false ? (
                                        <span className="text-red-400 text-xs">✗ Failed</span>
                                    ) : (
                                        <span className="text-white/40 text-xs">-</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className="text-white/60 text-sm">
                                        {job.artifacts?.length || 0}
                                    </span>
                                </td>
                                <td className="p-4 text-white/60 text-sm">
                                    {new Date(job.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{jobs?.filter((j: any) => j.status === 'executed').length || 0}</div>
                    <div className="text-sm text-white/60">Executed</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{jobs?.filter((j: any) => j.status === 'pending').length || 0}</div>
                    <div className="text-sm text-white/60">Pending</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{jobs?.filter((j: any) => j.parse_ok === true).length || 0}</div>
                    <div className="text-sm text-white/60">Parsed OK</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{jobs?.filter((j: any) => j.parse_ok === false).length || 0}</div>
                    <div className="text-sm text-white/60">Parse Errors</div>
                </div>
            </div>
        </div>
    );
}
