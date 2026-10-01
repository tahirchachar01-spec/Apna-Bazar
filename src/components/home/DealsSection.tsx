import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Sparkles, ArrowRight } from 'lucide-react';

interface DealsSectionProps {
  products: Product[];
}

export function DealsSection({ products }: DealsSectionProps) {
  return (
    <section className="py-14 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card Header */}
        <div className="bg-gradient-to-r from-brand-black via-[#1f1611] to-brand-brown rounded-2xl p-6 sm:p-8 mb-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Limited Time Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hot Deals & Discounts
            </h2>
            <p className="text-sm text-gray-300 max-w-md">
              Grab up to 25% off on top-selling tech, watches, and designer fragrances.
            </p>
          </div>
          <Link
            href="/deals"
            className="px-6 py-3 bg-white text-brand-black hover:bg-brand-cream text-xs sm:text-sm font-bold rounded-brand transition-all shrink-0 flex items-center gap-2 shadow-md"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4 text-brand-brown" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
