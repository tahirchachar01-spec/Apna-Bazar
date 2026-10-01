import React from 'react';
import Link from 'next/link';
import { Truck, HelpCircle, User, Package } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-brand-black text-white text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-gray-300 font-medium">
          <Truck className="w-3.5 h-3.5 text-brand-brown-light" />
          <span>Free Delivery on Orders Over Rs. 2000 across Pakistan</span>
        </div>
        <div className="flex items-center gap-5 text-gray-300">
          <Link
            href="/track-order"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </Link>
          <div className="h-3 w-px bg-white/20" />
          <Link
            href="/login"
            className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-white"
          >
            <User className="w-3.5 h-3.5 text-brand-brown-light" />
            <span>Login / Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
