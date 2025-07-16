import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  onAddToCart?: (product: { id: string; name: string; price: number; image: string }) => void;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isNew, 
  isSale, 
  onAddToCart
}: ProductCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden border border-foreground bg-background shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-300 hover-lift rounded-3xl focus-within:ring-2 focus-within:ring-brand-purple"
      tabIndex={0}
      aria-label={`View details for ${name}`}
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-focus:scale-110"
          />
        </div>

        {/* Modern Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-foreground text-background px-4 py-2 text-xs font-bold rounded-full shadow-sm backdrop-blur-sm animate-fade-in">NEW</span>
          )}
          {isSale && (
            <span className="bg-background text-foreground px-4 py-2 text-xs font-bold rounded-full border border-foreground shadow-sm animate-fade-in">SALE</span>
          )}
        </div>

        {/* Modern Wishlist Button */}
        <Button
          variant="modern"
          size="icon"
          aria-label="Add to wishlist"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 backdrop-blur-md bg-background border border-foreground text-foreground hover:bg-brand-purple/10 focus:bg-brand-purple/10"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Enhanced Quick Add to Cart */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0">
          <Button
            variant="hero"
            className="w-full backdrop-blur-md rounded-2xl font-bold bg-[hsl(45,33%,90%)] text-[hsl(0,0%,10%)] border border-[hsl(45,33%,90%)] hover:bg-[hsl(45,33%,95%)] hover:text-[hsl(0,0%,0%)] transition animate-scale-in"
            onClick={() => onAddToCart && onAddToCart({ id, name, price, image })}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-6 bg-gradient-to-b from-card to-brand-surface/30">
        <div className="space-y-3">
          <p className="text-xs text-brand-purple uppercase tracking-widest font-bold">
            {category}
          </p>
          <h3 className="font-bold text-lg text-foreground group-hover:text-brand-purple group-focus:text-brand-purple transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-brand-dark bg-gradient-accent bg-clip-text text-transparent">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through bg-muted/50 px-2 py-1 rounded-lg">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;