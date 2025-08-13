import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroSection2 from "@/components/HeroSection2";
import FeaturedSection from "@/components/FeaturedSection";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  const { addToCart } = useContext(CartContext);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col">
        <Hero />
        {/* 7 Days Sale Timer */}
        <div className="w-full py-4 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400">
          <div className="text-center">
            <div className="text-white drop-shadow-lg font-extrabold text-xl mb-2 tracking-wide">
              🎉 FLASH SALE: 20% OFF ALL PRODUCTS! 🎉
            </div>
            <div className="text-white text-lg">
              Ends in: 
              <span className="font-bold mx-2 bg-white text-rose-600 px-3 py-1 rounded-lg">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </div>
        </div>
        <HeroSection2 />
        <div className="bg-background">
          <FeaturedSection onAddToCart={addToCart} />
          <Categories />
          <Newsletter />
        </div>
      </main>
    </div>
  );
};

export default Index;