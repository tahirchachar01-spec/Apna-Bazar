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
    sm: 'h-9 w-28 sm:w-32',
    md: 'h-11 w-36 sm:h-12 sm:w-44',
    lg: 'h-14 w-48 sm:h-16 sm:w-56',
  };

  const content = (
    <div
      className={cn(
        'relative inline-flex items-center transition-transform hover:scale-[1.02]',
        sizeStyles[size],
        variant === 'dark'
          ? 'bg-white rounded-xl p-1.5 shadow-sm border border-white/10'
          : '',
        className
      )}
    >
      <Image
        src="/logo.jpg"
        alt="APNA Bazar"
        fill
        sizes="(max-width: 768px) 140px, 200px"
        priority
        className="object-contain"
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
