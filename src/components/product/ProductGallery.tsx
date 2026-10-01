'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/logo.jpg');

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail column */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-brand-cream/50 ${
              selectedImage === img ? 'border-brand-brown shadow-sm' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-cream/40 border border-gray-100 shadow-subtle flex-1">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
      </div>
    </div>
  );
}
