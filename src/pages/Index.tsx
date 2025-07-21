import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroSection2 from "@/components/HeroSection2";
import FeaturedSection from "@/components/FeaturedSection";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  const { addToCart } = useContext(CartContext);
  const bannerText = "free shipping over 2000-Rs (for Lahore only)";
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="flex flex-col">
        <Hero />
          {/* Moving Red Headline Banner */}
          <div className="w-full flex overflow-hidden py-2 bg-red-600">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="text-white font-bold text-lg tracking-wide py-2 px-12">
                {bannerText}
                <span className="mx-12">|</span>
                {bannerText}
                <span className="mx-12">|</span>
                {bannerText}
              </span>
              <span className="text-white font-bold text-lg tracking-wide py-2 px-12">
                {bannerText}
                <span className="mx-12">|</span>
                {bannerText}
                <span className="mx-12">|</span>
                {bannerText}
              </span>
            </div>
          </div>
          <HeroSection2 />
        </div>
        <div className="space-y-24">
        <FeaturedSection onAddToCart={addToCart} />
        <Categories />
        <Newsletter />
        </div>
      </main>
    </div>
  );
};

export default Index;
