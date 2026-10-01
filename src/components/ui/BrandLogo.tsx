import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({
  className,
  variant = 'light',
  href = '/',
  size = 'md',
}: BrandLogoProps) {
  const sizeStyles = {
    sm: 'h-9 w-32',
    md: 'h-12 w-44 sm:h-14 sm:w-52',
    lg: 'h-16 w-60 sm:h-20 sm:w-72',
  };

  const content = (
    <div
      className={cn(
        'relative inline-flex items-center transition-opacity hover:opacity-95',
        sizeStyles[size],
        variant === 'dark' && 'bg-white/95 rounded-lg px-2.5 py-1.5 shadow-sm',
        className
      )}
    >
      <Image
        src="/logo.jpg"
        alt="APNA Bazar - Shop Smarter • Live Better"
        fill
        sizes="(max-width: 768px) 180px, 240px"
        priority
        className="object-contain object-left"
      />
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
