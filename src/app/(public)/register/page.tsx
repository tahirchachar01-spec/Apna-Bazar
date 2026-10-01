'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration foundation ready! Profile creation logic will be connected in future stage.');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-elevated space-y-6">
        <div className="text-center space-y-3">
          <BrandLogo size="md" href="/" />
          <h2 className="text-2xl font-bold text-brand-black">Create Your Account</h2>
          <p className="text-xs text-gray-500">
            Join thousands of shoppers enjoying certified Pakistani delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Muhammad Bilal"
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
              WhatsApp / Mobile Phone
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0300 1234567"
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-brand font-bold text-sm bg-brand-brown hover:bg-brand-brown-hover text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span>Register Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-brown font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
