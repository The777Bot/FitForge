import FeaturedSection from "@/components/FeaturedSection";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Collection = () => {
  const { addToCart } = useContext(CartContext);
  return (
    <main className="space-y-24 py-24">
      <FeaturedSection onAddToCart={addToCart} />
    </main>
  );
};

export default Collection;