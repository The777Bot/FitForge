// Import the model images
import { useState, useEffect } from "react";
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

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % models.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [models.length]);

  if (models.length === 0) {
    return null; // Don't render if no models
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-[#e7dbc7]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Featured
            <span className="block bg-gradient-to-r from-[#a67c52] to-[#805206] bg-clip-text text-transparent">
              Models
            </span>
          </h2>
          <p className="text-lg text-[#805206] max-w-2xl mx-auto">
            Discover our latest collections through stunning model photography
          </p>
        </div>

        {/* Auto-scrolling Carousel Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Single image carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {models.map((model, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-sm">
                    {/* Vertical Image Container - Fixed aspect ratio to prevent cropping */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={model.src}
                        alt={model.alt}
                        className="w-full h-full object-contain bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]"
                      />
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
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-[#a67c52]' : 'bg-gray-300'
                  }`}
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
                className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                  index === currentIndex ? 'ring-4 ring-[#a67c52] shadow-2xl scale-105' : 'hover:shadow-xl hover:scale-102'
                }`}
              >
                {/* Vertical Image Container - Improved for desktop to prevent cropping */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={model.src}
                    alt={model.alt}
                    className="w-full h-full object-contain bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
