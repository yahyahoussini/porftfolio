import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/cosmos/HeroSection';
import ServicesSection from '@/components/cosmos/ServicesSection';
import ToolsSection from '@/components/cosmos/ToolsSection';
import ProcessSection from '@/components/cosmos/ProcessSection';
import ShowcaseSection from '@/components/cosmos/ShowcaseSection';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CreativeBranding = () => {
  useEffect(() => {
    // Enable dark mode for this page
    document.documentElement.classList.add('dark');

    // Smooth scrolling setup
    let ctx = gsap.context(() => {
      // Global scroll progress indicator
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });

      // Parallax effect for background elements
      gsap.utils.toArray(".parallax-slow").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray(".parallax-fast").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom", 
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => {
      ctx.revert();
      // Clean up dark mode when leaving page
      // document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress fixed top-0 left-0 w-full h-0.5 bg-foreground z-50 origin-left scale-x-0" />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Tools Section */}
      <ToolsSection />
      
      {/* Process Section */}
      <ProcessSection />

      {/* AI Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
            Smart brand analysis
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-16">
            Advanced tools automatically analyze your brand elements, so you don't have to. 
            Our systems often identify patterns you haven't noticed.
          </p>
          <div className="bg-card/5 backdrop-blur-sm border border-border/10 rounded-3xl p-12 hover:scale-105 transition-transform duration-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Color', 'Typography', 'Layout', 'Imagery'].map((tag, i) => (
                <div key={i} className="p-4 bg-muted/10 rounded-xl">
                  <div className="w-full h-12 bg-gradient-to-r from-muted/20 to-muted/5 rounded-lg mb-3" />
                  <p className="text-sm font-light text-muted-foreground">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Search Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
            Find inspiration instantly
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-16">
            Discover any project in our portfolio with ease. Your brand library is an intelligent 
            collection of work, ready to inspire and guide.
          </p>
          <div className="bg-card/5 backdrop-blur-sm border border-border/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 p-4 bg-muted/10 rounded-2xl">
              <div className="w-6 h-6 bg-muted/20 rounded" />
              <span className="text-lg font-light text-muted-foreground">luxury branding</span>
              <div className="ml-auto w-8 h-8 bg-foreground/10 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
            Welcome to Creative Branding
          </h2>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed">
            Zero noise or distractions. No trends, no gimmicks. 
            Just pure, strategic brand expression.
          </p>
        </div>
      </section>

      {/* Showcase Section */}
      <ShowcaseSection />

      {/* Final CTA */}
      <section className="py-32 px-6 relative text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
            Available for all projects
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground mb-16 leading-relaxed">
            Find creative branding solutions, wherever inspiration strikes
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 px-12 py-6 text-lg font-light tracking-wide hover:scale-105"
            >
              View Portfolio
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500 px-12 py-6 text-lg font-light tracking-wide hover:scale-105"
            >
              Start Project
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-6 relative text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
            Ready to create something extraordinary?
          </h2>
          <div className="bg-card/5 backdrop-blur-sm border border-border/10 rounded-3xl p-12 max-w-2xl mx-auto hover:scale-105 transition-transform duration-700">
            <p className="text-xl font-light text-muted-foreground mb-8">
              What type of project do you have in mind?
            </p>
            <div className="space-y-4">
              <textarea 
                placeholder="Tell us about your vision..."
                className="w-full p-4 bg-transparent border border-border/20 rounded-2xl text-foreground placeholder-muted-foreground resize-none h-32 focus:outline-none focus:border-foreground/40 transition-colors"
              />
              <button className="w-full bg-foreground text-background py-4 rounded-2xl font-medium hover:scale-105 transition-transform duration-300 hover:shadow-cosmic">
                Let's collaborate
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeBranding;