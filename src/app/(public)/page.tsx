import React from 'react';
import { Hero } from '@/components/home/Hero';
import { CategorySection } from '@/components/home/CategorySection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { DealsSection } from '@/components/home/DealsSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromotionalBanner } from '@/components/home/PromotionalBanner';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getCategories } from '@/lib/data/categories';
import { getTrendingProducts, getDeals, getFeaturedProducts } from '@/lib/data/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, trending, deals, featured] = await Promise.all([
    getCategories(),
    getTrendingProducts(),
    getDeals(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategorySection categories={categories} />
      <TrendingProducts products={trending} />
      <DealsSection products={deals} />
      <PromotionalBanner />
      <FeaturedProducts products={featured} />
      <NewsletterSection />
    </div>
  );
}
