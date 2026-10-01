import React from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';

export function TopSellingList() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-brand-black">Top Selling Products</h3>
          <p className="text-xs text-gray-400">By units sold this month</p>
        </div>
        <Link
          href="/admin/products"
          className="text-xs font-semibold text-brand-brown hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-1">
          <Package className="w-5 h-5" />
        </div>
        <p className="text-xs font-bold text-brand-black">0 Products Sold</p>
        <p className="text-[11px] text-gray-400 max-w-[200px]">
          All metrics cleared. Once customer orders are placed, top selling items will appear here.
        </p>
      </div>
    </div>
  );
}
