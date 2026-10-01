import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="text-center py-20 px-4 max-w-md mx-auto space-y-5">
      <div className="w-20 h-20 rounded-full bg-brand-cream text-brand-brown mx-auto flex items-center justify-center border border-gray-200 shadow-subtle">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-brand-black">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-gray-500">
          Looks like you haven&apos;t added any items to your cart yet. Explore our trending products and super deals today!
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-sm font-semibold rounded-brand shadow-card transition-all active:scale-[0.98]"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
