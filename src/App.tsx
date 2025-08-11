import BackgroundGlow from '@/components/BackgroundGlow';
import CategoryRail from '@/components/CategoryRail';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import { categories, products } from '@/data/products';
import { useMemo, useState } from 'react';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('Food');
  const filtered = useMemo(
    () => products.filter((p) => p.category === activeCategory || activeCategory === 'Food'),
    [activeCategory]
  );

  return (
    <div className="relative h-screen overflow-hidden">
      <BackgroundGlow />
      <Header />
      <main className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative">
          {/* Vertical category rail at middle-left, aligned under header/logo */}
          <div className="pointer-events-auto fixed left-30 top-1/2 hidden -translate-y-1/2 md:block">
            <CategoryRail
              categories={[...categories]}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
          <HeroCarousel products={products} />
        </div>
      </main>
      {/* No footer to keep single-screen layout */}
    </div>
  );
}

export default App;


