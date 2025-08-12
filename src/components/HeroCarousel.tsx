import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/types/product';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import IconButton from './IconButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { preloadImage } from '@/lib/utils';
import ThumbGrid from './ThumbGrid';
import { Header } from './Header';

export interface HeroCarouselProps {
  products: Product[];
  initialIndex?: number;
}

const duration = 0.38;
const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26, mass: 0.6 } as const;
const SPRING_TEXT = { type: 'spring', stiffness: 300, damping: 30, mass: 0.7 } as const;
const SPRING_PREVIEW = { type: 'spring', stiffness: 280, damping: 28, mass: 0.65 } as const;

export const HeroCarousel = ({ products, initialIndex = 0 }: HeroCarouselProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [ready, setReady] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const previewAnchorRef = useRef<HTMLDivElement>(null);
  const [previewSize, setPreviewSize] = useState<number>(160);
  const [previewVector, setPreviewVector] = useState<{ dx: number; dy: number }>({ dx: 80, dy: -60 });

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

  // Keep preview size at 50% of main image width and compute vector from preview anchor -> main center
  useEffect(() => {
    const mainEl = mainContainerRef.current;
    const anchorEl = previewAnchorRef.current;
    if (!mainEl) return;

    const compute = () => {
      setPreviewSize(Math.round(mainEl.clientWidth * 0.5));

      if (!anchorEl) return;
      // Compute centers
      const mainRect = mainEl.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      const mainCenterX = mainRect.left + mainRect.width / 2;
      const mainCenterY = mainRect.top + mainRect.height / 2;
      const anchorCenterX = anchorRect.left + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + anchorRect.height / 2;
      const dx = Math.round(anchorCenterX - mainCenterX);
      const dy = Math.round(anchorCenterY - mainCenterY);
      setPreviewVector({ dx, dy });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(mainEl);
    if (anchorEl) ro.observe(anchorEl);
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute);
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

  // Smooth spring animations
  const mainImageVariants = {
    enter: (v: { dx: number; dy: number }) => ({
      x: prefersReducedMotion ? 0 : v.dx,
      y: prefersReducedMotion ? 0 : v.dy,
      opacity: prefersReducedMotion ? 1 : 0.9,
      scale: prefersReducedMotion ? 1 : 0.98,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0.2 } : SPRING_SOFT,
    },
    exit: (v: { dx: number; dy: number }) => ({
      x: prefersReducedMotion ? 0 : -v.dx * 1.15,
      y: prefersReducedMotion ? 0 : -v.dy * 1.15,
      opacity: prefersReducedMotion ? 0 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      transition: prefersReducedMotion ? { duration: 0.2 } : SPRING_SOFT,
    }),
  } as const;

  const textVariants = {
    enter: (dir: 1 | -1) => ({
      y: prefersReducedMotion ? 0 : -8 * dir,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0.2 } : SPRING_TEXT,
    },
    exit: (dir: 1 | -1) => ({
      y: prefersReducedMotion ? 0 : 22 * dir,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: prefersReducedMotion ? { duration: 0.2 } : SPRING_TEXT,
    }),
  } as const;

  // Preview overlay animation: next preview slides along same line from 2x offset to 1x offset
  const renderPreviewOverlay = () => {
    const n = products.length;
    const previewIndex = (index + 1) % n;
    const previewProduct = products[previewIndex];

    // Position the preview image via transform relative to the main image center
    return (
      
      <AnimatePresence initial={false}>
        <motion.img
          key={previewProduct.id + '-preview-overlay'}
          src={previewProduct.imageMain}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain p-2"
          style={{ filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.18))' }}
          initial={{
            x: prefersReducedMotion ? previewVector.dx : previewVector.dx * 2,
            y: prefersReducedMotion ? previewVector.dy : previewVector.dy * 2,
            opacity: prefersReducedMotion ? 1 : 0.9,
            scale: prefersReducedMotion ? 0.5 : 0.5,
            zIndex: 10,
          }}
          animate={{
            x: previewVector.dx,
            y: previewVector.dy,
            opacity: 1,
            scale: 0.5,
            zIndex: 10,
            transition: prefersReducedMotion ? { duration: 0.2 } : SPRING_PREVIEW,
          }}
          exit={{ opacity: 0, transition: { duration: duration * 0.25 } }}
        />
      </AnimatePresence>
    );
  };

  // Wheel/trackpad navigation
  const WHEEL_THRESHOLD = 60;
  const WHEEL_COOLDOWN_MS = 420;
  const wheelAccumRef = useRef(0);
  const wheelLockRef = useRef(false);
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelLockRef.current || !ready) return;
      const absY = Math.abs(e.deltaY);
      const absX = Math.abs(e.deltaX);
      const primary = absY >= absX ? e.deltaY : e.deltaX;
      wheelAccumRef.current += primary;
      if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
        const dir: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current = 0;
        wheelLockRef.current = true;
        go(dir);
        window.setTimeout(() => {
          wheelLockRef.current = false;
        }, WHEEL_COOLDOWN_MS);
      }
    },
    [go, ready]
  );

  return (
    <section
      className="relative mx-auto grid h-[calc(100vh-72px)] max-w-7xl grid-cols-1 items-center gap-6 px-4 md:px-6"
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
              variants={textVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={undefined}
            >
              {product.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence custom={direction} mode="wait">
            <motion.p
              key={product.id + '-price'}
              className="mt-1 font-unbounded font-normal text-base sm:text-lg text-neutral-800"
              variants={textVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={undefined}
            >
              ₹{product.price}
            </motion.p>
          </AnimatePresence>

          {/* Invisible anchor used only for measuring the preview position relative to main */}
          <div
            ref={previewAnchorRef}
            className="pointer-events-none absolute -right-12 -top-6 opacity-0"
            style={{ width: previewSize, height: previewSize }}
            aria-hidden
          />
        </div>
        <div ref={mainContainerRef} className="relative w-[min(80vw,500px)] h-[min(80vw,535px)] select-none p-4 sm:p-6" onWheel={onWheel}>
          {/* Main image: exits down-left, enters from preview anchor along same line */}
          <AnimatePresence custom={previewVector as any} mode="sync">
            <motion.img
              key={product.id}
              src={product.imageMain}
              alt={product.imageAlt}
              decoding="async"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover will-change-transform will-change-opacity"
              style={{ filter: 'drop-shadow(0 14px 40px rgba(0,0,0,0.2))' }}
              variants={mainImageVariants}
              custom={previewVector as any}
              initial="enter"
              animate="center"
              exit="exit"
              transition={undefined}
            />
          </AnimatePresence>
          {/* Preview overlay that lives in the same coordinate space and slides along the same line */}
          {renderPreviewOverlay()}
          {/* Preview moved near the title */}
          {/* Chevron controls overlaid bottom-center for all breakpoints */}
          <div className="pointer-events-auto absolute -bottom-0 left-1/2 z-30 -translate-x-1/2 flex items-center gap-4">
            <IconButton aria-label="Previous" onClick={() => go(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </IconButton>
            <IconButton aria-label="Next" onClick={() => go(1)} ref={nextBtnRef as any}>
              <ChevronRight className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
        {/* Bottom-right thumbs aligned to container right to match header right content */}
      <div className="pointer-events-auto absolute bottom-0 -right-8 hidden md:block">
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
      </div>

      
    </section>
  );
};

export default HeroCarousel;


