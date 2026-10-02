import React from 'react';
import { getDeals } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Sparkles, Flame, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  const dealProducts = await getDeals(12);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Deals Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-black via-[#23150D] to-brand-brown text-white p-8 sm:p-12 shadow-elevated">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Mega Discounts</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Exclusive Super Deals
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed">
              Save up to 30% on premium lifestyle accessories, smart technology, and streetwear. Available with Cash on Delivery nationwide.
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-black">Hot Selling Prices</h4>
              <p className="text-[11px] text-gray-400">Guaranteed lowest verified rates</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-black">Limited Stock</h4>
              <p className="text-[11px] text-gray-400">Flash deals restocked weekly</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-black">100% Original</h4>
              <p className="text-[11px] text-gray-400">Quality tested and certified</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={dealProducts}
          emptyMessage="No deals currently available. Check back soon for exciting flash sales!"
        />
      </div>
    </div>
  );
}
