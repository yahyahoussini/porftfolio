import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import { gsap } from 'gsap';
import { motion } from 'framer-motion-3d';

import type { BrandItem } from './assets';
import GlareCard, { preloadBrandItemTextures } from './GlareCard';

const createShapeTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
        context.fillStyle = 'rgba(255, 255, 255, 0.2)';
        context.beginPath();
        context.arc(64, 64, 40, 0, 2 * Math.PI);
        context.fill();
    }
    return new THREE.CanvasTexture(canvas);
};

const ParallaxBackground = () => {
    const texture = useMemo(() => createShapeTexture(), []);
    const groupRef = useRef<THREE.Group>(null!);
    const { pointer } = useThree();

    useFrame(() => {
        if(groupRef.current) {
            groupRef.current.position.x = gsap.utils.interpolate(groupRef.current.position.x, pointer.x * 0.5, 0.05);
            groupRef.current.position.y = gsap.utils.interpolate(groupRef.current.position.y, pointer.y * 0.5, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {[...Array(5)].map((_, i) => (
                <Plane key={i} args={[1, 1]} position={[(i - 2) * 4, (i % 2 === 0 ? -1 : 1) * 4, -5 - i * 2]}>
                    <meshBasicMaterial map={texture} transparent opacity={0.5} />
                </Plane>
            ))}
        </group>
    )
}

const RADIUS = 2.2;
const FRICTION = 0.92;
const AUTO_ROTATE_SPEED = 0.003;
const SNAP_VELOCITY_THRESHOLD = 0.001;

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

const ThreeScene = ({ items, onDragStateChange, cameraZ }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const groupRef = useRef<THREE.Group>(null!);
  const rotationY = useRef(0);
  const velocity = useRef(0);
  const isSnapping = useRef(false);
  const lastInteractionTime = useRef(Date.now());
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rotateTo = (index) => {
    if (!groupRef.current) return;
    const numItems = items.length;
    const sectorAngle = (2 * Math.PI) / numItems;
    let targetAngle = index * sectorAngle;

    const currentAngle = groupRef.current.rotation.y;
    const diff = targetAngle - currentAngle;
    if (Math.abs(diff) > Math.PI) {
        targetAngle += diff > 0 ? -2 * Math.PI : 2 * Math.PI;
    }

    const newFocusedIndex = (numItems - (index % numItems) + numItems) % numItems;
    setFocusedIndex(newFocusedIndex);

    isSnapping.current = true;
    gsap.killTweensOf(groupRef.current.rotation);
    gsap.to(groupRef.current.rotation, {
      y: targetAngle,
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: 'power3.inOut',
      onUpdate: () => { rotationY.current = groupRef.current.rotation.y; },
      onComplete: () => { isSnapping.current = false; }
    });
  };

  const handleInteraction = () => {
    lastInteractionTime.current = Date.now();
    if(isSnapping.current) {
        gsap.killTweensOf(groupRef.current.rotation);
        isSnapping.current = false;
    }
  }

  useEffect(() => {
    preloadBrandItemTextures(items);
    const handleKeyDown = (e: KeyboardEvent) => {
      handleInteraction();
      const numItems = items.length;
      const sectorAngle = (2 * Math.PI) / numItems;
      const currentIndex = Math.round(groupRef.current.rotation.y / sectorAngle);
      if (e.key === 'ArrowLeft') rotateTo(currentIndex - 1);
      else if (e.key === 'ArrowRight') rotateTo(currentIndex + 1);
      else if (e.key === 'Enter') {
        const item = items[focusedIndex];
        if (item?.href) window.open(item.href, '_blank');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, prefersReducedMotion, focusedIndex]);

  useFrame((state, delta) => {
    if (!groupRef.current || isSnapping.current || onDragStateChange.isDraggingRef.current) return;

    if (Math.abs(velocity.current) > SNAP_VELOCITY_THRESHOLD) {
      rotationY.current += velocity.current;
      velocity.current *= FRICTION;
      groupRef.current.rotation.y = rotationY.current;
      handleInteraction();
    } else if (velocity.current !== 0) {
      velocity.current = 0;
      const numItems = items.length;
      const sectorAngle = (2 * Math.PI) / numItems;
      rotateTo(Math.round(groupRef.current.rotation.y / sectorAngle));
    }

    if (!prefersReducedMotion && Date.now() - lastInteractionTime.current > 3500) {
      rotationY.current += AUTO_ROTATE_SPEED * delta;
      groupRef.current.rotation.y = rotationY.current;
      // No need to reset lastInteractionTime here, as any real interaction will.
    }
  });

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], velocity: [vx] }) => {
      handleInteraction();
      onDragStateChange.set(down);
      if (down) {
        rotationY.current = groupRef.current.rotation.y - mx / 500;
        groupRef.current.rotation.y = rotationY.current;
        velocity.current = -vx * (Math.PI / 180) * 0.1;
      }
    },
  });

  return (
    <div {...bind()} className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas>
        <PerspectiveCamera makeDefault fov={50} position={[0, 0, cameraZ]} />
        <ParallaxBackground />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <group ref={groupRef}>
          {items.map((item, i) => (
            <GlareCard
              key={item.id} item={item} position={[RADIUS * Math.sin(i * (2 * Math.PI / items.length)), 0, RADIUS * Math.cos(i * (2 * Math.PI / items.length))]}
              rotation={[0, -i * (2 * Math.PI / items.length), 0]}
              isFocused={focusedIndex === i} isHovered={hoveredIndex === i}
              onPointerOver={() => setHoveredIndex(i)} onPointerOut={() => setHoveredIndex(null)}
            />
          ))}
        </group>
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} intensity={0.7} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
