import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/h1.jpg";
import heroVideo from "@/assets/h2.mp4";
import { motion } from "framer-motion";

const HeroSection2 = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row overflow-hidden">
      {/* Image Section (30%) */}
      <div className="w-full md:w-[30%] relative h-[40vh] md:h-[80vh]">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Video Section (70%) with Content */}
      <div className="w-full md:w-[70%] relative h-[40vh] md:h-[80vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
        
        {/* Video Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Elevate Your
              <span className="block bg-gradient-to-r from-[#e7dbc7] to-[#a67c52] bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover our premium collection of fitness apparel designed to enhance your performance and style.
            </motion.p>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#e7dbc7] text-[#1a1a1a] hover:bg-[#a67c52] transition-all duration-300"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#e7dbc7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#a67c52]/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection2; 