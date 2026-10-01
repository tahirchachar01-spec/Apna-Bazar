import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/category';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section id="categories" className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
              Explore Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-brand-brown hover:text-brand-brown-hover flex items-center gap-1.5 mt-2 sm:mt-0 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-brand-cream transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {/* Image Circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-brand-cream/80 border-2 border-brand-brown/10 group-hover:border-brand-brown transition-all shadow-subtle group-hover:shadow-md mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="100px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title & Count */}
              <h3 className="text-xs sm:text-sm font-semibold text-brand-black group-hover:text-brand-brown transition-colors">
                {category.name}
              </h3>
              {category.productCount && (
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {category.productCount} Items
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
