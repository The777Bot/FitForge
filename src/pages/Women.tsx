import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

const Women = () => {
  // Mock women's products
  const womenProducts = [
    {
      id: "w1",
      name: "Women's Urban Jacket",
      price: 105,
      originalPrice: 140,
      image: featuredImage,
      category: "Outerwear",
      isNew: true,
      isSale: true
    },
    {
      id: "w2",
      name: "Women's Classic Tee",
      price: 42,
      image: featuredImage,
      category: "T-Shirts",
      isNew: false,
      isSale: false
    },
    {
      id: "w3",
      name: "Women's Slim Jeans",
      price: 88,
      image: featuredImage,
      category: "Denim",
      isNew: false,
      isSale: true
    },
    {
      id: "w4",
      name: "Women's Hoodie",
      price: 75,
      image: featuredImage,
      category: "Hoodies",
      isNew: true,
      isSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>Women's Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Elegance meets street style. Discover the latest in women's fashion.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Women;