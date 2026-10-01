'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Zap, Truck, ShieldCheck, Check, Minus, Plus } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const currentPrice = hasDiscount ? product.salePrice! : product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="space-y-6">
      {/* Category and SKU */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-semibold text-brand-brown uppercase tracking-wider">
          {product.category}
        </span>
        <span>SKU: {product.sku}</span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-black leading-snug">
        {product.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center gap-2">
        <div className="flex items-center text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200 fill-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-brand-black">{product.rating}</span>
        <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
      </div>

      {/* Price & Savings */}
      <div className="p-4 bg-brand-cream/60 rounded-xl border border-gray-200/60 flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-brand-black">
          {formatPrice(currentPrice)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-base text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
              Save {product.discountPercentage}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOutOfStock ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'
          }`}
        />
        <span className={isOutOfStock ? 'text-red-600' : 'text-emerald-700'}>
          {isOutOfStock ? 'Currently Out of Stock' : `In Stock (${product.stock} units available)`}
        </span>
      </div>

      {/* Quantity Selector & Action Buttons */}
      {!isOutOfStock && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-brand bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-sm font-semibold text-brand-black min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2.5 text-gray-600 hover:text-brand-black hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-3.5 px-6 rounded-brand font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-brown text-white hover:bg-brand-brown-hover'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="py-3.5 px-6 rounded-brand font-semibold text-sm bg-brand-black text-white hover:bg-[#222] flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
          Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-3">
            Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {product.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="text-gray-500 font-medium">{spec.label}:</span>
                <span className="text-brand-black font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery and Guarantee Badges */}
      <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-brand-cream/50">
          <Truck className="w-4 h-4 text-brand-brown shrink-0" />
          <span>Cash on Delivery across Pakistan (2-4 days)</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-brand-cream/50">
          <ShieldCheck className="w-4 h-4 text-brand-brown shrink-0" />
          <span>7-Day Replacement Guarantee</span>
        </div>
      </div>
    </div>
  );
}
