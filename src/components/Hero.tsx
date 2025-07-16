import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/beigeblack.jpg";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Animate content in
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.add("animate-hero-fade-in");
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

      {/* Animated Content + Side Image */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center opacity-0 min-h-screen text-center"
        tabIndex={-1}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-light mb-8 leading-none tracking-tight animate-hero-slide-in">
          Forge
          <span className="block bg-gradient-hero bg-clip-text text-transparent animate-hero-slide-in-delay">Your Style</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-brand-light/90 mb-12 max-w-3xl font-light leading-relaxed animate-hero-fade-in-delay mx-auto">
          Discover premium streetwear and contemporary fashion that defines your unique identity.
          <span className="block mt-2 text-brand-purple-light font-medium">Quality meets style in every piece.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6 animate-hero-fade-in-delay2 justify-center items-center">
          <Button
            variant="hero"
            size="xl"
            className="group text-lg px-16 py-6 hero-glow focus-visible:ring-4 focus-visible:ring-brand-purple"
            onClick={scrollToFeatured}
            aria-label="Shop Now"
          >
            Shop Now
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          <Button
            variant="modern"
            size="xl"
            className="text-lg px-16 py-6"
            onClick={scrollToFeatured}
            aria-label="View Collections"
          >
            View Collections
          </Button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToFeatured}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hover:scale-105 transition-transform duration-300 group cursor-pointer"
        aria-label="Scroll to featured section"
      >
        <div className="w-6 h-10 border-2 border-brand-light/50 rounded-full flex justify-center group-hover:border-brand-light/80 transition-colors duration-300 bg-black/10 backdrop-blur-sm">
          <div className="w-1 h-3 bg-brand-light/70 rounded-full mt-2 animate-pulse group-hover:bg-brand-light transition-colors duration-300"></div>
        </div>
        <p className="text-brand-light/70 text-sm mt-2 group-hover:text-brand-light transition-colors duration-300">Scroll</p>
      </button>
    </section>
  );
};

export default Hero;