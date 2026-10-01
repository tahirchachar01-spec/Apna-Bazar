import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDeals } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { Sparkles, Plus, Edit } from 'lucide-react';

export default async function AdminDealsPage() {
  const deals = await getDeals(10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 fill-red-600" />
            <span>Flash Promotions</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Active Store Deals</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure discount campaigns and seasonal sales visible on the deals page
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Deal</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-subtle space-y-4 hover:shadow-card transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-200">
                <Image
                  src={deal.images[0] || '/logo.jpg'}
                  alt={deal.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-brand-brown uppercase">
                  {deal.category}
                </span>
                <h3 className="text-xs font-bold text-brand-black truncate mt-0.5">
                  {deal.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-extrabold text-brand-black">
                    {formatPrice(deal.salePrice || deal.price)}
                  </span>
                  {deal.salePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(deal.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">
                {deal.discountPercentage}% DISCOUNT
              </span>
              <Link
                href={`/admin/products/${deal.id}/edit`}
                className="text-xs font-semibold text-brand-brown hover:underline flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Deal</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
