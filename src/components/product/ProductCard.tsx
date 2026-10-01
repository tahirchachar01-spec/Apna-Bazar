'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const currentPrice = hasDiscount ? product.salePrice! : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col h-full">
      {/* Product Image and Overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream/60">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/brand/logo.jpg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto shadow-sm ${
              isWishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white/80 text-gray-600 hover:text-brand-brown hover:bg-white'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>

          {/* Sale or Out-of-Stock Badge */}
          <div className="flex flex-col gap-1 items-end">
            {isOutOfStock ? (
              <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                Out of Stock
              </span>
            ) : hasDiscount ? (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                SALE {product.discountPercentage ? `-${product.discountPercentage}%` : ''}
              </span>
            ) : null}
          </div>
        </div>

        {/* Quick View Button (hover) */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-x-4 bottom-3 bg-white/90 backdrop-blur-sm text-brand-black text-xs font-semibold py-2 rounded-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md flex items-center justify-center gap-1.5 hover:bg-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <Link
          href={`/category/${product.categorySlug}`}
          className="text-[11px] font-medium text-brand-brown hover:underline uppercase tracking-wider"
        >
          {product.category}
        </Link>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 font-semibold text-brand-black text-sm hover:text-brand-brown transition-colors line-clamp-2 leading-snug flex-grow"
        >
          {product.name}
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">({product.reviewCount})</span>
        </div>

        {/* Price Row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-brand-black">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-2">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-brand text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-brown text-white hover:bg-brand-brown-hover active:scale-[0.98]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : isOutOfStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
