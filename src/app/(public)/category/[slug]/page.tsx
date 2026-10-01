import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug, getCategories } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(params.slug);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-brown">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-brand-brown">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-brand-black">{category.name}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-brand-black text-white p-8 sm:p-12 shadow-elevated">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="text-xs font-bold text-brand-brown-light uppercase tracking-wider">
              Category Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 sm:opacity-30 pointer-events-none">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          emptyMessage={`Currently no products available in ${category.name}. Check back soon!`}
        />
      </div>
    </div>
  );
}
