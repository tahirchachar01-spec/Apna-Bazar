'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartSummary() {
  const { subtotal } = useCart();
  const freeThreshold = 2000;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryCharges = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 200;
  const grandTotal = subtotal + deliveryCharges;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card space-y-6">
      <h3 className="text-lg font-bold text-brand-black pb-4 border-b border-gray-100">
        Order Summary
      </h3>

      {/* Free shipping progress bar */}
      <div className="bg-brand-cream/60 p-3.5 rounded-xl border border-gray-200/50 space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span>{isFreeDelivery ? '🎉 Free Delivery Unlocked!' : 'Free Delivery Goal'}</span>
          <span className="text-brand-brown font-bold">
            {isFreeDelivery
              ? 'Qualified'
              : `Add ${formatPrice(freeThreshold - subtotal)} more`}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-brown transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-black">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Charges</span>
          <span className="font-semibold">
            {deliveryCharges === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              formatPrice(deliveryCharges)
            )}
          </span>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
          <span className="text-base font-bold text-brand-black">Total</span>
          <span className="text-xl font-extrabold text-brand-brown">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <Link
          href="/checkout"
          className="w-full py-3.5 px-6 rounded-brand font-semibold text-sm bg-brand-brown hover:bg-brand-brown-hover text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/shop"
          className="w-full py-3 px-6 rounded-brand font-medium text-xs text-center block text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* Guarantee badge */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Cash on delivery available nationwide</span>
      </div>
    </div>
  );
}
