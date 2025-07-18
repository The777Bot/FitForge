import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

const Gaming = () => {
  // Mock gaming products
  const gamingProducts = [
    {
      id: "g1",
      name: "Retro Console Tee",
      price: 60,
      originalPrice: 75,
      image: featuredImage,
      category: "Gaming",
      isNew: true,
      isSale: false
    },
    {
      id: "g2",
      name: "Pixel Hero Hoodie",
      price: 85,
      image: featuredImage,
      category: "Gaming",
      isNew: false,
      isSale: true
    },
    {
      id: "g3",
      name: "Arcade Champion Cap",
      price: 30,
      image: featuredImage,
      category: "Gaming",
      isNew: true,
      isSale: false
    },
    {
      id: "g4",
      name: "Gamer's Bomber Jacket",
      price: 110,
      image: featuredImage,
      category: "Gaming",
      isNew: false,
      isSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>Gaming Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Level up your style with our Gaming-inspired apparel and gear. New arrivals and exclusive releases coming soon!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {gamingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gaming;