import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import ParticleSystem from './ParticleSystem';
import { gsap } from 'gsap';

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const rotatingWordsRef = useRef<HTMLSpanElement>(null);

  const rotatingWords = [
    "designers",
    "creatives", 
    "artists",
    "brands",
    "visionaries",
    "storytellers"
  ];

  useEffect(() => {
    // Initial hero animation
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-description", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".hero-cta", {
      y: 30,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Rotating words animation
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate word change
    if (rotatingWordsRef.current) {
      gsap.fromTo(rotatingWordsRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentWordIndex]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden cosmic-gradient"
    >
      {/* Particle System */}
      <ParticleSystem count={window.innerWidth < 768 ? 50 : 200} />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-gentle" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-foreground mb-4 tracking-tight">
            Creative Branding
          </h1>
        </div>

        <div 
          ref={subtitleRef}
          className="mb-12"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mb-4">
            A portfolio for{' '}
            <span 
              ref={rotatingWordsRef}
              className="text-foreground font-medium text-shimmer"
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </p>
        </div>

        <div className="hero-description mb-12">
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover and experience exceptional brand identity design
          </p>
        </div>

        <div className="hero-cta">
          <Button 
            size="lg"
            className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500 px-12 py-6 text-lg font-light tracking-wide hover:scale-105 hover:shadow-cosmic"
          >
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-light">Scroll to explore</span>
          <div className="w-px h-8 bg-muted-foreground opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;