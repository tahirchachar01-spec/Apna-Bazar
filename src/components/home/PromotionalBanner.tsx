import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function PromotionalBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-black via-[#23150D] to-brand-brown p-8 sm:p-12 lg:p-16 text-white shadow-elevated">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-brown-light text-xs font-semibold backdrop-blur-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
              Special Seasonal Promo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Upgrade Your Everyday Essentials
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Get express dispatch on your favorite hoodies, luxury watches, and smart gadgets. Cash on delivery guaranteed across all cities.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 bg-brand-brown hover:bg-brand-brown-hover text-white text-sm font-semibold rounded-brand transition-all shadow-md active:scale-95"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Abstract background graphics */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-brand-brown/30 blur-3xl pointer-events-none" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:block opacity-10 pointer-events-none">
            <span className="text-9xl font-extrabold tracking-tighter text-white">APNA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
