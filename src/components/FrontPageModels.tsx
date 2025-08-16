// Import the model images
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

        {/* Grid Layout for Individual Model Boxes */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Single column carousel-like, Desktop: Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Vertical Image Container */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={model.src}
                    alt={model.alt}
                    className="w-full h-full object-contain bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Model Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{model.alt}</h3>
                  <p className="text-sm opacity-90">Latest Collection</p>
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
