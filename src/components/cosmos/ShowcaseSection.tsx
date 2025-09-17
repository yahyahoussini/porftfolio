import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const projects = [
    { name: "Luxury Resort", author: "@brandstudio", color: "bg-gradient-to-br from-blue-500/20 to-blue-700/20" },
    { name: "Tech Startup", author: "@creativedirector", color: "bg-gradient-to-br from-purple-500/20 to-purple-700/20" },
    { name: "Fashion Brand", author: "@visualidentity", color: "bg-gradient-to-br from-pink-500/20 to-pink-700/20" },
    { name: "Restaurant Chain", author: "@branddesigner", color: "bg-gradient-to-br from-orange-500/20 to-orange-700/20" },
    { name: "Financial Services", author: "@strategicdesign", color: "bg-gradient-to-br from-green-500/20 to-green-700/20" },
    { name: "Healthcare Brand", author: "@brandconsultant", color: "bg-gradient-to-br from-teal-500/20 to-teal-700/20" },
    { name: "E-commerce", author: "@digitalbranding", color: "bg-gradient-to-br from-red-500/20 to-red-700/20" },
    { name: "Non-profit", author: "@socialimpact", color: "bg-gradient-to-br from-indigo-500/20 to-indigo-700/20" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    const title = titleRef.current;

    if (!section || !gallery || !title) return;

    // Title animation
    gsap.fromTo(title,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Gallery items animation
    const galleryItems = gallery.querySelectorAll('.project-item');
    gsap.set(galleryItems, { y: 100, opacity: 0 });

    gsap.to(galleryItems, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: gallery,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Make gallery draggable
    Draggable.create(gallery, {
      type: "x",
      edgeResistance: 0.65,
      bounds: section,
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      Draggable.get(gallery)?.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto mb-16">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 text-center tracking-tight"
        >
          Drag to explore
        </h2>
        <p className="text-xl md:text-2xl font-light text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          Interactive portfolio showcase featuring our latest brand identity projects
        </p>
      </div>

      <div 
        ref={galleryRef}
        className="flex gap-8 cursor-grab active:cursor-grabbing"
        style={{ width: 'fit-content' }}
      >
        {projects.map((project, index) => (
          <div 
            key={index}
            className="project-item flex-shrink-0 w-80 h-96 group"
          >
            <div className={`w-full h-full ${project.color} backdrop-blur-sm border border-border/10 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-cosmic hover:border-border/20 cursor-pointer`}>
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-full h-32 bg-muted/10 rounded-2xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-3/4" />
                    <div className="h-4 bg-muted/20 rounded w-1/2" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-light text-foreground group-hover:text-shimmer transition-all duration-500">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground font-light">
                    {project.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowcaseSection;