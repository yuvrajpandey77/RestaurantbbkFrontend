import type { Product } from '@/types/product';
import { memo } from 'react';
import { X, Sparkles, ShieldCheck, Beaker, Droplets, Wrench, Dumbbell, Utensils, Building2, Bath, ShowerHead, DoorClosed, Table2, PanelsTopLeft, Ruler } from 'lucide-react';

export interface ProductDetailsOverlayProps {
  product: Product;
  onClose: () => void;
}

const Feature = ({ icon: Icon, label }: { icon: React.ComponentType<any>; label: string }) => (
  <div className="flex items-center gap-3">
    <Icon className="h-5 w-5 text-neutral-700" />
    <span className="text-base text-neutral-800">{label}</span>
  </div>
);

const Area = ({ icon: Icon, title, subtitle }: { icon: React.ComponentType<any>; title: string; subtitle?: string }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <Icon className="h-9 w-9 text-neutral-700" />
    <div className="text-sm text-neutral-900 leading-tight">
      {title}
      {subtitle ? <div className="text-neutral-600">{subtitle}</div> : null}
    </div>
  </div>
);

export const ProductDetailsOverlay = memo(function ProductDetailsOverlay({ product, onClose }: ProductDetailsOverlayProps) {
  const title = product.title;
  const sizeMatch = title.toLowerCase().match(/(\d{3,4})\s*[x×]\s*(\d{3,4})/i);
  const size = sizeMatch ? `${sizeMatch[1]}×${sizeMatch[2]} mm` : '—';
  const thickness = title.includes('15') ? '15mm' : '—';
  const finish = title.toLowerCase().includes('gloss') ? 'Glossy' : title.toLowerCase().includes('matte') ? 'Matte' : '—';

  return (
    <div className="fixed inset-0 z-[99999] bg-white/90 backdrop-blur-sm overflow-auto text-neutral-900">
      <div className="mx-auto max-w-6xl p-6 pt-24">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-6">
            <h2 className="font-brandDisplay text-3xl text-neutral-900">{title}</h2>
            <div className="mt-1 flex items-center gap-3 text-neutral-700">
              <span className="inline-flex items-center gap-1"><Ruler className="h-4 w-4" /> {size}</span>
              <span className="h-4 w-px bg-neutral-300" />
              <span>{thickness}</span>
              <span className="h-4 w-px bg-neutral-300" />
              <span>{finish}</span>
            </div>
            <div className="mt-1 uppercase tracking-[0.25em] text-neutral-500">Granite Substitute</div>

            <h3 className="mt-6 text-xl font-semibold text-neutral-900">Product Features:</h3>
            <div className="mt-3 h-px w-full bg-neutral-300" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Feature icon={Sparkles as any} label="Easy To Clean" />
              <Feature icon={ShieldCheck as any} label="Scratch Resistance" />
              <Feature icon={Beaker as any} label="Chemical Resistance" />
              <Feature icon={Droplets as any} label="Stain Resistance" />
              <Feature icon={Wrench as any} label="Low Maintenance" />
              <Feature icon={Dumbbell as any} label="Highly Durable" />
            </div>

            <h3 className="mt-8 text-xl font-semibold text-neutral-900">Application Areas:</h3>
            <div className="mt-3 h-px w-full bg-neutral-300" />
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-6">
              <Area icon={Utensils as any} title="Kitchen" subtitle="Counter Top" />
              <Area icon={Table2 as any} title="Office" subtitle="Table Top" />
              <Area icon={PanelsTopLeft as any} title="Dinning" subtitle="Table Top" />
              <Area icon={Building2 as any} title="Terrace" />
              <Area icon={DoorClosed as any} title="Step & Riser" />
              <Area icon={Building2 as any} title="Corridors" subtitle="& Halls" />
              <Area icon={PanelsTopLeft as any} title="Window Sill" />
              <Area icon={DoorClosed as any} title="Door Frame" />
              <Area icon={Bath as any} title="Bathroom" subtitle="Tub" />
              <Area icon={Bath as any} title="Bathroom" subtitle="Counter Top" />
              <Area icon={ShowerHead as any} title="Shower Panel" />
              <Area icon={Building2 as any} title="Flooring" subtitle="Heavy Traffic" />
            </div>
          </div>

          <div className="w-[280px] sm:w-[320px] md:w-[380px]">
            <img src={product.imageMain} alt={product.imageAlt} className="h-[600px] w-full object-cover rounded-md shadow" />
          </div>

          <button aria-label="Close" className="ml-4 rounded-full p-2 text-neutral-700 hover:bg-neutral-200" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductDetailsOverlay;


