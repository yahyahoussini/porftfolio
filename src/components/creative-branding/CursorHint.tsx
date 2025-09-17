import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorHintProps {
  isDragging: boolean;
}

const CursorHint: React.FC<CursorHintProps> = ({ isDragging }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleTouch = () => {
      setIsTouchDevice(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('touchstart', handleTouch, { once: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  const cursorVariants = {
    initial: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 30 } },
    dragging: { scale: 0.8, opacity: 0.9, transition: { type: 'spring', stiffness: 400, damping: 30 } },
  };

  const textVariants = {
    initial: { y: 0, opacity: 1 },
    dragging: { y: -20, opacity: 0 },
  };

  const releaseTextVariants = {
    initial: { y: 20, opacity: 0 },
    dragging: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none"
          style={{ x: position.x, y: position.y }}
          variants={cursorVariants}
          initial="initial"
          animate={isDragging ? 'dragging' : 'visible'}
        >
          <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            {/* Ring */}
            <div className="w-20 h-20 rounded-full border-2 border-white/80 transition-transform duration-300" />

            {/* Text Container */}
            <div className="absolute whitespace-nowrap text-white text-sm font-light uppercase tracking-widest overflow-hidden h-6">
              {/* "Drag to explore" */}
              <motion.div
                variants={textVariants}
                animate={isDragging ? 'dragging' : 'initial'}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              >
                Drag to explore
              </motion.div>

              {/* "Release to snap" */}
              <motion.div
                className="absolute top-0"
                variants={releaseTextVariants}
                animate={isDragging ? 'dragging' : 'initial'}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              >
                Release to snap
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorHint;
