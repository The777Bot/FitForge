import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

const Unisex = () => {
  // Mock unisex products
  const unisexProducts = [
    {
      id: "u1",
      name: "Unisex Bomber Jacket",
      price: 95,
      originalPrice: 125,
      image: featuredImage,
      category: "Outerwear",
      isNew: true,
      isSale: false
    },
    {
      id: "u2",
      name: "Unisex Hoodie",
      price: 68,
      image: featuredImage,
      category: "Hoodies",
      isNew: false,
      isSale: true
    },
    {
      id: "u3",
      name: "Unisex Tee",
      price: 38,
      image: featuredImage,
      category: "T-Shirts",
      isNew: true,
      isSale: false
    },
    {
      id: "u4",
      name: "Unisex Jeans",
      price: 80,
      image: featuredImage,
      category: "Denim",
      isNew: false,
      isSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      <main className="flex flex-col items-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-hero bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Ethnocentric Bold, Playfair Display, DM Serif Display, serif' }}>
          Unisex Collection
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">
          Explore our versatile unisex styles designed for everyone. Fashion
          without boundaries, comfort without compromise.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {unisexProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Unisex;