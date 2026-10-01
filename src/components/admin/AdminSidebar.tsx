'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Percent,
  Settings,
  LogOut,
  Sliders,
  ExternalLink,
} from 'lucide-react';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag, badge: '5' },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Deals', href: '/admin/deals', icon: Percent },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'WhatsApp Config', href: '/admin/settings/whatsapp', icon: Sliders },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-black text-white flex flex-col shrink-0 min-h-screen border-r border-gray-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        <BrandLogo variant="dark" size="sm" href="/admin" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {ADMIN_LINKS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-brand text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-brown text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Public Store</span>
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-white/5 rounded-brand transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
