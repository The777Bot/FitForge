import FeaturedSection from "@/components/FeaturedSection";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Collection = () => {
  const { addToCart } = useContext(CartContext);
  return (
    <main className="space-y-24 py-24">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">Featured Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">Discover our handpicked selection of the latest and greatest in streetwear fashion.</p>
      </section>
      <FeaturedSection onAddToCart={addToCart} />
    </main>
  );
};

export default Collection;