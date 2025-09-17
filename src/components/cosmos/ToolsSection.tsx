import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figma, Palette, Monitor, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const platforms = [
    { name: "Adobe Creative Suite", icon: Palette, description: "Industry-standard design tools" },
    { name: "Figma", icon: Figma, description: "Collaborative interface design" },
    { name: "Sketch", icon: Layers, description: "Vector-based design platform" },
    { name: "Webflow", icon: Monitor, description: "Visual web development" }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(title,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".platform-card",
      { y: 100, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: "back.out(1.7)",
        stagger: 0.15
      },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-20 text-center tracking-tight"
        >
          Design across all platforms
        </h2>

        <div 
          ref={contentRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <div 
                key={index}
                className="platform-card group"
              >
                <div className="p-8 bg-card/5 backdrop-blur-sm border border-border/10 rounded-3xl transition-all duration-700 hover:bg-card/10 hover:border-border/20 hover:scale-105 hover:shadow-cosmic">
                  <div className="mb-6">
                    <IconComponent className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-shimmer">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {platform.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mock Browser Interface */}
        <div className="mt-20 mx-auto max-w-4xl">
          <div className="bg-card/5 backdrop-blur-sm border border-border/10 rounded-3xl p-8 hover:scale-105 transition-transform duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-60" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60" />
                <div className="w-3 h-3 bg-green-500 rounded-full opacity-60" />
              </div>
              <div className="flex-1 bg-muted/10 rounded-lg px-4 py-2 text-sm text-muted-foreground">
                creative-tools.studio
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-muted/20 rounded w-3/4" />
              <div className="h-4 bg-muted/20 rounded w-1/2" />
              <div className="h-4 bg-muted/20 rounded w-2/3" />
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="aspect-square bg-muted/10 rounded-lg" />
                <div className="aspect-square bg-muted/10 rounded-lg" />
                <div className="aspect-square bg-muted/10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;