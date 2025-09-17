import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Users, Lock, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Eye, label: "Vision", color: "bg-blue-500/20 text-blue-400" },
    { icon: Users, label: "Team", color: "bg-green-500/20 text-green-400" },
    { icon: Lock, label: "Private", color: "bg-purple-500/20 text-purple-400" },
    { icon: Globe, label: "Public", color: "bg-orange-500/20 text-orange-400" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;

    if (!section || !content || !grid) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".process-content",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".process-grid",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(".brand-item",
      { y: 40, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        ease: "back.out(1.7)",
        stagger: 0.1
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
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div 
          ref={contentRef}
          className="process-content"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 tracking-tight">
            Curate your brand vision
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-8">
            Organize your brand elements into cohesive systems that people can connect with. 
            Projects can be private or public, and we collaborate with teams.
          </p>
          <div className="flex flex-wrap gap-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border/20 ${feature.color} backdrop-blur-sm`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Grid */}
        <div 
          ref={gridRef}
          className="process-grid"
        >
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => (
              <div 
                key={i}
                className="brand-item aspect-square bg-card/5 backdrop-blur-sm border border-border/10 rounded-2xl p-4 hover:bg-card/10 hover:border-border/20 hover:scale-105 transition-all duration-500 cursor-pointer"
              >
                <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-foreground/10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;