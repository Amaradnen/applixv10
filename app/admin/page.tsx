import { createClient } from '@/lib/supabase/server';
import { Users, ShoppingBag, Briefcase, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch stats
  const [usersCount, ordersCount, jobsCount, revenueData] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('applix_jobs').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('status', 'paid'),
  ]);

  const totalRevenue = revenueData.data?.reduce((sum, order) => sum + parseFloat(order.total || '0'), 0) || 0;

  const stats = [
    {
      label: 'Total Users',
      value: usersCount.count || 0,
      icon: Users,
      color: 'text-blue-400',
    },
    {
      label: 'Total Orders',
      value: ordersCount.count || 0,
      icon: ShoppingBag,
      color: 'text-green-400',
    },
    {
      label: 'IA Jobs',
      value: jobsCount.count || 0,
      icon: Briefcase,
      color: 'text-purple-400',
    },
    {
      label: 'Revenue',
      value: `€${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-gold',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60">Overview of your APPLIX platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="text-white/60">Activity feed will appear here...</div>
      </div>
    </div>
  );
}
