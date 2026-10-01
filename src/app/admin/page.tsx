import React from 'react';
import { StatCard } from '@/components/admin/StatCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { RecentOrdersTable } from '@/components/admin/RecentOrdersTable';
import { TopSellingList } from '@/components/admin/TopSellingList';
import { getRecentOrders } from '@/lib/data/orders';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

export default async function AdminDashboardPage() {
  const recentOrders = await getRecentOrders(5);

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div>
        <h1 className="text-2xl font-bold text-brand-black tracking-tight">Dashboard</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* 4 Stat Cards matching mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Sales"
          value="Rs. 245,780"
          trend="↑ 12%"
          subtitle="vs last week"
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
        />

        <StatCard
          title="Total Orders"
          value="142"
          trend="↑ 8%"
          subtitle="vs last week"
          icon={<ShoppingBag className="w-5 h-5 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />

        <StatCard
          title="Total Customers"
          value="98"
          trend="↑ 15%"
          subtitle="vs last week"
          icon={<Users className="w-5 h-5 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />

        <StatCard
          title="Total Products"
          value="356"
          trend="↑ 5%"
          subtitle="active products"
          icon={<Package className="w-5 h-5 text-orange-600" />}
          iconBgColor="bg-orange-50"
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Recent Orders and Top Selling Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={recentOrders} />
        </div>
        <div>
          <TopSellingList />
        </div>
      </div>
    </div>
  );
}
