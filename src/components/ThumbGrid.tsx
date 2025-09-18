import type { Product } from '@/types/product';
import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface ThumbGridProps {
  items: Product[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ThumbGrid = memo(function ThumbGrid({ items, activeId, onSelect }: ThumbGridProps) {
  const thumbs = items.map((p) => ({ title: p.title, image: p.imageMain, productId: p.id }));

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {thumbs.map((t) => {
        const isActive = items.some((p) => p.id === activeId && p.id === t.productId);
        return (
          <div key={t.title} className="flex flex-col items-center">
            <button
              onClick={() => onSelect(t.productId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(t.productId);
              }}
              aria-label={t.title}
              className={cn(
                'focus-ring h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border border-white/70 shadow-sm transition-transform hover:scale-[1.03]',
                isActive && 'ring-2 ring-neutral-900/40'
              )}
            >
              <img src={t.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
            <span className="mt-2 line-clamp-1 text-center text-xs md:text-sm font-normal text-black">
              {t.title}
            </span>
          </div>
        );
      })}
    </div>
  );
});

export default ThumbGrid;


