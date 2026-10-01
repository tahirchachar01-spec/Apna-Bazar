'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Header() {
  const router = useRouter();
  const { totalCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-black hover:text-brand-brown"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <BrandLogo href="/" size="md" />

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4 items-center relative"
          >
            <input
              type="text"
              placeholder="Search for products, brands and more..."
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
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Wishlist */}
            <Link
              href="/shop"
              className="flex flex-col items-center text-brand-black hover:text-brand-brown transition-colors group relative"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-brand-black group-hover:text-brand-brown transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-brown text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-[11px] font-medium mt-1 hidden sm:block">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center text-brand-black hover:text-brand-brown transition-colors group relative"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-black group-hover:text-brand-brown transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-brown text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              </div>
              <span className="text-[11px] font-medium mt-1 hidden sm:block">Cart</span>
            </Link>

            {/* Account */}
            <Link
              href="/login"
              className="flex flex-col items-center text-brand-black hover:text-brand-brown transition-colors group"
            >
              <User className="w-5 h-5 text-brand-black group-hover:text-brand-brown transition-colors" />
              <span className="text-[11px] font-medium mt-1 hidden sm:block">Account</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="mt-3 flex md:hidden relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F5F7] border border-gray-200 rounded-full py-2 pl-4 pr-12 text-sm text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-brown"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-brand-brown text-white rounded-full flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 space-y-2 pb-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-brand-black hover:text-brand-brown"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-brand-black hover:text-brand-brown"
            >
              Shop All
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              ⚡ Super Deals
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-brand-black hover:text-brand-brown"
            >
              About APNA Bazar
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-brand-black hover:text-brand-brown"
            >
              Contact
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-brand-black hover:text-brand-brown"
            >
              Track Order
            </Link>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <Link href="/admin/login" className="text-brand-brown font-medium">
                Admin Portal →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
