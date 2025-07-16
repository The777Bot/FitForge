import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-24">
        <Hero />
        <FeaturedSection onAddToCart={addToCart} />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
