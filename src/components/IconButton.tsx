import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    PropsWithChildren {
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizeClass =
      size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12';
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          'focus-ring inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/70 backdrop-blur-md hover:bg-black/5 transition-colors',
          sizeClass,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default IconButton;


