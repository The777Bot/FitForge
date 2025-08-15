import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "@/assets/products";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useContext, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Star, Truck, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import { CartContext, CartUIContext } from "@/components/CartContext";

const SIZES = [ "S", "M", "L"];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { setCartOpen } = useContext(CartUIContext);
  const product = allProducts.find((p) => p.id === id);
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find that product.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!size) {
      // Show error or alert that size is required
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id + (size ? `-${size}` : ""),
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
      });
    }
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Scroll to top when component mounts or when submitted changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add keyboard support for ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e7dbc7]/20 via-background to-[#a67c52]/10">
      {/* Header Navigation */}
      <div className="absolute top-8 left-8 z-30">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/90 hover:bg-white text-[#1a1a1a] border border-[#a67c52]/20 shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#a67c52]/10 overflow-hidden relative">
            {/* Close Button Inside Product Card */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 right-6 z-40 w-10 h-10 bg-[#a67c52] hover:bg-[#805206] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20"
              aria-label="Close product details"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-[#e7dbc7]/30 to-[#a67c52]/10 p-8">
                <div className="aspect-square w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative">
                  <img
                    src={showBack && product.imageBack ? product.imageBack : product.image}
                    alt={product.name + (showBack && product.imageBack ? ' back view' : '')}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                  {product.imageBack && (
                    <button
                      className="absolute bottom-4 right-4 bg-white/90 text-[#1a1a1a] px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 font-medium border border-[#a67c52]/20"
                      onClick={() => setShowBack((prev) => !prev)}
                      type="button"
                      aria-label={showBack ? 'View Front' : 'View Back'}
                    >
                      {showBack ? 'View Front' : 'View Back'}
                    </button>
                  )}
                </div>
                
                {/* Trust Badges */}
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-full border border-[#a67c52]/20">
                    <Shield className="w-4 h-4 text-[#a67c52]" />
                    <span className="text-xs font-medium text-[#1a1a1a]">Authentic</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-full border border-[#a67c52]/20">
                    <Truck className="w-4 h-4 text-[#a67c52]" />
                    <span className="text-xs font-medium text-[#1a1a1a]">Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-8 lg:p-12 bg-white">
                {/* Product Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {product.isNew && (
                      <span className="bg-[#a67c52] text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#e7dbc7] text-[#1a1a1a] px-3 py-1 rounded-full text-xs font-bold border border-[#a67c52]/30">SALE</span>
                    )}
                    {product.tag === 'COMING SOON' && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">COMING SOON</span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
                    {product.name}
                  </h1>
                  
                  <p className="text-lg text-[#805206] font-medium mb-4 uppercase tracking-wider">
                    {product.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-[#a67c52]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-[#e7dbc7]/30 to-[#a67c52]/10 rounded-2xl border border-[#a67c52]/20">
                  {!product.tag || product.tag !== 'COMING SOON' ? (
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-[#1a1a1a]">Rs {product.price}</span>
                      {product.originalPrice && (
                        <span className="line-through text-[#805206] font-semibold text-lg">Rs {product.originalPrice}</span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-[#a67c52] text-white px-3 py-1 rounded-full text-sm font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-2xl font-semibold text-[#805206]">Coming Soon</span>
                  )}
                </div>

                {/* Product Options */}
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#1a1a1a]">Size</label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="w-full border-[#a67c52]/30 focus:border-[#a67c52] focus:ring-[#a67c52]/20">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {SIZES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#1a1a1a]">Quantity</label>
                      <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="w-full border-[#a67c52]/30 focus:border-[#a67c52] focus:ring-[#a67c52]/20"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[#a67c52] hover:text-[#805206] underline transition-colors"
                      onClick={() => setShowSizeChart(true)}
                    >
                      View Size Chart
                    </button>
                    <div className="flex items-center gap-2 text-sm text-[#805206]">
                      <CheckCircle className="w-4 h-4 text-[#a67c52]" />
                      <span>Free shipping on orders above 2000 PKR</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-[#a67c52] hover:bg-[#805206] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.tag === 'COMING SOON' || !size}
                  onClick={handleAddToCart}
                >
                  {product.tag === 'COMING SOON' ? 'Coming Soon' : (added ? 'Added to Cart!' : 'Add to Cart')}
                </Button>

                {/* Product Description */}
                <div className="mt-8 p-6 bg-[#e7dbc7]/20 rounded-2xl border border-[#a67c52]/20">
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Product Details</h3>
                  <p className="text-[#1a1a1a] text-base leading-relaxed">
                    FitForge's premium quality shirt combines ultra-soft, breathable fabric with a tailored fit for all-day comfort. 
                    Designed for durability and style, it's perfect for both casual wear and active lifestyles. 
                    Each piece is crafted with attention to detail and premium materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Dialog */}
      <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
        <DialogContent className="bg-white border border-[#a67c52]/20 rounded-2xl max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1a1a1a]">Size Chart</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <img
              src="/assets/size_chart.jpg"
              alt="Size chart"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails; 