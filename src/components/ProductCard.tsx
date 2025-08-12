import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  tag?: string; 
  onAddToCart?: (product: { id: string; name: string; price: number; image: string; size: string }) => void;
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
  tag,
  onAddToCart
}: ProductCardProps) => {
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  
  // Determine if this is one of the shirts that should be zoomed out
  const isZoomedOutShirt = name === "Visionary + Beige Boy T-shirt" || name === "Charcoal Boy T-shirt" || name === "White girl T-shirt";
  
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSizeDialog(true);
  };
  
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setShowSizeDialog(false);
    onAddToCart && onAddToCart({ id, name, price, image, size });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="group relative overflow-hidden border border-foreground bg-gradient-card glass-effect shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 hover-lift rounded-3xl focus-within:ring-2 focus-within:ring-brand-purple h-full flex flex-col"
      >
         {/* Tag Badge - Add this back */}
         {tag && (
          <div className="absolute top-3 left-3 z-20">
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
              tag === "NEW" 
                ? "bg-green-500 text-white" 
                : tag === "COMING SOON"
                ? "bg-orange-500 text-white"
                : "bg-brand-purple text-white"
            }`}>
              {tag}
            </span>
          </div>
        )}
        <Link
          to={`/product/${id}`}
          className="block focus:outline-none flex flex-col h-full"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="relative overflow-hidden rounded-t-3xl">
            {/* Image Container */}
            <div
              className="aspect-square overflow-hidden rounded-t-3xl relative"
              style={{ background: "linear-gradient(145deg, hsl(0 0% 12%), hsl(45 33% 80%))" }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {imageBack && (
                <img
                  src={imageBack}
                  alt={`${name} back view`}
                  className="w-full h-full object-cover absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
            </div>
          </div>

          {/* Details Section */}
          <CardContent className="p-6 bg-gradient-to-b from-card to-brand-surface/30 flex flex-col justify-between flex-grow">
            <div className="space-y-3 flex-grow">
              <p className="text-xs text-brand-purple uppercase tracking-widest font-bold">
                {category}
              </p>
              <h3 className="font-bold text-lg text-foreground group-hover:text-brand-purple transition-colors duration-300 line-clamp-2">
                {name}
              </h3>
            </div>

            {/* Price Section pinned at bottom */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-black text-black">Rs {price}</span>
              {originalPrice && (
                <span className="line-through text-muted-foreground font-semibold">
                  Rs {originalPrice}
                </span>
              )}
            </div>
          </CardContent>
        </Link>

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
          <Button
            className="w-full backdrop-blur-md rounded-2xl font-bold bg-[hsl(45,33%,90%)] text-[hsl(0,0%,10%)] border border-[hsl(45,33%,90%)] hover:bg-[hsl(45,33%,95%)] hover:text-[hsl(0,0%,0%)]"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Card>

      {/* Size Selection Dialog */}
      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="bg-card border border-border rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Select Size
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Choose your size for: <span className="font-semibold text-foreground">{name}</span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  className="h-12 text-lg font-semibold border-2 hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-200"
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProductCard;