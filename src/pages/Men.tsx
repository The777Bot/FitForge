import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

const Men = () => {
  // Mock men's products
  const menProducts = [
    {
      id: "m1",
      name: "Men's Urban Jacket",
      price: 99,
      originalPrice: 130,
      image: featuredImage,
      category: "Outerwear",
      isNew: true,
      isSale: true
    },
    {
      id: "m2",
      name: "Men's Classic Tee",
      price: 39,
      image: featuredImage,
      category: "T-Shirts",
      isNew: false,
      isSale: false
    },
    {
      id: "m3",
      name: "Men's Slim Jeans",
      price: 82,
      image: featuredImage,
      category: "Denim",
      isNew: false,
      isSale: true
    },
    {
      id: "m4",
      name: "Men's Hoodie",
      price: 70,
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
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>Men's Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Bold styles for the modern man. Shop the latest trends and timeless classics.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {menProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Men;