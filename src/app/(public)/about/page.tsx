import React from 'react';
import Image from 'next/image';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Award, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <BrandLogo size="lg" href="/" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight mt-2">
            About APNA Bazar
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to APNA Bazar. Founded with a vision to modernize online shopping across Pakistan, we bring you premium curated lifestyle goods, authentic timepieces, trendsetting streetwear, and innovative smart gadgets.
          </p>
        </div>

        {/* Brand Mission */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-card space-y-6">
          <h2 className="text-2xl font-bold text-brand-black">Our Mission: Shop Smarter • Live Better</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            In an era of endless options, Pakistani customers deserve an e-commerce platform that emphasizes quality over clutter. Every single product in our catalog undergoes rigorous quality checks before being dispatched from our fulfillment hub in Lahore.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Whether you are ordering in Karachi, Islamabad, Peshawar, or any remote district across Pakistan, our seamless cash-on-delivery and direct WhatsApp service ensures an effortless, trustworthy experience.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-black">Curated Quality</h3>
              <p className="text-xs text-gray-500 mt-1">
                We handpick products that match global aesthetics with durable performance.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-black">Nationwide Reach</h3>
              <p className="text-xs text-gray-500 mt-1">
                Swift dispatch with reliable courier partners across all 4 provinces.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-black">Customer Priority</h3>
              <p className="text-xs text-gray-500 mt-1">
                Dedicated WhatsApp human support to help you before, during, and after your order.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-black">Safe Shopping</h3>
              <p className="text-xs text-gray-500 mt-1">
                Pay on delivery with peace of mind. Easy 7-day replacement policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
