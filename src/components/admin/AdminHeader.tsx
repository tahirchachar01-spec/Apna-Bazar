'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, Menu, User, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_auth');
      localStorage.removeItem('admin_user');
      document.cookie = 'apna_admin_auth=; path=/; max-age=0';
    }
    setShowProfileMenu(false);
    router.replace('/login');
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      {/* Left side: Hamburger button on mobile + Search */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-700 hover:text-brand-brown hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Input */}
        <div className="relative w-48 sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-xs text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-brown focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-gray-500 hover:text-brand-black transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200" />

        {/* Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-brown text-white flex items-center justify-center font-bold text-xs shadow-sm">
              H
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-brand-black">Hamza</span>
              <span className="block text-[10px] text-gray-400">Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-elevated py-1 z-50 text-xs">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-brand-black">Hamza</p>
                <p className="text-gray-400 text-[11px]">Administrator</p>
              </div>
              <a
                href="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-brand-cream hover:text-brand-brown"
              >
                Store Settings
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
