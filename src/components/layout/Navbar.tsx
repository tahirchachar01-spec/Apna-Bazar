'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

const QUICK_CATEGORIES = [
  { name: 'Fashion & Apparel', slug: 'fashion' },
  { name: 'Electronics & Audio', slug: 'electronics' },
  { name: 'Watches & Chronos', slug: 'watches' },
  { name: 'Shoes & Footwear', slug: 'shoes' },
  { name: 'Beauty & Fragrances', slug: 'beauty' },
  { name: 'Home & Living', slug: 'home-living' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Smart Gadgets', slug: 'gadgets' },
];

export function Navbar() {
  const pathname = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 hidden lg:block relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* All Categories Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                className="bg-brand-brown hover:bg-brand-brown-hover text-white text-sm font-semibold px-5 py-3 rounded-t-md flex items-center gap-3 transition-colors shadow-sm"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className="w-4 h-4 ml-2 opacity-80" />
              </button>

              {/* Dropdown Menu */}
              {categoriesOpen && (
                <div
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-elevated rounded-b-xl py-2 z-50 animate-fadeIn"
                >
                  {QUICK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-brown transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-gray-300 text-xs">→</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1 px-4 py-2">
                    <Link
                      href="/shop"
                      onClick={() => setCategoriesOpen(false)}
                      className="text-xs font-semibold text-brand-brown hover:underline block"
                    >
                      View All Products catalog →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium py-3 border-b-2 transition-colors relative flex items-center gap-1.5 ${
                      isActive
                        ? 'text-brand-brown border-brand-brown font-semibold'
                        : 'text-brand-black border-transparent hover:text-brand-brown'
                    }`}
                  >
                    {link.name === 'Deals' && (
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Cash on Delivery Available
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
