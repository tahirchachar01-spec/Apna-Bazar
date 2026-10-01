import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Star, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-14 sm:py-16 bg-brand-cream/30 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-brown uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-brand-brown text-brand-brown" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Top-rated selections verified for quality, design, and longevity.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-brand-brown hover:text-brand-brown-hover flex items-center gap-1.5 mt-3 sm:mt-0 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
