import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageBack?: string;
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
  imageBack, 
  category, 
  isNew, 
  isSale, 
  onAddToCart
}: ProductCardProps) => {
  // Determine if this is one of the shirts that should be zoomed out
  const isZoomedOutShirt = name === "Visionary + Beige Boy T-shirt" || name === "Charcoal Boy T-shirt" || name === "White girl T-shirt";
  return (
    <Card
      className="group relative overflow-hidden border border-foreground bg-gradient-card glass-effect shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 hover-lift rounded-3xl focus-within:ring-2 focus-within:ring-brand-purple"
      tabIndex={0}
      aria-label={`View details for ${name}`}
    >
      <Link to={`/product/${id}`} className="block focus:outline-none" tabIndex={-1} aria-label={`View details for ${name}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        {/* Product Image (front and back on hover) */}
        <div className="aspect-square overflow-hidden rounded-t-3xl relative">
          <img
            src={image}
            alt={name}
            className={`w-full h-full ${isZoomedOutShirt ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110 group-focus:scale-110 ${imageBack ? 'absolute inset-0 z-10 group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-500' : ''}`}
          />
          {imageBack && (
            <img
              src={imageBack}
              alt={name + ' back view'}
              className={`w-full h-full ${isZoomedOutShirt ? 'object-contain' : 'object-cover'} absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500`}
            />
          )}
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
            tabIndex={-1}
          >
            <Heart className="h-4 w-4" />
          </Button>
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
                Rs {price}
            </span>
            {originalPrice && (
                <span className="line-through text-muted-foreground font-semibold">
                  Rs {originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      </Link>
      {/* Enhanced Quick Add to Cart (outside Link so it doesn't trigger navigation) */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 z-10">
        <Button
          className="w-full backdrop-blur-md rounded-2xl font-bold bg-[hsl(45,33%,90%)] text-[hsl(0,0%,10%)] border border-[hsl(45,33%,90%)] hover:bg-[hsl(45,33%,95%)] hover:text-[hsl(0,0%,0%)] transition animate-scale-in"
          onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart({ id, name, price, image }); }}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;