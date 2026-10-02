import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getProducts } from '@/lib/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ChevronRight } from 'lucide-react';

interface ProductDetailPageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, 4);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-brown">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-brand-brown">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-brand-brown"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-brand-black truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Details Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-card">
          {/* Left Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Product Details & Actions */}
          <div className="lg:col-span-6">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                Similar Items
              </span>
              <h2 className="text-2xl font-bold text-brand-black tracking-tight mt-1">
                You May Also Like
              </h2>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
