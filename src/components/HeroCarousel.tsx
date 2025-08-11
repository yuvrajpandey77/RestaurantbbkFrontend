import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/types/product';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import IconButton from './IconButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { preloadImage } from '@/lib/utils';
import ThumbGrid from './ThumbGrid';

export interface HeroCarouselProps {
  products: Product[];
  initialIndex?: number;
}

const duration = 0.38;

export const HeroCarousel = ({ products, initialIndex = 0 }: HeroCarouselProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [ready, setReady] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [previewSize, setPreviewSize] = useState<number>(160);

  const product = products[index];
  const nextIndex = (index + 1) % products.length;
  const prevIndex = (index - 1 + products.length) % products.length;
  const nextProduct = products[nextIndex];

  // Preload next/prev images
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        await Promise.all([
          preloadImage(products[nextIndex].imageMain),
          preloadImage(products[prevIndex].imageMain),
        ]);
      } catch {}
    };
    run();
    return () => {
      mounted = false;
    };
  }, [index, products, nextIndex, prevIndex]);

  // Keep preview image at 50% of main image width
  useEffect(() => {
    const el = mainContainerRef.current;
    if (!el) return;
    const update = () => setPreviewSize(Math.round(el.clientWidth * 0.5));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const go = useCallback(
    async (dir: 1 | -1) => {
      const targetIndex = (index + dir + products.length) % products.length;
      const target = products[targetIndex];
      setDirection(dir);
      setReady(false);
      try {
        await preloadImage(target.imageMain);
      } finally {
        setReady(true);
        setIndex(targetIndex);
      }
    },
    [index, products]
  );

  const goTo = useCallback(
    async (targetIndex: number) => {
      const dir: 1 | -1 = targetIndex >= index ? 1 : -1;
      setDirection(dir);
      setReady(false);
      try {
        await preloadImage(products[targetIndex].imageMain);
      } finally {
        setReady(true);
        setIndex((targetIndex + products.length) % products.length);
      }
    },
    [index, products]
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    },
    [go]
  );

  const titleId = 'product-title';

  const mainVariants = {
    enter: (dir: 1 | -1) => ({
      y: prefersReducedMotion ? 0 : -12 * dir,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
    }),
    center: { y: 0, opacity: 1, scale: 1, transition: { duration } },
    exit: (dir: 1 | -1) => ({
      y: prefersReducedMotion ? 0 : 40 * dir,
      opacity: prefersReducedMotion ? 0 : 0,
      scale: prefersReducedMotion ? 1 : 0.9,
      transition: { duration },
    }),
  } as const;

  const previewVariants = {
    initial: (dir: 1 | -1) => ({
      x: prefersReducedMotion ? 0 : 80 * dir,
      y: prefersReducedMotion ? 0 : -60,
      opacity: 0.7,
      scale: prefersReducedMotion ? 1 : 0.95,
      zIndex: 20,
    }),
    animate: { x: 0, y: 0, opacity: 1, scale: 1, zIndex: 20, transition: { duration } },
  } as const;

  return (
    <section
      className="relative mx-auto mt-4 grid h-[calc(100vh-72px)] max-w-7xl grid-cols-1 items-center gap-6 px-4 md:mt-6 md:px-6"
      onKeyDown={onKey}
      aria-labelledby={titleId}
    >
      {/* Single centered column */}

      <div className="relative flex flex-col items-center text-center">
        {/* Title and price with preview aligned to right (same column as header icons) */}
        <div className="elevated relative w-full" aria-live="polite">
          <AnimatePresence custom={direction} mode="wait">
            <motion.h1
              key={product.id + '-title'}
              className="font-alata font-normal text-2xl tracking-wider sm:text-3xl md:text-5xl"
              id={titleId}
              variants={mainVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ ease: 'easeOut', duration }}
            >
              {product.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence custom={direction} mode="wait">
            <motion.p
              key={product.id + '-price'}
              className="mt-1 font-unbounded font-normal text-base sm:text-lg text-neutral-800"
              variants={mainVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ ease: 'easeOut', duration: duration * 0.9 }}
            >
              ₹{product.price}
            </motion.p>
          </AnimatePresence>

          {/* Preview image beside the title, aligned to the right edge */}
          <div
            className="pointer-events-none absolute -right-20 -top-24 hidden opacity-70 md:block"
            style={{ width: previewSize, height: previewSize }}
          >
            <motion.img
              key={nextProduct.id + '-preview-title'}
              src={nextProduct.imageMain}
              alt=""
              aria-hidden
              className="h-full w-full object-contain p-2"
              variants={previewVariants}
              custom={direction}
              initial="initial"
              animate="animate"
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <div ref={mainContainerRef} className="relative mt-2 aspect-[4/3] w-[min(86vw,740px)] max-h-[52vh] select-none p-4 sm:p-6 md:mt-4">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={product.id}
              src={product.imageMain}
              alt={product.imageAlt}
              decoding="async"
              loading="eager"
              className="absolute inset-0 h-full  w-full object-contain will-change-transform will-change-opacity"
              style={{ filter: 'drop-shadow(0 14px 40px rgba(0,0,0,0.2))' }}
              variants={mainVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          {/* Preview moved near the title */}
          {/* Chevron controls overlaid bottom-center for all breakpoints */}
          <div className="pointer-events-auto absolute -bottom-10 left-1/2 z-30 -translate-x-1/2 flex items-center gap-4">
            <IconButton aria-label="Previous" onClick={() => go(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </IconButton>
            <IconButton aria-label="Next" onClick={() => go(1)} ref={nextBtnRef as any}>
              <ChevronRight className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Bottom-right thumbs aligned to container right to match header right content */}
      <div className="pointer-events-auto absolute bottom-10 right-0 hidden md:block">
        <ThumbGrid
          items={products}
          activeId={product.id}
          onSelect={(id: string) => {
            const idx = products.findIndex((p) => p.id === id);
            if (idx !== -1) {
              goTo(idx);
            }
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;


