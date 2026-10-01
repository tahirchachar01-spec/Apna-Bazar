'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TRUST_FEATURES } from '@/lib/constants';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'TRENDING NOW',
    title: 'Style Meets You',
    subtitle: 'Premium quality products, latest trends and unbeatable prices — all in one place.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80',
    tag: 'Better Products • Bigger Smiles',
  },
  {
    id: 2,
    badge: 'EXCLUSIVE LAUNCH',
    title: 'Precision & Luxury',
    subtitle: 'Discover our premium chronograph timepieces designed for modern sophistication.',
    buttonText: 'Explore Watches',
    buttonLink: '/category/watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80',
    tag: 'Crafted For Elegance',
  },
  {
    id: 3,
    badge: 'SPECIAL SALE',
    title: 'Up To 40% Off Deals',
    subtitle: 'Limited-time discounts across smart gadgets, perfumes, and urban apparel.',
    buttonText: 'View Deals',
    buttonLink: '/deals',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80',
    tag: 'Limited Stock Available',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const activeSlide = SLIDES[currentSlide];

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-brand-brown" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-brand-brown" />;
      case 'Award':
        return <Award className="w-5 h-5 text-brand-brown" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-brand-brown" />;
      default:
        return <Truck className="w-5 h-5 text-brand-brown" />;
    }
  };

  return (
    <section className="relative bg-[#FAF6F0] overflow-hidden border-b border-gray-200">
      {/* Hero Banner Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 z-10 space-y-5 sm:space-y-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black flex items-center gap-2">
                <span className="w-6 h-0.5 bg-brand-brown inline-block" />
                {activeSlide.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black tracking-tight leading-[1.15]">
              {activeSlide.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed font-normal">
              {activeSlide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href={activeSlide.buttonLink}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-sm sm:text-base font-semibold rounded-brand shadow-card hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <span>{activeSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-elevated border border-black/5 bg-white">
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority
                className="object-cover transition-all duration-700 hover:scale-105"
              />

              {/* Stylish Brand Tag Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200">
                <span className="text-[11px] font-bold text-brand-brown flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {activeSlide.tag}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-black shadow-md flex items-center justify-center transition-all z-20 border border-gray-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-black shadow-md flex items-center justify-center transition-all z-20 border border-gray-200"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Slide Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-brand-brown' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4 Feature Trust Badges Ribbon matching screenshot */}
      <div className="bg-white border-t border-gray-200/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="flex items-center gap-3.5 p-3 rounded-lg hover:bg-brand-cream/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-brown/10 flex items-center justify-center shrink-0">
                  {getFeatureIcon(feat.icon)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-black">{feat.title}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500">{feat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
