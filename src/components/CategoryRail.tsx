import { cn } from '@/lib/utils';
import { memo } from 'react';

export interface CategoryRailProps {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}

export const CategoryRail = memo(function CategoryRail({
  categories,
  active,
  onSelect,
}: CategoryRailProps) {
  return (
    <aside className="select-none">
      <div aria-label="Menu" className="mb-4 text-left text-xl z-[999] font-semibold ">Menu</div>
      <ul className="flex flex-col items-start gap-3 text-sm" role="listbox" aria-activedescendant={active}>
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <li key={c} id={c}>
              <button
                onClick={() => onSelect(c)}
                className={cn(
                  'focus-ring group relative inline-flex w-full items-center justify-start gap-2 rounded px-1 py-1 text-left transition-colors',
                  isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                )}
                aria-selected={isActive}
                role="option"
              >
                <span className="relative">
                  {c}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-[2px] w-0 bg-neutral-900 transition-all duration-300',
                      'group-hover:w-full',
                      isActive && 'w-full'
                    )}
                    aria-hidden
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
});

export default CategoryRail;


