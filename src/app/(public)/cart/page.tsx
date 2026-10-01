'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { ChevronRight, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-12">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-brown">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-brand-black">Shopping Cart</span>
          </nav>

          <button
            type="button"
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight">
          Your Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        {/* Layout: Cart Items on Left, Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-3">
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
