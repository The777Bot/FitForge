import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { allProducts } from "@/assets/products";
import { useNavigate } from "react-router-dom";

interface FeaturedSectionProps {
  onAddToCart?: (product: { id: string; name: string; price: number; image: string }) => void;
}

const FeaturedSection = ({ onAddToCart }: FeaturedSectionProps) => {
  const navigate = useNavigate();
  
  // Available products: not marked as COMING SOON
  const availableProducts = allProducts.filter((p) => p.tag !== "COMING SOON");

  // Remove duplicates by id and take first 6 for the featured grid
  const uniqueProducts = availableProducts.filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  ).slice(0, 6);

  const handleViewAllProducts = () => {
    navigate('/collection');
  };

  return (
    <section id="featured" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked pieces that define modern streetwear. Discover the latest trends 
            and timeless classics that elevate your wardrobe.
          </p>
        </div>

        {/* Products Grid - Up to 6 products in 3x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {uniqueProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart ? () => onAddToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
              }) : undefined}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="accent" size="lg" onClick={handleViewAllProducts}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;