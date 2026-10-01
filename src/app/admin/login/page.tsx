'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@apnabazar.pk');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-800 shadow-elevated space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="md" href="/admin" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Admin Portal</span>
          </div>
          <h2 className="text-xl font-bold text-brand-black mt-2">
            Sign In to Dashboard
          </h2>
          <p className="text-xs text-gray-500">
            Access inventory, orders, deals, and store settings
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Security Key / Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-brown hover:bg-brand-brown-hover text-white font-bold text-sm rounded-brand shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400">
          Demo foundation credentials pre-filled. Click Enter to access dashboard.
        </p>
      </div>
    </div>
  );
}
