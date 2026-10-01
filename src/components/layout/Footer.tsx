import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 pt-16 pb-8 border-t border-gray-800">
      {/* Value Badges Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
            <div className="p-3 bg-brand-brown/20 text-brand-brown-light rounded-lg">
              <Truck className="w-6 h-6 text-brand-brown-light" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Fast Express Delivery</h4>
              <p className="text-xs text-gray-400">Across Pakistan in 2-4 days</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
            <div className="p-3 bg-brand-brown/20 text-brand-brown-light rounded-lg">
              <ShieldCheck className="w-6 h-6 text-brand-brown-light" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Genuine Quality</h4>
              <p className="text-xs text-gray-400">Inspected before dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
            <div className="p-3 bg-brand-brown/20 text-brand-brown-light rounded-lg">
              <RotateCcw className="w-6 h-6 text-brand-brown-light" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">7 Days Easy Return</h4>
              <p className="text-xs text-gray-400">Hassle-free replacement policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
            <div className="p-3 bg-brand-brown/20 text-brand-brown-light rounded-lg">
              <Clock className="w-6 h-6 text-brand-brown-light" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">WhatsApp Support</h4>
              <p className="text-xs text-gray-400">Instant customer assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-14 w-52 inline-block">
              <Image
                src="/logo-white.png"
                alt="APNA Bazar"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              APNA Bazar is Pakistan&apos;s modern online destination for lifestyle, fashion, electronics, and daily essentials. Shop smarter and live better with certified quality and door-step cash on delivery.
            </p>
            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-brown-light shrink-0" />
                <span>Gulberg III, Main Boulevard, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-brown-light shrink-0" />
                <span>+92 300 1234567 (WhatsApp & Support)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-brown-light shrink-0" />
                <span>support@apnabazar.pk</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/category/fashion" className="hover:text-white transition-colors">
                  Fashion & Streetwear
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="hover:text-white transition-colors">
                  Electronics & Tech
                </Link>
              </li>
              <li>
                <Link href="/category/watches" className="hover:text-white transition-colors">
                  Luxury Watches
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="hover:text-white transition-colors">
                  Sneakers & Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="hover:text-white transition-colors">
                  Beauty & Perfumes
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-brand-brown-light font-medium hover:underline">
                  🔥 Special Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              APNA Bazar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 APNA Bazar. All rights reserved. Shop Smarter • Live Better.</p>
        <div className="flex items-center gap-4">
          <span className="bg-[#1c1c1c] px-3 py-1 rounded text-gray-400 border border-gray-800">
            Cash On Delivery (COD)
          </span>
          <span className="bg-[#1c1c1c] px-3 py-1 rounded text-gray-400 border border-gray-800">
            WhatsApp Direct Order
          </span>
        </div>
      </div>
    </footer>
  );
}
