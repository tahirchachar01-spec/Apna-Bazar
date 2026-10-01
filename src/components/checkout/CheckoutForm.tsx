'use client';

import React from 'react';
import { CustomerDetails } from '@/types/order';
import { PAKISTAN_CITIES } from '@/lib/constants';

interface CheckoutFormProps {
  details: CustomerDetails;
  onChange: (details: CustomerDetails) => void;
}

export function CheckoutForm({ details, onChange }: CheckoutFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-black">Shipping Details</h2>
        <p className="text-xs text-gray-500 mt-1">
          Please provide your accurate contact and delivery information for Pakistani courier dispatch.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={details.fullName}
            onChange={handleChange}
            placeholder="e.g. Muhammad Ali"
            className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5"
          >
            WhatsApp / Mobile Phone *
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={details.phoneNumber}
            onChange={handleChange}
            placeholder="e.g. 0300 1234567"
            className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
          />
          <span className="text-[11px] text-gray-400 mt-1 block">
            Used for WhatsApp order confirmation and courier tracking.
          </span>
        </div>

        {/* City Dropdown */}
        <div>
          <label
            htmlFor="city"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5"
          >
            City *
          </label>
          <select
            id="city"
            name="city"
            required
            value={details.city}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown bg-white"
          >
            <option value="">Select your city...</option>
            {PAKISTAN_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5"
          >
            Complete Street Address *
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={details.address}
            onChange={handleChange}
            placeholder="House #, Street #, Sector / Area, Landmark"
            className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5"
          >
            Delivery Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={details.notes || ''}
            onChange={handleChange}
            placeholder="Special instructions for the delivery rider (e.g. Call before arriving)"
            className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown resize-none"
          />
        </div>
      </div>
    </div>
  );
}
