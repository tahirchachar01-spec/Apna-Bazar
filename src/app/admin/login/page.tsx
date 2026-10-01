'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasAuth =
        localStorage.getItem('admin_auth') === 'authenticated' ||
        document.cookie.includes('apna_admin_auth=authenticated');
      if (hasAuth) {
        router.replace('/admin');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
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

      // Successful login
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_auth', 'authenticated');
        localStorage.setItem('admin_user', data.user?.username || 'Hamza');
        document.cookie = `apna_admin_auth=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg('Failed to connect to authentication service.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-800 shadow-elevated space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="md" href="/" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Admin Portal</span>
          </div>
          <h2 className="text-xl font-bold text-brand-black mt-2">
            Sign In to Dashboard
          </h2>
          <p className="text-xs text-gray-500">
            Enter authorized credentials to access admin dashboard
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                autoFocus
              />
            </div>
          </div>

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
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-brown hover:bg-brand-brown-hover text-white font-bold text-sm rounded-brand shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.98] disabled:opacity-75 cursor-pointer"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400">
          Secure admin authentication required to continue.
        </p>
      </div>
    </div>
  );
}
