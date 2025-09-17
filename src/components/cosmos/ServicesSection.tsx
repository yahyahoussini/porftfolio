import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    "logo design",
    "brand identity", 
    "visual systems",
    "packaging",
    "websites",
    "marketing materials",
    "brand guidelines",
    "creative direction"
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const servicesContainer = servicesRef.current;

    if (!section || !title || !servicesContainer) return;

    // Title animation
    gsap.fromTo(title,
      { y: 100, opacity: 0 },
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

    // Services animation
    const serviceItems = servicesContainer.querySelectorAll('.service-item');
    gsap.fromTo(serviceItems,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesContainer,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
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
      <div className="max-w-6xl mx-auto text-center">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-20 tracking-tight"
        >
          One studio to create everything
        </h2>

        <div 
          ref={servicesRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-item group cursor-pointer"
            >
              <div className="p-8 bg-card/5 backdrop-blur-sm border border-border/10 rounded-2xl transition-all duration-500 hover:bg-card/10 hover:border-border/20 hover:scale-105 hover:shadow-cosmic">
                <p className="text-lg md:text-xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;