import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types/order';
import { formatPrice } from '@/lib/utils';

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-brand-black">Recent Orders</h3>
          <p className="text-xs text-gray-400">Latest customer purchases</p>
        </div>
        <Link
          href="/admin/orders"
          className="text-xs font-semibold text-brand-brown hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 pr-4"># Order</th>
              <th className="pb-3 px-4">Customer</th>
              <th className="pb-3 px-4">Total</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-brand-brown">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-4 font-medium text-brand-black">
                  {order.customer.fullName}
                  <span className="block text-[11px] text-gray-400 font-normal">
                    {order.customer.city}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-brand-black">
                  {formatPrice(order.total)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 pl-4 text-gray-400 text-[11px]">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
