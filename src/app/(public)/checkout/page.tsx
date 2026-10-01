'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CustomerDetails } from '@/types/order';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-12">
        <EmptyCart />
      </div>
    );
  }

  const freeThreshold = 2000;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryCharges = isFreeDelivery ? 0 : 200;
  const grandTotal = subtotal + deliveryCharges;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-brown">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/cart" className="hover:text-brand-brown">
              Cart
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-brand-black">Checkout</span>
          </nav>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-xs text-brand-brown font-medium hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Complete your shipping details to place your order via WhatsApp with Cash on Delivery.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm details={customer} onChange={setCustomer} />
          </div>

          <div className="lg:col-span-5 sticky top-24">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryCharges={deliveryCharges}
              total={grandTotal}
              customer={customer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
