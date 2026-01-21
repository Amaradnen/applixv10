import { createClient } from '@/lib/supabase/server';
import { Search, PlayCircle, AlertCircle } from 'lucide-react';

export default async function WorkflowsPage() {
    const supabase = await createClient();

    const { data: workflows, error } = await supabase
        .from('workflow_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        console.error('Error fetching workflows:', error);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-500/20 text-green-400';
            case 'running': return 'bg-blue-500/20 text-blue-400';
            case 'failed': return 'bg-red-500/20 text-red-400';
            default: return 'bg-white/10 text-white/80';
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Workflow Logs</h1>
                    <p className="text-white/60">Monitor n8n workflow executions</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search by workflow name..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Status</option>
                    <option value="running">Running</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {/* Workflows Table */}
            <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 font-medium text-white/80">Execution ID</th>
                            <th className="text-left p-4 font-medium text-white/80">Workflow</th>
                            <th className="text-left p-4 font-medium text-white/80">Status</th>
                            <th className="text-left p-4 font-medium text-white/80">Started</th>
                            <th className="text-left p-4 font-medium text-white/80">Duration</th>
                            <th className="text-right p-4 font-medium text-white/80">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workflows?.map((workflow: any) => {
                            const duration = workflow.finished_at && workflow.started_at
                                ? Math.round((new Date(workflow.finished_at).getTime() - new Date(workflow.started_at).getTime()) / 1000)
                                : null;

                            return (
                                <tr key={workflow.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                    <td className="p-4">
                                        <div className="font-mono text-xs text-gold">
                                            {workflow.execution_id || workflow.id.slice(0, 8)}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <PlayCircle className="w-4 h-4 text-purple-400" />
                                            <span>{workflow.workflow_name || workflow.workflow_id || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(workflow.status)}`}>
                                            {workflow.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white/60 text-sm">
                                        {workflow.started_at ? new Date(workflow.started_at).toLocaleString('fr-FR') : '-'}
                                    </td>
                                    <td className="p-4 text-white/60 text-sm">
                                        {duration ? `${duration}s` : '-'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {workflows?.length === 0 && (
                <div className="text-center py-12 text-white/60">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-white/40" />
                    <p>No workflow executions found</p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{workflows?.filter((w: any) => w.status === 'success').length || 0}</div>
                    <div className="text-sm text-white/60">Successful</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{workflows?.filter((w: any) => w.status === 'running').length || 0}</div>
                    <div className="text-sm text-white/60">Running</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold mb-1">{workflows?.filter((w: any) => w.status === 'failed').length || 0}</div>
                    <div className="text-sm text-white/60">Failed</div>
                </div>
            </div>
        </div>
    );
}
