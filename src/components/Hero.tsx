import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/beigeblack.jpg";
import FFlogo from "@/assets/FFlogo.jpeg";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.3;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate content in and ensure opacity is set to 100 after animation
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.add("animate-hero-fade-in");
      const handleAnimationEnd = () => {
        setContentVisible(true);
      };
      const node = contentRef.current;
      node.addEventListener("animationend", handleAnimationEnd);
      return () => node.removeEventListener("animationend", handleAnimationEnd);
    }
  }, []);

  const scrollToFeatured = () => {
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Parallax Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-700"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
      </div>

      {/* Animated Sparkle/Glow Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Example sparkles using CSS animation, can be enhanced with a library if desired */}
        <span className="absolute left-1/4 top-1/3 w-6 h-6 bg-gradient-to-br from-yellow-100/80 to-yellow-300/40 rounded-full blur-2xl opacity-60 animate-pulse-slow" />
        <span className="absolute right-1/5 top-1/4 w-4 h-4 bg-gradient-to-br from-purple-200/70 to-brand-purple/30 rounded-full blur-xl opacity-50 animate-pulse-slow2" />
        <span className="absolute left-1/3 bottom-1/4 w-8 h-8 bg-gradient-to-br from-white/60 to-yellow-100/30 rounded-full blur-2xl opacity-40 animate-pulse-slow3" />
        <span className="absolute right-1/3 bottom-1/5 w-5 h-5 bg-gradient-to-br from-brand-purple/60 to-white/20 rounded-full blur-xl opacity-40 animate-pulse-slow4" />
      </div>

      {/* Animated Content + Side Image */}
      <div
        ref={contentRef}
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
        tabIndex={-1}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-light mb-8 leading-none tracking-tight animate-hero-slide-in flex flex-col items-center">
          <span className="block mb-4">
            <img src={FFlogo} alt="FitForge Logo" className="mx-auto animate-bounce-slow rounded-full shadow-lg" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
          </span>
          Forge
          <span className="block bg-gradient-hero bg-clip-text text-transparent animate-hero-slide-in-delay">Your Style</span>
        </h1>
        {/* Tagline/subtitle for extra brand messaging */}
        <div className="text-lg md:text-2xl text-brand-light/80 font-serif italic mb-8 animate-hero-fade-in-delay2">Luxury streetwear, crafted for royalty.</div>

        <Button
          onClick={scrollToFeatured}
          className="relative inline-flex items-center px-6 py-3 text-lg font-semibold text-brand-dark bg-brand-light rounded-full shadow-md hover:bg-brand-light/90 transition-all duration-300 group"
        >
          Discover More
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;