import type { Product } from '@/types/product';
import { memo, useMemo } from 'react';
import { BadgeCheck, Layers, Ruler, Sparkles, Square, Package } from 'lucide-react';

export interface TileInfoCardProps {
  product: Product;
}

export const TileInfoCard = memo(function TileInfoCard({ product }: TileInfoCardProps) {
  const parsed = useMemo(() => {
    const title = product.title.toLowerCase();
    const sizeMatch = title.match(/(\d{3,4})\s*[x×]\s*(\d{3,4})/i);
    const size = sizeMatch ? `${sizeMatch[1]}×${sizeMatch[2]} mm` : '—';
    const finish = title.includes('matte')
      ? 'Matte'
      : title.includes('polished')
      ? 'Polished'
      : title.includes('textured')
      ? 'Textured'
      : '—';
    const material = product.category === 'Marble' || title.includes('marble') ? 'Marble' : 'Porcelain/Vitrified';
    const thickness = material === 'Marble' ? '16–20 mm' : '8–10 mm';
    return { size, finish, material, thickness };
  }, [product]);

  const accentStyle = { background: `linear-gradient(90deg, ${product.accent} 0%, #0ea5e9 100%)` } as React.CSSProperties;

  return (
    <aside className="pointer-events-auto rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] w-[28rem] max-h-[70vh] overflow-auto p-[1px] text-sm">
      <div className="rounded-2xl bg-gradient-to-br from-white/90 to-white/70 p-6 ring-1 ring-white/50">
      <div className="h-1 w-full rounded-full mb-4" style={accentStyle} />
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-neutral-500">jayroopinfra</div>
          <h3 className="text-xl font-semibold text-neutral-900 leading-snug">{product.title}</h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/70 px-2 py-1 text-[11px] text-neutral-700">
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> In stock
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white px-2.5 py-1 text-[11px]">{product.category}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 text-neutral-700 px-2.5 py-1 text-[11px]">Premium</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-neutral-800">
        <div className="flex items-start gap-2">
          <Square className="h-4 w-4 text-neutral-500 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Size</div>
            <div className="font-medium">{parsed.size}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-neutral-500 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Finish</div>
            <div className="font-medium">{parsed.finish}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Layers className="h-4 w-4 text-neutral-500 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Material</div>
            <div className="font-medium">{parsed.material}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Ruler className="h-4 w-4 text-neutral-500 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500">Thickness</div>
            <div className="font-medium">{parsed.thickness}</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-neutral-900">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Starting at</div>
          <div className="text-lg font-semibold">₹{product.price}</div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3.5 py-2 text-white hover:bg-neutral-800 transition-colors">
            <Package className="h-4 w-4" /> Request Quote
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/70 px-3.5 py-2 text-neutral-900 hover:bg-neutral-100 transition-colors">
            Add to Enquiry
          </button>
        </div>
      </div>
      </div>
    </aside>
  );
});

export default TileInfoCard;


