import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useHeroBg } from "@/components/HeroBgContext";
import heroImage1 from "@/assets/beigeblack.jpg";
import heroImage2 from "@/assets/beigeblack2.png";
import heroVideo from "@/assets/hero-back.mp4";
import FFlogo from "@/assets/FFlogo.png";

// Typewriter effect hook
function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const { heroBg, toggleHeroBg } = useHeroBg();
  const tagline = useTypewriter("Luxury streetwear, crafted for royalty.", 40);

  // Auto-toggle hero background every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      toggleHeroBg();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [toggleHeroBg]);

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
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* Parallax Background Image (fallback, can be removed if not needed) */}
      {/*
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-700 z-10"
        style={{ backgroundImage: `url(${heroBg === 'beigeblack.jpg' ? heroImage1 : heroImage2})`, opacity: 0.5 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />
      </div>
      */}

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
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center pt-16 md:pt-24 opacity-100"
        tabIndex={-1}
        aria-label="FitForge Hero Content"
      >
        {/* Glassmorphism background removed */}
        {/* <div className="absolute inset-0 mx-auto max-w-3xl h-full rounded-3xl bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40 z-[-1]" aria-hidden="true"></div> */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight tracking-tight animate-hero-slide-in flex flex-col items-center animate-float-slow" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          <span className="block mb-4 pt-6 md:pt-8 relative">
            <img src={FFlogo} alt="FitForge Logo" className="mx-auto animate-bounce-slow rounded-full shadow-2xl border-4 border-white/70" style={{ width: '120px', height: '120px', objectFit: 'cover', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }} />
            {/* Glowing circle behind logo, color changes with toggle */}
            <span
              className={`absolute inset-0 rounded-full z-[-1] blur-2xl opacity-70 animate-pulse-slow ${heroBg === 'beigeblack.jpg' ? 'bg-yellow-200' : 'bg-gray-200'}`}
              style={{ boxShadow: heroBg === 'beigeblack.jpg' ? '0 0 60px 20px #f7e9b0' : '0 0 60px 20px #e5e7eb' }}
              aria-hidden="true"
            />
          </span>
          <span className="text-white">Forge</span>
          <span
            className={`block bg-clip-text text-transparent animate-hero-slide-in-delay ${heroBg === 'beigeblack.jpg' ? 'bg-gradient-hero' : 'bg-gradient-to-r from-[hsl(45,33%,40%)] via-[hsl(45,33%,50%)] to-[hsl(45,33%,40%)]'}`}
          >
            Your Style
          </span>
        </h1>
        {/* Tagline/subtitle for extra brand messaging with typewriter effect */}
        <div className="text-lg md:text-2xl text-white font-serif italic mb-8 animate-hero-fade-in-delay2 min-h-[2.5em] mt-8">
          {tagline}
          <span className="inline-block w-2 h-6 align-middle bg-white animate-typewriter-cursor ml-1" />
        </div>



        <Button
          onClick={scrollToFeatured}
          className="relative inline-flex items-center px-6 py-3 text-lg font-semibold text-brand-dark bg-brand-light rounded-full shadow-md hover:bg-brand-light/90 transition-all duration-300 group focus:ring-2 focus:ring-brand-purple focus:outline-none before:absolute before:inset-0 before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 before:bg-gradient-to-r before:from-brand-purple/30 before:to-brand-light/30 hover:before:opacity-100"
          aria-label="Scroll to featured collection"
        >
          Discover More
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;