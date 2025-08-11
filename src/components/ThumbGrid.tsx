import type { Product } from '@/types/product';
import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface ThumbGridProps {
  items: Product[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ThumbGrid = memo(function ThumbGrid({ items, activeId, onSelect }: ThumbGridProps) {
  // Local menu-style thumbs with titles and images
  const thumbs: Array<{ title: string; image: string; productId: string }> = [
    {
      title: 'Salad Menu',
      image:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=320&q=60',
      productId: 'salad-vegetable',
    },
    {
      title: 'Burger Menu',
      image:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=320&q=60',
      productId: 'burger-double-cheese',
    },
    {
      title: 'Coffee Menu',
      image:
        'https://www.pngmart.com/files/21/Coffee-Cup-PNG-Isolated-Image.png',
      productId: 'pastry-choco',
    },
    {
      title: 'Pizza Menu',
      image:
        'https://www.pngmart.com/files/1/Pepperoni-Pizza-PNG-Transparent-Image.png',
      productId: 'pizza-marinara',
    },
  ];

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


