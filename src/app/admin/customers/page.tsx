import React from 'react';
import { getCustomers } from '@/lib/data/customers';
import { formatPrice } from '@/lib/utils';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Customers</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Registered customer directory and purchase histories
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-brand-black">{c.name}</td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <span className="block">{c.email}</span>
                    <span className="text-[11px] text-gray-400">{c.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{c.city}</td>
                  <td className="py-3.5 px-4 font-semibold text-brand-brown">{c.totalOrders} orders</td>
                  <td className="py-3.5 px-4 font-bold text-brand-black">{formatPrice(c.totalSpent)}</td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
