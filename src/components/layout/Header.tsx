'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X, Flame, Package, ChevronRight, Layers } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { DownloadAppButton } from '@/components/common/DownloadAppButton';

const CATEGORY_ITEMS = [
  { name: 'Fashion & Apparel', slug: 'fashion' },
  { name: 'Electronics & Audio', slug: 'electronics' },
  { name: 'Watches & Chronos', slug: 'watches' },
  { name: 'Shoes & Footwear', slug: 'shoes' },
  { name: 'Beauty & Fragrances', slug: 'beauty' },
  { name: 'Home & Living', slug: 'home-living' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Smart Gadgets', slug: 'gadgets' },
];

export function Header() {
  const router = useRouter();
  const { totalCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-brand-black hover:text-brand-brown hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo href="/" size="sm" className="sm:hidden" />
            <BrandLogo href="/" size="md" className="hidden sm:inline-flex" />
          </div>

          {/* Search bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4 items-center relative"
          >
            <input
              type="text"
              placeholder="Search products, brands and collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-full py-2.5 pl-5 pr-14 text-sm text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 bg-brand-brown hover:bg-brand-brown-hover text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            {/* Wishlist */}
            <Link
              href="/shop"
              className="flex flex-col items-center text-brand-black hover:text-brand-brown transition-colors group relative p-1.5"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-brand-black group-hover:text-brand-brown transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-brown text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-[10px] font-medium mt-0.5 hidden sm:block">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center text-brand-black hover:text-brand-brown transition-colors group relative p-1.5"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-black group-hover:text-brand-brown transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-brown text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              </div>
              <span className="text-[10px] font-medium mt-0.5 hidden sm:block">Cart</span>
            </Link>
            {/* Download App / APK Button */}
            <DownloadAppButton variant="header" />
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on small screens) */}
        <form onSubmit={handleSearch} className="mt-2.5 flex md:hidden relative">
          <input
            type="text"
            placeholder="Search all products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F5F7] border border-gray-200 rounded-full py-2 pl-4 pr-12 text-xs text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-brown"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3.5 bg-brand-brown text-white rounded-full flex items-center justify-center shadow-xs"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 space-y-4 pb-3 animate-fadeIn">
            {/* Primary Navigation Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-gray-50 rounded-lg text-brand-black hover:bg-brand-cream hover:text-brand-brown transition-colors text-center"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-gray-50 rounded-lg text-brand-black hover:bg-brand-cream hover:text-brand-brown transition-colors text-center"
              >
                Shop All
              </Link>
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1 font-bold col-span-2"
              >
                <Flame className="w-4 h-4 fill-red-600" />
                <span>Super Deals & Discounts</span>
              </Link>
            </div>

            {/* Categories Section */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Shop by Category</span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-gray-100 bg-gray-50/70 rounded-xl border border-gray-100 overflow-hidden">
                {CATEGORY_ITEMS.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 text-xs text-gray-700 hover:text-brand-brown hover:bg-brand-cream/40 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Support & Tracking Links */}
            <div className="space-y-1 pt-1 text-xs">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 px-2 text-gray-700 hover:text-brand-brown transition-colors"
              >
                <Package className="w-4 h-4 text-brand-brown" />
                <span>Track Your Order</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 text-gray-600 hover:text-brand-brown transition-colors"
              >
                About APNA Bazar
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 text-gray-600 hover:text-brand-brown transition-colors"
              >
                Contact & Support
              </Link>
            </div>

            {/* Download APK / Mobile App */}
            <DownloadAppButton variant="drawer" />

          </div>
        )}
      </div>
    </header>
  );
}
