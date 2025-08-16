import { useState, useEffect } from "react";

// Import the model images
import model1 from "@/assets/Front_page_models/Front_model1.png";
import model2 from "@/assets/Front_page_models/Front_model2.png";
import model3 from "@/assets/Front_page_models/Front_model3.png";
import model4 from "@/assets/Front_page_models/Front_model.png";

const FrontPageModels = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Model images array
  const models = [
    { src: model1, alt: "Front Model 1" },
    { src: model2, alt: "Front Model 2" },
    { src: model3, alt: "Front Model 3" },
    { src: model4, alt: "Front Model" },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (models.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % models.length);
    }, 3000); // Change slide every 3 seconds

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

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Slides */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
            {models.map((model, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-full"
                }`}
              >
                <img
                  src={model.src}
                  alt={model.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPageModels;
