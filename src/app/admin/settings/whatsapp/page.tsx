'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, MessageSquare, Info, ShieldCheck } from 'lucide-react';

export default function WhatsAppSettingsPage() {
  const [whatsapp, setWhatsapp] = useState({
    phoneNumber: '923001234567',
    isEnabled: true,
    orderMessageTemplate: `Hello APNA Bazar! I want to confirm my order *{orderNumber}*:

*Customer Details:*
Name: {customerName}
Phone: {phoneNumber}
City: {city}
Address: {address}

*Order Items:*
{itemsList}

Subtotal: {subtotal}
Delivery: {deliveryCharges}
*Grand Total: {total}*

Please confirm my order. Thank you!`,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('WhatsApp configuration foundation ready! In next stage, updates will persist to settings.json via GitHub.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="p-2 rounded-lg text-gray-500 hover:text-brand-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-0.5">
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
              <span>Direct WhatsApp Ordering</span>
            </div>
            <h1 className="text-2xl font-bold text-brand-black tracking-tight">
              WhatsApp Configuration
            </h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Phone Setting */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Order Dispatch Phone Number
          </h2>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              WhatsApp Number (International format without &apos;+&apos;) *
            </label>
            <input
              type="text"
              required
              value={whatsapp.phoneNumber}
              onChange={(e) => setWhatsapp({ ...whatsapp, phoneNumber: e.target.value })}
              placeholder="e.g. 923001234567"
              className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black font-mono focus:outline-none focus:border-brand-brown"
            />
            <p className="text-[11px] text-gray-400 mt-1.5">
              Customers will be redirected to <code>https://wa.me/{whatsapp.phoneNumber}</code> upon clicking &ldquo;Place Order on WhatsApp&rdquo;.
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={whatsapp.isEnabled}
                onChange={(e) => setWhatsapp({ ...whatsapp, isEnabled: e.target.checked })}
                className="rounded text-brand-brown"
              />
              <span>Enable WhatsApp Order Button on Checkout</span>
            </label>
          </div>
        </div>

        {/* Message Template Setting */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Custom Message Template
          </h2>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Template Text
            </label>
            <textarea
              rows={9}
              value={whatsapp.orderMessageTemplate}
              onChange={(e) =>
                setWhatsapp({ ...whatsapp, orderMessageTemplate: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs font-mono text-brand-black focus:outline-none focus:border-brand-brown resize-none leading-relaxed"
            />
          </div>

          {/* Placeholders Guide */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-brand-black">
              <Info className="w-4 h-4 text-brand-brown" />
              <span>Available Dynamic Placeholders</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 font-mono">
              <div><code>{'{orderNumber}'}</code> - Order Reference</div>
              <div><code>{'{customerName}'}</code> - Full Name</div>
              <div><code>{'{phoneNumber}'}</code> - Customer Phone</div>
              <div><code>{'{city}'}</code> - City</div>
              <div><code>{'{address}'}</code> - Street Address</div>
              <div><code>{'{itemsList}'}</code> - Items with quantities</div>
              <div><code>{'{subtotal}'}</code> - Items subtotal</div>
              <div><code>{'{deliveryCharges}'}</code> - Delivery cost</div>
              <div><code>{'{total}'}</code> - Grand total</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
