import React from 'react';
import Link from 'next/link';

interface TopProduct {
  name: string;
  sold: number;
  percentage: number;
}

const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Wireless Earbuds', sold: 32, percentage: 85 },
  { name: 'Smart Watch', sold: 28, percentage: 74 },
  { name: "Men's Shoes", sold: 25, percentage: 66 },
  { name: 'Backpack', sold: 20, percentage: 52 },
  { name: 'T-Shirt', sold: 18, percentage: 48 },
];

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

      <div className="space-y-4">
        {TOP_PRODUCTS.map((prod) => (
          <div key={prod.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-brand-black">{prod.name}</span>
              <span className="text-gray-400 font-medium">{prod.sold} sold</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${prod.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
