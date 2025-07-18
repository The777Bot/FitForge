import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import featuredImage from "@/assets/featured-collection.jpg";

const Anime = () => {
  // Mock anime products
  const animeProducts = [
    {
      id: "a1",
      name: "Dragon Spirit Tee",
      price: 55,
      originalPrice: 70,
      image: featuredImage,
      category: "Anime",
      isNew: true,
      isSale: false
    },
    {
      id: "a2",
      name: "Pixel Hero Hoodie",
      price: 80,
      image: featuredImage,
      category: "Anime",
      isNew: false,
      isSale: true
    },
    {
      id: "a3",
      name: "Sakura Wave Jacket",
      price: 120,
      image: featuredImage,
      category: "Anime",
      isNew: true,
      isSale: false
    },
    {
      id: "a4",
      name: "Retro Console Cap",
      price: 35,
      image: featuredImage,
      category: "Anime",
      isNew: false,
      isSale: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center py-24 space-y-8">
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">Anime Collection</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center mb-8">Explore our exclusive Anime-inspired streetwear and accessories. Stay tuned for the latest drops and collaborations!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {animeProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Anime;