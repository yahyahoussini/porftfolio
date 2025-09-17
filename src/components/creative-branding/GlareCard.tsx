import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useTexture, Plane } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { motion, useMotionValue, useSpring } from 'framer-motion-3d';
import type { BrandItem } from './assets';

// Function to create a radial gradient texture for the shadow
const createShadowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
};

// Function to create a linear gradient for the gloss
const createGlossTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
        const gradient = context.createLinearGradient(0, 0, 128, 128);
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.5)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.5)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
}


interface GlareCardProps {
  item: BrandItem;
  isFocused: boolean;
  isHovered: boolean;
}

const GlareCard: React.FC<GlareCardProps & JSX.IntrinsicElements['group']> = ({
  item, isFocused, isHovered, ...props
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useTexture(item.image);

  const shadowTexture = useMemo(() => createShadowTexture(), []);
  const glossTexture = useMemo(() => createGlossTexture(), []);

  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const { viewport } = useThree();

  const rotX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  useFrame((state) => {
    if (!isHovered) {
      rotX.set(0);
      rotY.set(0);
      return;
    }
    const { pointer } = state;
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    rotX.set(-y / viewport.height * 0.5);
    rotY.set(x / viewport.width * 0.5);
  });

  const variants = {
    initial: { scale: 1, z: 0 },
    hovered: { scale: 1.06, z: 0.12 },
    focused: { scale: 1.06, z: 0.12 },
  };
  const animateState = isHovered ? 'hovered' : (isFocused ? 'focused' : 'initial');

  const overlayVariants = {
    initial: { opacity: 0 },
    hovered: { opacity: 1 },
    focused: { opacity: 0.7 },
  };

  return (
    <motion.group
      {...props}
      ref={groupRef}
      variants={variants}
      animate={animateState}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      rotation-x={rotX}
      rotation-y={rotY}
    >
      <Plane args={[1 * aspect, 1]}>
        <meshBasicMaterial map={texture} transparent />
      </Plane>

      <motion.group variants={overlayVariants} animate={animateState} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}>
        <Plane args={[1 * aspect, 1]} position-z={0.01}>
          <meshBasicMaterial map={glossTexture} transparent blending={THREE.AdditiveBlending} />
        </Plane>
      </motion.group>

      <motion.group variants={{ initial: { opacity: 0, scale: 0.8 }, hovered: { opacity: 0.6, scale: 1 }, focused: { opacity: 0.4, scale: 0.9 } }} animate={animateState} transition={{ type: 'spring', stiffness: 400, damping: 40 }}>
        <Plane args={[1.2 * aspect, 1.2]} position-z={-0.05}>
          <meshBasicMaterial map={shadowTexture} transparent />
        </Plane>
      </motion.group>
    </motion.group>
  );
};

export const preloadBrandItemTextures = (items: BrandItem[]) => {
  items.forEach(item => {
    useTexture.preload(item.image);
    if (item.imageHi) useTexture.preload(item.imageHi);
  });
};

export default GlareCard;
