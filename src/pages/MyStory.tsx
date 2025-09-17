import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MyStory = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [visibleWords, setVisibleWords] = useState<Record<string, number>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const story = {
    intro: "You are now entering my story.",
    audioPrompt: "Click anywhere to enable immersive audio.",
    headphonesNote: "Best experienced with headphones.",
    subtitle: "Where passion meets purpose, dreams become reality, and every challenge shapes the journey ahead.",
    sections: [
      {
        id: "origins",
        title: "01. The Beginning",
        content: [
          "The year was when everything changed.",
          "I discovered the power of creation.",
          "Every line of code became a brushstroke.",
          "Every project became a story.",
          "Every challenge became an opportunity.",
          "This was where it all began."
        ]
      },
      {
        id: "timeline",
        title: "02. The Journey",
        content: [
          "2018 - First line of code written",
          "2019 - Built my first web application",
          "2020 - Mastered React and modern frameworks",
          "2021 - Started freelancing and client projects",
          "2022 - Specialized in AI-powered solutions",
          "2023 - Founded my own development practice",
          "2024 - Expanding into enterprise solutions"
        ]
      },
      {
        id: "journey",
        title: "03. The Path",
        content: [
          "Through countless late nights and early mornings.",
          "Learning became my compass.",
          "Innovation became my language.",
          "Collaboration became my strength.",
          "Problems became puzzles waiting to be solved.",
          "Each solution revealed new horizons."
        ]
      },
      {
        id: "vision",
        title: "04. The Vision",
        content: [
          "Tomorrow's digital landscape awaits.",
          "Where technology serves humanity.",
          "Where creativity knows no bounds.",
          "Where every interaction creates meaning.",
          "This is what drives me forward.",
          "This is my story continuing to unfold."
        ]
      }
    ]
  };

  useEffect(() => {
    const handleClick = () => {
      if (!isAudioEnabled) {
        setIsAudioEnabled(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
      
      // Control video timeline based on scroll
      if (videoRef.current && videoRef.current.duration) {
        const targetTime = scrollPercent * videoRef.current.duration;
        videoRef.current.currentTime = targetTime;
      }
      
      const sections = containerRef.current.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        const sectionId = section.getAttribute('data-section');
        
        if (isVisible && sectionId) {
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
          
          // Animate words in sequence
          const words = section.querySelectorAll('[data-word]');
          words.forEach((word, index) => {
            setTimeout(() => {
              setVisibleWords(prev => ({
                ...prev,
                [`${sectionId}-${index}`]: index + 1
              }));
            }, index * 200);
          });
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAudioEnabled]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const TimelineItem = ({ text, index, sectionId }: { text: string; index: number; sectionId: string }) => {
    const isVisible = visibleSections[sectionId];
    const [year, ...descParts] = text.split(' - ');
    const description = descParts.join(' - ');
    
    return (
      <div 
        className={cn(
          "flex items-center gap-8 mb-12 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
        )}
        style={{
          transitionDelay: `${index * 200}ms`
        }}
      >
        <div className="text-2xl md:text-3xl font-light text-primary min-w-[100px]">
          {year}
        </div>
        <div className="w-4 h-4 bg-primary rounded-full relative">
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
        </div>
        <div className="flex-1 text-xl md:text-2xl font-light text-muted-foreground">
          {description}
        </div>
      </div>
    );
  };

  const AnimatedText = ({ text, sectionId, index }: { text: string; sectionId: string; index: number }) => {
    const words = text.split(' ');
    const isVisible = visibleSections[sectionId];
    
    return (
      <div className="mb-8">
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            data-word
            className={cn(
              "inline-block mr-2 transition-all duration-500 ease-out",
              isVisible && visibleWords[`${sectionId}-${index}`] > wordIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: `${wordIndex * 100}ms`
            }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Video background */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-30"
          onLoadedData={() => {
            // Ensure video is ready for scrubbing
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }}
        >
          <source src="/assets/blooming-flowers.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/20" />
      </div>

      {/* Cosmic overlay effects */}
      <div className="fixed inset-0 z-[1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-muted/5 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '4s' }} />
      </div>

      {/* Scroll Progress Timeline */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="relative h-80 w-1 bg-muted/20 rounded-full">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          <div 
            className="absolute w-4 h-4 bg-primary rounded-full -left-1.5 transition-all duration-300 ease-out"
            style={{ 
              top: `${scrollProgress * 100}%`,
              transform: 'translateY(-50%)',
              boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
            }}
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-50">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </nav>

      {/* Audio controls */}
      {isAudioEnabled && (
        <div className="fixed top-6 right-6 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Main content */}
      <div ref={containerRef} className="relative z-10">
        {/* Hero section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 animate-fade-in">
              {story.intro}
            </h1>
            
            {!isAudioEnabled && (
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '1s' }}>
                <p className="text-lg text-muted-foreground">
                  {story.audioPrompt}
                </p>
                <p className="text-sm text-muted-foreground/70">
                  {story.headphonesNote}
                </p>
              </div>
            )}

            <div 
              className={cn(
                "text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground leading-relaxed transition-all duration-1000",
                isAudioEnabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ animationDelay: '2s' }}
            >
              {story.subtitle}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground/50 text-sm animate-bounce">
            Scroll to explore
          </div>
        </section>

        {/* Story sections */}
        {story.sections.map((section, sectionIndex) => (
          <section 
            key={section.id}
            data-section={section.id}
            className="min-h-screen flex flex-col justify-center px-6 py-32"
          >
            <div className="max-w-4xl mx-auto">
              <h2 
                className={cn(
                  "text-3xl md:text-5xl lg:text-6xl font-light mb-16 transition-all duration-1000",
                  visibleSections[section.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                {section.title}
              </h2>
              
              <div className="space-y-8">
                {section.id === 'timeline' ? (
                  <div className="relative">
                    {/* Timeline line for timeline section */}
                    <div className="absolute left-[120px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20" />
                    {section.content.map((item, index) => (
                      <TimelineItem 
                        key={index}
                        text={item} 
                        index={index}
                        sectionId={section.id}
                      />
                    ))}
                  </div>
                ) : (
                  section.content.map((paragraph, index) => (
                    <div key={index} className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
                      <AnimatedText 
                        text={paragraph} 
                        sectionId={section.id} 
                        index={index}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Closing section */}
        <section 
          data-section="closing"
          className="min-h-screen flex flex-col justify-center items-center text-center px-6"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <div 
              className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-light transition-all duration-1000",
                visibleSections.closing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              The journey continues...
            </div>
            
            <div 
              className={cn(
                "text-xl md:text-2xl text-muted-foreground transition-all duration-1000",
                visibleSections.closing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: '500ms' }}
            >
              Ready to be part of the next chapter?
            </div>

            <div 
              className={cn(
                "transition-all duration-1000",
                visibleSections.closing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: '1s' }}
            >
              <Link to="/#contact">
                <Button 
                  size="lg" 
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 backdrop-blur-sm"
                >
                  Let's Connect
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Background audio */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        className="hidden"
      >
        <source src="/assets/ambient-sound.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MyStory;