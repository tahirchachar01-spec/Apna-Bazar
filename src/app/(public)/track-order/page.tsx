'use client';

import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, Loader2 } from 'lucide-react';
import { Order } from '@/types/order';
import { formatPrice } from '@/lib/utils';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setSearched(true);

    try {
      const res = await fetch('/api/orders', { cache: 'no-store' });
      if (res.ok) {
        const orders: Order[] = await res.json();
        const searchVal = orderNumber.trim().replace(/^#/, '').toLowerCase();
        const found = orders.find(
          (o) =>
            o.orderNumber.replace(/^#/, '').toLowerCase() === searchVal ||
            o.id.toLowerCase() === searchVal
        );
        setFoundOrder(found || null);
      } else {
        setFoundOrder(null);
      }
    } catch {
      setFoundOrder(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-brown/10 text-brand-brown flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-brand-black tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Enter your order reference ID (e.g. #10042) to check your package dispatch status.
          </p>
        </div>

        {/* Tracking Form */}
        <form
          onSubmit={handleTrack}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-subtle space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
                Order ID / Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. #10042"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="e.g. 03001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={searching}
            className="w-full py-3 bg-brand-brown hover:bg-brand-brown-hover text-white rounded-brand text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-60"
          >
            {searching ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{searching ? 'Checking Database...' : 'Track Status'}</span>
          </button>
        </form>

        {/* Tracking Result */}
        {searched && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-card space-y-6 animate-fadeIn">
            {foundOrder ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                  <div>
                    <span className="text-xs text-gray-400 font-medium">Order Reference</span>
                    <h3 className="text-lg font-bold text-brand-brown">
                      {foundOrder.orderNumber}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Status: {foundOrder.status}
                    </span>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-brand-black block">Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-brand-black block">Confirmed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-brand-black block">Dispatched</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mx-auto">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-gray-400 block">Delivered</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                  <p><strong>Customer:</strong> {foundOrder.customer.fullName} ({foundOrder.customer.city})</p>
                  <p><strong>Total Amount:</strong> {formatPrice(foundOrder.total)} (Cash on Delivery)</p>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500 text-xs">
                No active order found with ID &ldquo;{orderNumber}&rdquo;. (Try searching sample order: <strong>#10042</strong> or <strong>#10041</strong>).
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
