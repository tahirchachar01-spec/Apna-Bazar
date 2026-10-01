import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const variants = {
      primary:
        'bg-brand-brown text-white hover:bg-brand-brown-hover shadow-sm active:scale-[0.98]',
      secondary:
        'bg-brand-cream text-brand-black hover:bg-brand-cream-dark active:scale-[0.98]',
      outline:
        'border border-brand-brown text-brand-brown hover:bg-brand-brown/5 active:scale-[0.98]',
      ghost:
        'text-brand-black hover:bg-black/5 active:scale-[0.98]',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-md',
      md: 'px-5 py-2.5 text-sm font-medium rounded-brand',
      lg: 'px-7 py-3 text-base font-semibold rounded-brand',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
