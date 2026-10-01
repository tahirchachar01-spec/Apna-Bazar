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
    sm: 'h-10 w-32 sm:h-11 sm:w-36',
    md: 'h-12 w-38 sm:h-14 sm:w-48 md:h-16 md:w-56',
    lg: 'h-16 w-52 sm:h-20 sm:w-64',
  };

  const content = (
    <div
      className={cn(
        'relative inline-flex items-center transition-transform hover:scale-[1.02]',
        sizeStyles[size],
        className
      )}
    >
      <Image
        src={variant === 'dark' ? '/logo-white.png' : '/logo-transparent.png'}
        alt="APNA Bazar - Shop Smarter • Live Better"
        fill
        sizes="(max-width: 768px) 180px, 260px"
        priority
        className="object-contain object-left"
      />
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center focus:outline-none">
      {content}
    </Link>
  );
}
