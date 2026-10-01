'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CustomerDetails, OrderItem, Order } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { MessageSquare, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import defaultSettings from '@/data/settings.json';
import { generateWhatsAppOrderUrl } from '@/lib/whatsapp';

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  deliveryCharges: number;
  total: number;
  customer: CustomerDetails;
}

export function OrderSummary({
  items,
  subtotal,
  deliveryCharges,
  total,
  customer,
}: OrderSummaryProps) {
  const { clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phoneNumber || !customer.address || !customer.city) {
      alert('Please fill in all required shipping fields (Full Name, Phone, Address, City) before placing the order.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const tempOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderNumber: tempOrderNumber,
      customer,
      items,
      subtotal,
      deliveryCharges,
      total,
      status: 'Pending',
    };

    try {
      // 1. Save order into GitHub Database / JSON DB
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      const savedOrder: Order = res.ok && data.order ? data.order : {
        ...orderPayload,
        id: `ord_${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      setPlacedOrder(savedOrder);
      clearCart();

      // 2. Open WhatsApp in new tab with complete order details
      try {
        const whatsappUrl = generateWhatsAppOrderUrl(savedOrder, defaultSettings);
        window.open(whatsappUrl, '_blank');
      } catch (err) {
        console.warn('Could not launch WhatsApp window:', err);
      }
    } catch {
      setError('Could not process order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card space-y-6">
      <h3 className="text-lg font-bold text-brand-black pb-4 border-b border-gray-100">
        Review Your Order
      </h3>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-100">
              <Image
                src={item.productImage || '/logo.jpg'}
                alt={item.productName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-brand-black truncate">
                {item.productName}
              </h4>
              <p className="text-[11px] text-gray-500">
                Qty: {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <span className="text-xs font-bold text-brand-black">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="pt-4 border-t border-gray-100 space-y-2.5 text-sm">
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
          <span className="text-base font-bold text-brand-black">Grand Total</span>
          <span className="text-xl font-extrabold text-brand-brown">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* WhatsApp Order Action */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={submitting}
          className="w-full py-4 px-6 rounded-brand font-bold text-sm bg-brand-brown hover:bg-brand-brown-hover text-white flex items-center justify-center gap-2.5 shadow-card transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 fill-white" />
          )}
          <span>{submitting ? 'Placing Order...' : 'Place Order on WhatsApp'}</span>
        </button>
        <p className="text-center text-[11px] text-gray-500">
          Payment method: <strong>Cash on Delivery (COD)</strong>
        </p>
      </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Certified Pakistani Delivery Network</span>
      </div>

      {/* Order Confirmed Modal */}
      {placedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-elevated">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-lg font-bold text-brand-black">Order Placed Successfully!</h4>
              <p className="text-xs text-emerald-700 font-semibold font-mono">
                Order #{placedOrder.orderNumber}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mt-2">
                Thank you, <strong>{placedOrder.customer.fullName}</strong>. Your order is recorded in the store database and forwarded to WhatsApp for dispatch confirmation.
              </p>
            </div>
            <div className="p-3 bg-brand-cream/60 rounded-xl text-xs space-y-1 text-gray-700 border border-brand-brown/10">
              <p><strong>Destination:</strong> {placedOrder.customer.address}, {placedOrder.customer.city}</p>
              <p><strong>Payment:</strong> Cash on Delivery ({formatPrice(placedOrder.total)})</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const whatsappUrl = generateWhatsAppOrderUrl(placedOrder, defaultSettings);
                  window.open(whatsappUrl, '_blank');
                }}
                className="flex-1 py-2.5 bg-brand-brown text-white rounded-brand text-xs font-semibold hover:bg-brand-brown-hover transition-colors"
              >
                Open WhatsApp Again
              </button>
              <button
                onClick={() => setPlacedOrder(null)}
                className="py-2.5 px-4 bg-gray-100 text-gray-700 rounded-brand text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
