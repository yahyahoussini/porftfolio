import { useEffect } from 'react';

interface SmoothScrollOptions {
  factor?: number;
  speed?: number;
}

export const useSmoothScroll = ({ factor = 0.1, speed = 0.8 }: SmoothScrollOptions = {}) => {
  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let ease = factor;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateScroll = () => {
      targetScroll = window.pageYOffset;
      currentScroll = lerp(currentScroll, targetScroll, ease);
      
      if (Math.abs(targetScroll - currentScroll) < 0.1) {
        currentScroll = targetScroll;
      }

      document.body.style.transform = `translateY(${-(currentScroll - targetScroll)}px)`;
      
      rafId = requestAnimationFrame(updateScroll);
    };

    const resizeHandler = () => {
      document.body.style.height = `${document.documentElement.scrollHeight}px`;
    };

    // Initialize
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    resizeHandler();
    updateScroll();

    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeHandler);
      
      // Clean up styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.transform = '';
    };
  }, [factor, speed]);
};

export default useSmoothScroll;