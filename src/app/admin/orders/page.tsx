import React from 'react';
import { getOrders } from '@/lib/data/orders';
import { formatPrice } from '@/lib/utils';
import { Search, Eye } from 'lucide-react';

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Customer Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Track, process, and fulfill customer requests across Pakistan
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone / City</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-brown">{o.orderNumber}</td>
                  <td className="py-3.5 px-4 font-semibold text-brand-black">{o.customer.fullName}</td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span>{o.customer.phoneNumber}</span>
                    <span className="block text-[11px] text-gray-400">{o.customer.city}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} items
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-black">{formatPrice(o.total)}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-brand-brown" title="View details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
