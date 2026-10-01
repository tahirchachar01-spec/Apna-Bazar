'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login foundation ready! Authentication services can be plugged in the next stage.');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden shadow-elevated border border-gray-200">
        {/* Left Split: Dark Brand Side (matching reference mockup) */}
        <div className="md:col-span-5 bg-gradient-to-br from-brand-black via-[#1c140f] to-[#2b170c] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Logo & Headline */}
          <div className="space-y-6 relative z-10">
            <BrandLogo variant="dark" size="md" href="/" />

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome Back!
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Login to your account to continue
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Exclusive Deals</h4>
                  <p className="text-gray-400 text-[11px]">Just for You</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Track Your Orders</h4>
                  <p className="text-gray-400 text-[11px]">Real-time Updates</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-brown-light shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Safe & Secure</h4>
                  <p className="text-gray-400 text-[11px]">Your Data, Our Priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="pt-8 relative z-10 border-t border-white/10 text-xs text-brand-brown-light font-medium italic">
            &ldquo;Better Products, Bigger Smiles&rdquo;
          </div>

          {/* Decorative glow */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-brand-brown/20 blur-2xl pointer-events-none" />
        </div>

        {/* Right Split: Clean White Form (matching reference mockup) */}
        <div className="md:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-brand-black">Login to APNA Bazar</h3>
              <p className="text-xs text-gray-500">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                  Email or Username
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
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
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-brand-brown hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-brand font-bold text-sm bg-brand-brown hover:bg-brand-brown-hover text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase absolute">
                OR
              </span>
            </div>

            {/* Google Login button */}
            <button
              type="button"
              onClick={() => alert('Social authentication foundation ready!')}
              className="w-full py-2.5 px-4 rounded-brand border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-xs text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-brand-brown font-bold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
