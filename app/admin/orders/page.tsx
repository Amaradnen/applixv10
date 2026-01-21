import { createClient } from '@/lib/supabase/server';
import { Search, Package, Filter } from 'lucide-react';

export default async function OrdersPage() {
    const supabase = await createClient();

    // Fetch orders with user info
    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
      *,
      user:user_id(id, full_name),
      items:order_items(*)
    `)
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        console.error('Error fetching orders:', error);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-500/20 text-green-400';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400';
            case 'shipped': return 'bg-blue-500/20 text-blue-400';
            case 'refunded': return 'bg-red-500/20 text-red-400';
            case 'cancelled': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-white/10 text-white/80';
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
                    <p className="text-white/60">Manage all customer orders</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search by order ID or email..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none transition">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 font-medium text-white/80">Order ID</th>
                            <th className="text-left p-4 font-medium text-white/80">Customer</th>
                            <th className="text-left p-4 font-medium text-white/80">Items</th>
                            <th className="text-left p-4 font-medium text-white/80">Total</th>
                            <th className="text-left p-4 font-medium text-white/80">Status</th>
                            <th className="text-left p-4 font-medium text-white/80">Date</th>
                            <th className="text-right p-4 font-medium text-white/80">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order: any) => (
                            <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div className="font-mono text-sm text-gold">
                                        #{order.id.slice(0, 8)}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div>
                                        <div className="font-medium">{order.user?.full_name || 'Guest'}</div>
                                        <div className="text-sm text-white/60">{order.shipping_address?.email || '-'}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1 text-white/60">
                                        <Package className="w-4 h-4" />
                                        <span>{order.items?.length || 0} items</span>
                                    </div>
                                </td>
                                <td className="p-4 font-bold">
                                    €{parseFloat(order.total).toFixed(2)}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-white/60">
                                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <div className="text-white/60 text-sm">
                    Showing {orders?.length || 0} orders
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
