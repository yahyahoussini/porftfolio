import React, { Suspense, useEffect, useState, useRef, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import '@/styles/drag-to-explore.css';
import type { BrandItem } from './assets';
import { BRAND_ITEMS } from './assets';
import CursorHint from './CursorHint';

const ThreeScene = lazy(() => import('./ThreeScene'));

gsap.registerPlugin(ScrollTrigger);

// --- Hooks ---
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

const useHasWebGL = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const hasContext = gl instanceof WebGLRenderingContext;
      const hasSufficientConcurrency = navigator.hardwareConcurrency ? navigator.hardwareConcurrency >= 4 : true;
      setHasWebGL(hasContext && hasSufficientConcurrency);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);
  return hasWebGL;
};

// --- 2D Fallback ---
const FallbackCard = ({ item, scrollX, index, cardWidth, gap }) => {
  const cardX = index * (cardWidth + gap);
  const scale = useTransform(scrollX, [cardX - cardWidth, cardX, cardX + cardWidth], [0.85, 1.05, 0.85], { clamp: true });
  const opacity = useTransform(scrollX, [cardX - cardWidth, cardX, cardX + cardWidth], [0.5, 1, 0.5], { clamp: true });
  return (
    <motion.div style={{ scale, opacity }} className="w-64 md:w-80 h-[400px] md:h-[480px] flex-shrink-0 rounded-2xl bg-neutral-800 overflow-hidden relative shadow-2xl">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-xl font-bold">{item.title}</h3>
      </div>
    </motion.div>
  );
};

const DragStripFallback = ({ items }: { items: BrandItem[] }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const cardWidth = 320;
  const gap = 32;

  const snapTo = (index) => {
    const newIndex = Math.max(0, Math.min(items.length - 1, index));
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const targetX = -newIndex * (cardWidth + gap) + (containerWidth - cardWidth) / 2;
    setActiveIndex(newIndex);
    animate(x, targetX, { type: 'spring', stiffness: 400, damping: 50, duration: prefersReducedMotion ? 0.001 : undefined });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.setAttribute('tabindex', '0');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') snapTo(activeIndex - 1);
      else if (e.key === 'ArrowRight') snapTo(activeIndex + 1);
      else if (e.key === 'Enter') {
        const item = items[activeIndex];
        if (item?.href) window.open(item.href, '_blank');
      }
    };
    container?.addEventListener('keydown', handleKeyDown);
    return () => container?.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items, prefersReducedMotion]);

  const handleDragEnd = (event, info) => {
    const projectedX = x.get() + info.velocity.x * 0.4;
    const cardIndex = Math.round(-projectedX / (cardWidth + gap));
    snapTo(cardIndex);
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-black focus:outline-none focus:ring-2 focus:ring-white">
      <motion.div drag="x" onDragEnd={handleDragEnd} style={{ x }} dragConstraints={{ left: -(items.length * (cardWidth + gap)), right: 0 }} className="flex items-center gap-8 px-[calc(50%-160px)]">
        {items.map((item, i) => (
          <FallbackCard key={item.id} item={item} scrollX={x} index={i} cardWidth={cardWidth} gap={gap} />
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const DragToExplore: React.FC<{ items: BrandItem[] }> = ({ items }) => {
  const hasWebGL = useHasWebGL();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const [cameraZ, setCameraZ] = useState(4.5);

  const handleDragStateChange = (down) => {
    isDraggingRef.current = down;
    setIsDragging(down);
  };

  useEffect(() => {
    if (!containerRef.current || !hasWebGL) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => setCameraZ(4.5 - self.progress * 0.5),
      });
    }, containerRef);
    return () => ctx.revert();
  }, [hasWebGL]);

  return (
    <div ref={containerRef} className="h-[300vh] relative" aria-label="Interactive brand carousel" role="region">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="text-center absolute top-16 z-10 pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">Drag to explore</h2>
        </div>
        <div className={`w-full h-full relative ${hasWebGL ? 'hide-cursor' : ''}`}>
          {hasWebGL === null && <div className="w-full h-full flex items-center justify-center text-white"><p>Detecting capabilities...</p></div>}
          {hasWebGL === true && (
            <>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white"><p>Loading 3D Scene...</p></div>}>
                <ThreeScene items={items} onDragStateChange={{ set: handleDragStateChange, isDraggingRef }} cameraZ={cameraZ} />
              </Suspense>
              <CursorHint isDragging={isDragging} />
            </>
          )}
          {hasWebGL === false && <DragStripFallback items={items} />}
        </div>
      </div>
    </div>
  );
};

DragToExplore.defaultProps = {
    items: BRAND_ITEMS,
};

export default DragToExplore;
