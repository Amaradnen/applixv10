import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Search, UserPlus, Filter } from 'lucide-react';

export default async function UsersPage() {
    const supabase = await createClient();

    // Fetch users with profiles
    const { data: users, error } = await supabase
        .from('profiles')
        .select('*, email:id(email)')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        console.error('Error fetching users:', error);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Users Management</h1>
                    <p className="text-white/60">Manage all platform users</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-gold text-black font-bold hover:bg-gold-light transition flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="user">User</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 font-medium text-white/80">User</th>
                            <th className="text-left p-4 font-medium text-white/80">Role</th>
                            <th className="text-left p-4 font-medium text-white/80">Joined</th>
                            <th className="text-left p-4 font-medium text-white/80">Status</th>
                            <th className="text-right p-4 font-medium text-white/80">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any) => (
                            <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div>
                                        <div className="font-medium">{user.full_name || 'Unknown'}</div>
                                        <div className="text-sm text-white/60">{user.id}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-gold/20 text-gold' :
                                            user.role === 'staff' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-white/10 text-white/80'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-white/60">
                                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400">
                                        Active
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <div className="text-white/60 text-sm">
                    Showing {users?.length || 0} users
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                        Previous
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
