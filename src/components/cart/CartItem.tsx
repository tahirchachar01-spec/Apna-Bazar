'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { OrderItem } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: OrderItem;
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-subtle">
      {/* Product Image and Details */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-100">
          <Image
            src={item.productImage || '/logo.jpg'}
            alt={item.productName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-brand-black line-clamp-1">
            {item.productName}
          </h3>
          <p className="text-xs text-brand-brown font-medium mt-0.5">
            {formatPrice(item.price)} each
          </p>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="p-2 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-brand-black min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="p-2 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[5rem]">
          <span className="text-sm font-bold text-brand-black block">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeFromCart(item.productId)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
