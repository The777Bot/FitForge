// Import the model images
import { useState, useEffect, useRef } from "react";
import model1 from "@/assets/Front_page_models/Front_model1.png";
import model2 from "@/assets/Front_page_models/Front_model2.png";
import model3 from "@/assets/Front_page_models/Front_model3.png";
import model4 from "@/assets/Front_page_models/Front_model.png";

const FrontPageModels = () => {
  // Model images array
  const models = [
    { src: model1, alt: "Front Model 1" },
    { src: model2, alt: "Front Model 2" },
    { src: model3, alt: "Front Model 3" },
    { src: model4, alt: "Front Model" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  // Small inline component to show a skeleton + fade/blur transition while the image loads
  function ImageWithPlaceholder({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className={`w-full h-full relative ${className ?? ""}`}>
        {/* Skeleton / shimmer */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" aria-hidden="true" />
        )}

        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-700 ease-out ${loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-102'}`}
        />
      </div>
    );
  }

  // Auto-scroll functionality with pause-on-interaction and preloading next image
  useEffect(() => {
    const start = () => {
      if (intervalRef.current) return;
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % models.length);
      }, 3000);
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Start auto-scroll initially
    start();

    // Pause when user is interacting (hover, touchstart, focus)
    const onInteractionStart = () => {
      isInteractingRef.current = true;
      stop();
    };
    const onInteractionEnd = () => {
      isInteractingRef.current = false;
      start();
    };

    window.addEventListener('pointerdown', onInteractionStart, { passive: true });
    window.addEventListener('touchstart', onInteractionStart, { passive: true });
    window.addEventListener('pointerup', onInteractionEnd, { passive: true });
    window.addEventListener('touchend', onInteractionEnd, { passive: true });

    return () => {
      stop();
      window.removeEventListener('pointerdown', onInteractionStart);
      window.removeEventListener('touchstart', onInteractionStart);
      window.removeEventListener('pointerup', onInteractionEnd);
      window.removeEventListener('touchend', onInteractionEnd);
    };
  }, [models.length]);

  // Preload next image whenever currentIndex changes
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % models.length;
    const img = new Image();
    img.src = models[nextIndex].src;
    // no cleanup necessary
  }, [currentIndex, models]);

  if (models.length === 0) {
    return null; // Don't render if no models
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-[#e7dbc7]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          
          <p className="text-lg text-[#805208] max-w-2xl mx-auto">
            Discover our latest collections 
          </p>
        </div>

        {/* Auto-scrolling Carousel Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Single image carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onMouseEnter={() => { isInteractingRef.current = true; if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } }}
              onMouseLeave={() => { isInteractingRef.current = false; if (!intervalRef.current) { intervalRef.current = window.setInterval(() => setCurrentIndex((p) => (p + 1) % models.length), 3000); } }}
            >
              {models.map((model, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-sm">
                    {/* Vertical Image Container - Fixed aspect ratio to prevent cropping */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <ImageWithPlaceholder src={model.src} alt={model.alt} priority={index === currentIndex} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {models.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-[#a67c52]' : 'bg-gray-300'}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout with auto-scroll highlight */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${index === currentIndex ? 'ring-4 ring-[#a67c52] shadow-2xl scale-105' : 'hover:shadow-xl hover:scale-102'}`}
              >
                {/* Vertical Image Container - Improved for desktop to prevent cropping */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <ImageWithPlaceholder src={model.src} alt={model.alt} priority={index === currentIndex} />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Soft caption / CTA */}
                  <div className="absolute left-4 bottom-4 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/50 px-3 py-1 rounded-full">View Collection</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPageModels;
