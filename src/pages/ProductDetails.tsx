import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "@/assets/products";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useContext } from "react";
import { X } from "lucide-react";
import { CartContext, CartUIContext } from "@/components/CartContext";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["Black", "White", "Beige", "Purple"];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { setCartOpen } = useContext(CartUIContext);
  const product = allProducts.find((p) => p.id === id);
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [showBack, setShowBack] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find that product.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id + (size ? `-${size}` : "") + (color ? `-${color}` : ""),
        name: `${product.name}${size ? ` (${size}` : ""}${color ? `, ${color}` : ""}${size ? ")" : ""}`,
        price: product.price,
        image: product.image,
      });
    }
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative py-16"
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay: dark and blurred */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch relative z-10 overflow-hidden">
        {/* Close button inside card */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-black border border-gray-300 shadow"
          onClick={() => navigate(-1)}
          aria-label="Close product details"
        >
          <X className="w-6 h-6 text-black" />
        </Button>
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[340px]">
          <div className="aspect-square w-full max-w-[340px] bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
            <img
              src={showBack && product.imageBack ? product.imageBack : product.image}
              alt={product.name + (showBack && product.imageBack ? ' back view' : '')}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {product.imageBack && (
              <button
                className="absolute bottom-2 right-2 bg-white/80 text-black px-3 py-1 rounded-full shadow hover:bg-gray-200 transition"
                onClick={() => setShowBack((prev) => !prev)}
                type="button"
                aria-label={showBack ? 'View Front' : 'View Back'}
              >
                {showBack ? 'View Front' : 'View Back'}
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 w-full justify-center min-w-0">
          <h1 className="text-3xl font-bold text-black mb-1">{product.name}</h1>
          <p className="text-base text-gray-900 font-semibold mb-1 uppercase tracking-widest">{product.category}</p>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-black text-black">${product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-gray-500 font-semibold">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            {product.isNew && <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold mr-2">NEW</span>}
            {product.isSale && <span className="bg-yellow-200 text-black px-3 py-1 rounded-full text-xs font-bold">SALE</span>}
          </div>
          {/* Options */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
              <div className="w-32">
                <label className="block text-sm font-semibold mb-1 text-black">Size</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32">
                <label className="block text-sm font-semibold mb-1 text-black">Color</label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24">
                <label className="block text-sm font-semibold mb-1 text-black">Quantity</label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <Button
              variant="brand"
              size="lg"
              className="mt-2 w-full md:w-auto"
              disabled={!size || !color}
              onClick={handleAddToCart}
            >
              {added ? "Added!" : "Add to Cart"}
            </Button>
          </div>
          {/* Description or more details can go here */}
          <div className="mt-6 text-black text-base font-medium">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder for the product description. You can add more details here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 