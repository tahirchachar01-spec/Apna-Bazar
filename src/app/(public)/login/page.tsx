'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Invalid username or password. Please try again.');
        setLoading(false);
        return;
      }

      // Success
      setSuccessMsg('Authentication successful! Opening dashboard...');
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_auth', 'authenticated');
        localStorage.setItem('admin_user', data.user?.username || 'Hamza');
        // also set cookie for client side in case
        document.cookie = `apna_admin_auth=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      }

      setTimeout(() => {
        router.push(redirectPath);
        router.refresh();
      }, 600);
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden shadow-elevated border border-gray-200">
        {/* Left Split: Brand Information */}
        <div className="md:col-span-5 bg-gradient-to-br from-brand-black via-[#1c140f] to-[#2b170c] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <BrandLogo variant="dark" size="md" href="/" />

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Secure Login
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Sign in to access your administrative dashboard and store management
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Full Dashboard Access</h4>
                  <p className="text-gray-400 text-[11px]">Orders, inventory, and status</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Live Order Tracking</h4>
                  <p className="text-gray-400 text-[11px]">Manage customer deliveries</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Direct GitHub Sync</h4>
                  <p className="text-gray-400 text-[11px]">Cloud database integration</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 relative z-10 border-t border-white/10 text-xs text-brand-brown-light font-medium italic">
            &ldquo;APNA Bazar — Store Administration Portal&rdquo;
          </div>

          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-brand-brown/20 blur-2xl pointer-events-none" />
        </div>

        {/* Right Split: Login Form */}
        <div className="md:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authentication Required</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-black">Sign In</h3>
              <p className="text-xs text-gray-500">
                Please enter your credentials to open the Admin Panel
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-brand font-bold text-sm bg-brand-brown hover:bg-brand-brown-hover text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span>Verifying credentials...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <a
                href="/"
                className="text-xs text-gray-500 hover:text-brand-brown transition-colors"
              >
                ← Back to APNA Bazar Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-brown" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
