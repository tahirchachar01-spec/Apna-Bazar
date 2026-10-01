import React from 'react';
import Link from 'next/link';
import { getProducts, searchProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Filter } from 'lucide-react';

interface ShopPageProps {
  searchParams: { q?: string; category?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = searchParams.q || '';
  const selectedCat = searchParams.category || '';

  let products = await getProducts();
  const categories = await getCategories();

  if (query) {
    products = await searchProducts(query);
  }

  if (selectedCat) {
    products = products.filter(
      (p) => p.categorySlug.toLowerCase() === selectedCat.toLowerCase()
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-gray-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
              Explore Our Store
            </span>
            <h1 className="text-3xl font-bold text-brand-black tracking-tight mt-1">
              {query
                ? `Search results for "${query}"`
                : selectedCat
                ? `Category: ${categories.find((c) => c.slug === selectedCat)?.name || selectedCat}`
                : 'All Products'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Showing {products.length} {products.length === 1 ? 'item' : 'items'} ready for fast cash on delivery.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Link
              href="/shop"
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                !selectedCat
                  ? 'bg-brand-brown text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCat === c.slug
                    ? 'bg-brand-brown text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          emptyMessage={
            query
              ? `No products matched your search "${query}". Try another search term.`
              : 'No products found in this category.'
          }
        />
      </div>
    </div>
  );
}
