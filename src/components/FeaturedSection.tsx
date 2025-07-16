import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

interface FeaturedSectionProps {
  onAddToCart?: (product: { id: string; name: string; price: number; image: string }) => void;
}

const FeaturedSection = ({ onAddToCart }: FeaturedSectionProps) => {
  // Mock product data
  const featuredProducts = [
    {
      id: "1",
      name: "Urban Bomber Jacket",
      price: 89,
      originalPrice: 120,
      image: featuredImage,
      category: "Outerwear",
      isNew: true,
      isSale: true
    },
    {
      id: "2",
      name: "Classic Hoodie",
      price: 65,
      image: featuredImage,
      category: "Hoodies",
      isNew: false,
      isSale: false
    },
    {
      id: "3",
      name: "Slim Fit Jeans",
      price: 78,
      image: featuredImage,
      category: "Denim",
      isNew: true,
      isSale: false
    },
    {
      id: "4",
      name: "Streetwear Tee",
      price: 35,
      originalPrice: 45,
      image: featuredImage,
      category: "T-Shirts",
      isNew: false,
      isSale: true
    }
  ];

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
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
          <Button variant="accent" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;