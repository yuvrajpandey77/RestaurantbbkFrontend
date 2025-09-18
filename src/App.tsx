import BackgroundGlow from '@/components/BackgroundGlow';
import CategoryRail from '@/components/CategoryRail';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import { categories, products } from '@/data/products';
import { useMemo, useState } from 'react';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('Tiles');
  const filtered = useMemo(
    () => products.filter((p) => p.category === activeCategory || activeCategory === 'Tiles'),
    [activeCategory]
  );

  return (
    <div className="relative h-screen overflow-hidden isolate">
      {/* BackgroundGlow kept as fallback if a product lacks imageBg */}
      <Header />
      <main className="relative z-0 mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative z-0">
          {/* Left rail hidden; using TileInfoCard inside hero */}
          <HeroCarousel products={products} />
        </div>
      </main>
      {/* No footer to keep single-screen layout */}
    </div>
  );
}

export default App;


